import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DailyLecturesComponent } from '../shared/daily-lectures/daily-lectures.component';

@Component({
  selector: 'p4ba-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  constructor(
    public dialog: MatDialog,
    ) { }

  dayClickedListener(date: Date): void {
    const dialogRef = this.dialog.open(DailyLecturesComponent, {data: {date}});
  }

}
