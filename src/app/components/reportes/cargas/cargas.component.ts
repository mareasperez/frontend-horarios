import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReporteCargaModel } from 'src/app/models/rep.carga';
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
import { RComponent } from 'src/app/models/rcomponentes';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DocenteAreaService } from 'src/app/services/docente-area.service';
import { DocenteHorasModel } from 'src/app/models/docente.horas.model';
import { DocenteHorasService } from 'src/app/services/docente-horas.service';

@Component({
  selector: 'app-carga-horaria',
  templateUrl: './cargas.component.html',
  styleUrls: ['./cargas.component.scss']
})
export class CargasComponent implements OnInit, OnDestroy {
  // view bools
  public visible: boolean;
  public loader: boolean;
  // otros
  public query: string;
  public hdocente = 0;
  displayedColumns: string[] = ['id'];
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
  public selectPlani: PlanificacionModel;

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
  ) {
    this._planificacion.getPlanificaciones().subscribe(res => this.planificaciones.push(res));
    this._grupos.getGrupos().subscribe(res => this.grupos.push(res));
    this._pde.getPlanEstudio().subscribe(res => this.pdes.push(res));
    this._componente.getComponentes().subscribe(res => this.componentes.push(res));
    this._carrera.getCarrera().subscribe(res => this.carreras.push(res));
    this._docente.getDocente().subscribe(res => this.docentes.push(res));
    this._doho.getDcHoras().subscribe(res => this.doho.push(res));
  }

  async ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.query = (params.get('reporte'));
    });
    console.log('init');
  }
  ngOnDestroy() {
  this.visible = false;
  this.loader = false;
  this.query = '';
  this.hdocente = 0;
  this.reportes = [];
  this.carreras = [];
  this.pdes = [];
  this.planificaciones = [];
  this.docentes = [];
  this.grupos = [];
  this.componentes = [];
  this.doho = [];
  this.selectPlani = undefined;
  }

  async foo() {
    console.log('loading');
    await this.sleep(1000);
    console.log('...');
    await this.sleep(1000);
    await this.sleep(2000);
    console.log('load complete');
  }

  sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }

  async seleccion(planificacion: PlanificacionModel) {
    this.loader = true;
    let i = 0;
    await this.foo().then(
      () => {
        this.docentes.forEach(docente => {
          this.reporte(docente, this.grupos, planificacion);
          i++;
        });
      });
    this.loader = false;
    this.visible = true;

  }

  async reporte(docente: DocenteModel, grupos: GrupoModel[], planificacion: PlanificacionModel) {
    const reporte = new ReporteCargaModel();
    const rr: RComponent[] = [];
    reporte.componente = rr;
    reporte.suma = 0;
    const dh = await this.doho.find(doho => doho.dh_docente === docente.docente_id);
    reporte.docente = docente.docente_nombre;
    if (dh === undefined) {
      alert('el docente:' +
      docente.docente_nombre
      + ' no esta en la planificacion '
      + this.selectPlani.planificacion_anyo_lectivo +
      ' semestre: ' +
      this.selectPlani.planificacion_semestre);
      throw new Error('verifique que el docente exista en la tabla docente horas en la bd!');
    }
    const gr = await grupos.filter(grupo => ((grupo.grupo_docente === docente.docente_id)
      && (grupo.grupo_planificacion) === planificacion.planificacion_id));
    console.log(reporte.docente, ' ', gr);
    for (const grupo of gr) {
      console.log('comenzo el for');
      switch (this.query) {
        // solo la carga de los docentes que tienen carga de horario
        case 'cargahoraria': {
          if (!grupo.grupo_planta) {
            const rp: RComponent = new RComponent();
            // console.log(grupo);
            rp.componente = grupo.grupo_componente;
            // console.log('Docente: ', docente.docente_nombre, 'componente: ', rp.componente);
            rp.grupo_numero = grupo.grupo_numero;
            rp.horas = grupo.grupo_horas_clase;
            const comp = await this.componentes.find(componente => componente.componente_id === grupo.grupo_componente);
            rp.componente = comp.componente_nombre;
            rp.anyo = comp.componente_ciclo;
            const plande = await this.pdes.find(pde => pde.pde_id === comp.componente_pde);
            const carrera = await this.carreras.find(carr => carr.carrera_id === plande.pde_carrera);
            rp.carrera = carrera.carrera_nombre;
            reporte.componente.push(rp);
            reporte.suma = reporte.suma + grupo.grupo_horas_clase;
            reporte.th = dh.dh_horas_hor;
            // console.log('rp: ', rp);
            // console.log('reporte:', reporte);
          }
          break;
        }
        // carga de los docentes que tienen carga de planta
        case 'cargaplanta': {
          if (grupo.grupo_planta) {
            const rp: RComponent = new RComponent();
            // console.log(grupo);
            rp.componente = grupo.grupo_componente;
            // console.log('Docente: ', docente.docente_nombre, 'componente: ', rp.componente);
            rp.grupo_numero = grupo.grupo_numero;
            rp.horas = grupo.grupo_horas_clase;
            const comp = await this.componentes.find(componente => componente.componente_id === grupo.grupo_componente);
            rp.componente = comp.componente_nombre;
            rp.anyo = comp.componente_ciclo;
            const plande = await this.pdes.find(pde =>pde.pde_id === comp.componente_pde);
            const carrera = await this.carreras.find(carr => carr.carrera_id === plande.pde_carrera);
            rp.carrera = carrera.carrera_nombre;
            reporte.componente.push(rp);
            reporte.suma = reporte.suma + grupo.grupo_horas_clase;
            reporte.th = dh.dh_horas_planta;
            // console.log(this.suma);
            // console.log('rp: ', rp);
            // console.log('reporte:', reporte);
          }
          break;
        }
        case 'cargaacademica': {
          console.log(dh);
          const rp: RComponent = new RComponent();
          // console.log(grupo);
          rp.componente = grupo.grupo_componente;
          // console.log('Docente: ', docente.docente_nombre, 'componente: ', rp.componente);
          rp.grupo_numero = grupo.grupo_numero;
          rp.horas = grupo.grupo_horas_clase;
          const comp = await this.componentes.find(componente => componente.componente_id === grupo.grupo_componente);
          rp.componente = comp.componente_nombre;
          rp.anyo = comp.componente_ciclo;
          const plande = await this.pdes.find(pde =>pde.pde_id === comp.componente_pde);
          const carrera = await this.carreras.find(carr => carr.carrera_id === plande.pde_carrera);
          rp.carrera = carrera.carrera_nombre;
          reporte.componente.push(rp);
          reporte.suma = reporte.suma + grupo.grupo_horas_clase;
          reporte.th = dh.dh_horas_total;
          // console.log('rp: ', rp);
          // console.log('reporte:', reporte);
          break;
        }
        default: {
          console.log('no hay filtro para eso');
        }
      }
    }
    if (reporte.componente.length > 0) {
      console.log(reporte.componente.length);
      this.reportes.push(reporte);
    }
  }
}
