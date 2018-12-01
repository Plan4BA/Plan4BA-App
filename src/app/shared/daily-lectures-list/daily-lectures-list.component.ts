import { Component, OnInit, Input } from '@angular/core';
import { LecturesService } from '../lectures/lectures.service';
import { Lecture } from '../lectures/lecture.model';

@Component({
  selector: 'p4ba-daily-lectures-list',
  templateUrl: './daily-lectures-list.component.html',
  styleUrls: ['./daily-lectures-list.component.css']
})
export class DailyLecturesListComponent implements OnInit {

  private _viewDate: Date;

  filteredLectures: Lecture[];

  get viewDate(): Date {
    return this._viewDate;
  }

  @Input()
  set viewDate(viewDate: Date) {
    this._viewDate = viewDate;
    this.filteredLectures = this.filterLecturesByDate(this.lecturesService.getData().getValue(), viewDate);
  }

  constructor(private lecturesService: LecturesService) {
  }

  ngOnInit() {
    this.lecturesService.getData().subscribe((lectures: Lecture[]) => {
      this.filteredLectures = this.filterLecturesByDate(lectures, this.viewDate);
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
    return lectures.filter((lecture: Lecture) => {
      return lecture.start * 1000 > dateTimestamp
        && lecture.start * 1000 < nextDayTimestamp
        && lecture.end * 1000 > dateTimestamp
        && lecture.end * 1000 < nextDayTimestamp;
    }).sort((lectureA: Lecture, lectureB: Lecture) =>  lectureA.start - lectureB.start);
  }

}
