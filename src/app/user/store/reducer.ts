import { UserActions } from './actions';
import { UsersActionTypes } from './actions-type';
import { UsersInitState, UsersState, UsersStateEnum } from './user.state';

export function usersReducer(
  state: UsersState = UsersInitState,
  action: UserActions
): UsersState {
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
    default:
      return { ...state };
  }
}
