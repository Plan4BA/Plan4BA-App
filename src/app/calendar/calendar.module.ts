import { NgModule } from '@angular/core';
import {
  CalendarModule as VendorCalendarModule,
  DateAdapter
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MonthlyCalendarComponent } from './components/monthly-calendar/monthly-calendar.component';
import { CustomDateFormatter } from './components/monthly-calendar/custom-date-formatter.provider';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [MonthlyCalendarComponent, CalendarComponent],
  providers: [CustomDateFormatter],
  imports: [
    SharedModule,
    CalendarRoutingModule,
    VendorCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ]
})
export class CalendarModule {}
