import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartamentoModel } from '../models/departamento.model';
import { MainService } from './main.service';


@Injectable()
export class DepartamentoService extends MainService {

    constructor(DepartamentoHttp: HttpClient) {
        super(DepartamentoHttp, 'departamento');
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
}
