"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["default-src_app_org-components_org-orders_org-orders_module_ts"],{

/***/ 55110:
/*!************************************************************************!*\
  !*** ./src/app/org-components/org-orders/org-orders-routing.module.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgOrdersRoutingModule: () => (/* binding */ OrgOrdersRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _org_orders_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-orders.component */ 7484);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: "",
  component: _org_orders_component__WEBPACK_IMPORTED_MODULE_0__.OrgOrdersComponent
}];
class OrgOrdersRoutingModule {
  static #_ = this.ɵfac = function OrgOrdersRoutingModule_Factory(t) {
    return new (t || OrgOrdersRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: OrgOrdersRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](OrgOrdersRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 7484:
/*!*******************************************************************!*\
  !*** ./src/app/org-components/org-orders/org-orders.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgOrdersComponent: () => (/* binding */ OrgOrdersComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var src_config_order_status_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/config/order-status.config */ 47816);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! highcharts */ 55080);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! exceljs */ 94262);
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(exceljs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! file-saver */ 46778);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! pdfmake/build/pdfmake */ 98853);
/* harmony import */ var pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! pdfmake/build/vfs_fonts */ 45217);
/* harmony import */ var pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _common_outlet_cafe_select_common_outlet_cafe_select_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../common-outlet-cafe-select/common-outlet-cafe-select.component */ 60627);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/chips */ 21757);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/card */ 18497);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/paginator */ 39687);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var _common_components_org_outlet_orders_org_outlet_orders_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../common-components/org-outlet-orders/org-outlet-orders.component */ 94683);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! highcharts-angular */ 88578);



















