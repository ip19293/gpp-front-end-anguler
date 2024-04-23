import { NgModule } from '@angular/core';
import { CoursComponent } from './components/cours/cours.component';
import { SharedModule } from '../shared/shared.module';
import { CoursRoutingModule } from './cours-routing.module';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { EmploiComponent } from './components/emploi/emploi.component';

@NgModule({
  declarations: [CoursComponent, EmploiComponent],
  imports: [SharedModule, CoursRoutingModule, NavbarModule, SidenavModule],
})
export class CoursModule {}
