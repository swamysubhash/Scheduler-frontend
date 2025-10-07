import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Alerts } from './alerts';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private alert:Alerts) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // ✅ Get JWT authToken from sessionStorage
    const authToken = sessionStorage.getItem('authToken');

    // ✅ Clone request and add Authorization header if authToken exists
    const cloned = authToken
      ? req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } })
      : req;

    return next.handle(cloned).pipe(
      // ✅ Handle unauthorized errors globally
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          console.warn('Unauthorized! Redirecting to login...');
          this.alert.show(error.error?.message || 'Session expired. Please log in again.', 'error');
          sessionStorage.removeItem('authToken');
          this.router.navigate(['/login']);

        }
        return throwError(() => error);
      })
    );
  }
}
