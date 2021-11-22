import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarreraModel } from 'src/app/models/carrera.model';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { DocenteModel } from 'src/app/models/docente.model';
import { GrupoModel } from 'src/app/models/grupo.model';
import { ComponenteModel } from 'src/app/models/componente.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { DocenteService } from 'src/app/services/docente.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { ComponenteService } from 'src/app/services/componente.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DocenteHorasModel } from 'src/app/models/docente.horas.model';
import { DocenteHorasService } from 'src/app/services/docente-horas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitleService } from 'src/app/services/title.service';
import { HttpErrorResponse } from '@angular/common/http';
class ReporteCargaModel {
  docente: DocenteModel;
  grupos: Array<GrupoModel>;
  horas: DocenteHorasModel;
}

@Component({
  selector: 'app-carga-horaria',
  templateUrl: './cargas.component.html',
  styleUrls: ['./cargas.component.scss']
})
export class CargasComponent implements OnInit, OnDestroy {
  // view bools
  public rLoaded = false;
  public isLoaded = false;
  public showMessage = false;
  // otros
  public query: string;
  displayedColumns: string[] = ['id'];
  public promesas: Promise<any>[] = [];
  // listas de objetos
  public reportes: ReporteCargaModel[] = [];
  public carreras: CarreraModel[] = [];
  public pdes: PlanEstudioModel[] = [];
  public planificaciones: PlanificacionModel[] = [];
  public docentes: DocenteModel[] = [];
  public grupos: GrupoModel[] = [];
  public componentes: ComponenteModel[] = [];
  public doho: DocenteHorasModel[] = [];
  // seleccionados
  public selectedPlan: PlanificacionModel;

  constructor(
    // tslint:disable: variable-name
    private _carrera: CarreraService,
    private _docente: DocenteService,
    private _grupos: GrupoService,
    private _pde: PlanEstudioService,
    private _componente: ComponenteService,
    private _planificacion: PlanificacionService,
    private _doho: DocenteHorasService,
    private route: ActivatedRoute,
    private _snack: MatSnackBar,
    private _title: TitleService
  ) {
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._planificacion.getPlanificaciones().subscribe(
          plan => this.planificaciones.push(plan),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve());
      }));
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._docente.getDocente().subscribe(
          docente => this.docentes.push(docente),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      }));
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
        this._pde.getPlanEstudio().subscribe(
          pde => this.pdes.push(pde),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
  }

  async ngOnInit() {
    Promise.all(this.promesas).then(async res => {
      if (this.planificaciones.length > 0 && this.carreras.length > 0 && this.docentes.length > 0) {
        this.isLoaded = true;
      } else {
        this.showMessage = true;
      }
    }); // end then
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.reportes = []; this.grupos = []; this.doho = [];
      this.query = params.get('reporte');
      this._title.setTitle('Carga ' + this.query);
    });
    console.log('init');
  }
  ngOnDestroy() {
    this.query = '';
    this.reportes = [];
    this.carreras = [];
    this.pdes = [];
    this.planificaciones = [];
    this.docentes = [];
    this.grupos = [];
    this.componentes = [];
    this.doho = [];
    this.selectedPlan = undefined;
  }


  async getData() {
    this.grupos = []; this.doho = []; this.reportes = [];
    const promesas: Promise<any>[] = [];
    promesas.push(new Promise((resolve, reject) => {
      this._grupos.getGrupoByFilter('grupo_planificacion', this.selectedPlan.planificacion_id)
        .subscribe(
          res => this.grupos.push(res),
          (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve());
    }));
    promesas.push(
      new Promise((resolve, reject) => {
        this._doho.getDocenteHoraByFilter('dh_planificacion', this.selectedPlan.planificacion_id)
          .subscribe(
            res => this.doho.push(res),
            (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
            () => resolve());
      })
    );
    Promise.all(promesas)
      .then(() => {
        for (const docente of this.docentes) {
          this.rellenar(docente);
        }
        console.log(this.reportes);
      }).finally(() => {
        this.rLoaded = true;
      });

  }

  rellenar(docente: DocenteModel) {
    let grupos = new Array<GrupoModel>();
    const reporte = new ReporteCargaModel();
    reporte.docente = docente;
    const dh = this.doho.find(doho => doho.dh_docente === docente.docente_id);
    if (dh === undefined) {
      reporte.horas = new DocenteHorasModel(); reporte.horas.dh_horas_total = 0;
    }
    else {
      reporte.horas = dh;
    }
    switch (this.query) {
      case 'horaria': {
        console.log(docente);
        grupos = this.grupos.filter(grupo => ((grupo.grupo_docente === docente.docente_id) && (docente.docente_tipo_contrato === 'H')));
        break;
      }
      case 'planta': {
        grupos = this.grupos.filter(grupo => ((grupo.grupo_docente === docente.docente_id) && (docente.docente_tipo_contrato === 'P')));
        break;
      }
      default: {
        grupos = this.grupos.filter(grupo => grupo.grupo_docente === docente.docente_id);
      }
    }
    if (grupos[0]) {
      reporte.grupos = grupos;
      this.reportes.push(reporte);
    }
  }
}
