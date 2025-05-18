import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date2DBdate'
})
export class Date2DBdatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    return value.toISOString().split("T")[0];
  }

}
