import { NgModule } from '@angular/core';

import { UserProfilComponent } from './user-profil/user-profil.component';
import { SharedModule } from '../shared/shared.module';
import { ProfilRoutingModule } from './profil-routing.module';

@NgModule({
  declarations: [UserProfilComponent],
  imports: [SharedModule, ProfilRoutingModule],
})
export class ProfilModule {}
