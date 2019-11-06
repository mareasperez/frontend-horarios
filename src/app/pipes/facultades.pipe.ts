import { Pipe, PipeTransform } from '@angular/core';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadSerivice } from 'src/app/services/facultad.service';
@Pipe({
  name: 'facultades',
  pure: true
})
export class FacultadesPipe implements PipeTransform {
  transform(id: string, facultades: FacultadModel[]): string {
    const fac = facultades.find(facultad => facultad.facultad_id === id);
    return fac.facultad_nombre;
  }
}