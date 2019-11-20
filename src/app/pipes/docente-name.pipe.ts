import { Pipe, PipeTransform } from '@angular/core';
import { GrupoModel } from '../models/grupo.model';
import { DocenteModel } from '../models/docente.model';

@Pipe({
  name: 'docenteName'
})
export class DocenteNamePipe implements PipeTransform {
  transform(id: string, array: any[][]): string {
    if (id !== undefined) {
      console.log('se recibe  id: ', id, 'docentes:', array);
      const doc: GrupoModel = array[1].find(doce => id === doce.grupo_id);
      const retorno: DocenteModel = array[0].find(doce => doc.grupo_docente === doce.docente_id);
      if (retorno === undefined) {
        return '';
      } else {
        return retorno.docente_nombre;
      }
    }
    return '';
  }
}
