import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanEstudioModel } from '../models/planEstudio';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';
import { PensumModel } from '../models/pensum.model';

@Injectable()
export class PensumService extends MainService {
  public resource = "pde"
  constructor(Http: HttpClient) {
    super(Http);
  }
  getPlanDeEstudios(): Observable<PlanEstudioModel> {

    return new Observable(observer => {
      this.get().subscribe(data => {
        if (!data.detail) {
          data.planDeEstudio.forEach(el => {
            //console.log(el)
            let planDeEstudio = new PlanEstudioModel();
            planDeEstudio = Object.assign(el);
            observer.next(planDeEstudio);
          });
        } else {
          this.errorObten(data.detail);
        }
        observer.complete();
      });
    });
  }

  getPlanDeEstudioByID(id: number | string) {

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

  updatePlanDeEstudio(planDeEstudio: PlanEstudioModel, id: string | number) {
    // Ejemplo del parametro body
    let body = { planDeEstudio: planDeEstudio };
    return this.update(body, id);
  }

  deletePlanDeEstudio(idplanDeEstudio: number | string) {
    return this.delete(idplanDeEstudio)
  }

  updateList(data: wsModel) {
    // console.log(data)
    let pensum = new PensumModel();
    pensum = Object.assign(pensum, data.data);
    switch (data.event) {
      case 'c':
        // console.log("Crear")
        console.log(pensum)
        data.data = pensum;
        this.list.push(pensum);
        this.list$.next(this.list)
        break;
      case 'u':
        //  console.log("update")
        const index = this.list.map(el => el.pensum_id).indexOf(pensum.pensum_id);
        this.list.splice(index, 1, pensum);
        this.list$.next(this.list)
        break;
      case 'd':
        // console.log("delete")
        this.list = this.list.filter(el => el.pensum_id !== pensum.pensum_id);
        this.list$.next(this.list)
        break;

    }

  }

}
