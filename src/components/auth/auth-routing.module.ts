import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginPageComponent } from '../../app/pages/login-page/login-page.component';
import { LoginFormComponent } from '../login-form/login-form.component';

const routes: Routes = [
  {
    path: '', component: LoginPageComponent, children: [
      {
        path: 'login', component: LoginFormComponent,
      },
      // {
      //   path: 'signup', component: AuthComponent,
      // },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
