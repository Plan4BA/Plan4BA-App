import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';

@Component({
  selector: 'p4ba-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  constructor(private routerExtensions: RouterExtensions) {}

  dayClickedListener(date: Date): void {
    this.routerExtensions.navigateByUrl('/daily-lectures?date=' + date.getTime());
  }

}
