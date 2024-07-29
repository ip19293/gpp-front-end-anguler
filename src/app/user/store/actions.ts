import { Action } from '@ngrx/store';
import { UsersActionTypes } from './actions-type';
import { UserResponseInterface } from 'src/app/shared/types/user-response.interface';

//get users actions-----------------------------------------------------
export class GetAllUsersAction implements Action {
  type: UsersActionTypes = UsersActionTypes.GET_ALL_USERS;
  constructor(public payload: any) {}
}
export class GetAllUsersSuccessAction implements Action {
  type: UsersActionTypes = UsersActionTypes.GET_ALL_USERS_SUCCESS;
  constructor(public payload: UserResponseInterface[]) {}
}
export class GetAllUsersErrorAction implements Action {
  type: UsersActionTypes = UsersActionTypes.GET_ALL_USERS_ERROR;
  constructor(public payload: string) {}
}
//add user actions-----------------------------------------------------
export class AddUserAction implements Action {
  type: UsersActionTypes = UsersActionTypes.ADD_USER;
  constructor(public payload: any) {}
}
export class AddUserSuccessAction implements Action {
  type: UsersActionTypes = UsersActionTypes.GET_ALL_USERS_SUCCESS;
  constructor(public payload: string) {}
}
export class AddUserErrorAction implements Action {
  type: UsersActionTypes = UsersActionTypes.GET_ALL_USERS_ERROR;
  constructor(public payload: string) {}
}
//-----------------------------------------------------------------------
export class FocusElementAction implements Action {
  type: UsersActionTypes = UsersActionTypes.FOCUS_ELEMENT;
  constructor(public payload: string) {}
}

export type UserActions =
  | GetAllUsersAction
  | GetAllUsersSuccessAction
  | GetAllUsersErrorAction
  | AddUserAction
  | AddUserSuccessAction
  | AddUserErrorAction
  | FocusElementAction;
