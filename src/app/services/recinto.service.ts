import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecintoModel } from '../models/recinto.model';
import { MainService } from './main.service';

@Injectable()
export class RecintoService extends MainService {
  public resource = "recinto"
  constructor(recintoHttp: HttpClient) {
    super(recintoHttp);
  }

  getRecinto(): Observable<RecintoModel> {
    
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.recinto.forEach(el => {
          //console.log(el)
          let recinto = new RecintoModel();
          recinto = Object.assign(el);
          observer.next(recinto);
        });
      });
    });
  }

  getRecintoByID(id: number|string) {
   
    return this.getByID(id);
     
  }

  crearRecinto(recinto: RecintoModel): Observable<any> {
    let body = { recinto: recinto };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateRecinto(recinto: RecintoModel, id: string|number) {
    // Ejemplo del parametro body
    let body = { recinto: recinto };
    return this.update(body, id);
  }

  deleteRecinto(idRecinto: number|string)  {
    return this.delete(idRecinto)
  }
}
