"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["default-src_app_deskdyne-components_dashboard_dashboard_module_ts"],{

/***/ 58193:
/*!***************************************************************************!*\
  !*** ./src/app/deskdyne-components/dashboard/dashboard-routing.module.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardRoutingModule: () => (/* binding */ DashboardRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard.component */ 38435);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _dashboard_component__WEBPACK_IMPORTED_MODULE_0__.DashboardComponent
}];
class DashboardRoutingModule {
  static #_ = this.ɵfac = function DashboardRoutingModule_Factory(t) {
    return new (t || DashboardRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: DashboardRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](DashboardRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 38435:
/*!**********************************************************************!*\
  !*** ./src/app/deskdyne-components/dashboard/dashboard.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardComponent: () => (/* binding */ DashboardComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/tabs */ 60989);
/* harmony import */ var _org_components_org_dashboard_org_dashboard_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../org-components/org-dashboard/org-dashboard.component */ 15588);
/* harmony import */ var _org_components_org_menu_items_org_menu_items_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../org-components/org-menu-items/org-menu-items.component */ 89711);
/* harmony import */ var _org_components_org_orders_org_orders_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../org-components/org-orders/org-orders.component */ 7484);
/* harmony import */ var _org_components_org_reviews_org_reviews_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../org-components/org-reviews/org-reviews.component */ 20279);
/* harmony import */ var _org_components_org_vendor_info_org_vendor_info_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../org-components/org-vendor-info/org-vendor-info.component */ 11497);
/* harmony import */ var _org_components_org_menu_counters_org_menu_counters_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../org-components/org-menu-counters/org-menu-counters.component */ 97839);
/* harmony import */ var _org_components_audit_report_audit_report_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../org-components/audit-report/audit-report.component */ 59029);
/* harmony import */ var _common_components_customer_customer_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../common-components/customer/customer.component */ 60124);

















