"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_scheduled-notification_scheduled-notification_module_ts"],{

/***/ 84179:
/*!*********************************************************************************************!*\
  !*** ./src/app/scheduled-notification/create-notification/create-notification.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreateNotificationComponent: () => (/* binding */ CreateNotificationComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 17401);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var src_service_toaster_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/service/toaster.service */ 19586);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/datepicker */ 82226);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/progress-spinner */ 33910);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/chips */ 21757);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/checkbox */ 56658);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/radio */ 92106);





















function CreateNotificationComponent_mat_error_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Title is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function CreateNotificationComponent_mat_error_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Body is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function CreateNotificationComponent_mat_radio_button_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-radio-button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const type_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", type_r8.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", type_r8.viewValue, " ");
  }
}
function CreateNotificationComponent_div_24_mat_option_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-option", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const org_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", org_r11._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](org_r11.organization_name);
  }
}
function CreateNotificationComponent_div_24_mat_error_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Please select at least one organization");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function CreateNotificationComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "mat-form-field", 4)(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Select Organization(s)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "mat-select", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, CreateNotificationComponent_div_24_mat_option_6_Template, 2, 2, "mat-option", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, CreateNotificationComponent_div_24_mat_error_7_Template, 2, 0, "mat-error", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r3.orgList);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx_r3.form.get("targetIds")) == null ? null : tmp_1_0.hasError("required"));
  }
}
function CreateNotificationComponent_div_25_mat_option_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-option", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const org_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", org_r16._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](org_r16.organization_name);
  }
}
function CreateNotificationComponent_div_25_mat_error_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Please select an organization first");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function CreateNotificationComponent_div_25_div_9_mat_option_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-option", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const cafe_r19 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", cafe_r19.cafeteria_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](cafe_r19.cafeteria_name);
  }
}
function CreateNotificationComponent_div_25_div_9_mat_error_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Please select at least one cafeteria");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function CreateNotificationComponent_div_25_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "mat-form-field", 4)(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Select Cafeteria(s)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "mat-select", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, CreateNotificationComponent_div_25_div_9_mat_option_6_Template, 2, 2, "mat-option", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, CreateNotificationComponent_div_25_div_9_mat_error_7_Template, 2, 0, "mat-error", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r14.cafeteriaList);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx_r14.form.get("targetIds")) == null ? null : tmp_1_0.hasError("required"));
  }
}
function CreateNotificationComponent_div_25_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "p", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Please select an organization to view available cafeterias.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
}
function CreateNotificationComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "div", 2)(2, "div", 3)(3, "mat-form-field", 4)(4, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Select Organization");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "mat-select", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, CreateNotificationComponent_div_25_mat_option_7_Template, 2, 2, "mat-option", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, CreateNotificationComponent_div_25_mat_error_8_Template, 2, 0, "mat-error", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, CreateNotificationComponent_div_25_div_9_Template, 8, 2, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, CreateNotificationComponent_div_25_div_10_Template, 4, 0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r4.orgList);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx_r4.form.get("parentOrgId")) == null ? null : tmp_1_0.hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (tmp_2_0 = ctx_r4.form.get("parentOrgId")) == null ? null : tmp_2_0.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !((tmp_3_0 = ctx_r4.form.get("parentOrgId")) == null ? null : tmp_3_0.value));
  }
}
function CreateNotificationComponent_div_26_mat_option_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-option", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const org_r26 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", org_r26._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](org_r26.organization_name);
  }
}
function CreateNotificationComponent_div_26_mat_option_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-option", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const cafe_r27 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", cafe_r27.cafeteria_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](cafe_r27.cafeteria_name);
  }
}
function CreateNotificationComponent_div_26_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "mat-form-field", 4)(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Search Users");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "mat-icon", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "search");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
}
function CreateNotificationComponent_div_26_div_19_div_3_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const user_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", user_r29 == null ? null : user_r29.org_name, " ");
  }
}
function CreateNotificationComponent_div_26_div_19_div_3_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 46)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const user_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](user_r29 == null ? null : user_r29.phone_number);
  }
}
function CreateNotificationComponent_div_26_div_19_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CreateNotificationComponent_div_26_div_19_div_3_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r35);
      const user_r29 = restoredCtx.$implicit;
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r34.toggleUserSelection(user_r29));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 39)(2, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 41)(5, "div", 42)(6, "h3", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, CreateNotificationComponent_div_26_div_19_div_3_span_8_Template, 2, 1, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 45)(10, "div", 46)(11, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "badge");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 46)(16, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "email");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](20, CreateNotificationComponent_div_26_div_19_div_3_div_20_Template, 5, 1, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "div", 49)(22, "mat-checkbox", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CreateNotificationComponent_div_26_div_19_div_3_Template_mat_checkbox_click_22_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r35);
      const user_r29 = restoredCtx.$implicit;
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r36.toggleUserSelection(user_r29));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const user_r29 = ctx.$implicit;
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("selected", ctx_r28.isUserSelected(user_r29));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r28.getInitials(user_r29 == null ? null : user_r29.emp_name));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("matTooltip", user_r29.emp_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"]((user_r29 == null ? null : user_r29.emp_name) || "Unknown");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", user_r29 == null ? null : user_r29.org_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("matTooltip", user_r29.emp_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"]((user_r29 == null ? null : user_r29.emp_id) || "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("matTooltip", user_r29.emp_email);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"]((user_r29 == null ? null : user_r29.emp_email) || "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", user_r29 == null ? null : user_r29.phone_number);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("checked", ctx_r28.isUserSelected(user_r29));
  }
}
function CreateNotificationComponent_div_26_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, CreateNotificationComponent_div_26_div_19_div_3_Template, 23, 12, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r23.filteredUsersList);
  }
}
function CreateNotificationComponent_div_26_div_20_mat_chip_row_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-chip-row", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("removed", function CreateNotificationComponent_div_26_div_20_mat_chip_row_6_Template_mat_chip_row_removed_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r41);
      const user_r39 = restoredCtx.$implicit;
      const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r40.removeUser(user_r39));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "button", 56)(3, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const user_r39 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", user_r39.emp_name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("aria-label", "remove " + user_r39.emp_name);
  }
}
function CreateNotificationComponent_div_26_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 8)(1, "div", 3)(2, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "mat-chip-grid", 52, 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, CreateNotificationComponent_div_26_div_20_mat_chip_row_6_Template, 5, 2, "mat-chip-row", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Selected Users (", ctx_r24.selectedUsers.length, "):");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r24.selectedUsers);
  }
}
function CreateNotificationComponent_div_26_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Please select at least one user.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
}
function CreateNotificationComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30)(1, "div", 2)(2, "div", 31)(3, "mat-form-field", 4)(4, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Filter by Organization");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "mat-select", 32)(7, "mat-option");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "-- None --");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, CreateNotificationComponent_div_26_mat_option_9_Template, 2, 2, "mat-option", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 31)(11, "mat-form-field", 4)(12, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Filter by Cafeteria");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "mat-select", 33)(15, "mat-option");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "-- None --");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, CreateNotificationComponent_div_26_mat_option_17_Template, 2, 2, "mat-option", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](18, CreateNotificationComponent_div_26_div_18_Template, 8, 0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](19, CreateNotificationComponent_div_26_div_19_Template, 4, 1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](20, CreateNotificationComponent_div_26_div_20_Template, 7, 2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](21, CreateNotificationComponent_div_26_div_21_Template, 4, 0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    let tmp_2_0;
    let tmp_5_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r5.orgList);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r5.cafeteriaList);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r5.usersList.length > 0 || ((tmp_2_0 = ctx_r5.form.get("filterOrgId")) == null ? null : tmp_2_0.value) || ((tmp_2_0 = ctx_r5.form.get("filterCafeId")) == null ? null : tmp_2_0.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r5.filteredUsersList == null ? null : ctx_r5.filteredUsersList.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r5.selectedUsers.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ((tmp_5_0 = ctx_r5.form.get("individualIds")) == null ? null : tmp_5_0.hasError("required")) && (ctx_r5.form.touched || ctx_r5.form.dirty));
  }
}
function CreateNotificationComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 8)(1, "div", 31)(2, "mat-form-field", 4)(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "input", 57)(6, "mat-datepicker-toggle", 58)(7, "mat-datepicker", null, 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 31)(10, "mat-form-field", 4)(11, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "Time");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](13, "input", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](8);
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matDatepicker", _r42)("min", ctx_r6.minDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("for", _r42);
  }
}
function CreateNotificationComponent_mat_spinner_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "mat-spinner", 61);
  }
}
class CreateNotificationComponent {
  constructor(fb, apiMainService, toaster, dialogRef, data) {
    this.fb = fb;
    this.apiMainService = apiMainService;
    this.toaster = toaster;
    this.dialogRef = dialogRef;
    this.data = data;
    this.isLoading = false;
    this.orgList = [];
    this.cafeteriaList = [];
    this.usersList = [];
    this.selectedUsers = [];
    this.filteredUsersList = []; // For search/filter within the list
    this.targetTypes = [{
      value: 'organization',
      viewValue: 'Organization'
    }, {
      value: 'cafeteria',
      viewValue: 'Cafeteria'
    }, {
      value: 'individual',
      viewValue: 'Individual (Select Users)'
    }, {
      value: 'all',
      viewValue: 'All Users'
    }];
    this.minDate = new Date();
    this.form = this.fb.group({
      title: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
      body: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
      targetType: ['organization', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
      targetIds: [[]],
      // New fields for Individual selection flow
      filterOrgId: [''],
      filterCafeId: [''],
      userSearch: [''],
      individualIds: [[]],
      parentOrgId: [''],
      deliveryMode: ['schedule', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
      scheduledDate: [new Date()],
      scheduledTime: ['12:00']
    });
  }
  ngOnInit() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.fetchOrgList();
      // Cafeteria list now depends on Org selection, so no initial fetch
      if (_this.data) {
        _this.form.patchValue({
          title: _this.data.title,
          body: _this.data.body,
          targetType: (_this.data.targetType || '').toLowerCase()
        });
        // Handle target population logic
        const type = (_this.data.targetType || '').toLowerCase();
        if (type === 'organization') {
          // For Org, targetIds are org IDs.
          _this.form.patchValue({
            targetIds: _this.data.targetIds
          });
        } else if (type === 'cafeteria') {
          // For Cafeteria, targetIds are cafe IDs.
          // We need to find the parent Org to populate the dropdown and parentOrgId
          if (_this.data.targetIds && _this.data.targetIds.length > 0) {
            const firstCafeId = _this.data.targetIds[0];
            // Find org containing this cafe
            const parentOrg = _this.orgList.find(o => o.cafeteriaList && o.cafeteriaList.some(c => c.cafeteria_id === firstCafeId));
            if (parentOrg) {
              _this.form.patchValue({
                parentOrgId: parentOrg.orgID || parentOrg._id
              });
              // The subscription will trigger updateCafeteriaList, but might be async or race condition if we patch targetIds immediately.
              // updateCafeteriaList is synchronous.
              // But the subscription clears targetIds.
              // We should wait or manually set it.
              // The subscription clears targetIds!
              // We must set targetIds AFTER the subscription runs, or manually update list and set value preventing clear?
              // The subscription detects change in parentOrgId.
              // To avoid conflict, we can manually call updateCafeteriaList and set targetIds, 
              // but we need to ensure the subscription doesn't clear it.
              // The subscription uses { emitEvent: false } ? No, it clears it.
              // Let's use emitEvent: false when setting parentOrgId to avoid the subscription clearing targetIds,
              // then manually update the list and set targetIds.
              _this.form.get('parentOrgId')?.setValue(parentOrg.orgID || parentOrg._id, {
                emitEvent: false
              });
              _this.updateCafeteriaList(parentOrg.orgID || parentOrg._id);
              _this.form.patchValue({
                targetIds: _this.data.targetIds
              });
            }
          }
        } else if (type === 'individual') {
          // If we have data.targetIds as user IDs
          // We typically can't fully restore the state without fetching all users or knowing the Org/Cafe context.
          // Best effort: just prefill Title/Body.
        }
      }
      // Watch targetType changes to update validation
      _this.form.get('targetType')?.valueChanges.subscribe(val => {
        _this.updateValidators(val);
        _this.usersList = [];
        _this.filteredUsersList = [];
        _this.selectedUsers = [];
        _this.form.patchValue({
          filterOrgId: '',
          filterCafeId: '',
          individualIds: [],
          userSearch: '',
          targetIds: [],
          parentOrgId: '' // Clear parent org selection
        }, {
          emitEvent: false
        });
        // If switching to cafeteria mode, we need to clear cafeteria list until org is selected
        if (val === 'cafeteria') {
          _this.cafeteriaList = [];
        }
      });
      // Watch filter changes to fetch users or cafeterias
      _this.form.get('filterOrgId')?.valueChanges.subscribe( /*#__PURE__*/function () {
        var _ref = (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (val) {
          if (_this.form.get('targetType')?.value === 'individual') {
            _this.form.patchValue({
              filterCafeId: ''
            }, {
              emitEvent: false
            });
            _this.updateCafeteriaList(val);
            yield _this.fetchUsersByOrg(val);
          }
        });
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
      // NEW: specific handler for 'cafeteria' target type organization selection
      _this.form.get('parentOrgId')?.valueChanges.subscribe(val => {
        if (_this.form.get('targetType')?.value === 'cafeteria') {
          _this.form.patchValue({
            targetIds: []
          }, {
            emitEvent: false
          }); // Clear selected cafeterias
          _this.updateCafeteriaList(val);
        }
      });
      _this.form.get('filterCafeId')?.valueChanges.subscribe( /*#__PURE__*/function () {
        var _ref2 = (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (val) {
          if (val && _this.form.get('targetType')?.value === 'individual') {
            // If org is already selected, we don't clear it.
            // We just fetch users for this cafe
            yield _this.fetchUsersByCafe(val);
          }
        });
        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());
      _this.form.get('userSearch')?.valueChanges.subscribe(val => {
        _this.filterUsers(val);
      });
      // Watch parentOrgId for Cafeteria mode logic similarly
      _this.form.get('parentOrgId')?.valueChanges.subscribe(val => {
        if (_this.form.get('targetType')?.value === 'cafeteria') {
          // Update cafeteria list based on this org
          _this.updateCafeteriaList(val);
          // Reset targetIds (cafeteria selection)
          _this.form.patchValue({
            targetIds: []
          });
        }
      });
      _this.updateValidators('organization'); // Initial state
    })();
  }

  updateValidators(targetType) {
    const targetIdsControl = this.form.get('targetIds');
    const individualIdsControl = this.form.get('individualIds');
    const filterOrgIdControl = this.form.get('filterOrgId');
    const parentOrgIdControl = this.form.get('parentOrgId'); // New control
    // Reset validators
    targetIdsControl?.clearValidators();
    individualIdsControl?.clearValidators();
    filterOrgIdControl?.clearValidators();
    parentOrgIdControl?.clearValidators(); // Clear for new control
    if (targetType === 'organization') {
      targetIdsControl?.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required]);
    } else if (targetType === 'cafeteria') {
      // For cafeteria, we need to select specific cafeterias (targetIds)
      // AND we logically need an org selected to populate the list. 
      // I'll add a validator for the Org control in the HTML update step.
      targetIdsControl?.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required]);
      parentOrgIdControl?.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required]); // Parent org is required for cafeteria selection
    } else if (targetType === 'individual') {
      individualIdsControl?.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required]);
    }
    targetIdsControl?.updateValueAndValidity();
    individualIdsControl?.updateValueAndValidity();
    filterOrgIdControl?.updateValueAndValidity();
    parentOrgIdControl?.updateValueAndValidity(); // Update validity for new control
  }

  fetchOrgList() {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // Using B2B_fetchFilteredAllOrgs matching outlet-billing pattern
        const searchObj = {
          countOnly: false
        };
        const res = yield _this2.apiMainService.B2B_fetchFilteredAllOrgs(searchObj, 1);
        if (res) {
          // The API returns paginated data usually, let's check structure or assume res.data is the list if it matches previous usage
          // In outlet-billing: this.orglist = await this.api.B2B_fetchFilteredAllOrgs(searchObj, page);
          // And in common-outlet-cafe-select: this.orglist = await ... 
          // apiMainService.ts says: return this.apiHttpService.REQUEST(...) 
          // Let's assume it returns { data: [...] } or just [...]
          // Looking at common-select, it assigns directly: this.orglist = await ...
          // So I should check if res is the array or res.data. 
          // apiMainService.ts typically returns the response body.
          // B2B_fetchFilteredAllOrgs likely returns { status: true, data: [...] } or just [...]
          // I will try assuming standard service response { status, data } or if it returns direct array.
          // Safest is to log or check; but based on previous code `getOrgList` returned {status, data}.
          // `B2B_fetchFilteredAllOrgs` is used in `CommonOutletCafeSelectComponent`: `this.orglist = await ...`.
          // If `apiHttpService.REQUEST` returns the body, and `B2B_fetchFilteredAllOrgs` is a standard API, it likely returns an object with data.
          // However, CommonOutletCafeSelectComponent uses `this.orglist = await this.api.B2B_fetchFilteredAllOrgs(...)`.
          // This implies the promise resolves to the list itself OR `CommonComponent` handles it loosely.
          // I'll write code to handle both or `res.data`.
          _this2.orgList = Array.isArray(res) ? res : res.data || [];
        }
      } catch (error) {
        console.error('Error fetching org list', error);
      }
    })();
  }
  // Helper to update cafeteria list based on selected Org ID
  updateCafeteriaList(orgId) {
    const selectedOrg = this.orgList.find(o => o.orgID === orgId || o._id === orgId);
    if (selectedOrg && selectedOrg.cafeteriaList) {
      this.cafeteriaList = selectedOrg.cafeteriaList;
    } else {
      this.cafeteriaList = [];
    }
  }
  fetchUsersByOrg(orgId) {
    var _this3 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!orgId) return;
      _this3.isLoading = true;
      try {
        const res = yield _this3.apiMainService.getEmployeeListByOrgId(orgId);
        if (res && res.status) {
          _this3.usersList = res.data || [];
          _this3.filterUsers(_this3.form.get('userSearch')?.value);
        } else {
          _this3.usersList = [];
          _this3.filteredUsersList = [];
          _this3.toaster.info('No users found.');
        }
      } catch (error) {
        console.error('Error fetching users by org', error);
        _this3.toaster.error('Failed to fetch users.');
        _this3.usersList = [];
        _this3.filteredUsersList = [];
      } finally {
        _this3.isLoading = false;
      }
    })();
  }
  fetchUsersByCafe(cafeId) {
    var _this4 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!cafeId) return;
      _this4.isLoading = true;
      try {
        const res = yield _this4.apiMainService.getEmployeelistByCafeteriaId(cafeId);
        if (res && res.status) {
          _this4.usersList = res.data || [];
          _this4.filterUsers(_this4.form.get('userSearch')?.value);
        } else {
          _this4.usersList = [];
          _this4.filteredUsersList = [];
          _this4.toaster.info('No users found.');
        }
      } catch (error) {
        console.error('Error fetching users by cafeteria', error);
        _this4.toaster.error('Failed to fetch users.');
        _this4.usersList = [];
        _this4.filteredUsersList = [];
      } finally {
        _this4.isLoading = false;
      }
    })();
  }
  filterUsers(query) {
    if (!query) {
      this.filteredUsersList = this.usersList;
      return;
    }
    const lowerQuery = query.toLowerCase();
    this.filteredUsersList = this.usersList.filter(u => u.emp_name?.toLowerCase().includes(lowerQuery) || u.emp_id?.toLowerCase().includes(lowerQuery) || u.emp_email?.toLowerCase().includes(lowerQuery));
  }
  toggleUserSelection(user) {
    const index = this.selectedUsers.findIndex(u => u._id === user._id);
    if (index === -1) {
      this.selectedUsers.push(user);
    } else {
      this.selectedUsers.splice(index, 1);
    }
    this.updateIndividualIds();
  }
  isUserSelected(user) {
    return this.selectedUsers.some(u => u._id === user._id);
  }
  removeUser(user) {
    this.selectedUsers = this.selectedUsers.filter(u => u._id !== user._id);
    this.updateIndividualIds();
  }
  // Helper to generate initials
  getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }
  updateIndividualIds() {
    const ids = this.selectedUsers.map(u => u._id);
    this.form.patchValue({
      individualIds: ids
    });
    this.form.get('individualIds')?.updateValueAndValidity();
  }
  submit() {
    var _this5 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this5.form.invalid) return;
      _this5.isLoading = true;
      const formVal = _this5.form.value;
      const payload = {
        title: formVal.title,
        body: formVal.body,
        targetType: formVal.targetType,
        notificationType: 'USER'
      };
      if (formVal.targetType === 'individual') {
        payload.targetIds = formVal.individualIds;
      } else if (formVal.targetType !== 'all') {
        payload.targetIds = formVal.targetIds;
      }
      // Handle Delivery (Schedule vs Send Now)
      if (formVal.deliveryMode === 'schedule') {
        const date = new Date(formVal.scheduledDate);
        if (formVal.scheduledTime) {
          const [hours, minutes] = formVal.scheduledTime.split(':').map(val => parseInt(val, 10));
          date.setHours(hours, minutes, 0, 0);
        }
        payload.scheduledAt = date.toISOString();
        try {
          const res = yield _this5.apiMainService.createScheduledNotification(payload);
          _this5.handleResponse(res);
        } catch (err) {
          _this5.handleError(err);
        }
      } else {
        try {
          const res = yield _this5.apiMainService.sendNowNotification(payload);
          _this5.handleResponse(res);
        } catch (err) {
          _this5.handleError(err);
        }
      }
    })();
  }
  handleResponse(res) {
    this.isLoading = false;
    if (res) {
      this.toaster.success('Notification submitted successfully');
      this.dialogRef.close(true);
    } else {
      this.toaster.error(res.message || 'Operation failed');
    }
  }
  handleError(err) {
    this.isLoading = false;
    console.error(err);
    this.toaster.error('Something went wrong');
  }
  close() {
    this.dialogRef.close(false);
  }
  static #_ = this.ɵfac = function CreateNotificationComponent_Factory(t) {
    return new (t || CreateNotificationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_service_toaster_service__WEBPACK_IMPORTED_MODULE_2__.ToasterService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MAT_DIALOG_DATA));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: CreateNotificationComponent,
    selectors: [["app-create-notification"]],
    decls: 44,
    vars: 11,
    consts: [["mat-dialog-title", ""], [1, "notification-form", 3, "formGroup"], [1, "row"], [1, "col-md-12"], ["appearance", "outline", 1, "w-100"], ["matInput", "", "formControlName", "title", "placeholder", "e.g. Lunch Menu Update"], [4, "ngIf"], ["matInput", "", "formControlName", "body", "rows", "3", "placeholder", "Notification message content..."], [1, "row", "mt-2"], [1, "col-md-12", "mb-3"], ["formControlName", "targetType", "aria-label", "Select an option"], ["class", "mr-3", 3, "value", 4, "ngFor", "ngForOf"], ["class", "row", 4, "ngIf"], ["class", "individual-selection-section", 4, "ngIf"], [1, "row", "mt-3"], [1, "col-md-12", "mb-2"], ["formControlName", "deliveryMode"], ["value", "schedule", 1, "mr-3"], ["value", "now"], ["class", "row mt-2", 4, "ngIf"], ["mat-dialog-actions", "", "align", "end"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "disabled", "click"], ["diameter", "20", "class", "mr-2 d-inline-block", 4, "ngIf"], [1, "mr-3", 3, "value"], ["formControlName", "targetIds", "multiple", ""], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], ["formControlName", "parentOrgId"], [1, "text-muted", "small", "ml-1"], [1, "individual-selection-section"], [1, "col-md-6"], ["formControlName", "filterOrgId"], ["formControlName", "filterCafeId"], ["matInput", "", "formControlName", "userSearch", "placeholder", "Search by name, email or ID"], ["matSuffix", ""], [1, "user-grid"], ["class", "user-card", 3, "selected", "click", 4, "ngFor", "ngForOf"], [1, "user-card", 3, "click"], [1, "user-avatar"], [1, "avatar-text"], [1, "user-info"], [1, "user-primary"], [1, "user-name", 3, "matTooltip"], ["class", "user-org-badge", 4, "ngIf"], [1, "user-details"], [1, "detail-item"], [3, "matTooltip"], ["class", "detail-item", 4, "ngIf"], [1, "user-checkbox"], ["color", "primary", 3, "checked", "click"], [1, "user-org-badge"], ["aria-label", "Selected users", 1, "mt-1", "selected-users-chips"], ["chipGrid", ""], [3, "removed", 4, "ngFor", "ngForOf"], [3, "removed"], ["matChipRemove", ""], ["matInput", "", "formControlName", "scheduledDate", 3, "matDatepicker", "min"], ["matSuffix", "", 3, "for"], ["picker", ""], ["matInput", "", "type", "time", "formControlName", "scheduledTime"], ["diameter", "20", 1, "mr-2", "d-inline-block"]],
    template: function CreateNotificationComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Create Notification");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "mat-dialog-content")(3, "form", 1)(4, "div", 2)(5, "div", 3)(6, "mat-form-field", 4)(7, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Title");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](9, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, CreateNotificationComponent_mat_error_10_Template, 2, 0, "mat-error", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 3)(12, "mat-form-field", 4)(13, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Body");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](15, "textarea", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, CreateNotificationComponent_mat_error_16_Template, 2, 0, "mat-error", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 8)(18, "div", 9)(19, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "Target Audience:");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](21, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "mat-radio-group", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](23, CreateNotificationComponent_mat_radio_button_23_Template, 2, 2, "mat-radio-button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](24, CreateNotificationComponent_div_24_Template, 8, 2, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](25, CreateNotificationComponent_div_25_Template, 11, 4, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](26, CreateNotificationComponent_div_26_Template, 22, 6, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "div", 14)(28, "div", 15)(29, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](30, "Delivery Mode:");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](31, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "mat-radio-group", 16)(33, "mat-radio-button", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](34, "Schedule for Later");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](35, "mat-radio-button", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](36, "Send Immediately");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](37, CreateNotificationComponent_div_37_Template, 14, 3, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "div", 20)(39, "button", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CreateNotificationComponent_Template_button_click_39_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](40, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "button", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CreateNotificationComponent_Template_button_click_41_listener() {
          return ctx.submit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](42, CreateNotificationComponent_mat_spinner_42_Template, 1, 0, "mat-spinner", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](43);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        let tmp_1_0;
        let tmp_2_0;
        let tmp_4_0;
        let tmp_5_0;
        let tmp_6_0;
        let tmp_7_0;
        let tmp_10_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx.form.get("title")) == null ? null : tmp_1_0.hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (tmp_2_0 = ctx.form.get("body")) == null ? null : tmp_2_0.hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.targetTypes);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ((tmp_4_0 = ctx.form.get("targetType")) == null ? null : tmp_4_0.value) === "organization");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ((tmp_5_0 = ctx.form.get("targetType")) == null ? null : tmp_5_0.value) === "cafeteria");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ((tmp_6_0 = ctx.form.get("targetType")) == null ? null : tmp_6_0.value) === "individual");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ((tmp_7_0 = ctx.form.get("deliveryMode")) == null ? null : tmp_7_0.value) === "schedule");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx.form.invalid || ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ((tmp_10_0 = ctx.form.get("deliveryMode")) == null ? null : tmp_10_0.value) === "now" ? "Send Now" : "Schedule", " ");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatError, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatSuffix, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInput, _angular_material_select__WEBPACK_IMPORTED_MODULE_11__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_12__.MatOption, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_13__.MatDatepicker, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_13__.MatDatepickerInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_13__.MatDatepickerToggle, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__.MatProgressSpinner, _angular_material_chips__WEBPACK_IMPORTED_MODULE_15__.MatChipGrid, _angular_material_chips__WEBPACK_IMPORTED_MODULE_15__.MatChipRemove, _angular_material_chips__WEBPACK_IMPORTED_MODULE_15__.MatChipRow, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_16__.MatTooltip, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogContent, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogActions, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_17__.MatCheckbox, _angular_material_radio__WEBPACK_IMPORTED_MODULE_18__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_18__.MatRadioButton],
    styles: [".w-100[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.mr-3[_ngcontent-%COMP%] {\n  margin-right: 16px;\n}\n\n.mt-2[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n\n.mt-3[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n\n.mb-2[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n\n.mb-3[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n\n.d-inline-block[_ngcontent-%COMP%] {\n  display: inline-block;\n  vertical-align: middle;\n}\n\n.mr-2[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n\nmat-radio-button[_ngcontent-%COMP%] {\n  margin-right: 16px;\n}\n\n.user-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 1rem;\n  max-height: 400px;\n  overflow-y: auto;\n  padding: 4px;\n}\n.user-grid[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.user-grid[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: rgba(0, 0, 0, 0.2);\n  border-radius: 4px;\n}\n\n.user-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 12px;\n  padding: 1rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid rgba(0, 0, 0, 0.04);\n  transition: all 0.2s ease;\n  cursor: pointer;\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.user-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);\n  border-color: rgba(0, 0, 0, 0.1);\n}\n.user-card.selected[_ngcontent-%COMP%] {\n  background-color: #f0f9ff;\n  border-color: #2196f3;\n  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.15);\n}\n\n.user-avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.user-avatar[_ngcontent-%COMP%]   .avatar-text[_ngcontent-%COMP%] {\n  color: white;\n  font-weight: 600;\n  font-size: 1rem;\n  text-transform: uppercase;\n}\n\n.user-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.user-info[_ngcontent-%COMP%]   .user-primary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-bottom: 4px;\n  flex-wrap: wrap;\n}\n.user-info[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #333;\n  margin: 0;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.user-info[_ngcontent-%COMP%]   .user-org-badge[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);\n  color: #15803d;\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.user-info[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  color: #666;\n  font-size: 0.85rem;\n}\n.user-info[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.user-info[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n  color: #999;\n}\n.user-info[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.user-checkbox[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n\n.selected-users-chips[_ngcontent-%COMP%] {\n  max-height: 100px;\n  overflow-y: auto;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2NoZWR1bGVkLW5vdGlmaWNhdGlvbi9jcmVhdGUtbm90aWZpY2F0aW9uL2NyZWF0ZS1ub3RpZmljYXRpb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0FBQ0o7O0FBRUE7RUFDSSxrQkFBQTtBQUNKOztBQUVBO0VBQ0ksZUFBQTtBQUNKOztBQUVBO0VBQ0ksZ0JBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0FBQ0o7O0FBRUE7RUFDSSxtQkFBQTtBQUNKOztBQUVBO0VBQ0kscUJBQUE7RUFDQSxzQkFBQTtBQUNKOztBQUVBO0VBQ0ksaUJBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0FBQ0o7O0FBR0E7RUFDSSxhQUFBO0VBQ0EsNERBQUE7RUFDQSxTQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7QUFBSjtBQUdJO0VBQ0ksVUFBQTtBQURSO0FBSUk7RUFDSSxvQ0FBQTtFQUNBLGtCQUFBO0FBRlI7O0FBT0E7RUFDSSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLHlDQUFBO0VBQ0EscUNBQUE7RUFDQSx5QkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7QUFKSjtBQU1JO0VBQ0ksMkJBQUE7RUFDQSx5Q0FBQTtFQUNBLGdDQUFBO0FBSlI7QUFPSTtFQUNJLHlCQUFBO0VBQ0EscUJBQUE7RUFDQSwrQ0FBQTtBQUxSOztBQVVBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLDZEQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0FBUEo7QUFTSTtFQUNJLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtBQVBSOztBQVlBO0VBQ0ksT0FBQTtFQUNBLFlBQUE7QUFUSjtBQVdJO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQVRSO0FBWUk7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtBQVZSO0FBYUk7RUFDSSw2REFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0FBWFI7QUFjSTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7QUFaUjtBQWNRO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtBQVpaO0FBY1k7RUFDSSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FBWmhCO0FBZVk7RUFDSSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFiaEI7O0FBb0JBO0VBQ0ksY0FBQTtBQWpCSjs7QUFvQkE7RUFDSSxpQkFBQTtFQUNBLGdCQUFBO0FBakJKIiwic291cmNlc0NvbnRlbnQiOlsiLnctMTAwIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4ubXItMyB7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDE2cHg7XHJcbn1cclxuXHJcbi5tdC0yIHtcclxuICAgIG1hcmdpbi10b3A6IDhweDtcclxufVxyXG5cclxuLm10LTMge1xyXG4gICAgbWFyZ2luLXRvcDogMTZweDtcclxufVxyXG5cclxuLm1iLTIge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG59XHJcblxyXG4ubWItMyB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG59XHJcblxyXG4uZC1pbmxpbmUtYmxvY2sge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxufVxyXG5cclxuLm1yLTIge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XHJcbn1cclxuXHJcbm1hdC1yYWRpby1idXR0b24ge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxNnB4O1xyXG59XHJcblxyXG4vLyBVc2VyIEdyaWRcclxuLnVzZXItZ3JpZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maWxsLCBtaW5tYXgoMzAwcHgsIDFmcikpO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG4gICAgbWF4LWhlaWdodDogNDAwcHg7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gICAgcGFkZGluZzogNHB4OyAvLyBBdm9pZCBib3gtc2hhZG93IGNsaXBwaW5nXHJcblxyXG4gICAgLy8gQ3VzdG9tIHNjcm9sbGJhclxyXG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gICAgICAgIHdpZHRoOiA2cHg7XHJcbiAgICB9XHJcblxyXG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yKTtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIFVzZXIgQ2FyZFxyXG4udXNlci1jYXJkIHtcclxuICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gICAgcGFkZGluZzogMXJlbTtcclxuICAgIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMDYpO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjA0KTtcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogMXJlbTtcclxuXHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XHJcbiAgICAgICAgYm94LXNoYWRvdzogMCA2cHggMTZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgICAgICAgYm9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgICB9XHJcblxyXG4gICAgJi5zZWxlY3RlZCB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjlmZjsgLy8gTGlnaHQgYmx1ZSBiYWNrZ3JvdW5kXHJcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAjMjE5NmYzOyAvLyBQcmltYXJ5IGJvcmRlclxyXG4gICAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgzMywgMTUwLCAyNDMsIDAuMTUpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBBdmF0YXJcclxuLnVzZXItYXZhdGFyIHtcclxuICAgIHdpZHRoOiA0OHB4O1xyXG4gICAgaGVpZ2h0OiA0OHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzIxOTZmMyAwJSwgIzE5NzZkMiAxMDAlKTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBmbGV4LXNocmluazogMDtcclxuXHJcbiAgICAuYXZhdGFyLXRleHQge1xyXG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBVc2VyIEluZm9cclxuLnVzZXItaW5mbyB7XHJcbiAgICBmbGV4OiAxO1xyXG4gICAgbWluLXdpZHRoOiAwOyAvLyBUZXh0IHRydW5jYXRpb24gZml4XHJcblxyXG4gICAgLnVzZXItcHJpbWFyeSB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIGdhcDogMC41cmVtO1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDRweDtcclxuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICB9XHJcblxyXG4gICAgLnVzZXItbmFtZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxcmVtO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgY29sb3I6ICMzMzM7XHJcbiAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICAgIH1cclxuXHJcbiAgICAudXNlci1vcmctYmFkZ2Uge1xyXG4gICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmMGZkZjQgMCUsICNkY2ZjZTcgMTAwJSk7XHJcbiAgICAgICAgY29sb3I6ICMxNTgwM2Q7XHJcbiAgICAgICAgcGFkZGluZzogMnB4IDhweDtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC43cmVtO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIH1cclxuXHJcbiAgICAudXNlci1kZXRhaWxzIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgZ2FwOiAycHg7XHJcbiAgICAgICAgY29sb3I6ICM2NjY7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG5cclxuICAgICAgICAuZGV0YWlsLWl0ZW0ge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAgICBnYXA6IDZweDtcclxuXHJcbiAgICAgICAgICAgIG1hdC1pY29uIHtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNHB4O1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxNHB4O1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICM5OTk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNwYW4ge1xyXG4gICAgICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gU2VsZWN0aW9uIENoZWNrYm94IChQb3NpdGlvbmVkIGFic29sdXRlIG9yIG5pY2VseSBpbnRlZ3JhdGVkKVxyXG4udXNlci1jaGVja2JveCB7XHJcbiAgICBmbGV4LXNocmluazogMDtcclxufVxyXG5cclxuLnNlbGVjdGVkLXVzZXJzLWNoaXBzIHtcclxuICAgIG1heC1oZWlnaHQ6IDEwMHB4O1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 22585:
/*!*****************************************************************************************!*\
  !*** ./src/app/scheduled-notification/notification-list/notification-list.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotificationListComponent: () => (/* binding */ NotificationListComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _create_notification_create_notification_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../create-notification/create-notification.component */ 84179);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var src_service_toaster_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/service/toaster.service */ 19586);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 17401);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/datepicker */ 82226);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/paginator */ 39687);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/progress-spinner */ 33910);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);


















