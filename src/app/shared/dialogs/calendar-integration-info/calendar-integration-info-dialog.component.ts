import { Component, OnInit } from '@angular/core';

import { InfoTextsService } from '@app/core/services/info-texts.service';

@Component({
  selector: 'p4ba-calendar-integration-info',
  templateUrl: './calendar-integration-info-dialog.component.html',
  styleUrls: ['./calendar-integration-info-dialog.component.scss']
})
export class CalendarIntegrationDialogComponent implements OnInit {
  contentText = '';

  constructor(private infoTextsService: InfoTextsService) {
    this.infoTextsService.getStructuredData().subscribe((infoTexts: any) => {
      if (infoTexts && infoTexts['links.calendarIntegration']) {
        this.contentText = infoTexts['links.calendarIntegration'];
      }
    });
  }

  ngOnInit() {}
}
