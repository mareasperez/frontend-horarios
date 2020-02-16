import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';
import { Observable } from 'rxjs';
import { PlanEstudioModel } from '../models/planEstudio';
import { wsModel } from '../models/ws.model';

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
        if (!data.detail) {
          data.planDeEstudio.forEach(el => {
            let pde = new PlanEstudioModel();
            pde = Object.assign(pde, el); //Tipar Objeto
            this.list.push(pde)
            observer.next(pde);
          });
        } else {
          this.errorObten();
        }
        observer.complete();
      });
    });
  }

  getPlanEstudioByID(id: number | string) {
    return this.getByID(id);
  }

  crearPlanEstudio(pde: PlanEstudioModel): Observable<any> {
    let body = { planDeEstudio: pde };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        observer.next(response);
      });
    });
  }

  updatePlanEstudio(pde: PlanEstudioModel, id: string | number) {
    // Ejemplo del parametro body
    let body = { planDeEstudio: pde };
    return this.update(body, id);
  }

  deletePde(idPlanEstudio: number | string) {
    return this.delete(idPlanEstudio);
  }

  updateList(data: wsModel) {
    // console.log(data)
    let pde = new PlanEstudioModel();
    pde = Object.assign(pde, data.data);
    switch (data.event) {
      case 'c':
        // console.log("Crear")
        console.log(pde)
        data.data = pde;
        this.list.push(pde);
        this.list$.next(this.list)
        break;
      case 'u':
        //  console.log("update")
        const index = this.list.map(el => el.pde_id).indexOf(pde.pde_id);
        this.list.splice(index, 1, pde);
        this.list$.next(this.list)
        break;
      case 'd':
        // console.log("delete")
        this.list = this.list.filter(el => el.pde_id !== pde.pde_id);
        this.list$.next(this.list)
        break;

    }

  }

}
