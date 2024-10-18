import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { SignupFormComponent } from './signup-form.component';

@NgModule({
  declarations: [SignupFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    PasswordModule,
    ToastModule
  ],
  exports: [SignupFormComponent] // Export the component to make it available in other modules
})
export class SignupFormModule { }
