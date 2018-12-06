import { NgModule, LOCALE_ID } from '@angular/core';
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
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { authProviders } from './app.routes';
import { AuthService } from './shared/auth/auth.service';
import { SidenavService } from './shared/sidenav/sidenav.service';
import { LecturesService } from './shared/lectures/lectures.service';
import { MealsService } from './shared/meals/meals.service';
import { MonthlyCalendarComponent } from './shared/monthly-calendar/monthly-calendar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DailyLecturesListComponent } from './shared/daily-lectures-list/daily-lectures-list.component';
import { TokenInterceptorService } from './shared/token-interceptor/token-interceptor.service';
import { MealsComponent } from './meals/meals.component';
import { DailyMealsListComponent } from './shared/daily-meals-list/daily-meals-list.component';
import { StoreHashInfoComponent } from './shared/store-hash-info/store-hash-info.component';
import { LoginInfoComponent } from './shared/login-info/login-info.component';
import { MaterialModule } from './material-module';
import { SpinnerComponent } from './shared/spinner.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { FullComponent } from './layouts/full/full.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { MenuItems } from './shared/menu-items/menu-items';
import { UserService } from './shared/user/user.service';
import { InitialPollingService } from './shared/initial-polling/initial-polling.service';
import { InfoTextsService } from './shared/info-texts/info-texts.service';
import { UserCredentialsComponent } from './shared/user-credentials-dialog/user-credentials.component';

registerLocaleData(localeDe);

// Add an icon to the library for convenient access in other components
library.add(faCoffee, faAngleLeft, faAngleRight, faLeaf);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
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
    StoreHashInfoComponent,
    LoginInfoComponent,
    SpinnerComponent,
    UserCredentialsComponent,
  ],
  entryComponents: [
    StoreHashInfoComponent,
    LoginInfoComponent,
    UserCredentialsComponent,
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
    { provide: LOCALE_ID, useValue: 'de-DE' },
    SidenavService,
    LecturesService,
    MealsService,
    authProviders,
    MenuItems,
    UserService,
    InitialPollingService,
    InfoTextsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
