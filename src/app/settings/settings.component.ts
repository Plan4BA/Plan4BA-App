import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

import { AuthService } from '../shared/auth/auth.service';
import { SidenavService } from '../shared/sidenav/sidenav.service';
import { UserService } from '../shared/user/user.service';
import { User } from '../shared/user/user.model';
import { StoreHashInfoComponent } from '../shared/store-hash-info/store-hash-info.component';
import { InitialPollingService } from '../shared/initial-polling/initial-polling.service';

@Component({
  selector: 'p4ba-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sidenavService: SidenavService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private initialPollingService: InitialPollingService,
  ) {
    this.userService.getData().subscribe((user: User) => this.user = user);
  }

  ngOnInit() {
  }

  openHashHelpDialog(): void {
    const dialogRef = this.dialog.open(StoreHashInfoComponent, {
      maxWidth: 600
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
