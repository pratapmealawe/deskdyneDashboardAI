"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["default-src_app_org-components_org-employee-list_org-employee-list_module_ts"],{

/***/ 87297:
/*!**************************************************************************************!*\
  !*** ./src/app/org-components/org-employee-list/org-employee-list-routing.module.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgEmployeeListRoutingModule: () => (/* binding */ OrgEmployeeListRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _org_employee_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-employee-list.component */ 76712);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: "",
  component: _org_employee_list_component__WEBPACK_IMPORTED_MODULE_0__.OrgEmployeeListComponent
}];
class OrgEmployeeListRoutingModule {
  static #_ = this.ɵfac = function OrgEmployeeListRoutingModule_Factory(t) {
    return new (t || OrgEmployeeListRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: OrgEmployeeListRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](OrgEmployeeListRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 76712:
/*!*********************************************************************************!*\
  !*** ./src/app/org-components/org-employee-list/org-employee-list.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgEmployeeListComponent: () => (/* binding */ OrgEmployeeListComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/service/local-storage.service */ 48798);
/* harmony import */ var src_service_search_filter_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/service/search-filter.service */ 43915);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);








function OrgEmployeeListComponent_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 35)(1, "div", 1)(2, "div", 36)(3, "div", 37)(4, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Employee Id");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 37)(9, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Employee Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "div", 37)(14, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "Employee Phone No");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "div", 37)(19, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, "Employee Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "div", 37)(24, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25, "Cafeterion Id");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](28, "div", 37)(29, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](30, "Cafeterion Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](31, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const employee_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](employee_r9 == null ? null : employee_r9.employeeId);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](employee_r9 == null ? null : employee_r9.employeeName);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](employee_r9 == null ? null : employee_r9.employeePhoneNo);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](employee_r9 == null ? null : employee_r9.employeeEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](employee_r9 == null ? null : employee_r9.cafeteria_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](employee_r9 == null ? null : employee_r9.cafeteria_name);
  }
}
function OrgEmployeeListComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, OrgEmployeeListComponent_div_10_div_1_Template, 33, 6, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r0.filteredEmployeeList);
  }
}
function OrgEmployeeListComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " No Records Found ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function OrgEmployeeListComponent_option_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "option", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", option_r10._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", option_r10.organization_name, " ");
  }
}
function OrgEmployeeListComponent_option_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "option", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", option_r11._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", option_r11.cafeteria_name, " ");
  }
}
function OrgEmployeeListComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Employee ID is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function OrgEmployeeListComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Employee Name is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function OrgEmployeeListComponent_div_51_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Employee Email is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function OrgEmployeeListComponent_div_56_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Employee Mobile Number is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
class OrgEmployeeListComponent {
  constructor(fb, apiMainService, localStorageService, searchService) {
    this.fb = fb;
    this.apiMainService = apiMainService;
    this.localStorageService = localStorageService;
    this.searchService = searchService;
    this.employeeList = [];
    this.filteredEmployeeList = [];
    this.employeeObj = {
      cafeteria_id: '',
      cafeteria_name: '',
      employeeEmail: '',
      employeeId: '',
      employeeName: '',
      employeePhoneNo: 0,
      organization_id: '',
      organization_name: ''
    };
    this.orglist = [];
    this.orgDetails = {};
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
    this.initEmployeeForm();
    this.getEmployeeListByOrgId();
    this.getOrgList();
  }
  initEmployeeForm() {
    this.employeeForm = this.fb.group({
      employeeId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required],
      employeeName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required],
      employeeEmail: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.email]],
      employeePhoneNo: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.pattern('^\\d{10}$')]],
      organization_id: [{
        value: '',
        disabled: this.orgAdmin.role === 'ORGADMIN'
      }, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required],
      cafeteria_id: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required]
    });
  }
  saveEmployee() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      console.log(_this.employeeObj);
      console.log(_this.orgDetails);
      let cafedetails = _this.orgDetails.cafeteriaList.find(cafe => {
        return cafe._id == _this.employeeObj.cafeteria_id;
      });
      console.log(cafedetails);
      _this.employeeObj.cafeteria_id = cafedetails.cafeteria_id;
      _this.employeeObj.cafeteria_name = cafedetails.cafeteria_name;
      try {
        let res = yield _this.apiMainService.employeeAdd(_this.employeeObj);
      } catch (error) {
        console.log(error);
      }
    })();
  }
  get f() {
    return this.employeeForm.controls;
  }
  getOrgList() {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        let page = 1;
        let searchObj = {
          countOnly: false
        };
        let data = yield _this2.apiMainService.B2B_fetchFilteredAllOrgs(searchObj, page);
        _this2.orglist = data;
        _this2.setInitialData();
      } catch (error) {
        console.log(error);
      }
    })();
  }
  setInitialData() {
    if (this.orgAdmin.role === 'ORGADMIN') {
      this.employeeObj.organization_id = this.orgAdmin?.orgDetails?._id;
      this.employeeObj.organization_name = this.orgAdmin?.orgDetails?.organization_name;
      this.setOrgDetails();
    }
  }
  setOrgDetails() {
    this.orgDetails = this.orglist.find(org => {
      return org._id == this.employeeObj?.organization_id;
    });
    this.employeeObj.cafeteria_id = '';
  }
  getEmployeeListByOrgId() {
    var _this3 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        let data = yield _this3.apiMainService.getEmployeeListByOrgId(_this3.orgAdmin?.orgDetails?._id);
        _this3.employeeList = data;
        _this3.filteredEmployeeList = data.length === 0 ? [] : data;
      } catch (err) {
        console.error('Error fetching employee:', err);
      }
    })();
  }
  searchFilter(e) {
    const searchText = e.target.value;
    const config = {
      keys: ['employeeId', 'employeeName', 'employeeEmail', 'cafeteria_name']
    };
    this.filteredEmployeeList = this.searchService.searchData(this.employeeList, config, searchText);
  }
  static #_ = this.ɵfac = function OrgEmployeeListComponent_Factory(t) {
    return new (t || OrgEmployeeListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_2__.LocalStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_service_search_filter_service__WEBPACK_IMPORTED_MODULE_3__.SearchFilterService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: OrgEmployeeListComponent,
    selectors: [["app-org-employee-list"]],
    inputs: {
      adminOrg: "adminOrg"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵNgOnChangesFeature"]],
    decls: 59,
    vars: 17,
    consts: [[1, "container"], [1, "row"], [1, "col-md-6"], [1, "col-md-4"], ["type", "text", "placeholder", "Search", "aria-label", "Search Filter", "aria-describedby", "basic-addon2", 1, "form-control", 3, "input"], [1, "col-md-2", "text-md-end"], ["type", "button", "data-bs-toggle", "modal", "data-bs-target", "#staticBackdrop", 1, "btn", "btn-primary"], [4, "ngIf"], ["class", "center", 4, "ngIf"], ["id", "staticBackdrop", "data-bs-backdrop", "static", "data-bs-keyboard", "false", "tabindex", "-1", "aria-labelledby", "staticBackdropLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog", "modal-dialog-centered", "modal-xl"], [1, "modal-content"], [1, "modal-header"], ["id", "staticBackdropLabel", 1, "modal-title", "fs-5"], ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Close", 1, "btn-close"], [1, "modal-body"], ["novalidate", "", 3, "formGroup", "submit"], [1, "container-fluid"], [1, "row", "mb-3"], [1, "col-lg-4"], ["for", "organization", 1, "labelText", "d-block"], ["formControlName", "organization_id", 1, "form-select", 3, "ngModel", "ngModelChange", "change"], ["selected", "", "disabled", "", "value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["for", "cafeteria", 1, "labelText", "d-block"], ["formControlName", "cafeteria_id", 1, "form-select", 3, "disabled", "ngModel", "ngModelChange"], [1, "col-lg-4", "has_"], [1, "labelText"], ["formControlName", "employeeId", "type", "text", "placeholder", "Enter Employee Id", 1, "form-control", 3, "ngModel", "ngModelChange"], ["class", "error-text", 4, "ngIf"], ["formControlName", "employeeName", "type", "text", "placeholder", "Enter Employee Name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["formControlName", "employeeEmail", "type", "email", "placeholder", "Enter Employee Email", 1, "form-control", 3, "ngModel", "ngModelChange"], ["formControlName", "employeePhoneNo", "type", "number", "placeholder", "Enter Employee Mobile Number", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["class", "cardDesign my-1", 4, "ngFor", "ngForOf"], [1, "cardDesign", "my-1"], [1, "d-flex", "flex-column", "flex-md-row", "justify-content-md-between", "align-items-md-center", "w-full"], [1, ""], [1, "labelData"], [1, "center"], [3, "value"], [1, "error-text"]],
    template: function OrgEmployeeListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Employee List");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 3)(6, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("input", function OrgEmployeeListComponent_Template_input_input_6_listener($event) {
          return ctx.searchFilter($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 5)(8, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, " Add Emploee ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, OrgEmployeeListComponent_div_10_Template, 2, 1, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, OrgEmployeeListComponent_div_11_Template, 2, 0, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "div", 9)(13, "div", 10)(14, "div", 11)(15, "div", 12)(16, "h1", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "Add Employee");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](18, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "div", 15)(20, "form", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("submit", function OrgEmployeeListComponent_Template_form_submit_20_listener() {
          return ctx.saveEmployee();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "div", 17)(22, "div", 18)(23, "div", 19)(24, "label", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25, "Organization");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "select", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function OrgEmployeeListComponent_Template_select_ngModelChange_26_listener($event) {
          return ctx.employeeObj.organization_id = $event;
        })("change", function OrgEmployeeListComponent_Template_select_change_26_listener() {
          return ctx.setOrgDetails();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "option", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](28, " Select Organization ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](29, OrgEmployeeListComponent_option_29_Template, 2, 2, "option", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](30, "div", 19)(31, "label", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](32, "Cafeteria");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "select", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function OrgEmployeeListComponent_Template_select_ngModelChange_33_listener($event) {
          return ctx.employeeObj.cafeteria_id = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](34, "option", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](35, "Select Cafeteria");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](36, OrgEmployeeListComponent_option_36_Template, 2, 2, "option", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](37, "div", 26)(38, "label", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](39, "Employee Id");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](40, "input", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function OrgEmployeeListComponent_Template_input_ngModelChange_40_listener($event) {
          return ctx.employeeObj.employeeId = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](41, OrgEmployeeListComponent_div_41_Template, 2, 0, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](42, "div", 19)(43, "label", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](44, "Employee Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](45, "input", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function OrgEmployeeListComponent_Template_input_ngModelChange_45_listener($event) {
          return ctx.employeeObj.employeeName = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](46, OrgEmployeeListComponent_div_46_Template, 2, 0, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](47, "div", 19)(48, "label", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](49, "Employee Email");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](50, "input", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function OrgEmployeeListComponent_Template_input_ngModelChange_50_listener($event) {
          return ctx.employeeObj.employeeEmail = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](51, OrgEmployeeListComponent_div_51_Template, 2, 0, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](52, "div", 19)(53, "label", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](54, "Employee Mobile Number");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](55, "input", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function OrgEmployeeListComponent_Template_input_ngModelChange_55_listener($event) {
          return ctx.employeeObj.employeePhoneNo = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](56, OrgEmployeeListComponent_div_56_Template, 2, 0, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](57, "button", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](58, " Submit ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.filteredEmployeeList.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.filteredEmployeeList.length === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.employeeForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.employeeObj.organization_id);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.orglist);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", !ctx.orgDetails)("ngModel", ctx.employeeObj.cafeteria_id);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.orgDetails == null ? null : ctx.orgDetails.cafeteriaList);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.employeeObj.employeeId);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.f["employeeId"].touched && ctx.f["employeeId"].invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.employeeObj.employeeName);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.f["employeeName"].touched && ctx.f["employeeName"].invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.employeeObj.employeeEmail);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.f["employeeEmail"].touched && ctx.f["employeeEmail"].invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.employeeObj.employeePhoneNo);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.f["employeePhoneNo"].touched && ctx.f["employeePhoneNo"].invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx.employeeForm.invalid);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlName],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 78564:
/*!******************************************************************************!*\
  !*** ./src/app/org-components/org-employee-list/org-employee-list.module.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgEmployeeListModule: () => (/* binding */ OrgEmployeeListModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _org_employee_list_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-employee-list-routing.module */ 87297);
/* harmony import */ var _org_employee_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./org-employee-list.component */ 76712);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);





class OrgEmployeeListModule {
  static #_ = this.ɵfac = function OrgEmployeeListModule_Factory(t) {
    return new (t || OrgEmployeeListModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: OrgEmployeeListModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _org_employee_list_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgEmployeeListRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](OrgEmployeeListModule, {
    declarations: [_org_employee_list_component__WEBPACK_IMPORTED_MODULE_1__.OrgEmployeeListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _org_employee_list_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgEmployeeListRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule],
    exports: [_org_employee_list_component__WEBPACK_IMPORTED_MODULE_1__.OrgEmployeeListComponent]
  });
})();

/***/ })

}]);
//# sourceMappingURL=default-src_app_org-components_org-employee-list_org-employee-list_module_ts.js.map