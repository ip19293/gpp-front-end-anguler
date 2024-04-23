import { Component, HostListener, Input, OnInit } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { notifications } from './helper/navbar-notification.data';
import { userItems } from './helper/navbar-user-item.data';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  faAngleDown = faAngleDown;
  canShawSearchAsOverlay = false;
  notifications = notifications;
  userItems = userItems;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShawSearchAsOverlay(window.innerWidth);
  }
  ngOnInit(): void {
    this.checkCanShawSearchAsOverlay(window.innerWidth);
  }

  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }

    return styleClass;
  }
  checkCanShawSearchAsOverlay(innerWidth: number): void {
    if (innerWidth < 845) {
      this.canShawSearchAsOverlay = true;
    } else {
      this.canShawSearchAsOverlay = false;
    }
  }
}
