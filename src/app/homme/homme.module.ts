import { NgModule } from '@angular/core';
import { HommeComponent } from './homme/homme.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HommeRoutingModule } from './homme-routing.module';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';

@NgModule({
  declarations: [HommeComponent],
  imports: [SharedModule, HommeRoutingModule, NavbarModule, SidenavModule],
})
export class HommeModule {}
