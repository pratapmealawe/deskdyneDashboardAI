import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MlApiConfigService {
  private baseUrl: string = environment.mlServerUrl;
  apiEndPointObj: any;
  constructor() {
    this.init();
  }
  private init() {
    const p = (path: string, method: string) => ({ url: `${this.baseUrl}${path}`, method });
    this.apiEndPointObj = {
      getAllGeoFencingList: p('/api/getAllGeoFencingList', 'GET'),
      getMealPackageList: p('/api/getMealPackageList', 'GET')
    };
  }
}