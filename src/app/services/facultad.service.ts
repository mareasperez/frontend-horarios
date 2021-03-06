import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { FacultadModel } from '../models/facultad.model';
import { MainService } from './main.service';
import { wsModel } from 'src/app/models/ws.model';

@Injectable({
  providedIn: 'root'
})
export class FacultadSerivice extends MainService {
  public resource = 'facultad';
  constructor(facultadHttp: HttpClient) {
    super(facultadHttp);
  }

  getFacultad(): Observable<FacultadModel> {
    return new Observable(observer => {
      this.get().subscribe(data => {
        if (!data.detail) {
          data.facultad.forEach(el => {
            // console.log(el)
            let facultad = new FacultadModel();
            facultad = Object.assign(facultad, el); // Tipar Objeto
            this.list.push(facultad);
            observer.next(facultad);
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
  getFacultadByID(id: number | string) {
    return this.getByID(id);
  }

  crearFacultad(facultad: FacultadModel): Observable<any> {
    const body = { facultad };
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

  updateFacultad(facultad: FacultadModel, id: string | number) {
    // Ejemplo del parametro body
    const body = { facultad };
    return this.update(body, id);

  }

  deleteFacultad(idFacultad: number | string) {

    return this.delete(idFacultad);
  }

  updateList(data: wsModel) {
    // console.log(data)
    let facultad = new FacultadModel();
    facultad = Object.assign(facultad, data.data);
    switch (data.event) {
      case 'c':
        // console.log("Crear")
        console.log(facultad);
        this.list.push(facultad);
        this.list$.next(this.list);
        break;
      case 'u':
        //  console.log("update")
        const index = this.list.map(el => el.facultad_id).indexOf(facultad.facultad_id);
        this.list.splice(index, 1, facultad);
        this.list$.next(this.list);
        break;
      case 'd':
        // console.log("delete")
        this.list = this.list.filter(el => el.facultad_id !== facultad.facultad_id);
        this.list$.next(this.list);
        break;

    }

  }
}
