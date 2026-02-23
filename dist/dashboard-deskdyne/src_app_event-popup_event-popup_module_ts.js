"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_event-popup_event-popup_module_ts"],{

/***/ 59679:
/*!***********************************************************!*\
  !*** ./src/app/event-popup/event-popup-routing.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventPopupRoutingModule: () => (/* binding */ EventPopupRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);



const routes = [{
  path: '',
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_exceljs_dist_exceljs_min_js"), __webpack_require__.e("default-src_app_common-outlet-cafe-select_common-outlet-cafe-select_module_ts"), __webpack_require__.e("default-node_modules_pdfmake_build_pdfmake_js-node_modules_pdfmake_build_vfs_fonts_js"), __webpack_require__.e("default-src_service_excel_service_ts"), __webpack_require__.e("default-node_modules_highcharts_highcharts_js"), __webpack_require__.e("default-src_app_order-card_order-card_module_ts"), __webpack_require__.e("default-src_app_pdfupload_pdfupload_component_ts"), __webpack_require__.e("default-src_app_organization-view_organization-view_module_ts"), __webpack_require__.e("default-src_app_org-components_org-reviews_org-order_org-order_module_ts"), __webpack_require__.e("default-src_app_org-components_org-reviews_org-reviews_module_ts"), __webpack_require__.e("default-src_app_org-components_org-orders_org-orders_module_ts"), __webpack_require__.e("default-src_app_outlet_outlet-view_outlet-view_module_ts"), __webpack_require__.e("src_app_event-popup_search-event_search-event_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./search-event/search-event.module */ 95805)).then(m => m.SearchEventModule)
}];
class EventPopupRoutingModule {
  static #_ = this.ɵfac = function EventPopupRoutingModule_Factory(t) {
    return new (t || EventPopupRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: EventPopupRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](EventPopupRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
})();

/***/ }),

/***/ 19569:
/*!***************************************************!*\
  !*** ./src/app/event-popup/event-popup.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventPopupModule: () => (/* binding */ EventPopupModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _event_popup_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event-popup-routing.module */ 59679);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../material.module */ 29099);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);





class EventPopupModule {
  static #_ = this.ɵfac = function EventPopupModule_Factory(t) {
    return new (t || EventPopupModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: EventPopupModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _event_popup_routing_module__WEBPACK_IMPORTED_MODULE_0__.EventPopupRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _material_module__WEBPACK_IMPORTED_MODULE_1__.MaterialModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](EventPopupModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _event_popup_routing_module__WEBPACK_IMPORTED_MODULE_0__.EventPopupRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _material_module__WEBPACK_IMPORTED_MODULE_1__.MaterialModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_event-popup_event-popup_module_ts.js.map