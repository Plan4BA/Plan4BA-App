import { Component, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from 'nativescript-ui-calendar';
import { Color } from 'tns-core-modules/color/color';

import { LecturesService } from '../lectures/lectures.service';
import { Lecture } from '../lectures/lecture.model';

@Component({
  selector: 'p4ba-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.css']
})
export class MonthlyCalendarComponent {
  events: CalendarEvent[];
  @Output() dayClicked = new EventEmitter<Date>();

  constructor(
    private lecturesService: LecturesService
  ) {
    this.lecturesService.getData().subscribe((lectures: Lecture[]) => {
      if (lectures) {
        this.events = lectures.map(
          (lecture: Lecture) => {
            const startDate = new Date(lecture.start * 1000);
            let endDate: Date;
            if (lecture.end < lecture.start) {
              endDate = new Date(lecture.start * 1000);
              endDate.setUTCHours(endDate.getUTCHours() + 1);
            } else {
              endDate = new Date(lecture.end * 1000);
            }
            let colorCode: string;
            if (lecture.color.indexOf('#') === 0 && lecture.color.length < 7) {
              colorCode = '#' + '0'.repeat(7 - lecture.color.length) + lecture.color.split('#')[1];
            } else {
              colorCode = lecture.color;
            }
            return new CalendarEvent(
              lecture.description,
              startDate,
              endDate,
              lecture.allDay,
              new Color(colorCode)
            );
          }
        );
      } else {
        this.events = [];
      }
    });
  }

  dayClickedListener(event): void  {
    this.dayClicked.emit(event.date);
  }

}
