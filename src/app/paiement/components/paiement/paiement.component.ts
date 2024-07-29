import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { PaiementService } from "../../services/paiement.service";
import { DialogService } from "src/app/shared/services/dialog.service";
import { ToastrService } from "ngx-toastr";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription, filter } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { FilterInterface } from "src/app/filter/store/filter.state";
import { ExcelService } from "src/app/shared/services/excel.service";
import { StoreService } from "src/app/shared/services/store.service";
import { ProfesseurService } from "src/app/user/services/professeur.service";
import { MessageRefuseDialogComponent } from "../dialogs/message-refuse-dialog/message-refuse-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-paiement",
  templateUrl: "./paiement.component.html",
  styleUrls: ["./paiement.component.scss"],
})
export class PaiementComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    "date",
    "professeur",
    "somme",
    "confirmation",
    "action",
  ];
  data: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columns: string[] = ["professeur", "somme", "banque", "accountNumero"];
  rows: any[] = [];
  role = localStorage.getItem("role");
  constructor(
    public service_paiement: PaiementService,
    public service_professeur: ProfesseurService,
    private dialog: DialogService,
    private toastr: ToastrService,
    private store: Store<AppState>,
    private excelService: ExcelService,
    private store_service: StoreService,
    private _dialog: MatDialog
  ) {
    if (this.role != "professeur") {
      this.getPaiements();
    } else {
      this.getPaiementsByProfesseurID(localStorage.getItem("prof_id"));
    }
  }
  /* ---------------------------------------------------------------------------------------------------- */
  private specificActionSubscription!: Subscription;
  dataSource = new MatTableDataSource<any>();
  ngOnInit(): void {
    if (this.role != "professeur") {
      this.getPaiements();
    } else {
      this.getPaiementsByProfesseurID(localStorage.getItem("prof_id"));
    }
  }
  ngAfterViewInit() {
    this.filterAction();
    this.selectAddButtonAction();
  }

  ngOnDestroy(): void {
    this.specificActionSubscription.unsubscribe();
  }
  filterAction(): void {
    this.store.select("filter").subscribe((data: FilterInterface) => {
      this.dataSource!.filter = data.filterValue.trim().toLowerCase();
      if (this.dataSource!.paginator) {
        this.dataSource!.paginator.firstPage();
      }
    });
  }
  selectAddButtonAction(): void {
    this.specificActionSubscription = this.store
      .pipe(
        select("button"),
        filter((action: any) => action.name === "add")
      )
      .subscribe((action: any) => {
        console.log(action.texts[1]);

        if (action.texts[1] === "confirmer") {
          this.confirmation();
        }

        if (action.texts[1] === "telecharger") {
          this.exportDataToExcel();
        }
      });
  }

  /* ---------------------------------------------------------------------------------------------------- */
  confirmPaiement(event: any, id: any): void {
    this.service_paiement.confirmPaiement(id).subscribe({
      next: (res: any) => {
        this.toastr.success(`${res.message}`, `${res.status}`);
        this.getPaiementsByProfesseurID(localStorage.getItem("prof_id"));
      },
      error: (err: any) => {
        this.toastr.error(`${err.error.message}`, `erreur`);
      },
    });
  }

  openDialogRefuce(event: any, row: any): void {
    const dialogRef = this._dialog.open(MessageRefuseDialogComponent, {
      width: "500px",

      data: { message: row.message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.service_paiement
        .confirmPaiement(row._id, { refuse: "", message: result.message })
        .subscribe({
          next: (res: any) => {
            this.toastr.success(`${res.message}`, `${res.status}`);
            this.getPaiements();
          },
          error: (err: any) => {
            this.toastr.error(`${err.error.message}`, `erreur`);
          },
        });
    });
  }
  refusePaiement(event: any, id: any): void {}
  confirmation(): void {
    this.service_paiement.confirmation().subscribe({
      next: (res: any) => {
        this.toastr.success(`${res.message}`, `${res.status}`);
        this.getPaiements();
      },
      error: (err: any) => {
        this.toastr.error(`${err.error.message}`, `erreur`);
      },
    });
    this.store_service.renameButtonAction("button");
  }
  getPaiementsByProfesseurID(id: any): void {
    this.service_professeur.getProfesseurPaiements(id).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.paiements);
      this.dataSource.sort = this.sort;
      this.data = res.paiements;
      this.dataSource.paginator = this.paginator;
      this.store_service.changeBarDataAction(
        "paiements",
        "button",
        ["filter_list", res.nb_vide == 0 ? "save_alt" : "done"],
        ["", res.nb_vide == 0 ? "telecharger" : "confirmer"],
        res.paiements.length > 0
          ? [true, this.role != "professeur"]
          : [false, false],
        res.paiements.length > 0 ? [true, true] : [false, false]
      );
    });
  }
  getPaiements(query?: any) {
    this.service_paiement.getPaiements(query).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.paiements);
      this.dataSource.sort = this.sort;
      this.data = res.paiements;
      this.dataSource.paginator = this.paginator;
      this.store_service.changeBarDataAction(
        "Liste des paiements",
        "button",
        ["filter_list", res.nb_vide == 0 ? "save_alt" : "done"],
        ["", res.nb_vide == 0 ? "telecharger" : "confirmer"],
        res.paiements.length > 0 ? [true, true] : [false, false],
        res.paiements.length > 0 ? [true, true] : [false, false]
      );
    });
  }
  exportDataToExcel(): void {
    this.excelService.exportToExcel(this.data, "exported_data");
    this.store_service.renameButtonAction("button");
  }
  deletePaiement(event: any, id: string) {
    this.dialog
      .confirmDialog({
        title: "Cette action est irréversible !",
        message: "Voulez-vous confirmer la suppression ?",
        confirmText: "Oui",
        cancelText: "No",
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service_paiement.deletePaiemenet(id).subscribe({
              next: (res) => {
                this.toastr.success(`${res.message}`, `${res.status}`);
                this.getPaiements();
              },
              error: (err) => {
                this.toastr.error(`${err.error.message}`, `erreur`);
              },
            });
          } else {
          }
        },
      });
  }
  dawnloadPDF() {
    console.log("Salem .....");
    const invoiceContentElement = document.getElementById(
      "card"
    ) as HTMLElement;
  }
}
