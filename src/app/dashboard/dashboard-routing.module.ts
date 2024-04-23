import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'dashbord', pathMatch: 'full' },
      { path: 'dashbord', component: DashboardComponent },

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
