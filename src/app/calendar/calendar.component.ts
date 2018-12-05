import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'p4ba-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit {

  viewDate: Date = new Date();
  @ViewChild('monthlyCalendar') monthlyCalendar;
  @ViewChild('dailyCalendar') dailyCalendar;
  private blockScroll = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment: String) => {
      if (!this.blockScroll) {
        if (fragment === 'dailyCalendar') {
          this.dailyCalendar.nativeElement.scrollIntoView(true);
        } else {
          this.monthlyCalendar.nativeElement.scrollIntoView(true);
        }
      }
    });
  }


  dayClickedListener(date: Date): void {
    this.viewDate = date;
    this.blockScroll = true;
    this.router.navigate([], {
      fragment: ''
    });
    setTimeout(() => {
      this.blockScroll = false;
      this.router.navigate([], {
        fragment: 'dailyCalendar'
      });
    }, 0);
  }

  prevMonth(): void {
    this.viewDate.setUTCMonth(this.viewDate.getUTCMonth() - 1);
    this.viewDate = new Date(this.viewDate.getTime());
  }

  nextMonth(): void {
    this.viewDate.setUTCMonth(this.viewDate.getUTCMonth() + 1);
    this.viewDate = new Date(this.viewDate.getTime());
  }

  prevDay(): void {
    this.viewDate.setUTCDate(this.viewDate.getUTCDate() - 1);
    this.viewDate = new Date(this.viewDate.getTime());
  }

  nextDay(): void {
    this.viewDate.setUTCDate(this.viewDate.getUTCDate() + 1);
    this.viewDate = new Date(this.viewDate.getTime());
  }

}
