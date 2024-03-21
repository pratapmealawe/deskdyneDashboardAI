import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
  export class LocalStorageService {

    private cacheObj = localStorage;

    getCacheData(key: string): any{
        const data = this.cacheObj.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    setCacheData(key: string, data: any): void{
        this.cacheObj.setItem(key, JSON.stringify(data));
    }

    resetCacheData(key: string): void{
        this.cacheObj.removeItem(key);
    }
    resetAllCacheData(): void{
        this.cacheObj.clear();
    }
    insertNewDataInArray(key: string, data: any, limit?: number){
        const existing = this.getCacheData(key);
        if (existing){
            if (existing.indexOf(data) < 0){
                if (limit){
                    if (existing.length === limit){
                        existing.pop();
                    }
                    existing.unshift(data);
                    this.setCacheData(key, existing);
                }else{
                    existing.push(data);
                    this.setCacheData(key, existing);
                }
            }
        }else{
            this.setCacheData(key, [data]);
        }
    }
    removeDataFromArray(key: string, data: any){
        const existing = this.getCacheData(key);
        if (existing){
            const index = existing.indexOf(data);
            if (index >= 0){
                existing.splice(index, 1);
                this.setCacheData(key, existing);
            }
        }
    }
  }
