import { Component, OnInit } from '@angular/core';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';

@Component({
  selector: 'app-verplanestudio',
  templateUrl: './verplanestudio.component.html',
  styleUrls: ['./verplanestudio.component.scss']
})
export class VerplanestudioComponent implements OnInit {

  public pde:PlanEstudioModel[] = [];
  public alerts = true;
  public dataSource;
  displayedColumns: string[] = ['id', 'nombre', 'anyo', 'carrera', 'opciones'];
  socket: WebSocket;
  constructor(private PlanEstudioService: PlanEstudioService) {
    this.PlanEstudioService.getPlanEstudio().subscribe(plan=>{
      this.pde.push(plan)
      this.dataSource = this.pde;
      console.log(this.dataSource);
      })
      
   }

  ngOnInit() {
   // this.getPlanEstudio();
   // this.setsock();
  }
  /*setsock() {
    this.socket = new WebSocket('ws://localhost:8000/ws/');

    this.socket.onopen = () => {
      console.log('WebSockets connection created for PlanEstudio');
    };

    this.socket.onmessage = (event) => {
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
    this.pde = [];
    this.PlanEstudioService.get().subscribe(
      res => {
        this.pde.push(res);
        this.alerts = false;
        console.log('AQUI ESTA DATA');
        console.log(this.pde);
        this.dataSource = this.pde;
        console.log(this.dataSource);
      },
      err => {
        console.error(err);
      }
    );
  }*/


  /*deletePlanEstudio(id: string) {
    this.PlanEstudioService.deletePde(id)
    .subscribe(
      res => {
        console.log(res);
        //this.getPlanEstudio();
      },
      err => console.log(err)
    );
  }*/

  

}
