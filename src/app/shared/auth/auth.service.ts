import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError, filter, map } from 'rxjs/operators';
import * as  base64 from 'base-64';
import * as utf8 from 'utf8';

import { environment } from '../../../environments/environment';
import { getString, setString, removeString } from '../data-store-util/data-store-util';
import { LoginData } from './login-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey = 'login';
  private data: BehaviorSubject<LoginData>;

  constructor(
    private http: HttpClient,
    ) {
    // load data from storage
    let initialData: LoginData;
    try {
      const storedData: LoginData = JSON.parse(getString(this.storageKey));
      if (this.isDataValid(storedData)) {
        initialData = storedData;
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
    this.data = new BehaviorSubject<LoginData>(initialData);

    this.data.subscribe(data => {
      if (this.isDataValid(data)) {
        setString(this.storageKey, JSON.stringify(data));
      } else {
        removeString(this.storageKey);
      }
    });
  }

  getData(): BehaviorSubject<LoginData> {
    return this.data;
  }

  isLoggedIn(): boolean {
    const loginData = this.data.getValue();
    return this.isDataValid(loginData);
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
      map((data: LoginData) => {
        if (!this.isDataValid(data)) {
          throw new Error('Received login data is not valid!');
        }
        return data;
      }),
      tap((data: LoginData) => this.data.next(data)),
      catchError(this.handleErrors)
    );
  }

  logout(): void {
    this.data.next(undefined);
  }

  private isDataValid(data: LoginData): boolean {
    return !!data
      && typeof data.token === 'string'
      && Number.isInteger(data.userId)
      && typeof data.calDavToken === 'boolean'
      && Number.isInteger(data.validTo)
      && data.validTo > (new Date()).getTime();
  }

  private handleErrors(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log(JSON.stringify(error));
    return throwError(error);
  }
}
