(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_common-components_suggessions-feedbacks_suggessions-feedbacks_module_ts"],{

/***/ 59739:
/*!*************************************************************************************************!*\
  !*** ./src/app/common-components/suggessions-feedbacks/suggessions-feedbacks-routing.module.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SuggessionsFeedbacksRoutingModule: () => (/* binding */ SuggessionsFeedbacksRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _suggessions_feedbacks_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./suggessions-feedbacks.component */ 82871);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _suggessions_feedbacks_component__WEBPACK_IMPORTED_MODULE_0__.SuggessionsFeedbacksComponent
}];
class SuggessionsFeedbacksRoutingModule {
  static #_ = this.ɵfac = function SuggessionsFeedbacksRoutingModule_Factory(t) {
    return new (t || SuggessionsFeedbacksRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: SuggessionsFeedbacksRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](SuggessionsFeedbacksRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 82871:
/*!********************************************************************************************!*\
  !*** ./src/app/common-components/suggessions-feedbacks/suggessions-feedbacks.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SuggessionsFeedbacksComponent: () => (/* binding */ SuggessionsFeedbacksComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! exceljs */ 94262);
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(exceljs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! file-saver */ 46778);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var src_service_policy_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/service/policy.service */ 64294);
/* harmony import */ var src_service_suggestions_feedback_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/service/suggestions-feedback.service */ 42404);
/* harmony import */ var src_service_search_filter_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/service/search-filter.service */ 43915);
/* harmony import */ var src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/service/local-storage.service */ 48798);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/paginator */ 39687);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ 28849);



















