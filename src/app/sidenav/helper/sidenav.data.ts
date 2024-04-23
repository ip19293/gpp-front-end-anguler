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
  faCalendarCheck,
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
  /*
  {
    routerLink: 'emplois',
    icon: faCalendarDays,
    label: 'Emploi du temps',
     items: [
      { routerLink: 'emplois', label: 'Liste enregistré' },
      { routerLink: 'emplois/add-edit', label: 'Ajouter un' },
      {
        routerLink: 'cours',
        label: 'Cours',
        items: [
          { routerLink: 'cours', label: 'Liste enregistré' },
          { routerLink: 'cours/list-non-signe', label: 'Liste non signé' },
          { routerLink: 'cours/list-non-signe', label: 'Nouvel cours' },
        ],
      },
    ],
  },
   */
  { routerLink: '/admin/cours', icon: faCalendarCheck, label: 'Cours' },
  /*  {
    routerLink: 'paiement',
    icon: faHandHoldingDollar,
    label: 'Paiement',
    items: [
      { routerLink: 'paiement', label: 'Les cotisations des enseignants' },
      { routerLink: 'paiement/liste-cree', label: 'Paiements' },
    ],
  }, */
  /*   {
    routerLink: 'settings',
    icon: faGear,
    label: 'Paramètres',
    expanded: true,
    items: [
      {
        routerLink: 'settings/profil',
        label: 'Profil',
      },
      {
        routerLink: 'settings/customize',
        label: 'Personnaliser',
      },
    ],
  }, */
];
