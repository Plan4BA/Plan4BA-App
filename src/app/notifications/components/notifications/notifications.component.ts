import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { NotificationsService } from '@app/core/services/notifications.service';
import { Notification } from '@app/core/models/notification.model';
import { LectureChangesDialogComponent } from '@app/notifications/dialogs/lecture-changes/lecture-changes-dialog.component';
import { AppChangedComponent } from '@app/notifications/dialogs/app-changed/app-changed.component';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'p4ba-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(
    private notificationsService: NotificationsService,
    private dialog: MatDialog
  ) {}

  openPanel() {}

  deleteNotificationListener(event: any, id: number) {
    event.stopPropagation();
    this.deleteNotification(id);
  }

  deleteNotification(id: number) {
    this.notifications = this.notifications.filter(
      notification => notification.id !== id
    );
    const deleteNotificationSubscription = this.notificationsService
      .delete(id)
      .subscribe(() => deleteNotificationSubscription.unsubscribe());
  }

  openNotification(notification: Notification) {
    let dialogType: any;
    switch (notification.type) {
      case 'lectureChanged':
        dialogType = LectureChangesDialogComponent;
        break;

      case 'appChanged':
        dialogType = AppChangedComponent;
        break;
    }

    if (dialogType) {
      const dialogRef = this.dialog.open(dialogType, {
        maxWidth: 600,
        data: { notification }
      });

      dialogRef.afterClosed().subscribe(deleteClicked => {
        if (deleteClicked) {
          this.deleteNotification(notification.id);
        }
      });
    }
  }

  ngOnInit() {
    this.notificationsService.getData().subscribe(notifications => {
      this.notifications = notifications || [];
    });
  }
}
