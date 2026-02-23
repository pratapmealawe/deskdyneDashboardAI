"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_outlet_add-outlet_add-outlet_module_ts"],{

/***/ 11103:
/*!****************************************************************!*\
  !*** ./src/app/outlet/add-outlet/add-outlet-routing.module.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddOutletRoutingModule: () => (/* binding */ AddOutletRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _add_outlet_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-outlet.component */ 42472);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _add_outlet_component__WEBPACK_IMPORTED_MODULE_0__.AddOutletComponent
}];
class AddOutletRoutingModule {
  static #_ = this.ɵfac = function AddOutletRoutingModule_Factory(t) {
    return new (t || AddOutletRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: AddOutletRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AddOutletRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 42472:
/*!***********************************************************!*\
  !*** ./src/app/outlet/add-outlet/add-outlet.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddOutletComponent: () => (/* binding */ AddOutletComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var src_app_image_cropper_image_cropper_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/image-cropper/image-cropper.component */ 58922);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ 20553);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var src_service_runtime_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/service/runtime-storage.service */ 24235);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/dialog */ 17401);
/* harmony import */ var src_service_confirmation_modal_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/service/confirmation-modal.service */ 61885);
/* harmony import */ var src_service_data_format_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/service/data-format.service */ 16091);
/* harmony import */ var src_service_policy_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/service/policy.service */ 64294);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/menu */ 78128);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/checkbox */ 56658);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/slide-toggle */ 59293);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/radio */ 92106);

























