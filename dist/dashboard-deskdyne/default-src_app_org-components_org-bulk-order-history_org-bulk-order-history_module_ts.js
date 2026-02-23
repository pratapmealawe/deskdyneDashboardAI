"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["default-src_app_org-components_org-bulk-order-history_org-bulk-order-history_module_ts"],{

/***/ 16205:
/*!************************************************************************************************!*\
  !*** ./src/app/org-components/org-bulk-order-history/org-bulk-order-history-routing.module.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgBulkOrderHistoryRoutingModule: () => (/* binding */ OrgBulkOrderHistoryRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _org_bulk_order_history_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-bulk-order-history.component */ 86319);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: "",
  component: _org_bulk_order_history_component__WEBPACK_IMPORTED_MODULE_0__.OrgBulkOrderHistoryComponent
}];
class OrgBulkOrderHistoryRoutingModule {
  static #_ = this.ɵfac = function OrgBulkOrderHistoryRoutingModule_Factory(t) {
    return new (t || OrgBulkOrderHistoryRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: OrgBulkOrderHistoryRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](OrgBulkOrderHistoryRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 86319:
/*!*******************************************************************************************!*\
  !*** ./src/app/org-components/org-bulk-order-history/org-bulk-order-history.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgBulkOrderHistoryComponent: () => (/* binding */ OrgBulkOrderHistoryComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! highcharts */ 55080);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/service/local-storage.service */ 48798);
/* harmony import */ var src_service_search_filter_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/service/search-filter.service */ 43915);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! highcharts-angular */ 88578);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/datepicker */ 82226);












