import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { matErrorsMessage } from 'src/app/utils/errors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
// tslint:disable: variable-name
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public error = false;
  public hide = true;
  public loading = false;
  public Errors: matErrorsMessage = new matErrorsMessage();

  constructor(
    private _JwtService: JwtService,
    private router: Router,
    private _title: Title,
    private formBuilder: FormBuilder,
  ) {
    this._title.setTitle('Log In');
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    if (this._JwtService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }
  get Form() { return this.loginForm.controls; }

  login() {
    this.loading = true;
    this._JwtService.login(this.Form.username.value, this.Form.password.value)
      .subscribe(
        res => {
          console.log(res);
          window.location.reload();
          this.loading = false;
        },
        err => { alert(err.error.non_field_errors); this.loading = false; }
    );
  }
}
