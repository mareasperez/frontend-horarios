import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs/';
import { FacultadModel } from '../models/facultad.model';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class FacultadSerivice extends MainService {
  constructor(facultadHttp: HttpClient) {
    super(facultadHttp, 'facultad');
  }

  getFacultad(): Observable<FacultadModel> {
    /*Este metodo obtiene como respuesta de get()
    un array de facultades. Lo mapea uno a uno a objetos tipo
    FacultadModel y lo regresa uno a uno.
    */
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.facultad.forEach(el => {
          observer.next(new FacultadModel(el.facultad_id, el.facultad_nombre));
        });
      });
    });
  }
  getFacultadByID(id: number|string): Observable<FacultadModel> {
    /*Este metodo obtiene como respuesta de get()
    un array de facultades. Lo mapea uno a uno a objetos tipo
    FacultadModel y lo regresa uno a uno.
    */
    return new Observable(observer => {
      this.getByID(id).subscribe(data => {
        observer.next(new FacultadModel(data.facultad.facultad_id, data.facultad.facultad_nombre));
      });
    });
  }

  crearFacultad(facultad: FacultadModel): Observable<any> {
    let body = {
      facultad:
      {
        facultad_nombre: facultad.nombre,
        facultad_id: facultad.id
      }
    };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateFaculta(facultad: FacultadModel, id: string|number) {
    // Ejemplo del parametro body
    let body = {
      facultad:
      {
        facultad_nombre: facultad.nombre,
        facultad_id: facultad.id
      }
    };

    return new Observable(observer => {
      this.update(body, id).subscribe(response => {
        /*Impresion de lo que sea que devuelve el servidor
        como resultado de la llamada put
        */
        console.log(response);
        observer.next(response);
      });
    });
  }

  deleteFaculta(idFacultad: number|string): Observable<FacultadModel> {
    return new Observable(observer => {
      this.delete(idFacultad).subscribe(response => {
        // console.log(response)
        observer.next(response);
      });
    });
  }
}
