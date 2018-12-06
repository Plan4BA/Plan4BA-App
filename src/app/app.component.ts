import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { InitialPollingService } from './shared/initial-polling/initial-polling.service';
import { InfoTextsService } from './shared/info-texts/info-texts.service';

@Component({
  selector: 'p4ba-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  @ViewChild(MatSidenav) snav: MatSidenav;
  mobileQuery: MediaQueryList;
  navItems = [
    {
      label: 'Dashboard',
      url: '/home'
    },
    {
      label: 'Kalender',
      url: '/calendar'
    },
    {
      label: 'Essen',
      url: '/meals'
    },
    {
      label: 'Einstellungen',
      url: '/settings'
    },
  ];

  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public router: Router,
    private initialPollingService: InitialPollingService,
    private infoTextsService: InfoTextsService,
    translate: TranslateService,
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
