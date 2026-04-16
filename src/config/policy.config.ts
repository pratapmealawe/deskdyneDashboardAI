/** Default shape for button_policies */
export const DEFAULT_BUTTON_POLICIES: Record<string, boolean> = {
  // EXISTING

  editOutlet: false,
  deleteOutlet: false,
  viewOutlet: false,
  addOutletCategory: false,

  addMenu: false,
  editMenu: false,
  deleteMenu: false,

  addVendor: false,
  editVendor: false,
  deleteVendor: false,

  addPolicy: false,
  editPolicy: false,
  deletePolicy: false,

  addAdmin: false,
  editAdmin: false,
  deleteAdmin: false,

  addOrganization: false,
  editOrganization: false,
  deleteOrganization: false,
  viewOrganization: false,

  bulkMenuSection: false,
  mealAweOutlet: false,
  b2bWeeklyMenu: false,

  employeeList: false,
  guestEmployeeList: false,

  organizationCompliance: false,

  addFaq: false,
  editFaq: false,
  deleteFaq: false,

  addVariable: false,
  editVariable: false,
  deleteVariable: false,

  addAppVersion: false,
  editAppVersion: false,
  deleteAppVersion: false,

  addChecklist: false,
  editChecklist: false,
  deleteChecklist: false,

  addFoodItem: false,
  editFoodItem: false,
  deleteFoodItem: false,

  feedbackAcknowledge: false,

  addIncident: false,
  editIncident: false,
  deleteIncident: false,

  addVendorFirm: false,
  editVendorFirm: false,
  deleteVendorFirm: false,

  addEvent: false,
  viewDeletedOrganizations: false,

  // ORGANIZATION
  submitMenuItem: false,
  submitOrders: false,
  submitReviews: false,
  submitUsers: false,
  exportPdf: false,
  exportExcel: false,
  bulkWallet: false,
  submitVendorInfo: false,
  submitMenuCounters: false,
  createAuditReport: false,
  createNewAuditReport: false,

  // ORDER DASHBOARD
  refreshOrders: false,
  doneAll: false,
  completeAll: false,
  paymentFailed: false,
  validatePayment: false,

  // B2B ORG
  restoreOrganization: false,
  // saveOrganization: false,
  cancelOrganization: false,
  updateOrganization: false,
  createOrganization: false,
  addCafeteria: false,
  addPoc: false,
  editCompliance: false,

  // MENU MANAGEMENT
  copyMenu: false,
  downloadMenu: false,
  addBulkMenu: false,
  addMenuToEmployee: false,
  addCategory: false,
  addMultipleEmployees: false,
  assignVendor: false,
  importMenu: false,
  addMenuItem: false,
  editMenuItem: false,
  updateMenu: false,
  cancelMenu: false,

  // EMPLOYEE
  addManualEmployee: false,
  downloadTemplate: false,
  addEmployee: false,
  importEmployee: false,
  addMultipleEmployeesToCompanyWallet: false,

  // OUTLET OPS
  createOutlet: false,
  setStandards: false,
  addMealTiming: false,

  // EVENT
  createEventOutlet: false,
  setEventStandards: false,
  addEventMealTiming: false,

  // VENDOR FIRM OPS
  viewVendorFirm: false,
  addWalletMoneyToVendorFirm: false,
  viewVendorFirmReport: false,

  // VENDOR OPS
  viewVendor: false,
  addWalletMoneyToVendor: false,
  viewVendorReport: false,
  addVendorAddress: false,
  addVendorOutlet: false,
  createVendor: false,

  // USER
  viewUsers: false,
  exportUsersExcel: false,
  exportUsersPdf: false,
  addWalletToUser: false,
  deleteUser: false,

  // PAYOUT
  viewVendorPaymentHistory: false,
  vendorTransfer: false,

  // FEEDBACK
  acknowledgeFeedback: false,
  exportFeedbackExcel: false,

  // ADMIN MGMT
  addAdminUser: false,
  editAdminUser: false,
  updateAdminUser: false
};

