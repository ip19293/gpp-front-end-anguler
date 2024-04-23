import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { ProfesseurCoursComponent } from './components/professeur-cours/professeur-cours.component';
import { ProfesseurComponent } from './components/professeur/professeur.component';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'professeurs', component: ProfesseurComponent },
  { path: 'professeurs/:id/cours', component: ProfesseurCoursComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
