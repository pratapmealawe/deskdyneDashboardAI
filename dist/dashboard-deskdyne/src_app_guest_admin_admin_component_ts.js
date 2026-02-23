"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_guest_admin_admin_component_ts"],{

/***/ 71875:
/*!************************************************!*\
  !*** ./src/app/guest/admin/admin.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminComponent: () => (/* binding */ AdminComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 13379);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 81891);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var src_pipes_list_filter_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/pipes/list-filter.pipe */ 26066);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 27947);











function AdminComponent_h4_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h4", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r0.paramsObj.cafeName, " -\u00A0 ");
  }
}
function AdminComponent_div_9_option_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", option_r5._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", option_r5.organization_name, " ");
  }
}
function AdminComponent_div_9_option_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", option_r6._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", option_r6.cafeteria_name, " ");
  }
}
function AdminComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 9)(1, "div", 10)(2, "label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Organization");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "select", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function AdminComponent_div_9_Template_select_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r7.filterObj.orgId = $event);
    })("change", function AdminComponent_div_9_Template_select_change_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r9.setOrgDetails());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Select Organization");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, AdminComponent_div_9_option_7_Template, 2, 2, "option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 10)(9, "label", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Cafeteria");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "select", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function AdminComponent_div_9_Template_select_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r10.filterObj.cafeId = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Select Cafeteria");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](14, AdminComponent_div_9_option_14_Template, 2, 2, "option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 17)(16, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AdminComponent_div_9_Template_button_click_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r11.saveOrgDetails());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "Submit");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx_r1.filterObj.orgId);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.orglist);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !ctx_r1.orgDetails)("ngModel", ctx_r1.filterObj.cafeId);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.orgDetails == null ? null : ctx_r1.orgDetails.cafeteriaList);
  }
}
function AdminComponent_div_10_tbody_5_tr_1_ng_container_5_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, ",\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function AdminComponent_div_10_tbody_5_tr_1_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "h6", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, AdminComponent_div_10_tbody_5_tr_1_ng_container_5_span_3_Template, 2, 0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const item_r19 = ctx.$implicit;
    const last_r20 = ctx.last;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", item_r19.itemName, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !last_r20);
  }
}
function AdminComponent_div_10_tbody_5_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr", 26)(1, "td", 27)(2, "h6", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "td", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, AdminComponent_div_10_tbody_5_tr_1_ng_container_5_Template, 4, 2, "ng-container", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const order_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](order_r17.orderNo);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", order_r17.itemList);
  }
}
function AdminComponent_div_10_tbody_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AdminComponent_div_10_tbody_5_tr_1_Template, 6, 2, "tr", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "listFilter");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind3"](2, 1, ctx_r12.placedOrdersList, ctx_r12.startIndex, ctx_r12.endIndex));
  }
}
function AdminComponent_div_10_tbody_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tbody")(1, "tr", 26)(2, "td", 22)(3, "h6", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "No Placed Orders");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
}
function AdminComponent_div_10_tbody_11_tr_1_ng_container_5_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, ",\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function AdminComponent_div_10_tbody_11_tr_1_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "h6", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, AdminComponent_div_10_tbody_11_tr_1_ng_container_5_span_3_Template, 2, 0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const item_r25 = ctx.$implicit;
    const last_r26 = ctx.last;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", item_r25.itemName, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !last_r26);
  }
}
function AdminComponent_div_10_tbody_11_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr", 0)(1, "td", 27)(2, "h6", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "td", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, AdminComponent_div_10_tbody_11_tr_1_ng_container_5_Template, 4, 2, "ng-container", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const order_r23 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](order_r23.orderNo);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", order_r23.itemList);
  }
}
function AdminComponent_div_10_tbody_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AdminComponent_div_10_tbody_11_tr_1_Template, 6, 2, "tr", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "listFilter");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind3"](2, 1, ctx_r14.completedOrdersList, ctx_r14.startIndexComp, ctx_r14.endIndexComp));
  }
}
function AdminComponent_div_10_tbody_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tbody")(1, "tr", 26)(2, "td", 22)(3, "h6", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "No Completed Orders");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
}
function AdminComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 20)(1, "div", 21)(2, "h2", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Placed Orders");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "table", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, AdminComponent_div_10_tbody_5_Template, 3, 5, "tbody", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, AdminComponent_div_10_tbody_6_Template, 5, 0, "tbody", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 21)(8, "h2", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Completed Orders");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "table", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, AdminComponent_div_10_tbody_11_Template, 3, 5, "tbody", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, AdminComponent_div_10_tbody_12_Template, 5, 0, "tbody", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r2.placedOrdersList.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r2.placedOrdersList.length <= 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r2.completedOrdersList.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r2.completedOrdersList.length <= 0);
  }
}
class AdminComponent {
  constructor(apiMainService, router, route) {
    this.apiMainService = apiMainService;
    this.router = router;
    this.route = route;
    this.ordersList = [];
    this.placedOrdersList = [];
    this.completedOrdersList = [];
    this.todayDate = new Date();
    this.orglist = [];
    this.filterObj = {
      orgId: '',
      cafeId: ''
    };
    this.allParamsPresent = false;
    this.paramsObj = {
      organization: '',
      cafeteria: '',
      cafeName: ''
    };
    this.startIndex = 0;
    this.endIndex = 20;
    this.startIndexComp = 0;
    this.endIndexComp = 20;
    this.incrementStep = 20; // Change increment value if needed
  }

