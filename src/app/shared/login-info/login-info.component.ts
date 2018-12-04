import { Component, OnInit } from '@angular/core';
import { InfoTextsService } from '../info-texts/info-texts.service';

@Component({
  selector: 'p4ba-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.css']
})
export class LoginInfoComponent implements OnInit {

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
