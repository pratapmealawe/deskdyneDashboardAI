"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_deskdyne-components_search-organization_search-organization_module_ts-src_config_orde-e91613"],{

/***/ 67074:
/*!**************************************************************************************************************!*\
  !*** ./src/app/deskdyne-components/search-organization/deleted-orgs-dialog/deleted-orgs-dialog.component.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeletedOrgsDialogComponent: () => (/* binding */ DeletedOrgsDialogComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ 17401);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/progress-spinner */ 33910);








function DeletedOrgsDialogComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "mat-spinner", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Loading deleted organizations...");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function DeletedOrgsDialogComponent_ng_container_11_div_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 12)(1, "div", 13)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 14)(5, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "p")(8, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "place");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DeletedOrgsDialogComponent_ng_container_11_div_1_div_1_Template_button_click_11_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r8);
      const org_r6 = restoredCtx.$implicit;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r7.restoreOrg(org_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "restore");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, " Restore ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const org_r6 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r5.getInitials(org_r6 == null ? null : org_r6.organization_name));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](org_r6 == null ? null : org_r6.organization_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", (org_r6 == null ? null : org_r6.location) || "No location", " ");
  }
}
function DeletedOrgsDialogComponent_ng_container_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, DeletedOrgsDialogComponent_ng_container_11_div_1_div_1_Template, 15, 3, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.deletedOrgList);
  }
}
function DeletedOrgsDialogComponent_ng_container_11_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 16)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "restore_from_trash");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "No Deleted Organizations");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "There are no soft-deleted organizations to restore.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function DeletedOrgsDialogComponent_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, DeletedOrgsDialogComponent_ng_container_11_div_1_Template, 2, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, DeletedOrgsDialogComponent_ng_container_11_ng_template_2_Template, 7, 0, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](3);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.deletedOrgList.length > 0)("ngIfElse", _r3);
  }
}
class DeletedOrgsDialogComponent {
  constructor(dialogRef, apiMainService) {
    this.dialogRef = dialogRef;
    this.apiMainService = apiMainService;
    this.deletedOrgList = [];
    this.isLoading = true;
  }
  ngOnInit() {
    this.fetchDeletedOrgs();
  }
  fetchDeletedOrgs() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.isLoading = true;
      try {
        const deletedList = yield _this.apiMainService.B2B_getDeletedOrganizations();
        _this.deletedOrgList = deletedList || [];
      } catch (error) {
        console.error('Error fetching deleted organizations:', error);
        _this.deletedOrgList = [];
      } finally {
        _this.isLoading = false;
      }
    })();
  }
  restoreOrg(org) {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this2.apiMainService.B2B_restoreOrganization(org._id);
        _this2.fetchDeletedOrgs();
      } catch (error) {
        console.error('Error restoring organization:', error);
      }
    })();
  }
  getInitials(name) {
    if (!name) return 'O';
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }
  close() {
    this.dialogRef.close();
  }
  static #_ = this.ɵfac = function DeletedOrgsDialogComponent_Factory(t) {
    return new (t || DeletedOrgsDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__.ApiMainService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: DeletedOrgsDialogComponent,
    selectors: [["app-deleted-orgs-dialog"]],
    decls: 12,
    vars: 2,
    consts: [["mat-dialog-title", "", 1, "dialog-header"], [1, "header-content"], ["mat-icon-button", "", 3, "click"], [1, "dialog-body"], ["class", "loading-state", 4, "ngIf"], [4, "ngIf"], [1, "loading-state"], ["diameter", "40"], ["class", "deleted-list", 4, "ngIf", "ngIfElse"], ["emptyState", ""], [1, "deleted-list"], ["class", "deleted-item", 4, "ngFor", "ngForOf"], [1, "deleted-item"], [1, "org-avatar"], [1, "org-info"], ["mat-flat-button", "", "color", "primary", 1, "restore-btn", 3, "click"], [1, "empty-state"]],
    template: function DeletedOrgsDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h2", 0)(1, "div", 1)(2, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "delete_sweep");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Deleted Organizations");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DeletedOrgsDialogComponent_Template_button_click_6_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "close");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "mat-dialog-content", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, DeletedOrgsDialogComponent_div_10_Template, 4, 0, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, DeletedOrgsDialogComponent_ng_container_11_Template, 4, 2, "ng-container", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isLoading);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__.MatProgressSpinner, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogContent],
    styles: ["\n\n\n\n[_ngcontent-%COMP%]:root {\n  --color-primary: #0E49B5;\n  --color-secondary: #FF3333;\n  --color-backgroundGrey: #f3f3f3;\n  --color-text: #1a1a1a;\n}\n\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin: 0 !important;\n  padding: 10px 24px !important;\n}\n.dialog-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.dialog-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.dialog-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n\n.dialog-body[_ngcontent-%COMP%] {\n  padding: 24px !important;\n  max-height: 450px;\n  background: #f9fafb;\n}\n\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem;\n  gap: 1rem;\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6c757d;\n  margin: 0;\n}\n\n.deleted-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.deleted-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1.25rem;\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  transition: all 0.2s ease;\n}\n.deleted-item[_ngcontent-%COMP%]:hover {\n  border-color: #4b82e2;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n}\n.deleted-item[_ngcontent-%COMP%]   .org-avatar[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 10px;\n  background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);\n  color: white;\n  font-weight: 700;\n  font-size: 0.9rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.deleted-item[_ngcontent-%COMP%]   .org-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n}\n.deleted-item[_ngcontent-%COMP%]   .org-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem 0;\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #1a202c;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.deleted-item[_ngcontent-%COMP%]   .org-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8rem;\n  color: #6c757d;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.deleted-item[_ngcontent-%COMP%]   .org-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n  flex-shrink: 0;\n}\n.deleted-item[_ngcontent-%COMP%]   .restore-btn[_ngcontent-%COMP%] {\n  border-radius: 20px !important;\n  padding: 0 16px !important;\n  height: 34px !important;\n  font-weight: 600;\n  font-size: 0.85rem;\n  flex-shrink: 0;\n}\n.deleted-item[_ngcontent-%COMP%]   .restore-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 4px;\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 2rem;\n  text-align: center;\n  background: white;\n  border-radius: 12px;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 56px;\n  width: 56px;\n  height: 56px;\n  color: #cbd5e0;\n  margin-bottom: 1rem;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #2d3748;\n  margin: 0 0 0.5rem 0;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #718096;\n  margin: 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGhlbWUvX3ZhcmlhYmxlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2Rlc2tkeW5lLWNvbXBvbmVudHMvc2VhcmNoLW9yZ2FuaXphdGlvbi9kZWxldGVkLW9yZ3MtZGlhbG9nL2RlbGV0ZWQtb3Jncy1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OytDQUFBO0FBMEVBO0VBQ0Usd0JBQUE7RUFDQSwwQkFBQTtFQUNBLCtCQUFBO0VBQ0EscUJBQUE7QUN0RUY7O0FBTkE7RUFDSSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsNkJBQUE7QUFTSjtBQUxJO0VBQ0ksYUFBQTtFQUVBLFdBQUE7RUFFQSxrQkFBQTtFQUNBLGdCQUFBO0FBS1I7QUFIUTtFQUNJLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUtaO0FBREk7RUFDSSxjQUFBO0FBR1I7O0FBQ0E7RUFDSSx3QkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUFFSjs7QUFDQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0VBQ0EsU0FBQTtBQUVKO0FBQUk7RUFDSSxjQUFBO0VBQ0EsU0FBQTtBQUVSOztBQUVBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtBQUNKOztBQUVBO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLHFCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7QUFDSjtBQUNJO0VBQ0kscUJEeERTO0VDeURULDBDQUFBO0FBQ1I7QUFFSTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSw2REFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0FBQVI7QUFHSTtFQUNJLE9BQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUFEUjtBQUdRO0VBQ0kscUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtBQURaO0FBSVE7RUFDSSxTQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtBQUZaO0FBSVk7RUFDSSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0FBRmhCO0FBT0k7RUFDSSw4QkFBQTtFQUNBLDBCQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBQUxSO0FBT1E7RUFDSSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUxaOztBQVVBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0FBUEo7QUFTSTtFQUNJLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtBQVBSO0FBVUk7RUFDSSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLG9CQUFBO0FBUlI7QUFXSTtFQUNJLGNBQUE7RUFDQSxTQUFBO0FBVFIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgR2xvYmFsIFNDU1MgVmFyaWFibGVzIC0gQnJhbmQgQ29sb3JzXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuJHdoaXRlOiAjZmZmZmZmO1xyXG4kYmxhY2s6ICMwMDAwMDA7XHJcbiR0ZXh0UHJpbWFyeTogIzFhMWExYTtcclxuXHJcbi8vIEJyYW5kIENvbG9ycyAoUm95YWwgQmx1ZSAmIE5hdnkpXHJcbiRwcmltYXJ5LWNvbG9yMTogIzBFNDlCNTsgLy8gUm95YWwgQmx1ZSAoTWFpbiBQcmltYXJ5KVxyXG4kcHJpbWFyeS1jb2xvcjogJHByaW1hcnktY29sb3IxOyAvLyBBbGlhcyBmb3IgY29uc2lzdGVuY3lcclxuJHByaW1hcnktY29sb3IyOiAjMTkyNzU0OyAvLyBOYXZ5IEJsdWUgKFNlY29uZGFyeSAvIERhcmsgUHJpbWFyeSlcclxuJHByaW1hcnktY29sb3IzOiAjNGI4MmUyOyAvLyBMaWdodGVyIEJsdWUgZGVyaXZhdGl2ZVxyXG5cclxuLy8gQnJhbmQgQ29sb3JzIChDcmVhbSAmIFJlZClcclxuJHNlY29uZGFyeS1jb2xvcjE6ICNGNEVDQzU7IC8vIFNvZnQgQ3JlYW1cclxuJHNlY29uZGFyeS1jb2xvcjI6ICNmZmUwYjI7IC8vIERlcml2YXRpdmVcclxuJHNlY29uZGFyeS1jb2xvcjM6ICNGRjMzMzM7IC8vIEJyaWdodCBSZWQgKEFjY2VudClcclxuXHJcbi8vIERlc2lnbiBUb2tlbnMgLSBCb3JkZXIgUmFkaXVzXHJcbiRib3JkZXItcmFkaXVzLXNtOiA0cHg7XHJcbiRib3JkZXItcmFkaXVzLW1kOiA4cHg7XHJcbiRib3JkZXItcmFkaXVzLWxnOiAxMnB4O1xyXG4kYm9yZGVyLXJhZGl1cy14bDogMjBweDtcclxuJGJvcmRlci1yYWRpdXMtcGlsbDogOTk5OXB4O1xyXG4kYm9yZGVyLXJhZGl1cy1jaXJjbGU6IDUwJTtcclxuXHJcbi8vIERlc2lnbiBUb2tlbnMgLSBCb3ggU2hhZG93XHJcbiRib3gtc2hhZG93LXNtOiAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcclxuJGJveC1zaGFkb3ctbWQ6IDAgNHB4IDZweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMCAycHggNHB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjA2KTtcclxuJGJveC1zaGFkb3ctbGc6IDAgMTBweCAxNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDRweCA2cHggLTJweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xyXG4kYm94LXNoYWRvdy1jYXJkOiAwIDJweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4wNCk7XHJcbiRib3gtc2hhZG93LWNhcmQtaG92ZXI6IDAgOHB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjA4KTtcclxuXHJcbi8vIEFjY2VudCBDb2xvcnNcclxuJHNlY29uZGFyeS1vZmZzZXQtY29sb3IxOiAjZmZkNjc0O1xyXG4kc2Vjb25kYXJ5LW9mZnNldC1jb2xvcjI6ICNmZmM5NDc7XHJcbiRzZWNvbmRhcnktb2Zmc2V0LWNvbG9yMzogI2ZmYjMwMDtcclxuXHJcblxyXG4vLyBHcmF5cyAmIEJhY2tncm91bmRzXHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjE6ICNmZmZmZmY7XHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjI6ICNhNGE0YTQ7IC8vIEdyYXkgdGV4dFxyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3IzOiAjZjNmM2YzOyAvLyBMaWdodCBiYWNrZ3JvdW5kXHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjQ6ICNlZmVmZWY7IC8vIENhcmQgYmFja2dyb3VuZFxyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3I1OiB3aGl0ZTtcclxuJGJvcmRlci1jb2xvcjogI2U1ZTdlYjtcclxuJGNhcmQtb2RkOiAjZGVlMmU2O1xyXG4kYmFja2dyb3VuZC1jb2xvcjogI2YzZjNmMztcclxuLy8gVGhlbWUgQ29sb3JzIChNYXRjaGVzIHN0eWxlcy5zY3NzKVxyXG4kaW5mby1jb2xvcjogI2E0YTRhNDtcclxuJHRleHQtZGFyazogIzFhMWExYTtcclxuLy8gVGhlbWUgQ29sb3JzXHJcbiRwcmltYXJ5LWNvbG9yOiAjZTYyODQxO1xyXG4kc2Vjb25kYXJ5LWNvbG9yOiAjMTVhMjkyO1xyXG4kYmFja2Ryb3AtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcclxuLy8gU2VtYW50aWMgQ29sb3JzIChTdGFuZGFyZGl6ZWQpXHJcbiRjb2xvci1zdWNjZXNzOiAjNTJjNDFhO1xyXG4kY29sb3Itc3VjY2Vzcy1iZzogI2Y2ZmZlZDtcclxuJGNvbG9yLXN1Y2Nlc3MtYm9yZGVyOiAjYjdlYjhmO1xyXG5cclxuJGNvbG9yLXdhcm5pbmc6ICNmYWFkMTQ7XHJcbiRjb2xvci13YXJuaW5nLWJnOiAjZmZmN2U2O1xyXG4kY29sb3Itd2FybmluZy1ib3JkZXI6ICNmZmU1OGY7XHJcblxyXG4kY29sb3ItZXJyb3I6ICNmZjRkNGY7XHJcbiRjb2xvci1lcnJvci1iZzogI2ZmZjFmMDtcclxuJGNvbG9yLWVycm9yLWJvcmRlcjogI2ZmY2NjNztcclxuXHJcbiRjb2xvci1pbmZvOiAjMTg5MGZmO1xyXG4kY29sb3ItaW5mby1iZzogI2U2ZjdmZjtcclxuJGNvbG9yLWluZm8tYm9yZGVyOiAjOTFkNWZmO1xyXG5cclxuLy8gQ1NTIFZhcmlhYmxlcyBmb3IgUnVudGltZSBUaGVtaW5nXHJcbjpyb290IHtcclxuICAtLWNvbG9yLXByaW1hcnk6ICN7JHByaW1hcnktY29sb3IxfTtcclxuICAtLWNvbG9yLXNlY29uZGFyeTogI3skc2Vjb25kYXJ5LWNvbG9yM307XHJcbiAgLS1jb2xvci1iYWNrZ3JvdW5kR3JleTogI3skYmFja2dyb3VuZC1jb2xvcn07XHJcbiAgLS1jb2xvci10ZXh0OiAjeyR0ZXh0UHJpbWFyeX07XHJcbn0iLCJAdXNlICcvc3JjL3N0eWxlcy90aGVtZS92YXJpYWJsZScgYXMgdmFyO1xyXG5cclxuLmRpYWxvZy1oZWFkZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtYXJnaW46IDAgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6IDEwcHggMjRweCAhaW1wb3J0YW50O1xyXG4gICAgLy8gYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZlZjJmMiAwJSwgI2ZlZTJlMiAxMDAlKTtcclxuICAgIC8vIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmVjYWNhO1xyXG5cclxuICAgIC5oZWFkZXItY29udGVudCB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAvLyBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIGdhcDogMC41cmVtO1xyXG4gICAgICAgIC8vIGNvbG9yOiAjZGMyNjI2O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcclxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG5cclxuICAgICAgICBtYXQtaWNvbiB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjRweDtcclxuICAgICAgICAgICAgd2lkdGg6IDI0cHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogMjRweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYnV0dG9uIHtcclxuICAgICAgICBjb2xvcjogIzZiNzI4MDtcclxuICAgIH1cclxufVxyXG5cclxuLmRpYWxvZy1ib2R5IHtcclxuICAgIHBhZGRpbmc6IDI0cHggIWltcG9ydGFudDtcclxuICAgIG1heC1oZWlnaHQ6IDQ1MHB4O1xyXG4gICAgYmFja2dyb3VuZDogI2Y5ZmFmYjtcclxufVxyXG5cclxuLmxvYWRpbmctc3RhdGUge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiAzcmVtO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG5cclxuICAgIHAge1xyXG4gICAgICAgIGNvbG9yOiAjNmM3NTdkO1xyXG4gICAgICAgIG1hcmdpbjogMDtcclxuICAgIH1cclxufVxyXG5cclxuLmRlbGV0ZWQtbGlzdCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGdhcDogMC43NXJlbTtcclxufVxyXG5cclxuLmRlbGV0ZWQtaXRlbSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogMXJlbTtcclxuICAgIHBhZGRpbmc6IDFyZW0gMS4yNXJlbTtcclxuICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZTJlOGYwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XHJcblxyXG4gICAgJjpob3ZlciB7XHJcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIuJHByaW1hcnktY29sb3IzO1xyXG4gICAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjA4KTtcclxuICAgIH1cclxuXHJcbiAgICAub3JnLWF2YXRhciB7XHJcbiAgICAgICAgd2lkdGg6IDQ0cHg7XHJcbiAgICAgICAgaGVpZ2h0OiA0NHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzk0YTNiOCAwJSwgIzY0NzQ4YiAxMDAlKTtcclxuICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgZmxleC1zaHJpbms6IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLm9yZy1pbmZvIHtcclxuICAgICAgICBmbGV4OiAxO1xyXG4gICAgICAgIG1pbi13aWR0aDogMDtcclxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG5cclxuICAgICAgICBoNCB7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCAwIDAuMjVyZW0gMDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAwLjk1cmVtO1xyXG4gICAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgICAgICBjb2xvcjogIzFhMjAyYztcclxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwIHtcclxuICAgICAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcclxuICAgICAgICAgICAgY29sb3I6ICM2Yzc1N2Q7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGdhcDogNHB4O1xyXG5cclxuICAgICAgICAgICAgbWF0LWljb24ge1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE0cHg7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE0cHg7XHJcbiAgICAgICAgICAgICAgICBmbGV4LXNocmluazogMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAucmVzdG9yZS1idG4ge1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHggIWltcG9ydGFudDtcclxuICAgICAgICBwYWRkaW5nOiAwIDE2cHggIWltcG9ydGFudDtcclxuICAgICAgICBoZWlnaHQ6IDM0cHggIWltcG9ydGFudDtcclxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgICAgICBmbGV4LXNocmluazogMDtcclxuXHJcbiAgICAgICAgbWF0LWljb24ge1xyXG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDRweDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICAgICAgICB3aWR0aDogMTZweDtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxNnB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLmVtcHR5LXN0YXRlIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgcGFkZGluZzogM3JlbSAycmVtO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG5cclxuICAgIG1hdC1pY29uIHtcclxuICAgICAgICBmb250LXNpemU6IDU2cHg7XHJcbiAgICAgICAgd2lkdGg6IDU2cHg7XHJcbiAgICAgICAgaGVpZ2h0OiA1NnB4O1xyXG4gICAgICAgIGNvbG9yOiAjY2JkNWUwO1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICB9XHJcblxyXG4gICAgaDMge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgY29sb3I6ICMyZDM3NDg7XHJcbiAgICAgICAgbWFyZ2luOiAwIDAgMC41cmVtIDA7XHJcbiAgICB9XHJcblxyXG4gICAgcCB7XHJcbiAgICAgICAgY29sb3I6ICM3MTgwOTY7XHJcbiAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 3673:
/*!***********************************************************************************************!*\
  !*** ./src/app/deskdyne-components/search-organization/search-organization-routing.module.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchOrganizationRoutingModule: () => (/* binding */ SearchOrganizationRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _search_organization_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search-organization.component */ 43429);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _search_organization_component__WEBPACK_IMPORTED_MODULE_0__.SearchOrganizationComponent
}];
class SearchOrganizationRoutingModule {
  static #_ = this.ɵfac = function SearchOrganizationRoutingModule_Factory(t) {
    return new (t || SearchOrganizationRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: SearchOrganizationRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](SearchOrganizationRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 43429:
/*!******************************************************************************************!*\
  !*** ./src/app/deskdyne-components/search-organization/search-organization.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchOrganizationComponent: () => (/* binding */ SearchOrganizationComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 50655);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 53317);
