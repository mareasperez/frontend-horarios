import { Component, OnInit, OnDestroy } from "@angular/core";
import { ComponenteService } from "src/app/services/componente.service";
import { ComponenteModel } from "src/app/models/componente.model";
import { Subscription, Observable } from "rxjs";
import { GrupoService } from "src/app/services/grupo.service";
import { GrupoModel } from "src/app/models/grupo.model";
import { PlanificacionService } from "src/app/services/planificacion.service";
import { PlanificacionModel } from "src/app/models/planificacion.model";
import { PlanEstudioModel } from "src/app/models/planEstudio";
import { PlanEstudioService } from "src/app/services/plan-estudio.service";
import { CarreraService } from "src/app/services/carrera.service";
import { CarreraModel } from "src/app/models/carrera.model";
import { AreaService } from "src/app/services/area.service";
import { DocenteService } from "src/app/services/docente.service";
import { DocenteModel } from "src/app/models/docente.model";
import { AreaModel } from "src/app/models/area.model";
import { MatSnackBar } from "@angular/material";
import { DocenteAreaService } from "src/app/services/docente-area.service";
import { DocenteAreaModel } from "src/app/models/docente.area.model";
import { getItemLocalCache } from "src/app/utils/utils";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-crear-grupo",
  templateUrl: "./crear-grupo.component.html",
  styleUrls: ["./crear-grupo.component.scss"],
})
// tslint:disable: variable-name
export class CrearGrupoComponent implements OnInit, OnDestroy {
  /*Variables de payloas */
  public componentes: ComponenteModel[] = [];
  public compsByPde: ComponenteModel[] = [];
  public compsByCiclo: ComponenteModel[] = [];
  public componenteList: ComponenteModel[] = [];
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
  public isLoaded = false;
  public pdeSelected = getItemLocalCache("pde");
  public cicloSelected = getItemLocalCache("ciclo");
  public planSelected = getItemLocalCache("planificacion");
  public carreraSelected = getItemLocalCache("carrera");
  public anyoSelected = getItemLocalCache("anyo");
  public componeteSelected = null;

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
    this._title.setTitle("Creacion de Grupos");
    this.componente.componente_id = "0";
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
    this.servicios();
    // this.getGrupos()

