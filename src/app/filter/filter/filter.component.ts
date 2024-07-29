import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { setFilterAction } from '../store/filter.actions';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  canShawSearchAsOverlay!: boolean;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private store: Store<AppState>) {}
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShawSearchAsOverlay(window.innerWidth);
  }
  ngOnInit(): void {
    this.checkCanShawSearchAsOverlay(window.innerWidth);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.store.dispatch(setFilterAction({ filter: filterValue }));
  }
  getSideNavData(): void {
    this.store.select('sidenav').subscribe((data) => {
      this.canShawSearchAsOverlay = data.canShawSearchAsOverlay;
    });
  }
  checkCanShawSearchAsOverlay(innerWidth: number): void {
    if (innerWidth < 845) {
      this.canShawSearchAsOverlay = true;
    } else {
      this.canShawSearchAsOverlay = false;
    }
  }
}