/* harmony import */ var _deleted_orgs_dialog_deleted_orgs_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deleted-orgs-dialog/deleted-orgs-dialog.component */ 67074);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var src_service_policy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/service/policy.service */ 64294);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var src_service_confirmation_modal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/service/confirmation-modal.service */ 61885);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/dialog */ 17401);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _organization_card_organization_card_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../organization-card/organization-card.component */ 65177);
/* harmony import */ var _organization_view_organization_view_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../organization-view/organization-view.component */ 71671);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);

















function SearchOrganizationComponent_ng_container_2_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 10)(1, "div", 11)(2, "mat-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "search");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function SearchOrganizationComponent_ng_container_2_div_6_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r7.addOrg());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7, "add_business");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9, "Add Organization");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function SearchOrganizationComponent_ng_container_2_div_6_Template_button_click_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r8);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r9.openDeletedOrgsDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](12, "delete_sweep");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("formControl", ctx_r5.searchControl);
  }
}
function SearchOrganizationComponent_ng_container_2_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div")(1, "app-organization-card", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("view", function SearchOrganizationComponent_ng_container_2_div_7_Template_app_organization_card_view_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r10.viewOrg($event));
    })("paginationConfig", function SearchOrganizationComponent_ng_container_2_div_7_Template_app_organization_card_paginationConfig_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r11);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r12.paginationConfig($event));
    })("softDelete", function SearchOrganizationComponent_ng_container_2_div_7_Template_app_organization_card_softDelete_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r11);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r13.onSoftDelete($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("organization", ctx_r6.orgList)("showDeletedMode", false);
  }
}
function SearchOrganizationComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 5)(2, "div", 6)(3, "div", 7)(4, "h1", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5, "Organization Management");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](6, SearchOrganizationComponent_ng_container_2_div_6_Template, 13, 1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](7, SearchOrganizationComponent_ng_container_2_div_7_Template, 2, 2, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r0.showSearchSection);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", (ctx_r0.orgList == null ? null : ctx_r0.orgList.length) > 0)("ngIfElse", _r3);
  }
}
function SearchOrganizationComponent_ng_template_3_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div")(1, "app-organization-view", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("back", function SearchOrganizationComponent_ng_template_3_div_0_Template_app_organization_view_back_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r15.toggleShowOrder($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("organization", ctx_r14.selectedOrg);
  }
}
function SearchOrganizationComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](0, SearchOrganizationComponent_ng_template_3_div_0_Template, 2, 1, "div", 2);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r2.selectedOrg)("ngIfElse", _r3);
  }
}
function SearchOrganizationComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 18)(1, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "business");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4, "No Organizations Found");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6, "Get started by adding your first organization.");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function SearchOrganizationComponent_ng_template_5_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r17.addOrg());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](8, "Add Organization");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
}
class SearchOrganizationComponent {
  constructor(apiMainService, policyService, router, confirmationModalService, dialog) {
    this.apiMainService = apiMainService;
    this.policyService = policyService;
    this.router = router;
    this.confirmationModalService = confirmationModalService;
    this.dialog = dialog;
    this.pageIndex = 0;
    this.pageSize = 5;
    this.orgList = [];
    this.showSearchSection = true;
    this.showSearchFilter = true;
    this.selectedOrg = {};
    this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('');
    this.originalOrgList = [];
  }
  ngOnInit() {
    this.searchOrg();
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.searchControl.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.debounceTime)(400), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.distinctUntilChanged)()).subscribe(value => {
      this.applyLocalFilter(value);
    });
  }
  applyLocalFilter(value) {
    if (!value) {
      this.orgList = [...this.originalOrgList];
      return;
    }
    const lower = value.toLowerCase();
    this.orgList = this.originalOrgList.filter(d => d.organization_name?.toLowerCase().includes(lower));
  }
  searchOrg(searchValue) {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const safeSearchValue = searchValue || {};
        const safePoc = safeSearchValue.poc_details || {};
        const searchObj = {
          organization_name: searchValue || '',
          location: safeSearchValue.location || '',
          poc_details: {
            poc_name: safePoc.poc_name || '',
            poc_phoneNo: safePoc.poc_phoneNo || '',
            poc_email: safePoc.poc_email || '',
            poc_location: safePoc.poc_location || ''
          }
        };
        const orgList = yield _this.apiMainService.B2B_fetchFilteredAllOrgs(searchObj);
        if (orgList && orgList.length > 0) {
          _this.orgList = orgList;
          _this.originalOrgList = orgList;
        } else {
          _this.orgList = [];
          _this.originalOrgList = [];
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }
  viewOrg(org) {
    this.selectedOrg = org;
    this.showSearchSection = false;
  }
  toggleShowOrder(val) {
    this.showSearchSection = true;
    this.selectedOrg = {};
  }
  paginationConfig(config) {
    this.pageIndex = config.pageIndex;
    this.pageSize = config.pageSize;
  }
  addOrg() {
    this.router.navigate(['/b2bAddorg']);
  }
  openDeletedOrgsDialog() {
    this.dialog.open(_deleted_orgs_dialog_deleted_orgs_dialog_component__WEBPACK_IMPORTED_MODULE_1__.DeletedOrgsDialogComponent, {
      width: '850px',
      maxHeight: '85vh',
      panelClass: 'deleted-orgs-dialog-container'
    });
  }
  onSoftDelete(org) {
    var _this2 = this;
    this.confirmationModalService.modal({
      msg: `Are you sure you want to delete "${org.organization_name}"? This can be restored later from the Deleted list.`,
      callback: function () {
        var _ref = (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          try {
            yield _this2.apiMainService.B2B_deleteOrganization(org._id, 'soft');
            _this2.searchOrg();
          } catch (error) {
            console.error('Error deleting organization:', error);
          }
        });
        return function callback() {
          return _ref.apply(this, arguments);
        };
      }(),
      context: this
    });
  }
  static #_ = this.ɵfac = function SearchOrganizationComponent_Factory(t) {
    return new (t || SearchOrganizationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_2__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_service_policy_service__WEBPACK_IMPORTED_MODULE_3__.PolicyService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_service_confirmation_modal_service__WEBPACK_IMPORTED_MODULE_4__.ConfirmationModalService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__.MatDialog));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
    type: SearchOrganizationComponent,
    selectors: [["app-search-organization"]],
    decls: 7,
    vars: 2,
    consts: [[1, "org-page-container"], [1, "content-body"], [4, "ngIf", "ngIfElse"], ["viewSection", ""], ["noRecords", ""], [1, "org-header-card"], [1, "header-content"], [1, "title-section"], [1, "page-title"], ["class", "actions-section", 4, "ngIf"], [1, "actions-section"], [1, "search-wrapper"], [1, "search-icon"], ["type", "text", "placeholder", "Search organization...", 3, "formControl"], ["mat-flat-button", "", "color", "primary", 1, "btn-add-org", 3, "click"], ["mat-icon-button", "", "matTooltip", "View Deleted Organizations", 1, "btn-deleted", 3, "click"], [3, "organization", "showDeletedMode", "view", "paginationConfig", "softDelete"], [3, "organization", "back"], [1, "empty-state"], [1, "empty-icon"], ["mat-stroked-button", "", "color", "primary", 3, "click"]],
    template: function SearchOrganizationComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, SearchOrganizationComponent_ng_container_2_Template, 8, 3, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, SearchOrganizationComponent_ng_template_3_Template, 1, 2, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, SearchOrganizationComponent_ng_template_5_Template, 9, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.showSearchSection)("ngIfElse", _r1);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _organization_card_organization_card_component__WEBPACK_IMPORTED_MODULE_5__.OrganizationCardComponent, _organization_view_organization_view_component__WEBPACK_IMPORTED_MODULE_6__.OrganizationViewComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_16__.MatTooltip, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControlDirective],
    styles: ["\n\n\n\n[_ngcontent-%COMP%]:root {\n  --color-primary: #0E49B5;\n  --color-secondary: #FF3333;\n  --color-backgroundGrey: #f3f3f3;\n  --color-text: #1a1a1a;\n}\n\n.org-page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  min-height: 100vh;\n}\n\n.org-header-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 20px;\n  padding: 1.5rem 2rem;\n  margin-bottom: 2rem;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);\n  border: 1px solid rgba(0, 0, 0, 0.04);\n}\n.org-header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n}\n@media (max-width: 768px) {\n  .org-header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n.org-header-card[_ngcontent-%COMP%]   .title-section[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #192754;\n  margin: 0 0 0.25rem 0;\n}\n.org-header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n@media (max-width: 768px) {\n  .org-header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-direction: column;\n  }\n  .org-header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .search-wrapper[_ngcontent-%COMP%], .org-header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .btn-add-org[_ngcontent-%COMP%], .org-header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .btn-deleted[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n\n.search-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  min-width: 320px;\n}\n.search-wrapper[_ngcontent-%COMP%]   .search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9aa0a6;\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.search-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 16px 12px 42px;\n  border: 1px solid #e0e0e0;\n  border-radius: 9999px;\n  font-size: 0.95rem;\n  background-color: #f8f9fa;\n  transition: all 0.3s ease;\n}\n.search-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  background-color: #fff;\n  border-color: #0E49B5;\n  box-shadow: 0 0 0 3px rgba(14, 73, 181, 0.1);\n}\n.search-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #adb5bd;\n}\n\n.btn-deleted[_ngcontent-%COMP%] {\n  color: #dc2626 !important;\n}\n.btn-deleted[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  width: 22px;\n  height: 22px;\n}\n.btn-deleted[_ngcontent-%COMP%]:hover {\n  background-color: rgba(220, 38, 38, 0.08) !important;\n}\n\n.btn-add-org[_ngcontent-%COMP%] {\n  border-radius: 9999px !important;\n  padding: 0.5rem 1.5rem !important;\n  font-weight: 600 !important;\n  height: 48px !important;\n  box-shadow: 0 4px 12px rgba(14, 73, 181, 0.2);\n  background-color: #0E49B5 !important;\n  color: white !important;\n}\n.btn-add-org[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n\n.content-body[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem 2rem;\n  text-align: center;\n  background: white;\n  border-radius: 12px;\n  border: 1px dashed #ced4da;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #dee2e6;\n  margin-bottom: 1rem;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #192754;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6c757d;\n  margin-bottom: 1.5rem;\n}\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGhlbWUvX3ZhcmlhYmxlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2Rlc2tkeW5lLWNvbXBvbmVudHMvc2VhcmNoLW9yZ2FuaXphdGlvbi9zZWFyY2gtb3JnYW5pemF0aW9uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzsrQ0FBQTtBQTBFQTtFQUNFLHdCQUFBO0VBQ0EsMEJBQUE7RUFDQSwrQkFBQTtFQUNBLHFCQUFBO0FDdEVGOztBQUxBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0FBUUY7O0FBTEE7RUFDRSxnQkFBQTtFQUNBLG1CRGFpQjtFQ1pqQixvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMENEa0JnQjtFQ2pCaEIscUNBQUE7QUFRRjtBQU5FO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQVFKO0FBTkk7RUFQRjtJQVFJLHNCQUFBO0lBQ0Esb0JBQUE7RUFTSjtBQUNGO0FBTEk7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0R0Qlc7RUN1QlgscUJBQUE7QUFPTjtBQUhFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7QUFLSjtBQUhJO0VBTkY7SUFPSSxXQUFBO0lBQ0Esc0JBQUE7RUFNSjtFQUpJOzs7SUFHRSxXQUFBO0VBTU47QUFDRjs7QUFEQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7QUFJRjtBQUZFO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUNBLDJCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUlKO0FBREU7RUFDRSxXQUFBO0VBQ0EsNEJBQUE7RUFDQSx5QkFBQTtFQUNBLHFCRHBEaUI7RUNxRGpCLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtBQUdKO0FBREk7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxxQkQzRVc7RUM0RVgsNENBQUE7QUFHTjtBQUFJO0VBQ0UsY0FBQTtBQUVOOztBQUdBO0VBQ0UseUJBQUE7QUFBRjtBQUVFO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBQUo7QUFHRTtFQUNFLG9EQUFBO0FBREo7O0FBS0E7RUFDRSxnQ0FBQTtFQUNBLGlDQUFBO0VBQ0EsMkJBQUE7RUFDQSx1QkFBQTtFQUNBLDZDQUFBO0VBQ0Esb0NBQUE7RUFDQSx1QkFBQTtBQUZGO0FBSUU7RUFDRSxpQkFBQTtBQUZKOztBQU1BO0VBQ0UsMkJBQUE7QUFIRjs7QUFNQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkRoSGlCO0VDaUhqQiwwQkFBQTtBQUhGO0FBS0U7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7QUFISjtBQU1FO0VBQ0UsY0R2SWE7RUN3SWIsZ0JBQUE7RUFDQSxxQkFBQTtBQUpKO0FBT0U7RUFDRSxjQUFBO0VBQ0EscUJBQUE7QUFMSjs7QUFTQTtFQUNFO0lBQ0UsVUFBQTtJQUNBLDBCQUFBO0VBTkY7RUFTQTtJQUNFLFVBQUE7SUFDQSx3QkFBQTtFQVBGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgR2xvYmFsIFNDU1MgVmFyaWFibGVzIC0gQnJhbmQgQ29sb3JzXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuJHdoaXRlOiAjZmZmZmZmO1xyXG4kYmxhY2s6ICMwMDAwMDA7XHJcbiR0ZXh0UHJpbWFyeTogIzFhMWExYTtcclxuXHJcbi8vIEJyYW5kIENvbG9ycyAoUm95YWwgQmx1ZSAmIE5hdnkpXHJcbiRwcmltYXJ5LWNvbG9yMTogIzBFNDlCNTsgLy8gUm95YWwgQmx1ZSAoTWFpbiBQcmltYXJ5KVxyXG4kcHJpbWFyeS1jb2xvcjogJHByaW1hcnktY29sb3IxOyAvLyBBbGlhcyBmb3IgY29uc2lzdGVuY3lcclxuJHByaW1hcnktY29sb3IyOiAjMTkyNzU0OyAvLyBOYXZ5IEJsdWUgKFNlY29uZGFyeSAvIERhcmsgUHJpbWFyeSlcclxuJHByaW1hcnktY29sb3IzOiAjNGI4MmUyOyAvLyBMaWdodGVyIEJsdWUgZGVyaXZhdGl2ZVxyXG5cclxuLy8gQnJhbmQgQ29sb3JzIChDcmVhbSAmIFJlZClcclxuJHNlY29uZGFyeS1jb2xvcjE6ICNGNEVDQzU7IC8vIFNvZnQgQ3JlYW1cclxuJHNlY29uZGFyeS1jb2xvcjI6ICNmZmUwYjI7IC8vIERlcml2YXRpdmVcclxuJHNlY29uZGFyeS1jb2xvcjM6ICNGRjMzMzM7IC8vIEJyaWdodCBSZWQgKEFjY2VudClcclxuXHJcbi8vIERlc2lnbiBUb2tlbnMgLSBCb3JkZXIgUmFkaXVzXHJcbiRib3JkZXItcmFkaXVzLXNtOiA0cHg7XHJcbiRib3JkZXItcmFkaXVzLW1kOiA4cHg7XHJcbiRib3JkZXItcmFkaXVzLWxnOiAxMnB4O1xyXG4kYm9yZGVyLXJhZGl1cy14bDogMjBweDtcclxuJGJvcmRlci1yYWRpdXMtcGlsbDogOTk5OXB4O1xyXG4kYm9yZGVyLXJhZGl1cy1jaXJjbGU6IDUwJTtcclxuXHJcbi8vIERlc2lnbiBUb2tlbnMgLSBCb3ggU2hhZG93XHJcbiRib3gtc2hhZG93LXNtOiAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcclxuJGJveC1zaGFkb3ctbWQ6IDAgNHB4IDZweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMCAycHggNHB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjA2KTtcclxuJGJveC1zaGFkb3ctbGc6IDAgMTBweCAxNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDRweCA2cHggLTJweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xyXG4kYm94LXNoYWRvdy1jYXJkOiAwIDJweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4wNCk7XHJcbiRib3gtc2hhZG93LWNhcmQtaG92ZXI6IDAgOHB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjA4KTtcclxuXHJcbi8vIEFjY2VudCBDb2xvcnNcclxuJHNlY29uZGFyeS1vZmZzZXQtY29sb3IxOiAjZmZkNjc0O1xyXG4kc2Vjb25kYXJ5LW9mZnNldC1jb2xvcjI6ICNmZmM5NDc7XHJcbiRzZWNvbmRhcnktb2Zmc2V0LWNvbG9yMzogI2ZmYjMwMDtcclxuXHJcblxyXG4vLyBHcmF5cyAmIEJhY2tncm91bmRzXHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjE6ICNmZmZmZmY7XHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjI6ICNhNGE0YTQ7IC8vIEdyYXkgdGV4dFxyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3IzOiAjZjNmM2YzOyAvLyBMaWdodCBiYWNrZ3JvdW5kXHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjQ6ICNlZmVmZWY7IC8vIENhcmQgYmFja2dyb3VuZFxyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3I1OiB3aGl0ZTtcclxuJGJvcmRlci1jb2xvcjogI2U1ZTdlYjtcclxuJGNhcmQtb2RkOiAjZGVlMmU2O1xyXG4kYmFja2dyb3VuZC1jb2xvcjogI2YzZjNmMztcclxuLy8gVGhlbWUgQ29sb3JzIChNYXRjaGVzIHN0eWxlcy5zY3NzKVxyXG4kaW5mby1jb2xvcjogI2E0YTRhNDtcclxuJHRleHQtZGFyazogIzFhMWExYTtcclxuLy8gVGhlbWUgQ29sb3JzXHJcbiRwcmltYXJ5LWNvbG9yOiAjZTYyODQxO1xyXG4kc2Vjb25kYXJ5LWNvbG9yOiAjMTVhMjkyO1xyXG4kYmFja2Ryb3AtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcclxuLy8gU2VtYW50aWMgQ29sb3JzIChTdGFuZGFyZGl6ZWQpXHJcbiRjb2xvci1zdWNjZXNzOiAjNTJjNDFhO1xyXG4kY29sb3Itc3VjY2Vzcy1iZzogI2Y2ZmZlZDtcclxuJGNvbG9yLXN1Y2Nlc3MtYm9yZGVyOiAjYjdlYjhmO1xyXG5cclxuJGNvbG9yLXdhcm5pbmc6ICNmYWFkMTQ7XHJcbiRjb2xvci13YXJuaW5nLWJnOiAjZmZmN2U2O1xyXG4kY29sb3Itd2FybmluZy1ib3JkZXI6ICNmZmU1OGY7XHJcblxyXG4kY29sb3ItZXJyb3I6ICNmZjRkNGY7XHJcbiRjb2xvci1lcnJvci1iZzogI2ZmZjFmMDtcclxuJGNvbG9yLWVycm9yLWJvcmRlcjogI2ZmY2NjNztcclxuXHJcbiRjb2xvci1pbmZvOiAjMTg5MGZmO1xyXG4kY29sb3ItaW5mby1iZzogI2U2ZjdmZjtcclxuJGNvbG9yLWluZm8tYm9yZGVyOiAjOTFkNWZmO1xyXG5cclxuLy8gQ1NTIFZhcmlhYmxlcyBmb3IgUnVudGltZSBUaGVtaW5nXHJcbjpyb290IHtcclxuICAtLWNvbG9yLXByaW1hcnk6ICN7JHByaW1hcnktY29sb3IxfTtcclxuICAtLWNvbG9yLXNlY29uZGFyeTogI3skc2Vjb25kYXJ5LWNvbG9yM307XHJcbiAgLS1jb2xvci1iYWNrZ3JvdW5kR3JleTogI3skYmFja2dyb3VuZC1jb2xvcn07XHJcbiAgLS1jb2xvci10ZXh0OiAjeyR0ZXh0UHJpbWFyeX07XHJcbn0iLCJAdXNlICcvc3JjL3N0eWxlcy90aGVtZS9taXhpbnMnIGFzIG1peGluO1xyXG5AdXNlICcvc3JjL3N0eWxlcy90aGVtZS92YXJpYWJsZScgYXMgdmFyO1xyXG5cclxuLm9yZy1wYWdlLWNvbnRhaW5lciB7XHJcbiAgcGFkZGluZzogMS41cmVtO1xyXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xyXG59XHJcblxyXG4ub3JnLWhlYWRlci1jYXJkIHtcclxuICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gIGJvcmRlci1yYWRpdXM6IHZhci4kYm9yZGVyLXJhZGl1cy14bDtcclxuICBwYWRkaW5nOiAxLjVyZW0gMnJlbTtcclxuICBtYXJnaW4tYm90dG9tOiAycmVtO1xyXG4gIGJveC1zaGFkb3c6IHZhci4kYm94LXNoYWRvdy1jYXJkO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4wNCk7XHJcblxyXG4gIC5oZWFkZXItY29udGVudCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgIGdhcDogMS41cmVtO1xyXG5cclxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC50aXRsZS1zZWN0aW9uIHtcclxuICAgIC5wYWdlLXRpdGxlIHtcclxuICAgICAgZm9udC1zaXplOiAxLjc1cmVtO1xyXG4gICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICBjb2xvcjogdmFyLiRwcmltYXJ5LWNvbG9yMjtcclxuICAgICAgbWFyZ2luOiAwIDAgMC4yNXJlbSAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmFjdGlvbnMtc2VjdGlvbiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogMXJlbTtcclxuICAgIGZsZXgtd3JhcDogd3JhcDtcclxuXHJcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblxyXG4gICAgICAuc2VhcmNoLXdyYXBwZXIsXHJcbiAgICAgIC5idG4tYWRkLW9yZyxcclxuICAgICAgLmJ0bi1kZWxldGVkIHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLnNlYXJjaC13cmFwcGVyIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgbWluLXdpZHRoOiAzMjBweDtcclxuXHJcbiAgLnNlYXJjaC1pY29uIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGxlZnQ6IDEycHg7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIGNvbG9yOiAjOWFhMGE2O1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgd2lkdGg6IDIwcHg7XHJcbiAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgfVxyXG5cclxuICBpbnB1dCB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHBhZGRpbmc6IDEycHggMTZweCAxMnB4IDQycHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZTBlMGUwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogdmFyLiRib3JkZXItcmFkaXVzLXBpbGw7XHJcbiAgICBmb250LXNpemU6IDAuOTVyZW07XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOWZhO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcclxuXHJcbiAgICAmOmZvY3VzIHtcclxuICAgICAgb3V0bGluZTogbm9uZTtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIuJHByaW1hcnktY29sb3IxO1xyXG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSh2YXIuJHByaW1hcnktY29sb3IxLCAwLjEpO1xyXG4gICAgfVxyXG5cclxuICAgICY6OnBsYWNlaG9sZGVyIHtcclxuICAgICAgY29sb3I6ICNhZGI1YmQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4uYnRuLWRlbGV0ZWQge1xyXG4gIGNvbG9yOiAjZGMyNjI2ICFpbXBvcnRhbnQ7XHJcblxyXG4gIG1hdC1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICAgIHdpZHRoOiAyMnB4O1xyXG4gICAgaGVpZ2h0OiAyMnB4O1xyXG4gIH1cclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKCNkYzI2MjYsIDAuMDgpICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG59XHJcblxyXG4uYnRuLWFkZC1vcmcge1xyXG4gIGJvcmRlci1yYWRpdXM6IHZhci4kYm9yZGVyLXJhZGl1cy1waWxsICFpbXBvcnRhbnQ7XHJcbiAgcGFkZGluZzogMC41cmVtIDEuNXJlbSAhaW1wb3J0YW50O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDAgIWltcG9ydGFudDtcclxuICBoZWlnaHQ6IDQ4cHggIWltcG9ydGFudDtcclxuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEodmFyLiRwcmltYXJ5LWNvbG9yMSwgMC4yKTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIuJHByaW1hcnktY29sb3IxICFpbXBvcnRhbnQ7XHJcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XHJcblxyXG4gIG1hdC1pY29uIHtcclxuICAgIG1hcmdpbi1yaWdodDogOHB4O1xyXG4gIH1cclxufVxyXG5cclxuLmNvbnRlbnQtYm9keSB7XHJcbiAgYW5pbWF0aW9uOiBmYWRlSW4gMC4zcyBlYXNlO1xyXG59XHJcblxyXG4uZW1wdHktc3RhdGUge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDRyZW0gMnJlbTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogdmFyLiRib3JkZXItcmFkaXVzLWxnO1xyXG4gIGJvcmRlcjogMXB4IGRhc2hlZCAjY2VkNGRhO1xyXG5cclxuICAuZW1wdHktaWNvbiB7XHJcbiAgICBmb250LXNpemU6IDY0cHg7XHJcbiAgICB3aWR0aDogNjRweDtcclxuICAgIGhlaWdodDogNjRweDtcclxuICAgIGNvbG9yOiAjZGVlMmU2O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICB9XHJcblxyXG4gIGgzIHtcclxuICAgIGNvbG9yOiB2YXIuJHByaW1hcnktY29sb3IyO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcclxuICB9XHJcblxyXG4gIHAge1xyXG4gICAgY29sb3I6ICM2Yzc1N2Q7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XHJcbiAgfVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIGZhZGVJbiB7XHJcbiAgZnJvbSB7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDhweCk7XHJcbiAgfVxyXG5cclxuICB0byB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 83383:
/*!***************************************************************************************!*\
  !*** ./src/app/deskdyne-components/search-organization/search-organization.module.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchOrganizationModule: () => (/* binding */ SearchOrganizationModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _search_organization_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search-organization.component */ 43429);
