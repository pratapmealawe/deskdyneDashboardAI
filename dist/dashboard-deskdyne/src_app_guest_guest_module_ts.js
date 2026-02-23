"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_guest_guest_module_ts"],{

/***/ 33689:
/*!***********************************************!*\
  !*** ./src/app/guest/guest-routing.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GuestRoutingModule: () => (/* binding */ GuestRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);



const routes = [{
  path: '',
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_guest_admin_admin_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./admin/admin.component */ 71875)).then(c => c.AdminComponent)
}];
class GuestRoutingModule {
  static #_ = this.ɵfac = function GuestRoutingModule_Factory(t) {
    return new (t || GuestRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: GuestRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](GuestRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
})();

/***/ }),

/***/ 52207:
/*!***************************************!*\
  !*** ./src/app/guest/guest.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GuestModule: () => (/* binding */ GuestModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _guest_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./guest-routing.module */ 33689);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);



class GuestModule {
  static #_ = this.ɵfac = function GuestModule_Factory(t) {
    return new (t || GuestModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: GuestModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _guest_routing_module__WEBPACK_IMPORTED_MODULE_0__.GuestRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](GuestModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _guest_routing_module__WEBPACK_IMPORTED_MODULE_0__.GuestRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_guest_guest_module_ts.js.map