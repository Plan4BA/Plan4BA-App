import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

import { TokenData } from './token-data.model';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  authService: AuthService;
  router: Router;

  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.indexOf(environment.apiUrl) === 0) {
      if (request.url.indexOf(environment.apiUrl + 'token') === 0) {
        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              if (!this.router) {
                this.router = this.injector.get(Router);
              }
              this.authService.logout();
              this.router.navigate(['/login']);
            }
            return throwError(error);
          })
        );
      } else if (
        request.headers.has('Authorization') ||
        request.url.indexOf(environment.apiUrl + 'info') === 0
      ) {
        return next.handle(request);
      } else {
        // this dynamic injection is required to not create a cyclic dependency
        // https://github.com/angular/angular/issues/18224
        if (!this.authService) {
          this.authService = this.injector.get(AuthService);
        }
        return this.authService.authTokenData.pipe(
          filter(tokenData => !!tokenData),
          switchMap(tokenData => {
            return next.handle(this.addAuthToken(request, tokenData.token));
          }),
          catchError((error: any) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
              this.authService.refreshAuthToken();
              return this.authService.authTokenData.pipe(
                filter(tokenData => !!tokenData),
                switchMap(tokenData => {
                  return next.handle(
                    this.addAuthToken(request, tokenData.token)
                  );
                })
              );
            } else {
              return throwError(error);
            }
          })
        );
      }
    } else {
      return next.handle(request);
    }
  }

  private addAuthToken(
    request: HttpRequest<any>,
    authToken: string
  ): HttpRequest<any> {
    if (!authToken) {
      return request;
    }
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }
}
