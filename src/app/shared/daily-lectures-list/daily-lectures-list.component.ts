import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { LecturesService } from '@app/core/services/lectures.service';
import { Lecture } from '@app/core/models/lecture.model';

@Component({
  selector: 'p4ba-daily-lectures-list',
  templateUrl: './daily-lectures-list.component.html',
  styleUrls: ['./daily-lectures-list.component.scss']
})
export class DailyLecturesListComponent implements OnInit {
  private _viewDateLocal: Date;
  @Output() tapEvent = new EventEmitter<any>();
  @Output() swipeEvent = new EventEmitter<any>();

  filteredLectures: Lecture[];

  get viewDateLocal(): Date {
    return this._viewDateLocal;
  }

  @Input()
  set viewDateLocal(viewDateLocal: Date) {
    this._viewDateLocal = viewDateLocal;
    this.filteredLectures = this.filterLecturesByDate(
      this.lecturesService.getData().getValue(),
      viewDateLocal
    );
  }

  constructor(private lecturesService: LecturesService) {}

  ngOnInit() {
    if (!this._viewDateLocal) {
      this._viewDateLocal = new Date();
      this._viewDateLocal.setHours(0, 0, 0, 0);
    }
    this.lecturesService.getData().subscribe((lectures: Lecture[]) => {
      this.filteredLectures = this.filterLecturesByDate(
        lectures,
        this.viewDateLocal
      );
    });
  }

  filterLecturesByDate(lectures: Lecture[], date: Date): Lecture[] {
    if (!lectures) {
      return [];
    }
    const dateTimestamp = date.getTime();
    const nextDay = new Date(date.getTime());
    nextDay.setUTCDate(nextDay.getUTCDate() + 1);
    const nextDayTimestamp = nextDay.getTime();
    return lectures
      .filter((lecture: Lecture) => {
        return (
          lecture.start * 1000 < nextDayTimestamp &&
          lecture.end * 1000 >= dateTimestamp
        );
      })
      .sort(
        (lectureA: Lecture, lectureB: Lecture) =>
          lectureA.start - lectureB.start
      );
  }
}
