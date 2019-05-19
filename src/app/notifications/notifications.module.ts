import { NgModule } from '@angular/core';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [SharedModule],
  exports: [NotificationsComponent]
})
export class NotificationsModule {}
