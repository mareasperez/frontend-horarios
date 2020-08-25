import { Component, OnInit } from '@angular/core';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadSerivice } from 'src/app/services/facultad.service';
import { RecintoService } from 'src/app/services/recinto.service';
import { RecintoModel } from 'src/app/models/recinto.model';
import { AulaModel } from 'src/app/models/aula.model';
import { AulaService } from 'src/app/services/aula.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { DocenteModel } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { GrupoModel } from 'src/app/models/grupo.model';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { DocenteHorasService } from 'src/app/services/docente-horas.service';
import { ComponenteService } from 'src/app/services/componente.service';
import { ComponenteModel } from 'src/app/models/componente.model';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { HorarioViewModel } from 'src/app/models/reportes/horarioView.model';
import { MatSnackBar } from '@angular/material';
import { Subscription, from } from 'rxjs';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { NumberFormatStyle } from '@angular/common';
import { getItemLocalCache, setItemLocalCache } from 'src/app/utils/utils';
import { HorarioService } from 'src/app/services/horario.service';
import { HorarioModel } from 'src/app/models/horario.model';
import { async } from '@angular/core/testing';
import { promise } from 'protractor';
@Component({
  selector: 'app-horario-docente',
  templateUrl: './horario-docente.component.html',
  styleUrls: ['./horario-docente.component.scss']
})
export class HorarioDocenteComponent implements OnInit {
  // muestra la animacion de carga
  public isLoaded = false;
  // listas de datos llenadas por el api
  private promesas: Promise<any>[] = [];
  public docentes: DocenteModel[] = [];
  public planificaciones: PlanificacionModel[] = [];
  public horarios: HorarioModel[] = [];
  public PDes: PlanEstudioModel[] = [];
  public grupos: GrupoModel[] = [];
  public componentes: ComponenteModel[] = [];
  public aulas: AulaModel[] = [];
  // temporales
  public array: any[][] = new Array();
  // valores seteados por el usuario
  public selectedPlan: PlanificacionModel;
  public selectedDoc: DocenteModel;
  constructor(
    // tslint:disable: variable-name
    private _planificacion: PlanificacionService,
    private _horario: HorarioService,
    private _docente: DocenteService,
    private _snack: MatSnackBar,
    private _grupo: GrupoService,
    private _componente: ComponenteService,
    private _aula: AulaService
  ) {
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._planificacion.getPlanificaciones().subscribe(
          plan => this.planificaciones.push(plan),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
        .then(res => {
          this.selectedPlan = this.planificaciones.find(plan => plan.planificacion_id === getItemLocalCache('planificacion'));
          if (!this.selectedPlan) {
            console.log('no existe planificacion en localStorage, seteando');
            setItemLocalCache('planificacion', this.planificaciones[0].planificacion_id);
            this.selectedPlan = this.planificaciones[0];
            this._docente.getDocente().subscribe(docente => this.docentes.push(docente));
          }
        }));
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._docente.getDocente().subscribe(
          docente => this.docentes.push(docente),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._grupo.getGrupos().subscribe(
          grupo => this.grupos.push(grupo),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._componente.getComponentes().subscribe(
          componente => this.componentes.push(componente),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._aula.getAula().subscribe(
          aula => this.aulas.push(aula),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );

  }
  ngOnInit(): void {
    Promise.all(this.promesas).then(async res => {
      this.isLoaded = true;
    }); // end then
  }
  getData() {
    if (this.selectedDoc && this.selectedPlan) {
      console.log('mandar a tarer horario');
      new Promise<any>((resolve, reject) => {
        console.log('el id del Docente es: ', this.selectedDoc.docente_id);
        this._horario.getHorarioByPlan('docente', this.selectedDoc.docente_id, this.selectedPlan.planificacion_id)
          .subscribe(res => resolve(res));
      })
        .then((horarios: HorarioModel[]) => {
          this.fun(horarios);
        });
    }
  }
  async fun(horarios: HorarioModel[]) {
    let i = 0; let j = 0;
    const vacio = new HorarioModel();
    vacio.horario_vacio = true;
    for (let aux = 0; aux < 6; aux++) {
      this.array[aux] = [];
    }
    for (let aux = 0; aux < 5; aux++) {
      for (let aux2 = 0; aux2 < 6; aux2++) {
        this.array[aux2][aux] = vacio;
      }
    }
    for (const dia of horarios) {
      switch (dia.horario_dia) {
        case 'Lunes': i = 0; break;
        case 'Martes': i = 1; break;
        case 'Miercoles': i = 2; break;
        case 'Jueves': i = 3; break;
        case 'Viernes': i = 4; break;
        default: console.log('No such day exists!', dia); break;
      }
      switch (dia.horario_hora) {
        case 7: j = 0; break;
        case 9: j = 1; break;
        case 11: j = 2; break;
        case 13: j = 3; break;
        case 15: j = 4; break;
        case 17: j = 5; break;
        default: console.log('No such hour exists!', dia); break;
      }
      console.log(dia);
      this.array[j][i] = dia;
      i = 0;
      j = 0;
    }
    console.log(this.array);
  }

}
