import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { Meal } from './meal.model';
import { Food } from './food.model';
import { TokenData } from '../../auth/token-data.model';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private storageKey = 'meals';
  private data: BehaviorSubject<Meal[]>;
  private version = 1;

  constructor(private http: HttpClient, private authService: AuthService) {
    // load data from storage
    let initialData: Meal[];
    try {
      const storedData: Meal[] = JSON.parse(
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
    this.data = new BehaviorSubject<Meal[]>(initialData);

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

  getData(): BehaviorSubject<Meal[]> {
    return this.data;
  }

  loadData(): Observable<Meal[] | HttpErrorResponse> {
    return this.http
      .get<Meal[]>(environment.apiUrl + 'meals', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .pipe(
        tap((data: Meal[]) => this.data.next(data)),
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
