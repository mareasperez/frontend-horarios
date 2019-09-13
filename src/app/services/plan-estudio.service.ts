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
        data.planDeEstudio.forEach(el => {
          let planDeEstudio = new PlanEstudioModel();
          planDeEstudio = Object.assign(planDeEstudio,el); //Tipar Objeto
          observer.next(planDeEstudio);
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

  updateList(data: wsModel) {
    // console.log(data)
     switch (data.event) {
       case 'c':
        // console.log("Crear")
         let pde = new PlanEstudioModel();
         pde = Object.assign(pde,data.data);
         console.log(pde)
         data.data = pde;
         this.list.push(data.data);
         this.list$.next(this.list)
         break;
       case 'u':
       //  console.log("update")
         const index = this.list.map(el => el.pde_id).indexOf(data.data.pde_id);
         this.list.splice(index, 1, data.data);
         this.list$.next(this.list)
         break;
       case 'd':
        // console.log("delete")
         this.list = this.list.filter(el=>el.pde_id !== data.data.pde_id);
         this.list$.next(this.list)
         break;
 
     }
 
   }

}
