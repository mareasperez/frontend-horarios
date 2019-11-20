import { Pipe, PipeTransform } from '@angular/core';
import { RecintoModel } from '../models/recinto.model';

@Pipe({
  name: 'recintoNombre'
})
export class RecintoNombrePipe implements PipeTransform {

  transform(id: string, recintos:RecintoModel[]): string {
    const recinto = recintos.find(recinto => recinto.recinto_id === id)
    return recinto.recinto_nombre;
  }

}
