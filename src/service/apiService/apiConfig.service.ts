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
      loginAdmin: {url: `${this.baseUrl}/authadmin/loginAdmin`, method: 'POST'},
      verifyOTP: {url: `${this.baseUrl}/authadmin/verifyOTP`, method: 'POST'},
      logout: {url: `${this.baseUrl}/authadmin/logout`, method: 'GET'},
      fetchAllOutlets: {url: `${this.baseUrl}/api/fetchAllOutlets`, method: 'GET'},
      getOrgList: {url: `${this.baseUrl}/api/getOrgList`, method: 'GET'},
      saveOutlet: {url: `${this.baseUrl}/api/saveOutlet`, method: 'POST'},
      updateCategories: {url: `${this.baseUrl}/api/updateCategories`, method: 'POST'},
      updateOutlet: {url: `${this.baseUrl}/api/updateOutlet`, method: 'POST'},
      updateOutletNoImages: {url: `${this.baseUrl}/api/updateOutletNoImages`, method: 'POST'},
      fetchCategories: {url: `${this.baseUrl}/api/fetchCategories`, method: 'GET'},
      saveCategories: {url: `${this.baseUrl}/api/saveCategories`, method: 'POST'},
      saveVendor: {url: `${this.baseUrl}/api/saveVendor`, method:'POST'},
      getAllVendors:{url:`${this.baseUrl}/api/getAllVendors`,method:'GET'},
      getOutletByCafeteria:{url:`${this.baseUrl}/api/getOutletByCafeteria`,method:'GET'},
      getAllPolicy: {url: `${this.baseUrl}/api/getAllPolicy`, method: 'GET'},
      deleteVendor:{url:`${this.baseUrl}/api/deleteVendor`,method:'DELETE'},
      searchVendor:{url:`${this.baseUrl}/api/searchVendor`,method:'POST'},
      searchAdmin: {url: `${this.baseUrl}/api/searchAdmin`, method: 'POST'},
      updateVendor:{url:`${this.baseUrl}/api/updateVendor`,method:'POST'},
      searchOutlet:{url:`${this.baseUrl}/api/searchOutlet`,method:'POST'},
      adminProfile:{url:`${this.baseUrl}/api/adminProfile`,method:'POST'},
      getAdminProfileList:{url:`${this.baseUrl}/api/getAdminProfileList`,method:'GET'},
      getadminprofile: {url: `${this.baseUrl}/api/getadminprofile`, method: 'GET'},
      updateadminprofile: {url: `${this.baseUrl}/api/updateadminprofile`, method: 'POST'},
   };
  }
}
