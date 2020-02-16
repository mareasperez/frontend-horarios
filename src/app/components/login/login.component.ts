import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private JwtService: JwtService, private router: Router) { }
  user = new User();
  ngOnInit() {
    if (this.JwtService.isAuthenticated()) {
      this.router.navigate(['/home']);
      window.location.reload();
    }
  }

  login() {
    console.log(this.user);
    this.JwtService.login(this.user.username, this.user.password)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/home']);
        },
        err => console.error(err)
      );
  }
}
