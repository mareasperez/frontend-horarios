import { Pipe, PipeTransform } from '@angular/core';
import { ComponenteModel } from '../models/componente.model';
import { GrupoModel } from '../models/grupo.model';

@Pipe({
  name: 'componenteGrupo'
})
export class ComponenteGrupoPipe implements PipeTransform {

  transform(id: string, superarray: any[][]): any {
    if (id !== undefined) {
      console.log('se recibe  id: ', id, 'comp:', superarray);
      const comp: GrupoModel = superarray[1].find(c => id === c.grupo_id);
      console.log(comp.grupo_componente, ' en ', superarray[0]);
      const regresar: ComponenteModel = superarray[0].find(a => comp.grupo_componente === a.componente_id);
      return regresar.componente_nombre;
    }
    return '';

  }

}