function SuggessionsFeedbacksComponent_mat_option_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const org_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", org_r4.orgName);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", org_r4.orgName, " ");
  }
}
function SuggessionsFeedbacksComponent_div_24_div_1_div_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 30)(1, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "comment");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 32)(4, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "Comment");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const feedback_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("matTooltip", feedback_r6.feedbackComment);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](feedback_r6.feedbackComment);
  }
}
function SuggessionsFeedbacksComponent_div_24_div_1_button_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SuggessionsFeedbacksComponent_div_24_div_1_button_56_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r15);
      const feedback_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r13.startAcknowledge(feedback_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "mat-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "check_circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, " Acknowledge ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function SuggessionsFeedbacksComponent_div_24_div_1_button_57_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 43)(1, "mat-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "done_all");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, " Resolved ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function SuggessionsFeedbacksComponent_div_24_div_1_div_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 44)(1, "mat-form-field", 45)(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Comment");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "textarea", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function SuggessionsFeedbacksComponent_div_24_div_1_div_58_Template_textarea_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r18);
      const feedback_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](feedback_r6._commentDraft = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 47)(6, "button", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SuggessionsFeedbacksComponent_div_24_div_1_div_58_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r18);
      const feedback_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r19.cancelAcknowledge(feedback_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SuggessionsFeedbacksComponent_div_24_div_1_div_58_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r18);
      const feedback_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r21.saveAcknowledge(feedback_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, "Save");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const feedback_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", feedback_r6._commentDraft);
  }
}
const _c0 = function (a0, a1, a2) {
  return {
    "status-new": a0,
    "status-inprogress": a1,
    "status-resolved": a2
  };
};
function SuggessionsFeedbacksComponent_div_24_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 22)(1, "div", 23)(2, "div", 24)(3, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 26)(6, "h3", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 28)(9, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "div", 29)(13, "div", 30)(14, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](15, "phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "div", 32)(17, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](18, "Phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](21, "div", 30)(22, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](23, "business");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](24, "div", 32)(25, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](26, "Organization");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](27, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](29, "div", 30)(30, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](31, "receipt_long");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](32, "div", 32)(33, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](34, "Order No");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](35, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](37, "div", 30)(38, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](39, "feedback");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](40, "div", 32)(41, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](42, "Type");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](43, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](44);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](45, SuggessionsFeedbacksComponent_div_24_div_1_div_45_Template, 8, 2, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](46, "div", 30)(47, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](48, "calendar_today");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](49, "div", 32)(50, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](51, "Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](52, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](53);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](54, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](55, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](56, SuggessionsFeedbacksComponent_div_24_div_1_button_56_Template, 4, 0, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](57, SuggessionsFeedbacksComponent_div_24_div_1_button_57_Template, 4, 0, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](58, SuggessionsFeedbacksComponent_div_24_div_1_div_58_Template, 10, 1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const feedback_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", (feedback_r6.feedbackFrom_name == null ? null : feedback_r6.feedbackFrom_name.charAt(0)) || "U", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](feedback_r6.feedbackFrom_name || "Unknown User");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction3"](17, _c0, !feedback_r6.acknowledgeStatus || feedback_r6.acknowledgeStatus === "New", feedback_r6.acknowledgeStatus === "InProgress", feedback_r6.acknowledgeStatus === "Resolved"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", feedback_r6.acknowledgeStatus === "Resolved" ? "check_circle" : feedback_r6.acknowledgeStatus === "InProgress" ? "hourglass_empty" : "info", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", feedback_r6.acknowledgeStatus || "New", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](feedback_r6.feedbackFrom_phoneNo || "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](feedback_r6.orgName || "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](feedback_r6.orderNo || "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](feedback_r6.feedbackType || "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", feedback_r6.feedbackComment);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](54, 14, feedback_r6.submitDate, "d/M/yy, h:mm a"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !feedback_r6.acknowledged);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", feedback_r6.acknowledged);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", feedback_r6._isEditing);
  }
}
const _c1 = function () {
  return [10, 50, 100, 200, 500];
};
function SuggessionsFeedbacksComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, SuggessionsFeedbacksComponent_div_24_div_1_Template, 59, 21, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "div", 20)(3, "mat-paginator", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("page", function SuggessionsFeedbacksComponent_div_24_Template_mat_paginator_page_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r25);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r24.onPageChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r1.pagedFeedback);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("length", ctx_r1.filteredFeedback.length)("pageSize", ctx_r1.pageSize)("pageIndex", ctx_r1.pageIndex)("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](5, _c1));
  }
}
function SuggessionsFeedbacksComponent_ng_template_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 50)(1, "mat-icon", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "search_off");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "No Feedback Found");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, "Try adjusting your search or filters.");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
class SuggessionsFeedbacksComponent {
  constructor(ddApiMainService, policyService, suggestionsFeedbackService, searchService, localStorageService) {
    this.ddApiMainService = ddApiMainService;
    this.policyService = policyService;
    this.suggestionsFeedbackService = suggestionsFeedbackService;
    this.searchService = searchService;
    this.localStorageService = localStorageService;
    // Raw list from API
    this.feedbacklist = [];
    // After search/filter
    this.filteredFeedback = [];
    // Current page slice (for Material paginator)
    this.pagedFeedback = [];
    // Material paginator state (frontend-side)
    this.pageIndex = 0;
    this.pageSize = 10;
    this.pageSizeOptions = [10, 20, 30, 50];
    // Single search input text
    this.searchText = '';
    this.orgList = [];
    this.selectedOrg = '';
    this.isLoading = false;
  }
  ngOnInit() {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.admin = this.localStorageService.getCacheData("ADMIN_PROFILE");
    console.log(this.admin);
    this.getFeedbackList();
  }
  // === Load feedback list from API ===
  getFeedbackList() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.isLoading = true;
      try {
        // NOTE:
        // This assumes getGeneralAppFeeback(1) returns all records,
        // or at least enough for this admin view.
        const feedbacklist = yield _this.ddApiMainService.getGeneralAppFeeback(1);
        if (Array.isArray(feedbacklist) && feedbacklist.length > 0) {
          _this.feedbacklist = feedbacklist.map(ele => {
            // derive submitDate from ObjectId timestamp
            ele.submitDate = new Date(parseInt(ele._id.substring(0, 8), 16) * 1000);
            // make sure acknowledgeStatus has a default
            if (!ele.acknowledgeStatus) {
              ele.acknowledgeStatus = ele.acknowledged ? 'Resolved' : 'New';
            }
            return ele;
            return ele;
          });
          _this.extractOrganizations();
          // reset paginator
          _this.pageIndex = 0;
          // apply search (if any) and slice
          _this.applyFilters();
        } else {
          _this.feedbacklist = [];
          _this.filteredFeedback = [];
          _this.pagedFeedback = [];
        }
      } catch (error) {
        console.log('error while fetching feedbacklist ', error);
      } finally {
        _this.isLoading = false;
      }
    })();
  }
  extractOrganizations() {
    const orgs = new Map();
    this.feedbacklist.forEach(item => {
      if (item.orgName && !orgs.has(item.orgName)) {
        orgs.set(item.orgName, {
          orgName: item.orgName
        });
      }
    });
    this.orgList = Array.from(orgs.values());
  }
  // =========================
  // 🔎 Search with SearchService
  // =========================
  // called from (input)="searchFilter($event)"
  searchFilter(e) {
    const searchText = e.target?.value || '';
    this.searchText = searchText;
    this.pageIndex = 0; // go back to first page on new search
    this.applyFilters();
  }
  clearSearch() {
    this.searchText = '';
    this.pageIndex = 0;
    this.applyFilters();
  }
  applyFilters() {
    let temp = [...this.feedbacklist];
    if (this.selectedOrg) {
      temp = temp.filter(item => item.orgName === this.selectedOrg);
    }
    const text = (this.searchText || '').trim();
    if (!text) {
      // no search → full list
      this.filteredFeedback = temp;
    } else {
      // use your generic search service
      const config = {
        keys: ['feedbackFrom_name', 'feedbackFrom_phoneNo', 'orgName', 'feedbackType', 'feedbackComment', 'orderNo']
      };
      this.filteredFeedback = this.searchService.searchData(temp, config, text);
    }
    this.updatePagedFeedback();
  }
  // =========================
  // 📄 Paginator (frontend-side)
  // =========================
  onPageChange(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedFeedback();
  }
  updatePagedFeedback() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedFeedback = this.filteredFeedback.slice(start, end);
  }
  // =========================
  // ✅ Acknowledge with comment + status
  // =========================
  // Start editing acknowledge (show inline form)
  startAcknowledge(feedback) {
    feedback._isEditing = true;
    // default comment draft
    feedback._commentDraft = feedback._commentDraft || '';
    // default status: if New → InProgress, else existing
    feedback._statusDraft = feedback.acknowledgeStatus && feedback.acknowledgeStatus !== 'New' ? feedback.acknowledgeStatus : 'InProgress';
  }
  cancelAcknowledge(feedback) {
    feedback._isEditing = false;
    // optional: clear drafts
    // feedback._commentDraft = '';
    // feedback._statusDraft = '';
  }

  saveAcknowledge(feedback) {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const payload = {
          comment: feedback._commentDraft || '',
          adminUser: {
            _id: _this2.admin?._id || "",
            name: _this2.admin?.name || "Admin",
            phoneNo: _this2.admin?.phoneNo || ""
          }
        };
        yield _this2.ddApiMainService.feedbackacknowledge(feedback._id, payload);
        feedback.acknowledged = true;
        feedback.acknowledgeComment = payload.comment;
        feedback._isEditing = false;
        // Update global count (for header badge etc.)
        _this2.getFeedbackList();
        _this2.suggestionsFeedbackService.getGeneralAppFeebackCount(false);
      } catch (error) {
        console.log('error while acknowledge feedback ', error);
      }
    })();
  }
  excelExport() {
    var _this3 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this3.filteredFeedback || _this3.filteredFeedback.length === 0) {
        return;
      }
      const workbook = new exceljs__WEBPACK_IMPORTED_MODULE_1__.Workbook();
      const worksheet = workbook.addWorksheet('Feedback List');
      worksheet.columns = [{
        header: 'Name',
        key: 'name',
        width: 20
      }, {
        header: 'Phone',
        key: 'phone',
        width: 15
      }, {
        header: 'Organization',
        key: 'orgName',
        width: 20
      }, {
        header: 'Order No',
        key: 'orderNo',
        width: 15
      }, {
        header: 'Feedback Type',
        key: 'feedbackType',
        width: 15
      }, {
        header: 'Comment',
        key: 'comment',
        width: 30
      }, {
        header: 'Status',
        key: 'status',
        width: 15
      }, {
        header: 'Submit Date',
        key: 'submitDate',
        width: 20
      }];
      // Header style
      worksheet.getRow(1).font = {
        bold: true
      };
      worksheet.getRow(1).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      };
      _this3.filteredFeedback.forEach(item => {
        worksheet.addRow({
          name: item.feedbackFrom_name || '-',
          phone: item.feedbackFrom_phoneNo || '-',
          orgName: item.orgName || '-',
          orderNo: item.orderNo || '-',
          feedbackType: item.feedbackType || '-',
          comment: item.feedbackComment || '-',
          status: item.acknowledgeStatus || 'New',
          submitDate: item.submitDate ? new Date(item.submitDate).toLocaleString() : '-'
        });
      });
      const fileName = `feedback_list_${new Date().toISOString().slice(0, 10)}.xlsx`;
      const buffer = yield workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      (0,file_saver__WEBPACK_IMPORTED_MODULE_2__.saveAs)(blob, fileName);
    })();
  }
  static #_ = this.ɵfac = function SuggessionsFeedbacksComponent_Factory(t) {
    return new (t || SuggessionsFeedbacksComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_3__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_service_policy_service__WEBPACK_IMPORTED_MODULE_4__.PolicyService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_service_suggestions_feedback_service__WEBPACK_IMPORTED_MODULE_5__.SuggestionsFeedbackService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_service_search_filter_service__WEBPACK_IMPORTED_MODULE_6__.SearchFilterService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_7__.LocalStorageService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
    type: SuggessionsFeedbacksComponent,
    selectors: [["app-suggessions-feedbacks"]],
    decls: 27,
    vars: 5,
    consts: [[1, "page-container"], [1, "header-card"], [1, "header-content"], [1, "title-section"], [1, "page-title"], [1, "actions-section"], ["appearance", "outline", 1, "org-select"], [3, "ngModel", "ngModelChange", "selectionChange"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "search-wrapper"], [1, "search-icon"], ["type", "text", "placeholder", "Search...", 3, "ngModel", "input"], ["mat-flat-button", "", "color", "primary", 1, "btn-export", 3, "click"], [1, "content-body"], ["class", "row g-4", 4, "ngIf", "ngIfElse"], ["noRecords", ""], [3, "value"], [1, "row", "g-4"], ["class", "col-12 col-md-6 col-lg-4", 4, "ngFor", "ngForOf"], [1, "col-12"], ["showFirstLastButtons", "", 3, "length", "pageSize", "pageIndex", "pageSizeOptions", "page"], [1, "col-12", "col-md-6", "col-lg-4"], [1, "feedback-item-card"], [1, "card-top"], [1, "feedback-avatar"], [1, "feedback-identity"], [1, "feedback-name"], [1, "status-badge", 3, "ngClass"], [1, "card-body"], [1, "info-row"], [1, "info-icon"], [1, "info-content"], [1, "info-label"], [1, "info-value"], ["class", "info-row", 4, "ngIf"], [1, "card-footer-actions"], ["mat-stroked-button", "", "color", "primary", "class", "w-100", 3, "click", 4, "ngIf"], ["mat-flat-button", "", "color", "accent", "disabled", "", "class", "w-100", 4, "ngIf"], ["class", "ack-edit mt-3 w-100", 4, "ngIf"], [1, "info-value", "text-wrap", 3, "matTooltip"], ["mat-stroked-button", "", "color", "primary", 1, "w-100", 3, "click"], [1, "me-1"], ["mat-flat-button", "", "color", "accent", "disabled", "", 1, "w-100"], [1, "ack-edit", "mt-3", "w-100"], ["appearance", "outline", 1, "w-100", "mb-2"], ["matInput", "", "rows", "2", "placeholder", "Response...", 3, "ngModel", "ngModelChange"], [1, "d-flex", "justify-content-end", "gap-2"], ["mat-button", "", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "empty-state"], [1, "empty-icon"]],
    template: function SuggessionsFeedbacksComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "Feedback List");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "div", 5)(7, "mat-form-field", 6)(8, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, "Organization");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "mat-select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function SuggessionsFeedbacksComponent_Template_mat_select_ngModelChange_10_listener($event) {
          return ctx.selectedOrg = $event;
        })("selectionChange", function SuggessionsFeedbacksComponent_Template_mat_select_selectionChange_10_listener() {
          return ctx.applyFilters();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "mat-option", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "All Organizations");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](13, SuggessionsFeedbacksComponent_mat_option_13_Template, 2, 2, "mat-option", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "div", 10)(15, "mat-icon", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](16, "search");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "input", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("input", function SuggessionsFeedbacksComponent_Template_input_input_17_listener($event) {
          return ctx.searchFilter($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SuggessionsFeedbacksComponent_Template_button_click_18_listener() {
          return ctx.excelExport();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](20, "download");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](21, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](22, "Export Excel");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](23, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](24, SuggessionsFeedbacksComponent_div_24_Template, 4, 6, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](25, SuggessionsFeedbacksComponent_ng_template_25_Template, 7, 0, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](26);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx.selectedOrg);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx.orgList);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx.searchText);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.pagedFeedback.length > 0)("ngIfElse", _r2);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInput, _angular_material_select__WEBPACK_IMPORTED_MODULE_14__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__.MatOption, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__.MatPaginator, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__.MatTooltip, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_9__.DatePipe],
    styles: ["\n\n\n\n[_ngcontent-%COMP%]:root {\n  --color-primary: #0E49B5;\n  --color-secondary: #FF3333;\n  --color-backgroundGrey: #f3f3f3;\n  --color-text: #1a1a1a;\n}\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  min-height: 100vh;\n  background-color: #f8f9fa;\n}\n\n.header-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 20px;\n  padding: 1.5rem 2rem;\n  margin-bottom: 2rem;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);\n  border: 1px solid rgba(0, 0, 0, 0.04);\n}\n.header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n}\n@media (max-width: 768px) {\n  .header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n.header-card[_ngcontent-%COMP%]   .title-section[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #192754;\n  margin: 0;\n}\n.header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n@media (max-width: 768px) {\n  .header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-direction: column;\n  }\n  .header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .org-select[_ngcontent-%COMP%], .header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .search-wrapper[_ngcontent-%COMP%], .header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .btn-export[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n\n.search-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  min-width: 300px;\n}\n.search-wrapper[_ngcontent-%COMP%]   .search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9aa0a6;\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.search-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 16px 12px 42px;\n  border: 1px solid #e0e0e0;\n  border-radius: 9999px;\n  font-size: 0.95rem;\n  background-color: #f8f9fa;\n  transition: all 0.3s ease;\n}\n.search-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  background-color: #fff;\n  border-color: #0E49B5;\n  box-shadow: 0 0 0 3px rgba(14, 73, 181, 0.1);\n}\n.search-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #adb5bd;\n}\n\n.org-select[_ngcontent-%COMP%] {\n  min-width: 200px;\n}\n.org-select[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper {\n  background-color: #fff;\n  border-radius: 8px;\n  padding-bottom: 0;\n}\n.org-select[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n\n.btn-export[_ngcontent-%COMP%] {\n  border-radius: 9999px !important;\n  padding: 0.5rem 1.5rem !important;\n  font-weight: 600 !important;\n  height: 48px !important;\n  box-shadow: 0 4px 12px rgba(14, 73, 181, 0.2);\n  background-color: #0E49B5 !important;\n  color: white !important;\n}\n.btn-export[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n\n.feedback-item-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 16px;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);\n  transition: transform 0.2s, box-shadow 0.2s;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  border: 1px solid rgba(0, 0, 0, 0.05);\n}\n.feedback-item-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);\n}\n.feedback-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  border-bottom: 1px solid #f0f0f0;\n  background-color: #fff;\n}\n.feedback-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .feedback-avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #0E49B5 0%, #092c6e 100%);\n  color: #fff;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.2rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  box-shadow: 0 4px 10px rgba(14, 73, 181, 0.3);\n}\n.feedback-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .feedback-identity[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.feedback-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .feedback-identity[_ngcontent-%COMP%]   .feedback-name[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: #192754;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.feedback-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .feedback-identity[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  padding: 4px 10px;\n  border-radius: 20px;\n}\n.feedback-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .feedback-identity[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.feedback-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .feedback-identity[_ngcontent-%COMP%]   .status-badge.status-new[_ngcontent-%COMP%] {\n  background-color: #ebf8ff;\n  color: #3182ce;\n}\n.feedback-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .feedback-identity[_ngcontent-%COMP%]   .status-badge.status-inprogress[_ngcontent-%COMP%] {\n  background-color: #fffaf0;\n  color: #dd6b20;\n}\n.feedback-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .feedback-identity[_ngcontent-%COMP%]   .status-badge.status-resolved[_ngcontent-%COMP%] {\n  background-color: #f0fff4;\n  color: #38a169;\n}\n.feedback-item-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.feedback-item-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n}\n.feedback-item-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: #a0aec0;\n  margin-top: 2px;\n}\n.feedback-item-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.feedback-item-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%]   .info-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: #718096;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  font-weight: 600;\n  margin-bottom: 2px;\n}\n.feedback-item-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%]   .info-value[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: #2d3748;\n  font-weight: 500;\n  word-break: break-word;\n  line-height: 1.4;\n}\n.feedback-item-card[_ngcontent-%COMP%]   .card-footer-actions[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  background-color: #f8f9fa;\n  border-top: 1px solid #f0f0f0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.feedback-item-card[_ngcontent-%COMP%]   .card-footer-actions[_ngcontent-%COMP%]   .ack-edit[_ngcontent-%COMP%] {\n  background: #fff;\n  padding: 1rem;\n  border-radius: 12px;\n  border: 1px solid #e2e8f0;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem 2rem;\n  text-align: center;\n  background: white;\n  border-radius: 12px;\n  border: 1px dashed #ced4da;\n  margin-top: 2rem;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #dee2e6;\n  margin-bottom: 1rem;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #192754;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n  font-size: 1.5rem;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6c757d;\n  margin-bottom: 1.5rem;\n}\n\n  .mat-mdc-paginator {\n  background: transparent;\n  margin-top: 1rem;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGhlbWUvX3ZhcmlhYmxlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2NvbW1vbi1jb21wb25lbnRzL3N1Z2dlc3Npb25zLWZlZWRiYWNrcy9zdWdnZXNzaW9ucy1mZWVkYmFja3MuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OytDQUFBO0FBMEVBO0VBQ0Usd0JBQUE7RUFDQSwwQkFBQTtFQUNBLCtCQUFBO0VBQ0EscUJBQUE7QUN0RUY7O0FBSkE7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFBQTtBQU9GOztBQUpBO0VBQ0UsZ0JBQUE7RUFDQSxtQkRXaUI7RUNWakIsb0JBQUE7RUFDQSxtQkFBQTtFQUNBLDBDRGdCZ0I7RUNmaEIscUNBQUE7QUFPRjtBQUxFO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQU9KO0FBTEk7RUFQRjtJQVFJLHNCQUFBO0lBQ0Esb0JBQUE7RUFRSjtBQUNGO0FBSkk7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0R4Qlc7RUN5QlgsU0FBQTtBQU1OO0FBRkU7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsZUFBQTtBQUlKO0FBRkk7RUFORjtJQU9JLFdBQUE7SUFDQSxzQkFBQTtFQUtKO0VBSEk7OztJQUdFLFdBQUE7RUFLTjtBQUNGOztBQUNBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtBQUVGO0FBQUU7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsMkJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBRUo7QUFDRTtFQUNFLFdBQUE7RUFDQSw0QkFBQTtFQUNBLHlCQUFBO0VBQ0EscUJEdkRpQjtFQ3dEakIsa0JBQUE7RUFDQSx5QkFBQTtFQUNBLHlCQUFBO0FBQ0o7QUFDSTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHFCRDlFVztFQytFWCw0Q0FBQTtBQUNOO0FBRUk7RUFDRSxjQUFBO0FBQU47O0FBS0E7RUFDRSxnQkFBQTtBQUZGO0FBSUU7RUFDRSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFGSjtBQUtFO0VBQ0UsYUFBQTtBQUhKOztBQU9BO0VBQ0UsZ0NBQUE7RUFDQSxpQ0FBQTtFQUNBLDJCQUFBO0VBQ0EsdUJBQUE7RUFDQSw2Q0FBQTtFQUNBLG9DQUFBO0VBQ0EsdUJBQUE7QUFKRjtBQU1FO0VBQ0UsaUJBQUE7QUFKSjs7QUFZQTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQ0RyR2dCO0VDc0doQiwyQ0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtFQUNBLHFDQUFBO0FBVEY7QUFXRTtFQUNFLDJCQUFBO0VBQ0EsMENBQUE7QUFUSjtBQWFFO0VBQ0UsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsZ0NBQUE7RUFDQSxzQkFBQTtBQVhKO0FBYUk7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsNkRBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSw2Q0FBQTtBQVhOO0FBY0k7RUFDRSxPQUFBO0VBQ0EsWUFBQTtBQVpOO0FBY007RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjRHRLUztFQ3VLVCxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFaUjtBQWVNO0VBQ0Usb0JBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtBQWJSO0FBZVE7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFiVjtBQWdCUTtFQUNFLHlCQUFBO0VBQ0EsY0FBQTtBQWRWO0FBaUJRO0VBQ0UseUJBQUE7RUFDQSxjQUFBO0FBZlY7QUFrQlE7RUFDRSx5QkFBQTtFQUNBLGNBQUE7QUFoQlY7QUF1QkU7RUFDRSxnQkFBQTtFQUNBLE9BQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0FBckJKO0FBdUJJO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtBQXJCTjtBQXVCTTtFQUNFLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0FBckJSO0FBd0JNO0VBQ0UsT0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQXRCUjtBQXdCUTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBdEJWO0FBeUJRO0VBQ0Usa0JBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0FBdkJWO0FBOEJFO0VBQ0UsZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLDZCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtBQTVCSjtBQThCSTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSx5Q0FBQTtBQTVCTjs7QUFtQ0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJEN1FpQjtFQzhRakIsMEJBQUE7RUFDQSxnQkFBQTtBQWhDRjtBQWtDRTtFQUNFLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtBQWhDSjtBQW1DRTtFQUNFLGNEclNhO0VDc1NiLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtBQWpDSjtBQW9DRTtFQUNFLGNBQUE7RUFDQSxxQkFBQTtBQWxDSjs7QUF1Q0E7RUFDRSx1QkFBQTtFQUNBLGdCQUFBO0FBcENGIiwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgIEdsb2JhbCBTQ1NTIFZhcmlhYmxlcyAtIEJyYW5kIENvbG9yc1xyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbiR3aGl0ZTogI2ZmZmZmZjtcclxuJGJsYWNrOiAjMDAwMDAwO1xyXG4kdGV4dFByaW1hcnk6ICMxYTFhMWE7XHJcblxyXG4vLyBCcmFuZCBDb2xvcnMgKFJveWFsIEJsdWUgJiBOYXZ5KVxyXG4kcHJpbWFyeS1jb2xvcjE6ICMwRTQ5QjU7IC8vIFJveWFsIEJsdWUgKE1haW4gUHJpbWFyeSlcclxuJHByaW1hcnktY29sb3I6ICRwcmltYXJ5LWNvbG9yMTsgLy8gQWxpYXMgZm9yIGNvbnNpc3RlbmN5XHJcbiRwcmltYXJ5LWNvbG9yMjogIzE5Mjc1NDsgLy8gTmF2eSBCbHVlIChTZWNvbmRhcnkgLyBEYXJrIFByaW1hcnkpXHJcbiRwcmltYXJ5LWNvbG9yMzogIzRiODJlMjsgLy8gTGlnaHRlciBCbHVlIGRlcml2YXRpdmVcclxuXHJcbi8vIEJyYW5kIENvbG9ycyAoQ3JlYW0gJiBSZWQpXHJcbiRzZWNvbmRhcnktY29sb3IxOiAjRjRFQ0M1OyAvLyBTb2Z0IENyZWFtXHJcbiRzZWNvbmRhcnktY29sb3IyOiAjZmZlMGIyOyAvLyBEZXJpdmF0aXZlXHJcbiRzZWNvbmRhcnktY29sb3IzOiAjRkYzMzMzOyAvLyBCcmlnaHQgUmVkIChBY2NlbnQpXHJcblxyXG4vLyBEZXNpZ24gVG9rZW5zIC0gQm9yZGVyIFJhZGl1c1xyXG4kYm9yZGVyLXJhZGl1cy1zbTogNHB4O1xyXG4kYm9yZGVyLXJhZGl1cy1tZDogOHB4O1xyXG4kYm9yZGVyLXJhZGl1cy1sZzogMTJweDtcclxuJGJvcmRlci1yYWRpdXMteGw6IDIwcHg7XHJcbiRib3JkZXItcmFkaXVzLXBpbGw6IDk5OTlweDtcclxuJGJvcmRlci1yYWRpdXMtY2lyY2xlOiA1MCU7XHJcblxyXG4vLyBEZXNpZ24gVG9rZW5zIC0gQm94IFNoYWRvd1xyXG4kYm94LXNoYWRvdy1zbTogMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XHJcbiRib3gtc2hhZG93LW1kOiAwIDRweCA2cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMSksIDAgMnB4IDRweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4wNik7XHJcbiRib3gtc2hhZG93LWxnOiAwIDEwcHggMTVweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMCA0cHggNnB4IC0ycHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcclxuJGJveC1zaGFkb3ctY2FyZDogMCAycHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMDQpO1xyXG4kYm94LXNoYWRvdy1jYXJkLWhvdmVyOiAwIDhweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4wOCk7XHJcblxyXG4vLyBBY2NlbnQgQ29sb3JzXHJcbiRzZWNvbmRhcnktb2Zmc2V0LWNvbG9yMTogI2ZmZDY3NDtcclxuJHNlY29uZGFyeS1vZmZzZXQtY29sb3IyOiAjZmZjOTQ3O1xyXG4kc2Vjb25kYXJ5LW9mZnNldC1jb2xvcjM6ICNmZmIzMDA7XHJcblxyXG5cclxuLy8gR3JheXMgJiBCYWNrZ3JvdW5kc1xyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3IxOiAjZmZmZmZmO1xyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3IyOiAjYTRhNGE0OyAvLyBHcmF5IHRleHRcclxuJHByaW1hcnktb2Zmc2V0LWNvbG9yMzogI2YzZjNmMzsgLy8gTGlnaHQgYmFja2dyb3VuZFxyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3I0OiAjZWZlZmVmOyAvLyBDYXJkIGJhY2tncm91bmRcclxuJHByaW1hcnktb2Zmc2V0LWNvbG9yNTogd2hpdGU7XHJcbiRib3JkZXItY29sb3I6ICNlNWU3ZWI7XHJcbiRjYXJkLW9kZDogI2RlZTJlNjtcclxuJGJhY2tncm91bmQtY29sb3I6ICNmM2YzZjM7XHJcbi8vIFRoZW1lIENvbG9ycyAoTWF0Y2hlcyBzdHlsZXMuc2NzcylcclxuJGluZm8tY29sb3I6ICNhNGE0YTQ7XHJcbiR0ZXh0LWRhcms6ICMxYTFhMWE7XHJcbi8vIFRoZW1lIENvbG9yc1xyXG4kcHJpbWFyeS1jb2xvcjogI2U2Mjg0MTtcclxuJHNlY29uZGFyeS1jb2xvcjogIzE1YTI5MjtcclxuJGJhY2tkcm9wLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7XHJcbi8vIFNlbWFudGljIENvbG9ycyAoU3RhbmRhcmRpemVkKVxyXG4kY29sb3Itc3VjY2VzczogIzUyYzQxYTtcclxuJGNvbG9yLXN1Y2Nlc3MtYmc6ICNmNmZmZWQ7XHJcbiRjb2xvci1zdWNjZXNzLWJvcmRlcjogI2I3ZWI4ZjtcclxuXHJcbiRjb2xvci13YXJuaW5nOiAjZmFhZDE0O1xyXG4kY29sb3Itd2FybmluZy1iZzogI2ZmZjdlNjtcclxuJGNvbG9yLXdhcm5pbmctYm9yZGVyOiAjZmZlNThmO1xyXG5cclxuJGNvbG9yLWVycm9yOiAjZmY0ZDRmO1xyXG4kY29sb3ItZXJyb3ItYmc6ICNmZmYxZjA7XHJcbiRjb2xvci1lcnJvci1ib3JkZXI6ICNmZmNjYzc7XHJcblxyXG4kY29sb3ItaW5mbzogIzE4OTBmZjtcclxuJGNvbG9yLWluZm8tYmc6ICNlNmY3ZmY7XHJcbiRjb2xvci1pbmZvLWJvcmRlcjogIzkxZDVmZjtcclxuXHJcbi8vIENTUyBWYXJpYWJsZXMgZm9yIFJ1bnRpbWUgVGhlbWluZ1xyXG46cm9vdCB7XHJcbiAgLS1jb2xvci1wcmltYXJ5OiAjeyRwcmltYXJ5LWNvbG9yMX07XHJcbiAgLS1jb2xvci1zZWNvbmRhcnk6ICN7JHNlY29uZGFyeS1jb2xvcjN9O1xyXG4gIC0tY29sb3ItYmFja2dyb3VuZEdyZXk6ICN7JGJhY2tncm91bmQtY29sb3J9O1xyXG4gIC0tY29sb3ItdGV4dDogI3skdGV4dFByaW1hcnl9O1xyXG59IiwiQHVzZSAnL3NyYy9zdHlsZXMvdGhlbWUvbWl4aW5zJyBhcyBtaXhpbjtcclxuQHVzZSAnL3NyYy9zdHlsZXMvdGhlbWUvdmFyaWFibGUnIGFzIHZhcjtcclxuXHJcbi8vIC0tLSBQYWdlIExheW91dCAtLS1cclxuLnBhZ2UtY29udGFpbmVyIHtcclxuICBwYWRkaW5nOiAxLjVyZW07XHJcbiAgbWluLWhlaWdodDogMTAwdmg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTsgLy8gRW5zdXJlIGJhY2tncm91bmQgaXMgbGlnaHQgZ3JheSBsaWtlIGRhc2hib2FyZFxyXG59XHJcblxyXG4uaGVhZGVyLWNhcmQge1xyXG4gIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgYm9yZGVyLXJhZGl1czogdmFyLiRib3JkZXItcmFkaXVzLXhsO1xyXG4gIHBhZGRpbmc6IDEuNXJlbSAycmVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDJyZW07XHJcbiAgYm94LXNoYWRvdzogdmFyLiRib3gtc2hhZG93LWNhcmQ7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjA0KTtcclxuXHJcbiAgLmhlYWRlci1jb250ZW50IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgZ2FwOiAxLjVyZW07XHJcblxyXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLnRpdGxlLXNlY3Rpb24ge1xyXG4gICAgLnBhZ2UtdGl0bGUge1xyXG4gICAgICBmb250LXNpemU6IDEuNzVyZW07XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICAgIGNvbG9yOiB2YXIuJHByaW1hcnktY29sb3IyO1xyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYWN0aW9ucy1zZWN0aW9uIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG5cclxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHJcbiAgICAgIC5vcmctc2VsZWN0LFxyXG4gICAgICAuc2VhcmNoLXdyYXBwZXIsXHJcbiAgICAgIC5idG4tZXhwb3J0IHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gLS0tIFNlYXJjaCAmIEZpbHRlcnMgLS0tXHJcbi5zZWFyY2gtd3JhcHBlciB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG1pbi13aWR0aDogMzAwcHg7XHJcblxyXG4gIC5zZWFyY2gtaWNvbiB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBsZWZ0OiAxMnB4O1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICBjb2xvcjogIzlhYTBhNjtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIHdpZHRoOiAyMHB4O1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gIH1cclxuXHJcbiAgaW5wdXQge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBwYWRkaW5nOiAxMnB4IDE2cHggMTJweCA0MnB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2UwZTBlMDtcclxuICAgIGJvcmRlci1yYWRpdXM6IHZhci4kYm9yZGVyLXJhZGl1cy1waWxsO1xyXG4gICAgZm9udC1zaXplOiAwLjk1cmVtO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XHJcblxyXG4gICAgJjpmb2N1cyB7XHJcbiAgICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyLiRwcmltYXJ5LWNvbG9yMTtcclxuICAgICAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEodmFyLiRwcmltYXJ5LWNvbG9yMSwgMC4xKTtcclxuICAgIH1cclxuXHJcbiAgICAmOjpwbGFjZWhvbGRlciB7XHJcbiAgICAgIGNvbG9yOiAjYWRiNWJkO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLm9yZy1zZWxlY3Qge1xyXG4gIG1pbi13aWR0aDogMjAwcHg7XHJcblxyXG4gIDo6bmctZGVlcCAubWF0LW1kYy10ZXh0LWZpZWxkLXdyYXBwZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAwO1xyXG4gIH1cclxuXHJcbiAgOjpuZy1kZWVwIC5tYXQtbWRjLWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXIge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbn1cclxuXHJcbi5idG4tZXhwb3J0IHtcclxuICBib3JkZXItcmFkaXVzOiB2YXIuJGJvcmRlci1yYWRpdXMtcGlsbCAhaW1wb3J0YW50O1xyXG4gIHBhZGRpbmc6IDAuNXJlbSAxLjVyZW0gIWltcG9ydGFudDtcclxuICBmb250LXdlaWdodDogNjAwICFpbXBvcnRhbnQ7XHJcbiAgaGVpZ2h0OiA0OHB4ICFpbXBvcnRhbnQ7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKHZhci4kcHJpbWFyeS1jb2xvcjEsIDAuMik7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyLiRwcmltYXJ5LWNvbG9yMSAhaW1wb3J0YW50O1xyXG4gIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG5cclxuICBtYXQtaWNvbiB7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcclxuICB9XHJcbn1cclxuXHJcblxyXG4vLyAtLS0gQ29udGVudCBCb2R5ICYgQ2FyZHMgLS0tXHJcbi8vIEdyaWQgbGF5b3V0IGhhbmRsZWQgYnkgYm9vdHN0cmFwIGNsYXNzZXMgaW4gSFRNTCAoLnJvdylcclxuXHJcbi5mZWVkYmFjay1pdGVtLWNhcmQge1xyXG4gIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgYm9yZGVyLXJhZGl1czogMTZweDsgLy8gU2xpZ2h0bHkgcm91bmRlclxyXG4gIGJveC1zaGFkb3c6IHZhci4kYm94LXNoYWRvdy1jYXJkO1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzLCBib3gtc2hhZG93IDAuMnM7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4wNSk7XHJcblxyXG4gICY6aG92ZXIge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC00cHgpO1xyXG4gICAgYm94LXNoYWRvdzogMCAxMnB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2FyZCBUb3BcclxuICAuY2FyZC10b3Age1xyXG4gICAgcGFkZGluZzogMS4yNXJlbTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYwZjA7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG5cclxuICAgIC5mZWVkYmFjay1hdmF0YXIge1xyXG4gICAgICB3aWR0aDogNDhweDtcclxuICAgICAgaGVpZ2h0OiA0OHB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHZhci4kcHJpbWFyeS1jb2xvcjEgMCUsIGRhcmtlbih2YXIuJHByaW1hcnktY29sb3IxLCAxNSUpIDEwMCUpO1xyXG4gICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xyXG4gICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgICBib3gtc2hhZG93OiAwIDRweCAxMHB4IHJnYmEodmFyLiRwcmltYXJ5LWNvbG9yMSwgMC4zKTtcclxuICAgIH1cclxuXHJcbiAgICAuZmVlZGJhY2staWRlbnRpdHkge1xyXG4gICAgICBmbGV4OiAxO1xyXG4gICAgICBtaW4td2lkdGg6IDA7XHJcblxyXG4gICAgICAuZmVlZGJhY2stbmFtZSB7XHJcbiAgICAgICAgbWFyZ2luOiAwIDAgNHB4IDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjA1cmVtO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICAgICAgY29sb3I6IHZhci4kcHJpbWFyeS1jb2xvcjI7XHJcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuc3RhdHVzLWJhZGdlIHtcclxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIGdhcDogNHB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC43NXJlbTtcclxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgIHBhZGRpbmc6IDRweCAxMHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcblxyXG4gICAgICAgIG1hdC1pY29uIHtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICAgIHdpZHRoOiAxNHB4O1xyXG4gICAgICAgICAgaGVpZ2h0OiAxNHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5zdGF0dXMtbmV3IHtcclxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlYmY4ZmY7IC8vIExpZ2h0IEJsdWVcclxuICAgICAgICAgIGNvbG9yOiAjMzE4MmNlOyAvLyBCbHVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLnN0YXR1cy1pbnByb2dyZXNzIHtcclxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZhZjA7IC8vIExpZ2h0IE9yYW5nZVxyXG4gICAgICAgICAgY29sb3I6ICNkZDZiMjA7IC8vIE9yYW5nZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5zdGF0dXMtcmVzb2x2ZWQge1xyXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZmZmNDsgLy8gTGlnaHQgR3JlZW5cclxuICAgICAgICAgIGNvbG9yOiAjMzhhMTY5OyAvLyBHcmVlblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQ2FyZCBCb2R5XHJcbiAgLmNhcmQtYm9keSB7XHJcbiAgICBwYWRkaW5nOiAxLjI1cmVtO1xyXG4gICAgZmxleDogMTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG5cclxuICAgIC5pbmZvLXJvdyB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgICBnYXA6IDAuNzVyZW07XHJcblxyXG4gICAgICAuaW5mby1pY29uIHtcclxuICAgICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICAgICAgd2lkdGg6IDE4cHg7XHJcbiAgICAgICAgaGVpZ2h0OiAxOHB4O1xyXG4gICAgICAgIGNvbG9yOiAjYTBhZWMwO1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDJweDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLmluZm8tY29udGVudCB7XHJcbiAgICAgICAgZmxleDogMTtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblxyXG4gICAgICAgIC5pbmZvLWxhYmVsIHtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMC43cmVtO1xyXG4gICAgICAgICAgY29sb3I6ICM3MTgwOTY7XHJcbiAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xyXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDJweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5pbmZvLXZhbHVlIHtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMC45NXJlbTtcclxuICAgICAgICAgIGNvbG9yOiAjMmQzNzQ4O1xyXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgICAgIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XHJcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS40O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQ2FyZCBGb290ZXJcclxuICAuY2FyZC1mb290ZXItYWN0aW9ucyB7XHJcbiAgICBwYWRkaW5nOiAxLjI1cmVtO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtcclxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjBmMGYwO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBnYXA6IDAuNzVyZW07XHJcblxyXG4gICAgLmFjay1lZGl0IHtcclxuICAgICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgICAgcGFkZGluZzogMXJlbTtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2UyZThmMDtcclxuICAgICAgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4wMik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLy8gLS0tIEVtcHR5IFN0YXRlIC0tLVxyXG4uZW1wdHktc3RhdGUge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDRyZW0gMnJlbTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogdmFyLiRib3JkZXItcmFkaXVzLWxnO1xyXG4gIGJvcmRlcjogMXB4IGRhc2hlZCAjY2VkNGRhO1xyXG4gIG1hcmdpbi10b3A6IDJyZW07XHJcblxyXG4gIC5lbXB0eS1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogNjRweDtcclxuICAgIHdpZHRoOiA2NHB4O1xyXG4gICAgaGVpZ2h0OiA2NHB4O1xyXG4gICAgY29sb3I6ICNkZWUyZTY7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gIH1cclxuXHJcbiAgaDMge1xyXG4gICAgY29sb3I6IHZhci4kcHJpbWFyeS1jb2xvcjI7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xyXG4gICAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgfVxyXG5cclxuICBwIHtcclxuICAgIGNvbG9yOiAjNmM3NTdkO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xyXG4gIH1cclxufVxyXG5cclxuLy8gUGFnaW5hdG9yIG92ZXJyaWRlXHJcbjo6bmctZGVlcCAubWF0LW1kYy1wYWdpbmF0b3Ige1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIG1hcmdpbi10b3A6IDFyZW07XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 22215:
/*!*****************************************************************************************!*\
  !*** ./src/app/common-components/suggessions-feedbacks/suggessions-feedbacks.module.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SuggessionsFeedbacksModule: () => (/* binding */ SuggessionsFeedbacksModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _suggessions_feedbacks_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./suggessions-feedbacks-routing.module */ 59739);
