import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, LoginRoutingModule]
})
export class LoginModule {}
