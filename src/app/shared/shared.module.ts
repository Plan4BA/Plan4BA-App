import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatListModule,
  MatTooltipModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { DailyLecturesListComponent } from './daily-lectures-list/daily-lectures-list.component';
import { DailyMealsListComponent } from './daily-meals-list/daily-meals-list.component';
import { StoreCredentialsInfoDialogComponent } from './dialogs/store-credentials-info/store-credentials-info-dialog.component';
import { PrivacyPolicyDialogComponent } from './dialogs/privacy-policy/privacy-policy-dialog.component';
import { UserCredentialsDialogComponent } from './dialogs/user-credentials/user-credentials-dialog.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    DailyLecturesListComponent,
    DailyMealsListComponent,
    StoreCredentialsInfoDialogComponent,
    PrivacyPolicyDialogComponent,
    UserCredentialsDialogComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule
  ],
  entryComponents: [
    StoreCredentialsInfoDialogComponent,
    PrivacyPolicyDialogComponent,
    UserCredentialsDialogComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    DailyLecturesListComponent,
    DailyMealsListComponent,
    SpinnerComponent
  ]
})
export class SharedModule {}
