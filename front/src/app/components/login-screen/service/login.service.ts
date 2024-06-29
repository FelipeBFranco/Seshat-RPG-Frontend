import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  loginRequest(email: string, senha: string) {
    return this.http.post(`${this.baseUrl}/auth/token`, {
      username: email,
      password: senha,
      grant_type: 'password'
    });
  }
}
