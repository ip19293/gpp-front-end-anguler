import { Action, createAction, props } from '@ngrx/store';
import { ActionTypes } from './action.types';
import { SideNavInterface } from '../types/side-nav.interface';

export const toggleCollapseAction = createAction(
  ActionTypes.OPEN_CLOSE_SIDENAV,
  props<{ collapsed: boolean }>()
);

export const closeSidenavAction = createAction(ActionTypes.CLOSE_SIDENAV);

export const resizeScreenAction = createAction(
  ActionTypes.RESIZE_SCREEN,
  props<{ screenWidth: number }>()
);

/* export class updateScreenWidthAction implements Action {
  readonly type = ActionTypes.UPDATE_SCREEN_WIDTH;

  constructor(public payload: any) {}
}
export type ActionUnion = updateScreenWidthAction; */
