import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  private baseUrl: string = environment.serverUrl;

  apiEndPointObj: any;
  constructor() {
    this.init();
  }
  private init() {
    this.apiEndPointObj = {
      loginAdmin: {
        url: `${this.baseUrl}/authadmin/loginAdmin`,
        method: 'POST',
      },
      verifyOTP: { url: `${this.baseUrl}/authadmin/verifyOTP`, method: 'POST' },
      logout: { url: `${this.baseUrl}/authadmin/logout`, method: 'GET' },
      fetchAllOutlets: {
        url: `${this.baseUrl}/api/fetchAllOutlets`,
        method: 'GET',
      },
      getOrgList: { url: `${this.baseUrl}/api/getOrgList`, method: 'GET' },
      saveOutlet: { url: `${this.baseUrl}/api/saveOutlet`, method: 'POST' },
      updateCategories: {
        url: `${this.baseUrl}/api/updateCategories`,
        method: 'POST',
      },
      updateOutlet: { url: `${this.baseUrl}/api/updateOutlet`, method: 'POST' },
      updateOutletNoImages: {
        url: `${this.baseUrl}/api/updateOutletNoImages`,
        method: 'POST',
      },
      fetchCategories: {
        url: `${this.baseUrl}/api/fetchCategories`,
        method: 'GET',
      },
      saveCategories: {
        url: `${this.baseUrl}/api/saveCategories`,
        method: 'POST',
      },
      saveVendor: { url: `${this.baseUrl}/api/saveVendor`, method: 'POST' },
      getAllVendors: {
        url: `${this.baseUrl}/api/getAllVendors`,
        method: 'GET',
      },
      getOutletByCafeteria: {
        url: `${this.baseUrl}/api/getOutletByCafeteria`,
        method: 'GET',
      },
      getAllPolicy: { url: `${this.baseUrl}/api/getAllPolicy`, method: 'GET' },
      addPolicy: { url: `${this.baseUrl}/api/addPolicy`, method: 'POST' },
      updatePolicy: { url: `${this.baseUrl}/api/updatePolicy`, method: 'POST' },
      deletePolicy: {
        url: `${this.baseUrl}/api/deletePolicy`,
        method: 'DELETE',
      },
      deleteVendor: {
        url: `${this.baseUrl}/api/deleteVendor`,
        method: 'DELETE',
      },
      searchVendor: { url: `${this.baseUrl}/api/searchVendor`, method: 'POST' },
      searchAdmin: { url: `${this.baseUrl}/api/searchAdmin`, method: 'POST' },
      updateVendor: { url: `${this.baseUrl}/api/updateVendor`, method: 'POST' },
      searchOutlet: { url: `${this.baseUrl}/api/searchOutlet`, method: 'POST' },
      adminProfile: { url: `${this.baseUrl}/api/adminProfile`, method: 'POST' },
      getAdminProfileList: {
        url: `${this.baseUrl}/api/getAdminProfileList`,
        method: 'GET',
      },
      getadminprofile: {
        url: `${this.baseUrl}/api/getadminprofile`,
        method: 'GET',
      },
      updateadminprofile: {
        url: `${this.baseUrl}/api/updateadminprofile`,
        method: 'POST',
      },
      getAllFAQs: { url: `${this.baseUrl}/api/getAllFAQs`, method: 'GET' },
      saveFAQ: { url: `${this.baseUrl}/api/saveFAQ`, method: 'POST' },
      updateFAQ: { url: `${this.baseUrl}/api/updateFAQ`, method: 'POST' },
      deleteFAQ: { url: `${this.baseUrl}/api/deleteFAQ`, method: 'DELETE' },
      getAllVariables: {
        url: `${this.baseUrl}/api/getAllVariables`,
        method: 'GET',
      },
      saveVariable: { url: `${this.baseUrl}/api/saveVariable`, method: 'POST' },
      updateVariable: {
        url: `${this.baseUrl}/api/updateVariable`,
        method: 'POST',
      },
      deleteVariable: {
        url: `${this.baseUrl}/api/deleteVariable`,
        method: 'DELETE',
      },
      getAllAppVersionList: {
        url: `${this.baseUrl}/api/getAllAppVersionList`,
        method: 'GET',
      },
      saveAppVersion: {
        url: `${this.baseUrl}/api/saveAppVersion`,
        method: 'POST',
      },
      updateAppVersion: {
        url: `${this.baseUrl}/api/updateAppVersion`,
        method: 'POST',
      },
      searchOutletOrderList: {
        url: `${this.baseUrl}/api/searchOutletOrderList`,
        method: 'POST',
      },
      getCurrentOutletOrdersCount: {
        url: `${this.baseUrl}/api/getCurrentOutletOrdersCount`,
        method: 'GET',
      },
      getCurrentOutletOrdersList: {
        url: `${this.baseUrl}/api/getCurrentOutletOrdersList`,
        method: 'GET',
      },
      gettfeedbacklist: {
        url: `${this.baseUrl}/api/getFeedbackListOutletById`,
        method: 'GET',
      },
      deleteOutletMenu: {
        url: `${this.baseUrl}/api/deleteOutletMenu`,
        method: 'DELETE',
      },
      updateComplianceByAdmin: {
        url: `${this.baseUrl}/api/updateComplianceByAdmin`,
        method: 'POST',
      },
      updateProfileApproval: {
        url: `${this.baseUrl}/api/updateProfileApproval`,
        method: 'POST',
      },
      createPdf: { url: `${this.baseUrl}/api/pdfs/createPdf`, method: 'POST' },
      updatevenderComplianceByAdmin: {
        url: `${this.baseUrl}/api/updatevenderComplianceByAdmin`,
        method: 'POST',
      },
      B2B_addOrg: {
        url: `${this.baseUrl}/api/b2b_organization`,
        method: 'POST',
      },
      B2B_org_update: {
        url: `${this.baseUrl}/api/b2b_org_update`,
        method: 'POST',
      },
      B2B_fetchFilteredAllOrgs: {
        url: `${this.baseUrl}/api/B2B_fetchFilteredAllOrgs`,
        method: 'POST',
      },
      updateOrgComplianceByAdmin: {
        url: `${this.baseUrl}/api/updateOrgComplianceByAdmin`,
        method: 'POST',
      },
      searchVendorByOrgId: {
        url: `${this.baseUrl}/api/searchVendorByOrgId`,
        method: 'POST',
      },
      searchOutletByOrgId: {
        url: `${this.baseUrl}/api/searchOutletByOrgId`,
        method: 'POST',
      },
      lastsevendaysorderdaywisecount: {
        url: `${this.baseUrl}/api/lastsevendaysorderdaywisecount`,
        method: 'POST',
      },
      serverlogs: { url: `${this.baseUrl}/public/serverlogs`, method: 'GET' },
      getDayRangeBasedLogs: {
        url: `${this.baseUrl}/utility/getDayRangeBasedLogs`,
        method: 'GET',
      },
      getTimeBasedLogs: {
        url: `${this.baseUrl}/utility/getTimeBasedLogs`,
        method: 'GET',
      },
      getLineBasedLogs: {
        url: `${this.baseUrl}/utility/getLineBasedLogs`,
        method: 'GET',
      },
      getEmployeeListByOrgId: {
        url: `${this.baseUrl}/api/getEmployeeListByOrgId`,
        method: 'GET',
      },
      employeeAdd: {
        url: `${this.baseUrl}/api/employeeAdd`,
        method: 'POST',
      },
      getFeedbackListByOrgId: {
        url: `${this.baseUrl}/api/getFeedbackListByOrgId`,
        method: 'GET',
      },
      getAllChecklistQuestions: {
        url: `${this.baseUrl}/api/getAllChecklistQuestions`,
        method: 'GET',
      },
      saveQuestion: {
        url: `${this.baseUrl}/api/saveChecklistQuestion`,
        method: 'POST',
      },
      updateChecklistQuestions: {
        url: `${this.baseUrl}/api/updateChecklistQuestions`,
        method: 'POST',
      },
      deletechecklistQuestion: {
        url: `${this.baseUrl}/api/deletechecklistQuestion`,
        method: 'DELETE',
      },
      saveChecklistReport: {
        url: `${this.baseUrl}/api/saveChecklistReport`,
        method: 'POST',
      },
      getAllChecklistReports: {
        url: `${this.baseUrl}/api/getAllChecklistReports`,
        method: 'GET',
      },
      updateChecklistReports: {
        url: `${this.baseUrl}/api/updateChecklistQuestions`,
        method: 'POST',
      },
      deletechecklistReport: {
        url: `${this.baseUrl}/api/deleteOutletMenu`,
        method: 'DELETE',
      },
      getReportHistoryByfilter: {
        url: `${this.baseUrl}/api/getReportHistoryByfilter`,
        method: 'POST',
      },
    };
  }
}