function DashboardComponent_mat_option_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const org_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", org_r3._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", org_r3 == null ? null : org_r3.organization_name, " ");
  }
}
function DashboardComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div")(1, "mat-tab-group", 6)(2, "mat-tab", 7)(3, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "app-org-dashboard", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "mat-tab", 10)(6, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](7, "app-org-menu-items", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "mat-tab", 12)(9, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](10, "app-org-orders", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](11, "mat-tab", 13)(12, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](13, "app-org-reviews", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](14, "mat-tab", 14)(15, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](16, "app-customer", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](17, "mat-tab", 15)(18, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](19, "app-org-vendor-info", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](20, "mat-tab", 16)(21, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](22, "app-org-menu-counters", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](23, "mat-tab", 17)(24, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](25, "app-audit-report", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("adminOrg", ctx_r1.orgSelected)("isOrgSelected", ctx_r1.isOrgSelected);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("adminOrg", ctx_r1.orgSelected);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("adminOrg", ctx_r1.orgSelected);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("adminOrg", ctx_r1.orgSelected);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("adminOrg", ctx_r1.orgSelected);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("adminOrg", ctx_r1.orgSelected);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("adminOrg", ctx_r1.orgSelected);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("adminOrg", ctx_r1.orgSelected);
  }
}
function DashboardComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, " Please Select Organization ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
class DashboardComponent {
  constructor(apiMainService, router, ref) {
    this.apiMainService = apiMainService;
    this.router = router;
    this.ref = ref;
    this.orglist = [];
    this.orgSelected = null;
    this.isOrgSelected = false;
  }
  ngOnInit() {
    this.getorganizations();
  }
  changeOrganization(e) {
    const id = e.value;
    this.orgSelected = this.orglist.find(item => item._id === id);
    this.isOrgSelected = true;
  }
  getorganizations() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this.orglist = [];
        let page = 1;
        let searchObj = {
          countOnly: false
        };
        let result = yield _this.apiMainService.B2B_fetchFilteredAllOrgs(searchObj, page);
        _this.orglist = result;
      } catch (error) {
        console.log(error);
      }
    })();
  }
  static #_ = this.ɵfac = function DashboardComponent_Factory(t) {
    return new (t || DashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.ChangeDetectorRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
    type: DashboardComponent,
    selectors: [["app-dashboard"]],
    decls: 8,
    vars: 3,
    consts: [[1, "container-fluid", "py-3", "dashboardContainer"], ["appearance", "outline"], [3, "selectionChange"], [3, "value", 4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "value"], ["mat-stretch-tabs", "false", "mat-align-tabs", "start"], ["label", "Dashboard"], [1, "py-3"], [3, "adminOrg", "isOrgSelected"], ["label", "Menu Items"], [3, "adminOrg"], ["label", "Orders"], ["label", "Reviews"], ["label", "Users"], ["label", "Vendor Info"], ["label", "Menu Counters"], ["label", "Audit Reports"]],
    template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "mat-form-field", 1)(2, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, "Select Organization");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "mat-select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("selectionChange", function DashboardComponent_Template_mat_select_selectionChange_4_listener($event) {
          return ctx.changeOrganization($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, DashboardComponent_mat_option_5_Template, 2, 2, "mat-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](6, DashboardComponent_div_6_Template, 26, 9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, DashboardComponent_div_7_Template, 2, 0, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx.orglist);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.orgSelected);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.orgSelected);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_14__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__.MatOption, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_16__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_16__.MatTabGroup, _org_components_org_dashboard_org_dashboard_component__WEBPACK_IMPORTED_MODULE_2__.OrgDashboardComponent, _org_components_org_menu_items_org_menu_items_component__WEBPACK_IMPORTED_MODULE_3__.OrgMenuItemsComponent, _org_components_org_orders_org_orders_component__WEBPACK_IMPORTED_MODULE_4__.OrgOrdersComponent, _org_components_org_reviews_org_reviews_component__WEBPACK_IMPORTED_MODULE_5__.OrgReviewsComponent, _org_components_org_vendor_info_org_vendor_info_component__WEBPACK_IMPORTED_MODULE_6__.OrgVendorInfoComponent, _org_components_org_menu_counters_org_menu_counters_component__WEBPACK_IMPORTED_MODULE_7__.OrgMenuCountersComponent, _org_components_audit_report_audit_report_component__WEBPACK_IMPORTED_MODULE_8__.AuditReportComponent, _common_components_customer_customer_component__WEBPACK_IMPORTED_MODULE_9__.CustomerComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 69487:
/*!*******************************************************************!*\
  !*** ./src/app/deskdyne-components/dashboard/dashboard.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardModule: () => (/* binding */ DashboardModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard-routing.module */ 58193);
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard.component */ 38435);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! highcharts-angular */ 88578);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/tabs */ 60989);
/* harmony import */ var src_app_org_components_org_dashboard_org_dashboard_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/org-components/org-dashboard/org-dashboard.module */ 55973);
/* harmony import */ var src_app_org_components_org_menu_items_org_menu_items_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/org-components/org-menu-items/org-menu-items.module */ 49446);
/* harmony import */ var src_app_org_components_org_orders_org_orders_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/org-components/org-orders/org-orders.module */ 79782);
/* harmony import */ var src_app_org_components_org_reviews_org_reviews_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/org-components/org-reviews/org-reviews.module */ 81906);
/* harmony import */ var src_app_org_components_org_vendor_info_org_vendor_info_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/org-components/org-vendor-info/org-vendor-info.module */ 23552);
/* harmony import */ var src_app_org_components_org_menu_counters_org_menu_counters_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/org-components/org-menu-counters/org-menu-counters.module */ 55511);
/* harmony import */ var src_app_org_components_org_employee_list_org_employee_list_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/org-components/org-employee-list/org-employee-list.module */ 78564);
/* harmony import */ var src_app_org_components_org_bulk_order_history_org_bulk_order_history_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/org-components/org-bulk-order-history/org-bulk-order-history.module */ 48351);
/* harmony import */ var src_app_billing_billing_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/billing/billing.module */ 57933);
/* harmony import */ var src_app_common_components_customer_customer_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/common-components/customer/customer.module */ 43048);
/* harmony import */ var src_app_org_components_audit_report_audit_report_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/org-components/audit-report/audit-report.module */ 29392);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 61699);




















