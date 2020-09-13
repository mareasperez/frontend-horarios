import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cicloToYear'
})
export class CicloToYearPipe implements PipeTransform {

  transform(ciclo: number): string {
    ciclo = (ciclo + 1) / 2;
    return `${Math.trunc(ciclo)} Año`;
  }

}
