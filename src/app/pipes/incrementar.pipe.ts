import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'incrementar'
})
export class IncrementarPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    value = value + 1;
    return value;
  }

}
