import { NgModule } from '@angular/core';
import { FiliereComponent } from './components/filiere/filiere.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { SharedModule } from '../shared/shared.module';
import { FiliereRoutingModule } from './filiere-routing.module';
import { FiliereDetailComponent } from './components/filiere-detail/filiere-detail.component';
import { AddEditElementComponent } from './components/add-edit-element/add-edit-element.component';
import { CategorieAddEditComponent } from './components/categorie-add-edit/categorie-add-edit.component';
import { FiliereAddEditComponent } from './components/filiere-add-edit/filiere-add-edit.component';
import { FiliereEmploiComponent } from './components/filiere-emploi/filiere-emploi.component';
import { AddEditEmploiComponent } from './components/add-edit-emploi/add-edit-emploi.component';
import { GroupeAffectationComponent } from './components/groupe-affectation/groupe-affectation.component';

@NgModule({
  declarations: [
    FiliereComponent,
    CategorieComponent,
    FiliereDetailComponent,
    AddEditElementComponent,
    AddEditEmploiComponent,
    CategorieAddEditComponent,
    FiliereAddEditComponent,
    FiliereEmploiComponent,
    GroupeAffectationComponent,
  ],
  imports: [SharedModule, FiliereRoutingModule],
})
export class FiliereModule {}
