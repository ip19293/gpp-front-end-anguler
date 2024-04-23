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
  faClose,
  faHome,
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
  navbarData = navbarData;
  faClose = faClose;
  faAngleRight = faAngleRight;
  faAngleDown = faAngleDown;
  multiple: boolean = true;
  constructor(
    public router: Router,
    private store: Store<{
      sidenav: { collapsed: boolean; screenWidth: number };
    }>
  ) {}
  ngOnInit(): void {
    this.store.select('sidenav').subscribe((data) => {
      this.collapsed = data.collapsed;
      this.screenWidth = data.screenWidth;
    });
    this.screenWidth = window.innerWidth;
    this.store.dispatch(
      resizeScreenAction({
        sidenav: {
          collapsed: this.collapsed,
          screenWidth: this.screenWidth,
        },
      })
    );
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.collapsed = this.screenWidth <= 768 ? false : true;
    this.store.dispatch(
      resizeScreenAction({
        sidenav: {
          collapsed: this.collapsed,
          screenWidth: this.screenWidth,
        },
      })
    );
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    /*    if (this.collapsed) {
      this.isNewInstence = true;
    } */
    this.store.dispatch(
      toggleCollapseAction({
        sidenav: {
          collapsed: this.collapsed,
          screenWidth: this.screenWidth,
        },
      })
    );
  }
  claseSidenav(): void {
    this.collapsed = false;
    this.store.dispatch(
      closeSidenavAction({
        sidenav: {
          collapsed: this.collapsed,
          screenWidth: this.screenWidth,
        },
      })
    );
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
