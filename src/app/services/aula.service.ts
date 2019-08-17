import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AulaModel } from '../models/aula.model';
import { MainService } from './main.service';

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
          aula = Object.assign(el);
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
}
