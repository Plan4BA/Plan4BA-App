import { Component, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

import { LecturesService } from '../lectures/lectures.service';
import { Lecture } from '../lectures/lecture.model';

@Component({
  selector: 'p4ba-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.css']
})
export class MonthlyCalendarComponent {
  events: CalendarEvent[] = [];
  viewDate: Date = new Date();
  @Output() dayClicked = new EventEmitter<Date>();

  constructor(
    private lecturesService: LecturesService
  ) {
    this.lecturesService.getData().subscribe((lectures: Lecture[]) => {
      if (lectures) {
        this.events = lectures.map((lecture: Lecture) => <CalendarEvent>({
          start: new Date(lecture.start * 1000),
          end: new Date(lecture.end * 1000),
          title: lecture.description,
          color: {primary: lecture.color},
          allDay: lecture.allDay,
        }));
      } else {
        this.events = [];
      }
    });
  }

  dayClickedListener(event): void {
    this.viewDate = event.day.date;
    this.dayClicked.emit(event.day.date);
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
