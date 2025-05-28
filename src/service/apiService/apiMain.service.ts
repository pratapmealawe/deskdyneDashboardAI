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
  searchOutletByOrgId(searchObj: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchOutletByOrgId;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: 'POST' },
      searchObj
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
      data
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
    const urlObj =
      this.apiConfigService.apiEndPointObj.getCafeteriasPollingList;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      deliveryDate
    );
  }
  createOrderFromPollObj(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.createOrderFromPollObj;
    return this.apiHttpService.REQUEST(
      { url: urlObj.url, method: urlObj.method },
      payload
    );
  }
  fetchAllEnquiries() {
    const urlObj = this.apiConfigService.apiEndPointObj.fetchAllEnquiries;
    return this.apiHttpService.REQUEST({
      url: urlObj.url,
      method: urlObj.method,
    });
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

  outletEmployeeAdd(body:any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.outletEmployeeAdd;
    return this.apiHttpService.REQUEST({
      url: urlObj.url,
      method: urlObj.method,
    }, body);
  }

  addOutletEmployeeList(body:any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.addOutletEmployeeList;
    return this.apiHttpService.REQUEST({
      url: urlObj.url,
      method: urlObj.method,
    }, body);
  }
  
  outletEmployeeByOrgId(orgId: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.outletEmployeeByOrgId;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${orgId}`,
      method: urlObj.method,
    });
  }

  deleteOutletEmployee(id: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.deleteOutletEmployee;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${id}`,
      method: urlObj.method,
    });
  }

  getOutletEmployeeByPhoneNo(phoneNo: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.getOutletEmployeeByPhoneNo;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${phoneNo}`,
      method: urlObj.method,
    });
  }

  updateOutletEmployee(id: any, body: any) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.updateOutletEmployee;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${id}`,
      method: urlObj.method,
    }, body);
  }
}
