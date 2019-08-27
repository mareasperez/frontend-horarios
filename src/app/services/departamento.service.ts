import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartamentoModel } from '../models/departamento.model';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';


@Injectable()
export class DepartamentoService extends MainService {
    public resource = "departamento"
    constructor(DepartamentoHttp: HttpClient) {
        super(DepartamentoHttp);
    }

    getDepartamento(): Observable<DepartamentoModel> {

        return new Observable(observer => {
            this.get().subscribe(data => {
                data.departamento.forEach(el => {
                    // console.log(el)
                    let Departamento = new DepartamentoModel();
                    Departamento = Object.assign(el);
                    observer.next(Departamento);
                });
            });
        });
    }

    getDepartamentoByID(id: number | string) {
        return this.getByID(id);
    }

    crearDepartamento(departamento: DepartamentoModel): Observable<any> {
        let body = { departamento: departamento };
        return new Observable(observer => {
            this.create(body).subscribe(response => {
                console.log(response);
                observer.next(response);
            });
        });
    }

    updateDepartamento(Departamento: DepartamentoModel, id: string | number) {
        // Ejemplo del parametro body
        let body = { Departamento: Departamento };
        return this.update(body, id);
    }

    deleteDepartamento(idDepartamento: number | string) {
        return this.delete(idDepartamento);
    }

    updateList(data: wsModel) {
    // console.log(data)
     switch (data.event) {
       case 'c':
        // console.log("Crear")
         let departamento = new DepartamentoModel();
         departamento = Object.assign(departamento,data.data);
         console.log(departamento)
         data.data = departamento;
         this.list.push(data.data);
         this.list$.next(this.list)
         break;
       case 'u':
       //  console.log("update")
         const index = this.list.map(el => el.departamento_id).indexOf(data.data.departamento_id);
         this.list.splice(index, 1, data.data);
         this.list$.next(this.list)
         break;
       case 'd':
        // console.log("delete")
         this.list = this.list.filter(el=>el.departamento_id !== data.data.departamento_id);
         this.list$.next(this.list)
         break;
 
     }
 
   }

}
