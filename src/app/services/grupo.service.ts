import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GrupoModel } from '../models/grupo.model';
import { MainService } from './main.service';

@Injectable()
export class GrupoService extends MainService {

  constructor(Http: HttpClient) {
    super(Http, 'grupo');
  }
  getGrupos(): Observable<GrupoModel> {
    
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.grupo.forEach(el => {
          //console.log(el)
          let grupo = new GrupoModel();
          grupo = Object.assign(el);
          observer.next(grupo);
        });
      });
    });
  }

  getGrupoByID(id: number|string) {
   
    return this.getByID(id);
     
  }

  crearGrupo(grupo: GrupoModel): Observable<any> {
    let body = { grupo: grupo };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updategrupo(grupo: GrupoModel, id: string|number) {
    // Ejemplo del parametro body
    let body = { grupo: grupo };
    return this.update(body, id);
  }

  deleteGrupo(idgrupo: number|string)  {
    return this.delete(idgrupo)
  }
}