/** Default shape for route_policies */
export const DEFAULT_ROUTE_POLICIES: Record<string, boolean> = {
  home: false,
  outlet: false,

  vendor: false,
  searchVendor: false,
  addVendor: false,
  admin: false,
  addAdmin: false,
  faq: false,
  configVariable: false,
  appVersionControl: false,
  policy: false,
  addPolicy: false,
  currentOrder: false,
  searchOrder: false,
  dashboard: false,
  serverlogs: false,
  b2bAddorg: false,
  b2bSearchOrg: false,
  consumptionOrders: false,
  orgDashboard: true,
  orgMenuItems: true,
  orgOrders: true,
  orgPreOrders: true,
  orgSubcription: true,
  orgReviews: true,
  appFeedbacks: false,
  excelExport: false,
  orgReports: false,
  orgVendorInfo: false,
  orgMenuCounters: false,
  orgIncidentManagement: true,
  orgChecklist: true,
  orgEmpPoll: true,
  orgEmployeeList: false,
  orgBulkOrderHistory: true,
  orgManualOrders: true,
  orgBilling: true,
  orgSalaryDeduction: true,
  viewChecklistQuestion: false,
  submitChecklist: false,
  checklistHistory: false,
  foodItem: false,
  pastOrder: false,
  viewEnquiries: false,
  outletExcelExport: false,
  dailyAdminExcelExport: false,
  mainDashboard: false,
  customer: false,
  outletMasterMenu: false,
  addVendorFirm: false,
  searchVendorFirm: false,
  billing: true,
  otherOrder: false,
  configImages: false,
  configImagesGroup: false,
  vendorPayout: false,
  auditReport: false,
  eventPopup: false,
  vendorWalletDashboard: false,
  allOrders: false,
  scheduledNotifications: false,
  sessionManagement: false,
};

/** Default shape for tab_policies */
export const DEFAULT_TAB_POLICIES: Record<string, boolean> = {
  // dashboarsd
  Dashboard: true,
  menuItems: true,
  Orders: true,
  Reviews: true,
  User: true,
  vendorInfo: false,
  vendorInformation: false,
  menuCounters: false,
  auditReports: false,
  dashBoardAdminOrder: false,
  adminOrders: false,
  bulkOrders: false,
  employeePoll: false,
  salaryDeduction: false,
  outletBasicDetails: false,
  outletMenu: false,
  outletQrMenu: false,
  outletOrders: false,
  outletReviews: false,
  'outlet-details': false,
  'outlet-menu': false,
  'qr-menu': false,
  'outlet-orders': false,
  'outlet-feedback': false,
  eventBasicDetails: false,
  eventMenu: false,
  eventOrders: false,
  eventReviews: false,
  wallets: false,
  wallet: false,
  walletDetails: false,
  ledgerDetails: false,
  orderReport: false,
  vendorFirmReport: false,
  vendorFirmDailyReport: false,
  bulkOrderReport: false,
  userDetails: false,
  customerOutletOrder: false,
  customerWallet: false,
  customerCompanyWallet: false,
  companyWallet: false,
  wellnessReport: false,
  orgDetails: false,
  compliance: false,
  bulkMenuSection: false,
  employeeBulkMenu: false,
  virtualCafeteria: false,
  dailyOrderMenu: false,
  adminDailyOrder: false,
  consumptionMenu: false,
  employeeList: false,
  outletEmployee: false,
  virtualCafeteriaEmployee: false,
  qrEmployee: false,
  outletWallet: false,
  dailyOrder: false,
  bulk: false,
  billingoutletWallet: false,
  billingvirtualCafeteria: false,
  billingdailyOrder: false,
  billingbulk: false,
  billingWallet: false,
  billingcompanyWallet: false,
  // emailConfig: false,
  // others order
  otherAdminOrders: false,
  otherBulkOrders: false,
  otherEmployeePoll: false,
  otherVirtualCafeteria: false,
  // vendor firm 
  vendorFirmDetails: false,
  vendorWallets: false,
  vendorOrderReport: false,
  // excel export 
  excelBulkEvent: false,
  excelAdminDaily: false,
  excelMealaweVirtualCafeteria: false,
  excelEmployeePoll: false,

};

