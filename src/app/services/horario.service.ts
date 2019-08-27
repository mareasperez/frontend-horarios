import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HorarioModel } from '../models/horario.model';
import { MainService } from './main.service';

@Injectable()
export class HorarioService extends MainService {
  public resource = 'horario';
  constructor(Http: HttpClient) {
    super(Http);
  }

  getHorarios(): Observable<HorarioModel> {

    return new Observable(observer => {
      this.get().subscribe(data => {
        data.horarios.forEach(el => {
          console.log(el);
          let horario = new HorarioModel();
          horario = Object.assign(el);
          observer.next(horario);
        });
      });
    });
  }

  getHorarioByID(id: number|string) {

    return this.getByID(id);

  }

  crearHorario(horario: HorarioModel): Observable<any> {
    const body = { horario };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateHorario(horario: HorarioModel, id: string|number) {
    // Ejemplo del parametro body
    const body = { horario };
    return this.update(body, id);
  }

  deleteHorario(idhorario: number|string)  {
    return this.delete(idhorario);
  }
  getHorarioByFilter(filtro: string, id: string|number ): Observable<HorarioModel[]> {
    return new Observable(observer => {
      this.getByFiltro(filtro, id).subscribe(data => {
          let horario = new HorarioModel();
          horario = Object.assign(horario,data); //Tipar Objeto
          observer.next(data);
      });
    });
  }
}
