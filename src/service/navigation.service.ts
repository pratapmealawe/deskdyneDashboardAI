import { Injectable } from '@angular/core';
import { SuggestionsFeedbackService } from 'src/service/suggestions-feedback.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  unAcknowledgedFeedbackCount$ = this.suggestionsFeedbackService.GeneralAppFeedbackCount$;
  enquiryCount$ = this.suggestionsFeedbackService.enquiryCount$;
  inReviewIncidentsCount$ = this.suggestionsFeedbackService.incidentCount$;

  deskDineOptions: any = [
    { name: 'Home', showParent: true, route: 'home', image: 'Dashbaord_white', imageblue: 'Dashbaord_blue' },
    { name: 'Dashboard', showParent: true, route: 'mainDashboard', image: 'Dashbaord_white', imageblue: 'Dashbaord_blue' },
    { name: 'Org Dashboard', showParent: true, route: 'dashboard', image: 'Dashbaord_white_1', imageblue: 'Organization_dashbaord_blue' },
    { name: 'Orders Dashboard', showParent: true, route: 'allOrders', image: 'Billing_white', imageblue: 'Billing_blue' },
    { name: 'Organization', showParent: true, route: 'b2bSearchOrg', image: 'Organization_white', imageblue: 'Organization_Blue' },
    {
      name: 'Outlet', showParent: true, image: 'Outlet_white', imageblue: 'Outlet_blue', children: [
        { name: 'Search Outlet', route: 'outlet', showChild: true },
        { name: 'Outlet Master Menu', route: 'outletMasterMenu', showChild: true }
      ]
    },
    {
      name: 'Event Popup', showParent: true, image: 'Outlet_white', imageblue: 'Outlet_blue', children: [
        { name: 'Search Event Popup', route: 'eventPopup', showChild: true },
        { name: 'Add Event Popup', route: 'addEventPopup', showChild: true, clearRunTimeStorage: ['OUTLET_EDIT'] }
      ]
    },
    { name: 'Vendor Firm', showParent: true, route: 'searchVendorFirm', image: 'Vendor firm_white', imageblue: 'Vendor firm_blue' },
    { name: 'Vendor', showParent: true, route: 'searchVendor', image: 'Vendor_white', imageblue: 'Vendor_blue' },
    {
      name: 'Outlet Orders', showParent: true, image: 'Outlet orders_white', imageblue: 'Outlet orders_blue', children: [
        { name: 'Outlet Current Order', route: 'currentOrder', showChild: true },
        { name: 'Outlet Export Order', route: 'outletExcelExport', showChild: true }
      ]
    },
    {
      name: 'Other Orders', showParent: true, image: 'Other orders_white', imageblue: 'Other orders_blue', children: [
        { name: 'Current Order', route: 'otherOrder', showChild: true },
        { name: 'Search Order', route: 'searchOrder', showChild: true },
        { name: 'Daily Admin Export Orders', route: 'dailyAdminExcelExport', showChild: true },
      ]
    },
    { name: 'Session Management', showParent: true, route: 'sessionManagement', image: 'Enquiries_white', imageblue: 'Enquiries_blue' },
    { name: 'Notifications', showParent: true, route: 'scheduledNotifications', image: 'Enquiries_white', imageblue: 'Enquiries_blue' },
    { name: 'Vendor Wallet Dashboard', showParent: true, route: 'vendorWalletDashboard', image: 'Users_white', imageblue: 'Users_blue' },
    { name: 'Vendor Payout', showParent: true, route: 'vendorPayout', image: 'Users_white', imageblue: 'Users_blue' },
    { name: 'Users', showParent: true, route: 'customer', image: 'Users_white', imageblue: 'Users_blue' },
    { name: 'Billing', showParent: true, route: 'billing', image: 'Billing_white', imageblue: 'Billing_blue' },
    { name: 'Food Items', showParent: true, route: 'foodItem', image: 'Food items_white', imageblue: 'Food items_blue' },
    {
      name: 'Incident Reporting',
      showParent: true,
      showBadge: true,
      count: this.inReviewIncidentsCount$,
      route: 'orgIncidentManagement',
      image: 'Incident reporting_white',
      imageblue: 'Incident reporting_blue',
    },
    {
      name: 'Audit Report',
      showParent: true,
      route: 'auditReport',
      image: 'Incident reporting_white',
      imageblue: 'Incident reporting_blue',
    },
    {
      name: 'CheckList', showParent: true, image: 'Checklist_white', imageblue: 'Checklist_blue', children: [
        { name: 'View Checklist', route: 'viewChecklistQuestion', showChild: true },
        { name: 'Submit CheckList', route: 'submitChecklist', showChild: true },
        { name: 'Checklist History', route: 'checklistHistory', showChild: true }
      ]
    },
    {
      name: 'Reviews',
      route: 'orgReviews',
      image: 'Reviews_white',
      imageblue: 'Reviews_blue',
    },
    {
      name: 'Feedback',
      showBadge: true,
      count: this.unAcknowledgedFeedbackCount$,
      route: 'appFeedbacks',
      image: 'Feedback_white',
      imageblue: 'Feedback_blue',
    },
    {
      name: 'Excel Export',
      showParent: true,
      route: 'excelExport',
      image: 'Excel reports_white',
      imageblue: 'Excel reports_blue',
    },
    {
      name: 'Enquiries',
      showBadge: true,
      count: this.enquiryCount$,
      route: 'viewEnquiries',
      image: 'Enquiries_white',
      imageblue: 'Enquiries_blue',
    },
    {
      name: 'Policy', showParent: true, image: 'Policy_white', imageblue: 'Policy_blue', children: [
        { name: 'Policy', route: 'policy', showChild: true },
        { name: 'Add Policy', route: 'addPolicy', showChild: true }
      ]
    },
    {
      name: 'Admin', showParent: true, image: 'Admin_white', imageblue: 'Admin_blue', children: [
        { name: 'Admin', route: 'admin', showChild: true },
        { name: 'Add Admin', route: 'addAdmin', showChild: true }
      ]
    },
    {
      name: 'Miscelleneous', showParent: true, image: 'Misc_white', imageblue: 'Misc_blue', children: [
        { name: 'FAQ', route: 'faq', showChild: true },
        { name: 'Config Images', route: 'configImages', showChild: true },
        { name: 'Config Group Images', route: 'configImagesGroup', showChild: true },
        { name: 'Config Variables', route: 'configVariable', showChild: true },
        { name: 'App Version Control', route: 'appVersionControl', showChild: true },
        { name: 'Server Logs', route: 'serverlogs', showChild: true }
      ]
    }
  ];

  orgOptions: any = [
    { name: 'Dashboard', showParent: true, route: 'orgDashboard', image: 'Dashbaord_white', imageblue: 'Dashbaord_blue' },
    { name: 'Consumption Orders', showParent: true, route: 'consumptionOrders', image: 'Users_white', imageblue: 'Users_blue' },
    { name: 'Menu Items', showParent: true, route: 'orgMenuItems', image: 'Food items_white', imageblue: 'Food items_blue' },
    { name: 'Outlet Orders', showParent: true, route: 'outletExcelExport', image: 'Other orders_white', imageblue: 'Other orders_blue' },
    { name: 'Admin Orders', showParent: true, route: 'dailyAdminExcelExport', image: 'Other orders_white', imageblue: 'Other orders_blue' },
    { name: 'Reviews', showParent: true, route: 'orgReviews', image: 'Reviews_white', imageblue: 'Reviews_blue' },
    { name: 'Users', showParent: true, route: 'customer', image: 'Users_white', imageblue: 'Users_blue' },
    { name: 'Vendor Info', showParent: true, route: 'orgVendorInfo', image: 'Vendor_white', imageblue: 'Vendor_blue' },
    { name: 'Menu Counters', showParent: true, route: 'orgMenuCounters', image: 'Food items_white', imageblue: 'Food items_blue' },
    { name: 'Audit Report', showParent: true, route: 'auditReport', image: 'Incident reporting_white', imageblue: 'Incident reporting_blue' },
    { name: 'Incident Management', showParent: true, route: 'orgIncidentManagement', image: 'Incident reporting_white', imageblue: 'Incident reporting_blue' },
    { name: 'Checklist', showParent: true, route: 'orgChecklist', image: 'Checklist_white', imageblue: 'Checklist_blue' },
    { name: 'Bulk Order History', showParent: true, route: 'orgBulkOrderHistory', image: 'Other orders_white', imageblue: 'Other orders_blue' },
    { name: 'Employee Poll', showParent: true, route: 'orgEmpPoll', image: 'Incident reporting_white', imageblue: 'Incident reporting_blue' },
    { name: 'Salary Deduction', showParent: true, route: 'orgSalaryDeduction', image: 'Billing_white', imageblue: 'Billing_blue' },
    { name: 'Billing', showParent: true, route: 'billing', image: 'Billing_white', imageblue: 'Billing_Blue' }
  ];

  constructor(private suggestionsFeedbackService: SuggestionsFeedbackService) { }

  getDeskDineOptions() {
    return [...this.deskDineOptions];
  }

  getOrgOptions() {
    return [...this.orgOptions];
  }
}
