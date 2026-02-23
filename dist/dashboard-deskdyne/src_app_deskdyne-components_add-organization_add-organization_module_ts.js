"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_deskdyne-components_add-organization_add-organization_module_ts"],{

/***/ 59681:
/*!*****************************************************************************************!*\
  !*** ./src/app/deskdyne-components/add-organization/add-organization-routing.module.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddOrganizationRoutingModule: () => (/* binding */ AddOrganizationRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _add_organization_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-organization.component */ 37905);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _add_organization_component__WEBPACK_IMPORTED_MODULE_0__.AddOrganizationComponent
}];
class AddOrganizationRoutingModule {
  static #_ = this.ɵfac = function AddOrganizationRoutingModule_Factory(t) {
    return new (t || AddOrganizationRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: AddOrganizationRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AddOrganizationRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 37905:
/*!************************************************************************************!*\
  !*** ./src/app/deskdyne-components/add-organization/add-organization.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddOrganizationComponent: () => (/* binding */ AddOrganizationComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var src_app_image_cropper_image_cropper_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/image-cropper/image-cropper.component */ 58922);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ 20553);
/* harmony import */ var src_shared_constants_regex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/shared/constants/regex */ 61253);
/* harmony import */ var src_app_set_geolocation_set_geolocation_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/set-geolocation/set-geolocation.component */ 53026);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var src_service_policy_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/service/policy.service */ 64294);
/* harmony import */ var src_service_google_map_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/service/google-map.service */ 79808);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/dialog */ 17401);
/* harmony import */ var src_service_runtime_storage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/service/runtime-storage.service */ 24235);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var src_service_toaster_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/service/toaster.service */ 19586);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/menu */ 78128);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/checkbox */ 56658);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/slide-toggle */ 59293);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/radio */ 92106);
/* harmony import */ var _shared_directives_common_directives_directive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../shared/directives/common-directives.directive */ 50016);
/* harmony import */ var _shared_directives_auto_tooltip_directive__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/directives/auto-tooltip.directive */ 53183);





























