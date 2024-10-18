import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../../app/pages/login-page/login-page.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { SignupFormComponent } from '../signup-form/signup-form.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password-form.component';

const routes: Routes = [
  {
    path: '', component: LoginPageComponent, children: [
      {
        path: 'login', component: LoginFormComponent,
      },
      {
        path: 'signup', component: SignupFormComponent,
      },
      {
        path: 'forgot-password', component: ForgotPasswordComponent,
      },
      {
        path: 'reset-password', loadChildren: () => import('../reset-password/reset-password-form.module').then(m => m.ResetPasswordModule)
      },
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
