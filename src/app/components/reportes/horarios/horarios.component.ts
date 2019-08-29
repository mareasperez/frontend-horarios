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
  // tslint:disable-next-line: max-line-length
  constructor(private service: HorarioService, private fserv: FacultadSerivice, private rserv: RecintoService, private aserv: AulaService) { }

  facultades: FacultadModel[] = [];
  recintos: RecintoModel[] = [];
  aulas: AulaModel[] = [];
  ngOnInit() {
    this.getFacultades();

  }
  getFacultades() {
    this.selectedA = null;
    this.selectedR = null;
    this.fserv.getFacultad().subscribe(
      res => {
        this.facultades.push(res);
        console.log('largo de recinto: ', this.recintos.length);
      },
      err => {
        console.error(err);
      }
    );
  }
  getRecintos(f: FacultadModel) {
    this.recintos = [];
    this.rserv.getRecintoByFilter('recinto_facultad', f.facultad_id).subscribe(
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
  getAulas(r: RecintoModel) {
    this.aulas = [];
    this.aserv.getAulaByFilter('aula_recinto', r.recinto_id).subscribe(
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
  getHorarioByFilter(filtro: string, id: string | number) {
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
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  fun() {
    let i = 0;
    let j = 0;
    let vacio = new HorarioModel();
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
      // if (dia === undefined) {
      //   dia = new HorarioModel();
      //   dia.horario_hora = j;
      //   dia.horario_dia = '-';
      //   dia.horario_aula = '12';
      //   dia.horario_vacio = true;
      //   dia.horario_grupo = 'los';
      // }
      this.array[j][i] = dia;
      i = 0;
      j = 0;

    });
    console.log(this.array);
  }

}
