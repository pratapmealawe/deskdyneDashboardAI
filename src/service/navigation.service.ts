import { Injectable } from '@angular/core';
import { SuggestionsFeedbackService } from '@service/suggestions-feedback.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  unAcknowledgedFeedbackCount$ = this.suggestionsFeedbackService.GeneralAppFeedbackCount$;
  enquiryCount$ = this.suggestionsFeedbackService.enquiryCount$;
  inReviewIncidentsCount$ = this.suggestionsFeedbackService.incidentCount$;

  deskDineOptions: any = [
    { name: 'Home', showParent: true, route: 'home', matIcon: 'home' },
    { name: 'Dashboard', showParent: true, route: 'organization-dashboard', matIcon: 'dashboard' },
    { name: 'Org Dashboard', showParent: true, route: 'dashboard', matIcon: 'bar_chart' },
    { name: 'Orders Dashboard', showParent: true, route: 'orders-dashboard', matIcon: 'shopping_cart' },
    { name: 'Organization', showParent: true, route: 'organization', matIcon: 'corporate_fare' },
    {
      name: 'Outlet', showParent: true, matIcon: 'store', children: [
        { name: 'Search Outlet', route: 'outlet', showChild: true, matIcon: 'search' },
        { name: 'Outlet Master Menu', route: 'outlet-master-menu', showChild: true, matIcon: 'menu_book' }
      ]
    },
    { name: 'Event Popup', showParent: true, route: 'event-popup', matIcon: 'campaign' },
    { name: 'Vendor Firm', showParent: true, route: 'vendor-firm', matIcon: 'business' },
    { name: 'Vendor', showParent: true, route: 'vendor', matIcon: 'person_search' },
    {
      name: 'Outlet Orders', showParent: true, matIcon: 'receipt_long', children: [
        { name: 'Outlet Current Order', route: 'currentOrder', showChild: true, matIcon: 'pending_actions' },
        { name: 'Outlet Export Order', route: 'outletExcelExport', showChild: true, matIcon: 'file_download' }
      ]
    },
    {
      name: 'Other Orders', showParent: true, matIcon: 'list_alt', children: [
        { name: 'Current Order', route: 'otherOrder', showChild: true, matIcon: 'pending_actions' },
        { name: 'Search Order', route: 'searchOrder', showChild: true, matIcon: 'manage_search' },
      ]
    },
    { name: 'Session Management', showParent: true, route: 'sessionManagement', matIcon: 'manage_accounts' },
    { name: 'Notifications', showParent: true, route: 'notifications', matIcon: 'notifications' },
    { name: 'Vendor Wallet Dashboard', showParent: true, route: 'vendorWalletDashboard', matIcon: 'account_balance_wallet' },
    { name: 'Vendor Payout', showParent: true, route: 'vendorPayout', matIcon: 'payments' },
    { name: 'Users', showParent: true, route: 'customer', matIcon: 'group' },
    { name: 'Billing', showParent: true, route: 'billing', matIcon: 'receipt' },
    { name: 'Bulk Master Menu', showParent: true, route: 'bulkMasterMenu', matIcon: 'restaurant_menu' },
    { name: 'Incident Reporting', showParent: true, showBadge: true, count: this.inReviewIncidentsCount$, route: 'orgIncidentManagement', matIcon: 'report_problem', },
    {
      name: 'CheckList', showParent: true, matIcon: 'checklist', children: [
        { name: 'View Checklist', route: 'viewChecklistQuestion', showChild: true, matIcon: 'visibility' },
        { name: 'Submit CheckList', route: 'submitChecklist', showChild: true, matIcon: 'task_alt' },
        { name: 'Checklist History', route: 'checklistHistory', showChild: true, matIcon: 'history' }
      ]
    },
    { name: 'Reviews', route: 'orgReviews', matIcon: 'star_rate', },
    { name: 'Feedback', showBadge: true, count: this.unAcknowledgedFeedbackCount$, route: 'appFeedbacks', matIcon: 'rate_review', },
    { name: 'Enquiries', showBadge: true, count: this.enquiryCount$, route: 'viewEnquiries', matIcon: 'contact_support', },
    {
      name: 'Policy', showParent: true, matIcon: 'policy', children: [
        { name: 'Policy', route: 'policy', showChild: true, matIcon: 'gavel' },
        { name: 'Add Policy', route: 'addPolicy', showChild: true, matIcon: 'post_add' }
      ]
    },
    { name: 'Admin', route: 'admin', showParent: true, matIcon: 'admin_panel_settings' },
    {
      name: 'Miscelleneous', showParent: true, matIcon: 'miscellaneous_services', children: [
        { name: 'FAQ', route: 'faq', showChild: true, matIcon: 'help_outline' },
        { name: 'Config Images', route: 'configImages', showChild: true, matIcon: 'image' },
        { name: 'Config Group Images', route: 'configImagesGroup', showChild: true, matIcon: 'collections' },
        { name: 'Config Variables', route: 'configVariable', showChild: true, matIcon: 'tune' },
        { name: 'App Version Control', route: 'appVersionControl', showChild: true, matIcon: 'system_update' },
        { name: 'Server Logs', route: 'serverlogs', showChild: true, matIcon: 'terminal' }
      ]
    }
  ];

  orgOptions: any = [
    { name: 'Home', showParent: true, route: 'home', matIcon: 'home' },
    { name: 'Dashboard', showParent: true, route: 'orgDashboard', matIcon: 'dashboard' },
    { name: 'Consumption Orders', showParent: true, route: 'consumptionOrders', matIcon: 'shopping_bag' },
    { name: 'Menu Items', showParent: true, route: 'orgMenuItems', matIcon: 'restaurant_menu' },
    { name: 'Outlet Orders', showParent: true, route: 'outletExcelExport', matIcon: 'receipt_long' },
    { name: 'Admin Orders', showParent: true, route: 'orgAdminDailyOrder', matIcon: 'list_alt' },
    { name: 'Reviews', showParent: true, route: 'orgReviews', matIcon: 'star_rate' },
    { name: 'Users', showParent: true, route: 'customer', matIcon: 'group' },
    { name: 'Vendor Info', showParent: true, route: 'orgVendorInfo', matIcon: 'business' },
    { name: 'Menu Counters', showParent: true, route: 'orgMenuCounters', matIcon: 'countertops' },
    { name: 'Audit Report', showParent: true, route: 'auditReport', matIcon: 'fact_check' },
    { name: 'Checklist', showParent: true, route: 'orgChecklist', matIcon: 'checklist' },
    { name: 'Employee List', showParent: true, route: 'orgEmployeeList', matIcon: 'badge' },
    { name: 'Employee Poll', showParent: true, route: 'orgEmpPoll', matIcon: 'poll' },
    { name: 'Salary Deduction', showParent: true, route: 'orgSalaryDeduction', matIcon: 'money_off' },
    { name: 'Billing', showParent: true, route: 'billing', matIcon: 'receipt' }
  ];

  constructor(private suggestionsFeedbackService: SuggestionsFeedbackService) { }

  getDeskDineOptions() {
    return [...this.deskDineOptions];
  }

  getOrgOptions() {
    return [...this.orgOptions];
  }
}
