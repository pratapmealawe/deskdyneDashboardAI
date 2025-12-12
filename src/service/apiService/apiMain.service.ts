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

  getAllPolicy() {
    return this.runTimeCacheInterceptor('POLICIES', this.apiConfigService.apiEndPointObj.getAllPolicy);
  }

  addPolicy(policy: any) {
    this.runtimeStorageService.resetCacheData('POLICIES');
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addPolicy, policy);
  }

  updatePolicy(id: any, data: any) {
    this.runtimeStorageService.resetCacheData('POLICIES');
    const urlObj = this.apiConfigService.apiEndPointObj.updatePolicy;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }

  deletePolicy(id: any) {
    this.runtimeStorageService.resetCacheData('POLICIES');
    const urlObj = this.apiConfigService.apiEndPointObj.deletePolicy;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
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

  B2B_addOrg(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.B2B_addOrg, payload, null, false, true);
  }

  B2B_org_update(payload: any, id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_org_update;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, payload, null, false, true);
  }

  B2B_org_updateOrglevelSubsidy(payload: any, id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_org_updateOrglevelSubsidy;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, payload, null, false, true);
  }

  B2B_org_updateCafelevelSubsidy(payload: any, id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_org_updateCafelevelSubsidy;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, payload, null, false, true);
  }

  B2B_fetchFilteredAllOrgs(data: any, page: any = 1) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_fetchFilteredAllOrgs;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${page}`, method: urlObj.method }, data);
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

  getServerLogs(fileName: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.serverlogs;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${fileName}`, method: urlObj.method }, null, { Accept: 'text/html' }, true);
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

  getEmployeeListByOrgId(orgId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getEmployeeListByOrgId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}`, method: urlObj.method });
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

  employeeAdd(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.employeeAdd, data);
  }

  createIncident(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createIncident, data);
  }

  getAllIncidents() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllIncidents);
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

  updateB2BfoodItem(item: any, id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateB2BfoodItem;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, item, null, false, true);
  }

  getAllB2BFooditems() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllB2BFooditems, null, null, false, true);
  }

  deleteB2BFoodItem(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteB2BFoodItem;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, null, null, false, true);
  }

  performBulkOrderTransfer(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.performBulkOrderTransfer, data);
  }

  performBulkDailyOrderTransfer(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.performBulkDailyOrderTransfer, data);
  }

  addEmployeeList(employeeList: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.addEmployeeList;
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addEmployeeList, employeeList);
  }

  addConsumptionOrderList(consumptionOrder: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addConsumptionOrderList, consumptionOrder);
  }

  deleteEmployee(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteEmployee;
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

  changePackageStatus(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.changePackageStatus, payload);
  }

  getMealAweOutletById(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getMealAweOutletById;
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

  saveMealAweOutlet(outlet: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveMealAweOutlet, outlet);
  }

  updateMealAweOutlet(id: any, outlet: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateMealAweOutlet;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, outlet);
  }

  B2BFetchWeeklyMenu(orgId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2BFetchWeeklyMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}`, method: urlObj.method });
  }

  updateWeeklyMenuItem(menuObj: any, orgId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateWeeklyMenuItem;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}`, method: urlObj.method }, menuObj);
  }

  updateBulkB2BDailyFoodOrder(order: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateBulkB2BDailyFoodOrder, order);
  }

  B2BweeklyMenuAdd(menuObj: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.B2BweeklyMenuAdd, menuObj);
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
    const urlObj = this.apiConfigService.apiEndPointObj.getOrgEmployeePollingList;
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getOrgEmployeePollingList, payload);
  }

  orgMealPackages(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.orgMealPackages, payload);
  }

  getBulkDailyBillingDetails(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getBulkDailyBillingDetails, payload);
  }

  getAdminPastOrders(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAdminPastOrders, payload);
  }

  B2B_fooditemAdd(payload: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.B2B_fooditem, payload, null, false, true);
  }

  getb2bBulkOrderList(status: any, page: any, limit: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getb2bBulkOrderList;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${page}/${limit}/${status}`, method: urlObj.method });
  }

  getb2bBulkDailyOrderList(status: any, page: any, limit: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getb2bBulkDailyOrderList;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${page}/${limit}/${status}`, method: urlObj.method });
  }

  updateb2bFoodOrder(order: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateb2bFoodOrder, order);
  }

  getCurrentB2BOrdersCount() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getCurrentB2BOrdersCount);
  }

  getCurrentB2BDailyOrdersCount() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getCurrentB2BDailyOrdersCount);
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

  outletEmployeeByOrgId(orgId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.outletEmployeeByOrgId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}`, method: urlObj.method });
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



  vcEmployeeAdd(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.vcEmployeeAdd, body);
  }

  addVcEmployeeList(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addVcEmployeeList, body);
  }

  addEmployeeWalletList(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addEmployeeWalletList, body);
  }

  vcEmployeeByOrgId(orgId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.vcEmployeeByOrgId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}`, method: urlObj.method });
  }

  employeeWalletByOrgId(orgId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.employeeWalletByOrgId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}`, method: urlObj.method });
  }

  updateEmployeeCashback(orgId: any, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateEmployeeCashback;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orgId}`, method: urlObj.method }, body);
  }

  deleteVcEmployee(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteVcEmployee;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  deleteEmployeeWallet(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteEmployeeWallet;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getVcEmployeeByPhoneNo(phoneNo: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getVcEmployeeByPhoneNo;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${phoneNo}`, method: urlObj.method });
  }

  updateVcEmployee(id: any, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateVcEmployee;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, body);
  }

  updateEmployeeWallet(id: any, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateEmployeeWallet;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, body);
  }

  fetchOutletOrdersbysearchObj(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchOutletOrdersbysearchObj, body);
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
  fetchDailyBulkOrdersbysearchObj(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.fetchDailyBulkOrdersbysearchObj;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, payload);
  }
  fetchDailyBulkOrdersbyOrgId(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.fetchDailyBulkOrdersbyOrgId;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, payload);
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

  getAllVendorFirms() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllVendorFirms);
  }

  deleteUserFromAllList(phoneNo: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteUserFromAllList;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${phoneNo}`, method: urlObj.method });
  }

  fetchtOrgInfo(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.fetchtOrgInfo, body);
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

  updateB2BDailyManualDelivery(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateB2BDailyManualDelivery;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
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

  getMealAweOutletByCafeteria(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getMealAweOutletByCafeteria;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
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

  moveSubsidyToWallet(body: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.moveSubsidyToWallet, body);
  }

  moveDailyToWallet(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.moveDailyToWallet;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }

  deleteOutlet(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteOutlet;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getConsumptionOrderByDateForDashboard(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getConsumptionOrderByDateForDashboard, data);
  }

  updateMealItemList(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateMealItemList, data);
  }

  deleteMealItem(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.deleteMealItem, data);
  }

  saveMealAweOutletCategoryConfig(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveMealAweOutletCategoryConfig, data);
  }

  addCategoryConfig(data: FormData) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.addCategoryConfig, data);
  }

  deleteCategoryConfig(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.deleteCategoryConfig, data);
  }

  changeCategoryStatus(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.changeCategoryStatus, data);
  }

  updateMealAweOutletCategory(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateMealAweOutletCategory, data);
  }

  createDefaultCategories(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createDefaultCategories, data);
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
    const urlObj = this.apiConfigService.apiEndPointObj.getByOrgIdAndCafeteriaIdAndDate
    return this.apiHttpService.REQUEST(urlObj, payload);
  }

  createAuditReport(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.createAuditReport
    return this.apiHttpService.REQUEST(urlObj, body);
  }

  updateAuditReport(id: string, body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateAuditReport
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, body);
  }

  deleteAuditReport(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteAuditReport
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
}