import { NgModule, LOCALE_ID, Injectable, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faAngleLeft, faAngleRight, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import * as Sentry from '@sentry/browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { authProviders } from './app.routes';
import { AuthService } from './shared/auth/auth.service';
import { LecturesService } from './shared/data/lectures/lectures.service';
import { MealsService } from './shared/data/meals/meals.service';
import { MonthlyCalendarComponent } from './shared/monthly-calendar/monthly-calendar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DailyLecturesListComponent } from './shared/daily-lectures-list/daily-lectures-list.component';
import { TokenInterceptorService } from './shared/auth/token-interceptor.service';
import { MealsComponent } from './meals/meals.component';
import { DailyMealsListComponent } from './shared/daily-meals-list/daily-meals-list.component';
import { StoreCredentialsInfoDialog } from './shared/dialogs/store-credentials-info/store-credentials-info.dialog';
import { PrivacyPolicyDialog } from './shared/dialogs/privacy-policy/privacy-policy.dialog';
import { MaterialModule } from './material-module';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { FullComponent } from './layouts/full/full.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { MenuItems } from './shared/menu-items/menu-items';
import { UserService } from './shared/data/user/user.service';
import { LecturesPollingService } from './shared/data/lectures/lectures-polling.service';
import { InfoTextsService } from './shared/data/info-texts/info-texts.service';
import { UserCredentialsDialog } from './shared/dialogs/user-credentials/user-credentials.dialog';
import { LinksComponent } from './links/links.component';
import { LinksService } from './shared/data/links/link.service';
import { NotificationsService } from './shared/data/notifications/notifications.service';
import { environment } from '../environments/environment';

registerLocaleData(localeDe);
registerLocaleData(localeEn);

// Add an icon to the library for convenient access in other components
library.add(faCoffee, faAngleLeft, faAngleRight, faLeaf);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

Sentry.init({
  dsn: 'https://a16c84b452b04e7298dacf3e9ef127f0@sentry.plan4ba.ba-leipzig.de//2',
  environment: environment.production ? 'prod' : 'dev',
  release: 'plan4ba@0.2.0'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    Sentry.showReportDialog({ eventId });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    HomeComponent,
    SettingsComponent,
    LoginComponent,
    CalendarComponent,
    MonthlyCalendarComponent,
    DailyLecturesListComponent,
    MealsComponent,
    DailyMealsListComponent,
    StoreCredentialsInfoDialog,
    PrivacyPolicyDialog,
    SpinnerComponent,
    UserCredentialsDialog,
    LinksComponent,
  ],
  entryComponents: [
    StoreCredentialsInfoDialog,
    PrivacyPolicyDialog,
    UserCredentialsDialog,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: LOCALE_ID,
      useFactory: (translate: TranslateService) => {
        return translate.currentLang;
      },
      deps: [TranslateService]
    },
    { provide: ErrorHandler, useClass: SentryErrorHandler },
    LecturesService,
    MealsService,
    authProviders,
    MenuItems,
    UserService,
    LecturesPollingService,
    InfoTextsService,
    LinksService,
    NotificationsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
