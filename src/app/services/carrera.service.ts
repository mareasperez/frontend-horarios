import { Injectable } from '@angular/core';
import { CarreraModel } from '../models/carrera.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';


@Injectable()
export class CarreraService extends MainService {
  public resource = 'carrera';
  constructor(carreraHttp: HttpClient) {
    super(carreraHttp);
  }

  getCarrera(): Observable<CarreraModel> {

    return new Observable(observer => {
      this.get().subscribe(data => {
        if (!data.Detail) {
          this.successObten();
          data.carrera.forEach(el => {
            // console.log(el)
            let carrera = new CarreraModel();
            carrera = Object.assign(carrera, el);
            this.list.push(carrera);
            observer.next(carrera);
          });
        } else {
          this.errorObten();
        }
        observer.complete();
      });
    });
  }

  getCarreraByID(id: number | string) {

    return this.getByID(id);

  }

  crearCarrera(carrera: CarreraModel): Observable<any> {
    const body = { carrera };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        observer.next(response);
      });
    });
  }

  updateCarrera(carrera: CarreraModel, id: string | number) {
    // Ejemplo del parametro body
    const body = { carrera };
    return this.update(body, id);
  }

  deleteCarrera(idCarrera: number | string) {
    return this.delete(idCarrera);
  }

  getCarreraByFiltro(filtro: string, id: number): Observable<CarreraModel> {
    return new Observable(observer => {
      this.getByFiltro(filtro, id).subscribe(data => {
        if (!data.Detail) {
          this.successObten();
          data.carrera.forEach(el => {
            // console.log(el)
            let carrera = new CarreraModel();
            carrera = Object.assign(carrera, el);
            this.list.push(carrera);
            observer.next(carrera);
          });
        } else {
          this.errorObten();
        }
        observer.complete();
      });
    });
  }
  updateList(data: wsModel) {
    console.log(data);
    let carrera = new CarreraModel();
    carrera = Object.assign(carrera, data.data);
    switch (data.event) {
      case 'c':
        // console.log("Crear")
        console.log(carrera);
        data.data = carrera;
        this.list.push(carrera);
        this.list$.next(this.list);
        break;
      case 'u':
        //  console.log("update")
        const index = this.list.map(el => el.carrera_id).indexOf(carrera.carrera_id);
        this.list.splice(index, 1, carrera);
        this.list$.next(this.list);
        break;
      case 'd':
        // console.log("delete")
        this.list = this.list.filter(el => el.carrera_id !== carrera.carrera_id);
        this.list$.next(this.list);
        break;

    }

  }
}
