import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  loginRequest(formularioLogin: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, {
      email: formularioLogin.email,
      password: formularioLogin.password,
    });
  }
}