const _c0 = ["content"];
const _c1 = ["pocContent"];
const _c2 = ["pocDialogTemplate"];
const _c3 = ["cafeteriaDialogTemplate"];
function AddOrganizationComponent_img_83_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "img", 69);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("src", ctx_r2.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsanitizeUrl"]);
  }
}
function AddOrganizationComponent_div_84_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 70)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2, "cloud_upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4, "Upload Logo");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
}
function AddOrganizationComponent_mat_error_113_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function AddOrganizationComponent_mat_error_119_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function AddOrganizationComponent_mat_error_125_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function AddOrganizationComponent_mat_error_126_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "Invalid GSTIN");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function AddOrganizationComponent_div_127_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 35)(1, "div", 71)(2, "mat-form-field", 36)(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4, "Org Subsidy (%)");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](5, "input", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "button", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_div_127_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r29);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r28.updateOrglevelSubsidy());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](8, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
  }
}
function AddOrganizationComponent_mat_error_142_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function AddOrganizationComponent_mat_error_148_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function AddOrganizationComponent_mat_error_156_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function AddOrganizationComponent_mat_error_182_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-error", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, " *At least one POC is required. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function AddOrganizationComponent_div_183_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 75)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2, "person_off");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4, "No POCs added. Please add at least one.");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
}
function AddOrganizationComponent_div_185_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 87)(1, "mat-icon", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2, "verified_user");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "span", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4, "Approver:");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "span", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const control_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"]((tmp_0_0 = control_r30.get("approverDetails")) == null ? null : tmp_0_0.value == null ? null : tmp_0_0.value.approver_name);
  }
}
function AddOrganizationComponent_div_185_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 76)(1, "div", 77)(2, "div")(3, "h5", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "small", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "div", 80)(8, "span", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](10, "span", 82)(11, "mat-icon", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](12, "email");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](14, "span", 82)(15, "mat-icon", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](16, "phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](18, "span", 82)(19, "mat-icon", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](20, "place");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](22, AddOrganizationComponent_div_185_div_22_Template, 7, 1, "div", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](23, "div", 71)(24, "button", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_div_185_Template_button_click_24_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r35);
      const i_r31 = restoredCtx.index;
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r34.openPocDialog(i_r31));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](25, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](26, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](27, "button", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_div_185_Template_button_click_27_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r35);
      const i_r31 = restoredCtx.index;
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r36.deletePoc(i_r31));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](28, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](29, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const control_r30 = ctx.$implicit;
    let tmp_0_0;
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", (tmp_0_0 = control_r30.get("poc_name")) == null ? null : tmp_0_0.value, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"]("(ID: ", (tmp_1_0 = control_r30.get("poc_id")) == null ? null : tmp_1_0.value, ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"]((tmp_2_0 = control_r30.get("poc_role")) == null ? null : tmp_2_0.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", (tmp_3_0 = control_r30.get("poc_email")) == null ? null : tmp_3_0.value, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", (tmp_4_0 = control_r30.get("poc_phoneNo")) == null ? null : tmp_4_0.value, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", (tmp_5_0 = control_r30.get("poc_location")) == null ? null : tmp_5_0.value, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", (tmp_6_0 = control_r30.get("approverDetails")) == null ? null : tmp_6_0.value == null ? null : tmp_6_0.value.approver_name);
  }
}
function AddOrganizationComponent_mat_error_199_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-error", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, " *At least one Cafeteria is required. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function AddOrganizationComponent_div_200_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 75)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2, "storefront");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4, "No Cafeterias added. Please add at least one.");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
}
function AddOrganizationComponent_div_202_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 101)(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2, "POC:");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const cafe_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", (tmp_0_0 = cafe_r37.get("poc_details")) == null ? null : tmp_0_0.value == null ? null : tmp_0_0.value.poc_name, " ");
  }
}
function AddOrganizationComponent_div_202_ng_container_23_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const opt_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", opt_r44.label, " ");
  }
}
function AddOrganizationComponent_div_202_ng_container_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, AddOrganizationComponent_div_202_ng_container_23_span_1_Template, 2, 1, "span", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const opt_r44 = ctx.$implicit;
    const cafe_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", (tmp_0_0 = cafe_r37.get(opt_r44.key)) == null ? null : tmp_0_0.value);
  }
}
function AddOrganizationComponent_div_202_div_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r50 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "input", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "button", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_div_202_div_25_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r50);
      const i_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().index;
      const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r48.updateCafelevelSubsidy(i_r38));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const cafe_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("formControl", cafe_r37.get("subsidy"));
  }
}
function AddOrganizationComponent_div_202_button_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r54 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "button", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_div_202_button_29_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r54);
      const i_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().index;
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r52.deleteCafeteria(i_r38));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
}
function AddOrganizationComponent_div_202_Template(rf, ctx) {
  if (rf & 1) {
    const _r56 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 76)(1, "div", 91)(2, "div")(3, "h5", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "small", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "div", 92)(8, "span", 82)(9, "mat-icon", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](10, "location_city");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](12, "span", 82)(13, "mat-icon", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](14, "place");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](16, "span", 82)(17, "mat-icon", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](18, "map");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](20, AddOrganizationComponent_div_202_div_20_Template, 4, 1, "div", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](21, "div", 94)(22, "div", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](23, AddOrganizationComponent_div_202_ng_container_23_Template, 2, 1, "ng-container", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](24, "div", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](25, AddOrganizationComponent_div_202_div_25_Template, 5, 1, "div", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](26, "button", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_div_202_Template_button_click_26_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r56);
      const i_r38 = restoredCtx.index;
      const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r55.openCafeteriaDialog(i_r38));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](27, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](28, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](29, AddOrganizationComponent_div_202_button_29_Template, 3, 0, "button", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const cafe_r37 = ctx.$implicit;
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    let tmp_0_0;
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_8_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", (tmp_0_0 = cafe_r37.get("cafeteria_name")) == null ? null : tmp_0_0.value, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"]("(", (tmp_1_0 = cafe_r37.get("cafeteria_id")) == null ? null : tmp_1_0.value, ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", (tmp_2_0 = cafe_r37.get("cafeteria_city")) == null ? null : tmp_2_0.value, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", (tmp_3_0 = cafe_r37.get("location")) == null ? null : tmp_3_0.value, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", (tmp_4_0 = cafe_r37.get("address1")) == null ? null : tmp_4_0.value, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", (tmp_5_0 = cafe_r37.get("poc_details")) == null ? null : tmp_5_0.value == null ? null : tmp_5_0.value.poc_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", ctx_r17.checkboxOptions);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r17.showUpdate);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !((tmp_8_0 = cafe_r37.get("isExisting")) == null ? null : tmp_8_0.value));
  }
}
function AddOrganizationComponent_button_207_Template(rf, ctx) {
  if (rf & 1) {
    const _r58 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "button", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_button_207_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r58);
      const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r57.updateOrg());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3, " Update Organization ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("disabled", ctx_r18.form.invalid || ctx_r18.poc.length === 0 || ctx_r18.cafeteria.length === 0);
  }
}
function AddOrganizationComponent_button_208_Template(rf, ctx) {
  if (rf & 1) {
    const _r60 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "button", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_button_208_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r60);
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r59.addOrg());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2, "check_circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3, " Create Organization ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("disabled", ctx_r19.form.invalid || ctx_r19.poc.length === 0 || ctx_r19.cafeteria.length === 0);
  }
}
function AddOrganizationComponent_ng_template_209_mat_error_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function AddOrganizationComponent_ng_template_209_mat_error_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function AddOrganizationComponent_ng_template_209_mat_error_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function AddOrganizationComponent_ng_template_209_mat_error_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function AddOrganizationComponent_ng_template_209_mat_error_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function AddOrganizationComponent_ng_template_209_mat_option_55_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-option", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r70 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", item_r70);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](item_r70);
  }
}
function AddOrganizationComponent_ng_template_209_mat_error_56_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function AddOrganizationComponent_ng_template_209_div_60_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, " Note: You need at least 2 POCs in the list to assign one as an approver. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function AddOrganizationComponent_ng_template_209_div_61_Template(rf, ctx) {
  if (rf & 1) {
    const _r72 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 114)(1, "div", 115)(2, "mat-form-field", 36)(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4, "Approver Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](5, "input", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "div", 135)(7, "button", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_ng_template_209_div_61_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r72);
      const ctx_r71 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r71.openApproverSelectDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](8, "Select Approver");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](9, "button", 137);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_ng_template_209_div_61_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r72);
      const ctx_r73 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r73.removeApproverInDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](10, "Clear");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
  }
}
function AddOrganizationComponent_ng_template_209_Template(rf, ctx) {
  if (rf & 1) {
    const _r75 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 110)(1, "h2", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "button", 112)(4, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "mat-dialog-content", 113)(7, "div", 114)(8, "div", 115)(9, "label", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](10, "POC ID ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](11, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](12, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](13, "mat-form-field", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](14, "input", 118);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](15, AddOrganizationComponent_ng_template_209_mat_error_15_Template, 2, 0, "mat-error", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](16, "div", 115)(17, "label", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](18, "Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](19, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](20, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](21, "mat-form-field", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](22, "input", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](23, AddOrganizationComponent_ng_template_209_mat_error_23_Template, 2, 0, "mat-error", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](24, "div", 115)(25, "label", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](26, "Phone ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](27, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](28, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](29, "mat-form-field", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](30, "input", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](31, AddOrganizationComponent_ng_template_209_mat_error_31_Template, 2, 0, "mat-error", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](32, "div", 115)(33, "label", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](34, "Email ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](35, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](36, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](37, "mat-form-field", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](38, "input", 121);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](39, AddOrganizationComponent_ng_template_209_mat_error_39_Template, 2, 0, "mat-error", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](40, "div", 115)(41, "label", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](42, "Location ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](43, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](44, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](45, "mat-form-field", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](46, "input", 122);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](47, AddOrganizationComponent_ng_template_209_mat_error_47_Template, 2, 0, "mat-error", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](48, "div", 115)(49, "label", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](50, "Role ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](51, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](52, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](53, "mat-form-field", 36)(54, "mat-select", 123);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](55, AddOrganizationComponent_ng_template_209_mat_option_55_Template, 2, 2, "mat-option", 124);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](56, AddOrganizationComponent_ng_template_209_mat_error_56_Template, 2, 0, "mat-error", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](57, "div", 125)(58, "h4", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](59, "Approver Details (Optional)");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](60, AddOrganizationComponent_ng_template_209_div_60_Template, 2, 0, "div", 127);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](61, AddOrganizationComponent_ng_template_209_div_61_Template, 11, 0, "div", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](62, "mat-dialog-actions", 129)(63, "button", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](64, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](65, "button", 131);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_ng_template_209_Template_button_click_65_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r75);
      const ctx_r74 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r74.savePocFromDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](66, "Save POC");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r21.editingPocIndex !== null ? "Edit POC" : "Add New POC");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("formGroup", ctx_r21.pocFormGroup);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r21.hasError(ctx_r21.pocFormGroup, "poc_id", "required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r21.hasError(ctx_r21.pocFormGroup, "poc_name", "required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r21.hasError(ctx_r21.pocFormGroup, "poc_phoneNo", "required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r21.hasError(ctx_r21.pocFormGroup, "poc_email", "required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r21.hasError(ctx_r21.pocFormGroup, "poc_location", "required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", ctx_r21.roleList);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r21.hasError(ctx_r21.pocFormGroup, "poc_role", "required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r21.filledPocCount + (ctx_r21.editingPocIndex === null ? 1 : 0) < 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r21.filledPocCount + (ctx_r21.editingPocIndex === null ? 1 : 0) >= 2);
  }
}
function AddOrganizationComponent_ng_template_211_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div")(1, "mat-checkbox", 160);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r79 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("formControlName", item_r79.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](item_r79.label);
  }
}
function AddOrganizationComponent_ng_template_211_mat_option_98_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-option", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const p_r80 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", p_r80);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate2"](" ", p_r80.poc_name, " (", p_r80.poc_role, ") ");
  }
}
function AddOrganizationComponent_ng_template_211_div_99_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 115)(1, "div", 161)(2, "div")(3, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4, "Selected:");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "div", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r78 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    let tmp_0_0;
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", (tmp_0_0 = ctx_r78.cafeteriaFormGroup.get("poc_details.poc_name")) == null ? null : tmp_0_0.value, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"]("Phone: ", (tmp_1_0 = ctx_r78.cafeteriaFormGroup.get("poc_details.poc_phoneNo")) == null ? null : tmp_1_0.value, "");
  }
}
function AddOrganizationComponent_ng_template_211_Template(rf, ctx) {
  if (rf & 1) {
    const _r82 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 110)(1, "h2", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "button", 112)(4, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "mat-dialog-content", 113)(7, "div", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](8, AddOrganizationComponent_ng_template_211_div_8_Template, 3, 2, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](9, "div", 114)(10, "div", 139)(11, "label", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](12, "Cafeteria ID ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](13, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](14, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](15, "mat-form-field", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](16, "input", 140);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](17, "div", 139)(18, "label", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](19, "Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](20, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](21, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](22, "mat-form-field", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](23, "input", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](24, "div", 139)(25, "label", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](26, "City ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](27, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](28, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](29, "mat-form-field", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](30, "input", 142);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](31, "div", 139)(32, "label", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](33, "Location ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](34, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](35, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](36, "mat-form-field", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](37, "input", 143);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](38, "div", 139)(39, "label", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](40, "Landmark ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](41, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](42, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](43, "mat-form-field", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](44, "input", 144);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](45, "div", 139)(46, "label", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](47, "Access Code");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](48, "mat-form-field", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](49, "input", 145);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](50, "div", 139)(51, "label", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](52, "GSTIN");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](53, "mat-form-field", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](54, "input", 146);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](55, "div", 147)(56, "mat-checkbox", 148);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("change", function AddOrganizationComponent_ng_template_211_Template_mat_checkbox_change_56_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r82);
      const ctx_r81 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r81.getOrgGstinInDialog($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](57, "Same as Org GSTIN");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](58, "div", 149)(59, "div", 115)(60, "label", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](61, "Address 1 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](62, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](63, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](64, "mat-form-field", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](65, "input", 150);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](66, "div", 115)(67, "label", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](68, "Address 2 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](69, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](70, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](71, "mat-form-field", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](72, "input", 151);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](73, "div", 152)(74, "div", 139)(75, "mat-form-field", 36)(76, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](77, "Latitude");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](78, "input", 153);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](79, "div", 139)(80, "mat-form-field", 36)(81, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](82, "Longitude");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](83, "input", 154);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](84, "div", 139)(85, "button", 155);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_ng_template_211_Template_button_click_85_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r82);
      const ctx_r83 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r83.toggleMapForDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](86, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](87, "map");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](88, " Pick Location ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](89, "div", 156)(90, "h4", 157);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](91, "Assign POC to Cafeteria");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](92, "div", 34)(93, "div", 115)(94, "mat-form-field", 36)(95, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](96, "Select POC");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](97, "mat-select", 158);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("selectionChange", function AddOrganizationComponent_ng_template_211_Template_mat_select_selectionChange_97_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r82);
      const ctx_r84 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r84.onCafePocSelectionChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](98, AddOrganizationComponent_ng_template_211_mat_option_98_Template, 2, 3, "mat-option", 124);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](99, AddOrganizationComponent_ng_template_211_div_99_Template, 8, 2, "div", 159);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](100, "mat-dialog-actions", 129)(101, "button", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](102, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](103, "button", 131);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_ng_template_211_Template_button_click_103_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r82);
      const ctx_r85 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r85.saveCafeteriaFromDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](104, "Save Cafeteria");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    let tmp_6_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r23.editingCafeIndex !== null ? "Edit Cafeteria" : "Add New Cafeteria");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("formGroup", ctx_r23.cafeteriaFormGroup);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", ctx_r23.checkboxOptions);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](89);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", ctx_r23.currentCafePocId)("compareWith", ctx_r23.comparePocs);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", ctx_r23.availablePocs);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", (tmp_6_0 = ctx_r23.cafeteriaFormGroup.get("poc_details")) == null ? null : tmp_6_0.value == null ? null : tmp_6_0.value.poc_name);
  }
}
function AddOrganizationComponent_ng_template_213_ng_container_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r91 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 166)(1, "mat-radio-button", 167);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("change", function AddOrganizationComponent_ng_template_213_ng_container_8_div_1_Template_mat_radio_button_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r91);
      const ctx_r90 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r90.pushAdmin($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "div", 97)(3, "span", 168);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "span", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const admin_r87 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", admin_r87);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](admin_r87.poc_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"]("(", admin_r87.poc_role, ")");
  }
}
function AddOrganizationComponent_ng_template_213_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, AddOrganizationComponent_ng_template_213_ng_container_8_div_1_Template, 7, 3, "div", 165);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const i_r88 = ctx.index;
    const ctx_r86 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", i_r88 !== ctx_r86.editingPocIndex);
  }
}
function AddOrganizationComponent_ng_template_213_Template(rf, ctx) {
  if (rf & 1) {
    const _r94 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 110)(1, "h2", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2, "Select Approver");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "button", 112)(4, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "mat-dialog-content", 162)(7, "mat-radio-group", 163);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ngModelChange", function AddOrganizationComponent_ng_template_213_Template_mat_radio_group_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r94);
      const ctx_r93 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r93.selectedApprover = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](8, AddOrganizationComponent_ng_template_213_ng_container_8_Template, 2, 1, "ng-container", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](9, "mat-dialog-actions", 129)(10, "button", 164);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](11, "Confirm Selection");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngModel", ctx_r25.selectedApprover);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", ctx_r25.poc.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("mat-dialog-close", "add")("disabled", !ctx_r25.selectedApprover);
  }
}
function AddOrganizationComponent_ng_template_215_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 110)(1, "h2", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2, "Alert");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "button", 112)(4, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "mat-dialog-content", 162)(7, "p", 169);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](9, "mat-dialog-actions", 129)(10, "button", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](11, "Close");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const data_r95 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](data_r95 == null ? null : data_r95.message);
  }
}
class AddOrganizationComponent {
  constructor(apiMainService, policyService, googleMapService, chgDetRef, dialog, runtimeStorageService, router, fb, toaster) {
    this.apiMainService = apiMainService;
    this.policyService = policyService;
    this.googleMapService = googleMapService;
    this.chgDetRef = chgDetRef;
    this.dialog = dialog;
    this.runtimeStorageService = runtimeStorageService;
    this.router = router;
    this.fb = fb;
    this.toaster = toaster;
    this.showUpdate = false;
    this.adminSelected = [];
    this.roleList = ['poc', 'admin'];
    this.showError = false;
    this.orgSubsidy = 0;
    this.domainList = [];
    this.showDelete = false;
    this.panelOpenState = false;
    // Dialog State Management
    this.activeDialogRef = null;
    this.editingPocIndex = null;
    this.editingCafeIndex = null;
    this.checkboxOptions = [{
      key: 'showAdminDaily',
      label: 'Show Admin Daily Card'
    }, {
      key: 'showEmpPolls',
      label: 'Show Emp Poll Card'
    }, {
      key: 'showVirtualCafe',
      label: 'Show Virtual Cafeteria'
    }, {
      key: 'showSaas',
      label: 'Show Outlet'
    }, {
      key: 'showQrCode',
      label: 'Show Qr Code'
    }, {
      key: 'showCompanyWallet',
      label: 'Show Company Wallet'
    }, {
      key: 'showComplienceTracker',
      label: 'Show Compliance Tracker'
    }, {
      key: 'showConsumptionOrder',
      label: 'Show Consumption Order'
    }, {
      key: 'isEmployeeEmailLogin',
      label: 'Is Employee Email Login'
    }, {
      key: 'showSiteExecutive',
      label: 'Show Site Executive'
    }, {
      key: 'showchecklist',
      label: 'Show Checklist'
    }, {
      key: 'showEventPopup',
      label: 'Show Event Popup'
    }, {
      key: 'showSodexo',
      label: 'Show Sodexo'
    }, {
      key: 'showEmployeeBulkMenu',
      label: 'Show Employee Bulk Menu'
    }];
    this.selectedOption = null;
    this.form = this.fb.group({
      organization_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.maxLength(250)]],
      location: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required],
      domain: [''],
      city: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required],
      gstin: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.pattern(src_shared_constants_regex__WEBPACK_IMPORTED_MODULE_3__.REGEX.GSTIN)]],
      poc_details: this.fb.array([], this.minArrayLength(1)),
      org_address: this.fb.group({
        addressLine1: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.minLength(5)]],
        addressLine2: ['', []],
        addressLine3: ['', []] // Landmark field
      }),

      cafeteriaList: this.fb.array([], this.minArrayLength(1)),
      subsidy: [0, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.pattern(src_shared_constants_regex__WEBPACK_IMPORTED_MODULE_3__.REGEX.SUBSIDY)]],
      isEmpIdRequired: [true, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required]
    });
    // Initialize detached forms for dialogs
    this.pocFormGroup = this.new_poc_details();
    this.cafeteriaFormGroup = this.new_cafeteria();
    // Re-enable controls if they are disabled in new_poc_details
    // In new_poc_details, approverDetails controls are disabled initially
    // We might need them enabled for editing
  }

  minArrayLength(min) {
    return control => {
      const array = control;
      return array && array.length >= min ? null : {
        minLengthArray: true
      };
    };
  }
  ngOnInit() {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    const cacheOrg = this.runtimeStorageService.getCacheData('VIEW_ORG');
    if (cacheOrg && cacheOrg._id) {
      this.viewOrg = cacheOrg;
      this.showUpdate = true;
      this.patchFormValue(cacheOrg);
    }
  }
  get poc() {
    return this.form.get('poc_details');
  }
  get cafeteria() {
    return this.form.get('cafeteriaList');
  }
  // Available POCs for Select Dropdown (Excludes current POC if valid)
  get availablePocs() {
    return this.poc.value;
  }
  new_cafeteria(isExisting = false) {
    let id = Math.floor(Math.random() * 1000000000);
    return this.fb.group({
      isExisting: [isExisting],
      accessCode: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.maxLength(4), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.pattern(src_shared_constants_regex__WEBPACK_IMPORTED_MODULE_3__.REGEX.ACCESS_CODE)]],
      showAdminDaily: [false],
      showEmpPolls: [false],
      showVirtualCafe: [false],
      showSaas: [false],
      showQrCode: [false],
      showSiteExecutive: [false],
      showCompanyWallet: [false],
      showchecklist: [false],
      isEmployeeEmailLogin: [false],
      showComplienceTracker: [false],
      showConsumptionOrder: [false],
      showEventPopup: [false],
      showEmployeeBulkMenu: [false],
      showSodexo: [false],
      cafeteria_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.maxLength(250)]],
      cafeteria_id: [id, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required],
      cafeteria_city: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required],
      cafeteria_gstin: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.pattern(src_shared_constants_regex__WEBPACK_IMPORTED_MODULE_3__.REGEX.GSTIN)],
      cafeteria_location: this.fb.group({
        lat: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required],
        lng: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required]
      }),
      clusterId: [''],
      clusterName: [''],
      address1: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.minLength(5)]],
      address2: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.minLength(5)]],
      landmark: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.maxLength(80)]],
      location: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required],
      subsidy: [0, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100)]],
      poc_details: this.fb.group({
        poc_id: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required],
        poc_name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required],
        poc_phoneNo: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required],
        poc_email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required],
        poc_location: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required],
        poc_role: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required],
        approverPriceLimit: [''],
        approverCountLimit: [''],
        approverDetails: this.fb.group({
          approver_id: [''],
          approver_name: [''],
          approver_phoneNo: [''],
          approver_email: [''],
          approver_location: [''],
          approver_role: ['']
        })
      })
    });
  }
  new_poc_details() {
    return this.fb.group({
      poc_id: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required],
      poc_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.maxLength(80)]],
      poc_phoneNo: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.pattern(src_shared_constants_regex__WEBPACK_IMPORTED_MODULE_3__.REGEX.PHONE)]],
      poc_email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.email, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.maxLength(80)]],
      poc_location: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required],
      poc_role: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required],
      approverDetails: this.fb.group({
        approver_id: [''],
        approver_name: [''],
        approver_phoneNo: [''],
        approver_email: [''],
        approver_location: [''],
        approver_role: ['']
      })
    });
  }
  processDomains() {
    const inputValue = this.form.get('domain')?.value || '';
    this.domainList = inputValue.split(',').map(domain => domain.trim()).filter(domain => domain !== '');
    this.form.get('domain')?.patchValue(this.domainList);
  }
  // --- POC DIALOG LOGIC ---
  openPocDialog(index = null) {
    this.editingPocIndex = index;
    this.pocFormGroup.reset();
    if (index !== null) {
      const existingData = this.poc.at(index).value;
      this.pocFormGroup.patchValue(existingData);
    } else {
      // New POC
      // Ensure nested groups are reset
      this.pocFormGroup = this.new_poc_details();
    }
    this.activeDialogRef = this.dialog.open(this.pocDialogTemplate, {
      width: '800px',
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });
  }
  savePocFromDialog() {
    this.markAllFieldsAsTouched(this.pocFormGroup);
    if (this.pocFormGroup.valid) {
      const pocData = this.pocFormGroup.getRawValue();
      if (this.editingPocIndex !== null) {
        this.poc.at(this.editingPocIndex).patchValue(pocData);
      } else {
        // Create new Form Group with correct structure and push
        const newGroup = this.new_poc_details();
        newGroup.patchValue(pocData);
        this.poc.push(newGroup);
      }
      this.activeDialogRef?.close();
    } else {
      this.scrollToFirstInvalidField();
    }
  }
  deletePoc(index) {
    // Current Logic Logic
    const pocArray = this.form.get('poc_details');
    const selectedPocId = pocArray.at(index).get('poc_id')?.value;
    const isUsedInCafe = this.form.get('cafeteriaList')?.value?.some(cafe => cafe.poc_details?.poc_id === selectedPocId);
    // OR check original orgInfo if just loaded
    const isUsedInCafeOrg = this.orgInfo?.cafeteriaList?.some(cafe => cafe.poc_details?.poc_id === selectedPocId);
    // Rule 1: At least one POC must exist
    if (pocArray.length <= 1) {
      this.openPocAlertModal('At least one POC is required.');
      return;
    }
    // Rule 2: Cannot delete if this POC is assigned in cafeteria
    if (isUsedInCafe || isUsedInCafeOrg) {
      this.openPocAlertModal('This POC is assigned to a Cafeteria.');
      return;
    }
    pocArray.removeAt(index);
  }
  // --- CAFETERIA DIALOG LOGIC ---
  openCafeteriaDialog(index = null) {
    this.editingCafeIndex = index;
    // this.cafeteriaFormGroup.reset(); 
    if (index !== null) {
      const existingData = this.cafeteria.at(index).getRawValue();
      const isExisting = existingData.isExisting;
      this.cafeteriaFormGroup = this.new_cafeteria(isExisting);
      this.cafeteriaFormGroup.patchValue(existingData);
    } else {
      this.cafeteriaFormGroup = this.new_cafeteria(false);
    }
    this.activeDialogRef = this.dialog.open(this.cafeteriaDialogTemplate, {
      width: '900px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      maxHeight: '90vh'
    });
  }
  saveCafeteriaFromDialog() {
    this.markAllFieldsAsTouched(this.cafeteriaFormGroup);
    if (this.cafeteriaFormGroup.valid) {
      const cafeData = this.cafeteriaFormGroup.getRawValue();
      if (this.editingCafeIndex !== null) {
        // Update
        this.cafeteria.at(this.editingCafeIndex).patchValue(cafeData);
      } else {
        // Add
        const newGroup = this.new_cafeteria(false);
        newGroup.patchValue(cafeData);
        this.cafeteria.push(newGroup);
      }
      this.activeDialogRef?.close();
    } else {
      this.scrollToFirstInvalidField();
    }
  }
  deleteCafeteria(index) {
    const isExisting = this.cafeteria.at(index).get('isExisting')?.value;
    if (isExisting) {
      this.toaster.error('Cannot delete saved Cafeterias from here.');
      return;
    }
    if (this.cafeteria.length <= 1) {
      this.toaster.error('At least one Cafeteria is required.');
      return;
    }
    this.cafeteria.removeAt(index);
  }
  // Custom logic for Cafe POC Selection using Dropdown
  onCafePocSelectionChange(event) {
    // event.value is the POC object from availablePocs
    const selectedPoc = event.value;
    if (selectedPoc) {
      this.cafeteriaFormGroup.get('poc_details')?.patchValue({
        poc_id: selectedPoc.poc_id,
        poc_name: selectedPoc.poc_name,
        poc_phoneNo: selectedPoc.poc_phoneNo,
        poc_email: selectedPoc.poc_email,
        poc_location: selectedPoc.poc_location,
        poc_role: selectedPoc.poc_role,
        // Pass approver if needed?
        // The original logic passed approver details too inside poc_details.approverDetails?
        // Yes, patchCafeAdmins did controls['poc_details'].controls['approverDetails'].patchValue(...)
        approverDetails: selectedPoc.approverDetails // Assuming structure matches
      });
    }
  }
  // Getter for the selected POC ID in the dialog form to set the dropdown value
  get currentCafePocId() {
    return this.cafeteriaFormGroup.get('poc_details.poc_id')?.value;
  }
  // Helper to compare objects in mat-select (optional, but good for objects)
  comparePocs(o1, o2) {
    if (!o1 || !o2) return false;
    return o1.poc_id === o2.poc_id;
  }
  // --- EXISTING HELPERS ---
  removeApproverInDialog() {
    this.pocFormGroup.get('approverDetails')?.reset();
  }
  // Used in Dialog context
  openApproverSelectDialog() {
    this.openApproverModalGeneric(selectedAdmin => {
      // Callback when admin selected
      this.pocFormGroup.get('approverDetails')?.patchValue({
        approver_id: selectedAdmin.poc_id,
        approver_name: selectedAdmin.poc_name,
        approver_phoneNo: selectedAdmin.poc_phoneNo,
        approver_email: selectedAdmin.poc_email,
        approver_location: selectedAdmin.poc_location,
        approver_role: selectedAdmin.poc_role
      });
    });
  }
  openApproverModalGeneric(callback) {
    const dialogRef = this.dialog.open(this.content, {
      width: '600px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'add') {
        if (this.adminSelected) {
          callback(this.adminSelected);
          this.adminSelected = null;
          this.selectedApprover = null;
        }
      }
    });
  }
  openPocAlertModal(message) {
    this.dialog.open(this.pocContent, {
      width: '400px',
      disableClose: true,
      data: {
        message: message
      },
      panelClass: 'custom-dialog-container'
    });
  }
  // --- Original Patch Logic ---
  patchFormValue(org) {
    this.orgInfo = org;
    let clusterdetails = {};
    this.orgSubsidy = org.subsidy;
    this.imageUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.imageUrl + org.organizationLogoUrl;
    this.form.patchValue({
      organization_name: org.organization_name,
      location: org.location,
      city: org.city,
      gstin: org.gstin,
      subsidy: org.subsidy,
      domain: org.domain,
      isEmpIdRequired: org.isEmpIdRequired
    });
    // Clear Arrays first if needed (usually empty on init)
    this.cafeteria.clear();
    this.poc.clear();
    if (org.poc_details) {
      org.poc_details.forEach(el => {
        const group = this.new_poc_details();
        group.patchValue(el);
        this.poc.push(group);
      });
    }
    if (org.cafeteriaList) {
      org.cafeteriaList.forEach(cafe => {
        if (cafe.clusterId) {
          clusterdetails = {
            clusterId: cafe.clusterId,
            clusterName: cafe.clusterName
          };
        }
        const group = this.new_cafeteria(true);
        // Patch cluster
        group.patchValue({
          clusterId: clusterdetails.clusterId,
          clusterName: clusterdetails.clusterName,
          ...cafe
        });
        if (cafe.cafeteria_location) {
          group.controls['cafeteria_location'].patchValue({
            lat: cafe.cafeteria_location.lat,
            lng: cafe.cafeteria_location.lng
          });
        }
        if (!cafe.address2) group.get('address2')?.setValue('1');
        this.cafeteria.push(group);
      });
    }
    // Address
    if (org.org_address) {
      this.form.controls['org_address'].patchValue(org.org_address);
    }
  }
  handleFileInput($event) {
    var _this = this;
    if ($event && $event.target && $event.target.files) {
      const file = $event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = /*#__PURE__*/function () {
          var _ref = (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (_event) {
            const imageUrl = reader.result;
            try {
              const dialogRef = _this.dialog.open(src_app_image_cropper_image_cropper_component__WEBPACK_IMPORTED_MODULE_1__.ImageCropperComponent, {
                width: '50%',
                panelClass: 'image-cropper-dialog',
                disableClose: true,
                data: {
                  imageUrl: imageUrl,
                  imageWidth: 150,
                  imageHeight: 150,
                  aspectRatio: 1 / 2
                }
              });
              dialogRef.afterClosed().subscribe(result => {
                if (result && result.croppedImages) {
                  _this.uploadedImageFile = result.croppedImages.file;
                  _this.imageUrl = result.croppedImages.resizeDataUrl;
                }
              });
            } catch (e) {
              console.log('error while changes kitchen opened status ', e);
            }
          });
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }();
      }
    }
  }
  // Map Logic - Updated to use Dialog Form Group
  toggleMapForDialog() {
    const dialogRef = this.dialog.open(src_app_set_geolocation_set_geolocation_component__WEBPACK_IMPORTED_MODULE_4__.SetGeolocationComponent, {
      width: '900px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      autoFocus: false,
      data: {
        selectedCenter: this.cafeteriaFormGroup.get('cafeteria_location')?.value
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Result contains { location, latlng }
        this.cafeLocation = result;
        // Update the isolated form group
        this.cafeteriaFormGroup.controls['address2'].patchValue(result.location);
        this.cafeteriaFormGroup.controls['cafeteria_location'].patchValue({
          lat: result.latlng.lat,
          lng: result.latlng.lng
        });
        // Cluster Logic
        this.updateClusterForDialog();
      }
    });
  }
  updateClusterForDialog() {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let cluster = yield _this2.googleMapService.getClusterName(_this2.cafeLocation.latlng);
      let clusterDetails = _this2.runtimeStorageService.getCacheData('CLUSTERS_details');
      _this2.cafeteriaFormGroup.patchValue({
        clusterId: clusterDetails.clusterId,
        clusterName: clusterDetails.clusterName
      });
    })();
  }
  updateLocation(event) {
    this.cafeLocation = event;
  }
  pushAdmin(admin) {
    this.adminSelected = admin.value;
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
  addOrg() {
    var _this3 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this3.markAllFieldsAsTouched(_this3.form);
        if (_this3.form.invalid) {
          _this3.scrollToFirstInvalidField();
          return;
        }
        yield _this3.apiMainService.B2B_addOrg(_this3.trimStringValues(_this3.form.getRawValue()));
        _this3.clearRunTimeStorage();
        _this3.router.navigate(['b2bSearchOrg']);
      } catch (error) {
        console.log(error);
      }
    })();
  }
  updateOrg() {
    var _this4 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this4.markAllFieldsAsTouched(_this4.form);
        if (_this4.form.invalid) {
          _this4.scrollToFirstInvalidField();
          return;
        }
        const raw = _this4.trimStringValues(_this4.form.getRawValue());
        const formData = new FormData();
        // ... (FormData append logic same as before) ...
        formData.append('organization_name', raw.organization_name);
        formData.append('location', raw.location);
        formData.append('domain', raw.domain);
        formData.append('city', raw.city);
        formData.append('gstin', raw.gstin || '');
        formData.append('organizationLogoUrl', raw.organizationLogoUrl || '');
        formData.append('isEmpIdRequired', String(raw.isEmpIdRequired));
        formData.append('poc_details', JSON.stringify(raw.poc_details || {}));
        formData.append('org_address', JSON.stringify(raw.org_address || {}));
        formData.append('cafeteriaList', JSON.stringify(raw.cafeteriaList || []));
        formData.append('subsidy', raw.subsidy || 0);
        if (_this4.uploadedImageFile) {
          formData.append('image', _this4.uploadedImageFile);
        }
        yield _this4.apiMainService.B2B_org_update(formData, _this4.viewOrg._id);
        _this4.clearRunTimeStorage();
        _this4.router.navigate(['b2bSearchOrg']);
      } catch (error) {
        console.log(error);
      }
    })();
  }
  back() {
    this.clearRunTimeStorage();
    this.router.navigate(['b2bSearchOrg']);
  }
  goBack() {
    this.back();
  }
  clearRunTimeStorage() {
    this.runtimeStorageService.resetCacheData('VIEW_ORG');
  }
  updateOrglevelSubsidy() {
    var _this5 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this5.orgSubsidy = _this5.form.value.subsidy;
        let res = yield _this5.apiMainService.B2B_org_updateOrglevelSubsidy(_this5.orgSubsidy, _this5.viewOrg._id);
        if (res && res._id) {
          _this5.viewOrg = res;
          _this5.showUpdate = true;
          _this5.patchFormValue(res); // Will refresh lists
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }
  updateCafelevelSubsidy(index) {
    var _this6 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // Logic for inline update from list if kept exposed? 
        // Or move to Dialog? If Dialog, this changes.
        // Assuming subsidy update is still allowed outside dialog for convenience or inside?
        // Let's assume we do it inside dialog or if we keep the "Update" button in the list view (as per previous design)
        // If we keep it in list view, we access the control directly
        let subsidy = _this6.cafeteria.at(index).get('subsidy')?.value;
        let cafeteria_Id = _this6.cafeteria.at(index).get('cafeteria_id')?.value;
        let res = yield _this6.apiMainService.B2B_org_updateCafelevelSubsidy(subsidy, cafeteria_Id);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }
  hasError(form, controlPath, error) {
    const control = form.get(controlPath);
    return control && control.hasError(error);
  }
  get filledPocCount() {
    // Count valid POCs in the main array
    const pocDetails = this.form.controls['poc_details']?.value;
    if (!pocDetails || !Array.isArray(pocDetails)) return 0;
    return pocDetails.filter(p => p.poc_id).length;
  }
  markAllFieldsAsTouched(control) {
    if (!control) return;
    if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormGroup) {
      Object.keys(control.controls).forEach(key => {
        this.markAllFieldsAsTouched(control.get(key));
      });
    } else if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormArray) {
      control.controls.forEach(child => this.markAllFieldsAsTouched(child));
    } else if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl) {
      control.markAsTouched({
        onlySelf: true
      });
      control.markAsDirty({
        onlySelf: true
      });
      control.updateValueAndValidity({
        onlySelf: true
      });
    }
  }
  scrollToFirstInvalidField() {
    // Enhanced to scroll inside dialog if open
    const container = document.querySelector('.mat-dialog-content') || document;
    setTimeout(() => {
      const firstInvalid = container.querySelector('.ng-invalid');
      if (!firstInvalid) return;
      firstInvalid.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      firstInvalid.focus();
      this.toaster.error('Please check invalid fields.');
    });
  }
  getOrgGstinInDialog(event) {
    const gstinValue = event.checked ? this.form.get('gstin')?.value : '';
    this.cafeteriaFormGroup.get('cafeteria_gstin')?.patchValue(gstinValue);
  }
  static #_ = this.ɵfac = function AddOrganizationComponent_Factory(t) {
    return new (t || AddOrganizationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_5__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_service_policy_service__WEBPACK_IMPORTED_MODULE_6__.PolicyService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_service_google_map_service__WEBPACK_IMPORTED_MODULE_7__.GoogleMapService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_service_runtime_storage_service__WEBPACK_IMPORTED_MODULE_8__.RuntimeStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_15__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_service_toaster_service__WEBPACK_IMPORTED_MODULE_9__.ToasterService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
    type: AddOrganizationComponent,
    selectors: [["app-add-organization"]],
    viewQuery: function AddOrganizationComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_c2, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_c3, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.content = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.pocContent = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.pocDialogTemplate = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.cafeteriaDialogTemplate = _t.first);
      }
    },
    decls: 217,
    vars: 26,
    consts: [[1, "add-org-container"], [3, "formGroup"], [1, "page-header-card"], [1, "header-content"], [1, "d-flex", "align-items-center", "gap-3"], ["mat-icon-button", "", "type", "button", 1, "back-btn", 3, "click"], [1, "page-title"], [1, "page-subtitle"], [1, "header-right"], ["mat-icon-button", "", "matTooltip", "Required Fields", 1, "info-btn", 3, "matMenuTriggerFor"], ["infoMenu", "matMenu"], [1, "info-menu-content", 3, "click"], [1, "info-header"], [1, "info-list", "required"], [1, "info-header", "mt-2"], [1, "info-list", "recommended"], [1, "status-pill", 3, "ngClass"], [1, "row", "g-4"], [1, "col-12", "col-lg-4"], [1, "modern-card"], [1, "card-header"], [1, "icon-box", "info"], [1, "card-body"], [1, "upload-wrapper"], ["type", "file", "accept", "image/*", 1, "uploadInput", 2, "display", "none", 3, "change"], ["fileInput", ""], [1, "image-upload-box", 3, "click"], ["class", "preview-image", 3, "src", 4, "ngIf"], ["class", "placeholder-content", 4, "ngIf"], [1, "upload-overlay"], [1, "icon-box", "secondary"], ["formControlName", "isEmpIdRequired", "color", "primary"], [1, "col-12", "col-lg-8"], [1, "icon-box", "primary"], [1, "row"], [1, "col-12", "col-md-6", "mb-3"], ["appearance", "outline", 1, "w-100", "custom-field"], ["matInput", "", "placeholder", "Organization Name", "formControlName", "organization_name"], [4, "ngIf"], ["matInput", "", "placeholder", "Domain Name", "formControlName", "domain"], ["matInput", "", "placeholder", "GSTIN Number", "formControlName", "gstin"], ["class", "col-12 col-md-6 mb-3", 4, "ngIf"], [1, "icon-box", "success"], ["matInput", "", "placeholder", "Area/Locality", "formControlName", "location"], ["matInput", "", "placeholder", "City Name", "formControlName", "city"], ["formGroupName", "org_address"], [1, "col-12", "mb-3"], ["matInput", "", "placeholder", "Building, Street", "formControlName", "addressLine1"], ["matInput", "", "placeholder", "Landmark, etc.", "formControlName", "addressLine2"], ["matInput", "", "placeholder", "Other details", "formControlName", "addressLine3"], [1, "row", "g-4", "mt-1"], [1, "col-12"], [1, "card-header", "with-actions"], [1, "icon-box", "purple"], ["mat-flat-button", "", "color", "primary", "type", "button", 1, "action-btn", 3, "click"], ["class", "mb-3 d-block", 4, "ngIf"], ["class", "empty-placeholder", 4, "ngIf"], [1, "list-container"], ["class", "item-card", 4, "ngFor", "ngForOf"], [1, "icon-box", "warning"], [1, "action-bar-container"], [1, "action-bar"], ["mat-button", "", "type", "button", "matTooltip", "Discard Changes", 1, "btn-cancel", 3, "click"], ["class", "btn-update", "mat-flat-button", "", "color", "primary", "type", "button", "matTooltip", "Save Changes", 3, "disabled", "click", 4, "ngIf"], ["class", "btn-add", "mat-flat-button", "", "color", "primary", "type", "button", "matTooltip", "Create Organization", 3, "disabled", "click", 4, "ngIf"], ["pocDialogTemplate", ""], ["cafeteriaDialogTemplate", ""], ["content", ""], ["pocContent", ""], [1, "preview-image", 3, "src"], [1, "placeholder-content"], [1, "d-flex", "gap-2"], ["matInput", "", "type", "number", "placeholder", "0-100", "formControlName", "subsidy", "appOnlyNumber", ""], ["mat-icon-button", "", "color", "primary", "type", "button", "matTooltip", "Update Subsidy", 1, "action-btn", 3, "click"], [1, "mb-3", "d-block"], [1, "empty-placeholder"], [1, "item-card"], [1, "d-flex", "justify-content-between", "align-items-start"], [1, "card-title", "fw-bold", "mb-1", "d-flex", "align-items-center", "gap-2"], [1, "text-muted", "small", 2, "font-size", "0.8rem"], [1, "card-text", "text-muted", "mb-2", "d-flex", "flex-wrap", "gap-3", "align-items-center"], [1, "badge", "bg-secondary"], [1, "d-flex", "align-items-center", "gap-1", "small"], [1, "icon-xs"], ["class", "d-flex align-items-center gap-2 mt-2 p-2 bg-light rounded", 4, "ngIf"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Edit POC", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Delete POC", 3, "click"], [1, "d-flex", "align-items-center", "gap-2", "mt-2", "p-2", "bg-light", "rounded"], [1, "icon-xs", "text-primary"], [1, "small", "fw-bold"], [1, "small"], [1, "d-flex", "justify-content-between", "align-items-start", "mb-2"], [1, "d-flex", "flex-wrap", "gap-3", "mb-2", "text-muted"], ["class", "text-muted small", 4, "ngIf"], [1, "d-flex", "gap-2", "align-items-center", "justify-content-between"], [1, "d-flex", "gap-2", "flex-wrap"], [4, "ngFor", "ngForOf"], [1, "d-flex", "gap-2", "align-items-center"], ["class", "d-flex align-items-center gap-1 me-2", "style", "width: 150px;", 4, "ngIf"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Edit Cafeteria", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Delete Cafeteria", 3, "click", 4, "ngIf"], [1, "text-muted", "small"], ["class", "badge bg-primary bg-opacity-10 text-primary border border-primary", 4, "ngIf"], [1, "badge", "bg-primary", "bg-opacity-10", "text-primary", "border", "border-primary"], [1, "d-flex", "align-items-center", "gap-1", "me-2", 2, "width", "150px"], ["placeholder", "%", "type", "number", 1, "form-control", "form-control-sm", 3, "formControl"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Update Subsidy", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Delete Cafeteria", 3, "click"], ["mat-flat-button", "", "color", "primary", "type", "button", "matTooltip", "Save Changes", 1, "btn-update", 3, "disabled", "click"], ["mat-flat-button", "", "color", "primary", "type", "button", "matTooltip", "Create Organization", 1, "btn-add", 3, "disabled", "click"], [1, "dialog-header", "compact-header", 2, "padding", "0.5rem 1rem"], ["mat-dialog-title", "", 1, "m-0", "fs-5"], ["mat-icon-button", "", "mat-dialog-close", ""], [1, "pb-3", 3, "formGroup"], [1, "row", "g-3"], [1, "col-12", "col-md-6"], [1, "field-label"], [1, "required-input"], ["matInput", "", "formControlName", "poc_id", "appAlphaNumeric", "", "placeholder", "e.g. POC001"], ["matInput", "", "formControlName", "poc_name", "placeholder", "Full Name"], ["matInput", "", "formControlName", "poc_phoneNo", "appOnlyNumber", "", "placeholder", "10-digit Mobile Number"], ["matInput", "", "formControlName", "poc_email", "placeholder", "email@example.com"], ["matInput", "", "formControlName", "poc_location", "placeholder", "City/State"], ["formControlName", "poc_role", "placeholder", "Select Role"], [3, "value", 4, "ngFor", "ngForOf"], ["formGroupName", "approverDetails", 1, "mt-4", "p-3", "bg-light", "rounded"], [1, "text-secondary", "mb-3", 2, "font-size", "0.95rem"], ["class", "alert alert-info py-2", 4, "ngIf"], ["class", "row g-3", 4, "ngIf"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""], ["mat-raised-button", "", "color", "primary", 3, "click"], [3, "value"], [1, "alert", "alert-info", "py-2"], ["matInput", "", "formControlName", "approver_name", "readonly", "", "placeholder", "Selected approver will appear here"], [1, "col-12", "col-md-6", "d-flex", "align-items-center", "gap-2"], ["mat-stroked-button", "", "color", "primary", "type", "button", 3, "click"], ["mat-button", "", "color", "warn", "type", "button", 3, "click"], [1, "checkbox-grid", "mb-3"], [1, "col-12", "col-md-4"], ["matInput", "", "formControlName", "cafeteria_id", "readonly", "", "placeholder", "Auto-generated"], ["matInput", "", "formControlName", "cafeteria_name", "appAlphaNumeric", "", "placeholder", "e.g. Main Cafeteria"], ["matInput", "", "formControlName", "cafeteria_city", "appAlphaNumeric", "", "placeholder", "City Name"], ["matInput", "", "formControlName", "location", "appAlphaNumeric", "", "placeholder", "Area"], ["matInput", "", "formControlName", "landmark", "appAlphaNumeric", "", "placeholder", "Nearby landmark"], ["matInput", "", "formControlName", "accessCode", "appOnlyNumber", "", "maxlength", "4", "placeholder", "4-digit code"], ["matInput", "", "formControlName", "cafeteria_gstin", "placeholder", "GST Number"], [1, "col-12", "col-md-4", "d-flex", "align-items-end", "mb-3"], ["color", "primary", 3, "change"], [1, "row", "g-3", "mt-1"], ["matInput", "", "formControlName", "address1", "appAlphaNumeric", "", "placeholder", "Building, Street"], ["matInput", "", "formControlName", "address2", "placeholder", "Start typing or use map..."], ["formGroupName", "cafeteria_location", 1, "row", "g-3", "mt-1"], ["matInput", "", "formControlName", "lat", "readonly", "", "placeholder", "Lat"], ["matInput", "", "formControlName", "lng", "readonly", "", "placeholder", "Lng"], ["mat-raised-button", "", "color", "primary", "type", "button", 1, "w-100", 2, "height", "56px", 3, "click"], [1, "mt-4", "p-3", "border", "rounded", "bg-light"], [1, "text-secondary", "mb-3"], ["placeholder", "Choose a POC", 3, "value", "compareWith", "selectionChange"], ["class", "col-12 col-md-6", 4, "ngIf"], ["color", "primary", 3, "formControlName"], [1, "p-2", "border", "rounded", "bg-white"], [1, "pb-3"], ["color", "primary", 1, "d-flex", "flex-column", "gap-2", 3, "ngModel", "ngModelChange"], ["mat-raised-button", "", "color", "primary", 3, "mat-dialog-close", "disabled"], ["class", "admin-row p-2 border-bottom", 4, "ngIf"], [1, "admin-row", "p-2", "border-bottom"], [1, "w-100", 3, "value", "change"], [1, "fw-bold"], [1, "text-danger"]],
    template: function AddOrganizationComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r96 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 0)(1, "form", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_Template_button_click_5_listener() {
          return ctx.goBack();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](7, "arrow_back");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](8, "div")(9, "h1", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](11, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](12, "Manage organization details, locations, and POCs.");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](13, "div", 8)(14, "button", 9)(15, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](16, "info");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](17, "mat-menu", null, 10)(19, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_Template_div_click_19_listener($event) {
          return $event.stopPropagation();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](20, "div", 12)(21, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](22, "checklist");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](23, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](24, "Required Fields");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](25, "ul", 13)(26, "li")(27, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](28, "check_circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](29, " Organization Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](30, "li")(31, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](32, "check_circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](33, " Domain");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](34, "li")(35, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](36, "check_circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](37, " GSTIN");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](38, "li")(39, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](40, "check_circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](41, " Location & City");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](42, "li")(43, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](44, "check_circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](45, " Address Line 1");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](46, "li")(47, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](48, "check_circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](49, " At least 1 POC");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](50, "li")(51, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](52, "check_circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](53, " At least 1 Cafeteria");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](54, "div", 14)(55, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](56, "stars");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](57, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](58, "Recommended");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](59, "ul", 15)(60, "li")(61, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](62, "add_circle_outline");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](63, " Organization Logo");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](64, "div", 16)(65, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](66);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](67, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](68);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](69, "div", 17)(70, "div", 18)(71, "div", 19)(72, "div", 20)(73, "div", 21)(74, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](75, "image");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](76, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](77, "Organization Logo");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](78, "div", 22)(79, "div", 23)(80, "input", 24, 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("change", function AddOrganizationComponent_Template_input_change_80_listener($event) {
          return ctx.handleFileInput($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](82, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_Template_div_click_82_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r96);
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](81);
          return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](_r1.click());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](83, AddOrganizationComponent_img_83_Template, 1, 1, "img", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](84, AddOrganizationComponent_div_84_Template, 5, 0, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](85, "div", 29)(86, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](87, "Change Logo");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](88, "div", 19)(89, "div", 20)(90, "div", 30)(91, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](92, "settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](93, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](94, "Configuration");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](95, "div", 22)(96, "mat-slide-toggle", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](97, " Employee ID Required ");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](98, "div", 32)(99, "div", 19)(100, "div", 20)(101, "div", 33)(102, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](103, "business");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](104, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](105, "Basic Details");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](106, "div", 22)(107, "div", 34)(108, "div", 35)(109, "mat-form-field", 36)(110, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](111, "Organization Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](112, "input", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](113, AddOrganizationComponent_mat_error_113_Template, 2, 0, "mat-error", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](114, "div", 35)(115, "mat-form-field", 36)(116, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](117, "Domain");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](118, "input", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](119, AddOrganizationComponent_mat_error_119_Template, 2, 0, "mat-error", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](120, "div", 35)(121, "mat-form-field", 36)(122, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](123, "GSTIN");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](124, "input", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](125, AddOrganizationComponent_mat_error_125_Template, 2, 0, "mat-error", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](126, AddOrganizationComponent_mat_error_126_Template, 2, 0, "mat-error", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](127, AddOrganizationComponent_div_127_Template, 9, 0, "div", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](128, "div", 19)(129, "div", 20)(130, "div", 42)(131, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](132, "location_on");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](133, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](134, "Address Details");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](135, "div", 22)(136, "div", 34)(137, "div", 35)(138, "mat-form-field", 36)(139, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](140, "Location");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](141, "input", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](142, AddOrganizationComponent_mat_error_142_Template, 2, 0, "mat-error", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](143, "div", 35)(144, "mat-form-field", 36)(145, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](146, "City");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](147, "input", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](148, AddOrganizationComponent_mat_error_148_Template, 2, 0, "mat-error", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](149, "div", 45)(150, "div", 34)(151, "div", 46)(152, "mat-form-field", 36)(153, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](154, "Address Line 1");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](155, "input", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](156, AddOrganizationComponent_mat_error_156_Template, 2, 0, "mat-error", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](157, "div", 35)(158, "mat-form-field", 36)(159, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](160, "Address Line 2");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](161, "input", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](162, "div", 35)(163, "mat-form-field", 36)(164, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](165, "Address Line 3");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](166, "input", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](167, "div", 50)(168, "div", 51)(169, "div", 19)(170, "div", 52)(171, "div", 4)(172, "div", 53)(173, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](174, "people");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](175, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](176, "Point of Contact (POC) List");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](177, "button", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_Template_button_click_177_listener() {
          return ctx.openPocDialog();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](178, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](179, "add");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](180, " Add POC ");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](181, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](182, AddOrganizationComponent_mat_error_182_Template, 2, 0, "mat-error", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](183, AddOrganizationComponent_div_183_Template, 5, 0, "div", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](184, "div", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](185, AddOrganizationComponent_div_185_Template, 30, 7, "div", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](186, "div", 19)(187, "div", 52)(188, "div", 4)(189, "div", 59)(190, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](191, "store");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](192, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](193, "Cafeteria List");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](194, "button", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_Template_button_click_194_listener() {
          return ctx.openCafeteriaDialog();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](195, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](196, "add");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](197, " Add Cafeteria ");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](198, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](199, AddOrganizationComponent_mat_error_199_Template, 2, 0, "mat-error", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](200, AddOrganizationComponent_div_200_Template, 5, 0, "div", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](201, "div", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](202, AddOrganizationComponent_div_202_Template, 30, 9, "div", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](203, "div", 60)(204, "div", 61)(205, "button", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddOrganizationComponent_Template_button_click_205_listener() {
          return ctx.back();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](206, " Cancel ");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](207, AddOrganizationComponent_button_207_Template, 4, 1, "button", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](208, AddOrganizationComponent_button_208_Template, 4, 1, "button", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](209, AddOrganizationComponent_ng_template_209_Template, 67, 11, "ng-template", null, 65, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](211, AddOrganizationComponent_ng_template_211_Template, 105, 7, "ng-template", null, 66, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](213, AddOrganizationComponent_ng_template_213_Template, 12, 4, "ng-template", null, 67, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](215, AddOrganizationComponent_ng_template_215_Template, 12, 1, "ng-template", null, 68, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](18);
        let tmp_16_0;
        let tmp_17_0;
        let tmp_20_0;
        let tmp_23_0;
        let tmp_24_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx.showUpdate ? "Edit Organization" : "Add New Organization");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("matMenuTriggerFor", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](50);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngClass", ctx.form.valid && ctx.poc.length > 0 && ctx.cafeteria.length > 0 ? "valid" : "invalid");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx.form.valid && ctx.poc.length > 0 && ctx.cafeteria.length > 0 ? "check_circle" : "info");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx.form.valid && ctx.poc.length > 0 && ctx.cafeteria.length > 0 ? "Ready to Save" : "Incomplete");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵclassProp"]("has-image", ctx.imageUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.imageUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx.imageUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](29);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.hasError(ctx.form, "organization_name", "required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.hasError(ctx.form, "domain", "required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.hasError(ctx.form, "gstin", "required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.hasError(ctx.form, "gstin", "pattern"));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.showUpdate);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.hasError(ctx.form, "location", "required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.hasError(ctx.form, "city", "required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", (tmp_16_0 = ctx.form.get("org_address.addressLine1")) == null ? null : tmp_16_0.hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](26);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", (tmp_17_0 = ctx.form.get("poc_details")) == null ? null : tmp_17_0.hasError("minLengthArray"));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.poc.length === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", ctx.poc.controls);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", (tmp_20_0 = ctx.form.get("cafeteriaList")) == null ? null : tmp_20_0.hasError("minLengthArray"));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.cafeteria.length === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", ctx.cafeteria.controls);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.showUpdate && ((tmp_23_0 = ctx.btnPolicy == null ? null : ctx.btnPolicy.editOrganization) !== null && tmp_23_0 !== undefined ? tmp_23_0 : true));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx.showUpdate && ((tmp_24_0 = ctx.btnPolicy == null ? null : ctx.btnPolicy.addOrganization) !== null && tmp_24_0 !== undefined ? tmp_24_0 : true));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControlDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormGroupName, _angular_material_button__WEBPACK_IMPORTED_MODULE_17__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_17__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_18__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__.MatError, _angular_material_input__WEBPACK_IMPORTED_MODULE_20__.MatInput, _angular_material_select__WEBPACK_IMPORTED_MODULE_21__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_22__.MatOption, _angular_material_menu__WEBPACK_IMPORTED_MODULE_23__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_23__.MatMenuTrigger, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_24__.MatTooltip, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__.MatDialogClose, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__.MatDialogContent, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__.MatDialogActions, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_25__.MatCheckbox, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_26__.MatSlideToggle, _angular_material_radio__WEBPACK_IMPORTED_MODULE_27__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_27__.MatRadioButton, _shared_directives_common_directives_directive__WEBPACK_IMPORTED_MODULE_10__.OnlyNumberDirective, _shared_directives_common_directives_directive__WEBPACK_IMPORTED_MODULE_10__.AlphaNumericDirective, _shared_directives_auto_tooltip_directive__WEBPACK_IMPORTED_MODULE_11__.AutoTooltipDirective],
    styles: ["\n\n\n\n[_ngcontent-%COMP%]:root {\n  --color-primary: #0E49B5;\n  --color-secondary: #FF3333;\n  --color-backgroundGrey: #f3f3f3;\n  --color-text: #1a1a1a;\n}\n\n.add-org-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  min-height: 100vh;\n  padding-bottom: 100px;\n}\n\n.page-header-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 1rem 1.5rem;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);\n  border: 1px solid rgba(0, 0, 0, 0.04);\n  margin-bottom: 1.5rem;\n}\n.page-header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.page-header-card[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.page-header-card[_ngcontent-%COMP%]   .back-btn[_ngcontent-%COMP%] {\n  color: #6c757d;\n  background: #f8f9fa;\n  border-radius: 8px;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  cursor: pointer;\n}\n.page-header-card[_ngcontent-%COMP%]   .back-btn[_ngcontent-%COMP%]:hover {\n  background: #e9ecef;\n}\n.page-header-card[_ngcontent-%COMP%]   .info-btn[_ngcontent-%COMP%] {\n  color: #64748b;\n}\n.page-header-card[_ngcontent-%COMP%]   .info-btn[_ngcontent-%COMP%]:hover {\n  color: #0E49B5;\n}\n.page-header-card[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n  color: #192754;\n}\n.page-header-card[_ngcontent-%COMP%]   .page-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #9aa0a6;\n  margin: 0;\n}\n.page-header-card[_ngcontent-%COMP%]   .status-pill[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 16px;\n  border-radius: 50px;\n  font-size: 0.85rem;\n  font-weight: 600;\n}\n.page-header-card[_ngcontent-%COMP%]   .status-pill.valid[_ngcontent-%COMP%] {\n  background-color: #f0fdf4;\n  color: #16a34a;\n  border: 1px solid #bbf7d0;\n}\n.page-header-card[_ngcontent-%COMP%]   .status-pill.invalid[_ngcontent-%COMP%] {\n  background-color: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n}\n.page-header-card[_ngcontent-%COMP%]   .status-pill[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n\n.info-menu-content[_ngcontent-%COMP%] {\n  padding: 1rem;\n  min-width: 250px;\n}\n\n.info-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding-bottom: 8px;\n  border-bottom: 1px solid #e2e8f0;\n}\n.info-header[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: #f59e0b;\n}\n.info-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.info-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 8px 0 0;\n}\n.info-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 0;\n  font-size: 0.8rem;\n  color: #475569;\n}\n.info-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.info-list.required[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.info-list.recommended[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n\n.modern-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);\n  border: 1px solid #edf2f7;\n  overflow: hidden;\n  height: -moz-fit-content;\n  height: fit-content;\n  margin-bottom: 1.5rem;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  padding: 1.25rem 1.5rem;\n  border-bottom: 1px solid #f1f5f9;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  background-color: white;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header.with-actions[_ngcontent-%COMP%] {\n  justify-content: space-between;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #2d3748;\n  margin: 0;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .icon-box.primary[_ngcontent-%COMP%] {\n  background: rgba(14, 73, 181, 0.1);\n  color: #0E49B5;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .icon-box.secondary[_ngcontent-%COMP%] {\n  background: rgba(255, 51, 51, 0.1);\n  color: #FF3333;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .icon-box.info[_ngcontent-%COMP%] {\n  background: #e0f2fe;\n  color: #0284c7;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .icon-box.warning[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #d97706;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .icon-box.success[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #16a34a;\n}\n.modern-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .icon-box.purple[_ngcontent-%COMP%] {\n  background: #f3e8ff;\n  color: #9333ea;\n}\n.modern-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.modern-card[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  font-weight: 500;\n}\n\n.custom-field[_ngcontent-%COMP%]     .mat-mdc-form-field-flex {\n  background-color: white !important;\n}\n\n.upload-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 1rem;\n}\n\n.image-upload-box[_ngcontent-%COMP%] {\n  position: relative;\n  width: 160px;\n  height: 160px;\n  border-radius: 16px;\n  border: 2px dashed #e2e8f0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n.image-upload-box[_ngcontent-%COMP%]:hover {\n  border-color: #0E49B5;\n  background-color: rgba(14, 73, 181, 0.02);\n}\n.image-upload-box.has-image[_ngcontent-%COMP%] {\n  border-style: solid;\n  border-color: transparent;\n}\n\n.preview-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.placeholder-content[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #94a3b8;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n}\n.placeholder-content[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  height: 40px;\n  width: 40px;\n  opacity: 0.5;\n}\n.placeholder-content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 500;\n}\n\n.upload-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.6);\n  color: white;\n  padding: 0.5rem;\n  text-align: center;\n  font-size: 0.75rem;\n  transform: translateY(100%);\n  transition: transform 0.2s ease;\n}\n\n.image-upload-box[_ngcontent-%COMP%]:hover   .upload-overlay[_ngcontent-%COMP%] {\n  transform: translateY(0);\n}\n\n.list-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.item-card[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #f3f4f6;\n  border-radius: 12px;\n  padding: 1.25rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n  transition: all 0.2s ease-in-out;\n  position: relative;\n}\n.item-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n  border-color: rgba(14, 73, 181, 0.3);\n}\n.item-card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  color: #111827;\n  font-size: 1.1rem;\n}\n.item-card[_ngcontent-%COMP%]   .icon-xs[_ngcontent-%COMP%] {\n  font-size: 16px;\n  height: 16px;\n  width: 16px;\n  vertical-align: middle;\n  color: #6b7280;\n}\n\n.action-bar-container[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  justify-content: center;\n  pointer-events: none;\n  z-index: 100;\n}\n\n.action-bar[_ngcontent-%COMP%] {\n  pointer-events: auto;\n  background: rgba(255, 255, 255, 0.95);\n  -webkit-backdrop-filter: blur(8px);\n          backdrop-filter: blur(8px);\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  padding: 0.75rem 1.5rem;\n  border-radius: 50px;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);\n  display: flex;\n  gap: 1rem;\n  margin-bottom: 1.4rem;\n}\n.action-bar[_ngcontent-%COMP%]   .btn-submit[_ngcontent-%COMP%], .action-bar[_ngcontent-%COMP%]   .btn-update[_ngcontent-%COMP%], .action-bar[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%] {\n  border-radius: 50px;\n  padding: 0 2rem;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.action-bar[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%], .action-bar[_ngcontent-%COMP%]   .btn-delete[_ngcontent-%COMP%] {\n  border-radius: 50px;\n  height: 44px;\n  padding: 0 1.5rem;\n  color: #64748b;\n  border: none;\n}\n.action-bar[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:hover, .action-bar[_ngcontent-%COMP%]   .btn-delete[_ngcontent-%COMP%]:hover {\n  background-color: #f1f5f9;\n}\n\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 1.5rem;\n  border-bottom: 1px solid #eee;\n}\n.dialog-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n}\n\n.checkbox-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 0.5rem 1rem;\n  padding: 1rem;\n  background: #f8fafc;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n}\n\n.field-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 600;\n  margin-bottom: 4px;\n  display: block;\n  color: #374151;\n}\n\n.required-input[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n\n.admin-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.5rem;\n}\n.admin-row[_ngcontent-%COMP%]:hover {\n  background-color: #f9fafb;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGhlbWUvX3ZhcmlhYmxlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2Rlc2tkeW5lLWNvbXBvbmVudHMvYWRkLW9yZ2FuaXphdGlvbi9hZGQtb3JnYW5pemF0aW9uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzsrQ0FBQTtBQTBFQTtFQUNFLHdCQUFBO0VBQ0EsMEJBQUE7RUFDQSwrQkFBQTtFQUNBLHFCQUFBO0FDdEVGOztBQUxBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0EscUJBQUE7QUFRRjs7QUFKQTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLDBDQUFBO0VBQ0EscUNBQUE7RUFDQSxxQkFBQTtBQU9GO0FBTEU7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0FBT0o7QUFKRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7QUFNSjtBQUhFO0VBQ0UsY0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUFLSjtBQUhJO0VBQ0UsbUJBQUE7QUFLTjtBQURFO0VBQ0UsY0FBQTtBQUdKO0FBREk7RUFDRSxjRDVDVztBQytDakI7QUFDRTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxTQUFBO0VBQ0EsY0RsRGE7QUNtRGpCO0FBRUU7RUFDRSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxTQUFBO0FBQUo7QUFHRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQURKO0FBR0k7RUFDRSx5QkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBQUROO0FBSUk7RUFDRSx5QkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBQUZOO0FBS0k7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFITjs7QUFTQTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtBQU5GOztBQVNBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0NBQUE7QUFORjtBQVFFO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQU5KO0FBU0U7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQVBKOztBQVdBO0VBQ0UsZ0JBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7QUFSRjtBQVVFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUFSSjtBQVVJO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBUk47QUFZRTtFQUNFLGNBQUE7QUFWSjtBQWFFO0VBQ0UsY0FBQTtBQVhKOztBQWdCQTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSx5Q0FBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx3QkFBQTtFQUFBLG1CQUFBO0VBQ0EscUJBQUE7QUFiRjtBQWVFO0VBQ0UsdUJBQUE7RUFDQSxnQ0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSx1QkFBQTtBQWJKO0FBZUk7RUFDRSw4QkFBQTtBQWJOO0FBZ0JJO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxTQUFBO0FBZE47QUFpQkk7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFmTjtBQWlCTTtFQUNFLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQWZSO0FBa0JNO0VBQ0Usa0NBQUE7RUFDQSxjRC9MUztBQytLakI7QUFtQk07RUFDRSxrQ0FBQTtFQUNBLGNENUxXO0FDMktuQjtBQW9CTTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtBQWxCUjtBQXFCTTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtBQW5CUjtBQXNCTTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtBQXBCUjtBQXVCTTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtBQXJCUjtBQTBCRTtFQUNFLGVBQUE7QUF4Qko7QUEyQkU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0FBekJKOztBQStCRTtFQUNFLGtDQUFBO0FBNUJKOztBQWlDQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBOUJGOztBQWlDQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDBCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtBQTlCRjtBQWdDRTtFQUNFLHFCRG5RYTtFQ29RYix5Q0FBQTtBQTlCSjtBQWlDRTtFQUNFLG1CQUFBO0VBQ0EseUJBQUE7QUEvQko7O0FBbUNBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQWhDRjs7QUFtQ0E7RUFDRSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7QUFoQ0Y7QUFrQ0U7RUFDRSxlQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBaENKO0FBbUNFO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtBQWpDSjs7QUFxQ0E7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLDhCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMkJBQUE7RUFDQSwrQkFBQTtBQWxDRjs7QUFxQ0E7RUFDRSx3QkFBQTtBQWxDRjs7QUFzQ0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0FBbkNGOztBQXNDQTtFQUNFLGlCQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUNBQUE7RUFDQSxnQ0FBQTtFQUNBLGtCQUFBO0FBbkNGO0FBcUNFO0VBQ0UsMkJBQUE7RUFDQSxtRkFBQTtFQUNBLG9DQUFBO0FBbkNKO0FBc0NFO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0FBcENKO0FBdUNFO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0FBckNKOztBQTJDQTtFQUNFLGVBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7QUF4Q0Y7O0FBMkNBO0VBQ0Usb0JBQUE7RUFDQSxxQ0FBQTtFQUNBLGtDQUFBO1VBQUEsMEJBQUE7RUFDQSxvQ0FBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtRkFBQTtFQUNBLGFBQUE7RUFDQSxTQUFBO0VBQ0EscUJBQUE7QUF4Q0Y7QUEwQ0U7O0VBRUUsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7QUF4Q0o7QUFpREU7O0VBRUUsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtBQS9DSjtBQWlESTs7RUFDRSx5QkFBQTtBQTlDTjs7QUFvREE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsNkJBQUE7QUFqREY7QUFtREU7RUFDRSxTQUFBO0VBQ0Esa0JBQUE7QUFqREo7O0FBcURBO0VBQ0UsYUFBQTtFQUNBLDREQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0FBbERGOztBQXFEQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxjQUFBO0FBbERGOztBQXFEQTtFQUNFLGNBQUE7QUFsREY7O0FBcURBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7QUFsREY7QUFvREU7RUFDRSx5QkFBQTtBQWxESiIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICBHbG9iYWwgU0NTUyBWYXJpYWJsZXMgLSBCcmFuZCBDb2xvcnNcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4kd2hpdGU6ICNmZmZmZmY7XHJcbiRibGFjazogIzAwMDAwMDtcclxuJHRleHRQcmltYXJ5OiAjMWExYTFhO1xyXG5cclxuLy8gQnJhbmQgQ29sb3JzIChSb3lhbCBCbHVlICYgTmF2eSlcclxuJHByaW1hcnktY29sb3IxOiAjMEU0OUI1OyAvLyBSb3lhbCBCbHVlIChNYWluIFByaW1hcnkpXHJcbiRwcmltYXJ5LWNvbG9yOiAkcHJpbWFyeS1jb2xvcjE7IC8vIEFsaWFzIGZvciBjb25zaXN0ZW5jeVxyXG4kcHJpbWFyeS1jb2xvcjI6ICMxOTI3NTQ7IC8vIE5hdnkgQmx1ZSAoU2Vjb25kYXJ5IC8gRGFyayBQcmltYXJ5KVxyXG4kcHJpbWFyeS1jb2xvcjM6ICM0YjgyZTI7IC8vIExpZ2h0ZXIgQmx1ZSBkZXJpdmF0aXZlXHJcblxyXG4vLyBCcmFuZCBDb2xvcnMgKENyZWFtICYgUmVkKVxyXG4kc2Vjb25kYXJ5LWNvbG9yMTogI0Y0RUNDNTsgLy8gU29mdCBDcmVhbVxyXG4kc2Vjb25kYXJ5LWNvbG9yMjogI2ZmZTBiMjsgLy8gRGVyaXZhdGl2ZVxyXG4kc2Vjb25kYXJ5LWNvbG9yMzogI0ZGMzMzMzsgLy8gQnJpZ2h0IFJlZCAoQWNjZW50KVxyXG5cclxuLy8gRGVzaWduIFRva2VucyAtIEJvcmRlciBSYWRpdXNcclxuJGJvcmRlci1yYWRpdXMtc206IDRweDtcclxuJGJvcmRlci1yYWRpdXMtbWQ6IDhweDtcclxuJGJvcmRlci1yYWRpdXMtbGc6IDEycHg7XHJcbiRib3JkZXItcmFkaXVzLXhsOiAyMHB4O1xyXG4kYm9yZGVyLXJhZGl1cy1waWxsOiA5OTk5cHg7XHJcbiRib3JkZXItcmFkaXVzLWNpcmNsZTogNTAlO1xyXG5cclxuLy8gRGVzaWduIFRva2VucyAtIEJveCBTaGFkb3dcclxuJGJveC1zaGFkb3ctc206IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xyXG4kYm94LXNoYWRvdy1tZDogMCA0cHggNnB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDJweCA0cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMDYpO1xyXG4kYm94LXNoYWRvdy1sZzogMCAxMHB4IDE1cHggLTNweCByZ2JhKDAsIDAsIDAsIDAuMSksIDAgNHB4IDZweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XHJcbiRib3gtc2hhZG93LWNhcmQ6IDAgMnB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjA0KTtcclxuJGJveC1zaGFkb3ctY2FyZC1ob3ZlcjogMCA4cHggMjRweCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xyXG5cclxuLy8gQWNjZW50IENvbG9yc1xyXG4kc2Vjb25kYXJ5LW9mZnNldC1jb2xvcjE6ICNmZmQ2NzQ7XHJcbiRzZWNvbmRhcnktb2Zmc2V0LWNvbG9yMjogI2ZmYzk0NztcclxuJHNlY29uZGFyeS1vZmZzZXQtY29sb3IzOiAjZmZiMzAwO1xyXG5cclxuXHJcbi8vIEdyYXlzICYgQmFja2dyb3VuZHNcclxuJHByaW1hcnktb2Zmc2V0LWNvbG9yMTogI2ZmZmZmZjtcclxuJHByaW1hcnktb2Zmc2V0LWNvbG9yMjogI2E0YTRhNDsgLy8gR3JheSB0ZXh0XHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjM6ICNmM2YzZjM7IC8vIExpZ2h0IGJhY2tncm91bmRcclxuJHByaW1hcnktb2Zmc2V0LWNvbG9yNDogI2VmZWZlZjsgLy8gQ2FyZCBiYWNrZ3JvdW5kXHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjU6IHdoaXRlO1xyXG4kYm9yZGVyLWNvbG9yOiAjZTVlN2ViO1xyXG4kY2FyZC1vZGQ6ICNkZWUyZTY7XHJcbiRiYWNrZ3JvdW5kLWNvbG9yOiAjZjNmM2YzO1xyXG4vLyBUaGVtZSBDb2xvcnMgKE1hdGNoZXMgc3R5bGVzLnNjc3MpXHJcbiRpbmZvLWNvbG9yOiAjYTRhNGE0O1xyXG4kdGV4dC1kYXJrOiAjMWExYTFhO1xyXG4vLyBUaGVtZSBDb2xvcnNcclxuJHByaW1hcnktY29sb3I6ICNlNjI4NDE7XHJcbiRzZWNvbmRhcnktY29sb3I6ICMxNWEyOTI7XHJcbiRiYWNrZHJvcC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQpO1xyXG4vLyBTZW1hbnRpYyBDb2xvcnMgKFN0YW5kYXJkaXplZClcclxuJGNvbG9yLXN1Y2Nlc3M6ICM1MmM0MWE7XHJcbiRjb2xvci1zdWNjZXNzLWJnOiAjZjZmZmVkO1xyXG4kY29sb3Itc3VjY2Vzcy1ib3JkZXI6ICNiN2ViOGY7XHJcblxyXG4kY29sb3Itd2FybmluZzogI2ZhYWQxNDtcclxuJGNvbG9yLXdhcm5pbmctYmc6ICNmZmY3ZTY7XHJcbiRjb2xvci13YXJuaW5nLWJvcmRlcjogI2ZmZTU4ZjtcclxuXHJcbiRjb2xvci1lcnJvcjogI2ZmNGQ0ZjtcclxuJGNvbG9yLWVycm9yLWJnOiAjZmZmMWYwO1xyXG4kY29sb3ItZXJyb3ItYm9yZGVyOiAjZmZjY2M3O1xyXG5cclxuJGNvbG9yLWluZm86ICMxODkwZmY7XHJcbiRjb2xvci1pbmZvLWJnOiAjZTZmN2ZmO1xyXG4kY29sb3ItaW5mby1ib3JkZXI6ICM5MWQ1ZmY7XHJcblxyXG4vLyBDU1MgVmFyaWFibGVzIGZvciBSdW50aW1lIFRoZW1pbmdcclxuOnJvb3Qge1xyXG4gIC0tY29sb3ItcHJpbWFyeTogI3skcHJpbWFyeS1jb2xvcjF9O1xyXG4gIC0tY29sb3Itc2Vjb25kYXJ5OiAjeyRzZWNvbmRhcnktY29sb3IzfTtcclxuICAtLWNvbG9yLWJhY2tncm91bmRHcmV5OiAjeyRiYWNrZ3JvdW5kLWNvbG9yfTtcclxuICAtLWNvbG9yLXRleHQ6ICN7JHRleHRQcmltYXJ5fTtcclxufSIsIkB1c2UgJ3NyYy9zdHlsZXMvdGhlbWUvdmFyaWFibGUnIGFzIHZhcjtcclxuXHJcbi8vIEdlbmVyYWwgQ29udGFpbmVyXHJcbi5hZGQtb3JnLWNvbnRhaW5lciB7XHJcbiAgcGFkZGluZzogMS41cmVtO1xyXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xyXG4gIHBhZGRpbmctYm90dG9tOiAxMDBweDsgLy8gU3BhY2UgZm9yIHN0aWNreSBmb290ZXJcclxufVxyXG5cclxuLy8gUGFnZSBIZWFkZXIgQ2FyZFxyXG4ucGFnZS1oZWFkZXItY2FyZCB7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcclxuICBwYWRkaW5nOiAxcmVtIDEuNXJlbTtcclxuICBib3gtc2hhZG93OiAwIDJweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4wMyk7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjA0KTtcclxuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XHJcblxyXG4gIC5oZWFkZXItY29udGVudCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgIGdhcDogMXJlbTtcclxuICB9XHJcblxyXG4gIC5oZWFkZXItcmlnaHQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDEycHg7XHJcbiAgfVxyXG5cclxuICAuYmFjay1idG4ge1xyXG4gICAgY29sb3I6ICM2Yzc1N2Q7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgd2lkdGg6IDQwcHg7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG5cclxuICAgICY6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjZTllY2VmO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmluZm8tYnRuIHtcclxuICAgIGNvbG9yOiAjNjQ3NDhiO1xyXG5cclxuICAgICY6aG92ZXIge1xyXG4gICAgICBjb2xvcjogdmFyLiRwcmltYXJ5LWNvbG9yMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5wYWdlLXRpdGxlIHtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGNvbG9yOiB2YXIuJHByaW1hcnktY29sb3IyO1xyXG4gIH1cclxuXHJcbiAgLnBhZ2Utc3VidGl0bGUge1xyXG4gICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgICBjb2xvcjogIzlhYTBhNjtcclxuICAgIG1hcmdpbjogMDtcclxuICB9XHJcblxyXG4gIC5zdGF0dXMtcGlsbCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogNnB4O1xyXG4gICAgcGFkZGluZzogNnB4IDE2cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xyXG4gICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuXHJcbiAgICAmLnZhbGlkIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZmRmNDtcclxuICAgICAgY29sb3I6ICMxNmEzNGE7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNiYmY3ZDA7XHJcbiAgICB9XHJcblxyXG4gICAgJi5pbnZhbGlkIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZjJmMjtcclxuICAgICAgY29sb3I6ICNkYzI2MjY7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNmZWNhY2E7XHJcbiAgICB9XHJcblxyXG4gICAgbWF0LWljb24ge1xyXG4gICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICAgIHdpZHRoOiAxOHB4O1xyXG4gICAgICBoZWlnaHQ6IDE4cHg7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBJbmZvIE1lbnUgUGFuZWxcclxuLmluZm8tbWVudS1jb250ZW50IHtcclxuICBwYWRkaW5nOiAxcmVtO1xyXG4gIG1pbi13aWR0aDogMjUwcHg7XHJcbn1cclxuXHJcbi5pbmZvLWhlYWRlciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogOHB4O1xyXG4gIHBhZGRpbmctYm90dG9tOiA4cHg7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMmU4ZjA7XHJcblxyXG4gIG1hdC1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIHdpZHRoOiAxOHB4O1xyXG4gICAgaGVpZ2h0OiAxOHB4O1xyXG4gICAgY29sb3I6ICNmNTllMGI7XHJcbiAgfVxyXG5cclxuICBzcGFuIHtcclxuICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBjb2xvcjogIzFlMjkzYjtcclxuICB9XHJcbn1cclxuXHJcbi5pbmZvLWxpc3Qge1xyXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIHBhZGRpbmc6IDhweCAwIDA7XHJcblxyXG4gIGxpIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiA4cHg7XHJcbiAgICBwYWRkaW5nOiA2cHggMDtcclxuICAgIGZvbnQtc2l6ZTogMC44cmVtO1xyXG4gICAgY29sb3I6ICM0NzU1Njk7XHJcblxyXG4gICAgbWF0LWljb24ge1xyXG4gICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgIHdpZHRoOiAxNnB4O1xyXG4gICAgICBoZWlnaHQ6IDE2cHg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAmLnJlcXVpcmVkIGxpIG1hdC1pY29uIHtcclxuICAgIGNvbG9yOiAjMjJjNTVlO1xyXG4gIH1cclxuXHJcbiAgJi5yZWNvbW1lbmRlZCBsaSBtYXQtaWNvbiB7XHJcbiAgICBjb2xvcjogIzNiODJmNjtcclxuICB9XHJcbn1cclxuXHJcbi8vIE1vZGVybiBDYXJkc1xyXG4ubW9kZXJuLWNhcmQge1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4wMik7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2VkZjJmNztcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XHJcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xyXG5cclxuICAuY2FyZC1oZWFkZXIge1xyXG4gICAgcGFkZGluZzogMS4yNXJlbSAxLjVyZW07XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2YxZjVmOTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcblxyXG4gICAgJi53aXRoLWFjdGlvbnMge1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICB9XHJcblxyXG4gICAgaDMge1xyXG4gICAgICBmb250LXNpemU6IDEuMXJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgICAgY29sb3I6ICMyZDM3NDg7XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgIH1cclxuXHJcbiAgICAuaWNvbi1ib3gge1xyXG4gICAgICB3aWR0aDogNDBweDtcclxuICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHJcbiAgICAgIG1hdC1pY29uIHtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgd2lkdGg6IDIwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAmLnByaW1hcnkge1xyXG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyLiRwcmltYXJ5LWNvbG9yMSwgMC4xKTtcclxuICAgICAgICBjb2xvcjogdmFyLiRwcmltYXJ5LWNvbG9yMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJi5zZWNvbmRhcnkge1xyXG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyLiRzZWNvbmRhcnktY29sb3IzLCAwLjEpO1xyXG4gICAgICAgIGNvbG9yOiB2YXIuJHNlY29uZGFyeS1jb2xvcjM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICYuaW5mbyB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogI2UwZjJmZTtcclxuICAgICAgICBjb2xvcjogIzAyODRjNztcclxuICAgICAgfVxyXG5cclxuICAgICAgJi53YXJuaW5nIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjZmVmM2M3O1xyXG4gICAgICAgIGNvbG9yOiAjZDk3NzA2O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAmLnN1Y2Nlc3Mge1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICNkY2ZjZTc7XHJcbiAgICAgICAgY29sb3I6ICMxNmEzNGE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICYucHVycGxlIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjZjNlOGZmO1xyXG4gICAgICAgIGNvbG9yOiAjOTMzM2VhO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuY2FyZC1ib2R5IHtcclxuICAgIHBhZGRpbmc6IDEuNXJlbTtcclxuICB9XHJcblxyXG4gIC5hY3Rpb24tYnRuIHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBDdXN0b20gRm9ybSBGaWVsZHMgc3R5bGVcclxuLmN1c3RvbS1maWVsZCB7XHJcbiAgOjpuZy1kZWVwIC5tYXQtbWRjLWZvcm0tZmllbGQtZmxleCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG4gIH1cclxufVxyXG5cclxuLy8gVXBsb2FkIFNlY3Rpb25cclxuLnVwbG9hZC13cmFwcGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbn1cclxuXHJcbi5pbWFnZS11cGxvYWQtYm94IHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgd2lkdGg6IDE2MHB4O1xyXG4gIGhlaWdodDogMTYwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcclxuICBib3JkZXI6IDJweCBkYXNoZWQgI2UyZThmMDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICBib3JkZXItY29sb3I6IHZhci4kcHJpbWFyeS1jb2xvcjE7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhci4kcHJpbWFyeS1jb2xvcjEsIDAuMDIpO1xyXG4gIH1cclxuXHJcbiAgJi5oYXMtaW1hZ2Uge1xyXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcclxuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG4ucHJldmlldy1pbWFnZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xyXG59XHJcblxyXG4ucGxhY2Vob2xkZXItY29udGVudCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGNvbG9yOiAjOTRhM2I4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMC41cmVtO1xyXG5cclxuICBtYXQtaWNvbiB7XHJcbiAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB3aWR0aDogNDBweDtcclxuICAgIG9wYWNpdHk6IDAuNTtcclxuICB9XHJcblxyXG4gIHNwYW4ge1xyXG4gICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICB9XHJcbn1cclxuXHJcbi51cGxvYWQtb3ZlcmxheSB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGJvdHRvbTogMDtcclxuICBsZWZ0OiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC42KTtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgcGFkZGluZzogMC41cmVtO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LXNpemU6IDAuNzVyZW07XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwMCUpO1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2U7XHJcbn1cclxuXHJcbi5pbWFnZS11cGxvYWQtYm94OmhvdmVyIC51cGxvYWQtb3ZlcmxheSB7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xyXG59XHJcblxyXG4vLyBMaXN0IEl0ZW1zIChQT0MgLyBDYWZldGVyaWEpXHJcbi5saXN0LWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMXJlbTtcclxufVxyXG5cclxuLml0ZW0tY2FyZCB7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2YzZjRmNjtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIHBhZGRpbmc6IDEuMjVyZW07XHJcbiAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcclxuICAgIGJveC1zaGFkb3c6IDAgMTBweCAxNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDRweCA2cHggLTJweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xyXG4gICAgYm9yZGVyLWNvbG9yOiByZ2JhKHZhci4kcHJpbWFyeS1jb2xvcjEsIDAuMyk7XHJcbiAgfVxyXG5cclxuICAuY2FyZC10aXRsZSB7XHJcbiAgICBjb2xvcjogIzExMTgyNztcclxuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xyXG4gIH1cclxuXHJcbiAgLmljb24teHMge1xyXG4gICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgaGVpZ2h0OiAxNnB4O1xyXG4gICAgd2lkdGg6IDE2cHg7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgY29sb3I6ICM2YjcyODA7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLy8gU3RpY2t5IEFjdGlvbiBCYXJcclxuLmFjdGlvbi1iYXItY29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgYm90dG9tOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICB6LWluZGV4OiAxMDA7XHJcbn1cclxuXHJcbi5hY3Rpb24tYmFyIHtcclxuICBwb2ludGVyLWV2ZW50czogYXV0bztcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOTUpO1xyXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig4cHgpO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICBwYWRkaW5nOiAwLjc1cmVtIDEuNXJlbTtcclxuICBib3JkZXItcmFkaXVzOiA1MHB4O1xyXG4gIGJveC1zaGFkb3c6IDAgMTBweCAyNXB4IC01cHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDhweCAxMHB4IC02cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAxcmVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDEuNHJlbTtcclxuXHJcbiAgLmJ0bi1zdWJtaXQge1xyXG4gICAgLy8gVXBkYXRlZCB0byBnZW5lcmljIHN1Ym1pdCBjbGFzcywgb3Iga2VlcCBidG4tdXBkYXRlL2J0bi1hZGQgYnV0IHN0eWxlZCBzYW1lXHJcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xyXG4gICAgcGFkZGluZzogMCAycmVtO1xyXG4gICAgaGVpZ2h0OiA0NHB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDAuNXJlbTtcclxuICB9XHJcblxyXG4gIC8vIFNwZWNpZmljIG92ZXJyaWRlcyBmb3IgYWRkL3VwZGF0ZSB0byBtYXAgdG8gbmV3IHN0eWxlXHJcbiAgLmJ0bi11cGRhdGUsXHJcbiAgLmJ0bi1hZGQge1xyXG4gICAgQGV4dGVuZCAuYnRuLXN1Ym1pdDtcclxuICB9XHJcblxyXG4gIC5idG4tY2FuY2VsLFxyXG4gIC5idG4tZGVsZXRlIHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICBoZWlnaHQ6IDQ0cHg7XHJcbiAgICBwYWRkaW5nOiAwIDEuNXJlbTtcclxuICAgIGNvbG9yOiAjNjQ3NDhiO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG5cclxuICAgICY6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjFmNWY5O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gRGlhbG9nXHJcbi5kaWFsb2ctaGVhZGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDFyZW0gMS41cmVtO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWVlO1xyXG5cclxuICBoMiB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBmb250LXNpemU6IDEuMjVyZW07XHJcbiAgfVxyXG59XHJcblxyXG4uY2hlY2tib3gtZ3JpZCB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgyMDBweCwgMWZyKSk7XHJcbiAgZ2FwOiAwLjVyZW0gMXJlbTtcclxuICBwYWRkaW5nOiAxcmVtO1xyXG4gIGJhY2tncm91bmQ6ICNmOGZhZmM7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7XHJcbn1cclxuXHJcbi5maWVsZC1sYWJlbCB7XHJcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIGNvbG9yOiAjMzc0MTUxO1xyXG59XHJcblxyXG4ucmVxdWlyZWQtaW5wdXQge1xyXG4gIGNvbG9yOiAjZGMyNjI2O1xyXG59XHJcblxyXG4uYWRtaW4tcm93IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAxcmVtO1xyXG4gIHBhZGRpbmc6IDAuNXJlbTtcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmYWZiO1xyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 36977:
/*!*********************************************************************************!*\
  !*** ./src/app/deskdyne-components/add-organization/add-organization.module.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddOrganizationModule: () => (/* binding */ AddOrganizationModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _add_organization_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-organization-routing.module */ 59681);
