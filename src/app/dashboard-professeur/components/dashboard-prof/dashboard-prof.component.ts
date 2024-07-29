import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-dashboard-prof',
  templateUrl: './dashboard-prof.component.html',
  styleUrls: ['./dashboard-prof.component.scss'],
})
export class DashboardProfComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    this.store.select('sidenav').subscribe((data) => {
      this.isSideNavCollapsed = data.collapsed;
      this.screenWidth = data.screenWidth;
    });
  }
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      // Clear any stale authentication data
      this.authService.logout();
    }
  }

  isSideNavCollapsed = false;
  collapsed = false;
  screenWidth = 0;
  onToggleSideNav(data: any): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
