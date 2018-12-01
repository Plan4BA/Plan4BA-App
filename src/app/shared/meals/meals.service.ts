import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { getString, removeString, setString } from '../data-store-util/data-store-util';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Meal } from './meal.model';
import { Food } from './food.model';
import { TokenData } from '../auth/token-data.model';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  private storageKey = 'meals';
  private data: BehaviorSubject<Meal[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    ) {
    // load data from storage
    let initialData: Meal[];
    try {
      const storedData: Meal[] = JSON.parse(getString(this.storageKey));
      if (this.isDataValid(storedData)) {
        initialData = storedData;
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
    this.data = new BehaviorSubject<Meal[]>(initialData);

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

  getData(): BehaviorSubject<Meal[]> {
    return this.data;
  }

  loadData(): Observable<Meal[]|HttpErrorResponse> {
    return this.http.get<Meal[]>(
      environment.apiUrl + 'meals',
      { headers: {
        'Content-Type': 'application/json',
      } }
    )
    .pipe(
      map((data: Meal[]) => {
        if (!this.isDataValid(data)) {
          throw new Error('Received meals data is not valid!');
        }
        return data;
      }),
      tap((data: Meal[]) => this.data.next(data)),
      catchError(this.handleErrors)
    );
  }

  private isDataValid(data: Meal[]): boolean {
    return !!data
      && Array.isArray(data)
      && data.every((meal: Meal) => {
        return !!meal
          && Number.isInteger(meal.universityId)
          && Number.isInteger(meal.day)
          && Array.isArray(meal.meals)
          && meal.meals.every((food: Food) => {
            return !!food
              && typeof food.description === 'string'
              && typeof food.prices === 'string'
              && typeof food.vegetarian === 'boolean'
              && typeof food.vegan === 'boolean'
              && typeof food.additionalInformation === 'string';
          });
      });
  }

  private handleErrors(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log(JSON.stringify(error));
    return throwError(error);
  }
}
