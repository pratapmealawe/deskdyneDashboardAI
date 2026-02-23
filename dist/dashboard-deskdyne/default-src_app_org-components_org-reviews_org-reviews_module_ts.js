(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["default-src_app_org-components_org-reviews_org-reviews_module_ts"],{

/***/ 6610:
/*!**************************************************************************!*\
  !*** ./src/app/org-components/org-reviews/org-reviews-routing.module.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgReviewsRoutingModule: () => (/* binding */ OrgReviewsRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _org_reviews_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-reviews.component */ 20279);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: "",
  component: _org_reviews_component__WEBPACK_IMPORTED_MODULE_0__.OrgReviewsComponent
}];
class OrgReviewsRoutingModule {
  static #_ = this.ɵfac = function OrgReviewsRoutingModule_Factory(t) {
    return new (t || OrgReviewsRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: OrgReviewsRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](OrgReviewsRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 20279:
/*!*********************************************************************!*\
  !*** ./src/app/org-components/org-reviews/org-reviews.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgReviewsComponent: () => (/* binding */ OrgReviewsComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! highcharts */ 55080);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var highcharts_modules_drilldown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! highcharts/modules/drilldown */ 31360);
/* harmony import */ var highcharts_modules_drilldown__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(highcharts_modules_drilldown__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! exceljs */ 94262);
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(exceljs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! file-saver */ 46778);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! pdfmake/build/pdfmake */ 98853);
/* harmony import */ var pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! pdfmake/build/vfs_fonts */ 45217);
/* harmony import */ var pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/service/local-storage.service */ 48798);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! highcharts-angular */ 88578);
/* harmony import */ var _common_outlet_cafe_select_common_outlet_cafe_select_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../common-outlet-cafe-select/common-outlet-cafe-select.component */ 60627);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/card */ 18497);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/paginator */ 39687);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var _org_order_org_order_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./org-order/org-order.component */ 47965);



















function OrgReviewsComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div")(1, "app-common-outlet-cafe-select", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("submitted", function OrgReviewsComponent_div_3_Template_app_common_outlet_cafe_select_submitted_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r4.filterSubmitted($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("config", ctx_r0.headerConfigAdmin);
  }
}
function OrgReviewsComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div")(1, "app-common-outlet-cafe-select", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("submitted", function OrgReviewsComponent_div_4_Template_app_common_outlet_cafe_select_submitted_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r6.filterSubmitted($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("config", ctx_r1.headerConfig);
  }
}
function OrgReviewsComponent_div_5_div_13_ng_container_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "app-org-order", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const feedback_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("order", feedback_r12);
  }
}
const _c0 = function () {
  return [10, 50, 100, 200, 500];
};
function OrgReviewsComponent_div_5_div_13_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, OrgReviewsComponent_div_5_div_13_ng_container_1_div_1_Template, 2, 1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "mat-paginator", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("page", function OrgReviewsComponent_div_5_div_13_ng_container_1_Template_mat_paginator_page_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r14.onPageChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r9.paginatedReviewList);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("length", ctx_r9.reviewList.length)("pageSize", ctx_r9.pageSize)("pageIndex", ctx_r9.pageIndex)("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction0"](5, _c0));
  }
}
function OrgReviewsComponent_div_5_div_13_div_2_highcharts_chart_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "highcharts-chart", 27);
  }
  if (rf & 2) {
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("Highcharts", ctx_r16.Highcharts)("options", ctx_r16.chartOptionsPie)("update", ctx_r16.updateStatusFlag)("oneToOne", ctx_r16.oneToOneStatusFlag);
  }
}
function OrgReviewsComponent_div_5_div_13_div_2_p_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "No Data Found");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
}
function OrgReviewsComponent_div_5_div_13_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 22)(1, "div", 23)(2, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](3, OrgReviewsComponent_div_5_div_13_div_2_highcharts_chart_3_Template, 1, 4, "highcharts-chart", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](5, OrgReviewsComponent_div_5_div_13_div_2_p_5_Template, 2, 0, "p", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r10.reviewList.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r10.reviewList.length <= 0);
  }
}
function OrgReviewsComponent_div_5_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, OrgReviewsComponent_div_5_div_13_ng_container_1_Template, 3, 6, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, OrgReviewsComponent_div_5_div_13_div_2_Template, 6, 2, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx_r8.isChartShow);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r8.isChartShow);
  }
}
function OrgReviewsComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 6)(1, "div", 7)(2, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](3, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "div", 10)(5, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function OrgReviewsComponent_div_5_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r18.excelExport());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7, "table_chart");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function OrgReviewsComponent_div_5_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r19);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r20.downloadPdf());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](10, "picture_as_pdf");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](11, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function OrgReviewsComponent_div_5_Template_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r19);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r21.changeDataView());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](12, "i", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](13, OrgReviewsComponent_div_5_div_13_Template, 3, 2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngClass", ctx_r2.isChartShow ? "bi-table" : "bi-graph-down");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r2.paginatedReviewList.length > 0);
  }
}
function OrgReviewsComponent_mat_card_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-card", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, " No Reviews found ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
}
pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_5__.vfs = pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_6__.pdfMake?.vfs ?? pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_6__.vfs ?? {};
highcharts_modules_drilldown__WEBPACK_IMPORTED_MODULE_2___default()(highcharts__WEBPACK_IMPORTED_MODULE_1__);
class OrgReviewsComponent {
  constructor(apiMainService, localStorageService) {
    this.apiMainService = apiMainService;
    this.localStorageService = localStorageService;
    this.Highcharts = highcharts__WEBPACK_IMPORTED_MODULE_1__;
    this.orglist = [];
    this.isAdmin = false;
    this.reviewList = [];
    this.paginatedReviewList = [];
    this.expandedItems = [];
    this.headerConfig = {
      mode: 'outlet',
      showDateRange: true,
      disableOrg: true,
      requireAll: true
    };
    this.headerConfigAdmin = {
      mode: 'outlet',
      showDateRange: true,
      disableOrg: false,
      requireAll: true
    };
    this.outletList = [];
    this.isChartShow = false;
    // Chart
    this.chartOptionsPie = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Kitchen Star Ratings'
      },
      subtitle: {
        text: 'Click a slice to drill down'
      },
      accessibility: {
        announceNewData: {
          enabled: true
        },
        point: {
          valueSuffix: '%'
        }
      },
      tooltip: {
        // We show both count and percentage in the tooltip
        headerFormat: '',
        pointFormat: '<b>{point.name}</b><br>' + 'Count: <b>{point.count}</b><br>' + 'Percent: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.percentage:.1f}%'
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Ratings',
        data: []
      }],
      drilldown: {
        series: []
      }
    };
    this.updateStatusFlag = false;
    this.oneToOneStatusFlag = true;
    this.initialStatusData = [];
    this.drilldownFlag = false;
    //pagination
    this.page = 1;
    this.pageSize = 10;
    this.pageIndex = 0;
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
        defaultOrgId: this.adminOrg?._id
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
    }
    if (!this.adminOrg && this.orgAdmin?.role !== 'ORGADMIN') {
      this.isAdmin = true;
      this.headerConfig = {
        ...this.headerConfigAdmin
      };
    }
  }
  getfeedbacklistByfilter(payload) {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this.isChartShow = false;
        const reviewList = yield _this.apiMainService.getfeedbacklistByfilter(payload);
        _this.reviewList = [...reviewList];
        _this.addPagination();
      } catch (e) {
        console.log('Error while fetching config variables ', e);
      }
    })();
  }
  toggleFeedback(index) {
    this.expandedItems[index] = !this.expandedItems[index];
  }
  changeDataView() {
    if (!this.isChartShow) {
      this.generateDrilldownChartData();
    } else {
      this.isChartShow = false;
    }
  }
  generateDrilldownChartData() {
    const ratingTotals = {};
    const ratingItemCount = {};
    const ratingItemContains = {};
    this.reviewList.forEach(feedback => {
      feedback.itemlist.forEach(item => {
        const rating = item.starRatingKitchen ?? 0;
        const itemName = item.itemName;
        const containsList = item.itemContains || [];
        ratingTotals[rating] = (ratingTotals[rating] || 0) + 1;
        ratingItemCount[rating] = ratingItemCount[rating] || {};
        ratingItemCount[rating][itemName] = (ratingItemCount[rating][itemName] || 0) + 1;
        ratingItemContains[rating] = ratingItemContains[rating] || {};
        ratingItemContains[rating][itemName] = ratingItemContains[rating][itemName] || {};
        containsList.forEach(sub => {
          const subName = sub.name;
          ratingItemContains[rating][itemName][subName] = (ratingItemContains[rating][itemName][subName] || 0) + 1;
        });
      });
    });
    const totalItemsAcrossAllRatings = Object.values(ratingTotals).reduce((acc, cnt) => acc + cnt, 0);
    const topLevelData = Object.keys(ratingTotals).map(key => {
      const numericKey = Number(key);
      const count = ratingTotals[numericKey];
      const percentage = count / totalItemsAcrossAllRatings * 100;
      return {
        name: `${numericKey} star${numericKey !== 1 ? 's' : ''}`,
        y: percentage,
        count: count,
        drilldown: `rating-${numericKey}`
      };
    });
    const firstLevelDrill = [];
    Object.keys(ratingItemCount || {}).forEach(ratingKey => {
      const ratingNum = Number(ratingKey);
      const itemMap = ratingItemCount[ratingNum] || {};
      const itemTotal = ratingTotals[ratingNum] || 0;
      if (!itemTotal || Object.keys(itemMap).length === 0) return;
      const dataArray = Object.keys(itemMap).map(itemName => {
        const cnt = itemMap[itemName] || 0;
        const pct = itemTotal ? cnt / itemTotal * 100 : 0;
        const hasContains = ratingItemContains && ratingItemContains[ratingNum] && ratingItemContains[ratingNum][itemName];
        return {
          name: itemName,
          y: pct,
          count: cnt,
          drilldown: hasContains ? `rating-${ratingNum}-${itemName}` : null
        };
      });
      if (dataArray.length > 0) {
        firstLevelDrill.push({
          id: `rating-${ratingNum}`,
          name: `Items with ${ratingNum} star${ratingNum !== 1 ? 's' : ''}`,
          type: 'pie',
          data: dataArray
        });
      }
    });
    const secondLevelDrill = [];
    Object.keys(ratingItemContains).forEach(ratingKey => {
      const ratingNum = Number(ratingKey);
      const itemsUnderRating = ratingItemContains[ratingNum];
      const safeItemsUnderRating = itemsUnderRating || {};
      Object.keys(safeItemsUnderRating).forEach(itemName => {
        const subMap = safeItemsUnderRating[itemName] || {}; // fallback to empty object
        const subKeys = Object.keys(subMap);
        // If no sub items → skip safely
        if (subKeys.length === 0) return;
        const totalSubItems = Object.values(subMap).reduce((acc, c) => acc + (Number(c) || 0), 0);
        // Avoid division by zero
        if (totalSubItems === 0) return;
        const dataArray = subKeys.map(subName => {
          const cnt = Number(subMap[subName]) || 0;
          const pct = cnt / totalSubItems * 100;
          return {
            name: subName,
            y: pct,
            count: cnt,
            drilldown: null
          };
        });
        if (dataArray.length === 0) return;
        secondLevelDrill.push({
          id: `rating-${ratingNum}-${itemName}`,
          name: `Components of ${itemName}`,
          type: 'pie',
          data: dataArray
        });
      });
    });
    // 5. Put everything into chartOptionsPie
    this.chartOptionsPie = {
      ...this.chartOptionsPie,
      series: [{
        type: 'pie',
        name: 'Ratings',
        data: topLevelData
      }],
      drilldown: {
        series: [...firstLevelDrill, ...secondLevelDrill]
      }
    };
    // 6. Flip flags so Highcharts re-renders
    this.isChartShow = true;
    this.updateStatusFlag = true;
    this.drilldownFlag = true;
  }
  excelExport() {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const workbook = new exceljs__WEBPACK_IMPORTED_MODULE_3__.Workbook();
      const worksheet = workbook.addWorksheet('Reviews');
      // ------------------------------------------------------------------
      //                     TABLE COLUMN DEFINITIONS
      // ------------------------------------------------------------------
      worksheet.columns = [{
        header: 'Order No',
        key: 'feedbackOrderNo',
        width: 12
      }, {
        header: 'User Name',
        key: 'feedbackFrom_name',
        width: 15
      }, {
        header: 'Submitted Date',
        key: 'submitedDate',
        width: 20
      }, {
        header: 'Rating',
        key: 'rating',
        width: 10
      }, {
        header: 'Feedback',
        key: 'feedback',
        width: 30
      }, {
        header: 'Items',
        key: 'items',
        width: 30
      }];
      // ------------------------------------------------------------------
      //                        HEADER ROW
      // ------------------------------------------------------------------
      const headerRow = worksheet.getRow(0);
      headerRow.values = ["", ...worksheet.columns.map(col => col.header)];
      headerRow.font = {
        bold: true
      };
      // ------------------------------------------------------------------
      //                        DATA ROWS
      // ------------------------------------------------------------------
      _this2.reviewList.forEach(order => {
        const items = (order.itemList || order.itemlist || []).map(i => `${i.itemName} x${i.count}`).join(', ');
        worksheet.addRow({
          feedbackOrderNo: order.feedbackOrderNo,
          feedbackFrom_name: order.feedbackFrom_name || '-',
          submitedDate: new Date(order.SubmitedDate).toLocaleDateString('en-IN'),
          rating: order.rating || 0,
          feedback: order.feedback || 'Skipped',
          items
        });
      });
      // ------------------------------------------------------------------
      //                      TABLE BORDERS
      // ------------------------------------------------------------------
      worksheet.eachRow(row => {
        row.eachCell(cell => {
          cell.border = {
            top: {
              style: 'thin'
            },
            left: {
              style: 'thin'
            },
            bottom: {
              style: 'thin'
            },
            right: {
              style: 'thin'
            }
          };
        });
      });
      // ------------------------------------------------------------------
      //                      SAVE EXCEL FILE
      // ------------------------------------------------------------------
      const buffer = yield workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const filename = `reviews_${new Date().toISOString().slice(0, 10)}.xlsx`;
      (0,file_saver__WEBPACK_IMPORTED_MODULE_4__.saveAs)(blob, filename);
    })();
  }
  downloadPdf() {
    const title = `Outlet Review Report`;
    const orgName = this.orgAdmin?.orgDetails?.organization_name || '-';
    const cafeteria = this.orgAdmin?.cafeDetails[0]?.cafeteria_name || '-';
    const outlet = this.orgAdmin?.outletName || '-';
    const documentDefinition = {
      pageSize: 'A4',
      pageMargins: [30, 30, 30, 30],
      content: [
      // ------------------------------------------------------------
      //                      TITLE SECTION
      // ------------------------------------------------------------
      {
        text: title,
        style: 'title',
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },
      // ------------------------------------------------------------
      //                     ORG DETAILS
      // ------------------------------------------------------------
      {
        columns: [{
          width: '*',
          text: [{
            text: 'Organization: ',
            bold: true
          }, `${orgName}\n`, {
            text: 'Cafeteria: ',
            bold: true
          }, `${cafeteria}\n`, {
            text: 'Outlet: ',
            bold: true
          }, `${outlet}\n`],
          margin: [0, 0, 0, 10]
        }]
      },
      // ------------------------------------------------------------
      //                   TABLE OF REVIEWS
      // ------------------------------------------------------------
      {
        style: 'tableStyle',
        table: {
          widths: ['auto', '*', '*', 'auto', '*', '*'],
          headerRows: 1,
          body: [[{
            text: 'Order No',
            bold: true
          }, {
            text: 'User Name',
            bold: true
          }, {
            text: 'Submitted Date',
            bold: true
          }, {
            text: 'Rating',
            bold: true
          }, {
            text: 'Feedback',
            bold: true
          }, {
            text: 'Items',
            bold: true
          }], ...this.reviewList.map(order => {
            const items = (order.itemList || order.itemlist || []).map(i => `${i.itemName} x${i.count}`).join(', ');
            return [order.feedbackOrderNo || '-', order.feedbackFrom_name || '-', new Date(order.SubmitedDate).toLocaleDateString('en-IN'), order.rating ?? 0, order.feedback || 'Skipped', items];
          })]
        },
        layout: {
          fillColor: rowIndex => rowIndex === 0 ? '#eeeeee' : null,
          hLineWidth: () => 0.7,
          vLineWidth: () => 0.7
        }
      }],
      // ------------------------------------------------------------
      //                   PDF STYLES
      // ------------------------------------------------------------
      styles: {
        title: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        tableStyle: {
          margin: [0, 10, 0, 0]
        }
      }
    };
    pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_5__.createPdf(documentDefinition).download(`reviews_${new Date().toISOString().slice(0, 10)}.pdf`);
  }
  addPagination() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedReviewList = this.reviewList.slice(start, end);
  }
  onPageChange(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.addPagination();
  }
  filterSubmitted(event) {
    const body = {
      orgId: event.org_id,
      outletId: event.outlet_id,
      fromDate: event.date_from,
      toDate: event.date_to
    };
    this.getfeedbacklistByfilter(body);
  }
  static #_ = this.ɵfac = function OrgReviewsComponent_Factory(t) {
    return new (t || OrgReviewsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_7__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_8__.LocalStorageService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
    type: OrgReviewsComponent,
    selectors: [["app-org-reviews"]],
    inputs: {
      adminOrg: "adminOrg"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵNgOnChangesFeature"]],
    decls: 7,
    vars: 4,
    consts: [[1, "container-fluid"], [1, "mb-0", "pb-4"], [4, "ngIf"], ["class", "pb-4", 4, "ngIf"], ["class", "center labelText mt-2 py-2 rounded-4", 4, "ngIf"], [3, "config", "submitted"], [1, "pb-4"], [1, "row", "my-2", "align-items-center"], [1, "col-12", "col-md-8"], [1, "d-flex", "flex-wrap", "gap-2"], [1, "col-12", "col-md-4", "d-flex", "justify-content-end", "gap-2", "mt-2", "mt-md-0"], ["mat-mini-fab", "", "matTooltip", "Excel Export", 1, "excel-btn", 3, "click"], ["mat-mini-fab", "", "color", "primary", "matTooltip", "Download PDF", 3, "click"], ["mat-mini-fab", "", "color", "primary", "matTooltip", "Change View", 1, "btn", "iconBtn", 3, "click"], [1, "bi", 3, "ngClass"], ["class", "mt-2", 4, "ngIf"], [1, "mt-2"], ["class", "row", 4, "ngIf"], ["class", "feedback-container", 4, "ngFor", "ngForOf"], ["showFirstLastButtons", "", 3, "length", "pageSize", "pageIndex", "pageSizeOptions", "page"], [1, "feedback-container"], [3, "order"], [1, "row"], [1, "col-12"], [1, "card", "shadow", "border-0", "rounded-lg", "card-hover", "overflow-hidden"], ["style", "width: 100%; height: 400px; display: block", 3, "Highcharts", "options", "update", "oneToOne", 4, "ngIf"], [1, "h-100", "d-flex", "justify-content-center", "align-items-center", "pt-2"], [2, "width", "100%", "height", "400px", "display", "block", 3, "Highcharts", "options", "update", "oneToOne"], [1, "center", "labelText", "mt-2", "py-2", "rounded-4"]],
    template: function OrgReviewsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 0)(1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2, "Reviews");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](3, OrgReviewsComponent_div_3_Template, 2, 1, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](4, OrgReviewsComponent_div_4_Template, 2, 1, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](5, OrgReviewsComponent_div_5_Template, 14, 2, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](6, OrgReviewsComponent_mat_card_6_Template, 2, 0, "mat-card", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.isAdmin);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx.isAdmin);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.reviewList.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.reviewList.length == 0);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, highcharts_angular__WEBPACK_IMPORTED_MODULE_13__.HighchartsChartComponent, _common_outlet_cafe_select_common_outlet_cafe_select_component__WEBPACK_IMPORTED_MODULE_9__.CommonOutletCafeSelectComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatMiniFabButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_card__WEBPACK_IMPORTED_MODULE_16__.MatCard, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_17__.MatPaginator, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_18__.MatTooltip, _org_order_org_order_component__WEBPACK_IMPORTED_MODULE_10__.OrgOrderComponent],
    styles: [".iconBtn[_ngcontent-%COMP%] {\n  background: #8a8a8a;\n  color: white;\n  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;\n}\n\n.excel-btn[_ngcontent-%COMP%] {\n  background: #327a4d !important;\n  color: white !important;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvb3JnLWNvbXBvbmVudHMvb3JnLXJldmlld3Mvb3JnLXJldmlld3MuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxpREFBQTtBQUNKOztBQUVBO0VBQ0ksOEJBQUE7RUFDQSx1QkFBQTtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLmljb25CdG4ge1xyXG4gICAgYmFja2dyb3VuZDogIzhhOGE4YTtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJveC1zaGFkb3c6IHJnYmEoOTksIDk5LCA5OSwgMC4yKSAwcHggMnB4IDhweCAwcHg7XHJcbn1cclxuXHJcbi5leGNlbC1idG4ge1xyXG4gICAgYmFja2dyb3VuZDogIzMyN2E0ZCAhaW1wb3J0YW50O1xyXG4gICAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 81906:
/*!******************************************************************!*\
  !*** ./src/app/org-components/org-reviews/org-reviews.module.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgReviewsModule: () => (/* binding */ OrgReviewsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _org_reviews_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-reviews-routing.module */ 6610);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _org_reviews_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./org-reviews.component */ 20279);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! highcharts-angular */ 88578);
