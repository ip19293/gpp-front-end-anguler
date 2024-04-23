import { Action, createReducer, on } from '@ngrx/store';
import { SidenavIniState } from './sidenav.state';
import {
  closeSidenavAction,
  resizeScreenAction,
  toggleCollapseAction,
} from './actions';
import { SideNavInterface } from '../types/side-nav.interface';

const _sideNavReduce = createReducer(
  SidenavIniState,
  on(toggleCollapseAction, (state, action): SideNavInterface => {
    return {
      ...state,
      collapsed: action.sidenav.collapsed,
      screenWidth: state.screenWidth,
    };
  }),
  on(closeSidenavAction, (state, action): SideNavInterface => {
    return {
      ...state,
      collapsed: action.sidenav.collapsed,
      screenWidth: state.screenWidth,
    };
  }),
  on(
    resizeScreenAction,
    (state, action): SideNavInterface => ({
      ...state,
      screenWidth: action.sidenav.screenWidth,
      collapsed: action.sidenav.collapsed,
    })
  )
);
export function sideNavReduce(state: SideNavInterface, action: Action) {
  return _sideNavReduce(state, action);
}
