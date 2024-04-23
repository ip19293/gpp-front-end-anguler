// filter.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { setFilterAction } from './filter.actions';

export const initialState = {
  filter: '',
};

export const filterReducer = createReducer(
  initialState,
  on(setFilterAction, (state, { filter }) => ({ ...state, filter }))
);
