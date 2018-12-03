import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DailyLecturesComponent } from '../shared/daily-lectures/daily-lectures.component';

@Component({
  selector: 'p4ba-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  viewDate: Date = new Date();

  constructor(
    public dialog: MatDialog,
    ) { }

  dayClickedListener(date: Date): void {
    const dialogRef = this.dialog.open(DailyLecturesComponent, {data: {date}});
  }

  prevMonth(): void {
    this.viewDate.setUTCMonth(this.viewDate.getUTCMonth() - 1);
    this.viewDate = new Date(this.viewDate.getTime());
  }

  nextMonth(): void {
    this.viewDate.setUTCMonth(this.viewDate.getUTCMonth() + 1);
    this.viewDate = new Date(this.viewDate.getTime());
  }

}
