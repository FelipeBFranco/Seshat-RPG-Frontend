import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { LogoutButtonComponent } from './logout-button.component';

@NgModule({
  declarations: [LogoutButtonComponent],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [LogoutButtonComponent]
})
export class LogoutModule { }
