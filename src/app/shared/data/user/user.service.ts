import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { User } from './user.model';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageKey = 'user';
  private data: BehaviorSubject<User>;
  private version = 1;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    ) {
    // load data from storage
    let initialData: User;
    try {
      const storedData: User = JSON.parse(localStorage.getItem(this.storageKey));
      if (parseInt(localStorage.getItem(`${this.storageKey}.version`), 0) === this.version) {
        initialData = storedData;
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
    this.data = new BehaviorSubject<User>(initialData);

    this.data.subscribe(data => {
      if (!!data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        localStorage.setItem(`${this.storageKey}.version`, this.version.toString());
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

  getData(): BehaviorSubject<User> {
    return this.data;
  }

  loadData(): Observable<User|HttpErrorResponse> {
    return this.http.get<User>(
      environment.apiUrl + 'user',
      { headers: {
        'Content-Type': 'application/json'
      } }
    )
    .pipe(
      tap((data: User) => this.data.next(data)),
      catchError(this.handleErrors)
    );
  }

  delete(username: string, password: string): Observable<any|HttpErrorResponse> {
    return this.http.delete(
      environment.apiUrl + 'user/delete',
      { headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      } }
    )
    .pipe(
      catchError(this.handleErrors)
    );
  }

  private handleErrors(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log(JSON.stringify(error));
    return throwError(error);
  }
}
