import { Pipe, PipeTransform } from '@angular/core';
import { isArray, isString, isNullOrUndefined } from 'util';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(date: Date | string): any {
    if (!this.IsTime(date)) {
      const _date = new Date(date);
      const hours = this.LeftZero(_date.getUTCHours());
      const minutes = this.LeftZero(_date.getUTCMinutes());
      const seconds = this.LeftZero(_date.getUTCSeconds());
      return `${hours}:${minutes}:${seconds}`;
    } else {
      return date;
    }
  }

  IsTime(time) {
    const isTime = /^([0-2]{1}[0-9]{1}):[0-5]{1}[0-9]:[0-5]{1}[0-9]/;
    if (isTime.test(time)) {
      return true;
    } else {
      return false;
    }
  }

  LeftZero(value) {
    let result = ' ';
    if (!isNullOrUndefined(value)) {
      result = value.toString();
      if (value.toString().length == 1) {
        result = `0${value.toString()}`;
      }
    }
    return result;
  }

}
