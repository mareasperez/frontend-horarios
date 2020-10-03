import { FormControl } from '@angular/forms';

// tslint:disable: class-name
export class matErrorsMessage {

  public getError(control: FormControl) {
    if (control.invalid) {
      for (const error in control.errors) {
        if (error) { return this._errors(error); }
      }
    }
  }

  public _errors(err) {
    switch (err) {
      case 'required':
        return 'Este campo es requerido';
      case 'minlength':
        return 'Valor del campo muy corto';
      case 'pattern':
        return 'Patron no valido';
      case 'maxlength':
        return 'Valor del campo demasiado largo';
      case 'max':
        return 'Ha superado el valor maximo';
    }
  }
}
