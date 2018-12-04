import { Injectable } from '@angular/core';
import { switchMap, catchError, map, shareReplay, retryWhen, mergeMap, finalize, tap, delayWhen } from 'rxjs/operators';

import { LecturesService } from '../lectures/lectures.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, of, Observable, timer } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class InitialPollingService {

  private isPolling = false;
  private retryCounter = 0;

  constructor(
    private lecturesService: LecturesService,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {
    this.userService.getData().subscribe((user: User) => {
      if (user && user.lastLecturePolling === 0 && !this.isPolling) {
        this.isPolling = true;
        this.snackBar.open('Wir laden gerade den Stundenplan aus dem Campus Dual. Das kann durchaus eine Minute dauern.', 'OK', {
          duration: 20000,
          verticalPosition: 'top'
        } );
        const userSub = this.userService.loadData().pipe(
          map((newUser: User) => {
            if (newUser.lastLecturePolling === 0 && this.retryCounter < 50) {
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
            this.snackBar.open('Der Stundenplan wurde geladen!', 'OK', {
              duration: 20000,
              verticalPosition: 'top'
            } );
          });
        });
      }
    });
  }
}
