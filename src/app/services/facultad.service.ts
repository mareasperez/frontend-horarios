import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs/';
import { FacultadModel } from '../models/facultad.model';

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
          //console.log(el)
          let facultad = new FacultadModel();
          facultad.facultad_id = el.facultad_id;
          facultad.facultad_nombre = el.facultad_nombre;
          this.list.push(facultad);
          observer.next(facultad);

        });
      });
    });
  }
  getFacultadByID(id: number|string) {
    return this.getByID(id);
  }

  crearFacultad(facultad: FacultadModel): Observable<any> {
    let body = { facultad: facultad };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateFacultad(facultad: FacultadModel, id: string|number) {
    // Ejemplo del parametro body
    let body = { facultad: facultad };
    return this.update(body, id);
    /*return new Observable(observer => {
      this.update(body, id).subscribe(response => {
        /*Impresion de lo que sea que devuelve el servidor
        como resultado de la llamada put
        
        console.log(response);
        observer.next(response);
      });
    });*/
  }

  deleteFacultad(idFacultad: number|string)  {
    /*return new Observable(observer => {
      this.delete(idFacultad).subscribe(response => {
        // console.log(response)
        observer.next(response);
      });
    });*/
    return this.delete(idFacultad)
  }
}
