import { Component, OnInit } from '@angular/core';
import { HorarioModel } from 'src/app/models/horario.model';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadSerivice } from 'src/app/services/facultad.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { CarreraModel } from 'src/app/models/carrera.model';
import { GrupoService } from 'src/app/services/grupo.service';
import { GrupoModel } from 'src/app/models/grupo.model';
import { ComponenteService } from 'src/app/services/componente.service';
import { ComponenteModel } from 'src/app/models/componente.model';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { HorarioService } from 'src/app/services/horario.service';
import { HorarioViewModel } from 'src/app/models/reportes/horarioView.model';
import { AulaService } from 'src/app/services/aula.service';
import { AulaModel } from 'src/app/models/aula.model';
import { RecintoModel } from 'src/app/models/recinto.model';
import { RecintoService } from 'src/app/services/recinto.service';
import { DocenteModel } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';

@Component({
  selector: 'app-horarios-anyo',
  templateUrl: './horarios-anyo.component.html',
  styleUrls: ['./horarios-anyo.component.scss']
})
export class HorariosAnyoComponent implements OnInit {
  public horarios: HorarioModel[][] = [];
  public array: any[][] = new Array();
  facultades: FacultadModel[] = [];
  departamentos: DepartamentoModel[] = [];
  carreras: CarreraModel[] = [];
  grupos: GrupoModel[] = [];
  componentes: ComponenteModel[] = [];
  pdes: PlanEstudioModel[] = [];
  aulas: AulaModel[] = [];
  recintos: RecintoModel[] = [];
  docentes: DocenteModel[] = [];

  // items de los select
  selectedF: FacultadModel;
  selectedD: DepartamentoModel;
  selectedG: GrupoModel;
  selectedCarrera: CarreraModel;

  anyos = [1, 2, 3, 4, 5];
  constructor(
    // tslint:disable: variable-name
    private _facultad: FacultadSerivice,
    private _departamento: DepartamentoService,
    private _carrera: CarreraService,
    private _grupo: GrupoService,
    private _horarios: HorarioService,
    // extras para funcionalidad
    private _componente: ComponenteService,
    private _pde: PlanEstudioService,
    private _aula: AulaService,
    private _recinto: RecintoService,
    private _docente: DocenteService,
  ) { }
  ngOnInit() {
    this._aula.getAula().subscribe(res => this.aulas.push(res));
    this._facultad.getFacultad().subscribe(res => this.facultades.push(res));
    this._departamento.getDepartamento().subscribe();
    this._carrera.getCarrera().subscribe();
    this._grupo.getGrupos().subscribe();
    this._componente.getComponentes().subscribe(res => this.componentes.push(res));
    this._pde.getPlanEstudio().subscribe(res => this.pdes.push(res));
    this._horarios.getHorarios().subscribe();
    this._recinto.getRecinto().subscribe(res => this.recintos.push(res));
    this._docente.getDocente().subscribe(res => this.docentes.push(res));
  }
  getDep(id: number) {
    this.departamentos = this._departamento.list.filter(dep => dep.departamento_facultad === id);
  }
  getCarreras(id: number) {
    this.carreras = this._carrera.list.filter(car => car.carrera_departamento === id);
  }
  async getGrupos(anyo: number) {
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
        // console.log('se agrego: ', grupo);
      }
    }
    this.obtenerH();

  }
  async obtenerH() {
    this.rellenar();
    for (const grupo of this.grupos) {
      const p = new Promise<any>((resolve, reject) => {
        this._horarios.getHorarioByFilter('horario_grupo', grupo.grupo_id).subscribe(res => resolve(res));
      });
      p.then((gr: HorarioModel[]) => {
        this.fun(gr);
      });
      p.finally(() => {
        // console.log(this.horarios);
      });
    }

  }
  async rellenar() {
    const vacio = new HorarioViewModel();
    vacio.horario_vacio = true;
    for (let aux = 0; aux < 6; aux++) {
      this.array[aux] = [];
    }
    for (let aux = 0; aux < 5; aux++) {
      for (let aux2 = 0; aux2 < 6; aux2++) {
        this.array[aux2][aux] = new Array();
        this.array[aux2][aux].push(vacio);
      }
    }
  }
  async fun(horarios: HorarioModel[]) {
    // console.log('recibio: ', horarios);
    let i = 0;
    let j = 0;
    for (const dia of horarios) {
      // console.log(dia);
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
        const aula = this.aulas.find(au => au.aula_id === Number(dia.horario_aula));
        const recinto = this.recintos.find(rec => rec.recinto_id === aula.aula_recinto);
        diaView.aula = `${aula.aula_nombre}: ${recinto.recinto_nombre}`;
        const dc = this.docentes.find(d => d.docente_id === gp.grupo_docente);
        diaView.docente = dc.docente_nombre;
        console.log(diaView);
        if (this.array[j][i][0].horario_vacio) {
          this.array[j][i].pop();
          this.array[j][i].push(diaView);
        } else {
          this.array[j][i].push(diaView);
        }
        i = 0;
        j = 0;
      }
    }
    console.log(this.array);
  }
}
