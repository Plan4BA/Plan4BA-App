import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError, filter, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { TokenData } from './token-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn: BehaviorSubject<boolean>;
  private storageKeyLogin = 'login';
  private _refreshTokenData: BehaviorSubject<TokenData>;
  private _authTokenData: BehaviorSubject<TokenData>;
  private refreshTokenRunning = false;

  constructor(
    private http: HttpClient,
    ) {
    // load data from storage
    let initialRefreshTokenData: TokenData;
    try {
      const storedRefreshData: TokenData = JSON.parse(localStorage.getItem(this.storageKeyLogin));
      if (this.isTokenDataValid(storedRefreshData)) {
        initialRefreshTokenData = storedRefreshData;
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
    this._refreshTokenData = new BehaviorSubject<TokenData>(initialRefreshTokenData);
    this._authTokenData = new BehaviorSubject<TokenData>(null);
    this._isLoggedIn = new BehaviorSubject<boolean>(!!initialRefreshTokenData);

    this._refreshTokenData.subscribe(refreshTokenData => {
      if (this.isTokenDataValid(refreshTokenData)) {
        this._isLoggedIn.next(true);
        localStorage.setItem(this.storageKeyLogin, JSON.stringify(refreshTokenData));
        this.refreshAuthToken();
      } else {
        this._isLoggedIn.next(false);
        localStorage.removeItem(this.storageKeyLogin);
        this._authTokenData.next(null);
      }
    });
  }

  get isLoggedIn(): BehaviorSubject<boolean> {
    return this._isLoggedIn;
  }

  get refreshTokenData(): BehaviorSubject<TokenData> {
    return this._refreshTokenData;
  }

  get authTokenData(): BehaviorSubject<TokenData> {
    return this._authTokenData;
  }

  login(username: string, password: string, storeHash: boolean): Observable<TokenData|HttpErrorResponse> {
    return this.http.get<TokenData>(
      environment.apiUrl + 'login',
      { headers: {
        'Content-Type': 'application/json',
        'StoreHash': storeHash ? 'true' : 'false',
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      } }
    )
    .pipe(
      map((refreshTokenData: TokenData) => {
        if (!this.isTokenDataValid(refreshTokenData)) {
          throw new Error('Received login data is not valid!');
        }
        return refreshTokenData;
      }),
      tap((refreshTokenData: TokenData) => this._refreshTokenData.next(refreshTokenData)),
      catchError(this.handleErrors)
    );
  }

  refreshAuthToken() {
    if (!this.refreshTokenRunning && this.isTokenDataValid(this._refreshTokenData.getValue())) {
      this.refreshTokenRunning = true;
      this._authTokenData.next(null);
      const refreshAuthTokenSub = this.http.get<TokenData>(
        environment.apiUrl + 'token',
        { headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._refreshTokenData.getValue().token}`
        } }
      )
      .pipe(
        map((tokenData: TokenData) => {
          this.refreshTokenRunning = false;
          if (!this.isTokenDataValid(tokenData)) {
            throw new Error('Received token data is not valid!');
          }
          return tokenData;
        }),
        tap((tokenData: TokenData) => this._authTokenData.next(tokenData)),
        catchError(error => {
          this.refreshTokenRunning = false;
          return this.handleErrors(error);
        })
      ).subscribe(() => refreshAuthTokenSub.unsubscribe());
    }
  }

  logout(): void {
    this._refreshTokenData.next(null);
  }

  private isTokenDataValid(tokenData: TokenData): boolean {
    return !!tokenData
      && typeof tokenData.token === 'string'
      && Number.isInteger(tokenData.userId)
      && typeof tokenData.calDavToken === 'boolean'
      && Number.isInteger(tokenData.validTo)
      && tokenData.validTo > (new Date()).getTime();
  }

  private handleErrors(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log(JSON.stringify(error));
    return throwError(error);
  }
}
