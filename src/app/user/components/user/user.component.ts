import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UsersStateEnum } from '../../store/user.state';
import * as XLSX from 'xlsx';
import { UserAddEditComponent } from '../user-add-edit/user-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { FilterInterface } from 'src/app/filter/store/filter.state';

import { AppState } from 'src/app/store/app.state';
import { Subscription, filter } from 'rxjs';

import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, AfterViewInit, OnDestroy {
  isSideNavCollapsed!: boolean;
  screenWidth!: number;
  users!: any;
  readonly UsersStateEnum = UsersStateEnum;
  displayedColumns: string[] = [
    'photo',
    'nom',
    'email',
    'role',
    'active',
    'action',
  ];

  option: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  canShawSearchAsOverlay = false;
  constructor(
    public userServices: UserService,
    private router: Router,
    private _dialog: MatDialog,
    private toastr: ToastrService,
    private dialog: DialogService,
    private store: Store<AppState>,
    private store_service: StoreService
  ) {
    //this.store.dispatch(new GetAllUsersAction({}));
    this.getUsers({}, '');
  }
  /* ---------------------------------------------------------------------------------------------------- */
  private specificActionSubscription!: Subscription;
  private filterActionSubscription!: Subscription;
  query: any[] = [
    { role: 'professeur' },
    { role: 'responsable' },
    { role: 'admin' },
  ];
  dataSource = new MatTableDataSource<any>();
  ngOnInit(): void {
    this.getUsers({}, '');
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
    let count = 0;
    this.specificActionSubscription = this.store
      .pipe(
        select('button'),
        filter((action: any) => action.name === 'add')
      )
      .subscribe((action: any) => {
        // this.router.navigate(['admin/users/add']);
        this.openAddUserComp();
        // console.log('Specific action detected:', action);
      });
    this.filterActionSubscription = this.store
      .pipe(
        select('button'),
        filter((action: any) => action.name === 'filter')
      )
      .subscribe((action: any) => {
        this.getUsers(this.query[count], this.query[count]?.role);
        count = count < 3 ? count + 1 : 0;
      });
  }
  /* ---------------------------------------------------------------------------------------------------- */
  exportXLSX() {
    this.userServices.getAllUsers().subscribe((res) => {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(res.users);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'data.xlsx');
    });
  }

  getUsers(query: any, filterValue: any) {
    query = query != undefined ? query : {};
    this.userServices.getAllUsers(query).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
      this.store_service.changeBarDataAction(
        'Liste des utilisateurs',
        'button',
        ['filter_list', 'add'],
        [filterValue, 'ajouter'],
        [true, true],
        [true, true]
      );
    });
  }
  activeOrDeactiveUser(event: any, id: string) {
    this.userServices.activeOrDeactiveUser(id).subscribe((res) => {
      this.toastr.success(`${res.message}`, `${res.status}`);
      this.getUsers({}, '');
    });
  }

  deleteUser(enent: any, id: string) {
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
            this.userServices.deleteUser(id).subscribe({
              next: (resul: any) => {
                this.toastr.success(`${resul.message}`, `${resul.status}`);
                this.getUsers({}, '');
              },
              error: (err) => {
                this.toastr.error(`${err.error}`, `failed`);
              },
            });
          } else {
          }
        },
        error: (err) => {},
      });
  }

  openAddUserComp() {
    this.option = true;
    const dialogFef = this._dialog.open(UserAddEditComponent, {
      width: '60%',
    });
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUsers({}, '');
        }
      },
    });
    this.store_service.renameButtonAction('button');
  }
  openEditUserComp(data: any) {
    const dialogFef = this._dialog.open(UserAddEditComponent, {
      width: '60%',
      data,
    });
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUsers({}, '');
        }
      },
    });
    this.store_service.renameButtonAction('button');
  }
}
