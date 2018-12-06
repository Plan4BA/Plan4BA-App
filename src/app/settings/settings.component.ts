import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { SidenavService } from '../shared/sidenav/sidenav.service';
import { UserService } from '../shared/user/user.service';
import { User } from '../shared/user/user.model';
import { StoreHashInfoComponent } from '../shared/store-hash-info/store-hash-info.component';
import { InitialPollingService } from '../shared/initial-polling/initial-polling.service';
import { AuthService } from '../shared/auth/auth.service';
import { UserCredentialsComponent } from '../shared/user-credentials-dialog/user-credentials.component';

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
    private sidenavService: SidenavService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private initialPollingService: InitialPollingService,
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
    this._selectedLang = lang;
  }

  ngOnInit() {
  }

  openHashHelpDialog(): void {
    const dialogRef = this.dialog.open(StoreHashInfoComponent, {
      maxWidth: 600
    });
  }

  deleteUser(): void {
    const dialogRef = this.dialog.open(UserCredentialsComponent, {
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
      this.initialPollingService.pollLecturesManually();
    } else {
      const dialogRef = this.dialog.open(UserCredentialsComponent, {
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
          this.initialPollingService.pollLecturesManually(result.username, result.password);
        }
      });
    }
  }

}
