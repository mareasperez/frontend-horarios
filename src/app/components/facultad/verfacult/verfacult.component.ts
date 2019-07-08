import { Component, OnInit, HostBinding } from '@angular/core';
import { FacultadSerivice } from 'src/app/services/facultad.service';
import { FacultadModel } from 'src/app/models/facultad.model';
import { DepartamentoService } from 'src/app/services/departamento.service';
@Component({
  selector: 'app-verfacult',
  templateUrl: './verfacult.component.html',
  styleUrls: ['./verfacult.component.css']
})
export class VerfacultComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  public facultades: FacultadModel[] = [];
  public alerts = true;
  socket: WebSocket;

  constructor(private facultaService: FacultadSerivice, private departamentoService: DepartamentoService) {


  }

  ngOnInit() {
    this.getfacultades();
    this.setsock()

  }
  setsock() {
    this.socket = new WebSocket('ws://localhost:8000/ws/');

    this.socket.onopen = () => {
      console.log('WebSockets connection created.');
    };

    this.socket.onmessage = (event) => {
      //  var data = JSON.parse(event.data);
      console.log("data from socket:" + event.data);
      this.getfacultades()
    };

    if (this.socket.readyState == WebSocket.OPEN) {
      this.socket.onopen(null);
    }
  }
  getfacultades() {
    this.facultades = [];
    this.facultaService.getFacultad().subscribe(
      res => {
        this.facultades.push(res);
        this.alerts = false;
      },
      err => {
        console.error(err);
      }
    );
  }
  deleteFaculta(id: string) {
    this.facultaService.deleteFacultad(id).subscribe(
      res => {
        console.log(res);
        this.getfacultades();
      },
      err => console.log(err)
    );
  }

}
