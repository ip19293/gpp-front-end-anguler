import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesseurService } from '../../services/professeur.service';
import { CoursService } from 'src/app/cours/services/cours.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ProfCoursAddEditComponent } from '../prof-cours-add-edit/prof-cours-add-edit.component';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { FilterInterface } from 'src/app/filter/store/filter.state';

import { Subscription, filter } from 'rxjs';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-professeur-cours',
  templateUrl: './professeur-cours.component.html',
  styleUrls: ['./professeur-cours.component.scss'],
})
export class ProfesseurCoursComponent implements OnInit, AfterViewInit {
  private specificActionSubscription!: Subscription;
  private filterActionSubscription!: Subscription;
  displayedColumns: string[] = [
    'date',
    'matiere',
    'type',
    'debit',
    'fin',
    'isSigne',
    'action',
  ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id: any;
  professeur: any;
  nomComplet: any;
  nom: any;
  button_name: any;
  prenom: any;
  email: any;
  allsigne: String = '';
  isSigned: boolean = false;
  coursTypes: any[] = [];
  role = localStorage.getItem('role');
  constructor(
    private active: ActivatedRoute,
    private service: ProfesseurService,
    public service_cours: CoursService,
    private router: Router,
    private _dialog: MatDialog,
    private toastr: ToastrService,
    private dialog: DialogService,
    private store: Store<AppState>,
    private store_service: StoreService
  ) {
    // console.log(this.active.snapshot.params);
    this.active.params.subscribe((res: any) => {
      this.id = res.id;
      if (!localStorage.getItem('prof_id')) {
        localStorage.setItem('prof_id', res.id);
      }
    });
    if (this.role === 'professeur') {
      this.getProfesseurCours({
        'isSigned[ne]': 'annulé',
      });
    } else {
      this.getProfesseurCours();
    }
    this.getFilterOptions();
  }

  ngOnInit(): void {
    // this.getFilterOptions();
  }
  getFilterOptions(): void {
    this.coursTypes =
      this.role != 'professeur'
        ? [
            { professeur: this.id, isSigned: 'en attente' },
            { professeur: this.id, isSigned: 'effectué' },
            { professeur: this.id, isSigned: 'annulé' },
          ]
        : [
            {
              professeur: this.id,
              isSigned: 'en attente',
            },
            {
              professeur: this.id,
              isSigned: 'effectué',
            },
          ];
  }
  /* ---------------------------------------------------------------------------------------------------- */
  ngAfterViewInit() {
    this.filterAction();
    this.selectAddButtonAction();
  }

  ngOnDestroy(): void {
    this.specificActionSubscription.unsubscribe();
    this.filterActionSubscription.unsubscribe();
  }
  filterAction(): void {
    this.store.select('filter').subscribe((data: FilterInterface) => {
      this.dataSource!.filter = data.filterValue.trim().toLowerCase();
      if (this.dataSource!.paginator) {
        this.dataSource!.paginator.firstPage();
      }
    });
  }
  selectAddButtonAction(): void {
    let count = 0;
    this.specificActionSubscription = this.store
      .pipe(
        select('button'),
        filter((action: any) => action.name === 'add')
      )
      .subscribe((action: any) => {
        this.openAddcoursComp();
        // console.log('Specific action detected:', action);
      });
    this.filterActionSubscription = this.store
      .pipe(
        select('button'),
        filter((action: any) => action.name === 'filter')
      )
      .subscribe((action: any) => {
        this.getProfesseurCours(this.coursTypes[count]);

        count = count < this.coursTypes.length ? count + 1 : 0;
      });
  }

  /* ---------------------------------------------------------------------------------------------------- */
  getProfesseurCours(data?: any) {
    console.log(data);
    if (data == undefined && this.role === 'professeur') {
      data = {
        'isSigned[ne]': 'annulé',
      };
    }
    this.service.getProfesseurCours(this.id, data).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.cours);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.allsigne = '';
      this.isSigned = false;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
      this.nom = res.professeur.user.nom;
      this.prenom = res.professeur.user.prenom;
      this.email = res.professeur.user.email;
      this.store_service.changeBarDataAction(
        this.role != 'professeur'
          ? res.professeur.user.nom.toUpperCase() +
              ' ' +
              res.professeur.user.prenom.toUpperCase() +
              ' > ' +
              'Cours'
          : 'cours',
        'button',
        ['filter_list', 'add'],
        ['', 'ajouter'],
        [true, this.role != 'professeur' ? true : false],
        [true, true]
      );
    });
  }

  deleteCours(event: any, id: string) {
    this.dialog
      .confirmDialog({
        title: 'Cette action est irréversible !',
        message: `Voulez-vous confirmer la suppression ?`,
        confirmText: 'Oui',
        cancelText: 'Annuler',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service_cours.deleteCours(id).subscribe({
              next: (res: any) => {
                this.getProfesseurCours();
                this.toastr.success(`${res.message}`, `${res.status}`);
              },
              error: (err: any) => {
                this.toastr.error(`${err.error.message}`, `failed`);
              },
            });
          } else {
          }
        },
      });
  }

  openAddcoursComp() {
    const dialogFef = this._dialog.open(ProfCoursAddEditComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfesseurCours();
        }
        this.store_service.renameButtonAction('button');
      },
    });
  }
  openEditcoursComp(data: any, id: string) {
    const dialogFef = this._dialog.open(ProfCoursAddEditComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfesseurCours();
        }
      },
    });
    this.store_service.renameButtonAction('button');
  }
  signeCours(id: string) {
    this.service_cours.signeCours(id).subscribe({
      next: (res: any) => {
        this.getProfesseurCours();
        this.toastr.success(`${res.message}`, `${res.status}`);
      },
      error: (err: any) => {
        this.toastr.error(``, `${err.error.message}`);
      },
    });
  }
  signeAllCours() {
    this.service_cours.signeAllCours().subscribe({
      next: (res: any) => {
        this.getProfesseurCours();
        this.toastr.success(`${res.message}`, `${res.status}`);
      },
      error: (err: any) => {
        this.toastr.error(``, `${err.error.message}`);
      },
    });
  }
}
