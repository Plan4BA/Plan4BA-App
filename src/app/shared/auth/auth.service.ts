import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as  base64 from 'base-64';
import * as utf8 from 'utf8';
import { getString, setString, removeString } from '../data-store-util/data-store-util';
import { LoginData } from './login-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginData = new BehaviorSubject<LoginData>(undefined);

  constructor(
    private http: HttpClient,
    ) {
    // load token from storage
    const storedLoginData = getString('login');
    if (!!storedLoginData) {
      try {
        this.loginData.next(JSON.parse(storedLoginData));
      } catch (e) {
        removeString('login');
      }
    }
  }

  getLoginData(): BehaviorSubject<LoginData> {
    return this.loginData;
  }

  isLoggedIn(): boolean {
    const loginData = this.loginData.getValue();
    return !!loginData && !!loginData.token && !!loginData.validTo && loginData.validTo > (new Date()).getTime();
  }

  login(username: string, password: string): Observable<LoginData|HttpErrorResponse> {
    return this.http.get<LoginData>(
      environment.apiUrl + 'login',
      { headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.encode(utf8.encode(`${username}:${password}`))
      } }
    )
    .pipe(
      tap((data: LoginData) => this.loginData.next(data)),
      tap((data: LoginData) => {
        setString('login', JSON.stringify(data));
      }),
      catchError(this.handleErrors)
    );
  }

  logout(): void {
    this.loginData.next(undefined);
    removeString('login');
  }

  private handleErrors(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log(JSON.stringify(error));
    return throwError(error);
  }
}
