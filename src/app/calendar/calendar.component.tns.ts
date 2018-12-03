import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';

import { SidenavService } from '../shared/sidenav/sidenav.service';

@Component({
  selector: 'p4ba-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  constructor(
    private routerExtensions: RouterExtensions,
    private sidenavService: SidenavService,
    ) {}

  dayClickedListener(date: Date): void {
    this.routerExtensions.navigateByUrl('/daily-lectures?date=' + date.getTime());
  }

}
