import { Component, OnDestroy, OnInit } from '@angular/core';
import { AulaModel } from 'src/app/models/aula.model';
import { AulaService } from 'src/app/services/aula.service';
import { DocenteModel } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { GrupoModel } from 'src/app/models/grupo.model';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { ComponenteService } from 'src/app/services/componente.service';
import { ComponenteModel } from 'src/app/models/componente.model';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { getItemLocalCache, setItemLocalCache } from 'src/app/utils/utils';
import { HorarioService } from 'src/app/services/horario.service';
import { HorarioModel } from 'src/app/models/horario.model';
import { RecintoModel } from 'src/app/models/recinto.model';
import { RecintoService } from 'src/app/services/recinto.service';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { TitleService } from 'src/app/services/title.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-horario-aula',
  templateUrl: './horario-aula.component.html',
  styleUrls: ['./horario-aula.component.scss']
})
// tslint:disable: variable-name
export class HorarioAulaComponent implements OnInit, OnDestroy {
  // muestra la animacion de carga
  public isLoaded = false;
  public hLoaded = false;
  // listas de datos llenadas por el api
  private promesas: Promise<any>[] = [];
  public docentes: DocenteModel[] = [];
  public planificaciones: PlanificacionModel[] = [];
  public horarios: HorarioModel[] = [];
  public grupos: GrupoModel[] = [];
  public componentes: ComponenteModel[] = [];
  public aulas: AulaModel[] = [];
  public recintos: RecintoModel[] = [];
  public pdes: PlanEstudioModel[] = [];
  public carreras: CarreraModel[] = [];
  public showMessage = false;
  // temporales
  public array: any[][] = new Array();
  // valores seteados por el usuario
  public aulasFiltered: AulaModel[] = [];
  public selectedPlan: PlanificacionModel;
  public selectedAula: AulaModel;
  public selectedRec: RecintoModel;
  public TYPE = 'Aula';
  constructor(
    private _planificacion: PlanificacionService,
    private _horario: HorarioService,
    private _docente: DocenteService,
    private _snack: MatSnackBar,
    private _grupo: GrupoService,
    private _componente: ComponenteService,
    private _aula: AulaService,
    private _recinto: RecintoService,
    private _pde: PlanEstudioService,
    private _carrera: CarreraService,
    private _title: TitleService
  ) {
    this._title.setTitle('Reporte Horario ' + this.TYPE);
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._planificacion.getPlanificaciones().subscribe(
          plan => this.planificaciones.push(plan),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
        .then(res => {
          this.selectedPlan = this.planificaciones.find(plan => plan.planificacion_id === getItemLocalCache('planificacion'));
          if (!this.selectedPlan && this.planificaciones.length > 0) {
            console.log('no existe planificacion en localStorage, seteando');
            setItemLocalCache('planificacion', this.planificaciones[0].planificacion_id);
            this.selectedPlan = this.planificaciones[0];
          }
        }));
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._docente.getDocente().subscribe(
          docente => this.docentes.push(docente),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._grupo.getGrupos().subscribe(
          grupo => this.grupos.push(grupo),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._componente.getComponentes().subscribe(
          componente => this.componentes.push(componente),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._recinto.getRecinto().subscribe(
          recinto => this.recintos.push(recinto),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._pde.getPlanEstudio().subscribe(
          pde => this.pdes.push(pde),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._carrera.getCarrera().subscribe(
          carrera => this.carreras.push(carrera),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._aula.getAula().subscribe(
          aula => this.aulas.push(aula),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );

  }
  ngOnInit(): void {
    Promise.all(this.promesas).then(async res => {
      if (this.planificaciones.length > 0 && this.carreras.length > 0 && this.recintos.length > 0) {
        this.isLoaded = true;
      } else {
        this.showMessage = true;
      }
    }); // end then
  }

  ngOnDestroy(): void {
    this.docentes = [];
    this.planificaciones = [];
    this.horarios = [];
    this.grupos = [];
    this.componentes = [];
    this.aulas = [];
    this.recintos = [];
    this.pdes = [];
    this.carreras = [];
  }

  getAulas(recinto: string) {
    this.cleanGrid();
    this.aulasFiltered = [];
    console.log('llamada get aulas con recinto: ', recinto);
    (recinto === '-1') ? this.aulasFiltered = this.aulas : this.aulasFiltered = this.aulas.filter(au => au.aula_recinto === recinto);
    this.selectedAula = this.aulasFiltered[0];
  }

  getData() {
    if (this.selectedAula && this.selectedPlan) {
      this.array = []; this.hLoaded = false;
      new Promise<any>((resolve, reject) => {
        this._horario.getHorarioByPlan('aula', this.selectedAula.aula_id, this.selectedPlan.planificacion_id)
          .subscribe(
            res => resolve(res),
            (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          );
      })
        .then((horarios: HorarioModel[]) => {
          console.log(horarios);
          this.horarios = horarios;
          this.hLoaded = true;
        });
    }
  }
  cleanGrid() {
    this.horarios = [];
    this.array = [];
  }
}
