import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComponenteService } from 'src/app/services/componente.service';
import { ComponenteModel } from 'src/app/models/componente.model';
import { Subscription, Observable } from 'rxjs';
import { GrupoService } from 'src/app/services/grupo.service';
import { GrupoModel } from 'src/app/models/grupo.model';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { CarreraModel } from 'src/app/models/carrera.model';
import { AreaService } from 'src/app/services/area.service';
import { DocenteService } from 'src/app/services/docente.service';
import { DocenteModel } from 'src/app/models/docente.model';
import { AreaModel } from 'src/app/models/area.model';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.scss']
})
export class CrearGrupoComponent implements OnInit, OnDestroy {
  /*Variables de payloas */
public componentes:ComponenteModel[]=[]
public compsByPde:ComponenteModel[]=[]
public pdes:PlanEstudioModel[]=[]
public carreras:CarreraModel[]=[]
public grupos: GrupoModel[] = [];
public gruposByPlan: GrupoModel[] = [];
public gruposByComp: GrupoModel[] = [];
public docentes:DocenteModel[]=[];
public areas:AreaModel[]=[];
public planificaciones: PlanificacionModel[]=[];
/*Actualizacion por ws */
public refComp:Observable<any>
public refGP:Observable<any>
public refPla:Observable<any>
public refPde:Observable<any>
public refCarrera:Observable<any>
public refArea:Observable<any>
public refDocente:Observable<any>
/*Flags y subscripciones */
private subs:Subscription[]=[]
private planID = "0"
private promesas: Promise<any>[]=[];
public show = false;
public pdeSelected = "0"
public planSelected = "0"


  constructor(private _componente:ComponenteService,
              private _grupo:GrupoService,
              private _planificacion:PlanificacionService,
              private _pde:PlanEstudioService,
              private _carrera:CarreraService,
              private _area: AreaService,
              private _docente:DocenteService

    ) {
    this.servicios()
    this.refComp = this._componente.getList()
    this.refGP = this._grupo.getList()
    this.refPde = this._pde.getList()
    this.refCarrera = this._carrera.getList()
    this.refArea = this._area.getList()
    this.refDocente = this._docente.getList()

}

  ngOnInit() {
    Promise.all(this.promesas).then(()=>{
      this.show = true
      this.subs.push(this.refComp
        .subscribe(data=>{
          this.componentes = data;
          this.componentesByPde(this.pdeSelected)
       })
      )
      this.subs.push(this.refGP
        .subscribe(data=>{
         this.grupos = data;
         this.componentesByPde(this.pdeSelected)
        })
      );
       this.subs.push(this.refPde.subscribe(data=>this.pdes = data))
       this.subs.push(this.refCarrera.subscribe(data=>this.carreras = data))
       this.subs.push(this.refArea.subscribe(data=>this.areas = data))
       this.subs.push(this.refDocente.subscribe(data=>this.docentes = data))

    })
  }

  ngOnDestroy(){
    this.subs.forEach(sub=>sub.unsubscribe())
  }

  addGroup(e){
    let grupo = new GrupoModel()
    grupo.grupo_componente = e.id;
    grupo.grupo_horas_clase = 4;
    grupo.grupo_max_capacidad = "40";
    grupo.grupo_modo = "servicio";
    grupo.grupo_planta = false;
    grupo.grupo_docente = null;
    grupo.grupo_id = null;
    grupo.grupo_tipo = e.tipo
    grupo.grupo_planificacion = this.planID
    this._grupo.crearGrupo(grupo).subscribe(res=>{
      console.log(res)
    })
    console.log(e)
  }

  componentesByPde(id:string){
    let comps = this.componentes.filter(comp=>id === comp.componente_pde)
    this.compsByPde = comps;
    this.gruposByComp = []
    this.compsByPde.forEach(comp=>{
      let res =  this.grupos.filter(gp=>gp.grupo_componente === comp.componente_id)
      res.forEach(gp=>this.gruposByComp.push(gp))     
    })
    if(id !== "0") this.groupsByPlan(this.planSelected)
  }

  groupsByPlan(id:string){
    this.planID = id
    let grupos = this.gruposByComp.filter(gp=> id === gp.grupo_planificacion) 
    console.log(grupos)  
    this.gruposByPlan = grupos;
  }

  servicios(){
    const p1 = new Promise((resolve,reject)=>{
      const sub =  this._grupo.getGrupos()
      .subscribe(
        res => this.grupos.push(res),
        error => reject(error),
        ()=>resolve()
        );
      this.subs.push(sub)
    })

    const p2 = new Promise((resolve,reject)=>{
      const sub =  this._componente.getComponentes()
      .subscribe(
        res => this.componentes.push(res),
        error => reject(error),
        ()=>resolve()
        );
      this.subs.push(sub)

   });
   
   const p3 = new Promise((resolve,reject)=>{
    const sub =  this._planificacion.getPlanificaciones()
    .subscribe(
      res => this.planificaciones.push(res),
      error => reject(error),
      ()=>resolve()
      );
    this.subs.push(sub)
 });


 const p4 = new Promise((resolve,reject)=>{
  const sub =  this._pde.getPlanEstudio()
  .subscribe(
    res => this.pdes.push(res),
    error => reject(error),
    ()=>resolve()
    );
  this.subs.push(sub)
});

const p5 = new Promise((resolve,reject)=>{
const sub =  this._carrera.getCarrera()
.subscribe(
  res => this.carreras.push(res),
  error => reject(error),
  ()=>resolve()
  );
this.subs.push(sub)
})

const p6 = new Promise((resolve,reject)=>{
const sub =  this._planificacion.getPlanificaciones()
.subscribe(
  res => this.planificaciones.push(res),
  error => reject(error),
  ()=>resolve()
  )
this.subs.push(sub)
})

const p7 = new Promise((resolve,reject)=>{
const sub =  this._docente.getDocente()
.subscribe(
  res => this.docentes.push(res),
  error => reject(error),
  ()=>resolve()
  )
this.subs.push(sub)
})

const p8 = new Promise((resolve,reject)=>{
const sub =  this._area.getAreas()
.subscribe(
  res => this.areas.push(res),
  error => reject(error),
  ()=>resolve()
  )
this.subs.push(sub)
})
this.promesas.push(p8,p7,p6,p5,p4,p3,p2,p1)
  }
}
