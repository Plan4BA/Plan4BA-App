import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { getString, removeString, setString } from '../data-store-util/data-store-util';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { TokenData } from '../auth/token-data.model';
import { University } from './university.model';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  private storageKey = 'university';
  private data: BehaviorSubject<University>;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    ) {
    // load data from storage
    let initialData: University;
    try {
      const storedData: University = JSON.parse(getString(this.storageKey));
      if (this.isDataValid(storedData)) {
        initialData = storedData;
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
    this.data = new BehaviorSubject<University>(initialData);

    this.data.subscribe(data => {
      if (this.isDataValid(data)) {
        setString(this.storageKey, JSON.stringify(data));
      } else {
        removeString(this.storageKey);
      }
    });

    this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        const loadDataSubscription = this.loadData().subscribe(() => loadDataSubscription.unsubscribe());
      } else {
        this.data.next(null);
      }
    });
  }

  getData(): BehaviorSubject<University> {
    return this.data;
  }

  loadData(): Observable<University|HttpErrorResponse> {
    return this.http.get<University>(
      environment.apiUrl + 'university',
      { headers: {
        'Content-Type': 'application/json'
      } }
    )
    .pipe(
      map((data: University) => {
        if (!this.isDataValid(data)) {
          throw new Error('Received university data is not valid!');
        }
        return data;
      }),
      tap((data: University) => this.data.next(data)),
      catchError(this.handleErrors)
    );
  }

  private isDataValid(data: University): boolean {
    return !!data
      && typeof data.name === 'string'
      && typeof data.accentColor === 'string'
      && typeof data.logoUrl === 'string'
      && Array.isArray(data.links)
      && data.links.every(link => {
        return typeof link.label === 'string'
          && typeof link.url === 'string';
      });
  }

  private handleErrors(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log(JSON.stringify(error));
    return throwError(error);
  }
}
