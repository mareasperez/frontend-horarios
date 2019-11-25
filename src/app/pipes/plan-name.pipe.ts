import { Pipe, PipeTransform } from '@angular/core';
import { PlanificacionModel } from '../models/planificacion.model';

@Pipe({
  name: 'planName',
  pure: true
})
export class PlanNamePipe implements PipeTransform {

  transform(id: string, planificaciones: PlanificacionModel[]): string {
    if (id !== undefined && planificaciones !== undefined ) {
      console.log('estamos en la pipe id', id, planificaciones);
      let plan = planificaciones.find(pl => pl.planificacion_id == id);
      console.log('el elegido', plan);
      return `semestre ${plan.planificacion_semestre} del año ${plan.planificacion_anyo_lectivo}`;
    }
    return '';
  }

}
