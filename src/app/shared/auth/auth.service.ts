import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
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

  private _loginData: LoginData;

  constructor(
    private http: HttpClient,
    ) {
    // load token from storage
    const storedLoginData = getString('login');
    if (!!storedLoginData) {
      try {
        this._loginData = JSON.parse(storedLoginData);
      } catch (e) {
        removeString('login');
      }
    }
  }

  get loginData(): LoginData {
    return this._loginData;
  }

  isLoggedIn(): boolean {
    return !!this._loginData && !!this._loginData.token && !!this._loginData.validTo && this._loginData.validTo > (new Date()).getTime();
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
      tap((data: LoginData) => this._loginData = data),
      tap((data: LoginData) => {
        setString('login', JSON.stringify(data));
      }),
      catchError(this.handleErrors)
    );
  }

  logout(): void {
    this._loginData = undefined;
    removeString('login');
  }

  private handleErrors(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log(JSON.stringify(error));
    return throwError(error);
  }
}
