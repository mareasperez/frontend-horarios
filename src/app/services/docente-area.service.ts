import { Injectable } from '@angular/core';
import { DocenteAreaModel } from '../models/docente.area.model';
import { Observable } from 'rxjs';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocenteAreaService extends MainService {

  constructor(httpclient:HttpClient) { 
    super(httpclient,'doar')
  }

  getDcArea(): Observable<DocenteAreaModel> {
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.docenteArea.forEach(el => {
          //console.log(el)
          let docenteArea = new DocenteAreaModel();
          docenteArea = Object.assign(el);
          this.list.push(docenteArea);
          observer.next(docenteArea);

        });
      });
    });
  }

  crearDcArea(dcArea: DocenteAreaModel): Observable<any> {
    let body = { dcArea: dcArea };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateDcArea(dcArea: DocenteAreaModel, id: string|number) {
    // Ejemplo del parametro body
    let body = { dcArea: dcArea };
    return this.update(body, id);
  }
  deleteDcArea(idDcArea: number|string)  {
    return this.delete(idDcArea)
  }
}
