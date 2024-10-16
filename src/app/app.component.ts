import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import the correct module for Router
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <p-toast key="global-toast"></p-toast>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  title = 'RPGSheetBR';
  constructor(private router: Router, private messageService: MessageService) { }
  ngOnInit() {
    // this.router.navigate(['/auth']);
  }
  // constructor(private tokenService: TokenService, private router: Router) { }

  // ngOnInit() {
  //   if (this.tokenService.isExpired()) {
  //     this.tokenService.clearAccess();
  //     return this.router.navigate(['/auth']);
  //   }

  //   if (!this.tokenService.isDefined()) {
  //     this.tokenService.clearAccess();
  //     return this.router.navigate(['/auth']);
  //   }

  //   if (this.tokenService.isTokenValid()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/auth']);
  //   }

  //   return;
  // }
}
