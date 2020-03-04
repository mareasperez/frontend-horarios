import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { GrupoService } from 'src/app/services/grupo.service';
import { GrupoModel } from 'src/app/models/grupo.model';
import { Observable, Subscription, observable, of } from 'rxjs';
import { ComponenteModel } from 'src/app/models/componente.model';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { DocenteModel } from 'src/app/models/docente.model';
import { matErrorsMessage } from 'src/app/utils/errors';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddGrupoComponent } from './add-grupo/add-grupo.component';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit, OnDestroy {
  public ref: Observable<any[]>;
  public refComp: Observable<any[]>;
  public refPlan: Observable<any[]>;
  public refDoc: Observable<any[]>;
  // arrays de datos
  @Input() public grupos: GrupoModel[] = [];
  @Input() public componentes: ComponenteModel[] = [];
  @Input() public planificaciones: PlanificacionModel[] = [];
  @Input() public planificacion: string;
  @Input() public docentes: DocenteModel[] = [];
  // creacion del formGroup
  public selected = '0';
  public selected2 = '0';
  public selectedComp = '0';
  public componente:ComponenteModel = new ComponenteModel();

  // validacion de edicion o creacion
  public add = false;
  public editing = false;
  public gpadd = true;
  public show = true;
  ant = '0';
  subs: Subscription[] = [];
  public Errors: matErrorsMessage = new matErrorsMessage();

  constructor(
    private _grupo: GrupoService,
    private _snack: MatSnackBar,
    private dialog: MatDialog,
    ) {
      this.componente.componente_chp = '0'
      this.componente.componente_cht = '0'
      
    }
    get Grupos(): GrupoModel[] {
      return this.grupos;
    }
    @Input() set _grupos(grupos: GrupoModel[]) {
      console.log(grupos)
      this.grupos = grupos;
      
    }

    get Componente(): ComponenteModel {
     // console.log(this.componente)
      return this.componente;
    }
    @Input()  public set _componente(comp:ComponenteModel){
      this.componente = comp
    }

  ngOnInit() {
    console.log('init', this.componente)
   // this.onGruposChanges().subscribe(res=> console.log(res))
    
  }

  ngOnDestroy() {
  //  this._grupo.list = [];
    this.subs.map(sub => sub.unsubscribe());
    console.log('destroy', this.componente)

  }

  addGroup(e, tipo: string) {
    if(this.grupos.length > 0){
      let r = this.grupos.find(gp=> gp.grupo_componente == this.componente.componente_id)
      console.log(this.grupos,r, this.componente)
     if( r == undefined ) return
    }

    let grupo = new GrupoModel();
    let gruposT = this.grupos.filter(gp => gp.grupo_tipo === tipo);
    let n = Math.max.apply(Math, gruposT.map(gp => {
           return gp.grupo_numero;
      } )) + 1;
    grupo.grupo_numero = n > 0 ? n : 1;
    grupo.grupo_componente = this.componente.componente_id;
    grupo.grupo_horas_clase = tipo === 'GT' ? Number(this.componente.componente_cht) : Number(this.componente.componente_chp);
    grupo.grupo_max_capacidad = '40';
    grupo.grupo_modo = 'S';
    grupo.grupo_planta = false;
    grupo.grupo_docente = null;
    grupo.grupo_id = null;
    grupo.grupo_tipo = tipo;
    grupo.grupo_planificacion = this.planificacion;
    this._grupo.crearGrupo(grupo).subscribe();
  }

  setDocente(idD, idG) {
    let grupo = new GrupoModel();
    grupo.grupo_docente = idD == '0' ? null:idD;
    console.log(grupo)
    this._grupo.updategrupo(grupo, idG).subscribe();
  }

  delGrupo(e: number) {
    this._grupo.deleteGrupo(e)
    .subscribe(
      res => {},
      error => this._snack.open(error.message, 'ok' , {duration: 3000}),
    );
  }

  openDialog(tipo: string, id?: any): void {
    if (tipo === 'c') {
        this.dialog.open(AddGrupoComponent, {
        width: '450px',
        data: { type: tipo }
      });
    } else {
      const gp = this.grupos.find(Gp => Gp.grupo_id  === id);
      this.dialog.open(AddGrupoComponent, {
        width: '450px',
        data: { type: tipo, grupo: gp }
      });
    }
  }

  onGruposChanges(){
    return of(this.grupos)
    }

  
}
