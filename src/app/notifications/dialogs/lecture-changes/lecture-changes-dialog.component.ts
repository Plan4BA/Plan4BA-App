import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { NotificationsService } from '@app/core/services/notifications.service';
import { Notification } from '@app/core/models/notification.model';
import { LectureChange } from '@app/core/models/lecture-change';

export interface DialogData {
  notification: Notification;
}

@Component({
  selector: 'p4ba-lecture-changes',
  templateUrl: './lecture-changes-dialog.component.html',
  styleUrls: ['./lecture-changes-dialog.component.scss']
})
export class LectureChangesDialogComponent implements OnInit {
  lectureChanges: LectureChange[];

  constructor(
    public dialogRef: MatDialogRef<LectureChangesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    const loadDetailsSubscription = this.notificationsService
      .loadDetails(this.data.notification.callback)
      .subscribe(data => {
        loadDetailsSubscription.unsubscribe();
        this.lectureChanges = data;
      });
  }
}
