import { Action, createAction, props } from '@ngrx/store';
import { CoursInterface } from 'src/app/shared/types/cours.interface';

export enum CoursActionTypes {
  ADD_COURS = '[CoursAction] Add  Cours',
  ADD_COURS_SUCCESS = '[CoursAction] Add  Cours Success',
  ADD_COURS_ERROR = '[CoursAction] Add  Error',
}
//add  actions-----------------------------------------------------
export const AddCoursAction = createAction(
  CoursActionTypes.ADD_COURS,
  props<{ cours: CoursInterface }>()
);
export const AddCoursSuccessAction = createAction(
  CoursActionTypes.ADD_COURS_SUCCESS,
  props<{ cours: CoursInterface }>()
);
export const AddCoursErrorAction = createAction(
  CoursActionTypes.ADD_COURS_ERROR,
  props<{ cours: CoursInterface }>()
);
