import { Component, OnInit } from '@angular/core';
import { RecintoModel } from 'src/app/models/recinto.model';
import { RecintoService } from 'src/app/services/recinto.service';

@Component({
  selector: 'app-verrecinto',
  templateUrl: './verrecinto.component.html',
  styleUrls: ['./verrecinto.component.css']
})
export class VerrecintoComponent implements OnInit {
  public recintos: RecintoModel[] = [];
  public alerts = true;
  socket: WebSocket;
// tslint:disable-next-line: no-shadowed-variable
  constructor(private RecintoService: RecintoService) { }

  ngOnInit() {
    this.getRecinto();
    this.setsock();
  }
  setsock() {
    this.socket = new WebSocket('ws://localhost:8000/ws/');

    this.socket.onopen = () => {
      console.log('WebSockets connection created for Recinto');
    };

    this.socket.onmessage = (event) => {
      //  var data = JSON.parse(event.data);
      // console.log('data from socket:' + event.data);
      // this.getRecintoes()
      const action = JSON.parse(event.data);
      if (action.event === 'New Recinto' || action.event === 'Delete Recinto' || action.event === 'Update Recinto' ) {
        console.log('ws envia el evento: ', action.event);
        this.getRecinto();
      }

    };

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.onopen(null);
    }
  }
  getRecinto() {
    this.recintos = [];
    this.RecintoService.getRecinto().subscribe(
      res => {
        this.recintos.push(res);
        this.alerts = false;
        console.log(this.recintos);
      },
      err => {
        console.error(err);
      }
    );
  }
  deleteFaculta(id: string) {
    this.RecintoService.deleteRecinto(id).subscribe(
      res => {
        console.log(res);
        this.getRecinto();
      },
      err => console.log(err)
    );
  }
}
