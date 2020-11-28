import { Pipe, PipeTransform } from '@angular/core';
import { PlanificacionModel } from '../models/planificacion.model';

@Pipe({
  name: 'planificacionPipe'
})
export class PlanificacionPipePipe implements PipeTransform {

  transform(id: string, planificaciones: PlanificacionModel[]): Array<number> {
    if ((id !== '-1' && id !== '0') && (planificaciones.length > 0)) {
      // console.log('estamos en la pipe id', id, planificaciones);
      const plan = planificaciones.find(pl => pl.planificacion_id === id);
      // console.log('el elegido', plan);
      if (plan) {
        const i = Number(plan.planificacion_semestre);
        return [i, i + 2, i + 4, i + 6, i + 8];
      }
    }
    return;
  }

}
