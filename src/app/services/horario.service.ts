import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HorarioModel } from '../models/horario.model';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';

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
          // console.log(el);
          let horario = new HorarioModel();
          horario = Object.assign(horario, el);
          this.list.push(horario);
          observer.next(horario);
        });
        observer.complete()
      });
    });
  }

  getHorarioByID(id: number | string) {

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

  updateHorario(horario: HorarioModel, id: string | number) {
    // Ejemplo del parametro body
    const body = { horario };
    return this.update(body, id);
  }

  deleteHorario(idhorario: number | string) {
    return this.delete(idhorario);
  }
  getHorarioByFilter(filtro: string, id: string | number): Observable<HorarioModel[]> {
    return new Observable(observer => {
      this.getByFiltro(filtro, id).subscribe((data: any) => {
        let horarios = [];
        // console.log(data);
        if (data.Detail !== 'not found') {
          data.horario.forEach(el => {
            let horario = new HorarioModel();
            horario = Object.assign(horario, el); // Tipar Objeto
            horarios.push(horario);
          });
          observer.next(horarios);
         }
      });
    });
  }

  getHorarioByPlan(query: string, filtro: string | number, id: string | number): Observable<HorarioModel[]> {
    return new Observable(observer => {
      this.getByPlan(query, filtro, id).subscribe((data: any) => {
        let horarios = [];
        console.log(data);
        if (data.Detail !== 'not found') {
          data.horario.forEach(el => {
            let horario = new HorarioModel();
            horario = Object.assign(horario, el); // Tipar Objeto
            horarios.push(horario);
          });
          observer.next(horarios);
         }
      });
    });
  }

  updateList(data: wsModel) {
    // console.log(data)
    let horario = new HorarioModel();
    horario = Object.assign(horario, data.data);
    switch (data.event) {
      case 'c':
        // console.log("Crear")

        this.list.push(horario);
        this.list$.next(this.list);
        break;
      case 'u':
        //  console.log("update")
        const index = this.list.map(el => el.horario_id).indexOf(horario.horario_id);
        this.list.splice(index, 1, horario);
        this.list$.next(this.list);
        break;
      case 'd':
        // console.log("delete")
        this.list = this.list.filter(el => el.horario_id !== horario.horario_id);
        this.list$.next(this.list);
        break;

    }

  }

}
