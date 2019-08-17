import { Injectable } from '@angular/core';
import { DocenteModel } from '../models/docente.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';

@Injectable()
export class DocenteService extends MainService{

  constructor(docenteHttpClient:HttpClient) {
    super(docenteHttpClient, 'docente');
   }

  getDocente(): Observable<DocenteModel> {
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
    let body = { docente: docente };
    return this.update(body, id);
 
  }

  deleteDocente(idDocente: number|string)  {
  
    return this.delete(idDocente)
  }
}
