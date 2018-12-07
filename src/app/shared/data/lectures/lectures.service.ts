import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { Lecture } from './lecture.model';
import { TokenData } from '../../auth/token-data.model';

@Injectable({
  providedIn: 'root'
})
export class LecturesService {

  private storageKey = 'lectures';
  private data: BehaviorSubject<Lecture[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    ) {
    // load data from storage
    let initialData: Lecture[];
    try {
      const storedData: Lecture[] = JSON.parse(localStorage.getItem(this.storageKey));
      if (this.isDataValid(storedData)) {
        initialData = storedData;
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
    this.data = new BehaviorSubject<Lecture[]>(initialData);

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

  getData(): BehaviorSubject<Lecture[]> {
    return this.data;
  }

  loadData(): Observable<Lecture[]|HttpErrorResponse> {
    return this.http.get<Lecture[]>(
      environment.apiUrl + 'lectures',
      { headers: {
        'Content-Type': 'application/json'
      } }
    )
    .pipe(
      map((data: Lecture[]) => {
        if (!this.isDataValid(data)) {
          throw new Error('Received lectures data is not valid!');
        }
        return data;
      }),
      tap((data: Lecture[]) => this.data.next(data)),
      catchError(this.handleErrors)
    );
  }

  private isDataValid(data: Lecture[]): boolean {
    return !!data
      && Array.isArray(data)
      && data.every((lecture: Lecture) => {
        return !!lecture
          && Number.isInteger(lecture.id)
          && typeof lecture.title === 'string'
          && Number.isInteger(lecture.start)
          && Number.isInteger(lecture.end)
          && typeof lecture.allDay === 'boolean'
          && typeof lecture.description === 'string'
          && typeof lecture.color === 'string'
          && typeof lecture.room === 'string'
          && typeof lecture.sroom === 'string'
          && typeof lecture.instructor === 'string'
          && typeof lecture.remarks === 'string'
          && typeof lecture.exam === 'boolean'
          && Number.isInteger(lecture.userId);
      });
  }

  private handleErrors(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log(JSON.stringify(error));
    return throwError(error);
  }
}
