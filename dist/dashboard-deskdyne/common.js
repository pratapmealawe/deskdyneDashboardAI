"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["common"],{

/***/ 16091:
/*!********************************************!*\
  !*** ./src/service/data-format.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataFormatService: () => (/* binding */ DataFormatService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

class DataFormatService {
  constructor() {}
  getformattedOrgList(orglist) {
    const foramttedList = [];
    orglist.forEach(org => {
      org.cafeteriaList.forEach(cafeteria => {
        foramttedList.push({
          key: org.organization_name + ' ' + cafeteria.cafeteria_city + ' ' + cafeteria.cafeteria_name,
          cafeteriaDetails: {
            cafeteria_name: cafeteria.cafeteria_name,
            cafeteria_city: cafeteria.cafeteria_city,
            cafeteria_location: cafeteria.cafeteria_location,
            address1: cafeteria.address1,
            address2: cafeteria.address2,
            landmark: cafeteria.landmark,
            location: cafeteria.location,
            cafeteria_id: cafeteria.cafeteria_id
          },
          organizationDetails: {
            organization_name: org.organization_name,
            organizationId: org._id,
            city: org.city,
            location: org.location
          }
        });
      });
    });
    return foramttedList;
  }
  static #_ = this.ɵfac = function DataFormatService_Factory(t) {
    return new (t || DataFormatService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: DataFormatService,
    factory: DataFormatService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 87381:
/*!****************************************!*\
  !*** ./src/service/utility.service.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UtilityService: () => (/* binding */ UtilityService)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apiService/apiMain.service */ 7192);
/* harmony import */ var src_service_toaster_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/service/toaster.service */ 19586);
/* harmony import */ var _sendDataToComponent_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sendDataToComponent.service */ 16324);





class UtilityService {
  constructor(apiMainService, toasterService, sendDataToComponent) {
    this.apiMainService = apiMainService;
    this.toasterService = toasterService;
    this.sendDataToComponent = sendDataToComponent;
  }
  getCurrentOutletOrdersCount(showAlarm) {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        clearTimeout(_this.currentOrderCounter);
        let orderList = {};
        const response = yield _this.apiMainService.getCurrentOutletOrdersCount();
        orderList = response;
        if (orderList && orderList.newOrder > 0 && showAlarm) {
          // const msg = 'These are some new orders placed';
        }
        const self = _this;
        _this.currentOrderCounter = setTimeout(() => {
          self.getCurrentOutletOrdersCount(true);
        }, 1000 * 60 * 2);
        _this.sendDataToComponent.publish('UPDATE_ORDER_PAGE', orderList);
        return orderList;
      } catch (error) {
        console.log('Error while requestPermission ', error);
      }
    })();
  }
  getCurrentB2BOrdersCount(showAlarm) {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        clearTimeout(_this2.currentOrderCounter);
        let orderList = {};
        const response = yield Promise.all([_this2.apiMainService.getCurrentB2BOrdersCount(), _this2.apiMainService.getCurrentDailyOrdersCount(), _this2.apiMainService.getDailyFoodOrdersCount()]);
        if (response[0] && response[1] && response[2]) {
          orderList.b2bBulk = response[0];
          orderList.dailyBulk = response[1];
          orderList.empVote = response[2];
        } else if (response[0] && response[1]) {
          orderList.b2bBulk = response[0];
          orderList.dailyBulk = response[1];
        } else if (response[1] && response[2]) {
          orderList.dailyBulk = response[1];
          orderList.empVote = response[2];
        } else if (response[0] && response[2]) {
          orderList.b2bBulk = response[0];
          orderList.empVote = response[2];
        } else if (response[0]) {
          orderList.b2bBulk = response[0];
        } else if (response[1]) {
          orderList.dailyBulk = response[1];
        } else if (response[2]) {
          orderList.empVote = response[2];
        }
        //getCurrentSubscriptionCount
        if (orderList && orderList.b2bBulk.placed > 0 && showAlarm) {
          const msg = 'These are some new orders placed';
          // this.webNotificationService.showNotification(msg);
          // this.toasterService.alarm(msg);
        }

        const self = _this2;
        _this2.currentOrderCounter = setTimeout(() => {
          console.log('getCurrentB2BOrdersCount UtilityService');
          self.getCurrentB2BOrdersCount(true);
        }, 1000 * 60 * 2);
        _this2.sendDataToComponent.publish('UPDATE_ORDER_PAGE', orderList);
        return orderList;
      } catch (error) {
        console.log('Error while requestPermission ', error);
      }
    })();
  }
  static #_ = this.ɵfac = function UtilityService_Factory(t) {
    return new (t || UtilityService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](src_service_toaster_service__WEBPACK_IMPORTED_MODULE_2__.ToasterService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_sendDataToComponent_service__WEBPACK_IMPORTED_MODULE_3__.SendDataToComponent));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: UtilityService,
    factory: UtilityService.ɵfac,
    providedIn: 'root'
  });
}

/***/ })

}]);
//# sourceMappingURL=common.js.map