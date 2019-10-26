import { Pipe, PipeTransform } from '@angular/core';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadSerivice } from 'src/app/services/facultad.service';
@Pipe({
  name: 'facultades',
  pure: true
})
export class FacultadesPipe implements PipeTransform {

  public facultades: FacultadModel[] = [];
  // tslint:disable-next-line: variable-name
  constructor(private _facultades: FacultadSerivice) {
    this._facultades.getFacultad().subscribe();
  }
  transform(id: string) {
    const resultado = this._facultades.list.find(facultad => facultad.facultad_id === id);
    return resultado.facultad_nombre;
  }
}