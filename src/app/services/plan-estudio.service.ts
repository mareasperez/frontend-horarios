import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';
import { Observable } from 'rxjs';
import { PlanEstudioModel } from '../models/planEstudio';

@Injectable({
  providedIn: 'root'
})
export class PlanEstudioService extends MainService {
  public resource = "pde";
  constructor(Http: HttpClient) {
    super(Http);
  }

  getPlanEstudio(): Observable<PlanEstudioModel> { 
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.planDeEstudio.forEach(el => {
          let pde = new PlanEstudioModel();
          pde = Object.assign(pde,el); //Tipar Objeto
          observer.next(pde);
        });
      });
    });
  }

  getPlanEstudioByID(id: number|string) {
    return this.getByID(id);
  }

  crearPlanEstudio(pde: PlanEstudioModel): Observable<any> {
    let body = { pde: pde };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updatePlanEstudio(pde: PlanEstudioModel, id: string|number) {
    // Ejemplo del parametro body
    let body = { pde: pde };
    return this.update(body, id);
  }

  deletePde(idPlanEstudio: number|string)  {
    return this.delete(idPlanEstudio);
  }
}
