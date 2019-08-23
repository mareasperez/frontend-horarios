import { Component, OnInit } from '@angular/core';
import {HorarioService} from '../../services/horario.service';
import {HorarioModel} from '../../models/horario.model';
@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit {
  public horarios: HorarioModel[] = [];
  constructor(private service: HorarioService) { }

  ngOnInit() {
  this.getbyFilter()
  }

  getHorarios() {
    this.horarios = [];
    this.service.getHorarios().subscribe(
      res => {
        this.horarios.push(res);
        console.log(this.horarios);
      },
      err => {
        console.error(err);
      }
    );
  }
  getbyFilter(){
    this.horarios = [];
    // abajo se tiene que obviamente mandar los arg de filtrado
    this.service.getHorarioByFilter('horario_docente', '1').subscribe(
      res => {
        this.horarios.push(res);
        console.log(this.horarios);
      },
      err => {
        console.error(err);
      }
    );
  }
}
