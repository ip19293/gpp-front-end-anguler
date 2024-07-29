import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { ProfesseurComponent } from './components/professeur/professeur.component';
import { ProfesseurAddEditComponent } from './components/professeur-add-edit/professeur-add-edit.component';
import { ProfesseurCoursComponent } from './components/professeur-cours/professeur-cours.component';
import { UserAddEditComponent } from './components/user-add-edit/user-add-edit.component';
import { ActionbarModule } from '../actionbar/actionbar.module';
import { ProfCoursAddEditComponent } from './components/prof-cours-add-edit/prof-cours-add-edit.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { ProfElementsComponent } from './components/prof-elements/prof-elements.component';
import { ProfElementsAddEditComponent } from './components/prof-elements-add-edit/prof-elements-add-edit.component';
import { ProfEmploiComponent } from './components/prof-emploi/prof-emploi.component';

@NgModule({
  declarations: [
    UserComponent,
    ProfesseurComponent,
    ProfesseurAddEditComponent,
    ProfesseurCoursComponent,
    UserAddEditComponent,
    ProfCoursAddEditComponent,
    NewUserComponent,
    ProfElementsComponent,
    ProfElementsAddEditComponent,
    ProfEmploiComponent,
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    NavbarModule,
    SidenavModule,
    ActionbarModule,
  ],
})
export class UserModule {}
