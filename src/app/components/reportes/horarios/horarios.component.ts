import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../../../services/horario.service';
import { HorarioModel } from '../../../models/horario.model';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadSerivice } from 'src/app/services/facultad.service';
import { RecintoService } from 'src/app/services/recinto.service';
import { RecintoModel } from 'src/app/models/recinto.model';
import { AulaModel } from 'src/app/models/aula.model';
import { AulaService } from 'src/app/services/aula.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
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
export class HorariosComponent implements OnInit {
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
  facultades: FacultadModel[] = [];
  recintos: RecintoModel[] = [];
  aulas: AulaModel[] = [];
  departamentos: DepartamentoModel[] = [];
  carreras: CarreraModel[] = [];
  grupos: GrupoModel[] = [];
  reporte: string;
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
    this._componente.getComponentes().subscribe(res => this.componentes.push(res));
    this._pde.getPlanEstudio().subscribe(res => this.pdes.push(res));
    this._planificacion.getPlanificaciones().subscribe();
    this._grupo.getGrupos().subscribe();
    this._carrera.getCarrera().subscribe();
    this._docente.getDocente().subscribe();
    this._doho.getDcHoras().subscribe();
    this._departamento.getDepartamento().subscribe();
    this._recinto.getRecinto().subscribe();
    this._aula.getAula().subscribe();
    this.reporte = (this.route.snapshot.queryParamMap.get('reporte'));
    this._horario.getHorarios().subscribe();
    this.getFacultades();

  }
  filtros(filtro: string, id: number) {
    switch (filtro) {
      case 'docente': {
        this.getDepartamentos(id);
        break;
      }
      case 'aula': {
        this.getRecintos(id);
        break;
      }
      case 'grupo': {
        console.log('se llama grupos');
        this.getDepartamentos(id);
        break;
      }
      case 'anyo': {
        this.getDepartamentos(id);
        break;
      }
      default: {
        console.log('no hay filtro para eso');
      }
    }
  }
  getFacultades() {
    this.selectedA = null;
    this.selectedR = null;
    this._facultad.getFacultad().subscribe(
      res => {
        this.facultades.push(res);
      },
      err => {
        console.error(err);
      }
    );
  }
  async getDepartamentos(id: number) {
    this.departamentos = [];
    this.departamentos = await this._departamento.list.filter(dep => dep.departamento_facultad === id);
  }
  async getRecintos(id: number) {
    this.recintos = [];
    this.recintos = await this._recinto.list.filter(recinto => recinto.recinto_facultad === id);
  }
  async getDocentesOrCarreras(id: number) {
    if (this.reporte === 'docente') {
      this.docentes = [];
      this.docentes = await this._docente.list.filter(doc => doc.docente_departamento === id);
    } else {
      this.carreras = [];
      this.carreras = await this._carrera.list.filter(carr => carr.carrera_departamento === id);
    }
  }
  async getAulas(id: number) {
    this.aulas = [];
    this.aulas = await this._aula.list.filter(aula => aula.aula_recinto === id);
  }

  async getGrupos(id: string) {
    this.grupos = [];
    console.log(this._grupo.list);
    for (const grupo of this._grupo.list) {
      const comp = await this.componentes.find(componente => componente.componente_id === grupo.grupo_componente);
      const pd = await this.pdes.find(p => p.pde_id === comp.componente_pde);
      if (pd.pde_carrera === id) {
        this.grupos.push(grupo);
        console.log('se agrego: ', grupo);
      }
    }
  }
  async getHorarioByAnyo(anyo) {
    this.grupos = [];
    const a = [];
    a[0] = (anyo - 1) + anyo;
    a[1] = anyo + anyo;
    console.log(a);
    for (const grupo of this._grupo.list) {
      const comp = await this.componentes.find(componente => componente.componente_id === grupo.grupo_componente);
      const pd = await this.pdes.find(p => p.pde_id === comp.componente_pde);
      if (pd.pde_carrera === this.selectedCarrera.carrera_id && (comp.componente_ciclo === a[0] || comp.componente_ciclo === a[1])) {
        this.grupos.push(grupo);
        console.log('se agrego: ', grupo);
      }
    }

  }

  async getHorarioByFilter(query: string, id: number) {
    this.horarios = [];
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
      this.horarios = await this._horario.list.filter(horario => Number(horario.horario_grupo) === id);
      console.log(this.horarios);
      this.fun();
    }
    if (query === 'aula') {
      console.log('el id de aula es: ', id);
      this.horarios = await this._horario.list.filter(horario => Number(horario.horario_aula) === id);
      console.log(this.horarios);
      this.fun();
    }

  }


  async fun() {
    let i = 0;
    let j = 0;
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
        case 'Lunes': {
          i = 0;
          break;
        }
        case 'Martes': {
          i = 1;
          break;
        }
        case 'Miercoles': {
          i = 2;
          break;
        }
        case 'jueves': {
          i = 3;
          break;
        }
        case 'Viernes': {
          i = 4;
          break;
        }
        default:
          {
            console.log('No such day exists!', dia);
            break;
          }
      }
      switch (dia.horario_hora) {
        case 7: {
          j = 0;
          break;
        }
        case 9: {
          j = 1;
          break;
        }
        case 11: {
          j = 2;
          break;
        }
        case 13: {
          // console.log('llego al jueves y se debe meter: ', dia);
          j = 3;
          break;
        }
        case 15: {
          j = 4;
          break;
        }
        case 17: {
          j = 5;
          break;
        }
        default:
          {
            console.log('No such day exists!', dia);
            break;
          }
      }
      // console.log(dia);
      const diaView = new HorarioViewModel();
      if (this.reporte === 'aula') {
        // console.log(dia);
        if (!dia.horario_vacio) {
          diaView.horario_dia = dia.horario_dia;
          diaView.horario_hora = dia.horario_hora;
          const gp = await this._grupo.list.find(g => g.grupo_id === dia.horario_grupo);
          const cp = await this.componentes.find(c => c.componente_id === gp.grupo_componente);
          diaView.componente = cp.componente_nombre;
          if (gp.grupo_tipo === 'teorico') {
            diaView.grupo = `gt${gp.grupo_numero}`;
          }
          if (gp.grupo_tipo === 'practico') {
            diaView.grupo = `gp${gp.grupo_numero}`;
          }
          diaView.aula = `${this.selectedA.aula_nombre}: ${this.selectedR.recinto_nombre}`;
          const dc = this._docente.list.find(d => d.docente_id === gp.grupo_docente);
          diaView.docente = dc.docente_nombre;
          console.log(diaView);
          this.array[j][i] = diaView;
          i = 0;
          j = 0;
        }
      }
      if (this.reporte === 'docente') {
        if (!dia.horario_vacio) {
          diaView.horario_dia = dia.horario_dia;
          diaView.horario_hora = dia.horario_hora;
          const gp = await this._grupo.list.find(g => g.grupo_id === dia.horario_grupo);
          const cp = await this.componentes.find(c => c.componente_id === gp.grupo_componente);
          diaView.componente = cp.componente_nombre;
          if (gp.grupo_tipo === 'teorico') {
            diaView.grupo = `gt${gp.grupo_numero}`;
          }
          if (gp.grupo_tipo === 'practico') {
            diaView.grupo = `gp${gp.grupo_numero}`;
          }
          diaView.anyo = cp.componente_ciclo;
          const al = this._aula.list.find(a => a.aula_id === dia.horario_aula)
          diaView.aula = al.aula_nombre;
          console.log(diaView);
          this.array[j][i] = diaView;
          i = 0;
          j = 0;
        }
      }
    }
    console.log(this.array);
  }

}
