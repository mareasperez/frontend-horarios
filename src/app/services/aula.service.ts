import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { AulaModel } from '../models/aula.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AulaService extends MainService{

  constructor(aulaHttpClinet: HttpClient) {
    super(aulaHttpClinet, 'aula')
   }

  getAula(): Observable<AulaModel> {
    /*Este metodo obtiene como respuesta de get()
    un array de facultades. Lo mapea uno a uno a objetos tipo
    FacultadModel y lo regresa uno a uno.
    */
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.aula.forEach(el => {
          //console.log(el)
          let aula = new AulaModel();
          aula = Object.assign(el);
          this.list.push(aula);
          observer.next(aula);

        });
      });
    });
  }

  crearAula(aula: AulaModel): Observable<any> {
    let body = { aula: aula };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateAula(aula: AulaModel, id: string|number) {
    // Ejemplo del parametro body
    let body = { aula: aula };
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

  deleteAula(idAula: number|string)  {
    /*return new Observable(observer => {
      this.delete(idAula).subscribe(response => {
        // console.log(response)
        observer.next(response);
      });
    });*/
    return this.delete(idAula)
  }
}
