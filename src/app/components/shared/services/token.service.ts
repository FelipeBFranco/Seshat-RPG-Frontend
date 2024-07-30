import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ServidorService } from './servidor.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private servidor: string;
  private jwtPayload: any;

  constructor(
    private http: HttpClient,
    private JwtHelper: JwtHelperService,
    private servidorService: ServidorService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.servidor = this.servidorService.getServidor() + '/auth/token';
    this.loadToken();
  }

  public storeToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.jwtPayload = this.JwtHelper.decodeToken(token);
      localStorage.setItem('token', token);
    }
  }

  public loadToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.storeToken(token);
      }
    }
  }

  public isTokenValid(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return token != null && !this.JwtHelper.isTokenExpired(token);
    }
    return false;
  }

  public isExpired(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return this.JwtHelper.isTokenExpired(token);
    }
    return true;
  }

  public isDefined(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return token != null;
    }
    return false;
  }

  public hasPermission(permissao: string): boolean {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  public requestNewAccess(): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic YWRtaW46QWRNaU4='
    });
    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.servidor, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        if (response && response.access_token) {
          this.storeToken(response.access_token);
        }
        return response;
      })
      .catch(error => {
        console.error('Erro ao renovar Token.', error);
        return Promise.reject(error);
      });
  }

  public clearAccess(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.jwtPayload = null;
  }

  public logout(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', 'Bearer ' + token);
    }

    this.http.delete(this.servidorService.getServidor() + '/tokens/revoke', { headers })
      .toPromise()
      .then(() => {
        this.clearAccess();
        localStorage.clear();
        this.router.navigate(['/']);
      })
      .catch(() => {
        this.router.navigate(['/']);
      });
  }
}
