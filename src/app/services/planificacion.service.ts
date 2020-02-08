import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanificacionModel } from '../models/planificacion.model';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';

@Injectable()
export class PlanificacionService extends MainService {
  public resource = "planificacion"
  constructor(Http: HttpClient) {
    super(Http);
  }
  getPlanificaciones(): Observable<PlanificacionModel> {

    return new Observable(observer => {
      this.get().subscribe(data => {
        if (!data.Detail) {
          this.successObten();
          data.planificacion.forEach(el => {
            //console.log(el)
            let planificacion = new PlanificacionModel();
            planificacion = Object.assign(planificacion, el);
            this.list.push(planificacion)
            observer.next(planificacion);
          });
        } else {
          this.errorObten();
        }
        observer.complete();
      });
    });
  }

  getPlanificacionByID(id: number | string) {

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

  updatePlanificacion(planificacion: PlanificacionModel, id: string | number) {
    // Ejemplo del parametro body
    let body = { planificacion: planificacion };
    return this.update(body, id);
  }

  deletePlanificacion(idplanificacion: number | string) {
    return this.delete(idplanificacion)
  }

  updateList(data: wsModel) {
    // console.log(data)
    let planificacion = new PlanificacionModel();
    planificacion = Object.assign(planificacion, data.data);
    switch (data.event) {
      case 'c':
        // console.log("Crear")
        console.log(planificacion)
        data.data = planificacion;
        this.list.push(planificacion);
        this.list$.next(this.list)
        break;
      case 'u':
        //  console.log("update")
        const index = this.list.map(el => el.planificacion_id).indexOf(planificacion.planificacion_id);
        this.list.splice(index, 1, planificacion);
        this.list$.next(this.list)
        break;
      case 'd':
        // console.log("delete")
        this.list = this.list.filter(el => el.planificacion_id !== planificacion.planificacion_id);
        this.list$.next(this.list)
        break;

    }

  }

}
