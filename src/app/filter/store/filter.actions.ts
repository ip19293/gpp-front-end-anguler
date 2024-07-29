// filter.actions.ts
import { createAction, props } from '@ngrx/store';
export const setFilterAction = createAction(
  '[Filter] Set Input Filter Value',
  props<{ filter: string }>()
);
