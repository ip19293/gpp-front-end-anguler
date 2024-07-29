import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../guard/auth.guard';
import { HommeComponent } from '../homme/components/homme/homme.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'homme', pathMatch: 'full' },

      { path: 'homme', component: HommeComponent },

      {
        path: '',
        loadChildren: () =>
          import('../filiere/filiere.module').then((m) => m.FiliereModule),
      },
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
      { path: '**', redirectTo: 'homme', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
