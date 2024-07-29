import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ChangeBarDataAction,
  ChangeButtonDataAction,
  RenameButtonAction,
  RenameElementAction,
} from 'src/app/actionbar/store/bar.action';
import { AppState } from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private store: Store<AppState>) {}
  changeButtonDataAction(
    icons: string[],
    texts: string[],
    displaeds: boolean[],
    clickeds: boolean[]
  ): void {
    this.store.dispatch(
      ChangeButtonDataAction({
        icons: icons,
        texts: texts,
        displaeds: displaeds,
        clickeds: clickeds,
      })
    );
  }
  changeBarDataAction(
    element: string,
    name: string,
    icons: string[],
    texts: string[],
    displaeds: boolean[],
    clickeds: boolean[]
  ): void {
    this.store.dispatch(
      ChangeBarDataAction({
        element: element,
        name: name,
        icons: icons,
        texts: texts,
        displaeds: displaeds,
        clickeds: clickeds,
      })
    );
  }
  renameButtonAction(name: string): void {
    this.store.dispatch(
      RenameButtonAction({
        name: name,
      })
    );
  }
  addFocus(element: string): void {
    this.store.dispatch(
      RenameElementAction({
        element: element,
      })
    );
  }
}
