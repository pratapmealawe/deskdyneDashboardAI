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
      createIncident: {
        url: `${this.baseUrl}/api/createIncident`,
        method: 'POST',
      },
      getAllIncidents: {
        url: `${this.baseUrl}/api/getAllIncidents`,
        method: 'GET',
      },
      getIncidentsByDateAndFilters: {
        url: `${this.baseUrl}/api/getIncidentsByDateAndFilters`,
        method: 'POST',
      },
      getIncidentById: {
        url: `${this.baseUrl}/api/getIncidentById`,
        method: 'GET',
      },
      updateIncident: {
        url: `${this.baseUrl}/api/updateIncident`,
        method: 'PUT',
      },
      deleteIncident: {
        url: `${this.baseUrl}/api/deleteIncident`,
        method: 'DELETE',
      },
      getfeedbacklistByfilter: {
        url: `${this.baseUrl}/api/getfeedbacklistByfilter`,
        method: 'POST',
      },
      updateOutletMenu: {
        url: `${this.baseUrl}/api/updateOutletMenu`,
        method: 'POST',
      },
      getGuestEmployeelistByOrgId: {
        url: `${this.baseUrl}/api/getGuestEmployeelist`,
        method: 'GET',
      },
      deleteGuestEmployee: {
        url: `${this.baseUrl}/api/deleteGuestEmployee`,
        method: 'DELETE',
      },
      updateGuestEmployee: {
        url: `${this.baseUrl}/api/updateGuestEmployee`,
        method: 'POST',
      },
      B2B_fetchBulkMenu: {
        url: `${this.baseUrl}/api/b2b_fetchBulkMenu`,
        method: 'GET',
      },
      B2B_updateBulkMenu: {
        url: `${this.baseUrl}/api/b2b_updateBulkMenu`,
        method: 'POST',
      },
      B2B_fetchIndividualMenu: {
        url: `${this.baseUrl}/api/b2b_fetchIndividualMenu`,
        method: 'GET',
      },
      B2B_updateIndMenu: {
        url: `${this.baseUrl}/api/b2b_updateIndMenu`,
        method: 'POST',
      },
      B2B_fetchBulkSnacksMenu: {
        url: `${this.baseUrl}/api/b2b_fetchBulkSnacksMenu`,
        method: 'GET',
      },
      B2B_Bulk_SnackMenuAdd: {
        url: `${this.baseUrl}/api/b2b_updateBulkSnacksMenu`,
        method: 'POST',
      },
      B2B_fetchIndSnacksMenu: {
        url: `${this.baseUrl}/api/b2b_fetchIndividualSnacksMenu`,
        method: 'GET',
      },
      B2B_updateIndividualSnacksMenu: {
        url: `${this.baseUrl}/api/b2b_updateIndividualSnacksMenu`,
        method: 'POST',
      },
      getAllB2BFooditems: {
        url: `${this.baseUrl}/api/getAllB2BFooditems`,
        method: 'GET',
      },
      deleteB2BFoodItem: {
        url: `${this.baseUrl}/api/deleteB2BFoodItem`,
        method: 'POST',
      },
      deleteFooditem: {
        url: `${this.baseUrl}/api/deleteFooditem`,
        method: 'POST',
      },
      performBulkOrderTransfer: {
        url: `${this.baseUrl}/api/performBulkOrderTransfer`,
        method: 'POST',
      },
      performBulkDailyOrderTransfer: {
        url: `${this.baseUrl}/api/performBulkDailyOrderTransfer`,
        method: 'POST',
      },
      addEmployeeList: {
        url: `${this.baseUrl}/api/addEmployeeList`,
        method: 'POST',
      },
      deleteEmployee: {
        url: `${this.baseUrl}/api/deleteEmployee`,
        method: 'DELETE',
      },
      updateEmployee: {
        url: `${this.baseUrl}/api/updateEmployee`,
        method: 'POST',
      },
      getMealAweOutletById: {
        url: `${this.baseUrl}/api/getMealAweOutletById`,
        method: 'GET',
      },
      updateMealAweOutlet: {
        url: `${this.baseUrl}/api/updateMealAweOutlet`,
        method: 'POST',
      },
      setOutletOpenedStatus: {
        url: `${this.baseUrl}/api/outletOpenedStatus`,
        method: 'PUT',
      },
      generateInvoice: {
        url: `${this.baseUrl}/api/generateInvoice`,
        method: 'GET',
      },
      changePackageStatus: {
        url: `${this.baseUrl}/api/changePackageStatus`,
        method: 'POST',
      },
      getMealPackageList: {
        url: `${this.baseUrl}/api/getMealPackageList`,
        method: 'GET',
      },
      saveMealPackage: {
        url: `${this.baseUrl}/api/saveMealPackage`,
        method: 'POST',
      },
      B2BFetchWeeklyMenu: {
        url: `${this.baseUrl}/api/B2BFetchWeeklyMenu`,
        method: 'GET',
      },
      updateWeeklyMenuItem: {
        url: `${this.baseUrl}/api/updateWeeklyMenuItem`,
        method: 'POST',
      },
      updateBulkB2BDailyFoodOrder: {
        url: `${this.baseUrl}/api/updateBulkB2BDailyFoodOrder`,
        method: 'POST',
      },
      B2BweeklyMenuAdd: {
        url: `${this.baseUrl}/api/B2BweeklyMenuAdd`,
        method: 'POST',
      },
      getGeneralAppFeeback: {
        url: `${this.baseUrl}/api/getGeneralAppFeeback`,
        method: 'GET',
      },
      feedbackacknowledge: {
        url: `${this.baseUrl}/api/feedbackacknowledge`,
        method: 'PUT',
      },
      getAdminDailyBulkOrders: {
        url: `${this.baseUrl}/api/getAdminDailyBulkOrders`,
        method: 'POST',
      },
      orgMealPackages: {
        url: `${this.baseUrl}/api/orgMealPackages`,
        method: 'POST',
      },
      getAdminEmpPolls: {
        url: `${this.baseUrl}/api/getAdminEmpPolls`,
        method: 'POST',
      },
      getOrgEmployeePollingList: {
        url: `${this.baseUrl}/api/getOrgEmployeePollingList`,
        method: 'POST',
      },
      getAdminPastOrders: {
        url: `${this.baseUrl}/api/getAdminPastOrders`,
        method: 'POST',
      },
      B2B_fooditem: { url: `${this.baseUrl}/api/B2B_fooditem`, method: 'POST' },
      updateB2BfoodItem: {
        url: `${this.baseUrl}/api/updateB2BfoodItem`,
        method: 'POST',
      },
      getb2bBulkOrderList: {
        url: `${this.baseUrl}/api/getb2bBulkOrderList`,
        method: 'POST',
      },
      getb2bBulkDailyOrderList: {
        url: `${this.baseUrl}/api/getb2bBulkDailyOrderList`,
        method: 'POST',
      },
      getCurrentB2BOrdersCount: {
        url: `${this.baseUrl}/api/getCurrentB2BOrdersCount`,
        method: 'GET',
      },
      updateb2bFoodOrder: {
        url: `${this.baseUrl}/api/updateb2bFoodOrder`,
        method: 'POST',
      },
      createOrderFromPollObj: {
        url: `${this.baseUrl}/api/createOrderFromPollObj`,
        method: 'POST',
      },
      fetchAllEnquiries: {
        url: `${this.baseUrl}/api/fetchAllEnquiries`,
        method: 'GET',
      },
      getDashboardCounts: {
        url: `${this.baseUrl}/api/getDashboardCounts`,
        method: 'POST',
      },
      getMenuItemsChartData: {
        url: `${this.baseUrl}/api/getMenuItemsChartData`,
        method: 'POST',
      },
    };
  }
}
