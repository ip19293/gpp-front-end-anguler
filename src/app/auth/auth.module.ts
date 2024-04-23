import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [SharedModule, AuthRoutingModule, NavbarModule, SidenavModule],
})
export class AuthModule {}
