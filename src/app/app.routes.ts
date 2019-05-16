import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { LoginComponent } from './login/login.component';

export const authProviders = [AuthGuard];

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'calendar',
        loadChildren: './calendar/calendar.module#CalendarModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'meals',
        loadChildren: './meals/meals.module#MealsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'links',
        loadChildren: './links/links.module#LinksModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule',
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
