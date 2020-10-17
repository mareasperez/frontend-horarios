import { Pipe, PipeTransform } from '@angular/core';
import { DocenteModel } from '../models/docente.model';
import { GrupoModel } from '../models/grupo.model';

@Pipe({
  name: 'gpDocente'
})
export class GpDocentePipe implements PipeTransform {

  transform(id: string, docentes: DocenteModel[], grupos: GrupoModel[]): DocenteModel {
    if (id !== undefined && id !== null && docentes.length > 0 && grupos.length > 0) {
      const grupo: GrupoModel = grupos.find(gp => id === gp.grupo_id);
      let docente: DocenteModel = docentes.find((a: DocenteModel) => grupo.grupo_docente === a.docente_id);
      if (docente) {
        return docente;
      } else {
        console.log('error de busqueda de docente con id: ' + id);
        docente = new DocenteModel();
        docente.docente_nombre = 'Docente no Asignado';
        return docente;
      }
    }
    else {
      console.log('error de busqueda de Grupo con id: ' + id);
      const docente = new DocenteModel();
      docente.docente_nombre = 'Grupo No Asignado';
      return docente;
    }
  }
}
