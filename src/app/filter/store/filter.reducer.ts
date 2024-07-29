// filter.reducer.ts
import { Action, createReducer, on } from '@ngrx/store';
import { setFilterAction } from './filter.actions';
import { FilterInitState } from './filter.state';
const _filterReducer = createReducer(
  FilterInitState,
  on(setFilterAction, (state, action) => {
    return {
      ...state,
      filterValue: action.filter,
    };
  })
);

export function filterReducer(state: any, action: Action) {
  return _filterReducer(state, action);
}