function NotificationListComponent_div_52_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "mat-spinner", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function NotificationListComponent_div_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 31)(1, "mat-icon", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "notifications_off");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "No Notification Found");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "Try adjusting your filters or create a new notification.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function NotificationListComponent_div_53_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r6.openCreateDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Create Notification");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function NotificationListComponent_div_54_div_1_mat_icon_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "check_circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function NotificationListComponent_div_54_div_1_mat_icon_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "schedule");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function NotificationListComponent_div_54_div_1_mat_icon_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "error");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function NotificationListComponent_div_54_div_1_mat_icon_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function NotificationListComponent_div_54_div_1_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function NotificationListComponent_div_54_div_1_button_18_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r20);
      const notification_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r18.cancelNotification(notification_r9));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function NotificationListComponent_div_54_div_1_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 53)(1, "mat-icon", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "event");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 55)(4, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Scheduled For");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const notification_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](8, 1, notification_r9.scheduledAt, "medium"));
  }
}
function NotificationListComponent_div_54_div_1_div_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 53)(1, "mat-icon", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "send");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 55)(4, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Sent At");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const notification_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](8, 1, notification_r9.sentAt, "medium"));
  }
}
function NotificationListComponent_div_54_div_1_div_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const notification_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"](" ", notification_r9.recipientCount, " sent / ", notification_r9.failedCount, " failed ");
  }
}
function NotificationListComponent_div_54_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 36)(1, "div", 37)(2, "div", 38)(3, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 39)(6, "h3", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, NotificationListComponent_div_54_div_1_mat_icon_9_Template, 2, 0, "mat-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, NotificationListComponent_div_54_div_1_mat_icon_10_Template, 2, 0, "mat-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, NotificationListComponent_div_54_div_1_mat_icon_11_Template, 2, 0, "mat-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](12, NotificationListComponent_div_54_div_1_mat_icon_12_Template, 2, 0, "mat-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "div", 43)(15, "button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function NotificationListComponent_div_54_div_1_Template_button_click_15_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r25);
      const notification_r9 = restoredCtx.$implicit;
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r24.resendNotification(notification_r9));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "repeat");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, NotificationListComponent_div_54_div_1_button_18_Template, 3, 0, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "div", 46)(20, "p", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](22, NotificationListComponent_div_54_div_1_div_22_Template, 9, 4, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](23, NotificationListComponent_div_54_div_1_div_23_Template, 9, 4, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "div", 49)(25, "div", 50)(26, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](27, "group");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](29, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](30, NotificationListComponent_div_54_div_1_div_30_Template, 2, 2, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const notification_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matTooltip", notification_r9.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](notification_r9.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", notification_r9.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", notification_r9.status === "sent");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", notification_r9.status === "pending");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", notification_r9.status === "failed");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", notification_r9.status === "cancelled");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", notification_r9.status, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", notification_r9.status === "pending");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](notification_r9.body);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", notification_r9.scheduledAt);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", notification_r9.sentAt);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](29, 14, notification_r9.targetType), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", notification_r9.status === "sent" || notification_r9.status === "partially_sent");
  }
}
function NotificationListComponent_div_54_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, NotificationListComponent_div_54_div_1_Template, 31, 16, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r4.pagedNotificationList);
  }
}
const _c0 = function () {
  return [10, 25, 50, 100];
};
function NotificationListComponent_mat_paginator_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-paginator", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("page", function NotificationListComponent_mat_paginator_55_Template_mat_paginator_page_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r27);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r26.onPageChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("length", ctx_r5.notificationList.length)("pageSize", ctx_r5.pageSize)("pageIndex", ctx_r5.pageIndex)("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](4, _c0));
  }
}
class NotificationListComponent {
  constructor(apiMainService, toaster, dialog) {
    this.apiMainService = apiMainService;
    this.toaster = toaster;
    this.dialog = dialog;
    this.isLoading = false;
    this.filterStatus = '';
    this.fromDate = null;
    this.toDate = null;
    this.notificationList = [];
    this.pagedNotificationList = [];
    this.pageSize = 10;
    this.pageIndex = 0;
  }
  ngOnInit() {
    this.fetchNotifications();
  }
  fetchNotifications() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.isLoading = true;
      const params = {};
      if (_this.filterStatus && _this.filterStatus !== 'all') params.status = _this.filterStatus;
      if (_this.fromDate) params.fromDate = _this.fromDate.toISOString();
      if (_this.toDate) params.toDate = _this.toDate.toISOString();
      try {
        console.log(params);
        const res = yield _this.apiMainService.getScheduledNotifications(params);
        console.log(res);
        _this.isLoading = false;
        if (res && res.length > 0) {
          _this.notificationList = res || [];
          // Reset to first page when fetching new data
          _this.pageIndex = 0;
          _this.updatePagedList();
        } else {
          _this.notificationList = [];
          _this.pagedNotificationList = [];
        }
      } catch (err) {
        _this.isLoading = false;
        _this.toaster.error('Error fetching notifications');
        console.error(err);
      }
    })();
  }
  onPageChange(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedList();
  }
  updatePagedList() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedNotificationList = this.notificationList.slice(startIndex, endIndex);
  }
  applyFilter() {
    this.fetchNotifications();
  }
  resetFilter() {
    this.filterStatus = '';
    this.fromDate = null;
    this.toDate = null;
    this.fetchNotifications();
  }
  openCreateDialog(data) {
    const dialogRef = this.dialog.open(_create_notification_create_notification_component__WEBPACK_IMPORTED_MODULE_1__.CreateNotificationComponent, {
      width: '600px',
      disableClose: true,
      data: data // Pass data if available
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchNotifications();
      }
    });
  }
  resendNotification(notification) {
    this.openCreateDialog(notification);
  }
  cancelNotification(notification) {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (confirm(`Are you sure you want to cancel notification "${notification.title}"?`)) {
        try {
          const res = yield _this2.apiMainService.cancelScheduledNotification(notification._id);
          if (res && res.status) {
            _this2.toaster.success('Notification cancelled successfully');
            _this2.fetchNotifications();
          } else {
            _this2.toaster.error(res.message || 'Failed to cancel notification');
          }
        } catch (err) {
          _this2.toaster.error('Error cancelling notification');
          console.error(err);
        }
      }
    })();
  }
  static #_ = this.ɵfac = function NotificationListComponent_Factory(t) {
    return new (t || NotificationListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_2__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_service_toaster_service__WEBPACK_IMPORTED_MODULE_3__.ToasterService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialog));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: NotificationListComponent,
    selectors: [["app-notification-list"]],
    decls: 56,
    vars: 11,
    consts: [[1, "notification-page-container"], [1, "notification-header-card"], [1, "header-content"], [1, "title-section"], [1, "page-title"], [1, "page-subtitle"], [1, "actions-section"], ["mat-flat-button", "", 1, "btn-create-notification", 3, "click"], [1, "card", "p-3", "mb-4", "border-0", "shadow-sm", 2, "border-radius", "12px"], [1, "filters-section", "align-items-center", "mb-0"], ["appearance", "outline", 1, "dense-field"], [3, "ngModel", "ngModelChange"], ["value", "all"], ["value", "pending"], ["value", "sent"], ["value", "failed"], ["value", "cancelled"], ["matInput", "", 3, "matDatepicker", "ngModel", "ngModelChange"], ["matSuffix", "", 3, "for"], ["picker1", ""], ["picker2", ""], [1, "ml-auto"], ["mat-stroked-button", "", "color", "primary", 1, "mr-2", 2, "border-radius", "20px", 3, "click"], ["mat-button", "", 3, "click"], [1, "content-body", "position-relative"], ["class", "d-flex justify-content-center my-5", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "notification-grid", 4, "ngIf"], ["showFirstLastButtons", "", "class", "custom-paginator", 3, "length", "pageSize", "pageIndex", "pageSizeOptions", "page", 4, "ngIf"], [1, "d-flex", "justify-content-center", "my-5"], ["diameter", "40"], [1, "empty-state"], [1, "empty-icon"], ["mat-stroked-button", "", "color", "primary", 3, "click"], [1, "notification-grid"], ["class", "notification-card", 4, "ngFor", "ngForOf"], [1, "notification-card"], [1, "card-top"], [1, "notification-icon"], [1, "notification-identity"], [1, "notification-title", 3, "matTooltip"], [1, "status-badge", 3, "ngClass"], [4, "ngIf"], [1, "card-actions"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Send Again", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Cancel", 3, "click", 4, "ngIf"], [1, "card-body"], [1, "body-text"], ["class", "info-row", 4, "ngIf"], [1, "card-footer"], [1, "target-chip"], ["class", "recipient-count", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Cancel", 3, "click"], [1, "info-row"], [1, "info-icon"], [1, "info-content"], [1, "info-label"], [1, "info-value"], [1, "recipient-count"], ["showFirstLastButtons", "", 1, "custom-paginator", 3, "length", "pageSize", "pageIndex", "pageSizeOptions", "page"]],
    template: function NotificationListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Scheduled Notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Manage push notifications for users");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 6)(9, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function NotificationListComponent_Template_button_click_9_listener() {
          return ctx.openCreateDialog();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, "add_alert");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, "Create Notification");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "div", 8)(15, "div", 9)(16, "mat-form-field", 10)(17, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18, "Status");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "mat-select", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function NotificationListComponent_Template_mat_select_ngModelChange_19_listener($event) {
          return ctx.filterStatus = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "mat-option", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, "All");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "mat-option", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, "Pending");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "mat-option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25, "Sent");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "mat-option", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](27, "Failed");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](28, "mat-option", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](29, "Cancelled");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](30, "mat-form-field", 10)(31, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](32, "From Date");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function NotificationListComponent_Template_input_ngModelChange_33_listener($event) {
          return ctx.fromDate = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](34, "mat-datepicker-toggle", 18)(35, "mat-datepicker", null, 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](37, "mat-form-field", 10)(38, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](39, "To Date");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](40, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function NotificationListComponent_Template_input_ngModelChange_40_listener($event) {
          return ctx.toDate = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](41, "mat-datepicker-toggle", 18)(42, "mat-datepicker", null, 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](44, "div", 21)(45, "button", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function NotificationListComponent_Template_button_click_45_listener() {
          return ctx.applyFilter();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](46, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](47, "filter_list");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](48, " Apply ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](49, "button", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function NotificationListComponent_Template_button_click_49_listener() {
          return ctx.resetFilter();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](50, "Reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](51, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](52, NotificationListComponent_div_52_Template, 2, 0, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](53, NotificationListComponent_div_53_Template, 9, 0, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](54, NotificationListComponent_div_54_Template, 2, 1, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](55, NotificationListComponent_mat_paginator_55_Template, 1, 5, "mat-paginator", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](36);
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](43);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.filterStatus);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matDatepicker", _r0)("ngModel", ctx.fromDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("for", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matDatepicker", _r1)("ngModel", ctx.toDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("for", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.isLoading && ctx.pagedNotificationList.length === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.isLoading && ctx.pagedNotificationList.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.notificationList.length > 0);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatSuffix, _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInput, _angular_material_select__WEBPACK_IMPORTED_MODULE_12__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_13__.MatOption, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_14__.MatDatepicker, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_14__.MatDatepickerInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_14__.MatDatepickerToggle, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_15__.MatPaginator, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_16__.MatProgressSpinner, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__.MatTooltip, _angular_common__WEBPACK_IMPORTED_MODULE_6__.TitleCasePipe, _angular_common__WEBPACK_IMPORTED_MODULE_6__.DatePipe],
    styles: ["\n\n\n\n[_ngcontent-%COMP%]:root {\n  --color-primary: #0E49B5;\n  --color-secondary: #FF3333;\n  --color-backgroundGrey: #f3f3f3;\n  --color-text: #1a1a1a;\n}\n\n.notification-page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  min-height: 100vh;\n}\n\n.notification-header-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 20px;\n  padding: 1.5rem 2rem;\n  margin-bottom: 2rem;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);\n  border: 1px solid rgba(0, 0, 0, 0.04);\n}\n.notification-header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n}\n@media (max-width: 768px) {\n  .notification-header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n.notification-header-card[_ngcontent-%COMP%]   .title-section[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #192754;\n  margin: 0 0 0.25rem 0;\n}\n.notification-header-card[_ngcontent-%COMP%]   .title-section[_ngcontent-%COMP%]   .page-subtitle[_ngcontent-%COMP%] {\n  color: #6c757d;\n  margin: 0;\n  font-size: 0.95rem;\n}\n.notification-header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n@media (max-width: 768px) {\n  .notification-header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-direction: column;\n  }\n  .notification-header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .search-wrapper[_ngcontent-%COMP%], .notification-header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .btn-create-notification[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n\n.search-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  min-width: 320px;\n  flex-grow: 1;\n}\n@media (max-width: 768px) {\n  .search-wrapper[_ngcontent-%COMP%] {\n    min-width: 100%;\n  }\n}\n.search-wrapper[_ngcontent-%COMP%]   .search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9aa0a6;\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.search-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 16px 12px 42px;\n  border: 1px solid #e0e0e0;\n  border-radius: 9999px;\n  font-size: 0.95rem;\n  background-color: #f8f9fa;\n  transition: all 0.3s ease;\n}\n.search-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  background-color: #fff;\n  border-color: #0E49B5;\n  box-shadow: 0 0 0 3px rgba(14, 73, 181, 0.1);\n}\n.search-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #adb5bd;\n}\n\n.btn-create-notification[_ngcontent-%COMP%] {\n  border-radius: 9999px !important;\n  padding: 0.5rem 1.5rem !important;\n  font-weight: 600 !important;\n  height: 48px !important;\n  box-shadow: 0 4px 12px rgba(14, 73, 181, 0.2);\n  background-color: #0E49B5 !important;\n  color: white !important;\n}\n.btn-create-notification[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n\n.filters-section[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n  margin-bottom: 1.5rem;\n}\n.filters-section[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  min-width: 150px;\n}\n@media (max-width: 768px) {\n  .filters-section[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n\n.notification-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 1.5rem;\n}\n\n.notification-card[_ngcontent-%COMP%] {\n  background-color: white;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  transition: all 0.2s ease;\n  position: relative;\n  height: 100%;\n}\n.notification-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  border-color: #4b82e2;\n  box-shadow: 0 4px 12px rgba(14, 73, 181, 0.1);\n}\n.notification-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n  border-bottom: 1px solid #f1f1f1;\n}\n.notification-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .notification-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.notification-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .notification-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.notification-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .notification-identity[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  overflow: hidden;\n}\n.notification-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .notification-identity[_ngcontent-%COMP%]   .notification-title[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: #2d3748;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.notification-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .notification-identity[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.75rem;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.notification-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .notification-identity[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.notification-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .notification-identity[_ngcontent-%COMP%]   .status-badge.pending[_ngcontent-%COMP%] {\n  background-color: #fff7ed;\n  color: #c2410c;\n}\n.notification-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .notification-identity[_ngcontent-%COMP%]   .status-badge.sent[_ngcontent-%COMP%] {\n  background-color: #f0fdf4;\n  color: #15803d;\n}\n.notification-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .notification-identity[_ngcontent-%COMP%]   .status-badge.failed[_ngcontent-%COMP%] {\n  background-color: #fef2f2;\n  color: #b91c1c;\n}\n.notification-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .notification-identity[_ngcontent-%COMP%]   .status-badge.cancelled[_ngcontent-%COMP%] {\n  background-color: #f3f4f6;\n  color: #4b5563;\n}\n.notification-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .notification-identity[_ngcontent-%COMP%]   .status-badge.partially_sent[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n  color: #1d4ed8;\n}\n.notification-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  margin-top: -8px;\n  margin-right: -8px;\n}\n.notification-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  line-height: 32px;\n  padding: 0;\n}\n.notification-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.notification-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.notification-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .body-text[_ngcontent-%COMP%] {\n  color: #4a5568;\n  font-size: 0.95rem;\n  line-height: 1.5;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  margin-bottom: 0.5rem;\n}\n.notification-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.notification-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: #a0aec0;\n}\n.notification-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.notification-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%]   .info-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: #94a3b8;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.notification-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%]   .info-value[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: #2d3748;\n}\n.notification-card[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.25rem;\n  background-color: #f7fafc;\n  border-top: 1px solid #edf2f7;\n  border-bottom-left-radius: 12px;\n  border-bottom-right-radius: 12px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.notification-card[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%]   .target-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 10px;\n  border-radius: 6px;\n  font-size: 0.8rem;\n  font-weight: 500;\n  background-color: #e0e7ff;\n  color: #3730a3;\n  border: 1px solid #c7d2fe;\n}\n.notification-card[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%]   .target-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.notification-card[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%]   .recipient-count[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #64748b;\n  font-weight: 500;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem 2rem;\n  text-align: center;\n  background: white;\n  border-radius: 12px;\n  border: 1px dashed #ced4da;\n  margin-top: 2rem;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #dee2e6;\n  margin-bottom: 1rem;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #192754;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6c757d;\n  margin-bottom: 1.5rem;\n}\n\n.custom-paginator[_ngcontent-%COMP%] {\n  background: transparent;\n  margin-top: 1rem;\n  border-radius: 8px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGhlbWUvX3ZhcmlhYmxlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL3NjaGVkdWxlZC1ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLWxpc3Qvbm90aWZpY2F0aW9uLWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OytDQUFBO0FBMEVBO0VBQ0Usd0JBQUE7RUFDQSwwQkFBQTtFQUNBLCtCQUFBO0VBQ0EscUJBQUE7QUN0RUY7O0FBTEE7RUFDSSxlQUFBO0VBQ0EsaUJBQUE7QUFRSjs7QUFKQTtFQUNJLGdCQUFBO0VBQ0EsbUJEWWU7RUNYZixvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMENEaUJjO0VDaEJkLHFDQUFBO0FBT0o7QUFMSTtFQUNJLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7QUFPUjtBQUxRO0VBUEo7SUFRUSxzQkFBQTtJQUNBLG9CQUFBO0VBUVY7QUFDRjtBQUpRO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNEdkJLO0VDd0JMLHFCQUFBO0FBTVo7QUFIUTtFQUNJLGNBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7QUFLWjtBQURJO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7QUFHUjtBQURRO0VBTko7SUFPUSxXQUFBO0lBQ0Esc0JBQUE7RUFJVjtFQUZVOztJQUVJLFdBQUE7RUFJZDtBQUNGOztBQUNBO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7QUFFSjtBQUFJO0VBTEo7SUFNUSxlQUFBO0VBR047QUFDRjtBQURJO0VBQ0ksa0JBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUNBLDJCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUdSO0FBQUk7RUFDSSxXQUFBO0VBQ0EsNEJBQUE7RUFDQSx5QkFBQTtFQUNBLHFCRC9EYTtFQ2dFYixrQkFBQTtFQUNBLHlCQUFBO0VBQ0EseUJBQUE7QUFFUjtBQUFRO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EscUJEdEZLO0VDdUZMLDRDQUFBO0FBRVo7QUFDUTtFQUNJLGNBQUE7QUFDWjs7QUFJQTtFQUNJLGdDQUFBO0VBQ0EsaUNBQUE7RUFDQSwyQkFBQTtFQUNBLHVCQUFBO0VBQ0EsNkNBQUE7RUFDQSxvQ0FBQTtFQUNBLHVCQUFBO0FBREo7QUFHSTtFQUNJLGlCQUFBO0FBRFI7O0FBTUE7RUFDSSxhQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7RUFDQSxxQkFBQTtBQUhKO0FBS0k7RUFDSSxnQkFBQTtBQUhSO0FBS1E7RUFISjtJQUlRLFdBQUE7RUFGVjtBQUNGOztBQVFBO0VBQ0ksYUFBQTtFQUNBLDREQUFBO0VBQ0EsV0FBQTtBQUxKOztBQVNBO0VBQ0ksdUJBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FBTko7QUFRSTtFQUNJLDJCQUFBO0VBQ0EscUJEakpTO0VDa0pULDZDQUFBO0FBTlI7QUFTSTtFQUNJLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsU0FBQTtFQUNBLGdDQUFBO0FBUFI7QUFTUTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSw2REFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGNBQUE7QUFQWjtBQVNZO0VBQ0ksZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBUGhCO0FBV1E7RUFDSSxZQUFBO0VBQ0EsZ0JBQUE7QUFUWjtBQVdZO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtBQVRoQjtBQVlZO0VBQ0ksb0JBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0FBVmhCO0FBWWdCO0VBQ0ksZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBVnBCO0FBYWdCO0VBQ0kseUJBQUE7RUFDQSxjQUFBO0FBWHBCO0FBZWdCO0VBQ0kseUJBQUE7RUFDQSxjQUFBO0FBYnBCO0FBaUJnQjtFQUNJLHlCQUFBO0VBQ0EsY0FBQTtBQWZwQjtBQW1CZ0I7RUFDSSx5QkFBQTtFQUNBLGNBQUE7QUFqQnBCO0FBcUJnQjtFQUNJLHlCQUFBO0VBQ0EsY0FBQTtBQW5CcEI7QUEwQlE7RUFDSSxhQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUF4Qlo7QUEwQlk7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsVUFBQTtBQXhCaEI7QUEwQmdCO0VBQ0ksZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBeEJwQjtBQThCSTtFQUNJLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7QUE1QlI7QUE4QlE7RUFDSSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLG9CQUFBO0VBQ0EscUJBQUE7RUFDQSxhQUFBO0VBQ0EsNEJBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0FBNUJaO0FBK0JRO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQTdCWjtBQStCWTtFQUNJLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QUE3QmhCO0FBZ0NZO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0FBOUJoQjtBQWdDZ0I7RUFDSSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7QUE5QnBCO0FBaUNnQjtFQUNJLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBL0JwQjtBQXFDSTtFQUNJLHdCQUFBO0VBQ0EseUJBQUE7RUFDQSw2QkFBQTtFQUNBLCtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtBQW5DUjtBQXFDUTtFQUNJLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBQW5DWjtBQXFDWTtFQUNJLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQW5DaEI7QUF1Q1E7RUFDSSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtBQXJDWjs7QUEyQ0E7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJEMVZlO0VDMlZmLDBCQUFBO0VBQ0EsZ0JBQUE7QUF4Q0o7QUEwQ0k7RUFDSSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7QUF4Q1I7QUEyQ0k7RUFDSSxjRGxYUztFQ21YVCxnQkFBQTtFQUNBLHFCQUFBO0FBekNSO0FBNENJO0VBQ0ksY0FBQTtFQUNBLHFCQUFBO0FBMUNSOztBQThDQTtFQUNJLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQTNDSiIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICBHbG9iYWwgU0NTUyBWYXJpYWJsZXMgLSBCcmFuZCBDb2xvcnNcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4kd2hpdGU6ICNmZmZmZmY7XHJcbiRibGFjazogIzAwMDAwMDtcclxuJHRleHRQcmltYXJ5OiAjMWExYTFhO1xyXG5cclxuLy8gQnJhbmQgQ29sb3JzIChSb3lhbCBCbHVlICYgTmF2eSlcclxuJHByaW1hcnktY29sb3IxOiAjMEU0OUI1OyAvLyBSb3lhbCBCbHVlIChNYWluIFByaW1hcnkpXHJcbiRwcmltYXJ5LWNvbG9yOiAkcHJpbWFyeS1jb2xvcjE7IC8vIEFsaWFzIGZvciBjb25zaXN0ZW5jeVxyXG4kcHJpbWFyeS1jb2xvcjI6ICMxOTI3NTQ7IC8vIE5hdnkgQmx1ZSAoU2Vjb25kYXJ5IC8gRGFyayBQcmltYXJ5KVxyXG4kcHJpbWFyeS1jb2xvcjM6ICM0YjgyZTI7IC8vIExpZ2h0ZXIgQmx1ZSBkZXJpdmF0aXZlXHJcblxyXG4vLyBCcmFuZCBDb2xvcnMgKENyZWFtICYgUmVkKVxyXG4kc2Vjb25kYXJ5LWNvbG9yMTogI0Y0RUNDNTsgLy8gU29mdCBDcmVhbVxyXG4kc2Vjb25kYXJ5LWNvbG9yMjogI2ZmZTBiMjsgLy8gRGVyaXZhdGl2ZVxyXG4kc2Vjb25kYXJ5LWNvbG9yMzogI0ZGMzMzMzsgLy8gQnJpZ2h0IFJlZCAoQWNjZW50KVxyXG5cclxuLy8gRGVzaWduIFRva2VucyAtIEJvcmRlciBSYWRpdXNcclxuJGJvcmRlci1yYWRpdXMtc206IDRweDtcclxuJGJvcmRlci1yYWRpdXMtbWQ6IDhweDtcclxuJGJvcmRlci1yYWRpdXMtbGc6IDEycHg7XHJcbiRib3JkZXItcmFkaXVzLXhsOiAyMHB4O1xyXG4kYm9yZGVyLXJhZGl1cy1waWxsOiA5OTk5cHg7XHJcbiRib3JkZXItcmFkaXVzLWNpcmNsZTogNTAlO1xyXG5cclxuLy8gRGVzaWduIFRva2VucyAtIEJveCBTaGFkb3dcclxuJGJveC1zaGFkb3ctc206IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xyXG4kYm94LXNoYWRvdy1tZDogMCA0cHggNnB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDJweCA0cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMDYpO1xyXG4kYm94LXNoYWRvdy1sZzogMCAxMHB4IDE1cHggLTNweCByZ2JhKDAsIDAsIDAsIDAuMSksIDAgNHB4IDZweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XHJcbiRib3gtc2hhZG93LWNhcmQ6IDAgMnB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjA0KTtcclxuJGJveC1zaGFkb3ctY2FyZC1ob3ZlcjogMCA4cHggMjRweCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xyXG5cclxuLy8gQWNjZW50IENvbG9yc1xyXG4kc2Vjb25kYXJ5LW9mZnNldC1jb2xvcjE6ICNmZmQ2NzQ7XHJcbiRzZWNvbmRhcnktb2Zmc2V0LWNvbG9yMjogI2ZmYzk0NztcclxuJHNlY29uZGFyeS1vZmZzZXQtY29sb3IzOiAjZmZiMzAwO1xyXG5cclxuXHJcbi8vIEdyYXlzICYgQmFja2dyb3VuZHNcclxuJHByaW1hcnktb2Zmc2V0LWNvbG9yMTogI2ZmZmZmZjtcclxuJHByaW1hcnktb2Zmc2V0LWNvbG9yMjogI2E0YTRhNDsgLy8gR3JheSB0ZXh0XHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjM6ICNmM2YzZjM7IC8vIExpZ2h0IGJhY2tncm91bmRcclxuJHByaW1hcnktb2Zmc2V0LWNvbG9yNDogI2VmZWZlZjsgLy8gQ2FyZCBiYWNrZ3JvdW5kXHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjU6IHdoaXRlO1xyXG4kYm9yZGVyLWNvbG9yOiAjZTVlN2ViO1xyXG4kY2FyZC1vZGQ6ICNkZWUyZTY7XHJcbiRiYWNrZ3JvdW5kLWNvbG9yOiAjZjNmM2YzO1xyXG4vLyBUaGVtZSBDb2xvcnMgKE1hdGNoZXMgc3R5bGVzLnNjc3MpXHJcbiRpbmZvLWNvbG9yOiAjYTRhNGE0O1xyXG4kdGV4dC1kYXJrOiAjMWExYTFhO1xyXG4vLyBUaGVtZSBDb2xvcnNcclxuJHByaW1hcnktY29sb3I6ICNlNjI4NDE7XHJcbiRzZWNvbmRhcnktY29sb3I6ICMxNWEyOTI7XHJcbiRiYWNrZHJvcC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQpO1xyXG4vLyBTZW1hbnRpYyBDb2xvcnMgKFN0YW5kYXJkaXplZClcclxuJGNvbG9yLXN1Y2Nlc3M6ICM1MmM0MWE7XHJcbiRjb2xvci1zdWNjZXNzLWJnOiAjZjZmZmVkO1xyXG4kY29sb3Itc3VjY2Vzcy1ib3JkZXI6ICNiN2ViOGY7XHJcblxyXG4kY29sb3Itd2FybmluZzogI2ZhYWQxNDtcclxuJGNvbG9yLXdhcm5pbmctYmc6ICNmZmY3ZTY7XHJcbiRjb2xvci13YXJuaW5nLWJvcmRlcjogI2ZmZTU4ZjtcclxuXHJcbiRjb2xvci1lcnJvcjogI2ZmNGQ0ZjtcclxuJGNvbG9yLWVycm9yLWJnOiAjZmZmMWYwO1xyXG4kY29sb3ItZXJyb3ItYm9yZGVyOiAjZmZjY2M3O1xyXG5cclxuJGNvbG9yLWluZm86ICMxODkwZmY7XHJcbiRjb2xvci1pbmZvLWJnOiAjZTZmN2ZmO1xyXG4kY29sb3ItaW5mby1ib3JkZXI6ICM5MWQ1ZmY7XHJcblxyXG4vLyBDU1MgVmFyaWFibGVzIGZvciBSdW50aW1lIFRoZW1pbmdcclxuOnJvb3Qge1xyXG4gIC0tY29sb3ItcHJpbWFyeTogI3skcHJpbWFyeS1jb2xvcjF9O1xyXG4gIC0tY29sb3Itc2Vjb25kYXJ5OiAjeyRzZWNvbmRhcnktY29sb3IzfTtcclxuICAtLWNvbG9yLWJhY2tncm91bmRHcmV5OiAjeyRiYWNrZ3JvdW5kLWNvbG9yfTtcclxuICAtLWNvbG9yLXRleHQ6ICN7JHRleHRQcmltYXJ5fTtcclxufSIsIkB1c2UgJy9zcmMvc3R5bGVzL3RoZW1lL21peGlucycgYXMgbWl4aW47XHJcbkB1c2UgJy9zcmMvc3R5bGVzL3RoZW1lL3ZhcmlhYmxlJyBhcyB2YXI7XHJcblxyXG4ubm90aWZpY2F0aW9uLXBhZ2UtY29udGFpbmVyIHtcclxuICAgIHBhZGRpbmc6IDEuNXJlbTtcclxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xyXG59XHJcblxyXG4vLyBIZWFkZXIgQ2FyZCAoYWRhcHRlZCBmcm9tIE91dGxldENvbXBvbmVudClcclxuLm5vdGlmaWNhdGlvbi1oZWFkZXItY2FyZCB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogdmFyLiRib3JkZXItcmFkaXVzLXhsO1xyXG4gICAgcGFkZGluZzogMS41cmVtIDJyZW07XHJcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xyXG4gICAgYm94LXNoYWRvdzogdmFyLiRib3gtc2hhZG93LWNhcmQ7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMDQpO1xyXG5cclxuICAgIC5oZWFkZXItY29udGVudCB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICAgICAgZ2FwOiAxLjVyZW07XHJcblxyXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLnRpdGxlLXNlY3Rpb24ge1xyXG4gICAgICAgIC5wYWdlLXRpdGxlIHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxLjc1cmVtO1xyXG4gICAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICAgICAgICBjb2xvcjogdmFyLiRwcmltYXJ5LWNvbG9yMjtcclxuICAgICAgICAgICAgbWFyZ2luOiAwIDAgMC4yNXJlbSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnBhZ2Utc3VidGl0bGUge1xyXG4gICAgICAgICAgICBjb2xvcjogIzZjNzU3ZDtcclxuICAgICAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDAuOTVyZW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5hY3Rpb25zLXNlY3Rpb24ge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBnYXA6IDFyZW07XHJcbiAgICAgICAgZmxleC13cmFwOiB3cmFwO1xyXG5cclxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblxyXG4gICAgICAgICAgICAuc2VhcmNoLXdyYXBwZXIsXHJcbiAgICAgICAgICAgIC5idG4tY3JlYXRlLW5vdGlmaWNhdGlvbiB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLnNlYXJjaC13cmFwcGVyIHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIG1pbi13aWR0aDogMzIwcHg7XHJcbiAgICBmbGV4LWdyb3c6IDE7XHJcblxyXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgICAgICAgbWluLXdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG5cclxuICAgIC5zZWFyY2gtaWNvbiB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGxlZnQ6IDEycHg7XHJcbiAgICAgICAgdG9wOiA1MCU7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgICAgIGNvbG9yOiAjOWFhMGE2O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgICB3aWR0aDogMjBweDtcclxuICAgICAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXQge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIHBhZGRpbmc6IDEycHggMTZweCAxMnB4IDQycHg7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2UwZTBlMDtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIuJGJvcmRlci1yYWRpdXMtcGlsbDtcclxuICAgICAgICBmb250LXNpemU6IDAuOTVyZW07XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtcclxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xyXG5cclxuICAgICAgICAmOmZvY3VzIHtcclxuICAgICAgICAgICAgb3V0bGluZTogbm9uZTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIuJHByaW1hcnktY29sb3IxO1xyXG4gICAgICAgICAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSgxNCwgNzMsIDE4MSwgMC4xKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICY6OnBsYWNlaG9sZGVyIHtcclxuICAgICAgICAgICAgY29sb3I6ICNhZGI1YmQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4uYnRuLWNyZWF0ZS1ub3RpZmljYXRpb24ge1xyXG4gICAgYm9yZGVyLXJhZGl1czogdmFyLiRib3JkZXItcmFkaXVzLXBpbGwgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6IDAuNXJlbSAxLjVyZW0gIWltcG9ydGFudDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDAgIWltcG9ydGFudDtcclxuICAgIGhlaWdodDogNDhweCAhaW1wb3J0YW50O1xyXG4gICAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDE0LCA3MywgMTgxLCAwLjIpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyLiRwcmltYXJ5LWNvbG9yMSAhaW1wb3J0YW50O1xyXG4gICAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XHJcblxyXG4gICAgbWF0LWljb24ge1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogOHB4O1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBGaWx0ZXJzIFNlY3Rpb25cclxuLmZpbHRlcnMtc2VjdGlvbiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZ2FwOiAxcmVtO1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xyXG5cclxuICAgIG1hdC1mb3JtLWZpZWxkIHtcclxuICAgICAgICBtaW4td2lkdGg6IDE1MHB4O1xyXG5cclxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLy8gTm90aWZpY2F0aW9uIEdyaWQgTGF5b3V0XHJcbi5ub3RpZmljYXRpb24tZ3JpZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maWxsLCBtaW5tYXgoMzIwcHgsIDFmcikpO1xyXG4gICAgZ2FwOiAxLjVyZW07XHJcbn1cclxuXHJcbi8vIE5vdGlmaWNhdGlvbiBDYXJkIChhZGFwdGVkIGZyb20gT3V0bGV0Q2FyZENvbXBvbmVudClcclxuLm5vdGlmaWNhdGlvbi1jYXJkIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2UyZThmMDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG5cclxuICAgICY6aG92ZXIge1xyXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcclxuICAgICAgICBib3JkZXItY29sb3I6IHZhci4kcHJpbWFyeS1jb2xvcjM7XHJcbiAgICAgICAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDE0LCA3MywgMTgxLCAwLjEpO1xyXG4gICAgfVxyXG5cclxuICAgIC5jYXJkLXRvcCB7XHJcbiAgICAgICAgcGFkZGluZzogMS4yNXJlbTtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgIGdhcDogMXJlbTtcclxuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2YxZjFmMTtcclxuXHJcbiAgICAgICAgLm5vdGlmaWNhdGlvbi1pY29uIHtcclxuICAgICAgICAgICAgd2lkdGg6IDQycHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogNDJweDtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzNiODJmNiAwJSwgIzI1NjNlYiAxMDAlKTtcclxuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICAgICAgZmxleC1zaHJpbms6IDA7XHJcblxyXG4gICAgICAgICAgICBtYXQtaWNvbiB7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDI0cHg7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMjRweDtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMjRweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLm5vdGlmaWNhdGlvbi1pZGVudGl0eSB7XHJcbiAgICAgICAgICAgIGZsZXgtZ3JvdzogMTtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbiAgICAgICAgICAgIC5ub3RpZmljYXRpb24tdGl0bGUge1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwIDAgNHB4IDA7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEuMDVyZW07XHJcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICMyZDM3NDg7XHJcbiAgICAgICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAuc3RhdHVzLWJhZGdlIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgICAgIGdhcDogNHB4O1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAwLjc1cmVtO1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogMnB4IDhweDtcclxuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG5cclxuICAgICAgICAgICAgICAgIG1hdC1pY29uIHtcclxuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxNHB4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICYucGVuZGluZyB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjdlZDtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogI2MyNDEwYztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBPcmFuZ2VcclxuICAgICAgICAgICAgICAgICYuc2VudCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZmRmNDtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzE1ODAzZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHcmVlblxyXG4gICAgICAgICAgICAgICAgJi5mYWlsZWQge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZWYyZjI7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICNiOTFjMWM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVkXHJcbiAgICAgICAgICAgICAgICAmLmNhbmNlbGxlZCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YzZjRmNjtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzRiNTU2MztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHcmV5XHJcbiAgICAgICAgICAgICAgICAmLnBhcnRpYWxseV9zZW50IHtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZmNmZmO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjMWQ0ZWQ4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEJsdWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmNhcmQtYWN0aW9ucyB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgIGdhcDogNHB4O1xyXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAtOHB4O1xyXG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IC04cHg7XHJcblxyXG4gICAgICAgICAgICBidXR0b24ge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMycHg7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDMycHg7XHJcbiAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMzJweDtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgbWF0LWljb24ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMThweDtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4cHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmNhcmQtYm9keSB7XHJcbiAgICAgICAgcGFkZGluZzogMS4yNXJlbTtcclxuICAgICAgICBmbGV4LWdyb3c6IDE7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGdhcDogMC43NXJlbTtcclxuXHJcbiAgICAgICAgLmJvZHktdGV4dCB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNGE1NTY4O1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDAuOTVyZW07XHJcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xyXG4gICAgICAgICAgICAtd2Via2l0LWxpbmUtY2xhbXA6IDM7XHJcbiAgICAgICAgICAgIGxpbmUtY2xhbXA6IDM7XHJcbiAgICAgICAgICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5pbmZvLXJvdyB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGdhcDogMC43NXJlbTtcclxuXHJcbiAgICAgICAgICAgIC5pbmZvLWljb24ge1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE4cHg7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4cHg7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogI2EwYWVjMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLmluZm8tY29udGVudCB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHJcbiAgICAgICAgICAgICAgICAuaW5mby1sYWJlbCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAwLjdyZW07XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICM5NGEzYjg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldHRlci1zcGFjaW5nOiAwLjNweDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAuaW5mby12YWx1ZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzJkMzc0ODtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuY2FyZC1mb290ZXIge1xyXG4gICAgICAgIHBhZGRpbmc6IDAuNzVyZW0gMS4yNXJlbTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmYWZjO1xyXG4gICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZWRmMmY3O1xyXG4gICAgICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEycHg7XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEycHg7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICAgICAgLnRhcmdldC1jaGlwIHtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGdhcDogNnB4O1xyXG4gICAgICAgICAgICBwYWRkaW5nOiA0cHggMTBweDtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2UwZTdmZjtcclxuICAgICAgICAgICAgY29sb3I6ICMzNzMwYTM7XHJcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjN2QyZmU7XHJcblxyXG4gICAgICAgICAgICBtYXQtaWNvbiB7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTRweDtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMTRweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnJlY2lwaWVudC1jb3VudCB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xyXG4gICAgICAgICAgICBjb2xvcjogIzY0NzQ4YjtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEVtcHR5IFN0YXRlXHJcbi5lbXB0eS1zdGF0ZSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDRyZW0gMnJlbTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogdmFyLiRib3JkZXItcmFkaXVzLWxnO1xyXG4gICAgYm9yZGVyOiAxcHggZGFzaGVkICNjZWQ0ZGE7XHJcbiAgICBtYXJnaW4tdG9wOiAycmVtO1xyXG5cclxuICAgIC5lbXB0eS1pY29uIHtcclxuICAgICAgICBmb250LXNpemU6IDY0cHg7XHJcbiAgICAgICAgd2lkdGg6IDY0cHg7XHJcbiAgICAgICAgaGVpZ2h0OiA2NHB4O1xyXG4gICAgICAgIGNvbG9yOiAjZGVlMmU2O1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICB9XHJcblxyXG4gICAgaDMge1xyXG4gICAgICAgIGNvbG9yOiB2YXIuJHByaW1hcnktY29sb3IyO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIHAge1xyXG4gICAgICAgIGNvbG9yOiAjNmM3NTdkO1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcclxuICAgIH1cclxufVxyXG5cclxuLmN1c3RvbS1wYWdpbmF0b3Ige1xyXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 10948:
/*!*********************************************************************************!*\
  !*** ./src/app/scheduled-notification/scheduled-notification-routing.module.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScheduledNotificationRoutingModule: () => (/* binding */ ScheduledNotificationRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _notification_list_notification_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notification-list/notification-list.component */ 22585);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _notification_list_notification_list_component__WEBPACK_IMPORTED_MODULE_0__.NotificationListComponent
}];
class ScheduledNotificationRoutingModule {
  static #_ = this.ɵfac = function ScheduledNotificationRoutingModule_Factory(t) {
    return new (t || ScheduledNotificationRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: ScheduledNotificationRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ScheduledNotificationRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 41158:
/*!*************************************************************************!*\
  !*** ./src/app/scheduled-notification/scheduled-notification.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScheduledNotificationModule: () => (/* binding */ ScheduledNotificationModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _scheduled_notification_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduled-notification-routing.module */ 10948);
/* harmony import */ var _notification_list_notification_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notification-list/notification-list.component */ 22585);
/* harmony import */ var _create_notification_create_notification_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create-notification/create-notification.component */ 84179);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../material.module */ 29099);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);







class ScheduledNotificationModule {
  static #_ = this.ɵfac = function ScheduledNotificationModule_Factory(t) {
    return new (t || ScheduledNotificationModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: ScheduledNotificationModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _scheduled_notification_routing_module__WEBPACK_IMPORTED_MODULE_0__.ScheduledNotificationRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _material_module__WEBPACK_IMPORTED_MODULE_3__.MaterialModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ScheduledNotificationModule, {
    declarations: [_notification_list_notification_list_component__WEBPACK_IMPORTED_MODULE_1__.NotificationListComponent, _create_notification_create_notification_component__WEBPACK_IMPORTED_MODULE_2__.CreateNotificationComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _scheduled_notification_routing_module__WEBPACK_IMPORTED_MODULE_0__.ScheduledNotificationRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _material_module__WEBPACK_IMPORTED_MODULE_3__.MaterialModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_scheduled-notification_scheduled-notification_module_ts.js.map