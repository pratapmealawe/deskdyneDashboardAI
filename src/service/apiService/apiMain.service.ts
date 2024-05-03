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

  loginAdmin(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.loginAdmin, data);
  }
  verifyOTP(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.verifyOTP, data);
  }
  logout() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.logout);
  }

  fetchAllOutlets() {
    const urlObj = this.apiConfigService.apiEndPointObj.fetchAllOutlets;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method });
  }

  getOrgList() {
    const urlObj = this.apiConfigService.apiEndPointObj.getOrgList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method });
  }

  saveOutlet(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.saveOutlet;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method }, payload);
  }

  updateCategories(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateCategories;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method }, payload);
  }

  updateOutlet(id: any, payload: any, imgIndex?: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateOutlet;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${imgIndex}` + `/${id}`, method: urlObj.method }, payload);
  }

  updateOutletNoImages(id: any, payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateOutletNoImages;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, payload);
  }

  fetchCategories() {
    const urlObj = this.apiConfigService.apiEndPointObj.fetchCategories;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method });
  }

  saveCategories(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.saveCategories;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method }, payload);
  }
  saveVendor(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.saveVendor;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method }, payload)
  }
  getAllVendors() {
    const urlObj = this.apiConfigService.apiEndPointObj.getAllVendors
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method })
  }
  getOutletByCafeteria(cafeteriaName: any, cafeteriaCity: any, organization: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getOutletByCafeteria;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${cafeteriaName}/${cafeteriaCity}/${organization}`, method: urlObj.method },)
  }
  deleteVendor(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteVendor;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method })
  }
  searchVendor(searchObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchVendor;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: 'POST' }, searchObj)
  }
  updateVendor(id: any, vendor: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateVendor;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: 'POST' }, vendor)
  }
  searchOutlet(searchObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchOutlet;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: 'POST' }, searchObj)
  }
  getAllPolicy() {
    const urlObj = this.apiConfigService.apiEndPointObj.getAllPolicy;
    // return this.apiHttpService.REQUEST({url: urlObj.url, method: urlObj.method});
    return this.runTimeCacheInterceptor('POLICIES', { url: urlObj.url, method: urlObj.method });
  }

  addPolicy(policy: any){
    this.runtimeStorageService.resetCacheData('POLICIES'); 
    const urlObj = this.apiConfigService.apiEndPointObj.addPolicy;
    return this.apiHttpService.REQUEST({url: urlObj.url, method: urlObj.method}, policy);
  }

  updatePolicy(id:any, data:any){
    this.runtimeStorageService.resetCacheData('POLICIES'); 
    const urlObj = this.apiConfigService.apiEndPointObj.updatePolicy;
    return this.apiHttpService.REQUEST({url: urlObj.url + `/${id}`, method: urlObj.method}, data);
  }

  deletePolicy(id:any){
    this.runtimeStorageService.resetCacheData('POLICIES'); 
    const urlObj = this.apiConfigService.apiEndPointObj.deletePolicy;
    return this.apiHttpService.REQUEST({url: urlObj.url + `/${id}`, method: urlObj.method});
  }

  adminProfile(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.adminProfile;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: 'POST' }, payload)
  }
  saveAdminProfile(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.adminProfile, data);
  }
  updateadminprofile(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateadminprofile;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }
  searchAdmin(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.searchAdmin, data);
  }
  getAdminProfileList() {
    const urlObj = this.apiConfigService.apiEndPointObj.getAdminProfileList
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: 'GET' })
  }
  getadminprofile(loginId: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getadminprofile;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${loginId}`, method: urlObj.method });
  }

  getAllFAQs(){
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllFAQs);
  }
  saveFAQ(data: any){
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveFAQ, data);
  }
  updateFAQ(data: any){
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateFAQ, data);
  }
  deleteFAQ(id: string){
    const urlObj = this.apiConfigService.apiEndPointObj.deleteFAQ;
    return this.apiHttpService
    .REQUEST({url: urlObj.url + `/${id}`, method: urlObj.method});
  }
  getAllVariables(){
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllVariables);
  }
  saveVariable(data: any){
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveVariable, data);
  }
  updateVariable(data: any){
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateVariable, data);
  }
  deleteVariable(id: string){
    const urlObj = this.apiConfigService.apiEndPointObj.deleteVariable;
    return this.apiHttpService
    .REQUEST({url: urlObj.url + `/${id}`, method: urlObj.method});
  }
  getAllAppVersionList(){
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllAppVersionList);
  }
  saveAppVersion(data: any){
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveAppVersion, data);
  }
  updateAppVersion(data: any){
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateAppVersion, data);
  }

}
