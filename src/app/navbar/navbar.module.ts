import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavbarComponent } from './navbar.component';
import { FilterModule } from '../filter/filter.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [SharedModule, FilterModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
