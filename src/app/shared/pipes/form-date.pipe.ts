import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formDate'
})
export class FormDatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let res = "";

    let tmp = value.split("-");

    res += tmp[0];

    switch(tmp[1]) {
      case "1":
        res += ". Január. ";
        break;
      case "2":
        res += ". Február. ";
        break;
      case "3":
        res += ". Március. ";
        break;
      case "4":
        res += ". Április. ";
        break;
      case "5":
        res += ". Május. ";
        break;
      case "6":
        res += ". Június. ";
        break;
      case "7":
          res += ". Július. ";
          break;
      case "8":
          res += ". Augusztus. ";
          break;
      case "9":
        res += ". Szeptember. ";
        break;
      case "10":
        res += ". Október. ";
        break;
      case "11":
        res += ". November. ";
        break;
      case "12":
        res += ". December. ";
    }
    res += tmp[2] + ".";

    return res;
  }

}
