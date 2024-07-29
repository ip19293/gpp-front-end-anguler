import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { MatDialog } from '@angular/material/dialog';
import { AppState } from 'src/app/store/app.state';

import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import {
  RemoveBarDataAction,
  RenameButtonAction,
} from '../../store/bar.action';

@Component({
  selector: 'app-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss'],
})
export class ActionbarComponent implements OnInit {
  icon_right: any;
  text_right: any;
  clicked_right: any;
  displaed_right!: boolean;
  icon_left: any;
  text_left: any;
  clicked_left: any;
  displaed_left!: boolean;
  role: any = localStorage.getItem('role');
  constructor(
    private _dialog: MatDialog,
    private store: Store<AppState>,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initialisationButtonState();
    this.buttonInfo();
  }
  initialisationButtonState(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        /*      this.store.dispatch(RemoveFocusElementAction());
        this.store.dispatch(RemoveNameButtonAction()); */
        this.store.dispatch(RemoveBarDataAction());
      });
  }
  addAction(): void {
    this.store.dispatch(
      RenameButtonAction({
        name: 'add',
      })
    );
    /*     console.log('click from bar action add button .....'); */
  }
  filterAction(): void {
    this.store.dispatch(
      RenameButtonAction({
        name: 'filter',
      })
    );
    /*     console.log('click from bar action filter button .....'); */
  }
  buttonInfo(): void {
    /*     this.store.select('element').subscribe((res) => {
      let dt = res.name.split(' > ');
      this.text = res.name === 'paiements > liste' ? 'confirmer' : 'ajouter';
      this.icon = res.name === 'paiements > liste' ? 'done' : 'add';
      this.displaed = res.name === 'homme >' ? false : true;
      this.displaed = res.name === 'paiements > liste' ? false : true;
      this.displaedFilter = dt[1] && dt[1] === 'resultats' ? false : true;
    }); */

    this.store.select('button').subscribe((res) => {
      (this.icon_left = res.icons[0]),
        (this.text_left = res.texts[0]),
        (this.clicked_left = res.clickeds[0]),
        (this.displaed_left = res.displaeds[0]);
      (this.icon_right = res.icons[1]), (this.text_right = res.texts[1]);
      (this.clicked_right = res.clickeds[1]),
        (this.displaed_right = res.displaeds[1]);
    });
  }
}
