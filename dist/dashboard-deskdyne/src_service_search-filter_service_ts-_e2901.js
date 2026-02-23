"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_service_search-filter_service_ts-_e2901"],{

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
//# sourceMappingURL=src_service_search-filter_service_ts-_e2901.js.map