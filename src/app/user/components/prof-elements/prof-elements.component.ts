import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProfElementsAddEditComponent } from '../prof-elements-add-edit/prof-elements-add-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesseurService } from '../../services/professeur.service';
import { ElementService } from 'src/app/filiere/services/element.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription, filter } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FilterInterface } from 'src/app/filter/store/filter.state';
import { AppState } from 'src/app/store/app.state';
import { Store, select } from '@ngrx/store';

import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-prof-elements',
  templateUrl: './prof-elements.component.html',
  styleUrls: ['./prof-elements.component.scss'],
})
export class ProfElementsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'code',
    'filiere',
    'semestre',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id: any;
  nom: any;
  prenom: any;
  email: any;
  mobile: any;
  elements: any;
  prof_id: any;
  role = localStorage.getItem('role');
  constructor(
    private active: ActivatedRoute,
    private service: ProfesseurService,
    public service_element: ElementService,
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
      //console.log(res.id);
      if (!localStorage.getItem('prof_id')) {
        localStorage.setItem('prof_id', res.id);
      }
    });
  }

  /* ---------------------------------------------------------------------------------------------------- */
  private specificActionSubscription!: Subscription;
  dataSource = new MatTableDataSource<any>();
  ngOnInit(): void {
    this.getProfesseurDetail();
  }
  ngAfterViewInit() {
    this.filterAction();
    this.selectAddButtonAction();
  }

  ngOnDestroy(): void {
    this.specificActionSubscription.unsubscribe();
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
    this.specificActionSubscription = this.store
      .pipe(
        select('button'),
        filter((action: any) => action.name === 'add')
      )
      .subscribe((action: any) => {
        this.openAddElementComp();
      });
  }

  /* ---------------------------------------------------------------------------------------------------- */

  getProfesseurDetail() {
    this.service.getElements(this.id).subscribe((res) => {
      this.id = res.professeur._id;
      this.prenom = res.professeur.user.prenom;
      this.nom = res.professeur.user.nom;
      this.elements = res.elements;
      this.dataSource = new MatTableDataSource(res.elements);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
      let prof = res.professeur.user.nom;
      this.store_service.changeBarDataAction(
        this.role != 'professeur'
          ? res.professeur.user.nom.toUpperCase() +
              ' ' +
              res.professeur.user.prenom.toUpperCase() +
              ' > ' +
              'Elements'
          : 'Liste des Elements',
        'button',
        ['filter_list', 'add'],
        ['', 'ajouter'],
        [true, this.role != 'professeur' ? true : false],
        [true, true]
      );
    });
  }
  openAddElementComp() {
    const dialogFef = this._dialog.open(ProfElementsAddEditComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfesseurDetail();
        }
      },
    });
    this.store_service.renameButtonAction('button');
  }
  openEditElementComp(data: any) {
    const dialogFef = this._dialog.open(ProfElementsAddEditComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfesseurDetail();
        }
      },
    });
  }
  deleteOneMatFromProf(event: any, idM: any) {
    this.dialog
      .confirmDialog({
        title: 'Cette action est irréversible !',
        message: `Etes-vous sùr de vouloir suprimer la matiére ?`,
        confirmText: 'Oui',
        cancelText: 'Annuler',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service.deleteOneMatFromProf(this.id, idM).subscribe({
              next: (val: any) => {
                this.toastr.success(`${val.message}`, `${val.status}`);
                this.getProfesseurDetail();
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
}
