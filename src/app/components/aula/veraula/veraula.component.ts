import { Component, OnInit } from '@angular/core';
import { AulaModel } from 'src/app/models/aula.model';
import { AulaService } from 'src/app/services/aula.service';

@Component({
  selector: 'app-veraula',
  templateUrl: './veraula.component.html',
  styleUrls: ['./veraula.component.scss']
})
export class VeraulaComponent implements OnInit {

  public aulas: AulaModel[] = [];
  public alerts = true;
  public dataSource;
  displayedColumns: string[] = ['id', 'nombre', 'capacidad', 'tipo', 'opciones'];
  socket: WebSocket;
// tslint:disable-next-line: no-shadowed-variable
  constructor(private AulaService: AulaService) { }

  ngOnInit() {
    this.getAula();
    this.setsock();
  }
  setsock() {
    this.socket = new WebSocket('ws://localhost:8000/ws/');

    this.socket.onopen = () => {
      console.log('WebSockets connection created for Aula');
    };

    this.socket.onmessage = (event) => {
      //  var data = JSON.parse(event.data);
      // console.log('data from socket:' + event.data);
      // this.getRecintoes()
      const action = JSON.parse(event.data);
      if (action.event === 'New Aula' || action.event === 'Delete Aula' || action.event === 'Update Aula' ) {
        console.log('ws envia el evento: ', action.event);
        this.getAula();
      }

    };

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.onopen(null);
    }
  }
  getAula() {
    this.aulas = [];
    this.AulaService.getAula().subscribe(
      res => {
        this.aulas.push(res);
        this.alerts = false;
       // console.log(this.aulas);
        this.dataSource = this.aulas;
        console.log(this.dataSource);
      },
      err => {
        console.error(err);
      }
    );
  }
  deleteAula(id: string) {
    this.AulaService.deleteAula(id).subscribe(
      res => {
        console.log(res);
        this.getAula();
      },
      err => console.log(err)
    );
  }

}
