import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginFormModule } from '../../../components/login-form/login-form.module';
import { SignupFormModule } from '../../../components/signup-form/signup-form.module';
import { ForgotPasswordModule } from '../../../components/forgot-password/forgot-password-form.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    LoginFormModule,
    SignupFormModule,
    ForgotPasswordModule,
  ],
  exports: [
  ],
  providers: [],
})
export class LoginPageModule { }
