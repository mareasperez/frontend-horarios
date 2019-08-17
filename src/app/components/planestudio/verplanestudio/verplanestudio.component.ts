import { Component, OnInit } from '@angular/core';
import { PlanEstudioModel } from 'src/app/models/planEstudio';

@Component({
  selector: 'app-verplanestudio',
  templateUrl: './verplanestudio.component.html',
  styleUrls: ['./verplanestudio.component.scss']
})
export class VerplanestudioComponent implements OnInit {

  public departamentos: PlanEstudioModel[] = [];
  public alerts = true;
  public dataSource;
  displayedColumns: string[] = ['id', 'nombre', 'facultad', 'opciones'];
  socket: WebSocket;
// tslint:disable-next-line: no-shadowed-variable
  constructor(private PlanEstudioService: PlanEstudioService) { }

  ngOnInit() {
    this.getPlanEstudio();
    this.setsock();
  }
  setsock() {
    this.socket = new WebSocket('ws://localhost:8000/ws/');

    this.socket.onopen = () => {
      console.log('WebSockets connection created for PlanEstudio');
    };

    this.socket.onmessage = (event) => {
      //  var data = JSON.parse(event.data);
      // console.log('data from socket:' + event.data);
      // this.getRecintoes()
      const action = JSON.parse(event.data);
      if (action.event === 'New PlanEstudio' || action.event === 'Delete PlanEstudio' || action.event === 'Update PlanEstudio' ) {
        console.log('ws envia el evento: ', action.event);
        this.getPlanEstudio();
      }

    };

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.onopen(null);
    }
  }
  getPlanEstudio() {
    this.departamentos = [];
    this.PlanEstudioService.getPlanEstudio().subscribe(
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
  deletePlanEstudio(id: string) {
    this.PlanEstudioService.deletePlanEstudio(id).subscribe(
      res => {
        console.log(res);
        this.getPlanEstudio();
      },
      err => console.log(err)
    );
  }

}
