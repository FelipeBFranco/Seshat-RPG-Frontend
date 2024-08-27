import { Injectable } from '@angular/core';
import { AuthResponse } from '../../../types/Auth-response';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  apiUrl: string = "http://localhost:8080/auth"

  constructor(private httpClient: HttpClient) { }

  signup(name: string, email: string, password: string) {
    return this.httpClient.post<AuthResponse>(this.apiUrl + "/register", { name, email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
      })
    )
  }
}
