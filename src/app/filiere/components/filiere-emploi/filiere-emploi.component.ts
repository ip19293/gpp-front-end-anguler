import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FiliereService } from '../../services/filiere.service';
import { AddEditEmploiComponent } from '../add-edit-emploi/add-edit-emploi.component';
import { EmploiService } from '../../services/emploi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription, filter } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { FilterInterface } from 'src/app/filter/store/filter.state';

import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-filiere-emploi',
  templateUrl: './filiere-emploi.component.html',
  styleUrls: ['./filiere-emploi.component.scss'],
})
export class FiliereEmploiComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  id: any;
  displayedColumns: string[] = [
    'jour',
    'matiere',
    'type',
    'startTime',
    'finishTime',
    'professeur',
    'action',
  ];
  filiere: any;
  niveau: any;
  annee: any;
  description: any;
  dayName: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private builder: FormBuilder,
    public service: EmploiService,
    private service_filiere: FiliereService,
    private router: Router,
    private _dialog: MatDialog,
    private dialog: DialogService,
    private toastr: ToastrService,
    private active: ActivatedRoute,
    private store: Store<AppState>,
    private store_service: StoreService
  ) {
    this.active.params.subscribe((res: any) => {
      this.id = res.id;
      console.log(res.id);
    });
    localStorage.setItem('filiere', this.id);
    this.getGroupByIdEmplois();
  }
  /* ---------------------------------------------------------------------------------------------------- */
  private specificActionSubscription!: Subscription;
  dataSource = new MatTableDataSource<any>();
  ngOnInit(): void {
    this.getGroupByIdEmplois();
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
        this.openAddEmploiComp();
      });
  }
  /* ---------------------------------------------------------------------------------------------------- */

  getGroupByIdEmplois() {
    this.service_filiere.getEmploisByFiliereId(this.id).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.emplois);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
      this.store_service.changeBarDataAction(
        res.filiere.name + ' : ' + res.filiere.niveau + ' > Empoi du temps',
        'button',
        ['filter_list', 'add'],
        ['', 'ajouter'],
        [res.emplois.length > 0 ? true : false, true],
        [res.emplois.length > 0 ? true : false, true]
      );
    });
  }
  removeEmploi(event: any, id: string) {
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
            this.service.deleteEmploi(id).subscribe({
              next: (res) => {
                this.toastr.success(
                  `emploi delete ssuccesfully ...`,
                  `success`
                );
                this.getGroupByIdEmplois();
              },
              error: (err) => {
                this.toastr.error(`cann't deleted emploi !`, `faild`);
              },
            });
          } else {
          }
        },
      });
  }
  openAddEmploiComp() {
    const dialogFef = this._dialog.open(AddEditEmploiComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getGroupByIdEmplois();
        }
      },
    });
    this.store_service.renameButtonAction('button');
  }
  openEditEmploiComp(data: any) {
    const dialogFef = this._dialog.open(AddEditEmploiComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getGroupByIdEmplois();
        }
      },
    });
  }
}
