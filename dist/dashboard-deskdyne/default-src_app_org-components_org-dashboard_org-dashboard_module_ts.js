"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["default-src_app_org-components_org-dashboard_org-dashboard_module_ts"],{

/***/ 4271:
/*!***************************************************************************************************!*\
  !*** ./src/app/org-components/org-dashboard/hyperpure-dashboard/hyperpure-dashboard.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HyperpureDashboardComponent: () => (/* binding */ HyperpureDashboardComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! highcharts */ 55080);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/service/local-storage.service */ 48798);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! highcharts-angular */ 88578);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/datepicker */ 82226);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/paginator */ 39687);
















function HyperpureDashboardComponent_mat_error_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Please choose a valid range (End \u2265 Start, both \u2264 today). ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function HyperpureDashboardComponent_mat_option_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", option_r7.cafeteria_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", option_r7.cafeteria_name, " ");
  }
}
const _c0 = function (a0) {
  return [a0, "INR", "symbol", "1.0-0", "en-IN"];
};
function HyperpureDashboardComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 18)(1, "div", 19)(2, "div", 20)(3, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Total Orders");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 19)(8, "div", 20)(9, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Total Items Ordered");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](13, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "div", 19)(15, "div", 20)(16, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "Total Billing (Incl. GST)");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](20, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r3.kpis.totalOrders);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind3"](13, 3, ctx_r3.kpis.totalItems, "1.0-0", "en-IN"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBindV"](20, 7, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](13, _c0, ctx_r3.kpis.totalEarnings)), " ");
  }
}
function HyperpureDashboardComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 23)(1, "div", 24)(2, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "highcharts-chart", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 24)(5, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "highcharts-chart", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("Highcharts", ctx_r4.Highcharts)("options", ctx_r4.dateCountChartOptions)("update", ctx_r4.dateCountUpdateFlag)("oneToOne", true)("callbackFunction", ctx_r4.dateCountChartCallback);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("Highcharts", ctx_r4.Highcharts)("options", ctx_r4.itemPieCountOptions)("update", ctx_r4.itemPieCountUpdateFlag)("oneToOne", true)("callbackFunction", ctx_r4.itemPieCountCallback);
  }
}
function HyperpureDashboardComponent_div_28_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " No cafeteria selected or no menu found. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function HyperpureDashboardComponent_div_28_div_12_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "td", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](7, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "td", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](10, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const r_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](r_r11.cafeteria_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](r_r11.itemName);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind3"](7, 4, r_r11.mealPrice || 0, "1.0-0", "en-IN"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind3"](10, 8, r_r11.minGuarantees || 0, "1.0-0", "en-IN"));
  }
}
function HyperpureDashboardComponent_div_28_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 36)(1, "table", 37)(2, "thead")(3, "tr")(4, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Cafeteria");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "th", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "Price");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "th", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, "MG");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, HyperpureDashboardComponent_div_28_div_12_tr_13_Template, 11, 12, "tr", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r9.pagedMenu)("ngForTrackBy", ctx_r9.trackByRow);
  }
}
const _c1 = function () {
  return [10, 50, 100, 200, 500];
};
function HyperpureDashboardComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 18)(1, "div", 27)(2, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "highcharts-chart", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 29)(5, "div", 25)(6, "div", 30)(7, "h6", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Consumption Menu");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "small", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Filtered by selected cafeterias");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, HyperpureDashboardComponent_div_28_div_11_Template, 2, 0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](12, HyperpureDashboardComponent_div_28_div_12_Template, 14, 2, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "mat-paginator", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("page", function HyperpureDashboardComponent_div_28_Template_mat_paginator_page_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r12.onMenuPage($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("Highcharts", ctx_r5.Highcharts)("options", ctx_r5.itemStatusStackedOptions)("update", ctx_r5.itemStatusStackedUpdateFlag)("oneToOne", true)("callbackFunction", ctx_r5.itemStatusStackedCallback);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r5.pagedMenu.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r5.pagedMenu.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("length", ctx_r5.menuTotal)("pageSize", ctx_r5.menuPageSize)("pageIndex", ctx_r5.menuPageIndex)("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](11, _c1));
  }
}
function HyperpureDashboardComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 40)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "No Data Found For Selected Filter");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
class HyperpureDashboardComponent {
  constructor(apiMainService, localStorageService) {
    this.apiMainService = apiMainService;
    this.localStorageService = localStorageService;
    this.Highcharts = highcharts__WEBPACK_IMPORTED_MODULE_1__;
    this.maxDate = new Date();
    this.loading = false;
    this.cafeList = [];
    this.orders = [];
    // KPIs
    this.kpis = {
      totalOrders: 0,
      totalEarnings: 0,
      totalItems: 0
    };
    // Menu store + flattened view
    this.consumptionMenu = [];
    this.flattenedMenu = []; // ALL rows (filtered by selected cafeterias)
    this.pagedMenu = []; // current page rows
    // Single paginator state
    this.menuPageSize = 5;
    this.menuPageIndex = 0;
    this.menuTotal = 0;
    // ===== Date vs Count + Revenue (combo) =====
    this.dateCountChartOptions = {
      chart: {
        zooming: {
          type: 'x'
        }
      },
      title: {
        text: 'Date-wise Item Count & Revenue'
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: true
      },
      xAxis: {
        categories: []
      },
      yAxis: [{
        title: {
          text: 'Items'
        },
        allowDecimals: false
      }, {
        title: {
          text: 'Revenue (₹)'
        },
        labels: {
          formatter: function () {
            const v = Number(this.value || 0);
            return '₹' + v.toLocaleString('en-IN', {
              maximumFractionDigits: 0
            });
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: true,
        useHTML: true,
        formatter: function () {
          const pts = this.points || [];
          const date = this.x;
          let items = 0;
          let revenue = 0;
          pts.forEach(p => {
            if (p.series.name === 'Items') items = Number(p.y || 0);
            if (p.series.name === 'Revenue (₹)') revenue = Number(p.y || 0);
          });
          return `
        <div style="padding:6px 8px">
          <div><b>${date}</b></div>
          <div>Items: <b>${items.toLocaleString('en-IN')}</b></div>
          <div>Revenue: <b>₹${revenue.toLocaleString('en-IN')}</b></div>
        </div>
      `;
        }
      },
      plotOptions: {
        column: {
          borderWidth: 0,
          pointPadding: 0.1,
          groupPadding: 0.08
        },
        spline: {
          marker: {
            enabled: true
          }
        }
      },
      series: []
    };
    this.dateCountUpdateFlag = false;
    this.dateCountChartCallback = chart => {
      this.dateCountChartRef = chart;
    };
    // ---- Item aggregates for pie (count-driven) ----
    this.itemAgg = {};
    this.itemPieCountOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Item-wise Orders (Count)'
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: true
      },
      tooltip: {
        useHTML: true,
        pointFormatter: function () {
          // @ts-ignore
          const c = this.custom?.count ?? this.y ?? 0;
          // @ts-ignore
          const r = this.custom?.revenue ?? 0;
          const avg = c ? r / c : 0;
          return `
          <div style="padding:6px 8px">
            <div><b>${this.name}</b></div>
            <div>Orders: <b>${Number(c).toLocaleString('en-IN')}</b></div>
            <div>Revenue: <b>₹${Number(r).toLocaleString('en-IN')}</b></div>
            <div>Average: <b>₹${Number(avg).toLocaleString('en-IN', {
            maximumFractionDigits: 0
          })}</b></div>
            <div>Share: <b>${(this.percentage || 0).toFixed(1)}%</b></div>
          </div>
        `;
        }
      },
      plotOptions: {
        pie: {
          showInLegend: true
        }
      },
      series: []
    };
    this.itemPieCountUpdateFlag = false;
    this.itemPieCountCallback = chart => {
      this.itemPieCountRef = chart;
    };
    // ---- Item status date-wise stacked columns ----
    this.itemStatusStackedOptions = {
      chart: {
        zooming: {
          type: 'x'
        }
      },
      title: {
        text: 'Date-wise Item Status (Counts)'
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: true
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        title: {
          text: 'Items'
        },
        allowDecimals: false
      },
      tooltip: {
        shared: true,
        useHTML: true,
        formatter: function () {
          const pts = this.points || [];
          const date = this.x;
          let total = 0;
          const rows = pts.map(p => {
            const v = Number(p.y || 0);
            total += v;
            return `<div>${p.series.name}: <b>${v.toLocaleString('en-IN')}</b></div>`;
          }).join('');
          return `
        <div style="padding:6px 8px">
          <div><b>${date}</b></div>
          ${rows}
          <hr style="margin:6px 0;border-top:1px solid #eee"/>
          <div>Total: <b>${total.toLocaleString('en-IN')}</b></div>
        </div>
      `;
        }
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          borderWidth: 0,
          pointPadding: 0.05,
          groupPadding: 0.1
        }
      },
      series: [] // set dynamically
    };

    this.itemStatusStackedUpdateFlag = false;
    this.itemStatusStackedCallback = chart => {
      this.itemStatusStackedRef = chart;
    };
    this.trackByRow = (_, r) => `${r.cafeteria_id}:${r.itemName}`;
    this.dateGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroup({
      start: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl(new Date(), {
        validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required]
      }),
      end: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl(new Date(), {
        validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required]
      }),
      cafeteria_ids: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl([])
    }, {
      validators: [this.dateRangeValidator.bind(this)]
    });
  }
  ngOnInit() {
    this.initFunc();
  }
  ngOnChanges(changes) {
    if (changes['orgAdmin']?.currentValue) this.initFunc();
  }
  initFunc() {
    this.maxDate = new Date();
    this.maxDate.setHours(23, 59, 59, 999);
    this.getOrgDetailsById();
    this.getConsumptionOrderByOrgId();
  }
  dateRangeValidator(group) {
    const start = group.get('start')?.value;
    const end = group.get('end')?.value;
    if (!start || !end) return {
      rangeRequired: true
    };
    const s = new Date(start);
    const e = new Date(end);
    if (e < s) return {
      endBeforeStart: true
    };
    if (s > this.maxDate || e > this.maxDate) return {
      inFuture: true
    };
    return null;
  }
  normalizeRange(d, isEnd = false) {
    const nd = new Date(d);
    if (isEnd) nd.setHours(23, 59, 59, 999);else nd.setHours(0, 0, 0, 0);
    return nd;
  }
  getOrgDetailsById() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const res = yield _this.apiMainService.getOrg(_this.orgAdmin?.orgDetails?._id);
        _this.orgDetails = res;
        if (res?.cafeteriaList?.length) {
          _this.cafeList = _this.orgAdmin.role === "HYPERPURE_POC" ? res.cafeteriaList.filter(item => _this.orgAdmin.cafeDetails.some(a => a.cafeteria_id === item.cafeteria_id)) : res.cafeteriaList;
          _this.dateGroup.get('cafeteria_ids')?.setValue(_this.cafeList.map(c => c.cafeteria_id), {
            emitEvent: false
          });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }
  getConsumptionOrderByOrgId() {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const res = yield _this2.apiMainService.getConsumptionOrderByOrgId(_this2.orgAdmin?.orgDetails?._id);
        _this2.consumptionMenu = res || [];
        _this2.rebuildMenuTable(); // ensure sync after fetch
      } catch (err) {
        console.log(err);
        _this2.consumptionMenu = [];
        _this2.rebuildMenuTable();
      }
    })();
  }
  rebuildMenuTable() {
    const selected = new Set(this.getSelectedCafeIds());
    if (!selected.size || !this.consumptionMenu?.length) {
      this.flattenedMenu = [];
      this.menuTotal = 0;
      this.applyMenuPage();
      return;
    }
    // Build flat rows for selected cafeterias only
    const rows = [];
    for (const cafe of this.consumptionMenu) {
      if (!selected.has(cafe.cafeteria_id)) continue;
      const name = cafe.cafeteria_name;
      for (const it of cafe.mealTypeList || []) {
        rows.push({
          cafeteria_id: cafe.cafeteria_id,
          cafeteria_name: name,
          itemName: it.itemName,
          mealPrice: it.mealPrice,
          minGuarantees: it.minGuarantees
        });
      }
    }
    // Optional: stable sort by cafeteria then item
    rows.sort((a, b) => {
      if (a.cafeteria_name !== b.cafeteria_name) return a.cafeteria_name.localeCompare(b.cafeteria_name);
      return (a.itemName || '').localeCompare(b.itemName || '');
    });
    this.flattenedMenu = rows;
    this.menuTotal = rows.length;
    this.applyMenuPage();
  }
  applyMenuPage() {
    const start = this.menuPageIndex * this.menuPageSize;
    this.pagedMenu = this.flattenedMenu.slice(start, start + this.menuPageSize);
  }
  onMenuPage(ev) {
    this.menuPageSize = ev.pageSize;
    this.menuPageIndex = ev.pageIndex;
    this.applyMenuPage();
  }
  // --- Multi-select helpers ---
  isAllSelected() {
    const selected = this.dateGroup.value.cafeteria_ids || [];
    const allIds = this.cafeList.map(c => c.cafeteria_id);
    return allIds.length > 0 && selected.length === allIds.length && allIds.every(id => selected.includes(id));
  }
  toggleSelectAll(isSelected) {
    const ctrl = this.dateGroup.get('cafeteria_ids');
    if (!this.cafeList?.length) return;
    if (isSelected) ctrl.setValue(this.cafeList.map(c => c.cafeteria_id));else ctrl.setValue([]);
  }
  onCafeDropdownOpen(_opened) {}
  getSelectedCafeIds() {
    const selected = (this.dateGroup.value.cafeteria_ids || []).filter(v => v !== '__all__');
    const allIds = this.cafeList.map(c => c.cafeteria_id);
    if (selected.length === allIds.length && allIds.every(id => selected.includes(id))) return allIds;
    return selected;
  }
  buildPayload() {
    const start = this.normalizeRange(this.dateGroup.value.start, false);
    const end = this.normalizeRange(this.dateGroup.value.end, true);
    return {
      startDate: start,
      endDate: end,
      orgId: this.orgAdmin?.orgDetails?._id,
      cafeteria_ids: this.getSelectedCafeIds()
    };
  }
  fetchData() {
    var _this3 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this3.dateGroup.invalid || !_this3.orgAdmin?.orgDetails?._id) return;
      const payload = _this3.buildPayload();
      _this3.loading = true;
      try {
        const apiOrders = yield _this3.apiMainService.getConsumptionOrderByDateForDashboard(payload);
        console.log(apiOrders);
        _this3.orders = apiOrders;
        const flat = _this3.flattenOrders(apiOrders);
        _this3.updateAnalyticsFromFlat(flat); // fills totalOrders & totalEarnings and builds chart
        _this3.kpis.totalItems = _this3.sumItemCounts(apiOrders);
        _this3.buildItemAggregates(apiOrders);
        _this3.refreshItemPieCount();
        _this3.refreshItemStatusStacked();
        _this3.rebuildMenuTable();
      } catch (err) {
        console.error('error fetching data', err);
        _this3.orders = [];
        _this3.updateAnalyticsFromFlat([]);
        _this3.kpis.totalItems = 0;
        _this3.buildItemAggregates([]);
        _this3.refreshItemPieCount();
        _this3.refreshItemStatusStacked();
      } finally {
        _this3.loading = false;
      }
    })();
  }
  // ==== helpers ====
  sumItemCounts(apiOrders) {
    let total = 0;
    for (const o of apiOrders || []) {
      for (const li of o.mealTypeList || []) total += Number(li?.count) || 0;
    }
    return total;
  }
  sumOrderAmount(o) {
    if (!o?.mealTypeList?.length) return 0;
    return o.mealTypeList.reduce((acc, it) => {
      const line = typeof it?.totalPrice === 'number' ? it.totalPrice : (Number(it?.mealPrice) || 0) * (Number(it?.count) || 0);
      return acc + (Number.isFinite(line) ? Number(line) : 0);
    }, 0);
  }
  flattenOrders(apiOrders) {
    return (apiOrders || []).map(o => ({
      orderDate: o.orderDate,
      amount: this.sumOrderAmount(o)
    }));
  }
  dateKey(d) {
    const dt = new Date(d);
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const da = String(dt.getDate()).padStart(2, '0');
    return `${y}-${m}-${da}`;
  }
  enumerateDates(start, end) {
    const days = [];
    const cur = new Date(start);
    cur.setHours(0, 0, 0, 0);
    const last = new Date(end);
    last.setHours(0, 0, 0, 0);
    while (cur <= last) {
      days.push(this.dateKey(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return days;
  }
  updateAnalyticsFromFlat(orders) {
    const start = this.normalizeRange(this.dateGroup.value.start, false);
    const end = this.normalizeRange(this.dateGroup.value.end, true);
    const days = this.enumerateDates(start, end);
    const dailyCounts = {};
    const dailyRevenue = {};
    for (const d of days) {
      dailyCounts[d] = 0;
      dailyRevenue[d] = 0;
    }
    let totalOrders = 0;
    let totalEarnings = 0;
    for (const o of orders) {
      const key = this.dateKey(o.orderDate);
      if (!(key in dailyCounts)) continue;
      dailyCounts[key] += 1;
      dailyRevenue[key] += Number.isFinite(o.amount) ? o.amount : 0;
      totalOrders += 1;
      totalEarnings += Number.isFinite(o.amount) ? o.amount : 0;
    }
    const dailyCountsArr = [];
    const dailyRevenueArr = [];
    for (const d of days) {
      dailyCountsArr.push(dailyCounts[d] || 0);
      dailyRevenueArr.push(Math.round(dailyRevenue[d] || 0));
    }
    // KPIs
    this.kpis = {
      totalOrders,
      totalEarnings: Math.round(totalEarnings),
      totalItems: this.sumItemCounts(this.orders)
    };
    // Build combo chart with two series & twin axes
    this.buildDateItemVsRevenueChart(days, this.orders, dailyRevenueArr);
  }
  buildItemAggregates(apiOrders) {
    const agg = {};
    for (const o of apiOrders || []) {
      for (const li of o.mealTypeList || []) {
        const name = (li.itemName || 'Unknown').trim();
        const count = Number(li.count) || 0;
        const revenue = Number.isFinite(li.totalPrice) ? Number(li.totalPrice) : (Number(li.mealPrice) || 0) * count;
        if (!agg[name]) agg[name] = {
          count: 0,
          revenue: 0
        };
        agg[name].count += count;
        agg[name].revenue += revenue;
      }
    }
    this.itemAgg = agg;
  }
  refreshItemPieCount() {
    const entries = Object.entries(this.itemAgg);
    const sorted = entries.sort((a, b) => b[1].count - a[1].count);
    const N = 20;
    const head = sorted.slice(0, N);
    const tail = sorted.slice(N);
    const others = tail.reduce((s, [, v]) => ({
      count: s.count + v.count,
      revenue: s.revenue + v.revenue
    }), {
      count: 0,
      revenue: 0
    });
    const data = head.map(([name, v]) => ({
      name,
      y: v.count,
      custom: {
        count: v.count,
        revenue: Math.round(v.revenue)
      }
    }));
    if (others.count > 0) {
      data.push({
        name: 'Others',
        y: others.count,
        custom: {
          count: others.count,
          revenue: Math.round(others.revenue)
        }
      });
    }
    this.itemPieCountOptions = {
      ...this.itemPieCountOptions,
      series: [{
        type: 'pie',
        name: 'Orders',
        data
      }]
    };
    this.itemPieCountUpdateFlag = true;
    setTimeout(() => this.itemPieCountRef?.reflow(), 0);
  }
  computeDailyItemCounts(apiOrders, days) {
    const byDay = {};
    for (const d of days) byDay[d] = 0;
    for (const o of apiOrders || []) {
      const key = this.dateKey(o.orderDate);
      if (!(key in byDay)) continue;
      let dayItems = 0;
      for (const li of o.mealTypeList || []) {
        dayItems += Number(li?.count) || 0;
      }
      byDay[key] += dayItems;
    }
    return days.map(d => byDay[d] || 0);
  }
  buildDateItemVsRevenueChart(categories, apiOrders, dailyRevenue) {
    const dailyItems = this.computeDailyItemCounts(apiOrders, categories);
    const itemsSeries = {
      type: 'column',
      name: 'Items',
      data: dailyItems,
      yAxis: 0
    };
    const revenueSeries = {
      type: 'spline',
      name: 'Revenue (₹)',
      data: dailyRevenue,
      yAxis: 1,
      tooltip: {
        valuePrefix: '₹'
      }
    };
    this.dateCountChartOptions = {
      ...this.dateCountChartOptions,
      xAxis: {
        categories
      },
      series: [itemsSeries, revenueSeries]
    };
    this.dateCountUpdateFlag = true;
    setTimeout(() => this.dateCountChartRef?.reflow(), 0);
  }
  getStatusLabel(raw) {
    const s = (raw || '').toString().trim().toLowerCase();
    if (s === 'approved') return 'Approved';
    if (s === 'review') return 'Review';
    if (s === 'cancelled') return 'Cancelled';
    return 'Other';
  }
  refreshItemStatusStacked() {
    // Build date categories from selected range
    const start = this.normalizeRange(this.dateGroup.value.start, false);
    const end = this.normalizeRange(this.dateGroup.value.end, true);
    const days = this.enumerateDates(start, end);
    // Quick index for O(1) day lookup
    const dayIndex = new Map();
    days.forEach((d, i) => dayIndex.set(d, i));
    // Init arrays
    const approved = Array(days.length).fill(0);
    const review = Array(days.length).fill(0);
    const cancelled = Array(days.length).fill(0);
    const other = Array(days.length).fill(0);
    // Aggregate counts by date & status
    for (const o of this.orders || []) {
      const key = this.dateKey(o.orderDate);
      const idx = dayIndex.get(key);
      if (idx === undefined) continue;
      for (const li of o.mealTypeList || []) {
        const cnt = Number(li?.count) || 0;
        switch (this.getStatusLabel(li?.status)) {
          case 'Approved':
            approved[idx] += cnt;
            break;
          case 'Review':
            review[idx] += cnt;
            break;
          case 'Cancelled':
            cancelled[idx] += cnt;
            break;
          default:
            other[idx] += cnt;
            break;
        }
      }
    }
    // Build series
    const sApproved = {
      type: 'column',
      name: 'Approved',
      data: approved
    };
    const sReview = {
      type: 'column',
      name: 'Review',
      data: review
    };
    const sCancelled = {
      type: 'column',
      name: 'Cancelled',
      data: cancelled
    };
    const sOther = {
      type: 'column',
      name: 'Other',
      data: other
    };
    this.itemStatusStackedOptions = {
      ...this.itemStatusStackedOptions,
      xAxis: {
        categories: days
      },
      series: [sApproved, sReview, sCancelled, sOther]
    };
    this.itemStatusStackedUpdateFlag = true;
    setTimeout(() => this.itemStatusStackedRef?.reflow(), 0);
  }
  static #_ = this.ɵfac = function HyperpureDashboardComponent_Factory(t) {
    return new (t || HyperpureDashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_2__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_3__.LocalStorageService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: HyperpureDashboardComponent,
    selectors: [["app-hyperpure-dashboard"]],
    inputs: {
      orgAdmin: "orgAdmin"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵNgOnChangesFeature"]],
    decls: 30,
    vars: 13,
    consts: [[3, "formGroup"], [1, "mt-4", "row", "align-items-center"], [1, "col-md-4"], ["appearance", "outline", 1, "w-100"], [3, "rangePicker", "max"], ["matStartDate", "", "placeholder", "Start date", "formControlName", "start"], ["matEndDate", "", "placeholder", "End date", "formControlName", "end"], ["matIconSuffix", "", 3, "for"], ["picker", ""], [4, "ngIf"], ["formControlName", "cafeteria_ids", "multiple", "", 3, "openedChange"], [3, "value", "disabled", "onSelectionChange"], [3, "value", 4, "ngFor", "ngForOf"], ["mat-raised-button", "", "color", "primary", 1, "w-100", 3, "disabled", "click"], ["class", "row mt-3", 4, "ngIf"], ["class", "row", 4, "ngIf"], ["class", "d-flex align-items-center justify-content-center", "style", "height: 70vh;", 4, "ngIf"], [3, "value"], [1, "row", "mt-3"], [1, "col-md-4", "mb-3"], [1, "kpi-card"], [1, "kpi-label"], [1, "kpi-value"], [1, "row"], [1, "col-12", "col-lg-6"], [1, "card", "p-3", "shadow", "rounded-lg"], [2, "width", "100%", "height", "380px", "display", "block", 3, "Highcharts", "options", "update", "oneToOne", "callbackFunction"], [1, "col-lg-6", "col-12"], [2, "width", "100%", "height", "420px", "display", "block", 3, "Highcharts", "options", "update", "oneToOne", "callbackFunction"], [1, "col-lg-6", "col-12", "mt-3", "mt-lg-0"], [1, "d-flex", "align-items-center", "justify-content-between", "mb-2"], [1, "m-0"], [1, "text-muted"], ["class", "text-muted", 4, "ngIf"], ["class", "table-responsive", 4, "ngIf"], ["showFirstLastButtons", "", 3, "length", "pageSize", "pageIndex", "pageSizeOptions", "page"], [1, "table-responsive"], [1, "table", "table-sm", "align-middle", "mb-2"], [1, "text-end"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "d-flex", "align-items-center", "justify-content-center", 2, "height", "70vh"]],
    template: function HyperpureDashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "form", 0)(1, "div", 1)(2, "div", 2)(3, "mat-form-field", 3)(4, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Enter a date range");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "mat-date-range-input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "input", 5)(8, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "mat-datepicker-toggle", 7)(10, "mat-date-range-picker", null, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](12, HyperpureDashboardComponent_mat_error_12_Template, 2, 0, "mat-error", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "div", 2)(14, "mat-form-field", 3)(15, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16, "Select Cafeteria(s)");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "mat-select", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("openedChange", function HyperpureDashboardComponent_Template_mat_select_openedChange_17_listener($event) {
          return ctx.onCafeDropdownOpen($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "mat-option", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("onSelectionChange", function HyperpureDashboardComponent_Template_mat_option_onSelectionChange_18_listener($event) {
          return ctx.toggleSelectAll($event.source.selected);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19, " Select All ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](20, HyperpureDashboardComponent_mat_option_20_Template, 2, 2, "mat-option", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "div", 2)(22, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function HyperpureDashboardComponent_Template_button_click_22_listener() {
          return ctx.fetchData();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](24, "refresh");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25, " Fetch ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](26, HyperpureDashboardComponent_div_26_Template, 21, 15, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](27, HyperpureDashboardComponent_div_27_Template, 7, 10, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](28, HyperpureDashboardComponent_div_28_Template, 14, 12, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](29, HyperpureDashboardComponent_div_29_Template, 3, 0, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.dateGroup);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("rangePicker", _r0)("max", ctx.maxDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("for", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.dateGroup.invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", "__all__")("disabled", !ctx.cafeList.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.cafeList);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx.loading);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.orders.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.orders.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.orders.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.orders.length <= 0);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlName, highcharts_angular__WEBPACK_IMPORTED_MODULE_7__.HighchartsChartComponent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatError, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatSuffix, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__.MatDatepickerToggle, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__.MatDateRangeInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__.MatStartDate, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__.MatEndDate, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__.MatDateRangePicker, _angular_material_select__WEBPACK_IMPORTED_MODULE_10__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__.MatOption, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_14__.MatPaginator, _angular_common__WEBPACK_IMPORTED_MODULE_6__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_6__.CurrencyPipe],
    styles: [".spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.kpi-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e9edf3;\n  border-radius: 14px;\n  padding: 16px 18px;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);\n}\n\n.kpi-label[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: #6b7280;\n}\n\n.kpi-value[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 700;\n  line-height: 1.2;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvb3JnLWNvbXBvbmVudHMvb3JnLWRhc2hib2FyZC9oeXBlcnB1cmUtZGFzaGJvYXJkL2h5cGVycHVyZS1kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQ0FBQTtBQUNKOztBQUVBO0VBQ0k7SUFDSSxvQkFBQTtFQUNOO0VBRUU7SUFDSSx5QkFBQTtFQUFOO0FBQ0Y7QUFHQTtFQUNJLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUNBQUE7QUFESjs7QUFJQTtFQUNJLGtCQUFBO0VBQ0EsY0FBQTtBQURKOztBQUlBO0VBQ0ksaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBREoiLCJzb3VyY2VzQ29udGVudCI6WyIuc3BpbiB7XHJcbiAgICBhbmltYXRpb246IHNwaW4gMXMgbGluZWFyIGluZmluaXRlO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHNwaW4ge1xyXG4gICAgZnJvbSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG8ge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5rcGktY2FyZCB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2U5ZWRmMztcclxuICAgIGJvcmRlci1yYWRpdXM6IDE0cHg7XHJcbiAgICBwYWRkaW5nOiAxNnB4IDE4cHg7XHJcbiAgICBib3gtc2hhZG93OiAwIDJweCA2cHggcmdiYSgwLCAwLCAwLCAuMDQpO1xyXG59XHJcblxyXG4ua3BpLWxhYmVsIHtcclxuICAgIGZvbnQtc2l6ZTogMC45NXJlbTtcclxuICAgIGNvbG9yOiAjNmI3MjgwO1xyXG59XHJcblxyXG4ua3BpLXZhbHVlIHtcclxuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgIGxpbmUtaGVpZ2h0OiAxLjI7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 14776:
/*!*****************************************************************************************!*\
  !*** ./src/app/org-components/org-dashboard/main-dashboard/main-dashboard.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MainDashboardComponent: () => (/* binding */ MainDashboardComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! highcharts */ 55080);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/service/local-storage.service */ 48798);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! highcharts-angular */ 88578);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/datepicker */ 82226);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/core */ 55309);













