import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { LoadingIndicator } from 'nativescript-loading-indicator';

import { AuthService } from '../shared/auth/auth.service';
import { alert } from '../shared/dialog-util/dialog-util';
import { LoginCommonComponent } from './login-common.component';

@Component({
  selector: 'p4ba-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends LoginCommonComponent implements OnInit {

  @ViewChild('passwordField') passwordField: ElementRef;
  loadingIndicator: LoadingIndicator = new LoadingIndicator();

  constructor(
    authService: AuthService,
    router: Router,
    private page: Page
    ) {
      super(authService, router);
  }

  set isAuthenticating(isAuthenticating: boolean) {
    super.isAuthenticating = isAuthenticating;
    if (isAuthenticating) {
      this.loadingIndicator.show();
    } else {
      this.loadingIndicator.hide();
    }
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }

  focusPassword() {
    this.passwordField.nativeElement.focus();
  }
}