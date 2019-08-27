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
     }

  deletePlanEstudio(id: number) {
    this.PlanEstudioService.deletePde(id)
    .subscribe(
      res => {
       this.dataSource = this.dataSource.filter(p=> p.pde_id != id )
      },
      err => console.log(err)
    );
  }

  

}
