import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CalendarEvent, CalendarDateFormatter } from 'angular-calendar';

import { CustomDateFormatter } from './custom-date-formatter.provider';
import { LecturesService } from '@app/core/services/lectures.service';
import { Lecture } from '@app/core/models/lecture.model';

@Component({
  selector: 'p4ba-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class MonthlyCalendarComponent {
  events: CalendarEvent[] = [];
  @Input() viewDateLocal: Date = new Date();
  @Output() dayClicked = new EventEmitter<Date>();

  constructor(private lecturesService: LecturesService) {
    this.lecturesService.getData().subscribe((lectures: Lecture[]) => {
      if (lectures) {
        this.events = lectures.map((lecture: Lecture) => {
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
            colorCode =
              '#' +
              '0'.repeat(7 - lecture.color.length) +
              lecture.color.split('#')[1];
          } else {
            colorCode = lecture.color;
          }
          return {
            start: startDate,
            end: endDate,
            title: lecture.description,
            color: { primary: colorCode },
            allDay: lecture.allDay
          } as CalendarEvent;
        });
      } else {
        this.events = [];
      }
    });
  }

  dayClickedListener(event): void {
    this.viewDateLocal = event.day.date;
    this.dayClicked.emit(event.day.date);
  }
}
