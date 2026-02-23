"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["default-src_app_org-components_org-menu-items_org-menu-items_module_ts"],{

/***/ 80173:
/*!********************************************************************************!*\
  !*** ./src/app/org-components/org-menu-items/org-menu-items-routing.module.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgMenuItemsRoutingModule: () => (/* binding */ OrgMenuItemsRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _org_menu_items_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-menu-items.component */ 89711);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: "",
  component: _org_menu_items_component__WEBPACK_IMPORTED_MODULE_0__.OrgMenuItemsComponent
}];
class OrgMenuItemsRoutingModule {
  static #_ = this.ɵfac = function OrgMenuItemsRoutingModule_Factory(t) {
    return new (t || OrgMenuItemsRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: OrgMenuItemsRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](OrgMenuItemsRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 89711:
/*!***************************************************************************!*\
  !*** ./src/app/org-components/org-menu-items/org-menu-items.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgMenuItemsComponent: () => (/* binding */ OrgMenuItemsComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! highcharts */ 55080);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_app_vendor_report_item_breakdown_item_breakdown_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/vendor-report/item-breakdown/item-breakdown.component */ 44486);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 60331);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/service/local-storage.service */ 48798);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ 17401);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 54860);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! highcharts-angular */ 88578);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/card */ 18497);
/* harmony import */ var _common_outlet_cafe_select_common_outlet_cafe_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common-outlet-cafe-select/common-outlet-cafe-select.component */ 60627);
















