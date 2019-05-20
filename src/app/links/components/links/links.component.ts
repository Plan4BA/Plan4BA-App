import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MatDialog } from '@angular/material';

import { Link } from '@app/core/models/link.model';
import { LinksService } from '@app/core/services/link.service';
import { CaldavService } from '@app/core/services/caldav.service';
import { TokenData } from '@app/core/models/token-data.model';
import { environment } from 'environments/environment';
import { CalendarIntegrationDialogComponent } from '@app/shared/dialogs/calendar-integration-info/calendar-integration-info-dialog.component';

@Component({
  selector: 'p4ba-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent {
  links: Link[] = [];
  caldavToken: TokenData = null;

  caldavContentTypes: string[] = ['all', 'lectures', 'meals'];
  selectedCaldavContentType = 'all';
  apiUrl = 'https://plan4ba.ba-leipzig.de/' + environment.apiUrl + 'caldav/';

  isCopied = false;

  constructor(
    private linksService: LinksService,
    private caldavService: CaldavService,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.linksService.getData().subscribe((links: Link[]) => {
      if (links) {
        this.links = links;
      }
    });
    this.caldavService.getData().subscribe((caldavToken: TokenData) => {
      if (caldavToken) {
        this.caldavToken = caldavToken;
      }
    });
  }

  onCopyFailure() {
    this.snackBar.open(this.translate.instant('links.copyManually'), 'OK', {
      duration: 20000,
      verticalPosition: 'top'
    });
  }

  openCalendarIntegrationInfoDialog() {
    const dialogRef = this.dialog.open(CalendarIntegrationDialogComponent, {
      maxWidth: 600
    });
  }
}
