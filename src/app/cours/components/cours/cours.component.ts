import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoursService } from '../../services/cours.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { CoursAddEditComponent } from '../cours-add-edit/cours-add-edit.component';
import { Subscription, filter } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { FilterInterface } from 'src/app/filter/store/filter.state';

import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss'],
})
export class CoursComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'matiere',
    'professeur',
    'date',
    'type',
    'debit',
    'fin',
    'isSigned',
    'action',
  ];
  isSigned: boolean = false;
  role = localStorage.getItem('role');
  cours: any;
  selectCoursType: String = 'tous';
  coursTypes: any[] = [
    { isSigned: 'effectué' },
    { isSigned: 'en attente' },
    { isSigned: 'annulé' },
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public service: CoursService,
    private router: Router,
    private _dialog: MatDialog,
    private toastr: ToastrService,
    private dialog: DialogService,
    private store: Store<AppState>,
    private store_service: StoreService
  ) {
    this.getCours('tous');
  }
  /* ---------------------------------------------------------------------------------------------------- */
  private specificActionSubscription!: Subscription;
  private filterActionSubscription!: Subscription;
  dataSource = new MatTableDataSource<any>();
  ngOnInit(): void {
    console.log('role ....' + this.role);
    this.getCours('tous');
  }
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
    let cont = 0;

    this.specificActionSubscription = this.store
      .pipe(
        select('button'),
        filter((action: any) => action.name === 'add')
      )
      .subscribe((action: any) => {
        this.openAddCoursComp();
      });
    this.filterActionSubscription = this.store
      .pipe(
        select('button'),
        filter((action: any) => action.name === 'filter')
      )
      .subscribe((action: any) => {
        this.getCours(this.coursTypes[cont]?.isSigned, this.coursTypes[cont]);
        cont = cont < 3 ? cont + 1 : 0;
      });
  }
  /* ---------------------------------------------------------------------------------------------------- */
  onTypeChange(event: any) {
    // console.log(event.value);
    let type = event.value;
    let query = type != 'tous' ? { isSigned: type } : {};
    this.getCours(type, query);
    // console.log(query);
  }
  getCours(filterValue: any, type?: any) {
    this.service.getAllCours(type).subscribe((res) => {
      this.cours = res.cours;
      this.dataSource = new MatTableDataSource(res.cours);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
      this.store_service.changeBarDataAction(
        'Liste des cours',
        'button',
        ['filter_list', 'add'],
        [filterValue, 'ajouter'],
        [true, true],
        [true, true]
      );
    });
  }

  deleteCours(event: any, id: string) {
    this.dialog
      .confirmDialog({
        title: 'Cette action est irréversible !',
        message: `Etes-vous sùr de vouloir suprimer la cour ?`,
        confirmText: 'Oui',
        cancelText: 'Annuler',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service.deleteCours(id).subscribe({
              next: (res) => {
                this.toastr.success(`${res.message}`, `${res.status}`);
                this.getCours('');
              },
              error: (err) => {
                this.toastr.error(`${err.message}`, `fail`);
              },
            });
          } else {
          }
        },
      });
  }

  openAddCoursComp() {
    const dialogFef = this._dialog.open(CoursAddEditComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCours('');
        }
      },
    });
    this.store_service.renameButtonAction('button');
  }
  openEditcoursComp(data: any) {
    const dialogFef = this._dialog.open(CoursAddEditComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCours('');
        }
      },
    });
  }
  signeCours(id: string, isSigned: string) {
    this.service.signeCours(id).subscribe({
      next: (res: any) => {
        this.getCours(isSigned, { isSigned: isSigned });
        this.toastr.success(`${res.message}`, `${res.status}`);
      },
      error: (err: any) => {
        this.toastr.error(``, `${err.error.message}`);
      },
    });
  }
  signeAllCours() {
    this.service.signeAllCours().subscribe({
      next: (res: any) => {
        this.getCours('');
        this.toastr.success(`${res.message}`, `${res.status}`);
      },
      error: (err: any) => {
        this.toastr.error(``, `${err.error.message}`);
      },
    });
  }
}
