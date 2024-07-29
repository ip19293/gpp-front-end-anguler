import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { UsersActionTypes } from './actions-type';
import {
  AddUserErrorAction,
  AddUserSuccessAction,
  GetAllUsersErrorAction,
  GetAllUsersSuccessAction,
} from './actions';

@Injectable()
export class UsersEffects {
  constructor(private servce: UserService, private effectActions: Actions) {}
  getAllUsersEffect: Observable<Action> = createEffect(() =>
    this.effectActions.pipe(
      ofType(UsersActionTypes.GET_ALL_USERS),
      mergeMap((action) => {
        return this.servce.getAllUsers().pipe(
          map((users) => new GetAllUsersSuccessAction(users)),
          catchError((err) => of(new GetAllUsersErrorAction(err.message)))
        );
      })
    )
  );
  AddUserEffect: Observable<Action> = createEffect(() =>
    this.effectActions.pipe(
      ofType(UsersActionTypes.ADD_USER),
      mergeMap((action) => {
        return this.servce.addUser(action).pipe(
          map((message) => new AddUserSuccessAction(message)),
          catchError((err) => of(new AddUserErrorAction(err.message)))
        );
      })
    )
  );
}
