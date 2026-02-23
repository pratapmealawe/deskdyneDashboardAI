"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_outlet_master-categories_master-categories_module_ts"],{

/***/ 66355:
/*!******************************************************************************!*\
  !*** ./src/app/outlet/master-categories/master-categories-routing.module.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MasterCategoriesRoutingModule: () => (/* binding */ MasterCategoriesRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _master_categories_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./master-categories.component */ 29674);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _master_categories_component__WEBPACK_IMPORTED_MODULE_0__.MasterCategoriesComponent
}];
class MasterCategoriesRoutingModule {
  static #_ = this.ɵfac = function MasterCategoriesRoutingModule_Factory(t) {
    return new (t || MasterCategoriesRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: MasterCategoriesRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](MasterCategoriesRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 29674:
/*!*************************************************************************!*\
  !*** ./src/app/outlet/master-categories/master-categories.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MasterCategoriesComponent: () => (/* binding */ MasterCategoriesComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 28849);




class MasterCategoriesComponent {
  constructor(apiMainService) {
    this.apiMainService = apiMainService;
  }
  ngOnInit() {
    this.fetchCategories();
  }
  fetchCategories() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const res = yield _this.apiMainService.fetchCategories();
        console.log(res);
        if (res) {
          _this.allCategories = res;
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }
  saveCategories() {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const categories = {
          categories: _this2.categoryValues.split(','),
          subCategories: _this2.subCategoryValues.split(',')
        };
        const res = yield _this2.apiMainService.saveCategories(categories);
      } catch (error) {
        console.log(error);
      }
    })();
  }
  static #_ = this.ɵfac = function MasterCategoriesComponent_Factory(t) {
    return new (t || MasterCategoriesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__.ApiMainService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: MasterCategoriesComponent,
    selectors: [["app-master-categories"]],
    decls: 14,
    vars: 2,
    consts: [[1, "row", "bgsidepadding3"], [1, "col-12"], [1, "form-group"], ["for", "categories"], ["type", "text", "id", "categories", "placeholder", "Enter Categories", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "subcategories"], ["type", "text", "id", "subcategories", "placeholder", "Enter Sub Categories", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-3"], [1, "btn", "btn-primary", "btn-sm", 3, "click"]],
    template: function MasterCategoriesComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Enter Categories(comma separated)");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function MasterCategoriesComponent_Template_input_ngModelChange_5_listener($event) {
          return ctx.categoryValues = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 1)(7, "div", 2)(8, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Enter Sub Categories(comma separated)");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function MasterCategoriesComponent_Template_input_ngModelChange_10_listener($event) {
          return ctx.subCategoryValues = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 7)(12, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function MasterCategoriesComponent_Template_button_click_12_listener() {
          return ctx.saveCategories();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "Submit");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.categoryValues);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.subCategoryValues);
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 68388:
/*!**********************************************************************!*\
  !*** ./src/app/outlet/master-categories/master-categories.module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MasterCategoriesModule: () => (/* binding */ MasterCategoriesModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _master_categories_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./master-categories-routing.module */ 66355);
/* harmony import */ var _master_categories_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./master-categories.component */ 29674);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);





class MasterCategoriesModule {
  static #_ = this.ɵfac = function MasterCategoriesModule_Factory(t) {
    return new (t || MasterCategoriesModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: MasterCategoriesModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _master_categories_routing_module__WEBPACK_IMPORTED_MODULE_0__.MasterCategoriesRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](MasterCategoriesModule, {
    declarations: [_master_categories_component__WEBPACK_IMPORTED_MODULE_1__.MasterCategoriesComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _master_categories_routing_module__WEBPACK_IMPORTED_MODULE_0__.MasterCategoriesRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_outlet_master-categories_master-categories_module_ts.js.map