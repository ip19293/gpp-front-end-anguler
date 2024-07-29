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

export const navbarData: INavbarData[] = [
  {
    routerLink: '/admin/homme',
    icon: faHome,
    label: 'Dashbord',
  },

  {
    routerLink: '/admin/users',
    icon: faUsersGear,
    label: 'Utilisateurs',
  },
  {
    icon: faUsersRectangle,
    routerLink: '/admin/professeurs',
    label: 'Enseignants',
  },

  {
    routerLink: '/admin/categories',
    icon: faShapes,
    label: 'Catégories',
  },
  {
    routerLink: '/admin/filieres',
    icon: faBookOpenReader,
    label: 'Filières',
  },
  {
    routerLink: '/admin/emplois',
    icon: faClock,
    label: 'Emploi du temps',
  },
  { routerLink: '/admin/cours', icon: faCalendarCheck, label: 'Cours' },
  {
    routerLink: '/admin/paiements',
    icon: faHandHoldingDollar,
    label: 'Paiements',
    items: [
      {
        routerLink: '/admin/resultats',
        label: 'Résultats',
      },
      { routerLink: '/admin/paiements', label: 'Liste de paiements' },
    ],
  },
  /*  {
    routerLink: '/admin/parametres',
    icon: faGear,
    label: 'Paramètres',
  }, */
];
