import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { SideNavInterface } from 'src/app/sidenav/types/side-nav.interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UsersState, UsersStateEnum } from '../../store/user.state';
import { Observable, map } from 'rxjs';
import { GetAllUsersAction } from '../../store/actions';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, AfterViewInit {
  isSideNavCollapsed = false;
  screenWidth = 0;
  usersState$!: Observable<UsersState>;
  readonly UsersStateEnum = UsersStateEnum;
  displayedColumns: string[] = [
    'photo',
    'nom',
    'email',
    'role',
    'active',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  option: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  canShawSearchAsOverlay = false;
  constructor(
    public userServices: UserService,
    private router: Router,
    private store: Store<{
      sidenav: SideNavInterface;
    }>,
    private usersStore: Store<{ users: any }>,
    private filterStore: Store<{ filter: any }>
  ) {
    this.usersStore.dispatch(new GetAllUsersAction({}));
    this.getUsers();
  }
  ngOnInit(): void {
    this.checkCanShawSearchAsOverlay(window.innerWidth);
    this.getUsers();

    this.store.select('sidenav').subscribe((data) => {
      this.isSideNavCollapsed = data.collapsed;
      this.screenWidth = data.screenWidth;
    });
  }

  exportXLSX() {
    this.userServices.getAllUsers().subscribe((res) => {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(res.users);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'data.xlsx');
    });
  }
  getBodyClass(): string {
    let styleClass = '';
    if (this.isSideNavCollapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      this.isSideNavCollapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }

  getInisialState(): void {
    this.store.select('sidenav').subscribe((data) => {
      this.isSideNavCollapsed = data.collapsed;
      this.screenWidth = data.screenWidth;
    });
  }

  checkCanShawSearchAsOverlay(innerWidth: number): void {
    if (innerWidth < 845) {
      this.canShawSearchAsOverlay = true;
    } else {
      this.canShawSearchAsOverlay = false;
    }
  }
  getUsers() {
    /*   this.usersStore.select('users').subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data.users.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
    });

       this.usersState$ = this.usersStore.pipe(map((state) => state.users));
    this.usersState$.subscribe((data: any) => {

    }); */

    this.userServices.getAllUsers().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.filterStore.select('filter').subscribe((data) => {
      this.dataSource.filter = data.filter.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }
}
