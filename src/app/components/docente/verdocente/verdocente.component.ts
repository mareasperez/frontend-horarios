import { Component, OnInit } from '@angular/core';
import { DocenteModel } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';
@Component({
  selector: 'app-verdocente',
  templateUrl: './verdocente.component.html',
  styleUrls: ['./verdocente.component.scss']
})
export class VerdocenteComponent implements OnInit {

  public docentes: DocenteModel[] = [];
  public alerts = true;
  public dataSource;
  displayedColumns: string[] = ['id', 'nombre', 'contrato', 'inss', 'departamento', 'opciones'];
  socket: WebSocket;
// tslint:disable-next-line: no-shadowed-variable
  constructor(private DocenteService: DocenteService) { }

  ngOnInit() {
    this.getDocente();
    this.setsock();
  }
  setsock() {
    this.socket = new WebSocket('ws://localhost:8000/ws/');

    this.socket.onopen = () => {
      console.log('WebSockets connection created for Docente');
    };

    this.socket.onmessage = (event) => {
      //  var data = JSON.parse(event.data);
      // console.log('data from socket:' + event.data);
      // this.getRecintoes()
      const action = JSON.parse(event.data);
      if (action.event === 'New Docente' || action.event === 'Delete Docente' || action.event === 'Update Docente' ) {
        console.log('ws envia el evento: ', action.event);
        this.getDocente();
      }

    };

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.onopen(null);
    }
  }
  getDocente() {
    this.docentes = [];
    this.DocenteService.getDocente().subscribe(
      res => {
        this.docentes.push(res);
        this.alerts = false;
        console.log(this.docentes);
        this.dataSource = this.docentes;
        console.log(this.dataSource);
      },
      err => {
        console.error(err);
      }
    );
  }
  deleteDocente(id: string) {
    this.DocenteService.deleteDocente(id).subscribe(
      res => {
        console.log(res);
        this.getDocente();
      },
      err => console.log(err)
    );
  }

}