/* harmony import */ var _search_organization_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search-organization-routing.module */ 3673);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _organization_card_organization_card_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../organization-card/organization-card.module */ 8897);
/* harmony import */ var src_app_organization_view_organization_view_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/organization-view/organization-view.module */ 83277);
/* harmony import */ var src_app_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/material.module */ 29099);
/* harmony import */ var _deleted_orgs_dialog_deleted_orgs_dialog_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./deleted-orgs-dialog/deleted-orgs-dialog.component */ 67074);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 61699);









class SearchOrganizationModule {
  static #_ = this.ɵfac = function SearchOrganizationModule_Factory(t) {
    return new (t || SearchOrganizationModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
    type: SearchOrganizationModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _search_organization_routing_module__WEBPACK_IMPORTED_MODULE_1__.SearchOrganizationRoutingModule, _organization_card_organization_card_module__WEBPACK_IMPORTED_MODULE_2__.OrganizationCardModule, src_app_organization_view_organization_view_module__WEBPACK_IMPORTED_MODULE_3__.OrganizationViewModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_4__.MaterialModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](SearchOrganizationModule, {
    declarations: [_search_organization_component__WEBPACK_IMPORTED_MODULE_0__.SearchOrganizationComponent, _deleted_orgs_dialog_deleted_orgs_dialog_component__WEBPACK_IMPORTED_MODULE_5__.DeletedOrgsDialogComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _search_organization_routing_module__WEBPACK_IMPORTED_MODULE_1__.SearchOrganizationRoutingModule, _organization_card_organization_card_module__WEBPACK_IMPORTED_MODULE_2__.OrganizationCardModule, src_app_organization_view_organization_view_module__WEBPACK_IMPORTED_MODULE_3__.OrganizationViewModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_4__.MaterialModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule],
    exports: [_search_organization_component__WEBPACK_IMPORTED_MODULE_0__.SearchOrganizationComponent]
  });
})();

