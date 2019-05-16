import { Component, OnInit } from '@angular/core';

import { InfoTextsService } from '@app/core/services/info-texts.service';

@Component({
  selector: 'p4ba-store-credentials-info',
  templateUrl: './store-credentials-info-dialog.component.html',
  styleUrls: ['./store-credentials-info-dialog.component.scss']
})
export class StoreCredentialsInfoDialogComponent implements OnInit {
  contentText = '';

  constructor(private infoTextsService: InfoTextsService) {
    this.infoTextsService.getStructuredData().subscribe((infoTexts: any) => {
      if (infoTexts && infoTexts['login.storehash']) {
        this.contentText = infoTexts['login.storehash'];
      }
    });
  }

  ngOnInit() {}
}
