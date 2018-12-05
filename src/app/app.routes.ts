import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { CalendarComponent } from './calendar/calendar.component';
import { MealsComponent } from './meals/meals.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { LinksComponent } from './links/links.component';

export const authProviders = [
  AuthGuard
];

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'meals',
        component: MealsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'links',
        component: LinksComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard],
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
