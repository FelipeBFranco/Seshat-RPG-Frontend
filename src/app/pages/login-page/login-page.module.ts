import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginFormModule } from '../../../components/login-form/login-form.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    LoginFormModule // Import the LoginFormModule
  ]
})
export class LoginPageModule { }
