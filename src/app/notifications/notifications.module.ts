import { NgModule } from '@angular/core';

import { NotificationsComponent } from './components/notifications/notifications.component';
import { SharedModule } from '@app/shared/shared.module';
import { LectureChangesDialogComponent } from './dialogs/lecture-changes/lecture-changes-dialog.component';
import { LectureChangeComponent } from './components/lecture-change/lecture-change.component';

@NgModule({
  declarations: [
    NotificationsComponent,
    LectureChangesDialogComponent,
    LectureChangeComponent
  ],
  entryComponents: [LectureChangesDialogComponent],
  imports: [SharedModule],
  exports: [NotificationsComponent]
})
export class NotificationsModule {}
