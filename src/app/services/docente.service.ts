import { Injectable } from '@angular/core';
import { DocenteModel } from '../models/docente.model';
import { Observable } from 'rxjs';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocenteService extends MainService{

  constructor(docenteHttpClient:HttpClient) {
    super(docenteHttpClient, 'docente');
   }

  getDocente(): Observable<DocenteModel> {
    /*Este metodo obtiene como respuesta de get()
    un array de facultades. Lo mapea uno a uno a objetos tipo
    FacultadModel y lo regresa uno a uno.
    */
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.docente.forEach(el => {
          //console.log(el)
          let docente = new DocenteModel();
          docente = Object.assign(el);
          this.list.push(docente);
          observer.next(docente);

        });
      });
    });
  }

  crearDocente(docente: DocenteModel): Observable<any> {
    let body = { docente: docente };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateDocente(docente: DocenteModel, id: string|number) {
    // Ejemplo del parametro body
    let body = { docente: docente };
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

  deleteDocente(idDocente: number|string)  {
    /*return new Observable(observer => {
      this.delete(idDocente).subscribe(response => {
        // console.log(response)
        observer.next(response);
      });
    });*/
    return this.delete(idDocente)
  }
}
