import { Component, HostListener, Input, OnInit } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { notifications } from './helper/navbar-notification.data';
import { userItems } from './helper/navbar-user-item.data';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../shared/services/dialog.service';
import { UserProfilComponent } from '../profil/user-profil/user-profil.component';

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
  data: any = localStorage.getItem('data');
  jsonData: any = JSON.parse(this.data);
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShawSearchAsOverlay(window.innerWidth);
  }
  constructor(
    private router: Router,
    private auth_service: AuthService,
    private _dialog: MatDialog,
    private dialog: DialogService
  ) {}
  ngOnInit(): void {
    this.checkCanShawSearchAsOverlay(window.innerWidth);
  }
  logout() {
    this.auth_service.logout();
    this.router.navigate(['auth/login']);
  }
  profil() {
    const dialogFef = this._dialog.open(UserProfilComponent, {
      data: this.jsonData,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
        }
      },
    });
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
