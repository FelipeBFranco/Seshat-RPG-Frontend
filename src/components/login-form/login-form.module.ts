import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    PasswordModule,
    ToastModule,
    ReactiveFormsModule
  ],
  exports: [LoginFormComponent] // Export the component to make it available in other modules
})
export class LoginFormModule { }
