import { Pipe, PipeTransform } from '@angular/core';
import { ComponenteModel } from '../models/componente.model';

@Pipe({
  name: 'componenteNombre'
})
export class ComponenteNombrePipe implements PipeTransform {

  transform(id: string, componentes: ComponenteModel[]): string {
    const comp = componentes.find(comp => id === comp.componente_id);
    return comp.componente_nombre;
  }

}
