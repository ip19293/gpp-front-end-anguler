import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SideNavInterface } from 'src/app/sidenav/types/side-nav.interface';

@Component({
  selector: 'app-homme',
  templateUrl: './homme.component.html',
  styleUrls: ['./homme.component.scss'],
})
export class HommeComponent implements OnInit {
  isSideNavCollapsed!: boolean;
  screenWidth!: number;
  constructor(
    private store: Store<{
      sidenav: SideNavInterface;
    }>
  ) {}
  ngOnInit(): void {
    this.store.select('sidenav').subscribe((data) => {
      this.isSideNavCollapsed = data.collapsed;
      this.screenWidth = data.screenWidth;
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
}
