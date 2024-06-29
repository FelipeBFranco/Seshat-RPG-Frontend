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
    this.servidor = this.servidorService.getServidor() + '/oauth/token';
    this.carregarToken();
  }

  public armazenarToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.jwtPayload = this.JwtHelper.decodeToken(token);
      localStorage.removeItem('token');
      localStorage.setItem('token', token);
    }
  }

  public carregarToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      if (token != null) {
        if (token.length > 1) {
          this.armazenarToken(token);
        }
      }
    }
  }

  public isAccessTokenInvalido(): boolean {
    const token = localStorage.getItem('token');

    return !token || this.JwtHelper.isTokenExpired(token);
  }

  public verificarTokenExpirado() {
    const token = localStorage.getItem('token');
    return this.JwtHelper.isTokenExpired(token);
  }

  public verificarTokenDefinido() {
    const token = localStorage.getItem('token');
    if (token != null) {
      return true;
    } else {
      return false;
    }
  }

  public temPermissao(permissao: string): any {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  public requisitarNovoAccessToken(): Promise<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YWRtaW46QWRNaU4=');
    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.servidor, body, { headers, withCredentials: true, responseType: 'json' })
      .toPromise()
      .then(response => {
        if (response) {
          this.armazenarToken(response.access_token);
        }
        return response;
      })
      .catch(response => {
        console.error('Erro ao renovar Token.', response);
        return response;
      });
  }

  public limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  public logout() {
    const headers = new HttpHeaders();

    const token = localStorage.getItem('token');
    if (token) {
      headers.set("Authorization", "Bearer " + token);
    }
    headers.set("Content-Type", "application/json");
    this.http.delete(this.servidorService.getServidor() + '/tokens/revoke', { headers }).toPromise()
      .then(() => {
        this.limparAccessToken();
        localStorage.clear();
        this.router.navigate(['/']);
      }).catch(() => {
        this.router.navigate(['/']);
      })

  }
}
