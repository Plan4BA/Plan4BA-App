import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { TokenData } from '../../auth/token-data.model';
import { Link } from './link.model';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  private storageKey = 'links';
  private data: BehaviorSubject<Link[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    ) {
    // load data from storage
    let initialData: Link[];
    try {
      const storedData: Link[] = JSON.parse(localStorage.getItem(this.storageKey));
      if (this.isDataValid(storedData)) {
        initialData = storedData;
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
    this.data = new BehaviorSubject<Link[]>(initialData);

    this.data.subscribe(data => {
      if (this.isDataValid(data)) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
      } else {
        localStorage.removeItem(this.storageKey);
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

  getData(): BehaviorSubject<Link[]> {
    return this.data;
  }

  loadData(): Observable<Link[]|HttpErrorResponse> {
    return this.http.get<Link[]>(
      environment.apiUrl + 'links',
      { headers: {
        'Content-Type': 'application/json'
      } }
    )
    .pipe(
      map((data: Link[]) => {
        if (!this.isDataValid(data)) {
          throw new Error('Received links data is not valid!');
        }
        return data;
      }),
      tap((data: Link[]) => this.data.next(data)),
      catchError(this.handleErrors)
    );
  }

  private isDataValid(data: Link[]): boolean {
    return !!data
      && Array.isArray(data)
      && data.every((link: Link) => {
        return !!link
          && typeof link.label === 'string'
          && typeof link.url === 'string';
      });
  }

  private handleErrors(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log(JSON.stringify(error));
    return throwError(error);
  }
}