/* harmony import */ var _add_organization_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add-organization.component */ 37905);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _set_geolocation_set_geolocation_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../set-geolocation/set-geolocation.module */ 94863);
/* harmony import */ var src_app_material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/material.module */ 29099);
/* harmony import */ var src_shared_directives_common_directives_directives_modules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/shared/directives/common-directives.directives.modules */ 23420);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 61699);








class AddOrganizationModule {
  static #_ = this.ɵfac = function AddOrganizationModule_Factory(t) {
    return new (t || AddOrganizationModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
    type: AddOrganizationModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _add_organization_routing_module__WEBPACK_IMPORTED_MODULE_0__.AddOrganizationRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _set_geolocation_set_geolocation_module__WEBPACK_IMPORTED_MODULE_2__.SetGeolocationModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_3__.MaterialModule, src_shared_directives_common_directives_directives_modules__WEBPACK_IMPORTED_MODULE_4__.DirectivesModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AddOrganizationModule, {
    declarations: [_add_organization_component__WEBPACK_IMPORTED_MODULE_1__.AddOrganizationComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _add_organization_routing_module__WEBPACK_IMPORTED_MODULE_0__.AddOrganizationRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _set_geolocation_set_geolocation_module__WEBPACK_IMPORTED_MODULE_2__.SetGeolocationModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_3__.MaterialModule, src_shared_directives_common_directives_directives_modules__WEBPACK_IMPORTED_MODULE_4__.DirectivesModule],
    exports: [_add_organization_component__WEBPACK_IMPORTED_MODULE_1__.AddOrganizationComponent]
  });
})();

