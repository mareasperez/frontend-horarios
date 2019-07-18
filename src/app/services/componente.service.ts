import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComponenteModel } from '../models/componente.model';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService  extends MainService {

  constructor(httpclient: HttpClient) { 
    super(httpclient, 'componente')
  }
   getComponentes(): Observable <ComponenteModel> {
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.componente.forEach(el => {
          //console.log(el)
          let componente = new ComponenteModel();
          componente = Object.assign(el);
          this.list.push(componente);
          observer.next(componente);

        });
      });
    });
  }

  crearComponente(componente: ComponenteModel): Observable<any> {
    let body = { componente: componente };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateComponente(componente: ComponenteModel, id: string|number) {
    let body = { componente: componente };
    return this.update(body, id);
 
  }

  deleteComponente(idcomponente: number|string)  {
  
    return this.delete(idcomponente)
  }
}
