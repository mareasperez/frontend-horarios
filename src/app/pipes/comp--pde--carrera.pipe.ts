import { Pipe, PipeTransform } from '@angular/core';
import { PlanEstudioModel } from '../models/planEstudio';
import { CarreraModel } from '../models/carrera.model';
import { ComponenteModel } from '../models/componente.model';

@Pipe({
  name: 'compPdeCarrera'
})
export class CompPdeCarreraPipe implements PipeTransform {

  transform(id: string, componentes: ComponenteModel[], pdes: PlanEstudioModel[], carreras: CarreraModel[]): CarreraModel {
    // console.log('llega id: ',id+'comp: '+componentes+' pdes: '+pdes+' carreras: '+carreras);

    const componente = componentes.find(cp => cp.componente_id === id);
    const pde = pdes.find(pd => pd.pde_id == componente.componente_pde);
    const carrera = carreras.find(carr => carr.carrera_id == pde.pde_carrera)

    return carrera;
  }

}
