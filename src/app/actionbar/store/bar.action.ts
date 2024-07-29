import { createAction, props } from '@ngrx/store';

export enum BarActionTypes {
  RENAME_BUTTON = '[BarAction] Rename button Action',
  ADD_FOCUS = '[BarAction]  Focus Element',
  REMOVE_FOCUS = '[BarAction] Remove Focus Element',
  REMOVE_NAME_BUTTON = '[BarAction] Remove Button Name',
  CHANGE_BUTTON_DATA = '[BarAction] Change button  data',
  CHANGE_BAR_DATA = '[BarAction] Change button  data',
  REMOVE_BAR_DATA = '[BarAction] Remove button  data',
}

export const RenameButtonAction = createAction(
  BarActionTypes.RENAME_BUTTON,
  props<{ name: string }>()
);

export const RenameElementAction = createAction(
  BarActionTypes.ADD_FOCUS,
  props<{ element: string }>()
);

export const ChangeButtonDataAction = createAction(
  BarActionTypes.CHANGE_BUTTON_DATA,
  props<{
    texts: string[];
    icons: string[];
    displaeds: boolean[];
    clickeds: boolean[];
  }>()
);
export const ChangeBarDataAction = createAction(
  BarActionTypes.CHANGE_BAR_DATA,
  props<{
    element: string;
    name: string;
    texts: string[];
    icons: string[];
    displaeds: boolean[];
    clickeds: boolean[];
  }>()
);

export const RemoveFocusElementAction = createAction(
  BarActionTypes.REMOVE_FOCUS
);
export const RemoveNameButtonAction = createAction(
  BarActionTypes.REMOVE_NAME_BUTTON
);
export const RemoveBarDataAction = createAction(BarActionTypes.REMOVE_BAR_DATA);
