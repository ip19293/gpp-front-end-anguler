import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FiliereAddEditComponent } from '../filiere-add-edit/filiere-add-edit.component';
import { FiliereService } from '../../services/filiere.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription, filter } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { FilterInterface } from 'src/app/filter/store/filter.state';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.scss'],
})
export class FiliereComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'description',
    'niveau',
    'status',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  queryType: any[] = [{ niveau: 'licence' }, { niveau: 'master' }];
  constructor(
    public service: FiliereService,
    private router: Router,
    private _dialog: MatDialog,
    private dialog: DialogService,
    private toastr: ToastrService,
    private store: Store<AppState>,
    private store_service: StoreService
  ) {
    this.getFillieres();
  }
  /* ---------------------------------------------------------------------------------------------------- */
  private specificActionSubscription!: Subscription;
  private filterActionSubscription!: Subscription;
  dataSource = new MatTableDataSource<any>();
  ngOnInit(): void {
    this.getFillieres();
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
        this.openAddFilliereComp();
      });
    this.filterActionSubscription = this.store
      .pipe(
        select('button'),
        filter((action: any) => action.name === 'filter')
      )
      .subscribe((action: any) => {
        this.getFillieres(this.queryType[cont]);
        cont = cont < 2 ? cont + 1 : 0;
      });
  }
  /* ---------------------------------------------------------------------------------------------------- */

  getFillieres(data?: any) {
    this.service.getAllFillieres(data).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.filieres);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
      this.store_service.changeBarDataAction(
        'Liste des filieres',
        'button',
        ['filter_list', 'add'],
        ['', 'ajouter'],
        [res.filieres.length > 0 ? true : false, true],
        [true, true]
      );
    });
  }

  deleteFilliere(event: any, id: string) {
    this.dialog
      .confirmDialog({
        title: 'Cette action est irréversible !',
        message: 'Voulez-vous confirmer la suppression ?',
        confirmText: 'Oui',
        cancelText: 'Annuler',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service.deleteFilliere(id).subscribe({
              next: (res) => {
                this.toastr.success(`${res.message}`, `${res.status}`);
                this.getFillieres();
              },
              error: (err) => {
                this.toastr.error(`${err.error.message}`, `faild`);
              },
            });
          } else {
          }
        },
      });
  }
  openAddFilliereComp() {
    const dialogFef = this._dialog.open(FiliereAddEditComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFillieres();
        }
      },
    });
    this.store_service.renameButtonAction('button');
  }
  openEditFilliereComp(data: any) {
    const dialogFef = this._dialog.open(FiliereAddEditComponent, {
      width: '40%',
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFillieres();
        }
      },
    });
  }
}
