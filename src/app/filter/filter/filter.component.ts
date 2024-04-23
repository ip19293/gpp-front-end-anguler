import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { setFilterAction } from './store/filter.actions';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private store: Store<any>) {}
  ngOnInit(): void {}
  canShawSearchAsOverlay = false;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.store.dispatch(setFilterAction({ filter: filterValue }));

    /*    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue.trim().toLowerCase());
    this.store.select('users').subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.users.users);
      console.log('Recherche.....');
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      console.log(this.dataSource.filter);
    }); */
    /*
    this.store.dispatch(
      loadUsersDataAction({
        users: [],
      })
    ); */
  }
}
