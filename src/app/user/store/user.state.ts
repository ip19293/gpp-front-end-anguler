import { UserInterface } from 'src/app/shared/types/user.interface';
import { UserResponseInterface } from '../../shared/types/user-response.interface';

export enum UsersStateEnum {
  LOADING = 'Loading',
  LOADED = 'Loaded',
  ERROR = 'Error',
  INITIAL = 'Initial',
}
export interface UsersState {
  users?: UserResponseInterface[];
  errorMessage?: string;
  successMessage?: string;
  dataState?: UsersStateEnum;
  data?: UserInterface;
}
export const UsersInitState: UsersState = {
  users: [],
  errorMessage: '',
  successMessage: '',
  dataState: UsersStateEnum.INITIAL,
};
