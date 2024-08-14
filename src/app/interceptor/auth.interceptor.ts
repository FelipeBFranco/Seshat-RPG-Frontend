import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('Intercepted! - Here is the request: ', request.url);
    const authToken = this.getAuthToken();
    // console.log('Auth Token: ', authToken); // Log the retrieved token
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`)
    });
    // console.log('Final Request Headers: ', authReq.headers.keys().map(key => `${key}: ${authReq.headers.get(key)}`)); // Log all headers
    return next.handle(authReq);
  }

  private getAuthToken(): string {
    // Retrieve your JWT token from storage (localStorage/sessionStorage)
    return localStorage.getItem('token') || '';
  }
}
