/* import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { CoursService } from '../services/cours.service';
import {
  AddCoursErrorAction,
  AddCoursSuccessAction,
  CoursActionTypes,
} from './cours.actions';

@Injectable()
export class UsersEffects {
  constructor(private servce: CoursService, private effectActions: Actions) {}
  AddCoursEffect: Observable<Action> = createEffect(() =>
    this.effectActions.pipe(
      ofType(CoursActionTypes.ADD_COURS),
      mergeMap((action) => {
        return this.servce.addCours(action).pipe(
          map((message) => new AddCoursSuccessAction(message)),
          catchError((err) => of(new AddCoursErrorAction(err.message)))
        );
      })
    )
  );
}
 */
