import { UserActions } from './actions';
import { UsersActionTypes } from './actions-type';
import { UsersInitState, UsersState, UsersStateEnum } from './user.state';

export function usersReducer(
  state: UsersState = UsersInitState,
  action: UserActions
) {
  switch (action.type) {
    case UsersActionTypes.GET_ALL_USERS:
      return { ...state, dataState: UsersStateEnum.LOADING };
    case UsersActionTypes.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        dataState: UsersStateEnum.LOADED,
        users: action.payload,
      };
    case UsersActionTypes.GET_ALL_USERS_ERROR:
      return {
        ...state,
        dataState: UsersStateEnum.ERROR,
        errorMessage: action.payload,
      };
    case UsersActionTypes.ADD_USER:
      return {
        ...state,
      };
    case UsersActionTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        successMessage: action.payload,
      };
    case UsersActionTypes.ADD_USER_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return { ...state };
  }
}
