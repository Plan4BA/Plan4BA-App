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
          (lecture: Lecture) => new CalendarEvent(
            lecture.description,
            new Date(lecture.start * 1000),
            new Date(lecture.end * 1000),
            lecture.allDay,
            new Color(lecture.color)
          )
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
