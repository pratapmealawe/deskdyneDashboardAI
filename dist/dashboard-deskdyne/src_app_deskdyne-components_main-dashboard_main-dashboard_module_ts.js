"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_deskdyne-components_main-dashboard_main-dashboard_module_ts"],{

/***/ 78455:
/*!***************************************************************************************************************************!*\
  !*** ./src/app/deskdyne-components/main-dashboard/main-dashboard-filter-dialog/main-dashboard-filter-dialog.component.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MainDashboardFilterDialogComponent: () => (/* binding */ MainDashboardFilterDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 17401);
/* harmony import */ var src_config_order_status_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/config/order-status.config */ 47816);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ 55309);










function MainDashboardFilterDialogComponent_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r0.activeCount, " active");
  }
}
function MainDashboardFilterDialogComponent_mat_option_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const org_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", org_r5.organization_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", org_r5.organization_name, " ");
  }
}
function MainDashboardFilterDialogComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MainDashboardFilterDialogComponent_div_28_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const s_r6 = restoredCtx.$implicit;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r7.selectedStatus = s_r6);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const s_r6 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx_r2.selectedStatus === s_r6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r2.orderStatusMapper[s_r6] || s_r6, " ");
  }
}
function MainDashboardFilterDialogComponent_button_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MainDashboardFilterDialogComponent_button_30_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r9.clearAll());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "filter_alt_off");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " Clear All ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function MainDashboardFilterDialogComponent_span_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("(", ctx_r4.activeCount, ")");
  }
}
class MainDashboardFilterDialogComponent {
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.orderStatusMapper = src_config_order_status_config__WEBPACK_IMPORTED_MODULE_0__.orderStatusMapper;
    // Selections
    this.selectedOrg = '';
    this.selectedCity = '';
    this.selectedLocation = '';
    this.selectedStatus = '';
    // Combined Filter Model
    this.selectedCityLocation = ''; // JSON stringified {city, location}
    // Options
    this.filteredCityLocations = [];
    // Initialize from current filters
    this.selectedOrg = data.currentFilters.org || '';
    this.selectedCity = data.currentFilters.city || '';
    this.selectedLocation = data.currentFilters.location || '';
    this.selectedStatus = data.currentFilters.status || '';
    if (this.selectedCity && this.selectedLocation) {
      this.selectedCityLocation = JSON.stringify({
        city: this.selectedCity,
        location: this.selectedLocation
      });
    }
  }
  ngOnInit() {
    this.updateCascadingOptions();
  }
  // ── Cascading Logic ──
  onOrgChange() {
    this.selectedCity = '';
    this.selectedLocation = '';
    this.selectedCityLocation = '';
    this.updateCascadingOptions();
  }
  onCityLocationChange() {
    if (this.selectedCityLocation) {
      try {
        const parsed = JSON.parse(this.selectedCityLocation);
        this.selectedCity = parsed.city;
        this.selectedLocation = parsed.location;
      } catch (e) {
        console.error('Error parsing city-location', e);
      }
    } else {
      this.selectedCity = '';
      this.selectedLocation = '';
    }
  }
  updateCascadingOptions() {
    // Build "City - Location" list based on Selected Org
    const uniqueSet = new Set();
    const options = [];
    this.data.orgList.forEach(org => {
      // If org is selected, only consider that org. Else consider all.
      if (this.selectedOrg && org.organization_name !== this.selectedOrg) return;
      if (org.cafeteriaList) {
        org.cafeteriaList.forEach(cafe => {
          const city = cafe.cafeteria_city;
          const location = cafe.location; // Using 'location' field as per requirement
          if (city && location) {
            const comboValue = JSON.stringify({
              city,
              location
            });
            if (!uniqueSet.has(comboValue)) {
              uniqueSet.add(comboValue);
              options.push({
                city,
                location,
                label: `${city} - ${location}`,
                value: comboValue
              });
            }
          }
        });
      }
    });
    this.filteredCityLocations = options.sort((a, b) => a.label.localeCompare(b.label));
  }
  get activeCount() {
    let count = 0;
    if (this.selectedOrg) count++;
    if (this.selectedCityLocation) count++; // Count combined filter as 1
    if (this.selectedStatus) count++;
    return count;
  }
  clearAll() {
    this.selectedOrg = '';
    this.selectedCity = '';
    this.selectedLocation = '';
    this.selectedCityLocation = '';
    this.selectedStatus = '';
    this.updateCascadingOptions();
  }
  apply() {
    this.dialogRef.close({
      org: this.selectedOrg,
      city: this.selectedCity,
      location: this.selectedLocation,
      status: this.selectedStatus
    });
  }
  cancel() {
    this.dialogRef.close();
  }
  static #_ = this.ɵfac = function MainDashboardFilterDialogComponent_Factory(t) {
    return new (t || MainDashboardFilterDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MAT_DIALOG_DATA));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: MainDashboardFilterDialogComponent,
    selectors: [["app-main-dashboard-filter-dialog"]],
    decls: 39,
    vars: 8,
    consts: [[1, "filter-dialog"], [1, "dialog-header"], [1, "header-left"], [1, "header-icon"], [1, "dialog-title"], ["class", "active-badge", 4, "ngIf"], ["mat-icon-button", "", 1, "close-btn", 3, "click"], [1, "dialog-body"], ["appearance", "outline", 1, "w-100", "mb-2"], [3, "value", "valueChange", "selectionChange"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "filter-group"], [1, "filter-label"], [1, "chip-selector"], [1, "chip-option", 3, "click"], ["class", "chip-option", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "dialog-footer"], ["mat-stroked-button", "", "class", "btn-clear", 3, "click", 4, "ngIf"], [1, "footer-right"], ["mat-stroked-button", "", 1, "btn-cancel", 3, "click"], ["mat-flat-button", "", 1, "btn-apply", 3, "click"], ["class", "apply-count", 4, "ngIf"], [1, "active-badge"], [3, "value"], ["mat-stroked-button", "", 1, "btn-clear", 3, "click"], [1, "apply-count"]],
    template: function MainDashboardFilterDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "mat-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "filter_list");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div")(6, "h2", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Filter Dashboard");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, MainDashboardFilterDialogComponent_span_8_Template, 2, 1, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MainDashboardFilterDialogComponent_Template_button_click_9_listener() {
          return ctx.cancel();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "close");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 7)(13, "mat-form-field", 8)(14, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Organization");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "mat-select", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("valueChange", function MainDashboardFilterDialogComponent_Template_mat_select_valueChange_16_listener($event) {
          return ctx.selectedOrg = $event;
        })("selectionChange", function MainDashboardFilterDialogComponent_Template_mat_select_selectionChange_16_listener() {
          return ctx.onOrgChange();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "mat-option", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "All Organizations");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, MainDashboardFilterDialogComponent_mat_option_19_Template, 2, 2, "mat-option", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 12)(21, "label", 13)(22, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "receipt_long");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, " Order Status ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "div", 14)(26, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MainDashboardFilterDialogComponent_Template_div_click_26_listener() {
          return ctx.selectedStatus = "";
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, " All ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](28, MainDashboardFilterDialogComponent_div_28_Template, 2, 3, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](30, MainDashboardFilterDialogComponent_button_30_Template, 4, 0, "button", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "div", 19)(32, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MainDashboardFilterDialogComponent_Template_button_click_32_listener() {
          return ctx.cancel();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "button", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MainDashboardFilterDialogComponent_Template_button_click_34_listener() {
          return ctx.apply();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, "check");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](37, " Apply Filters ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](38, MainDashboardFilterDialogComponent_span_38_Template, 2, 1, "span", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.activeCount > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.selectedOrg);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.data.orgList);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx.selectedStatus === "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.data.uniqueOrderStatuses);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.activeCount > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.activeCount > 0);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatLabel, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_material_select__WEBPACK_IMPORTED_MODULE_7__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MatOption],
    styles: ["\n\n\n\n[_ngcontent-%COMP%]:root {\n  --color-primary: #0E49B5;\n  --color-secondary: #FF3333;\n  --color-backgroundGrey: #f3f3f3;\n  --color-text: #1a1a1a;\n}\n\n.filter-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  border-bottom: 1px solid #e2e8f0;\n  background: linear-gradient(135deg, #f8fafc, #f1f5f9);\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .header-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n  color: #4f46e5;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .dialog-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #1e293b;\n  letter-spacing: -0.3px;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .active-badge[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: #4f46e5;\n  background: #eef2ff;\n  padding: 1px 8px;\n  border-radius: 99px;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%] {\n  color: #94a3b8;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover {\n  color: #1e293b;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-body[_ngcontent-%COMP%] {\n  padding: 24px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-body[_ngcontent-%COMP%]   .w-100[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-body[_ngcontent-%COMP%]   .mb-2[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-body[_ngcontent-%COMP%]   .mb-4[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-body[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   .filter-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.82rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  color: #64748b;\n  margin-bottom: 12px;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-body[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   .filter-label[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  color: #94a3b8;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-body[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   .chip-selector[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-body[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   .chip-option[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 6px 14px;\n  border-radius: 99px;\n  font-size: 0.82rem;\n  font-weight: 500;\n  cursor: pointer;\n  border: 1px solid #e2e8f0;\n  background: #f8fafc;\n  color: #475569;\n  transition: all 0.2s ease;\n  -webkit-user-select: none;\n          user-select: none;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-body[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   .chip-option[_ngcontent-%COMP%]:hover {\n  border-color: #c7d2fe;\n  background: #f5f3ff;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-body[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   .chip-option.active[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #eef2ff, #e0e7ff);\n  border-color: #818cf8;\n  color: #3730a3;\n  font-weight: 600;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 14px 24px;\n  border-top: 1px solid #e2e8f0;\n  background: #f8fafc;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-footer[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  height: 36px;\n  color: #64748b;\n  border-color: #cbd5e1;\n  border-radius: 8px;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-footer[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  margin-right: 4px;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-footer[_ngcontent-%COMP%]   .footer-right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-footer[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  height: 36px;\n  color: #64748b;\n  border-color: #cbd5e1;\n  border-radius: 8px;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-footer[_ngcontent-%COMP%]   .btn-apply[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  height: 36px;\n  border-radius: 8px;\n  background: linear-gradient(135deg, #4f46e5, #6366f1) !important;\n  color: white !important;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-footer[_ngcontent-%COMP%]   .btn-apply[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  margin-right: 4px;\n}\n.filter-dialog[_ngcontent-%COMP%]   .dialog-footer[_ngcontent-%COMP%]   .btn-apply[_ngcontent-%COMP%]   .apply-count[_ngcontent-%COMP%] {\n  margin-left: 4px;\n  opacity: 0.85;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGhlbWUvX3ZhcmlhYmxlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2Rlc2tkeW5lLWNvbXBvbmVudHMvbWFpbi1kYXNoYm9hcmQvbWFpbi1kYXNoYm9hcmQtZmlsdGVyLWRpYWxvZy9tYWluLWRhc2hib2FyZC1maWx0ZXItZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzsrQ0FBQTtBQTBFQTtFQUNFLHdCQUFBO0VBQ0EsMEJBQUE7RUFDQSwrQkFBQTtFQUNBLHFCQUFBO0FDdEVGOztBQUxBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7QUFRSjtBQU5JO0VBQ0ksYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdDQUFBO0VBQ0EscURBQUE7QUFRUjtBQU5RO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtBQVFaO0FBTlk7RUFDSSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0FBUWhCO0FBTFk7RUFDSSxTQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxzQkFBQTtBQU9oQjtBQUpZO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFNaEI7QUFGUTtFQUNJLGNBQUE7QUFJWjtBQUZZO0VBQ0ksY0FBQTtBQUloQjtBQUNJO0VBQ0ksYUFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FBQ1I7QUFDUTtFQUNJLFdBQUE7QUFDWjtBQUVRO0VBQ0kscUJBQUE7QUFBWjtBQUdRO0VBQ0ksbUJBQUE7QUFEWjtBQUtZO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0FBSGhCO0FBS2dCO0VBQ0ksZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQUhwQjtBQU9ZO0VBQ0ksYUFBQTtFQUNBLGVBQUE7RUFDQSxRQUFBO0FBTGhCO0FBUVk7RUFDSSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtVQUFBLGlCQUFBO0FBTmhCO0FBUWdCO0VBQ0kscUJBQUE7RUFDQSxtQkFBQTtBQU5wQjtBQVNnQjtFQUNJLHFEQUFBO0VBQ0EscUJBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7QUFQcEI7QUFhSTtFQUNJLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSw2QkFBQTtFQUNBLG1CQUFBO0FBWFI7QUFhUTtFQUNJLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0FBWFo7QUFhWTtFQUNJLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FBWGhCO0FBZVE7RUFDSSxhQUFBO0VBQ0EsUUFBQTtBQWJaO0FBZ0JRO0VBQ0ksa0JBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7QUFkWjtBQWlCUTtFQUNJLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0VBQUE7RUFDQSx1QkFBQTtBQWZaO0FBaUJZO0VBQ0ksZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUFmaEI7QUFrQlk7RUFDSSxnQkFBQTtFQUNBLGFBQUE7QUFoQmhCIiwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgIEdsb2JhbCBTQ1NTIFZhcmlhYmxlcyAtIEJyYW5kIENvbG9yc1xyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbiR3aGl0ZTogI2ZmZmZmZjtcclxuJGJsYWNrOiAjMDAwMDAwO1xyXG4kdGV4dFByaW1hcnk6ICMxYTFhMWE7XHJcblxyXG4vLyBCcmFuZCBDb2xvcnMgKFJveWFsIEJsdWUgJiBOYXZ5KVxyXG4kcHJpbWFyeS1jb2xvcjE6ICMwRTQ5QjU7IC8vIFJveWFsIEJsdWUgKE1haW4gUHJpbWFyeSlcclxuJHByaW1hcnktY29sb3I6ICRwcmltYXJ5LWNvbG9yMTsgLy8gQWxpYXMgZm9yIGNvbnNpc3RlbmN5XHJcbiRwcmltYXJ5LWNvbG9yMjogIzE5Mjc1NDsgLy8gTmF2eSBCbHVlIChTZWNvbmRhcnkgLyBEYXJrIFByaW1hcnkpXHJcbiRwcmltYXJ5LWNvbG9yMzogIzRiODJlMjsgLy8gTGlnaHRlciBCbHVlIGRlcml2YXRpdmVcclxuXHJcbi8vIEJyYW5kIENvbG9ycyAoQ3JlYW0gJiBSZWQpXHJcbiRzZWNvbmRhcnktY29sb3IxOiAjRjRFQ0M1OyAvLyBTb2Z0IENyZWFtXHJcbiRzZWNvbmRhcnktY29sb3IyOiAjZmZlMGIyOyAvLyBEZXJpdmF0aXZlXHJcbiRzZWNvbmRhcnktY29sb3IzOiAjRkYzMzMzOyAvLyBCcmlnaHQgUmVkIChBY2NlbnQpXHJcblxyXG4vLyBEZXNpZ24gVG9rZW5zIC0gQm9yZGVyIFJhZGl1c1xyXG4kYm9yZGVyLXJhZGl1cy1zbTogNHB4O1xyXG4kYm9yZGVyLXJhZGl1cy1tZDogOHB4O1xyXG4kYm9yZGVyLXJhZGl1cy1sZzogMTJweDtcclxuJGJvcmRlci1yYWRpdXMteGw6IDIwcHg7XHJcbiRib3JkZXItcmFkaXVzLXBpbGw6IDk5OTlweDtcclxuJGJvcmRlci1yYWRpdXMtY2lyY2xlOiA1MCU7XHJcblxyXG4vLyBEZXNpZ24gVG9rZW5zIC0gQm94IFNoYWRvd1xyXG4kYm94LXNoYWRvdy1zbTogMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XHJcbiRib3gtc2hhZG93LW1kOiAwIDRweCA2cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMSksIDAgMnB4IDRweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4wNik7XHJcbiRib3gtc2hhZG93LWxnOiAwIDEwcHggMTVweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMCA0cHggNnB4IC0ycHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcclxuJGJveC1zaGFkb3ctY2FyZDogMCAycHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMDQpO1xyXG4kYm94LXNoYWRvdy1jYXJkLWhvdmVyOiAwIDhweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4wOCk7XHJcblxyXG4vLyBBY2NlbnQgQ29sb3JzXHJcbiRzZWNvbmRhcnktb2Zmc2V0LWNvbG9yMTogI2ZmZDY3NDtcclxuJHNlY29uZGFyeS1vZmZzZXQtY29sb3IyOiAjZmZjOTQ3O1xyXG4kc2Vjb25kYXJ5LW9mZnNldC1jb2xvcjM6ICNmZmIzMDA7XHJcblxyXG5cclxuLy8gR3JheXMgJiBCYWNrZ3JvdW5kc1xyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3IxOiAjZmZmZmZmO1xyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3IyOiAjYTRhNGE0OyAvLyBHcmF5IHRleHRcclxuJHByaW1hcnktb2Zmc2V0LWNvbG9yMzogI2YzZjNmMzsgLy8gTGlnaHQgYmFja2dyb3VuZFxyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3I0OiAjZWZlZmVmOyAvLyBDYXJkIGJhY2tncm91bmRcclxuJHByaW1hcnktb2Zmc2V0LWNvbG9yNTogd2hpdGU7XHJcbiRib3JkZXItY29sb3I6ICNlNWU3ZWI7XHJcbiRjYXJkLW9kZDogI2RlZTJlNjtcclxuJGJhY2tncm91bmQtY29sb3I6ICNmM2YzZjM7XHJcbi8vIFRoZW1lIENvbG9ycyAoTWF0Y2hlcyBzdHlsZXMuc2NzcylcclxuJGluZm8tY29sb3I6ICNhNGE0YTQ7XHJcbiR0ZXh0LWRhcms6ICMxYTFhMWE7XHJcbi8vIFRoZW1lIENvbG9yc1xyXG4kcHJpbWFyeS1jb2xvcjogI2U2Mjg0MTtcclxuJHNlY29uZGFyeS1jb2xvcjogIzE1YTI5MjtcclxuJGJhY2tkcm9wLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7XHJcbi8vIFNlbWFudGljIENvbG9ycyAoU3RhbmRhcmRpemVkKVxyXG4kY29sb3Itc3VjY2VzczogIzUyYzQxYTtcclxuJGNvbG9yLXN1Y2Nlc3MtYmc6ICNmNmZmZWQ7XHJcbiRjb2xvci1zdWNjZXNzLWJvcmRlcjogI2I3ZWI4ZjtcclxuXHJcbiRjb2xvci13YXJuaW5nOiAjZmFhZDE0O1xyXG4kY29sb3Itd2FybmluZy1iZzogI2ZmZjdlNjtcclxuJGNvbG9yLXdhcm5pbmctYm9yZGVyOiAjZmZlNThmO1xyXG5cclxuJGNvbG9yLWVycm9yOiAjZmY0ZDRmO1xyXG4kY29sb3ItZXJyb3ItYmc6ICNmZmYxZjA7XHJcbiRjb2xvci1lcnJvci1ib3JkZXI6ICNmZmNjYzc7XHJcblxyXG4kY29sb3ItaW5mbzogIzE4OTBmZjtcclxuJGNvbG9yLWluZm8tYmc6ICNlNmY3ZmY7XHJcbiRjb2xvci1pbmZvLWJvcmRlcjogIzkxZDVmZjtcclxuXHJcbi8vIENTUyBWYXJpYWJsZXMgZm9yIFJ1bnRpbWUgVGhlbWluZ1xyXG46cm9vdCB7XHJcbiAgLS1jb2xvci1wcmltYXJ5OiAjeyRwcmltYXJ5LWNvbG9yMX07XHJcbiAgLS1jb2xvci1zZWNvbmRhcnk6ICN7JHNlY29uZGFyeS1jb2xvcjN9O1xyXG4gIC0tY29sb3ItYmFja2dyb3VuZEdyZXk6ICN7JGJhY2tncm91bmQtY29sb3J9O1xyXG4gIC0tY29sb3ItdGV4dDogI3skdGV4dFByaW1hcnl9O1xyXG59IiwiQHVzZSAnL3NyYy9zdHlsZXMvdGhlbWUvdmFyaWFibGUnIGFzIHZhcjtcclxuXHJcbi8vIMOiwpTCgMOiwpTCgCBGaWx0ZXIgRGlhbG9nIMOiwpTCgMOiwpTCgFxyXG4uZmlsdGVyLWRpYWxvZyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIG1heC1oZWlnaHQ6IDg1dmg7IC8vIFNsaWdodGx5IHRhbGxlclxyXG5cclxuICAgIC5kaWFsb2ctaGVhZGVyIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIHBhZGRpbmc6IDE2cHggMjRweDtcclxuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UyZThmMDtcclxuICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZjhmYWZjLCAjZjFmNWY5KTtcclxuXHJcbiAgICAgICAgLmhlYWRlci1sZWZ0IHtcclxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgZ2FwOiAxMnB4O1xyXG5cclxuICAgICAgICAgICAgLmhlYWRlci1pY29uIHtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMjRweDtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAyNHB4O1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyNHB4O1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICM0ZjQ2ZTU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC5kaWFsb2ctdGl0bGUge1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxLjFyZW07XHJcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICMxZTI5M2I7XHJcbiAgICAgICAgICAgICAgICBsZXR0ZXItc3BhY2luZzogLTAuM3B4O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAuYWN0aXZlLWJhZGdlIHtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMC43MnJlbTtcclxuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogIzRmNDZlNTtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICNlZWYyZmY7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAxcHggOHB4O1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogOTlweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmNsb3NlLWJ0biB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjOTRhM2I4O1xyXG5cclxuICAgICAgICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogIzFlMjkzYjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuZGlhbG9nLWJvZHkge1xyXG4gICAgICAgIHBhZGRpbmc6IDI0cHg7XHJcbiAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblxyXG4gICAgICAgIC53LTEwMCB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLm1iLTIge1xyXG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAubWItNCB7XHJcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZmlsdGVyLWdyb3VwIHtcclxuICAgICAgICAgICAgLmZpbHRlci1sYWJlbCB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgICAgIGdhcDogNnB4O1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAwLjgycmVtO1xyXG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICAgICAgICAgICAgICBsZXR0ZXItc3BhY2luZzogMC41cHg7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogIzY0NzQ4YjtcclxuICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XHJcblxyXG4gICAgICAgICAgICAgICAgbWF0LWljb24ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTZweDtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE2cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICM5NGEzYjg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC5jaGlwLXNlbGVjdG9yIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICAgICAgICAgICAgICBnYXA6IDhweDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLmNoaXAtb3B0aW9uIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgICAgIGdhcDogNHB4O1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogNnB4IDE0cHg7XHJcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA5OXB4O1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAwLjgycmVtO1xyXG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZjhmYWZjO1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICM0NzU1Njk7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xyXG4gICAgICAgICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcblxyXG4gICAgICAgICAgICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiAjYzdkMmZlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmNWYzZmY7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJi5hY3RpdmUge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNlZWYyZmYsICNlMGU3ZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlci1jb2xvcjogIzgxOGNmODtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzM3MzBhMztcclxuICAgICAgICAgICAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5kaWFsb2ctZm9vdGVyIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIHBhZGRpbmc6IDE0cHggMjRweDtcclxuICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2UyZThmMDtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjZjhmYWZjO1xyXG5cclxuICAgICAgICAuYnRuLWNsZWFyIHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAwLjgycmVtO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDM2cHg7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNjQ3NDhiO1xyXG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICNjYmQ1ZTE7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuXHJcbiAgICAgICAgICAgIG1hdC1pY29uIHtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNnB4O1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxNnB4O1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA0cHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5mb290ZXItcmlnaHQge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICBnYXA6IDhweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5idG4tY2FuY2VsIHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDM2cHg7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNjQ3NDhiO1xyXG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICNjYmQ1ZTE7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5idG4tYXBwbHkge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDAuODVyZW07XHJcbiAgICAgICAgICAgIGhlaWdodDogMzZweDtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNGY0NmU1LCAjNjM2NmYxKSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcclxuXHJcbiAgICAgICAgICAgIG1hdC1pY29uIHtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNnB4O1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxNnB4O1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA0cHg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC5hcHBseS1jb3VudCB7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogNHB4O1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMC44NTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 99611:
/*!*************************************************************************************!*\
  !*** ./src/app/deskdyne-components/main-dashboard/main-dashboard-routing.module.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MainDashboardRoutingModule: () => (/* binding */ MainDashboardRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _main_dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-dashboard.component */ 21801);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: "",
  component: _main_dashboard_component__WEBPACK_IMPORTED_MODULE_0__.MainDashboardComponent
}];
class MainDashboardRoutingModule {
  static #_ = this.ɵfac = function MainDashboardRoutingModule_Factory(t) {
    return new (t || MainDashboardRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: MainDashboardRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](MainDashboardRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 21801:
/*!********************************************************************************!*\
  !*** ./src/app/deskdyne-components/main-dashboard/main-dashboard.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MainDashboardComponent: () => (/* binding */ MainDashboardComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! highcharts */ 55080);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _main_dashboard_filter_dialog_main_dashboard_filter_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main-dashboard-filter-dialog/main-dashboard-filter-dialog.component */ 78455);
