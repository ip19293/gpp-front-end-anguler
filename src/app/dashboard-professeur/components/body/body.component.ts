import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import {
  RemoveFocusElementAction,
  RemoveNameButtonAction,
} from 'src/app/actionbar/store/bar.action';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  element: any;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {
    //  this.initialisationButtonState();
  }

  ngOnInit(): void {
    this.store.select('button').subscribe((res) => {
      this.element = res.element;
      this.cdr.detectChanges();
      console.log(res);
    });
  }
  initialisationButtonState(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.store.dispatch(RemoveFocusElementAction());
        this.store.dispatch(RemoveNameButtonAction());
      });
  }

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
