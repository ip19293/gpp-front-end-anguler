import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';

import { StoreModule } from '@ngrx/store';
import { usersReducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/effects';
import { ProfesseurComponent } from './components/professeur/professeur.component';
import { ProfesseurAddEditComponent } from './components/professeur-add-edit/professeur-add-edit.component';
import { ProfesseurCoursComponent } from './components/professeur-cours/professeur-cours.component';
import { UserAddEditComponent } from './components/user-add-edit/user-add-edit.component';

@NgModule({
  declarations: [
    UserComponent,
    ProfesseurComponent,
    ProfesseurAddEditComponent,
    ProfesseurCoursComponent,
    UserAddEditComponent,
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    NavbarModule,
    SidenavModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
})
export class UserModule {}