/** Grouped Route Policies for UI */
export const GROUPED_ROUTE_POLICIES = [
  {
    title: 'ORGANIZATION',
    keys: ['b2bAddorg', 'b2bSearchOrg', 'orgDashboard', 'orgSubcription', 'orgEmployeeList', 'orgBilling', 'orgSalaryDeduction', 'sessionManagement']
  },
  {
    title: 'ORDERS & TRANSACTIONS',
    keys: ['currentOrder', 'searchOrder', 'pastOrder', 'allOrders', 'otherOrder', 'consumptionOrders', 'orgOrders', 'orgManualOrders', 'orgBulkOrderHistory']
  },
  {
    title: 'MENU & FOOD MANAGEMENT',
    keys: ['orgMenuItems', 'foodItem', 'outletMasterMenu', 'orgMenuCounters']
  },
  {
    title: 'REVIEWS & FEEDBACK',
    keys: ['orgReviews', 'appFeedbacks', 'orgEmpPoll']
  },
  {
    title: 'CHECKLIST & COMPLIANCE',
    keys: ['orgChecklist', 'viewChecklistQuestion', 'submitChecklist', 'checklistHistory']
  },
  {
    title: 'VENDOR MANAGEMENT',
    keys: ['vendor', 'addVendor', 'searchVendor', 'addVendorFirm', 'searchVendorFirm', 'vendorPayout', 'vendorWalletDashboard']
  },
  {
    title: 'OUTLET MANAGEMENT',
    keys: ['outlet', 'outletExcelExport']
  },
  {
    title: 'ADMIN & USERS',
    keys: ['admin', 'addAdmin', 'customer', 'employeeList']
  },
  {
    title: 'REPORTS & EXPORTS',
    keys: ['orgReports', 'auditReport', 'excelExport', 'dailyAdminExcelExport']
  },
  {
    title: 'DASHBOARD',
    keys: ['home', 'dashboard', 'mainDashboard', 'orgDashboard']
  },
  {
    title: 'CONFIGURATION',
    keys: ['configVariable', 'configImages', 'configImagesGroup', 'appVersionControl', 'policy', 'addPolicy', 'scheduledNotifications']
  },
  {
    title: 'SUPPORT & MISC',
    keys: ['faq', 'viewEnquiries', 'serverlogs', 'eventPopup']
  }
];

/** Grouped Button Policies for UI */
export const GROUPED_BUTTON_POLICIES = [
  {
    title: 'OUTLET MANAGEMENT',
    keys: ['editOutlet', 'deleteOutlet', 'viewOutlet', 'addOutletCategory']
  },
  {
    title: 'VENDOR MANAGEMENT',
    keys: ['addVendor', 'editVendor', 'deleteVendor', 'addVendorFirm', 'editVendorFirm', 'deleteVendorFirm']
  },
  {
    title: 'ADMIN & EMPLOYEE',
    keys: ['addAdmin', 'editAdmin', 'deleteAdmin', 'employeeList', 'guestEmployeeList', 'viewDeletedOrganizations']
  },
  {
    title: 'CONTENT & EVENTS',
    keys: ['addMenu', 'editMenu', 'deleteMenu', 'addPolicy', 'editPolicy', 'deletePolicy', 'addEvent', 'addFaq', 'editFaq', 'deleteFaq']
  },
  {
    title: 'ORGANIZATION',
    keys: ['submitMenuItem', 'submitOrders', 'submitReviews', 'submitUsers', 'exportPdf', 'exportExcel', 'bulkWallet', 'submitVendorInfo', 'submitMenuCounters', 'createAuditReport', 'createNewAuditReport']
  },
  {
    title: 'ORDER DASHBOARD',
    keys: ['refreshOrders', 'doneAll', 'completeAll', 'paymentFailed', 'validatePayment']
  },
  {
    title: 'B2B ORGANIZATION MANAGEMENT',
    keys: ['addOrganization', 'restoreOrganization', 'viewOrganization', 'deleteOrganization', 'editOrganization', 'cancelOrganization', 'updateOrganization', 'addCafeteria', 'addPoc', 'editCompliance', 'createOrganization']
  },
  {
    title: 'MENU MANAGEMENT',
    keys: ['copyMenu', 'downloadMenu', 'addBulkMenu', 'addMenuToEmployee', 'addCategory', 'addMultipleEmployees', 'assignVendor', 'importMenu', 'addMenuItem', 'editMenuItem', 'updateMenu', 'cancelMenu']
  },
  {
    title: 'EMPLOYEE MANAGEMENT',
    keys: ['addManualEmployee', 'downloadTemplate', 'addEmployee', 'importEmployee', 'addMultipleEmployeesToCompanyWallet']
  },
  {
    title: 'OUTLET OPERATIONS',
    keys: ['createOutlet', 'setStandards', 'addMealTiming']
  },
  {
    title: 'EVENT OUTLET OPERATIONS',
    keys: ['createEventOutlet', 'setEventStandards', 'addEventMealTiming']
  },
  {
    title: 'VENDOR FIRM MANAGEMENT',
    keys: ['viewVendorFirm', 'addWalletMoneyToVendorFirm', 'viewVendorFirmReport']
  },
  {
    title: 'VENDOR OPERATIONS',
    keys: ['viewVendor', 'addWalletMoneyToVendor', 'viewVendorReport', 'addVendorAddress', 'addVendorOutlet', 'createVendor']
  },
  {
    title: 'USER MANAGEMENT',
    keys: ['viewUsers', 'exportUsersExcel', 'exportUsersPdf', 'addWalletToUser', 'deleteUser']
  },
  {
    title: 'VENDOR PAYOUT',
    keys: ['viewVendorPaymentHistory', 'vendorTransfer']
  },
  {
    title: 'FEEDBACK',
    keys: ['acknowledgeFeedback', 'exportFeedbackExcel']
  },
  {
    title: 'ADMIN MANAGEMENT',
    keys: ['addAdminUser', 'editAdminUser', 'updateAdminUser']
  }
];

