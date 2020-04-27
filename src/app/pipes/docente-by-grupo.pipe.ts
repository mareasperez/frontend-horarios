import { Pipe, PipeTransform } from '@angular/core';
import { GrupoModel } from '../models/grupo.model';
import { DocenteModel } from '../models/docente.model';

@Pipe({
  name: 'docenteByGrupo'
})
export class DocenteByGrupoPipe implements PipeTransform {

  transform(id: string, superarray: any[][]): string {
    if (id !== undefined && id !== null && superarray.length > 0) {
      const comp: GrupoModel = superarray[1].find(c => id == c.grupo_id);
      const regresar: DocenteModel = superarray[0].find((a:DocenteModel) => comp.grupo_docente == a.docente_id);
      if (regresar.docente_id !== undefined) {
      return regresar.docente_nombre;
      } else {
        return 'No se pudo Obtoner el nombre';
      }
    }
    return 'sin Docente';

  }

}
