import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SidenavService } from '../sidenav/sidenav.service';

@Component({
  selector: 'p4ba-daily-lectures',
  templateUrl: './daily-lectures.component.html',
  styleUrls: ['./daily-lectures.component.css']
})
export class DailyLecturesComponent {

  viewDate: Date;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.viewDate = new Date(data.date.getTime());
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
