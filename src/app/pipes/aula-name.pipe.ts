import { Pipe, PipeTransform } from '@angular/core';
import { AulaModel } from '../models/aula.model';

@Pipe({
  name: 'aulaName'
})
export class AulaNamePipe implements PipeTransform {
  transform(id: string, aulas: AulaModel[]): string {
    // console.log('aulas feas:', aulas);
    if ((id != null) && (aulas.length > 0)) {
      const aul = aulas.find(carr => id === carr.aula_id);
      return aul.aula_nombre;
    }
    return '';
  }
}
