import { NgModule } from '@angular/core';

import { LinksRoutingModule } from './links-routing.module';
import { LinksComponent } from './components/links/links.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [LinksComponent],
  imports: [SharedModule, LinksRoutingModule]
})
export class LinksModule {}
