(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_consumption-order-details_consumption-order-details_module_ts"],{

/***/ 44550:
/*!**************************************************************************************************!*\
  !*** ./src/app/consumption-order-details/cancel-reason-dialog/cancel-reason-dialog.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CancelReasonDialogComponent: () => (/* binding */ CancelReasonDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 17401);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/text-field */ 5802);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 90895);










function CancelReasonDialogComponent_mat_error_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Reason is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function CancelReasonDialogComponent_mat_error_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "At least 3 characters");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function CancelReasonDialogComponent_mat_error_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Max 500 characters");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
class CancelReasonDialogComponent {
  constructor(fb, ref, data) {
    this.fb = fb;
    this.ref = ref;
    this.data = data;
    this.form = this.fb.group({
      reason: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.maxLength(500)]]
    });
  }
  submit() {
    if (this.form.invalid) return;
    this.ref.close({
      reason: this.form.value.reason
    });
  }
  close() {
    this.ref.close();
  }
  static #_ = this.ɵfac = function CancelReasonDialogComponent_Factory(t) {
    return new (t || CancelReasonDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MAT_DIALOG_DATA));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: CancelReasonDialogComponent,
    selectors: [["app-cancel-reason-dialog"]],
    decls: 19,
    vars: 7,
    consts: [["mat-dialog-title", ""], [3, "formGroup"], ["appearance", "outline", 1, "w-100"], ["matInput", "", "cdkTextareaAutosize", "", "formControlName", "reason", "rows", "3", 3, "placeholder"], ["align", "start", 1, "muted"], [4, "ngIf"], ["align", "end"], ["mat-stroked-button", "", "type", "button", 3, "click"], ["color", "warn", "mat-flat-button", "", "type", "submit", 3, "disabled", "click"]],
    template: function CancelReasonDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "form", 1)(3, "mat-dialog-content")(4, "mat-form-field", 2)(5, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Reason");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "textarea", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "      ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-hint", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "This reason will be saved with the cancellation.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, CancelReasonDialogComponent_mat_error_11_Template, 2, 0, "mat-error", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, CancelReasonDialogComponent_mat_error_12_Template, 2, 0, "mat-error", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, CancelReasonDialogComponent_mat_error_13_Template, 2, 0, "mat-error", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-dialog-actions", 6)(15, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CancelReasonDialogComponent_Template_button_click_15_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CancelReasonDialogComponent_Template_button_click_17_listener() {
          return ctx.submit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, " Submit Reason ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        let tmp_3_0;
        let tmp_4_0;
        let tmp_5_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.data.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("placeholder", ctx.data.placeholder || "Add reason...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (tmp_3_0 = ctx.form.get("reason")) == null ? null : tmp_3_0.hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (tmp_4_0 = ctx.form.get("reason")) == null ? null : tmp_4_0.hasError("minlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (tmp_5_0 = ctx.form.get("reason")) == null ? null : tmp_5_0.hasError("maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.form.invalid);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName, _angular_material_input__WEBPACK_IMPORTED_MODULE_4__.MatInput, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatHint, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatError, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_6__.CdkTextareaAutosize, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogContent, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogActions],
    styles: [".w-100[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.muted[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-size: 12px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29uc3VtcHRpb24tb3JkZXItZGV0YWlscy9jYW5jZWwtcmVhc29uLWRpYWxvZy9jYW5jZWwtcmVhc29uLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0k7RUFBUyxXQUFBO0FBQ2I7O0FBQUk7RUFBUyxjQUFBO0VBQWdCLGVBQUE7QUFLN0IiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAudy0xMDAgeyB3aWR0aDogMTAwJTsgfVxuICAgIC5tdXRlZCB7IGNvbG9yOiAjNmM3NTdkOyBmb250LXNpemU6IDEycHg7IH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 75360:
/*!***************************************************************************************!*\
  !*** ./src/app/consumption-order-details/consumption-order-details-routing.module.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConsumptionOrderDetailsRoutingModule: () => (/* binding */ ConsumptionOrderDetailsRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _consumption_order_details_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consumption-order-details.component */ 44391);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _consumption_order_details_component__WEBPACK_IMPORTED_MODULE_0__.ConsumptionOrderDetailsComponent
}];
class ConsumptionOrderDetailsRoutingModule {
  static #_ = this.ɵfac = function ConsumptionOrderDetailsRoutingModule_Factory(t) {
    return new (t || ConsumptionOrderDetailsRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: ConsumptionOrderDetailsRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ConsumptionOrderDetailsRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 44391:
/*!**********************************************************************************!*\
  !*** ./src/app/consumption-order-details/consumption-order-details.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConsumptionOrderDetailsComponent: () => (/* binding */ ConsumptionOrderDetailsComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! exceljs */ 94262);
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(exceljs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! file-saver */ 46778);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ 20553);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var src_service_toaster_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/service/toaster.service */ 19586);
/* harmony import */ var src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/service/local-storage.service */ 48798);
/* harmony import */ var _service_confirmation_modal_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../service/confirmation-modal.service */ 61885);
/* harmony import */ var src_service_excel_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/service/excel.service */ 90921);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/dialog */ 17401);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/paginator */ 39687);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _common_outlet_cafe_select_common_outlet_cafe_select_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common-outlet-cafe-select/common-outlet-cafe-select.component */ 60627);
















function ConsumptionOrderDetailsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 8)(1, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ConsumptionOrderDetailsComponent_div_7_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r4.exportConsumptionOrdersExcel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, "file_download");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, " Export Excel ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
}
const _c0 = function (a0, a1, a2) {
  return {
    "bg-success": a0,
    "bg-danger": a1,
    "bg-warning text-dark": a2
  };
};
function ConsumptionOrderDetailsComponent_div_8_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 23)(1, "div", 24)(2, "div", 25)(3, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 27)(6, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7, "Meal Price");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](10, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](11, "div", 30)(12, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](13, "Count");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](14, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "div", 27)(17, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](18, "Total Amount (Incl. GST)");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](19, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](21, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](22, "div", 32)(23, "div", 33)(24, "div")(25, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](26, "Status:");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](27, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](29, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](30, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](32, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](33);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](34, "div", 38)(35, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ConsumptionOrderDetailsComponent_div_8_div_17_Template_button_click_35_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r11);
      const meal_r8 = restoredCtx.$implicit;
      const order_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r9.showPopupForSinleItemActivation(order_r6, meal_r8, "approved"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](36, "i", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](37, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ConsumptionOrderDetailsComponent_div_8_div_17_Template_button_click_37_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r11);
      const meal_r8 = restoredCtx.$implicit;
      const order_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r12.onCancelItem(order_r6, meal_r8));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](38, "i", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const meal_r8 = ctx.$implicit;
    const order_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](meal_r8.itemName);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](10, 10, meal_r8.mealPrice), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](meal_r8.count);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](21, 12, meal_r8.totalPrice), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction3"](16, _c0, meal_r8.status === "approved", meal_r8.status === "cancelled", meal_r8.status === "review"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](29, 14, meal_r8.status), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" Created By: ", order_r6.userDetails.userName, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("Phone: ", order_r6.userDetails.phoneNo, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", order_r6.status == "cancelled" || order_r6.status === "approved" || meal_r8.status == "cancelled" || meal_r8.status === "approved");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", order_r6.status == "cancelled" || order_r6.status === "approved" || meal_r8.status == "cancelled" || meal_r8.status === "approved");
  }
}
function ConsumptionOrderDetailsComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 10)(1, "div", 11)(2, "div", 12)(3, "div", 13)(4, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "div", 16)(10, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "div", 18)(13, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ConsumptionOrderDetailsComponent_div_8_Template_button_click_13_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r16);
      const order_r6 = restoredCtx.$implicit;
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r15.downloadOrder(order_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](14, "i", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](15, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ConsumptionOrderDetailsComponent_div_8_Template_button_click_15_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r16);
      const order_r6 = restoredCtx.$implicit;
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r17.showPopupForItemActivation(order_r6, "approved"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](16, " Approve All ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](17, ConsumptionOrderDetailsComponent_div_8_div_17_Template, 39, 20, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const order_r6 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate2"](" ", order_r6.organization_name, " \u2014 ", order_r6.cafeteria_name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](8, 6, order_r6.orderDate, "MMM d, y"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](order_r6.remark);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", order_r6.status == "cancelled" || order_r6.status === "approved" || !ctx_r1.checkAllMealStatus(order_r6));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", order_r6.mealTypeList);
  }
}
const _c1 = function () {
  return [10, 50, 100, 200, 500];
};
function ConsumptionOrderDetailsComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 43)(1, "mat-paginator", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("page", function ConsumptionOrderDetailsComponent_div_9_Template_mat_paginator_page_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r18.onPage($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("length", ctx_r2.filteredOrderList.length)("pageSize", ctx_r2.pageSize)("pageIndex", ctx_r2.pageIndex)("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](4, _c1));
  }
}
function ConsumptionOrderDetailsComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, " No Records Found ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
class ConsumptionOrderDetailsComponent {
  constructor(apiMainService, toaster, localStorageService, confirmationModalService, excel, dialog) {
    this.apiMainService = apiMainService;
    this.toaster = toaster;
    this.localStorageService = localStorageService;
    this.confirmationModalService = confirmationModalService;
    this.excel = excel;
    this.dialog = dialog;
    this.headerConfig = {
      mode: 'cafeteria',
      showDateRange: true,
      disableOrg: true,
      defaultOrgId: '',
      requireAll: true
    };
    this.filteredOrderList = [];
    this.imageUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.imageUrl;
    // Pagination state
    this.pageSize = 5;
    this.pageIndex = 0;
    this.pageSizeOptions = [5, 10, 25, 50];
    // Helpful for ngFor
    this.trackByOrderId = (_, order) => order?._id ?? order?.orderDate ?? _;
  }
  ngOnInit() {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.headerConfig.defaultOrgId = this.orgAdmin?.orgDetails?._id;
    if (this.orgAdmin?.role === 'HYPERPURE_POC') {
      this.headerConfig.defaultCafeId = this.orgAdmin?.cafeDetails?.[0]?.cafeteria_id;
      this.headerConfig.disableCafe = true;
    }
  }
  // Admin meta (safe fallback)
  get adminName() {
    return this.orgAdmin?.adminDetails?.name || this.orgAdmin?.name || this.orgAdmin?.userName || 'Admin';
  }
  get adminMobile() {
    return this.orgAdmin?.adminDetails?.mobile || this.orgAdmin?.phone || this.orgAdmin?.mobile || '';
  }
  // Slice list for current page
  get pagedOrderList() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredOrderList.slice(start, end);
  }
  onPage(e) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
  }
  filterSubmitted(e) {
    if (e) {
      this.filteredData = e;
      this.filterOrders();
    }
  }
  filterOrders() {
    if (!this.filteredData.org_id || !this.filteredData.cafeteria_id) {
      console.warn('Organization or Cafeteria not selected!');
      return;
    }
    const body = {
      cafeteriaName: this.filteredData.cafeteria_name,
      organizationName: this.filteredData.org_name,
      fromDate: this.filteredData.date_from,
      toDate: this.filteredData.date_to
    };
    this.getConsumptionOrderByFilter(body);
  }
  getConsumptionOrderByFilter(body) {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const res = yield _this.apiMainService.fetchConsumptionOrdersbysearchObj(body);
        _this.filteredOrderList = Array.isArray(res) ? res : [];
        _this.pageIndex = 0;
      } catch (err) {
        console.error('Error fetching outlet orders', err);
        _this.filteredOrderList = [];
        _this.pageIndex = 0;
      }
    })();
  }
  /** ===================== APPROVE / CANCEL ===================== */
  // Approve All
  showPopupForItemActivation(order, status) {
    if (status === 'cancelled') {
      // handled via onCancelAll(...) elsewhere in your code
      return;
    }
    this.orderDate = order.orderDate;
    this.statusPayload = {
      orderDate: this.orderDate,
      status: 'approved',
      // include admin meta on approve too
      adminName: this.adminName,
      adminMobile: this.adminMobile
    };
    const statusText = `Are you sure you want to approve all menu items?`;
    this.confirmationModalService.modal({
      msg: statusText,
      callback: this.updateConsumptionOrderStatus,
      context: this,
      data: status
    });
  }
  // Approve Single
  showPopupForSinleItemActivation(order, meal, status) {
    if (status === 'cancelled') {
      // handled via onCancelItem(...) elsewhere in your code
      return;
    }
    this.orderDate = order.orderDate;
    this.statusPayload = {
      orderDate: this.orderDate,
      status: 'approved',
      itemId: meal._id,
      // include admin meta on approve too
      adminName: this.adminName,
      adminMobile: this.adminMobile
    };
    const statusText = `Are you sure you want to approve ${meal.itemName} item?`;
    this.confirmationModalService.modal({
      msg: statusText,
      callback: this.updateConsumptionSingleMealStatus,
      context: this,
      data: status
    });
  }
  // === CANCEL: All items in an order ===
  onCancelAll(order) {
    const reason = (window.prompt('Enter cancel reason for all items') || '').trim();
    if (!reason) return; // user aborted
    this.orderDate = order.orderDate;
    this.statusPayload = {
      orderDate: this.orderDate,
      status: 'cancelled',
      cancelReason: reason,
      adminName: this.adminName,
      adminMobile: this.adminMobile
    };
    this.updateConsumptionOrderStatus(); // will refetch via filterOrders()
  }
  // === CANCEL: Single item ===
  onCancelItem(order, meal) {
    const reason = (window.prompt(`Enter cancel reason for "${meal?.itemName}"`) || '').trim();
    if (!reason) return; // user aborted
    this.orderDate = order.orderDate;
    this.statusPayload = {
      orderDate: this.orderDate,
      status: 'cancelled',
      itemId: meal._id,
      cancelReason: reason,
      adminName: this.adminName,
      adminMobile: this.adminMobile
    };
    this.updateConsumptionSingleMealStatus(); // will refetch via filterOrders()
  }

  updateConsumptionOrderStatus() {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this2.apiMainService.updateConsumptionOrderStatus(_this2.filteredOrderList?.[0]?.organization_id, _this2.filteredOrderList?.[0]?.cafeteria_orignal_id, _this2.statusPayload);
        _this2.filterOrders();
      } catch (err) {
        console.error('Error updating order status', err);
      }
    })();
  }
  updateConsumptionSingleMealStatus() {
    var _this3 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this3.apiMainService.updateConsumptionSingleMeslStatus(_this3.filteredOrderList?.[0]?.organization_id, _this3.filteredOrderList?.[0]?.cafeteria_orignal_id, _this3.statusPayload);
        _this3.filterOrders();
      } catch (err) {
        console.error('Error updating single meal status', err);
      }
    })();
  }
  checkAllMealStatus(order) {
    return order.mealTypeList.find(data => data.status == 'review');
  }
  downloadOrder(order) {
    const url = `${this.imageUrl}${order.imageUrl}`;
    const link = document.createElement('a');
    link.href = url;
    const fileName = order.imageUrl?.split('/').pop() || 'downloaded-file';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  /** ===================== Excel Export (updated spec) ===================== */
  // pick latest status history for a meal (for admin meta / reason)
  latestStatusEntry(meal) {
    const arr = Array.isArray(meal?.statusHistory) ? meal.statusHistory : [];
    if (!arr.length) return {};
    // assuming chronological; if not, sort by updatedOn
    const last = [...arr].sort((a, b) => new Date(a?.updatedOn || 0).getTime() - new Date(b?.updatedOn || 0).getTime()).pop();
    return {
      orderstatus: last?.orderstatus,
      reason: last?.reason,
      adminName: last?.adminName,
      adminMobile: last?.adminMobile
    };
  }
  exportConsumptionOrdersExcel() {
    var _this4 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this4.filteredOrderList || _this4.filteredOrderList.length === 0) return;
      const wb = new exceljs__WEBPACK_IMPORTED_MODULE_1__.Workbook();
      const ws = wb.addWorksheet('Consumption Orders', {
        properties: {
          defaultRowHeight: 18
        }
      });
      const currencyFmt = '₹#,##0.00';
      const dateFmt = 'dd-mmm-yy';
      const dateTimeFmt = 'dd-mmm-yy hh:mm AM/PM';
      const pad2 = n => n < 10 ? `0${n}` : `${n}`;
      const toLocalYmd = v => {
        const d = new Date(v);
        return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
      };
      // HEADERS (updated):
      // Parent/date row still shows Date, Review, Image (group header)
      // Child rows now have:
      // Created At, Org Name, Cafeteria Name, Item Name, Meal Price, Count, Total, Item Status, Created By (Name), Created By (Phone), Admin Name, Admin Mobile, Cancel Reason
      const headers = ['Date', 'Review', 'Image', 'Created At', 'Org Name', 'Cafeteria Name', 'Item Name', 'Meal Price', 'Count', 'Total Amount (Incl. GST)', 'Item Status', 'Created By (Name)', 'Created By (Phone)', 'Admin Name', 'Admin Mobile', 'Cancel Reason' // P
      ];

      const headerRow = ws.addRow(headers);
      headerRow.height = 22;
      const headerFill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FFEFEFEF'
        }
      };
      const thinBorder = {
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
      headerRow.eachCell(c => {
        c.font = {
          bold: true
        };
        c.alignment = {
          vertical: 'middle',
          horizontal: 'center'
        };
        c.fill = headerFill;
        c.border = thinBorder;
      });
      [16, 28, 14, 20, 24, 24, 28, 14, 10, 22, 16, 22, 18, 18, 16, 28].forEach((w, i) => ws.getColumn(i + 1).width = w);
      // Group data by local date
      const byDate = new Map();
      for (const order of _this4.filteredOrderList) {
        const key = toLocalYmd(order.orderDate);
        const meals = (order.mealTypeList || []).map(m => {
          const totalPrice = Number(m.totalPrice) || (Number(m.count) || 0) * (Number(m.mealPrice) || 0);
          const latest = _this4.latestStatusEntry(m);
          return {
            createdAt: order?.created_at ? new Date(order.created_at) : null,
            orgName: order?.organization_name || '',
            cafeName: order?.cafeteria_name || '',
            itemName: m.itemName,
            mealPrice: Number(m.mealPrice) || 0,
            count: Number(m.count) || 0,
            totalPrice: totalPrice,
            itemStatus: m.status || '',
            createdByName: order?.userDetails?.userName || '',
            createdByPhone: order?.userDetails?.phoneNo || '',
            adminName: latest?.adminName || '',
            adminMobile: latest?.adminMobile || '',
            cancelReason: String(m.status).toLowerCase() === 'cancelled' ? latest?.reason || '' : ''
          };
        });
        const entry = byDate.get(key) || {
          orders: [],
          rows: []
        };
        entry.orders.push(order);
        entry.rows = entry.rows.concat(meals);
        byDate.set(key, entry);
      }
      const dateFill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FFFDE68A'
        }
      };
      // preload one image per date (same as before)
      const dateImageBuffers = new Map();
      for (const [key, entry] of byDate) {
        const withImg = entry.orders.find(o => !!o.imageUrl);
        if (withImg) {
          const url = `${_this4.imageUrl}${withImg.imageUrl}`;
          const buf = yield _this4.fetchImageAsBuffer(url).catch(() => null);
          dateImageBuffers.set(key, buf ?? null);
        } else {
          dateImageBuffers.set(key, null);
        }
      }
      // Render
      for (const [key, entry] of byDate) {
        const firstOrder = entry.orders[0];
        const parent = ws.addRow([key, (firstOrder?.remark || '').toString(), '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
        parent.getCell(1).numFmt = dateFmt;
        parent.font = {
          bold: true
        };
        parent.getCell(1).fill = dateFill;
        parent.eachCell(cell => cell.border = thinBorder);
        const imgBuf = dateImageBuffers.get(key) || null;
        const parentRowNumber = parent.number;
        if (imgBuf) {
          try {
            const {
              base64,
              ext
            } = yield _this4.arrayBufferToBase64WithExt(imgBuf, entry.orders);
            const imageId = wb.addImage({
              base64,
              extension: ext
            });
            ws.addImage(imageId, {
              tl: {
                col: 2,
                row: parentRowNumber - 1
              },
              ext: {
                width: 64,
                height: 64
              }
            });
            ws.getRow(parentRowNumber).height = Math.max(ws.getRow(parentRowNumber).height || 18, 50);
          } catch {
            const o = entry.orders.find(o => !!o.imageUrl);
            if (o) {
              const link = `${_this4.imageUrl}${o.imageUrl}`;
              parent.getCell(3).value = {
                text: 'Open Image',
                hyperlink: link
              };
              parent.getCell(3).font = {
                color: {
                  argb: 'FF1D4ED8'
                },
                underline: true
              };
            }
          }
        } else {
          const o = entry.orders.find(o => !!o.imageUrl);
          if (o) {
            const link = `${_this4.imageUrl}${o.imageUrl}`;
            parent.getCell(3).value = {
              text: 'Open Image',
              hyperlink: link
            };
            parent.getCell(3).font = {
              color: {
                argb: 'FF1D4ED8'
              },
              underline: true
            };
          }
        }
        // child rows
        for (const it of entry.rows) {
          const r = ws.addRow(['', '', '', it.createdAt ? it.createdAt : '', it.orgName, it.cafeName, it.itemName, it.mealPrice, it.count, it.totalPrice, it.itemStatus, it.createdByName, it.createdByPhone, it.adminName, it.adminMobile, it.cancelReason // Cancel Reason
          ]);

          r.outlineLevel = 1;
          // styles
          r.getCell(4).numFmt = dateTimeFmt; // Created At
          r.eachCell((c, idx) => {
            c.border = thinBorder;
            if (idx === 8 || idx === 10) {
              // H (Meal Price), J (Total)
              c.numFmt = currencyFmt;
              c.alignment = {
                horizontal: 'right'
              };
            }
            if (idx === 9) {
              // I (Count)
              c.numFmt = '#,##0';
              c.alignment = {
                horizontal: 'center'
              };
            }
          });
        }
      }
      const buf = yield wb.xlsx.writeBuffer();
      const blob = new Blob([buf], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const safe = s => String(s).replace(/[\\/:*?"<>|]/g, '–');
      const orgName = _this4.filteredData?.org_name || 'Organization';
      const cafeName = _this4.filteredData?.cafeteria_name || 'Cafeteria';
      const rangeLabel = (() => {
        const f = _this4.filteredData?.date_from ? toLocalYmd(_this4.filteredData.date_from) : '';
        const t = _this4.filteredData?.date_to ? toLocalYmd(_this4.filteredData.date_to) : '';
        return f && t ? `${f} to ${t}` : f || t || toLocalYmd(new Date());
      })();
      const fileName = `${safe(orgName)} - ${safe(cafeName)} - Consumption Orders - ${safe(rangeLabel)}.xlsx`;
      (0,file_saver__WEBPACK_IMPORTED_MODULE_2__.saveAs)(blob, fileName);
    })();
  }
  /** Fetch image as ArrayBuffer for ExcelJS embedding; falls back gracefully on CORS/errors. */
  fetchImageAsBuffer(url) {
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const resp = yield fetch(url, {
          mode: 'cors'
        });
        if (!resp.ok) return null;
        return yield resp.arrayBuffer();
      } catch {
        return null;
      }
    })();
  }
  /** Convert ArrayBuffer -> base64; guess extension from first order's imageUrl */
  arrayBufferToBase64WithExt(buf, ordersForDate) {
    var _this5 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const ext = _this5.detectImageExt(ordersForDate);
      const base64 = yield _this5.arrayBufferToBase64(buf);
      return {
        base64: `data:image/${ext};base64,${base64}`,
        ext
      };
    })();
  }
  detectImageExt(orders) {
    const url = (orders.find(o => !!o.imageUrl)?.imageUrl || '').toLowerCase();
    if (url.endsWith('.png')) return 'png';
    return 'jpeg';
  }
  arrayBufferToBase64(buf) {
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const blob = new Blob([buf]);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const res = reader.result;
          const comma = res.indexOf(',');
          resolve(comma >= 0 ? res.slice(comma + 1) : res);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    })();
  }
  static #_ = this.ɵfac = function ConsumptionOrderDetailsComponent_Factory(t) {
    return new (t || ConsumptionOrderDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_4__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_service_toaster_service__WEBPACK_IMPORTED_MODULE_5__.ToasterService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_6__.LocalStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_service_confirmation_modal_service__WEBPACK_IMPORTED_MODULE_7__.ConfirmationModalService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_service_excel_service__WEBPACK_IMPORTED_MODULE_8__.ExcelService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__.MatDialog));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
    type: ConsumptionOrderDetailsComponent,
    selectors: [["app-consumption-order-details"]],
    decls: 11,
    vars: 6,
    consts: [[1, "container-fluid"], [1, "row", "mb-4", "mt-3", "p-3", "bg-light", "rounded"], [3, "config", "submitted"], [1, "container-fluid", "pb-4", "mt-4"], ["class", "d-flex justify-content-end mb-3", 4, "ngIf"], ["class", "mb-4", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "mt-3", 4, "ngIf"], ["class", "text-center", 4, "ngIf"], [1, "d-flex", "justify-content-end", "mb-3"], ["mat-stroked-button", "", 1, "btn-export-excel", 3, "click"], [1, "mb-4"], [1, "card", "shadow-sm", "border-0", "mb-2"], [1, "card-header", "bg-light", "d-flex", "justify-content-between", "align-items-center", "flex-wrap"], [1, "d-flex", "align-items-center", "gap-3"], [1, "fw-bold", "fs-5"], [1, "fw-bold", "fs-6", "text-primary"], [1, "text-md-center"], [1, ""], [1, "d-flex", "align-items-center", "gap-2"], [1, "btn", "btn-outline-secondary", "btn-sm", 3, "click"], [1, "bi", "bi-download"], [1, "btn", "btn-primary", "btn-sm", 3, "disabled", "click"], ["class", "card mb-3 shadow-sm border-0", 4, "ngFor", "ngForOf"], [1, "card", "mb-3", "shadow-sm", "border-0"], [1, "card-body", "row", "g-2", "align-items-center"], [1, "col-md-3", "col-sm-12"], [1, "fw-semibold", "fs-6"], [1, "col-md-2", "col-sm-6", "text-md-center"], [1, "text-muted", "small"], [1, "fw-bold"], [1, "col-md-1", "col-sm-6", "text-md-center"], [1, "fw-bold", "text-primary"], [1, "col-md-3", "col-sm-6", "text-md-end", "text-start"], [1, "d-flex", "flex-column"], [1, "me-2", "small", "text-muted"], [1, "badge", 3, "ngClass"], [1, "small", "text-muted", "mt-1"], [1, "small", "text-muted"], [1, "col-md-1", "col-sm-12", "d-flex", "justify-content-md-end", "justify-content-start", "gap-2"], ["title", "Approve", 1, "btn", "btn-sm", "btn-outline-success", "rounded-circle", 3, "disabled", "click"], [1, "bi", "bi-check"], ["title", "Cancel", 1, "btn", "btn-sm", "btn-outline-danger", "rounded-circle", 3, "disabled", "click"], [1, "bi", "bi-x"], [1, "mt-3"], ["showFirstLastButtons", "", 3, "length", "pageSize", "pageIndex", "pageSizeOptions", "page"], [1, "text-center"]],
    template: function ConsumptionOrderDetailsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2, "Consumption Orders");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "div", 0)(4, "div", 1)(5, "app-common-outlet-cafe-select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("submitted", function ConsumptionOrderDetailsComponent_Template_app_common_outlet_cafe_select_submitted_5_listener($event) {
          return ctx.filterSubmitted($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, ConsumptionOrderDetailsComponent_div_7_Template, 5, 0, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](8, ConsumptionOrderDetailsComponent_div_8_Template, 18, 9, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](9, ConsumptionOrderDetailsComponent_div_9_Template, 2, 5, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](10, ConsumptionOrderDetailsComponent_div_10_Template, 2, 0, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("config", ctx.headerConfig);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.filteredOrderList.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx.pagedOrderList)("ngForTrackBy", ctx.trackByOrderId);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.filteredOrderList.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.filteredOrderList.length === 0);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_14__.MatPaginator, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _common_outlet_cafe_select_common_outlet_cafe_select_component__WEBPACK_IMPORTED_MODULE_9__.CommonOutletCafeSelectComponent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_12__.TitleCasePipe, _angular_common__WEBPACK_IMPORTED_MODULE_12__.DatePipe],
    styles: [".submitBtnDiv[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n}\n\n.card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n}\n\n.card-header[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n\n.card-body[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29uc3VtcHRpb24tb3JkZXItZGV0YWlscy9jb25zdW1wdGlvbi1vcmRlci1kZXRhaWxzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLHFCQUFBO0FBQ0o7O0FBRUE7RUFDSSxtQkFBQTtBQUNKOztBQUVBO0VBQ0ksZUFBQTtBQUNKOztBQUVBO0VBQ0ksb0JBQUE7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbIi5zdWJtaXRCdG5EaXYge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcclxufVxyXG5cclxuLmNhcmQge1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxufVxyXG5cclxuLmNhcmQtaGVhZGVyIHtcclxuICAgIGZvbnQtc2l6ZTogMXJlbTtcclxufVxyXG5cclxuLmNhcmQtYm9keSB7XHJcbiAgICBwYWRkaW5nOiAxcmVtIDEuNXJlbTtcclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 56191:
/*!*******************************************************************************!*\
  !*** ./src/app/consumption-order-details/consumption-order-details.module.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConsumptionOrderDetailsModule: () => (/* binding */ ConsumptionOrderDetailsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _consumption_order_details_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consumption-order-details-routing.module */ 75360);
