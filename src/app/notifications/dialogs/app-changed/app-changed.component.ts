import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { NotificationsService } from '@app/core/services/notifications.service';
import { Notification } from '@app/core/models/notification.model';
import { AppVersionDetails } from '@app/core/models/app-version-details';

export interface DialogData {
  notification: Notification;
}

@Component({
  selector: 'p4ba-app-changed',
  templateUrl: './app-changed.component.html',
  styleUrls: ['./app-changed.component.scss']
})
export class AppChangedComponent implements OnInit {
  appVersionDetails: AppVersionDetails;

  constructor(
    public dialogRef: MatDialogRef<AppChangedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    const loadDetailsSubscription = this.notificationsService
      .loadDetails(this.data.notification.callback)
      .subscribe(data => {
        loadDetailsSubscription.unsubscribe();
        this.appVersionDetails = data;
      });
  }
}
