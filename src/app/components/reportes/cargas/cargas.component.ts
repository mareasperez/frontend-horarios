import { Component, OnInit } from '@angular/core';
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
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-carga-horaria',
  templateUrl: './carga-horaria.component.html',
  styleUrls: ['./carga-horaria.component.scss']
})
export class CargasComponent implements OnInit {
  public reportes: ReporteCargaModel[] = [];
  // listas de objetos
  public carreras: CarreraModel[] = [];
  public pdes: PlanEstudioModel[] = [];
  public planficacion: PlanificacionModel[] = [];
  public docentes: DocenteModel[] = [];
  public grupos: GrupoModel[] = [];
  public componentes: ComponenteModel[] = [];
  constructor(
    private _carrera: CarreraService,
    private _docente: DocenteService,
    private _grupos: GrupoService,
    private _pde: PlanEstudioService,
    private _componente: ComponenteService,
  ) {
    this._grupos.getGrupos().subscribe(res => this.grupos.push(res));
    this._pde.getPlanEstudio().subscribe(res => this.pdes.push(res));
    this._componente.getComponentes().subscribe(res => this.componentes.push(res));
    this._carrera.getCarrera().subscribe(res => this.carreras.push(res));
    this._docente.getDocente().subscribe(res => this.docentes.push(res));
  }

  async ngOnInit() {
    let i = 0;
    console.log('init');
    await this.foo().then(
      () => {
        this.docentes.forEach(docente => {
          this.reporteHorarios(docente, this.grupos);
          i++;
        });
      });
  }
  async foo() {
    await this.sleep(1000);
    console.log(1);
    await this.sleep(1000);
    await this.sleep(1000);
    console.log(3);
  }

  sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }
  async reporteHorarios(docente: DocenteModel, grupos: GrupoModel[]) {
    const reporte = new ReporteCargaModel();
    const rr: RComponent[] = [];
    reporte.componente = rr;
    reporte.docente = docente.docente_nombre;
    const gr = await grupos.filter(grupo => grupo.grupo_docente === docente.docente_id);
    // console.log(reporte.docente, ' ', gr);
    for (const grupo of gr) {
      if (!grupo.grupo_planta) {
        // console.log(grupo);
        const rp: RComponent = new RComponent();
        rp.componente = grupo.grupo_componente;
        // console.log('Docente: ', docente.docente_nombre, 'componente: ', rp.componente);
        rp.grupo_numero = grupo.grupo_numero;
        rp.horas = grupo.grupo_horas_clase;
        const comp = await this.componentes.filter(componente => componente.componente_id === grupo.grupo_componente);
        rp.componente = comp[0].componente_nombre;
        rp.anyo = comp[0].componente_ciclo;
        const plande = await this.pdes.filter(pde => Number(pde.pde_id) === comp[0].componente_pde);
        const carrera = await this.carreras.filter(carr => carr.carrera_id === plande[0].pde_carrera);
        rp.carrera = carrera[0].carrera_nombre;
        reporte.componente.push(rp);
        // console.log('rp: ', rp);
        // console.log('reporte:', reporte);
      }


    }
    if (reporte.componente.length > 0) {
      console.log(reporte.componente.length);
      this.reportes.push(reporte);
    }
  }
}
