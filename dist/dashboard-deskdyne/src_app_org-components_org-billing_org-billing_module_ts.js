"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_org-components_org-billing_org-billing_module_ts"],{

/***/ 20121:
/*!**************************************************************************!*\
  !*** ./src/app/org-components/org-billing/org-billing-routing.module.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgBillingRoutingModule: () => (/* binding */ OrgBillingRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _org_billing_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-billing.component */ 95342);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: "",
  component: _org_billing_component__WEBPACK_IMPORTED_MODULE_0__.OrgBillingComponent
}];
class OrgBillingRoutingModule {
  static #_ = this.ɵfac = function OrgBillingRoutingModule_Factory(t) {
    return new (t || OrgBillingRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: OrgBillingRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](OrgBillingRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 95342:
/*!*********************************************************************!*\
  !*** ./src/app/org-components/org-billing/org-billing.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgBillingComponent: () => (/* binding */ OrgBillingComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/service/local-storage.service */ 48798);
/* harmony import */ var src_service_search_filter_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/service/search-filter.service */ 43915);




class OrgBillingComponent {
  constructor(apiMainService, localStorageService, searchService) {
    this.apiMainService = apiMainService;
    this.localStorageService = localStorageService;
    this.searchService = searchService;
  }
  ngOnInit() {
    this.initFunc();
  }
  ngOnChanges(changes) {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.initFunc();
    }
  }
  initFunc() {
    this.orgAdmin = this.adminOrg ? {
      orgDetails: this.adminOrg
    } : this.localStorageService.getCacheData('ADMIN_PROFILE');
  }
  static #_ = this.ɵfac = function OrgBillingComponent_Factory(t) {
    return new (t || OrgBillingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_0__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_1__.LocalStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_service_search_filter_service__WEBPACK_IMPORTED_MODULE_2__.SearchFilterService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: OrgBillingComponent,
    selectors: [["app-org-billing"]],
    inputs: {
      adminOrg: "adminOrg"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵNgOnChangesFeature"]],
    decls: 2,
    vars: 0,
    consts: [[2, "color", "#757575"]],
    template: function OrgBillingComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h3", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "This feature is currently in development and will be available soon.");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 45662:
/*!******************************************************************!*\
  !*** ./src/app/org-components/org-billing/org-billing.module.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgBillingModule: () => (/* binding */ OrgBillingModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _org_billing_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-billing-routing.module */ 20121);
/* harmony import */ var _org_billing_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./org-billing.component */ 95342);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);




class OrgBillingModule {
  static #_ = this.ɵfac = function OrgBillingModule_Factory(t) {
    return new (t || OrgBillingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: OrgBillingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _org_billing_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgBillingRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](OrgBillingModule, {
    declarations: [_org_billing_component__WEBPACK_IMPORTED_MODULE_1__.OrgBillingComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _org_billing_routing_module__WEBPACK_IMPORTED_MODULE_0__.OrgBillingRoutingModule],
    exports: [_org_billing_component__WEBPACK_IMPORTED_MODULE_1__.OrgBillingComponent]
  });
})();

/***/ }),

/***/ 43915:
/*!**********************************************!*\
  !*** ./src/service/search-filter.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchFilterService: () => (/* binding */ SearchFilterService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

class SearchFilterService {
  constructor() {}
  /**
   * Filters data based on the search text and config object
   * @param data The data to be searched through
   * @param config Config object containing keys for filtering
   * @param searchText The search string to match
   * @returns Filtered data array
   */
  searchData(data, config, searchText) {
    const lowercasedSearchText = searchText.toLowerCase();
    return data.filter(item => {
      return config.keys.some(key => {
        if (key.includes('.')) {
          // Handle nested properties (e.g., 'outletList.outletName')
          return this.searchInNestedObject(item, key, lowercasedSearchText);
        } else {
          return item[key]?.toString().toLowerCase().includes(lowercasedSearchText);
        }
      });
    });
  }
  /**
   * Handles searching in nested objects
   * @param obj The object to search within
   * @param key The key (including nested keys) to search for
   * @param searchText The search string
   * @returns True if a match is found
   */
  searchInNestedObject(obj, key, searchText) {
    const keys = key.split('.');
    let value = obj;
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      value = value[k];
      if (!value) {
        return false;
      }
      // If the value is an array and we have more keys to process
      if (Array.isArray(value) && i < keys.length - 1) {
        const remainingKeys = keys.slice(i + 1).join('.');
        // Search through each item in the array
        return value.some(item => this.searchInNestedObject(item, remainingKeys, searchText));
      }
      // If the value is an array at the last key, check each item
      if (Array.isArray(value) && i === keys.length - 1) {
        return value.some(item => item?.toString().toLowerCase().includes(searchText));
      }
    }
    return value.toString().toLowerCase().includes(searchText);
  }
  static #_ = this.ɵfac = function SearchFilterService_Factory(t) {
    return new (t || SearchFilterService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: SearchFilterService,
    factory: SearchFilterService.ɵfac,
    providedIn: 'root'
  });
}

/***/ })

}]);
//# sourceMappingURL=src_app_org-components_org-billing_org-billing_module_ts.js.map