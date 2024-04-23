import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfilComponent } from './user-profil/user-profil.component';

const routes: Routes = [
  {
    path: '',
    children: [{ path: '', component: UserProfilComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilRoutingModule {}
