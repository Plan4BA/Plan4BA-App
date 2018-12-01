import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';
import { SidenavService } from '../shared/sidenav/sidenav.service';

@Component({
  selector: 'p4ba-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private sidenavService: SidenavService,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
