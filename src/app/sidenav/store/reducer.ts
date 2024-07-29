import { Action, createReducer, on } from '@ngrx/store';
import { SidenavInitState } from './sidenav.state';
import {
  closeSidenavAction,
  resizeScreenAction,
  toggleCollapseAction,
} from './actions';

const _sideNavReducer = createReducer(
  SidenavInitState,
  on(toggleCollapseAction, (state, action) => {
    return {
      ...state,
      collapsed: action.collapsed,
    };
  }),
  on(closeSidenavAction, (state, action) => {
    return {
      ...state,
      collapsed: false,
    };
  }),
  on(resizeScreenAction, (state, action) => ({
    ...state,
    screenWidth: action.screenWidth,
    collapsed: action.screenWidth <= 768 ? false : true,
    canShawSearchAsOverlay: action.screenWidth < 845 ? true : false,
  }))
);
export function sideNavReducer(state: any, action: Action) {
  return _sideNavReducer(state, action);
}
