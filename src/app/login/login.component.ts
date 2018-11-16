import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';
import { alert } from '../shared/dialog-util/dialog-util';

@Component({
  selector: 'p4ba-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // username and password will be set with forms
  private username: string = 'hardcoded-username';
  private password: string = 'hardcoded-password';

  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.username, this.password)
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          // status code 401 means "unauthorized"
          if (error.status === 401) {
            alert('The combination of username and password don\'t match an account.');
          } else {
            alert('An unknown error occured while trying to log in.');
          }
        }
      );
  }

}
