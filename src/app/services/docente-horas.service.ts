import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocenteHorasModel } from '../models/docente.horas.model';
@Injectable({
  providedIn: 'root'
})
export class DocenteHorasService extends MainService{

  constructor(httpclient:HttpClient) {
    super(httpclient,'doho')
   }

  getDcHoras(): Observable <DocenteHorasModel> {
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.docH.forEach(el => {
          //console.log(el)
          let docH = new DocenteHorasModel();
          docH = Object.assign(el);
          this.list.push(docH);
          observer.next(docH);

        });
      });
    });
  }

  crearDcHora(docH: DocenteHorasModel): Observable<any> {
    let body = { docH: docH };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateDcHora(docH: DocenteHorasModel, id: string|number) {
    let body = { docH: docH };
    return this.update(body, id);
 
  }

  deleteDcHora(iddocH: number|string)  {
  
    return this.delete(iddocH)
  }
}
