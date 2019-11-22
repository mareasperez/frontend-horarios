import { Component, OnInit, OnDestroy } from '@angular/core';
import { AulaService } from 'src/app/services/aula.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { GrupoModel } from 'src/app/models/grupo.model';
import { Observable, Subscription } from 'rxjs';
import { HorarioService } from 'src/app/services/horario.service';
import { MatSnackBar } from '@angular/material';
import { AulaModel } from 'src/app/models/aula.model';
import { HorarioModel } from 'src/app/models/horario.model';
import { ComponenteModel } from 'src/app/models/componente.model';
import { ComponenteService } from 'src/app/services/componente.service';
import { getItemLocalCache, Horas } from 'src/app/utils/utils';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { CarreraModel } from 'src/app/models/carrera.model';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { RecintoModel } from 'src/app/models/recinto.model';
import { RecintoService } from 'src/app/services/recinto.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosCrudComponent implements OnInit, OnDestroy {
  public grupos: GrupoModel[] = [];
  public componentes: ComponenteModel[]=[]
  public aulas: AulaModel[] =[];
  public horarios: HorarioModel[]=[];
  public carreras: CarreraModel[]=[]
  public planificaciones: PlanificacionModel[]=[];
  public recintos: RecintoModel[] = [];

  public gruposByComp: GrupoModel[] = [];
  public compsByPde: ComponenteModel[]=[];
  public compsByCiclo: ComponenteModel[]=[];
  public pdeByCarrera: PlanEstudioModel[]=[];
  public gruposByPlan: GrupoModel[] = [];
  public pdes: PlanEstudioModel[]=[];
  public horas = Horas;
  public selectedR: RecintoModel;
  public pdeSelected = getItemLocalCache("pde");
  public planSelected = getItemLocalCache("planificacion");
  public cicloSelected = '0';
  public carreraSelected = getItemLocalCache("carrera");
  public planID = '0';
  public grupoSelected = '0'
  public diaSelected = '0';
  public horaSelected = '0';
  public aulaSelected = '0';
  public refGP: Observable<any>;
  public refComp: Observable<any>;
  public refAula: Observable<any>
  public refPde: Observable<any>;
  public refCarrera: Observable<any>;
  public refPla: Observable<any>;
  public refRecintos: Observable<any>;
  public dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
 
  public show = false;
  private subs: Subscription[] = [];
  private promesas: Promise<any>[] = [];
  constructor(private _grupo: GrupoService,
              private _aula: AulaService,
              private _horario: HorarioService,
              private _componente: ComponenteService,
              private _pde: PlanEstudioService,
              private _carrera: CarreraService,
              private _planificacion: PlanificacionService,
              private _recinto: RecintoService,

              
              private _snack: MatSnackBar


              ) { 

                this.servicos();
                this.refPde = this._pde.getList();
                this.refCarrera = this._carrera.getList();
                this.refComp = this._componente.getList();
                this.refGP = this._grupo.getList();
                this.refAula = this._aula.getList();
                this.refPla = this._planificacion.getList();
                this.refRecintos = this._recinto.getList();
              }

  ngOnInit() {
    Promise.all(this.promesas).then(()=>{
      this.show = true;
      this.subs.push(this.refPde.subscribe(data=>this.pdes = data))
      this.subs.push(this.refCarrera.subscribe(data=>this.carreras = data))
      this.subs.push(this.refPla.subscribe(data=>this.planificaciones = data))
      this.subs.push(this.refComp.subscribe(data=>{this.componentes = data;
        this.refRecintos.subscribe((data: RecintoModel[]) => {
          this.recintos = data;
        });
       this.componentesByCiclo(Number(this.cicloSelected));
        }));
      this.subs.push( this.refGP.subscribe(data =>
        {this.grupos = data;
         this.pdesByCarrera(this.carreraSelected);
       })
       );
      if(this.carreraSelected !== '0' ) {this.pdesByCarrera(this.carreraSelected)}
      if(this.planSelected !== '0' ) {this.groupsByPlan(this.planSelected)}
    })
  }

  ngOnDestroy() {
    this._grupo.list = [];
    this._componente.list = [];
    this._aula.list = [];
    this._horario.list = [];
    this._pde.list = [];
    this._carrera.list = [];
    this._planificacion.list = [];
    this._recinto.list = [];
    this.subs.forEach(sub => sub.unsubscribe());
  }


  pdesByCarrera(id: string) {
    this.cicloSelected = '0';
    this.gruposByPlan = []
    this.pdeSelected = '0'
    this.pdeByCarrera = this.pdes.filter(pde => pde.pde_carrera === id);
   this.componentesByCiclo(Number(this.cicloSelected));

  }

  componentesByCiclo(ciclo: number) {
    if(String(this.carreraSelected) !== "0"){
      this.compsByCiclo = [];
      this.compsByCiclo = this.componentes.filter(comp => comp.componente_ciclo === ciclo);
      if(ciclo!== 0) this.componentesByPde(this.pdeSelected);
    }
   }

  componentesByPde(id: string) {
    this.compsByPde = this.compsByCiclo.filter(comp => comp.componente_pde === id);
    this.gruposByComp = [];
    this.compsByPde.forEach(comp => {
      let res =  this.grupos.filter(gp => gp.grupo_componente === comp.componente_id);
      res.forEach(gp => this.gruposByComp.push(gp));
    });
    if(id !== "0") this.groupsByPlan(this.planSelected);
  }

  groupsByPlan(id: string) {
    this.planID = id;
    let grupos = this.gruposByComp.filter(gp => id === gp.grupo_planificacion);
    this.gruposByPlan = grupos;
    console.log(this.gruposByPlan)
  }

  getAulas(id: number) {
    this.aulas = [];
    this.aulas = this._aula.list.filter(aula => aula.aula_recinto === id);
  }

  save(){
    let horario = new HorarioModel();
    horario.horario_aula = this.aulaSelected;
    horario.horario_dia = this.diaSelected;
    horario.horario_grupo = this.grupoSelected;
    horario.horario_hora = Number(this.horaSelected);
    horario.horario_vacio = false;
    this._horario.crearHorario(horario).subscribe(
      res =>{
         console.log(res);
         this.aulaSelected = '0';
         this.diaSelected = '0';
         this.grupoSelected = '0';
         this.horaSelected = '0';
      },
      error => this._snack.open(error.message, "OK", {duration: 3000})
      
    )
  }
  servicos(){
    let p1 = new Promise((resolve,reject)=>{
      let sub =  this._grupo.getGrupos()
      .subscribe(
        res => this.grupos.push(res),
        error=>this._snack.open(error.message,"OK",{duration: 3000}),
        ()=>resolve()
        );
      this.subs.push(sub)
    })
    let p2 = new Promise((resolve,reject)=>{
      let sub =  this._aula.getAula()
      .subscribe(
        res => this.aulas.push(res),
        error=>this._snack.open(error.message,"OK",{duration: 3000}),
        ()=>resolve()
        );
      this.subs.push(sub)
    })
    let p3 = new Promise((resolve,reject)=>{
      let sub =  this._horario.getHorarios()
      .subscribe(
        res => this.horarios.push(res),
        error=>this._snack.open(error.message,"OK",{duration: 3000}),
        ()=>resolve()
        );
      this.subs.push(sub)
    })


    let p4 = new Promise((resolve,reject)=>{
      let sub =  this._componente.getComponentes()
      .subscribe(
        res => this.componentes.push(res),
        error=>this._snack.open(error.message,"OK",{duration: 3000}),
        ()=>resolve()
        );
      this.subs.push(sub)

   });

   let p5 = new Promise((resolve,reject)=>{
    let sub =  this._pde.getPlanEstudio()
    .subscribe(
      res => this.pdes.push(res),
      error=>this._snack.open(error.message,"OK",{duration: 3000}),
      ()=>resolve()
      );
    this.subs.push(sub)
  });

  let p6 = new Promise((resolve,reject)=>{
    let sub =  this._carrera.getCarrera()
    .subscribe(
      res => this.carreras.push(res),
      error=>this._snack.open(error.message,"OK",{duration: 3000}),
      ()=>resolve()
      );
    this.subs.push(sub)
    });

    let p7 = new Promise((resolve,reject)=>{
      let sub =  this._planificacion.getPlanificaciones()
      .subscribe(
        res => this.planificaciones.push(res),
        error=>this._snack.open(error.message,"OK",{duration: 3000}),
        ()=>resolve()
        );
      this.subs.push(sub)
   });
   const p8 = new Promise((resolve) => {
    this._recinto.getRecinto()
      .subscribe(
        res => this.recintos.push(res),
        error => this._snack.open(error.message, 'OK', { duration: 3000 }),
        ()=>resolve()

      );
  });
    this.promesas.push(p1,p2,p3,p4,p5,p6,p7,p8)
  }

}
