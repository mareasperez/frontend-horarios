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
  public refGP: Observable<any>;
  public refComp: Observable<any>;

  public dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
  public show = false;
  private subs: Subscription[] = [];
  private promesas: Promise<any>[] = [];
  constructor(private _grupo: GrupoService,
              private _aula: AulaService,
              private _horario: HorarioService,
              private _componente: ComponenteService,
              private _snack: MatSnackBar


              ) { 

                this.servicos()
              }

  ngOnInit() {
    Promise.all(this.promesas).then(()=>{
      this.show = true;
    })
  }

  ngOnDestroy() {
    this._grupo.list = [];
    this._componente.list = [];
    this._aula.list = [];
    this._horario.list = [];
   /* this._carrera.list = [];
    this._area.list = [];
    this._pde.list = [];
    this._planificacion.list = [];
    this._docente.list = [];*/
    this.subs.forEach(sub => sub.unsubscribe());
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
    this.promesas.push(p1,p2,p3,p4)
  }

}