function OrgMenuItemsComponent_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OrgMenuItemsComponent_button_5_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r3.openItemBreakdownModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "list_alt");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, " Details breakdown ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function OrgMenuItemsComponent_highcharts_chart_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "highcharts-chart", 9);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("Highcharts", ctx_r1.Highcharts)("options", ctx_r1.chartOptions)("update", ctx_r1.updateFlag)("oneToOne", ctx_r1.oneToOneFlag);
  }
}
function OrgMenuItemsComponent_mat_card_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-card", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " No Menu Items Found ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
class OrgMenuItemsComponent {
  constructor(apiMainService, localStorageService, dialog, http) {
    this.apiMainService = apiMainService;
    this.localStorageService = localStorageService;
    this.dialog = dialog;
    this.http = http;
    this.Highcharts = highcharts__WEBPACK_IMPORTED_MODULE_1__;
    this.outletOrderData = [];
    this.selectedOutletId = '';
    this.headerConfig = {
      mode: 'outlet',
      showDateRange: true,
      disableOrg: true,
      requireAll: true
    };
    this.filterObj = {
      startDate: new Date(),
      endDate: new Date(),
      orgId: '',
      cafeteria_name: ''
    };
    // Chart
    this.updateFlag = false;
    this.oneToOneFlag = true;
    this.initialData = [];
    this.updateOrdersFlag = false;
    this.oneToOneOrdersFlag = true;
    this.dateGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroup({
      start: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl(new Date()),
      end: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl(new Date())
    });
  }
  ngOnInit() {
    this.setInitials();
  }
  ngOnChanges(changes) {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.setInitials();
    }
  }
  setInitials() {
    // if Admin is logged in
    if (this.adminOrg) {
      this.headerConfig = {
        ...this.headerConfig,
        defaultOrgId: this.adminOrg._id
      };
    }
    //if OrgAdmin is logged in
    this.orgAdmin = this.adminOrg ? {
      orgDetails: this.adminOrg
    } : this.localStorageService.getCacheData('ADMIN_PROFILE');
    if (this.orgAdmin?.role === 'ORGADMIN') {
      this.headerConfig = {
        ...this.headerConfig,
        defaultOrgId: this.orgAdmin?.orgDetails?._id
      };
      this.filterObj.orgId = this.orgAdmin?.orgDetails?._id;
    }
  }
  getOrgTotalOrdersStatusWiseData() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const res = yield _this.apiMainService.getOrgTotalOrdersStatusWiseData(_this.filterObj);
        if (res.length > 0) {
          _this.outletOrderData = res;
          _this.generateChartData(res);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }
  generateChartData(data) {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const itemData = {};
      data.forEach(order => {
        if (order?.orderstatus === 'completed') {
          order.itemList.forEach(item => {
            if (!itemData[item.itemName]) {
              itemData[item.itemName] = {
                count: 0,
                totalAmount: 0,
                totalSubsidy: 0
              };
            }
            itemData[item.itemName].count += item.count;
            itemData[item.itemName].totalAmount += item.price * item.count;
          });
        }
      });
      const chartData = Object.keys(itemData).map(itemName => {
        const item = itemData[itemName];
        return {
          name: itemName,
          y: item.totalAmount,
          count: item.count
        };
      });
      _this2.chartOptions = {
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Item Distribution by Total Amount (Completed Orders)'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>₹{point.y}</b> (Count: {point.count})'
        },
        series: [{
          type: 'pie',
          name: 'Total',
          data: chartData
        }]
      };
      _this2.updateOrdersFlag = !_this2.updateOrdersFlag;
    })();
  }
  openItemBreakdownModal() {
    var _this3 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const orders = (_this3.outletOrderData || []).filter(o => o?.orderstatus === 'completed');
      const start = new Date(_this3.filterObj.startDate);
      const end = new Date(_this3.filterObj.endDate);
      const rangeLabel = start.toLocaleDateString() + ' to ' + end.toLocaleDateString();
      const selectedOutlet = _this3.outletOrderData.find(i => i.outletId === _this3.selectedOutletId) || {};
      const orgName = selectedOutlet.organizationDetails?.organization_name ?? '-';
      const cafeName = selectedOutlet.cafeteriaDetails?.cafeteria_name ?? '-';
      const counterName = selectedOutlet.outletName ?? '-';
      const orgCafe = `${orgName} - ${cafeName}`;
      const imageUrl = 'assets/images/deskdyneLogoblue.png';
      const logoBase64 = yield _this3.assetToBase64(imageUrl);
      _this3.dialog.open(src_app_vendor_report_item_breakdown_item_breakdown_component__WEBPACK_IMPORTED_MODULE_2__.ItemBreakdownComponent, {
        width: '960px',
        maxHeight: '85vh',
        autoFocus: false,
        data: {
          rangeLabel,
          orders,
          header: {
            cafeteriaName: orgCafe,
            counterName,
            gstNumber: _this3.orgAdmin?.compliance?.gstNumber || '00000000000',
            fssaiNumber: _this3.orgAdmin?.compliance?.fssaiNo || '00000000000000',
            createdBetween: rangeLabel,
            logoBase64
          }
        }
      });
    })();
  }
  filterSubmitted(event) {
    if (event) {
      this.selectedOutletId = event?.outlet_id;
      this.filterObj = {
        startDate: event?.date_from,
        endDate: event?.date_to,
        orgId: event?.org_id,
        cafeteria_name: event?.cafeteria_name
      };
      this.getOrgTotalOrdersStatusWiseData();
    }
  }
  assetToBase64(url) {
    var _this4 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const blob = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.firstValueFrom)(_this4.http.get(url, {
          responseType: 'blob'
        }));
        return yield new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch {
        return undefined;
      }
    })();
  }
  static #_ = this.ɵfac = function OrgMenuItemsComponent_Factory(t) {
    return new (t || OrgMenuItemsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_3__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_4__.LocalStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClient));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: OrgMenuItemsComponent,
    selectors: [["app-org-menu-items"]],
    inputs: {
      adminOrg: "adminOrg"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵNgOnChangesFeature"]],
    decls: 9,
    vars: 4,
    consts: [[1, "container-fluid"], [1, "pb-4"], [3, "config", "submitted"], [1, "d-flex", "justify-content-end", "align-items-center", "w-100", "mt-2"], ["class", "btn-view", "type", "button", "mat-stroked-button", "", "color", "primary", 3, "click", 4, "ngIf"], [1, "card-hover", "mt-2"], ["style", "width: 100%; height: 400px; display: block", 3, "Highcharts", "options", "update", "oneToOne", 4, "ngIf"], ["class", "center labelText py-2 rounded-4", 4, "ngIf"], ["type", "button", "mat-stroked-button", "", "color", "primary", 1, "btn-view", 3, "click"], [2, "width", "100%", "height", "400px", "display", "block", 3, "Highcharts", "options", "update", "oneToOne"], [1, "center", "labelText", "py-2", "rounded-4"]],
    template: function OrgMenuItemsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Menu Items");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "app-common-outlet-cafe-select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("submitted", function OrgMenuItemsComponent_Template_app_common_outlet_cafe_select_submitted_3_listener($event) {
          return ctx.filterSubmitted($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, OrgMenuItemsComponent_button_5_Template, 4, 0, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, OrgMenuItemsComponent_highcharts_chart_7_Template, 1, 4, "highcharts-chart", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, OrgMenuItemsComponent_mat_card_8_Template, 2, 0, "mat-card", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("config", ctx.headerConfig);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.outletOrderData.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.outletOrderData.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.outletOrderData.length <= 0);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, highcharts_angular__WEBPACK_IMPORTED_MODULE_12__.HighchartsChartComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__.MatIcon, _angular_material_card__WEBPACK_IMPORTED_MODULE_15__.MatCard, _common_outlet_cafe_select_common_outlet_cafe_select_component__WEBPACK_IMPORTED_MODULE_5__.CommonOutletCafeSelectComponent],
    styles: [".card-hover[_ngcontent-%COMP%] {\n  border-radius: 20px;\n  background-color: #f8f9fa;\n  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);\n  overflow: hidden;\n}\n\n  .dashboardContainer .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n\n  .dashboardContainer .mdc-notched-outline__leading {\n  border-top-left-radius: 12px !important;\n  border-bottom-left-radius: 12px !important;\n}\n\n  .dashboardContainer .mdc-notched-outline__trailing {\n  border-top-right-radius: 12px !important;\n  border-bottom-right-radius: 12px !important;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvb3JnLWNvbXBvbmVudHMvb3JnLW1lbnUtaXRlbXMvb3JnLW1lbnUtaXRlbXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EseUNBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtBQUNGOztBQUVBO0VBQ0UsdUNBQUE7RUFDQSwwQ0FBQTtBQUNGOztBQUVBO0VBQ0Usd0NBQUE7RUFDQSwyQ0FBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQtaG92ZXIge1xyXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtcclxuICBib3gtc2hhZG93OiAwIDRweCA0cHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG46Om5nLWRlZXAgLmRhc2hib2FyZENvbnRhaW5lciAubWF0LW1kYy1mb3JtLWZpZWxkLXN1YnNjcmlwdC13cmFwcGVyIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG46Om5nLWRlZXAgLmRhc2hib2FyZENvbnRhaW5lciAubWRjLW5vdGNoZWQtb3V0bGluZV9fbGVhZGluZyB7XHJcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTJweCAhaW1wb3J0YW50O1xyXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEycHggIWltcG9ydGFudDtcclxufVxyXG5cclxuOjpuZy1kZWVwIC5kYXNoYm9hcmRDb250YWluZXIgLm1kYy1ub3RjaGVkLW91dGxpbmVfX3RyYWlsaW5nIHtcclxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTJweCAhaW1wb3J0YW50O1xyXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMnB4ICFpbXBvcnRhbnQ7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 49446:
/*!************************************************************************!*\
  !*** ./src/app/org-components/org-menu-items/org-menu-items.module.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgMenuItemsModule: () => (/* binding */ OrgMenuItemsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _org_menu_items_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-menu-items-routing.module */ 80173);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! highcharts-angular */ 88578);
/* harmony import */ var _org_menu_items_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./org-menu-items.component */ 89711);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var src_app_material_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/material.module */ 29099);
/* harmony import */ var src_app_common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common-outlet-cafe-select/common-outlet-cafe-select.module */ 58481);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);








class OrgMenuItemsModule {
  static #_ = this.ɵfac = function OrgMenuItemsModule_Factory(t) {
    return new (t || OrgMenuItemsModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: OrgMenuItemsModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _org_menu_items_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgMenuItemsRoutingModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_6__.HighchartsChartModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_2__.MaterialModule, src_app_common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_3__.CommonOutletCafeSelectModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](OrgMenuItemsModule, {
    declarations: [_org_menu_items_component__WEBPACK_IMPORTED_MODULE_1__.OrgMenuItemsComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _org_menu_items_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgMenuItemsRoutingModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_6__.HighchartsChartModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_2__.MaterialModule, src_app_common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_3__.CommonOutletCafeSelectModule],
    exports: [_org_menu_items_component__WEBPACK_IMPORTED_MODULE_1__.OrgMenuItemsComponent]
  });
})();

/***/ })

}]);
//# sourceMappingURL=default-src_app_org-components_org-menu-items_org-menu-items_module_ts.js.map