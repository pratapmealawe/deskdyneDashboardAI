import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private baseUrl: string = environment.serverUrl;

  apiEndPointObj: any;
  constructor() {
    this.init();
  }
  private init() {
    this.apiEndPointObj = {      
      fetchAllOutlets: {url: `${this.baseUrl}/api/fetchAllOutlets`, method: 'GET'},
      getOrgList: {url: `${this.baseUrl}/api/getOrgList`, method: 'GET'},
   };
  }
}
