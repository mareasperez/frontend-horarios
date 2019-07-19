import { Component, OnInit } from '@angular/core';
import { WsService } from './services/ws.service';
import { DepartamentoModel } from './models/departamento.model';
import { DepartamentoService } from './services/departamento.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Frontend';

  constructor(private wSocket:WsService,
              private d: DepartamentoService      
    ){
   
  }

  ngOnInit(){
    //this.wSocket.setsock();

    let d = new DepartamentoModel();
    d.departamento_facultad = "22";
    d.departamento_nombre = "name";
    d.departamento_id = "50";

    this.d.crearDepartamento(d).subscribe();
   
  }
}
