import {
  faHome,
  faUsersGear,
  faGear,
  faRightToBracket,
  faCoins,
  faStamp,
  faShapes,
  faChartBar,
  faBookOpen,
  faHandHoldingDollar,
  faCalendarDay,
  faCalendarDays,
  faSitemap,
  faBookOpenReader,
  faSignOut,
  faCogs,
  faMortarBoard,
  faUsersBetweenLines,
  faUsersRectangle,
  faClock,
  faGraduationCap,
  faClipboardList,
  faCalendarCheck,
  faList,
  faBook,
  faFileAlt,
  faCreditCard,
  faCog,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons';
import { INavbarData } from '../types/side-nav-item-interface';

export const navbarProfData: INavbarData[] = [
  {
    routerLink: '/professeur/homme',
    icon: faHome,
    label: 'Dashbord',
  },
  {
    routerLink: '/professeur/emploi',
    icon: faClock,
    label: 'Emploi du temps',
  },
  {
    routerLink: `/professeur/professeurs/${localStorage.getItem(
      'prof_id'
    )}/cours`,
    icon: faList,
    label: 'Cours',
  },
  {
    routerLink: '/professeur/paiements',
    icon: faCreditCard,
    label: 'Paiements',
  },
  {
    routerLink: `/professeur/professeurs/${localStorage.getItem('prof_id')}`,
    icon: faBriefcase,
    label: 'Elements',
  },
];
