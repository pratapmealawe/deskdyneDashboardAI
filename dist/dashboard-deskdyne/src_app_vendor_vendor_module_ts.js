"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_vendor_vendor_module_ts"],{

/***/ 46160:
/*!*************************************************!*\
  !*** ./src/app/vendor/vendor-routing.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VendorRoutingModule: () => (/* binding */ VendorRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _vendor_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vendor.component */ 92329);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _vendor_component__WEBPACK_IMPORTED_MODULE_0__.VendorComponent
}];
class VendorRoutingModule {
  static #_ = this.ɵfac = function VendorRoutingModule_Factory(t) {
    return new (t || VendorRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: VendorRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](VendorRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 92329:
/*!********************************************!*\
  !*** ./src/app/vendor/vendor.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VendorComponent: () => (/* binding */ VendorComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

class VendorComponent {
  static #_ = this.ɵfac = function VendorComponent_Factory(t) {
    return new (t || VendorComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: VendorComponent,
    selectors: [["app-vendor"]],
    decls: 0,
    vars: 0,
    template: function VendorComponent_Template(rf, ctx) {},
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 99262:
/*!*****************************************!*\
  !*** ./src/app/vendor/vendor.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VendorModule: () => (/* binding */ VendorModule)
/* harmony export */ });
/* harmony import */ var _vendor_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vendor.component */ 92329);
/* harmony import */ var _vendor_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vendor-routing.module */ 46160);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 76101);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);




class VendorModule {
  static #_ = this.ɵfac = function VendorModule_Factory(t) {
    return new (t || VendorModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: VendorModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    providers: [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbActiveModal],
    imports: [_vendor_routing_module__WEBPACK_IMPORTED_MODULE_1__.VendorRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](VendorModule, {
    declarations: [_vendor_component__WEBPACK_IMPORTED_MODULE_0__.VendorComponent],
    imports: [_vendor_routing_module__WEBPACK_IMPORTED_MODULE_1__.VendorRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_vendor_vendor_module_ts.js.map