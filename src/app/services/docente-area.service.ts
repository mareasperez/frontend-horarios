import { Injectable } from '@angular/core';
import { DocenteAreaModel } from '../models/docente.area.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';

@Injectable()
export class DocenteAreaService extends MainService {
  public resource = "doar"
  constructor(httpclient:HttpClient) { 
    super(httpclient)
  }

  getDcArea(): Observable<DocenteAreaModel> {
    return new Observable(observer => {
      this.get().subscribe(data => {
        data.docenteArea.forEach(el => {
          //console.log(el)
          let docenteArea = new DocenteAreaModel();
          docenteArea = Object.assign(el);
          this.list.push(docenteArea);
          observer.next(docenteArea);

        });
      });
    });
  }

  crearDcArea(dcArea: DocenteAreaModel): Observable<any> {
    let body = { docenteArea: dcArea };
    return new Observable(observer => {
      this.create(body).subscribe(response => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  updateDcArea(dcArea: DocenteAreaModel, id: string|number) {
    // Ejemplo del parametro body
    let body = { docenteArea: dcArea };
    return this.update(body, id);
  }
  deleteDcArea(idDcArea: number|string)  {
    return this.delete(idDcArea)
  }
  
  updateList(data: wsModel) {
    // console.log(data)
    let docenteA = new DocenteAreaModel();
    docenteA = Object.assign(docenteA,data.data);
     switch (data.event) {
       case 'c':
        // console.log("Crear")
         console.log(docenteA)
         data.data = docenteA;
         this.list.push(docenteA);
         this.list$.next(this.list)
         break;
       case 'u':
       //  console.log("update")
         const index = this.list.map(el => el.da_id).indexOf(docenteA.da_id);
         this.list.splice(index, 1, docenteA);
         this.list$.next(this.list)
         break;
       case 'd':
        // console.log("delete")
         this.list = this.list.filter(el=>el.da_id !== docenteA.da_id);
         this.list$.next(this.list)
         break;
 
     }
 
   }

}