/** Grouped Tab Policies for UI */
export const GROUPED_TAB_POLICIES = [
  {
    title: 'CORE TABS',
    keys: ['Dashboard', 'menuItems', 'Orders', 'Reviews', 'User', 'menuCounters', 'vendorInfo', 'auditReports', 'dashBoardAdminOrder', 'employeePoll', 'salaryDeduction']
  },
  {
    title: 'OUTLET MANAGEMENT',
    keys: ['outletBasicDetails', 'outletMenu', 'outletQrMenu', 'outletOrders', 'outletReviews']
  },
  {
    title: 'EVENT OUTLET',
    keys: ['eventBasicDetails', 'eventMenu', 'eventOrders', 'eventReviews']
  },
  {
    title: 'VENDOR & FIRM',
    keys: ['vendorFirmDetails', 'vendorWallets', 'vendorOrderReport']
  },
  {
    title: 'CUSTOMER',
    keys: ['userDetails', 'customerOutletOrder', 'customerWallet', 'customerCompanyWallet']
  },
  {
    title: 'ORGANIZATION & COMPLIANCE',
    keys: ['orgDetails', 'compliance', 'bulkMenuSection', 'employeeBulkMenu', 'virtualCafeteria', 'dailyOrderMenu', 'adminDailyOrder', 'companyWallet', 'consumptionMenu', 'employeeList', 'outletEmployee', 'virtualCafeteriaEmployee', 'qrEmployee']
  },
  {
    title: 'BILLING',
    keys: ['billingoutletWallet', 'billingvirtualCafeteria', 'billingdailyOrder', 'billingWallet', 'billingbulk', 'billingcompanyWallet']
  },
  {
    title: 'OTHER ORDERS',
    keys: ['otherAdminOrders', 'otherBulkOrders', 'otherEmployeePoll', 'otherVirtualCafeteria']
  },
  {
    title: 'EXCEL REPORTS',
    keys: ['excelBulkEvent', 'excelAdminDaily', 'excelMealaweVirtualCafeteria', 'excelEmployeePoll']
  }
];