class DashboardModule {
  static #_ = this.ɵfac = function DashboardModule_Factory(t) {
    return new (t || DashboardModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineNgModule"]({
    type: DashboardModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.CommonModule, _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__.DashboardRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormsModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_16__.HighchartsChartModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__.MatFormFieldModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_18__.MatSelectModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_19__.MatTabsModule, src_app_org_components_org_dashboard_org_dashboard_module__WEBPACK_IMPORTED_MODULE_2__.OrgDashboardModule, src_app_org_components_org_menu_items_org_menu_items_module__WEBPACK_IMPORTED_MODULE_3__.OrgMenuItemsModule, src_app_org_components_org_orders_org_orders_module__WEBPACK_IMPORTED_MODULE_4__.OrgOrdersModule, src_app_org_components_org_reviews_org_reviews_module__WEBPACK_IMPORTED_MODULE_5__.OrgReviewsModule, src_app_org_components_org_vendor_info_org_vendor_info_module__WEBPACK_IMPORTED_MODULE_6__.OrgVendorInfoModule, src_app_org_components_org_menu_counters_org_menu_counters_module__WEBPACK_IMPORTED_MODULE_7__.OrgMenuCountersModule, src_app_org_components_org_employee_list_org_employee_list_module__WEBPACK_IMPORTED_MODULE_8__.OrgEmployeeListModule, src_app_org_components_org_bulk_order_history_org_bulk_order_history_module__WEBPACK_IMPORTED_MODULE_9__.OrgBulkOrderHistoryModule, src_app_billing_billing_module__WEBPACK_IMPORTED_MODULE_10__.BillingModule, src_app_org_components_audit_report_audit_report_module__WEBPACK_IMPORTED_MODULE_12__.AuditReportModule, src_app_common_components_customer_customer_module__WEBPACK_IMPORTED_MODULE_11__.CustomerModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsetNgModuleScope"](DashboardModule, {
    declarations: [_dashboard_component__WEBPACK_IMPORTED_MODULE_1__.DashboardComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.CommonModule, _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__.DashboardRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormsModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_16__.HighchartsChartModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__.MatFormFieldModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_18__.MatSelectModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_19__.MatTabsModule, src_app_org_components_org_dashboard_org_dashboard_module__WEBPACK_IMPORTED_MODULE_2__.OrgDashboardModule, src_app_org_components_org_menu_items_org_menu_items_module__WEBPACK_IMPORTED_MODULE_3__.OrgMenuItemsModule, src_app_org_components_org_orders_org_orders_module__WEBPACK_IMPORTED_MODULE_4__.OrgOrdersModule, src_app_org_components_org_reviews_org_reviews_module__WEBPACK_IMPORTED_MODULE_5__.OrgReviewsModule, src_app_org_components_org_vendor_info_org_vendor_info_module__WEBPACK_IMPORTED_MODULE_6__.OrgVendorInfoModule, src_app_org_components_org_menu_counters_org_menu_counters_module__WEBPACK_IMPORTED_MODULE_7__.OrgMenuCountersModule, src_app_org_components_org_employee_list_org_employee_list_module__WEBPACK_IMPORTED_MODULE_8__.OrgEmployeeListModule, src_app_org_components_org_bulk_order_history_org_bulk_order_history_module__WEBPACK_IMPORTED_MODULE_9__.OrgBulkOrderHistoryModule, src_app_billing_billing_module__WEBPACK_IMPORTED_MODULE_10__.BillingModule, src_app_org_components_audit_report_audit_report_module__WEBPACK_IMPORTED_MODULE_12__.AuditReportModule, src_app_common_components_customer_customer_module__WEBPACK_IMPORTED_MODULE_11__.CustomerModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=default-src_app_deskdyne-components_dashboard_dashboard_module_ts.js.map