import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GrupoModel } from '../models/grupo.model';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';

@Injectable()
export class GrupoService extends MainService {
  public resource = 'grupo';
  constructor(Http: HttpClient) {
    super(Http);
  }
  getGrupos(): Observable<GrupoModel> {
    return new Observable(observer => {
      this.get().subscribe(data => {
        if (!data.detail) {
          data.grupos.forEach(el => {
            // console.log(el);
            let grupo = new GrupoModel();
            grupo = Object.assign(grupo, el);
            this.list.push(grupo);
            observer.next(grupo);
          });
        } else {
          this.errorObten(data.detail);
        }
        observer.complete();
      });
    });
  }

  getGrupoByID(id: number | string) {

    return this.getByID(id);

  }

  crearGrupo(grupo: GrupoModel): Observable<any> {
    const body = { grupo };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        if (!response.detail) {
          this.realizado();
          observer.next(response);
        } else {
          this.errorObten(response.detail);
        }
      });
    });
  }

  updategrupo(grupo: GrupoModel, id: string | number) {
    // Ejemplo del parametro body
    const body = { grupo };
    return this.update(body, id);
  }

  deleteGrupo(idgrupo: number | string) {
    return this.delete(idgrupo);
  }
  getGrupoByFilter(filtro: string, id: number | string): Observable<GrupoModel> {
    return new Observable(observer => {
      this.getByFiltro(filtro, id).subscribe(data => {
        if (!data.detail) {
          data.grupo.forEach(el => {
            // console.log(el);
            let grupo = new GrupoModel();
            grupo = Object.assign(grupo, el);
            this.list.push(grupo);
            observer.next(grupo);
          });
        } else {
          this.errorObten(data.detail);
        }
        observer.complete();
      });
    });
  }
  updateList(data: wsModel) {
    // console.log(data)
    let grupo = new GrupoModel();
    grupo = Object.assign(grupo, data.data);
    switch (data.event) {
      case 'c':
        // console.log("Crear")
        // console.log(grupo);
        data.data = grupo;
        this.list.push(grupo);
        this.list$.next(this.list);
        break;
      case 'u':
        //  console.log("update")
        const index = this.list.map(el => el.grupo_id).indexOf(grupo.grupo_id);
        this.list.splice(index, 1, grupo);
        this.list$.next(this.list);
        break;
      case 'd':
        // console.log("delete")
        this.list = this.list.filter(el => el.grupo_id !== grupo.grupo_id);
        this.list$.next(this.list);
        break;

    }

  }

}
