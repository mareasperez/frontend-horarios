import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponenteService } from 'src/app/services/componente.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { GrupoModel } from 'src/app/models/grupo.model';
import { ComponenteModel } from 'src/app/models/componente.model';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { CarreraModel } from 'src/app/models/carrera.model';
import { DocenteModel } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { getItemLocalCache } from 'src/app/utils/utils';
import { TitleService } from 'src/app/services/title.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

// tslint:disable: class-name
class cargaDocencia {
  grupo: GrupoModel;
  componente: ComponenteModel;
  docente: DocenteModel;
  carrera: CarreraModel;
  departamento: DepartamentoModel;
}

@Component({
  selector: 'app-carga-docencia',
  templateUrl: './carga-docencia.component.html',
  styleUrls: ['./carga-docencia.component.scss']
})
// tslint:disable: variable-name
export class CargaDocenciaComponent implements OnInit, OnDestroy {
  public dataSource;
  public grupos: GrupoModel[] = [];
  private dep: DepartamentoModel[] = [];
  private comp: ComponenteModel[] = [];
  private pde: PlanEstudioModel[] = [];
  private carreras: CarreraModel[] = [];
  public docentes: DocenteModel[] = [];
  private promesas: Promise<any>[] = [];
  public planificaciones: PlanificacionModel[] = [];
  public show = false;
  public rLoaded = false;
  public showMessage = false;
  public selected = getItemLocalCache('planificacion');
  subs: Subscription[] = [];
  cargas: cargaDocencia[] = [];
  displayedColumns: string[] = ['departamento', 'docente', 'carrera', 'tgrupo', 'thoras'];
  constructor(
    private _dep: DepartamentoService,
    private _comp: ComponenteService,
    private _carrera: CarreraService,
    private _grupo: GrupoService,
    private _pde: PlanEstudioService,
    private _docente: DocenteService,
    private _planificaciones: PlanificacionService,
    private _title: TitleService,
    private _snack: MatSnackBar
  ) {
    this._title.setTitle('Reporte Carga Docente');
    this.promesas.push(
      new Promise((resolve) => {
        this._planificaciones.getPlanificaciones().subscribe(
          res => this.planificaciones.push(res),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve());
      })
    );

    this.promesas.push(
      new Promise((resolve) => {
        this._carrera.getCarrera().subscribe(
          res => this.carreras.push(res),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve());
      })
    );


    this.promesas.push(
      new Promise((resolve) => {
        this._docente.getDocente().subscribe(
          res => this.docentes.push(res),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve());
      })
    );
    this.promesas.push(
      new Promise((resolve) => {
        this._comp.getComponentes().subscribe(
          res => this.comp.push(res),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
          );
      })
    );
    this.promesas.push(
      new Promise((resolve) => {
        this._pde.getPlanEstudio().subscribe(
          res => this.pde.push(res),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._grupo.getGrupos().subscribe(
          res => this.grupos.push(res),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
          );
      })
    );

    this.promesas.push(
      new Promise((resolve, reject) => {
        this._dep.getDepartamento().subscribe(
          res => this.dep.push(res),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
          );
      })
    );

  }

  ngOnInit() {
    Promise.all(this.promesas).then(async res => {
      console.log('pacman');
      if (this.planificaciones.length > 0 && this.carreras.length > 0 && this.docentes.length > 0){
        this.show = true;
        this._planificaciones.successObten();
        if (this.selected !== '0') { this.groupByPlan(this.selected); }
      } else {
        console.log('else');
        this.showMessage = true;
      }
    }); // end then
  }

  ngOnDestroy(){
  this.grupos = [];
  this.dep = [];
  this.comp = [];
  this.pde = [];
  this.carreras = [];
  this.docentes = [];
  this.planificaciones = [];
  this.subs.forEach(sub => {
    sub.unsubscribe();
  });
  }

  groupByPlan(id: string) {
    this.rLoaded = false;
    const grupos = this.grupos.filter(gp => id === gp.grupo_planificacion);
    this.reporte(grupos);
  }

  reporte(gruposByPlan: GrupoModel[]) {

    const planes = [];
    const grupos = [];
    this.docentes.forEach(dc => {
      const gps = gruposByPlan.filter(gp => dc.docente_id === gp.grupo_docente);
      if (gps.length > 0) {

        grupos.push(gps);
      }
    });
    grupos.forEach((pgp: GrupoModel[]) => {
      const arr = [];
      pgp.forEach((gp: GrupoModel, i) => {
        const carga: cargaDocencia = new cargaDocencia();
        arr.push(this.comp.filter(cp => cp.componente_id === gp.grupo_componente)[0]);
        carga.grupo = pgp[i];
        carga.componente = arr[i];
        this.cargas.push(carga);
      });
    });
    this.cargas.forEach((cg: cargaDocencia) => {
      planes.push((this.pde.filter(plan => plan.pde_id === cg.componente.componente_pde)[0]));
    });

    planes.forEach((plan: PlanEstudioModel, i) => {
      this.cargas[i].carrera = this.carreras.filter(cr => cr.carrera_id === plan.pde_carrera)[0];
    });

    this.cargas.forEach((carga: cargaDocencia, i) => {
      this.cargas[i].departamento = this.dep.filter(dp => dp.departamento_id === carga.carrera.carrera_departamento)[0];
      //
    });
    this.dataSource = this.cargas;
    this.cargas = [];
    this.rLoaded = true;
  }



}
