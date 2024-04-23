import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HommeComponent } from './homme/homme/homme.component';
import { ProfilModule } from './profil/profil.module';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'profil',
    loadChildren: () =>
      import('./profil/profil.module').then((module) => ProfilModule),
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: HommeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