    Promise.all(this.promesas).then(() => {
      console.log(this.planificaciones);

      if (!this.planSelected) {
        this.planSelected = this.planificaciones[this.planificaciones.length - 1].planificacion_id;
      }

      if (!this.carreraSelected) {
        this.carreraSelected = this.carreras[this.carreras.length - 1].carrera_id;
      }

      if (!this.anyoSelected) {
        this.anyoSelected = 1;
      }

      this.pdesByCarrera(this.carreraSelected);

      this.componentesByPdeCiclo();

      this.isLoaded = true;
      this._grupo.successObten();
      this.subs.push(
        this.refComp.subscribe(
          (data) => {
            this.componentesByPdeCiclo();
            this.componentes = data;
          },
          (error) => this._snack.open(error.message, "ok", { duration: 3000 })
        )
      );
      this.subs.push(
        this.refGP.subscribe(
          (data) => {
            console.log(data);

            this.grupos = data;
          },
          (error) => this._snack.open(error.message, "ok", { duration: 3000 })
        )
      );
      this.subs.push(this.refPde.subscribe((data) => (this.pdes = data)));
      this.subs.push(this.refArea.subscribe((data) => (this.areas = data)));
      this.subs.push(this.refDocArea.subscribe((data) => (this.docsByArea = data)));
      this.subs.push(this.refCarrera.subscribe((data) => (this.carreras = data)));
      this.subs.push(this.refDocente.subscribe((data) => (this.docentes = data)));
      this.subs.push(this.refPla.subscribe((data) => (this.planificaciones = data)));

      this.subs.push(
        this.refGP.subscribe((data) => {
          this.grupos = data;
        })
      );
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
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  pdesByCarrera(id: string, loadComponentes = false) {
    this.pdeByCarrera = this.pdes.filter((pde) => pde.pde_carrera === id);
    this.pdeSelected = this.pdeByCarrera[this.pdeByCarrera.length - 1].pde_id;
    if (loadComponentes) {
      this.componentesByPdeCiclo();
    }
  }

  componentesByPdeCiclo(setGrupos = false) {
    this.setCiclo();
    return new Promise((resolve, reject) => {
      let sub = this._componente
        .getComponetesByPdeCiclo({ pde: this.pdeSelected, ciclo: this.cicloSelected })
        .subscribe(
          (res) => {
            console.log(res);

            this.grupos = [];
            this.componentes = res.componente;
            this._componente.list = res.componente;
          },
          (error) => this._snack.open(error.message, "OK", { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });
  }

  getGruposByComponentePlan(id?: string, f?: string) {
    if (id || this.componeteSelected) {
      this.componeteSelected = id;
    } else return;
    let sub = this._grupo
      .getByComponentePlan({ componente: this.componeteSelected, planificacion: this.planSelected })
      .subscribe(
        (res) => {
          this.grupos = res.grupos;
          this._grupo.list = res.grupos;
          let cp = this.componentes.find((cp) => cp.componente_id == this.componeteSelected);
          this.docenteByArea(cp.componente_area);
        },
        (error) => this._snack.open(error.message, "OK", { duration: 3000 })
      );
    this.subs.push(sub);
  }

  docenteByArea(area) {
    const docs = this.docsByArea.filter((doc) => area === doc.da_area);
    const res = docs.map((da) => {
      const docentes = this.docentes.filter((doc) => doc.docente_id === da.da_docente);
      return docentes[0];
    });
    console.log(res);

    this.docFiltroArea = res;
  }

  servicios() {
    const p3 = new Promise((resolve, reject) => {
      const sub = this._planificacion.getPlanificaciones().subscribe(
        (res) => this.planificaciones.push(res),
        (error) => this._snack.open(error.message, "OK", { duration: 3000 }),
        () => resolve()
      );
      this.subs.push(sub);
    });

    const p4 = new Promise((resolve, reject) => {
      const sub = this._pde.getPlanEstudio().subscribe(
        (res) => this.pdes.push(res),
        (error) => this._snack.open(error.message, "OK", { duration: 3000 }),
        () => resolve()
      );
      this.subs.push(sub);
    });

    const p5 = new Promise((resolve, reject) => {
      const sub = this._carrera.getCarrera().subscribe(
        (res) => this.carreras.push(res),
        (error) => this._snack.open(error.message, "OK", { duration: 3000 }),
        () => resolve()
      );
      this.subs.push(sub);
    });

    const p7 = new Promise((resolve, reject) => {
      const sub = this._docente.getDocente().subscribe(
        (res) => this.docentes.push(res),
        (error) => this._snack.open(error.message, "OK", { duration: 3000 }),
        () => resolve()
      );
      this.subs.push(sub);
    });

    const p8 = new Promise((resolve, reject) => {
      const sub = this._area.getAreas().subscribe(
        (res) => this.areas.push(res),
        (error) => this._snack.open(error.message, "OK", { duration: 3000 }),
        () => resolve()
      );
      this.subs.push(sub);
    });

    const p9 = new Promise((resolve, reject) => {
      const sub = this._docArea.getDcArea().subscribe(
        (res) => this.docsByArea.push(res),
        (error) => this._snack.open(error.message, "OK", { duration: 3000 }),
        () => resolve()
      );
      this.subs.push(sub);
    });

    this.promesas.push(p9, p8, p7, p5, p4, p3);
  }

  setCiclo() {
    let planificacion = this.planificaciones.find((pl) => pl.planificacion_id == this.planSelected);
    if (planificacion) {
      switch (this.anyoSelected) {
        case 1:
          this.cicloSelected = planificacion.planificacion_semestre == "1" ? "1" : "2";
          break;
        case 2:
          this.cicloSelected = planificacion.planificacion_semestre == "1" ? "3" : "4";
          break;
        case 3:
          this.cicloSelected = planificacion.planificacion_semestre == "1" ? "5" : "6";
          break;
        case 4:
          this.cicloSelected = planificacion.planificacion_semestre == "1" ? "7" : "8";
          break;
        case 5:
          this.cicloSelected = planificacion.planificacion_semestre == "1" ? "9" : "10";
          break;
      }
    }
  }

  getGrupos(id: string, f?: string) {
    if (!this.planSelected) return;
    //  let p = this.getGruposByComponente(id: string, f?: string);
    //  Promise.all([p])
  }
}