/***/ }),

/***/ 65177:
/*!******************************************************************!*\
  !*** ./src/app/organization-card/organization-card.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrganizationCardComponent: () => (/* binding */ OrganizationCardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ 17401);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/paginator */ 39687);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/sort */ 87963);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/table */ 46798);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 20553);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);













function OrganizationCardComponent_div_2_img_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "img", 25);
  }
  if (rf & 2) {
    const org_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", ctx_r5.imageUrl + org_r4.organizationLogoUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
  }
}
function OrganizationCardComponent_div_2_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const org_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r6.getInitials(org_r4 == null ? null : org_r4.organization_name));
  }
}
function OrganizationCardComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 7)(1, "div", 8)(2, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, OrganizationCardComponent_div_2_img_3_Template, 1, 1, "img", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, OrganizationCardComponent_div_2_span_4_Template, 2, 1, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 12)(6, "div", 13)(7, "h3", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "span", 15)(10, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "location_city");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 16)(14, "div", 17)(15, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "place");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 19)(20, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function OrganizationCardComponent_div_2_Template_span_click_20_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r10);
      const org_r4 = restoredCtx.$implicit;
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r9.dataView(org_r4 == null ? null : org_r4.cafeteriaList, "cafeteria"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "storefront");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function OrganizationCardComponent_div_2_Template_span_click_24_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r10);
      const org_r4 = restoredCtx.$implicit;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r11.dataView(org_r4.poc_details, "poc"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "people");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "div", 22)(29, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function OrganizationCardComponent_div_2_Template_button_click_29_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r10);
      const org_r4 = restoredCtx.$implicit;
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r12.vieworg(org_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "visibility");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function OrganizationCardComponent_div_2_Template_button_click_32_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r10);
      const org_r4 = restoredCtx.$implicit;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r13.onSoftDelete(org_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "delete_outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const org_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", org_r4.organizationLogoUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !org_r4.organizationLogoUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](org_r4 == null ? null : org_r4.organization_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", (org_r4 == null ? null : org_r4.city) || "N/A", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matTooltip", org_r4 == null ? null : org_r4.location);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"]((org_r4 == null ? null : org_r4.location) || "No location");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", (org_r4 == null ? null : org_r4.cafeteriaList == null ? null : org_r4.cafeteriaList.length) || 0, " Cafeterias ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", (org_r4.poc_details == null ? null : org_r4.poc_details.length) || 0, " POCs ");
  }
}
function OrganizationCardComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 26)(1, "div", 27)(2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "search_off");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "No Organizations Found");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Try adjusting your search criteria.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
}
function OrganizationCardComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function OrganizationCardComponent_div_5_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r14.closeModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function OrganizationCardComponent_div_6_ng_container_9_th_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const col_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 1, col_r19));
  }
}
function OrganizationCardComponent_div_6_ng_container_9_td_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 44)(1, "mat-icon", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "check_circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " Yes ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function OrganizationCardComponent_div_6_ng_container_9_td_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 44)(1, "mat-icon", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " No ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function OrganizationCardComponent_div_6_ng_container_9_td_2_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const col_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matTooltip", row_r23[col_r19]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r23[col_r19], " ");
  }
}
function OrganizationCardComponent_div_6_ng_container_9_td_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, OrganizationCardComponent_div_6_ng_container_9_td_2_div_1_Template, 4, 0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, OrganizationCardComponent_div_6_ng_container_9_td_2_div_2_Template, 4, 0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, OrganizationCardComponent_div_6_ng_container_9_td_2_span_3_Template, 2, 2, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r23 = ctx.$implicit;
    const col_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", row_r23[col_r19] === true);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", row_r23[col_r19] === false);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", row_r23[col_r19] !== true && row_r23[col_r19] !== false);
  }
}
function OrganizationCardComponent_div_6_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0, 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, OrganizationCardComponent_div_6_ng_container_9_th_1_Template, 3, 3, "th", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, OrganizationCardComponent_div_6_ng_container_9_td_2_Template, 4, 3, "td", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const col_r19 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matColumnDef", col_r19);
  }
}
function OrganizationCardComponent_div_6_tr_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "tr", 47);
  }
}
function OrganizationCardComponent_div_6_tr_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "tr", 48);
  }
}
function OrganizationCardComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 29)(1, "div", 30)(2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function OrganizationCardComponent_div_6_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r32);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r31.closeModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 32)(8, "table", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, OrganizationCardComponent_div_6_ng_container_9_Template, 3, 1, "ng-container", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, OrganizationCardComponent_div_6_tr_10_Template, 1, 0, "tr", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, OrganizationCardComponent_div_6_tr_11_Template, 1, 0, "tr", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3.tableDetails);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("dataSource", ctx_r3.tableData);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r3.columns);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matHeaderRowDef", ctx_r3.columns);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matRowDefColumns", ctx_r3.columns);
  }
}
const _c0 = function () {
  return [10, 50, 100, 200, 500];
};
class OrganizationCardComponent {
  constructor() {
    this.displayedColumns = ['Organization Name', 'Location', 'Cafeteria', 'Poc Details', 'action'];
    this.columns = [];
    this.tableDetails = '';
    this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatTableDataSource([]);
    this.tableData = [];
    this.imageUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.imageUrl;
    this.totalRecords = 0;
    this.pageIndex = 0;
    this.pageSize = 10;
    this.pageSizeOptions = [10, 15, 20];
    this.showModal = false;
    this.selectedOrgData = [];
    this.dialog = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialog);
    this._organization = [];
    this.pagedOrganized = [];
    this.showDeletedMode = false;
    this.view = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.paginationConfig = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.softDelete = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.hardDelete = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.restore = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }
  get organization() {
    return this._organization;
  }
  set organization(value) {
    this._organization = value || [];
    this.ngOnInit();
  }
  ngOnInit() {
    this.updatePage();
  }
  vieworg(org) {
    this.view.emit(org);
  }
  onPageChange(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }
  updatePage() {
    if (!this.organization) return;
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedOrganized = this.organization.slice(start, end);
  }
  dataView(org, type) {
    let keysToRemove = [];
    this.tableDetails = type === 'poc' ? 'POC Details' : 'Cafeteria Details';
    if (type === 'poc') {
      keysToRemove = ["_id", "approverDetails", "poc_id"];
    }
    let cafeteriaOrder = [];
    if (type === 'cafeteria') {
      keysToRemove = ["cafeteria_location", "poc_details", "_id", "accessCode", "subsidy"];
      cafeteriaOrder = ["cafeteria_name", "cafeteria_id", "cafeteria_city", "cafeteria_gstin", "address1", "address2", "appMenu_type", "landmark", "location", "showAdminDaily", "showEmpPolls", "showVirtualCafe", "showSaas", "showSiteExecutive", "showCompanyWallet", "showchecklist", "isEmployeeEmailLogin", "showComplienceTracker", "showConsumptionOrder"];
    }
    const filteredData = this.removeKeysFromObjects(org, keysToRemove);
    if (type === 'cafeteria') {
      const availableCols = Object.keys(filteredData[0]);
      this.columns = cafeteriaOrder.filter(col => availableCols.includes(col));
    } else {
      this.columns = Object.keys(filteredData[0]);
    }
    filteredData.forEach(row => {
      this.columns.forEach(col => {
        if (!(col in row)) row[col] = null;
      });
    });
    this.selectedOrgData = filteredData;
    this.tableData = [...this.selectedOrgData];
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
  removeKeysFromObjects(data, keys) {
    return data.map(item => {
      const newItem = {
        ...item
      };
      keys.forEach(k => delete newItem[k]);
      return newItem;
    });
  }
  getInitials(name) {
    if (!name) return 'O';
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }
  onSoftDelete(org) {
    this.softDelete.emit(org);
  }
  onHardDelete(org) {
    this.hardDelete.emit(org);
  }
  onRestore(org) {
    this.restore.emit(org);
  }
  static #_ = this.ɵfac = function OrganizationCardComponent_Factory(t) {
    return new (t || OrganizationCardComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: OrganizationCardComponent,
    selectors: [["app-organization-card"]],
    viewQuery: function OrganizationCardComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_4__.MatPaginator, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_5__.MatSort, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
      }
    },
    inputs: {
      showDeletedMode: "showDeletedMode",
      organization: "organization"
    },
    outputs: {
      view: "view",
      paginationConfig: "paginationConfig",
      softDelete: "softDelete",
      hardDelete: "hardDelete",
      restore: "restore"
    },
    decls: 7,
    vars: 9,
    consts: [[1, "org-list-container"], [1, "org-list"], ["class", "org-item-card", 4, "ngFor", "ngForOf"], ["class", "empty-state-card", 4, "ngIf"], ["showFirstLastButtons", "", "aria-label", "Select page", 1, "custom-paginator", 3, "length", "pageSize", "pageIndex", "pageSizeOptions", "page"], ["class", "custom-backdrop", 3, "click", 4, "ngIf"], ["class", "custom-modal", 4, "ngIf"], [1, "org-item-card"], [1, "org-avatar-section"], [1, "org-avatar"], ["alt", "Logo", "class", "avatar-img", 3, "src", 4, "ngIf"], [4, "ngIf"], [1, "org-info-section"], [1, "org-header"], [1, "org-name"], [1, "location-badge"], [1, "org-details"], [1, "detail-item"], [1, "text-truncate", 3, "matTooltip"], [1, "chip-group"], [1, "chip", "cafeteria-chip", 3, "click"], [1, "chip", "poc-chip", 3, "click"], [1, "org-action-section"], ["mat-icon-button", "", "color", "primary", "matTooltip", "View Details", 1, "view-btn", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Delete Organization", 3, "click"], ["alt", "Logo", 1, "avatar-img", 3, "src"], [1, "empty-state-card"], [1, "empty-content"], [1, "custom-backdrop", 3, "click"], [1, "custom-modal"], [1, "modal-header"], ["mat-icon-button", "", 3, "click"], [1, "modal-body"], ["mat-table", "", 1, "modern-table", 3, "dataSource"], [3, "matColumnDef", 4, "ngFor", "ngForOf"], ["mat-header-row", "", "class", "table-header", 4, "matHeaderRowDef"], ["mat-row", "", "class", "table-row", 4, "matRowDef", "matRowDefColumns"], [3, "matColumnDef"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "table-cell", 4, "matCellDef"], ["mat-header-cell", ""], ["mat-cell", "", 1, "table-cell"], ["class", "row-chip", 4, "ngIf"], ["class", "text-truncate", 3, "matTooltip", 4, "ngIf"], [1, "row-chip"], [1, "icon-check"], [1, "icon-cross"], ["mat-header-row", "", 1, "table-header"], ["mat-row", "", 1, "table-row"]],
    template: function OrganizationCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, OrganizationCardComponent_div_2_Template, 35, 8, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, OrganizationCardComponent_div_3_Template, 8, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-paginator", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("page", function OrganizationCardComponent_Template_mat_paginator_page_4_listener($event) {
          return ctx.onPageChange($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, OrganizationCardComponent_div_5_Template, 1, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, OrganizationCardComponent_div_6_Template, 12, 5, "div", 6);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.pagedOrganized);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.pagedOrganized || ctx.pagedOrganized.length === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("length", ctx.organization.length || 0)("pageSize", ctx.pageSize)("pageIndex", ctx.pageIndex)("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](8, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showModal);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showModal);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatRow, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_4__.MatPaginator, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__.MatTooltip, _angular_common__WEBPACK_IMPORTED_MODULE_6__.TitleCasePipe],
    styles: ["\n\n\n\n[_ngcontent-%COMP%]:root {\n  --color-primary: #0E49B5;\n  --color-secondary: #FF3333;\n  --color-backgroundGrey: #f3f3f3;\n  --color-text: #1a1a1a;\n}\n\n.org-list-container[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n\n.org-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 0.5rem 0;\n}\n\n.org-item-card[_ngcontent-%COMP%] {\n  background-color: white;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  padding: 1rem 1.5rem;\n  transition: all 0.2s ease;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);\n  gap: 1.5rem;\n}\n.org-item-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  border-color: #4b82e2;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);\n}\n.org-item-card[_ngcontent-%COMP%]   .org-avatar-section[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.org-item-card[_ngcontent-%COMP%]   .org-avatar-section[_ngcontent-%COMP%]   .org-avatar[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 12px;\n  background: linear-gradient(135deg, #4b82e2 0%, #0E49B5 100%);\n  color: white;\n  font-weight: 700;\n  font-size: 1.25rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n}\n.org-item-card[_ngcontent-%COMP%]   .org-avatar-section[_ngcontent-%COMP%]   .org-avatar[_ngcontent-%COMP%]   .avatar-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.org-item-card[_ngcontent-%COMP%]   .org-info-section[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  min-width: 0;\n}\n.org-item-card[_ngcontent-%COMP%]   .org-info-section[_ngcontent-%COMP%]   .org-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.org-item-card[_ngcontent-%COMP%]   .org-info-section[_ngcontent-%COMP%]   .org-header[_ngcontent-%COMP%]   .org-name[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #192754;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.org-item-card[_ngcontent-%COMP%]   .org-info-section[_ngcontent-%COMP%]   .org-header[_ngcontent-%COMP%]   .location-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.75rem;\n  color: #718096;\n  background-color: #f7fafc;\n  border: 1px solid #edf2f7;\n  padding: 2px 8px;\n  border-radius: 12px;\n  white-space: nowrap;\n}\n.org-item-card[_ngcontent-%COMP%]   .org-info-section[_ngcontent-%COMP%]   .org-header[_ngcontent-%COMP%]   .location-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.org-item-card[_ngcontent-%COMP%]   .org-info-section[_ngcontent-%COMP%]   .org-details[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n  flex-wrap: wrap;\n}\n.org-item-card[_ngcontent-%COMP%]   .org-info-section[_ngcontent-%COMP%]   .org-details[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: #64748b;\n  font-size: 0.9rem;\n  max-width: 200px;\n}\n.org-item-card[_ngcontent-%COMP%]   .org-info-section[_ngcontent-%COMP%]   .org-details[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: #94a3b8;\n}\n.org-item-card[_ngcontent-%COMP%]   .org-info-section[_ngcontent-%COMP%]   .org-details[_ngcontent-%COMP%]   .chip-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n}\n.org-item-card[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 10px;\n  border-radius: 6px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  white-space: nowrap;\n}\n.org-item-card[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.org-item-card[_ngcontent-%COMP%]   .chip.cafeteria-chip[_ngcontent-%COMP%] {\n  color: #15a292;\n  background-color: rgba(21, 162, 146, 0.08);\n}\n.org-item-card[_ngcontent-%COMP%]   .chip.cafeteria-chip[_ngcontent-%COMP%]:hover {\n  background-color: rgba(21, 162, 146, 0.15);\n}\n.org-item-card[_ngcontent-%COMP%]   .chip.poc-chip[_ngcontent-%COMP%] {\n  color: #0E49B5;\n  background-color: rgba(14, 73, 181, 0.08);\n}\n.org-item-card[_ngcontent-%COMP%]   .chip.poc-chip[_ngcontent-%COMP%]:hover {\n  background-color: rgba(14, 73, 181, 0.15);\n}\n.org-item-card[_ngcontent-%COMP%]   .org-action-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.org-item-card[_ngcontent-%COMP%]   .org-action-section[_ngcontent-%COMP%]   .view-btn[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #f8fafc;\n  border-radius: 50%;\n  color: #94a3b8;\n}\n.org-item-card[_ngcontent-%COMP%]   .org-action-section[_ngcontent-%COMP%]   .view-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.org-item-card[_ngcontent-%COMP%]   .org-action-section[_ngcontent-%COMP%]   .view-btn[_ngcontent-%COMP%]:hover {\n  background: #0E49B5;\n  color: white;\n  box-shadow: 0 4px 12px rgba(14, 73, 181, 0.2);\n}\n.org-item-card[_ngcontent-%COMP%]   .org-action-section[_ngcontent-%COMP%]   .hard-delete-btn[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.org-item-card[_ngcontent-%COMP%]   .org-action-section[_ngcontent-%COMP%]   .hard-delete-btn[_ngcontent-%COMP%]:hover {\n  background-color: rgba(220, 38, 38, 0.1);\n}\n.org-item-card[_ngcontent-%COMP%]   .org-action-section[_ngcontent-%COMP%]   .restore-btn[_ngcontent-%COMP%] {\n  border-radius: 20px !important;\n  padding: 0 16px !important;\n  height: 36px !important;\n  font-weight: 600;\n}\n.org-item-card[_ngcontent-%COMP%]   .org-action-section[_ngcontent-%COMP%]   .restore-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 4px;\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n\n@media (max-width: 768px) {\n  .org-item-card[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 1rem;\n    padding: 1.25rem;\n  }\n  .org-item-card[_ngcontent-%COMP%]   .org-avatar-section[_ngcontent-%COMP%] {\n    align-self: flex-start;\n  }\n  .org-item-card[_ngcontent-%COMP%]   .org-info-section[_ngcontent-%COMP%]   .org-details[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.75rem;\n  }\n  .org-item-card[_ngcontent-%COMP%]   .org-info-section[_ngcontent-%COMP%]   .org-details[_ngcontent-%COMP%]   .chip-group[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .org-item-card[_ngcontent-%COMP%]   .org-action-section[_ngcontent-%COMP%] {\n    width: 100%;\n    display: flex;\n    justify-content: flex-end;\n    border-top: 1px solid #f1f5f9;\n    padding-top: 0.75rem;\n    margin-top: 0.5rem;\n  }\n}\n.empty-state-card[_ngcontent-%COMP%] {\n  padding: 3rem;\n  text-align: center;\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.empty-state-card[_ngcontent-%COMP%]   .empty-content[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #cbd5e0;\n  margin-bottom: 1rem;\n}\n.empty-state-card[_ngcontent-%COMP%]   .empty-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #2d3748;\n  margin-bottom: 0.5rem;\n}\n.empty-state-card[_ngcontent-%COMP%]   .empty-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #718096;\n}\n\n.custom-paginator[_ngcontent-%COMP%] {\n  background: transparent;\n  margin-top: 1rem;\n}\n\n.custom-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-backdrop-filter: blur(4px);\n          backdrop-filter: blur(4px);\n  z-index: 998;\n}\n\n.custom-modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 85%;\n  max-width: 900px;\n  max-height: 80vh;\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);\n  z-index: 999;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.custom-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%] {\n  padding: 1.25rem 1.5rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid #e2e8f0;\n  background: #f8f9fa;\n}\n.custom-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #192754;\n}\n.custom-modal[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%] {\n  padding: 1rem;\n  overflow-y: auto;\n  flex: 1;\n}\n\n.modern-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0 8px;\n  background: transparent;\n}\n.modern-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {\n  background-color: #0E49B5;\n}\n.modern-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   th.mat-mdc-header-cell[_ngcontent-%COMP%] {\n  color: white;\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 0.75rem;\n  letter-spacing: 0.5px;\n  padding: 12px 16px;\n  border: none;\n}\n.modern-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child {\n  border-radius: 8px 0 0 8px;\n}\n.modern-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child {\n  border-radius: 0 8px 8px 0;\n}\n.modern-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%] {\n  background: white;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  transition: all 0.2s ease;\n}\n.modern-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.modern-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border: none;\n}\n.modern-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n  border-radius: 8px 0 0 8px;\n}\n.modern-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n  border-radius: 0 8px 8px 0;\n}\n.modern-table[_ngcontent-%COMP%]   .table-cell[_ngcontent-%COMP%] {\n  max-width: 150px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.row-chip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.85rem;\n}\n\n.icon-check[_ngcontent-%COMP%] {\n  color: #38a169 !important;\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n\n.icon-cross[_ngcontent-%COMP%] {\n  color: #e53e3e !important;\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGhlbWUvX3ZhcmlhYmxlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL29yZ2FuaXphdGlvbi1jYXJkL29yZ2FuaXphdGlvbi1jYXJkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzsrQ0FBQTtBQTBFQTtFQUNFLHdCQUFBO0VBQ0EsMEJBQUE7RUFDQSwrQkFBQTtFQUNBLHFCQUFBO0FDdEVGOztBQUxBO0VBQ0UsMkJBQUE7QUFRRjs7QUFKQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtBQU9GOztBQUhBO0VBQ0UsdUJBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSx5QkFBQTtFQUNBLHlDQUFBO0VBQ0EsV0FBQTtBQU1GO0FBSkU7RUFDRSwyQkFBQTtFQUNBLHFCRGpCYTtFQ2tCYiwwQ0FBQTtBQU1KO0FBRkU7RUFDRSxjQUFBO0FBSUo7QUFGSTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSw2REFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtBQUlOO0FBRk07RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FBSVI7QUFFRTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUFKO0FBRUk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsZUFBQTtBQUFOO0FBRU07RUFDRSxTQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGNEakVTO0VDa0VULG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtBQUFSO0FBR007RUFDRSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFEUjtBQUdRO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBRFY7QUFNSTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FBSk47QUFNTTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBQUpSO0FBTVE7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0FBSlY7QUFRTTtFQUNFLGFBQUE7RUFDQSxZQUFBO0FBTlI7QUFZRTtFQUNFLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtBQVZKO0FBWUk7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFWTjtBQWFJO0VBQ0UsY0RqR1k7RUNrR1osMENBQUE7QUFYTjtBQWFNO0VBQ0UsMENBQUE7QUFYUjtBQWVJO0VBQ0UsY0R2Slc7RUN3SlgseUNBQUE7QUFiTjtBQWVNO0VBQ0UseUNBQUE7QUFiUjtBQW1CRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7QUFqQko7QUFtQkk7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QUFqQk47QUFtQk07RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFqQlI7QUFvQk07RUFDRSxtQkR2TFM7RUN3TFQsWUFBQTtFQUNBLDZDQUFBO0FBbEJSO0FBc0JJO0VBQ0UsY0FBQTtBQXBCTjtBQXNCTTtFQUNFLHdDQUFBO0FBcEJSO0FBd0JJO0VBQ0UsOEJBQUE7RUFDQSwwQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7QUF0Qk47QUF3Qk07RUFDRSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQXRCUjs7QUE2QkE7RUFDRTtJQUNFLHNCQUFBO0lBQ0Esb0JBQUE7SUFDQSxTQUFBO0lBQ0EsZ0JBQUE7RUExQkY7RUE0QkU7SUFDRSxzQkFBQTtFQTFCSjtFQThCSTtJQUNFLHNCQUFBO0lBQ0EsdUJBQUE7SUFDQSxZQUFBO0VBNUJOO0VBOEJNO0lBQ0UsZUFBQTtFQTVCUjtFQWlDRTtJQUNFLFdBQUE7SUFDQSxhQUFBO0lBQ0EseUJBQUE7SUFDQSw2QkFBQTtJQUNBLG9CQUFBO0lBQ0Esa0JBQUE7RUEvQko7QUFDRjtBQW9DQTtFQUNFLGFBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSx5Q0QzT2M7QUN5TWhCO0FBcUNJO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0FBbkNOO0FBc0NJO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtBQXBDTjtBQXVDSTtFQUNFLGNBQUE7QUFyQ047O0FBMENBO0VBQ0UsdUJBQUE7RUFDQSxnQkFBQTtBQXZDRjs7QUEyQ0E7RUFDRSxlQUFBO0VBQ0EsUUFBQTtFQUNBLDhCQUFBO0VBQ0Esa0NBQUE7VUFBQSwwQkFBQTtFQUNBLFlBQUE7QUF4Q0Y7O0FBMkNBO0VBQ0UsZUFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsZ0NBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpREFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQXhDRjtBQTBDRTtFQUNFLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQ0FBQTtFQUNBLG1CQUFBO0FBeENKO0FBMENJO0VBQ0UsU0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjRDlUVztBQ3NSakI7QUE0Q0U7RUFDRSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxPQUFBO0FBMUNKOztBQThDQTtFQUNFLFdBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0VBQ0EsdUJBQUE7QUEzQ0Y7QUE2Q0U7RUFDRSx5QkRsVmE7QUN1U2pCO0FBNkNJO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FBM0NOO0FBOENJO0VBQ0UsMEJBQUE7QUE1Q047QUErQ0k7RUFDRSwwQkFBQTtBQTdDTjtBQWlERTtFQUNFLGlCQUFBO0VBQ0EseUNBQUE7RUFDQSx5QkFBQTtBQS9DSjtBQWlESTtFQUNFLDJCQUFBO0VBQ0EseUNBQUE7QUEvQ047QUFrREk7RUFDRSxrQkFBQTtFQUNBLFlBQUE7QUFoRE47QUFtREk7RUFDRSwwQkFBQTtBQWpETjtBQW9ESTtFQUNFLDBCQUFBO0FBbEROO0FBc0RFO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFwREo7O0FBd0RBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGtCQUFBO0FBckRGOztBQXdEQTtFQUNFLHlCQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBckRGOztBQXdEQTtFQUNFLHlCQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBckRGOztBQXdEQTtFQUNFO0lBQ0UsVUFBQTtJQUNBLDBCQUFBO0VBckRGO0VBd0RBO0lBQ0UsVUFBQTtJQUNBLHdCQUFBO0VBdERGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgR2xvYmFsIFNDU1MgVmFyaWFibGVzIC0gQnJhbmQgQ29sb3JzXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuJHdoaXRlOiAjZmZmZmZmO1xyXG4kYmxhY2s6ICMwMDAwMDA7XHJcbiR0ZXh0UHJpbWFyeTogIzFhMWExYTtcclxuXHJcbi8vIEJyYW5kIENvbG9ycyAoUm95YWwgQmx1ZSAmIE5hdnkpXHJcbiRwcmltYXJ5LWNvbG9yMTogIzBFNDlCNTsgLy8gUm95YWwgQmx1ZSAoTWFpbiBQcmltYXJ5KVxyXG4kcHJpbWFyeS1jb2xvcjogJHByaW1hcnktY29sb3IxOyAvLyBBbGlhcyBmb3IgY29uc2lzdGVuY3lcclxuJHByaW1hcnktY29sb3IyOiAjMTkyNzU0OyAvLyBOYXZ5IEJsdWUgKFNlY29uZGFyeSAvIERhcmsgUHJpbWFyeSlcclxuJHByaW1hcnktY29sb3IzOiAjNGI4MmUyOyAvLyBMaWdodGVyIEJsdWUgZGVyaXZhdGl2ZVxyXG5cclxuLy8gQnJhbmQgQ29sb3JzIChDcmVhbSAmIFJlZClcclxuJHNlY29uZGFyeS1jb2xvcjE6ICNGNEVDQzU7IC8vIFNvZnQgQ3JlYW1cclxuJHNlY29uZGFyeS1jb2xvcjI6ICNmZmUwYjI7IC8vIERlcml2YXRpdmVcclxuJHNlY29uZGFyeS1jb2xvcjM6ICNGRjMzMzM7IC8vIEJyaWdodCBSZWQgKEFjY2VudClcclxuXHJcbi8vIERlc2lnbiBUb2tlbnMgLSBCb3JkZXIgUmFkaXVzXHJcbiRib3JkZXItcmFkaXVzLXNtOiA0cHg7XHJcbiRib3JkZXItcmFkaXVzLW1kOiA4cHg7XHJcbiRib3JkZXItcmFkaXVzLWxnOiAxMnB4O1xyXG4kYm9yZGVyLXJhZGl1cy14bDogMjBweDtcclxuJGJvcmRlci1yYWRpdXMtcGlsbDogOTk5OXB4O1xyXG4kYm9yZGVyLXJhZGl1cy1jaXJjbGU6IDUwJTtcclxuXHJcbi8vIERlc2lnbiBUb2tlbnMgLSBCb3ggU2hhZG93XHJcbiRib3gtc2hhZG93LXNtOiAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcclxuJGJveC1zaGFkb3ctbWQ6IDAgNHB4IDZweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMCAycHggNHB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjA2KTtcclxuJGJveC1zaGFkb3ctbGc6IDAgMTBweCAxNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDRweCA2cHggLTJweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xyXG4kYm94LXNoYWRvdy1jYXJkOiAwIDJweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4wNCk7XHJcbiRib3gtc2hhZG93LWNhcmQtaG92ZXI6IDAgOHB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjA4KTtcclxuXHJcbi8vIEFjY2VudCBDb2xvcnNcclxuJHNlY29uZGFyeS1vZmZzZXQtY29sb3IxOiAjZmZkNjc0O1xyXG4kc2Vjb25kYXJ5LW9mZnNldC1jb2xvcjI6ICNmZmM5NDc7XHJcbiRzZWNvbmRhcnktb2Zmc2V0LWNvbG9yMzogI2ZmYjMwMDtcclxuXHJcblxyXG4vLyBHcmF5cyAmIEJhY2tncm91bmRzXHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjE6ICNmZmZmZmY7XHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjI6ICNhNGE0YTQ7IC8vIEdyYXkgdGV4dFxyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3IzOiAjZjNmM2YzOyAvLyBMaWdodCBiYWNrZ3JvdW5kXHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjQ6ICNlZmVmZWY7IC8vIENhcmQgYmFja2dyb3VuZFxyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3I1OiB3aGl0ZTtcclxuJGJvcmRlci1jb2xvcjogI2U1ZTdlYjtcclxuJGNhcmQtb2RkOiAjZGVlMmU2O1xyXG4kYmFja2dyb3VuZC1jb2xvcjogI2YzZjNmMztcclxuLy8gVGhlbWUgQ29sb3JzIChNYXRjaGVzIHN0eWxlcy5zY3NzKVxyXG4kaW5mby1jb2xvcjogI2E0YTRhNDtcclxuJHRleHQtZGFyazogIzFhMWExYTtcclxuLy8gVGhlbWUgQ29sb3JzXHJcbiRwcmltYXJ5LWNvbG9yOiAjZTYyODQxO1xyXG4kc2Vjb25kYXJ5LWNvbG9yOiAjMTVhMjkyO1xyXG4kYmFja2Ryb3AtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcclxuLy8gU2VtYW50aWMgQ29sb3JzIChTdGFuZGFyZGl6ZWQpXHJcbiRjb2xvci1zdWNjZXNzOiAjNTJjNDFhO1xyXG4kY29sb3Itc3VjY2Vzcy1iZzogI2Y2ZmZlZDtcclxuJGNvbG9yLXN1Y2Nlc3MtYm9yZGVyOiAjYjdlYjhmO1xyXG5cclxuJGNvbG9yLXdhcm5pbmc6ICNmYWFkMTQ7XHJcbiRjb2xvci13YXJuaW5nLWJnOiAjZmZmN2U2O1xyXG4kY29sb3Itd2FybmluZy1ib3JkZXI6ICNmZmU1OGY7XHJcblxyXG4kY29sb3ItZXJyb3I6ICNmZjRkNGY7XHJcbiRjb2xvci1lcnJvci1iZzogI2ZmZjFmMDtcclxuJGNvbG9yLWVycm9yLWJvcmRlcjogI2ZmY2NjNztcclxuXHJcbiRjb2xvci1pbmZvOiAjMTg5MGZmO1xyXG4kY29sb3ItaW5mby1iZzogI2U2ZjdmZjtcclxuJGNvbG9yLWluZm8tYm9yZGVyOiAjOTFkNWZmO1xyXG5cclxuLy8gQ1NTIFZhcmlhYmxlcyBmb3IgUnVudGltZSBUaGVtaW5nXHJcbjpyb290IHtcclxuICAtLWNvbG9yLXByaW1hcnk6ICN7JHByaW1hcnktY29sb3IxfTtcclxuICAtLWNvbG9yLXNlY29uZGFyeTogI3skc2Vjb25kYXJ5LWNvbG9yM307XHJcbiAgLS1jb2xvci1iYWNrZ3JvdW5kR3JleTogI3skYmFja2dyb3VuZC1jb2xvcn07XHJcbiAgLS1jb2xvci10ZXh0OiAjeyR0ZXh0UHJpbWFyeX07XHJcbn0iLCJAdXNlICcvc3JjL3N0eWxlcy90aGVtZS9taXhpbnMnIGFzIG1peGluO1xyXG5AdXNlICcvc3JjL3N0eWxlcy90aGVtZS92YXJpYWJsZScgYXMgdmFyO1xyXG5cclxuLm9yZy1saXN0LWNvbnRhaW5lciB7XHJcbiAgYW5pbWF0aW9uOiBmYWRlSW4gMC4zcyBlYXNlO1xyXG59XHJcblxyXG4vLyBPcmdhbml6YXRpb24gTGlzdCBMYXlvdXQgKEhvcml6b250YWwgQ2FyZHMpXHJcbi5vcmctbGlzdCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMXJlbTtcclxuICBwYWRkaW5nOiAwLjVyZW0gMDtcclxufVxyXG5cclxuLy8gSW5kaXZpZHVhbCBPcmdhbml6YXRpb24gQ2FyZCAoSG9yaXpvbnRhbClcclxuLm9yZy1pdGVtLWNhcmQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogMXJlbSAxLjVyZW07XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcclxuICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjAyKTtcclxuICBnYXA6IDEuNXJlbTtcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XHJcbiAgICBib3JkZXItY29sb3I6IHZhci4kcHJpbWFyeS1jb2xvcjM7XHJcbiAgICBib3gtc2hhZG93OiAwIDhweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4wOCk7XHJcbiAgfVxyXG5cclxuICAvLyBBdmF0YXIgU2VjdGlvblxyXG4gIC5vcmctYXZhdGFyLXNlY3Rpb24ge1xyXG4gICAgZmxleC1zaHJpbms6IDA7XHJcblxyXG4gICAgLm9yZy1hdmF0YXIge1xyXG4gICAgICB3aWR0aDogNTZweDtcclxuICAgICAgaGVpZ2h0OiA1NnB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIuJHByaW1hcnktY29sb3IzIDAlLCB2YXIuJHByaW1hcnktY29sb3IxIDEwMCUpO1xyXG4gICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcblxyXG4gICAgICAuYXZhdGFyLWltZyB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBJbmZvIFNlY3Rpb25cclxuICAub3JnLWluZm8tc2VjdGlvbiB7XHJcbiAgICBmbGV4LWdyb3c6IDE7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGdhcDogMC41cmVtO1xyXG4gICAgbWluLXdpZHRoOiAwOyAvLyBQcmV2ZW50IGZsZXggb3ZlcmZsb3cgZm9yIHRydW5jYXRpb25cclxuXHJcbiAgICAub3JnLWhlYWRlciB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGdhcDogMXJlbTtcclxuICAgICAgZmxleC13cmFwOiB3cmFwO1xyXG5cclxuICAgICAgLm9yZy1uYW1lIHtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjFyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogdmFyLiRwcmltYXJ5LWNvbG9yMjtcclxuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5sb2NhdGlvbi1iYWRnZSB7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBnYXA6IDRweDtcclxuICAgICAgICBmb250LXNpemU6IDAuNzVyZW07XHJcbiAgICAgICAgY29sb3I6ICM3MTgwOTY7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZmFmYztcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZWRmMmY3O1xyXG4gICAgICAgIHBhZGRpbmc6IDJweCA4cHg7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG5cclxuICAgICAgICBtYXQtaWNvbiB7XHJcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgICB3aWR0aDogMTRweDtcclxuICAgICAgICAgIGhlaWdodDogMTRweDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAub3JnLWRldGFpbHMge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBnYXA6IDEuNXJlbTtcclxuICAgICAgZmxleC13cmFwOiB3cmFwO1xyXG5cclxuICAgICAgLmRldGFpbC1pdGVtIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgZ2FwOiA2cHg7XHJcbiAgICAgICAgY29sb3I6ICM2NDc0OGI7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgICAgICAgbWF4LXdpZHRoOiAyMDBweDtcclxuXHJcbiAgICAgICAgbWF0LWljb24ge1xyXG4gICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgICAgICAgd2lkdGg6IDE4cHg7XHJcbiAgICAgICAgICBoZWlnaHQ6IDE4cHg7XHJcbiAgICAgICAgICBjb2xvcjogIzk0YTNiODtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5jaGlwLWdyb3VwIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGdhcDogMC43NXJlbTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQ2hpcHMgU3R5bGluZ1xyXG4gIC5jaGlwIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogNnB4O1xyXG4gICAgcGFkZGluZzogNHB4IDEwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICBmb250LXNpemU6IDAuNzVyZW07XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcblxyXG4gICAgbWF0LWljb24ge1xyXG4gICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgIHdpZHRoOiAxNHB4O1xyXG4gICAgICBoZWlnaHQ6IDE0cHg7XHJcbiAgICB9XHJcblxyXG4gICAgJi5jYWZldGVyaWEtY2hpcCB7XHJcbiAgICAgIGNvbG9yOiB2YXIuJHNlY29uZGFyeS1jb2xvcjtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIuJHNlY29uZGFyeS1jb2xvciwgMC4wOCk7XHJcblxyXG4gICAgICAmOmhvdmVyIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhci4kc2Vjb25kYXJ5LWNvbG9yLCAwLjE1KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICYucG9jLWNoaXAge1xyXG4gICAgICBjb2xvcjogdmFyLiRwcmltYXJ5LWNvbG9yMTtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIuJHByaW1hcnktY29sb3IxLCAwLjA4KTtcclxuXHJcbiAgICAgICY6aG92ZXIge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyLiRwcmltYXJ5LWNvbG9yMSwgMC4xNSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEFjdGlvbiBTZWN0aW9uXHJcbiAgLm9yZy1hY3Rpb24tc2VjdGlvbiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogMC41cmVtO1xyXG5cclxuICAgIC52aWV3LWJ0biB7XHJcbiAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjZjhmYWZjO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgIGNvbG9yOiAjOTRhM2I4O1xyXG5cclxuICAgICAgbWF0LWljb24ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgICB3aWR0aDogMThweDtcclxuICAgICAgICBoZWlnaHQ6IDE4cHg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICY6aG92ZXIge1xyXG4gICAgICAgIGJhY2tncm91bmQ6IHZhci4kcHJpbWFyeS1jb2xvcjE7XHJcbiAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSh2YXIuJHByaW1hcnktY29sb3IxLCAwLjIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmhhcmQtZGVsZXRlLWJ0biB7XHJcbiAgICAgIGNvbG9yOiAjZGMyNjI2O1xyXG5cclxuICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgjZGMyNjI2LCAwLjEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLnJlc3RvcmUtYnRuIHtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMjBweCAhaW1wb3J0YW50O1xyXG4gICAgICBwYWRkaW5nOiAwIDE2cHggIWltcG9ydGFudDtcclxuICAgICAgaGVpZ2h0OiAzNnB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcblxyXG4gICAgICBtYXQtaWNvbiB7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA0cHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgICAgIHdpZHRoOiAxOHB4O1xyXG4gICAgICAgIGhlaWdodDogMThweDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gUmVzcG9uc2l2ZSBsYXlvdXRcclxuQG1lZGlhKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAub3JnLWl0ZW0tY2FyZCB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XHJcbiAgICBnYXA6IDFyZW07XHJcbiAgICBwYWRkaW5nOiAxLjI1cmVtO1xyXG5cclxuICAgIC5vcmctYXZhdGFyLXNlY3Rpb24ge1xyXG4gICAgICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xyXG4gICAgfVxyXG5cclxuICAgIC5vcmctaW5mby1zZWN0aW9uIHtcclxuICAgICAgLm9yZy1kZXRhaWxzIHtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgIGdhcDogMC43NXJlbTtcclxuXHJcbiAgICAgICAgLmNoaXAtZ3JvdXAge1xyXG4gICAgICAgICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5vcmctYWN0aW9uLXNlY3Rpb24ge1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMWY1Zjk7XHJcbiAgICAgIHBhZGRpbmctdG9wOiAwLjc1cmVtO1xyXG4gICAgICBtYXJnaW4tdG9wOiAwLjVyZW07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBFbXB0eSBTdGF0ZVxyXG4uZW1wdHktc3RhdGUtY2FyZCB7XHJcbiAgcGFkZGluZzogM3JlbTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcclxuICBib3gtc2hhZG93OiB2YXIuJGJveC1zaGFkb3ctc207XHJcblxyXG4gIC5lbXB0eS1jb250ZW50IHtcclxuICAgIG1hdC1pY29uIHtcclxuICAgICAgZm9udC1zaXplOiA0OHB4O1xyXG4gICAgICB3aWR0aDogNDhweDtcclxuICAgICAgaGVpZ2h0OiA0OHB4O1xyXG4gICAgICBjb2xvcjogI2NiZDVlMDtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICAgIH1cclxuXHJcbiAgICBoMyB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgY29sb3I6ICMyZDM3NDg7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcclxuICAgIH1cclxuXHJcbiAgICBwIHtcclxuICAgICAgY29sb3I6ICM3MTgwOTY7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4uY3VzdG9tLXBhZ2luYXRvciB7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgbWFyZ2luLXRvcDogMXJlbTtcclxufVxyXG5cclxuLy8gTW9kYWwgU3R5bGVzIChLZXB0IHNhbWUgYXMgYmVmb3JlKVxyXG4uY3VzdG9tLWJhY2tkcm9wIHtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgaW5zZXQ6IDA7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjUpO1xyXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig0cHgpO1xyXG4gIHotaW5kZXg6IDk5ODtcclxufVxyXG5cclxuLmN1c3RvbS1tb2RhbCB7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIHRvcDogNTAlO1xyXG4gIGxlZnQ6IDUwJTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuICB3aWR0aDogODUlO1xyXG4gIG1heC13aWR0aDogOTAwcHg7XHJcbiAgbWF4LWhlaWdodDogODB2aDtcclxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICBib3JkZXItcmFkaXVzOiAxNnB4O1xyXG4gIGJveC1zaGFkb3c6IDAgMjVweCA1MHB4IC0xMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XHJcbiAgei1pbmRleDogOTk5O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cclxuICAubW9kYWwtaGVhZGVyIHtcclxuICAgIHBhZGRpbmc6IDEuMjVyZW0gMS41cmVtO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UyZThmMDtcclxuICAgIGJhY2tncm91bmQ6ICNmOGY5ZmE7XHJcblxyXG4gICAgaDMge1xyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgY29sb3I6IHZhci4kcHJpbWFyeS1jb2xvcjI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAubW9kYWwtYm9keSB7XHJcbiAgICBwYWRkaW5nOiAxcmVtO1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxuICAgIGZsZXg6IDE7XHJcbiAgfVxyXG59XHJcblxyXG4ubW9kZXJuLXRhYmxlIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBib3JkZXItY29sbGFwc2U6IHNlcGFyYXRlO1xyXG4gIGJvcmRlci1zcGFjaW5nOiAwIDhweDtcclxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuXHJcbiAgLnRhYmxlLWhlYWRlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIuJHByaW1hcnktY29sb3IxO1xyXG5cclxuICAgIHRoLm1hdC1tZGMtaGVhZGVyLWNlbGwge1xyXG4gICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICAgIGZvbnQtc2l6ZTogMC43NXJlbTtcclxuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xyXG4gICAgICBwYWRkaW5nOiAxMnB4IDE2cHg7XHJcbiAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgIH1cclxuXHJcbiAgICB0aDpmaXJzdC1jaGlsZCB7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweCAwIDAgOHB4O1xyXG4gICAgfVxyXG5cclxuICAgIHRoOmxhc3QtY2hpbGQge1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAwIDhweCA4cHggMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC50YWJsZS1yb3cge1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjA2KTtcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XHJcblxyXG4gICAgJjpob3ZlciB7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcclxuICAgICAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGQge1xyXG4gICAgICBwYWRkaW5nOiAxMnB4IDE2cHg7XHJcbiAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgIH1cclxuXHJcbiAgICB0ZDpmaXJzdC1jaGlsZCB7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweCAwIDAgOHB4O1xyXG4gICAgfVxyXG5cclxuICAgIHRkOmxhc3QtY2hpbGQge1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAwIDhweCA4cHggMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC50YWJsZS1jZWxsIHtcclxuICAgIG1heC13aWR0aDogMTUwcHg7XHJcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gIH1cclxufVxyXG5cclxuLnJvdy1jaGlwIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiA0cHg7XHJcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG59XHJcblxyXG4uaWNvbi1jaGVjayB7XHJcbiAgY29sb3I6ICMzOGExNjkgIWltcG9ydGFudDtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgd2lkdGg6IDE4cHg7XHJcbiAgaGVpZ2h0OiAxOHB4O1xyXG59XHJcblxyXG4uaWNvbi1jcm9zcyB7XHJcbiAgY29sb3I6ICNlNTNlM2UgIWltcG9ydGFudDtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgd2lkdGg6IDE4cHg7XHJcbiAgaGVpZ2h0OiAxOHB4O1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIGZhZGVJbiB7XHJcbiAgZnJvbSB7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDhweCk7XHJcbiAgfVxyXG5cclxuICB0byB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 8897:
/*!***************************************************************!*\
  !*** ./src/app/organization-card/organization-card.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrganizationCardModule: () => (/* binding */ OrganizationCardModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _organization_card_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./organization-card.component */ 65177);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../material.module */ 29099);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);




