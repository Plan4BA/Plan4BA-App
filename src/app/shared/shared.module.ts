import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatListModule,
  MatTooltipModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { DailyLecturesListComponent } from './daily-lectures-list/daily-lectures-list.component';
import { DailyMealsListComponent } from './daily-meals-list/daily-meals-list.component';

@NgModule({
  declarations: [DailyLecturesListComponent, DailyMealsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    TranslateModule
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
    TranslateModule,
    DailyLecturesListComponent,
    DailyMealsListComponent
  ]
})
export class SharedModule {}
