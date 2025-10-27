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

  private runTimeCacheInterceptor(
    key: any,
    apiObj: any,
    bodyObj?: any,
    extraHeaderObj?: any,
    hideLoader?: boolean
  ) {
    return new Promise(async (resolve, reject) => {
      const cacheList = this.runtimeStorageService.getCacheData(key);
      if (cacheList) {
        resolve(cacheList);
      } else {
        try {
          const data = await this.apiHttpService.REQUEST(
            apiObj,
            bodyObj,
            extraHeaderObj,
            hideLoader
          );
          this.runtimeStorageService.setCacheData(key, data);
          resolve(data);
        } catch (error) {
          reject(error);
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
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.loginAdmin,
      data
    );
  }
  verifyOTP(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.verifyOTP,
      data
    );
  }
  logout() {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.logout
    );
  }

  fetchAllOutlets() {
    const urlObj = this.apiConfigService.apiEndPointObj.fetchAllOutlets;
    return this.apiHttpService.REQUEST({
      url: urlObj.url,
      method: urlObj.method,
    });
  }

  getAllOutletMasterMenus() {
    const urlObj = this.apiConfigService.apiEndPointObj.getAllOutletMasterMenus;
    return this.apiHttpService.REQUEST({
      url: urlObj.url,
      method: urlObj.method,
    });
  }

  getOrgList() {
    const urlObj = this.apiConfigService.apiEndPointObj.getOrgList;
    return this.apiHttpService.REQUEST({
      url: urlObj.url,
      method: urlObj.method,
    });
  }

  saveOutlet(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.saveOutlet;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      payload
    );
  }

  updateCategories(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateCategories;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      payload
    );
  }

  addOutletMenu(outlet: any, outletId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.addOutletMenu;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${outletId}`, method: urlObj.method },
      outlet
    );
  }

  updateOutlet(id: any, payload: any, imgIndex?: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateOutlet;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${imgIndex}` + `/${id}`, method: urlObj.method },
      payload
    );
  }
  updateOutletLevelSubsidy(id: any, subsidy: any) {
    console.log(subsidy);
    const urlObj = this.apiConfigService.apiEndPointObj.updateOutletLevelSubsidy;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      subsidy
    );
  }

  updateOutletNoImages(id: any, payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateOutletNoImages;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      payload
    );
  }

  addOutletMasterMenu(outlet: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.addOutletMasterMenu;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      outlet
    );
  }

  addOutletList(id: any, outlet: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.addOutletList;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      outlet
    );
  }

  fetchCategories() {
    const urlObj = this.apiConfigService.apiEndPointObj.fetchCategories;
    return this.apiHttpService.REQUEST({
      url: urlObj.url,
      method: urlObj.method,
    });
  }

  saveCategories(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.saveCategories;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      payload
    );
  }
  saveVendor(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.saveVendor;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      payload
    );
  }
  getAllVendors() {
    const urlObj = this.apiConfigService.apiEndPointObj.getAllVendors;
    return this.apiHttpService.REQUEST({
      url: urlObj.url,
      method: urlObj.method,
    });
  }

  getVendorWallet(vendorId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getVendorWallet;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${vendorId}`, method: urlObj.method, });
  }

  getVendorLedgerByFirmAndTypeAndDate(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getVendorLedgerByFirmAndTypeAndDate;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  getOutletByCafeteria(
    cafeteriaName: any,
    cafeteriaCity: any,
    organization: any
  ) {
    const urlObj = this.apiConfigService.apiEndPointObj.getOutletByCafeteria;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${cafeteriaName}/${cafeteriaCity}/${organization}`,
      method: urlObj.method,
    });
  }
  deleteVendor(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteVendor;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${id}`,
      method: urlObj.method,
    });
  }
  deleteVendorFirm(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteVendorFirm;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${id}`,
      method: urlObj.method,
    });
  }
  searchVendor(searchObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchVendor;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: 'POST' },
      searchObj
    );
  }
  updateVendor(id: any, vendor: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateVendor;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: 'POST' },
      vendor
    );
  }
  searchOutlet(searchObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchOutlet;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: 'POST' },
      searchObj
    );
  }
  getAllPolicy() {
    const urlObj = this.apiConfigService.apiEndPointObj.getAllPolicy;
    // return this.apiHttpService.REQUEST({url: urlObj.url, method: urlObj.method});
    return this.runTimeCacheInterceptor('POLICIES', {
      url: urlObj.url,
      method: urlObj.method,
    });
  }

  addPolicy(policy: any) {
    this.runtimeStorageService.resetCacheData('POLICIES');
    const urlObj = this.apiConfigService.apiEndPointObj.addPolicy;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      policy
    );
  }

  updatePolicy(id: any, data: any) {
    this.runtimeStorageService.resetCacheData('POLICIES');
    const urlObj = this.apiConfigService.apiEndPointObj.updatePolicy;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      data
    );
  }

  deletePolicy(id: any) {
    this.runtimeStorageService.resetCacheData('POLICIES');
    const urlObj = this.apiConfigService.apiEndPointObj.deletePolicy;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${id}`,
      method: urlObj.method,
    });
  }

  adminProfile(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.adminProfile;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: 'POST' },
      payload
    );
  }
  saveAdminProfile(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.adminProfile,
      data
    );
  }
  updateadminprofile(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateadminprofile;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      data
    );
  }
  searchAdmin(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.searchAdmin,
      data
    );
  }
  searchSiteExecutive(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.searchSiteExecutive,
      data
    );
  }
  getAdminProfileList() {
    const urlObj = this.apiConfigService.apiEndPointObj.getAdminProfileList;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: 'GET' });
  }
  getadminprofile(loginId: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getadminprofile;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${loginId}`,
      method: urlObj.method,
    });
  }

  getAllFAQs() {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.getAllFAQs
    );
  }
  saveFAQ(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.saveFAQ,
      data
    );
  }
  updateFAQ(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.updateFAQ,
      data
    );
  }
  deleteFAQ(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteFAQ;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${id}`,
      method: urlObj.method,
    });
  }
  getAllVariables() {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.getAllVariables
    );
  }
  getAllChecklistQuestions() {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.getAllChecklistQuestions
    );
  }
  saveVariable(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.saveVariable,
      data
    );
  }
  updateVariable(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.updateVariable,
      data
    );
  }
  deleteVariable(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteVariable;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${id}`,
      method: urlObj.method,
    });
  }
  getAllAppVersionList() {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.getAllAppVersionList
    );
  }
  gettfeedbacklist(pageNumber: number, filter: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.gettfeedbacklist;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${filter.orgId}/${filter.outletId}/${pageNumber}`,
      method: urlObj.method,
    });
  }
  saveAppVersion(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.saveAppVersion,
      data
    );
  }
  updateAppVersion(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.updateAppVersion,
      data
    );
  }

  searchOutletOrderList(data: any, page: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchOutletOrderList;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${[page]}`, method: urlObj.method },
      data
    );
  }
  getCurrentOutletOrdersCount() {
    const urlObj =
      this.apiConfigService.apiEndPointObj.getCurrentOutletOrdersCount;
    return this.apiHttpService.REQUEST({
      url: urlObj.url,
      method: urlObj.method,
    }, null, null, true);
  }

  getCurrentOutletOrdersList(orgId: any, cafeId: any, status: any, page: any, limit: number) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.getCurrentOutletOrdersList;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${page}/${limit}/${status}/${orgId}/${cafeId}`,
      method: urlObj.method,
    });
  }
  deleteOutletMenu(utletid: any, menuId: any) {
    console.log(menuId, 'menuId');
    const urlObj = this.apiConfigService.apiEndPointObj.deleteOutletMenu;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${utletid}/${menuId}`,
      method: urlObj.method,
    });
  }

  deleteOutletMasterMenu(menuId: any) {
    console.log(menuId, 'menuId');
    const urlObj = this.apiConfigService.apiEndPointObj.deleteOutletMasterMenu;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${menuId}`,
      method: urlObj.method,
    });
  }

  updateComplianceByAdmin(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateComplianceByAdmin;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      data
    );
  }

  updateProfileApproval(id: string, status: any, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateProfileApproval;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}/${status}`, method: urlObj.method },
      data
    );
  }
  createPdf(data: any) {
    console.log(data);
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.createPdf,
      data
    );
  }
  updateVenderComplianceByAdmin(id: string, data: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.updatevenderComplianceByAdmin;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      data
    );
  }

  B2B_addOrg(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_addOrg;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      payload,
      null,
      false,
      true
    );
  }

  B2B_org_update(payload: any, id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_org_update;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      payload,
      null,
      false,
      true
    );
  }
  B2B_org_updateOrglevelSubsidy(payload: any, id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_org_updateOrglevelSubsidy;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      payload,
      null,
      false,
      true
    );
  }
  B2B_org_updateCafelevelSubsidy(payload: any, id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_org_updateCafelevelSubsidy;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      payload,
      null,
      false,
      true
    );
  }

  B2B_fetchFilteredAllOrgs(data: any, page: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.B2B_fetchFilteredAllOrgs;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${page}`, method: urlObj.method },
      data,
      null,
      false,
      true
    );
  }
  updateOrgComplianceByAdmin(id: string, data: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.updateOrgComplianceByAdmin;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      data
    );
  }
  searchVendorByOrgId(searchObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchVendorByOrgId;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: 'POST' },
      searchObj
    );
  }
  searchVendorFirmByOrgId(searchObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchVendorFirmByOrgId;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: 'POST' },
      searchObj
    );
  }
  searchOutletByOrgId(searchObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchOutletByOrgId;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: 'POST' },
      searchObj
    );
  }

  vendorTransactionHistory(vendorFirmId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.vendorTransactionHistory;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${vendorFirmId}`, method: urlObj.method, });
  }
  searchOutletByCafeId(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchOutletByCafeId;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
    );
  }

  lastsevendaysorderdaywisecount(searchObj: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.lastsevendaysorderdaywisecount;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: 'POST' },
      searchObj
    );
  }
  getServerLogs(fileName: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.serverlogs;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${fileName}`, method: urlObj.method },
      null,
      { Accept: 'text/html' },
      true
    );
  }
  getDayRangeBasedLogs(startDate: any, endDate: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getDayRangeBasedLogs;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${startDate}` + `/${endDate}`,
      method: urlObj.method,
    });
  }
  getTimeBasedLogs(hour: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getTimeBasedLogs;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${hour}`,
      method: urlObj.method,
    });
  }
  getLineBasedLogs(lineLimit: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getLineBasedLogs;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${lineLimit}`,
      method: urlObj.method,
    });
  }

  getDayRangeBasedAuditLogs(startDate: any, endDate: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.getDayRangeBasedAuditLogs;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${startDate}` + `/${endDate}`,
      method: urlObj.method,
    });
  }
  getTimeBasedAuditLogs(hour: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getTimeBasedAuditLogs;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${hour}`,
      method: urlObj.method,
    });
  }
  getLineBasedAuditLogs(lineLimit: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getLineBasedAuditLogs;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${lineLimit}`,
      method: urlObj.method,
    });
  }

  getEmployeeListByOrgId(orgId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getEmployeeListByOrgId;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${orgId}`,
      method: urlObj.method,
    });
  }


  getConsumptionOrderByOrgId(orgId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getConsumptionOrderByOrgId;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${orgId}`,
      method: urlObj.method,
    });
  }

  updateConsumptionMenu(orgId: any, cafeId: any, consumptionMenu: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateConsumptionMenu;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${orgId}` + `/${cafeId}`,
      method: urlObj.method,
    }, consumptionMenu);
  }

  updateConsumptionOrderStatus(orgId: any, cafeId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateConsumptionOrderStatus;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${orgId}` + `/${cafeId}`,
      method: urlObj.method,
    });
  }


  getFeedbackListByOrgId(orgId: any, page: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getFeedbackListByOrgId;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${orgId}/${page}`,
      method: urlObj.method,
    });
  }
  saveQuestion(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.saveQuestion,
      data
    );
  }
  updateChecklistQuestions(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.updateChecklistQuestions,
      data
    );
  }
  deletechecklistQuestion(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deletechecklistQuestion;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${id}`,
      method: urlObj.method,
    });
  }

  saveChecklistReport(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.saveChecklistReport,
      data
    );
  }

  getAllChecklistReports() {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.getAllChecklistReports
    );
  }
  updateChecklistReports(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.updateChecklistReports,
      data
    );
  }
  deletechecklistReport(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deletechecklistReport;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${id}`,
      method: urlObj.method,
    });
  }
  getReportHistoryByfilter(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.getReportHistoryByfilter,
      data
    );
  }
  getfeedbacklistByfilter(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.getfeedbacklistByfilter,
      data
    );
  }
  employeeAdd(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.employeeAdd,
      data
    );
  }
  createIncident(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.createIncident,
      data
    );
  }
  getAllIncidents() {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.getAllIncidents
    );
  }
  getIncidentsByDateAndFilters(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.getIncidentsByDateAndFilters,
      data, null, true
    );
  }
  updateIncident(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateIncident;
    return this.apiHttpService.REQUEST(
      {
        url: urlObj.url + `/${data._id}`,
        method: urlObj.method,
      },
      data
    );
  }
  deleteIncident(incidentId: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteIncident;

    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${incidentId}`,
      method: urlObj.method,
    });
  }
  updateOutletMenu(outletId: any, menuId: any, menuObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateOutletMenu;
    return this.apiHttpService.REQUEST(
      {
        url: urlObj.url + `/${outletId}` + `/${menuId}`,
        method: urlObj.method,
      },
      menuObj
    );
  }

  updateOutletMasterMenu(menuId: any, menuObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateOutletMasterMenu;
    return this.apiHttpService.REQUEST(
      {
        url: urlObj.url + `/${menuId}`,
        method: urlObj.method,
      },
      menuObj
    );
  }

  changeMenuActivation(outletId: any, menuId: any, menuObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.changeMenuActivation;
    return this.apiHttpService.REQUEST(
      {
        url: urlObj.url + `/${outletId}` + `/${menuId}`,
        method: urlObj.method,
      },
      menuObj
    );
  }

  changeMasterMenuActivation(menuId: any, menuObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.changeMasterMenuActivation;
    return this.apiHttpService.REQUEST(
      {
        url: urlObj.url + `/${menuId}`,
        method: urlObj.method,
      },
      menuObj
    );
  }
  getDashboardCounts(searchObj: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.getDashboardCounts,
      searchObj
    );
  }
  getChartData(searchObj: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.getChartData,
      searchObj
    );
  }

  addGuestEmployeeList(guestEmployeeList: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.addGuestEmployeeList;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      guestEmployeeList
    );
  }
  getGuestEmployeelistByOrgId(orgId: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.getGuestEmployeelistByOrgId;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${orgId}`,
      method: urlObj.method,
    });
  }
  deleteGuestEmployee(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteGuestEmployee;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${id}`,
      method: urlObj.method,
    });
  }
  updateGuestEmployee(id: any, employeeObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateGuestEmployee;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      employeeObj
    );
  }

  B2B_fetchBulkMenu(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_fetchBulkMenu;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      null,
      null,
      false,
      true
    );
  }

  B2B_saveBulkMenu(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_updateBulkMenu;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      data,
      null,
      false,
      true
    );
  }

  B2B_fetchIndividualMenu(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_fetchIndividualMenu;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      null,
      null,
      false,
      true
    );
  }

  B2B_saveIndMenu(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_updateIndMenu;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      data,
      null,
      false,
      true
    );
  }

  B2B_fetchBulkSnacksMenu(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_fetchBulkSnacksMenu;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      null,
      null,
      false,
      true
    );
  }

  B2B_Bulk_SnackMenuAdd(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_Bulk_SnackMenuAdd;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      data,
      null,
      false,
      true
    );
  }

  B2B_fetchIndSnacksMenu(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_fetchIndSnacksMenu;
    console.log(urlObj, '------');
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      null,
      null,
      false,
      true
    );
  }

  B2B_Ind_SnackMenuAdd(data: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.B2B_updateIndividualSnacksMenu;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      data,
      null,
      false,
      true
    );
  }

  B2B_saveSnackBoxMenu(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_saveSnackBoxMenu;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      data,
      null,
      false,
      true
    );
  }

  B2B_snackBoxMenuFetch(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_snackBoxMenuFetch;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      null,
      null,
      false,
      true
    );
  }

  B2B_customSnackBoxMenuFetch(id: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.B2B_customSnackBoxMenuFetch;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      null,
      null,
      false,
      true
    );
  }

  B2B_saveCustomSnackBoxMenu(data: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.B2B_saveCustomSnackBoxMenu;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      data,
      null,
      false,
      true
    );
  }
  updateB2BfoodItem(item: any, id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateB2BfoodItem;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      item,
      null,
      false,
      true
    );
  }

  getAllB2BFooditems() {
    const urlObj = this.apiConfigService.apiEndPointObj.getAllB2BFooditems;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      null,
      null,
      false,
      true
    );
  }

  deleteB2BFoodItem(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteB2BFoodItem;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      null,
      null,
      false,
      true
    );
  }
  performBulkOrderTransfer(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.performBulkOrderTransfer,
      data
    );
  }
  performBulkDailyOrderTransfer(data: any) {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.performBulkDailyOrderTransfer,
      data
    );
  }
  addEmployeeList(employeeList: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.addEmployeeList;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      employeeList
    );
  }
  addConsumptionOrderList(consumptionOrder: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.addConsumptionOrderList;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      consumptionOrder
    );
  }
  deleteEmployee(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteEmployee;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${id}`,
      method: urlObj.method,
    });
  }
  updateEmployee(id: any, employeeObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateEmployee;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      employeeObj
    );
  }
  searchBulkOrderList(data: any, page: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchBulkOrderList;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${page}`, method: urlObj.method },
      data
    );
  }
  generateInvoice(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.generateInvoice;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${id}`,
      method: urlObj.method,
    });
  }
  changePackageStatus(status: any, mealId: any, orgId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.changePackageStatus;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${mealId}` + `/${orgId}`, method: urlObj.method },
      { status }
    );
  }
  getMealAweOutletById(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getMealAweOutletById;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${id}`,
      method: urlObj.method,
    });
  }

  setOutletOpenedStatus(id: any, status: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.setOutletOpenedStatus;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${id}` + `/${status}`,
      method: urlObj.method,
    });
  }

  getCurrentPackageOrdersList(status: any, page: any, limit: number) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.getCurrentPackageOrdersList;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${page}/${limit}/${status}`,
      method: urlObj.method,
    });
  }
  getMealPackageList() {
    return this.apiHttpService.REQUEST(
      this.apiConfigService.apiEndPointObj.getMealPackageList
    );
  }
  saveMealPackage(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.saveMealPackage;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      data
    );
  }
  saveMealAweOutlet(outlet: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.saveMealAweOutlet;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      outlet
    );
  }

  updateMealAweOutlet(id: any, outlet: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateMealAweOutlet;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${id}`, method: urlObj.method },
      outlet
    );
  }
  B2BFetchWeeklyMenu(orgId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2BFetchWeeklyMenu;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${orgId}`,
      method: urlObj.method,
    });
  }
  updateWeeklyMenuItem(menuObj: any, orgId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateWeeklyMenuItem;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url + `/${orgId}`, method: urlObj.method },
      menuObj
    );
  }
  updateBulkB2BDailyFoodOrder(order: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.updateBulkB2BDailyFoodOrder;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      order
    );
  }
  B2BweeklyMenuAdd(menuObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2BweeklyMenuAdd;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      menuObj
    );
  }
  getGeneralAppFeeback(page?: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getGeneralAppFeeback;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${page}`,
      method: urlObj.method,
    });
  }

  getGeneralAppFeebackCount(acknowledged?: boolean) {
    const urlObj = this.apiConfigService.apiEndPointObj.getGeneralAppFeebackCount;
    let params = new HttpParams();

    if (acknowledged !== undefined) {
      params = params.set('acknowledged', String(acknowledged));
    }

    return this.apiHttpService.REQUEST({
      url: `${urlObj.url}?${params}`,
      method: urlObj.method,
    });
  }

  feedbackacknowledge(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.feedbackacknowledge;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${id}`,
      method: urlObj.method,
    });
  }
  getAdminDailyBulkOrders(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getAdminDailyBulkOrders;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      payload
    );
  }
  getAdminEmpPolls(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getAdminEmpPolls;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      payload
    );
  }
  getOrgEmployeePollingList(payload: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.getOrgEmployeePollingList;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      payload
    );
  }
  orgMealPackages(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.orgMealPackages;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      payload
    );
  }
  getBulkDailyBillingDetails(payload: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.getBulkDailyBillingDetails;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      payload
    );
  }
  getAdminPastOrders(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getAdminPastOrders;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      payload
    );
  }
  B2B_fooditemAdd(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.B2B_fooditem;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      payload,
      null,
      false,
      true
    );
  }
  getb2bBulkOrderList(status: any, page: any, limit: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getb2bBulkOrderList;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${page}/${limit}/${status}`,
      method: urlObj.method,
    });
  }
  getb2bBulkDailyOrderList(status: any, page: any, limit: number) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.getb2bBulkDailyOrderList;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${page}/${limit}/${status}`,
      method: urlObj.method,
    });
  }

  updateb2bFoodOrder(order: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateb2bFoodOrder;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      order
    );
  }
  getCurrentB2BOrdersCount() {
    const urlObj =
      this.apiConfigService.apiEndPointObj.getCurrentB2BOrdersCount;
    return this.apiHttpService.REQUEST({
      url: urlObj.url,
      method: urlObj.method,
    });
  }

  getCurrentB2BDailyOrdersCount() {
    const urlObj =
      this.apiConfigService.apiEndPointObj.getCurrentB2BDailyOrdersCount;
    return this.apiHttpService.REQUEST({
      url: urlObj.url,
      method: urlObj.method,
    });
  }
  getCafeteriasPollingList(deliveryDate: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCafeteriasPollingList;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, deliveryDate);
  }
  getCafeteriaList() {
    const urlObj = this.apiConfigService.apiEndPointObj.getCafeteriaList;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method });
  }
  createOrderFromPollObj(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.createOrderFromPollObj;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, payload);
  }
  getDailyFoodOrdersCount() {
    const urlObj = this.apiConfigService.apiEndPointObj.getDailyFoodOrdersCount;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method });
  }
  fetchAllEnquiries() {
    const urlObj = this.apiConfigService.apiEndPointObj.fetchAllEnquiries;
    return this.apiHttpService.REQUEST({
      url: urlObj.url,
      method: urlObj.method,
    });
  }
  updateAllEnquiriesStatus(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateAllEnquiriesStatus;
    return this.apiHttpService.REQUEST({
      url: urlObj.url,
      method: urlObj.method,
    }, body);
  }
  getCurrentOutletOrdersListForGuest(orgId: string, cafeName: string, isSearchObj: boolean) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.getCurrentOutletOrdersListForGuest;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${orgId}/${cafeName}/${isSearchObj}`,
      method: urlObj.method,
    }, null, null, true, false);
  }

  getBulkOrderForChart(body: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.getBulkOrderForChart;
    return this.apiHttpService.REQUEST({
      url: urlObj.url,
      method: urlObj.method,
    }, body);
  }

  updateVendorDetails(outletId: any, body: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.updateVendorDetails;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${outletId}`,
      method: urlObj.method,
    }, body);
  }

  getVendorListByOutletId(outletId: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.getVendorListByOutletId;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${outletId}`,
      method: urlObj.method,
    });
  }

  outletEmployeeAdd(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.outletEmployeeAdd;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }

  addOutletEmployeeList(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.addOutletEmployeeList;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
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
  vcEmployeeAdd(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.vcEmployeeAdd;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }

  addVcEmployeeList(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.addVcEmployeeList;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }

  addEmployeeWalletList(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.addEmployeeWalletList;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
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
    const urlObj = this.apiConfigService.apiEndPointObj.fetchOutletOrdersbysearchObj;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }

  fetchConsumptionOrdersbysearchObj(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.fetchConsumptionOrdersbysearchObj;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  getStaticTotalCounts() {
    const urlObj = this.apiConfigService.apiEndPointObj.getStaticTotalCounts;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method });
  }
  getTotalCounts(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getTotalCounts;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  getTotalOrdersStatusWiseData(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getTotalOrdersStatusWiseData;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  getOrgTotalOrdersStatusWiseData(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getOrgTotalOrdersStatusWiseData;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  getTotalSubOrdersStatusWiseData(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getTotalSubOrdersStatusWiseData;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  getCustomerProfileList() {
    const urlObj = this.apiConfigService.apiEndPointObj.getCustomerProfileList;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method });
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
    const urlObj = this.apiConfigService.apiEndPointObj.getCustomerListByOrgId;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  updateOrderStatus(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateOrderStatus;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  updatePackageFoodOrder(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updatePackageFoodOrder;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  createDailyPackageOrder(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.createDailyPackageOrder;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  getOutletOrdersByCustomerId(id: any, page: any, limit: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getOutletOrdersByCustomerId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}/${page}/${limit}`, method: urlObj.method });
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
    const urlObj = this.apiConfigService.apiEndPointObj.checkUserWallet;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  fetchPastOutletOrdersbysearchObj(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.fetchPastOutletOrdersbysearchObj;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, payload);
  }
  fetchCompletedOutletOrdersbysearchObj(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.fetchCompletedOutletOrdersbysearchObj;
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
    const urlObj = this.apiConfigService.apiEndPointObj.getTotalCountsByOrgId;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  getBulkOrdersByDate(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getBulkOrdersByDate;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  saveVendorFirm(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.saveVendorFirm;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
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
    const urlObj = this.apiConfigService.apiEndPointObj.getAllVendorFirms;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method });
  }
  deleteUserFromAllList(phoneNo: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteUserFromAllList;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${phoneNo}`, method: urlObj.method });
  }
  fetchtOrgInfo(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.fetchtOrgInfo;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
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
    const urlObj = this.apiConfigService.apiEndPointObj.b2b_BulkCakeMenuAdd;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  b2b_updateBulkCakeMenu(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.b2b_updateBulkCakeMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  b2b_updateBulkLuxMenu(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.b2b_updateBulkLuxMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  b2b_updateBulkSweetMenu(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.b2b_updateBulkSweetMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  b2b_updatePredefinedSnackBox(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.b2b_updatePredefinedSnackBox;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  b2b_updateCustomizedSnackBox(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.b2b_updateCustomizedSnackBox;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
  fetchFoodOrderPackagebysearchObj(body: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.fetchFoodOrderPackagebysearchObj;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
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

  getAllImageGroupConfigs(page: number, pageSize: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getAllImageGroupConfigs;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${page}/${pageSize}`, method: urlObj.method });
  }

  getTotalVendorLedgerBalanceByFirm(vendorFirmId:any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getTotalVendorLedgerBalanceByFirm;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${vendorFirmId}`, method: urlObj.method });
  }

  getVendorTransactionByFirmAndTypeAndDate(body:any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getVendorTransactionByFirmAndTypeAndDate;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }

  creditOrDebitVendorWallet(body:any) {
    const urlObj = this.apiConfigService.apiEndPointObj.creditOrDebitVendorWallet;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, body);
  }
}
