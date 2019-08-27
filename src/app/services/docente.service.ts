import { Injectable } from '@angular/core';
import { DocenteModel } from '../models/docente.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';

@Injectable()
export class DocenteService extends MainService{
  public resource = "docente"
  constructor(docenteHttpClient:HttpClient) {
    super(docenteHttpClient);
   }

  getDocente(): Observable<DocenteModel> {
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.docente.forEach(el => {
          //console.log(el)
          let docente = new DocenteModel();
          docente = Object.assign(el);
          this.list.push(docente);
          observer.next(docente);

        });
      });
    });
  }

  crearDocente(docente: DocenteModel): Observable<any> {
    let body = { docente: docente };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateDocente(docente: DocenteModel, id: string|number) {
    let body = { docente: docente };
    return this.update(body, id);
 
  }

  deleteDocente(idDocente: number|string)  {
  
    return this.delete(idDocente)
  }

  updateList(data: wsModel) {
    // console.log(data)
     switch (data.event) {
       case 'c':
        // console.log("Crear")
         let docente = new DocenteModel();
         docente = Object.assign(docente,data.data);
         console.log(docente)
         data.data = docente;
         this.list.push(data.data);
         this.list$.next(this.list)
         break;
       case 'u':
       //  console.log("update")
         const index = this.list.map(el => el.docente_id).indexOf(data.data.docente_id);
         this.list.splice(index, 1, data.data);
         this.list$.next(this.list)
         break;
       case 'd':
        // console.log("delete")
         this.list = this.list.filter(el=>el.docente_id !== data.data.docente_id);
         this.list$.next(this.list)
         break;
 
     }
 
   }

}
