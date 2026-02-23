"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_orders_orders_module_ts"],{

/***/ 74146:
/*!*************************************************!*\
  !*** ./src/app/orders/orders-routing.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrdersRoutingModule: () => (/* binding */ OrdersRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _orders_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./orders.component */ 45687);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _orders_component__WEBPACK_IMPORTED_MODULE_0__.OrdersComponent
}];
class OrdersRoutingModule {
  static #_ = this.ɵfac = function OrdersRoutingModule_Factory(t) {
    return new (t || OrdersRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: OrdersRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](OrdersRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 45687:
/*!********************************************!*\
  !*** ./src/app/orders/orders.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrdersComponent: () => (/* binding */ OrdersComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 13379);
/* harmony import */ var src_config_order_status_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/config/order-status.config */ 47816);
/* harmony import */ var _common_components_order_filter_dialog_order_filter_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-components/order-filter-dialog/order-filter-dialog.component */ 12360);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 76101);
/* harmony import */ var src_service_utility_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/service/utility.service */ 87381);
/* harmony import */ var src_service_sendDataToComponent_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/service/sendDataToComponent.service */ 16324);
/* harmony import */ var _service_confirmation_modal_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../service/confirmation-modal.service */ 61885);
/* harmony import */ var src_service_toaster_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/service/toaster.service */ 19586);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/dialog */ 17401);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _common_outlet_cafe_select_common_outlet_cafe_select_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common-outlet-cafe-select/common-outlet-cafe-select.component */ 60627);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/progress-spinner */ 33910);
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/badge */ 75392);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);




















function OrdersComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 30)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "error_outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r0.errorMessage);
  }
}
function OrdersComponent_div_62_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "mat-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrdersComponent_div_62_div_2_Template_mat_icon_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      ctx_r9.filterPgName = "";
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r9.applyFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", ctx_r5.filterPgName, " ");
  }
}
function OrdersComponent_div_62_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "mat-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrdersComponent_div_62_div_3_Template_mat_icon_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      ctx_r11.filterAppVersion = "";
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r11.applyFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" v", ctx_r6.filterAppVersion, " ");
  }
}
function OrdersComponent_div_62_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "mat-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrdersComponent_div_62_div_4_Template_mat_icon_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      ctx_r13.filterPlatform = "";
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r13.applyFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", ctx_r7.filterPlatform, " ");
  }
}
function OrdersComponent_div_62_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "mat-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrdersComponent_div_62_div_5_Template_mat_icon_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      ctx_r15.filterIsPosOrder = "";
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r15.applyFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" POS: ", ctx_r8.filterIsPosOrder === "true" ? "Yes" : "No", " ");
  }
}
function OrdersComponent_div_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 31)(1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, OrdersComponent_div_62_div_2_Template, 4, 1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, OrdersComponent_div_62_div_3_Template, 4, 1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](4, OrdersComponent_div_62_div_4_Template, 4, 1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](5, OrdersComponent_div_62_div_5_Template, 4, 1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrdersComponent_div_62_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r17.clearFilters());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8, "filter_alt_off");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](9, " Clear All ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r1.filterPgName);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r1.filterAppVersion);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r1.filterPlatform);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r1.filterIsPosOrder);
  }
}
function OrdersComponent_div_63_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 38)(1, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "Company");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](5, 1, ctx_r19.totalCompanyWallet, "1.2-2"), "");
  }
}
function OrdersComponent_div_63_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 38)(1, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "Subsidy");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](5, 1, ctx_r20.totalSubsidy, "1.2-2"), "");
  }
}
function OrdersComponent_div_63_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 38)(1, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "Packaging");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](5, 1, ctx_r21.totalPackaging, "1.2-2"), "");
  }
}
function OrdersComponent_div_63_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 37)(1, "div", 38)(2, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, "Orders");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "div", 38)(7, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8, "Wallet");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](11, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](12, OrdersComponent_div_63_div_12_Template, 6, 4, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](13, OrdersComponent_div_63_div_13_Template, 6, 4, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](14, OrdersComponent_div_63_div_14_Template, 6, 4, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "div", 38)(16, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](17, "Paid");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](18, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](20, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](21, "div", 42)(22, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](23, "Revenue");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](24, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](26, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.filteredList.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](11, 7, ctx_r2.totalWalletUsed, "1.2-2"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r2.totalCompanyWallet > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r2.totalSubsidy > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r2.totalPackaging > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](20, 10, ctx_r2.totalAmountPaid, "1.2-2"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](26, 13, ctx_r2.totalAmount, "1.2-2"), "");
  }
}
function OrdersComponent_div_64_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "mat-spinner", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, "Loading orders...");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span", 92)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "confirmation_number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" Token ", row_r26.tokenNo, " ");
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r51 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "button", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrdersComponent_div_65_ng_container_1_div_1_button_18_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r51);
      const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
      const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r49.readyOrder(row_r26));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "check");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_button_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r54 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "button", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrdersComponent_div_65_ng_container_1_div_1_button_19_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r54);
      const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r52.completeOrder(row_r26));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "done_all");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_button_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r57 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "button", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrdersComponent_div_65_ng_container_1_div_1_button_20_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r57);
      const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
      const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r55.cancelOrder(row_r26));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_button_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r60 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "button", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrdersComponent_div_65_ng_container_1_div_1_button_21_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r60);
      const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
      const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r58.validatePayment(row_r26));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "verified");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 66)(1, "mat-icon", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "email");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "div", 68)(4, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "span", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("matTooltip", row_r26.customerEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](row_r26.customerEmail);
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 98)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "business");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", row_r26.organizationDetails == null ? null : row_r26.organizationDetails.organization_name, " ");
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 99)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "restaurant");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", row_r26.cafeteriaDetails == null ? null : row_r26.cafeteriaDetails.cafeteria_name, " ");
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_44_div_1_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" \u00B7 ", row_r26.preOrderMealType, "");
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_44_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 102)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "schedule");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, " Pre-Order ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](4, OrdersComponent_div_65_ng_container_1_div_1_div_44_div_1_span_4_Template, 2, 1, "span", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.preOrderMealType);
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_44_div_2_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" \u00B7 ", row_r26.cabinConfig == null ? null : row_r26.cabinConfig.cabinName, "");
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_44_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 104)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "meeting_room");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, " Cabin ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](4, OrdersComponent_div_65_ng_container_1_div_1_div_44_div_2_span_4_Template, 2, 1, "span", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.cabinConfig == null ? null : row_r26.cabinConfig.cabinName);
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, OrdersComponent_div_65_ng_container_1_div_1_div_44_div_1_Template, 5, 1, "div", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, OrdersComponent_div_65_ng_container_1_div_1_div_44_div_2_Template, 5, 1, "div", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.isPreOrder);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.isCabinOrder);
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 105)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "notes");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](row_r26.specialRequest);
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_50_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const i_r74 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("", i_r74.count, "x");
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_50_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const i_r74 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](i_r74.category);
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_50_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 106)(1, "div", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "span", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, OrdersComponent_div_65_ng_container_1_div_1_div_50_span_3_Template, 2, 1, "span", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "span", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](6, OrdersComponent_div_65_ng_container_1_div_1_div_50_span_6_Template, 2, 1, "span", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "span", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](9, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const i_r74 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", i_r74.itemType === "Veg" ? "veg" : "nonveg")("title", i_r74.itemType);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", i_r74.count > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](i_r74.itemName);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", i_r74.category);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](9, 6, i_r74.price * (i_r74.count || 1), "1.2-2"), "");
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_59_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 83)(1, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "Taxes");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "span", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](5, 1, row_r26.taxes, "1.2-2"), "");
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_60_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 83)(1, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "Packaging");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "span", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](5, 1, row_r26.packagingAmount, "1.2-2"), "");
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_61_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 115)(1, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "Subsidy");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "span", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("- \u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](5, 1, row_r26.subsidyAmount, "1.2-2"), "");
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_62_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 115)(1, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "Wallet");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "span", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("- \u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](5, 1, row_r26.moneyWalletPointsUsed, "1.2-2"), "");
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_63_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 115)(1, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "Company");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "span", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("- \u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](5, 1, row_r26.companyWalletPointUsed, "1.2-2"), "");
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_77_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 116)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "payment");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", row_r26.pgName, " ");
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_78_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 116)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "smartphone");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" v", row_r26.appVersion, " ");
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_79_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 116)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "devices");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", row_r26.deviceInfo == null ? null : row_r26.deviceInfo.model, " ");
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_80_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 116)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "language");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", row_r26.deviceInfo == null ? null : row_r26.deviceInfo.platform, " ");
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_div_81_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 116)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "point_of_sale");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, " POS ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
}
function OrdersComponent_div_65_ng_container_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 49)(1, "div", 50)(2, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "div", 52)(5, "h3", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](8, OrdersComponent_div_65_ng_container_1_div_1_span_8_Template, 4, 1, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](11, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](12, "div", 57)(13, "div", 58)(14, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](18, OrdersComponent_div_65_ng_container_1_div_1_button_18_Template, 3, 0, "button", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](19, OrdersComponent_div_65_ng_container_1_div_1_button_19_Template, 3, 0, "button", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](20, OrdersComponent_div_65_ng_container_1_div_1_button_20_Template, 3, 0, "button", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](21, OrdersComponent_div_65_ng_container_1_div_1_button_21_Template, 3, 0, "button", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](22, "div", 64)(23, "div", 65)(24, "div", 66)(25, "mat-icon", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](26, "person");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](27, "div", 68)(28, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](29, "Customer");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](30, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](32, "div", 66)(33, "mat-icon", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](34, "phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](35, "div", 68)(36, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](37, "Phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](38, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](40, OrdersComponent_div_65_ng_container_1_div_1_div_40_Template, 8, 2, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](41, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](42, OrdersComponent_div_65_ng_container_1_div_1_div_42_Template, 4, 1, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](43, OrdersComponent_div_65_ng_container_1_div_1_div_43_Template, 4, 1, "div", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](44, OrdersComponent_div_65_ng_container_1_div_1_div_44_Template, 3, 2, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](45, OrdersComponent_div_65_ng_container_1_div_1_div_45_Template, 5, 1, "div", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](46, "div", 77)(47, "div", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](48);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](49, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](50, OrdersComponent_div_65_ng_container_1_div_1_div_50_Template, 10, 9, "div", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](51, "div", 81)(52, "div", 82)(53, "div", 83)(54, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](55, "Item Total");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](56, "span", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](57);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](58, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](59, OrdersComponent_div_65_ng_container_1_div_1_div_59_Template, 6, 4, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](60, OrdersComponent_div_65_ng_container_1_div_1_div_60_Template, 6, 4, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](61, OrdersComponent_div_65_ng_container_1_div_1_div_61_Template, 6, 4, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](62, OrdersComponent_div_65_ng_container_1_div_1_div_62_Template, 6, 4, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](63, OrdersComponent_div_65_ng_container_1_div_1_div_63_Template, 6, 4, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](64, "div", 88)(65, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](66, "Paid (PG)");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](67, "span", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](68);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](69, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](70, "div", 89)(71, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](72, "Grand Total");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](73, "span", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](74);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](75, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](76, "div", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](77, OrdersComponent_div_65_ng_container_1_div_1_div_77_Template, 4, 1, "div", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](78, OrdersComponent_div_65_ng_container_1_div_1_div_78_Template, 4, 1, "div", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](79, OrdersComponent_div_65_ng_container_1_div_1_div_79_Template, 4, 1, "div", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](80, OrdersComponent_div_65_ng_container_1_div_1_div_80_Template, 4, 1, "div", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](81, OrdersComponent_div_65_ng_container_1_div_1_div_81_Template, 4, 0, "div", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const row_r26 = ctx.$implicit;
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", (row_r26.customerName == null ? null : row_r26.customerName[0]) || "O", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("#", row_r26.orderNo, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.tokenNo);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](11, 33, row_r26.SubmitedDate || row_r26.orderDate, "MMM d, y, h:mm a"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", row_r26.orderstatus);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](row_r26.orderstatus === "completed" ? "check_circle" : row_r26.orderstatus === "placed" ? "restaurant" : row_r26.orderstatus === "paymentFailed" ? "error" : row_r26.orderstatus === "paymentInprogress" ? "hourglass_empty" : "info");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", ctx_r25.orderStatusMapper[row_r26.orderstatus] || row_r26.orderstatus, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.orderstatus === "placed");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.orderstatus === "placed" || row_r26.orderstatus === "readyOrder");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.orderstatus === "placed");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.orderstatus === "paymentInprogress" && ctx_r25.isPaymentValidationVisible(row_r26));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](row_r26.customerName);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](row_r26.customerPhoneNo);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.customerEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.organizationDetails == null ? null : row_r26.organizationDetails.organization_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.cafeteriaDetails == null ? null : row_r26.cafeteriaDetails.cafeteria_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.isPreOrder || row_r26.isCabinOrder);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.specialRequest);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("Order Items (", ((row_r26.itemList || row_r26.itemlist) == null ? null : (row_r26.itemList || row_r26.itemlist).length) || 0, ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", row_r26.itemList || row_r26.itemlist);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](58, 36, row_r26.itemAmount, "1.2-2"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.taxes);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.packagingAmount);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.subsidyAmount);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.moneyWalletPointsUsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.companyWalletPointUsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](69, 39, row_r26.amount, "1.2-2"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](75, 42, ctx_r25.getGrandTotal(row_r26), "1.2-2"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.pgName);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.appVersion);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.deviceInfo == null ? null : row_r26.deviceInfo.model);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.deviceInfo == null ? null : row_r26.deviceInfo.platform);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r26.isPosOrder);
  }
}
function OrdersComponent_div_65_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, OrdersComponent_div_65_ng_container_1_div_1_Template, 82, 45, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r22.filteredList);
  }
}
function OrdersComponent_div_65_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 117)(1, "mat-icon", 118);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "receipt_long");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4, "No Orders Found");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6, "Try changing the status filter or check back later.");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
}
function OrdersComponent_div_65_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, OrdersComponent_div_65_ng_container_1_Template, 2, 1, "ng-container", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, OrdersComponent_div_65_ng_template_2_Template, 7, 0, "ng-template", null, 47, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](3);
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r4.filteredList.length > 0)("ngIfElse", _r23);
  }
}
class OrdersComponent {
  constructor(router, apiMainService, modalService, utilityService, sendDataToComponent, confirmationModalService, toaster, dialog) {
    this.router = router;
    this.apiMainService = apiMainService;
    this.modalService = modalService;
    this.utilityService = utilityService;
    this.sendDataToComponent = sendDataToComponent;
    this.confirmationModalService = confirmationModalService;
    this.toaster = toaster;
    this.dialog = dialog;
    this.orderStatusCountObj = {
      paymentInprogress: 0,
      paymentFailed: 0,
      completed: 0,
      placed: 0
    };
    // Totals
    this.totalAmount = 0;
    this.totalWalletUsed = 0;
    this.totalAmountPaid = 0;
    this.totalSubsidy = 0;
    this.totalCompanyWallet = 0;
    this.totalPackaging = 0;
    this.totalTaxes = 0;
    this.orderStatusMapper = src_config_order_status_config__WEBPACK_IMPORTED_MODULE_1__.orderStatusMapper;
    this.headerConfigAdmin = {
      mode: 'outlet',
      showDateRange: false,
      disableOrg: false,
      requireAll: true
    };
    this.selectedStatus = '';
    this.selectedGroup = '';
    this.currentOrderStatusList = [];
    this.filteredList = [];
    this.orglist = [];
    this.cafeList = [];
    this.filterObj = {
      orgId: '',
      cafeId: ''
    };
    this.isLoading = false;
    this.errorMessage = '';
    this.searchText = '';
    // Filters
    this.filterPgName = '';
    this.filterAppVersion = '';
    this.filterPlatform = '';
    this.filterIsPosOrder = '';
    // Unique values for filter dropdowns
    this.uniquePgNames = [];
    this.uniqueAppVersions = [];
    this.uniquePlatforms = [];
  }
  ngOnInit() {
    this.pollingSub = (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.interval)(30000).subscribe(() => {
      if (this.filterObj.cafeId) {
        this.getLatestOrderStatusList(this.selectedStatus || 'placed');
      }
    });
  }
  reloadPage() {
    this.getLatestOrderStatusList('placed');
  }
  filterSubmitted(event) {
    console.log(event);
    if (event) {
      this.filterObj.cafeId = event.outlet_id;
      this.getLatestOrderStatusList('placed');
    }
  }
  goBack() {
    this.router.navigate(['/home/orders']);
  }
  getLatestOrderStatusList(status) {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.selectedGroup = '';
      _this.selectedStatus = status;
      _this.currentOrderStatusList = [];
      _this.filteredList = [];
      _this.getOrderStatusList(status);
    })();
  }
  getOrderStatusList(status) {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this2.filterObj.cafeId) {
        _this2.errorMessage = 'Please select an outlet to view orders.';
        return;
      }
      try {
        _this2.isLoading = true;
        _this2.errorMessage = '';
        _this2.filteredList = [];
        const newOrders = yield _this2.apiMainService.getAllCurrentOrders(_this2.filterObj.cafeId);
        if (Array.isArray(newOrders)) {
          _this2.currentOrderStatusList = newOrders;
          _this2.extractUniqueFilterValues();
          _this2.applyFilter();
          _this2.updateStatusCounts();
        } else {
          // Fallback if response is not array
          _this2.currentOrderStatusList = [];
          _this2.errorMessage = 'No data received from server.';
        }
      } catch (error) {
        console.error('error while searching orders ', error);
        _this2.errorMessage = 'Failed to load orders. Please try again.';
      } finally {
        _this2.isLoading = false;
      }
    })();
  }
  calculateTotals() {
    this.totalWalletUsed = this.filteredList.reduce((sum, order) => sum + (Number(order.moneyWalletPointsUsed) || 0), 0);
    this.totalAmountPaid = this.filteredList.reduce((sum, order) => sum + (Number(order.amount) || 0), 0);
    this.totalSubsidy = this.filteredList.reduce((sum, order) => sum + (Number(order.subsidyAmount) || 0), 0);
    this.totalCompanyWallet = this.filteredList.reduce((sum, order) => sum + (Number(order.companyWalletPointUsed) || 0), 0);
    this.totalPackaging = this.filteredList.reduce((sum, order) => sum + (Number(order.packagingAmount) || 0), 0);
    this.totalTaxes = this.filteredList.reduce((sum, order) => sum + (Number(order.taxes) || 0), 0);
    this.totalAmount = this.totalWalletUsed + this.totalAmountPaid;
  }
  getGrandTotal(order) {
    return (Number(order.itemAmount) || 0) + (Number(order.taxes) || 0) + (Number(order.packagingAmount) || 0);
  }
  // ... (keep existing calculateTotals)
  onSearch(searchValue) {
    this.searchText = searchValue;
    this.applyFilter();
  }
  applyFilter() {
    let list = this.currentOrderStatusList;
    // 1. Filter by status
    if (this.selectedStatus && this.selectedStatus !== 'all') {
      list = list.filter(order => order.orderstatus === this.selectedStatus);
    }
    // 2. Filter by search text
    if (this.searchText) {
      const lowerSearch = this.searchText.toLowerCase();
      list = list.filter(order => order.orderNo && order.orderNo.toString().toLowerCase().includes(lowerSearch) || order.customerName && order.customerName.toLowerCase().includes(lowerSearch) || order.customerPhoneNo && order.customerPhoneNo.toString().includes(lowerSearch) || order.customerEmail && order.customerEmail.toLowerCase().includes(lowerSearch));
    }
    // 3. Filter by pgName
    if (this.filterPgName) {
      list = list.filter(order => order.pgName === this.filterPgName);
    }
    // 4. Filter by appVersion
    if (this.filterAppVersion) {
      list = list.filter(order => String(order.appVersion) === this.filterAppVersion);
    }
    // 5. Filter by platform
    if (this.filterPlatform) {
      list = list.filter(order => order.deviceInfo?.platform === this.filterPlatform);
    }
    // 6. Filter by isPosOrder
    if (this.filterIsPosOrder) {
      const isPOS = this.filterIsPosOrder === 'true';
      list = list.filter(order => !!order.isPosOrder === isPOS);
    }
    this.filteredList = list;
    this.calculateTotals();
  }
  extractUniqueFilterValues() {
    const pgSet = new Set();
    const versionSet = new Set();
    const platformSet = new Set();
    this.currentOrderStatusList.forEach(order => {
      if (order.pgName) pgSet.add(order.pgName);
      if (order.appVersion) versionSet.add(String(order.appVersion));
      if (order.deviceInfo?.platform) platformSet.add(order.deviceInfo.platform);
    });
    this.uniquePgNames = Array.from(pgSet).sort();
    this.uniqueAppVersions = Array.from(versionSet).sort();
    this.uniquePlatforms = Array.from(platformSet).sort();
  }
  hasActiveFilters() {
    return !!(this.filterPgName || this.filterAppVersion || this.filterPlatform || this.filterIsPosOrder);
  }
  get activeFilterCount() {
    let count = 0;
    if (this.filterPgName) count++;
    if (this.filterAppVersion) count++;
    if (this.filterPlatform) count++;
    if (this.filterIsPosOrder) count++;
    return count;
  }
  openFilterDialog() {
    const dialogData = {
      filterOrderStatus: '',
      filterPgName: this.filterPgName,
      filterAppVersion: this.filterAppVersion,
      filterPlatform: this.filterPlatform,
      filterIsPosOrder: this.filterIsPosOrder,
      uniqueOrderStatuses: [],
      uniquePgNames: this.uniquePgNames,
      uniqueAppVersions: this.uniqueAppVersions,
      uniquePlatforms: this.uniquePlatforms,
      showStatusFilter: false
    };
    const dialogRef = this.dialog.open(_common_components_order_filter_dialog_order_filter_dialog_component__WEBPACK_IMPORTED_MODULE_2__.OrderFilterDialogComponent, {
      data: dialogData,
      width: '520px',
      panelClass: 'filter-dialog-panel',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterPgName = result.filterPgName;
        this.filterAppVersion = result.filterAppVersion;
        this.filterPlatform = result.filterPlatform;
        this.filterIsPosOrder = result.filterIsPosOrder;
        this.applyFilter();
      }
    });
  }
  clearFilters() {
    this.filterPgName = '';
    this.filterAppVersion = '';
    this.filterPlatform = '';
    this.filterIsPosOrder = '';
    this.applyFilter();
  }
  updateStatusCounts() {
    const counts = {
      paymentInprogress: 0,
      paymentFailed: 0,
      completed: 0,
      placed: 0
    };
    this.currentOrderStatusList.forEach(order => {
      if (counts.hasOwnProperty(order.orderstatus)) {
        counts[order.orderstatus]++;
      }
    });
    // Also update counts for 'readyOrder' if mapped to 'placed' or keep separate if needed
    // based on existing logic. For now, assuming standard statuses.
    this.orderStatusCountObj = counts;
  }
  validatePayment(order) {
    var _this3 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const res = yield _this3.apiMainService.validateJusPayPaymentTransactionManual({
          foodOrderId: order._id,
          orderType: "outletOrder"
        });
        if (res.status === 'success' || res.status === 'placed' || res.status === true) {
          _this3.toaster.success(res.message || 'Payment validated successfully');
        } else {
          _this3.toaster.error("Failed to validate payment transaction");
        }
        _this3.getLatestOrderStatusList(_this3.selectedStatus);
      } catch (err) {
        console.error(err);
        _this3.toaster.error("Error validating payment");
      }
    })();
  }
  setBtnGroup(group) {
    this.selectedGroup = group;
  }
  cancelOrder(order) {
    this.confirmationModalService.modal({
      msg: 'Are you sure you want to cancel this order?',
      callback: this.submitCancellation,
      context: this,
      data: order
    });
  }
  submitCancellation() {
    var _this4 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const body = {
          fromOrderNo: true,
          orderNo: _this4.confirmationModalService.data.orderNo,
          outletId: _this4.confirmationModalService.data.outletId,
          updatestatus: 'Cancel'
        };
        yield _this4.apiMainService.updatescanOrder(body);
        // Update local list instead of full reload if possible, 
        // or just reload list
        _this4.toaster.success("Order Cancelled SuccessFully");
        _this4.getLatestOrderStatusList(_this4.selectedStatus);
      } catch (err) {
        console.error('Error cancelling order:', err);
      }
    })();
  }
  readyOrder(order) {
    this.confirmationModalService.modal({
      msg: 'Are you sure you want to mark this order as ready?',
      callback: this.submitReadyOrder,
      context: this,
      data: order
    });
  }
  submitReadyOrder() {
    var _this5 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const body = {
          fromOrderNo: true,
          orderNo: _this5.confirmationModalService.data.orderNo,
          outletId: _this5.confirmationModalService.data.outletId,
          updatestatus: 'readyOrder'
        };
        yield _this5.apiMainService.updatescanOrder(body);
        _this5.toaster.success("Order marked as Ready");
        _this5.getLatestOrderStatusList(_this5.selectedStatus);
      } catch (err) {
        console.error('Error marking order ready:', err);
      }
    })();
  }
  completeOrder(order) {
    this.confirmationModalService.modal({
      msg: 'Are you sure you want to complete this order?',
      callback: this.submitCompletion,
      context: this,
      data: order
    });
  }
  submitCompletion() {
    var _this6 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const body = {
          fromOrderNo: true,
          orderNo: _this6.confirmationModalService.data.orderNo,
          outletId: _this6.confirmationModalService.data.outletId,
          updatestatus: 'completed'
        };
        yield _this6.apiMainService.updatescanOrder(body);
        _this6.toaster.success("Order Completed SuccessFully");
        _this6.getLatestOrderStatusList(_this6.selectedStatus);
      } catch (err) {
        console.error('Error completing order:', err);
      }
    })();
  }
  isPaymentValidationVisible(order) {
    if (!order) return false;
    const orderDateStr = order.orderDate;
    if (!orderDateStr) return false;
    const orderTime = new Date(orderDateStr).getTime();
    const currentTime = Date.now();
    const diffInMinutes = (currentTime - orderTime) / (1000 * 60);
    return diffInMinutes > 20;
  }
  ngOnDestroy() {
    this.pollingSub?.unsubscribe();
  }
  static #_ = this.ɵfac = function OrdersComponent_Factory(t) {
    return new (t || OrdersComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_3__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__.NgbModal), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_service_utility_service__WEBPACK_IMPORTED_MODULE_4__.UtilityService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_service_sendDataToComponent_service__WEBPACK_IMPORTED_MODULE_5__.SendDataToComponent), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_service_confirmation_modal_service__WEBPACK_IMPORTED_MODULE_6__.ConfirmationModalService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_service_toaster_service__WEBPACK_IMPORTED_MODULE_7__.ToasterService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__.MatDialog));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
    type: OrdersComponent,
    selectors: [["app-orders"]],
    decls: 66,
    vars: 23,
    consts: [[1, "orders-page-container"], [1, "orders-header-card"], [1, "header-content"], [1, "title-section"], [1, "page-title"], [1, "page-subtitle"], [1, "actions-section"], [1, "search-wrapper"], [1, "search-icon"], ["type", "text", "placeholder", "Search by Order #, Name, Phone, Email...", 3, "keyup"], ["mat-icon-button", "", "matTooltip", "Filters", 1, "btn-filter", 3, "click"], ["matBadgeSize", "small", "matBadgeColor", "accent", 3, "matBadge", "matBadgeHidden"], ["mat-flat-button", "", 1, "btn-refresh", 3, "disabled", "click"], [1, "content-body"], [1, "filter-wrapper", "mb-4"], [3, "config", "submitted"], ["class", "error-banner", 4, "ngIf"], [1, "stats-grid", "mb-4"], [1, "stat-card", 3, "click"], [1, "stat-icon", "warning"], [1, "stat-info"], [1, "stat-value"], [1, "stat-label"], [1, "stat-icon", "error"], [1, "stat-icon", "primary"], [1, "stat-icon", "success"], ["class", "active-filter-chips mb-4", 4, "ngIf"], ["class", "totals-strip", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "orders-list", 4, "ngIf"], [1, "error-banner"], [1, "active-filter-chips", "mb-4"], [1, "chip-strip"], ["class", "filter-chip", 4, "ngIf"], ["mat-stroked-button", "", 1, "btn-clear-all", 3, "click"], [1, "filter-chip"], [3, "click"], [1, "totals-strip"], [1, "total-chip"], [1, "chip-label"], [1, "chip-value"], ["class", "total-chip", 4, "ngIf"], [1, "total-chip", "highlight"], [1, "loading-state"], ["diameter", "44"], [1, "orders-list"], [4, "ngIf", "ngIfElse"], ["noRecords", ""], ["class", "order-item-card", 4, "ngFor", "ngForOf"], [1, "order-item-card"], [1, "card-top"], [1, "order-avatar"], [1, "order-identity"], [1, "order-title"], [1, "order-sub-info"], ["class", "token-chip", 4, "ngIf"], [1, "date-text"], [1, "card-top-right"], [1, "status-badge", 3, "ngClass"], [1, "card-actions"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Mark Ready", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "class", "complete-btn", "matTooltip", "Complete Order", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Cancel Order", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "accent", "matTooltip", "Validate Payment", 3, "click", 4, "ngIf"], [1, "card-body-grid"], [1, "card-body-left"], [1, "info-row"], [1, "info-icon"], [1, "info-content"], [1, "info-label"], [1, "info-value"], ["class", "info-row", 4, "ngIf"], [1, "badge-row"], ["class", "org-badge", 4, "ngIf"], ["class", "cafe-badge", 4, "ngIf"], ["class", "badge-row", 4, "ngIf"], ["class", "special-note", 4, "ngIf"], [1, "card-body-right"], [1, "section-label"], [1, "items-scroll"], ["class", "item-row", 4, "ngFor", "ngForOf"], [1, "card-footer"], [1, "fin-strip"], [1, "fin-cell"], [1, "fin-label"], [1, "fin-value"], ["class", "fin-cell", 4, "ngIf"], ["class", "fin-cell discount", 4, "ngIf"], [1, "fin-cell", "paid"], [1, "fin-cell", "grand"], [1, "meta-row"], ["class", "meta-chip", 4, "ngIf"], [1, "token-chip"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Mark Ready", 3, "click"], ["mat-icon-button", "", "matTooltip", "Complete Order", 1, "complete-btn", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Cancel Order", 3, "click"], ["mat-icon-button", "", "color", "accent", "matTooltip", "Validate Payment", 3, "click"], [1, "info-value", "text-truncate", 3, "matTooltip"], [1, "org-badge"], [1, "cafe-badge"], ["class", "flag-badge preorder", 4, "ngIf"], ["class", "flag-badge cabin", 4, "ngIf"], [1, "flag-badge", "preorder"], [4, "ngIf"], [1, "flag-badge", "cabin"], [1, "special-note"], [1, "item-row"], [1, "item-left"], [1, "type-dot", 3, "ngClass", "title"], ["class", "item-qty", 4, "ngIf"], [1, "item-name"], ["class", "item-cat", 4, "ngIf"], [1, "item-price"], [1, "item-qty"], [1, "item-cat"], [1, "fin-cell", "discount"], [1, "meta-chip"], [1, "empty-state"], [1, "empty-icon"]],
    template: function OrdersComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5, "Outlet Orders");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](7, "Monitor and manage live outlet orders");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "div", 6)(9, "div", 7)(10, "mat-icon", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](11, "search");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](12, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("keyup", function OrdersComponent_Template_input_keyup_12_listener($event) {
          return ctx.onSearch($event.target.value);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](13, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrdersComponent_Template_button_click_13_listener() {
          return ctx.openFilterDialog();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "mat-icon", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](15, "filter_list");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](16, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrdersComponent_Template_button_click_16_listener() {
          return ctx.reloadPage();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](18, "refresh");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](19, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](20, "Refresh");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](21, "div", 13)(22, "div", 14)(23, "app-common-outlet-cafe-select", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("submitted", function OrdersComponent_Template_app_common_outlet_cafe_select_submitted_23_listener($event) {
          return ctx.filterSubmitted($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](24, OrdersComponent_div_24_Template, 5, 1, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](25, "div", 17)(26, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrdersComponent_Template_div_click_26_listener() {
          return ctx.getLatestOrderStatusList("paymentInprogress");
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](27, "div", 19)(28, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](29, "hourglass_empty");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](30, "div", 20)(31, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](32);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](33, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](34, "Payment Processing");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](35, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrdersComponent_Template_div_click_35_listener() {
          return ctx.getLatestOrderStatusList("paymentFailed");
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](36, "div", 23)(37, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](38, "error");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](39, "div", 20)(40, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](41);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](42, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](43, "Payment Failed");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](44, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrdersComponent_Template_div_click_44_listener() {
          return ctx.getLatestOrderStatusList("placed");
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](45, "div", 24)(46, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](47, "restaurant");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](48, "div", 20)(49, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](50);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](51, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](52, "New Orders");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](53, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrdersComponent_Template_div_click_53_listener() {
          return ctx.getLatestOrderStatusList("completed");
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](54, "div", 25)(55, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](56, "check_circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](57, "div", 20)(58, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](59);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](60, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](61, "Completed");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](62, OrdersComponent_div_62_Template, 10, 4, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](63, OrdersComponent_div_63_Template, 27, 16, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](64, OrdersComponent_div_64_Template, 4, 0, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](65, OrdersComponent_div_65_Template, 4, 2, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("matBadge", ctx.activeFilterCount)("matBadgeHidden", ctx.activeFilterCount === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("spin", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("config", ctx.headerConfigAdmin);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.errorMessage);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("active", ctx.selectedStatus === "paymentInprogress");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx.orderStatusCountObj.paymentInprogress);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("active", ctx.selectedStatus === "paymentFailed");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx.orderStatusCountObj.paymentFailed);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("active", ctx.selectedStatus === "placed");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx.orderStatusCountObj.placed);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("active", ctx.selectedStatus === "completed");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx.orderStatusCountObj.completed);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.activeFilterCount > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.isLoading && ctx.filteredList.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.isLoading);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _common_outlet_cafe_select_common_outlet_cafe_select_component__WEBPACK_IMPORTED_MODULE_8__.CommonOutletCafeSelectComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_15__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_15__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__.MatIcon, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_17__.MatProgressSpinner, _angular_material_badge__WEBPACK_IMPORTED_MODULE_18__.MatBadge, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__.MatTooltip, _angular_common__WEBPACK_IMPORTED_MODULE_14__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_14__.DatePipe],
    styles: ["\n\n\n\n[_ngcontent-%COMP%]:root {\n  --color-primary: #0E49B5;\n  --color-secondary: #FF3333;\n  --color-backgroundGrey: #f3f3f3;\n  --color-text: #1a1a1a;\n}\n\n.orders-page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  min-height: 100vh;\n}\n\n.orders-header-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 20px;\n  padding: 1.5rem 2rem;\n  margin-bottom: 2rem;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);\n  border: 1px solid rgba(0, 0, 0, 0.04);\n}\n.orders-header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n}\n@media (max-width: 768px) {\n  .orders-header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n.orders-header-card[_ngcontent-%COMP%]   .title-section[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #192754;\n  margin: 0 0 0.25rem 0;\n}\n.orders-header-card[_ngcontent-%COMP%]   .title-section[_ngcontent-%COMP%]   .page-subtitle[_ngcontent-%COMP%] {\n  color: #6c757d;\n  margin: 0;\n  font-size: 0.95rem;\n}\n.orders-header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n@media (max-width: 768px) {\n  .orders-header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-direction: column;\n  }\n  .orders-header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .search-wrapper[_ngcontent-%COMP%], .orders-header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .btn-refresh[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n\n.search-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  min-width: 320px;\n}\n@media (max-width: 768px) {\n  .search-wrapper[_ngcontent-%COMP%] {\n    min-width: 100%;\n  }\n}\n.search-wrapper[_ngcontent-%COMP%]   .search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9aa0a6;\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.search-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 16px 12px 42px;\n  border: 1px solid #e0e0e0;\n  border-radius: 9999px;\n  font-size: 0.95rem;\n  background-color: #f8f9fa;\n  transition: all 0.3s ease;\n}\n.search-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  background-color: #fff;\n  border-color: #0E49B5;\n  box-shadow: 0 0 0 3px rgba(14, 73, 181, 0.1);\n}\n.search-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #adb5bd;\n}\n\n.btn-refresh[_ngcontent-%COMP%] {\n  border-radius: 9999px !important;\n  padding: 0.5rem 1.5rem !important;\n  font-weight: 600 !important;\n  height: 48px !important;\n  box-shadow: 0 4px 12px rgba(14, 73, 181, 0.2);\n  background-color: #0E49B5 !important;\n  color: white !important;\n}\n.btn-refresh[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n\n.content-body[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.filter-wrapper[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\n  border: 1px solid rgba(0, 0, 0, 0.05);\n  padding: 1rem 1.5rem;\n}\n\n.error-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1.25rem;\n  background: #fff1f0;\n  color: #ff4d4f;\n  border-radius: 12px;\n  font-weight: 500;\n  margin-bottom: 1.5rem;\n}\n.error-banner[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n\n.btn-filter[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  border: 1px solid #e2e8f0;\n  transition: all 0.2s;\n}\n.btn-filter[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #4f46e5;\n}\n.btn-filter[_ngcontent-%COMP%]:hover {\n  background: #eef2ff;\n  border-color: #c7d2fe;\n}\n\n.active-filter-chips[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n\n.chip-strip[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n  align-items: center;\n}\n\n.filter-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 10px;\n  border-radius: 99px;\n  font-size: 0.78rem;\n  font-weight: 500;\n  color: #3730a3;\n  background: linear-gradient(135deg, #eef2ff, #e0e7ff);\n  border: 1px solid #c7d2fe;\n}\n.filter-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n  cursor: pointer;\n  opacity: 0.6;\n  transition: opacity 0.2s;\n}\n.filter-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n.btn-clear-all[_ngcontent-%COMP%] {\n  border-radius: 9999px !important;\n  font-size: 0.75rem !important;\n  height: 28px !important;\n  color: #64748b !important;\n  border-color: #cbd5e1 !important;\n  padding: 0 10px !important;\n  line-height: 28px !important;\n}\n.btn-clear-all[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n  margin-right: 2px;\n}\n\n.complete-btn[_ngcontent-%COMP%] {\n  color: #16a34a !important;\n}\n\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1.25rem;\n}\n\n.stat-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 1.25rem;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\n  border: 1px solid rgba(0, 0, 0, 0.05);\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);\n}\n.stat-card.active[_ngcontent-%COMP%] {\n  border-color: #0E49B5;\n  background: rgba(14, 73, 181, 0.04);\n}\n.stat-card.active[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  color: #0E49B5;\n}\n\n.stat-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.stat-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.stat-icon.warning[_ngcontent-%COMP%] {\n  background-color: #fff7e6;\n  color: #faad14;\n}\n.stat-icon.error[_ngcontent-%COMP%] {\n  background-color: #fff1f0;\n  color: #ff4d4f;\n}\n.stat-icon.primary[_ngcontent-%COMP%] {\n  background-color: #e6f7ff;\n  color: #1890ff;\n}\n.stat-icon.success[_ngcontent-%COMP%] {\n  background-color: #f6ffed;\n  color: #52c41a;\n}\n\n.stat-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  line-height: 1.2;\n  color: #192754;\n}\n\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #718096;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.totals-strip[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  margin-bottom: 1.5rem;\n}\n\n.total-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  flex-direction: column;\n  padding: 0.5rem 1rem;\n  background: white;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  min-width: 100px;\n}\n.total-chip[_ngcontent-%COMP%]   .chip-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: #718096;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  font-weight: 600;\n  margin-bottom: 2px;\n}\n.total-chip[_ngcontent-%COMP%]   .chip-value[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #192754;\n}\n.total-chip.highlight[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #eef2ff, #e0e7ff);\n  border-color: #c7d2fe;\n}\n.total-chip.highlight[_ngcontent-%COMP%]   .chip-label[_ngcontent-%COMP%] {\n  color: #3730a3;\n}\n.total-chip.highlight[_ngcontent-%COMP%]   .chip-value[_ngcontent-%COMP%] {\n  color: #312e81;\n  font-weight: 700;\n}\n\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem 2rem;\n  gap: 1rem;\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #718096;\n  font-size: 0.95rem;\n}\n\n.order-item-card[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  transition: all 0.2s ease;\n  margin-bottom: 1.25rem;\n}\n.order-item-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  border-color: #4b82e2;\n  box-shadow: 0 4px 12px rgba(14, 73, 181, 0.1);\n}\n\n.card-top[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  border-bottom: 1px solid #f1f1f1;\n  flex-wrap: wrap;\n}\n.card-top[_ngcontent-%COMP%]   .order-avatar[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);\n  color: white;\n  font-weight: 700;\n  font-size: 1.1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  text-transform: uppercase;\n}\n.card-top[_ngcontent-%COMP%]   .order-identity[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  overflow: hidden;\n}\n.card-top[_ngcontent-%COMP%]   .order-identity[_ngcontent-%COMP%]   .order-title[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #2d3748;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.card-top[_ngcontent-%COMP%]   .order-identity[_ngcontent-%COMP%]   .order-sub-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.card-top[_ngcontent-%COMP%]   .order-identity[_ngcontent-%COMP%]   .order-sub-info[_ngcontent-%COMP%]   .token-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  background: #eef2ff;\n  color: #4f46e5;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.card-top[_ngcontent-%COMP%]   .order-identity[_ngcontent-%COMP%]   .order-sub-info[_ngcontent-%COMP%]   .token-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 13px;\n  width: 13px;\n  height: 13px;\n}\n.card-top[_ngcontent-%COMP%]   .order-identity[_ngcontent-%COMP%]   .order-sub-info[_ngcontent-%COMP%]   .date-text[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: #718096;\n}\n.card-top[_ngcontent-%COMP%]   .card-top-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-shrink: 0;\n}\n.card-top[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.card-top[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  line-height: 32px;\n  padding: 0;\n}\n.card-top[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.75rem;\n  padding: 3px 10px;\n  border-radius: 6px;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.status-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.status-badge.placed[_ngcontent-%COMP%] {\n  background-color: #e6f7ff;\n  color: #1890ff;\n}\n.status-badge.paymentInprogress[_ngcontent-%COMP%] {\n  background-color: #fff7e6;\n  color: #faad14;\n}\n.status-badge.paymentFailed[_ngcontent-%COMP%] {\n  background-color: #fff1f0;\n  color: #ff4d4f;\n}\n.status-badge.completed[_ngcontent-%COMP%] {\n  background-color: #f6ffed;\n  color: #52c41a;\n}\n.status-badge.cancelled[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  color: #374151;\n}\n\n.card-body-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n}\n@media (max-width: 992px) {\n  .card-body-grid[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n\n.card-body-left[_ngcontent-%COMP%] {\n  width: 340px;\n  flex-shrink: 0;\n  padding: 1.25rem;\n  border-right: 1px solid #f1f5f9;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n@media (max-width: 992px) {\n  .card-body-left[_ngcontent-%COMP%] {\n    width: 100%;\n    border-right: none;\n    border-bottom: 1px solid #f1f5f9;\n  }\n}\n\n.info-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n}\n.info-row[_ngcontent-%COMP%]   .info-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: #a0aec0;\n  margin-top: 2px;\n}\n.info-row[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  overflow: hidden;\n}\n.info-row[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%]   .info-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: #94a3b8;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.info-row[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%]   .info-value[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: #2d3748;\n}\n.info-row[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%]   .info-value.text-truncate[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.badge-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n}\n\n.org-badge[_ngcontent-%COMP%], .cafe-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 3px 8px;\n  border-radius: 6px;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n.org-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .cafe-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 13px;\n  width: 13px;\n  height: 13px;\n}\n\n.org-badge[_ngcontent-%COMP%] {\n  background: #f0f9ff;\n  color: #0369a1;\n  border: 1px solid #bae6fd;\n}\n.org-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #38bdf8;\n}\n\n.cafe-badge[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #fef3c7, #fde68a);\n  color: #92400e;\n  border: 1px solid #fcd34d;\n}\n.cafe-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n\n.flag-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 3px 10px;\n  border-radius: 99px;\n  font-size: 0.73rem;\n  font-weight: 600;\n}\n.flag-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 13px;\n  width: 13px;\n  height: 13px;\n}\n.flag-badge.preorder[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n.flag-badge.cabin[_ngcontent-%COMP%] {\n  background: #ede9fe;\n  color: #5b21b6;\n}\n\n.special-note[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 6px;\n  background: #fffbeb;\n  border: 1px solid #fde68a;\n  border-radius: 8px;\n  padding: 8px 12px;\n  font-size: 0.82rem;\n  color: #92400e;\n  line-height: 1.4;\n}\n.special-note[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  margin-top: 1px;\n  flex-shrink: 0;\n  color: #d97706;\n}\n\n.card-body-right[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 1.25rem;\n  display: flex;\n  flex-direction: column;\n}\n.card-body-right[_ngcontent-%COMP%]   .section-label[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  color: #94a3b8;\n  margin-bottom: 0.75rem;\n  letter-spacing: 0.03em;\n}\n\n.items-scroll[_ngcontent-%COMP%] {\n  max-height: 200px;\n  overflow-y: auto;\n  padding-right: 0.5rem;\n}\n.items-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 5px;\n}\n.items-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f5f9;\n  border-radius: 4px;\n}\n.items-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n\n.item-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.6rem 0;\n  border-bottom: 1px dashed #e2e8f0;\n}\n.item-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.item-row[_ngcontent-%COMP%]   .item-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex: 1;\n  min-width: 0;\n}\n.item-row[_ngcontent-%COMP%]   .type-dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 2px;\n  border: 2px solid;\n  flex-shrink: 0;\n}\n.item-row[_ngcontent-%COMP%]   .type-dot.veg[_ngcontent-%COMP%] {\n  border-color: #16a34a;\n}\n.item-row[_ngcontent-%COMP%]   .type-dot.veg[_ngcontent-%COMP%]::after {\n  content: \"\";\n  display: block;\n  width: 4px;\n  height: 4px;\n  background: #16a34a;\n  border-radius: 50%;\n  margin: 1px auto;\n}\n.item-row[_ngcontent-%COMP%]   .type-dot.nonveg[_ngcontent-%COMP%] {\n  border-color: #dc2626;\n}\n.item-row[_ngcontent-%COMP%]   .type-dot.nonveg[_ngcontent-%COMP%]::after {\n  content: \"\";\n  display: block;\n  width: 0;\n  height: 0;\n  border-left: 3px solid transparent;\n  border-right: 3px solid transparent;\n  border-bottom: 4px solid #dc2626;\n  margin: 1px auto 0;\n}\n.item-row[_ngcontent-%COMP%]   .item-qty[_ngcontent-%COMP%] {\n  background: #eef2ff;\n  color: #4f46e5;\n  font-weight: 700;\n  font-size: 0.73rem;\n  padding: 1px 7px;\n  border-radius: 4px;\n  flex-shrink: 0;\n}\n.item-row[_ngcontent-%COMP%]   .item-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #2d3748;\n  font-size: 0.9rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.item-row[_ngcontent-%COMP%]   .item-cat[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  padding: 1px 6px;\n  border-radius: 4px;\n  background: #f1f5f9;\n  color: #64748b;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.item-row[_ngcontent-%COMP%]   .item-price[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2d3748;\n  font-size: 0.9rem;\n  flex-shrink: 0;\n  margin-left: 0.75rem;\n}\n\n.card-footer[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.25rem;\n  background-color: #f7fafc;\n  border-top: 1px solid #edf2f7;\n  border-bottom-left-radius: 12px;\n  border-bottom-right-radius: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n\n.fin-strip[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem 1.25rem;\n  align-items: flex-end;\n}\n\n.fin-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: 70px;\n}\n.fin-cell[_ngcontent-%COMP%]   .fin-label[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  color: #718096;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  font-weight: 500;\n}\n.fin-cell[_ngcontent-%COMP%]   .fin-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #192754;\n  font-size: 0.88rem;\n}\n.fin-cell.discount[_ngcontent-%COMP%]   .fin-value[_ngcontent-%COMP%] {\n  color: #52c41a;\n}\n.fin-cell.paid[_ngcontent-%COMP%]   .fin-label[_ngcontent-%COMP%] {\n  color: #0E49B5;\n}\n.fin-cell.paid[_ngcontent-%COMP%]   .fin-value[_ngcontent-%COMP%] {\n  color: #0E49B5;\n}\n.fin-cell.grand[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  background: linear-gradient(135deg, #eef2ff, #e0e7ff);\n  border-radius: 8px;\n  border: 1px solid #c7d2fe;\n}\n.fin-cell.grand[_ngcontent-%COMP%]   .fin-label[_ngcontent-%COMP%] {\n  color: #3730a3;\n  font-weight: 600;\n}\n.fin-cell.grand[_ngcontent-%COMP%]   .fin-value[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  color: #312e81;\n}\n\n.meta-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n}\n\n.meta-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  padding: 2px 8px;\n  border-radius: 6px;\n  background: #edf2f7;\n  font-size: 0.7rem;\n  color: #4a5568;\n  font-weight: 500;\n}\n.meta-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n  width: 12px;\n  height: 12px;\n  color: #a0aec0;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem 2rem;\n  text-align: center;\n  background: white;\n  border-radius: 12px;\n  border: 1px dashed #ced4da;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #dee2e6;\n  margin-bottom: 1rem;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #192754;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6c757d;\n  margin-bottom: 1.5rem;\n}\n\n@media (max-width: 768px) {\n  .orders-page-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .orders-header-card[_ngcontent-%COMP%] {\n    padding: 1rem 1.25rem;\n  }\n  .card-top[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .card-body-left[_ngcontent-%COMP%], .card-body-right[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .card-footer[_ngcontent-%COMP%] {\n    padding: 0.75rem 1rem;\n  }\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 0.75rem;\n  }\n}\n@media (max-width: 480px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .card-top-right[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: flex-end;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGhlbWUvX3ZhcmlhYmxlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL29yZGVycy9vcmRlcnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OytDQUFBO0FBMEVBO0VBQ0Usd0JBQUE7RUFDQSwwQkFBQTtFQUNBLCtCQUFBO0VBQ0EscUJBQUE7QUN0RUY7O0FBRkE7RUFDSSxlQUFBO0VBQ0EsaUJBQUE7QUFLSjs7QUFDQTtFQUNJLGdCQUFBO0VBQ0EsbUJET2U7RUNOZixvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMENEWWM7RUNYZCxxQ0FBQTtBQUVKO0FBQUk7RUFDSSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0FBRVI7QUFBUTtFQVBKO0lBUVEsc0JBQUE7SUFDQSxvQkFBQTtFQUdWO0FBQ0Y7QUFDUTtFQUNJLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjRDVCSztFQzZCTCxxQkFBQTtBQUNaO0FBRVE7RUFDSSxjQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0FBQVo7QUFJSTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0FBRlI7QUFJUTtFQU5KO0lBT1EsV0FBQTtJQUNBLHNCQUFBO0VBRFY7RUFHVTs7SUFFSSxXQUFBO0VBRGQ7QUFDRjs7QUFPQTtFQUNJLGtCQUFBO0VBQ0EsZ0JBQUE7QUFKSjtBQU1JO0VBSko7SUFLUSxlQUFBO0VBSE47QUFDRjtBQUtJO0VBQ0ksa0JBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUNBLDJCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUhSO0FBTUk7RUFDSSxXQUFBO0VBQ0EsNEJBQUE7RUFDQSx5QkFBQTtFQUNBLHFCRHBFYTtFQ3FFYixrQkFBQTtFQUNBLHlCQUFBO0VBQ0EseUJBQUE7QUFKUjtBQU1RO0VBQ0ksYUFBQTtFQUNBLHNC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Q0EsV0FBQTtBQWpISjs7QUFvSEE7RUFDSSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0FBakhKO0FBbUhJO0VBQ0ksZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQWpIUjs7QUF3SEE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJEMzdCZTtFQzQ3QmYsMEJBQUE7QUFySEo7QUF1SEk7RUFDSSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7QUFySFI7QUF3SEk7RUFDSSxjRGw5QlM7RUNtOUJULGdCQUFBO0VBQ0EscUJBQUE7QUF0SFI7QUF5SEk7RUFDSSxjQUFBO0VBQ0EscUJBQUE7QUF2SFI7O0FBOEhBO0VBQ0k7SUFDSSxhQUFBO0VBM0hOO0VBOEhFO0lBQ0kscUJBQUE7RUE1SE47RUErSEU7SUFDSSxhQUFBO0VBN0hOO0VBZ0lFOztJQUVJLGFBQUE7RUE5SE47RUFpSUU7SUFDSSxxQkFBQTtFQS9ITjtFQWtJRTtJQUNJLHFDQUFBO0lBQ0EsWUFBQTtFQWhJTjtBQUNGO0FBbUlBO0VBQ0k7SUFDSSwwQkFBQTtFQWpJTjtFQW9JRTtJQUNJLFdBQUE7SUFDQSx5QkFBQTtFQWxJTjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgIEdsb2JhbCBTQ1NTIFZhcmlhYmxlcyAtIEJyYW5kIENvbG9yc1xyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbiR3aGl0ZTogI2ZmZmZmZjtcclxuJGJsYWNrOiAjMDAwMDAwO1xyXG4kdGV4dFByaW1hcnk6ICMxYTFhMWE7XHJcblxyXG4vLyBCcmFuZCBDb2xvcnMgKFJveWFsIEJsdWUgJiBOYXZ5KVxyXG4kcHJpbWFyeS1jb2xvcjE6ICMwRTQ5QjU7IC8vIFJveWFsIEJsdWUgKE1haW4gUHJpbWFyeSlcclxuJHByaW1hcnktY29sb3I6ICRwcmltYXJ5LWNvbG9yMTsgLy8gQWxpYXMgZm9yIGNvbnNpc3RlbmN5XHJcbiRwcmltYXJ5LWNvbG9yMjogIzE5Mjc1NDsgLy8gTmF2eSBCbHVlIChTZWNvbmRhcnkgLyBEYXJrIFByaW1hcnkpXHJcbiRwcmltYXJ5LWNvbG9yMzogIzRiODJlMjsgLy8gTGlnaHRlciBCbHVlIGRlcml2YXRpdmVcclxuXHJcbi8vIEJyYW5kIENvbG9ycyAoQ3JlYW0gJiBSZWQpXHJcbiRzZWNvbmRhcnktY29sb3IxOiAjRjRFQ0M1OyAvLyBTb2Z0IENyZWFtXHJcbiRzZWNvbmRhcnktY29sb3IyOiAjZmZlMGIyOyAvLyBEZXJpdmF0aXZlXHJcbiRzZWNvbmRhcnktY29sb3IzOiAjRkYzMzMzOyAvLyBCcmlnaHQgUmVkIChBY2NlbnQpXHJcblxyXG4vLyBEZXNpZ24gVG9rZW5zIC0gQm9yZGVyIFJhZGl1c1xyXG4kYm9yZGVyLXJhZGl1cy1zbTogNHB4O1xyXG4kYm9yZGVyLXJhZGl1cy1tZDogOHB4O1xyXG4kYm9yZGVyLXJhZGl1cy1sZzogMTJweDtcclxuJGJvcmRlci1yYWRpdXMteGw6IDIwcHg7XHJcbiRib3JkZXItcmFkaXVzLXBpbGw6IDk5OTlweDtcclxuJGJvcmRlci1yYWRpdXMtY2lyY2xlOiA1MCU7XHJcblxyXG4vLyBEZXNpZ24gVG9rZW5zIC0gQm94IFNoYWRvd1xyXG4kYm94LXNoYWRvdy1zbTogMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XHJcbiRib3gtc2hhZG93LW1kOiAwIDRweCA2cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMSksIDAgMnB4IDRweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4wNik7XHJcbiRib3gtc2hhZG93LWxnOiAwIDEwcHggMTVweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMCA0cHggNnB4IC0ycHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcclxuJGJveC1zaGFkb3ctY2FyZDogMCAycHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMDQpO1xyXG4kYm94LXNoYWRvdy1jYXJkLWhvdmVyOiAwIDhweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4wOCk7XHJcblxyXG4vLyBBY2NlbnQgQ29sb3JzXHJcbiRzZWNvbmRhcnktb2Zmc2V0LWNvbG9yMTogI2ZmZDY3NDtcclxuJHNlY29uZGFyeS1vZmZzZXQtY29sb3IyOiAjZmZjOTQ3O1xyXG4kc2Vjb25kYXJ5LW9mZnNldC1jb2xvcjM6ICNmZmIzMDA7XHJcblxyXG5cclxuLy8gR3JheXMgJiBCYWNrZ3JvdW5kc1xyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3IxOiAjZmZmZmZmO1xyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3IyOiAjYTRhNGE0OyAvLyBHcmF5IHRleHRcclxuJHByaW1hcnktb2Zmc2V0LWNvbG9yMzogI2YzZjNmMzsgLy8gTGlnaHQgYmFja2dyb3VuZFxyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3I0OiAjZWZlZmVmOyAvLyBDYXJkIGJhY2tncm91bmRcclxuJHByaW1hcnktb2Zmc2V0LWNvbG9yNTogd2hpdGU7XHJcbiRib3JkZXItY29sb3I6ICNlNWU3ZWI7XHJcbiRjYXJkLW9kZDogI2RlZTJlNjtcclxuJGJhY2tncm91bmQtY29sb3I6ICNmM2YzZjM7XHJcbi8vIFRoZW1lIENvbG9ycyAoTWF0Y2hlcyBzdHlsZXMuc2NzcylcclxuJGluZm8tY29sb3I6ICNhNGE0YTQ7XHJcbiR0ZXh0LWRhcms6ICMxYTFhMWE7XHJcbi8vIFRoZW1lIENvbG9yc1xyXG4kcHJpbWFyeS1jb2xvcjogI2U2Mjg0MTtcclxuJHNlY29uZGFyeS1jb2xvcjogIzE1YTI5MjtcclxuJGJhY2tkcm9wLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7XHJcbi8vIFNlbWFudGljIENvbG9ycyAoU3RhbmRhcmRpemVkKVxyXG4kY29sb3Itc3VjY2VzczogIzUyYzQxYTtcclxuJGNvbG9yLXN1Y2Nlc3MtYmc6ICNmNmZmZWQ7XHJcbiRjb2xvci1zdWNjZXNzLWJvcmRlcjogI2I3ZWI4ZjtcclxuXHJcbiRjb2xvci13YXJuaW5nOiAjZmFhZDE0O1xyXG4kY29sb3Itd2FybmluZy1iZzogI2ZmZjdlNjtcclxuJGNvbG9yLXdhcm5pbmctYm9yZGVyOiAjZmZlNThmO1xyXG5cclxuJGNvbG9yLWVycm9yOiAjZmY0ZDRmO1xyXG4kY29sb3ItZXJyb3ItYmc6ICNmZmYxZjA7XHJcbiRjb2xvci1lcnJvci1ib3JkZXI6ICNmZmNjYzc7XHJcblxyXG4kY29sb3ItaW5mbzogIzE4OTBmZjtcclxuJGNvbG9yLWluZm8tYmc6ICNlNmY3ZmY7XHJcbiRjb2xvci1pbmZvLWJvcmRlcjogIzkxZDVmZjtcclxuXHJcbi8vIENTUyBWYXJpYWJsZXMgZm9yIFJ1bnRpbWUgVGhlbWluZ1xyXG46cm9vdCB7XHJcbiAgLS1jb2xvci1wcmltYXJ5OiAjeyRwcmltYXJ5LWNvbG9yMX07XHJcbiAgLS1jb2xvci1zZWNvbmRhcnk6ICN7JHNlY29uZGFyeS1jb2xvcjN9O1xyXG4gIC0tY29sb3ItYmFja2dyb3VuZEdyZXk6ICN7JGJhY2tncm91bmQtY29sb3J9O1xyXG4gIC0tY29sb3ItdGV4dDogI3skdGV4dFByaW1hcnl9O1xyXG59IiwiQHVzZSAnL3NyYy9zdHlsZXMvdGhlbWUvbWl4aW5zJyBhcyBtaXhpbjtcclxuQHVzZSAnL3NyYy9zdHlsZXMvdGhlbWUvdmFyaWFibGUnIGFzIHZhcjtcclxuXHJcbi8vIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxyXG4vLyBQYWdlIENvbnRhaW5lciAobWF0Y2hlcyBvdXRsZXQtcGFnZS1jb250YWluZXIgLyB2ZW5kb3ItcGFnZS1jb250YWluZXIpXHJcbi8vIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxyXG4ub3JkZXJzLXBhZ2UtY29udGFpbmVyIHtcclxuICAgIHBhZGRpbmc6IDEuNXJlbTtcclxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xyXG59XHJcblxyXG4vLyDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcclxuLy8gSGVhZGVyIENhcmQgKG1hdGNoZXMgb3V0bGV0LWhlYWRlci1jYXJkIC8gdmVuZG9yLWhlYWRlci1jYXJkKVxyXG4vLyDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcclxuLm9yZGVycy1oZWFkZXItY2FyZCB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogdmFyLiRib3JkZXItcmFkaXVzLXhsO1xyXG4gICAgcGFkZGluZzogMS41cmVtIDJyZW07XHJcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xyXG4gICAgYm94LXNoYWRvdzogdmFyLiRib3gtc2hhZG93LWNhcmQ7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMDQpO1xyXG5cclxuICAgIC5oZWFkZXItY29udGVudCB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICAgICAgZ2FwOiAxLjVyZW07XHJcblxyXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLnRpdGxlLXNlY3Rpb24ge1xyXG4gICAgICAgIC5wYWdlLXRpdGxlIHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxLjc1cmVtO1xyXG4gICAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICAgICAgICBjb2xvcjogdmFyLiRwcmltYXJ5LWNvbG9yMjtcclxuICAgICAgICAgICAgbWFyZ2luOiAwIDAgMC4yNXJlbSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnBhZ2Utc3VidGl0bGUge1xyXG4gICAgICAgICAgICBjb2xvcjogIzZjNzU3ZDtcclxuICAgICAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDAuOTVyZW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5hY3Rpb25zLXNlY3Rpb24ge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBnYXA6IDFyZW07XHJcbiAgICAgICAgZmxleC13cmFwOiB3cmFwO1xyXG5cclxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblxyXG4gICAgICAgICAgICAuc2VhcmNoLXdyYXBwZXIsXHJcbiAgICAgICAgICAgIC5idG4tcmVmcmVzaCB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gU2VhcmNoIFdyYXBwZXIgKG1hdGNoZXMgb3V0bGV0IC8gdmVuZG9yIHNlYXJjaC13cmFwcGVyKVxyXG4uc2VhcmNoLXdyYXBwZXIge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgbWluLXdpZHRoOiAzMjBweDtcclxuXHJcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAgICAgICBtaW4td2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcblxyXG4gICAgLnNlYXJjaC1pY29uIHtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgbGVmdDogMTJweDtcclxuICAgICAgICB0b3A6IDUwJTtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICAgICAgY29sb3I6ICM5YWEwYTY7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgICAgIHdpZHRoOiAyMHB4O1xyXG4gICAgICAgIGhlaWdodDogMjBweDtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dCB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgcGFkZGluZzogMTJweCAxNnB4IDEycHggNDJweDtcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZTBlMGUwO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhci4kYm9yZGVyLXJhZGl1cy1waWxsO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC45NXJlbTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOWZhO1xyXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XHJcblxyXG4gICAgICAgICY6Zm9jdXMge1xyXG4gICAgICAgICAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICBib3JkZXItY29sb3I6IHZhci4kcHJpbWFyeS1jb2xvcjE7XHJcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDE0LCA3MywgMTgxLCAwLjEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJjo6cGxhY2Vob2xkZXIge1xyXG4gICAgICAgICAgICBjb2xvcjogI2FkYjViZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi5idG4tcmVmcmVzaCB7XHJcbiAgICBib3JkZXItcmFkaXVzOiB2YXIuJGJvcmRlci1yYWRpdXMtcGlsbCAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzogMC41cmVtIDEuNXJlbSAhaW1wb3J0YW50O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMCAhaW1wb3J0YW50O1xyXG4gICAgaGVpZ2h0OiA0OHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMTQsIDczLCAxODEsIDAuMik7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIuJHByaW1hcnktY29sb3IxICFpbXBvcnRhbnQ7XHJcbiAgICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcclxuXHJcbiAgICBtYXQtaWNvbiB7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgc3BpbiB7XHJcbiAgICAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XHJcbiAgICB9XHJcblxyXG4gICAgMTAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgIH1cclxufVxyXG5cclxuLnNwaW4ge1xyXG4gICAgYW5pbWF0aW9uOiBzcGluIDFzIGxpbmVhciBpbmZpbml0ZTtcclxufVxyXG5cclxuLy8gw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXHJcbi8vIENvbnRlbnQgQm9keVxyXG4vLyDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcclxuLmNvbnRlbnQtYm9keSB7XHJcbiAgICBhbmltYXRpb246IGZhZGVJbiAwLjNzIGVhc2U7XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgZmFkZUluIHtcclxuICAgIGZyb20ge1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDhweCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG8ge1xyXG4gICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xyXG4gICAgfVxyXG59XHJcblxyXG4uZmlsdGVyLXdyYXBwZXIge1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xyXG4gICAgYm94LXNoYWRvdzogMCA0cHggMjBweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjA1KTtcclxuICAgIHBhZGRpbmc6IDFyZW0gMS41cmVtO1xyXG59XHJcblxyXG4uZXJyb3ItYmFubmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbiAgICBwYWRkaW5nOiAwLjc1cmVtIDEuMjVyZW07XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIuJGNvbG9yLWVycm9yLWJnO1xyXG4gICAgY29sb3I6IHZhci4kY29sb3ItZXJyb3I7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcclxuXHJcbiAgICBtYXQtaWNvbiB7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgICAgIHdpZHRoOiAyMHB4O1xyXG4gICAgICAgIGhlaWdodDogMjBweDtcclxuICAgIH1cclxufVxyXG5cclxuLy8gw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXHJcbi8vIEZpbHRlciBCdXR0b24gJiBBY3RpdmUgRmlsdGVyIENoaXBzXHJcbi8vIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxyXG4uYnRuLWZpbHRlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjFmNWY5O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2UyZThmMDtcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzO1xyXG5cclxuICAgIG1hdC1pY29uIHtcclxuICAgICAgICBjb2xvcjogIzRmNDZlNTtcclxuICAgIH1cclxuXHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjZWVmMmZmO1xyXG4gICAgICAgIGJvcmRlci1jb2xvcjogI2M3ZDJmZTtcclxuICAgIH1cclxufVxyXG5cclxuLmFjdGl2ZS1maWx0ZXItY2hpcHMge1xyXG4gICAgYW5pbWF0aW9uOiBmYWRlSW4gMC4ycyBlYXNlO1xyXG59XHJcblxyXG4uY2hpcC1zdHJpcCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgZ2FwOiAwLjRyZW07XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uZmlsdGVyLWNoaXAge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiA0cHg7XHJcbiAgICBwYWRkaW5nOiA0cHggMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDk5cHg7XHJcbiAgICBmb250LXNpemU6IDAuNzhyZW07XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgY29sb3I6ICMzNzMwYTM7XHJcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZWVmMmZmLCAjZTBlN2ZmKTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjN2QyZmU7XHJcblxyXG4gICAgbWF0LWljb24ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICB3aWR0aDogMTRweDtcclxuICAgICAgICBoZWlnaHQ6IDE0cHg7XHJcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgIG9wYWNpdHk6IDAuNjtcclxuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnM7XHJcblxyXG4gICAgICAgICY6aG92ZXIge1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLmJ0bi1jbGVhci1hbGwge1xyXG4gICAgYm9yZGVyLXJhZGl1czogdmFyLiRib3JkZXItcmFkaXVzLXBpbGwgIWltcG9ydGFudDtcclxuICAgIGZvbnQtc2l6ZTogMC43NXJlbSAhaW1wb3J0YW50O1xyXG4gICAgaGVpZ2h0OiAyOHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBjb2xvcjogIzY0NzQ4YiAhaW1wb3J0YW50O1xyXG4gICAgYm9yZGVyLWNvbG9yOiAjY2JkNWUxICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOiAwIDEwcHggIWltcG9ydGFudDtcclxuICAgIGxpbmUtaGVpZ2h0OiAyOHB4ICFpbXBvcnRhbnQ7XHJcblxyXG4gICAgbWF0LWljb24ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICB3aWR0aDogMTRweDtcclxuICAgICAgICBoZWlnaHQ6IDE0cHg7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAycHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5jb21wbGV0ZS1idG4ge1xyXG4gICAgY29sb3I6ICMxNmEzNGEgIWltcG9ydGFudDtcclxufVxyXG5cclxuLy8gw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXHJcbi8vIFN0YXRzIEdyaWRcclxuLy8gw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXHJcbi5zdGF0cy1ncmlkIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDIwMHB4LCAxZnIpKTtcclxuICAgIGdhcDogMS4yNXJlbTtcclxufVxyXG5cclxuLnN0YXQtY2FyZCB7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XHJcbiAgICBwYWRkaW5nOiAxLjI1cmVtO1xyXG4gICAgYm94LXNoYWRvdzogMCA0cHggMjBweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjA1KTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcclxuXHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XHJcbiAgICAgICAgYm94LXNoYWRvdzogMCA4cHggMzBweCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xyXG4gICAgfVxyXG5cclxuICAgICYuYWN0aXZlIHtcclxuICAgICAgICBib3JkZXItY29sb3I6IHZhci4kcHJpbWFyeS1jb2xvcjE7XHJcbiAgICAgICAgYmFja2dyb3VuZDogcmdiYSgxNCwgNzMsIDE4MSwgMC4wNCk7XHJcblxyXG4gICAgICAgIC5zdGF0LXZhbHVlIHtcclxuICAgICAgICAgICAgY29sb3I6IHZhci4kcHJpbWFyeS1jb2xvcjE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4uc3RhdC1pY29uIHtcclxuICAgIHdpZHRoOiA0OHB4O1xyXG4gICAgaGVpZ2h0OiA0OHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBmbGV4LXNocmluazogMDtcclxuXHJcbiAgICBtYXQtaWNvbiB7XHJcbiAgICAgICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgICAgIHdpZHRoOiAyNHB4O1xyXG4gICAgICAgIGhlaWdodDogMjRweDtcclxuICAgIH1cclxuXHJcbiAgICAmLndhcm5pbmcge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhci4kY29sb3Itd2FybmluZy1iZztcclxuICAgICAgICBjb2xvcjogdmFyLiRjb2xvci13YXJuaW5nO1xyXG4gICAgfVxyXG5cclxuICAgICYuZXJyb3Ige1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhci4kY29sb3ItZXJyb3ItYmc7XHJcbiAgICAgICAgY29sb3I6IHZhci4kY29sb3ItZXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgJi5wcmltYXJ5IHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIuJGNvbG9yLWluZm8tYmc7XHJcbiAgICAgICAgY29sb3I6IHZhci4kY29sb3ItaW5mbztcclxuICAgIH1cclxuXHJcbiAgICAmLnN1Y2Nlc3Mge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhci4kY29sb3Itc3VjY2Vzcy1iZztcclxuICAgICAgICBjb2xvcjogdmFyLiRjb2xvci1zdWNjZXNzO1xyXG4gICAgfVxyXG59XHJcblxyXG4uc3RhdC1pbmZvIHtcclxuICAgIGZsZXg6IDE7XHJcbiAgICBtaW4td2lkdGg6IDA7XHJcbn1cclxuXHJcbi5zdGF0LXZhbHVlIHtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgIGxpbmUtaGVpZ2h0OiAxLjI7XHJcbiAgICBjb2xvcjogdmFyLiRwcmltYXJ5LWNvbG9yMjtcclxufVxyXG5cclxuLnN0YXQtbGFiZWwge1xyXG4gICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gICAgY29sb3I6ICM3MTgwOTY7XHJcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG59XHJcblxyXG4vLyDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcclxuLy8gVG90YWxzIFN0cmlwXHJcbi8vIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxyXG4udG90YWxzLXN0cmlwIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICBnYXA6IDAuNzVyZW07XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XHJcbn1cclxuXHJcbi50b3RhbC1jaGlwIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZTJlOGYwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICAgIG1pbi13aWR0aDogMTAwcHg7XHJcblxyXG4gICAgLmNoaXAtbGFiZWwge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC43cmVtO1xyXG4gICAgICAgIGNvbG9yOiAjNzE4MDk2O1xyXG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMnB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5jaGlwLXZhbHVlIHtcclxuICAgICAgICBmb250LXNpemU6IDAuOTVyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogdmFyLiRwcmltYXJ5LWNvbG9yMjtcclxuICAgIH1cclxuXHJcbiAgICAmLmhpZ2hsaWdodCB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2VlZjJmZiwgI2UwZTdmZik7XHJcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAjYzdkMmZlO1xyXG5cclxuICAgICAgICAuY2hpcC1sYWJlbCB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjMzczMGEzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmNoaXAtdmFsdWUge1xyXG4gICAgICAgICAgICBjb2xvcjogIzMxMmU4MTtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxyXG4vLyBMb2FkaW5nIFN0YXRlXHJcbi8vIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxyXG4ubG9hZGluZy1zdGF0ZSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDRyZW0gMnJlbTtcclxuICAgIGdhcDogMXJlbTtcclxuXHJcbiAgICBwIHtcclxuICAgICAgICBjb2xvcjogIzcxODA5NjtcclxuICAgICAgICBmb250LXNpemU6IDAuOTVyZW07XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxyXG4vLyBPcmRlciBJdGVtIENhcmQgKG1hdGNoZXMgb3V0bGV0LWl0ZW0tY2FyZCBzdHJ1Y3R1cmUpXHJcbi8vIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxyXG4ub3JkZXItaXRlbS1jYXJkIHtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2UyZThmMDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMS4yNXJlbTtcclxuXHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XHJcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIuJHByaW1hcnktY29sb3IzO1xyXG4gICAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgxNCwgNzMsIDE4MSwgMC4xKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gQ2FyZCBUb3AgKG1hdGNoZXMgb3V0bGV0LWNhcmQgY2FyZC10b3ApXHJcbi5jYXJkLXRvcCB7XHJcbiAgICBwYWRkaW5nOiAxLjI1cmVtO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDFyZW07XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2YxZjFmMTtcclxuICAgIGZsZXgtd3JhcDogd3JhcDtcclxuXHJcbiAgICAub3JkZXItYXZhdGFyIHtcclxuICAgICAgICB3aWR0aDogNTBweDtcclxuICAgICAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2MzY2ZjEgMCUsICM0ZjQ2ZTUgMTAwJSk7XHJcbiAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjFyZW07XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgIGZsZXgtc2hyaW5rOiAwO1xyXG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLm9yZGVyLWlkZW50aXR5IHtcclxuICAgICAgICBmbGV4LWdyb3c6IDE7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbiAgICAgICAgLm9yZGVyLXRpdGxlIHtcclxuICAgICAgICAgICAgbWFyZ2luOiAwIDAgNHB4IDA7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xyXG4gICAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICAgICAgICBjb2xvcjogIzJkMzc0ODtcclxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAub3JkZXItc3ViLWluZm8ge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAgICBnYXA6IDAuNzVyZW07XHJcbiAgICAgICAgICAgIGZsZXgtd3JhcDogd3JhcDtcclxuXHJcbiAgICAgICAgICAgIC50b2tlbi1jaGlwIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgICAgIGdhcDogM3B4O1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2VlZjJmZjtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAjNGY0NmU1O1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogMnB4IDhweDtcclxuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMC43NXJlbTtcclxuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcblxyXG4gICAgICAgICAgICAgICAgbWF0LWljb24ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTNweDtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEzcHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC5kYXRlLXRleHQge1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAwLjgycmVtO1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICM3MTgwOTY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmNhcmQtdG9wLXJpZ2h0IHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgZ2FwOiAwLjc1cmVtO1xyXG4gICAgICAgIGZsZXgtc2hyaW5rOiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC5jYXJkLWFjdGlvbnMge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZ2FwOiA0cHg7XHJcblxyXG4gICAgICAgIGJ1dHRvbiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAzMnB4O1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDMycHg7XHJcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAzMnB4O1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xyXG5cclxuICAgICAgICAgICAgbWF0LWljb24ge1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE4cHg7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4cHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIFN0YXR1cyBCYWRnZSAobWF0Y2hlcyBvdXRsZXQtY2FyZCBzdGF0dXMtYmFkZ2UpXHJcbi5zdGF0dXMtYmFkZ2Uge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiA0cHg7XHJcbiAgICBmb250LXNpemU6IDAuNzVyZW07XHJcbiAgICBwYWRkaW5nOiAzcHggMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG5cclxuICAgIG1hdC1pY29uIHtcclxuICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgd2lkdGg6IDE0cHg7XHJcbiAgICAgICAgaGVpZ2h0OiAxNHB4O1xyXG4gICAgfVxyXG5cclxuICAgICYucGxhY2VkIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIuJGNvbG9yLWluZm8tYmc7XHJcbiAgICAgICAgY29sb3I6IHZhci4kY29sb3ItaW5mbztcclxuICAgIH1cclxuXHJcbiAgICAmLnBheW1lbnRJbnByb2dyZXNzIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIuJGNvbG9yLXdhcm5pbmctYmc7XHJcbiAgICAgICAgY29sb3I6IHZhci4kY29sb3Itd2FybmluZztcclxuICAgIH1cclxuXHJcbiAgICAmLnBheW1lbnRGYWlsZWQge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhci4kY29sb3ItZXJyb3ItYmc7XHJcbiAgICAgICAgY29sb3I6IHZhci4kY29sb3ItZXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgJi5jb21wbGV0ZWQge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhci4kY29sb3Itc3VjY2Vzcy1iZztcclxuICAgICAgICBjb2xvcjogdmFyLiRjb2xvci1zdWNjZXNzO1xyXG4gICAgfVxyXG5cclxuICAgICYuY2FuY2VsbGVkIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjZjNmNGY2O1xyXG4gICAgICAgIGNvbG9yOiAjMzc0MTUxO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcclxuLy8gQ2FyZCBCb2R5IEdyaWQgKFR3byBjb2x1bW5zKVxyXG4vLyDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcclxuLmNhcmQtYm9keS1ncmlkIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG5cclxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA5OTJweCkge1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICB9XHJcbn1cclxuXHJcbi5jYXJkLWJvZHktbGVmdCB7XHJcbiAgICB3aWR0aDogMzQwcHg7XHJcbiAgICBmbGV4LXNocmluazogMDtcclxuICAgIHBhZGRpbmc6IDEuMjVyZW07XHJcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZjFmNWY5O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBnYXA6IDAuNzVyZW07XHJcblxyXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDk5MnB4KSB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiBub25lO1xyXG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjFmNWY5O1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBJbmZvIFJvdyAobWF0Y2hlcyBvdXRsZXQtY2FyZCBpbmZvLXJvdylcclxuLmluZm8tcm93IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgIGdhcDogMC43NXJlbTtcclxuXHJcbiAgICAuaW5mby1pY29uIHtcclxuICAgICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICAgICAgd2lkdGg6IDE4cHg7XHJcbiAgICAgICAgaGVpZ2h0OiAxOHB4O1xyXG4gICAgICAgIGNvbG9yOiAjYTBhZWMwO1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDJweDtcclxuICAgIH1cclxuXHJcbiAgICAuaW5mby1jb250ZW50IHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgZ2FwOiAxcHg7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbiAgICAgICAgLmluZm8tbGFiZWwge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDAuN3JlbTtcclxuICAgICAgICAgICAgY29sb3I6ICM5NGEzYjg7XHJcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICAgICAgICAgIGxldHRlci1zcGFjaW5nOiAwLjNweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5pbmZvLXZhbHVlIHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjMmQzNzQ4O1xyXG5cclxuICAgICAgICAgICAgJi50ZXh0LXRydW5jYXRlIHtcclxuICAgICAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgICAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEJhZGdlIFJvd1xyXG4uYmFkZ2Utcm93IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICBnYXA6IDAuNHJlbTtcclxufVxyXG5cclxuLm9yZy1iYWRnZSxcclxuLmNhZmUtYmFkZ2Uge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiA0cHg7XHJcbiAgICBwYWRkaW5nOiAzcHggOHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gICAgZm9udC1zaXplOiAwLjc1cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuXHJcbiAgICBtYXQtaWNvbiB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgIHdpZHRoOiAxM3B4O1xyXG4gICAgICAgIGhlaWdodDogMTNweDtcclxuICAgIH1cclxufVxyXG5cclxuLm9yZy1iYWRnZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjBmOWZmO1xyXG4gICAgY29sb3I6ICMwMzY5YTE7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYmFlNmZkO1xyXG5cclxuICAgIG1hdC1pY29uIHtcclxuICAgICAgICBjb2xvcjogIzM4YmRmODtcclxuICAgIH1cclxufVxyXG5cclxuLmNhZmUtYmFkZ2Uge1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZlZjNjNywgI2ZkZTY4YSk7XHJcbiAgICBjb2xvcjogIzkyNDAwZTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNmY2QzNGQ7XHJcblxyXG4gICAgbWF0LWljb24ge1xyXG4gICAgICAgIGNvbG9yOiAjZjU5ZTBiO1xyXG4gICAgfVxyXG59XHJcblxyXG4uZmxhZy1iYWRnZSB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDRweDtcclxuICAgIHBhZGRpbmc6IDNweCAxMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogOTlweDtcclxuICAgIGZvbnQtc2l6ZTogMC43M3JlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcblxyXG4gICAgbWF0LWljb24ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgICAgICB3aWR0aDogMTNweDtcclxuICAgICAgICBoZWlnaHQ6IDEzcHg7XHJcbiAgICB9XHJcblxyXG4gICAgJi5wcmVvcmRlciB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogI2ZlZjNjNztcclxuICAgICAgICBjb2xvcjogIzkyNDAwZTtcclxuICAgIH1cclxuXHJcbiAgICAmLmNhYmluIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjZWRlOWZlO1xyXG4gICAgICAgIGNvbG9yOiAjNWIyMWI2O1xyXG4gICAgfVxyXG59XHJcblxyXG4uc3BlY2lhbC1ub3RlIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgIGdhcDogNnB4O1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZmJlYjtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNmZGU2OGE7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBwYWRkaW5nOiA4cHggMTJweDtcclxuICAgIGZvbnQtc2l6ZTogMC44MnJlbTtcclxuICAgIGNvbG9yOiAjOTI0MDBlO1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuNDtcclxuXHJcbiAgICBtYXQtaWNvbiB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICAgIHdpZHRoOiAxNnB4O1xyXG4gICAgICAgIGhlaWdodDogMTZweDtcclxuICAgICAgICBtYXJnaW4tdG9wOiAxcHg7XHJcbiAgICAgICAgZmxleC1zaHJpbms6IDA7XHJcbiAgICAgICAgY29sb3I6ICNkOTc3MDY7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIENhcmQgQm9keSBSaWdodCDDosKAwpQgSXRlbXNcclxuLmNhcmQtYm9keS1yaWdodCB7XHJcbiAgICBmbGV4OiAxO1xyXG4gICAgcGFkZGluZzogMS4yNXJlbTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cclxuICAgIC5zZWN0aW9uLWxhYmVsIHtcclxuICAgICAgICBmb250LXNpemU6IDAuNzhyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgICAgIGNvbG9yOiAjOTRhM2I4O1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDAuNzVyZW07XHJcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcclxuICAgIH1cclxufVxyXG5cclxuLml0ZW1zLXNjcm9sbCB7XHJcbiAgICBtYXgtaGVpZ2h0OiAyMDBweDtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAwLjVyZW07XHJcblxyXG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gICAgICAgIHdpZHRoOiA1cHg7XHJcbiAgICB9XHJcblxyXG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICNmMWY1Zjk7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgfVxyXG5cclxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjY2JkNWUxO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgIH1cclxufVxyXG5cclxuLml0ZW0tcm93IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgcGFkZGluZzogMC42cmVtIDA7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggZGFzaGVkICNlMmU4ZjA7XHJcblxyXG4gICAgJjpsYXN0LWNoaWxkIHtcclxuICAgICAgICBib3JkZXItYm90dG9tOiBub25lO1xyXG4gICAgfVxyXG5cclxuICAgIC5pdGVtLWxlZnQge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBnYXA6IDAuNXJlbTtcclxuICAgICAgICBmbGV4OiAxO1xyXG4gICAgICAgIG1pbi13aWR0aDogMDtcclxuICAgIH1cclxuXHJcbiAgICAudHlwZS1kb3Qge1xyXG4gICAgICAgIHdpZHRoOiAxMHB4O1xyXG4gICAgICAgIGhlaWdodDogMTBweDtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XHJcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQ7XHJcbiAgICAgICAgZmxleC1zaHJpbms6IDA7XHJcblxyXG4gICAgICAgICYudmVnIHtcclxuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiAjMTZhMzRhO1xyXG5cclxuICAgICAgICAgICAgJjo6YWZ0ZXIge1xyXG4gICAgICAgICAgICAgICAgY29udGVudDogJyc7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA0cHg7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDRweDtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICMxNmEzNGE7XHJcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW46IDFweCBhdXRvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLm5vbnZlZyB7XHJcbiAgICAgICAgICAgIGJvcmRlci1jb2xvcjogI2RjMjYyNjtcclxuXHJcbiAgICAgICAgICAgICY6OmFmdGVyIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMDtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMDtcclxuICAgICAgICAgICAgICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICBib3JkZXItcmlnaHQ6IDNweCBzb2xpZCB0cmFuc3BhcmVudDtcclxuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDRweCBzb2xpZCAjZGMyNjI2O1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAxcHggYXV0byAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5pdGVtLXF0eSB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogI2VlZjJmZjtcclxuICAgICAgICBjb2xvcjogIzRmNDZlNTtcclxuICAgICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC43M3JlbTtcclxuICAgICAgICBwYWRkaW5nOiAxcHggN3B4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgICAgICBmbGV4LXNocmluazogMDtcclxuICAgIH1cclxuXHJcbiAgICAuaXRlbS1uYW1lIHtcclxuICAgICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgICAgIGNvbG9yOiAjMmQzNzQ4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICAgIH1cclxuXHJcbiAgICAuaXRlbS1jYXQge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC42OHJlbTtcclxuICAgICAgICBwYWRkaW5nOiAxcHggNnB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjZjFmNWY5O1xyXG4gICAgICAgIGNvbG9yOiAjNjQ3NDhiO1xyXG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgZmxleC1zaHJpbms6IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLml0ZW0tcHJpY2Uge1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgY29sb3I6ICMyZDM3NDg7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgICAgICAgZmxleC1zaHJpbms6IDA7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDAuNzVyZW07XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxyXG4vLyBDYXJkIEZvb3RlciAobWF0Y2hlcyBvdXRsZXQtY2FyZCBjYXJkLWZvb3RlcilcclxuLy8gw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXHJcbi5jYXJkLWZvb3RlciB7XHJcbiAgICBwYWRkaW5nOiAwLjc1cmVtIDEuMjVyZW07XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmYWZjO1xyXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlZGYyZjc7XHJcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMnB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEycHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGdhcDogMC42cmVtO1xyXG59XHJcblxyXG4uZmluLXN0cmlwIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICBnYXA6IDAuNXJlbSAxLjI1cmVtO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG59XHJcblxyXG4uZmluLWNlbGwge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBtaW4td2lkdGg6IDcwcHg7XHJcblxyXG4gICAgLmZpbi1sYWJlbCB7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjY4cmVtO1xyXG4gICAgICAgIGNvbG9yOiAjNzE4MDk2O1xyXG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcclxuICAgICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgfVxyXG5cclxuICAgIC5maW4tdmFsdWUge1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgY29sb3I6IHZhci4kcHJpbWFyeS1jb2xvcjI7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjg4cmVtO1xyXG4gICAgfVxyXG5cclxuICAgICYuZGlzY291bnQgLmZpbi12YWx1ZSB7XHJcbiAgICAgICAgY29sb3I6IHZhci4kY29sb3Itc3VjY2VzcztcclxuICAgIH1cclxuXHJcbiAgICAmLnBhaWQge1xyXG4gICAgICAgIC5maW4tbGFiZWwge1xyXG4gICAgICAgICAgICBjb2xvcjogdmFyLiRwcmltYXJ5LWNvbG9yMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5maW4tdmFsdWUge1xyXG4gICAgICAgICAgICBjb2xvcjogdmFyLiRwcmltYXJ5LWNvbG9yMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgJi5ncmFuZCB7XHJcbiAgICAgICAgcGFkZGluZzogNHB4IDEycHg7XHJcbiAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2VlZjJmZiwgI2UwZTdmZik7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjN2QyZmU7XHJcblxyXG4gICAgICAgIC5maW4tbGFiZWwge1xyXG4gICAgICAgICAgICBjb2xvcjogIzM3MzBhMztcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5maW4tdmFsdWUge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjMzEyZTgxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLm1ldGEtcm93IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICBnYXA6IDAuNHJlbTtcclxufVxyXG5cclxuLm1ldGEtY2hpcCB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDNweDtcclxuICAgIHBhZGRpbmc6IDJweCA4cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZWRmMmY3O1xyXG4gICAgZm9udC1zaXplOiAwLjdyZW07XHJcbiAgICBjb2xvcjogIzRhNTU2ODtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcblxyXG4gICAgbWF0LWljb24ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICB3aWR0aDogMTJweDtcclxuICAgICAgICBoZWlnaHQ6IDEycHg7XHJcbiAgICAgICAgY29sb3I6ICNhMGFlYzA7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxyXG4vLyBFbXB0eSBTdGF0ZSAobWF0Y2hlcyBvdXRsZXQgLyB2ZW5kb3IgZW1wdHktc3RhdGUpXHJcbi8vIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxyXG4uZW1wdHktc3RhdGUge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiA0cmVtIDJyZW07XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IHZhci4kYm9yZGVyLXJhZGl1cy1sZztcclxuICAgIGJvcmRlcjogMXB4IGRhc2hlZCAjY2VkNGRhO1xyXG5cclxuICAgIC5lbXB0eS1pY29uIHtcclxuICAgICAgICBmb250LXNpemU6IDY0cHg7XHJcbiAgICAgICAgd2lkdGg6IDY0cHg7XHJcbiAgICAgICAgaGVpZ2h0OiA2NHB4O1xyXG4gICAgICAgIGNvbG9yOiAjZGVlMmU2O1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICB9XHJcblxyXG4gICAgaDMge1xyXG4gICAgICAgIGNvbG9yOiB2YXIuJHByaW1hcnktY29sb3IyO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIHAge1xyXG4gICAgICAgIGNvbG9yOiAjNmM3NTdkO1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXHJcbi8vIFJlc3BvbnNpdmVcclxuLy8gw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gICAgLm9yZGVycy1wYWdlLWNvbnRhaW5lciB7XHJcbiAgICAgICAgcGFkZGluZzogMXJlbTtcclxuICAgIH1cclxuXHJcbiAgICAub3JkZXJzLWhlYWRlci1jYXJkIHtcclxuICAgICAgICBwYWRkaW5nOiAxcmVtIDEuMjVyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLmNhcmQtdG9wIHtcclxuICAgICAgICBwYWRkaW5nOiAxcmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5jYXJkLWJvZHktbGVmdCxcclxuICAgIC5jYXJkLWJvZHktcmlnaHQge1xyXG4gICAgICAgIHBhZGRpbmc6IDFyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLmNhcmQtZm9vdGVyIHtcclxuICAgICAgICBwYWRkaW5nOiAwLjc1cmVtIDFyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLnN0YXRzLWdyaWQge1xyXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XHJcbiAgICAgICAgZ2FwOiAwLjc1cmVtO1xyXG4gICAgfVxyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcclxuICAgIC5zdGF0cy1ncmlkIHtcclxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcclxuICAgIH1cclxuXHJcbiAgICAuY2FyZC10b3AtcmlnaHQge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 26839:
/*!*****************************************!*\
  !*** ./src/app/orders/orders.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrdersModule: () => (/* binding */ OrdersModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _orders_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./orders-routing.module */ 74146);
/* harmony import */ var _orders_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./orders.component */ 45687);
/* harmony import */ var _order_card_order_card_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../order-card/order-card.module */ 57156);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-outlet-cafe-select/common-outlet-cafe-select.module */ 58481);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../material.module */ 29099);
/* harmony import */ var _common_components_order_filter_dialog_order_filter_dialog_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common-components/order-filter-dialog/order-filter-dialog.module */ 86520);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 61699);









