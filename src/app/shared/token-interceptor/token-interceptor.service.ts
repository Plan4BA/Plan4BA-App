import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, filter } from 'rxjs/operators';

import { TokenData } from '../auth/token-data.model';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  authService: AuthService;

  constructor(private injector: Injector) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.headers.has('Authorization')
      || request.url.indexOf(environment.apiUrl + 'info') === 0
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
                return next.handle(this.addAuthToken(request, tokenData.token));
              })
            );
          } else {
            return throwError(error);
          }
        })
      );
    }
  }

  private addAuthToken(request: HttpRequest<any>, authToken: string): HttpRequest<any> {
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
