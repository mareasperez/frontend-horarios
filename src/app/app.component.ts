import { Component, OnInit } from '@angular/core';
import { WsService } from './services/ws.service';
import { DepartamentoModel } from './models/departamento.model';
import { DepartamentoService } from './services/departamento.service';
import { JwtService } from './services/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Frontend';

  constructor(
    private wSocket: WsService,
    private d: DepartamentoService,
    private JwtService: JwtService
  ) {
  }

  ngOnInit() {
    // this.wSocket.setsock();

  }
  verificar(): boolean {
    var aux = this.JwtService.loggedIn;
    var aux2 = this.JwtService.isAuthenticated();
    return aux && aux2;
    
  }
}
