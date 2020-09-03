import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
// tslint:disable: variable-name
export class LoginComponent implements OnInit {

  constructor(
    private _JwtService: JwtService,
    private router: Router,
    private _title: Title
  ) {
    this._title.setTitle('Log In');
  }
  user = new User();
  ngOnInit() {
    if (this._JwtService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    this._JwtService.login(this.user.username, this.user.password)
      .subscribe(
        res => {
          // this.router.navigate(['/home']);
          window.location.reload();
        },
        err => console.error(err)
      );
  }
}
