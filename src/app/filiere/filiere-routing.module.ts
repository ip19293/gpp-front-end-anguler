import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './components/categorie/categorie.component';
import { FiliereComponent } from './components/filiere/filiere.component';
import { FiliereDetailComponent } from './components/filiere-detail/filiere-detail.component';
import { FiliereEmploiComponent } from './components/filiere-emploi/filiere-emploi.component';

const routes: Routes = [
  { path: 'categories', component: CategorieComponent },
  { path: 'filieres', component: FiliereComponent },
  { path: 'filieres/:id', component: FiliereDetailComponent },
  { path: 'filieres/:id/emplois', component: FiliereEmploiComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiliereRoutingModule {}
