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
  docentes: DocenteModel[] = [];
  facultades: FacultadModel[] = [];
  recintos: RecintoModel[] = [];
  aulas: AulaModel[] = [];
  departamentos: DepartamentoModel[] = [];
  carreras: CarreraModel[] = [];
  grupos: GrupoModel[] = [];
  reporte: string;
  constructor(private service: HorarioService,
              private gserv: GrupoService,
              private fserv: FacultadSerivice,
              private rserv: RecintoService,
              private aserv: AulaService,
              private dserv: DepartamentoService,
              private route: ActivatedRoute,
              private cserv: CarreraService,
              private docenteS: DocenteService) { }
  ngOnInit() {

    this.getFacultades();
    this.reporte = (this.route.snapshot.queryParamMap.get('reporte'));

  }
  filtros(filtro: string, id: number) {
    console.log('llego: ', id);
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

      default: {
        console.log('no hay filtro para eso');
      }
    }
  }
  getFacultades() {
    this.selectedA = null;
    this.selectedR = null;
    this.fserv.getFacultad().subscribe(
      res => {
        this.facultades.push(res);
      },
      err => {
        console.error(err);
      }
    );
  }
  getDepartamentos(id: number) {
    this.departamentos = [];
    console.log('hika: ', id);
    this.dserv.getDepartamentoByFilter('departamento_facultad', id).subscribe(
      res => {
        console.log('se metera: ', res);
        this.departamentos.push(res);
        // console.log(this.recintos);
      },
      err => {
        console.error(err);
      }
    );
  }
  getRecintos(id: number) {
    this.recintos = [];
    this.rserv.getRecintoByFilter('recinto_facultad', id).subscribe(
      res => {
        // console.log('se metera: ',res)
        this.recintos.push(res);
        // console.log(this.recintos);
      },
      err => {
        console.error(err);
      }
    );
  }
  getDocentesOrCarreras(id: number) {
    if (this.reporte === 'docente') {
      this.docentes = [];
      console.log('el id es:', id);
      this.docenteS.getDocenteByFilter('docente_departamento', id).subscribe(
        res => {
          // console.log('se metera: ',res)
          this.docentes.push(res);
          // console.log(this.recintos);
        },
        err => {
          console.error(err);
        }
      );
    } else {
      this.carreras = [];
      console.log('el id es:', id);
      this.cserv.getCarreraByFiltro('carrera_departamento', id).subscribe(
        res => {
          // console.log('se metera: ',res)
          this.carreras.push(res);
          console.log(this.carreras);
        },
        err => {
          console.error(err);
        }
      );
    }

  }
  getAulas(id: number) {
    this.aulas = [];
    this.aserv.getAulaByFilter('aula_recinto', id).subscribe(
      res => {
        // console.log('se metera: ', res);
        this.aulas.push(res);
        // console.log(this.aulas);
      },
      err => {
        console.error(err);
      }
    );
  }

  getHorarios() {
    this.horarios = [];
    this.service.getHorarios().subscribe(
      res => {
        this.horarios.push(res);
        // console.log(this.horarios);
      },
      err => {
        console.error(err);
      }
    );
  }

  getGrupos(filtro: string, id: number) {
    this.grupos = [];
    // abajo se tiene que obviamente mandar los arg de filtrado
    this.gserv.gerGrupoByFilter(filtro, id).subscribe(
      res => {
        this.grupos.push(res);
        console.log(this.grupos);
      },
      err => {
        console.error(err);
      },
    );
  }

  getHorarioByFilter(filtro: string, id: number) {
    this.horarios = [];
    // abajo se tiene que obviamente mandar los arg de filtrado
    this.service.getHorarioByFilter(filtro, id).subscribe(
      res => {
        this.horarios = res;
        // console.log(this.horarios);

        // console.log(this.horarios, this.horarios.length);
        this.fun();
      },
      err => {
        console.error(err);
      },
    );

  }

  fun() {
    let i = 0;
    let j = 0;
    const vacio = new HorarioModel();
    vacio.horario_aula = '-';
    vacio.horario_dia = '-';
    vacio.horario_hora = 0;
    vacio.horario_grupo = '-';
    vacio.horario_id = '-';
    vacio.horario_vacio = true;
    for (let aux = 0; aux < 6; aux++) {
      this.array[aux] = [];
    }
    for (let aux = 0; aux < 5; aux++) {
      for (let aux2 = 0; aux2 < 6; aux2++) {
        this.array[aux2][aux] = vacio;
      }
    }
    this.horarios.forEach(dia => {
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
      console.log(dia);
      this.array[j][i] = dia;
      i = 0;
      j = 0;

    });
    console.log(this.array);
  }

}
