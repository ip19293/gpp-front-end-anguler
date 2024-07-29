import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultatComponent } from './components/resultat/resultat.component';
import { ResultatProfComponent } from './components/resultat-prof/resultat-prof.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { ParametresComponent } from './components/parametres/parametres.component';

const routes: Routes = [
  { path: 'parametres', component: ParametresComponent },
  { path: 'paiements', component: PaiementComponent },
  { path: 'resultats', component: ResultatComponent },
  { path: 'resultats/:id', component: ResultatProfComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaiementRoutingModule {}
