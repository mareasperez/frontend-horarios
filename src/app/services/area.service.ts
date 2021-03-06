import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AreaModel } from '../models/area.model';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';


@Injectable({
  providedIn: 'root'
})
export class AreaService extends MainService {
  public resource = 'area';
  constructor(httpclient: HttpClient) {
    super(httpclient);
  }

  getAreas(): Observable<AreaModel> {
    return new Observable(observer => {
      this.get().subscribe(data => {
        if (!data.detail) {
          data.area.forEach(el => {
            // console.log(el)
            let area = new AreaModel();
            area = Object.assign(area, el);
            this.list.push(area);
            observer.next(area);
          });
        } else {
          this.errorObten(data.detail);
        }
        observer.complete();
      }, (error: HttpErrorResponse) => {
        observer.error(error);
      });
    });
  }

  crearArea(area: AreaModel): Observable<any> {
    const body = { area };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        if (!response.detail) {
          this.realizado();
          observer.next(response);
        } else {
          this.errorObten(response.detail);
        }
      }, (error: HttpErrorResponse) => {
        observer.error(error);
      });
    });
  }

  updateArea(area: AreaModel, id: string | number) {
    const body = { area };
    return this.update(body, id);

  }

  deleteArea(idarea: number | string) {

    return this.delete(idarea);
  }

  updateList(data: wsModel) {
    // console.log(data)
    let area = new AreaModel();
    area = Object.assign(area, data.data);

    switch (data.event) {
      case 'c':
        // console.log("Crear")
        data.data = area;
        this.list.push(area);
        this.list$.next(this.list);
        break;
      case 'u':
        //  console.log("update")
        const index = this.list.map(el => el.area_id).indexOf(area.area_id);
        this.list.splice(index, 1, area);
        this.list$.next(this.list);
        break;
      case 'd':
        // console.log("delete")
        const list = this.list.filter(el => el.area_id !== area.area_id);
        console.log(list);
        this.list = list;
        this.list$.next(this.list);
        break;

    }
  }
}
