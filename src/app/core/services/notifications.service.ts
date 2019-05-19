import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthService } from '@app/core/services/auth.service';
import { Notification } from '@app/core/models/notification.model';
import { CoreModule } from '@app/core/core.module';

@Injectable({
  providedIn: CoreModule
})
export class NotificationsService {
  private data: BehaviorSubject<Notification[]>;
  private loadDataTimeout: number = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.data = new BehaviorSubject<Notification[]>(null);

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

  getData(): BehaviorSubject<Notification[]> {
    return this.data;
  }

  loadData(): Observable<Notification[] | HttpErrorResponse> {
    return this.http
      .get<Notification[]>(environment.apiUrl + 'notifications', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .pipe(
        map((data: Notification[]) => {
          if (!data) {
            throw new Error('Received notifications data is not valid!');
          }
          return data;
        }),
        tap((data: Notification[]) => this.data.next(data)),
        catchError(this.handleErrors)
      );
  }

  private loadDataWithTimeout() {
    if (this.loadDataTimeout) {
      clearTimeout(this.loadDataTimeout);
    }
    this.loadDataTimeout = (setTimeout(() => {
      this.loadDataTimeout = null;
      const loadDataSubscription = this.loadData().subscribe(() =>
        loadDataSubscription.unsubscribe()
      );
    }, 1000) as unknown) as number;
  }

  public delete(notificationId: number): Observable<any | HttpErrorResponse> {
    return this.http
      .delete<any>(environment.apiUrl + 'notifications/' + notificationId, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .pipe(
        tap(() => this.loadDataWithTimeout()),
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
