import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AreaModel } from '../models/area.model';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class AreaService extends MainService {
  public resource = "area"
  constructor(httpclient:HttpClient) {
    super(httpclient)
   }

   getAreas(): Observable <AreaModel> {
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.area.forEach(el => {
          //console.log(el)
          let area = new AreaModel();
          area = Object.assign(el);
          this.list.push(area);
          observer.next(area);

        });
      });
    });
  }

  crearArea(area: AreaModel): Observable<any> {
    let body = { area: area };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateArea(area: AreaModel, id: string|number) {
    let body = { area: area };
    return this.update(body, id);
 
  }

  deleteArea(idarea: number|string)  {
  
    return this.delete(idarea)
  }
}