/***/ }),

/***/ 61253:
/*!***************************************!*\
  !*** ./src/shared/constants/regex.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   REGEX: () => (/* binding */ REGEX)
/* harmony export */ });
const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  PHONE: /^[0-9]{10}$/,
  GSTIN: /^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z])$/,
  ACCESS_CODE: /^[0-9]{4}$/,
  IFSC: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  UPI: /^[\w.-]+@[\w.-]+$/,
  ACCOUNTNO: /^[0-9]{6,18}$/,
  NAME: /^[A-Za-z]+$/,
  ID: /^[0-9]+$/,
  LOCATION: /^[A-Za-z0-9 ]+$/,
  SUBSIDY: /^[A-Za-z0-9_-]{1,50}$/
};

/***/ }),

/***/ 53183:
/*!*********************************************************!*\
  !*** ./src/shared/directives/auto-tooltip.directive.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutoTooltipDirective: () => (/* binding */ AutoTooltipDirective)
/* harmony export */ });
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);



class AutoTooltipDirective {
  constructor(el, tooltip) {
    this.el = el;
    this.tooltip = tooltip;
  }
  ngAfterViewInit() {
    // allow opt-out
    if (this.el.nativeElement.hasAttribute('noAutoTooltip')) {
      return;
    }
    const iconText = this.el.nativeElement.innerText.trim().toLowerCase();
    const tooltipMap = {
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add',
      visibility: 'View',
      remove: 'Remove',
      save: 'Save'
    };
    if (tooltipMap[iconText]) {
      this.tooltip.message = tooltipMap[iconText];
      this.tooltip.position = 'below';
      // show on hover
      this.el.nativeElement.addEventListener('mouseenter', () => {
        this.tooltip.show();
      });
      this.el.nativeElement.addEventListener('mouseleave', () => {
        this.tooltip.hide();
      });
    }
  }
  static #_ = this.ɵfac = function AutoTooltipDirective_Factory(t) {
    return new (t || AutoTooltipDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_tooltip__WEBPACK_IMPORTED_MODULE_1__.MatTooltip));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: AutoTooltipDirective,
    selectors: [["mat-icon"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_angular_material_tooltip__WEBPACK_IMPORTED_MODULE_1__.MatTooltip])]
  });
}

