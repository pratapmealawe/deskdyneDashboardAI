import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort"
})
export class ArraySortPipe  implements PipeTransform {
  transform(array: any, field: string, order?: number): any[] {
    if (!Array.isArray(array)) {
      return array;
    }
    const listorder = order ? order : 1
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return 1 * listorder;
      } else if (a[field] > b[field]) {
        return -1 * listorder;
      } else {
        return 0;
      }
    });
    return array;
  }
}