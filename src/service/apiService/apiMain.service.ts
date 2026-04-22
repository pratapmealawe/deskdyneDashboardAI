import { Injectable } from '@angular/core';
import { RuntimeStorageService } from '../runtime-storage.service';
import { ApiConfigService } from './apiConfig.service';
import { ApiHttpService } from './apiHttp.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiMainService {
  
  constructor(
    private apiConfigService: ApiConfigService,
    private apiHttpService: ApiHttpService,
    private runtimeStorageService: RuntimeStorageService
  ) { }

  private runTimeCacheInterceptor(key: any, apiObj: any, bodyObj?: any, extraHeaderObj?: any, hideLoader?: boolean) {
    return new Promise(async (resolve, reject) => {
      const cacheList = this.runtimeStorageService.getCacheData(key);
      if (cacheList) {
        resolve(cacheList);
      } else {
        try {
          const data = await this.apiHttpService.REQUEST(apiObj, bodyObj, extraHeaderObj, hideLoader);
          this.runtimeStorageService.setCacheData(key, data);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      }
    });
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
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchAllOutlets);
  }

  fetchAllOutletsTest() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchAllOutletsTest);
  }

  getAllOutletMasterMenus() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllOutletMasterMenus);
  }

  getOrgList() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getOrgList);
  }

  saveOutlet(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveOutlet, payload);
  }

  updateCategories(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateCategories, payload);
  }

  addOutletMenu(outlet: any, outletId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.addOutletMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletId}`, method: urlObj.method }, outlet);
  }

  bulkUploadOutletMenu(data: any, outletId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.bulkUploadOutletMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletId}`, method: urlObj.method }, data);
  }

  addQrOutletMenu(outlet: any, outletId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.addQrOutletMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletId}`, method: urlObj.method }, outlet);
  }

  createQrMenu(outlet: any, outletId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.createQrMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletId}`, method: urlObj.method }, outlet);
  }

  updateOutlet(id: any, payload: any, imgIndex?: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateOutlet;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${imgIndex}` + `/${id}`, method: urlObj.method }, payload);
  }

  updateOutletLevelSubsidy(id: any, subsidy: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateOutletLevelSubsidy;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, { subsidy });
  }

  updateOutletNoImages(id: any, payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateOutletNoImages;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, payload);
  }

  addOutletMasterMenu(outlet: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addOutletMasterMenu, outlet);
  }

  addOutletList(id: any, outlet: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.addOutletList;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, outlet);
  }

  getOutletById(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getOutletById;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  saveEventPopup(outletObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.saveEventPopup;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, outletObj);
  }

  updateEventPopup(id: any, outletObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateEventPopup;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, outletObj);
  }

  getEventPopups() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getEventPopups);
  }

  getEventPopupsById(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getEventPopupsById;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  deleteEventPopup(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteEventPopup;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  toggleEventPopupStatus(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.toggleEventPopupStatus;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  saveMenuItem(outletId: any, payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.saveMenuItem;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletId}`, method: urlObj.method }, payload);
  }

  getMenuItems(outletId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getMenuItems;
    return this.apiHttpService.REQUEST(urlObj, { id: outletId });
  }

  getMenuItemById(outletId: any, menuId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getMenuItemById;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletId}/menu/${menuId}`, method: urlObj.method });
  }

  updateMenuItem(outletId: any, menuId: any, payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateMenuItem;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletId}/menu/${menuId}`, method: urlObj.method }, payload);
  }

  deleteMenuItem(outletId: any, menuId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteMenuItem;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletId}/menu/${menuId}`, method: urlObj.method });
  }

  toggleMenuItemStatus(outletId: any, menuId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.toggleMenuItemStatus;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletId}/menu/${menuId}`, method: urlObj.method });
  }

  fetchCategories() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchCategories);
  }

  saveCategories(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveCategories, payload);
  }

  saveVendor(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveVendor, payload);
  }

  getAllVendors() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllVendors);
  }

  getVendorWallet(vendorId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getVendorWallet;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${vendorId}`, method: urlObj.method });
  }

  getVendorLedgerByFirmAndTypeAndDate(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getVendorLedgerByFirmAndTypeAndDate, body);
  }

  getOutletByCafeteria(cafeteriaName: any, cafeteriaCity: any, organization: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getOutletByCafeteria;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${cafeteriaName}/${cafeteriaCity}/${organization}`, method: urlObj.method });
  }

  deleteVendor(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteVendor;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  deleteVendorFirm(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteVendorFirm;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  searchVendor(searchObj: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.searchVendor, searchObj);
  }

  updateVendor(id: any, vendor: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateVendor;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, vendor);
  }

  searchOutlet(searchObj: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.searchOutlet, searchObj);
  }

  getAllPermissions() {
    return this.runTimeCacheInterceptor('PERMISSIONS', this.apiConfigService.apiEndPointObj.getAllPermissions);
  }

  getAllRoles() {
    return this.runTimeCacheInterceptor('ROLES', this.apiConfigService.apiEndPointObj.getAllRoles);
  }

  addRole(role: any) {
    this.runtimeStorageService.resetCacheData('ROLES');
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addRole, role);
  }

  updateRole(id: any, data: any) {
    this.runtimeStorageService.resetCacheData('ROLES');
    const urlObj = this.apiConfigService.apiEndPointObj.updateRole;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }

  deleteRole(id: any) {
    this.runtimeStorageService.resetCacheData('ROLES');
    const urlObj = this.apiConfigService.apiEndPointObj.deleteRole;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getRoleById(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getRole;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  createResource(resourceName: string, description?: string, permissions?: any[]) {
    this.runtimeStorageService.resetCacheData('PERMISSIONS');
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createResource, { resourceName, description, permissions });
  }

  deleteResource(resourceName: string) {
    this.runtimeStorageService.resetCacheData('PERMISSIONS');
    const urlObj = this.apiConfigService.apiEndPointObj.deleteResource;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${resourceName}`, method: urlObj.method });
  }

  updateResource(resourceName: string, data: { newResourceName: string, description?: string, permissions?: any[] }) {
    this.runtimeStorageService.resetCacheData('PERMISSIONS');
    const urlObj = this.apiConfigService.apiEndPointObj.updateResource;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${resourceName}`, method: urlObj.method }, data);
  }

  saveAdminProfile(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.adminProfile, data);
  }

  updateadminprofile(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateadminprofile;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }

  searchAdmin(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.searchAdmin, data);
  }

  searchSiteExecutive(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.searchSiteExecutive, data);
  }

  getAdminProfileList() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAdminProfileList);
  }

  getadminprofile(loginId: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getadminprofile;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${loginId}`, method: urlObj.method });
  }

  getAllFAQs() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllFAQs);
  }

  saveFAQ(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveFAQ, data);
  }

  updateFAQ(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateFAQ, data);
  }

  deleteFAQ(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteFAQ;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getAllVariables() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllVariables);
  }

  getAllChecklistQuestions() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllChecklistQuestions);
  }

  saveVariable(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveVariable, data);
  }

  updateVariable(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateVariable, data);
  }

  deleteVariable(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteVariable;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getAllAppVersionList() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllAppVersionList);
  }

  gettfeedbacklist(pageNumber: number, filter: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.gettfeedbacklist;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${filter.outletId}/${pageNumber}`, method: urlObj.method });
  }

  saveAppVersion(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveAppVersion, data);
  }

  updateAppVersion(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateAppVersion, data);
  }

  searchOutletOrderList(data: any, page: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchOutletOrderList;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${[page]}`, method: urlObj.method }, data);
  }

  getCurrentOutletOrdersCount() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getCurrentOutletOrdersCount, null, null, true);
  }

  getCurrentOutletOrdersList(orgId: any, cafeId: any, status: any, page: any, limit: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCurrentOutletOrdersList;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${page}/${limit}/${status}/${orgId}/${cafeId}`, method: urlObj.method });
  }

  deleteOutletMenu(utletid: any, menuId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteOutletMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${utletid}/${menuId}`, method: urlObj.method });
  }

  deleteQrMenuItem(outletid: any, mealType: any, menuId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteQrMenuItem;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletid}/${mealType}/${menuId}`, method: urlObj.method });
  }

  deleteOutletMasterMenu(menuId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteOutletMasterMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${menuId}`, method: urlObj.method });
  }

  updateComplianceByAdmin(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateComplianceByAdmin;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }

  updateProfileApproval(id: string, status: any, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateProfileApproval;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}/${status}`, method: urlObj.method }, data);
  }

  createPdf(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createPdf, data);
  }

  updateVenderComplianceByAdmin(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updatevenderComplianceByAdmin;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }

  addOrg(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addOrg, payload, null, false, true);
  }

  orgUpdate(payload: any, id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.orgUpdate;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, payload, null, false, true);
  }

  updateOrglevelSubsidy(payload: any, id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateOrglevelSubsidy;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, payload, null, false, true);
  }

  updateCafelevelSubsidy(payload: any, id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateCafelevelSubsidy;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, payload, null, false, true);
  }

  fetchFilteredAllOrgs(data: any, page: any = 1) {
    const urlObj = this.apiConfigService.apiEndPointObj.fetchFilteredAllOrgs;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${page}`, method: urlObj.method }, data);
  }

  B2B_fetchFilteredAllOrgs(data: any, page: any = 1) {
    return this.fetchFilteredAllOrgs(data, page);
  }

  deleteOrganization(id: any, type: 'soft' | 'hard' = 'soft') {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteOrganization;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}?type=${type}`, method: urlObj.method });
  }

  getDeletedOrganizations() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getDeletedOrganizations);
  }

  restoreOrganization(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.restoreOrganization;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  deleteOutlet(id: any, type: 'soft' | 'hard' = 'soft') {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteOutlet;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}?type=${type}`, method: urlObj.method });
  }

  getDeletedOutlets() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getDeletedOutlets);
  }

  restoreOutlet(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.restoreOutlet;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  updateOrgComplianceByAdmin(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateOrgComplianceByAdmin;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }

  searchVendorByOrgId(searchObj: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.searchVendorByOrgId, searchObj);
  }

  searchVendorFirmByOrgId(searchObj: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.searchVendorFirmByOrgId, searchObj);
  }

  searchOutletByOrgId(searchObj: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.searchOutletByOrgId, searchObj);
  }

  vendorTransactionHistory(vendorFirmId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.vendorTransactionHistory;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${vendorFirmId}`, method: urlObj.method });
  }

  searchOutletByCafeId(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchOutletByCafeId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  lastsevendaysorderdaywisecount(searchObj: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.lastsevendaysorderdaywisecount, searchObj);
  }

  getDayRangeBasedLogs(startDate: any, endDate: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getDayRangeBasedLogs;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${startDate}` + `/${endDate}`, method: urlObj.method });
  }

  getTimeBasedLogs(hour: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getTimeBasedLogs;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${hour}`, method: urlObj.method });
  }

  getLineBasedLogs(lineLimit: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getLineBasedLogs;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${lineLimit}`, method: urlObj.method });
  }

  getDayRangeBasedAuditLogs(startDate: any, endDate: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getDayRangeBasedAuditLogs;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${startDate}` + `/${endDate}`, method: urlObj.method });
  }

  getTimeBasedAuditLogs(hour: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getTimeBasedAuditLogs;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${hour}`, method: urlObj.method });
  }

  getLineBasedAuditLogs(lineLimit: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getLineBasedAuditLogs;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${lineLimit}`, method: urlObj.method });
  }

  getEmployeeListByOrgId(orgId: any, cafeteriaId?: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getEmployeeListByOrgId;
    return this.apiHttpService.REQUEST(urlObj, { orgId, cafeteriaId });
  }

  getEmployeelistByCafeteriaIds(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getEmployeelistByCafeteriaIds;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, data);
  }

  getConsumptionOrderByOrgId(orgId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getConsumptionOrderByOrgId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}`, method: urlObj.method });
  }

  updateConsumptionMenu(orgId: any, cafeId: any, consumptionMenu: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateConsumptionMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}` + `/${cafeId}`, method: urlObj.method }, consumptionMenu);
  }

  updateConsumptionOrderStatus(orgId: any, cafeId: any, payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateConsumptionOrderStatus;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}` + `/${cafeId}`, method: urlObj.method }, payload);
  }

  updateConsumptionSingleMeslStatus(orgId: any, cafeId: any, payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateConsumptionSingleMeslStatus;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}` + `/${cafeId}`, method: urlObj.method }, payload);
  }

  getFeedbackListByOrgId(orgId: any, page: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getFeedbackListByOrgId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}/${page}`, method: urlObj.method });
  }

  saveQuestion(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveQuestion, data);
  }

  updateChecklistQuestions(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateChecklistQuestions, data);
  }

  deletechecklistQuestion(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deletechecklistQuestion;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  saveChecklistReport(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveChecklistReport, data);
  }

  getAllChecklistReports() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllChecklistReports);
  }

  updateChecklistReports(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateChecklistReports, data);
  }

  deletechecklistReport(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deletechecklistReport;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getReportHistoryByfilter(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getReportHistoryByfilter, data);
  }

  getChecklistReportByOutletId(outletId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getChecklistReportByOutletId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletId}`, method: urlObj.method });
  }

  getfeedbacklistByfilter(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getfeedbacklistByfilter, data);
  }

  getFeedbackByOrderByOrderType(filter: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getFeedbackByOrderByOrderType, filter);
  }

  employeeAdd(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.employeeAdd, data);
  }

  createIncident(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createIncident, data);
  }

  getAllIncidents() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllIncidents, null, null, true);
  }

  getIncidentsByDateAndFilters(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getIncidentsByDateAndFilters, data, null, true);
  }

  updateIncident(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateIncident;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${data._id}`, method: urlObj.method }, data);
  }

  deleteIncident(incidentId: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteIncident;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${incidentId}`, method: urlObj.method });
  }

  updateOutletMenu(outletId: any, menuId: any, menuObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateOutletMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletId}` + `/${menuId}`, method: urlObj.method }, menuObj);
  }

  updateQrMenu(outletId: any, menuId: any, menuObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateQrMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletId}` + `/${menuId}`, method: urlObj.method }, menuObj);
  }

  updateOutletMasterMenu(menuId: any, menuObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateOutletMasterMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${menuId}`, method: urlObj.method }, menuObj);
  }

  changeMenuActivation(outletId: any, menuId: any, menuObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.changeMenuActivation;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletId}` + `/${menuId}`, method: urlObj.method }, menuObj);
  }

  changeQrMenuActivation(outletId: any, menuId: any, menuObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.changeQrMenuActivation;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletId}` + `/${menuId}`, method: urlObj.method }, menuObj);
  }

  changeMasterMenuActivation(menuId: any, menuObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.changeMasterMenuActivation;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${menuId}`, method: urlObj.method }, menuObj);
  }

  getDashboardCounts(searchObj: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getDashboardCounts, searchObj);
  }

  getChartData(searchObj: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getChartData, searchObj);
  }

  addGuestEmployeeList(guestEmployeeList: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addGuestEmployeeList, guestEmployeeList);
  }

  getGuestEmployeelistByOrgId(orgId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getGuestEmployeelistByOrgId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}`, method: urlObj.method });
  }

  deleteGuestEmployee(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteGuestEmployee;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  updateGuestEmployee(id: any, employeeObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateGuestEmployee;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, employeeObj);
  }

  B2B_fetchBulkMenu(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_fetchBulkMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, null, null, false, true);
  }

  B2B_saveBulkMenu(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.B2B_updateBulkMenu, data, null, false, true);
  }

  B2B_fetchIndividualMenu(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_fetchIndividualMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, null, null, false, true);
  }

  B2B_saveIndMenu(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.B2B_updateIndMenu, data, null, false, true);
  }

  B2B_fetchBulkSnacksMenu(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_fetchBulkSnacksMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, null, null, false, true);
  }

  B2B_Bulk_SnackMenuAdd(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.B2B_Bulk_SnackMenuAdd, data, null, false, true);
  }

  B2B_fetchIndSnacksMenu(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_fetchIndSnacksMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, null, null, false, true);
  }

  B2B_Ind_SnackMenuAdd(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.B2B_updateIndividualSnacksMenu, data, null, false, true);
  }

  B2B_saveSnackBoxMenu(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.B2B_saveSnackBoxMenu, data, null, false, true);
  }

  B2B_snackBoxMenuFetch(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_snackBoxMenuFetch;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, null, null, false, true);
  }

  B2B_customSnackBoxMenuFetch(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_customSnackBoxMenuFetch;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, null, null, false, true);
  }

  B2B_saveCustomSnackBoxMenu(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.B2B_saveCustomSnackBoxMenu, data, null, false, true);
  }

  updateBulkMasterMenu(item: any, id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateBulkMasterMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, item, null, false, true);
  }

  getAllBulkMasterMenus() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllBulkMasterMenus, null, null, false, true);
  }

  deleteBulkMasterMenu(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteBulkMasterMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, null, null, false, true);
  }

  performBulkOrderTransfer(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.performBulkOrderTransfer, data);
  }

  performBulkDailyOrderTransfer(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.performBulkDailyOrderTransfer, data);
  }

  addEmployeeList(employeeList: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addEmployeeList, employeeList);
  }

  addConsumptionOrderList(consumptionOrder: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addConsumptionOrderList, consumptionOrder);
  }

  deleteEmployee(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteEmployee;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  deleteMultipleEmployee(ids: string[]) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.deleteMultipleEmployee, { ids });
  }

  createLoginCode(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.createLoginCode;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  refreshLoginCode(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.refreshLoginCode;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  updateEmployee(id: any, employeeObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateEmployee;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, employeeObj);
  }

  searchBulkOrderList(data: any, page: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchBulkOrderList;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${page}`, method: urlObj.method }, data);
  }

  generateInvoice(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.generateInvoice;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  setOutletOpenedStatus(id: any, status: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.setOutletOpenedStatus;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}` + `/${status}`, method: urlObj.method });
  }

  getCurrentPackageOrdersList(status: any, page: any, limit: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCurrentPackageOrdersList;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${page}/${limit}/${status}`, method: urlObj.method });
  }

  getMealPackageList() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getMealPackageList);
  }

  saveMealPackage(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveMealPackage, data);
  }


  updateBulkDailyFoodOrder(order: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateBulkDailyFoodOrder, order);
  }


  getGeneralAppFeeback(page?: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getGeneralAppFeeback;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${page}`, method: urlObj.method });
  }

  getGeneralAppFeebackCount(acknowledged?: boolean) {
    const urlObj = this.apiConfigService.apiEndPointObj.getGeneralAppFeebackCount;
    let params = new HttpParams();
    if (acknowledged !== undefined) {
      params = params.set('acknowledged', String(acknowledged));
    }
    return this.apiHttpService.REQUEST({ url: `${urlObj.url}?${params}`, method: urlObj.method });
  }

  feedbackacknowledge(id: string, payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.feedbackacknowledge;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getAdminDailyBulkOrders(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAdminDailyBulkOrders, payload);
  }

  getAdminEmpPolls(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAdminEmpPolls, payload);
  }

  getOrgEmployeePollingList(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getOrgEmployeePollingList, payload);
  }

  orgMealPackages(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.orgMealPackages, payload);
  }

  getAdminPastOrders(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAdminPastOrders, payload);
  }

  saveBulkMasterMenu(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.bulkMasterMenu, payload, null, false, true);
  }

  getb2bBulkOrderList(status: any, page: any, limit: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getb2bBulkOrderList;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${page}/${limit}/${status}`, method: urlObj.method });
  }

  getBulkDailyOrderList(status: any, startDate?: any, endDate?: any, orgId?: any, cafeteriaId?: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getBulkDailyOrderList;
    let payload: any = {};
    
    if (status && typeof status === 'object' && !Array.isArray(status)) {
      payload = { ...status };
    } else {
      payload.status = status;
      if (startDate) payload.startDate = startDate;
      if (endDate) payload.endDate = endDate;
      if (orgId) payload.orgId = orgId;
      if (cafeteriaId) payload.cafeteriaId = cafeteriaId;
    }
    
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, payload);
  }

  getClusterb2bBulkOrderList(status: any, page: any, limit: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getClusterb2bBulkOrderList;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${page}/${limit}/${status}`, method: urlObj.method });
  }

  updateb2bFoodOrder(order: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateb2bFoodOrder, order);
  }

  getCurrentB2BOrdersCount() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getCurrentB2BOrdersCount);
  }

  getCurrentDailyOrdersCount(date?: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCurrentDailyOrdersCount;
    let payload: any = {};
    if (date) {
      if (typeof date === 'string') {
        payload.date = date;
      } else {
        payload = { ...date };
      }
    }
    return this.apiHttpService.REQUEST(urlObj, payload);
  }

  getDailyOrdersCountByDateRange(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getDailyOrdersCountByDateRange, payload);
  }

  getCafeteriasPollingList(deliveryDate: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getCafeteriasPollingList, deliveryDate);
  }

  getCafeteriaList() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getCafeteriaList);
  }

  createOrderFromPollObj(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createOrderFromPollObj, payload);
  }

  getDailyFoodOrdersCount() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getDailyFoodOrdersCount);
  }

  fetchAllEnquiries() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchAllEnquiries);
  }

  updateAllEnquiriesStatus(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateAllEnquiriesStatus, body);
  }

  getCurrentOutletOrdersListForGuest(orgId: string, cafeName: string, isSearchObj: boolean) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCurrentOutletOrdersListForGuest;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}/${cafeName}/${isSearchObj}`, method: urlObj.method }, null, null, true, false);
  }

  getBulkOrderForChart(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getBulkOrderForChart, body);
  }

  updateVendorDetails(outletId: any, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateVendorDetails;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletId}`, method: urlObj.method }, body);
  }

  getVendorListByOutletId(outletId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getVendorListByOutletId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletId}`, method: urlObj.method });
  }

  outletEmployeeAdd(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.outletEmployeeAdd, body);
  }

  addOutletEmployeeList(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addOutletEmployeeList, body);
  }

  updateCompanyWalletCafeteriaDetails(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateCompanyWalletCafeteriaDetails, payload);
  }

  getCompanyWalletCafeteriaDetails(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getCompanyWalletCafeteriaDetails, payload);
  }

  bulkUpdateCompanyWalletCafeteriaDetails(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.bulkUpdateCompanyWalletCafeteriaDetails, payload);
  }

  outletEmployeeByOrgId(orgId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.outletEmployeeByOrgId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}`, method: urlObj.method });
  }

  getOutletEmployeeListByCafeteriaId(cafeteriaId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getOutletEmployeeListByCafeteriaId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${cafeteriaId}`, method: urlObj.method });
  }

  deleteOutletEmployee(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteOutletEmployee;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getOutletEmployeeByPhoneNo(phoneNo: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getOutletEmployeeByPhoneNo;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${phoneNo}`, method: urlObj.method });
  }

  updateOutletEmployee(id: any, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateOutletEmployee;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, body);
  }

  qrEmployeeAdd(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.qrEmployeeAdd, body);
  }

  addQrEmployeeList(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addQrEmployeeList, body);
  }

  updateEmployeeQrCode(phoneNo: any, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateEmployeeQrCode
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${phoneNo}`, method: urlObj.method }, body);
  }

  qrEmployeeByCafeId(cafeId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.qrEmployeeByCafeId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${cafeId}`, method: urlObj.method });
  }

  deleteQrEmployee(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteQrEmployee;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getQrEmployeeByPhoneNo(phoneNo: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getQrEmployeeByPhoneNo;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${phoneNo}`, method: urlObj.method });
  }

  updateQrEmployee(id: any, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateQrEmployee;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, body);
  }

  addVirtualCafeteriaEmployee(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.virtualCafeteriaEmployeeAdd, body);
  }

  addVirtualCafeteriaEmployeeList(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.virtualCafeteriaEmployeeAddList, body);
  }

  getVirtualCafeteriaEmployeeByOrgId(orgId: any, cafeteriaId?: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.virtualCafeteriaEmployeeByOrgId;
    let url = urlObj.url + `/${orgId}`;
    if (cafeteriaId) {
      url += `?cafeteriaId=${cafeteriaId}`;
    }
    return this.apiHttpService.REQUEST({ url, method: urlObj.method });
  }

  deleteVirtualCafeteriaEmployee(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.virtualCafeteriaEmployeeDelete;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getVirtualCafeteriaEmployeeByPhoneNo(phoneNo: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getVirtualCafeteriaEmployeeByPhoneNo;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${phoneNo}`, method: urlObj.method });
  }

  updateVirtualCafeteriaEmployee(id: any, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.virtualCafeteriaEmployeeUpdate;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, body);
  }

  verifyVirtualCafeteriaEmployeeByPhoneNo(orgName: any, phoneNo: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.virtualCafeteriaEmployeeVerifyByPhoneNo;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgName}/${phoneNo}`, method: urlObj.method });
  }

  verifyVirtualCafeteriaEmployeeByEmail(orgName: any, email: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.virtualCafeteriaEmployeeVerifyByEmail;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgName}/${email}`, method: urlObj.method });
  }

  fetchOutletOrdersByOrgAndDateRange(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchOutletOrdersByOrgAndDateRange, payload);
  }

  fetchOutletOrdersbysearchObj(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchOutletOrdersbysearchObj, body);
  }

  fetchAllOutletOrdersbysearchObj(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchAllOutletOrdersbysearchObj, body);
  }

  fetchConsumptionOrdersbysearchObj(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchConsumptionOrdersbysearchObj, body);
  }

  getStaticTotalCounts() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getStaticTotalCounts);
  }

  getTotalCounts(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getTotalCounts, body);
  }

  getTotalOrdersStatusWiseData(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getTotalOrdersStatusWiseData, body);
  }

  getOrgTotalOrdersStatusWiseData(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getOrgTotalOrdersStatusWiseData, body);
  }

  getTotalSubOrdersStatusWiseData(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getTotalSubOrdersStatusWiseData, body);
  }

  getCustomerProfileList() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getCustomerProfileList);
  }

  getCustomerPastOrders(id: any, page: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCustomerPastOrders;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}/${page}`, method: urlObj.method });
  }

  getCustomerPackageList(id: any, page: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCustomerPackageList;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}/${page}`, method: urlObj.method });
  }

  getOrderPackage(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getOrderPackage;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getCustomerListByOrgId(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getCustomerListByOrgId, body);
  }

  getCustomerWalletListByOrgId(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getCustomerWalletListByOrgId, body);
  }

  updateOrderStatus(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateOrderStatus, body);
  }

  updatePackageFoodOrder(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updatePackageFoodOrder, body);
  }

  createDailyPackageOrder(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createDailyPackageOrder, body);
  }
  getOutletOrdersByCustomerId(id: any, dateFrom: any, dateTo: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getOutletOrdersByCustomerId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}/${dateFrom}/${dateTo}`, method: urlObj.method });
  }

  userRewardsPointsHistory(id: any, page: any, limit: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.userRewardsPointsHistory;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}/${page}/${limit}`, method: urlObj.method });
  }

  getUserTransactionHistoryByFromDate(customerId: string, fromDate: string, toDate: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getUserTransactionHistoryByFromDate;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${customerId}/${fromDate}/${toDate}`, method: urlObj.method });
  }

  getWalletBalance(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getWalletBalance;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  depositeInWallet(id: any, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.depositeInWallet;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, body);
  }

  withdrawFromWallet(id: any, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.withdrawFromWallet;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, body);
  }

  checkUserWallet(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.checkUserWallet, body);
  }

  fetchPastOutletOrdersbysearchObj(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchPastOutletOrdersbysearchObj, payload);
  }

  fetchCompletedOutletOrdersbysearchObj(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchCompletedOutletOrdersbysearchObj, payload);
  }

  fetchCompletedEventOrdersbysearchObj(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchCompletedEventOrdersbysearchObj, payload);
  }

  fetchPastEventOrdersbyOutletId(id: any, page: any, orderType?: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.fetchPastEventOrdersbyOutletId;
    let url = urlObj.url + `/${id}/${page}`;
    return this.apiHttpService.REQUEST(
      { url, method: urlObj.method },
      orderType ? { orderType } : {}
    );
  }

  getEventPopupsByOrgId(orgId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getEventPopupsByOrgId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}`, method: urlObj.method });
  }

  fetchDailyBulkOrdersbysearchObj(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchDailyBulkOrdersbysearchObj, payload);
  }

  fetchBulkOrdersByVendorFirmId(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchBulkOrdersByVendorFirmId, payload);
  }

  fetchDailyBulkOrdersbyOrgId(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchDailyBulkOrdersbyOrgId, payload);
  }

  getOrg(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getOrg;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getStaticTotalCountsByOrg(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getStaticTotalCountsByOrg;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getTotalCountsByOrgId(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getTotalCountsByOrgId, body);
  }

  getBulkOrdersByDate(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getBulkOrdersByDate, body);
  }

  saveVendorFirm(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveVendorFirm, body);
  }

  updateVendorFirm(id: any, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateVendorFirm;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, body);
  }

  updateVendorFirmCompliance(id: any, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateVendorFirmCompliance;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, body);
  }

  deleteUserFromAllList(phoneNo: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteUserFromAllList;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${phoneNo}`, method: urlObj.method });
  }

  orgInfo(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.orgInfo, body);
  }

  b2b_fetchBulkCakeMenu(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.b2b_fetchBulkCakeMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  b2b_fetchBulkLuxMenu(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.b2b_fetchBulkLuxMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  b2b_fetchBulkSweetMenu(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.b2b_fetchBulkSweetMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  b2b_predefinedSnackboxFetch(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.b2b_predefinedSnackboxFetch;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  b2b_customizedSnackboxFetch(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.b2b_customizedSnackboxFetch;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  b2b_BulkCakeMenuAdd(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.b2b_BulkCakeMenuAdd, body);
  }

  b2b_updateBulkCakeMenu(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.b2b_updateBulkCakeMenu, body);
  }

  b2b_updateBulkLuxMenu(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.b2b_updateBulkLuxMenu, body);
  }

  b2b_updateBulkSweetMenu(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.b2b_updateBulkSweetMenu, body);
  }

  b2b_updatePredefinedSnackBox(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.b2b_updatePredefinedSnackBox, body);
  }

  b2b_updateCustomizedSnackBox(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.b2b_updateCustomizedSnackBox, body);
  }

  fetchFoodOrderPackagebysearchObj(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchFoodOrderPackagebysearchObj, body);
  }

  searchVendorProfile(searchText: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchVendorProfile;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${searchText}`, method: urlObj.method });
  }

  getdeliveryAmount(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getdeliveryAmount, data);
  }

  getNearestVendors(lng: any, lat: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getNearestVendors;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${lng}/${lat}`, method: urlObj.method });
  }

  updateB2BManualDelivery(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateB2BManualDelivery;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  createDeliveryTask(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createDeliveryTask, data);
  }

  createOnlyDunzoTask(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createOnlyDunzoTask, data);
  }

  createPorterTask(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createPorterTask, data);
  }

  createShadowFaxTask(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createShadowFaxTask, data);
  }

  cancelShadowFaxDelivery(taskId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.cancelShadowFaxTask;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${taskId}`, method: urlObj.method });
  }

  createPidge3PLTask(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createPidge3PLTask, data);
  }

  cancelPidge3PLOrder(taskId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.cancelPidge3PLOrder;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${taskId}`, method: urlObj.method });
  }

  trackDeliveryTask(id: string, partner: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.trackDeliveryTask;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}/${partner}`, method: urlObj.method }, null, null, true);
  }

  getVendorById(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getVendorById;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, null, null, true);
  }

  getVendorFirmById(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getVendorFirmById;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, null, null, true);
  }

  cancelPorterTask(taskId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.cancelPorterTask;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${taskId}`, method: urlObj.method });
  }

  getAllConfigImages() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllConfigImages);
  }

  saveConfigImage(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveConfigImage, data);
  }

  updateConfigImage(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateConfigImage;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }

  createImageGroupConfig(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createImageGroupConfig, data);
  }

  updateImageGroupConfig(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateImageGroupConfig;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }

  deleteImageGroupConfig(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteImageGroupConfig;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getImageGroupConfigById(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getImageGroupConfigById;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getImageGroupConfigByName(name: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getImageGroupConfigByName;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${name}`, method: urlObj.method });
  }

  getAllImageGroupConfigs(page: number, pageSize: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getAllImageGroupConfigs;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${page}/${pageSize}`, method: urlObj.method });
  }

  getTotalVendorLedgerBalanceByFirm(vendorFirmId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getTotalVendorLedgerBalanceByFirm;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${vendorFirmId}`, method: urlObj.method });
  }

  getVendorTransactionByFirmAndTypeAndDate(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getVendorTransactionByFirmAndTypeAndDate, body);
  }

  creditOrDebitVendorWallet(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.creditOrDebitVendorWallet, body);
  }

  transferWalletListToBankManual(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.transferWalletListToBankManual, body);
  }

  moveSubsidyToWallet(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.moveSubsidyToWallet, body);
  }

  moveDailyToWallet(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.moveDailyToWallet, body);
  }


  getConsumptionOrderByDateForDashboard(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getConsumptionOrderByDateForDashboard, data);
  }

  saveVirtualCafeteriaPackageList(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.virtualCafeteriaPackageSaveList, data);
  }

  deleteVirtualCafeteriaPackageItem(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.deleteVirtualCafeteriaPackageItem, data);
  }

  addVirtualCafeteriaPackageItem(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addVirtualCafeteriaPackageItem, data);
  }

  updateVirtualCafeteriaPackageItem(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateVirtualCafeteriaPackageItem, data);
  }

  getQrMenuList(filter: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getQrMenuList, filter);
  }

  changeQrMealTypeActivation(id: any, isActive: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.changeQrMealTypeActivation
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, isActive);
  }

  changeCategoryMenuType(id: any, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.changeCategoryMenuType
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, body);
  }

  changePaidType(id: any, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.changePaidType
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, body);
  }

  getByOrgIdAndCafeteriaIdAndDate(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getByOrgIdAndCafeteriaIdAndDate, payload);
  }

  createAuditReport(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createAuditReport, body);
  }

  updateAuditReport(id: string, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateAuditReport
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, body);
  }

  deleteAuditReport(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteAuditReport
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getServerLogs(params: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getServerLogs, params);
  }

  getAuditLogs(params: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAuditLogs, params);
  }


  addVirtualCafeteriaCategory(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.virtualCafeteriaCategoryAdd
    return this.apiHttpService.REQUEST(urlObj, body);
  }

  addVirtualCafeteriaCategoryList(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.virtualCafeteriaCategoryAddList, body);
  }

  deleteVirtualCafeteriaCategory(cafeeteriaId: string, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.virtualCafeteriaCategoryDelete
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${cafeeteriaId}`, method: urlObj.method }, body);
  }

  updateVirtualCafeteriaCategory(cafeeteriaId: string, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.virtualCafeteriaCategoryUpdate
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${cafeeteriaId}`, method: urlObj.method }, body);
  }

  getVirtualCafeteriaCategories(cafeeteriaId: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.virtualCafeteriaCategoriesByCafeteria
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${cafeeteriaId}`, method: urlObj.method });
  }

  getVirtualCafeteriaDefaultCategories() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getVirtualCafeteriaDefaultCategories);
  }

  updateVirtualCafeteriaWeeklyMenu(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateVirtualCafeteriaWeeklyMenu, body);
  }

  updateVirtualCafeteriaCategoryConfig(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateVirtualCafeteriaCategoryConfig, body);
  }

  saveVirtualCafeteriaPackage(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.virtualCafeteriaPackageSave, body);
  }

  updateVirtualCafeteriaPackage(cafeeteriaId: string, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.virtualCafeteriaPackageUpdate
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${cafeeteriaId}`, method: urlObj.method }, body);
  }

  getVirtualCafeteriaPackageByCafeteria(cafeeteriaId: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.virtualCafeteriaPackageByCafeteria
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${cafeeteriaId}`, method: urlObj.method });
  }

  getVirtualCafeteriaPackageById(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.virtualCafeteriaPackageById
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  changeVirtualCafeteriaPackageStatus(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.changeVirtualCafeteriaPackageStatus
    return this.apiHttpService.REQUEST(urlObj, body);
  }

  addCategoryConfig(data: FormData) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addCategoryConfig, data);
  }

  deleteCategoryConfig(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.deleteCategoryConfig, data);
  }

  changeVirtualCafeteriaCategoryStatus(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.changeVirtualCafeteriaCategoryStatus, data);
  }

  addVirtualCafeteriaBannerImage(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addVirtualCafeteriaBannerImage, data);
  }

  updateVirtualCafeteriaBannerImages(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateVirtualCafeteriaBannerImages, data);
  }

  deleteVirtualCafeteriaBannerImage(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.deleteVirtualCafeteriaBannerImage, data);
  }

  uploadImage(fd: FormData) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createImage, fd);
  }

  dailyOrderMenuAdd(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.dailyOrderMenuAdd, data);
  }

  getDailyOrderMenuByCafeteriaId(cafeeteriaId: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getDailyOrderMenuByCafeteriaId
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${cafeeteriaId}`, method: urlObj.method });
  }

  updateMealType(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateMealType, data);
  }

  deleteMealType(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.deleteMealType, data);
  }

  addMealConfig(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addMealConfig, data);
  }

  updateMealConfig(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateMealConfig, data);
  }

  deleteMealConfig(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.deleteMealConfig, data);
  }

  isActiveAndDeActiveMealConfig(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.isActiveAndDeActiveMealConfig, data);
  }

  addVendorDetails(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addVendorDetails, data);
  }

  checkJusPayPayoutStatus(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.checkJusPayPayoutStatus;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getAllVendorWallet() {
    const urlObj = this.apiConfigService.apiEndPointObj.getAllVendorWallet;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method });
  }

  addBulkWalletBalance(data: any): Promise<any> {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addBulkWalletBalance, data);
  }

  getAllCurrentOrders(outletId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getAllCurrentOrders;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${outletId}`, method: urlObj.method }, null, null, true);
  }

  updatescanOrder(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updatescanOrder;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, payload);
  }

  validateJusPayPaymentTransaction(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.validateJusPayPaymentTransaction;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, payload);
  }

  validateJusPayPaymentTransactionManual(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.validateJusPayPaymentTransactionManual;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, payload);
  }

  copyDailyOrderMenu(data: any): Promise<any> {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.copyDailyOrderMenu, data);
  }

  addBulkDailyOrderMenu(data: any): Promise<any> {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addBulkDailyOrderMenu, data);
  }

  getOutletOrdersByStatus(status: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getOutletOrdersByStatus;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${status}`, method: urlObj.method });
  }

  updateBulkOrdersList(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateBulkOrdersList, data);
  }

  updateBulkOrdersListPaymentFailed(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateBulkOrdersListPaymentFailed, data);
  }

  getClusterCurrentOrdersList(status: string, page: number, limit: number, clusterList: any = []) {
    const urlObj = this.apiConfigService.apiEndPointObj.getClusterCurrentOrdersList;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${page}/${limit}/${status}`, method: urlObj.method }, { clusterList });
  }

  getClusterCurrentPackageOrdersList(status: string, page: number, limit: number, clusterList: any = []) {
    const urlObj = this.apiConfigService.apiEndPointObj.getClusterCurrentPackageOrdersList;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${page}/${limit}/${status}`, method: urlObj.method }, { clusterList });
  }

  getCurrentOrdersCount(clientDate?: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCurrentOrdersCount;
    const url = clientDate ? `${urlObj.url}/${clientDate}` : urlObj.url;
    return this.apiHttpService.REQUEST({ url, method: urlObj.method }, null, null, true);
  }

  getClusterCurrentOrdersCount(clusterList: any = []) {
    const urlObj = this.apiConfigService.apiEndPointObj.getClusterCurrentOrdersCount;
    return this.apiHttpService.REQUEST(urlObj, { clusterList }, null, true);
  }

  getClusterCurrentPackageCount(clusterList: any = []) {
    const urlObj = this.apiConfigService.apiEndPointObj.getClusterCurrentPackageCount;
    return this.apiHttpService.REQUEST(urlObj, { clusterList }, null, true);
  }

  getCurrentPackageCount() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getCurrentPackageCount, null, null, true);
  }

  checkSession() {
    const urlObj = this.apiConfigService.apiEndPointObj.checkSession;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method });
  }

  // --- Unified Bulk Menu CRUD ---
  getCategoryBulkMenu(payload: { cafeId: any, mainCategory: string, subCategory: string }) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.bulkMenu_getCategoryMenu, payload);
  }

  saveCategoryBulkMenu(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.bulkMenu_saveCategoryMenu, payload);
  }

  getBulkMenuById(cafeteriaId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.bulkMenu_fetchByCafe;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${cafeteriaId}`, method: urlObj.method });
  }

  updateBulkMenu(cafeteriaId: any, payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.bulkMenu_update;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${cafeteriaId}`, method: urlObj.method }, payload);
  }

  deleteBulkMenu(menuId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.bulkMenu_delete;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${menuId}`, method: urlObj.method });
  }

  getAllBulkMenus() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.bulkMenu_fetchAll);
  }

  copyBulkMenu(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.bulkMenu_copy, data);
  }

  getBulkMenuByCategory(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.bulkMenu_fetchByCategory, data);
  }

  toggleBulkMenuCategoryStatus(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.bulkMenu_toggleStatus, data);
  }

  assignVendorForBulkMenu(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.bulkMenu_updateVendor, data);
  }

  fetchBulkOrdersByFilter(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchBulkOrdersByFilter, data);
  }

  getMLAllGeoFencingList() {
    return this.runTimeCacheInterceptor('GEO_FENCING_LIST_ALL', this.apiConfigService.apiEndPointObj.ml_getAllGeoFencingList);
  }

  getMLMealPackageList() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.ml_getMealPackageList);
  }

  deleteCompanyWalletCafeteriaDetails(id: any): Promise<any> {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteCompanyWalletCafeteriaDetails;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  createAutoRule(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createAutoRule, data);
  }

  getAutoRules(orgId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getAutoRules;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}`, method: urlObj.method });
  }

  updateAutoRule(id: any, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateAutoRule;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }

  deleteAutoRule(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteAutoRule;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  toggleAutoRule(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.toggleAutoRule;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getCompanyWalletTransactionHistoryByPhoneNo(phoneNo: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCompanyWalletTransactionHistoryByPhoneNo;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${phoneNo}`, method: urlObj.method });
  }

  getCompanyWalletByPhoneNo(phoneNo: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCompanyWalletByPhoneNo;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${phoneNo}`, method: urlObj.method });
  }

  getTransactionsByOrgId(orgId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getTransactionsByOrgId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}`, method: urlObj.method });
  }

  getCompanyOrganizationTransactionHistory(paylod: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCompanyOrganizationTransactionHistory;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, paylod);
  }

  getCustomerProfileDetails(phoneNo: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCustomerProfileDetails;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${phoneNo}`, method: urlObj.method });
  }

  createScheduledNotification(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createScheduledNotification, data);
  }

  sendNowNotification(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.sendNowNotification, data);
  }

  getScheduledNotifications(params?: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getScheduledNotifications;
    let queryString = '';
    if (params) {
      const queryParts = [];
      if (params.status) queryParts.push(`status=${params.status}`);
      if (params.fromDate) queryParts.push(`fromDate=${params.fromDate}`);
      if (params.toDate) queryParts.push(`toDate=${params.toDate}`);
      if (queryParts.length > 0) queryString = `?${queryParts.join('&')}`;
    }
    return this.apiHttpService.REQUEST({ url: urlObj.url + queryString, method: urlObj.method });
  }

  getScheduledNotificationById(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getScheduledNotificationById;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  cancelScheduledNotification(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.cancelScheduledNotification;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getFoodOrderPackageByOrgIdAndCafeId(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getFoodOrderPackageByOrgIdAndCafeId;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }

  performPackageOrderTransfer(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.performPackageOrderTransfer, payload);
  }

  validatePaytmPaymentTransaction(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.validatePaytmPaymentTransaction, payload);
  }

  updateddPackageFoodOrder(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateddPackageFoodOrder, payload);
  }

  forceLogout(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.forceLogout, payload);
  }

  getActiveSessions(appType: string = 'USER', options: any = {}) {
    this.runtimeStorageService.resetCacheData('SESSIONS');
    const urlObj = this.apiConfigService.apiEndPointObj.getActiveSessions;
    const body: any = {
        appType,
        pageIndex: options.pageIndex,
        pageSize: options.pageSize,
        searchTerm: options.searchTerm
    };
    return this.apiHttpService.REQUEST(urlObj, body);
  }

  getAllVendorFirms() {
    const urlObj = this.apiConfigService.apiEndPointObj.getAllVendorFirms;
    return this.apiHttpService.REQUEST(urlObj);
  }
}

