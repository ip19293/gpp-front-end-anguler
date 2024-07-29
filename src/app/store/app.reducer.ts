import { barButtonReducer } from '../actionbar/store/bar.reducer';
import { coursReducer } from '../cours/store/cours.reducer';
import { filterReducer } from '../filter/store/filter.reducer';
import { sideNavReducer } from '../sidenav/store/reducer';

export const appReducer = {
  sidenav: sideNavReducer,
  filter: filterReducer,
  button: barButtonReducer,
  cours: coursReducer,
};
