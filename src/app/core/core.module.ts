import { NgModule, LOCALE_ID, ErrorHandler, Injectable } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MatSnackBarModule } from '@angular/material';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import * as Sentry from '@sentry/browser';
import {
  TranslateService,
  TranslateLoader,
  TranslateModule
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { environment } from 'environments/environment';
import { AuthService } from './services/auth.service';

registerLocaleData(localeDe);
registerLocaleData(localeEn);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

if (environment.production) {
  Sentry.init({
    dsn:
      'https://a16c84b452b04e7298dacf3e9ef127f0@sentry.plan4ba.ba-leipzig.de//2',
    environment: environment.production ? 'prod' : 'dev',
    release: 'plan4ba@0.3.0'
  });
}

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    // Sentry.showReportDialog({ eventId });
  }
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useFactory: (translate: TranslateService) => {
        return translate.currentLang;
      },
      deps: [TranslateService]
    },
    ...(environment.production
      ? [{ provide: ErrorHandler, useClass: SentryErrorHandler }]
      : [])
  ]
})
export class CoreModule {}
