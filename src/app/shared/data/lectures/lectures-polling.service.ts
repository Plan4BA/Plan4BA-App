import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { throwError, of, Observable, timer } from 'rxjs';
import { switchMap, catchError, map, shareReplay, retryWhen, mergeMap, finalize, tap, delayWhen } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { LecturesService } from './lectures.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { environment } from '../../../../environments/environment';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class LecturesPollingService {

  private isPolling = false;
  private retryCounter = 0;
  private prevPollingDate = 0;

  constructor(
    private lecturesService: LecturesService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private translate: TranslateService,
    private notificationsService: NotificationsService,
  ) {
    this.userService.getData().subscribe((user: User) => {
      if (user && user.lastLecturePolling === 0) {
        this.pollLectures();
      }
    });
  }

  pollLecturesManually(username?: string, password?: string) {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (username && password) {
      headers['Authorization'] = 'Basic ' + btoa(`${username}:${password}`);
    }

    const triggerSub = this.http.get(
      environment.apiUrl + 'lectures/trigger',
      { headers }
    ).subscribe(
      data => {
        triggerSub.unsubscribe();
        this.pollLectures();
      },
      err => {
        triggerSub.unsubscribe();
        console.log(err);
        throw err;
      }
    );
  }

  private pollLectures() {
    const user = this.userService.getData().getValue();
    if (user && !this.isPolling) {
      this.isPolling = true;
      this.prevPollingDate = user.lastLecturePolling;
      this.snackBar.open(this.translate.instant('pollingService.startPollingLectures'), 'OK', {
        duration: 20000,
        verticalPosition: 'top'
      } );
      const userSub = this.userService.loadData().pipe(
        map((newUser: User) => {
          if (newUser.lastLecturePolling === this.prevPollingDate && this.retryCounter < 50) {
            this.retryCounter++;
            throw new Error('Retry');
          } else {
            return newUser;
          }
        }),
        shareReplay(),
        retryWhen(errors => {
          return errors
            .pipe(
              delayWhen(() => timer(5000))
            );
        } )
      ).subscribe(() => {
        this.retryCounter = 0;
        this.isPolling = false;
        userSub.unsubscribe();
        const lecturesSub = this.lecturesService.loadData().subscribe(() => {
          lecturesSub.unsubscribe();
          this.snackBar.open(this.translate.instant('pollingService.lecturesPollingFinished'), 'OK', {
            duration: 20000,
            verticalPosition: 'top'
          } );
          const notificationsSub = this.notificationsService.loadData().subscribe(() => {
            notificationsSub.unsubscribe();
          });
        });
      });
    }
  }
}