/* harmony import */ var src_app_common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/common-outlet-cafe-select/common-outlet-cafe-select.module */ 58481);
/* harmony import */ var src_app_material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/material.module */ 29099);
/* harmony import */ var _org_order_org_order_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./org-order/org-order.module */ 68378);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 61699);









class OrgReviewsModule {
  static #_ = this.ɵfac = function OrgReviewsModule_Factory(t) {
    return new (t || OrgReviewsModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
    type: OrgReviewsModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _org_reviews_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgReviewsRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_8__.HighchartsChartModule, src_app_common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_2__.CommonOutletCafeSelectModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_3__.MaterialModule, _org_order_org_order_module__WEBPACK_IMPORTED_MODULE_4__.OrgOrderModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](OrgReviewsModule, {
    declarations: [_org_reviews_component__WEBPACK_IMPORTED_MODULE_1__.OrgReviewsComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _org_reviews_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgReviewsRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_8__.HighchartsChartModule, src_app_common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_2__.CommonOutletCafeSelectModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_3__.MaterialModule, _org_order_org_order_module__WEBPACK_IMPORTED_MODULE_4__.OrgOrderModule],
    exports: [_org_reviews_component__WEBPACK_IMPORTED_MODULE_1__.OrgReviewsComponent]
  });
})();

