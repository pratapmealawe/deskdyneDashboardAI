"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["default-src_app_common-outlet-cafe-select_common-outlet-cafe-select_module_ts"],{

/***/ 65646:
/*!***************************************************************************************!*\
  !*** ./src/app/common-outlet-cafe-select/common-outlet-cafe-select-routing.module.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommonOutletCafeSelectRoutingModule: () => (/* binding */ CommonOutletCafeSelectRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);



const routes = [];
class CommonOutletCafeSelectRoutingModule {
  static #_ = this.ɵfac = function CommonOutletCafeSelectRoutingModule_Factory(t) {
    return new (t || CommonOutletCafeSelectRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: CommonOutletCafeSelectRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](CommonOutletCafeSelectRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
})();

/***/ }),

/***/ 60627:
/*!**********************************************************************************!*\
  !*** ./src/app/common-outlet-cafe-select/common-outlet-cafe-select.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommonOutletCafeSelectComponent: () => (/* binding */ CommonOutletCafeSelectComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/datepicker */ 82226);












function CommonOutletCafeSelectComponent_div_1_mat_option_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const o_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", o_r6._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", o_r6.organization_name, " ");
  }
}
function CommonOutletCafeSelectComponent_div_1_mat_hint_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Loading organizations\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function CommonOutletCafeSelectComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 4)(1, "mat-form-field", 5)(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Organization");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-select", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("valueChange", function CommonOutletCafeSelectComponent_div_1_Template_mat_select_valueChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r7.onOrgChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-option", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Select Organization");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, CommonOutletCafeSelectComponent_div_1_mat_option_7_Template, 2, 2, "mat-option", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, CommonOutletCafeSelectComponent_div_1_mat_hint_8_Template, 2, 0, "mat-hint", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r0.config.disableOrg || ctx_r0.loadingOrgs)("value", ctx_r0.selected.orgId);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r0.orglist);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.loadingOrgs);
  }
}
function CommonOutletCafeSelectComponent_div_2_mat_option_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const c_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", c_r10.cafeteria_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", c_r10.cafeteria_name, " ");
  }
}
function CommonOutletCafeSelectComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 4)(1, "mat-form-field", 5)(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Cafeteria");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-select", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("valueChange", function CommonOutletCafeSelectComponent_div_2_Template_mat_select_valueChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r11.onCafeChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-option", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Select Cafeteria");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, CommonOutletCafeSelectComponent_div_2_mat_option_7_Template, 2, 2, "mat-option", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r1.config.disableCafe || !ctx_r1.orgDetails)("value", ctx_r1.selected.cafeId);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r1.cafeList);
  }
}
function CommonOutletCafeSelectComponent_div_3_mat_option_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const o_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", o_r15._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", o_r15.outletName, " ");
  }
}
function CommonOutletCafeSelectComponent_div_3_mat_hint_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Loading outlets\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function CommonOutletCafeSelectComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 4)(1, "mat-form-field", 5)(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Outlet");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-select", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("valueChange", function CommonOutletCafeSelectComponent_div_3_Template_mat_select_valueChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r17);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r16.onOutletChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-option", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Select Outlet");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, CommonOutletCafeSelectComponent_div_3_mat_option_7_Template, 2, 2, "mat-option", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, CommonOutletCafeSelectComponent_div_3_mat_hint_8_Template, 2, 0, "mat-hint", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r2.config.disableOutlet || !ctx_r2.selected.cafeId || ctx_r2.loadingOutlets)("value", ctx_r2.selected.outletId);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.outletList);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r2.loadingOutlets);
  }
}
function CommonOutletCafeSelectComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 4)(1, "form", 11)(2, "mat-form-field", 5)(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Date range");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-date-range-input", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "input", 13)(7, "input", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "mat-datepicker-toggle", 15)(9, "mat-date-range-picker", null, 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](10);
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx_r3.dateForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("rangePicker", _r18)("min", ctx_r3.config.minDate)("max", ctx_r3.config.maxDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("for", _r18);
  }
}
class CommonOutletCafeSelectComponent {
  constructor(api, fb) {
    this.api = api;
    this.config = {
      mode: 'outlet',
      showDateRange: false,
      requireAll: true
    };
    /** Fired on successful submit */
    this.submitted = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    // Dropdown data
    this.orglist = [];
    this.orgDetails = null;
    this.cafeList = [];
    this.outletList = [];
    // Loading flags (for spinners/UX)
    this.loadingOrgs = false;
    this.loadingOutlets = false;
    // Current selections (ids)
    this.selected = {
      orgId: '',
      cafeId: '',
      outletId: ''
    };
    this.dateForm = fb.group({
      dateFrom: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(null),
      dateTo: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(null)
    });
  }
  // ——— Lifecycle ———
  ngOnInit() {
    this.loadOrgs().then(() => this.applyDefaultsIfAny());
  }
  ngOnChanges(changes) {
    if (changes['config'] && !changes['config'].firstChange) {
      // If config changes later, re-apply defaults sensibly
      this.applyDefaultsIfAny();
    }
  }
  // ——— Data Loading ———
  loadOrgs() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this.loadingOrgs = true;
        const page = 1;
        const searchObj = {
          countOnly: false
        };
        _this.orglist = yield _this.api.B2B_fetchFilteredAllOrgs(searchObj, page);
      } catch (err) {
        console.error('Error fetching org list:', err);
        _this.orglist = [];
      } finally {
        _this.loadingOrgs = false;
      }
    })();
  }
  loadCafesForOrg(orgId) {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.orgDetails = _this2.orglist.find(o => o._id === orgId) || null;
      _this2.cafeList = _this2.orgDetails?.cafeteriaList?.length ? _this2.orgDetails.cafeteriaList : [];
    })();
  }
  loadOutletsForCafe() {
    var _this3 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this3.selected.cafeId || !_this3.orgDetails) {
        _this3.outletList = [];
        return;
      }
      const cafeDetails = _this3.cafeList.find(c => c.cafeteria_id === _this3.selected.cafeId);
      if (!cafeDetails || !_this3.orgDetails?.organization_name) {
        _this3.outletList = [];
        return;
      }
      try {
        _this3.loadingOutlets = true;
        const res = yield _this3.api.getOutletByCafeteria(cafeDetails.cafeteria_name, cafeDetails.cafeteria_city, _this3.orgDetails.organization_name);
        _this3.outletList = Array.isArray(res) ? res : [];
      } catch (err) {
        console.error('Error fetching outlet list:', err);
        _this3.outletList = [];
      } finally {
        _this3.loadingOutlets = false;
      }
    })();
  }
  // ——— Cascading selection handlers ———
  onOrgChange(orgId) {
    var _this4 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4.selected.orgId = orgId;
      // Reset lower levels
      _this4.selected.cafeId = '';
      _this4.selected.outletId = '';
      _this4.outletList = [];
      yield _this4.loadCafesForOrg(orgId);
      // If config has defaultCafeId and matches this org, apply it
      if (_this4.config?.defaultCafeId && _this4.cafeList.some(c => c.cafeteria_id === _this4.config.defaultCafeId)) {
        _this4.selected.cafeId = _this4.config.defaultCafeId;
        yield _this4.loadOutletsForCafe();
        if (_this4.config?.defaultOutletId && _this4.outletList.some(o => o._id === _this4.config.defaultOutletId)) {
          _this4.selected.outletId = _this4.config.defaultOutletId;
        }
      }
    })();
  }
  onCafeChange(cafeId) {
    var _this5 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this5.selected.cafeId = cafeId;
      _this5.selected.outletId = '';
      yield _this5.loadOutletsForCafe();
    })();
  }
  onOutletChange(outletId) {
    this.selected.outletId = outletId;
  }
  // ——— Defaults & Config ———
  applyDefaultsIfAny() {
    var _this6 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // Defaults for date-range
      if (_this6.config?.showDateRange) {
        if (_this6.config.minDate) _this6.dateForm.get('dateFrom')?.setValue(_this6.config.minDate);
        if (_this6.config.maxDate) _this6.dateForm.get('dateTo')?.setValue(_this6.config.maxDate);
      }
      // Defaults for org/cafe/outlet
      if (_this6.config?.defaultOrgId && _this6.orglist.some(o => o._id === _this6.config.defaultOrgId)) {
        yield _this6.onOrgChange(_this6.config.defaultOrgId);
      }
      if (!_this6.selected.orgId && _this6.config?.disableOrg && _this6.orglist.length === 1) {
        // If org is locked/disabled and only one org exists, auto-pick it
        yield _this6.onOrgChange(_this6.orglist[0]._id);
      }
      // If config is cafeteria mode and defaultCafeId provided (and org selected already)
      if (_this6.config?.defaultCafeId && _this6.cafeList.some(c => c.cafeteria_id === _this6.config.defaultCafeId)) {
        yield _this6.onCafeChange(_this6.config.defaultCafeId);
      }
      // Outlet default if present & valid
      if (_this6.config?.defaultOutletId && _this6.outletList.some(o => o._id === _this6.config.defaultOutletId)) {
        _this6.onOutletChange(_this6.config.defaultOutletId);
      }
    })();
  }
  // ——— Submit ———
  get canSubmit() {
    if (!this.config?.requireAll) return true;
    if (!this.selected.orgId) return false;
    if (!this.selected.cafeId) return false;
    if (this.config.mode === 'outlet' && !this.selected.outletId) return false;
    return true;
  }
  onSubmit() {
    if (!this.canSubmit) return;
    const org = this.orglist.find(o => o._id === this.selected.orgId);
    const cafe = this.cafeList.find(c => c.cafeteria_id === this.selected.cafeId);
    const outlet = this.outletList.find(o => o._id === this.selected.outletId);
    const dateFrom = this.dateForm.get('dateFrom')?.value || null;
    const dateTo = this.dateForm.get('dateTo')?.value || null;
    const payload = {
      mode: this.config.mode,
      org_id: org?._id,
      org_name: org?.organization_name,
      cafeteria_id: cafe?.cafeteria_id,
      cafeteria_name: cafe?.cafeteria_name,
      cafeteria_city: cafe?.cafeteria_city,
      outlet_id: outlet?._id,
      outlet_name: outlet?.outletName,
      date_from: this.config.showDateRange && dateFrom ? new Date(dateFrom).toISOString() : undefined,
      date_to: this.config.showDateRange && dateTo ? new Date(dateTo).toISOString() : undefined
    };
    this.submitted.emit(payload);
  }
  static #_ = this.ɵfac = function CommonOutletCafeSelectComponent_Factory(t) {
    return new (t || CommonOutletCafeSelectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: CommonOutletCafeSelectComponent,
    selectors: [["app-common-outlet-cafe-select"]],
    inputs: {
      config: "config"
    },
    outputs: {
      submitted: "submitted"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵNgOnChangesFeature"]],
    decls: 8,
    vars: 5,
    consts: [[1, "row", "g-3", "mainContainer"], ["class", "col-12 col-md-3", 4, "ngIf"], [1, "col-12", "d-flex", "justify-content-end"], ["mat-raised-button", "", "color", "primary", 3, "disabled", "click"], [1, "col-12", "col-md-3"], ["appearance", "outline", 1, "w-100"], [3, "disabled", "value", "valueChange"], ["disabled", "", 3, "value"], [3, "value", 4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "value"], [3, "formGroup"], [3, "rangePicker", "min", "max"], ["matStartDate", "", "placeholder", "From", "formControlName", "dateFrom"], ["matEndDate", "", "placeholder", "To", "formControlName", "dateTo"], ["matSuffix", "", 3, "for"], ["picker", ""]],
    template: function CommonOutletCafeSelectComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, CommonOutletCafeSelectComponent_div_1_Template, 9, 5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, CommonOutletCafeSelectComponent_div_2_Template, 8, 4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, CommonOutletCafeSelectComponent_div_3_Template, 9, 5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, CommonOutletCafeSelectComponent_div_4_Template, 11, 5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 2)(6, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CommonOutletCafeSelectComponent_Template_button_click_6_listener() {
          return ctx.onSubmit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, " Submit ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.config.mode === "outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.config.showDateRange);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", !ctx.canSubmit);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatHint, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatSuffix, _angular_material_select__WEBPACK_IMPORTED_MODULE_6__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_7__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__.MatDatepickerToggle, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__.MatDateRangeInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__.MatStartDate, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__.MatEndDate, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__.MatDateRangePicker],
    styles: [".mainContainer .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tbW9uLW91dGxldC1jYWZlLXNlbGVjdC9jb21tb24tb3V0bGV0LWNhZmUtc2VsZWN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiOjpuZy1kZWVwIC5tYWluQ29udGFpbmVyIC5tYXQtbWRjLWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXIge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbi8vIDo6bmctZGVlcCAubWFpbkNvbnRhaW5lciAubWRjLW5vdGNoZWQtb3V0bGluZV9fbGVhZGluZyB7XHJcbi8vICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTJweCAhaW1wb3J0YW50O1xyXG4vLyAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEycHggIWltcG9ydGFudCA7XHJcbi8vIH1cclxuLy8gOjpuZy1kZWVwIC5tYWluQ29udGFpbmVyIC5tZGMtbm90Y2hlZC1vdXRsaW5lX190cmFpbGluZyB7XHJcbi8vICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEycHggIWltcG9ydGFudDtcclxuLy8gICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTJweCAhaW1wb3J0YW50IDtcclxuLy8gfSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 58481:
/*!*******************************************************************************!*\
  !*** ./src/app/common-outlet-cafe-select/common-outlet-cafe-select.module.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommonOutletCafeSelectModule: () => (/* binding */ CommonOutletCafeSelectModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _common_outlet_cafe_select_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common-outlet-cafe-select-routing.module */ 65646);
/* harmony import */ var _common_outlet_cafe_select_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common-outlet-cafe-select.component */ 60627);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/datepicker */ 82226);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);










class CommonOutletCafeSelectModule {
  static #_ = this.ɵfac = function CommonOutletCafeSelectModule_Factory(t) {
    return new (t || CommonOutletCafeSelectModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: CommonOutletCafeSelectModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _common_outlet_cafe_select_routing_module__WEBPACK_IMPORTED_MODULE_0__.CommonOutletCafeSelectRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormFieldModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_6__.MatSelectModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__.MatDatepickerModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__.MatNativeDateModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](CommonOutletCafeSelectModule, {
    declarations: [_common_outlet_cafe_select_component__WEBPACK_IMPORTED_MODULE_1__.CommonOutletCafeSelectComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _common_outlet_cafe_select_routing_module__WEBPACK_IMPORTED_MODULE_0__.CommonOutletCafeSelectRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormFieldModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_6__.MatSelectModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__.MatDatepickerModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__.MatNativeDateModule],
    exports: [_common_outlet_cafe_select_component__WEBPACK_IMPORTED_MODULE_1__.CommonOutletCafeSelectComponent]
  });
})();

/***/ })

}]);
//# sourceMappingURL=default-src_app_common-outlet-cafe-select_common-outlet-cafe-select_module_ts.js.map