import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardProfComponent } from './components/dashboard-prof/dashboard-prof.component';
import { ProfGuard } from '../guard/prof.guard';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  {
    path: 'professeur',
    component: DashboardProfComponent,
    canActivate: [AuthGuard, ProfGuard],
    children: [
      { path: '', redirectTo: 'dashbord', pathMatch: 'full' },
      { path: 'dashbord', component: DashboardProfComponent },

      {
        path: '',
        loadChildren: () =>
          import('../homme/homme.module').then((m) => m.HommeModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../user/user.module').then((m) => m.UserModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../cours/cours.module').then((m) => m.CoursModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../paiement/paiement.module').then((m) => m.PaiementModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardProfRoutingModule {}