  ngOnInit() {
    this.checkURLParams();
    this.getOrgList();
    this.subscription = (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.interval)(60000).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(() => this.getDashboardData())).subscribe();
    this.indexSubscription = (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.interval)(5000).subscribe(() => {
      this.updateIndices();
    });
  }
  checkURLParams() {
    this.route.queryParams.subscribe(params => {
      const {
        organization,
        cafeteria,
        cafeName
      } = params;
      if (organization && cafeteria) {
        this.paramsObj.organization = organization;
        this.paramsObj.cafeteria = cafeteria;
        this.paramsObj.cafeName = cafeName;
        this.allParamsPresent = true;
        this.getDashboardData();
      }
    });
  }
  getOrgList() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        let page = 1;
        let searchObj = {
          countOnly: false
        };
        let data = yield _this.apiMainService.B2B_fetchFilteredAllOrgs(searchObj, page);
        _this.orglist = data;
      } catch (error) {
        console.error(error);
      }
    })();
  }
  setOrgDetails() {
    this.orgDetails = this.orglist.find(org => org._id === this.filterObj?.orgId);
  }
  getDashboardData() {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        let data = yield _this2.apiMainService.getCurrentOutletOrdersListForGuest(_this2.paramsObj.organization, _this2.paramsObj.cafeName, true);
        _this2.ordersList = data ?? [];
        // Reduce looping by grouping directly
        _this2.placedOrdersList = [];
        _this2.completedOrdersList = [];
        _this2.ordersList.forEach(orders => {
          const status = orders._id?.toLowerCase();
          if (status === 'placed') {
            _this2.placedOrdersList = orders?.orders || [];
          } else if (status === 'completed') {
            _this2.completedOrdersList = orders?.orders || [];
          }
        });
      } catch (err) {
        console.error('Error fetching orders data:', err);
      }
    })();
  }
  updateIndices() {
    if (this.ordersList.length > 0) {
      this.startIndex += this.incrementStep;
      this.endIndex += this.incrementStep;
      this.startIndexComp += this.incrementStep;
      this.endIndexComp += this.incrementStep;
      if (this.startIndex >= this.placedOrdersList.length) {
        this.startIndex = 0;
        this.endIndex = this.incrementStep;
      }
      if (this.startIndexComp >= this.completedOrdersList.length) {
        this.startIndexComp = 0;
        this.endIndexComp = this.incrementStep;
      }
    }
  }
  saveOrgDetails() {
    this.router.navigate([], {
      queryParams: {
        organization: this.filterObj.orgId,
        cafeteria: this.filterObj.cafeId,
        cafeName: this.orgDetails?.cafeteriaList.find(item => item._id === this.filterObj.cafeId)?.cafeteria_name
      },
      queryParamsHandling: 'merge'
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.indexSubscription) {
      this.indexSubscription.unsubscribe();
    }
  }
  static #_ = this.ɵfac = function AdminComponent_Factory(t) {
    return new (t || AdminComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_2__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: AdminComponent,
    selectors: [["app-admin"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
    decls: 11,
    vars: 7,
    consts: [[1, ""], [1, "container", "py-2"], ["src", "assets/images/deskdyneLogo.png", "width", "150", "height", "70", "alt", "Deskdyne Logo", 1, "d-inline-block", "align-top"], [1, "container-fluid", "pb-3", 2, "padding-top", "7rem"], [1, "bg-light", "rounded-3", "py-3", "px-5", "mx-auto", "d-flex", "align-items-center", 2, "width", "fit-content"], ["class", "text-center mb-0", 4, "ngIf"], [1, "text-center", "mb-0"], ["class", "row mb-4 mt-5 p-3 bg-light rounded", 4, "ngIf"], ["class", "row mt-4", 4, "ngIf"], [1, "row", "mb-4", "mt-5", "p-3", "bg-light", "rounded"], [1, "col-12", "col-md-4"], ["for", "organization", 1, "labelText", "d-block"], [1, "form-select", 3, "ngModel", "ngModelChange", "change"], ["selected", "", "disabled", "", "value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["for", "cafeteria", 1, "labelText", "d-block"], [1, "form-select", 3, "disabled", "ngModel", "ngModelChange"], [1, "col-12", "col-md-4", "d-flex", "align-items-end"], [1, "btn", "btn-primary", 3, "click"], [3, "value"], [1, "row", "mt-4"], [1, "col-lg-6"], [1, "text-center"], [1, "table", "table-striped", "mt-4"], [4, "ngIf"], ["class", "mb-3", 4, "ngFor", "ngForOf"], [1, "mb-3"], [1, "w-25"], [1, "mb-0"], [1, "d-flex", "align-items-center", "flex-wrap"], [4, "ngFor", "ngForOf"], ["class", "", 4, "ngFor", "ngForOf"]],
    template: function AdminComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "header", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 3)(4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, AdminComponent_h4_5_Template, 2, 1, "h4", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "h4", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](8, "date");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, AdminComponent_div_9_Template, 18, 5, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, AdminComponent_div_10_Template, 13, 4, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.paramsObj.cafeName);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](8, 4, ctx.todayDate, "dd/MM/yyyy"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.allParamsPresent);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.allParamsPresent);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.DatePipe, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel, src_pipes_list_filter_pipe__WEBPACK_IMPORTED_MODULE_1__.ListFilterPipe],
    styles: ["header[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  background: #0d0e13;\n  z-index: 99999;\n  box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.1);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZ3Vlc3QvYWRtaW4vYWRtaW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsTUFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSw2Q0FBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaGVhZGVyIHtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgdG9wOiAwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJhY2tncm91bmQ6ICMwZDBlMTM7XHJcbiAgei1pbmRleDogOTk5OTk7XHJcbiAgYm94LXNoYWRvdzogMCAycHggM3B4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 26066:
/*!***************************************!*\
  !*** ./src/pipes/list-filter.pipe.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ListFilterPipe: () => (/* binding */ ListFilterPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

class ListFilterPipe {
  transform(list, startIndex, endIndex) {
    if (!Array.isArray(list) || startIndex < 0 || endIndex < startIndex) {
      return list;
    }
    return list.slice(startIndex, endIndex);
  }
  static #_ = this.ɵfac = function ListFilterPipe_Factory(t) {
    return new (t || ListFilterPipe)();
  };
  static #_2 = this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
    name: "listFilter",
    type: ListFilterPipe,
    pure: true,
    standalone: true
  });
}

/***/ }),

/***/ 13379:
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/observable/interval.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   interval: () => (/* binding */ interval)
/* harmony export */ });
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ 97777);
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timer */ 89378);


function interval(period = 0, scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__.asyncScheduler) {
  if (period < 0) {
    period = 0;
  }
  return (0,_timer__WEBPACK_IMPORTED_MODULE_1__.timer)(period, period, scheduler);
}

/***/ })

}]);
//# sourceMappingURL=src_app_guest_admin_admin_component_ts.js.map