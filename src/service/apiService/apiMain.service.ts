import { Injectable } from '@angular/core';
import { RuntimeStorageService } from '../runtime-storage.service';
import { ApiConfigService } from './apiConfig.service';
import { ApiHttpService } from './apiHttp.service';

@Injectable({
  providedIn: 'root'
})
export class ApiMainService {
  constructor(
    private apiConfigService: ApiConfigService,
    private apiHttpService: ApiHttpService,
    private runtimeStorageService: RuntimeStorageService) { }

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
  private getTodayStartDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString();
  }

  fetchAllOutlets(){
    const urlObj = this.apiConfigService.apiEndPointObj.fetchAllOutlets;
    return this.apiHttpService
    .REQUEST({url: urlObj.url, method: urlObj.method});
  }

  getOrgList(){
    const urlObj = this.apiConfigService.apiEndPointObj.getOrgList;
    return this.apiHttpService
    .REQUEST({url: urlObj.url, method: urlObj.method});
  }

  saveOutlet(payload:any){
    const urlObj = this.apiConfigService.apiEndPointObj.saveOutlet;
    return this.apiHttpService
    .REQUEST({url: urlObj.url, method: urlObj.method}, payload);
  }

  updateCategories(payload:any){
    const urlObj = this.apiConfigService.apiEndPointObj.updateCategories;
    return this.apiHttpService
    .REQUEST({url: urlObj.url, method: urlObj.method}, payload);
  }

  updateOutlet(id:any,payload:any,imgIndex?:any){
    const urlObj = this.apiConfigService.apiEndPointObj.updateOutlet;
    return this.apiHttpService
    .REQUEST({url: urlObj.url + `/${imgIndex}` + `/${id}`, method: urlObj.method}, payload);
  }

  fetchCategories(){
    const urlObj = this.apiConfigService.apiEndPointObj.fetchCategories;
    return this.apiHttpService
    .REQUEST({url: urlObj.url, method: urlObj.method});
  }

  saveCategories(payload:any){
    const urlObj = this.apiConfigService.apiEndPointObj.saveCategories;
    return this.apiHttpService
    .REQUEST({url: urlObj.url, method: urlObj.method}, payload);
  }

}
