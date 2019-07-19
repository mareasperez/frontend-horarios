import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanEstudioModel } from '../models/planEstudio';

@Injectable({
  providedIn: 'root'
})
export class PensumService extends MainService {

  constructor(Http: HttpClient) {
    super(Http, 'pde');
  }
  getPlanDeEstudios(): Observable<PlanEstudioModel> {
    
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.planDeEstudio.forEach(el => {
          //console.log(el)
          let planDeEstudio = new PlanEstudioModel();
          planDeEstudio = Object.assign(el);
          observer.next(planDeEstudio);
        });
      });
    });
  }

  getPlanDeEstudioByID(id: number|string) {
   
    return this.getByID(id);
     
  }

  crearPlanDeEstudio(planDeEstudio: PlanEstudioModel): Observable<any> {
    let body = { planDeEstudio: planDeEstudio };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updatePlanDeEstudio(planDeEstudio: PlanEstudioModel, id: string|number) {
    // Ejemplo del parametro body
    let body = { planDeEstudio: planDeEstudio };
    return this.update(body, id);
  }

  deletePlanDeEstudio(idplanDeEstudio: number|string)  {
    return this.delete(idplanDeEstudio)
  }
}
