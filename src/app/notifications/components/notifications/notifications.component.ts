import { Component, OnInit } from '@angular/core';

import { NotificationsService } from '@app/core/services/notifications.service';
import { Notification } from '@app/core/models/notification.model';

@Component({
  selector: 'p4ba-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationsService: NotificationsService) {}

  openPanel() {}

  deleteNotification(event: any, id: number) {
    event.stopPropagation();
    this.notifications = this.notifications.filter(
      notification => notification.id !== id
    );
    const deleteNotificationSubscription = this.notificationsService
      .delete(id)
      .subscribe(() => deleteNotificationSubscription.unsubscribe());
  }

  openNotification(notification: Notification) {}

  ngOnInit() {
    this.notificationsService.getData().subscribe(notifications => {
      this.notifications = notifications || [];
    });
  }
}
