import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocenteHorasService } from 'src/app/services/docente-horas.service';
import { DocenteHorasModel } from 'src/app/models/docente.horas.model';
import { DocenteService } from 'src/app/services/docente.service';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { DocenteModel } from 'src/app/models/docente.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DocHorasAddComponent } from '../doc-horas-add/doc-horas-add.component';

@Component({
  selector: 'app-doc-horas',
  templateUrl: './doc-horas.component.html',
  styleUrls: ['./doc-horas.component.scss']
})
export class DocHorasComponent implements OnInit, OnDestroy {
  public dhs:DocenteHorasModel[]=[]
  public planificaciones: PlanificacionModel[]=[]
  public docentes:DocenteModel[]=[]
  private refPlan:Observable<any>
  private refDoc:Observable<any>
  private refDH:Observable<any>
  private subs:Subscription[]=[]
  dataSource:DocenteHorasModel[]
  displayedColumns: string[] = ['docente', 'horas_planta', 'horas_extras', 'total', 'planificacion', 'opciones'];

  constructor(private _doc_hr:DocenteHorasService,
              private _docente:DocenteService,
              private _planificacion:PlanificacionService,
              private dialog: MatDialog 

    ) {
        this.subs.push( this._doc_hr.getDcHoras().subscribe(res=>{
          console.log(res)
        this.dhs.push(res)
        this.dataSource = this.dhs
        }));
        this.subs.push( this._docente.getDocente().subscribe(res=>this.docentes.push(res)));
        this.subs.push( this._planificacion.getPlanificaciones().subscribe(res=>this.planificaciones.push(res)));
        this.refDoc = this._docente.getList()
        this.refPlan = this._planificacion.getList()
        this.refDH = this._doc_hr.getList()
   }

  ngOnInit() {

   this.subs.push( this.refDoc.subscribe(data=>{
      this.dataSource = [];
        this.docentes = data
        data.map(doc=>{
          this.dataSource.push(doc);
        });
    }))

    this.subs.push(this.refPlan.subscribe(data=>{
      this.dataSource = [];
        this.planificaciones = data
        data.map(plan=>{
          this.dataSource.push(plan);
        });
    }))

    this.subs.push(this.refDH.subscribe(data=>{
      this.dataSource = [];
        this.dhs = data
        data.map(dh=>{
          this.dataSource.push(dh);
        });
    }))

  }
ngOnDestroy(){
  this._doc_hr.list=[]
  this._docente.list=[]
  this._planificacion.list=[]
  this.subs.map(sub=>sub.unsubscribe())
}

delDH(id){
  this._doc_hr.deleteDcHora(id).subscribe(res=>console.log(res))
}

openDialog(tipo, id?:string): void {
  if(tipo === 'c'){
    const dialogRef = this.dialog.open(DocHorasAddComponent, {
      width: '450px',
      data: {type:tipo}      
    });
  }else{
    let dh = this.dhs.find(dh=>dh.dh_id === Number(id))
    const dialogRef = this.dialog.open(DocHorasAddComponent, {
      width: '450px',
      data: {type:tipo, dh:dh }
    });
  }
}

getDocenteName(id){
  return this.docentes.find(doc=>doc.docente_id === id).docente_nombre

}

getPlanificacion(id){
  let plan = this.planificaciones.find(plan=>plan.planificacion_id === id)
  return `semetre ${plan.planificacion_semestre} | ${plan.planificacion_anyo_lectivo}`
}



}
