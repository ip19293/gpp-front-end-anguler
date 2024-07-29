import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute } from "@angular/router";
import { CoursService } from "src/app/cours/services/cours.service";
import { ProfesseurService } from "src/app/user/services/professeur.service";
import { ChangePeriodeDialogComponent } from "../dialogs/change-periode-dialog/change-periode-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { PaiementService } from "../../services/paiement.service";
import { ToastrService } from "ngx-toastr";
import { Subscription, filter } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { FilterInterface } from "src/app/filter/store/filter.state";

import { CdkMenu, CdkMenuTrigger } from "@angular/cdk/menu";
import { StoreService } from "src/app/shared/services/store.service";

@Component({
  selector: "app-resultat-prof",
  templateUrl: "./resultat-prof.component.html",
  styleUrls: ["./resultat-prof.component.scss"],
})
export class ResultatProfComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    "date",
    "matiere",
    "type",
    "debit",
    "fin",
    "TH",
    "prix",
    "somme",
  ];
  displayedClms: string[] = ["matiere", "nbc", "nbh", "prix", "montant"];
  cours: any;
  facture: any;
  dataSrs!: MatTableDataSource<any>;
  @ViewChild(CdkMenu) menu!: CdkMenu;
  @ViewChild(CdkMenuTrigger) menuTrigger!: CdkMenuTrigger;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  nbc: String = "Nombre de cours signés : ";
  nbh: String = "Nombre d`heures de travail : ";
  ts: String = "  Montant(MRU) : ";
  tp: String = "Total payament  ";
  fr: String = "A partir de";
  t: String = "Vers le";
  changePeriode = false;

  fromDate: any;
  toDate: any;
  id: any;
  prof: any;
  nom: any;
  prenom: any;
  email: any;
  mobile: any;
  total: any;
  data: any;
  count: any;
  somme: any;
  heuresTV: any;
  TH: any;
  intervalForm: FormGroup;
  paiementForm!: FormGroup;
  new: any;
  detail = false;

  constructor(
    private active: ActivatedRoute,
    private cours_service: CoursService,
    private prof_service: ProfesseurService,
    private _dialog: MatDialog,
    private paiement_service: PaiementService,
    private toastr: ToastrService,
    private builder: FormBuilder,
    private store: Store<AppState>,
    private store_service: StoreService
  ) {
    this.active.params.subscribe((res: any) => {
      this.id = res.id;
      // console.log(res.id);
    });
    this.intervalForm = this.builder.group({
      debit: this.builder.control("", Validators.required),
      fin: this.builder.control("", Validators.required),
    });
  }

  /* ---------------------------------------------------------------------------------------------------- */
  private specificActionSubscription!: Subscription;
  dataSource = new MatTableDataSource<any>();
  ngOnInit(): void {
    this.detailResultat(this.id);
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
        //this.openMenu();
      });
  }

  /* ---------------------------------------------------------------------------------------------------- */

  openMenu() {}
  openDialog(): void {
    const dialogRef = this._dialog.open(ChangePeriodeDialogComponent, {
      data: { fromDate: this.fromDate, toDate: this.toDate },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.fromDate = result.fromDate;
      this.toDate = result.toDate;
      let dt = {
        fromDate: result.fromDate,
        toDate: result.toDate,
      };
      this.detailResultat(this.id, dt);
    });

    this.store_service.renameButtonAction("button");
  }

  openChangePeriode(): void {
    this.changePeriode = !this.changePeriode;
  }
  savePaiement() {
    let data = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      professeur: this.id,
    };

    this.paiement_service.addPaiement(data).subscribe({
      next: (val: any) => {
        this.toastr.success(`${val.message}`, `${val.status} `);
        this.detailResultat({});
      },
      error: (err: any) => {
        this.toastr.error(`${err.error.message}`, `${err.error.status} `);
      },
    });
  }
  onFormSubmit() {
    if (this.intervalForm.valid) {
      this.fromDate = this.intervalForm.value.debit;
      this.toDate = this.intervalForm.value.fin;
      this.detailResultat(this.id, this.intervalForm.value);
      this.changePeriode = false;
    }
  }

  detailResultat(id: any, data?: any): void {
    this.prof_service
      .paiementDetailResultats(id, data)
      .subscribe((res: any) => {
        this.nom = res.nom;
        this.prenom = res.prenom;
        this.email = res.email;
        /*  this.count = res.total[0].nbc;
        this.heuresTV = res.total[0].nbh;
        this.TH = res.total[0].TH;
        this.somme = res.total[0].SOMME; */
        this.cours = res.cours;
        this.fromDate = res.cours[this.cours.length - 1].fromDate;
        this.toDate = res.cours[this.cours.length - 1].toDate;
        /*   this.facture = res.total; */
        this.dataSource = new MatTableDataSource(res.cours);
        /*  this.dataSrs = new MatTableDataSource(res.total); */
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.store_service.changeBarDataAction(
          localStorage.getItem("role") != "professeur"
            ? res.nom.toUpperCase() +
                " " +
                res.prenom.toUpperCase() +
                " > " +
                "Resultats"
            : "Resultats",
          "button",
          ["filter_list", "add"],
          ["", "ajouter"],
          res.cours.length > 1 ? [false, false] : [false, false],
          res.cours.length > 1 ? [true, true] : [false, false]
        );
      });
  }
}