/***/ }),

/***/ 50016:
/*!**************************************************************!*\
  !*** ./src/shared/directives/common-directives.directive.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlphaNumericDirective: () => (/* binding */ AlphaNumericDirective),
/* harmony export */   OnlyAlphaDirective: () => (/* binding */ OnlyAlphaDirective),
/* harmony export */   OnlyNumberDirective: () => (/* binding */ OnlyNumberDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 28849);


class OnlyAlphaDirective {
  constructor(control) {
    this.control = control;
  }
  onInput(event) {
    const input = event.target;
    const cleaned = input.value.replace(/[^a-zA-Z ]/g, '');
    if (cleaned !== input.value) {
      input.value = cleaned;
      // 🔥 Update Angular form control manually
      this.control.control?.setValue(cleaned, {
        emitEvent: false
      });
    }
  }
  static #_ = this.ɵfac = function OnlyAlphaDirective_Factory(t) {
    return new (t || OnlyAlphaDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControl));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: OnlyAlphaDirective,
    selectors: [["", "appOnlyAlpha", ""]],
    hostBindings: function OnlyAlphaDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function OnlyAlphaDirective_input_HostBindingHandler($event) {
          return ctx.onInput($event);
        });
      }
    }
  });
}
class OnlyNumberDirective {
  constructor(control) {
    this.control = control;
  }
  onInput(event) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  }
  static #_ = this.ɵfac = function OnlyNumberDirective_Factory(t) {
    return new (t || OnlyNumberDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControl));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: OnlyNumberDirective,
    selectors: [["", "appOnlyNumber", ""]],
    hostBindings: function OnlyNumberDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function OnlyNumberDirective_input_HostBindingHandler($event) {
          return ctx.onInput($event);
        });
      }
    }
  });
}
class AlphaNumericDirective {
  onInput(event) {
    event.target.value = event.target.value.replace(/[^A-Za-z0-9 ]/g, '');
  }
  static #_ = this.ɵfac = function AlphaNumericDirective_Factory(t) {
    return new (t || AlphaNumericDirective)();
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: AlphaNumericDirective,
    selectors: [["", "appAlphaNumeric", ""]],
    hostBindings: function AlphaNumericDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function AlphaNumericDirective_input_HostBindingHandler($event) {
          return ctx.onInput($event);
        });
      }
    }
  });
}