function MainDashboardComponent_mat_option_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", option_r9.cafeteria_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](option_r9.cafeteria_name);
  }
}
function MainDashboardComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 11)(1, "div", 2)(2, "div", 3)(3, "div")(4, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Outlet Employee Count");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "h5", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r2.dashboarData.outlet.employeeCount);
  }
}
function MainDashboardComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 11)(1, "div", 2)(2, "div", 3)(3, "div")(4, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Virtual Cafeteria Employee Count");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "h5", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r3.dashboarData.virtualCafe.employeeCount);
  }
}
function MainDashboardComponent_div_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 11)(1, "div", 2)(2, "div", 3)(3, "div")(4, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Daily Employee Count");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "h5", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r4.dashboarData.others.employeeCount);
  }
}
function MainDashboardComponent_div_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 11)(1, "div", 2)(2, "div", 3)(3, "div")(4, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Outlet Orders");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "h5", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](11, "i", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r5.dashboarData.outlet.ordersCount, " - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("\u20B9 ", ctx_r5.dashboarData.outlet.totalAmount, " ");
  }
}
function MainDashboardComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 11)(1, "div", 2)(2, "div", 3)(3, "div")(4, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Virtual Cafeteria Orders");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "h5", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](11, "i", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r6.dashboarData.virtualCafe.ordersCount, " - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("\u20B9 ", ctx_r6.dashboarData.virtualCafe.totalAmount, " ");
  }
}
function MainDashboardComponent_div_47_highcharts_chart_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "highcharts-chart", 33);
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("Highcharts", ctx_r10.Highcharts)("options", ctx_r10.chartOptions)("update", ctx_r10.updateOrdersFlag);
  }
}
function MainDashboardComponent_div_47_p_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "No Data Found");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function MainDashboardComponent_div_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 28)(1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, MainDashboardComponent_div_47_highcharts_chart_2_Template, 1, 3, "highcharts-chart", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, MainDashboardComponent_div_47_p_4_Template, 2, 0, "p", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r7.outletOrderData.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r7.outletOrderData.length <= 0);
  }
}
function MainDashboardComponent_div_48_highcharts_chart_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "highcharts-chart", 33);
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("Highcharts", ctx_r12.Highcharts)("options", ctx_r12.amountChartOptions)("update", ctx_r12.updateAmountFlag);
  }
}
function MainDashboardComponent_div_48_p_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "No Data Found");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function MainDashboardComponent_div_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 28)(1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, MainDashboardComponent_div_48_highcharts_chart_2_Template, 1, 3, "highcharts-chart", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, MainDashboardComponent_div_48_p_4_Template, 2, 0, "p", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r8.outletOrderData.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r8.outletOrderData.length <= 0);
  }
}
class MainDashboardComponent {
  constructor(apiMainService, localStorageService) {
    this.apiMainService = apiMainService;
    this.localStorageService = localStorageService;
    this.Highcharts = highcharts__WEBPACK_IMPORTED_MODULE_1__;
    this.maxDate = new Date();
    this.updateOrdersFlag = false;
    this.oneToOneOrdersFlag = true;
    this.updateAmountFlag = false;
    this.dashboardStaticData = {
      outletsCount: 0,
      vendorsCount: 0
    };
    this.cafeList = [];
    this.outletOrderData = [];
    this.dateGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroup({
      start: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl(new Date()),
      end: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl(new Date())
    });
  }
  ngOnInit() {
    this.initFunc();
  }
  ngOnChanges(changes) {
    console.log(this.orgAdmin);
    if (changes['orgAdmin'] && changes['orgAdmin'].currentValue) {
      this.initFunc();
    }
  }
  initFunc() {
    this.maxDate.setDate(this.maxDate.getDate());
    this.maxDate.setHours(23, 59, 59, 999);
    this.getOrgDetailsById();
    this.getStaticDashboardDataByOrgId();
  }
  buildPayload() {
    return {
      startDate: this.dateGroup.value.start,
      endDate: this.dateGroup.value.end,
      orgId: this.orgAdmin.orgDetails._id,
      cafeteria_name: this.cafeList.find(c => c.cafeteria_id === this.cafeteria_id)?.cafeteria_name
    };
  }
  getOrgDetailsById() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const res = yield _this.apiMainService.getOrg(_this.orgAdmin?.orgDetails?._id);
        _this.orgDetails = res;
        if (res?.cafeteriaList.length > 0) {
          _this.cafeList = res?.cafeteriaList;
          _this.cafeteria_id = _this.cafeList[0]?.cafeteria_id;
        }
        _this.fetchData();
      } catch (err) {
        console.log(err);
      }
    })();
  }
  getStaticDashboardDataByOrgId() {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const res = yield _this2.apiMainService.getStaticTotalCountsByOrg(_this2.orgAdmin?.orgDetails?._id);
        _this2.dashboardStaticData = res;
      } catch (err) {
        console.log(err);
      }
    })();
  }
  getDashboardDataByOrgId() {
    var _this3 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const data = _this3.buildPayload();
      try {
        const res = yield _this3.apiMainService.getTotalCountsByOrgId(data);
        // console.log(res);
        _this3.dashboarData = res;
      } catch (err) {
        console.log(err);
      }
    })();
  }
  getOrgTotalOrdersStatusWiseData() {
    var _this4 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const data = _this4.buildPayload();
      try {
        const res = yield _this4.apiMainService.getOrgTotalOrdersStatusWiseData(data);
        _this4.outletOrderData = res;
        if (res.length > 0) {
          _this4.generateChartData(res);
          _this4.generateAmountAreaChart(res);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }
  generateChartData(data) {
    const {
      categories,
      series
    } = this.processOrdersData(data);
    this.chartOptions = {
      chart: {
        type: 'column',
        zooming: {
          type: "x",
          mouseWheel: {
            enabled: true,
            orientation: 'x'
          },
          resetButton: {
            position: {
              align: 'right',
              verticalAlign: 'top'
            },
            theme: {
              fill: 'white',
              stroke: 'gray',
              r: 3,
              style: {
                color: 'black'
              }
            }
          },
          pinchType: 'x',
          key: 'shift'
        }
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
    this.updateOrdersFlag = true;
  }
  generateAmountAreaChart(data) {
    const dateAmountMap = {};
    data.forEach(item => {
      if (item.orderstatus === "completed") {
        const d = new Date(item.orderDate).toISOString().slice(0, 10);
        dateAmountMap[d] = (dateAmountMap[d] || 0) + (item.amount + item.moneyWalletPointsUsed || 0);
      }
    });
    const categories = Object.keys(dateAmountMap).sort();
    const seriesData = categories.map(d => dateAmountMap[d]);
    this.amountChartOptions = {
      chart: {
        type: 'area',
        zooming: {
          type: "x",
          mouseWheel: {
            enabled: true,
            orientation: 'x'
          },
          resetButton: {
            position: {
              align: 'right',
              verticalAlign: 'top'
            },
            theme: {
              fill: 'white',
              stroke: 'gray',
              r: 3,
              style: {
                color: 'black'
              }
            }
          },
          pinchType: 'x',
          key: 'shift'
        }
      },
      title: {
        text: 'Total Amount by Date',
        align: 'left'
      },
      xAxis: {
        categories,
        tickmarkPlacement: 'on',
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Amount (₹)'
        },
        allowDecimals: false
      },
      tooltip: {
        pointFormat: '<b>₹{point.y:.2f}</b>',
        shared: true
      },
      plotOptions: {
        area: {
          stacking: undefined,
          marker: {
            enabled: false
          }
        }
      },
      series: [{
        name: 'Amount (₹)',
        data: seriesData,
        type: 'area'
      }]
    };
    this.updateAmountFlag = true;
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
  fetchData() {
    const selCafe = this.cafeList.find(c => c.cafeteria_id === this.cafeteria_id);
    // console.log(selCafe);
    this.selectedCafe = selCafe;
    this.getDashboardDataByOrgId();
    this.getOrgTotalOrdersStatusWiseData();
  }
  static #_ = this.ɵfac = function MainDashboardComponent_Factory(t) {
    return new (t || MainDashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_2__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_3__.LocalStorageService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: MainDashboardComponent,
    selectors: [["app-main-dashboard"]],
    inputs: {
      orgAdmin: "orgAdmin"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵNgOnChangesFeature"]],
    decls: 49,
    vars: 15,
    consts: [[1, "row", "mt-4"], [1, "col-md-3"], [1, "card", "p-3", "shadow", "border-0", "rounded-lg", "card-hover"], [1, "d-flex", "justify-content-between"], [1, "text-secondary", "d-block"], [1, "fw-bold"], [1, "d-flex", "align-items-center", "justify-content-center", "bg-secondary", "bg-opacity-25", "rounded-circle", 2, "width", "2.5rem", "height", "2.5rem"], [1, "bi", "bi-chat-left-text", "text-secondary"], [1, "d-flex", "align-items-center", "justify-content-center", "bg-warning", "bg-opacity-25", "rounded-circle", 2, "width", "2.5rem", "height", "2.5rem"], [1, "bi", "bi-currency-dollar", "text-warning"], [1, "mt-4", "row"], [1, "col-md-4"], ["appearance", "outline", 1, "w-100"], [3, "formGroup", "rangePicker", "max"], ["matStartDate", "", "placeholder", "Start date", "formControlName", "start"], ["matEndDate", "", "placeholder", "End date", "formControlName", "end", 3, "dateChange"], ["matIconSuffix", "", 3, "for"], ["picker", ""], [3, "ngModel", "ngModelChange", "selectionChange"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "col-md-4", 4, "ngIf"], ["class", "col-md-6", 4, "ngIf"], [3, "value"], [1, "d-flex", "align-items-center", "justify-content-center", "bg-info", "bg-opacity-25", "rounded-circle", 2, "width", "2.5rem", "height", "2.5rem"], [1, "bi", "bi-people", "text-info"], [1, "money"], [1, "d-flex", "align-items-center", "justify-content-center", "bg-primary", "bg-opacity-25", "rounded-circle", 2, "width", "2.5rem", "height", "2.5rem"], [1, "bi", "bi-cart", "text-primary"], [1, "col-md-6"], [1, "card", "shadow", "border-0", "rounded-lg", "card-hover", "overflow-hidden"], ["style", "width: 100%; height: 400px; display: block", 3, "Highcharts", "options", "update", 4, "ngIf"], [1, "h-100", "d-flex", "justify-content-center", "align-items-center", "pt-2"], [4, "ngIf"], [2, "width", "100%", "height", "400px", "display", "block", 3, "Highcharts", "options", "update"]],
    template: function MainDashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div")(6, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Total Outlets");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "h5", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](11, "i", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "div", 1)(13, "div", 2)(14, "div", 3)(15, "div")(16, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "Total Vendors");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "h5", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](21, "i", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "div", 10)(23, "div", 11)(24, "mat-form-field", 12)(25, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](26, "Enter a date range");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "mat-date-range-input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](28, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](29, "input", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("dateChange", function MainDashboardComponent_Template_input_dateChange_29_listener() {
          return ctx.fetchData();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](30, "mat-datepicker-toggle", 16)(31, "mat-date-range-picker", null, 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "div", 11)(34, "mat-form-field", 12)(35, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](36, "Select Cafeteria");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](37, "mat-select", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function MainDashboardComponent_Template_mat_select_ngModelChange_37_listener($event) {
          return ctx.cafeteria_id = $event;
        })("selectionChange", function MainDashboardComponent_Template_mat_select_selectionChange_37_listener() {
          return ctx.fetchData();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](38, MainDashboardComponent_mat_option_38_Template, 2, 2, "mat-option", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](39, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](40, MainDashboardComponent_div_40_Template, 10, 1, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](41, MainDashboardComponent_div_41_Template, 10, 1, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](42, MainDashboardComponent_div_42_Template, 10, 1, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](43, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](44, MainDashboardComponent_div_44_Template, 12, 2, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](45, MainDashboardComponent_div_45_Template, 12, 2, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](46, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](47, MainDashboardComponent_div_47_Template, 5, 2, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](48, MainDashboardComponent_div_48_Template, 5, 2, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](32);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.dashboardStaticData.outletsCount);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.dashboardStaticData.vendorsCount);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.dateGroup)("rangePicker", _r0)("max", ctx.maxDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("for", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.cafeteria_id);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.cafeList);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.selectedCafe == null ? null : ctx.selectedCafe.showSaas);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.selectedCafe == null ? null : ctx.selectedCafe.showVirtualCafe);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.selectedCafe == null ? null : ctx.selectedCafe.showEmpPolls);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.selectedCafe == null ? null : ctx.selectedCafe.showSaas);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.selectedCafe == null ? null : ctx.selectedCafe.showVirtualCafe);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.selectedCafe == null ? null : ctx.selectedCafe.showSaas);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.selectedCafe == null ? null : ctx.selectedCafe.showSaas);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlName, highcharts_angular__WEBPACK_IMPORTED_MODULE_7__.HighchartsChartComponent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatSuffix, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__.MatDatepickerToggle, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__.MatDateRangeInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__.MatStartDate, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__.MatEndDate, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__.MatDateRangePicker, _angular_material_select__WEBPACK_IMPORTED_MODULE_10__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__.MatOption],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 77527:
