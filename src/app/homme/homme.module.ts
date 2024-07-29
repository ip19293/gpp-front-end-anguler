import { NgModule } from '@angular/core';
import { HommeComponent } from './components/homme/homme.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HommeRoutingModule } from './homme-routing.module';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { StatistiqueComponent } from './components/statistique/statistique.component';
import { ProfCoursGraphComponent } from './components/prof-cours-graph/prof-cours-graph.component';

@NgModule({
  declarations: [HommeComponent, StatistiqueComponent, ProfCoursGraphComponent],
  imports: [SharedModule, HommeRoutingModule, NavbarModule, SidenavModule],
})
export class HommeModule {}
