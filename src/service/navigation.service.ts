import { Injectable } from '@angular/core';
import { SuggestionsFeedbackService } from '@service/suggestions-feedback.service';
import { PermissionsService } from '@service/permission.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  unAcknowledgedFeedbackCount$ = this.suggestionsFeedbackService.GeneralAppFeedbackCount$;
  enquiryCount$ = this.suggestionsFeedbackService.enquiryCount$;
  inReviewIncidentsCount$ = this.suggestionsFeedbackService.incidentCount$;

  deskDineOptions: any = [
    { name: 'Home', showParent: true, route: 'home', matIcon: 'home', permissionKey: 'home:read' },
    { name: 'Dashboard', showParent: true, route: 'organization-dashboard', matIcon: 'dashboard', permissionKey: 'dashboard:read' },
    { name: 'Org Dashboard', showParent: true, route: 'dashboard', matIcon: 'bar_chart', permissionKey: 'dashboard:read' },
    { name: 'Orders Dashboard', showParent: true, route: 'orders-dashboard', matIcon: 'shopping_cart', permissionKey: 'reports:read' },
    { name: 'Organization', showParent: true, route: 'organization', matIcon: 'corporate_fare', permissionKey: 'organization:read' },
    {
      name: 'Outlet', showParent: true, matIcon: 'store', permissionKey: 'outlet:read', children: [
        { name: 'Search Outlet', route: 'outlet', showChild: true, matIcon: 'search' },
        { name: 'Outlet Master Menu', route: 'outlet-master-menu', showChild: true, matIcon: 'menu_book' }
      ]
    },
    {
      name: 'Orders', showParent: true, matIcon: 'receipt_long', permissionKey: 'order:read', children: [
        { name: 'Outlet Orders', route: 'currentOutletOrder', showChild: true, matIcon: 'pending_actions' },
        { name: 'Other Orders', route: 'otherOrder', showChild: true, matIcon: 'list_alt' },
        { name: 'Search Order', route: 'searchOrder', showChild: true, matIcon: 'manage_search' },
      ]
    },
    { name: 'Event Popup', showParent: true, route: 'event-popup', matIcon: 'campaign', permissionKey: 'reports:read' },
    { name: 'Vendor Firm', showParent: true, route: 'vendor-firm', matIcon: 'business', permissionKey: 'vendor:read' },
    { name: 'Vendor', showParent: true, route: 'vendor', matIcon: 'person_search', permissionKey: 'vendor:read' },
    { name: 'Session Management', showParent: true, route: 'sessionManagement', matIcon: 'manage_accounts', permissionKey: 'session:read' },
    { name: 'Notifications', showParent: true, route: 'notifications', matIcon: 'notifications', permissionKey: 'notification:read' },
    { name: 'Vendor Wallet Dashboard', showParent: true, route: 'vendorWalletDashboard', matIcon: 'account_balance_wallet', permissionKey: 'wallet:read' },
    { name: 'Vendor Payout', showParent: true, route: 'vendorPayout', matIcon: 'payments', permissionKey: 'payout:read' },
    { name: 'Users', showParent: true, route: 'customer', matIcon: 'people', permissionKey: 'users:read' },
    { name: 'Billing', showParent: true, route: 'billing', matIcon: 'receipt', permissionKey: 'billing:read' },
    { name: 'Bulk Master Menu', showParent: true, route: 'bulkMasterMenu', matIcon: 'restaurant_menu', permissionKey: 'menu:read' },
    { name: 'Incident Reporting', showParent: true, showBadge: true, count: this.inReviewIncidentsCount$, route: 'orgIncidentManagement', matIcon: 'report_problem', permissionKey: 'incident:read' },
    {
      name: 'CheckList', showParent: true, matIcon: 'checklist', permissionKey: 'checklist:read', children: [
        { name: 'View Checklist', route: 'viewChecklistQuestion', showChild: true, matIcon: 'visibility' },
        { name: 'Submit CheckList', route: 'submitChecklist', showChild: true, matIcon: 'task_alt' },
        { name: 'Checklist History', route: 'checklistHistory', showChild: true, matIcon: 'history' }
      ]
    },
    { name: 'Reviews', route: 'orgReviews', matIcon: 'star_rate', permissionKey: 'reports:read' },
    { name: 'Feedback', showBadge: true, count: this.unAcknowledgedFeedbackCount$, route: 'appFeedbacks', matIcon: 'rate_review', permissionKey: 'reports:read' },
    { name: 'Enquiries', showBadge: true, count: this.enquiryCount$, route: 'viewEnquiries', matIcon: 'contact_support', permissionKey: 'reports:read' },
    {
      name: 'Roles & Permissions', showParent: true, matIcon: 'admin_panel_settings', route: 'rbac-management', permissionKey: 'role:read'
    },
    { name: 'Admin', route: 'admin', showParent: true, matIcon: 'admin_panel_settings', permissionKey: 'admin:read' },
    {
      name: 'Miscelleneous', showParent: true, matIcon: 'miscellaneous_services', permissionKey: 'config:read', children: [
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
    { name: 'Home', showParent: true, route: 'home', matIcon: 'home', permissionKey: 'home:read' },
    { name: 'Dashboard', showParent: true, route: 'orgDashboard', matIcon: 'dashboard', permissionKey: 'dashboard:read' },
    { name: 'Consumption Orders', showParent: true, route: 'consumptionOrders', matIcon: 'shopping_bag', permissionKey: 'order:read' },
    { name: 'Menu Items', showParent: true, route: 'orgMenuItems', matIcon: 'restaurant_menu', permissionKey: 'menu:read' },
    { name: 'Outlet Orders', showParent: true, route: 'currentoutletOrder', matIcon: 'receipt_long', permissionKey: 'order:read' },
    { name: 'Admin Orders', showParent: true, route: 'orgAdminDailyOrder', matIcon: 'list_alt', permissionKey: 'order:read' },
    { name: 'Reviews', showParent: true, route: 'orgReviews', matIcon: 'star_rate', permissionKey: 'reports:read' },
    { name: 'Users', showParent: true, route: 'customer', matIcon: 'people', permissionKey: 'users:read' },
    { name: 'Vendor Info', showParent: true, route: 'orgVendorInfo', matIcon: 'business', permissionKey: 'vendor:read' },
    { name: 'Menu Counters', showParent: true, route: 'orgMenuCounters', matIcon: 'countertops', permissionKey: 'menu:read' },
    { name: 'Audit Report', showParent: true, route: 'auditReport', matIcon: 'fact_check', permissionKey: 'reports:read' },
    { name: 'Checklist', showParent: true, route: 'orgChecklist', matIcon: 'checklist', permissionKey: 'checklist:read' },
    { name: 'Employee List', showParent: true, route: 'orgEmployeeList', matIcon: 'badge', permissionKey: 'users:read' },
    { name: 'Employee Poll', showParent: true, route: 'orgEmpPoll', matIcon: 'poll', permissionKey: 'reports:read' },
    { name: 'Salary Deduction', showParent: true, route: 'orgSalaryDeduction', matIcon: 'money_off', permissionKey: 'reports:read' },
    { name: 'Billing', showParent: true, route: 'billing', matIcon: 'receipt', permissionKey: 'billing:read' }
  ];

  constructor(
    private suggestionsFeedbackService: SuggestionsFeedbackService,
    private permissionsService: PermissionsService
  ) { }

  getDeskDineOptions() {
    return this.filterOptions([...this.deskDineOptions]);
  }

  getOrgOptions() {
    return this.filterOptions([...this.orgOptions]);
  }

  private filterOptions(options: any[]): any[] {
    return options.filter(option => {
      // If bypass is on, hasPermission returns true, so everything shows.
      // Once bypass is off, it will filter based on actual DB permissions.
      if (option.permissionKey) {
        return this.permissionsService.hasPermission(option.permissionKey);
      }
      return true;
    });
  }
}
