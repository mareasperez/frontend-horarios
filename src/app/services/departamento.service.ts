import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartamentoModel } from '../models/departamento.model';
import { MainService } from './main.service';
import { wsModel } from '../models/ws.model';


@Injectable()
export class DepartamentoService extends MainService {
    public resource = 'departamento';
    constructor(DepartamentoHttp: HttpClient) {
        super(DepartamentoHttp);
    }

    getDepartamento(): Observable<DepartamentoModel> {

        return new Observable(observer => {
            this.get().subscribe(data => {
                if (!data.detail) {
                    data.departamento.forEach(el => {
                        // console.log(el)
                        let Departamento = new DepartamentoModel();
                        Departamento = Object.assign(Departamento, el);
                        this.list.push(Departamento);
                        observer.next(Departamento);
                    });
                } else {
                    this.errorObten(data.detail);
                }
                observer.complete();
            });
        });
    }

    getDepartamentoByID(id: number | string) {
        return this.getByID(id);
    }

    crearDepartamento(departamento: DepartamentoModel): Observable<any> {
        const body = { departamento };
        return new Observable(observer => {
            this.create(body).subscribe(response => {
                console.log(response);
                observer.next(response);
            });
        });
    }

    updateDepartamento(departamento: DepartamentoModel, id: string | number) {
        // Ejemplo del parametro body
        const body = { departamento };
        return this.update(body, id);
    }

    deleteDepartamento(idDepartamento: number | string) {
        return this.delete(idDepartamento);
    }
    getDepartamentoByFilter(filtro: string, id: string | number): Observable<DepartamentoModel> {
        return new Observable(observer => {
            console.log('se va a mandar a pedir al api:', filtro, ' ', id);
            this.getByFiltro(filtro, id).subscribe(data => {
                if (!data.detail) {
                    data.departamento.forEach(el => {
                        let departamento = new DepartamentoModel();
                        departamento = Object.assign(el);
                        observer.next(departamento);
                    });
                } else {
                    this.errorObten(data.detail);
                }
            });
        });
    }

    updateList(data: wsModel) {
        // console.log(data)
        let departamento = new DepartamentoModel();
        departamento = Object.assign(departamento, data.data);
        switch (data.event) {
            case 'c':
                // console.log("Crear")
                console.log(departamento);
                data.data = departamento;
                this.list.push(departamento);
                this.list$.next(this.list);
                break;
            case 'u':
                //  console.log("update")
                const index = this.list.map(el => el.departamento_id).indexOf(departamento.departamento_id);
                this.list.splice(index, 1, departamento);
                this.list$.next(this.list);
                break;
            case 'd':
                // console.log("delete")
                this.list = this.list.filter(el => el.departamento_id !== departamento.departamento_id);
                this.list$.next(this.list);
                break;

        }

    }

}
