import { Pipe, PipeTransform } from '@angular/core';
import { DocenteService } from '../services/docente.service';
import { DocenteModel } from '../models/docente.model';

@Pipe({
  name: 'docenteName'
})
export class DocenteNamePipe implements PipeTransform {
  transform(id:string, docentes:DocenteModel[]): string {
   const doc = docentes.find(doc=>id === doc.docente_id )
   return doc.docente_nombre

  }
}
