import { Pipe, PipeTransform } from '@angular/core';
import { ComponenteModel } from '../models/componente.model';
import { GrupoModel } from '../models/grupo.model';

@Pipe({
  name: 'componenteGrupo'
})
export class ComponenteGrupoPipe implements PipeTransform {

  transform(id: string, superarray: any[][]): string {
    if (id !== undefined && id !== null && superarray.length > 0) {
      const comp: GrupoModel = superarray[1].find(c => id === c.grupo_id);
      const regresar: ComponenteModel = superarray[0].find((a:ComponenteModel) => comp.grupo_componente === a.componente_id);
      return regresar.componente_nombre;
    }
    return '';

  }

}
