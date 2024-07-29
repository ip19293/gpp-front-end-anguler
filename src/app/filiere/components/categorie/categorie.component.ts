import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CategorieAddEditComponent } from '../categorie-add-edit/categorie-add-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategorieService } from '../../services/categorie.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription, filter } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { AppState } from 'src/app/store/app.state';
import { Store, select } from '@ngrx/store';
import { FilterInterface } from 'src/app/filter/store/filter.state';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss'],
})
export class CategorieComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['name', 'prix', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public service: CategorieService,
    private router: Router,
    private _dialog: MatDialog,
    private dialog: DialogService,
    private toastr: ToastrService,
    private store: Store<AppState>,
    private store_service: StoreService
  ) {
    // this.getCategories();
  }
  /* ---------------------------------------------------------------------------------------------------- */
  private specificActionSubscription!: Subscription;
  dataSource = new MatTableDataSource<any>();
  ngOnInit(): void {
    this.getCategories();
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
        this.openAddCategorieComp();
      });
  }

  /* ---------------------------------------------------------------------------------------------------- */

  getCategories() {
    this.service.getAllCategories().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.categories);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
      this.store_service.changeBarDataAction(
        'Liste des categories',
        'button',
        ['filter_list', 'add'],
        ['', 'ajouter'],
        [res.categories.length > 0 ? true : false, true],
        [true, true]
      );
    });
  }
  deleteCategorie(event: any, id: string, name: string) {
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
            this.service.deleteCategorie(id).subscribe({
              next: (res) => {
                this.toastr.success(`${res.message}`, `${res.status}`);
                this.getCategories();
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
  openAddCategorieComp() {
    const dialogFef = this._dialog.open(CategorieAddEditComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCategories();
        }
      },
    });
    this.store_service.renameButtonAction('button');
  }
  openEditCategorieComp(data: any) {
    const dialogFef = this._dialog.open(CategorieAddEditComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCategories();
        }
      },
    });
    this.store_service.renameButtonAction('button');
  }
}
