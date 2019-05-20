import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthService } from '@app/core/services/auth.service';
import { Lecture } from '@app/core/models/lecture.model';
import { CoreModule } from '@app/core/core.module';

@Injectable({
  providedIn: CoreModule
})
export class LecturesService {
  private storageKey = 'lectures';
  private data: BehaviorSubject<Lecture[]>;
  private version = 1;

  constructor(private http: HttpClient, private authService: AuthService) {
    // load data from storage
    let initialData: Lecture[];
    try {
      const storedData: Lecture[] = JSON.parse(
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
    this.data = new BehaviorSubject<Lecture[]>(initialData);

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

  getData(): BehaviorSubject<Lecture[]> {
    return this.data;
  }

  loadData(): Observable<Lecture[] | HttpErrorResponse> {
    return this.http
      .get<Lecture[]>(environment.apiUrl + 'lectures', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .pipe(
        tap((data: Lecture[]) => this.data.next(data)),
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
