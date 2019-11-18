import { Pipe, PipeTransform } from '@angular/core';
import { GrupoModel } from '../models/grupo.model';

@Pipe({
  name: 'nombreGrupo'
})
export class NombreGrupoPipe implements PipeTransform {

  transform(id: string, grupos: GrupoModel[]): any {
    if (id !== undefined && grupos !== []) {
      console.log('se recibe  id: ', id, 'grupos:', grupos);
      const grupo = grupos.find(g => id === g.grupo_id);
      return grupo.grupo_tipo + grupo.grupo_numero;
    }
    return '';
  }

}