/***/ }),

/***/ 23420:
/*!***********************************************************************!*\
  !*** ./src/shared/directives/common-directives.directives.modules.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DirectivesModule: () => (/* binding */ DirectivesModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _common_directives_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common-directives.directive */ 50016);
/* harmony import */ var _auto_tooltip_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auto-tooltip.directive */ 53183);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);




class DirectivesModule {
  static #_ = this.ɵfac = function DirectivesModule_Factory(t) {
    return new (t || DirectivesModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: DirectivesModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](DirectivesModule, {
    declarations: [_common_directives_directive__WEBPACK_IMPORTED_MODULE_0__.OnlyAlphaDirective, _common_directives_directive__WEBPACK_IMPORTED_MODULE_0__.OnlyNumberDirective, _common_directives_directive__WEBPACK_IMPORTED_MODULE_0__.AlphaNumericDirective, _auto_tooltip_directive__WEBPACK_IMPORTED_MODULE_1__.AutoTooltipDirective],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule],
    exports: [_common_directives_directive__WEBPACK_IMPORTED_MODULE_0__.OnlyAlphaDirective, _common_directives_directive__WEBPACK_IMPORTED_MODULE_0__.OnlyNumberDirective, _common_directives_directive__WEBPACK_IMPORTED_MODULE_0__.AlphaNumericDirective, _auto_tooltip_directive__WEBPACK_IMPORTED_MODULE_1__.AutoTooltipDirective]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_deskdyne-components_add-organization_add-organization_module_ts.js.map