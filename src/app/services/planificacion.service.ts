import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanificacionModel } from '../models/planificacion.model';
import { MainService } from './main.service';

@Injectable()
export class PlanificacionService extends MainService{

  constructor(Http: HttpClient) {
    super(Http, 'planificacion');
  }
  getPlanificaciones(): Observable<PlanificacionModel> {
    
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.planificacion.forEach(el => {
          //console.log(el)
          let planificacion = new PlanificacionModel();
          planificacion = Object.assign(el);
          observer.next(planificacion);
        });
      });
    });
  }

  getPlanificacionByID(id: number|string) {
   
    return this.getByID(id);
     
  }

  crearPlanificacion(planificacion: PlanificacionModel): Observable<any> {
    let body = { planificacion: planificacion };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updatePlanificacion(planificacion: PlanificacionModel, id: string|number) {
    // Ejemplo del parametro body
    let body = { planificacion: planificacion };
    return this.update(body, id);
  }

  deletePlanificacion(idplanificacion: number|string)  {
    return this.delete(idplanificacion)
  }
}
