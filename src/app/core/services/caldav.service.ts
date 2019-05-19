import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthService } from '@app/core/services/auth.service';
import { CoreModule } from '@app/core/core.module';
import { TokenData } from '../models/token-data.model';

@Injectable({
  providedIn: CoreModule
})
export class CaldavService {
  private storageKey = 'caldav';
  private data: BehaviorSubject<TokenData>;
  private version = 1;

  constructor(private http: HttpClient, private authService: AuthService) {
    // load data from storage
    let initialData: TokenData;
    try {
      const storedData: TokenData = JSON.parse(
        localStorage.getItem(this.storageKey)
      );
      if (
        parseInt(localStorage.getItem(`${this.storageKey}.version`), 0) ===
        this.version
      ) {
        initialData = storedData;
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
    this.data = new BehaviorSubject<TokenData>(initialData);

    this.data.subscribe(data => {
      if (!!data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        localStorage.setItem(
          `${this.storageKey}.version`,
          this.version.toString()
        );
      } else {
        localStorage.removeItem(this.storageKey);
      }
    });

    this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        const loadDataSubscription = this.loadData().subscribe(() =>
          loadDataSubscription.unsubscribe()
        );
      } else {
        this.data.next(null);
      }
    });
  }

  getData(): BehaviorSubject<TokenData> {
    return this.data;
  }

  loadData(): Observable<TokenData | HttpErrorResponse> {
    return this.http
      .get<TokenData>(environment.apiUrl + 'user/caldavToken', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .pipe(
        tap((data: TokenData) => this.data.next(data)),
        catchError(this.handleErrors)
      );
  }

  private handleErrors(
    error: HttpErrorResponse
  ): Observable<HttpErrorResponse> {
    console.log(JSON.stringify(error));
    return throwError(error);
  }
}
