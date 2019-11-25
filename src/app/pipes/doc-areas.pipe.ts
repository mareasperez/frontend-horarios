import { Pipe, PipeTransform } from '@angular/core';
import { DocenteAreaModel } from '../models/docente.area.model';

@Pipe({
  name: 'docAreas'
})
export class DocAreasPipe implements PipeTransform {

  transform(values: string[], doc_areas: DocenteAreaModel[]) {
    console.log(doc_areas);
    const darea = doc_areas.find(do_ar => do_ar.da_area === values[0]);
    console.log(darea);
    if (darea) {
      if (darea.da_docente === values[1]) {
        return true;
      } else {
        return false;
      }
    }
  }

}
