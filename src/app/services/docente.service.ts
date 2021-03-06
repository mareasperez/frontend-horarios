import { Injectable } from '@angular/core';
import { DocenteModel } from '../models/docente.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';

@Injectable()
export class DocenteService extends MainService {
  public resource = 'docente';
  constructor(docenteHttpClient: HttpClient) {
    super(docenteHttpClient);
  }

  getDocente(): Observable<DocenteModel> {
    return new Observable(observer => {
      this.get().subscribe(data => {
        if (!data.detail) {
          data.docente.forEach(el => {
            let docente = new DocenteModel();
            docente = Object.assign(docente, el);
            // console.log(el, docente)
            this.list.push(docente);
            observer.next(docente);
          });
        } else {
          this.errorObten(data.detail);
        }
        observer.complete();
      }, (error: HttpErrorResponse) => {
        observer.error(error);
      });
    });
  }

  crearDocente(docente: DocenteModel): Observable<any> {
    const body = { docente };
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

  updateDocente(docente: DocenteModel, id: string | number) {
    const body = { docente };
    return this.update(body, id);

  }

  deleteDocente(idDocente: number | string) {

    return this.delete(idDocente);
  }
  getDocenteByFilter(filtro: string, id: number | string): Observable<DocenteModel> {
    return new Observable(observer => {
      this.getByFiltro(filtro, id).subscribe(data => {
        if (!data.detail) {
          data.docente.forEach(el => {
            // console.log(el)
            let docente = new DocenteModel();
            docente = Object.assign(docente, el);
            observer.next(docente);
          });
        } else {
          this.errorObten(data.detail);
        }
        observer.complete();
      }, (error: HttpErrorResponse) => {
        observer.error(error);
      });
    });
  }

  updateList(data: wsModel) {
    console.log(data);
    let docente = new DocenteModel();
    docente = Object.assign(docente, data.data);
    switch (data.event) {
      case 'c':
        console.log('Crear');
        // console.log(docente);
        this.list.push(docente);
        this.list$.next(this.list);
        break;
      case 'u':
        console.log('update');

        const index = this.list.map(el => el.docente_id).indexOf(docente.docente_id);
        this.list.splice(index, 1, docente);
        this.list$.next(this.list);
        break;
      case 'd':
        console.log('delete');
        this.list = this.list.filter(el => el.docente_id !== docente.docente_id);
        this.list$.next(this.list);
        break;

    }

  }

}
