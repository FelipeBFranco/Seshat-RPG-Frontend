import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheetManagerComponent } from './sheet-manager.component';


import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button'; // import ButtonModule



@NgModule({
  declarations: [SheetManagerComponent],
  imports: [
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule // add ButtonModule to imports
  ]
})
export class SheetManagerModule { }
