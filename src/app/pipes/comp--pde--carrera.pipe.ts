import { Pipe, PipeTransform } from '@angular/core';
import { PlanEstudioModel } from '../models/planEstudio';
import { CarreraModel } from '../models/carrera.model';
import { ComponenteModel } from '../models/componente.model';

@Pipe({
  name: 'compPdeCarrera'
})
export class CompPdeCarreraPipe implements PipeTransform {
  // {{(Componente_id |compPdeCarrera: componentes: pdes: carreras).carrera_nombre}}

  transform(id: string, componentes: ComponenteModel[], pdes: PlanEstudioModel[], carreras: CarreraModel[]): CarreraModel {
    // console.log('llega id: ',id+'comp: '+componentes+' pdes: '+pdes+' carreras: '+carreras);
    if (componentes.length > 0 && pdes.length > 0 && carreras.length > 0 && id != undefined) {
      const componente = componentes.find(cp => cp.componente_id === id);
      const pde = pdes.find(pd => pd.pde_id == componente.componente_pde);
      if (!pde) {
        return new CarreraModel();
      }
      const carrera = carreras.find(carr => carr.carrera_id == pde.pde_carrera)
      return carrera;
    }
    else {
      // console.log('error de busqueda  de carrera con id: ' + id);
      const carrera: CarreraModel = new CarreraModel();
      carrera.carrera_nombre = 'error de busqueda';
      return carrera;
    }


  }

}
