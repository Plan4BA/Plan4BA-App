import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { AuthService } from '../shared/auth/auth.service';
import { alert } from '../shared/dialog-util/dialog-util';
import { StoreHashInfoComponent } from '../shared/store-hash-info/store-hash-info.component';
import { LoginInfoComponent } from '../shared/login-info/login-info.component';

@Component({
  selector: 'p4ba-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private _isAuthenticating = false;

  // username and password will be set with forms
  username = '';
  password = '';
  storeHash = false;
  acceptPrivacy = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    ) { }

  get isAuthenticating(): boolean {
    return this._isAuthenticating;
  }

  set isAuthenticating(isAuthenticating: boolean) {
    this._isAuthenticating = isAuthenticating;
  }

  login() {
    if (!this.username || !this.password) {
      alert('Please enter a username and a password!');
      return;
    }
    if (!this.acceptPrivacy) {
      alert('Please accept the privacy conditions!');
      return;
    }
    this.isAuthenticating = true;
    const loginSub = this.authService.login(this.username, this.password, this.storeHash)
      .subscribe(
        () => {
          this.isAuthenticating = false;
          loginSub.unsubscribe();
          this.router.navigate(['/']);
        },
        (error) => {
          // status code 401 means "unauthorized"
          this.isAuthenticating = false;
          loginSub.unsubscribe();
          if (error.status === 401) {
            alert('The combination of username and password don\'t match an account.');
          } else {
            alert('An unknown error occured while trying to log in.');
          }
        }
      );
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