function OrgOrdersComponent_div_5_ng_container_25_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "app-org-outlet-orders", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const order_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("order", order_r5);
  }
}
const _c0 = function () {
  return [10, 50, 100, 200, 500];
};
function OrgOrdersComponent_div_5_ng_container_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, OrgOrdersComponent_div_5_ng_container_25_div_1_Template, 2, 1, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "mat-paginator", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("page", function OrgOrdersComponent_div_5_ng_container_25_Template_mat_paginator_page_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r6.onPageChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r2.paginatedList);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("pageSize", ctx_r2.pageSize)("pageIndex", ctx_r2.pageIndex)("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](5, _c0))("length", ctx_r2.estimatedTotal);
  }
}
function OrgOrdersComponent_div_5_div_26_highcharts_chart_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "highcharts-chart", 25);
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("Highcharts", ctx_r8.Highcharts)("options", ctx_r8.chartOptions)("update", ctx_r8.updateStatusFlag)("oneToOne", ctx_r8.oneToOneStatusFlag);
  }
}
function OrgOrdersComponent_div_5_div_26_p_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "No Data Found");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function OrgOrdersComponent_div_5_div_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 20)(1, "div", 21)(2, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](3, OrgOrdersComponent_div_5_div_26_highcharts_chart_3_Template, 1, 4, "highcharts-chart", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, OrgOrdersComponent_div_5_div_26_p_5_Template, 2, 0, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r3.filteredOrderList.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r3.filteredOrderList.length <= 0);
  }
}
function OrgOrdersComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 5)(1, "div", 6)(2, "div", 7)(3, "div", 8)(4, "mat-chip-listbox")(5, "mat-chip");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "mat-chip");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](9, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "mat-chip");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](12, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](13, "mat-chip", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](15, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "div", 10)(17, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function OrgOrdersComponent_div_5_Template_button_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r10.excelExport());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](18, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](19, "table_chart");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](20, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function OrgOrdersComponent_div_5_Template_button_click_20_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r11);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r12.downloadPdf());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](21, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](22, "picture_as_pdf");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](23, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function OrgOrdersComponent_div_5_Template_button_click_23_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r11);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r13.changeDataView());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](24, "i", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](25, OrgOrdersComponent_div_5_ng_container_25_Template, 3, 6, "ng-container", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](26, OrgOrdersComponent_div_5_div_26_Template, 6, 2, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" Total Orders: ", ctx_r0.filteredOrderList.length, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" Wallet Used: \u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](9, 7, ctx_r0.totalWalletUsed, "1.2-2"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" Amount Paid: \u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](12, 10, ctx_r0.totalAmountPaid, "1.2-2"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" Total Paid (Wallet + Amount): \u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](15, 13, ctx_r0.totalAmount, "1.2-2"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngClass", ctx_r0.isShowChart ? "bi-table" : "bi-graph-down");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx_r0.isShowChart);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.isShowChart);
  }
}
function OrgOrdersComponent_mat_card_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-card", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, " No Orders Found ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_5__.vfs = pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_6__.pdfMake?.vfs ?? pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_6__.vfs ?? {};
class OrgOrdersComponent {
  constructor(apiMainService) {
    this.apiMainService = apiMainService;
    this.Highcharts = highcharts__WEBPACK_IMPORTED_MODULE_2__;
    this.orgDetails = {};
    this.headerConfig = {
      mode: 'outlet',
      showDateRange: true,
      disableOrg: true,
      requireAll: true
    };
    this.fromDate = '';
    this.toDate = '';
    this.filteredOrderList = [];
    this.totalAmountPaid = 0;
    this.totalWalletUsed = 0;
    this.totalAmount = 0;
    this.orderStatusMapper = src_config_order_status_config__WEBPACK_IMPORTED_MODULE_1__.orderStatusMapper;
    this.updateStatusFlag = false;
    this.oneToOneStatusFlag = true;
    this.isShowChart = false;
    //pagination
    this.pageSize = 10;
    this.pageIndex = 0;
    this.estimatedTotal = 0;
    this.paginatedList = [];
  }
  ngOnInit() {
    this.setInitials();
  }
  ngOnChanges(changes) {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      const previous = changes['adminOrg'].previousValue;
      const current = changes['adminOrg'].currentValue;
      if (previous && previous._id === current._id) return;
      this.setInitials();
    }
  }
  setInitials() {
    if (this.adminOrg) {
      this.headerConfig = {
        ...this.headerConfig,
        defaultOrgId: this.adminOrg._id
      };
      this.fromDate = '';
      this.toDate = '';
      this.filteredOrderList = [];
      this.totalAmountPaid = 0;
      this.totalWalletUsed = 0;
      this.totalAmount = 0;
      this.pageIndex = 0;
      this.paginatedList = [];
      this.isShowChart = false;
    }
  }
  getOutletByFilter(body) {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.isShowChart = false;
      _this.totalAmountPaid = 0;
      _this.totalWalletUsed = 0;
      _this.totalAmount = 0;
      try {
        const res = yield _this.apiMainService.fetchOutletOrdersbysearchObj(body);
        // const res = await this.apiMainService.fetchCompletedOutletOrdersbysearchObj(body);
        _this.filteredOrderList = res;
        _this.totalAmount = _this.filteredOrderList.reduce((sum, order) => {
          const amount = Number(order.amount) || 0;
          const walletPoints = Number(order.moneyWalletPointsUsed) || 0;
          _this.totalWalletUsed += walletPoints;
          _this.totalAmountPaid += amount;
          return sum + amount + walletPoints;
        }, 0);
        _this.pageIndex = 0;
        _this.updatePaginatedList();
      } catch (err) {
        console.error('Error fetching outlet orders', err);
      }
    })();
  }
  updatePaginatedList() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedList = this.filteredOrderList.slice(startIndex, endIndex);
    this.estimatedTotal = this.filteredOrderList.length;
  }
  onPageChange(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedList();
  }
  excelExport() {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const workbook = new exceljs__WEBPACK_IMPORTED_MODULE_3__.Workbook();
      const worksheet = workbook.addWorksheet('Outlet Orders');
      // ------------------------------------------------------------------
      //                      TABLE COLUMN DEFINITIONS
      // ------------------------------------------------------------------
      worksheet.columns = [{
        header: 'Order No',
        key: 'orderNo',
        width: 12
      }, {
        header: 'Token No',
        key: 'tokenNo',
        width: 10
      }, {
        header: 'Order Date',
        key: 'orderDate',
        width: 18
      }, {
        header: 'Status',
        key: 'status',
        width: 16
      }, {
        header: 'Customer Name',
        key: 'customerName',
        width: 20
      }, {
        header: 'Customer Mobile',
        key: 'customerPhoneNo',
        width: 16
      }, {
        header: 'Customer Email',
        key: 'customerEmail',
        width: 24
      }, {
        header: 'Org Name',
        key: 'orgName',
        width: 22
      }, {
        header: 'Cafe Name',
        key: 'cafeName',
        width: 18
      }, {
        header: 'Items',
        key: 'items',
        width: 40
      }, {
        header: 'Item Amount (₹)',
        key: 'itemAmount',
        width: 16
      }, {
        header: 'Subsidy Amount (₹)',
        key: 'subsidyAmount',
        width: 18
      }, {
        header: 'Wallet Used (₹)',
        key: 'walletUsed',
        width: 16
      }, {
        header: 'Amount Paid (₹)',
        key: 'amountPaid',
        width: 16
      }];
      // ------------------------------------------------------------------
      //                   HEADER ROW (NOW ROW 5 CORRECTLY)
      // ------------------------------------------------------------------
      const headerRowIndex = 0;
      const headerRow = worksheet.getRow(headerRowIndex);
      // Map headers from column definitions
      headerRow.values = ["", ...worksheet.columns.map(c => c.header || "")];
      // ------------------------------------------------------------------
      //                         DATA ROWS
      // ------------------------------------------------------------------
      let rowIndex = headerRowIndex;
      let totalItemAmount = 0;
      let totalSubsidy = 0;
      let totalWalletUsed = 0;
      let totalAmountPaid = 0;
      _this2.filteredOrderList.forEach(order => {
        const walletUsed = Number(order.moneyWalletPointsUsed) || 0;
        const amountPaid = Number(order.amount) || 0;
        const itemAmount = Number(order.itemAmount) || 0;
        const subsidyAmount = Number(order.subsidyAmount) || 0;
        const items = (order.itemList || []).map(i => `${i.itemName} x${i.count} @₹${i.price}`).join('; ');
        const row = worksheet.addRow({
          orderNo: order.orderNo,
          tokenNo: order.tokenNo || '-',
          orderDate: new Date(order.orderDate).toLocaleString('en-IN'),
          status: _this2.orderStatusMapper[order.orderstatus] || order.orderstatus,
          customerName: order.customerName,
          customerPhoneNo: order.customerPhoneNo,
          customerEmail: order.customerEmail,
          orgName: order.organizationDetails?.organization_name,
          cafeName: order.cafeteriaDetails?.cafeteria_name,
          items,
          itemAmount,
          subsidyAmount,
          walletUsed,
          amountPaid
        });
        // Numeric formatting
        row.getCell('K').numFmt = '#,##0.00';
        row.getCell('L').numFmt = '#,##0.00';
        row.getCell('M').numFmt = '#,##0.00';
        row.getCell('N').numFmt = '#,##0.00';
        // Totals
        totalItemAmount += itemAmount;
        totalSubsidy += subsidyAmount;
        totalWalletUsed += walletUsed;
        totalAmountPaid += amountPaid;
        rowIndex++;
      });
      // ------------------------------------------------------------------
      //                          TOTALS ROW
      // ------------------------------------------------------------------
      const totalsRow = worksheet.addRow({
        orderNo: 'Totals',
        itemAmount: totalItemAmount,
        subsidyAmount: totalSubsidy,
        walletUsed: totalWalletUsed,
        amountPaid: totalAmountPaid
      });
      totalsRow.font = {
        bold: true
      };
      totalsRow.getCell('A').alignment = {
        horizontal: 'right'
      };
      totalsRow.getCell('K').numFmt = '#,##0.00';
      totalsRow.getCell('L').numFmt = '#,##0.00';
      totalsRow.getCell('M').numFmt = '#,##0.00';
      totalsRow.getCell('N').numFmt = '#,##0.00';
      // ------------------------------------------------------------------
      //                        TABLE BORDERS
      // ------------------------------------------------------------------
      worksheet.eachRow((row, rIndex) => {
        if (rIndex >= headerRowIndex) {
          row.eachCell(cell => {
            cell.border = {
              top: {
                style: 'thin',
                color: {
                  argb: 'FFDDDDDD'
                }
              },
              left: {
                style: 'thin',
                color: {
                  argb: 'FFDDDDDD'
                }
              },
              bottom: {
                style: 'thin',
                color: {
                  argb: 'FFDDDDDD'
                }
              },
              right: {
                style: 'thin',
                color: {
                  argb: 'FFDDDDDD'
                }
              }
            };
          });
        }
      });
      // ------------------------------------------------------------------
      //                      SAVE EXCEL FILE
      // ------------------------------------------------------------------
      const buffer = yield workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const filename = `outlet_orders_${new Date().toISOString().slice(0, 10)}.xlsx`;
      (0,file_saver__WEBPACK_IMPORTED_MODULE_4__.saveAs)(blob, filename);
    })();
  }
  downloadPdf() {
    if (!this.filteredOrderList.length) return;
    // ---------------------------------------------------------
    //           TABLE HEADERS (12 columns total)
    // ---------------------------------------------------------
    const tableHeaders = [{
      text: 'Order No',
      bold: true
    }, {
      text: 'Token',
      bold: true
    }, {
      text: 'Date',
      bold: true
    }, {
      text: 'Status',
      bold: true
    }, {
      text: 'Customer Name',
      bold: true
    }, {
      text: 'Mobile',
      bold: true
    }, {
      text: 'Email',
      bold: true
    }, {
      text: 'Items',
      bold: true
    }, {
      text: 'Item Amt (₹)',
      bold: true
    }, {
      text: 'Subsidy (₹)',
      bold: true
    }, {
      text: 'Wallet (₹)',
      bold: true
    }, {
      text: 'Paid (₹)',
      bold: true
    }];
    const body = [];
    body.push(tableHeaders);
    let totalItemAmount = 0;
    let totalSubsidy = 0;
    let totalWalletUsed = 0;
    let totalAmountPaid = 0;
    // ---------------------------------------------------------
    //                       DATA ROWS
    // ---------------------------------------------------------
    this.filteredOrderList.forEach(order => {
      const walletUsed = Number(order.moneyWalletPointsUsed) || 0;
      const amountPaid = Number(order.amount) || 0;
      const itemAmount = Number(order.itemAmount) || 0;
      const subsidyAmount = Number(order.subsidyAmount) || 0;
      const items = (order.itemList || []).map(i => `${i.itemName} x${i.count} @₹${i.price}`).join('; ');
      body.push([order.orderNo || '', order.tokenNo || '', new Date(order.orderDate).toLocaleString('en-IN') || '', this.orderStatusMapper[order.orderstatus] || order.orderstatus || '', order.customerName || '', order.customerPhoneNo || '', order.customerEmail || '', items || '', itemAmount.toFixed(2), subsidyAmount.toFixed(2), walletUsed.toFixed(2), amountPaid.toFixed(2)]);
      totalItemAmount += itemAmount;
      totalSubsidy += subsidyAmount;
      totalWalletUsed += walletUsed;
      totalAmountPaid += amountPaid;
    });
    // ---------------------------------------------------------
    //                       TOTALS ROW (12 columns)
    // ---------------------------------------------------------
    body.push([{
      text: 'Totals',
      bold: true,
      colSpan: 8,
      alignment: 'right'
    }, {}, {}, {}, {}, {}, {}, {}, {
      text: totalItemAmount.toFixed(2),
      bold: true
    }, {
      text: totalSubsidy.toFixed(2),
      bold: true
    }, {
      text: totalWalletUsed.toFixed(2),
      bold: true
    }, {
      text: totalAmountPaid.toFixed(2),
      bold: true
    }]);
    // ---------------------------------------------------------
    //                 COMMON HEADER VALUES
    // ---------------------------------------------------------
    const dateStr = new Date().toISOString().slice(0, 10);
    const orgName = this.filteredOrderList[0]?.organizationDetails?.organization_name || 'All Organizations';
    const cafeteria = this.filteredOrderList[0]?.cafeteriaDetails?.cafeteria_name || 'All Cafeterias';
    // ---------------------------------------------------------
    //                 PDF DOCUMENT STRUCTURE
    // ---------------------------------------------------------
    const docDefinition = {
      pageOrientation: 'landscape',
      pageMargins: [15, 15, 15, 15],
      content: [{
        text: 'Outlet Orders Report',
        style: 'header'
      }, {
        text: `Organization: ${orgName}`,
        style: 'subheader'
      }, {
        text: `Cafeteria: ${cafeteria}`,
        style: 'subheader'
      }, {
        text: `Generated on: ${dateStr}`,
        style: 'subheader',
        margin: [0, 0, 0, 10]
      }, {
        table: {
          headerRows: 1,
          widths: [40, 35, 70, 55, 80, 60, 90, '*', 60, 55, 55, 55],
          body
        },
        layout: {
          fillColor: rowIndex => rowIndex === 0 ? '#2E75B6' : null,
          paddingLeft: () => 3,
          paddingRight: () => 3,
          paddingTop: () => 3,
          paddingBottom: () => 3,
          hLineColor: () => '#999999',
          vLineColor: () => '#999999'
        }
      }],
      styles: {
        header: {
          fontSize: 15,
          bold: true,
          margin: [0, 0, 0, 6]
        },
        subheader: {
          fontSize: 10,
          color: '#555'
        }
      },
      defaultStyle: {
        fontSize: 8,
        color: '#000'
      }
    };
    pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_5__.createPdf(docDefinition).download(`OutletOrders_${dateStr}.pdf`);
  }
  changeDataView() {
    if (!this.isShowChart) {
      this.generateChartData();
    } else {
      this.isShowChart = false;
    }
  }
  processOrdersData(data) {
    const dateStatusMap = {};
    data.forEach(item => {
      const dateOnly = new Date(item.orderDate).toISOString().slice(0, 10);
      const status = item.orderstatus;
      if (!dateStatusMap[dateOnly]) {
        dateStatusMap[dateOnly] = {};
      }
      if (!dateStatusMap[dateOnly][status]) {
        dateStatusMap[dateOnly][status] = 0;
      }
      dateStatusMap[dateOnly][status]++;
    });
    const categories = Object.keys(dateStatusMap).sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    const statusSet = new Set();
    Object.values(dateStatusMap).forEach(statusCounts => {
      Object.keys(statusCounts).forEach(st => statusSet.add(st));
    });
    const statuses = Array.from(statusSet).sort();
    const series = statuses.map(status => {
      const dataArray = categories.map(d => {
        return dateStatusMap[d]?.[status] ?? 0;
      });
      return {
        name: status,
        data: dataArray,
        stack: 'orders'
      };
    });
    return {
      categories,
      series
    };
  }
  generateChartData() {
    let data = this.filteredOrderList;
    const {
      categories,
      series
    } = this.processOrdersData(data);
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Orders by Date and Status',
        align: 'left'
      },
      xAxis: {
        categories: categories,
        labels: {
          useHTML: true,
          formatter: function () {
            return `<span title="${this.value}">${this.value}</span>`;
          }
        }
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: 'Number of Orders'
        }
      },
      tooltip: {
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal'
        }
      },
      series: series
    };
    this.isShowChart = true;
    this.updateStatusFlag = true;
  }
  filterSubmitted(event) {
    if (event) {
      const body = {
        cafeteriaName: event.cafeteria_name,
        organizationName: event.org_name,
        fromDate: event.date_from,
        toDate: event.date_to
      };
      const body1 = {
        outletId: event.org_id,
        fromDate: event.date_from,
        toDate: event.date_to
      };
      this.getOutletByFilter(body);
      this.fromDate = this.convertDate(event.date_from);
      this.toDate = this.convertDate(event.date_to);
    }
  }
  convertDate(dateInput) {
    const date = new Date(dateInput);
    const istOffsetMs = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(date.getTime() + istOffsetMs);
    const dd = String(istDate.getDate()).padStart(2, '0');
    const mm = String(istDate.getMonth() + 1).padStart(2, '0'); // 0-based month
    const yyyy = istDate.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }
  static #_ = this.ɵfac = function OrgOrdersComponent_Factory(t) {
    return new (t || OrgOrdersComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_7__.ApiMainService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
    type: OrgOrdersComponent,
    selectors: [["app-org-orders"]],
    inputs: {
      adminOrg: "adminOrg"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵNgOnChangesFeature"]],
    decls: 7,
    vars: 3,
    consts: [[1, "container-fluid"], [1, "mb-0", "pb-3"], [3, "config", "submitted"], ["class", "pb-4", 4, "ngIf"], ["class", "text-center py-2 mt-2 rounded-4", 4, "ngIf"], [1, "pb-4"], [1, "row", "my-2", "align-items-center"], [1, "col-12", "col-md-8"], [1, "d-flex", "flex-wrap", "gap-2"], ["color", "primary", "selected", ""], [1, "col-12", "col-md-4", "d-flex", "justify-content-end", "gap-2", "mt-2", "mt-md-0"], ["mat-mini-fab", "", "matTooltip", "Excel Export", 1, "excel-btn", 3, "click"], ["mat-mini-fab", "", "color", "primary", "matTooltip", "Download PDF", 3, "click"], ["mat-mini-fab", "", "color", "primary", "matTooltip", "Change View", 1, "btn", "iconBtn", 3, "click"], [1, "bi", 3, "ngClass"], [4, "ngIf"], ["class", "row my-1", 4, "ngIf"], [4, "ngFor", "ngForOf"], ["showFirstLastButtons", "", 3, "pageSize", "pageIndex", "pageSizeOptions", "length", "page"], [3, "order"], [1, "row", "my-1"], [1, "col-12"], [1, "card", "shadow", "border-0", "rounded-lg", "card-hover", "overflow-hidden"], ["style", "width: 100%; height: 400px; display: block", 3, "Highcharts", "options", "update", "oneToOne", 4, "ngIf"], [1, "h-100", "d-flex", "justify-content-center", "align-items-center", "pt-2"], [2, "width", "100%", "height", "400px", "display", "block", 3, "Highcharts", "options", "update", "oneToOne"], [1, "text-center", "py-2", "mt-2", "rounded-4"]],
    template: function OrgOrdersComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2, "Outlet Orders");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "div")(4, "app-common-outlet-cafe-select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("submitted", function OrgOrdersComponent_Template_app_common_outlet_cafe_select_submitted_4_listener($event) {
          return ctx.filterSubmitted($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, OrgOrdersComponent_div_5_Template, 27, 16, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](6, OrgOrdersComponent_mat_card_6_Template, 2, 0, "mat-card", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("config", ctx.headerConfig);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.filteredOrderList.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.filteredOrderList.length === 0);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _common_outlet_cafe_select_common_outlet_cafe_select_component__WEBPACK_IMPORTED_MODULE_8__.CommonOutletCafeSelectComponent, _angular_material_chips__WEBPACK_IMPORTED_MODULE_12__.MatChip, _angular_material_chips__WEBPACK_IMPORTED_MODULE_12__.MatChipListbox, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatMiniFabButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__.MatIcon, _angular_material_card__WEBPACK_IMPORTED_MODULE_15__.MatCard, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__.MatPaginator, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__.MatTooltip, _common_components_org_outlet_orders_org_outlet_orders_component__WEBPACK_IMPORTED_MODULE_9__.OrgOutletOrdersComponent, highcharts_angular__WEBPACK_IMPORTED_MODULE_18__.HighchartsChartComponent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.DecimalPipe],
    styles: [".iconBtn[_ngcontent-%COMP%] {\n  background: #8a8a8a;\n  color: white;\n  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;\n}\n\n.excel-btn[_ngcontent-%COMP%] {\n  background: #327a4d !important;\n  color: white !important;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvb3JnLWNvbXBvbmVudHMvb3JnLW9yZGVycy9vcmctb3JkZXJzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksbUJBQUE7RUFDQSxZQUFBO0VBQ0EsaURBQUE7QUFDSjs7QUFFQTtFQUNJLDhCQUFBO0VBQ0EsdUJBQUE7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbIi5pY29uQnRuIHtcclxuICAgIGJhY2tncm91bmQ6ICM4YThhOGE7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBib3gtc2hhZG93OiByZ2JhKDk5LCA5OSwgOTksIDAuMikgMHB4IDJweCA4cHggMHB4O1xyXG59XHJcblxyXG4uZXhjZWwtYnRuIHtcclxuICAgIGJhY2tncm91bmQ6ICMzMjdhNGQgIWltcG9ydGFudDtcclxuICAgIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 79782:
/*!****************************************************************!*\
  !*** ./src/app/org-components/org-orders/org-orders.module.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgOrdersModule: () => (/* binding */ OrgOrdersModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _org_orders_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-orders-routing.module */ 55110);
