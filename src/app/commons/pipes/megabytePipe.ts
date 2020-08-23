import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'megabyte'
})
export class MegabytePipe implements PipeTransform {

  transform(value: number | string): string {
    const mb = Number(value) / 1000000;
    const formatted = mb.toFixed(2);
    return `${formatted.toString()} MB`;
  }

}
