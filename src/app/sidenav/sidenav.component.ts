import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import {
  faAngleDown,
  faAngleRight,
  faBriefcase,
  faChartBar,
  faClock,
  faClose,
  faCreditCard,
  faHome,
  faList,
  faPoll,
} from '@fortawesome/free-solid-svg-icons';
import { fadeInOut } from './helper/fade-in-out';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { INavbarData } from './types/side-nav-item-interface';
import { Router } from '@angular/router';
import { navbarData } from './helper/sidenav.data';
import { Store } from '@ngrx/store';
import {
  closeSidenavAction,
  resizeScreenAction,
  toggleCollapseAction,
} from './store/actions';
import { AppState } from '../store/app.state';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SidenavComponent implements OnInit {
  faHome = faHome;
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed!: boolean;
  screenWidth!: number;
  isNewInstence = false;
  navbarData: any;
  faClose = faClose;
  faAngleRight = faAngleRight;
  faAngleDown = faAngleDown;
  multiple: boolean = true;
  role: any;
  constructor(public router: Router, private store: Store<AppState>) {
    this.role = localStorage.getItem('role');
    if (this.role === 'professeur') {
      this.navbarData = [
        {
          routerLink: '/professeur/homme',
          icon: faHome,
          label: 'Dashbord',
        },
        {
          routerLink: `/professeur/professeurs/${localStorage.getItem(
            'prof_id'
          )}/emplois`,
          icon: faClock,
          label: 'Emplois',
        },
        {
          routerLink: `/professeur/professeurs/${localStorage.getItem(
            'prof_id'
          )}/cours`,
          icon: faList,
          label: 'Cours',
        },

        {
          routerLink: `/professeur/resultats/${localStorage.getItem(
            'prof_id'
          )}`,
          icon: faPoll,
          label: 'Resultats',
        },
        {
          routerLink: '/professeur/paiements',
          icon: faCreditCard,
          label: 'Paiements',
        },
        {
          routerLink: `/professeur/professeurs/${localStorage.getItem(
            'prof_id'
          )}`,
          icon: faBriefcase,
          label: 'Elements',
        },
      ];
    } else {
      this.navbarData = navbarData;
    }
  }
  ngOnInit(): void {
    this.store.select('sidenav').subscribe((data) => {
      this.collapsed = data.collapsed;
      this.screenWidth = data.screenWidth;
    });
    this.screenWidth = window.innerWidth;
    this.store.dispatch(
      resizeScreenAction({
        screenWidth: this.screenWidth,
      })
    );
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.collapsed = this.screenWidth <= 768 ? false : true;
    this.store.dispatch(
      resizeScreenAction({
        screenWidth: this.screenWidth,
      })
    );
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.store.dispatch(
      toggleCollapseAction({
        collapsed: this.collapsed,
      })
    );
  }
  claseSidenav(): void {
    this.collapsed = false;
    this.store.dispatch(closeSidenavAction());
  }
  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }
  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routerLink) ? 'active' : '';
  }
  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for (let modelItem of this.navbarData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }
}
