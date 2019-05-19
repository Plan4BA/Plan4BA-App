import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from 'ngx-clipboard';

import { DailyLecturesListComponent } from './daily-lectures-list/daily-lectures-list.component';
import { DailyMealsListComponent } from './daily-meals-list/daily-meals-list.component';
import { StoreCredentialsInfoDialogComponent } from './dialogs/store-credentials-info/store-credentials-info-dialog.component';
import { PrivacyPolicyDialogComponent } from './dialogs/privacy-policy/privacy-policy-dialog.component';
import { UserCredentialsDialogComponent } from './dialogs/user-credentials/user-credentials-dialog.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MaterialModule } from './material/material.module';
import { CalendarIntegrationDialogComponent } from './dialogs/calendar-integration-info/calendar-integration-info-dialog.component';

@NgModule({
  declarations: [
    DailyLecturesListComponent,
    DailyMealsListComponent,
    StoreCredentialsInfoDialogComponent,
    PrivacyPolicyDialogComponent,
    UserCredentialsDialogComponent,
    CalendarIntegrationDialogComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    MaterialModule,
    ClipboardModule
  ],
  entryComponents: [
    StoreCredentialsInfoDialogComponent,
    PrivacyPolicyDialogComponent,
    UserCredentialsDialogComponent,
    CalendarIntegrationDialogComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    MaterialModule,
    ClipboardModule,
    DailyLecturesListComponent,
    DailyMealsListComponent,
    SpinnerComponent
  ]
})
export class SharedModule {}
