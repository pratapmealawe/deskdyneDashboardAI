"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_deskdyne-components_org-registry_org-registry_module_ts"],{

/***/ 79833:
/*!*********************************************************************************!*\
  !*** ./src/app/deskdyne-components/org-registry/org-registry-routing.module.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgRegistryRoutingModule: () => (/* binding */ OrgRegistryRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _org_registry_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-registry.component */ 22959);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _org_registry_component__WEBPACK_IMPORTED_MODULE_0__.OrgRegistryComponent
}];
class OrgRegistryRoutingModule {
  static #_ = this.ɵfac = function OrgRegistryRoutingModule_Factory(t) {
    return new (t || OrgRegistryRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: OrgRegistryRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](OrgRegistryRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 22959:
/*!****************************************************************************!*\
  !*** ./src/app/deskdyne-components/org-registry/org-registry.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgRegistryComponent: () => (/* binding */ OrgRegistryComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/paginator */ 39687);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var src_service_suggestions_feedback_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/service/suggestions-feedback.service */ 42404);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ 18497);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 86515);










function OrgRegistryComponent_div_10_mat_card_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-card", 10)(1, "div", 11)(2, "div", 12)(3, "mat-card-header")(4, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 14)(7, "mat-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "mat-card-subtitle");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 16)(14, "div", 17)(15, "div", 18)(16, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "Phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div", 18)(21, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](22, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "div", 18)(26, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27, "City");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "div", 18)(31, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](32, "Employee Count");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](34);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()();
  }
  if (rf & 2) {
    const lead_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (lead_r4.name == null ? null : lead_r4.name[0]) || "U", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", lead_r4.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"](" ", lead_r4.designation, " \u2022 ", lead_r4.organizationName, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", lead_r4.status === "review" ? "review" : "acknowledged");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", lead_r4.status === "review" ? "Pending" : "Acknowledged", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](lead_r4.phoneNo);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](lead_r4.emailId);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](lead_r4.city);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](lead_r4.employeeCount);
  }
}
const _c0 = function () {
  return [10, 50, 100, 200, 500];
};
function OrgRegistryComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, OrgRegistryComponent_div_10_mat_card_2_Template, 35, 10, "mat-card", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "mat-paginator", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("page", function OrgRegistryComponent_div_10_Template_mat_paginator_page_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r5.onPageChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.pagedEnquiries);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("length", ctx_r0.enquirylist.length)("pageSize", ctx_r0.pageSize)("pageIndex", ctx_r0.pageIndex)("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](5, _c0));
  }
}
function OrgRegistryComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " No Records Found ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
class OrgRegistryComponent {
  constructor(apiMainService, suggestionsFeedbackService) {
    this.apiMainService = apiMainService;
    this.suggestionsFeedbackService = suggestionsFeedbackService;
    this.enquirylist = [];
    this.pagedEnquiries = [];
    // Paginator options
    this.pageSize = 10;
    this.pageIndex = 0;
    this.pageSizeOptions = [5, 10, 25, 100];
  }
  ngOnInit() {
    this.fetchAllEnquiries();
  }
  fetchAllEnquiries() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const res = yield _this.apiMainService.fetchAllEnquiries();
        if (res && res.length > 0) {
          _this.enquirylist = res;
          _this.updatePagedList();
          const temp = _this.enquirylist.filter(data => data.status == 'review');
          console.log(temp.length);
          _this.suggestionsFeedbackService.updateEnquiries(temp.length);
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }
  updateAllEnquiries() {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const body = {
          status: 'acknowledged'
        };
        const res = yield _this2.apiMainService.updateAllEnquiriesStatus(body);
        _this2.fetchAllEnquiries();
      } catch (error) {
        console.log(error);
      }
    })();
  }
  onPageChange(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePagedList();
  }
  updatePagedList() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedEnquiries = this.enquirylist.slice(startIndex, endIndex);
  }
  static #_ = this.ɵfac = function OrgRegistryComponent_Factory(t) {
    return new (t || OrgRegistryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_service_suggestions_feedback_service__WEBPACK_IMPORTED_MODULE_2__.SuggestionsFeedbackService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: OrgRegistryComponent,
    selectors: [["app-org-registry"]],
    viewQuery: function OrgRegistryComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_4__.MatPaginator, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
      }
    },
    decls: 13,
    vars: 2,
    consts: [[1, "vendor-header"], [1, "m-0", "fw-semibold"], [1, "header-actions"], ["mat-raised-button", "", "color", "primary", 1, "btn-view", 3, "click"], [1, "container-fluid"], [4, "ngIf", "ngIfElse"], ["noRecords", ""], [1, "feedback-list"], ["class", "order-card", 4, "ngFor", "ngForOf"], ["showFirstLastButtons", "", "aria-label", "Select page", 3, "length", "pageSize", "pageIndex", "pageSizeOptions", "page"], [1, "order-card"], [1, "order-card-inner"], [1, "order-left"], ["mat-card-avatar", "", 1, "order-avatar"], [1, "order-header-text"], [1, "status-chip", 3, "ngClass"], [1, "order-right"], [1, "row", "g-2"], [1, "col-6", "col-md-4"], [1, "labelText"], [1, "labelData"], [1, "center", "text-muted", "mt-5"]],
    template: function OrgRegistryComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div")(2, "h4", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "DeskDyne Enquiries");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 2)(5, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function OrgRegistryComponent_Template_button_click_5_listener() {
          return ctx.updateAllEnquiries();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "done_all");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, " Acknowledge All ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, OrgRegistryComponent_div_10_Template, 4, 6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, OrgRegistryComponent_ng_template_11_Template, 2, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.enquirylist && ctx.enquirylist.length > 0)("ngIfElse", _r1);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCardAvatar, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCardSubtitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCardTitle, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_4__.MatPaginator],
    styles: [".vendor-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 1rem;\n  padding: 1rem;\n  background-color: transparent;\n}\n@media (max-width: 768px) {\n  .vendor-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .vendor-header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child {\n    text-align: left;\n    margin-bottom: 0.5rem;\n  }\n  .vendor-header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-child {\n    display: flex;\n    flex-direction: column;\n    gap: 0.75rem;\n    width: 100%;\n  }\n  .vendor-header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-child    > *[_ngcontent-%COMP%] {\n    width: 100%;\n    margin: 0 !important;\n  }\n  .vendor-header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-child   .mat-mdc-form-field[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n\n.feedback-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.order-card[_ngcontent-%COMP%] {\n  display: block;\n  padding: 0;\n  border-radius: 12px;\n}\n\n.order-card-inner[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  gap: 16px;\n  padding: 12px 16px;\n}\n\n.order-left[_ngcontent-%COMP%], .order-right[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.order-left[_ngcontent-%COMP%] {\n  border-right: 1px solid rgba(0, 0, 0, 0.06);\n  padding-right: 12px;\n}\n\n.order-right[_ngcontent-%COMP%] {\n  padding-left: 12px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.order-avatar[_ngcontent-%COMP%] {\n  background-color: #4f46e5;\n  color: #fff;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.order-header-text[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  margin-right: 8px;\n}\n\nmat-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.status-chip[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border-radius: 999px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: capitalize;\n  white-space: nowrap;\n}\n\n.status-chip.review[_ngcontent-%COMP%] {\n  background: #fff1f0;\n  color: #cf1322;\n}\n\n.status-chip.acknowledged[_ngcontent-%COMP%] {\n  background: #ecfdf3;\n  color: #166534;\n}\n\n.labelText[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  margin-bottom: 2px;\n}\n\n.labelData[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #111827;\n  word-break: break-word;\n  font-weight: 500;\n}\n\n@media (max-width: 767px) {\n  .order-card-inner[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .order-left[_ngcontent-%COMP%] {\n    border-right: none;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n    padding-right: 0;\n    padding-bottom: 12px;\n    margin-bottom: 12px;\n  }\n  .order-right[_ngcontent-%COMP%] {\n    padding-left: 0;\n  }\n}\nmat-paginator[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZGVza2R5bmUtY29tcG9uZW50cy9vcmctcmVnaXN0cnkvb3JnLXJlZ2lzdHJ5LmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy4vc3JjL3N0eWxlcy90aGVtZS9fbWl4aW5zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUNpSUUsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxlQUFBO0VBQ0EsU0FBQTtFQUNBLGFBQUE7RURwSUUsNkJBQUE7QUFJSjtBQ2tJRTtFRHhJRjtJQ3lJSSxzQkFBQTtJQUNBLG9CQUFBO0VEL0hGO0VDaUlFO0lBQ0UsZ0JBQUE7SUFDQSxxQkFBQTtFRC9ISjtFQ2tJRTtJQUNFLGFBQUE7SUFDQSxzQkFBQTtJQUNBLFlBQUE7SUFDQSxXQUFBO0VEaElKO0VDa0lJO0lBQ0UsV0FBQTtJQUNBLG9CQUFBO0VEaElOO0VDbUlJO0lBQ0UsV0FBQTtFRGpJTjtBQUNGOztBQXhCQTtFQUNJLGFBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0FBMkJKOztBQXhCQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7QUEyQko7O0FBeEJBO0VBQ0ksY0FBQTtFQUNBLFVBQUE7RUFDQSxtQkFBQTtBQTJCSjs7QUF4QkE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7QUEyQko7O0FBeEJBOztFQUVJLE9BQUE7RUFDQSxZQUFBO0FBMkJKOztBQXhCQTtFQUNJLDJDQUFBO0VBQ0EsbUJBQUE7QUEyQko7O0FBeEJBO0VBQ0ksa0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtBQTJCSjs7QUF4QkE7RUFDSSx5QkFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBMkJKOztBQXhCQTtFQUNJLE9BQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUEyQko7O0FBeEJBO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtBQTJCSjs7QUF4QkE7RUFDSSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsMEJBQUE7RUFDQSxtQkFBQTtBQTJCSjs7QUF4QkE7RUFDSSxtQkFBQTtFQUNBLGNBQUE7QUEyQko7O0FBeEJBO0VBQ0ksbUJBQUE7RUFDQSxjQUFBO0FBMkJKOztBQXhCQTtFQUNJLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7QUEyQko7O0FBeEJBO0VBQ0ksaUJBQUE7RUFDQSxjQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtBQTJCSjs7QUF4QkE7RUFDSTtJQUNJLHNCQUFBO0VBMkJOO0VBeEJFO0lBQ0ksa0JBQUE7SUFDQSw0Q0FBQTtJQUNBLGdCQUFBO0lBQ0Esb0JBQUE7SUFDQSxtQkFBQTtFQTBCTjtFQXZCRTtJQUNJLGVBQUE7RUF5Qk47QUFDRjtBQXRCQTtFQUNJLGdCQUFBO0FBd0JKIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnL3NyYy9zdHlsZXMvdGhlbWUvbWl4aW5zJyBhcyBtaXhpbjtcclxuXHJcbi52ZW5kb3ItaGVhZGVyIHtcclxuICAgIEBpbmNsdWRlIG1peGluLnJlc3BvbnNpdmUtaGVhZGVyO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbi5oZWFkZXItYWN0aW9ucyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5mZWVkYmFjay1saXN0IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgZ2FwOiAxMnB4O1xyXG59XHJcblxyXG4ub3JkZXItY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG59XHJcblxyXG4ub3JkZXItY2FyZC1pbm5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgIGdhcDogMTZweDtcclxuICAgIHBhZGRpbmc6IDEycHggMTZweDtcclxufVxyXG5cclxuLm9yZGVyLWxlZnQsXHJcbi5vcmRlci1yaWdodCB7XHJcbiAgICBmbGV4OiAxO1xyXG4gICAgbWluLXdpZHRoOiAwO1xyXG59XHJcblxyXG4ub3JkZXItbGVmdCB7XHJcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMDYpO1xyXG4gICAgcGFkZGluZy1yaWdodDogMTJweDtcclxufVxyXG5cclxuLm9yZGVyLXJpZ2h0IHtcclxuICAgIHBhZGRpbmctbGVmdDogMTJweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5vcmRlci1hdmF0YXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRmNDZlNTtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5vcmRlci1oZWFkZXItdGV4dCB7XHJcbiAgICBmbGV4OiAxO1xyXG4gICAgbWluLXdpZHRoOiAwOyAvLyBmb3IgdHJ1bmNhdGlvbiBpZiBuZWVkZWRcclxuICAgIG1hcmdpbi1yaWdodDogOHB4O1xyXG59XHJcblxyXG5tYXQtY2FyZC1oZWFkZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDEycHg7XHJcbn1cclxuXHJcbi5zdGF0dXMtY2hpcCB7XHJcbiAgICBwYWRkaW5nOiA0cHggMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xyXG4gICAgZm9udC1zaXplOiAxMXB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxufVxyXG5cclxuLnN0YXR1cy1jaGlwLnJldmlldyB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmMWYwO1xyXG4gICAgY29sb3I6ICNjZjEzMjI7XHJcbn1cclxuXHJcbi5zdGF0dXMtY2hpcC5hY2tub3dsZWRnZWQge1xyXG4gICAgYmFja2dyb3VuZDogI2VjZmRmMztcclxuICAgIGNvbG9yOiAjMTY2NTM0O1xyXG59XHJcblxyXG4ubGFiZWxUZXh0IHtcclxuICAgIGZvbnQtc2l6ZTogMC43NXJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBjb2xvcjogIzZiNzI4MDtcclxuICAgIG1hcmdpbi1ib3R0b206IDJweDtcclxufVxyXG5cclxuLmxhYmVsRGF0YSB7XHJcbiAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgIGNvbG9yOiAjMTExODI3O1xyXG4gICAgd29yZC1icmVhazogYnJlYWstd29yZDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gICAgLm9yZGVyLWNhcmQtaW5uZXIge1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICB9XHJcblxyXG4gICAgLm9yZGVyLWxlZnQge1xyXG4gICAgICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjA2KTtcclxuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwO1xyXG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAxMnB4O1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XHJcbiAgICB9XHJcblxyXG4gICAgLm9yZGVyLXJpZ2h0IHtcclxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1hdC1wYWdpbmF0b3Ige1xyXG4gICAgbWFyZ2luLXRvcDogMTZweDtcclxufSIsIi8vIF9jYXJkLWRlc2lnbi5zY3NzXHJcbkBtaXhpbiBjYXJkLWRlc2lnbigkb2RkLWJnKSB7XHJcbiAgbWFyZ2luOiAxMHB4IDBweDtcclxuICBwYWRkaW5nOiAxOHB4IDI0cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBiYWNrZ3JvdW5kOiAkb2RkLWJnICFpbXBvcnRhbnQ7XHJcbiAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjEpIDBweCA0cHggMTJweDtcclxufVxyXG5cclxuQG1peGluIG1hdC1mb3JtLWZpZWxkLXJlc3BvbnNpdmUoJG1heC1oZWlnaHQ6IDM2cHgsXHJcbiAgJG1hcmdpbi10b3AtaW5maXg6IDZweCxcclxuICAkaW5maXgtbWluLWhlaWdodDogMjRweCwgJGRpc3BsYXk6IG5vbmUpIHtcclxuXHJcbiAgLm1hdC1tZGMtZm9ybS1maWVsZCB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93ICFpbXBvcnRhbnQ7XHJcbiAgICBtYXgtaGVpZ2h0OiAkbWF4LWhlaWdodCAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcbiAgLm1hdC1tZGMtZm9ybS1maWVsZC1oYXMtaWNvbi1zdWZmaXggLm1hdC1tZGMtdGV4dC1maWVsZC13cmFwcGVyIHtcclxuICAgIGhlaWdodDogMzVweDtcclxuICB9XHJcblxyXG4gIC5tYXQtbWRjLWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXIge1xyXG4gICAgZGlzcGxheTogJGRpc3BsYXkgIWltcG9ydGFudDtcclxuICB9XHJcblxyXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA5OTJweCkge1xyXG4gICAgLm1hdC1tZGMtZm9ybS1maWVsZCB7XHJcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZSAhaW1wb3J0YW50O1xyXG4gICAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgICAubWF0LW1kYy1mb3JtLWZpZWxkIHtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbi1yZXZlcnNlICFpbXBvcnRhbnQ7XHJcbiAgICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBAbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcclxuICAgIC5tYXQtbWRjLWZvcm0tZmllbGQge1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2UgIWltcG9ydGFudDtcclxuICAgICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIDo6bmctZGVlcCAubWF0LW1kYy10ZXh0LWZpZWxkLXdyYXBwZXIubWRjLXRleHQtZmllbGQtLW91dGxpbmVkIC5tYXQtbWRjLWZvcm0tZmllbGQtaW5maXgge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIG1hcmdpbi10b3A6ICRtYXJnaW4tdG9wLWluZml4O1xyXG4gICAgcGFkZGluZzogMCAhaW1wb3J0YW50O1xyXG4gICAgbWluLWhlaWdodDogJGluZml4LW1pbi1oZWlnaHQ7XHJcbiAgfVxyXG5cclxuICA6Om5nLWRlZXAgLm1hdC1tZGMtZm9ybS1maWVsZC1mbGV4IHtcclxuICAgIGhlaWdodDogMzdweDtcclxuICB9XHJcblxyXG4gIDo6bmctZGVlcCAubWF0LW1kYy1mb3JtLWZpZWxkLWhhcy1pY29uLXN1ZmZpeCAubWF0LW1kYy10ZXh0LWZpZWxkLXdyYXBwZXIge1xyXG4gICAgcGFkZGluZy1yaWdodDogMCAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcbiAgOjpuZy1kZWVwIC5tZGMtdGV4dC1maWVsZC0tZmlsbGVkOm5vdCgubWRjLXRleHQtZmllbGQtLWRpc2FibGVkKSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcbiAgOjpuZy1kZWVwIC5tYXQtbWRjLWZvcm0tZmllbGQtaGFzLWljb24tc3VmZml4IC5tYXQtbWRjLXRleHQtZmllbGQtd3JhcHBlciB7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xyXG4gICAgaGVpZ2h0OiAzN3B4O1xyXG4gIH1cclxuXHJcbiAgOjpuZy1kZWVwIC5tYXQtbWRjLWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXIge1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgZGlzcGxheTogJGRpc3BsYXk7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gdmVydGljYWwtbGluZSgpIHtcclxuICBib3JkZXItbGVmdC13aWR0aDogdGhpY2s7XHJcbiAgYm9yZGVyLWxlZnQtc3R5bGU6IHNvbGlkO1xyXG4gIGJvcmRlci1sZWZ0LWNvbG9yOiB2YXIoLS1jb2xvci1wcmltYXJ5KTtcclxuICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgcGFkZGluZy1sZWZ0OiAxMnB4O1xyXG59XHJcblxyXG5cclxuQG1peGluIGFjdGl2ZS1tYXQtdGFiKCRiZzogI2ZmZmZmZiwgJHJhZGl1czogOHB4KSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogJGJnICFpbXBvcnRhbnQ7XHJcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogJHJhZGl1cztcclxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogJHJhZGl1cztcclxuICB6LWluZGV4OiAyO1xyXG59XHJcblxyXG5AbWl4aW4gbGFiZWxUZXh0KCkge1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGNvbG9yOiAjNmM3NTdkO1xyXG4gIG1hcmdpbi1ib3R0b206IDJweDtcclxufVxyXG5cclxuQG1peGluIGxhYmVsRGF0YSgpIHtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBjb2xvcjogIzIxMjUyOTtcclxufVxyXG5cclxuQG1peGluIG5vLWFkZHJlc3Mtc3R5bGUoJGJnOiAjZmFmYmZmLFxyXG4gICRib3JkZXItY29sb3I6ICMzZjUxYjUsXHJcbiAgJHRleHQtY29sb3I6ICM0NDQsXHJcbiAgJHNtYWxsLWNvbG9yOiAjNzc3KSB7XHJcbiAgcGFkZGluZzogMTJweCAxNnB4O1xyXG4gIGJhY2tncm91bmQ6ICRiZztcclxuICBib3JkZXI6IDFweCBkYXNoZWQgJGJvcmRlci1jb2xvcjtcclxuICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGNvbG9yOiAkdGV4dC1jb2xvcjtcclxuXHJcbiAgcCB7XHJcbiAgICBtYXJnaW46IDAgMCA0cHggMDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgfVxyXG5cclxuICBzbWFsbCB7XHJcbiAgICBjb2xvcjogJHNtYWxsLWNvbG9yO1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIHJlc3BvbnNpdmUtaGVhZGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxuICBnYXA6IDFyZW07XHJcbiAgcGFkZGluZzogMXJlbTtcclxuXHJcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XHJcblxyXG4gICAgPmRpdjpmaXJzdC1jaGlsZCB7XHJcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcclxuICAgIH1cclxuXHJcbiAgICA+ZGl2Omxhc3QtY2hpbGQge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBnYXA6IDAuNzVyZW07XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG5cclxuICAgICAgPioge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIG1hcmdpbjogMCAhaW1wb3J0YW50O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAubWF0LW1kYy1mb3JtLWZpZWxkIHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuQG1peGluIHJlc3BvbnNpdmUtZmxleC13cmFwcGVyKCRnYXA6IDFyZW0pIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAkZ2FwO1xyXG5cclxuICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHJcbiAgICA+KiB7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 64802:
/*!*************************************************************************!*\
  !*** ./src/app/deskdyne-components/org-registry/org-registry.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgRegistryModule: () => (/* binding */ OrgRegistryModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ 18497);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/chips */ 21757);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/paginator */ 39687);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _org_registry_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-registry-routing.module */ 79833);
/* harmony import */ var _org_registry_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./org-registry.component */ 22959);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);












class OrgRegistryModule {
  static #_ = this.ɵfac = function OrgRegistryModule_Factory(t) {
    return new (t || OrgRegistryModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: OrgRegistryModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _org_registry_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgRegistryRoutingModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__.MatChipsModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__.MatPaginatorModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInputModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](OrgRegistryModule, {
    declarations: [_org_registry_component__WEBPACK_IMPORTED_MODULE_1__.OrgRegistryComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _org_registry_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgRegistryRoutingModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__.MatChipsModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__.MatPaginatorModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInputModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_deskdyne-components_org-registry_org-registry_module_ts.js.map