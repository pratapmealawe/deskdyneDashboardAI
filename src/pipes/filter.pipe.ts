import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name: 'filter'})
export class ManualFilterPipe implements PipeTransform {
    transform(itemList: any, searchText: string, key?: string){
        if(!itemList) {return [];};
        if(!searchText) {return itemList};
        const filterList:any = [];
        if(itemList.length > 0){
            searchText = searchText.toLowerCase();
            itemList.forEach( (item:any) => {
                if(typeof key !== 'undefined'){
                    if(item[key].toString().toLowerCase().indexOf(searchText) > -1){
                        filterList.push(item)
                    }
                } else {
                    const propValueList = Object.keys(item).map( key1 => item[key1]);
                    let itemFound = false;
                    propValueList.forEach( value => {
                        if(value && value.toString().toLowerCase().indexOf(searchText) > -1){
                            itemFound = true;
                        }
                    });
                    if(itemFound) { filterList.push(item)}
                }
            });
        }
        return filterList;
    }
}