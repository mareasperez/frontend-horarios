import { Injectable } from '@angular/core';
import { CarreraModel } from '../models/carrera.model';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarreraService extends MainService {

  constructor(carreraHttp: HttpClient) {
    super(carreraHttp, 'carrera');
  }

  getCarrera(): Observable<CarreraModel> {
    
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.carrera.forEach(el => {
          //console.log(el)
          let carrera = new CarreraModel();
          carrera = Object.assign(el);
          observer.next(carrera);
        });
      });
    });
  }

  getCarreraByID(id: number|string) {
   
    return this.getByID(id);
     
  }

  crearCarrera(carrera: CarreraModel): Observable<any> {
    let body = { carrera: carrera };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateCarrera(carrera: CarreraModel, id: string|number) {
    // Ejemplo del parametro body
    let body = { carrera: carrera };
    return this.update(body, id);
  }

  deleteCarrera(idCarrera: number|string)  {
    return this.delete(idCarrera)
  }
}