function OrgBulkOrderHistoryComponent_highcharts_chart_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "highcharts-chart", 14);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("Highcharts", ctx_r1.Highcharts)("options", ctx_r1.chartOptionsPie)("update", ctx_r1.updateOrdersFlag)("oneToOne", ctx_r1.oneToOneOrdersFlag);
  }
}
function OrgBulkOrderHistoryComponent_p_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "No Data Found");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
class OrgBulkOrderHistoryComponent {
  constructor(apiMainService, localStorageService, searchService) {
    this.apiMainService = apiMainService;
    this.localStorageService = localStorageService;
    this.searchService = searchService;
    this.Highcharts = highcharts__WEBPACK_IMPORTED_MODULE_1__;
    this.searchObj = {
      orgId: '',
      fromDate: new Date(),
      toDate: new Date()
    };
    this.maxDate = new Date();
    this.updateOrdersFlag = false;
    this.oneToOneOrdersFlag = true;
    this.chartOptionsPie = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Order History'
      },
      tooltip: {
        // valueSuffix: '%',
        // valueDecimals: 1,
        pointFormat: '<small>Count</small>: <b>{point.count}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.percentage:.1f}%'
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Percentage',
        data: [] // Initially empty, will be updated with API data
      }]
    };

    this.initialOrdersData = [];
    this.dateGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroup({
      start: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl(new Date()),
      end: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl(new Date())
    });
  }
  ngOnInit() {
    this.initFunc();
  }
  ngOnChanges(changes) {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.initFunc();
    }
  }
  initFunc() {
    this.orgAdmin = this.adminOrg ? {
      orgDetails: this.adminOrg
    } : this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.maxDate.setDate(this.maxDate.getDate());
    this.maxDate.setHours(23, 59, 59, 999);
    this.getFoodOrderList();
  }
  getFoodOrderList() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.searchObj.orgId = _this.orgAdmin?.orgDetails._id;
      _this.searchObj.fromDate = _this.dateGroup.value.start;
      _this.searchObj.toDate = _this.dateGroup.value.end;
      try {
        const data = yield _this.apiMainService.getBulkOrderForChart(_this.searchObj);
        _this.initialOrdersData = data;
        const formattedData = data.map(item => ({
          name: item.orderType,
          y: item.percentage,
          count: item.count
        }));
        _this.chartOptionsPie = {
          ..._this.chartOptionsPie,
          series: [{
            type: 'pie',
            name: 'Percentage',
            data: formattedData
          }]
        };
        _this.updateOrdersFlag = true;
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    })();
  }
  changeDate() {
    this.getFoodOrderList();
  }
  static #_ = this.ɵfac = function OrgBulkOrderHistoryComponent_Factory(t) {
    return new (t || OrgBulkOrderHistoryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_2__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_3__.LocalStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_service_search_filter_service__WEBPACK_IMPORTED_MODULE_4__.SearchFilterService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: OrgBulkOrderHistoryComponent,
    selectors: [["app-org-bulk-order-history"]],
    inputs: {
      adminOrg: "adminOrg"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵNgOnChangesFeature"]],
    decls: 18,
    vars: 6,
    consts: [[1, "container-fluid", "py-3"], [1, "mb-4"], ["appearance", "outline"], [3, "formGroup", "rangePicker", "max"], ["matStartDate", "", "placeholder", "Start date", "formControlName", "start"], ["matEndDate", "", "placeholder", "End date", "formControlName", "end", 3, "dateChange"], ["matIconSuffix", "", 3, "for"], ["picker", ""], [1, "row", "mt-3"], [1, "col-lg-12"], [1, "card", "shadow", "border-0", "rounded-lg", "card-hover", "overflow-hidden"], ["style", "width: 100%; height: 400px; display: block", 3, "Highcharts", "options", "update", "oneToOne", 4, "ngIf"], [1, "h-100", "d-flex", "justify-content-center", "align-items-center", "pt-2"], [4, "ngIf"], [2, "width", "100%", "height", "400px", "display", "block", 3, "Highcharts", "options", "update", "oneToOne"]],
    template: function OrgBulkOrderHistoryComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Bulk Order History");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "mat-form-field", 2)(4, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "Enter a date range");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "mat-date-range-input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("dateChange", function OrgBulkOrderHistoryComponent_Template_input_dateChange_8_listener() {
          return ctx.changeDate();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "mat-datepicker-toggle", 6)(10, "mat-date-range-picker", null, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "div", 8)(13, "div", 9)(14, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](15, OrgBulkOrderHistoryComponent_highcharts_chart_15_Template, 1, 4, "highcharts-chart", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, OrgBulkOrderHistoryComponent_p_17_Template, 2, 0, "p", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formGroup", ctx.dateGroup)("rangePicker", _r0)("max", ctx.maxDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("for", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.initialOrdersData.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.initialOrdersData.length <= 0);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControlName, highcharts_angular__WEBPACK_IMPORTED_MODULE_8__.HighchartsChartComponent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatSuffix, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__.MatDatepickerToggle, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__.MatDateRangeInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__.MatStartDate, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__.MatEndDate, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__.MatDateRangePicker],
    styles: [".card-hover[_ngcontent-%COMP%] {\n  border-radius: 20px;\n  background-color: #f8f9fa;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n\n.card-hover[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvb3JnLWNvbXBvbmVudHMvb3JnLWJ1bGstb3JkZXItaGlzdG9yeS9vcmctYnVsay1vcmRlci1oaXN0b3J5LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksbUJBQUE7RUFDQSx5QkFBQTtFQUNBLHFEQUFBO0FBQ0o7O0FBQ0U7RUFDRSwyQkFBQTtFQUNBLDBDQUFBO0FBRUoiLCJzb3VyY2VzQ29udGVudCI6WyIuY2FyZC1ob3ZlciB7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtcclxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xyXG4gIH1cclxuICAuY2FyZC1ob3Zlcjpob3ZlciB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTVweCk7XHJcbiAgICBib3gtc2hhZG93OiAwIDhweCAxNnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XHJcbiAgfSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 48351:
/*!****************************************************************************************!*\
  !*** ./src/app/org-components/org-bulk-order-history/org-bulk-order-history.module.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgBulkOrderHistoryModule: () => (/* binding */ OrgBulkOrderHistoryModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _org_bulk_order_history_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-bulk-order-history-routing.module */ 16205);
/* harmony import */ var _org_bulk_order_history_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./org-bulk-order-history.component */ 86319);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! highcharts-angular */ 88578);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/datepicker */ 82226);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);









class OrgBulkOrderHistoryModule {
  static #_ = this.ɵfac = function OrgBulkOrderHistoryModule_Factory(t) {
    return new (t || OrgBulkOrderHistoryModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: OrgBulkOrderHistoryModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _org_bulk_order_history_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgBulkOrderHistoryRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_5__.HighchartsChartModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormFieldModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_7__.MatDatepickerModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MatNativeDateModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](OrgBulkOrderHistoryModule, {
    declarations: [_org_bulk_order_history_component__WEBPACK_IMPORTED_MODULE_1__.OrgBulkOrderHistoryComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _org_bulk_order_history_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgBulkOrderHistoryRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_5__.HighchartsChartModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormFieldModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_7__.MatDatepickerModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MatNativeDateModule],
    exports: [_org_bulk_order_history_component__WEBPACK_IMPORTED_MODULE_1__.OrgBulkOrderHistoryComponent]
  });
})();

/***/ })

}]);
//# sourceMappingURL=default-src_app_org-components_org-bulk-order-history_org-bulk-order-history_module_ts.js.map