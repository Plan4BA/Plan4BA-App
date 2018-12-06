import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { getString, removeString, setString } from '../data-store-util/data-store-util';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { TokenData } from '../auth/token-data.model';
import { Notification } from './notification.model';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private data: BehaviorSubject<Notification[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    ) {
    // load data from storage
    this.data = new BehaviorSubject<Notification[]>(null);

    this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        const loadDataSubscription = this.loadData().subscribe(() => loadDataSubscription.unsubscribe());
      } else {
        this.data.next(null);
      }
    });

    this.data.subscribe((notifications: Notification[]) => {
      if (notifications) {
        notifications.forEach((notification: Notification, index: number) => {
          setTimeout(() => {
              this.snackBar.open(`${notification.label}: ${notification.description}`, 'OK', {
                duration: 10000,
                verticalPosition: 'top'
              } );
              const deleteSub = this.delete(notification.id).subscribe(() => deleteSub.unsubscribe());
          }, index * 10000);
        });
      }
    });
  }

  getData(): BehaviorSubject<Notification[]> {
    return this.data;
  }

  loadData(): Observable<Notification[]|HttpErrorResponse> {
    return this.http.get<Notification[]>(
      environment.apiUrl + 'notifications',
      { headers: {
        'Content-Type': 'application/json'
      } }
    )
    .pipe(
      map((data: Notification[]) => {
        if (!this.isDataValid(data)) {
          throw new Error('Received notifications data is not valid!');
        }
        return data;
      }),
      tap((data: Notification[]) => this.data.next(data)),
      catchError(this.handleErrors)
    );
  }

  private delete(notificationId: number): Observable<any|HttpErrorResponse> {
    return this.http.delete<any>(
      environment.apiUrl + 'notifications/' + notificationId,
      { headers: {
        'Content-Type': 'application/json'
      } }
    )
    .pipe(
      catchError(this.handleErrors)
    );
  }

  private isDataValid(data: Notification[]): boolean {
    return !!data
      && Array.isArray(data)
      && data.every((notification: Notification) => {
        return !!notification
          && typeof notification.label === 'string'
          && typeof notification.description === 'string';
      });
  }

  private handleErrors(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log(JSON.stringify(error));
    return throwError(error);
  }
}
