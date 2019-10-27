import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComponenteService } from 'src/app/services/componente.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { DocenteModel } from 'src/app/models/docente.model';
import { GrupoModel } from 'src/app/models/grupo.model';
import { ComponenteModel } from 'src/app/models/componente.model';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { DocenteService } from 'src/app/services/docente.service';
import { Subscription } from 'rxjs';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { MatTableDataSource } from '@angular/material';
class cargaComponente{
  componente:ComponenteModel
  grupo:GrupoModel
  docente:DocenteModel
  carrera:CarreraModel
}
@Component({
  selector: 'app-carga-componentes',
  templateUrl: './carga-componentes.component.html',
  styleUrls: ['./carga-componentes.component.scss']
})
export class CargaComponentesComponent implements OnInit, OnDestroy {
  public docentes:DocenteModel[]=[]
  public grupos:GrupoModel[]=[]
  public comps:ComponenteModel[]=[]
  public planificaciones:PlanificacionModel[]=[]
  private planes:PlanEstudioModel[]=[]
  private carreras:CarreraModel[]=[]
  public show = false
  public selected = "0"
  private subs:Subscription[]=[]
  promesas: Promise<any>[]=[];
  public cargas:any[]=[];
  public dataSource;
  arr:cargaComponente[]=[]
  displayedColumns: string[] = ['docente','carrera', 'anyo', 'grupo', 'horas'];

  constructor(private _comp:ComponenteService,
              private _grupo:GrupoService,
              private _docente:DocenteService,
              private _planificacion:PlanificacionService,
              private _plan:PlanEstudioService,
              private _carrera:CarreraService
    ) { 

    let p1 =  new Promise((resolve, reject)=>{
        let sub =  this._grupo.getGrupos()
        .subscribe(
          grupo=>this.grupos.push(grupo),
          error=>reject(error),
          ()=>resolve()
          )
          this.subs.push(sub)
        })

    let p2 =  new Promise((resolve, reject)=>{
        let sub =  this._docente.getDocente()
        .subscribe(
          docente=>
          this.docentes.push(docente),
          error=>reject(error),
          ()=>resolve()
        )
          this.subs.push(sub)
        })

    let p3 =  new Promise((resolve, reject)=>{
        let sub =  this._comp.getComponentes()
        .subscribe(comp=>
          this.comps.push(comp),
          error=>reject(error),
          ()=>resolve()
        )
          this.subs.push(sub)
        })

    let p4 =  new Promise((resolve, reject)=>{
          let sub = this._planificacion.getPlanificaciones()
          .subscribe(
            pl=>this.planificaciones.push(pl),
            error=>reject(error),
            ()=>resolve()
          )
          this.subs.push(sub)
        })

    let p5 =  new Promise((resolve, reject)=>{
      let sub =  this._plan.getPlanEstudio()
      .subscribe(
        plan=>this.planes.push(plan),
        error=>reject(error),
        ()=>resolve()
        )
        this.subs.push(sub)
      })

      let p6 =  new Promise((resolve, reject)=>{
        let sub =  this._carrera.getCarrera()
        .subscribe(
          carrera=>this.carreras.push(carrera),
          error=>reject(error),
          ()=>resolve()
          )
          this.subs.push(sub)
        })
  
    this.promesas.push(p1,p2,p3,p4,p5,p6)
  }

  ngOnInit() {
    Promise.all(this.promesas).then(res=>this.show = true)
  }

  ngOnDestroy(){
    this._comp.list = []
    this._docente.list = []
    this._grupo.list = []
    this._planificacion.list = []
    this.subs.forEach(sub=>sub.unsubscribe())
  }


  groupByPlan(id:string){
    let grupos = this.grupos.filter(gp=> id === gp.grupo_planificacion)   
    this.reporte(grupos) 
  }

  reporte(gruposByPlan:GrupoModel[]){
    let planes=[];
    let grupos=[];
     this.comps.forEach((cp,i)=>{
       let gps = gruposByPlan.filter(gp=>cp.componente_id === gp.grupo_componente)
       if(gps.length>0){
       /*  let carga:cargaComponente= new cargaComponente();
         carga.componente = cp
         this.cargas.push(carga)*/
         grupos.push(gps)
       }
     })
     //console.log(this.cargas)
     grupos.forEach((gpc:GrupoModel[],i)=>{
      this.arr = []
      gpc.forEach((gp:GrupoModel,j)=>{
        let carga:cargaComponente= new cargaComponente();
        carga.grupo = gp
        carga.docente = this.docentes.find(dc=>dc.docente_id === gp.grupo_docente)
        carga.componente = this.comps.find(cp=>cp.componente_id === gp.grupo_componente)
        this.arr.push(carga)
      })
      this.cargas[i] = this.arr
     })

     this.cargas.forEach((cgs:cargaComponente[],i)=>{
       cgs.forEach((cg:cargaComponente,j)=>{
         let plan = this.planes.filter(plan=>plan.pde_id === cg.componente.componente_pde)[0]
        // console.log(plan)
        planes.push(plan)
        let c = this.carreras.filter(cr=>cr.carrera_id === plan.pde_carrera)[0]
        this.cargas[i][j].carrera = c
       })
      })
    //  console.log(planes)
      
     /* planes.forEach((plan:PlanEstudioModel,i)=>{
        this.cargas[i].carrera = this.carreras.filter(cr=>cr.carrera_id === plan.pde_carrera)[0]
      })*/
     // console.log(this.cargas)
    /* this.dataSource = this.cargas.map((carga:cargaComponente[])=>{
       let item = {}
       item["data"] = new MatTableDataSource<cargaComponente>(carga)
       console.log(item)
       return item
     })*/
     this.dataSource = this.cargas
     console.log(this.dataSource)
     this.cargas =[]

  }

  getPlanName(id){
      let plan = this.planificaciones.find(plan=>id === plan.planificacion_id)
      return `semestre ${plan.planificacion_semestre} del año ${plan.planificacion_anyo_lectivo}`
  }


}
