import { IconDefinition, IconName } from '@fortawesome/free-solid-svg-icons';

export interface INavbarData {
  routerLink: string;
  icon?: IconDefinition;
  label: string;
  expanded?: boolean;
  items?: INavbarData[];
}