class OrganizationCardModule {
  static #_ = this.ɵfac = function OrganizationCardModule_Factory(t) {
    return new (t || OrganizationCardModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: OrganizationCardModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_1__.MaterialModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](OrganizationCardModule, {
    declarations: [_organization_card_component__WEBPACK_IMPORTED_MODULE_0__.OrganizationCardComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_1__.MaterialModule],
    exports: [_organization_card_component__WEBPACK_IMPORTED_MODULE_0__.OrganizationCardComponent]
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

/***/ 36326:
/*!**********************************!*\
  !*** ./src/pipes/filter.pipe.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ManualFilterPipe: () => (/* binding */ ManualFilterPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

class ManualFilterPipe {
  transform(itemList, searchText, key) {
    if (!itemList) {
      return [];
    }
    ;
    if (!searchText) {
      return itemList;
    }
    ;
    const filterList = [];
    if (itemList.length > 0) {
      searchText = searchText.toLowerCase();
      itemList.forEach(item => {
        if (typeof key !== 'undefined') {
          if (item[key].toString().toLowerCase().indexOf(searchText) > -1) {
            filterList.push(item);
          }
        } else {
          const propValueList = Object.keys(item).map(key1 => item[key1]);
          let itemFound = false;
          propValueList.forEach(value => {
            if (value && value.toString().toLowerCase().indexOf(searchText) > -1) {
              itemFound = true;
            }
          });
          if (itemFound) {
            filterList.push(item);
          }
        }
      });
    }
    return filterList;
  }
  static #_ = this.ɵfac = function ManualFilterPipe_Factory(t) {
    return new (t || ManualFilterPipe)();
  };
  static #_2 = this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
    name: "filter",
    type: ManualFilterPipe,
    pure: true
  });
}

