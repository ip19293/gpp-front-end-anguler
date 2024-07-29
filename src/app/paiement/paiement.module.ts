import { NgModule } from '@angular/core';
import { PaiementComponent } from './components/paiement/paiement.component';
import { PaiementRoutingModule } from './paiement-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ResultatComponent } from './components/resultat/resultat.component';
import { ResultatProfComponent } from './components/resultat-prof/resultat-prof.component';
import { AddEditPaiementComponent } from './components/add-edit-paiement/add-edit-paiement.component';
import { ChangePeriodeDialogComponent } from './components/dialogs/change-periode-dialog/change-periode-dialog.component';
import { MessageRefuseDialogComponent } from './components/dialogs/message-refuse-dialog/message-refuse-dialog.component';
import { ParametresComponent } from './components/parametres/parametres.component';

@NgModule({
  declarations: [
    PaiementComponent,
    ResultatComponent,
    ResultatProfComponent,
    AddEditPaiementComponent,
    ChangePeriodeDialogComponent,
    MessageRefuseDialogComponent,
    ParametresComponent,
  ],
  imports: [SharedModule, PaiementRoutingModule],
})
export class PaiementModule {}
