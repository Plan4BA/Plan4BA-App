import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { NativeScriptUICalendarModule } from 'nativescript-ui-calendar/angular';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NgShadowModule } from 'nativescript-ng-shadow';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { setStatusBarColors } from './shared/status-bar-util/status-bar-util';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { authProviders } from './app.routes';
import { AuthService } from './shared/auth/auth.service';
import { SidenavService } from './shared/sidenav/sidenav.service';
import { LecturesService } from './shared/lectures/lectures.service';
import { MealsService } from './shared/meals/meals.service';
import { MonthlyCalendarComponent } from './shared/monthly-calendar/monthly-calendar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DailyLecturesComponent } from './shared/daily-lectures/daily-lectures.component';
import { DailyLecturesListComponent } from './shared/daily-lectures-list/daily-lectures-list.component';
import { TokenInterceptorService } from './shared/token-interceptor/token-interceptor.service';
import { MealsComponent } from './meals/meals.component';
import { DailyMealsListComponent } from './shared/daily-meals-list/daily-meals-list.component';
import { StoreHashInfoComponent } from './shared/store-hash-info/store-hash-info.component';
import { LoginInfoComponent } from './shared/login-info/login-info.component';

registerLocaleData(localeDe);

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

setStatusBarColors();

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    LoginComponent,
    CalendarComponent,
    MonthlyCalendarComponent,
    DailyLecturesComponent,
    DailyLecturesListComponent,
    MealsComponent,
    DailyMealsListComponent,
    StoreHashInfoComponent,
    LoginInfoComponent,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    AppRoutingModule,
    NativeScriptUISideDrawerModule,
    NativeScriptUICalendarModule,
    NativeScriptHttpClientModule,
    NgShadowModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: LOCALE_ID, useValue: 'de-DE' },
    SidenavService,
    LecturesService,
    MealsService,
    authProviders,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
