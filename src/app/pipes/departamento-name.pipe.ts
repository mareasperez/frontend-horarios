import { Pipe, PipeTransform } from '@angular/core';
import { DepartamentoModel } from '../models/departamento.model';
@Pipe({
  name: 'departamentoName',
  pure: true
})
export class DepartamentoNamePipe implements PipeTransform {
  transform(id: string, departamentos: DepartamentoModel[]): string {
    let dep = departamentos.find(depa => id === depa.departamento_id);
    return dep != undefined ? dep.departamento_nombre:'';
   }

}
