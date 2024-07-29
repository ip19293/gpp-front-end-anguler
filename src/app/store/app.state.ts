import { BarButtonActionInterface } from '../actionbar/store/bar.state';
import { FilterInterface } from '../filter/store/filter.state';
import { CoursInterface } from '../shared/types/cours.interface';
import { SideNavInterface } from '../sidenav/types/side-nav.interface';

export interface AppState {
  sidenav: SideNavInterface;
  filter: FilterInterface;
  button: BarButtonActionInterface;
  cours: CoursInterface;
}
