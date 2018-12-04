import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { SwipeGestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { SidenavService } from '../sidenav/sidenav.service';

@Component({
  selector: 'p4ba-daily-lectures',
  templateUrl: './daily-lectures.component.html',
  styleUrls: ['./daily-lectures.component.scss']
})
export class DailyLecturesComponent implements OnInit {

  viewDate: Date;

  constructor(
    private routerExtensions: RouterExtensions,
    private route: ActivatedRoute,
    private sidenavService: SidenavService,
    ) {
    this.viewDate = new Date();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['date'] && parseInt(params['date'], 10) !== NaN) {
        this.viewDate = new Date( parseInt(params['date'], 10));
      } else {
        this.viewDate = new Date();
      }
    });
  }

  back(): void {
    this.routerExtensions.backToPreviousPage();
  }

  prevDay(): void {
    this.viewDate.setUTCHours(0, 0, 0, 0);
    this.viewDate.setUTCDate(this.viewDate.getUTCDate() - 1);
    this.routerExtensions.navigateByUrl('/daily-lectures?date=' + this.viewDate.getTime());
  }

  nextDay(): void {
    this.viewDate.setUTCHours(0, 0, 0, 0);
    this.viewDate.setUTCDate(this.viewDate.getUTCDate() + 1);
    this.routerExtensions.navigateByUrl('/daily-lectures?date=' + this.viewDate.getTime());
  }

  onSwipe(args: SwipeGestureEventData) {
    if (args.direction === 2) {
      this.nextDay();
    }
    if (args.direction === 1) {
      this.prevDay();
    }
  }

}
