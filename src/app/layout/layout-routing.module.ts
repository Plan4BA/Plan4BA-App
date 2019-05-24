import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '@app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: '@app/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'calendar',
        loadChildren: '@app/calendar/calendar.module#CalendarModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'meals',
        loadChildren: '@app/meals/meals.module#MealsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'links',
        loadChildren: '@app/links/links.module#LinksModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        loadChildren: '@app/settings/settings.module#SettingsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'demo',
        loadChildren: '@app/demo/demo.module#DemoModule',
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
