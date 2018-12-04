import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'p4ba-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  viewDate: Date = new Date();
  @ViewChild('dailyCalendar') dailyCalendar;

  constructor(
    public dialog: MatDialog,
    ) { }

  dayClickedListener(date: Date): void {
    this.viewDate = date;
    setTimeout(() => this.dailyCalendar.nativeElement.scrollIntoView(true), 0);
  }

  prevMonth(): void {
    this.viewDate.setUTCMonth(this.viewDate.getUTCMonth() - 1);
    this.viewDate = new Date(this.viewDate.getTime());
  }

  nextMonth(): void {
    this.viewDate.setUTCMonth(this.viewDate.getUTCMonth() + 1);
    this.viewDate = new Date(this.viewDate.getTime());
  }

  prevDay(): void {
    this.viewDate.setUTCDate(this.viewDate.getUTCDate() - 1);
    this.viewDate = new Date(this.viewDate.getTime());
  }

  nextDay(): void {
    this.viewDate.setUTCDate(this.viewDate.getUTCDate() + 1);
    this.viewDate = new Date(this.viewDate.getTime());
  }

}
