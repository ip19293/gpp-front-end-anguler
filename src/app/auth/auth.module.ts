import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { AuthComponent } from './components/auth/auth.component';
import { ForgetComponent } from './components/forget/forget.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, AuthComponent, ForgetComponent, ResetPasswordComponent],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
