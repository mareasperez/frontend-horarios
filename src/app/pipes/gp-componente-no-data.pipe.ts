import { Pipe, PipeTransform } from '@angular/core';
import { ComponenteModel } from '../models/componente.model';
import { GrupoModel } from '../models/grupo.model';

@Pipe({
  name: 'gpComponenteNoData'
})
export class GpComponenteNoDataPipe implements PipeTransform {

  transform(id: string, componentes: ComponenteModel[], grupos: GrupoModel[]): ComponenteModel {
    if (id !== undefined && id !== null && componentes.length > 0 && grupos.length > 0) {
      const grupo: GrupoModel = grupos.find(gp => id === gp.grupo_id);
      const componente: ComponenteModel = componentes.find((a: ComponenteModel) => grupo.grupo_componente === a.componente_id);
      return componente;
    }
  }

}
