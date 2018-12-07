import { Component, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LecturesPollingService } from './shared/data/lectures/lectures-polling.service';
import { InfoTextsService } from './shared/data/info-texts/info-texts.service';

@Component({
  selector: 'p4ba-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private lecturesPollingService: LecturesPollingService,
    private infoTextsService: InfoTextsService,
    translate: TranslateService,
    ) {

    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('de');
    let usedLang = localStorage.getItem('usedLanguage');
    if (!usedLang || !usedLang.match(/en|de/)) {
      const browserLang = translate.getBrowserLang();
      usedLang = browserLang.match(/en|de/) ? browserLang : 'de';
    }
    translate.use(usedLang);
    localStorage.setItem('usedLanguage', usedLang);
  }
}