const _c0 = ["contentOrg"];
function AddOutletComponent_img_79_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "img", 84);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("src", ctx_r2.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
  }
}
function AddOutletComponent_div_80_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 85)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "cloud_upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "Upload Image");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function AddOutletComponent_mat_error_110_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Required (Min 0)");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AddOutletComponent_div_111_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 38)(1, "h4", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "Pre-Order Settings");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 87)(4, "mat-radio-group", 88)(5, "mat-radio-button", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, "Lunch");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "mat-radio-button", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8, "Dinner");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "mat-radio-button", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10, "Breakfast");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "mat-checkbox", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "Saturday Available");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "mat-checkbox", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14, "Sunday Available");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
}
function AddOutletComponent_mat_option_124_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-option", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const type_r24 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", type_r24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 2, type_r24), " ");
  }
}
function AddOutletComponent_mat_error_125_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " *Billing Type is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AddOutletComponent_mat_error_143_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " *Outlet name is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AddOutletComponent_mat_error_156_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " *Description is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AddOutletComponent_mat_error_165_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Required (0-100)");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AddOutletComponent_mat_error_173_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Required (0-100)");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AddOutletComponent_button_182_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_button_182_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r26);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r25.updateOutletLevelSubsidy());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx_r12.selectedOutlet);
  }
}
function AddOutletComponent_div_196_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 96)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "business");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "No organization selected yet.");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function AddOutletComponent_div_197_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 97)(1, "div", 98)(2, "div", 99)(3, "span", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "Organization");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "span", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "div", 99)(8, "span", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, "City");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "span", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "div", 99)(13, "span", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14, "Cafeteria");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "span", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "div", 99)(18, "span", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](19, "Location");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "span", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r14.seletedCafetria.organizationDetails.organization_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r14.seletedCafetria.organizationDetails.city);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r14.seletedCafetria.cafeteriaDetails.cafeteria_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r14.seletedCafetria.cafeteriaDetails.cafeteria_city);
  }
}
function AddOutletComponent_mat_error_198_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-error", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " *Please select an organization and cafeteria ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AddOutletComponent_div_220_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_div_220_button_5_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r32);
      const i_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().index;
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r30.removeMealTiming(i_r28));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function AddOutletComponent_div_220_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 103)(1, "div", 104)(2, "div", 105)(3, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, AddOutletComponent_div_220_button_5_Template, 3, 0, "button", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "div", 107)(7, "div", 108)(8, "mat-form-field", 109)(9, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10, "Meal Type");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](11, "input", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "div", 111)(13, "div", 112)(14, "label", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](15, "From");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](16, "input", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "div", 111)(18, "div", 112)(19, "label", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](20, "To");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](21, "input", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const i_r28 = ctx.index;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroupName", i_r28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("Meal ", i_r28 + 1, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r16.mealTimings.length > 1);
  }
}
function AddOutletComponent_mat_error_221_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-error", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r17.mealTimingError, " ");
  }
}
function AddOutletComponent_div_222_div_18_mat_error_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "*Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AddOutletComponent_div_222_div_18_mat_option_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-option", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const type_r40 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", type_r40);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 2, type_r40), " ");
  }
}
function AddOutletComponent_div_222_div_18_mat_error_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "*Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AddOutletComponent_div_222_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 103)(1, "div", 104)(2, "div", 105)(3, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "button", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_div_222_div_18_Template_button_click_5_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r42);
      const i_r36 = restoredCtx.index;
      const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r41.removeSectionConfig(i_r36));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 107)(9, "div", 120)(10, "mat-form-field", 109)(11, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "Section Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](13, "input", 121);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](14, AddOutletComponent_div_222_div_18_mat_error_14_Template, 2, 0, "mat-error", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "div", 122)(16, "mat-form-field", 109)(17, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](18, "Section Type");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "mat-select", 123);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](20, AddOutletComponent_div_222_div_18_mat_option_20_Template, 3, 4, "mat-option", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](21, AddOutletComponent_div_222_div_18_mat_error_21_Template, 2, 0, "mat-error", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const group_r35 = ctx.$implicit;
    const i_r36 = ctx.index;
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    let tmp_2_0;
    let tmp_4_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroupName", i_r36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("Section ", i_r36 + 1, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (tmp_2_0 = group_r35.get("sectionName")) == null ? null : tmp_2_0.invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r33.sectionTypes);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (tmp_4_0 = group_r35.get("sectionType")) == null ? null : tmp_4_0.invalid);
  }
}
function AddOutletComponent_div_222_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 68)(1, "div", 96)(2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "view_module");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "No sections added. Click \"Add\" to configure sections.");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
}
function AddOutletComponent_div_222_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 67)(1, "div", 68)(2, "div", 20)(3, "div", 61)(4, "div", 4)(5, "div", 22)(6, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "category");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, "Section Configuration");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "button", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_div_222_Template_button_click_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r44);
      const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r43.addSectionConfig());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "add");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](13, " Add ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "div", 23)(15, "div", 118)(16, "div", 73)(17, "div", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](18, AddOutletComponent_div_222_div_18_Template, 22, 5, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](19, AddOutletComponent_div_222_div_19_Template, 6, 0, "div", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()()();
  }
  if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r18.sectionConfig.controls);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r18.sectionConfig.controls.length === 0);
  }
}
function AddOutletComponent_div_223_div_18_mat_error_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "*Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AddOutletComponent_div_223_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r51 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 103)(1, "div", 104)(2, "div", 105)(3, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "button", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_div_223_div_18_Template_button_click_5_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r51);
      const i_r48 = restoredCtx.index;
      const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r50.removeCabinConfig(i_r48));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 107)(9, "div", 120)(10, "mat-form-field", 109)(11, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "Cabin Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](13, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](14, AddOutletComponent_div_223_div_18_mat_error_14_Template, 2, 0, "mat-error", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const group_r47 = ctx.$implicit;
    const i_r48 = ctx.index;
    let tmp_2_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroupName", i_r48);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("Cabin ", i_r48 + 1, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (tmp_2_0 = group_r47.get("cabinName")) == null ? null : tmp_2_0.invalid);
  }
}
function AddOutletComponent_div_223_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 68)(1, "div", 96)(2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "door_front");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "No cabins added. Click \"Add\" to configure cabins.");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
}
function AddOutletComponent_div_223_Template(rf, ctx) {
  if (rf & 1) {
    const _r53 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 67)(1, "div", 68)(2, "div", 20)(3, "div", 61)(4, "div", 4)(5, "div", 44)(6, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "meeting_room");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, "Cabin Configuration");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "button", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_div_223_Template_button_click_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r53);
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r52.addCabinConfig());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "add");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](13, " Add ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "div", 23)(15, "div", 124)(16, "div", 73)(17, "div", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](18, AddOutletComponent_div_223_div_18_Template, 15, 3, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](19, AddOutletComponent_div_223_div_19_Template, 6, 0, "div", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()()();
  }
  if (rf & 2) {
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r19.cabinConfig.controls);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r19.cabinConfig.controls.length === 0);
  }
}
function AddOutletComponent_button_228_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_button_228_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r55);
      const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r54.onSubmit("update"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, " Save Changes ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r20.form.invalid || !ctx_r20.seletedCafetria || !!ctx_r20.mealTimingError);
  }
}
function AddOutletComponent_button_229_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 127)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "check");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, " Create Outlet ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r21.form.invalid || !ctx_r21.seletedCafetria || !!ctx_r21.mealTimingError);
  }
}
const _c1 = function (a0) {
  return {
    selected: a0
  };
};
function AddOutletComponent_ng_template_230_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r60 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_ng_template_230_div_4_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r60);
      const org_r58 = restoredCtx.$implicit;
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r59.selectedOrgCafeteria = org_r58.key);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "mat-radio-button", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_ng_template_230_div_4_Template_mat_radio_button_click_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r60);
      const org_r58 = restoredCtx.$implicit;
      const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r61.selectedOrgCafeteria = org_r58.key);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const org_r58 = ctx.$implicit;
    const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](3, _c1, ctx_r57.selectedOrgCafeteria === org_r58.key));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("checked", ctx_r57.selectedOrgCafeteria === org_r58.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", org_r58.key, " ");
  }
}
function AddOutletComponent_ng_template_230_Template(rf, ctx) {
  if (rf & 1) {
    const _r63 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "h2", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Select Organization & Cafeteria");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "mat-dialog-content")(3, "div", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, AddOutletComponent_ng_template_230_div_4_Template, 3, 5, "div", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "mat-dialog-actions", 131)(6, "button", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_ng_template_230_Template_button_click_6_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r63);
      const dialogRef_r56 = restoredCtx.dialogRef;
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](dialogRef_r56.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "button", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_ng_template_230_Template_button_click_8_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r63);
      const dialogRef_r56 = restoredCtx.dialogRef;
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](dialogRef_r56.close("add"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, " Add ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r23.formattedOrgList);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx_r23.selectedOrgCafeteria);
  }
}
class AddOutletComponent {
  constructor(apiMainService, router, runtimeStorageService, fb, dialog, confirmationModal, dataFormatService, policyService) {
    this.apiMainService = apiMainService;
    this.router = router;
    this.runtimeStorageService = runtimeStorageService;
    this.fb = fb;
    this.dialog = dialog;
    this.confirmationModal = confirmationModal;
    this.dataFormatService = dataFormatService;
    this.policyService = policyService;
    this.showError = false;
    this.imageUrl = null;
    this.uploadedImageFile = null;
    this.showUpdate = false;
    this.formattedOrgList = [];
    this.sectionTypes = ['alacarte', 'live'];
    this.outletSubsidy = 0;
    // For meal type dropdown
    this.mealTypes = ['Fullday', 'Breakfast', 'Lunch', 'EveningSnacks', 'Dinner'];
    this.billingTypeOptions = ['ecommerce', 'revenueSharing'];
    // Error text for meal timings
    this.mealTimingError = null;
  }
  ngOnInit() {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.createForm();
    this.populateForEditIfNeeded();
    // validate overlaps whenever meal timings change
    this.mealTimings.valueChanges.subscribe(() => this.validateMealTimings());
  }
  // convenience getter for template
  get f() {
    return this.form.controls;
  }
  get mealTimings() {
    return this.form.get('mealTimings');
  }
  get sectionConfig() {
    return this.form.get('sectionConfig');
  }
  get cabinConfig() {
    return this.form.get('cabinConfig');
  }
  createForm() {
    this.form = this.fb.group({
      outletName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required],
      outletDescription: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required],
      outletOpened: [true],
      isSectionWiseMenu: [false],
      isPreOrder: [false],
      isCabinOrder: [false],
      preOrderMealType: ['lunch'],
      isSatAvailable: [false],
      isSunAvailable: [false],
      isPackagingRequired: [false],
      packagingAmount: [0, [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.min(0)]],
      vendorCommissionPercentage: [0, [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.max(100)]],
      MRPCommissionPercentage: [0, [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.max(100)]],
      subsidy: [0, [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.max(100)]],
      precedence: [0, [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.min(0)]],
      billingType: ['revenueSharing', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required],
      mealTimings: this.fb.array([]),
      sectionConfig: this.fb.array([]),
      cabinConfig: this.fb.array([])
    });
    // default one timing per standard meal type
    this.addDefaultMealTimings();
    // When isPreOrder is false, clear related fields
    this.form.get('isPreOrder')?.valueChanges.subscribe(isPreOrder => {
      if (!isPreOrder) {
        this.form.patchValue({
          preOrderMealType: 'lunch',
          isSatAvailable: false,
          isSunAvailable: false
        }, {
          emitEvent: false
        });
      }
    });
  }
  createMealTimingGroup(mealType = '', from = '00:00', till = '00:00') {
    return this.fb.group({
      mealType: [mealType, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required],
      acceptOrderFrom: [from, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required],
      acceptOrderTill: [till, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required]
    });
  }
  addDefaultMealTimings() {
    this.mealTypes.forEach(type => {
      this.mealTimings.push(this.createMealTimingGroup(type));
    });
  }
  createSectionConfigGroup(sectionName = '', sectionType = 'alacarte') {
    return this.fb.group({
      sectionName: [sectionName, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required],
      sectionType: [sectionType, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required]
    });
  }
  addSectionConfig() {
    this.sectionConfig.push(this.createSectionConfigGroup());
    this.sectionConfig.markAsDirty();
  }
  removeSectionConfig(index) {
    this.sectionConfig.removeAt(index);
    this.sectionConfig.markAsDirty();
  }
  createCabinConfigGroup(cabinName = '') {
    return this.fb.group({
      cabinName: [cabinName, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required]
    });
  }
  addCabinConfig() {
    this.cabinConfig.push(this.createCabinConfigGroup());
    this.cabinConfig.markAsDirty();
  }
  removeCabinConfig(index) {
    this.cabinConfig.removeAt(index);
    this.cabinConfig.markAsDirty();
  }
  addMealTiming() {
    this.mealTimings.push(this.createMealTimingGroup());
    this.mealTimings.markAsDirty();
  }
  removeMealTiming(index) {
    this.mealTimings.removeAt(index);
    this.mealTimings.markAsDirty();
    this.validateMealTimings();
  }
  populateForEditIfNeeded() {
    const outlet = this.runtimeStorageService.getCacheData('OUTLET_EDIT');
    if (outlet && outlet._id) {
      this.showUpdate = true;
      this.selectedOutlet = outlet;
      this.imageUrl = outlet.imageUrl ? src_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.imageUrl + outlet.imageUrl : null;
      this.seletedCafetria = {
        organizationDetails: outlet.organizationDetails,
        cafeteriaDetails: outlet.cafeteriaDetails
      };
      this.mealTimings.clear();
      if (outlet.mealTiming && Array.isArray(outlet.mealTiming)) {
        outlet.mealTiming.forEach(mt => {
          this.mealTimings.push(this.createMealTimingGroup(mt.mealType, mt.acceptOrderFrom, mt.acceptOrderTill));
        });
      } else {
        this.addDefaultMealTimings();
      }
      this.form.patchValue({
        outletName: outlet.outletName ?? '',
        outletDescription: outlet.outletDescription ?? '',
        // outletType REMOVED
        outletOpened: outlet.outletOpened ?? false,
        isSectionWiseMenu: outlet.isSectionWiseMenu ?? false,
        isPreOrder: outlet.isPreOrder ?? false,
        isCabinOrder: outlet.isCabinOrder ?? false,
        preOrderMealType: outlet.preOrderMealType ?? 'lunch',
        isSatAvailable: outlet.isSatAvailable ?? false,
        isSunAvailable: outlet.isSunAvailable ?? false,
        isPackagingRequired: outlet.isPackagingRequired ?? false,
        packagingAmount: outlet.packagingAmount ?? 0,
        vendorCommissionPercentage: outlet.vendorCommissionPercentage ?? 0,
        MRPCommissionPercentage: outlet.MRPCommissionPercentage ?? 0,
        subsidy: outlet.subsidy ?? 0,
        precedence: outlet.precedence ?? 0,
        billingType: outlet.billingType ?? 'revenueSharing'
      });
      this.sectionConfig.clear();
      if (outlet.sectionConfig && Array.isArray(outlet.sectionConfig)) {
        outlet.sectionConfig.forEach(sec => {
          this.sectionConfig.push(this.createSectionConfigGroup(sec.sectionName, sec.sectionType));
        });
      }
      this.cabinConfig.clear();
      if (outlet.cabinConfig && Array.isArray(outlet.cabinConfig)) {
        outlet.cabinConfig.forEach(cab => {
          this.cabinConfig.push(this.createCabinConfigGroup(cab.cabinName));
        });
      }
      this.validateMealTimings();
    }
  }
  getOrgList() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const orgList = yield _this.apiMainService.getOrgList();
        if (orgList && orgList.length > 0) {
          _this.formattedOrgList = _this.dataFormatService.getformattedOrgList(orgList);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }
  openOrgList() {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.selectedOrgCafeteria = undefined;
      yield _this2.getOrgList();
      const dialogRef = _this2.dialog.open(_this2.contentOrg, {
        width: '600px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'add') {
          _this2.confirmationModal.modal({
            msg: 'Are you sure you want to change Organization and Cafeteria?',
            callback: () => {
              const selected = _this2.formattedOrgList.find(org => org.key === _this2.selectedOrgCafeteria);
              if (selected) {
                _this2.seletedCafetria = {
                  ...selected
                };
              }
            },
            context: _this2
          });
        }
      });
    })();
  }
  handleFileInput($event) {
    var _this3 = this;
    if ($event?.target?.files?.length) {
      const file = $event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = /*#__PURE__*/(0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const imageUrl = reader.result;
        try {
          const dialogRef = _this3.dialog.open(src_app_image_cropper_image_cropper_component__WEBPACK_IMPORTED_MODULE_1__.ImageCropperComponent, {
            width: '50%',
            panelClass: 'image-cropper-dialog',
            disableClose: true,
            data: {
              imageUrl: imageUrl,
              imageWidth: 150,
              imageHeight: 150,
              aspectRatio: 1
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result?.croppedImages) {
              _this3.uploadedImageFile = result.croppedImages.file;
              _this3.imageUrl = result.croppedImages.resizeDataUrl;
            }
          });
        } catch (e) {
          console.log('error while changing outlet image ', e);
        }
      });
    }
  }
  updateOutletLevelSubsidy() {
    var _this4 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this4.selectedOutlet?._id) {
        return;
      }
      try {
        _this4.outletSubsidy = Number(_this4.form.getRawValue().subsidy) || 0;
        yield _this4.apiMainService.updateOutletLevelSubsidy(_this4.selectedOutlet._id, _this4.outletSubsidy);
      } catch (err) {
        console.log(err);
      }
    })();
  }
  // For (ngSubmit) without explicit type
  onSubmit(type) {
    this.submit(type);
  }
  trimStringValues(obj) {
    if (obj instanceof File || obj instanceof Blob) return obj;
    if (typeof obj === 'string') return obj.trim();
    if (Array.isArray(obj)) return obj.map(v => this.trimStringValues(v));
    if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach(key => {
        obj[key] = this.trimStringValues(obj[key]);
      });
    }
    return obj;
  }
  submit(type) {
    var _this5 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this5.showError = true;
      _this5.validateMealTimings();
      if (_this5.form.invalid || !_this5.seletedCafetria || _this5.mealTimingError) {
        _this5.form.markAllAsTouched();
        return;
      }
      try {
        const formValue = _this5.form.getRawValue();
        const finalObj = {
          cafeteriaDetails: _this5.seletedCafetria.cafeteriaDetails,
          organizationDetails: _this5.seletedCafetria.organizationDetails,
          mealTiming: _this5.mealTimings.value,
          sectionConfig: _this5.sectionConfig.value,
          cabinConfig: _this5.cabinConfig.value,
          ...formValue
        };
        let formData = _this5.objectToFormData(_this5.trimStringValues(finalObj));
        if (_this5.uploadedImageFile) {
          formData.append('image', _this5.uploadedImageFile);
        }
        if (type === 'update' && _this5.selectedOutlet?._id) {
          yield _this5.apiMainService.updateOutlet(_this5.selectedOutlet._id, formData, 0);
        } else {
          yield _this5.apiMainService.saveOutlet(formData);
        }
        _this5.router.navigate(['/outlet']);
      } catch (error) {
        console.log(error);
      }
    })();
  }
  objectToFormData(obj, formData = new FormData(), parentKey = '') {
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      const keyName = parentKey ? `${parentKey}[${key}]` : key;
      const value = obj[key];
      if (value === undefined || value === null) continue;
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (item && typeof item === 'object') {
            this.objectToFormData(item, formData, `${keyName}[${index}]`);
          } else {
            formData.append(`${keyName}[${index}]`, item);
          }
        });
      } else if (typeof value === 'object') {
        this.objectToFormData(value, formData, keyName);
      } else {
        formData.append(keyName, value);
      }
    }
    return formData;
  }
  back() {
    this.router.navigate(['/outlet']);
  }
  setStandardEndTime() {
    // Set standard times based on mealType
    const map = {
      Fullday: {
        from: '06:00',
        till: '23:00'
      },
      Breakfast: {
        from: '06:00',
        till: '10:00'
      },
      Lunch: {
        from: '11:00',
        till: '14:00'
      },
      EveningSnacks: {
        from: '16:00',
        till: '18:00'
      },
      Dinner: {
        from: '19:00',
        till: '22:00'
      }
    };
    this.mealTimings.controls.forEach(ctrl => {
      const mt = ctrl.get('mealType')?.value;
      if (mt && map[mt]) {
        ctrl.patchValue({
          acceptOrderFrom: map[mt].from,
          acceptOrderTill: map[mt].till
        }, {
          emitEvent: false
        });
      }
    });
    this.validateMealTimings();
  }
  validateMealTimings() {
    this.mealTimingError = null;
    const timings = this.mealTimings.value;
    if (!timings || timings.length === 0) {
      this.mealTimingError = 'Please add at least one meal timing.';
      return;
    }
    // Helper to convert HH:mm -> minutes
    const toMinutes = time => {
      const [h, m] = (time || '00:00').split(':').map(x => parseInt(x, 10) || 0);
      return h * 60 + m;
    };
    // 1. from < to
    for (const t of timings) {
      const start = toMinutes(t.acceptOrderFrom);
      const end = toMinutes(t.acceptOrderTill);
      if (start >= end) {
        this.mealTimingError = 'Start time must be before end time for all slots.';
        return;
      }
    }
    // 2. no overlap within same mealType
    const byType = {};
    timings.forEach(t => {
      const key = t.mealType || 'DEFAULT';
      if (!byType[key]) byType[key] = [];
      byType[key].push({
        start: toMinutes(t.acceptOrderFrom),
        end: toMinutes(t.acceptOrderTill)
      });
    });
    for (const type of Object.keys(byType)) {
      const slots = byType[type];
      for (let i = 0; i < slots.length; i++) {
        for (let j = i + 1; j < slots.length; j++) {
          const a = slots[i];
          const b = slots[j];
          const overlap = a.start < b.end && b.start < a.end;
          if (overlap) {
            this.mealTimingError = `Time ranges for meal type "${type}" are overlapping.`;
            return;
          }
        }
      }
    }
  }
  static #_ = this.ɵfac = function AddOutletComponent_Factory(t) {
    return new (t || AddOutletComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_3__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_service_runtime_storage_service__WEBPACK_IMPORTED_MODULE_4__.RuntimeStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_service_confirmation_modal_service__WEBPACK_IMPORTED_MODULE_5__.ConfirmationModalService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_service_data_format_service__WEBPACK_IMPORTED_MODULE_6__.DataFormatService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_service_policy_service__WEBPACK_IMPORTED_MODULE_7__.PolicyService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
    type: AddOutletComponent,
    selectors: [["app-add-outlet"]],
    viewQuery: function AddOutletComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.contentOrg = _t.first);
      }
    },
    decls: 232,
    vars: 30,
    consts: [[1, "add-outlet-container"], [3, "formGroup", "ngSubmit"], [1, "page-header-card", "mb-4"], [1, "header-content"], [1, "d-flex", "align-items-center", "gap-3"], ["mat-icon-button", "", "type", "button", 1, "back-btn", 3, "click"], [1, "page-title"], [1, "page-subtitle"], [1, "header-right"], ["mat-icon-button", "", "matTooltip", "Required Fields", 1, "info-btn", 3, "matMenuTriggerFor"], [1, "info-menu-panel"], ["infoMenu", "matMenu"], [1, "info-menu-content", 3, "click"], [1, "info-header"], [1, "info-list", "required"], [1, "info-header", "mt-2"], [1, "info-list", "recommended"], [1, "status-pill", 3, "ngClass"], [1, "row", "g-4"], [1, "col-12", "col-lg-4"], [1, "modern-card", "mb-4"], [1, "card-header"], [1, "icon-box", "info"], [1, "card-body"], [1, "upload-wrapper"], ["type", "file", "accept", "image/*", "capture", "camera", 1, "uploadInput", 2, "display", "none", 3, "change"], ["fileInput", ""], [1, "image-upload-box", 3, "click"], ["class", "preview-image", 3, "src", 4, "ngIf"], ["class", "placeholder-content", 4, "ngIf"], [1, "upload-overlay"], [1, "icon-box", "secondary"], [1, "switch-group"], ["formControlName", "outletOpened", "color", "primary"], ["formControlName", "isSectionWiseMenu", "color", "primary"], ["formControlName", "isPreOrder", "color", "primary"], ["formControlName", "isCabinOrder", "color", "primary"], ["formControlName", "isPackagingRequired", "color", "primary"], [1, "mt-4"], ["appearance", "outline", 1, "w-100", "custom-field"], ["matInput", "", "type", "number", "formControlName", "packagingAmount"], ["matSuffix", "", 1, "text-muted"], [4, "ngIf"], ["class", "mt-4", 4, "ngIf"], [1, "icon-box", "warning"], ["formControlName", "billingType"], [3, "value", 4, "ngFor", "ngForOf"], [1, "col-12", "col-lg-8"], [1, "icon-box", "primary"], [1, "row"], [1, "col-12", "col-md-6", "mb-3"], ["matInput", "", "placeholder", "e.g. Starbucks", "formControlName", "outletName"], ["matInput", "", "type", "number", "formControlName", "precedence"], [1, "col-12", "mb-3"], ["matInput", "", "rows", "3", "placeholder", "Brief description of the outlet...", "formControlName", "outletDescription"], [1, "col-12", "col-md-4", "mb-3"], ["matInput", "", "type", "number", "formControlName", "vendorCommissionPercentage"], ["matInput", "", "type", "number", "formControlName", "MRPCommissionPercentage"], [1, "d-flex", "align-items-center", "gap-2"], ["matInput", "", "type", "number", "formControlName", "subsidy"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Update Subsidy", "type", "button", 3, "disabled", "click", 4, "ngIf"], [1, "card-header", "with-actions"], [1, "icon-box", "success"], ["mat-stroked-button", "", "color", "primary", "type", "button", 1, "action-btn", 3, "click"], ["class", "empty-placeholder", 4, "ngIf"], ["class", "selected-cafe-info", 4, "ngIf"], ["class", "mt-2 d-block text-center", 4, "ngIf"], [1, "row", "g-4", "mt-1"], [1, "col-12"], [1, "icon-box", "purple"], [1, "d-flex", "gap-2"], ["mat-flat-button", "", "color", "primary", "type", "button", 1, "action-btn", 3, "click"], ["formArrayName", "mealTimings"], [1, "container-fluid", "p-0"], [1, "row", "g-3"], ["class", "col-12 col-xl-6", 3, "formGroupName", 4, "ngFor", "ngForOf"], ["class", "mt-2 d-block", 4, "ngIf"], ["class", "row g-4 mt-1", 4, "ngIf"], [1, "action-bar-container"], [1, "action-bar"], ["mat-button", "", "type", "button", 1, "btn-cancel", 3, "click"], ["class", "btn-submit", "mat-flat-button", "", "color", "primary", "type", "button", 3, "disabled", "click", 4, "ngIf"], ["class", "btn-submit", "mat-flat-button", "", "color", "primary", "type", "submit", 3, "disabled", 4, "ngIf"], ["contentOrg", ""], [1, "preview-image", 3, "src"], [1, "placeholder-content"], [1, "text-secondary", "mb-2", 2, "font-size", "0.9rem"], [1, "d-flex", "flex-column", "gap-2", "p-3", "bg-light", "rounded"], ["formControlName", "preOrderMealType", 1, "d-flex", "gap-3", "mb-2"], ["value", "lunch"], ["value", "dinner"], ["value", "breakfast"], ["formControlName", "isSatAvailable"], ["formControlName", "isSunAvailable"], [3, "value"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Update Subsidy", "type", "button", 3, "disabled", "click"], [1, "empty-placeholder"], [1, "selected-cafe-info"], [1, "info-grid"], [1, "info-item"], [1, "label"], [1, "value"], [1, "mt-2", "d-block", "text-center"], [1, "col-12", "col-xl-6", 3, "formGroupName"], [1, "meal-timing-card", "h-100", "mb-0"], [1, "timing-header"], ["mat-icon-button", "", "color", "warn", "type", "button", 3, "click", 4, "ngIf"], [1, "row", "align-items-center"], [1, "col-12", "col-md-4", "mb-2", "mb-md-0"], ["appearance", "outline", 1, "w-100", "dense-field", "custom-field"], ["matInput", "", "formControlName", "mealType", "placeholder", "Breakfast"], [1, "col-6", "col-md-4"], [1, "time-input-styled"], [1, "small", "text-secondary", "mb-1", "d-block"], ["type", "time", "formControlName", "acceptOrderFrom"], ["type", "time", "formControlName", "acceptOrderTill"], ["mat-icon-button", "", "color", "warn", "type", "button", 3, "click"], [1, "mt-2", "d-block"], ["formArrayName", "sectionConfig"], ["class", "col-12", 4, "ngIf"], [1, "col-12", "col-md-6", "mb-2", "mb-md-0"], ["matInput", "", "formControlName", "sectionName", "placeholder", "e.g. Main Desk"], [1, "col-12", "col-md-6"], ["formControlName", "sectionType"], ["formArrayName", "cabinConfig"], ["matInput", "", "formControlName", "cabinName", "placeholder", "e.g. CEO Cabin"], ["mat-flat-button", "", "color", "primary", "type", "button", 1, "btn-submit", 3, "disabled", "click"], ["mat-flat-button", "", "color", "primary", "type", "submit", 1, "btn-submit", 3, "disabled"], ["mat-dialog-title", ""], [1, "org-list"], ["class", "org-item", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["align", "end"], ["mat-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "button", 3, "disabled", "click"], [1, "org-item", 3, "ngClass", "click"], [3, "checked", "click"]],
    template: function AddOutletComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r65 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0)(1, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngSubmit", function AddOutletComponent_Template_form_ngSubmit_1_listener() {
          return ctx.onSubmit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_Template_button_click_5_listener() {
          return ctx.back();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "arrow_back");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div")(9, "h1", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "Configure outlet details, timings, and settings.");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "div", 8)(14, "button", 9)(15, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](16, "info");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "mat-menu", 10, 11)(19, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_Template_div_click_19_listener($event) {
          return $event.stopPropagation();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "div", 13)(21, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](22, "checklist");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](23, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](24, "Required Fields");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](25, "ul", 14)(26, "li")(27, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](28, "check_circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](29, " Outlet Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](30, "li")(31, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](32, "check_circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](33, " Description");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](34, "li")(35, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](36, "check_circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](37, " Commission Percentages");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](38, "li")(39, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](40, "check_circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](41, " Organization & Cafeteria");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](42, "li")(43, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](44, "check_circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](45, " Meal Timings");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](46, "li")(47, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](48, "check_circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](49, " Billing Type");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](50, "div", 15)(51, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](52, "stars");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](53, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](54, "Recommended");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](55, "ul", 16)(56, "li")(57, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](58, "add_circle_outline");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](59, " Outlet Image");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](60, "div", 17)(61, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](62);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](63, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](64);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](65, "div", 18)(66, "div", 19)(67, "div", 20)(68, "div", 21)(69, "div", 22)(70, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](71, "image");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](72, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](73, "Outlet Image");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](74, "div", 23)(75, "div", 24)(76, "input", 25, 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function AddOutletComponent_Template_input_change_76_listener($event) {
          return ctx.handleFileInput($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](78, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_Template_div_click_78_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r65);
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](77);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](_r1.click());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](79, AddOutletComponent_img_79_Template, 1, 1, "img", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](80, AddOutletComponent_div_80_Template, 5, 0, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](81, "div", 30)(82, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](83, "Change Image");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](84, "div", 20)(85, "div", 21)(86, "div", 31)(87, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](88, "settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](89, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](90, "Configuration");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](91, "div", 23)(92, "div", 32)(93, "mat-slide-toggle", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](94, " Outlet Opened ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](95, "mat-slide-toggle", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](96, " Section Wise Menu ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](97, "mat-slide-toggle", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](98, " Pre-Order Enabled ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](99, "mat-slide-toggle", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](100, " Cabin Order Enabled ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](101, "mat-slide-toggle", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](102, " Packaging Order Required ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](103, "div", 38)(104, "mat-form-field", 39)(105, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](106, "Packaging Amount");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](107, "input", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](108, "mat-icon", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](109, "currency_rupee");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](110, AddOutletComponent_mat_error_110_Template, 2, 0, "mat-error", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](111, AddOutletComponent_div_111_Template, 15, 0, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](112, "div", 20)(113, "div", 21)(114, "div", 44)(115, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](116, "receipt_long");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](117, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](118, "Billing Type");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](119, "div", 23)(120, "mat-form-field", 39)(121, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](122, "Billing Type");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](123, "mat-select", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](124, AddOutletComponent_mat_option_124_Template, 3, 4, "mat-option", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](125, AddOutletComponent_mat_error_125_Template, 2, 0, "mat-error", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](126, "div", 47)(127, "div", 20)(128, "div", 21)(129, "div", 48)(130, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](131, "storefront");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](132, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](133, "Basic Details");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](134, "div", 23)(135, "div", 49)(136, "div", 50)(137, "mat-form-field", 39)(138, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](139, "Outlet Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](140, "input", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](141, "mat-icon", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](142, "store");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](143, AddOutletComponent_mat_error_143_Template, 2, 0, "mat-error", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](144, "div", 50)(145, "mat-form-field", 39)(146, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](147, "Precedence");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](148, "input", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](149, "mat-icon", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](150, "sort");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](151, "div", 53)(152, "mat-form-field", 39)(153, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](154, "Description");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](155, "textarea", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](156, AddOutletComponent_mat_error_156_Template, 2, 0, "mat-error", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](157, "div", 49)(158, "div", 55)(159, "mat-form-field", 39)(160, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](161, "Vendor Commission (%)");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](162, "input", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](163, "mat-icon", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](164, "percent");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](165, AddOutletComponent_mat_error_165_Template, 2, 0, "mat-error", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](166, "div", 55)(167, "mat-form-field", 39)(168, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](169, "MRP Commission (%)");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](170, "input", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](171, "mat-icon", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](172, "percent");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](173, AddOutletComponent_mat_error_173_Template, 2, 0, "mat-error", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](174, "div", 55)(175, "div", 58)(176, "mat-form-field", 39)(177, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](178, "Subsidy (%)");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](179, "input", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](180, "mat-icon", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](181, "savings");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](182, AddOutletComponent_button_182_Template, 3, 1, "button", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](183, "div", 20)(184, "div", 61)(185, "div", 4)(186, "div", 62)(187, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](188, "location_on");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](189, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](190, "Organization & Cafeteria");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](191, "button", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_Template_button_click_191_listener() {
          return ctx.openOrgList();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](192, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](193);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](194);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](195, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](196, AddOutletComponent_div_196_Template, 5, 0, "div", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](197, AddOutletComponent_div_197_Template, 22, 4, "div", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](198, AddOutletComponent_mat_error_198_Template, 2, 0, "mat-error", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](199, "div", 67)(200, "div", 68)(201, "div", 20)(202, "div", 61)(203, "div", 4)(204, "div", 69)(205, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](206, "schedule");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](207, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](208, "Meal Timings");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](209, "div", 70)(210, "button", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_Template_button_click_210_listener() {
          return ctx.setStandardEndTime();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](211, " Set Standards ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](212, "button", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_Template_button_click_212_listener() {
          return ctx.addMealTiming();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](213, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](214, "add");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](215, " Add ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](216, "div", 23)(217, "div", 72)(218, "div", 73)(219, "div", 74);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](220, AddOutletComponent_div_220_Template, 22, 3, "div", 75);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](221, AddOutletComponent_mat_error_221_Template, 2, 1, "mat-error", 76);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](222, AddOutletComponent_div_222_Template, 20, 2, "div", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](223, AddOutletComponent_div_223_Template, 20, 2, "div", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](224, "div", 78)(225, "div", 79)(226, "button", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AddOutletComponent_Template_button_click_226_listener() {
          return ctx.back();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](227, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](228, AddOutletComponent_button_228_Template, 4, 1, "button", 81);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](229, AddOutletComponent_button_229_Template, 4, 1, "button", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](230, AddOutletComponent_ng_template_230_Template, 10, 2, "ng-template", null, 83, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](18);
        let tmp_10_0;
        let tmp_25_0;
        let tmp_26_0;
        let tmp_27_0;
        let tmp_28_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx.showUpdate ? "Edit Outlet" : "Add Outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("matMenuTriggerFor", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](46);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", ctx.form.valid && ctx.seletedCafetria && !ctx.mealTimingError ? "valid" : "invalid");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx.form.valid && ctx.seletedCafetria && !ctx.mealTimingError ? "check_circle" : "info");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx.form.valid && ctx.seletedCafetria && !ctx.mealTimingError ? "Ready to Save" : "Incomplete");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("has-image", ctx.imageUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.imageUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.imageUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](30);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.f["packagingAmount"].invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (tmp_10_0 = ctx.form.get("isPreOrder")) == null ? null : tmp_10_0.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx.billingTypeOptions);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.f["billingType"].invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.f["outletName"].invalid && (ctx.f["outletName"].touched || ctx.showError));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.f["outletDescription"].invalid && (ctx.f["outletDescription"].touched || ctx.showError));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.f["vendorCommissionPercentage"].invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.f["MRPCommissionPercentage"].invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.showUpdate);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx.showUpdate ? "swap_horiz" : "add");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx.showUpdate ? "Change" : "Select", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.seletedCafetria);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.seletedCafetria);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.seletedCafetria && ctx.showError);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx.mealTimings.controls);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.mealTimingError);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (tmp_25_0 = ctx.form.get("isSectionWiseMenu")) == null ? null : tmp_25_0.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (tmp_26_0 = ctx.form.get("isCabinOrder")) == null ? null : tmp_26_0.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.showUpdate && ((tmp_27_0 = ctx.btnPolicy == null ? null : ctx.btnPolicy.editOutlet) !== null && tmp_27_0 !== undefined ? tmp_27_0 : true));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.showUpdate && ((tmp_28_0 = ctx.btnPolicy == null ? null : ctx.btnPolicy.addOutlet) !== null && tmp_28_0 !== undefined ? tmp_28_0 : true));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormGroupName, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormArrayName, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatError, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatSuffix, _angular_material_input__WEBPACK_IMPORTED_MODULE_16__.MatInput, _angular_material_select__WEBPACK_IMPORTED_MODULE_17__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_18__.MatOption, _angular_material_menu__WEBPACK_IMPORTED_MODULE_19__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_19__.MatMenuTrigger, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_20__.MatTooltip, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__.MatDialogContent, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__.MatDialogActions, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_21__.MatCheckbox, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_22__.MatSlideToggle, _angular_material_radio__WEBPACK_IMPORTED_MODULE_23__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_23__.MatRadioButton, _angular_common__WEBPACK_IMPORTED_MODULE_12__.TitleCasePipe],
    styles: ["\n\n\n\n[_ngcontent-%COMP%]:root {\n  --color-primary: #0E49B5;\n  --color-secondary: #FF3333;\n  --color-backgroundGrey: #f3f3f3;\n  --color-text: #1a1a1a;\n}\n\n.add-outlet-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  min-height: 100vh;\n  padding-bottom: 100px;\n}\n\n.page-header-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 20px;\n  padding: 1rem 1.5rem;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);\n  border: 1px solid rgba(0, 0, 0, 0.04);\n}\n.page-header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.page-header-card[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.page-header-card[_ngcontent-%COMP%]   .back-btn[_ngcontent-%COMP%] {\n  color: #6c757d;\n  background: #f8f9fa;\n  border-radius: 8px;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.page-header-card[_ngcontent-%COMP%]   .info-btn[_ngcontent-%COMP%] {\n  color: #64748b;\n}\n.page-header-card[_ngcontent-%COMP%]   .info-btn[_ngcontent-%COMP%]:hover {\n  color: #0E49B5;\n}\n.page-header-card[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n  color: #192754;\n}\n.page-header-card[_ngcontent-%COMP%]   .page-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #9aa0a6;\n  margin: 0;\n}\n.page-header-card[_ngcontent-%COMP%]   .status-pill[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 16px;\n  border-radius: 50px;\n  font-size: 0.85rem;\n  font-weight: 600;\n}\n.page-header-card[_ngcontent-%COMP%]   .status-pill.valid[_ngcontent-%COMP%] {\n  background-color: #f0fdf4;\n  color: #16a34a;\n  border: 1px solid #bbf7d0;\n}\n.page-header-card[_ngcontent-%COMP%]   .status-pill.invalid[_ngcontent-%COMP%] {\n  background-color: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n}\n.page-header-card[_ngcontent-%COMP%]   .status-pill[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n\n.info-menu-content[_ngcontent-%COMP%] {\n  padding: 1rem;\n  min-width: 250px;\n}\n\n.info-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding-bottom: 8px;\n  border-bottom: 1px solid #e2e8f0;\n}\n.info-header[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: #f59e0b;\n}\n.info-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.info-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 8px 0 0;\n}\n.info-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 0;\n  font-size: 0.8rem;\n  color: #475569;\n}\n.info-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.info-list.required[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.info-list.recommended[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n\n.modern-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);\n  border: 1px solid #edf2f7;\n  overflow: hidden;\n  height: -moz-fit-content;\n  height: fit-content;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  padding: 1.25rem 1.5rem;\n  border-bottom: 1px solid #f1f5f9;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  background-color: white;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header.with-actions[_ngcontent-%COMP%] {\n  justify-content: space-between;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #2d3748;\n  margin: 0;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .icon-box.primary[_ngcontent-%COMP%] {\n  background: rgba(14, 73, 181, 0.1);\n  color: #0E49B5;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .icon-box.secondary[_ngcontent-%COMP%] {\n  background: rgba(255, 51, 51, 0.1);\n  color: #FF3333;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .icon-box.info[_ngcontent-%COMP%] {\n  background: #e0f2fe;\n  color: #0284c7;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .icon-box.warning[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #d97706;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .icon-box.success[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #16a34a;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .icon-box.purple[_ngcontent-%COMP%] {\n  background: #f3e8ff;\n  color: #9333ea;\n}\n.modern-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n\n.custom-field[_ngcontent-%COMP%]     .mat-mdc-form-field-flex {\n  background-color: white !important;\n}\n\n.upload-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 1rem;\n}\n\n.image-upload-box[_ngcontent-%COMP%] {\n  position: relative;\n  width: 160px;\n  height: 160px;\n  border-radius: 16px;\n  border: 2px dashed #e2e8f0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n.image-upload-box[_ngcontent-%COMP%]:hover {\n  border-color: #0E49B5;\n  background-color: rgba(14, 73, 181, 0.02);\n}\n.image-upload-box.has-image[_ngcontent-%COMP%] {\n  border-style: solid;\n  border-color: transparent;\n}\n\n.preview-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.placeholder-content[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #94a3b8;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n}\n.placeholder-content[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  height: 40px;\n  width: 40px;\n  opacity: 0.5;\n}\n.placeholder-content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 500;\n}\n\n.upload-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.6);\n  color: white;\n  padding: 0.5rem;\n  text-align: center;\n  font-size: 0.75rem;\n  transform: translateY(100%);\n  transition: transform 0.2s ease;\n}\n\n.image-upload-box[_ngcontent-%COMP%]:hover   .upload-overlay[_ngcontent-%COMP%] {\n  transform: translateY(0);\n}\n\n.switch-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.selected-cafe-info[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  border: 1px solid #bbf7d0;\n  border-radius: 12px;\n  padding: 1.25rem;\n}\n.selected-cafe-info[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n.selected-cafe-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.selected-cafe-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: #16a34a;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin-bottom: 0.25rem;\n  font-weight: 600;\n}\n.selected-cafe-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 500;\n  color: #166534;\n}\n\n.empty-placeholder[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 0;\n  color: #94a3b8;\n}\n.empty-placeholder[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  width: 40px;\n  height: 40px;\n  margin-bottom: 0.5rem;\n  opacity: 0.5;\n}\n.empty-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.meal-timing-card[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 1rem;\n  position: relative;\n}\n.meal-timing-card[_ngcontent-%COMP%]   .timing-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.75rem;\n}\n.meal-timing-card[_ngcontent-%COMP%]   .timing-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #64748b;\n  margin: 0;\n}\n\n.time-input-styled[_ngcontent-%COMP%]   input[type=time][_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.6rem 0.75rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  font-family: inherit;\n  color: #1e293b;\n  background: white;\n  cursor: pointer;\n  font-size: 0.9rem;\n}\n.time-input-styled[_ngcontent-%COMP%]   input[type=time][_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #0E49B5;\n  box-shadow: 0 0 0 3px rgba(14, 73, 181, 0.1);\n}\n\n.action-bar-container[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  justify-content: center;\n  pointer-events: none;\n  z-index: 100;\n}\n\n.action-bar[_ngcontent-%COMP%] {\n  pointer-events: auto;\n  background: rgba(255, 255, 255, 0.95);\n  -webkit-backdrop-filter: blur(8px);\n          backdrop-filter: blur(8px);\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  padding: 0.75rem 1.5rem;\n  border-radius: 50px;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);\n  display: flex;\n  gap: 1rem;\n  margin-bottom: 1.4rem;\n}\n.action-bar[_ngcontent-%COMP%]   .btn-submit[_ngcontent-%COMP%] {\n  border-radius: 50px;\n  padding: 0 2rem;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.action-bar[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {\n  border-radius: 50px;\n  height: 44px;\n  padding: 0 1.5rem;\n  color: #64748b;\n}\n\n.action-btn[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  font-weight: 500;\n}\n\n.org-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  max-height: 400px;\n  overflow-y: auto;\n}\n\n.org-item[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  cursor: pointer;\n  transition: all 0.2s;\n  background: white;\n}\n.org-item[_ngcontent-%COMP%]:hover {\n  background-color: #f8fafc;\n  border-color: #0E49B5;\n}\n.org-item.selected[_ngcontent-%COMP%] {\n  background-color: rgba(14, 73, 181, 0.04);\n  border-color: #0E49B5;\n}\n.org-item.selected[_ngcontent-%COMP%]   mat-radio-button[_ngcontent-%COMP%] {\n  pointer-events: none;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGhlbWUvX3ZhcmlhYmxlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL291dGxldC9hZGQtb3V0bGV0L2FkZC1vdXRsZXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OytDQUFBO0FBMEVBO0VBQ0Usd0JBQUE7RUFDQSwwQkFBQTtFQUNBLCtCQUFBO0VBQ0EscUJBQUE7QUN0RUY7O0FBSkE7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxxQkFBQTtBQU9GOztBQUhBO0VBQ0UsaUJBQUE7RUFDQSxtQkRVaUI7RUNUakIsb0JBQUE7RUFDQSwwQ0FBQTtFQUNBLHFDQUFBO0FBTUY7QUFKRTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLFNBQUE7QUFNSjtBQUhFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtBQUtKO0FBRkU7RUFDRSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFJSjtBQURFO0VBQ0UsY0FBQTtBQUdKO0FBREk7RUFDRSxjRHRDVztBQ3lDakI7QUFDRTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxTQUFBO0VBQ0EsY0Q1Q2E7QUM2Q2pCO0FBRUU7RUFDRSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxTQUFBO0FBQUo7QUFHRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQURKO0FBR0k7RUFDRSx5QkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBQUROO0FBSUk7RUFDRSx5QkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBQUZOO0FBS0k7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFITjs7QUFTQTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtBQU5GOztBQVNBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0NBQUE7QUFORjtBQVFFO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQU5KO0FBU0U7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQVBKOztBQVdBO0VBQ0UsZ0JBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7QUFSRjtBQVVFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUFSSjtBQVVJO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBUk47QUFZRTtFQUNFLGNBQUE7QUFWSjtBQWFFO0VBQ0UsY0FBQTtBQVhKOztBQWdCQTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSx5Q0FBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx3QkFBQTtFQUFBLG1CQUFBO0FBYkY7QUFlRTtFQUNFLHVCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsdUJBQUE7QUFiSjtBQWVJO0VBQ0UsOEJBQUE7QUFiTjtBQWdCSTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsU0FBQTtBQWROO0FBaUJJO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBZk47QUFpQk07RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFmUjtBQWtCTTtFQUNFLGtDQUFBO0VBQ0EsY0R4TFM7QUN3S2pCO0FBbUJNO0VBQ0Usa0NBQUE7RUFDQSxjRHJMVztBQ29LbkI7QUFvQk07RUFDRSxtQkFBQTtFQUNBLGNBQUE7QUFsQlI7QUFxQk07RUFDRSxtQkFBQTtFQUNBLGNBQUE7QUFuQlI7QUFzQk07RUFDRSxtQkFBQTtFQUNBLGNBQUE7QUFwQlI7QUF1Qk07RUFDRSxtQkFBQTtFQUNBLGNBQUE7QUFyQlI7QUEwQkU7RUFDRSxlQUFBO0FBeEJKOztBQThCRTtFQUNFLGtDQUFBO0FBM0JKOztBQWdDQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBN0JGOztBQWdDQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDBCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtBQTdCRjtBQStCRTtFQUNFLHFCRHZQYTtFQ3dQYix5Q0FBQTtBQTdCSjtBQWdDRTtFQUNFLG1CQUFBO0VBQ0EseUJBQUE7QUE5Qko7O0FBa0NBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQS9CRjs7QUFrQ0E7RUFDRSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7QUEvQkY7QUFpQ0U7RUFDRSxlQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBL0JKO0FBa0NFO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtBQWhDSjs7QUFvQ0E7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLDhCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMkJBQUE7RUFDQSwrQkFBQTtBQWpDRjs7QUFvQ0E7RUFDRSx3QkFBQTtBQWpDRjs7QUFxQ0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0FBbENGOztBQXNDQTtFQUNFLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FBbkNGO0FBcUNFO0VBQ0UsYUFBQTtFQUNBLHFDQUFBO0VBQ0EsU0FBQTtBQW5DSjtBQXNDRTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtBQXBDSjtBQXNDSTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0FBcENOO0FBdUNJO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFyQ047O0FBMkNBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0FBeENGO0FBMENFO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxZQUFBO0FBeENKO0FBMkNFO0VBQ0UsU0FBQTtBQXpDSjs7QUE4Q0E7RUFDRSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7QUEzQ0Y7QUE2Q0U7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0FBM0NKO0FBNkNJO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxTQUFBO0FBM0NOOztBQWlERTtFQUNFLFdBQUE7RUFDQSx1QkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQTlDSjtBQWdESTtFQUNFLGFBQUE7RUFDQSxxQkRsWlc7RUNtWlgsNENBQUE7QUE5Q047O0FBb0RBO0VBQ0UsZUFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG9CQUFBO0VBQ0EsWUFBQTtBQWpERjs7QUFvREE7RUFDRSxvQkFBQTtFQUNBLHFDQUFBO0VBQ0Esa0NBQUE7VUFBQSwwQkFBQTtFQUNBLG9DQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLG1GQUFBO0VBQ0EsYUFBQTtFQUNBLFNBQUE7RUFDQSxxQkFBQTtBQWpERjtBQW1ERTtFQUNFLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FBakRKO0FBb0RFO0VBQ0UsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0FBbERKOztBQXVEQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7QUFwREY7O0FBd0RBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUFyREY7O0FBd0RBO0VBQ0UscUJBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7QUFyREY7QUF1REU7RUFDRSx5QkFBQTtFQUNBLHFCRDFkYTtBQ3FhakI7QUF3REU7RUFDRSx5Q0FBQTtFQUNBLHFCRC9kYTtBQ3lhakI7QUF3REk7RUFDRSxvQkFBQTtBQXRETiIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICBHbG9iYWwgU0NTUyBWYXJpYWJsZXMgLSBCcmFuZCBDb2xvcnNcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4kd2hpdGU6ICNmZmZmZmY7XHJcbiRibGFjazogIzAwMDAwMDtcclxuJHRleHRQcmltYXJ5OiAjMWExYTFhO1xyXG5cclxuLy8gQnJhbmQgQ29sb3JzIChSb3lhbCBCbHVlICYgTmF2eSlcclxuJHByaW1hcnktY29sb3IxOiAjMEU0OUI1OyAvLyBSb3lhbCBCbHVlIChNYWluIFByaW1hcnkpXHJcbiRwcmltYXJ5LWNvbG9yOiAkcHJpbWFyeS1jb2xvcjE7IC8vIEFsaWFzIGZvciBjb25zaXN0ZW5jeVxyXG4kcHJpbWFyeS1jb2xvcjI6ICMxOTI3NTQ7IC8vIE5hdnkgQmx1ZSAoU2Vjb25kYXJ5IC8gRGFyayBQcmltYXJ5KVxyXG4kcHJpbWFyeS1jb2xvcjM6ICM0YjgyZTI7IC8vIExpZ2h0ZXIgQmx1ZSBkZXJpdmF0aXZlXHJcblxyXG4vLyBCcmFuZCBDb2xvcnMgKENyZWFtICYgUmVkKVxyXG4kc2Vjb25kYXJ5LWNvbG9yMTogI0Y0RUNDNTsgLy8gU29mdCBDcmVhbVxyXG4kc2Vjb25kYXJ5LWNvbG9yMjogI2ZmZTBiMjsgLy8gRGVyaXZhdGl2ZVxyXG4kc2Vjb25kYXJ5LWNvbG9yMzogI0ZGMzMzMzsgLy8gQnJpZ2h0IFJlZCAoQWNjZW50KVxyXG5cclxuLy8gRGVzaWduIFRva2VucyAtIEJvcmRlciBSYWRpdXNcclxuJGJvcmRlci1yYWRpdXMtc206IDRweDtcclxuJGJvcmRlci1yYWRpdXMtbWQ6IDhweDtcclxuJGJvcmRlci1yYWRpdXMtbGc6IDEycHg7XHJcbiRib3JkZXItcmFkaXVzLXhsOiAyMHB4O1xyXG4kYm9yZGVyLXJhZGl1cy1waWxsOiA5OTk5cHg7XHJcbiRib3JkZXItcmFkaXVzLWNpcmNsZTogNTAlO1xyXG5cclxuLy8gRGVzaWduIFRva2VucyAtIEJveCBTaGFkb3dcclxuJGJveC1zaGFkb3ctc206IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xyXG4kYm94LXNoYWRvdy1tZDogMCA0cHggNnB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDJweCA0cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMDYpO1xyXG4kYm94LXNoYWRvdy1sZzogMCAxMHB4IDE1cHggLTNweCByZ2JhKDAsIDAsIDAsIDAuMSksIDAgNHB4IDZweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XHJcbiRib3gtc2hhZG93LWNhcmQ6IDAgMnB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjA0KTtcclxuJGJveC1zaGFkb3ctY2FyZC1ob3ZlcjogMCA4cHggMjRweCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xyXG5cclxuLy8gQWNjZW50IENvbG9yc1xyXG4kc2Vjb25kYXJ5LW9mZnNldC1jb2xvcjE6ICNmZmQ2NzQ7XHJcbiRzZWNvbmRhcnktb2Zmc2V0LWNvbG9yMjogI2ZmYzk0NztcclxuJHNlY29uZGFyeS1vZmZzZXQtY29sb3IzOiAjZmZiMzAwO1xyXG5cclxuXHJcbi8vIEdyYXlzICYgQmFja2dyb3VuZHNcclxuJHByaW1hcnktb2Zmc2V0LWNvbG9yMTogI2ZmZmZmZjtcclxuJHByaW1hcnktb2Zmc2V0LWNvbG9yMjogI2E0YTRhNDsgLy8gR3JheSB0ZXh0XHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjM6ICNmM2YzZjM7IC8vIExpZ2h0IGJhY2tncm91bmRcclxuJHByaW1hcnktb2Zmc2V0LWNvbG9yNDogI2VmZWZlZjsgLy8gQ2FyZCBiYWNrZ3JvdW5kXHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjU6IHdoaXRlO1xyXG4kYm9yZGVyLWNvbG9yOiAjZTVlN2ViO1xyXG4kY2FyZC1vZGQ6ICNkZWUyZTY7XHJcbiRiYWNrZ3JvdW5kLWNvbG9yOiAjZjNmM2YzO1xyXG4vLyBUaGVtZSBDb2xvcnMgKE1hdGNoZXMgc3R5bGVzLnNjc3MpXHJcbiRpbmZvLWNvbG9yOiAjYTRhNGE0O1xyXG4kdGV4dC1kYXJrOiAjMWExYTFhO1xyXG4vLyBUaGVtZSBDb2xvcnNcclxuJHByaW1hcnktY29sb3I6ICNlNjI4NDE7XHJcbiRzZWNvbmRhcnktY29sb3I6ICMxNWEyOTI7XHJcbiRiYWNrZHJvcC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQpO1xyXG4vLyBTZW1hbnRpYyBDb2xvcnMgKFN0YW5kYXJkaXplZClcclxuJGNvbG9yLXN1Y2Nlc3M6ICM1MmM0MWE7XHJcbiRjb2xvci1zdWNjZXNzLWJnOiAjZjZmZmVkO1xyXG4kY29sb3Itc3VjY2Vzcy1ib3JkZXI6ICNiN2ViOGY7XHJcblxyXG4kY29sb3Itd2FybmluZzogI2ZhYWQxNDtcclxuJGNvbG9yLXdhcm5pbmctYmc6ICNmZmY3ZTY7XHJcbiRjb2xvci13YXJuaW5nLWJvcmRlcjogI2ZmZTU4ZjtcclxuXHJcbiRjb2xvci1lcnJvcjogI2ZmNGQ0ZjtcclxuJGNvbG9yLWVycm9yLWJnOiAjZmZmMWYwO1xyXG4kY29sb3ItZXJyb3ItYm9yZGVyOiAjZmZjY2M3O1xyXG5cclxuJGNvbG9yLWluZm86ICMxODkwZmY7XHJcbiRjb2xvci1pbmZvLWJnOiAjZTZmN2ZmO1xyXG4kY29sb3ItaW5mby1ib3JkZXI6ICM5MWQ1ZmY7XHJcblxyXG4vLyBDU1MgVmFyaWFibGVzIGZvciBSdW50aW1lIFRoZW1pbmdcclxuOnJvb3Qge1xyXG4gIC0tY29sb3ItcHJpbWFyeTogI3skcHJpbWFyeS1jb2xvcjF9O1xyXG4gIC0tY29sb3Itc2Vjb25kYXJ5OiAjeyRzZWNvbmRhcnktY29sb3IzfTtcclxuICAtLWNvbG9yLWJhY2tncm91bmRHcmV5OiAjeyRiYWNrZ3JvdW5kLWNvbG9yfTtcclxuICAtLWNvbG9yLXRleHQ6ICN7JHRleHRQcmltYXJ5fTtcclxufSIsIkB1c2UgJy9zcmMvc3R5bGVzL3RoZW1lL21peGlucycgYXMgbWl4aW47XHJcbkB1c2UgJy9zcmMvc3R5bGVzL3RoZW1lL3ZhcmlhYmxlJyBhcyB2YXI7XHJcblxyXG4vLyBHZW5lcmFsIENvbnRhaW5lclxyXG4uYWRkLW91dGxldC1jb250YWluZXIge1xyXG4gIHBhZGRpbmc6IDEuNXJlbTtcclxuICBtaW4taGVpZ2h0OiAxMDB2aDtcclxuICBwYWRkaW5nLWJvdHRvbTogMTAwcHg7IC8vIFNwYWNlIGZvciBzdGlja3kgZm9vdGVyXHJcbn1cclxuXHJcbi8vIFBhZ2UgSGVhZGVyIENhcmRcclxuLnBhZ2UtaGVhZGVyLWNhcmQge1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gIGJvcmRlci1yYWRpdXM6IHZhci4kYm9yZGVyLXJhZGl1cy14bDtcclxuICBwYWRkaW5nOiAxcmVtIDEuNXJlbTtcclxuICBib3gtc2hhZG93OiAwIDJweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4wMyk7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjA0KTtcclxuXHJcbiAgLmhlYWRlci1jb250ZW50IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG4gIH1cclxuXHJcbiAgLmhlYWRlci1yaWdodCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogMTJweDtcclxuICB9XHJcblxyXG4gIC5iYWNrLWJ0biB7XHJcbiAgICBjb2xvcjogIzZjNzU3ZDtcclxuICAgIGJhY2tncm91bmQ6ICNmOGY5ZmE7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICB3aWR0aDogNDBweDtcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuICAuaW5mby1idG4ge1xyXG4gICAgY29sb3I6ICM2NDc0OGI7XHJcblxyXG4gICAgJjpob3ZlciB7XHJcbiAgICAgIGNvbG9yOiB2YXIuJHByaW1hcnktY29sb3IxO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLnBhZ2UtdGl0bGUge1xyXG4gICAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgY29sb3I6IHZhci4kcHJpbWFyeS1jb2xvcjI7XHJcbiAgfVxyXG5cclxuICAucGFnZS1zdWJ0aXRsZSB7XHJcbiAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgIGNvbG9yOiAjOWFhMGE2O1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gIH1cclxuXHJcbiAgLnN0YXR1cy1waWxsIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiA2cHg7XHJcbiAgICBwYWRkaW5nOiA2cHggMTZweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICBmb250LXNpemU6IDAuODVyZW07XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG5cclxuICAgICYudmFsaWQge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmZGY0O1xyXG4gICAgICBjb2xvcjogIzE2YTM0YTtcclxuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2JiZjdkMDtcclxuICAgIH1cclxuXHJcbiAgICAmLmludmFsaWQge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmMmYyO1xyXG4gICAgICBjb2xvcjogI2RjMjYyNjtcclxuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2ZlY2FjYTtcclxuICAgIH1cclxuXHJcbiAgICBtYXQtaWNvbiB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgd2lkdGg6IDE4cHg7XHJcbiAgICAgIGhlaWdodDogMThweDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIEluZm8gTWVudSBQYW5lbFxyXG4uaW5mby1tZW51LWNvbnRlbnQge1xyXG4gIHBhZGRpbmc6IDFyZW07XHJcbiAgbWluLXdpZHRoOiAyNTBweDtcclxufVxyXG5cclxuLmluZm8taGVhZGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiA4cHg7XHJcbiAgcGFkZGluZy1ib3R0b206IDhweDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UyZThmMDtcclxuXHJcbiAgbWF0LWljb24ge1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgd2lkdGg6IDE4cHg7XHJcbiAgICBoZWlnaHQ6IDE4cHg7XHJcbiAgICBjb2xvcjogI2Y1OWUwYjtcclxuICB9XHJcblxyXG4gIHNwYW4ge1xyXG4gICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjMWUyOTNiO1xyXG4gIH1cclxufVxyXG5cclxuLmluZm8tbGlzdCB7XHJcbiAgbGlzdC1zdHlsZTogbm9uZTtcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZzogOHB4IDAgMDtcclxuXHJcbiAgbGkge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDhweDtcclxuICAgIHBhZGRpbmc6IDZweCAwO1xyXG4gICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICBjb2xvcjogIzQ3NTU2OTtcclxuXHJcbiAgICBtYXQtaWNvbiB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgd2lkdGg6IDE2cHg7XHJcbiAgICAgIGhlaWdodDogMTZweDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICYucmVxdWlyZWQgbGkgbWF0LWljb24ge1xyXG4gICAgY29sb3I6ICMyMmM1NWU7XHJcbiAgfVxyXG5cclxuICAmLnJlY29tbWVuZGVkIGxpIG1hdC1pY29uIHtcclxuICAgIGNvbG9yOiAjM2I4MmY2O1xyXG4gIH1cclxufVxyXG5cclxuLy8gTW9kZXJuIENhcmRzXHJcbi5tb2Rlcm4tY2FyZCB7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcclxuICBib3gtc2hhZG93OiAwIDRweCA2cHggcmdiYSgwLCAwLCAwLCAwLjAyKTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZWRmMmY3O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcclxuXHJcbiAgLmNhcmQtaGVhZGVyIHtcclxuICAgIHBhZGRpbmc6IDEuMjVyZW0gMS41cmVtO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMWY1Zjk7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogMXJlbTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG5cclxuICAgICYud2l0aC1hY3Rpb25zIHtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgfVxyXG5cclxuICAgIGgzIHtcclxuICAgICAgZm9udC1zaXplOiAxLjFyZW07XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICAgIGNvbG9yOiAjMmQzNzQ4O1xyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLmljb24tYm94IHtcclxuICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblxyXG4gICAgICBtYXQtaWNvbiB7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgICAgIHdpZHRoOiAyMHB4O1xyXG4gICAgICAgIGhlaWdodDogMjBweDtcclxuICAgICAgfVxyXG5cclxuICAgICAgJi5wcmltYXJ5IHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhci4kcHJpbWFyeS1jb2xvcjEsIDAuMSk7XHJcbiAgICAgICAgY29sb3I6IHZhci4kcHJpbWFyeS1jb2xvcjE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICYuc2Vjb25kYXJ5IHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhci4kc2Vjb25kYXJ5LWNvbG9yMywgMC4xKTtcclxuICAgICAgICBjb2xvcjogdmFyLiRzZWNvbmRhcnktY29sb3IzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAmLmluZm8ge1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICNlMGYyZmU7XHJcbiAgICAgICAgY29sb3I6ICMwMjg0Yzc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICYud2FybmluZyB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogI2ZlZjNjNztcclxuICAgICAgICBjb2xvcjogI2Q5NzcwNjtcclxuICAgICAgfVxyXG5cclxuICAgICAgJi5zdWNjZXNzIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjZGNmY2U3O1xyXG4gICAgICAgIGNvbG9yOiAjMTZhMzRhO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAmLnB1cnBsZSB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogI2YzZThmZjtcclxuICAgICAgICBjb2xvcjogIzkzMzNlYTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmNhcmQtYm9keSB7XHJcbiAgICBwYWRkaW5nOiAxLjVyZW07XHJcbiAgfVxyXG59XHJcblxyXG4vLyBDdXN0b20gRm9ybSBGaWVsZHNcclxuLmN1c3RvbS1maWVsZCB7XHJcbiAgOjpuZy1kZWVwIC5tYXQtbWRjLWZvcm0tZmllbGQtZmxleCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG4gIH1cclxufVxyXG5cclxuLy8gVXBsb2FkIFNlY3Rpb25cclxuLnVwbG9hZC13cmFwcGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbn1cclxuXHJcbi5pbWFnZS11cGxvYWQtYm94IHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgd2lkdGg6IDE2MHB4O1xyXG4gIGhlaWdodDogMTYwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcclxuICBib3JkZXI6IDJweCBkYXNoZWQgI2UyZThmMDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICBib3JkZXItY29sb3I6IHZhci4kcHJpbWFyeS1jb2xvcjE7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhci4kcHJpbWFyeS1jb2xvcjEsIDAuMDIpO1xyXG4gIH1cclxuXHJcbiAgJi5oYXMtaW1hZ2Uge1xyXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcclxuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG4ucHJldmlldy1pbWFnZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xyXG59XHJcblxyXG4ucGxhY2Vob2xkZXItY29udGVudCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGNvbG9yOiAjOTRhM2I4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMC41cmVtO1xyXG5cclxuICBtYXQtaWNvbiB7XHJcbiAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB3aWR0aDogNDBweDtcclxuICAgIG9wYWNpdHk6IDAuNTtcclxuICB9XHJcblxyXG4gIHNwYW4ge1xyXG4gICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICB9XHJcbn1cclxuXHJcbi51cGxvYWQtb3ZlcmxheSB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGJvdHRvbTogMDtcclxuICBsZWZ0OiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC42KTtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgcGFkZGluZzogMC41cmVtO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LXNpemU6IDAuNzVyZW07XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwMCUpO1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2U7XHJcbn1cclxuXHJcbi5pbWFnZS11cGxvYWQtYm94OmhvdmVyIC51cGxvYWQtb3ZlcmxheSB7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xyXG59XHJcblxyXG4vLyBTd2l0Y2hlcyAmIFRvZ2dsZXNcclxuLnN3aXRjaC1ncm91cCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMC43NXJlbTtcclxufVxyXG5cclxuLy8gU2VsZWN0ZWQgQ2FmZSBJbmZvIHN0eWxlc1xyXG4uc2VsZWN0ZWQtY2FmZS1pbmZvIHtcclxuICBiYWNrZ3JvdW5kOiAjZjBmZGY0O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNiYmY3ZDA7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBwYWRkaW5nOiAxLjI1cmVtO1xyXG5cclxuICAuaW5mby1ncmlkIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG4gIH1cclxuXHJcbiAgLmluZm8taXRlbSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHJcbiAgICAubGFiZWwge1xyXG4gICAgICBmb250LXNpemU6IDAuN3JlbTtcclxuICAgICAgY29sb3I6ICMxNmEzNGE7XHJcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICAgIGxldHRlci1zcGFjaW5nOiAwLjA1ZW07XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDAuMjVyZW07XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICB9XHJcblxyXG4gICAgLnZhbHVlIHtcclxuICAgICAgZm9udC1zaXplOiAwLjk1cmVtO1xyXG4gICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgICBjb2xvcjogIzE2NjUzNDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIEVtcHR5IFBsYWNlaG9sZGVyXHJcbi5lbXB0eS1wbGFjZWhvbGRlciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgcGFkZGluZzogM3JlbSAwO1xyXG4gIGNvbG9yOiAjOTRhM2I4O1xyXG5cclxuICBtYXQtaWNvbiB7XHJcbiAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICB3aWR0aDogNDBweDtcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcclxuICAgIG9wYWNpdHk6IDAuNTtcclxuICB9XHJcblxyXG4gIHAge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gIH1cclxufVxyXG5cclxuLy8gTWVhbCBUaW1pbmdcclxuLm1lYWwtdGltaW5nLWNhcmQge1xyXG4gIGJhY2tncm91bmQ6ICNmOGZhZmM7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2UyZThmMDtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIHBhZGRpbmc6IDFyZW07XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG5cclxuICAudGltaW5nLWhlYWRlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIG1hcmdpbi1ib3R0b206IDAuNzVyZW07XHJcblxyXG4gICAgaDQge1xyXG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgY29sb3I6ICM2NDc0OGI7XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi50aW1lLWlucHV0LXN0eWxlZCB7XHJcbiAgaW5wdXRbdHlwZT1cInRpbWVcIl0ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBwYWRkaW5nOiAwLjZyZW0gMC43NXJlbTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcclxuICAgIGNvbG9yOiAjMWUyOTNiO1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBmb250LXNpemU6IDAuOXJlbTtcclxuXHJcbiAgICAmOmZvY3VzIHtcclxuICAgICAgb3V0bGluZTogbm9uZTtcclxuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIuJHByaW1hcnktY29sb3IxO1xyXG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSh2YXIuJHByaW1hcnktY29sb3IxLCAwLjEpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gU3RpY2t5IEFjdGlvbiBCYXJcclxuLmFjdGlvbi1iYXItY29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgYm90dG9tOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICB6LWluZGV4OiAxMDA7XHJcbn1cclxuXHJcbi5hY3Rpb24tYmFyIHtcclxuICBwb2ludGVyLWV2ZW50czogYXV0bztcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOTUpO1xyXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig4cHgpO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICBwYWRkaW5nOiAwLjc1cmVtIDEuNXJlbTtcclxuICBib3JkZXItcmFkaXVzOiA1MHB4O1xyXG4gIGJveC1zaGFkb3c6IDAgMTBweCAyNXB4IC01cHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDhweCAxMHB4IC02cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAxcmVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDEuNHJlbTtcclxuXHJcbiAgLmJ0bi1zdWJtaXQge1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcclxuICAgIHBhZGRpbmc6IDAgMnJlbTtcclxuICAgIGhlaWdodDogNDRweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbiAgfVxyXG5cclxuICAuYnRuLWNhbmNlbCB7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xyXG4gICAgaGVpZ2h0OiA0NHB4O1xyXG4gICAgcGFkZGluZzogMCAxLjVyZW07XHJcbiAgICBjb2xvcjogIzY0NzQ4YjtcclxuICB9XHJcbn1cclxuXHJcbi8vIEFjdGlvbiBCdXR0b24gaW4gY2FyZCBoZWFkZXJzXHJcbi5hY3Rpb24tYnRuIHtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxufVxyXG5cclxuLy8gT3JnYW5pemF0aW9uIExpc3QgRGlhbG9nXHJcbi5vcmctbGlzdCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMC41cmVtO1xyXG4gIG1heC1oZWlnaHQ6IDQwMHB4O1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbn1cclxuXHJcbi5vcmctaXRlbSB7XHJcbiAgcGFkZGluZzogMC43NXJlbSAxcmVtO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcblxyXG4gICY6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZmFmYztcclxuICAgIGJvcmRlci1jb2xvcjogdmFyLiRwcmltYXJ5LWNvbG9yMTtcclxuICB9XHJcblxyXG4gICYuc2VsZWN0ZWQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIuJHByaW1hcnktY29sb3IxLCAwLjA0KTtcclxuICAgIGJvcmRlci1jb2xvcjogdmFyLiRwcmltYXJ5LWNvbG9yMTtcclxuXHJcbiAgICBtYXQtcmFkaW8tYnV0dG9uIHtcclxuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB9XHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 51466:
/*!********************************************************!*\
  !*** ./src/app/outlet/add-outlet/add-outlet.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddOutletModule: () => (/* binding */ AddOutletModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _add_outlet_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-outlet.component */ 42472);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _add_outlet_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add-outlet-routing.module */ 11103);
/* harmony import */ var src_app_material_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/material.module */ 29099);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);






class AddOutletModule {
  static #_ = this.ɵfac = function AddOutletModule_Factory(t) {
    return new (t || AddOutletModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: AddOutletModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _add_outlet_routing_module__WEBPACK_IMPORTED_MODULE_1__.AddOutletRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_2__.MaterialModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AddOutletModule, {
    declarations: [_add_outlet_component__WEBPACK_IMPORTED_MODULE_0__.AddOutletComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _add_outlet_routing_module__WEBPACK_IMPORTED_MODULE_1__.AddOutletRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_2__.MaterialModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_outlet_add-outlet_add-outlet_module_ts.js.map