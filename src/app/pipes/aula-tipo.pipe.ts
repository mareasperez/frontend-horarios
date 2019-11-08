import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'aulaTipo',
  pure: true
})
export class AulaTipoPipe implements PipeTransform {
  transform(tipo: boolean): string {
    if (tipo) {
      return 'Laboratorio';
    }
    return 'Aula';
  }

}
