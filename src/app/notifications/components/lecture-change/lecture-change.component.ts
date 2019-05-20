import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { LectureChange } from '@app/core/models/lecture-change';
import { Lecture } from '@app/core/models/lecture.model';

@Component({
  selector: 'p4ba-lecture-change',
  templateUrl: './lecture-change.component.html',
  styleUrls: ['./lecture-change.component.scss']
})
export class LectureChangeComponent implements OnInit {
  private _lectureChange: LectureChange;
  displayedLecture: Lecture;
  sameDay: boolean;
  roomChanged: boolean;
  instructorChanged: boolean;

  @HostBinding('class.added') lectureAdded: boolean;
  @HostBinding('class.deleted') lectureDeleted: boolean;

  public get lectureChange(): LectureChange {
    return this._lectureChange;
  }

  @Input() public set lectureChange(lectureChange: LectureChange) {
    this._lectureChange = lectureChange;
    this.displayedLecture = lectureChange.new
      ? lectureChange.new
      : lectureChange.old;
    const startDay = new Date(this.displayedLecture.start * 1000);
    const endDay = new Date(this.displayedLecture.end * 1000);
    startDay.setHours(0, 0, 0, 0);
    endDay.setHours(0, 0, 0, 0);
    this.sameDay = startDay.getTime() === endDay.getTime();
    this.lectureAdded = !!lectureChange.new && !lectureChange.old;
    this.lectureDeleted = !lectureChange.new && !!lectureChange.old;
    this.roomChanged =
      lectureChange.new &&
      lectureChange.old &&
      lectureChange.new.room !== lectureChange.old.room;
    this.instructorChanged =
      lectureChange.new &&
      lectureChange.old &&
      lectureChange.new.instructor !== lectureChange.old.instructor;
  }

  constructor() {}

  ngOnInit() {}
}
