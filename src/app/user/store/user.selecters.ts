import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './user.state';

const getUserState = createFeatureSelector<UsersState>('users');

export const getUsers = createSelector(getUserState, (state) => {
  return state.users;
});
