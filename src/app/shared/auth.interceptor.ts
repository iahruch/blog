import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {AuthService} from "../admin/shared/services/auth.service";
import {catchError, delay} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {


    if( this.authService.isAuthenticated()) {
      const cloneRequest = request.clone({
        setParams: {
          auth: this.authService.token
        }
      })
      return next.handle(cloneRequest)
        .pipe(
          catchError( (error: HttpErrorResponse) => {
            console.log('[Interceptor error]: ', error);
            if(error.status === 401) {
              this.authService.logout();
              this.router.navigate(['/admin','login'], {
                queryParams: {
                  authFailed: true
                }
              })
            }
            return throwError(error);
          }),
          delay(1000)
        );
    }
  }
}
