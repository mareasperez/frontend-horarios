import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GrupoModel } from '../models/grupo.model';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';

@Injectable()
export class GrupoService extends MainService {
  public resource = "grupo"
  constructor(Http: HttpClient) {
    super(Http);
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

  updateList(data: wsModel) {
    // console.log(data)
     switch (data.event) {
       case 'c':
        // console.log("Crear")
         let grupo = new GrupoModel();
         grupo = Object.assign(grupo,data.data);
         console.log(grupo)
         data.data = grupo;
         this.list.push(data.data);
         this.list$.next(this.list)
         break;
       case 'u':
       //  console.log("update")
         const index = this.list.map(el => el.grupo_id).indexOf(data.data.grupo_id);
         this.list.splice(index, 1, data.data);
         this.list$.next(this.list)
         break;
       case 'd':
        // console.log("delete")
         this.list = this.list.filter(el=>el.grupo_id !== data.data.grupo_id);
         this.list$.next(this.list)
         break;
 
     }
 
   }

}
