import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material-module';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { FullComponent } from './layouts/full/full.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
