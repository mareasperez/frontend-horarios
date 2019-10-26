import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AulaModel } from '../models/aula.model';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';

@Injectable()
export class AulaService extends MainService{
   public resource = "aula"
  constructor(aulaHttpClinet: HttpClient) {
    super(aulaHttpClinet)
   }

  getAula(): Observable<AulaModel> {
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.aula.forEach(el => {
          //console.log(el)
          let aula = new AulaModel();
          aula = Object.assign(aula,el);
          this.list.push(aula);
          observer.next(aula);

        });
      });
    });
  }
  getAulaByID(id: number|string) {
   
    return this.getByID(id);
     
  }

  crearAula(aula: AulaModel): Observable<any> {
    let body = { aula: aula };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateAula(aula: AulaModel, id: string|number) {
    // Ejemplo del parametro body
    let body = { aula: aula };
    return this.update(body, id);
  
  }

  deleteAula(idAula: number|string)  {
    return this.delete(idAula)
  }

  updateList(data: wsModel) {
    // console.log(data)
    let aula = new AulaModel();
    aula = Object.assign(aula,data.data);
     switch (data.event) {
       case 'c':
        // console.log("Crear")
         console.log(aula)
         data.data = aula;
         this.list.push(aula);
         this.list$.next(this.list)
         break;
       case 'u':
       //  console.log("update")
         const index = this.list.map(el => el.aula_id).indexOf(aula.aula_id);
         this.list.splice(index, 1, aula);
         this.list$.next(this.list)
         break;
       case 'd':
        // console.log("delete")
         this.list = this.list.filter(el=>el.aula_id !== aula.aula_id);
         this.list$.next(this.list)
         break;
 
     }
 
   }
  getAulaByFilter(filtro: string, id: string|number ): Observable<AulaModel> {
    return new Observable(observer => {
    this.getByFiltro(filtro, id).subscribe(data => {
      data.aula.forEach(el => {
        // console.log(el)
        let aula = new AulaModel();
        aula = Object.assign(el);
        observer.next(aula);
      });
    });
  });
}
}
