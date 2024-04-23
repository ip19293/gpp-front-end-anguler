import { Action } from '@ngrx/store';
import { UsersActionTypes } from './actions-type';
import { UserResponseInterface } from 'src/app/shared/types/user-response.interface';

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

export type UserActions =
  | GetAllUsersAction
  | GetAllUsersSuccessAction
  | GetAllUsersErrorAction;
