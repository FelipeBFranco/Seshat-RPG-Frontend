import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  template: `
    <div class="login-page">
      <div class="routerLogin">
        <router-outlet></router-outlet>
      </div>
    </div>`,
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent { }
