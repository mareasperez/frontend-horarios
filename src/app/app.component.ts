import { Component, OnInit } from '@angular/core';
import { WsService } from './services/ws.service';
import { DocenteService } from './services/docente.service';
import { DocenteModel } from './models/docente.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Frontend';

  constructor(private wSocket:WsService,
              private docenteService: DocenteService          
    ){
   
  }

  ngOnInit(){
    //this.wSocket.setsock();
   
  }
}
