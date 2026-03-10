import { Injectable } from '@angular/core';
import { RuntimeStorageService } from '../runtime-storage.service';
import { ApiHttpService } from './apiHttp.service';
import { MlApiConfigService } from './mlApiConfig.service';

@Injectable({
  providedIn: 'root'
})
export class MlApiMainService {
  constructor(
    private apiConfigService: MlApiConfigService,
    private apiHttpService: ApiHttpService,
    private runtimeStorageService: RuntimeStorageService
  ) { }

  private runTimeCacheInterceptor(key: any, apiObj: any, bodyObj?: any, extraHeaderObj?: any, hideLoader?: boolean) {
    return new Promise(async (resolve, reject) => {
      const cacheList = this.runtimeStorageService.getCacheData(key);
      if (cacheList) {
        resolve(cacheList)
      } else {
        try {
          const data = await this.apiHttpService.REQUEST(apiObj, bodyObj, extraHeaderObj, hideLoader);
          this.runtimeStorageService.setCacheData(key, data);
          resolve(data);
        } catch (error) {
          reject(error)
        }
      }
    });
  }

  getAllGeoFencingList() {
    return this.runTimeCacheInterceptor('GEO_FENCING_LIST_ALL', this.apiConfigService.apiEndPointObj.getAllGeoFencingList);
  }

  getMealPackageList() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getMealPackageList);
  }
}