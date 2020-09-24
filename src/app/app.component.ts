import { Component, OnInit } from '@angular/core';
import { WsService } from './services/ws.service';
import { JwtService } from './services/jwt.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// tslint:disable: no-shadowed-variable
export class AppComponent implements OnInit {
  title = 'Frontend';
  public verified = false;

  constructor(
    private wSocket: WsService,
    private JwtService: JwtService,
    private titleService: Title
  ) {
  }

  ngOnInit() {
    // this.JwtService.isAuthenticated && this.JwtService.loggedIn && this.token() ? this.wSocket.setsock() : false
    this.token();
  }
  verificar(): boolean {
    const aux = this.JwtService.loggedIn;
    const aux2 = this.JwtService.isAuthenticated();
    return aux && aux2;
  }
  token() {
    console.log();
    this.JwtService.tokenVerify().subscribe(
      // res => res === this.JwtService.Token ? this.verified = true : this.verified = false,
      res => {
        if (this.JwtService.isAuthenticated && this.JwtService.loggedIn) {
          this.wSocket.setsock();
        }
      },
      err => this.JwtService.logout(),
    );
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
