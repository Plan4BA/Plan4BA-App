import { Component, OnInit } from '@angular/core';

import { InfoTextsService } from '../../data/info-texts/info-texts.service';

@Component({
  selector: 'p4ba-privacy-policy',
  templateUrl: './privacy-policy.dialog.html',
  styleUrls: ['./privacy-policy.dialog.scss']
})
export class PrivacyPolicyDialog implements OnInit {

  contentText = '';

  constructor(
    private infoTextsService: InfoTextsService
  ) {
    this.infoTextsService.getStructuredData().subscribe((infoTexts: any) => {
        if (infoTexts && infoTexts['login.privacynotice']) {
          this.contentText = infoTexts['login.privacynotice'];
        }
      }
    );
  }

  ngOnInit() {
  }

}
