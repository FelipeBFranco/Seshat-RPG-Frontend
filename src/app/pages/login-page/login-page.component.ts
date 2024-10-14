import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  template: `
    <div class="login-page">
      <app-login-form></app-login-form>
    </div>`,
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent { }
