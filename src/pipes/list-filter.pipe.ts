import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter',
  standalone: true,
})
export class ListFilterPipe implements PipeTransform {
  transform(list: any[], startIndex: number, endIndex: number): any[] {
    if (!Array.isArray(list) || startIndex < 0 || endIndex < startIndex) {
      return list;
    }

    return list.slice(startIndex, endIndex);
  }
}
