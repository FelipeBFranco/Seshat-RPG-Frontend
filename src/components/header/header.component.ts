import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="flex justify-content-left mainHeader" >
      <div>
        <img src="assets/images/logo.png" alt="Seshat logo" />
        <p>SESHAT RPG MANAGER</p>
      </div>
    </div>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
