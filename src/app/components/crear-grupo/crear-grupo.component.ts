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
import { MatSnackBar } from '@angular/material';
import { DocenteAreaService } from 'src/app/services/docente-area.service';
import { DocenteAreaModel } from 'src/app/models/docente.area.model';
import { getItemLocalCache } from 'src/app/utils/utils';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.scss']
})
// tslint:disable: variable-name
export class CrearGrupoComponent implements OnInit, OnDestroy {
  /*Variables de payloas */
  public componentes: ComponenteModel[] = [];
  public compsByPde: ComponenteModel[] = [];
  public compsByCiclo: ComponenteModel[] = [];
  public pdes: PlanEstudioModel[] = [];
  public pdeByCarrera: PlanEstudioModel[] = [];
  public carreras: CarreraModel[] = [];
  public grupos: GrupoModel[] = [];
  public gruposByPlan: GrupoModel[] = [];
  public gruposByComp: GrupoModel[] = [];
  public gruposFiltrados: GrupoModel[] = [];
  public docentes: DocenteModel[] = [];
  public docFiltroArea: DocenteModel[] = [];
  public areas: AreaModel[] = [];
  public docsByArea: DocenteAreaModel[] = [];
  public planificaciones: PlanificacionModel[] = [];
  public componente: ComponenteModel = new ComponenteModel();
  /*Actualizacion por ws */
  public refComp: Observable<any>;
  public refGP: Observable<any>;
  public refPla: Observable<any>;
  public refPde: Observable<any>;
  public refCarrera: Observable<any>;
  public refArea: Observable<any>;
  public refDocente: Observable<any>;
  public refDocArea: Observable<any>;
  /*Flags y subscripciones */
  private subs: Subscription[] = [];
  private promesas: Promise<any>[] = [];
  public show = false;
  public pdeSelected = getItemLocalCache('pde');
  public cicloSelected = getItemLocalCache('ciclo');;
  public planSelected = getItemLocalCache('planificacion');
  public carreraSelected = getItemLocalCache('carrera');

  constructor(
    private _componente: ComponenteService,
    private _grupo: GrupoService,
    private _planificacion: PlanificacionService,
    private _pde: PlanEstudioService,
    private _carrera: CarreraService,
    private _area: AreaService,
    private _docente: DocenteService,
    private _docArea: DocenteAreaService,
    private _snack: MatSnackBar,
    private _title: Title
  ) {
    this._title.setTitle('Creacion de Grupos');
    this.componente.componente_id = '0';
    this.servicios();
    this.refComp = this._componente.getList();
    this.refGP = this._grupo.getList();
    this.refPde = this._pde.getList();
    this.refCarrera = this._carrera.getList();
    this.refArea = this._area.getList();
    this.refDocente = this._docente.getList();
    this.refDocArea = this._docArea.getList();
    this.refPla = this._planificacion.getList();

  }

  ngOnInit() {
    Promise.all(this.promesas).then(() => {
      this.show = true;
      this._grupo.successObten();
      this.subs.push(this.refComp
        .subscribe(
          data => {
            this.componentes = data;
            this.componentesByPde(this.pdeSelected);
          },
          error => this._snack.open(error.message, 'ok', { duration: 3000 }),
        )
      );
      this.subs.push(this.refGP
        .subscribe(
          data => {
            this.grupos = data;
            this.componentesByPde(this.pdeSelected);
          },
          error => this._snack.open(error.message, 'ok', { duration: 3000 }),
        )
      );
      this.subs.push(this.refPde.subscribe(data => this.pdes = data));
      this.subs.push(this.refArea.subscribe(data => this.areas = data));
      this.subs.push(this.refDocArea.subscribe(data => this.docsByArea = data));
      this.subs.push(this.refCarrera.subscribe(data => this.carreras = data));
      this.subs.push(this.refDocente.subscribe(data => this.docentes = data));
      this.subs.push(this.refPla.subscribe(data => this.planificaciones = data));
      this.subs.push(
        this.refComp.subscribe(data => {
          this.componentes = data;
          this.componentesByCiclo(Number(this.cicloSelected));
        })
      );
      this.subs.push(
        this.refGP.subscribe(data => {
          this.grupos = data;
          this.pdesByCarrera(this.carreraSelected);
        })
      );
      if (this.carreraSelected !== '0') { this.pdesByCarrera(this.carreraSelected); }
    });
  }

