import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { AuthService } from '../shared/auth/auth.service';
import { alert } from '../shared/dialog-util/dialog-util';
import { LoginCommonComponent } from './login-common.component';
import { StoreHashInfoComponent } from '../shared/store-hash-info/store-hash-info.component';
import { LoginInfoComponent } from '../shared/login-info/login-info.component';

@Component({
  selector: 'p4ba-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends LoginCommonComponent {

  constructor(
    authService: AuthService,
    router: Router,
    private dialog: MatDialog,
    ) {
      super(authService, router);
  }

  openHashHelpDialog(): void {
    const dialogRef = this.dialog.open(StoreHashInfoComponent, {
      maxWidth: 600
    });
  }

  openLoginInfoDialog(): void {
    const dialogRef = this.dialog.open(LoginInfoComponent, {
      maxWidth: 600
    });
  }
}
