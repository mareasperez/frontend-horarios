import { Injectable } from '@angular/core';
import { DocenteAreaModel } from '../models/docente.area.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';

@Injectable()
export class DocenteAreaService extends MainService {
  public resource = 'doar';
  constructor(httpclient: HttpClient) {
    super(httpclient);
  }

  getDcArea(): Observable<DocenteAreaModel> {
    return new Observable(observer => {
      this.get().subscribe(data => {
        console.log('aqui esta data: ', data);
        if (!data.detail) {
          data.docenteArea.forEach(el => {
            // console.log(el)
            let docenteArea = new DocenteAreaModel();
            docenteArea = Object.assign(docenteArea, el);
            this.list.push(docenteArea);
            observer.next(docenteArea);
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

  crearDcArea(docenteId, areas: any[]): Observable<any> {
    const body = { docenteArea: [{ da_docente: docenteId, da_area: areas }] };
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

  updateDcArea(dcArea: DocenteAreaModel, id: string | number) {
    // Ejemplo del parametro body
    const body = { docenteArea: dcArea };
    return this.update(body, id);
  }
  deleteDcArea(idDcArea: number | string) {
    return this.delete(idDcArea);
  }
  getByDocente(filtro: string, id: string | number): Observable<DocenteAreaModel> {
    return new Observable(observer => {
      this.getByFiltro(filtro, id).subscribe(data => {
        if (!data.detail) {
          data.docenteArea.forEach(el => {
            let docenteArea = new DocenteAreaModel();
            docenteArea = Object.assign(docenteArea, el);
            this.list.push(docenteArea);
            observer.next(docenteArea);
          });
        }
        observer.complete();
      }, (error: HttpErrorResponse) => {
        observer.error(error);
      });
    });
  }
  updateList(data: wsModel) {
    //   console.log(data)
    let docenteA = new DocenteAreaModel();
    docenteA = Object.assign(docenteA, data.data);
    switch (data.event) {
      case 'c':
        // console.log("Crear")
        this.list.push(docenteA);
        this.list$.next(this.list);
        break;
      case 'u':
        //  console.log("update")
        const index = this.list.map(el => el.da_id).indexOf(docenteA.da_id);
        this.list.splice(index, 1, docenteA);
        this.list$.next(this.list);
        break;
      case 'd':
        // console.log("delete")
        this.list = this.list.filter(el => el.da_id !== docenteA.da_id);
        this.list$.next(this.list);
        break;

    }

  }

}