/* harmony import */ var src_app_order_card_order_card_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/order-card/order-card.module */ 57156);
/* harmony import */ var _org_orders_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./org-orders.component */ 7484);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var src_app_common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common-outlet-cafe-select/common-outlet-cafe-select.module */ 58481);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/chips */ 21757);
/* harmony import */ var src_app_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/material.module */ 29099);
/* harmony import */ var src_app_organization_view_organization_view_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/organization-view/organization-view.module */ 83277);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! highcharts-angular */ 88578);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 61699);











class OrgOrdersModule {
  static #_ = this.ɵfac = function OrgOrdersModule_Factory(t) {
    return new (t || OrgOrdersModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
    type: OrgOrdersModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _org_orders_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgOrdersRoutingModule, src_app_order_card_order_card_module__WEBPACK_IMPORTED_MODULE_1__.OrderCardModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, src_app_common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_3__.CommonOutletCafeSelectModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_9__.MatChipsModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_4__.MaterialModule, src_app_organization_view_organization_view_module__WEBPACK_IMPORTED_MODULE_5__.OrganizationViewModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_10__.HighchartsChartModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](OrgOrdersModule, {
    declarations: [_org_orders_component__WEBPACK_IMPORTED_MODULE_2__.OrgOrdersComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _org_orders_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgOrdersRoutingModule, src_app_order_card_order_card_module__WEBPACK_IMPORTED_MODULE_1__.OrderCardModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, src_app_common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_3__.CommonOutletCafeSelectModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_9__.MatChipsModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_4__.MaterialModule, src_app_organization_view_organization_view_module__WEBPACK_IMPORTED_MODULE_5__.OrganizationViewModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_10__.HighchartsChartModule],
    exports: [_org_orders_component__WEBPACK_IMPORTED_MODULE_2__.OrgOrdersComponent]
  });
})();

/***/ })

}]);
//# sourceMappingURL=default-src_app_org-components_org-orders_org-orders_module_ts.js.map