/* harmony import */ var _consumption_order_details_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consumption-order-details.component */ 44391);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-outlet-cafe-select/common-outlet-cafe-select.module */ 58481);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/paginator */ 39687);
/* harmony import */ var _cancel_reason_dialog_cancel_reason_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cancel-reason-dialog/cancel-reason-dialog.component */ 44550);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ 17401);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);













class ConsumptionOrderDetailsModule {
  static #_ = this.ɵfac = function ConsumptionOrderDetailsModule_Factory(t) {
    return new (t || ConsumptionOrderDetailsModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: ConsumptionOrderDetailsModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _consumption_order_details_routing_module__WEBPACK_IMPORTED_MODULE_0__.ConsumptionOrderDetailsRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_9__.MatPaginatorModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__.MatDialogModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule, _common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_2__.CommonOutletCafeSelectModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ConsumptionOrderDetailsModule, {
    declarations: [_consumption_order_details_component__WEBPACK_IMPORTED_MODULE_1__.ConsumptionOrderDetailsComponent, _cancel_reason_dialog_cancel_reason_dialog_component__WEBPACK_IMPORTED_MODULE_3__.CancelReasonDialogComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _consumption_order_details_routing_module__WEBPACK_IMPORTED_MODULE_0__.ConsumptionOrderDetailsRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_9__.MatPaginatorModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__.MatDialogModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule, _common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_2__.CommonOutletCafeSelectModule]
  });
})();

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
//# sourceMappingURL=src_app_consumption-order-details_consumption-order-details_module_ts.js.map