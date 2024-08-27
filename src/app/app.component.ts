import { Component, OnInit } from '@angular/core';
import { TokenService } from './components/shared/services/token.service';
import { Router } from '@angular/router'; // Import the correct module for Router

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'RPGSheetBR';
  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    // if (this.tokenService.isExpired()) {
    //   this.tokenService.clearAccess();
    //   return this.router.navigate(['/auth']);
    // }

    // if (!this.tokenService.isDefined()) {
    //   this.tokenService.clearAccess();
    //   return this.router.navigate(['/auth']);
    // }

    // if (this.tokenService.isTokenValid()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/auth']);
    // }

    return;
  }
}
