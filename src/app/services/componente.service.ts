import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComponenteModel } from '../models/componente.model';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';

@Injectable()
export class ComponenteService  extends MainService {
  public resource = "componente"
  constructor(httpclient: HttpClient) { 
    super(httpclient)
  }
   getComponentes(): Observable <ComponenteModel> {
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.componente.forEach(el => {
          //console.log(el)
          let componente = new ComponenteModel();
          componente = Object.assign(componente,el);
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

  updateList(data: wsModel) {
    // console.log(data)
    
     switch (data.event) {
       case 'c':
        // console.log("Crear")
         let componente = new ComponenteModel();
         componente = Object.assign(componente,data.data);
         console.log(componente)
         data.data = componente;
         this.list.push(componente);
         this.list$.next(this.list)
         break;
       case 'u':
       //  console.log("update")
         const index = this.list.map(el => el.componente_id).indexOf(componente.componente_id);
         this.list.splice(index, 1, componente);
         this.list$.next(this.list)
         break;
       case 'd':
        // console.log("delete")
         this.list = this.list.filter(el=>el.componente_id !== componente.componente_id);
         this.list$.next(this.list)
         break;
 
     }
 
   }
}
