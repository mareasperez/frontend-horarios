import { Pipe, PipeTransform } from '@angular/core';
import { CarreraModel } from '../models/carrera.model';
@Pipe({
  name: 'carreraName',
  pure: true
})
export class CarreraNamePipe implements PipeTransform {
  transform(id: number, carreras: CarreraModel[]): string {
    const car = carreras.find(carr => id === carr.carrera_id);
    return car.carrera_nombre;
   }

}
