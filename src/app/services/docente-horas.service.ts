import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocenteHorasModel } from '../models/docente.horas.model';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';
@Injectable()
export class DocenteHorasService extends MainService {
  public resource = 'doho';
  constructor(httpclient: HttpClient) {
    super(httpclient);
  }

  getDcHoras(): Observable<DocenteHorasModel> {
    return new Observable(observer => {
      this.get().subscribe(data => {
        if (!data.detail) {
          data.docenteHoras.forEach(el => {
            // console.log(el)
            let docH = new DocenteHorasModel();
            docH = Object.assign(docH, el);
            this.list.push(docH);
            observer.next(docH);

          });
        } else {
          this.errorObten(data.detail);
        }
        observer.complete();
      });
    });
  }

  crearDcHora(docH: DocenteHorasModel): Observable<any> {
    const body = { docenteHoras: docH };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateDcHora(docH: DocenteHorasModel, id: string | number) {
    const body = { docenteHoras: docH };
    return this.update(body, id);

  }

  deleteDcHora(iddocH: number | string) {

    return this.delete(iddocH);
  }

  updateList(data: wsModel) {
    // console.log(data)
    let dco = new DocenteHorasModel();
    dco = Object.assign(dco, data.data);
    switch (data.event) {
      case 'c':
        // console.log("Crear")
        //    console.log(dco);
        data.data = dco;
        this.list.push(dco);
        this.list$.next(this.list);
        break;
      case 'u':
        //  console.log("update")
        const index = this.list.map(el => el.dh_id).indexOf(dco.dh_id);
        this.list.splice(index, 1, dco);
        this.list$.next(this.list);
        break;
      case 'd':
        // console.log("delete")
        this.list = this.list.filter(el => el.dh_id !== dco.dh_id);
        this.list$.next(this.list);
        break;

    }

  }

}
