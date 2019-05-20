import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'p4ba-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit {
  viewDateLocal: Date;
  @ViewChild('monthlyCalendar') monthlyCalendar;
  @ViewChild('dailyCalendar') dailyCalendar;
  private blockScroll = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.viewDateLocal = new Date();
    this.viewDateLocal.setHours(0, 0, 0, 0);
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment: string) => {
      if (!this.blockScroll) {
        if (fragment === 'dailyCalendar') {
          this.dailyCalendar.nativeElement.scrollIntoView(true);
        } else if (fragment === 'monthlyCalendar') {
          this.monthlyCalendar.nativeElement.scrollIntoView(true);
        }
      }
    });
  }

  dayClickedListener(date: Date): void {
    this.viewDateLocal = date;
    this.blockScroll = true;
    this.router.navigate([], {
      fragment: 'monthlyCalendar'
    });
    setTimeout(() => {
      this.blockScroll = false;
      this.router.navigate([], {
        fragment: 'dailyCalendar'
      });
    }, 0);
  }

  prevMonth(): void {
    this.viewDateLocal.setUTCMonth(this.viewDateLocal.getUTCMonth() - 1);
    this.viewDateLocal = new Date(this.viewDateLocal.getTime());
  }

  nextMonth(): void {
    this.viewDateLocal.setUTCMonth(this.viewDateLocal.getUTCMonth() + 1);
    this.viewDateLocal = new Date(this.viewDateLocal.getTime());
  }

  prevDay(): void {
    this.viewDateLocal.setUTCDate(this.viewDateLocal.getUTCDate() - 1);
    this.viewDateLocal = new Date(this.viewDateLocal.getTime());
  }

  nextDay(): void {
    this.viewDateLocal.setUTCDate(this.viewDateLocal.getUTCDate() + 1);
    this.viewDateLocal = new Date(this.viewDateLocal.getTime());
  }
}