/***/ }),

/***/ 19193:
/*!**********************************!*\
  !*** ./src/pipes/pipe.module.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomPipeModule: () => (/* binding */ CustomPipeModule)
/* harmony export */ });
/* harmony import */ var _filter_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter.pipe */ 36326);
/* harmony import */ var _sort_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sort.pipe */ 17611);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);



class CustomPipeModule {
  static #_ = this.ɵfac = function CustomPipeModule_Factory(t) {
    return new (t || CustomPipeModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: CustomPipeModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({});
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](CustomPipeModule, {
    declarations: [_sort_pipe__WEBPACK_IMPORTED_MODULE_1__.ArraySortPipe, _filter_pipe__WEBPACK_IMPORTED_MODULE_0__.ManualFilterPipe],
    exports: [_sort_pipe__WEBPACK_IMPORTED_MODULE_1__.ArraySortPipe, _filter_pipe__WEBPACK_IMPORTED_MODULE_0__.ManualFilterPipe]
  });
})();

/***/ }),

/***/ 17611:
/*!********************************!*\
  !*** ./src/pipes/sort.pipe.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArraySortPipe: () => (/* binding */ ArraySortPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

class ArraySortPipe {
  transform(array, field, order) {
    if (!Array.isArray(array)) {
      return array;
    }
    const listorder = order ? order : 1;
    array.sort((a, b) => {
      if (a[field] < b[field]) {
        return 1 * listorder;
      } else if (a[field] > b[field]) {
        return -1 * listorder;
      } else {
        return 0;
      }
    });
    return array;
  }
  static #_ = this.ɵfac = function ArraySortPipe_Factory(t) {
    return new (t || ArraySortPipe)();
  };
  static #_2 = this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
    name: "sort",
    type: ArraySortPipe,
    pure: true
  });
}

/***/ })

}]);
//# sourceMappingURL=src_app_deskdyne-components_search-organization_search-organization_module_ts-src_config_orde-e91613.js.map