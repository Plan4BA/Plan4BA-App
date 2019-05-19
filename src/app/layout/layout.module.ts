import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '@app/shared/shared.module';
import { NotificationsModule } from '@app/notifications/notifications.module';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent],
  imports: [SharedModule, NotificationsModule, LayoutRoutingModule]
})
export class LayoutModule {}