class OrdersModule {
  static #_ = this.ɵfac = function OrdersModule_Factory(t) {
    return new (t || OrdersModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
    type: OrdersModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _orders_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrdersRoutingModule, _order_card_order_card_module__WEBPACK_IMPORTED_MODULE_2__.OrderCardModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_3__.CommonOutletCafeSelectModule, _material_module__WEBPACK_IMPORTED_MODULE_4__.MaterialModule, _common_components_order_filter_dialog_order_filter_dialog_module__WEBPACK_IMPORTED_MODULE_5__.OrderFilterDialogModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](OrdersModule, {
    declarations: [_orders_component__WEBPACK_IMPORTED_MODULE_1__.OrdersComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _orders_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrdersRoutingModule, _order_card_order_card_module__WEBPACK_IMPORTED_MODULE_2__.OrderCardModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_3__.CommonOutletCafeSelectModule, _material_module__WEBPACK_IMPORTED_MODULE_4__.MaterialModule, _common_components_order_filter_dialog_order_filter_dialog_module__WEBPACK_IMPORTED_MODULE_5__.OrderFilterDialogModule]
  });
})();

/***/ }),

/***/ 16324:
/*!****************************************************!*\
  !*** ./src/service/sendDataToComponent.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SendDataToComponent: () => (/* binding */ SendDataToComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 58071);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);


class SendDataToComponent {
  constructor() {
    this.jsonObj = {};
  }
  subscribe(key, callback) {
    if (!this.jsonObj[key]) {
      this.jsonObj[key] = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
      this.jsonObj[key].subscribe(callback);
    }
  }
  publish(key, data) {
    if (this.jsonObj[key] && data) {
      this.jsonObj[key].next(data);
    }
  }
  unsubscribe(key) {
    if (this.jsonObj[key]) {
      this.jsonObj[key].unsubscribe();
      delete this.jsonObj[key];
    }
  }
  static #_ = this.ɵfac = function SendDataToComponent_Factory(t) {
    return new (t || SendDataToComponent)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: SendDataToComponent,
    factory: SendDataToComponent.ɵfac,
    providedIn: 'root'
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
//# sourceMappingURL=src_app_orders_orders_module_ts.js.map