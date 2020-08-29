import { Pipe, PipeTransform } from '@angular/core';
import { RecintoModel } from '../models/recinto.model';
import { AulaModel } from '../models/aula.model';

@Pipe({
  name: 'gpRecinto'
})
export class GpRecintoPipe implements PipeTransform {

  transform(id: string, recintos: RecintoModel[], aulas: AulaModel[]): RecintoModel {
    if (id !== undefined && id !== null && recintos.length > 0 && aulas.length > 0) {
      const aula: AulaModel = aulas.find(aul => id === aul.aula_id);
      const recinto: RecintoModel = recintos.find((a: RecintoModel) => aula.aula_recinto === a.recinto_id);
      return recinto;
    }
    else {
      console.log('error de busqueda de Recinto con id: ' + id);
      const Recinto = new RecintoModel();
      Recinto.recinto_nombre = 'busqueda fallida';
      return Recinto;
    }
  }

}
