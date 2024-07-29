import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionbarComponent } from './components/actionbar/actionbar.component';

@NgModule({
  declarations: [ActionbarComponent],
  imports: [SharedModule],
  exports: [ActionbarComponent],
})
export class ActionbarModule {}
