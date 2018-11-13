import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponent,
  },
  {
      path: 'settings',
      component: SettingsComponent,
  },
  {
      path: 'login',
      component: LoginComponent,
  },
];
