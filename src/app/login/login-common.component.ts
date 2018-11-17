import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';
import { alert } from '../shared/dialog-util/dialog-util';

export class LoginCommonComponent {

  private _isAuthenticating = false;

  // username and password will be set with forms
  username = '';
  password = '';

  constructor(
    protected authService: AuthService,
    protected router: Router,
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
    this.isAuthenticating = true;
    this.authService.login(this.username, this.password)
      .subscribe(
        () => {
          this.isAuthenticating = false;
          this.router.navigate(['/']);
        },
        (error) => {
          // status code 401 means "unauthorized"
          this.isAuthenticating = false;
          if (error.status === 401) {
            alert('The combination of username and password don\'t match an account.');
          } else {
            alert('An unknown error occured while trying to log in.');
          }
        }
      );
  }
}
