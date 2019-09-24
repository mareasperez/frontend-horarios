import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { Observable, Subscription } from 'rxjs';
import { AddPlanificacionComponent } from './add-planificacion/add-planificacion.component';
import { MatDialog } from '@angular/material';
import * as $ from 'jquery';

@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.scss']
})
export class PlanificacionComponent implements OnInit, OnDestroy {
  public planificaciones: PlanificacionModel[] = []
  refPla:Observable<any>;
  subs:Subscription[]=[]
  constructor(private _planificacion:PlanificacionService,
              private dialog: MatDialog           
    ) { 
  this.subs.push(
    this._planificacion.getPlanificaciones().subscribe(res=>{
      this.planificaciones.push(res)
    })
    
    );
    this.refPla = this._planificacion.getList()
  }

  ngOnInit() {
    this.subs.push(
      this.refPla.subscribe(data=>{
        this.planificaciones = data
      })
    );
  }

  ngOnDestroy(){
    this._planificacion.list = []
    this.subs.map(sub=>sub.unsubscribe())
  }

  delPlan(id){
    this._planificacion.deletePlanificacion(id).subscribe()
  }

  editPlan(id:string){
    let plan = this.planificaciones.find(plan=>plan.planificacion_id===id)
    this._planificacion.updatePlanificacion(plan, plan.planificacion_id).subscribe()
  }


  openDialog(tipo, id?): void {
    if(tipo === 'c'){
      const dialogRef = this.dialog.open(AddPlanificacionComponent, {
        width: '450px',
        data: {type: tipo}
      });
    } else {

      let plan = this.planificaciones.find(p => p.planificacion_id === id);
      const dialogRef = this.dialog.open(AddPlanificacionComponent, {
        width: '450px',
        data: {type: tipo, plan: plan}
      });
    }
  }

}
