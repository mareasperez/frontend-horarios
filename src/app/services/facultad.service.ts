import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { FacultadModel } from '../models/facultad.model';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class FacultadSerivice extends MainService {
  public resource = "facultad"
  constructor(facultadHttp: HttpClient) {
    super(facultadHttp);
  }

  getFacultad(): Observable<FacultadModel> {
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
 
  }

  deleteFacultad(idFacultad: number|string)  {

    return this.delete(idFacultad)
  }
}
