import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
        if (!data.detail) {
          data.horarios.forEach(el => {
            // console.log(el);
            let horario = new HorarioModel();
            horario = Object.assign(horario, el);
            this.list.push(horario);
            observer.next(horario);
          });
        } else {
          this.errorObten(data.detail);
        }
        observer.complete();
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
        if (!response.detail) {
          this.realizado();
          observer.next(response);
        } else {
          this.errorObten(response.detail);
        }
      }, (error: HttpErrorResponse) => {
        observer.error(error);
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
        const horarios = [];
        // console.log(data);
        if (!data.detail) {
          data.horario.forEach(el => {
            let horario = new HorarioModel();
            horario = Object.assign(horario, el); // Tipar Objeto
            horario.horario_choque = '';
            horario.horario_infochoque = [];
            horarios.push(horario);
          });
          observer.next(horarios);
        } else {
          this.errorObten(data.detail);
          observer.next(horarios);
        }
        observer.complete();
      }, (error: HttpErrorResponse) => {
        observer.error(error);
      });
    });
  }

  getHorarioByPlan(query: string, filtro: string | number, id: string | number): Observable<HorarioModel[]> {
    return new Observable(observer => {
      this.getByPlan(query, filtro, id).subscribe((data: any) => {
        const horarios = [];
        console.log(data);
        if (!data.detail) {
          data.horario.forEach(el => {
            let horario = new HorarioModel();
            horario = Object.assign(horario, el); // Tipar Objeto
            horarios.push(horario);
          });
          observer.next(horarios);
        } else {
          this.errorObten(data.detail);
        }
      }, (error: HttpErrorResponse) => {
        observer.error(error);
      });
    });
  }
  getChoques(hr, gp, cp) {
    const head: any = {};
    head['Content-Type'] = 'application/json';
    return this.client.post<any>(
      `${this.getUrl()}choques`,
      {
        busqueda: {
          choque: 'Docente',
          horario_hora: hr.horario_hora,
          horario_dia: hr.horario_dia,
          horario_planificacion: gp.grupo_planificacion,
          horario_docente: gp.grupo_docente,
          horario_componente: cp.componente_id,
          horario_ciclo: cp.componente_ciclo,
          horario_pde: cp.componente_pde,
        },
      }, head);
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
