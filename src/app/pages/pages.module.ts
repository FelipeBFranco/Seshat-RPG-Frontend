
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageModule } from './login-page/login-page.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    LoginPageModule,
    PagesRoutingModule,
    RouterModule,
    HeaderModule
  ],
  exports: [
  ],
  providers: [],
})
export class PagesModule { }
