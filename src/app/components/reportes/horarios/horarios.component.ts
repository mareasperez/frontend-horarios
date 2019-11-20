import { Component, OnInit, OnDestroy } from '@angular/core';
import { HorarioService } from '../../../services/horario.service';
import { HorarioModel } from '../../../models/horario.model';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadSerivice } from 'src/app/services/facultad.service';
import { RecintoService } from 'src/app/services/recinto.service';
import { RecintoModel } from 'src/app/models/recinto.model';
import { AulaModel } from 'src/app/models/aula.model';
import { AulaService } from 'src/app/services/aula.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { DocenteModel } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { GrupoModel } from 'src/app/models/grupo.model';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { DocenteHorasService } from 'src/app/services/docente-horas.service';
import { ComponenteService } from 'src/app/services/componente.service';
import { ComponenteModel } from 'src/app/models/componente.model';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { HorarioViewModel } from 'src/app/models/reportes/horarioView.model';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit, OnDestroy {
  public horarios: HorarioModel[] = [];
  public array: any[][] = new Array();
  selectedF: FacultadModel;
  selectedR: RecintoModel;
  selectedA: AulaModel;
  selectedD: HorarioModel;
  selectedDocente: DocenteModel;
  selectedCarrera: CarreraModel;
  selectedGrupo: GrupoModel;
  componentes: ComponenteModel[] = [];
  pdes: PlanEstudioModel[] = [];
  docentes: DocenteModel[] = [];
  docentes2: DocenteModel[] = [];
  facultades: FacultadModel[] = [];
  recintos: RecintoModel[] = [];
  aulas: AulaModel[] = [];
  departamentos: DepartamentoModel[] = [];
  carreras: CarreraModel[] = [];
  grupos: GrupoModel[] = [];
  reporte: string;
  onComponente: any[][] = [];
  onDocente: any[][] = [];
  anyos = [1, 2, 3, 4, 5];
  constructor(
    // tslint:disable: variable-name
    private _doho: DocenteHorasService,
    private _planificacion: PlanificacionService,
    private _horario: HorarioService,
    private _grupo: GrupoService,
    private _facultad: FacultadSerivice,
    private _recinto: RecintoService,
    private _aula: AulaService,
    private _departamento: DepartamentoService,
    private route: ActivatedRoute,
    private _carrera: CarreraService,
    private _docente: DocenteService,
    private _componente: ComponenteService,
    private _pde: PlanEstudioService) { }
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.reporte = (params.get('reporte'));
      this.selectedF = undefined;
    });
    this._planificacion.getPlanificaciones().subscribe();
    this._grupo.getGrupos().subscribe();
    this._carrera.getCarrera().subscribe();
    this._doho.getDcHoras().subscribe();
    this._departamento.getDepartamento().subscribe();
    this._recinto.getRecinto().subscribe();
    this._aula.getAula().subscribe();
    this._horario.getHorarios().subscribe();
    const p = new Promise((resolve, reject) => {
      this._facultad.getFacultad().subscribe(res => this.facultades.push(res));
      this._componente.getComponentes().subscribe(res => this.componentes.push(res));
      this._pde.getPlanEstudio().subscribe(res => this.pdes.push(res));
      this._grupo.getGrupos().subscribe(res => this.grupos.push(res));
      this._docente.getDocente().subscribe(res => {this.docentes2.push(res); console.log(res);
      });
      this.onComponente[0] = this.componentes;
      this.onComponente[1] = this.grupos;
      if (this.reporte !== 'docente') {
        this.onDocente[0] = this.docentes2;
        this.onDocente[1] = this.grupos;
      }
    });

  }
  ngOnDestroy() {
    this.selectedA = undefined;
    this.selectedCarrera = undefined;
    this.selectedD = undefined;
    this.selectedDocente = undefined;
    this.selectedF = undefined;
    this.selectedGrupo = undefined;
    this.selectedR = undefined;
  }
  filtros(filtro: string, id: number) {
    switch (filtro) {
      case 'docente': this.getDepartamentos(id); break;
      case 'aula': this.getRecintos(id); break;
      case 'grupo': console.log('se llama grupos'); this.getDepartamentos(id); break;
      case 'anyo': this.getDepartamentos(id); break;
      default: alert('no hay filtro para eso');
    }
  }
  async getDepartamentos(id: number) {
    this.departamentos = [];
    this.departamentos = this._departamento.list.filter(dep => dep.departamento_facultad === id);
  }
  async getRecintos(id: number) {
    this.recintos = [];
    this.recintos = this._recinto.list.filter(recinto => recinto.recinto_facultad === id);
  }
  async getDocentesOrCarreras(id: number) {
    if (this.reporte === 'docente') {
      console.log('primera vez', this.docentes);
      this.docentes = [];
      console.log('La segunda', this.docentes);
      this.docentes = this._docente.list.filter(doc => doc.docente_departamento === id);
      console.log('por placer', this.docentes);
    } else {
      this.carreras = [];
      this.carreras = this._carrera.list.filter(carr => carr.carrera_departamento === id);
    }
  }
  async getAulas(id: number) {
    this.aulas = [];
    this.aulas = this._aula.list.filter(aula => aula.aula_recinto === id);
  }

  async getGrupos(id: string) {
    this.grupos = [];
    console.log(this._grupo.list);
    for (const grupo of this._grupo.list) {
      const comp = this.componentes.find(componente => componente.componente_id === grupo.grupo_componente);
      const pd = this.pdes.find(p => p.pde_id === comp.componente_pde);
      if (pd.pde_carrera === id) {
        this.grupos.push(grupo);
        console.log('se agrego: ', grupo);
      }
    }
  }

  async getHorarioByFilter(query: string, id: number) {
    this.horarios = [];
    // docente se obtiene asi porque el horario no tiene un elemento "docente" sino que es el grupo del horario
    // el que contiene el docente por lo tanto se debe pedir al api para mayor rapides
    if (query === 'docente') {
      const p = new Promise<any>((resolve, reject) => {
        console.log('el id docente es: ', id);
        this._horario.getHorarioByFilter('horario_docente', id).subscribe(res => resolve(res));
      });
      p.then((gr) => {
        this.horarios = gr;
      });
      p.finally(() => {
        console.log(this.horarios);
        this.fun();
      });
    }
    if (query === 'grupo') {
      console.log('el id grupo es: ', id);
      this.horarios = this._horario.list.filter(horario => Number(horario.horario_grupo) === id);
      console.log(this.horarios);
      this.fun();
    }
    if (query === 'aula') {
      console.log('el id de aula es: ', id);
      this.horarios = this._horario.list.filter(horario => Number(horario.horario_aula) === id);
      console.log(this.horarios);
      this.fun();
    }
  }


  async fun() {
    let i = 0; let j = 0;
    const vacio = new HorarioViewModel();
    vacio.horario_vacio = true;
    for (let aux = 0; aux < 6; aux++) {
      this.array[aux] = [];
    }
    for (let aux = 0; aux < 5; aux++) {
      for (let aux2 = 0; aux2 < 6; aux2++) {
        this.array[aux2][aux] = vacio;
      }
    }
    for (const dia of this.horarios) {
      switch (dia.horario_dia) {
        case 'Lunes': i = 0; break;
        case 'Martes': i = 1; break;
        case 'Miercoles': i = 2; break;
        case 'Jueves': i = 3; break;
        case 'Viernes': i = 4; break;
        default: console.log('No such day exists!', dia); break;
      }
      switch (dia.horario_hora) {
        case 7: j = 0; break;
        case 9: j = 1; break;
        case 11: j = 2; break;
        case 13: j = 3; break;
        case 15: j = 4; break;
        case 17: j = 5; break;
        default: console.log('No such hour exists!', dia); break;
      }
      console.log(dia);
      this.array[j][i] = dia;
      i = 0;
      j = 0;
    }
    console.log(this.array);
  }

}
