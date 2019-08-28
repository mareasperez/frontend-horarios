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
  public array: any[] = [];
  public primera: HorarioModel[] = [];
  public segunda: HorarioModel[] = [];
  public tercera: HorarioModel[] = [];
  public cuarta: HorarioModel[] = [];
  public quinta: HorarioModel[] = [];
  public sexta: HorarioModel[] = [];

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
        this.ordenar();
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
  ordenar() {
    this.vaciar();
    console.log('se llamo al ordenar');
    this.horarios.forEach(dia => {
      // console.log('llego', dia);
      switch (dia.horario_hora) {
        case '7': {
          this.primera.push(dia);
          break;
        }
        case '9': {
          this.segunda.push(dia);
          break;
        }
        case '11': {
          this.tercera.push(dia);
          break;
        }
        case '13': {
          console.log('llego al jueves y se debe meter: ', dia);
          this.cuarta.push(dia);
          break;
        }
        case '15': {
          this.quinta.push(dia);
          break;
        }
        case '17': {
          this.sexta.push(dia);
          break;
        }
        default:
          {
            console.log('No such day exists!');
            break;
          }
      }
    });
    this.array.push(this.primera);
    this.array.push(this.segunda);
    this.array.push(this.tercera);
    this.array.push(this.cuarta);
    this.array.push(this.quinta);
    this.array.push(this.sexta);

  }
  vaciar() {
    this.array = [];
    this.primera = [];
    this.segunda = [];
    this.tercera = [];
    this.cuarta = [];
    this.quinta = [];
    this.sexta = [];
  }
}
