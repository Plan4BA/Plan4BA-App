import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { UserService } from '../shared/data/user/user.service';
import { User } from '../shared/data/user/user.model';
import { StoreCredentialsInfoDialog } from '../shared/dialogs/store-credentials-info/store-credentials-info.dialog';
import { LecturesPollingService } from '../shared/data/lectures/lectures-polling.service';
import { AuthService } from '../shared/auth/auth.service';
import { UserCredentialsDialog } from '../shared/dialogs/user-credentials/user-credentials.dialog';

@Component({
  selector: 'p4ba-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  selectableLangs;
  _selectedLang;
  user: User;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private lecturesPollingService: LecturesPollingService,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.userService.getData().subscribe((user: User) => this.user = user);
    this.selectedLang = localStorage.getItem('usedLanguage') || 'de';
    this.selectableLangs = this.translate.getLangs();
  }

  get selectedLang(): string {
    return this._selectedLang;
  }

  set selectedLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('usedLanguage', lang);
    this._selectedLang = lang;
  }

  ngOnInit() {
  }

  openHashHelpDialog(): void {
    const dialogRef = this.dialog.open(StoreCredentialsInfoDialog, {
      maxWidth: 600
    });
  }

  deleteUser(): void {
    const dialogRef = this.dialog.open(UserCredentialsDialog, {
      maxWidth: 600,
      data: {
        title: 'settings.deleteUserDialog.title',
        contentText: 'settings.deleteUserDialog.contentText',
        buttonName: 'settings.deleteUserDialog.buttonName',
        buttonWarn: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.username && result.password) {
        this.userService.delete(result.username, result.password).subscribe(data => {
          if (data && data.code === 200) {
            this.authService.logout();
            this.router.navigate(['/login']);
          } else {
            throw new Error('deleteUser failed');
          }
        },
        err => {
          if (err && err.status === 401) {
            this.snackBar.open(this.translate.instant('errorMessages.usernamePasswordNotMatching'), 'OK', {
              duration: 5000,
              verticalPosition: 'top'
            } );
          } else {
            console.log(err);
            throw err;
          }
        });
      }
    });
  }

  pollLectures() {
    if (this.user.hashStored) {
      this.lecturesPollingService.pollLecturesManually();
    } else {
      const dialogRef = this.dialog.open(UserCredentialsDialog, {
        maxWidth: 600,
        data: {
          title: 'settings.pollLecturesDialog.title',
          contentText: 'settings.pollLecturesDialog.contentText',
          buttonName: 'settings.pollLecturesDialog.buttonName',
          buttonWarn: false
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && result.username && result.password) {
          this.lecturesPollingService.pollLecturesManually(result.username, result.password);
        }
      });
    }
  }

}
