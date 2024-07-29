import { NgModule } from '@angular/core';

import { BodyComponent } from './components/body/body.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { ActionbarModule } from '../actionbar/actionbar.module';
import { DashboardProfComponent } from './components/dashboard-prof/dashboard-prof.component';
import { DashboardProfRoutingModule } from './dashoard-prof-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfInterceptor } from '../interceptor/prof.interceptor';

@NgModule({
  declarations: [DashboardProfComponent, BodyComponent],
  imports: [
    SharedModule,
    DashboardProfRoutingModule,
    NavbarModule,
    SidenavModule,
    ActionbarModule,
  ],
  providers: [],
})
export class DashboardProfModule {}
