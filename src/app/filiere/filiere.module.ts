import { NgModule } from '@angular/core';
import { FiliereComponent } from './components/filiere/filiere.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { SharedModule } from '../shared/shared.module';
import { FiliereRoutingModule } from './filiere-routing.module';
import { FiliereDetailComponent } from './components/filiere-detail/filiere-detail.component';
import { AddEditElementComponent } from './components/add-edit-element/add-edit-element.component';
import { CategorieAddEditComponent } from './components/categorie-add-edit/categorie-add-edit.component';
import { FiliereAddEditComponent } from './components/filiere-add-edit/filiere-add-edit.component';

@NgModule({
  declarations: [
    FiliereComponent,
    CategorieComponent,
    FiliereDetailComponent,
    AddEditElementComponent,
    CategorieAddEditComponent,
    FiliereAddEditComponent,
  ],
  imports: [SharedModule, FiliereRoutingModule],
})
export class FiliereModule {}
