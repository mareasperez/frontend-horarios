import { Component, OnInit } from '@angular/core';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'app-verdepartamento',
  templateUrl: './verdepartamento.component.html',
  styleUrls: ['./verdepartamento.component.scss']
})
export class VerdepartamentoComponent implements OnInit {

  public departamentos: DepartamentoModel[] = [];
  public alerts = true;
  public dataSource;
  displayedColumns: string[] = ['id', 'nombre', 'facultad', 'opciones'];
  socket: WebSocket;
// tslint:disable-next-line: no-shadowed-variable
  constructor(private DepartamentoService: DepartamentoService) { }

  ngOnInit() {
    this.getDepartamento();
    this.setsock();
  }
  setsock() {
    this.socket = new WebSocket('ws://localhost:8000/ws/');

    this.socket.onopen = () => {
      console.log('WebSockets connection created for Departamento');
    };

    this.socket.onmessage = (event) => {
      //  var data = JSON.parse(event.data);
      // console.log('data from socket:' + event.data);
      // this.getRecintoes()
      const action = JSON.parse(event.data);
      if (action.event === 'New Departamento' || action.event === 'Delete Departamento' || action.event === 'Update Departamento' ) {
        console.log('ws envia el evento: ', action.event);
        this.getDepartamento();
      }

    };

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.onopen(null);
    }
  }
  getDepartamento() {
    this.departamentos = [];
    this.DepartamentoService.getDepartamento().subscribe(
      res => {
        this.departamentos.push(res);
        this.alerts = false;
        console.log(this.departamentos);
        this.dataSource = this.departamentos;
        console.log(this.dataSource);
      },
      err => {
        console.error(err);
      }
    );
  }
  deleteDepartamento(id: string) {
    this.DepartamentoService.deleteDepartamento(id).subscribe(
      res => {
        console.log(res);
        this.getDepartamento();
      },
      err => console.log(err)
    );
  }
}
