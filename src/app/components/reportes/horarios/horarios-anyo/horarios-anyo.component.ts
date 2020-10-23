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
import { MatSnackBar } from '@angular/material';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { getItemLocalCache, setItemLocalCache } from 'src/app/utils/utils';
import { HorarioService } from 'src/app/services/horario.service';
import { HorarioModel } from 'src/app/models/horario.model';
import { RecintoModel } from 'src/app/models/recinto.model';
import { RecintoService } from 'src/app/services/recinto.service';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { HttpClient } from '@angular/common/http';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-horarios-anyo',
  templateUrl: './horarios-anyo.component.html',
  styleUrls: ['./horarios-anyo.component.scss']
})
// tslint:disable: variable-name
export class HorariosAnyoComponent implements OnInit, OnDestroy {
  // muestra la animacion de carga
  public isLoaded = false;
  public hLoaded = false;
  public showMessage = false;
  // años aceptados
  public anyos = [1, 2, 3, 4, 5];
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
  // temporales
  public array: any[][] = new Array();
  // valores seteados por el usuario
  public selectedPlan: PlanificacionModel;
  public selectedCarr: CarreraModel;
  public selectedAnyo: number = undefined;
  public TYPE = 'Anyo';
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
    private http: HttpClient,
    private _title: TitleService
  ) {
    this._title.setTitle('Reporte Horario Año');
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._planificacion.getPlanificaciones().subscribe(
          plan => this.planificaciones.push(plan),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve());
      }).then(res => {
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
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      }));
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
        this._recinto.getRecinto().subscribe(
          recinto => this.recintos.push(recinto),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._pde.getPlanEstudio().subscribe(
          pde => this.pdes.push(pde),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._carrera.getCarrera().subscribe(
          carrera => this.carreras.push(carrera),
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
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._pde.getPlanEstudio().subscribe(
          pde => this.pdes.push(pde),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
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

  getGrupos() {
    this.inicializar();
    const head: any = {};
    head['Content-Type'] = 'application/json';
    if (this.selectedPlan && this.selectedCarr && this.selectedAnyo) {
      const ciclo = Number(this.selectedPlan.planificacion_semestre) === 2 ? this.selectedAnyo * 2 : (this.selectedAnyo * 2) - 1;
      this._grupo.getByCarreraPlanCiclo({
        carrera: this.selectedCarr.carrera_id,
        planificacion: this.selectedPlan.planificacion_id,
        ciclo: ciclo.toString()
      }).subscribe((res: any) => {
        if (!res.detail) {
          this.grupos = Object.assign(this.grupos, res.grupos);
          this.grupos = this.grupos.filter(gp => gp.grupo_asignado === true);
          this.getData();
        }
        else {
          alert('no hay grupos asigandos en el año seleccionado para la carrera seleccionada');
          console.log(res.detail);
        }
      });
    }
  }

  getData() {
    this.horarios = []; this.hLoaded = false;
    if (this.grupos) {
      const lastIndex = this.grupos.length - 1;
      let i = 0;
      this.grupos.map((grupo) => {
        new Promise<any>((resolve, reject) => {
          this._horario.getHorarioByFilter('horario_grupo', grupo.grupo_id).subscribe(res => { resolve(res); i++; });
        }).then((horario: HorarioModel[]) => {
          horario.forEach((h: HorarioModel) => this.horarios.push(h));
          if (i === lastIndex) {
            // verifico si es el ultimo grupo para ya permitir que se muestre el grid
            this.hLoaded = true;
          }
        });

      });

    }
  }

  inicializar() {
    this.array = [];
    this.grupos = [];
    this.hLoaded = false;
  }
}
