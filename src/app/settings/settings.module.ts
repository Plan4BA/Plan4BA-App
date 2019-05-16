import { NgModule } from '@angular/core';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './components/settings/settings.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [SharedModule, SettingsRoutingModule]
})
export class SettingsModule {}
