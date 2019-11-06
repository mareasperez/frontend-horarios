import { Pipe, PipeTransform } from '@angular/core';
import {AreaModel} from '../models/area.model';
@Pipe({
  name: 'areaName',
  pure: true
})
export class AreaNamePipe implements PipeTransform {
  transform(id: string, areas: AreaModel[]): string {
    const area = areas.find(ar => id === ar.area_id);
    return area.area_nombre;
   }

}
