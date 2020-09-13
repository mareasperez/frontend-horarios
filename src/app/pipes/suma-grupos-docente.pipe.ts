import { Pipe, PipeTransform } from '@angular/core';
import { GrupoComponent } from '../components/grupo/grupo.component';
import { GrupoModel } from '../models/grupo.model';

@Pipe({
  name: 'sumaGruposDocente'
})
export class SumaGruposDocentePipe implements PipeTransform {

  transform(grupos: GrupoModel[]): number {
    let suma = 0;
    grupos.map(grupo => suma += grupo.grupo_horas_clase);
    return suma;
  }

}
