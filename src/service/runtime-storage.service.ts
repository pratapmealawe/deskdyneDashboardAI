import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class RuntimeStorageService {

    private cacheObj: any = {};

    getCacheData(key: string): any {
        const data = this.cacheObj[key];
        return data ? data : null;
    }

    setCacheData(key: string, data: any): void {
        this.cacheObj[key] = data;
    }

    resetCacheData(key: string): void {
        delete this.cacheObj[key];
    }
    resetAllCacheData(): void {
        this.cacheObj = {};
    }
    insertNewDataInArray(key: string, data: any, limit: number) {
        const existing = this.getCacheData(key);
        if (existing) {
            if (existing.length === limit) {
                existing.pop();
            }
            existing.unshift(data);
            this.setCacheData(key, data);
        } else {
            this.setCacheData(key, [data]);
        }
    }
}
