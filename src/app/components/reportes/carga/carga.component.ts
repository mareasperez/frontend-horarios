import { Component, OnInit } from '@angular/core';
import { DocenteService } from 'src/app/services/docente.service';
import { DocenteModel } from 'src/app/models/docente.model';
import { Observable } from 'rxjs';
import { ComponenteService } from 'src/app/services/componente.service';
import { GrupoModel } from 'src/app/models/grupo.model';
import { GrupoService } from 'src/app/services/grupo.service';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { ReporteCargaModel } from 'src/app/models/rep.carga';
import { RComponent } from '../../../models/rcomponentes';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { ComponenteModel } from 'src/app/models/componente.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { CarreraModel } from 'src/app/models/carrera.model';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.scss']
})
export class CargaComponent implements OnInit {


  public refDoc: Observable<any[]>;
  // reporte
  public refGr: Observable<any[]>;
  public reportes: ReporteCargaModel[] = [];
  public array: any[][] = new Array();


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
    private _planificacion: PlanificacionService,
    private _pde: PlanEstudioService,
    private _componente: ComponenteService,
  ) {
    let index = 0;

    this._grupos.getGrupos().subscribe(res => {
      this.grupos.push(res);
    });
    this._docente.getDocente().subscribe(res => {
      this.docentes.push(res);
      this.hola(res, index);
      index++;
    });
    this._pde.getPlanEstudio().subscribe(res => this.pdes.push(res));
    this._componente.getComponentes().subscribe(res => this.componentes.push(res));
    this._carrera.getCarrera().subscribe(res => this.carreras.push(res));
    this.refDoc = this._docente.getList();
    this.refGr = this._grupos.getList();
  }

  async ngOnInit() {
    this.refDoc.subscribe(
      data => this.docentes = data,
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification'));
  }
  async hola(docente: DocenteModel, i: number) {
    // obtener grupos del docente
    let reporte = new ReporteCargaModel();
    reporte.docente = docente.docente_nombre;
    const grupos = await this.grupos.filter(grupo => grupo.grupo_docente === docente.docente_id);
    // si no se declara el [i] antes de igualar el [x] da error
    if (this.array[i] === undefined) {
      this.array[i] = [];
      console.log('no estaba declarado el array');
    }
    this.array[i][0] = docente.docente_nombre;
    this.array[i][1] = grupos;
    console.log(this.array);
    grupos.forEach(async grupo => {
      console.log('entro al foreach');
      console.log(grupo);
      let rp: RComponent = new RComponent();
      rp.componente = grupo.grupo_componente;
      console.log('Docente: ', docente.docente_nombre, 'componente: ', rp.componente );
      rp.grupo_numero = grupo.grupo_numero;
      rp.horas = grupo.grupo_horas_clase;
      const comp = await this.componentes.filter(componente => componente.componente_id === grupo.grupo_componente);
      rp.componente = comp[0].componente_nombre;
      const plande = await this.pdes.filter(pde => pde.pde_id === comp[0].componente_pde);
      const carrera = await this.carreras.filter(carr => carr.carrera_id === plande[0].pde_carrera);
      rp.carrera = carrera[0].carrera_nombre;
      console.log(rp);
      reporte.componente.push(rp);
    });
    console.log(reporte);
  }
}
