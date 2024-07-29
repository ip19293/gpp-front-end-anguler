import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Subscription, filter } from 'rxjs';

import { StoreService } from 'src/app/shared/services/store.service';
import { navbarProfData } from 'src/app/sidenav/helper/sidenav-prof-data';
import { navbarData } from 'src/app/sidenav/helper/sidenav.data';
import { SideNavInterface } from 'src/app/sidenav/types/side-nav.interface';

@Component({
  selector: 'app-homme',
  templateUrl: './homme.component.html',
  styleUrls: ['./homme.component.scss'],
})
export class HommeComponent implements OnInit, OnDestroy {
  public barChartOptions = {
    responsive: true,
  };
  public barChartLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  public barChartTypes = [
    'bar',
    'line',
    'radar',
    'pie',
    'doughnut',
    'polarArea',
    'bubble',
    'scatter',
  ];
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Sales 2023' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Sales 2024' },
  ];
  isSideNavCollapsed!: boolean;
  screenWidth!: number;
  role: any;
  navbarData: any;
  private routerEventsSubscription!: Subscription;
  constructor(
    private router: Router,

    private store: Store<{
      sidenav: SideNavInterface;
    }>,
    private store_service: StoreService
  ) {
    this.role = localStorage.getItem('role');
    if (this.role === 'professeur') {
      this.navbarData = navbarProfData;
    } else {
      this.navbarData = navbarData;
    }
    store_service.addFocus('Tableau de bord');
    /*   this.routerEventsSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.store.dispatch(
          ChangeButtonDataAction({
            name: 'button',
            icons: ['', ''],
            texts: ['', ''],
            displaeds: [false, false],
            clickeds: [false, false],
          })
        );
      }); */
  }
  ngOnDestroy(): void {
    // this.routerEventsSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    if (this.role === 'professeur') {
      this.navbarData = navbarProfData;
    } else {
      this.navbarData = navbarData;
    }
    this.store.select('sidenav').subscribe((data) => {
      this.isSideNavCollapsed = data.collapsed;
      this.screenWidth = data.screenWidth;
    });
    this.store_service.addFocus('Tableau de bord');
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
}
