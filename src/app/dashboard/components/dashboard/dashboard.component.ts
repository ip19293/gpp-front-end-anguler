import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private store: Store<{
      sidenav: any;
    }>,
    private usersStore: Store<{ users: any }>,
    private filterStore: Store<{ filter: any }>
  ) {
    this.store.select('sidenav').subscribe((data) => {
      this.isSideNavCollapsed = data.collapsed;
      this.screenWidth = data.screenWidth;
    });
  }
  ngOnInit(): void {}
  isSideNavCollapsed = false;
  collapsed = false;
  screenWidth = 0;
  onToggleSideNav(data: any): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