/*!******************************************************************************!*\
  !*** ./src/app/org-components/org-dashboard/org-dashboard-routing.module.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgDashboardRoutingModule: () => (/* binding */ OrgDashboardRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _org_dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-dashboard.component */ 15588);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: "",
  component: _org_dashboard_component__WEBPACK_IMPORTED_MODULE_0__.OrgDashboardComponent
}];
class OrgDashboardRoutingModule {
  static #_ = this.ɵfac = function OrgDashboardRoutingModule_Factory(t) {
    return new (t || OrgDashboardRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: OrgDashboardRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](OrgDashboardRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 15588:
/*!*************************************************************************!*\
  !*** ./src/app/org-components/org-dashboard/org-dashboard.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgDashboardComponent: () => (/* binding */ OrgDashboardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/service/local-storage.service */ 48798);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _main_dashboard_main_dashboard_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main-dashboard/main-dashboard.component */ 14776);
/* harmony import */ var _hyperpure_dashboard_hyperpure_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hyperpure-dashboard/hyperpure-dashboard.component */ 4271);






function OrgDashboardComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-main-dashboard", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("orgAdmin", ctx_r0.orgAdmin);
  }
}
function OrgDashboardComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-hyperpure-dashboard", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("orgAdmin", ctx_r1.orgAdmin);
  }
}
class OrgDashboardComponent {
  constructor(apiMainService, localStorageService) {
    this.apiMainService = apiMainService;
    this.localStorageService = localStorageService;
    this.isOrgSelected = false;
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
  }
  static #_ = this.ɵfac = function OrgDashboardComponent_Factory(t) {
    return new (t || OrgDashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_0__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_1__.LocalStorageService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: OrgDashboardComponent,
    selectors: [["app-org-dashboard"]],
    inputs: {
      adminOrg: "adminOrg",
      isOrgSelected: "isOrgSelected"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵNgOnChangesFeature"]],
    decls: 5,
    vars: 2,
    consts: [[1, "container-fluid", "py-3", "dashboardContainer"], [4, "ngIf"], [3, "orgAdmin"]],
    template: function OrgDashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "Dashboard");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, OrgDashboardComponent_ng_container_3_Template, 2, 1, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, OrgDashboardComponent_ng_container_4_Template, 2, 1, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.orgAdmin.role === "ORGADMIN" || ctx.isOrgSelected);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.orgAdmin.role === "HYPERPURE_ADMIN" || ctx.orgAdmin.role === "HYPERPURE_POC");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _main_dashboard_main_dashboard_component__WEBPACK_IMPORTED_MODULE_2__.MainDashboardComponent, _hyperpure_dashboard_hyperpure_dashboard_component__WEBPACK_IMPORTED_MODULE_3__.HyperpureDashboardComponent],
    styles: ["[_nghost-%COMP%]     .card-hover {\n  border-radius: 20px;\n  background-color: #f8f9fa;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n\n[_nghost-%COMP%]     .card-hover:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);\n}\n\n[_nghost-%COMP%]     .money {\n  color: #949595;\n}\n\n  .dashboardContainer .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvb3JnLWNvbXBvbmVudHMvb3JnLWRhc2hib2FyZC9vcmctZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQUE7RUFDQSx5QkFBQTtFQUNBLHFEQUFBO0FBQ0Y7O0FBRUE7RUFDRSwyQkFBQTtFQUNBLDBDQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0Y7O0FBR0E7RUFDRSxhQUFBO0FBQUYiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCA6Om5nLWRlZXAgLmNhcmQtaG92ZXIge1xyXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcclxufVxyXG5cclxuOmhvc3QgOjpuZy1kZWVwIC5jYXJkLWhvdmVyOmhvdmVyIHtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTVweCk7XHJcbiAgYm94LXNoYWRvdzogMCA4cHggMTZweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xyXG59XHJcblxyXG46aG9zdCA6Om5nLWRlZXAgLm1vbmV5IHtcclxuICBjb2xvcjogIzk0OTU5NTtcclxufVxyXG5cclxuXHJcbjo6bmctZGVlcCAuZGFzaGJvYXJkQ29udGFpbmVyIC5tYXQtbWRjLWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXIge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbi8vIDo6bmctZGVlcCAuZGFzaGJvYXJkQ29udGFpbmVyIC5tZGMtbm90Y2hlZC1vdXRsaW5lX19sZWFkaW5nIHtcclxuLy8gICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMnB4ICFpbXBvcnRhbnQ7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTJweCAhaW1wb3J0YW50IDtcclxuLy8gfVxyXG4vLyA6Om5nLWRlZXAgLmRhc2hib2FyZENvbnRhaW5lciAubWRjLW5vdGNoZWQtb3V0bGluZV9fdHJhaWxpbmcge1xyXG4vLyAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMnB4ICFpbXBvcnRhbnQ7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEycHggIWltcG9ydGFudCA7XHJcbi8vIH0iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 55973:
/*!**********************************************************************!*\
  !*** ./src/app/org-components/org-dashboard/org-dashboard.module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgDashboardModule: () => (/* binding */ OrgDashboardModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _org_dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-dashboard-routing.module */ 77527);
