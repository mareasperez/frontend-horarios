import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecintoModel } from '../models/recinto.model';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';

@Injectable()
export class RecintoService extends MainService {
  public resource = 'recinto'
  constructor(recintoHttp: HttpClient) {
    super(recintoHttp);
  }

  getRecinto(): Observable<RecintoModel> {

    return new Observable(observer => {
      this.get().subscribe(data => {
        if (!data.detail) {
          data.recinto.forEach(el => {
            // console.log(el)
            let recinto = new RecintoModel();
            recinto = Object.assign(recinto, el);
            this.list.push(recinto)
            observer.next(recinto);
          });
        } else {
          this.errorObten(data.detail);
        }
        observer.complete();
      });
    });
  }

  getRecintoByID(id: number | string) {

    return this.getByID(id);

  }

  crearRecinto(recinto: RecintoModel): Observable<any> {
    const body = { recinto };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateRecinto(recinto: RecintoModel, id: string | number) {
    // Ejemplo del parametro body
    const body = { recinto };
    return this.update(body, id);
  }

  deleteRecinto(idRecinto: number | string) {
    return this.delete(idRecinto);
  }

  updateList(data: wsModel) {
    // console.log(data)
    let recinto = new RecintoModel();
    recinto = Object.assign(recinto, data.data);
    switch (data.event) {
      case 'c':
        // console.log("Crear")
        this.list.push(recinto);
        this.list$.next(this.list)
        break;
      case 'u':
        //  console.log("update")
        const index = this.list.map(el => el.recinto_id).indexOf(recinto.recinto_id);
        this.list.splice(index, 1, recinto);
        this.list$.next(this.list)
        break;
      case 'd':
        // console.log("delete")
        this.list = this.list.filter(el => el.recinto_id !== recinto.recinto_id);
        this.list$.next(this.list)
        break;

    }

  }

  getRecintoByFilter(filtro: string, id: string | number): Observable<RecintoModel> {
    return new Observable(observer => {
      this.getByFiltro(filtro, id).subscribe(data => {
        if (!data.detail) {
          data.recinto.forEach(el => {
            // console.log(el)
            let recinto = new RecintoModel();
            recinto = Object.assign(el);
            observer.next(recinto);
          });
        } else {
          this.errorObten(data.detail);
        }
        observer.complete();
      });
    });
  }
}
