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
      saveOutlet: {url: `${this.baseUrl}/api/saveOutlet`, method: 'POST'},
      updateCategories: {url: `${this.baseUrl}/api/updateCategories`, method: 'POST'},
      updateOutlet: {url: `${this.baseUrl}/api/updateOutlet`, method: 'POST'},
      fetchCategories: {url: `${this.baseUrl}/api/fetchCategories`, method: 'GET'},
      saveCategories: {url: `${this.baseUrl}/api/saveCategories`, method: 'POST'},
      saveVendor: {url: `${this.baseUrl}/api/saveVendor`, method:'POST'},
      getAllVendors:{url:`${this.baseUrl}/api/getAllVendors`,method:'GET'},
      getOutletByCafeteria:{url:`${this.baseUrl}/api/getOutletByCafeteria`,method:'GET'}
   };
  }
}
