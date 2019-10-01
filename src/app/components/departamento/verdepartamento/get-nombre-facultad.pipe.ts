import { Pipe, PipeTransform } from '@angular/core';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadSerivice } from 'src/app/services/facultad.service';

@Pipe({
  name: 'getNombreFacultad',
  pure: true
})

export class getNombreFacultadPipe implements PipeTransform {
    public facultades: FacultadModel [] = [];
    public resultado = new FacultadModel();
    constructor(private facultad$: FacultadSerivice) {
        this.facultad$.getFacultad().subscribe(res2 => this.facultades.push(res2));
    }
    transform(value: string, args?: any): any {
        return this.getNombreFacultad(value);
    }
    getNombreFacultad(point: string): string {
        this.resultado = this.facultad$.list.find(facultad => facultad.facultad_id === point);
        return this.resultado.facultad_nombre;
  }
}