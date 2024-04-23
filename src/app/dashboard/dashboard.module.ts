import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BodyComponent } from './components/body/body.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { HommeModule } from '../homme/homme.module';
import { UserModule } from '../user/user.module';
import { CoursModule } from '../cours/cours.module';
import { FiliereModule } from '../filiere/filiere.module';

@NgModule({
  declarations: [DashboardComponent, BodyComponent],
  imports: [
    SharedModule,
    HommeModule,
    UserModule,
    CoursModule,
    FiliereModule,
    DashboardRoutingModule,
    NavbarModule,
    SidenavModule,
  ],
})
export class DashboardModule {}
