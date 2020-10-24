import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AulaModel } from 'src/app/models/aula.model';
import { CarreraModel } from 'src/app/models/carrera.model';
import { ComponenteModel } from 'src/app/models/componente.model';
import { DocenteModel } from 'src/app/models/docente.model';
import { GrupoModel } from 'src/app/models/grupo.model';
import { HorarioModel } from 'src/app/models/horario.model';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { RecintoModel } from 'src/app/models/recinto.model';

@Component({
  selector: 'app-grid-horario',
  templateUrl: './grid-horario.component.html',
  styleUrls: ['./grid-horario.component.scss']
})
export class GridHorarioComponent implements OnInit {
  public hLoaded = false;
  public array: Array<HorarioModel[]>[] = [];
  @Input() public horarios: HorarioModel[];
  @Input() public grupos: GrupoModel[];
  @Input() public componentes: ComponenteModel[];
  @Input() public docentes: DocenteModel[];
  @Input() public recintos: RecintoModel[];
  @Input() public aulas: AulaModel[];
  @Input() public TYPE: string;
  @Input() public carreras: CarreraModel[];
  @Input() public pdes: PlanEstudioModel[];
  public horasLabels = ['7-8', '8-9', '9-10', '10-11', '11-12', '12-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7'];
  public diasLabels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  constructor() { }

  ngOnInit(): void {
    console.log(this.TYPE);
    if (this.horarios) {
      this.fun(this.horarios);
    } else {
      alert('No horarios');
    }
  }
  rellenar() {
    const vacio = new HorarioModel();
    vacio.horario_vacio = true;
    for (let aux = 0; aux < 12; aux++) {
      this.array[aux] = [];
    }
    for (let aux = 0; aux < 5; aux++) {
      for (let aux2 = 0; aux2 < 12; aux2++) {
        this.array[aux2][aux] = new Array();
        this.array[aux2][aux].push(vacio);
      }
    }
  }

  async fun(horarios: HorarioModel[]) {
    this.rellenar();
    let i = 0;
    let j = 0;
    for (const dia of horarios) {
      switch (dia.horario_dia) {
        case 'Lunes': { i = 0; break; }
        case 'Martes': { i = 1; break; }
        case 'Miercoles': { i = 2; break; }
        case 'Jueves': { i = 3; break; }
        case 'Viernes': { i = 4; break; }
        default: { console.log('No such day exists!', dia); break; }
      }
      j = dia.horario_hora - 7;
      if (!dia.horario_vacio) {
        if (this.array[j][i][0].horario_vacio) {
          this.array[j][i].pop();
          this.array[j][i].push(dia);
        } else {
          this.array[j][i].push(dia);
        }
        i = 0; j = 0;
      }
    }
    this.hLoaded = true;
  }
}
