import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComponenteModel } from '../models/componente.model';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';

@Injectable()
export class ComponenteService extends MainService {
  public resource = 'componente';
  constructor(httpclient: HttpClient) {
    super(httpclient);
  }
  getComponentes(): Observable<ComponenteModel> {
    return new Observable(observer => {
      this.get().subscribe(data => {
        if (!data.detail) {
          data.componente.forEach(el => {
            // console.log(el)
            let componente = new ComponenteModel();
            componente = Object.assign(componente, el);
            this.list.push(componente);
            observer.next(componente);
          });
        } else {
          this.errorObten(data.detail);
        }
        observer.complete();
      });
    });
  }

  crearComponente(componente: ComponenteModel): Observable<any> {
    const body = { componente };
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

  updateComponente(componente: ComponenteModel, id: string | number) {
    const body = { componente };
    return this.update(body, id);

  }

  deleteComponente(idcomponente: number | string) {

    return this.delete(idcomponente);
  }

  updateList(data: wsModel) {
    // console.log(data)
    let componente = new ComponenteModel();
    componente = Object.assign(componente, data.data);

    switch (data.event) {
      case 'c':
        // console.log("Crear")
        console.log(componente);
        data.data = componente;
        this.list.push(componente);
        this.list$.next(this.list);
        break;
      case 'u':
        //  console.log("update")
        const index = this.list.map(el => el.componente_id).indexOf(componente.componente_id);
        this.list.splice(index, 1, componente);
        this.list$.next(this.list);
        break;
      case 'd':
        // console.log("delete")
        this.list = this.list.filter(el => el.componente_id !== componente.componente_id);
        this.list$.next(this.list);
        break;

    }

  }
}
