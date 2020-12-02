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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { getItemLocalCache } from 'src/app/utils/utils';
import { TitleService } from 'src/app/services/title.service';
// tslint:disable-next-line: class-name
class cargaComponente {
  componente: ComponenteModel;
  grupo: GrupoModel;
  docente: DocenteModel;
  carrera: CarreraModel;
}
@Component({
  selector: 'app-carga-componentes',
  templateUrl: './carga-componentes.component.html',
  styleUrls: ['./carga-componentes.component.scss']
})
// tslint:disable: variable-name
export class CargaComponentesComponent implements OnInit, OnDestroy {
  public docentes: DocenteModel[] = [];
  public grupos: GrupoModel[] = [];
  public comps: ComponenteModel[] = [];
  public planificaciones: PlanificacionModel[] = [];
  private planes: PlanEstudioModel[] = [];
  private carreras: CarreraModel[] = [];
  public isLoaded = false;
  public dLoaded = false;
  public showMessage = false;
  public selected = getItemLocalCache('planificacion');
  private subs: Subscription[] = [];
  promesas: Promise<any>[] = [];
  public cargas: any[] = [];
  public dataSource;
  arr: cargaComponente[] = [];
  displayedColumns: string[] = ['docente', 'anyo', 'grupo', 'horas'];

  constructor(
    private _comp: ComponenteService,
    private _grupo: GrupoService,
    private _docente: DocenteService,
    private _planificacion: PlanificacionService,
    private _plan: PlanEstudioService,
    private _carrera: CarreraService,
    private _snack: MatSnackBar,
    private _title: TitleService
  ) {
    this._title.setTitle('Reporte Carga por Componente');
    this.promesas.push(new Promise((resolve, reject) => {
      const sub = this._grupo.getGrupos()
        .subscribe(
          grupo => this.grupos.push(grupo),
          error => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    }));

    this.promesas.push(new Promise((resolve, reject) => {
      const sub = this._docente.getDocente()
        .subscribe(
          docente =>
            this.docentes.push(docente),
          error => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    }));

    this.promesas.push(new Promise((resolve, reject) => {
      const sub = this._comp.getComponentes()
        .subscribe(comp =>
          this.comps.push(comp),
          error => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    }));

    this.promesas.push(new Promise((resolve, reject) => {
      const sub = this._planificacion.getPlanificaciones()
        .subscribe(
          pl => this.planificaciones.push(pl),
          error => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      console.log(this.planificaciones);
      this.subs.push(sub);
    }));

    this.promesas.push(new Promise((resolve, reject) => {
      const sub = this._plan.getPlanEstudio()
        .subscribe(
          plan => this.planes.push(plan),
          error => reject(error),
          () => resolve()
        );
      this.subs.push(sub);
    }));

    this.promesas.push(new Promise((resolve, reject) => {
      const sub = this._carrera.getCarrera()
        .subscribe(
          carrera => this.carreras.push(carrera),
          error => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    }));
  }

  ngOnInit() {
    Promise.all(this.promesas).then(res => {
      if (this.planificaciones.length > 0 && this.carreras.length > 0 && this.comps.length > 0){
        this.isLoaded = true;
        this._planificacion.successObten();
        console.log(this.planificaciones);
        if (this.selected !== '0') { this.groupByPlan(this.selected); }
      } else {
        this.showMessage = true;
      }

    });
  }

  ngOnDestroy() {
    this._comp.list = [];
    this._docente.list = [];
    this._grupo.list = [];
    this._planificacion.list = [];
    this.subs.forEach(sub => sub.unsubscribe());
  }


  groupByPlan(id: string) {
    const grupos = this.grupos.filter(gp => id === gp.grupo_planificacion);
    this.reporte(grupos);
  }

  reporte(gruposByPlan: GrupoModel[]) {
    const planes = [];
    const grupos = [];
    this.comps.forEach((cp, i) => {
      const gps = gruposByPlan.filter(gp => cp.componente_id === gp.grupo_componente);
      if (gps.length > 0) {
        grupos.push(gps);
      }
    });
    // console.log(this.cargas)
    grupos.forEach((gpc: GrupoModel[], i) => {
      this.arr = [];
      gpc.forEach((gp: GrupoModel, j) => {
        const carga: cargaComponente = new cargaComponente();
        carga.grupo = gp;
        carga.docente = this.docentes.find(dc => dc.docente_id === gp.grupo_docente);
        carga.componente = this.comps.find(cp => cp.componente_id === gp.grupo_componente);
        this.arr.push(carga);
      });
      this.cargas[i] = this.arr;
    });

    this.cargas.forEach((cgs: cargaComponente[], i) => {
      cgs.forEach((cg: cargaComponente, j) => {
        const plan = this.planes.filter(plan => plan.pde_id === cg.componente.componente_pde)[0];
        planes.push(plan);
        const c = this.carreras.filter(cr => cr.carrera_id === plan.pde_carrera)[0];
        this.cargas[i][j].carrera = c;
      });
    });
    this.dataSource = this.cargas;
    this.cargas = [];
    this.dLoaded = true;
  }

  getPlanName(id) {
    console.log('me llamaste culo');

    if (id !== undefined && this.planificaciones !== undefined) {
      const plan: PlanificacionModel = this.planificaciones.find(pl => id === pl.planificacion_id);
      return `semestre ${plan.planificacion_semestre} del año ${plan.planificacion_anyo_lectivo}`;
    }
    return '';
  }


}
