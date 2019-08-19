import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';
import { Observable } from 'rxjs';
import { PlanEstudioModel } from '../models/planEstudio';

@Injectable({
  providedIn: 'root'
})
export class PlanEstudioService extends MainService{
  public resource = "pde"
  constructor(Http: HttpClient) {
    super(Http);
  }

  getCarrera(): Observable<PlanEstudioModel> {
    
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.carrera.forEach(el => {
          //console.log(el)
          let carrera = new PlanEstudioModel();
          carrera = Object.assign(el);
          observer.next(carrera);
        });
      });
    });
  }

  getCarreraByID(id: number|string) {
   
    return this.getByID(id);
     
  }

  crearCarrera(carrera: PlanEstudioModel): Observable<any> {
    let body = { carrera: carrera };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateCarrera(carrera: PlanEstudioModel, id: string|number) {
    // Ejemplo del parametro body
    let body = { carrera: carrera };
    return this.update(body, id);
  }

  deleteCarrera(idCarrera: number|string)  {
    return this.delete(idCarrera)
  }
}
