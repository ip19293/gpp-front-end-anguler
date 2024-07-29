import { Action, createReducer, on } from '@ngrx/store';
import {
  ChangeBarDataAction,
  ChangeButtonDataAction,
  RemoveBarDataAction,
  RemoveFocusElementAction,
  RemoveNameButtonAction,
  RenameButtonAction,
  RenameElementAction,
} from './bar.action';
import {
  BarButtonActionInterface,
  BarButtonInitState,
  BarElementActionInterface,
  BarElementInitState,
} from './bar.state';
// bar button reducer ----------------------------------------------------------------------------
const _barButtonReducer = createReducer(
  BarButtonInitState,
  on(RenameButtonAction, (state, action): BarButtonActionInterface => {
    return {
      ...state,
      name: action.name,
    };
  }),
  on(RenameElementAction, (state, action): BarButtonActionInterface => {
    return {
      ...state,
      element: action.element,
    };
  }),
  on(ChangeButtonDataAction, (state, action): BarButtonActionInterface => {
    return {
      ...state,
      icons: action.icons,
      texts: action.texts,
      clickeds: action.clickeds,
      displaeds: action.displaeds,
    };
  }),
  on(ChangeBarDataAction, (state, action): BarButtonActionInterface => {
    return {
      ...state,
      element: action.element,
      name: action.name,
      icons: action.icons,
      texts: action.texts,
      clickeds: action.clickeds,
      displaeds: action.displaeds,
    };
  }),
  on(RemoveNameButtonAction, (state, action): BarButtonActionInterface => {
    return {
      ...state,
      name: 'button',
    };
  }),
  on(RemoveFocusElementAction, (state, action): BarButtonActionInterface => {
    return {
      ...state,
      element: 'vide',
    };
  }),
  on(RemoveBarDataAction, (state, action): BarButtonActionInterface => {
    return {
      ...state,
      element: 'vide',
      name: 'button',
      icons: ['', ''],
      texts: ['', ''],
      displaeds: [false, false],
      clickeds: [false, false],
    };
  })
);
// Element body reducer -----------------------------------------------------------------------------------
/* const _barElementReducer = createReducer(
  BarElementInitState,
  on(RenameElementAction, (state, action): BarElementActionInterface => {
    return {
      ...state,
      name: action.name,
    };
  }),
  on(RemoveFocusElementAction, (state, action): BarElementActionInterface => {
    return {
      ...state,
      name: 'vide',
    };
  })
);
export function barElementReducer(state: any, action: Action) {
  return _barElementReducer(state, action);
}

*/

export function barButtonReducer(state: any, action: Action) {
  return _barButtonReducer(state, action);
}
