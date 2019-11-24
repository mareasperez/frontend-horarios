import { Pipe, PipeTransform } from '@angular/core';
import { ComponenteModel } from '../models/componente.model';

@Pipe({
  name: 'componenteGrupoSimple'
})
export class ComponenteGrupoSimplePipe implements PipeTransform {

  transform(id: string, componentes: ComponenteModel[]): any {
    if (id !== undefined) {
      console.log('se recibe  id: ', id, 'comp:', componentes);
      const comp = componentes.find(c => id === c.componente_id);
      return comp.componente_nombre;
    }
    return '';

  }

}
