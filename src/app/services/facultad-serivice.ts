import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs/';
import { FacultadModel } from '../models/facultad.model';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class FacultadSerivice  extends MainService{
  constructor(facultadHttp: HttpClient) {
    super(facultadHttp, "facultad");
   }

   getFacultad():Observable<FacultadModel>{
     return new Observable(observer =>{
       this.get().subscribe(data=>{
        console.log(data);
        data.facultad.forEach(el => {        
          observer.next(new FacultadModel(el.facultad_id, el.facultad_nombre));       
       });
       
      });
   })
  };

  crearFacultad():Observable<any>{
    let body = {facultad:
                  {facultad_nombre: "prueba", 
                  facultad_id:11}};
    return new Observable(observer => {
      this.create(body).subscribe(response =>{
        console.log(response)
        observer.next(response)
      })
    })
  }
}
