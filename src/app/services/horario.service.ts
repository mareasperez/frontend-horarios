import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HorarioModel } from '../models/horario.model';
import { MainService } from './main.service';

@Injectable()
export class HorarioService extends MainService {

  constructor(Http: HttpClient) {
    super(Http, 'horario');
  }

  getHorarios(): Observable<HorarioModel> {
    
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.horario.forEach(el => {
          //console.log(el)
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
    let body = { horario: horario };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateHorario(horario: HorarioModel, id: string|number) {
    // Ejemplo del parametro body
    let body = { horario: horario };
    return this.update(body, id);
  }

  deleteHorario(idhorario: number|string)  {
    return this.delete(idhorario)
  }
}
