import { SelectionModel } from "@angular/cdk/collections";
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
import { ProfesseurService } from "src/app/user/services/professeur.service";
import { CoursService } from "src/app/cours/services/cours.service";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { AddEditPaiementComponent } from "../add-edit-paiement/add-edit-paiement.component";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription, filter } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { FilterInterface } from "src/app/filter/store/filter.state";

import { StoreService } from "src/app/shared/services/store.service";

@Component({
  selector: "app-resultat",
  templateUrl: "./resultat.component.html",
  styleUrls: ["./resultat.component.scss"],
})
export class ResultatComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    "select",
    "professeur",
    "nbc",
    "nbh",
    "somme",
    "action",
  ];
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  fromDate: any;
  toDate: any;
  nombresProfesseurs: any;
  nbc: any;
  somme: any;
  months: any;
  weeks: any;
  days: any;
  constructor(
    public service: ProfesseurService,
    public service_payement: PaiementService,
    public professeur_service: ProfesseurService,
    public service_cours: CoursService,
    private _dialog: MatDialog,
    private toastr: ToastrService,
    private store: Store<AppState>,
    private store_service: StoreService
  ) {
    this.totalResultats();
  }
  /* ---------------------------------------------------------------------------------------------------- */
  private specificActionSubscription!: Subscription;
  dataSource = new MatTableDataSource<any>();
  ngOnInit(): void {
    this.totalResultats();
    this.getPayementInformation({});
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
        this.openDialog();
      });
  }

  /* ---------------------------------------------------------------------------------------------------- */
  selecletionValue(): void {
    console.log(this.selection.hasValue());
    this.store_service.changeBarDataAction(
      "Liste des resultats",
      "button",
      ["filter_list", this.selection.hasValue() ? "done" : "add"],
      ["", "ajouter"],
      [true, true],
      [false, this.selection.hasValue()]
    );
    if (this.selection.hasValue()) {
      var professeursToPayeIDS = this.selection.selected.map((elm) => elm._id);
      let data = {
        ids: professeursToPayeIDS,
        /*      debit: this.fromDate,
        fin: this.toDate, */
      };
      this.getPayementInformation(data);
    }
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }

    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }
  savePayements(donne?: any) {
    this.service_payement.addManyPaiements(donne).subscribe({
      next: (res) => {
        this.toastr.success(`${res.message}`, `${res.status} `);
        this.totalResultats();
      },
      error: (err) => {
        this.toastr.error(`${err.error.message}`, `${err.error.status} `);
      },
    });
  }
  getPayementInformation(data?: any) {
    this.service_payement.getPaiementInformation(data).subscribe({
      next: (res) => {
        console.log(res);
        this.fromDate = res.info.fromDate;
        this.toDate = res.info.toDate;
        this.nbc = res.info.nbc;
        this.somme = res.info.somme;
        this.months = res.info.months;
        this.weeks = res.info.weeks;
        this.days = res.info.week;
        this.nombresProfesseurs = res.info.nombresProfesseurs;
      },
      error: (err) => {
        this.toastr.error(`${err.error.message}`, `${err.error.status} `);
      },
    });
  }
  openDialog(): void {
    const dialogRef = this._dialog.open(AddEditPaiementComponent, {
      width: "800px",
      data: {
        fromDate: this.fromDate,
        toDate: this.toDate,
        nombresProfesseurs: this.nombresProfesseurs,
        nbc: this.nbc,
        somme: this.somme,
        months: this.months | 0,
        weeks: this.weeks | 0,
        days: this.days,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        var professeursToPayeIDS = this.selection.selected.map(
          (elm) => elm._id
        );
        let donne = {
          ids: professeursToPayeIDS,
          debit: this.fromDate,
          fin: this.toDate,
        };
        this.savePayements(donne);
      }
    });
    this.store_service.renameButtonAction("button");
  }
  totalResultats() {
    this.professeur_service.totaleResultatsAllProfesseurs().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.result);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
      this.store_service.changeBarDataAction(
        "Liste des resultats",
        "button",
        ["filter_list", "add"],
        ["", "ajouter"],
        res.result.length > 0 ? [true, true] : [false, false],
        res.result.length > 0 ? [true, false] : [false, false]
      );
    });
  }
}
