import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetManagerComponent } from './components/sheet-manager/sheet-manager.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginScreenComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'sheet-manager',
    component: SheetManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
