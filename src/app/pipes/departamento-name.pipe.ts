import { Pipe, PipeTransform } from '@angular/core';
import { DepartamentoModel } from '../models/departamento.model';
import { DepartamentoService } from '../services/departamento.service';
@Pipe({
  name: 'departamentoName',
  pure: true
})
export class DepartamentoNamePipe implements PipeTransform {
  public departamentos: DepartamentoModel[] = [];
  // tslint:disable: variable-name
  constructor(private _departamento: DepartamentoService) {
    this._departamento.getDepartamento().subscribe(res => this.departamentos.push(res));
  }
  transform(id: string) {
    const resultado = this.departamentos.find(departamento => departamento.departamento_id === id);
    return resultado.departamento_nombre;
  }

}