  ngOnDestroy() {
    this._grupo.list = [];
    this._componente.list = [];
    this._carrera.list = [];
    this._area.list = [];
    this._pde.list = [];
    this._planificacion.list = [];
    this._docente.list = [];
    this.subs.forEach(sub => sub.unsubscribe());
  }



  pdesByCarrera(id: string) {
    this.pdeByCarrera = this.pdes.filter(pde => pde.pde_carrera === id);
    this.componentesByCiclo(Number(this.cicloSelected));

  }

  componentesByCiclo(ciclo: number, f?: string) {
    localStorage.setItem('ciclo', ciclo + '');
    if (f) { this.componente = null; }
    if (String(this.carreraSelected) !== '0') {
      this.compsByCiclo = [];
      this.compsByCiclo = this.componentes.filter(comp => comp.componente_ciclo === ciclo);
      if (String(ciclo) !== '0') { this.componentesByPde(this.pdeSelected); }
    }

  }

  componentesByPde(id: string) {
    localStorage.setItem('pde', id);
    this.compsByPde = this.compsByCiclo.filter(comp => comp.componente_pde === id);
    this.gruposByComp = [];
    //  this.compsByPde.length == 0 ? this.componente.componente_id = '0': this.compsByPde;
    this.compsByPde.forEach(comp => {
      const res = this.grupos.filter(gp => gp.grupo_componente === comp.componente_id);
      res.forEach(gp => this.gruposByComp.push(gp));
    });

    if (id !== '0') { this.groupsByPlan(this.planSelected); }
  }

  groupsByPlan(id: string) {
    localStorage.setItem('planificacion', id);
    const grupos = this.gruposByComp.filter(gp => id === gp.grupo_planificacion);
    this.gruposByPlan = grupos;
    // if (this.componente.componente_id !== '0') { this.groupsByComp(this.componente.componente_id); }
    if (this.componente != null) { this.groupsByComp(this.componente.componente_id); }

  }

  groupsByComp(id: string, f?: string) {
    const com = this.componentes.find(comp => comp.componente_id === id);
    this.componente = com;
    if (this.componente) {
      this.docenteByArea(this.componente.componente_area);
      this.gruposFiltrados = this.gruposByPlan.filter(gp => gp.grupo_componente === id);
    }
  }

  docenteByArea(area) {
    const docs = this.docsByArea.filter(doc => area === doc.da_area);
    const res = docs.map(da => {
      const docentes = this.docentes.filter(doc => doc.docente_id === da.da_docente);
      return docentes[0];
    });
    this.docFiltroArea = res;
  }

  servicios() {
    const p1 = new Promise((resolve, reject) => {
      const sub = this._grupo.getGrupos()
        .subscribe(
          res => this.grupos.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });

    const p2 = new Promise((resolve, reject) => {
      const sub = this._componente.getComponentes()
        .subscribe(
          res => this.componentes.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);

    });

    const p3 = new Promise((resolve, reject) => {
      const sub = this._planificacion.getPlanificaciones()
        .subscribe(
          res => this.planificaciones.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });


    const p4 = new Promise((resolve, reject) => {
      const sub = this._pde.getPlanEstudio()
        .subscribe(
          res => this.pdes.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });

    const p5 = new Promise((resolve, reject) => {
      const sub = this._carrera.getCarrera()
        .subscribe(
          res => this.carreras.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });


    const p7 = new Promise((resolve, reject) => {
      const sub = this._docente.getDocente()
        .subscribe(
          res => this.docentes.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });

    const p8 = new Promise((resolve, reject) => {
      const sub = this._area.getAreas()
        .subscribe(
          res => this.areas.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });

    const p9 = new Promise((resolve, reject) => {
      const sub = this._docArea.getDcArea()
        .subscribe(
          res => this.docsByArea.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });

    this.promesas.push(p9, p8, p7, p5, p4, p3, p2, p1);
  }
}
