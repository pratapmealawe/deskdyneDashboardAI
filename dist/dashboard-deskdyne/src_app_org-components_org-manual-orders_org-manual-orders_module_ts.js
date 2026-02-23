"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_org-components_org-manual-orders_org-manual-orders_module_ts"],{

/***/ 63073:
/*!**************************************************************************************!*\
  !*** ./src/app/org-components/org-manual-orders/org-manual-orders-routing.module.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgManualOrdersRoutingModule: () => (/* binding */ OrgManualOrdersRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _org_manual_orders_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-manual-orders.component */ 81887);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: "",
  component: _org_manual_orders_component__WEBPACK_IMPORTED_MODULE_0__.OrgManualOrdersComponent
}];
class OrgManualOrdersRoutingModule {
  static #_ = this.ɵfac = function OrgManualOrdersRoutingModule_Factory(t) {
    return new (t || OrgManualOrdersRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: OrgManualOrdersRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](OrgManualOrdersRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 81887:
/*!*********************************************************************************!*\
  !*** ./src/app/org-components/org-manual-orders/org-manual-orders.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgManualOrdersComponent: () => (/* binding */ OrgManualOrdersComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

class OrgManualOrdersComponent {
  static #_ = this.ɵfac = function OrgManualOrdersComponent_Factory(t) {
    return new (t || OrgManualOrdersComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: OrgManualOrdersComponent,
    selectors: [["app-org-manual-orders"]],
    decls: 2,
    vars: 0,
    template: function OrgManualOrdersComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "org-manual-orders works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 83528:
/*!******************************************************************************!*\
  !*** ./src/app/org-components/org-manual-orders/org-manual-orders.module.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgManualOrdersModule: () => (/* binding */ OrgManualOrdersModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _org_manual_orders_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-manual-orders-routing.module */ 63073);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);



class OrgManualOrdersModule {
  static #_ = this.ɵfac = function OrgManualOrdersModule_Factory(t) {
    return new (t || OrgManualOrdersModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: OrgManualOrdersModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _org_manual_orders_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgManualOrdersRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](OrgManualOrdersModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _org_manual_orders_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgManualOrdersRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_org-components_org-manual-orders_org-manual-orders_module_ts.js.map