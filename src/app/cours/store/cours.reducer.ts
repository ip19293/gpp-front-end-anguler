import { Action } from '@ngrx/store';
import { AddCoursAction, CoursActionTypes } from './cours.actions';
import { CoursInitState, CoursState } from './cours.state';

export function coursReducer(state: any = CoursInitState, action: any) {
  switch (action.type) {
    case CoursActionTypes.ADD_COURS:
      return {
        ...state,
      };
    case CoursActionTypes.ADD_COURS_SUCCESS:
      return {
        ...state,
        message: action,
        status: action.p,
      };
    case CoursActionTypes.ADD_COURS_ERROR:
      return {
        ...state,
        message: action.cours.message,
        status: action.payload.status,
      };
    default:
      return { ...state };
  }
}