/* harmony import */ var src_config_order_status_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/config/order-status.config */ 47816);
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! exceljs */ 94262);
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(exceljs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! pdfmake/build/pdfmake */ 98853);
/* harmony import */ var pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! pdfmake/build/vfs_fonts */ 45217);
/* harmony import */ var pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ 17401);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! highcharts-angular */ 88578);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/datepicker */ 82226);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/icon */ 86515);


















function MainDashboardComponent_span_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r1.activeFilterCount);
  }
}
function MainDashboardComponent_div_31_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "mat-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function MainDashboardComponent_div_31_div_2_Template_mat_icon_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r10.removeFilter("org"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" Org: ", ctx_r6.filterOrg, " ");
  }
}
function MainDashboardComponent_div_31_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "mat-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function MainDashboardComponent_div_31_div_3_Template_mat_icon_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r12.removeFilter("city"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" City: ", ctx_r7.filterCity, " ");
  }
}
function MainDashboardComponent_div_31_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "mat-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function MainDashboardComponent_div_31_div_4_Template_mat_icon_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r14.removeFilter("location"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" Location: ", ctx_r8.filterLocation, " ");
  }
}
function MainDashboardComponent_div_31_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "mat-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function MainDashboardComponent_div_31_div_5_Template_mat_icon_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r17);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r16.removeFilter("status"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" Status: ", ctx_r9.orderStatusMapper[ctx_r9.filterStatus] || ctx_r9.filterStatus, " ");
  }
}
function MainDashboardComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 33)(1, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, MainDashboardComponent_div_31_div_2_Template, 4, 1, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, MainDashboardComponent_div_31_div_3_Template, 4, 1, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, MainDashboardComponent_div_31_div_4_Template, 4, 1, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, MainDashboardComponent_div_31_div_5_Template, 4, 1, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function MainDashboardComponent_div_31_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      ctx_r18.clearFilters();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r18.buildPieChart());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8, "filter_alt_off");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, " Clear All ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r2.filterOrg);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r2.filterCity);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r2.filterLocation);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r2.filterStatus);
  }
}
function MainDashboardComponent_div_60_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 39)(1, "mat-icon", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "autorenew");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, " Loading orders data... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function MainDashboardComponent_div_61_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 41)(1, "div", 42)(2, "div", 43)(3, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "receipt_long");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 44)(6, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "Orders");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "div", 42)(11, "div", 47)(12, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](13, "payments");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "div", 44)(15, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](16, "Total Amount");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](19, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "div", 42)(21, "div", 48)(22, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](23, "account_balance_wallet");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](24, "div", 44)(25, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](26, "Amount Paid");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](27, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](29, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](30, "div", 42)(31, "div", 49)(32, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](33, "savings");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](34, "div", 44)(35, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](36, "Money Wallet");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](37, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](39, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](40, "div", 42)(41, "div", 50)(42, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](43, "corporate_fare");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](44, "div", 44)(45, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](46, "Company Wallet");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](47, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](48);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](49, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](50, "div", 42)(51, "div", 51)(52, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](53, "volunteer_activism");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](54, "div", 44)(55, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](56, "Subsidy");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](57, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](58);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](59, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](60, "div", 42)(61, "div", 52)(62, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](63, "inventory_2");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](64, "div", 44)(65, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](66, "Packaging");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](67, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](68);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](69, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r4.ordersCount);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("\u20B9 ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](19, 7, ctx_r4.totalAmount, "1.0-0"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("\u20B9 ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](29, 10, ctx_r4.totalAmountPaid, "1.0-0"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("\u20B9 ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](39, 13, ctx_r4.totalWalletUsed, "1.0-0"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("\u20B9 ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](49, 16, ctx_r4.totalCompanyWallet, "1.0-0"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("\u20B9 ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](59, 19, ctx_r4.totalSubsidy, "1.0-0"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("\u20B9 ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](69, 22, ctx_r4.totalPackaging, "1.0-0"), "");
  }
}
function MainDashboardComponent_div_62_highcharts_chart_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "highcharts-chart", 57);
  }
  if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("Highcharts", ctx_r20.Highcharts)("options", ctx_r20.chartOptionsPie)("update", ctx_r20.updateStatusFlag)("oneToOne", ctx_r20.oneToOneStatusFlag);
  }
}
function MainDashboardComponent_div_62_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 58)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "pie_chart");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "No order data for the selected period");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function MainDashboardComponent_div_62_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 53)(1, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, MainDashboardComponent_div_62_highcharts_chart_2_Template, 1, 4, "highcharts-chart", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, MainDashboardComponent_div_62_div_3_Template, 5, 0, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r5.initialStatusData.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r5.initialStatusData.length === 0);
  }
}
pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_5__.vfs = pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_6__.pdfMake?.vfs ?? pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_6__.vfs ?? {};
class MainDashboardComponent {
  constructor(apiMainService, dialog) {
    this.apiMainService = apiMainService;
    this.dialog = dialog;
    this.Highcharts = highcharts__WEBPACK_IMPORTED_MODULE_1__;
    this.orderStatusMapper = src_config_order_status_config__WEBPACK_IMPORTED_MODULE_3__.orderStatusMapper;
    this.isLoading = false;
    this.maxDate = new Date();
    // ── Raw Data ──
    this.orgList = [];
    this.outletList = [];
    this.vendorList = [];
    this.allOrders = [];
    this.filteredOrders = [];
    // ── Filters ──
    this.filterOrg = '';
    this.filterCity = '';
    this.filterLocation = '';
    this.filterStatus = '';
    this.uniqueOrgs = [];
    this.uniqueCities = [];
    this.uniqueLocations = [];
    this.uniqueOrderStatuses = [];
    // ── Computed Totals ──
    this.ordersCount = 0;
    this.totalAmountPaid = 0;
    this.totalWalletUsed = 0;
    this.totalCompanyWallet = 0;
    this.totalSubsidy = 0;
    this.totalPackaging = 0;
    this.totalAmount = 0;
    // ── Pie Chart ──
    this.chartOptionsPie = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Outlet Orders by Status'
      },
      tooltip: {
        pointFormat: '<small>Count</small>: <b>{point.count}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.percentage:.1f}%'
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Percentage',
        data: []
      }]
    };
    this.updateStatusFlag = false;
    this.oneToOneStatusFlag = true;
    this.initialStatusData = [];
    this.dateGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormGroup({
      start: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(new Date()),
      end: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(new Date())
    });
  }
  ngOnInit() {
    this.loadStaticData();
    this.loadOrders();
  }
  // ── Static Data (no date filter) ──
  loadStaticData() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const [orgs, outlets, vendors] = yield Promise.all([_this.apiMainService.B2B_fetchFilteredAllOrgs({
          countOnly: false
        }, 1), _this.apiMainService.searchOutlet({}), _this.apiMainService.getAllVendorFirms()]);
        console.log(orgs, "dd");
        _this.orgList = orgs || [];
        _this.outletList = outlets || [];
        _this.vendorList = vendors || [];
        _this.extractFilterOptions(); // Re-extract in case static data loads after orders
      } catch (err) {
        console.error('Error loading static counts:', err);
      }
    })();
  }
  // ── Orders (date-filtered) ──
  loadOrders() {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.isLoading = true;
      try {
        const body = {
          fromDate: _this2.dateGroup.value.start?.toISOString(),
          toDate: _this2.dateGroup.value.end?.toISOString()
        };
        const orders = yield _this2.apiMainService.fetchAllOutletOrdersbysearchObj(body);
        _this2.allOrders = orders || [];
        _this2.extractFilterOptions();
        _this2.applyFilters();
        _this2.buildPieChart();
      } catch (err) {
        console.error('Error loading orders:', err);
      } finally {
        _this2.isLoading = false;
      }
    })();
  }
  // ── Filters ──
  extractFilterOptions() {
    // Order Status comes from allOrders (dynamic)
    const statuses = new Set();
    this.allOrders.forEach(o => {
      if (o.orderstatus) statuses.add(o.orderstatus);
    });
    this.uniqueOrderStatuses = Array.from(statuses).sort();
    // Org/City/Location from orgList
    const orgs = new Set();
    const cities = new Set();
    const locations = new Set();
    this.orgList.forEach(org => {
      if (org.organization_name) orgs.add(org.organization_name);
      if (org.cafeteriaList) {
        org.cafeteriaList.forEach(cafe => {
          if (cafe.cafeteria_city) cities.add(cafe.cafeteria_city);
          if (cafe.location) locations.add(cafe.location);
        });
      }
    });
    this.uniqueOrgs = Array.from(orgs).sort();
    this.uniqueCities = Array.from(cities).sort();
    this.uniqueLocations = Array.from(locations).sort();
  }
  openFilterDialog() {
    const dialogRef = this.dialog.open(_main_dashboard_filter_dialog_main_dashboard_filter_dialog_component__WEBPACK_IMPORTED_MODULE_2__.MainDashboardFilterDialogComponent, {
      width: '450px',
      panelClass: 'filter-dialog-panel',
      autoFocus: false,
      data: {
        orgList: this.orgList,
        uniqueOrderStatuses: this.uniqueOrderStatuses,
        currentFilters: {
          org: this.filterOrg,
          city: this.filterCity,
          location: this.filterLocation,
          status: this.filterStatus
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterOrg = result.org;
        this.filterCity = result.city;
        this.filterLocation = result.location;
        this.filterStatus = result.status;
        this.applyFilters();
        this.buildPieChart();
      }
    });
  }
  applyFilters() {
    let orders = [...this.allOrders];
    if (this.filterOrg) {
      orders = orders.filter(o => o.organizationDetails?.organization_name === this.filterOrg);
    }
    if (this.filterCity) {
      orders = orders.filter(o => o.cafeteriaDetails?.cafeteria_city === this.filterCity);
    }
    if (this.filterLocation) {
      orders = orders.filter(o => o.cafeteriaDetails?.location === this.filterLocation);
    }
    if (this.filterStatus) {
      orders = orders.filter(o => o.orderstatus === this.filterStatus);
    }
    this.filteredOrders = orders;
    this.calculateTotals();
  }
  calculateTotals() {
    this.totalAmountPaid = 0;
    this.totalWalletUsed = 0;
    this.totalCompanyWallet = 0;
    this.totalSubsidy = 0;
    this.totalPackaging = 0;
    this.filteredOrders.forEach(order => {
      this.totalAmountPaid += Number(order.amount) || 0;
      this.totalWalletUsed += Number(order.moneyWalletPointsUsed) || 0;
      this.totalCompanyWallet += Number(order.companyWalletPointUsed) || 0;
      this.totalSubsidy += Number(order.subsidyAmount) || 0;
      this.totalPackaging += Number(order.packagingAmount) || 0;
    });
    this.totalAmount = this.totalAmountPaid + this.totalWalletUsed;
    this.ordersCount = this.filteredOrders.length;
  }
  get activeFilterCount() {
    let count = 0;
    if (this.filterOrg) count++;
    if (this.filterCity) count++;
    if (this.filterLocation) count++;
    if (this.filterStatus) count++;
    return count;
  }
  clearFilters() {
    this.filterOrg = '';
    this.filterCity = '';
    this.filterLocation = '';
    this.filterStatus = '';
    this.applyFilters();
    this.buildPieChart();
  }
  removeFilter(key) {
    if (key === 'org') this.filterOrg = '';
    if (key === 'city') this.filterCity = '';
    if (key === 'location') this.filterLocation = '';
    if (key === 'status') this.filterStatus = '';
    this.applyFilters();
    this.buildPieChart();
  }
  // ── Pie Chart ──
  buildPieChart() {
    const statusMap = {};
    const total = this.filteredOrders.length || 1;
    this.filteredOrders.forEach(o => {
      const s = o.orderstatus || 'unknown';
      statusMap[s] = (statusMap[s] || 0) + 1;
    });
    const formattedData = Object.entries(statusMap).map(([status, count]) => ({
      name: this.orderStatusMapper[status] || status,
      y: count / total * 100,
      count
    }));
    this.initialStatusData = formattedData;
    this.chartOptionsPie = {
      ...this.chartOptionsPie,
      series: [{
        type: 'pie',
        name: 'Percentage',
        data: formattedData
      }]
    };
    this.updateStatusFlag = true;
  }
  // ── Date Change ──
  changeDate() {
    this.loadOrders();
  }
  // ── Exports ──
  excelExport() {
    var _this3 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this3.filteredOrders.length) return;
      const workbook = new exceljs__WEBPACK_IMPORTED_MODULE_4__.Workbook();
      const worksheet = workbook.addWorksheet('Outlet Orders');
      worksheet.columns = [{
        header: 'Order No',
        key: 'orderNo',
        width: 12
      }, {
        header: 'Token No',
        key: 'tokenNo',
        width: 10
      }, {
        header: 'Order Date',
        key: 'orderDate',
        width: 18
      }, {
        header: 'Status',
        key: 'status',
        width: 16
      }, {
        header: 'Customer Name',
        key: 'customerName',
        width: 20
      }, {
        header: 'Customer Mobile',
        key: 'customerPhoneNo',
        width: 16
      }, {
        header: 'Customer Email',
        key: 'customerEmail',
        width: 24
      }, {
        header: 'Org Name',
        key: 'orgName',
        width: 22
      }, {
        header: 'Cafe Name',
        key: 'cafeName',
        width: 18
      }, {
        header: 'Items',
        key: 'items',
        width: 40
      }, {
        header: 'Item Amount (₹)',
        key: 'itemAmount',
        width: 16
      }, {
        header: 'Packaging (₹)',
        key: 'packaging',
        width: 14
      }, {
        header: 'Subsidy Amount (₹)',
        key: 'subsidyAmount',
        width: 18
      }, {
        header: 'Wallet Used (₹)',
        key: 'walletUsed',
        width: 16
      }, {
        header: 'Company Wallet (₹)',
        key: 'companyWallet',
        width: 16
      }, {
        header: 'Amount Paid (₹)',
        key: 'amountPaid',
        width: 16
      }, {
        header: 'PG Name',
        key: 'pgName',
        width: 14
      }, {
        header: 'App Version',
        key: 'appVersion',
        width: 12
      }, {
        header: 'Platform',
        key: 'platform',
        width: 12
      }];
      // Header Row
      const headerRow = worksheet.getRow(1);
      headerRow.font = {
        bold: true
      };
      // Data Rows
      let totalItemAmount = 0;
      let totalPackaging = 0;
      let totalSubsidy = 0;
      let totalWalletUsed = 0;
      let totalCompanyWallet = 0;
      let totalAmountPaid = 0;
      _this3.filteredOrders.forEach(order => {
        const walletUsed = Number(order.moneyWalletPointsUsed) || 0;
        const amountPaid = Number(order.amount) || 0;
        const itemAmount = Number(order.itemAmount) || 0;
        const packaging = Number(order.packagingAmount) || 0;
        const subsidyAmount = Number(order.subsidyAmount) || 0;
        const companyWallet = Number(order.companyWalletPointUsed) || 0;
        const items = (order.itemList || []).map(i => `${i.itemName} x${i.count} @₹${i.price}`).join('; ');
        worksheet.addRow({
          orderNo: order.orderNo,
          tokenNo: order.tokenNo || '-',
          orderDate: new Date(order.orderDate).toLocaleString('en-IN'),
          status: _this3.orderStatusMapper[order.orderstatus] || order.orderstatus,
          customerName: order.customerName,
          customerPhoneNo: order.customerPhoneNo,
          customerEmail: order.customerEmail,
          orgName: order.organizationDetails?.organization_name,
          cafeName: order.cafeteriaDetails?.cafeteria_name,
          items,
          itemAmount,
          packaging,
          subsidyAmount,
          walletUsed,
          companyWallet,
          amountPaid,
          pgName: order.pgName || '-',
          appVersion: order.appVersion || '-',
          platform: order.deviceInfo?.platform || '-'
        });
        totalItemAmount += itemAmount;
        totalPackaging += packaging;
        totalSubsidy += subsidyAmount;
        totalWalletUsed += walletUsed;
        totalCompanyWallet += companyWallet;
        totalAmountPaid += amountPaid;
      });
      // Totals Row
      const totalsRow = worksheet.addRow({
        orderNo: 'Totals',
        itemAmount: totalItemAmount,
        packaging: totalPackaging,
        subsidyAmount: totalSubsidy,
        walletUsed: totalWalletUsed,
        companyWallet: totalCompanyWallet,
        amountPaid: totalAmountPaid
      });
      totalsRow.font = {
        bold: true
      };
      // Borders
      worksheet.eachRow((row, rIndex) => {
        row.eachCell(cell => {
          cell.border = {
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
        });
      });
      // Write Buffer
      const buffer = yield workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `Dashboard_Orders_${new Date().toISOString().slice(0, 10)}.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    })();
  }
  downloadPdf() {
    if (!this.filteredOrders.length) return;
    const tableHeaders = [{
      text: 'Order No',
      bold: true
    }, {
      text: 'Date',
      bold: true
    }, {
      text: 'Status',
      bold: true
    }, {
      text: 'Customer',
      bold: true
    }, {
      text: 'Mobile',
      bold: true
    }, {
      text: 'Org',
      bold: true
    }, {
      text: 'Items',
      bold: true
    }, {
      text: 'Amt (₹)',
      bold: true
    }, {
      text: 'Paid (₹)',
      bold: true
    }];
    const body = [];
    body.push(tableHeaders);
    let totalAmountPaid = 0;
    this.filteredOrders.forEach(order => {
      const amountPaid = Number(order.amount) || 0;
      const items = (order.itemList || []).map(i => `${i.itemName} x${i.count}`).join('; ');
      body.push([order.orderNo || '', new Date(order.orderDate).toLocaleString('en-IN') || '', this.orderStatusMapper[order.orderstatus] || order.orderstatus || '', order.customerName || '', order.customerPhoneNo || '', order.organizationDetails?.organization_name?.slice(0, 15) || '', items.slice(0, 50) + (items.length > 50 ? '...' : ''), (Number(order.amount) + Number(order.walletUsed || 0)).toFixed(2), amountPaid.toFixed(2)]);
      totalAmountPaid += amountPaid;
    });
    body.push([{
      text: 'Totals',
      bold: true,
      colSpan: 8,
      alignment: 'right'
    }, {}, {}, {}, {}, {}, {}, {}, {
      text: totalAmountPaid.toFixed(2),
      bold: true
    }]);
    const docDefinition = {
      pageOrientation: 'landscape',
      pageMargins: [15, 15, 15, 15],
      content: [{
        text: 'Dashboard Orders Report',
        style: 'header'
      }, {
        text: `Generated on: ${new Date().toLocaleString()}`,
        style: 'subheader',
        margin: [0, 0, 0, 10]
      }, {
        table: {
          headerRows: 1,
          widths: [50, 70, 60, 80, 60, 70, '*', 50, 50],
          body
        },
        layout: 'lightHorizontalLines'
      }],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 5]
        },
        subheader: {
          fontSize: 10,
          color: '#555'
        }
      },
      defaultStyle: {
        fontSize: 9
      }
    };
    pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_5__.createPdf(docDefinition).download(`Dashboard_Orders_${new Date().toISOString().slice(0, 10)}.pdf`);
  }
  static #_ = this.ɵfac = function MainDashboardComponent_Factory(t) {
    return new (t || MainDashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_7__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__.MatDialog));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
    type: MainDashboardComponent,
    selectors: [["app-main-dashboard"]],
    decls: 63,
    vars: 16,
    consts: [[1, "dashboard-container"], [1, "dashboard-header"], [1, "header-content"], [1, "title-section"], [1, "page-title"], [1, "page-subtitle"], [1, "actions-section"], ["appearance", "outline", 1, "date-range-field"], [3, "formGroup", "rangePicker", "max"], ["matStartDate", "", "placeholder", "Start", "formControlName", "start"], ["matEndDate", "", "placeholder", "End", "formControlName", "end", 3, "dateChange"], ["matIconSuffix", "", 3, "for"], ["picker", ""], ["mat-stroked-button", "", 1, "action-btn", 3, "disabled", "click"], [1, "excel-icon"], [1, "pdf-icon"], ["mat-stroked-button", "", 1, "filter-btn", 3, "click"], ["class", "filter-badge", 4, "ngIf"], ["class", "active-filter-chips", 4, "ngIf"], [1, "stats-row", "entity-stats"], [1, "stat-card", "stat-orgs"], [1, "stat-icon-wrap", "orgs-gradient"], [1, "stat-info"], [1, "stat-label"], [1, "stat-value"], [1, "stat-card", "stat-outlets"], [1, "stat-icon-wrap", "outlets-gradient"], [1, "stat-card", "stat-vendors"], [1, "stat-icon-wrap", "vendors-gradient"], ["class", "loading-strip", 4, "ngIf"], ["class", "stats-row financial-stats", 4, "ngIf"], ["class", "chart-section", 4, "ngIf"], [1, "filter-badge"], [1, "active-filter-chips"], [1, "chip-strip"], ["class", "filter-chip", 4, "ngIf"], ["mat-stroked-button", "", 1, "btn-clear-all", 3, "click"], [1, "filter-chip"], [3, "click"], [1, "loading-strip"], [1, "spin"], [1, "stats-row", "financial-stats"], [1, "fin-card"], [1, "fin-icon", "orders-icon"], [1, "fin-info"], [1, "fin-label"], [1, "fin-value"], [1, "fin-icon", "amount-icon"], [1, "fin-icon", "paid-icon"], [1, "fin-icon", "wallet-icon"], [1, "fin-icon", "company-icon"], [1, "fin-icon", "subsidy-icon"], [1, "fin-icon", "packaging-icon"], [1, "chart-section"], [1, "chart-card"], ["style", "width: 100%; height: 400px; display: block", 3, "Highcharts", "options", "update", "oneToOne", 4, "ngIf"], ["class", "chart-empty", 4, "ngIf"], [2, "width", "100%", "height", "400px", "display", "block", 3, "Highcharts", "options", "update", "oneToOne"], [1, "chart-empty"]],
    template: function MainDashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "Dashboard");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "Real-time overview of your business");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 6)(9, "mat-form-field", 7)(10, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11, "Date Range");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "mat-date-range-input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](13, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("dateChange", function MainDashboardComponent_Template_input_dateChange_14_listener() {
          return ctx.changeDate();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](15, "mat-datepicker-toggle", 11)(16, "mat-date-range-picker", null, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function MainDashboardComponent_Template_button_click_18_listener() {
          return ctx.excelExport();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "mat-icon", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](20, "table_view");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](21, " Excel ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](22, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function MainDashboardComponent_Template_button_click_22_listener() {
          return ctx.downloadPdf();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](23, "mat-icon", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](24, "picture_as_pdf");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](25, " PDF ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](26, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function MainDashboardComponent_Template_button_click_26_listener() {
          return ctx.openFilterDialog();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](27, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](28, "filter_list");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](29, " Filters ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](30, MainDashboardComponent_span_30_Template, 2, 1, "span", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](31, MainDashboardComponent_div_31_Template, 10, 4, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](32, "div", 19)(33, "div", 20)(34, "div", 21)(35, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](36, "business");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](37, "div", 22)(38, "span", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](39, "Organizations");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](40, "span", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](41);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](42, "div", 25)(43, "div", 26)(44, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](45, "storefront");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](46, "div", 22)(47, "span", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](48, "Outlets");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](49, "span", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](50);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](51, "div", 27)(52, "div", 28)(53, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](54, "people");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](55, "div", 22)(56, "span", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](57, "Vendor Firms");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](58, "span", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](59);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](60, MainDashboardComponent_div_60_Template, 4, 0, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](61, MainDashboardComponent_div_61_Template, 70, 25, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](62, MainDashboardComponent_div_62_Template, 4, 2, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", ctx.dateGroup)("rangePicker", _r0)("max", ctx.maxDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("for", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.filteredOrders.length === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.filteredOrders.length === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active-filter", ctx.activeFilterCount > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.activeFilterCount > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.activeFilterCount > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx.orgList.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx.outletList.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx.vendorList.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.isLoading);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControlName, highcharts_angular__WEBPACK_IMPORTED_MODULE_12__.HighchartsChartComponent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatSuffix, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_14__.MatDatepickerToggle, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_14__.MatDateRangeInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_14__.MatStartDate, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_14__.MatEndDate, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_14__.MatDateRangePicker, _angular_material_button__WEBPACK_IMPORTED_MODULE_15__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_11__.DecimalPipe],
    styles: ["\n\n\n\n[_ngcontent-%COMP%]:root {\n  --color-primary: #0E49B5;\n  --color-secondary: #FF3333;\n  --color-backgroundGrey: #f3f3f3;\n  --color-text: #1a1a1a;\n}\n\n.dashboard-container[_ngcontent-%COMP%] {\n  padding: 1.5rem 2rem;\n  margin: 0 auto;\n}\n\n.dashboard-header[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 1.5rem 2rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n  border: 1px solid #e2e8f0;\n  margin-bottom: 1.5rem;\n}\n.dashboard-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n@media (max-width: 768px) {\n  .dashboard-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n.dashboard-header[_ngcontent-%COMP%]   .title-section[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #1e293b;\n  margin: 0;\n  letter-spacing: -0.5px;\n}\n.dashboard-header[_ngcontent-%COMP%]   .title-section[_ngcontent-%COMP%]   .page-subtitle[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #64748b;\n  font-size: 0.9rem;\n}\n.dashboard-header[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  flex-wrap: wrap;\n}\n\n.date-range-field[_ngcontent-%COMP%] {\n  width: 240px;\n}\n\n.action-btn[_ngcontent-%COMP%] {\n  height: 48px;\n  border-radius: 12px;\n  border: 1px solid #e2e8f0;\n  color: #475569;\n  font-weight: 500;\n  padding: 0 16px;\n}\n.action-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 6px;\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.action-btn[_ngcontent-%COMP%]   .excel-icon[_ngcontent-%COMP%] {\n  color: #10b981;\n}\n.action-btn[_ngcontent-%COMP%]   .pdf-icon[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.action-btn[_ngcontent-%COMP%]:hover:not([disabled]) {\n  background-color: #f8fafc;\n  border-color: #cbd5e1;\n  color: #1e293b;\n}\n\n.filter-btn[_ngcontent-%COMP%] {\n  height: 48px;\n  border-radius: 12px;\n  border: 1px solid #e2e8f0;\n  color: #475569;\n  font-weight: 500;\n  padding: 0 16px;\n  position: relative;\n  overflow: visible;\n}\n.filter-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 6px;\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.filter-btn[_ngcontent-%COMP%]:hover {\n  background-color: #f8fafc;\n  border-color: #cbd5e1;\n  color: #1e293b;\n}\n.filter-btn.active-filter[_ngcontent-%COMP%] {\n  background-color: #eef2ff;\n  border-color: #818cf8;\n  color: #4f46e5;\n}\n\n.filter-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -6px;\n  right: -6px;\n  background: #ef4444;\n  color: white;\n  font-size: 10px;\n  font-weight: 700;\n  height: 18px;\n  min-width: 18px;\n  border-radius: 9px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0 4px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  border: 2px solid white;\n}\n\n  .dashboard-container .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n\n  .dashboard-container .mdc-notched-outline__leading {\n  border-top-left-radius: 12px !important;\n  border-bottom-left-radius: 12px !important;\n}\n\n  .dashboard-container .mdc-notched-outline__trailing {\n  border-top-right-radius: 12px !important;\n  border-bottom-right-radius: 12px !important;\n}\n\n.active-filter-chips[_ngcontent-%COMP%] {\n  margin-bottom: 1.25rem;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n\n.chip-strip[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n  align-items: center;\n}\n\n.filter-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 12px;\n  border-radius: 99px;\n  font-size: 0.78rem;\n  font-weight: 500;\n  color: #3730a3;\n  background: linear-gradient(135deg, #eef2ff, #e0e7ff);\n  border: 1px solid #c7d2fe;\n}\n.filter-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n  cursor: pointer;\n  opacity: 0.6;\n  transition: opacity 0.15s;\n}\n.filter-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n.btn-clear-all[_ngcontent-%COMP%] {\n  border-radius: 99px !important;\n  font-size: 0.75rem !important;\n  height: 28px !important;\n  color: #64748b !important;\n  border-color: #cbd5e1 !important;\n  padding: 0 10px !important;\n  line-height: 28px !important;\n}\n.btn-clear-all[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n  margin-right: 2px;\n}\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.stats-row[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n\n.entity-stats[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(3, 1fr);\n}\n@media (max-width: 768px) {\n  .entity-stats[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n.stat-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 1.25rem 1.5rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  border: 1px solid #e2e8f0;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);\n}\n\n.stat-icon-wrap[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.stat-icon-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 26px;\n  width: 26px;\n  height: 26px;\n  color: white;\n}\n\n.orgs-gradient[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #f59e0b, #d97706);\n}\n\n.outlets-gradient[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #6366f1, #4f46e5);\n}\n\n.vendors-gradient[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #10b981, #059669);\n}\n\n.stat-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.stat-info[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: #64748b;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.stat-info[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #1e293b;\n  letter-spacing: -0.5px;\n}\n\n.loading-strip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 1rem;\n  background: #f1f5f9;\n  border-radius: 12px;\n  color: #64748b;\n  font-size: 0.9rem;\n  margin-bottom: 1.5rem;\n}\n.loading-strip[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.financial-stats[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));\n}\n\n.fin-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 14px;\n  padding: 1rem 1.25rem;\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  border: 1px solid #e2e8f0;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.fin-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n}\n\n.fin-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.fin-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  color: white;\n}\n\n.orders-icon[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #3b82f6, #2563eb);\n}\n\n.amount-icon[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #8b5cf6, #7c3aed);\n}\n\n.paid-icon[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #06b6d4, #0891b2);\n}\n\n.wallet-icon[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #f59e0b, #d97706);\n}\n\n.company-icon[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #6366f1, #4f46e5);\n}\n\n.subsidy-icon[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #ec4899, #db2777);\n}\n\n.packaging-icon[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #14b8a6, #0d9488);\n}\n\n.fin-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.fin-info[_ngcontent-%COMP%]   .fin-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: #94a3b8;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.fin-info[_ngcontent-%COMP%]   .fin-value[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  font-weight: 700;\n  color: #1e293b;\n  letter-spacing: -0.3px;\n}\n\n.chart-section[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n\n.chart-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 1rem;\n  border: 1px solid #e2e8f0;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);\n  overflow: hidden;\n  max-width: 700px;\n}\n\n.chart-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem;\n  color: #94a3b8;\n}\n.chart-empty[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  margin-bottom: 0.5rem;\n  opacity: 0.4;\n}\n.chart-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9rem;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGhlbWUvX3ZhcmlhYmxlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2Rlc2tkeW5lLWNvbXBvbmVudHMvbWFpbi1kYXNoYm9hcmQvbWFpbi1kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OytDQUFBO0FBMEVBO0VBQ0Usd0JBQUE7RUFDQSwwQkFBQTtFQUNBLCtCQUFBO0VBQ0EscUJBQUE7QUN0RUY7O0FBTEE7RUFDRSxvQkFBQTtFQUVBLGNBQUE7QUFPRjs7QUFIQTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLHlDQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtBQU1GO0FBSkU7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0FBTUo7QUFKSTtFQVBGO0lBUUksc0JBQUE7SUFDQSxvQkFBQTtFQU9KO0FBQ0Y7QUFISTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsU0FBQTtFQUNBLHNCQUFBO0FBS047QUFGSTtFQUNFLGVBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7QUFJTjtBQUFFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUFFSjs7QUFFQTtFQUNFLFlBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQUNGO0FBQ0U7RUFDRSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUNKO0FBRUU7RUFDRSxjQUFBO0FBQUo7QUFJRTtFQUNFLGNBQUE7QUFGSjtBQU9FO0VBQ0UseUJBQUE7RUFDQSxxQkFBQTtFQUNBLGNBQUE7QUFMSjs7QUFTQTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFORjtBQVFFO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFOSjtBQVNFO0VBQ0UseUJBQUE7RUFDQSxxQkFBQTtFQUNBLGNBQUE7QUFQSjtBQVVFO0VBQ0UseUJBQUE7RUFDQSxxQkFBQTtFQUNBLGNBQUE7QUFSSjs7QUFZQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0VBQ0Esd0NBQUE7RUFDQSx1QkFBQTtBQVRGOztBQWFBO0VBQ0UsYUFBQTtBQVZGOztBQWFBO0VBQ0UsdUNBQUE7RUFDQSwwQ0FBQTtBQVZGOztBQWFBO0VBQ0Usd0NBQUE7RUFDQSwyQ0FBQTtBQVZGOztBQWNBO0VBQ0Usc0JBQUE7RUFDQSwyQkFBQTtBQVhGOztBQWNBO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7QUFYRjs7QUFjQTtFQUNFLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EscURBQUE7RUFDQSx5QkFBQTtBQVhGO0FBYUU7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0FBWEo7QUFhSTtFQUNFLFVBQUE7QUFYTjs7QUFnQkE7RUFDRSw4QkFBQTtFQUNBLDZCQUFBO0VBQ0EsdUJBQUE7RUFDQSx5QkFBQTtFQUNBLGdDQUFBO0VBQ0EsMEJBQUE7RUFDQSw0QkFBQTtBQWJGO0FBZUU7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQWJKOztBQWlCQTtFQUNFO0lBQ0UsVUFBQTtJQUNBLDJCQUFBO0VBZEY7RUFpQkE7SUFDRSxVQUFBO0lBQ0Esd0JBQUE7RUFmRjtBQUNGO0FBbUJBO0VBQ0UsYUFBQTtFQUNBLFNBQUE7RUFDQSxxQkFBQTtBQWpCRjs7QUFvQkE7RUFDRSxxQ0FBQTtBQWpCRjtBQW1CRTtFQUhGO0lBSUksMEJBQUE7RUFoQkY7QUFDRjs7QUFtQkE7RUFDRSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EseUJBQUE7RUFDQSx5Q0FBQTtFQUNBLDJDQUFBO0FBaEJGO0FBa0JFO0VBQ0UsMkJBQUE7RUFDQSwwQ0FBQTtBQWhCSjs7QUFvQkE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0FBakJGO0FBbUJFO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtBQWpCSjs7QUFxQkE7RUFDRSxxREFBQTtBQWxCRjs7QUFxQkE7RUFDRSxxREFBQTtBQWxCRjs7QUFxQkE7RUFDRSxxREFBQTtBQWxCRjs7QUFxQkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7QUFsQkY7QUFvQkU7RUFDRSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7QUFsQko7QUFxQkU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLHNCQUFBO0FBbkJKOztBQXdCQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsUUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0EscUJBQUE7QUFyQkY7QUF1QkU7RUFDRSxrQ0FBQTtBQXJCSjs7QUF5QkE7RUFDRTtJQUNFLHVCQUFBO0VBdEJGO0VBeUJBO0lBQ0UseUJBQUE7RUF2QkY7QUFDRjtBQTJCQTtFQUNFLDJEQUFBO0FBekJGOztBQTRCQTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSx5QkFBQTtFQUNBLHlDQUFBO0VBQ0EsMkNBQUE7QUF6QkY7QUEyQkU7RUFDRSwyQkFBQTtFQUNBLDBDQUFBO0FBekJKOztBQTZCQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGNBQUE7QUExQkY7QUE0QkU7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FBMUJKOztBQThCQTtFQUNFLHFEQUFBO0FBM0JGOztBQThCQTtFQUNFLHFEQUFBO0FBM0JGOztBQThCQTtFQUNFLHFEQUFBO0FBM0JGOztBQThCQTtFQUNFLHFEQUFBO0FBM0JGOztBQThCQTtFQUNFLHFEQUFBO0FBM0JGOztBQThCQTtFQUNFLHFEQUFBO0FBM0JGOztBQThCQTtFQUNFLHFEQUFBO0FBM0JGOztBQThCQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtBQTNCRjtBQTZCRTtFQUNFLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtBQTNCSjtBQThCRTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0Esc0JBQUE7QUE1Qko7O0FBaUNBO0VBQ0UsbUJBQUE7QUE5QkY7O0FBaUNBO0VBQ0UsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSx5QkFBQTtFQUNBLHlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQTlCRjs7QUFpQ0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7QUE5QkY7QUFnQ0U7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtFQUNBLFlBQUE7QUE5Qko7QUFpQ0U7RUFDRSxTQUFBO0VBQ0EsaUJBQUE7QUEvQkoiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgR2xvYmFsIFNDU1MgVmFyaWFibGVzIC0gQnJhbmQgQ29sb3JzXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuJHdoaXRlOiAjZmZmZmZmO1xyXG4kYmxhY2s6ICMwMDAwMDA7XHJcbiR0ZXh0UHJpbWFyeTogIzFhMWExYTtcclxuXHJcbi8vIEJyYW5kIENvbG9ycyAoUm95YWwgQmx1ZSAmIE5hdnkpXHJcbiRwcmltYXJ5LWNvbG9yMTogIzBFNDlCNTsgLy8gUm95YWwgQmx1ZSAoTWFpbiBQcmltYXJ5KVxyXG4kcHJpbWFyeS1jb2xvcjogJHByaW1hcnktY29sb3IxOyAvLyBBbGlhcyBmb3IgY29uc2lzdGVuY3lcclxuJHByaW1hcnktY29sb3IyOiAjMTkyNzU0OyAvLyBOYXZ5IEJsdWUgKFNlY29uZGFyeSAvIERhcmsgUHJpbWFyeSlcclxuJHByaW1hcnktY29sb3IzOiAjNGI4MmUyOyAvLyBMaWdodGVyIEJsdWUgZGVyaXZhdGl2ZVxyXG5cclxuLy8gQnJhbmQgQ29sb3JzIChDcmVhbSAmIFJlZClcclxuJHNlY29uZGFyeS1jb2xvcjE6ICNGNEVDQzU7IC8vIFNvZnQgQ3JlYW1cclxuJHNlY29uZGFyeS1jb2xvcjI6ICNmZmUwYjI7IC8vIERlcml2YXRpdmVcclxuJHNlY29uZGFyeS1jb2xvcjM6ICNGRjMzMzM7IC8vIEJyaWdodCBSZWQgKEFjY2VudClcclxuXHJcbi8vIERlc2lnbiBUb2tlbnMgLSBCb3JkZXIgUmFkaXVzXHJcbiRib3JkZXItcmFkaXVzLXNtOiA0cHg7XHJcbiRib3JkZXItcmFkaXVzLW1kOiA4cHg7XHJcbiRib3JkZXItcmFkaXVzLWxnOiAxMnB4O1xyXG4kYm9yZGVyLXJhZGl1cy14bDogMjBweDtcclxuJGJvcmRlci1yYWRpdXMtcGlsbDogOTk5OXB4O1xyXG4kYm9yZGVyLXJhZGl1cy1jaXJjbGU6IDUwJTtcclxuXHJcbi8vIERlc2lnbiBUb2tlbnMgLSBCb3ggU2hhZG93XHJcbiRib3gtc2hhZG93LXNtOiAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcclxuJGJveC1zaGFkb3ctbWQ6IDAgNHB4IDZweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMCAycHggNHB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjA2KTtcclxuJGJveC1zaGFkb3ctbGc6IDAgMTBweCAxNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDRweCA2cHggLTJweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xyXG4kYm94LXNoYWRvdy1jYXJkOiAwIDJweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4wNCk7XHJcbiRib3gtc2hhZG93LWNhcmQtaG92ZXI6IDAgOHB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjA4KTtcclxuXHJcbi8vIEFjY2VudCBDb2xvcnNcclxuJHNlY29uZGFyeS1vZmZzZXQtY29sb3IxOiAjZmZkNjc0O1xyXG4kc2Vjb25kYXJ5LW9mZnNldC1jb2xvcjI6ICNmZmM5NDc7XHJcbiRzZWNvbmRhcnktb2Zmc2V0LWNvbG9yMzogI2ZmYjMwMDtcclxuXHJcblxyXG4vLyBHcmF5cyAmIEJhY2tncm91bmRzXHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjE6ICNmZmZmZmY7XHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjI6ICNhNGE0YTQ7IC8vIEdyYXkgdGV4dFxyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3IzOiAjZjNmM2YzOyAvLyBMaWdodCBiYWNrZ3JvdW5kXHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjQ6ICNlZmVmZWY7IC8vIENhcmQgYmFja2dyb3VuZFxyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3I1OiB3aGl0ZTtcclxuJGJvcmRlci1jb2xvcjogI2U1ZTdlYjtcclxuJGNhcmQtb2RkOiAjZGVlMmU2O1xyXG4kYmFja2dyb3VuZC1jb2xvcjogI2YzZjNmMztcclxuLy8gVGhlbWUgQ29sb3JzIChNYXRjaGVzIHN0eWxlcy5zY3NzKVxyXG4kaW5mby1jb2xvcjogI2E0YTRhNDtcclxuJHRleHQtZGFyazogIzFhMWExYTtcclxuLy8gVGhlbWUgQ29sb3JzXHJcbiRwcmltYXJ5LWNvbG9yOiAjZTYyODQxO1xyXG4kc2Vjb25kYXJ5LWNvbG9yOiAjMTVhMjkyO1xyXG4kYmFja2Ryb3AtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcclxuLy8gU2VtYW50aWMgQ29sb3JzIChTdGFuZGFyZGl6ZWQpXHJcbiRjb2xvci1zdWNjZXNzOiAjNTJjNDFhO1xyXG4kY29sb3Itc3VjY2Vzcy1iZzogI2Y2ZmZlZDtcclxuJGNvbG9yLXN1Y2Nlc3MtYm9yZGVyOiAjYjdlYjhmO1xyXG5cclxuJGNvbG9yLXdhcm5pbmc6ICNmYWFkMTQ7XHJcbiRjb2xvci13YXJuaW5nLWJnOiAjZmZmN2U2O1xyXG4kY29sb3Itd2FybmluZy1ib3JkZXI6ICNmZmU1OGY7XHJcblxyXG4kY29sb3ItZXJyb3I6ICNmZjRkNGY7XHJcbiRjb2xvci1lcnJvci1iZzogI2ZmZjFmMDtcclxuJGNvbG9yLWVycm9yLWJvcmRlcjogI2ZmY2NjNztcclxuXHJcbiRjb2xvci1pbmZvOiAjMTg5MGZmO1xyXG4kY29sb3ItaW5mby1iZzogI2U2ZjdmZjtcclxuJGNvbG9yLWluZm8tYm9yZGVyOiAjOTFkNWZmO1xyXG5cclxuLy8gQ1NTIFZhcmlhYmxlcyBmb3IgUnVudGltZSBUaGVtaW5nXHJcbjpyb290IHtcclxuICAtLWNvbG9yLXByaW1hcnk6ICN7JHByaW1hcnktY29sb3IxfTtcclxuICAtLWNvbG9yLXNlY29uZGFyeTogI3skc2Vjb25kYXJ5LWNvbG9yM307XHJcbiAgLS1jb2xvci1iYWNrZ3JvdW5kR3JleTogI3skYmFja2dyb3VuZC1jb2xvcn07XHJcbiAgLS1jb2xvci10ZXh0OiAjeyR0ZXh0UHJpbWFyeX07XHJcbn0iLCJAdXNlICcvc3JjL3N0eWxlcy90aGVtZS92YXJpYWJsZScgYXMgdmFyO1xyXG5cclxuLy8gw6LClMKAw6LClMKAIERhc2hib2FyZCBDb250YWluZXIgw6LClMKAw6LClMKAXHJcbi5kYXNoYm9hcmQtY29udGFpbmVyIHtcclxuICBwYWRkaW5nOiAxLjVyZW0gMnJlbTtcclxuICAvLyBtYXgtd2lkdGg6IDE0MDBweDtcclxuICBtYXJnaW46IDAgYXV0bztcclxufVxyXG5cclxuLy8gw6LClMKAw6LClMKAIEhlYWRlciBDYXJkIMOiwpTCgMOiwpTCgFxyXG4uZGFzaGJvYXJkLWhlYWRlciB7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcclxuICBwYWRkaW5nOiAxLjVyZW0gMnJlbTtcclxuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjA0KTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZTJlOGYwO1xyXG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcclxuXHJcbiAgLmhlYWRlci1jb250ZW50IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG5cclxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC50aXRsZS1zZWN0aW9uIHtcclxuICAgIC5wYWdlLXRpdGxlIHtcclxuICAgICAgZm9udC1zaXplOiAxLjc1cmVtO1xyXG4gICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICBjb2xvcjogIzFlMjkzYjtcclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICBsZXR0ZXItc3BhY2luZzogLTAuNXB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5wYWdlLXN1YnRpdGxlIHtcclxuICAgICAgbWFyZ2luOiA0cHggMCAwO1xyXG4gICAgICBjb2xvcjogIzY0NzQ4YjtcclxuICAgICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYWN0aW9ucy1zZWN0aW9uIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiAwLjhyZW07XHJcbiAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgfVxyXG59XHJcblxyXG4uZGF0ZS1yYW5nZS1maWVsZCB7XHJcbiAgd2lkdGg6IDI0MHB4O1xyXG59XHJcblxyXG4uYWN0aW9uLWJ0biB7XHJcbiAgaGVpZ2h0OiA0OHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2UyZThmMDtcclxuICBjb2xvcjogIzQ3NTU2OTtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIHBhZGRpbmc6IDAgMTZweDtcclxuXHJcbiAgbWF0LWljb24ge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA2cHg7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB3aWR0aDogMjBweDtcclxuICAgIGhlaWdodDogMjBweDtcclxuICB9XHJcblxyXG4gIC5leGNlbC1pY29uIHtcclxuICAgIGNvbG9yOiAjMTBiOTgxO1xyXG4gIH1cclxuXHJcbiAgLy8gR3JlZW4gZm9yIEV4Y2VsXHJcbiAgLnBkZi1pY29uIHtcclxuICAgIGNvbG9yOiAjZWY0NDQ0O1xyXG4gIH1cclxuXHJcbiAgLy8gUmVkIGZvciBQREZcclxuXHJcbiAgJjpob3Zlcjpub3QoW2Rpc2FibGVkXSkge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZmFmYztcclxuICAgIGJvcmRlci1jb2xvcjogI2NiZDVlMTtcclxuICAgIGNvbG9yOiAjMWUyOTNiO1xyXG4gIH1cclxufVxyXG5cclxuLmZpbHRlci1idG4ge1xyXG4gIGhlaWdodDogNDhweDtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7XHJcbiAgY29sb3I6ICM0NzU1Njk7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBwYWRkaW5nOiAwIDE2cHg7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvLyBBbGxvdyBiYWRnZSB0byBvdmVyZmxvd1xyXG5cclxuICBtYXQtaWNvbiB7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDZweDtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIHdpZHRoOiAyMHB4O1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gIH1cclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmYWZjO1xyXG4gICAgYm9yZGVyLWNvbG9yOiAjY2JkNWUxO1xyXG4gICAgY29sb3I6ICMxZTI5M2I7XHJcbiAgfVxyXG5cclxuICAmLmFjdGl2ZS1maWx0ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZjJmZjtcclxuICAgIGJvcmRlci1jb2xvcjogIzgxOGNmODtcclxuICAgIGNvbG9yOiAjNGY0NmU1O1xyXG4gIH1cclxufVxyXG5cclxuLmZpbHRlci1iYWRnZSB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogLTZweDtcclxuICByaWdodDogLTZweDtcclxuICBiYWNrZ3JvdW5kOiAjZWY0NDQ0O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBmb250LXNpemU6IDEwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICBoZWlnaHQ6IDE4cHg7XHJcbiAgbWluLXdpZHRoOiAxOHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDlweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgcGFkZGluZzogMCA0cHg7XHJcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcclxufVxyXG5cclxuLy8gSGlkZSBzdWJzY3JpcHQgd3JhcHBlciBvbiBhbGwgZm9ybSBmaWVsZHMgaW5zaWRlIGRhc2hib2FyZFxyXG46Om5nLWRlZXAgLmRhc2hib2FyZC1jb250YWluZXIgLm1hdC1tZGMtZm9ybS1maWVsZC1zdWJzY3JpcHQtd3JhcHBlciB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuOjpuZy1kZWVwIC5kYXNoYm9hcmQtY29udGFpbmVyIC5tZGMtbm90Y2hlZC1vdXRsaW5lX19sZWFkaW5nIHtcclxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMnB4ICFpbXBvcnRhbnQ7XHJcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTJweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG46Om5nLWRlZXAgLmRhc2hib2FyZC1jb250YWluZXIgLm1kYy1ub3RjaGVkLW91dGxpbmVfX3RyYWlsaW5nIHtcclxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTJweCAhaW1wb3J0YW50O1xyXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMnB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi8vIMOiwpTCgMOiwpTCgCBBY3RpdmUgRmlsdGVyIENoaXBzIMOiwpTCgMOiwpTCgFxyXG4uYWN0aXZlLWZpbHRlci1jaGlwcyB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMS4yNXJlbTtcclxuICBhbmltYXRpb246IGZhZGVJbiAwLjJzIGVhc2U7XHJcbn1cclxuXHJcbi5jaGlwLXN0cmlwIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxuICBnYXA6IDAuNHJlbTtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uZmlsdGVyLWNoaXAge1xyXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiA0cHg7XHJcbiAgcGFkZGluZzogNHB4IDEycHg7XHJcbiAgYm9yZGVyLXJhZGl1czogOTlweDtcclxuICBmb250LXNpemU6IDAuNzhyZW07XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBjb2xvcjogIzM3MzBhMztcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZWVmMmZmLCAjZTBlN2ZmKTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjYzdkMmZlO1xyXG5cclxuICBtYXQtaWNvbiB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogMTRweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIG9wYWNpdHk6IDAuNjtcclxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXM7XHJcblxyXG4gICAgJjpob3ZlciB7XHJcbiAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4uYnRuLWNsZWFyLWFsbCB7XHJcbiAgYm9yZGVyLXJhZGl1czogOTlweCAhaW1wb3J0YW50O1xyXG4gIGZvbnQtc2l6ZTogMC43NXJlbSAhaW1wb3J0YW50O1xyXG4gIGhlaWdodDogMjhweCAhaW1wb3J0YW50O1xyXG4gIGNvbG9yOiAjNjQ3NDhiICFpbXBvcnRhbnQ7XHJcbiAgYm9yZGVyLWNvbG9yOiAjY2JkNWUxICFpbXBvcnRhbnQ7XHJcbiAgcGFkZGluZzogMCAxMHB4ICFpbXBvcnRhbnQ7XHJcbiAgbGluZS1oZWlnaHQ6IDI4cHggIWltcG9ydGFudDtcclxuXHJcbiAgbWF0LWljb24ge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgd2lkdGg6IDE0cHg7XHJcbiAgICBoZWlnaHQ6IDE0cHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDJweDtcclxuICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgZmFkZUluIHtcclxuICBmcm9tIHtcclxuICAgIG9wYWNpdHk6IDA7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTRweCk7XHJcbiAgfVxyXG5cclxuICB0byB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xyXG4gIH1cclxufVxyXG5cclxuLy8gw6LClMKAw6LClMKAIEVudGl0eSBTdGF0cyBSb3cgw6LClMKAw6LClMKAXHJcbi5zdGF0cy1yb3cge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ2FwOiAxcmVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcclxufVxyXG5cclxuLmVudGl0eS1zdGF0cyB7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcclxuXHJcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcclxuICB9XHJcbn1cclxuXHJcbi5zdGF0LWNhcmQge1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XHJcbiAgcGFkZGluZzogMS4yNXJlbSAxLjVyZW07XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMXJlbTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZTJlOGYwO1xyXG4gIGJveC1zaGFkb3c6IDAgMnB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMDMpO1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzLCBib3gtc2hhZG93IDAuMnM7XHJcblxyXG4gICY6aG92ZXIge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xyXG4gICAgYm94LXNoYWRvdzogMCA2cHggMTZweCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xyXG4gIH1cclxufVxyXG5cclxuLnN0YXQtaWNvbi13cmFwIHtcclxuICB3aWR0aDogNTJweDtcclxuICBoZWlnaHQ6IDUycHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTRweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZmxleC1zaHJpbms6IDA7XHJcblxyXG4gIG1hdC1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMjZweDtcclxuICAgIHdpZHRoOiAyNnB4O1xyXG4gICAgaGVpZ2h0OiAyNnB4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gIH1cclxufVxyXG5cclxuLm9yZ3MtZ3JhZGllbnQge1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmNTllMGIsICNkOTc3MDYpO1xyXG59XHJcblxyXG4ub3V0bGV0cy1ncmFkaWVudCB7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzYzNjZmMSwgIzRmNDZlNSk7XHJcbn1cclxuXHJcbi52ZW5kb3JzLWdyYWRpZW50IHtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMTBiOTgxLCAjMDU5NjY5KTtcclxufVxyXG5cclxuLnN0YXQtaW5mbyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cclxuICAuc3RhdC1sYWJlbCB7XHJcbiAgICBmb250LXNpemU6IDAuODJyZW07XHJcbiAgICBjb2xvcjogIzY0NzQ4YjtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xyXG4gIH1cclxuXHJcbiAgLnN0YXQtdmFsdWUge1xyXG4gICAgZm9udC1zaXplOiAxLjc1cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgIGNvbG9yOiAjMWUyOTNiO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IC0wLjVweDtcclxuICB9XHJcbn1cclxuXHJcbi8vIMOiwpTCgMOiwpTCgCBMb2FkaW5nIFN0cmlwIMOiwpTCgMOiwpTCgFxyXG4ubG9hZGluZy1zdHJpcCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGdhcDogOHB4O1xyXG4gIHBhZGRpbmc6IDFyZW07XHJcbiAgYmFja2dyb3VuZDogI2YxZjVmOTtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIGNvbG9yOiAjNjQ3NDhiO1xyXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcclxuXHJcbiAgLnNwaW4ge1xyXG4gICAgYW5pbWF0aW9uOiBzcGluIDFzIGxpbmVhciBpbmZpbml0ZTtcclxuICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgc3BpbiB7XHJcbiAgZnJvbSB7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcclxuICB9XHJcblxyXG4gIHRvIHtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDDosKUwoDDosKUwoAgRmluYW5jaWFsIFN0YXRzIFJvdyDDosKUwoDDosKUwoBcclxuLmZpbmFuY2lhbC1zdGF0cyB7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgxNzBweCwgMWZyKSk7XHJcbn1cclxuXHJcbi5maW4tY2FyZCB7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogMTRweDtcclxuICBwYWRkaW5nOiAxcmVtIDEuMjVyZW07XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMC44cmVtO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7XHJcbiAgYm94LXNoYWRvdzogMCAxcHggNHB4IHJnYmEoMCwgMCwgMCwgMC4wMyk7XHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMsIGJveC1zaGFkb3cgMC4ycztcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XHJcbiAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4wNik7XHJcbiAgfVxyXG59XHJcblxyXG4uZmluLWljb24ge1xyXG4gIHdpZHRoOiA0MHB4O1xyXG4gIGhlaWdodDogNDBweDtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBmbGV4LXNocmluazogMDtcclxuXHJcbiAgbWF0LWljb24ge1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgd2lkdGg6IDIwcHg7XHJcbiAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgfVxyXG59XHJcblxyXG4ub3JkZXJzLWljb24ge1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMzYjgyZjYsICMyNTYzZWIpO1xyXG59XHJcblxyXG4uYW1vdW50LWljb24ge1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM4YjVjZjYsICM3YzNhZWQpO1xyXG59XHJcblxyXG4ucGFpZC1pY29uIHtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMDZiNmQ0LCAjMDg5MWIyKTtcclxufVxyXG5cclxuLndhbGxldC1pY29uIHtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZjU5ZTBiLCAjZDk3NzA2KTtcclxufVxyXG5cclxuLmNvbXBhbnktaWNvbiB7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzYzNjZmMSwgIzRmNDZlNSk7XHJcbn1cclxuXHJcbi5zdWJzaWR5LWljb24ge1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNlYzQ4OTksICNkYjI3NzcpO1xyXG59XHJcblxyXG4ucGFja2FnaW5nLWljb24ge1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMxNGI4YTYsICMwZDk0ODgpO1xyXG59XHJcblxyXG4uZmluLWluZm8ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHJcbiAgLmZpbi1sYWJlbCB7XHJcbiAgICBmb250LXNpemU6IDAuNzJyZW07XHJcbiAgICBjb2xvcjogIzk0YTNiODtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuM3B4O1xyXG4gIH1cclxuXHJcbiAgLmZpbi12YWx1ZSB7XHJcbiAgICBmb250LXNpemU6IDEuMTVyZW07XHJcbiAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgY29sb3I6ICMxZTI5M2I7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogLTAuM3B4O1xyXG4gIH1cclxufVxyXG5cclxuLy8gw6LClMKAw6LClMKAIENoYXJ0IFNlY3Rpb24gw6LClMKAw6LClMKAXHJcbi5jaGFydC1zZWN0aW9uIHtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG59XHJcblxyXG4uY2hhcnQtY2FyZCB7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcclxuICBwYWRkaW5nOiAxcmVtO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7XHJcbiAgYm94LXNoYWRvdzogMCAycHggNnB4IHJnYmEoMCwgMCwgMCwgMC4wMyk7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBtYXgtd2lkdGg6IDcwMHB4O1xyXG59XHJcblxyXG4uY2hhcnQtZW1wdHkge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDNyZW07XHJcbiAgY29sb3I6ICM5NGEzYjg7XHJcblxyXG4gIG1hdC1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogNDhweDtcclxuICAgIHdpZHRoOiA0OHB4O1xyXG4gICAgaGVpZ2h0OiA0OHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xyXG4gICAgb3BhY2l0eTogMC40O1xyXG4gIH1cclxuXHJcbiAgcCB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 63617:
/*!*****************************************************************************!*\
  !*** ./src/app/deskdyne-components/main-dashboard/main-dashboard.module.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MainDashboardModule: () => (/* binding */ MainDashboardModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _main_dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-dashboard-routing.module */ 99611);
/* harmony import */ var _main_dashboard_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main-dashboard.component */ 21801);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/datepicker */ 82226);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! highcharts-angular */ 88578);
/* harmony import */ var src_app_material_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/material.module */ 29099);
/* harmony import */ var _main_dashboard_filter_dialog_main_dashboard_filter_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main-dashboard-filter-dialog/main-dashboard-filter-dialog.component */ 78455);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);











class MainDashboardModule {
  static #_ = this.ɵfac = function MainDashboardModule_Factory(t) {
    return new (t || MainDashboardModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: MainDashboardModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    providers: [{
      provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_5__.MAT_DATE_LOCALE,
      useValue: 'en-GB'
    }],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _main_dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__.MainDashboardRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_8__.HighchartsChartModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__.MatDatepickerModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__.MatNativeDateModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_2__.MaterialModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](MainDashboardModule, {
    declarations: [_main_dashboard_component__WEBPACK_IMPORTED_MODULE_1__.MainDashboardComponent, _main_dashboard_filter_dialog_main_dashboard_filter_dialog_component__WEBPACK_IMPORTED_MODULE_3__.MainDashboardFilterDialogComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _main_dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__.MainDashboardRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_8__.HighchartsChartModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__.MatDatepickerModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__.MatNativeDateModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_2__.MaterialModule]
  });
})();

/***/ }),

/***/ 47816:
/*!*******************************************!*\
  !*** ./src/config/order-status.config.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   orderStatusMapper: () => (/* binding */ orderStatusMapper)
/* harmony export */ });
const orderStatusMapper = {
  'waitingForApproval': 'Waiting For Approval',
  'placed': 'Placed',
  'accepted': 'Accepted',
  'declined': 'Declined',
  'inprogress': 'In-Progress',
  'cancelled': 'Cancelled',
  'completed': 'Completed',
  'preparing': 'Preparing',
  'delivered': 'Delivered',
  'deliveryBoyAssigned': 'Delivery Boy Assigned',
  'handedOverToDeliveryBoy': 'Handed Over To Delivery Boy',
  'onTheWay': 'On The Way',
  'readyForDelivery': 'Ready For Delivery',
  'readyToDelivery': 'Ready For Delivery',
  'dailyBulk': 'Admin Daily Bulk',
  'paymentInprogress': 'Payment Transaction In-Progress',
  'paymentFailed': 'Payment Transaction Failed',
  'cancelledByKitchen': 'Cancelled By Kitchen',
  'rejectedByKitchen': 'Not Accepted',
  'cancelledByUser': 'Cancelled',
  'autoCancelled': 'Auto Cancelled',
  'advance': 'Advance',
  'daily': 'Daily',
  'allDay': 'All Day',
  'subscription': 'Subscription',
  'rescheduled': 'Rescheduled',
  'subscriptionPackage': 'Subscription'
};

/***/ }),

/***/ 88578:
/*!*************************************************************************!*\
  !*** ./node_modules/highcharts-angular/fesm2022/highcharts-angular.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HighchartsChartComponent: () => (/* binding */ HighchartsChartComponent),
/* harmony export */   HighchartsChartModule: () => (/* binding */ HighchartsChartModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);


class HighchartsChartComponent {
  constructor(el, _zone // #75
  ) {
    this.el = el;
    this._zone = _zone;
    this.updateChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter(true);
    this.chartInstance = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter(); // #26
  }

  ngOnChanges(changes) {
    const update = changes.update?.currentValue;
    if (changes.options || update) {
      this.wrappedUpdateOrCreateChart();
      if (update) {
        this.updateChange.emit(false); // clear the flag after update
      }
    }
  }

  wrappedUpdateOrCreateChart() {
    if (this.runOutsideAngular) {
      this._zone.runOutsideAngular(() => {
        this.updateOrCreateChart();
      });
    } else {
      this.updateOrCreateChart();
    }
  }
  updateOrCreateChart() {
    if (this.chart?.update) {
      this.chart.update(this.options, true, this.oneToOne || false);
    } else {
      this.chart = this.Highcharts[this.constructorType || 'chart'](this.el.nativeElement, this.options, this.callbackFunction || null);
      // emit chart instance on init
      this.chartInstance.emit(this.chart);
    }
  }
  ngOnDestroy() {
    if (this.chart) {
      // #56
      this.chart.destroy();
      this.chart = null;
      // emit chart instance on destroy
      this.chartInstance.emit(this.chart);
    }
  }
  static #_ = this.ɵfac = function HighchartsChartComponent_Factory(t) {
    return new (t || HighchartsChartComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone));
  };
  static #_2 = this.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: HighchartsChartComponent,
    selectors: [["highcharts-chart"]],
    inputs: {
      Highcharts: "Highcharts",
      constructorType: "constructorType",
      callbackFunction: "callbackFunction",
      oneToOne: "oneToOne",
      runOutsideAngular: "runOutsideAngular",
      options: "options",
      update: "update"
    },
    outputs: {
      updateChange: "updateChange",
      chartInstance: "chartInstance"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
    decls: 0,
    vars: 0,
    template: function HighchartsChartComponent_Template(rf, ctx) {},
    encapsulation: 2
  });
}
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HighchartsChartComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'highcharts-chart',
      template: ''
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }];
  }, {
    Highcharts: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    constructorType: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    callbackFunction: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    oneToOne: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    runOutsideAngular: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    options: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    update: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    updateChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    chartInstance: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }]
  });
})();
class HighchartsChartModule {
  static #_ = this.ɵfac = function HighchartsChartModule_Factory(t) {
    return new (t || HighchartsChartModule)();
  };
  static #_2 = this.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: HighchartsChartModule
  });
  static #_3 = this.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({});
}
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HighchartsChartModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      declarations: [HighchartsChartComponent],
      exports: [HighchartsChartComponent]
    }]
  }], null, null);
})();

/*
 * Public API Surface of highcharts-angular
 */

/**
 * Generated bundle index. Do not edit.
 */



/***/ })

}]);
//# sourceMappingURL=src_app_deskdyne-components_main-dashboard_main-dashboard_module_ts.js.map