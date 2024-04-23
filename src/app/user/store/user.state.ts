import { UserResponseInterface } from '../../shared/types/user-response.interface';

export enum UsersStateEnum {
  LOADING = 'Loading',
  LOADED = 'Loaded',
  ERROR = 'Error',
  INITIAL = 'Initial',
}
export interface UsersState {
  users: UserResponseInterface[];
  errorMessage: string;
  dataState: UsersStateEnum;
}
export const UsersInitState: UsersState = {
  users: [],
  errorMessage: '',
  dataState: UsersStateEnum.INITIAL,
};