/* harmony import */ var _suggessions_feedbacks_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./suggessions-feedbacks.component */ 82871);
/* harmony import */ var src_app_material_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/material.module */ 29099);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);





class SuggessionsFeedbacksModule {
  static #_ = this.ɵfac = function SuggessionsFeedbacksModule_Factory(t) {
    return new (t || SuggessionsFeedbacksModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: SuggessionsFeedbacksModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _suggessions_feedbacks_routing_module__WEBPACK_IMPORTED_MODULE_0__.SuggessionsFeedbacksRoutingModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_2__.MaterialModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](SuggessionsFeedbacksModule, {
    declarations: [_suggessions_feedbacks_component__WEBPACK_IMPORTED_MODULE_1__.SuggessionsFeedbacksComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _suggessions_feedbacks_routing_module__WEBPACK_IMPORTED_MODULE_0__.SuggessionsFeedbacksRoutingModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_2__.MaterialModule]
  });
})();

/***/ }),

/***/ 43915:
/*!**********************************************!*\
  !*** ./src/service/search-filter.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchFilterService: () => (/* binding */ SearchFilterService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

class SearchFilterService {
  constructor() {}
  /**
   * Filters data based on the search text and config object
   * @param data The data to be searched through
   * @param config Config object containing keys for filtering
   * @param searchText The search string to match
   * @returns Filtered data array
   */
  searchData(data, config, searchText) {
    const lowercasedSearchText = searchText.toLowerCase();
    return data.filter(item => {
      return config.keys.some(key => {
        if (key.includes('.')) {
          // Handle nested properties (e.g., 'outletList.outletName')
          return this.searchInNestedObject(item, key, lowercasedSearchText);
        } else {
          return item[key]?.toString().toLowerCase().includes(lowercasedSearchText);
        }
      });
    });
  }
  /**
   * Handles searching in nested objects
   * @param obj The object to search within
   * @param key The key (including nested keys) to search for
   * @param searchText The search string
   * @returns True if a match is found
   */
  searchInNestedObject(obj, key, searchText) {
    const keys = key.split('.');
    let value = obj;
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      value = value[k];
      if (!value) {
        return false;
      }
      // If the value is an array and we have more keys to process
      if (Array.isArray(value) && i < keys.length - 1) {
        const remainingKeys = keys.slice(i + 1).join('.');
        // Search through each item in the array
        return value.some(item => this.searchInNestedObject(item, remainingKeys, searchText));
      }
      // If the value is an array at the last key, check each item
      if (Array.isArray(value) && i === keys.length - 1) {
        return value.some(item => item?.toString().toLowerCase().includes(searchText));
      }
    }
    return value.toString().toLowerCase().includes(searchText);
  }
  static #_ = this.ɵfac = function SearchFilterService_Factory(t) {
    return new (t || SearchFilterService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: SearchFilterService,
    factory: SearchFilterService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 46778:
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (a, b) {
  if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}
})(this, function () {
  "use strict";

  function b(a, b) {
    return "undefined" == typeof b ? b = {
      autoBom: !1
    } : "object" != typeof b && (console.warn("Deprecated: Expected third argument to be a object"), b = {
      autoBom: !b
    }), b.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob(["\uFEFF", a], {
      type: a.type
    }) : a;
  }
  function c(a, b, c) {
    var d = new XMLHttpRequest();
    d.open("GET", a), d.responseType = "blob", d.onload = function () {
      g(d.response, b, c);
    }, d.onerror = function () {
      console.error("could not download file");
    }, d.send();
  }
  function d(a) {
    var b = new XMLHttpRequest();
    b.open("HEAD", a, !1);
    try {
      b.send();
    } catch (a) {}
    return 200 <= b.status && 299 >= b.status;
  }
  function e(a) {
    try {
      a.dispatchEvent(new MouseEvent("click"));
    } catch (c) {
      var b = document.createEvent("MouseEvents");
      b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), a.dispatchEvent(b);
    }
  }
  var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof global && global.global === global ? global : void 0,
    a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent),
    g = f.saveAs || ("object" != typeof window || window !== f ? function () {} : "download" in HTMLAnchorElement.prototype && !a ? function (b, g, h) {
      var i = f.URL || f.webkitURL,
        j = document.createElement("a");
      g = g || b.name || "download", j.download = g, j.rel = "noopener", "string" == typeof b ? (j.href = b, j.origin === location.origin ? e(j) : d(j.href) ? c(b, g, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b), setTimeout(function () {
        i.revokeObjectURL(j.href);
      }, 4E4), setTimeout(function () {
        e(j);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function (f, g, h) {
      if (g = g || f.name || "download", "string" != typeof f) navigator.msSaveOrOpenBlob(b(f, h), g);else if (d(f)) c(f, g, h);else {
        var i = document.createElement("a");
        i.href = f, i.target = "_blank", setTimeout(function () {
          e(i);
        });
      }
    } : function (b, d, e, g) {
      if (g = g || open("", "_blank"), g && (g.document.title = g.document.body.innerText = "downloading..."), "string" == typeof b) return c(b, d, e);
      var h = "application/octet-stream" === b.type,
        i = /constructor/i.test(f.HTMLElement) || f.safari,
        j = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((j || h && i || a) && "undefined" != typeof FileReader) {
        var k = new FileReader();
        k.onloadend = function () {
          var a = k.result;
          a = j ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), g ? g.location.href = a : location = a, g = null;
        }, k.readAsDataURL(b);
      } else {
        var l = f.URL || f.webkitURL,
          m = l.createObjectURL(b);
        g ? g.location = m : location.href = m, g = null, setTimeout(function () {
          l.revokeObjectURL(m);
        }, 4E4);
      }
    });
  f.saveAs = g.saveAs = g,  true && (module.exports = g);
});

/***/ })

}]);
//# sourceMappingURL=src_app_common-components_suggessions-feedbacks_suggessions-feedbacks_module_ts.js.map