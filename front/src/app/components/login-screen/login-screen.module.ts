import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button'; // import ButtonModule

import { LoginScreenComponent } from './login-screen.component';

@NgModule({
  declarations: [
    LoginScreenComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule // add ButtonModule to imports
  ]
})
export class LoginScreenModule { }
