import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password-form.component';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { RouterModule, Routes } from '@angular/router';
import { DividerModule } from 'primeng/divider';

const routes: Routes = [
  {
    path: '', component: ResetPasswordComponent
  }]

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    PasswordModule,
    ToastModule,
    ReactiveFormsModule,
    DividerModule,
    RouterModule.forChild(routes)
  ],
  exports: [ReactiveFormsModule] // Export the component to make it available in other modules
})
export class ResetPasswordModule { }