/* harmony import */ var _org_dashboard_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./org-dashboard.component */ 15588);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! highcharts-angular */ 88578);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/datepicker */ 82226);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _main_dashboard_main_dashboard_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main-dashboard/main-dashboard.component */ 14776);
/* harmony import */ var _hyperpure_dashboard_hyperpure_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hyperpure-dashboard/hyperpure-dashboard.component */ 4271);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/checkbox */ 56658);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/expansion */ 88060);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/paginator */ 39687);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);

















class OrgDashboardModule {
  static #_ = this.ɵfac = function OrgDashboardModule_Factory(t) {
    return new (t || OrgDashboardModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: OrgDashboardModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    providers: [{
      provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_5__.MAT_DATE_LOCALE,
      useValue: 'en-GB'
    }],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _org_dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgDashboardRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_8__.HighchartsChartModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__.MatDatepickerModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__.MatNativeDateModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_11__.MatSelectModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__.MatOptionModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_14__.MatCheckboxModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__.MatPseudoCheckboxModule, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_15__.MatExpansionModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__.MatPaginatorModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](OrgDashboardModule, {
    declarations: [_org_dashboard_component__WEBPACK_IMPORTED_MODULE_1__.OrgDashboardComponent, _main_dashboard_main_dashboard_component__WEBPACK_IMPORTED_MODULE_2__.MainDashboardComponent, _hyperpure_dashboard_hyperpure_dashboard_component__WEBPACK_IMPORTED_MODULE_3__.HyperpureDashboardComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _org_dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgDashboardRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_8__.HighchartsChartModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__.MatDatepickerModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__.MatNativeDateModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_11__.MatSelectModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__.MatOptionModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_14__.MatCheckboxModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__.MatPseudoCheckboxModule, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_15__.MatExpansionModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__.MatPaginatorModule],
    exports: [_org_dashboard_component__WEBPACK_IMPORTED_MODULE_1__.OrgDashboardComponent]
  });
})();

/***/ })

}]);
//# sourceMappingURL=default-src_app_org-components_org-dashboard_org-dashboard_module_ts.js.map