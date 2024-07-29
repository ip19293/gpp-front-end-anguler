import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProfilModule } from './profil/profil.module';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'profil',
    loadChildren: () =>
      import('./profil/profil.module').then((module) => ProfilModule),
  },
  /*   { path: '', redirectTo: '/', pathMatch: 'full' }, */
  //  { path: '**', component: HommeComponent /*  canActivate: [AuthGuard] */ },
  { path: 'not-found', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
