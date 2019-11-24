import { Pipe, PipeTransform } from '@angular/core';
import { ComponenteModel } from '../models/componente.model';

@Pipe({
  name: 'componenteNameSimple'
})
export class ComponenteNameSimplePipe implements PipeTransform {

  transform(id: string, componentes: ComponenteModel[]): string {
    if (id !== undefined) {
      console.log('se recibe  id: ', id, 'comp:', componentes);
      const comp = componentes.find(c => id === c.componente_id);
      return comp.componente_nombre;
    }
    return '';
  }

}
