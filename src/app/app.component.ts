import { Component, OnInit } from '@angular/core';
import { WsService } from './services/ws.service';
import { JwtService } from './services/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// tslint:disable: no-shadowed-variable
export class AppComponent implements OnInit {
  title = 'Frontend';

  constructor(
    private wSocket: WsService,
    private JwtService: JwtService
  ) {
  }

  ngOnInit() {
    if (this.JwtService.isAuthenticated && this.JwtService.loggedIn) {
      this.wSocket.setsock();
    }
  }
  verificar(): boolean {
    const aux = this.JwtService.loggedIn;
    const aux2 = this.JwtService.isAuthenticated();
    return aux && aux2;

  }
}
