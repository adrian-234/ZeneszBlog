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
      case "01":
        res += ". Január. ";
        break;
      case "02":
        res += ". Február. ";
        break;
      case "03":
        res += ". Március. ";
        break;
      case "04":
        res += ". Április. ";
        break;
      case "05":
        res += ". Május. ";
        break;
      case "06":
        res += ". Június. ";
        break;
      case "07":
          res += ". Július. ";
          break;
      case "08":
          res += ". Augusztus. ";
          break;
      case "09":
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
        break;
      default:
        res += ". Hibás hónap ."
    }
    res += tmp[2] + ".";

    return res;
  }

}
