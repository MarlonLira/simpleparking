export abstract class Utils {
  private static timeReg: RegExp = /^([0-2]{1}[0-9]{1}):[0-5]{1}[0-9]:[0-5]{1}[0-9]/;

  public static getDateNow() {
    const innerDate: any = {};
    const _date = new Date();
    innerDate.Year = this.leftZero(_date.getFullYear());
    innerDate.Month = this.leftZero(_date.getMonth() + 1);
    innerDate.Day = this.leftZero(_date.getDate());
    innerDate.FullDate = `${innerDate.Year}-${innerDate.Month}-${innerDate.Day}`;
    return innerDate;
  }

  public static getTime(date) {
    if (!this.isTime(date)) {
      const _date = new Date(date);
      const hours = this.leftZero(_date.getUTCHours());
      const minutes = this.leftZero(_date.getUTCMinutes());
      const seconds = this.leftZero(_date.getUTCSeconds());
      return `${hours}:${minutes}:${seconds}`;
    } else {
      return date;
    }
  }

  public static generateUUID(): string {
    let d = new Date().getTime();
    let d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16;
      if (d > 0) {
        // tslint:disable-next-line: no-bitwise
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        // tslint:disable-next-line: no-bitwise
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      // tslint:disable-next-line: no-bitwise
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  public static isValid(value) {
    if (typeof (value) === 'string') {
      return value !== '' ? true : false;
    } else if (Array.isArray(value)) {
      return value.length > 0 ? true : false;
    }
    return !Utils.isNullOrUndefined(value) ? true : false;
  }

  public static returnIfValid = (value, defaultValue = undefined) => Utils.isValid(value) ? value : defaultValue;
  // tslint:disable-next-line: max-line-length
  private static leftZero = (value) => !Utils.isNullOrUndefined(value) ? (value.toString().length === 1 ? `0${value.toString()}` : value.toString()) : ' ';
  public static isTime = (time): boolean => Utils.timeReg.test(time);
  private static isNullOrUndefined = (value: any) => (value === null || value === undefined);
}

export interface Timer {
  hash: string
  id: any
}
