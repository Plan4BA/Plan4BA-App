import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../shared/auth/auth.service';
import { StoreCredentialsInfoDialog } from '../shared/dialogs/store-credentials-info/store-credentials-info.dialog';
import { PrivacyPolicyDialog } from '../shared/dialogs/privacy-policy/privacy-policy.dialog';

@Component({
  selector: 'p4ba-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private _isAuthenticating = false;

  selectableLangs;
  _selectedLang;

  // username and password will be set with forms
  username = '';
  password = '';
  storeHash = false;
  acceptPrivacy = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
  ) {
      this._selectedLang = localStorage.getItem('usedLanguage') || 'de';
      this.selectableLangs = this.translate.getLangs();
  }

  get isAuthenticating(): boolean {
    return this._isAuthenticating;
  }

  set isAuthenticating(isAuthenticating: boolean) {
    this._isAuthenticating = isAuthenticating;
  }

  get selectedLang(): string {
    return this._selectedLang;
  }

  set selectedLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('usedLanguage', lang);
    window.location.reload();
    this._selectedLang = lang;
  }

  login() {
    if (!this.username || !this.password) {
      this.snackBar.open(this.translate.instant('errorMessages.usernamePasswordRequired'), 'OK', {
        duration: 5000,
        verticalPosition: 'top'
      } );
      return;
    }
    if (!this.acceptPrivacy) {
      this.snackBar.open(this.translate.instant('errorMessages.acceptingPrivacyPolicyRequired'), 'OK', {
        duration: 5000,
        verticalPosition: 'top'
      } );
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
            alert(this.translate.instant('errorMessages.usernamePasswordNotMatching'));
          } else {
            alert(this.translate.instant('errorMessages.unknownError'));
          }
        }
      );
  }

  openHashHelpDialog(): void {
    const dialogRef = this.dialog.open(StoreCredentialsInfoDialog, {
      maxWidth: 600
    });
  }

  openLoginInfoDialog(): void {
    const dialogRef = this.dialog.open(PrivacyPolicyDialog, {
      maxWidth: 600
    });
  }
}
