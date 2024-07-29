import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { ProfesseurCoursComponent } from './components/professeur-cours/professeur-cours.component';
import { ProfesseurComponent } from './components/professeur/professeur.component';
import { ProfElementsComponent } from './components/prof-elements/prof-elements.component';
import { ProfEmploiComponent } from './components/prof-emploi/prof-emploi.component';
import { NewUserComponent } from './components/new-user/new-user.component';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'users/add', component: NewUserComponent },
  { path: 'professeurs', component: ProfesseurComponent },
  {
    path: 'professeurs/:id/cours',
    component: ProfesseurCoursComponent,
  },
  {
    path: 'professeurs/:id/emplois',
    component: ProfEmploiComponent,
  },
  {
    path: 'professeurs/:id',
    component: ProfElementsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
