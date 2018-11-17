import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';
import { alert } from '../shared/dialog-util/dialog-util';
import { LoginCommonComponent } from './login-common.component';

@Component({
  selector: 'p4ba-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends LoginCommonComponent {

  constructor(
    authService: AuthService,
    router: Router
    ) {
      super(authService, router);
  }
}