/** Maps MODULE:ACTION keys to the flat button_policy keys. */
export const PERMISSION_MAP: Record<string, string> = {
  // main dashboard 
  'DASHBOARD_MAIN_PDF:PDF': 'mainDashboardPdf',
  'DASHBOARD_MAIN_EXCEL:EXCEL': 'mainDashboardExcel',
  // DASHBOARD 
  'DASHBOARD_PDF:PDF': 'dashboardPdf',
  'DASHBOARD_EXCEL:EXCEL': 'dashboardExcel',

  // OUTLET
  'OUTLET:ADD': 'createOutlet',
  'OUTLET:EDIT': 'editOutlet',
  'OUTLET:DELETE': 'deleteOutlet',
  'OUTLET:VIEW': 'viewOutlet',
  'OUTLET:ADD_CATEGORY': 'addOutletCategory',
  'OUTLET:BULK_MENU': 'bulkMenuSection',
  'OUTLET:MEALAWE': 'mealAweOutlet',

  // MENU
  'MENU:ADD': 'addMenu',
  'MENU:EDIT': 'editMenu',
  'MENU:DELETE': 'deleteMenu',

  // VENDOR
  'VENDOR:ADD': 'addVendor',
  'VENDOR:EDIT': 'editVendor',
  'VENDOR:DELETE': 'deleteVendor',

  // VENDOR FIRM
  'VENDOR_FIRM:ADD': 'addVendorFirm',
  'VENDOR_FIRM:EDIT': 'editVendorFirm',
  'VENDOR_FIRM:DELETE': 'deleteVendorFirm',

  // POLICY
  'POLICY:ADD': 'addPolicy',
  'POLICY:EDIT': 'editPolicy',
  'POLICY:DELETE': 'deletePolicy',

  // ADMIN
  'ADMIN:ADD': 'addAdmin',
  'ADMIN:EDIT': 'editAdmin',
  'ADMIN:DELETE': 'deleteAdmin',

  // ORGANIZATION
  'ORGANIZATION:ADD': 'addOrganization',
  'ORGANIZATION:EDIT': 'editOrganization',
  'ORGANIZATION:DELETE': 'deleteOrganization',
  'ORGANIZATION:VIEW': 'viewOrganization',
  'ORGANIZATION:VIEW_DELETED': 'viewDeletedOrganizations',
  'ORGANIZATION:WEEKLY_MENU': 'b2bWeeklyMenu',
  'ORGANIZATION:EMPLOYEE_LIST': 'employeeList',
  'ORGANIZATION:GUEST_EMPLOYEE_LIST': 'guestEmployeeList',
  'ORGANIZATION:COMPLIANCE': 'organizationCompliance',

  // FAQ
  'FAQ:ADD': 'addFaq',
  'FAQ:EDIT': 'editFaq',
  'FAQ:DELETE': 'deleteFaq',

  // CONFIG VARIABLE
  'VARIABLE:ADD': 'addVariable',
  'VARIABLE:EDIT': 'editVariable',
  'VARIABLE:DELETE': 'deleteVariable',

  // APP VERSION
  'APP_VERSION:ADD': 'addAppVersion',
  'APP_VERSION:EDIT': 'editAppVersion',
  'APP_VERSION:DELETE': 'deleteAppVersion',

  // CHECKLIST
  'CHECKLIST:ADD': 'addChecklist',
  'CHECKLIST:EDIT': 'editChecklist',
  'CHECKLIST:DELETE': 'deleteChecklist',

  // FOOD ITEM (B2B)
  'FOOD_ITEM:ADD': 'addFoodItem',
  'FOOD_ITEM:EDIT': 'editFoodItem',
  'FOOD_ITEM:DELETE': 'deleteFoodItem',

  // FEEDBACK
  'FEEDBACK:ACKNOWLEDGE': 'feedbackAcknowledge',

  // INCIDENT
  'INCIDENT:ADD': 'addIncident',
  'INCIDENT:EDIT': 'editIncident',
  'INCIDENT:DELETE': 'deleteIncident',

  // EVENT
  'EVENT:ADD': 'addEvent',

  // ORDER DASHBOARD
  'ORDER:REFRESH': 'refreshOrders',
  'ORDER:DONE_ALL': 'doneAll',
  'ORDER:COMPLETE_ALL': 'completeAll',
  'ORDER:PAYMENT_FAILED': 'paymentFailed',
  'ORDER:VALIDATE_PAYMENT': 'validatePayment',

  // ORGANIZATION EXTRA
  'ORGANIZATION:RESTORE': 'restoreOrganization',
  'ORGANIZATION:SAVE': 'saveOrganization',
  'ORGANIZATION:CANCEL': 'cancelOrganization',
  'ORGANIZATION:UPDATE': 'updateOrganization',
  'ORGANIZATION:CREATE': 'createOrganization',
  'ORGANIZATION:ADD_CAFETERIA': 'addCafeteria',
  'ORGANIZATION:ADD_POC': 'addPoc',
  'ORGANIZATION:EDIT_COMPLIANCE': 'editCompliance',

  // MENU ADVANCED
  'MENU:COPY': 'copyMenu',
  'MENU:DOWNLOAD': 'downloadMenu',
  'MENU:IMPORT': 'importMenu',
  'MENU:ASSIGN_VENDOR': 'assignVendor',

  // EMPLOYEE
  'EMPLOYEE:ADD': 'addEmployee',
  'EMPLOYEE:IMPORT': 'importEmployee',
  'EMPLOYEE:DOWNLOAD_TEMPLATE': 'downloadTemplate',

  // VENDOR WALLET
  'VENDOR:ADD_WALLET': 'addWalletMoneyToVendor',
  'VENDOR_FIRM:ADD_WALLET': 'addWalletMoneyToVendorFirm',

  // USER
  'USER:VIEW': 'viewUsers',
  'USER:DELETE': 'deleteUser',
  'USER:EXPORT_EXCEL': 'exportUsersExcel',
  'USER:EXPORT_PDF': 'exportUsersPdf',

  // PAYOUT
  'PAYOUT:VIEW': 'viewVendorPaymentHistory',
  'PAYOUT:TRANSFER': 'vendorTransfer',

  // FEEDBACK
  'FEEDBACK:EXPORT': 'exportFeedbackExcel',
  // BILLING
  'BILLING:OUTLET_WALLET': 'outletWallet',
  'BILLING:VIRTUAL_CAFETERIA': 'virtualCafeteria',
  'BILLING:DAILY_ORDER': 'dailyOrder',
  'BILLING:BULK': 'bulk',
  'BILLING:COMPANY_WALLET': 'companyWallet'
};
