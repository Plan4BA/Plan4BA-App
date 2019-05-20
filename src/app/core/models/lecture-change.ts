import { Lecture } from './lecture.model';

export interface LectureChange {
  id: number;
  notificationId: number;
  old: Lecture;
  new: Lecture;
}
