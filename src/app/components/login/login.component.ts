import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private JwtService: JwtService) { }
 user = new User();
  ngOnInit() {
  }

  login() {
    console.log(this.user);
    this.JwtService.login(this.user.username, this.user.password)
      .subscribe(
        res => {
          console.log(res);
          // this.route.navigate(['/facultad/list'])
        },
        err => console.error(err)
      );
  }
}
