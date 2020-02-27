import { Pipe, PipeTransform } from '@angular/core';
import { GrupoModel } from '../models/grupo.model';
import { DocenteModel } from '../models/docente.model';

@Pipe({
  name: 'docenteName'
})
export class DocenteNamePipe implements PipeTransform {
  transform(id: string, docentes: DocenteModel[]): string {
    if (id !== undefined && id !== null) {
     // console.log('se recibe  id: ', id, 'docentes:', array);
      let doc= docentes.find(doce => id == doce.docente_id);
      if (doc === undefined) {
        return 'sin docente';
      } else {
        return doc.docente_nombre;
      }
    }
    return 'sin docente';
  }
}