/***/ }),

/***/ 31360:
/*!******************************************************!*\
  !*** ./node_modules/highcharts/modules/drilldown.js ***!
  \******************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!
/**
* Highcharts JS v11.4.8 (2024-08-29)
*
* Highcharts Drilldown module
*
* Author: Torstein Honsi
* License: www.highcharts.com/license
*
*/
function (t) {
   true && module.exports ? (t.default = t, module.exports = t) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! highcharts */ 55080)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (e) {
    return t(e), t.Highcharts = e, t;
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}(function (t) {
  "use strict";

  var e = t ? t._modules : {};
  function i(e, i, o, l) {
    e.hasOwnProperty(i) || (e[i] = l.apply(null, o), "function" == typeof CustomEvent && t.win.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
      detail: {
        path: i,
        module: e[i]
      }
    })));
  }
  i(e, "Extensions/Breadcrumbs/BreadcrumbsDefaults.js", [], function () {
    return {
      lang: {
        mainBreadcrumb: "Main"
      },
      options: {
        buttonTheme: {
          fill: "none",
          height: 18,
          padding: 2,
          "stroke-width": 0,
          zIndex: 7,
          states: {
            select: {
              fill: "none"
            }
          },
          style: {
            color: "#334eff"
          }
        },
        buttonSpacing: 5,
        floating: !1,
        format: void 0,
        relativeTo: "plotBox",
        rtl: !1,
        position: {
          align: "left",
          verticalAlign: "top",
          x: 0,
          y: void 0
        },
        separator: {
          text: "/",
          style: {
            color: "#666666",
            fontSize: "0.8em"
          }
        },
        showFullPath: !0,
        style: {},
        useHTML: !1,
        zIndex: 7
      }
    };
  }), i(e, "Extensions/Breadcrumbs/Breadcrumbs.js", [e["Extensions/Breadcrumbs/BreadcrumbsDefaults.js"], e["Core/Templating.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e, i, o) {
    let {
        format: l
      } = e,
      {
        composed: s
      } = i,
      {
        addEvent: r,
        defined: n,
        extend: a,
        fireEvent: d,
        isString: p,
        merge: h,
        objectEach: u,
        pick: c,
        pushUnique: m
      } = o;
    function w() {
      if (this.breadcrumbs) {
        let t = this.resetZoomButton && this.resetZoomButton.getBBox(),
          e = this.breadcrumbs.options;
        t && "right" === e.position.align && "plotBox" === e.relativeTo && this.breadcrumbs.alignBreadcrumbsGroup(-t.width - e.buttonSpacing);
      }
    }
    function f() {
      this.breadcrumbs && (this.breadcrumbs.destroy(), this.breadcrumbs = void 0);
    }
    function g() {
      let t = this.breadcrumbs;
      if (t && !t.options.floating && t.level) {
        let e = t.options,
          i = e.buttonTheme,
          o = (i.height || 0) + 2 * (i.padding || 0) + e.buttonSpacing,
          l = e.position.verticalAlign;
        "bottom" === l ? (this.marginBottom = (this.marginBottom || 0) + o, t.yOffset = o) : "middle" !== l ? (this.plotTop += o, t.yOffset = -o) : t.yOffset = void 0;
      }
    }
    function b() {
      this.breadcrumbs && this.breadcrumbs.redraw();
    }
    function v(t) {
      !0 === t.resetSelection && this.breadcrumbs && this.breadcrumbs.alignBreadcrumbsGroup();
    }
    class y {
      static compose(e, i) {
        m(s, "Breadcrumbs") && (r(e, "destroy", f), r(e, "afterShowResetZoom", w), r(e, "getMargins", g), r(e, "redraw", b), r(e, "selection", v), a(i.lang, t.lang));
      }
      constructor(t, e) {
        this.elementList = {}, this.isDirty = !0, this.level = 0, this.list = [];
        let i = h(t.options.drilldown && t.options.drilldown.drillUpButton, y.defaultOptions, t.options.navigation && t.options.navigation.breadcrumbs, e);
        this.chart = t, this.options = i || {};
      }
      updateProperties(t) {
        this.setList(t), this.setLevel(), this.isDirty = !0;
      }
      setList(t) {
        this.list = t;
      }
      setLevel() {
        this.level = this.list.length && this.list.length - 1;
      }
      getLevel() {
        return this.level;
      }
      getButtonText(t) {
        let e = this.chart,
          i = this.options,
          o = e.options.lang,
          s = c(i.format, i.showFullPath ? "{level.name}" : "← {level.name}"),
          r = o && c(o.drillUpText, o.mainBreadcrumb),
          a = i.formatter && i.formatter(t) || l(s, {
            level: t.levelOptions
          }, e) || "";
        return (p(a) && !a.length || "← " === a) && n(r) && (a = i.showFullPath ? r : "← " + r), a;
      }
      redraw() {
        this.isDirty && this.render(), this.group && this.group.align(), this.isDirty = !1;
      }
      render() {
        let t = this.chart,
          e = this.options;
        !this.group && e && (this.group = t.renderer.g("breadcrumbs-group").addClass("highcharts-no-tooltip highcharts-breadcrumbs").attr({
          zIndex: e.zIndex
        }).add()), e.showFullPath ? this.renderFullPathButtons() : this.renderSingleButton(), this.alignBreadcrumbsGroup();
      }
      renderFullPathButtons() {
        this.destroySingleButton(), this.resetElementListState(), this.updateListElements(), this.destroyListElements();
      }
      renderSingleButton() {
        let t = this.chart,
          e = this.list,
          i = this.options.buttonSpacing;
        this.destroyListElements();
        let o = this.group ? this.group.getBBox().width : i,
          l = e[e.length - 2];
        !t.drillUpButton && this.level > 0 ? t.drillUpButton = this.renderButton(l, o, i) : t.drillUpButton && (this.level > 0 ? this.updateSingleButton() : this.destroySingleButton());
      }
      alignBreadcrumbsGroup(t) {
        if (this.group) {
          let e = this.options,
            i = e.buttonTheme,
            o = e.position,
            l = "chart" === e.relativeTo || "spacingBox" === e.relativeTo ? void 0 : "plotBox",
            s = this.group.getBBox(),
            r = 2 * (i.padding || 0) + e.buttonSpacing;
          o.width = s.width + r, o.height = s.height + r;
          let n = h(o);
          t && (n.x += t), this.options.rtl && (n.x += o.width), n.y = c(n.y, this.yOffset, 0), this.group.align(n, !0, l);
        }
      }
      renderButton(t, e, i) {
        let o = this,
          l = this.chart,
          s = o.options,
          r = h(s.buttonTheme),
          n = l.renderer.button(o.getButtonText(t), e, i, function (e) {
            let i;
            let l = s.events && s.events.click;
            l && (i = l.call(o, e, t)), !1 !== i && (s.showFullPath ? e.newLevel = t.level : e.newLevel = o.level - 1, d(o, "up", e));
          }, r).addClass("highcharts-breadcrumbs-button").add(o.group);
        return l.styledMode || n.attr(s.style), n;
      }
      renderSeparator(t, e) {
        let i = this.chart,
          o = this.options.separator,
          l = i.renderer.label(o.text, t, e, void 0, void 0, void 0, !1).addClass("highcharts-breadcrumbs-separator").add(this.group);
        return i.styledMode || l.css(o.style), l;
      }
      update(t) {
        h(!0, this.options, t), this.destroy(), this.isDirty = !0;
      }
      updateSingleButton() {
        let t = this.chart,
          e = this.list[this.level - 1];
        t.drillUpButton && t.drillUpButton.attr({
          text: this.getButtonText(e)
        });
      }
      destroy() {
        this.destroySingleButton(), this.destroyListElements(!0), this.group && this.group.destroy(), this.group = void 0;
      }
      destroyListElements(t) {
        let e = this.elementList;
        u(e, (i, o) => {
          (t || !e[o].updated) && ((i = e[o]).button && i.button.destroy(), i.separator && i.separator.destroy(), delete i.button, delete i.separator, delete e[o]);
        }), t && (this.elementList = {});
      }
      destroySingleButton() {
        this.chart.drillUpButton && (this.chart.drillUpButton.destroy(), this.chart.drillUpButton = void 0);
      }
      resetElementListState() {
        u(this.elementList, t => {
          t.updated = !1;
        });
      }
      updateListElements() {
        let t = this.elementList,
          e = this.options.buttonSpacing,
          i = this.list,
          o = this.options.rtl,
          l = o ? -1 : 1,
          s = function (t, e) {
            return l * t.getBBox().width + l * e;
          },
          r = function (t, e, i) {
            t.translate(e - t.getBBox().width, i);
          },
          n = this.group ? s(this.group, e) : e,
          a,
          d;
        for (let p = 0, h = i.length; p < h; ++p) {
          let u, c;
          let m = p === h - 1;
          t[(d = i[p]).level] ? (u = (a = t[d.level]).button, a.separator || m ? a.separator && m && (a.separator.destroy(), delete a.separator) : (n += l * e, a.separator = this.renderSeparator(n, e), o && r(a.separator, n, e), n += s(a.separator, e)), t[d.level].updated = !0) : (u = this.renderButton(d, n, e), o && r(u, n, e), n += s(u, e), m || (c = this.renderSeparator(n, e), o && r(c, n, e), n += s(c, e)), t[d.level] = {
            button: u,
            separator: c,
            updated: !0
          }), u && u.setState(m ? 2 : 0);
        }
      }
    }
    return y.defaultOptions = t.options, y;
  }), i(e, "Extensions/Drilldown/DrilldownDefaults.js", [], function () {
    return {
      activeAxisLabelStyle: {
        cursor: "pointer",
        color: "#0022ff",
        fontWeight: "bold",
        textDecoration: "underline"
      },
      activeDataLabelStyle: {
        cursor: "pointer",
        color: "#0022ff",
        fontWeight: "bold",
        textDecoration: "underline"
      },
      animation: {
        duration: 500
      },
      drillUpButton: {
        position: {
          align: "right",
          x: -10,
          y: 10
        }
      },
      mapZooming: !0
    };
  }), i(e, "Extensions/Drilldown/DrilldownSeries.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Utilities.js"]], function (t, e) {
    let {
        animObject: i
      } = t,
      {
        addEvent: o,
        extend: l,
        fireEvent: s,
        merge: r,
        pick: n,
        syncTimeout: a
      } = e;
    function d(t, e, i, o) {
      t[i ? "addClass" : "removeClass"]("highcharts-drilldown-point"), o || t.css({
        cursor: e
      });
    }
    function p(t) {
      let e = this,
        o = e.chart,
        s = o.drilldownLevels,
        r = i((o.options.drilldown || {}).animation),
        a = this.xAxis,
        d = o.styledMode;
      if (!t) {
        let t;
        (s || []).forEach(i => {
          e.options._ddSeriesId === i.lowerSeriesOptions._ddSeriesId && (t = i.shapeArgs, !d && t && (t.fill = i.color));
        }), t.x += n(a.oldPos, a.pos) - a.pos, e.points.forEach(i => {
          let o = i.shapeArgs;
          d || (o.fill = i.color), i.graphic && i.graphic.attr(t).animate(l(i.shapeArgs, {
            fill: i.color || e.color
          }), r);
        }), o.drilldown && o.drilldown.fadeInGroup(this.dataLabelsGroup), delete this.animate;
      }
    }
    function h(t) {
      let e = this,
        o = i((e.chart.options.drilldown || {}).animation);
      (e.trackerGroups || []).forEach(t => {
        e[t] && e[t].on("mouseover");
      });
      let l = e.group,
        s = l !== e.chart.columnGroup;
      s && delete e.group, this.points.forEach(i => {
        let n = i.graphic,
          a = t.shapeArgs;
        if (n && a) {
          let d = () => {
            n.destroy(), l && s && (l = l.destroy());
          };
          delete i.graphic, e.chart.styledMode || (a.fill = t.color), o.duration ? n.animate(a, r(o, {
            complete: d
          })) : (n.attr(a), d());
        }
      });
    }
    function u(t) {
      let e = this,
        i = e.drilldownLevel;
      t || (e.points.forEach(t => {
        let e = t.dataLabel;
        t.graphic && t.graphic.hide(), e && (e.hidden = "hidden" === e.attr("visibility"), e.hidden || (e.hide(), e.connector?.hide()));
      }), a(() => {
        if (e.points) {
          let t = [];
          e.data.forEach(e => {
            t.push(e);
          }), e.nodes && (t = t.concat(e.nodes)), t.forEach((t, e) => {
            let o = e === (i && i.pointIndex) ? "show" : "fadeIn",
              l = t.dataLabel;
            t.graphic && t.visible && t.graphic[o]("show" === o || void 0), l && !l.hidden && (l.fadeIn(), l.connector?.fadeIn());
          });
        }
      }, Math.max(e.chart.options.drilldown.animation.duration - 50, 0)), delete this.animate);
    }
    function c(t) {
      let e = this,
        i = e.chart,
        o = e.group;
      i && o && e.options && i.options.drilldown && i.options.drilldown.animation && (t && i.mapView ? (o.attr({
        opacity: .01
      }), i.mapView.allowTransformAnimation = !1, e.options.inactiveOtherPoints = !0, e.options.enableMouseTracking = !1) : (o.animate({
        opacity: 1
      }, i.options.drilldown.animation, () => {
        e.options && (e.options.inactiveOtherPoints = !1, e.options.enableMouseTracking = n(e.userOptions && e.userOptions.enableMouseTracking, !0), e.isDirty = !0, i.redraw());
      }), i.drilldown && i.drilldown.fadeInGroup(this.dataLabelsGroup)));
    }
    function m() {
      let t = this.chart;
      t && t.mapView && (t.mapView.allowTransformAnimation = !1), this.options && (this.options.inactiveOtherPoints = !0);
    }
    function w(t) {
      let e = this.chart,
        i = this.group;
      e && i && (t ? (i.attr({
        opacity: .01
      }), this.options && (this.options.inactiveOtherPoints = !0)) : (i.animate({
        opacity: 1
      }, (e.options.drilldown || {}).animation), e.drilldown && e.drilldown.fadeInGroup(this.dataLabelsGroup)));
    }
    function f() {
      return this.drilldown && !this.unbindDrilldownClick && (this.unbindDrilldownClick = o(this, "click", b)), this;
    }
    function g() {
      let t = this.series,
        e = t.chart.styledMode;
      this.drilldown && t.halo && "hover" === this.state ? d(t.halo, "pointer", !0, e) : t.halo && d(t.halo, "auto", !1, e);
    }
    function b(t) {
      let e = this.series;
      e.xAxis && !1 === (e.chart.options.drilldown || {}).allowPointDrilldown ? e.xAxis.drilldownCategory(this.x, t) : this.runDrilldown(void 0, void 0, t);
    }
    function v(t) {
      let e = t.options || {};
      e.drilldown && !this.unbindDrilldownClick ? this.unbindDrilldownClick = o(this, "click", b) : !e.drilldown && void 0 !== e.drilldown && this.unbindDrilldownClick && (this.unbindDrilldownClick = this.unbindDrilldownClick());
    }
    function y() {
      let t = this.chart,
        e = t.options.drilldown.activeDataLabelStyle,
        i = t.renderer,
        o = t.styledMode;
      for (let t of this.points) {
        let l = t.options.dataLabels,
          s = n(t.dlOptions, l && l.style, {});
        t.drilldown && t.dataLabel && ("contrast" !== e.color || o || (s.color = i.getContrast(t.color || this.color)), l && l.color && (s.color = l.color), t.dataLabel.addClass("highcharts-drilldown-data-label"), o || t.dataLabel.css(e).css(s));
      }
    }
    function D() {
      let t = this.chart.styledMode;
      for (let e of this.points) e.drilldown && e.graphic && d(e.graphic, "pointer", !0, t);
    }
    function x(t) {
      let e = this.chart,
        i = this.points,
        o = e.drilldownLevels[e.drilldownLevels.length - 1],
        l = e.options.drilldown.animation;
      if (this.is("item") && (l.duration = 0), this.center) {
        let s = o.shapeArgs,
          n = s.start,
          a = (s.end - n) / this.points.length,
          d = e.styledMode;
        if (!t) {
          let t, p;
          for (let e = 0, h = i.length; e < h; ++e) t = (p = i[e]).shapeArgs, d || (s.fill = o.color, t.fill = p.color), p.graphic && p.graphic.attr(r(s, {
            start: n + e * a,
            end: n + (e + 1) * a
          }))[l ? "animate" : "attr"](t, l);
          e.drilldown && e.drilldown.fadeInGroup(this.dataLabelsGroup), delete this.animate;
        }
      }
    }
    function S() {
      this.runDrilldown();
    }
    function B(t, e, i) {
      let o = this.series,
        l = o.chart,
        r = l.options.drilldown || {},
        n = (r.series || []).length,
        a;
      for (l.ddDupes || (l.ddDupes = []), l.colorCounter = l.symbolCounter = 0; n-- && !a;) r.series && r.series[n].id === this.drilldown && this.drilldown && -1 === l.ddDupes.indexOf(this.drilldown) && (a = r.series[n], l.ddDupes.push(this.drilldown));
      s(l, "drilldown", {
        point: this,
        seriesOptions: a,
        category: e,
        originalEvent: i,
        points: void 0 !== e && o.xAxis.getDDPoints(e).slice(0)
      }, e => {
        let i = e.point.series && e.point.series.chart,
          o = e.seriesOptions;
        i && o && (t ? i.addSingleSeriesAsDrilldown(e.point, o) : i.addSeriesAsDrilldown(e.point, o));
      });
    }
    return {
      compose: function (t, e) {
        let i = t.prototype.pointClass,
          l = i.prototype;
        if (!l.doDrilldown) {
          let {
            column: s,
            map: r,
            pie: n
          } = e;
          if (o(i, "afterInit", f), o(i, "afterSetState", g), o(i, "update", v), l.doDrilldown = S, l.runDrilldown = B, o(t, "afterDrawDataLabels", y), o(t, "afterDrawTracker", D), s) {
            let t = s.prototype;
            t.animateDrilldown = p, t.animateDrillupFrom = h, t.animateDrillupTo = u;
          }
          if (r) {
            let t = r.prototype;
            t.animateDrilldown = c, t.animateDrillupFrom = m, t.animateDrillupTo = w;
          }
          if (n) {
            let t = n.prototype;
            t.animateDrilldown = x, t.animateDrillupFrom = h, t.animateDrillupTo = u;
          }
        }
      }
    };
  }), i(e, "Extensions/Drilldown/Drilldown.js", [e["Core/Animation/AnimationUtilities.js"], e["Extensions/Breadcrumbs/Breadcrumbs.js"], e["Core/Color/Color.js"], e["Core/Globals.js"], e["Extensions/Drilldown/DrilldownDefaults.js"], e["Extensions/Drilldown/DrilldownSeries.js"], e["Core/Utilities.js"]], function (t, e, i, o, l, s, r) {
    var n;
    let {
        animObject: a
      } = t,
      {
        noop: d
      } = o,
      {
        addEvent: p,
        defined: h,
        diffObjects: u,
        extend: c,
        fireEvent: m,
        merge: w,
        objectEach: f,
        pick: g,
        removeEvent: b,
        syncTimeout: v
      } = r,
      y = 1;
    function D(t, e) {
      this.getDDPoints(t).forEach(function (i) {
        i && i.series && i.series.visible && i.runDrilldown && i.runDrilldown(!0, t, e);
      }), this.chart.applyDrilldown();
    }
    function x(t) {
      return this.ddPoints && this.ddPoints[t] || [];
    }
    function S(t) {
      let e = [],
        i = t.drilldownLevels;
      return i && i.length && (e[0] || e.push({
        level: 0,
        levelOptions: i[0].seriesOptions
      }), i.forEach(function (t) {
        let i = e[e.length - 1];
        t.levelNumber + 1 > i.level && e.push({
          level: t.levelNumber + 1,
          levelOptions: w({
            name: t.lowerSeries.name
          }, t.pointOptions)
        });
      })), e;
    }
    class B {
      constructor(t) {
        this.chart = t;
      }
      addSeriesAsDrilldown(t, e) {
        let i = this.chart || this;
        if (m(this, "addSeriesAsDrilldown", {
          seriesOptions: e
        }), i.mapView) {
          if (t.series.isDrilling = !0, i.series.forEach(t => {
            t.options.inactiveOtherPoints = !0, t.dataLabelsGroup?.destroy(), delete t.dataLabelsGroup;
          }), i.options.drilldown && !i.mapView.projection.hasGeoProjection && l && !h(u(i.options.drilldown, l).mapZooming) && (i.options.drilldown.mapZooming = !1), i.options.drilldown && i.options.drilldown.animation && i.options.drilldown.mapZooming) {
            i.mapView.allowTransformAnimation = !0;
            let o = a(i.options.drilldown.animation);
            if ("boolean" != typeof o) {
              let l = o.complete,
                s = function (o) {
                  o && o.applyDrilldown && i.mapView && (i.addSingleSeriesAsDrilldown(t, e), i.applyDrilldown(), i.mapView.allowTransformAnimation = !1);
                };
              o.complete = function () {
                l && l.apply(this, arguments), s.apply(this, arguments);
              };
            }
            t.zoomTo(o);
          } else i.addSingleSeriesAsDrilldown(t, e), i.applyDrilldown();
        } else i.addSingleSeriesAsDrilldown(t, e), i.applyDrilldown();
      }
      addSingleSeriesAsDrilldown(t, e) {
        let o = this.chart || this,
          l = t.series,
          s = l.xAxis,
          r = l.yAxis,
          n = o.styledMode ? {
            colorIndex: g(t.colorIndex, l.colorIndex)
          } : {
            color: t.color || l.color
          },
          a = l.options._levelNumber || 0,
          p = l.points.indexOf(t);
        o.drilldownLevels || (o.drilldownLevels = []), e = c(c({
          _ddSeriesId: y++
        }, n), e);
        let h = [],
          u = [],
          m;
        (m = o.drilldownLevels[o.drilldownLevels.length - 1]) && m.levelNumber !== a && (m = void 0), l.chart.series.forEach(t => {
          t.xAxis === s && (t.options._ddSeriesId = t.options._ddSeriesId || y++, t.options.colorIndex = t.colorIndex, t.options._levelNumber = t.options._levelNumber || a, m ? (h = m.levelSeries, u = m.levelSeriesOptions) : (h.push(t), t.purgedOptions = w({
            _ddSeriesId: t.options._ddSeriesId,
            _levelNumber: t.options._levelNumber,
            selected: t.options.selected
          }, t.userOptions), u.push(t.purgedOptions)));
        });
        let f = c({
          levelNumber: a,
          seriesOptions: l.options,
          seriesPurgedOptions: l.purgedOptions,
          levelSeriesOptions: u,
          levelSeries: h,
          shapeArgs: t.shapeArgs,
          bBox: t.graphic ? t.graphic.getBBox() : {},
          color: t.isNull ? i.parse(n.color).setOpacity(0).get() : n.color,
          lowerSeriesOptions: e,
          pointOptions: l.options.data[p],
          pointIndex: p,
          oldExtremes: {
            xMin: s && s.userMin,
            xMax: s && s.userMax,
            yMin: r && r.userMin,
            yMax: r && r.userMax
          },
          resetZoomButton: m && m.levelNumber === a ? void 0 : o.resetZoomButton
        }, n);
        o.drilldownLevels.push(f), s && s.names && (s.names.length = 0);
        let b = f.lowerSeries = o.addSeries(e, !1);
        b.options._levelNumber = a + 1, s && (s.oldPos = s.pos, s.userMin = s.userMax = null, r.userMin = r.userMax = null), b.isDrilling = !0, l.type === b.type && (b.animate = b.animateDrilldown || d, b.options.animation = !0);
      }
      applyDrilldown() {
        let t;
        let e = this.chart || this,
          i = e.drilldownLevels;
        i && i.length > 0 && (t = i[i.length - 1].levelNumber, e.hasCartesianSeries = i.some(t => t.lowerSeries.isCartesian), (e.drilldownLevels || []).forEach(i => {
          e.mapView && e.options.drilldown && e.options.drilldown.mapZooming && (e.redraw(), i.lowerSeries.isDrilling = !1, e.mapView.fitToBounds(i.lowerSeries.bounds), i.lowerSeries.isDrilling = !0), i.levelNumber === t && i.levelSeries.forEach(o => {
            if (e.mapView) {
              if (o.options && o.options._levelNumber === t && o.group) {
                let t = {};
                e.options.drilldown && (t = e.options.drilldown.animation), o.group.animate({
                  opacity: 0
                }, t, () => {
                  o.remove(!1), i.levelSeries.filter(t => Object.keys(t).length).length || (e.resetZoomButton && (e.resetZoomButton.hide(), delete e.resetZoomButton), e.pointer?.reset(), m(e, "afterDrilldown"), e.mapView && (e.series.forEach(t => {
                    t.isDirtyData = !0, t.isDrilling = !1;
                  }), e.mapView.fitToBounds(void 0, void 0), e.mapView.allowTransformAnimation = !0), m(e, "afterApplyDrilldown"));
                });
              }
            } else o.options && o.options._levelNumber === t && o.remove(!1);
          });
        })), e.mapView || (e.resetZoomButton && (e.resetZoomButton.hide(), delete e.resetZoomButton), e.pointer?.reset(), m(e, "afterDrilldown"), e.hasCartesianSeries || e.axes.forEach(t => {
          t.destroy(!0), t.init(e, w(t.userOptions, t.options));
        }), e.redraw(), m(e, "afterApplyDrilldown"));
      }
      drillUp(t) {
        let e = this.chart || this;
        if (!e.drilldownLevels || 0 === e.drilldownLevels.length) return;
        m(e, "beforeDrillUp");
        let i = e.drilldownLevels,
          o = i[i.length - 1].levelNumber,
          l = e.series,
          s = e.drilldownLevels.length,
          r = (t, i) => {
            let o;
            if (l.forEach(e => {
              e.options._ddSeriesId === t._ddSeriesId && (o = e);
            }), (o = o || e.addSeries(t, !1)).type === i.type && o.animateDrillupTo && (o.animate = o.animateDrillupTo), t === p.seriesPurgedOptions) return o;
          },
          n = t => {
            t.remove(!1), e.series.forEach(t => {
              t.colorAxis && (t.isDirtyData = !0), t.options.inactiveOtherPoints = !1;
            }), e.redraw();
          },
          a = i.length,
          d,
          p,
          h;
        for (e.symbolCounter = e.colorCounter = 0; a--;) {
          let u, c;
          if ((p = i[a]).levelNumber === o) {
            if (i.pop(), !(u = p.lowerSeries).chart) {
              for (d = l.length; d--;) if (l[d].options.id === p.lowerSeriesOptions.id && l[d].options._levelNumber === o + 1) {
                u = l[d];
                break;
              }
            }
            u.xData = [], u.xAxis && u.xAxis.names && (0 === s || a === s - 1) && (u.xAxis.names.length = 0), p.levelSeriesOptions.forEach(t => {
              let e = r(t, u);
              e && (c = e);
            }), m(e, "drillup", {
              seriesOptions: p.seriesPurgedOptions || p.seriesOptions
            }), c && (c.type === u.type && (c.drilldownLevel = p, c.options.animation = e.options.drilldown.animation, u.animateDrillupFrom && u.chart && u.animateDrillupFrom(p)), c.options._levelNumber = o);
            let w = u;
            if (e.mapView || w.remove(!1), c && c.xAxis && (h = p.oldExtremes, c.xAxis.setExtremes(h.xMin, h.xMax, !1), c.yAxis.setExtremes(h.yMin, h.yMax, !1)), p.resetZoomButton && (e.resetZoomButton = p.resetZoomButton), e.mapView) {
              let i = p.levelNumber === o && t,
                l = e.options.drilldown && e.options.drilldown.animation && e.options.drilldown.mapZooming;
              i ? u.remove(!1) : (u.dataLabelsGroup && (u.dataLabelsGroup.destroy(), delete u.dataLabelsGroup), e.mapView && c && (l && (u.isDrilling = !0, c.isDrilling = !0, e.redraw(!1), e.mapView.fitToBounds(u.bounds, void 0, !0, !1)), e.mapView.allowTransformAnimation = !0, m(e, "afterDrillUp", {
                seriesOptions: c ? c.userOptions : void 0
              }), l ? (e.mapView.setView(void 0, g(e.mapView.minZoom, 1), !0, {
                complete: function () {
                  Object.prototype.hasOwnProperty.call(this, "complete") && n(u);
                }
              }), c._hasTracking = !1) : (e.mapView.allowTransformAnimation = !1, u.group ? u.group.animate({
                opacity: 0
              }, e.options.drilldown.animation, () => {
                n(u), e.mapView && (e.mapView.allowTransformAnimation = !0);
              }) : (n(u), e.mapView.allowTransformAnimation = !0)), c.isDrilling = !1));
            } else m(e, "afterDrillUp");
          }
        }
        e.mapView || e.redraw(), e.ddDupes && (e.ddDupes.length = 0), m(e, "drillupall");
      }
      fadeInGroup(t) {
        let e = a(this.chart.options.drilldown.animation);
        t && (t.hide(), v(() => {
          t && t.added && t.fadeIn();
        }, Math.max(e.duration - 50, 0)));
      }
      update(t, e) {
        let i = this.chart;
        w(!0, i.options.drilldown, t), g(e, !0) && i.redraw();
      }
    }
    return function (t) {
      function i(t) {
        let e = this.chart,
          i = this.getLevel() - t.newLevel,
          o = i > 1;
        for (let t = 0; t < i; t++) t === i - 1 && (o = !1), e.drillUp(o);
      }
      function o() {
        let t = this.options.drilldown,
          i = t && t.breadcrumbs;
        this.breadcrumbs || (this.breadcrumbs = new e(this, i)), this.breadcrumbs.updateProperties(S(this));
      }
      function r() {
        this.breadcrumbs && this.breadcrumbs.updateProperties(S(this));
      }
      function n() {
        this.drilldown = new B(this);
      }
      function a() {
        this.resetZoomButton && (this.resetZoomButton = this.resetZoomButton.destroy());
      }
      function d() {
        this.resetZoomButton && this.showResetZoom();
      }
      function h() {
        (this.xAxis || []).forEach(t => {
          t.ddPoints = {}, t.series.forEach(e => {
            let i = e.xData || [],
              o = e.points;
            for (let l = 0, s = i.length, r; l < s; l++) if ("number" != typeof (r = e.options.data[l]) && (r = e.pointClass.prototype.optionsToObject.call({
              series: e
            }, r)).drilldown) {
              t.ddPoints[i[l]] || (t.ddPoints[i[l]] = []);
              let s = l - (e.cropStart || 0);
              t.ddPoints[i[l]].push(!o || !(s >= 0) || !(s < o.length) || o[s]);
            }
          }), f(t.ticks, t => t.drillable());
        });
      }
      function u(t) {
        let e = this.breadcrumbs,
          i = t.options.drilldown && t.options.drilldown.breadcrumbs;
        e && i && e.update(i);
      }
      function c(t) {
        this.attr({
          opacity: .1,
          visibility: "inherit"
        }).animate({
          opacity: g(this.newOpacity, 1)
        }, t || {
          duration: 250
        });
      }
      function m() {
        let t = this.pos,
          e = this.label,
          i = this.axis,
          o = "xAxis" === i.coll && i.getDDPoints,
          l = o && i.getDDPoints(t),
          s = i.chart.styledMode;
        o && (e && l && l.length ? (e.drillable = !0, e.basicStyles || s || (e.basicStyles = w(e.styles)), e.addClass("highcharts-drilldown-axis-label"), e.removeOnDrillableClick && b(e.element, "click"), e.removeOnDrillableClick = p(e.element, "click", function (e) {
          e.preventDefault(), i.drilldownCategory(t, e);
        }), !s && i.chart.options.drilldown && e.css(i.chart.options.drilldown.activeAxisLabelStyle || {})) : e && e.drillable && e.removeOnDrillableClick && (s || (e.styles = {}, e.element.removeAttribute("style"), e.css(e.basicStyles)), e.removeOnDrillableClick(), e.removeClass("highcharts-drilldown-axis-label")));
      }
      t.compose = function (t, w, f, g, b, v, y) {
        s.compose(g, b);
        let S = w.prototype;
        if (!S.drillUp) {
          let s = v.prototype.Element,
            g = B.prototype,
            b = t.prototype,
            L = s.prototype,
            A = y.prototype;
          b.drilldownCategory = D, b.getDDPoints = x, e.compose(w, f), p(e, "up", i), S.addSeriesAsDrilldown = g.addSeriesAsDrilldown, S.addSingleSeriesAsDrilldown = g.addSingleSeriesAsDrilldown, S.applyDrilldown = g.applyDrilldown, S.drillUp = g.drillUp, p(w, "afterDrilldown", o), p(w, "afterDrillUp", r), p(w, "afterInit", n), p(w, "drillup", a), p(w, "drillupall", d), p(w, "render", h), p(w, "update", u), f.drilldown = l, L.fadeIn = c, A.drillable = m;
        }
      };
    }(n || (n = {})), n;
  }), i(e, "masters/modules/drilldown.src.js", [e["Core/Globals.js"], e["Extensions/Drilldown/Drilldown.js"], e["Extensions/Breadcrumbs/Breadcrumbs.js"]], function (t, e, i) {
    return t.Breadcrumbs = t.Breadcrumbs || i, e.compose(t.Axis, t.Chart, t.defaultOptions, t.Series, t.seriesTypes, t.SVGRenderer, t.Tick), t;
  });
});

/***/ })

}]);
//# sourceMappingURL=default-src_app_org-components_org-reviews_org-reviews_module_ts.js.map