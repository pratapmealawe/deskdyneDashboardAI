"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_common-components_excel-export_excel-export_module_ts"],{

/***/ 24556:
/*!*******************************************************************************!*\
  !*** ./src/app/common-components/excel-export/excel-export-routing.module.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExcelExportRoutingModule: () => (/* binding */ ExcelExportRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _excel_export_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./excel-export.component */ 35930);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _excel_export_component__WEBPACK_IMPORTED_MODULE_0__.ExcelExportComponent
}];
class ExcelExportRoutingModule {
  static #_ = this.ɵfac = function ExcelExportRoutingModule_Factory(t) {
    return new (t || ExcelExportRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: ExcelExportRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ExcelExportRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 35930:
/*!**************************************************************************!*\
  !*** ./src/app/common-components/excel-export/excel-export.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExcelExportComponent: () => (/* binding */ ExcelExportComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var src_service_excel_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/service/excel.service */ 90921);
/* harmony import */ var src_service_toaster_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/service/toaster.service */ 19586);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/tabs */ 60989);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _common_outlet_cafe_select_common_outlet_cafe_select_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common-outlet-cafe-select/common-outlet-cafe-select.component */ 60627);










function ExcelExportComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](0, "Bulk Event");
  }
}
function ExcelExportComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](0, "Admin Daily");
  }
}
function ExcelExportComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](0, "Mealawe Virtual Cafe");
  }
}
function ExcelExportComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](0, "Emp Poll");
  }
}
class ExcelExportComponent {
  constructor(ddApiMainService, datePipe, excelService, toasterService) {
    this.ddApiMainService = ddApiMainService;
    this.datePipe = datePipe;
    this.excelService = excelService;
    this.toasterService = toasterService;
    this.searchObj = {
      orderType: '',
      fromDate: '',
      toDate: '',
      org_id: ''
    };
    this.headerConfig = {
      mode: 'cafeteria',
      showDateRange: true,
      disableOrg: false,
      requireAll: true
    };
    this.monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  }
  ngOnInit() {
    this.searchObj.orderType = 'allEventBulk';
  }
  onTabChange(event) {
    this.searchObj.orderType = event.tab.textLabel;
  }
  filterSubmitted(event) {
    this.searchObj.org_id = event.org_id;
    this.searchObj.fromDate = event.date_from;
    this.searchObj.toDate = event.date_to;
    this.searchObj.cafeteriaId = event.cafeteria_id;
  }
  searchOrder() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this.filteredList = [];
        let filteredList;
        if (!_this.searchObj.orderType || !_this.searchObj.fromDate || !_this.searchObj.toDate || !_this.searchObj.org_id) {
          _this.toasterService.error(126);
          return;
        }
        if (_this.searchObj.orderType === 'dailyBulk') {
          filteredList = yield _this.ddApiMainService.getAdminDailyBulkOrders(_this.searchObj);
          if (filteredList && filteredList.length > 0) {
            _this.filteredList = filteredList;
            _this.createDailyBulkExcel(filteredList);
          }
        } else if (_this.searchObj.orderType === 'subscriptionPackage') {
          const obj = {
            id: _this.searchObj.org_id,
            fromDate: new Date(_this.searchObj.fromDate),
            toDate: new Date(_this.searchObj.toDate)
          };
          obj.fromDate.setHours(0, 0, 0, 0);
          obj.toDate.setHours(23, 59, 59, 999);
          filteredList = yield _this.ddApiMainService.orgMealPackages(obj);
          if (filteredList && filteredList.length > 0) {
            _this.filteredList = filteredList;
            _this.createPackageExcel(filteredList);
          }
        } else if (_this.searchObj.orderType === 'empPoll') {
          const payload = {
            deliveryStartDate: _this.searchObj.fromDate,
            deliveryEndDate: _this.searchObj.toDate,
            orgId: _this.searchObj.org_id,
            cafeteriaId: _this.searchObj.cafeteriaId
          };
          filteredList = yield _this.ddApiMainService.getCafeteriasPollingList(payload);
          if (filteredList && filteredList.length > 0) {
            _this.filteredList = filteredList;
            _this.createEmpPollExcel(filteredList);
          }
        } else if (_this.searchObj.orderType === 'indEmpPoll') {
          const obj = {
            id: _this.searchObj.org_id,
            fromDate: new Date(_this.searchObj.fromDate),
            toDate: new Date(_this.searchObj.toDate)
          };
          obj.fromDate.setHours(0, 0, 0, 0);
          obj.toDate.setHours(23, 59, 59, 999);
          filteredList = yield _this.ddApiMainService.getOrgEmployeePollingList(obj);
          if (filteredList && filteredList.length > 0) {
            _this.filteredList = filteredList;
            _this.createIndividualExcel(filteredList);
          }
        } else {
          filteredList = yield _this.ddApiMainService.getAdminPastOrders(_this.searchObj);
          if (filteredList && filteredList.length > 0) {
            _this.filteredList = filteredList;
            _this.createBulkEventExcel(filteredList);
          }
        }
      } catch (error) {
        console.log(error);
      }
      console.log(_this.searchObj);
    })();
  }
  createDailyBulkExcel(orderList) {
    let data = [];
    orderList.forEach(order => {
      const currentDate = new Date(order.orderDate);
      const deliveryDate = new Date(order.deliveryDate);
      const location = order.customerLocation?.location || order.customerLocation?.address || '';
      let pin = '';
      if (location) {
        const res = location.match(/\b\d{6}\b/);
        if (res && res.length > 0) {
          pin = res[0];
        } else {
          pin = 'N/A';
        }
      }
      const item = order.itemList && order.itemList.length > 0 ? order.itemList[0] : {};
      const row = {
        "POC Name": order.pocDetails?.pocName || order.pocName || '',
        "POC Phone No": order.pocDetails?.pocPhoneNo || order.pocPhoneNo || '',
        "POC Email Id": order.pocDetails?.pocEmail || order.pocEmail || '',
        "POC ID": order.pocDetails?.pocId || order.pocId || '',
        "POC Role": order.pocDetails?.pocRole || order.pocRole || '',
        "POC Location / Pin Code": pin ? pin : location,
        "Org Name": order.orgName,
        "Org Location": order.orgLocation || '',
        "Order Date": currentDate,
        "Delivery Date": deliveryDate,
        "Meal Name": item.itemName || item.mealConfigName || '',
        "Count": item.count || 0,
        "Cutoff Time": item.cutOffTime || '',
        "Delivery Time From": item.deliveryTimeFrom ? this.datePipe.transform(this.getDateFromTime(item.deliveryTimeFrom), 'shortTime') : '',
        "Delivery Time To": item.deliveryTimeTo ? this.datePipe.transform(this.getDateFromTime(item.deliveryTimeTo), 'shortTime') : '',
        "Delivered Item": item.deliveredItem || 'N/A',
        "Amount Paid To Kitchen": order.itemAmount || 0,
        "Amount + Fixed Delivery": order.amount || 0,
        "Amount without Fixed Delivery": (order.amount || 0) - (order.deliveryCharge || 0),
        "Fixed Delivery Charges": order.deliveryCharge || 0,
        "Delivery paid by mealawe": order.deliveryAmtPaidByMealawe ? order.deliveryAmtPaidByMealawe : 'N/A',
        "Pay Amt To Kitchen": item.payAmtToKitchen || 0,
        "Taxes": order.taxes || 0,
        "Order Status": order.orderstatus || ''
      };
      data.push(row);
    });
    this.excelService.download(data, `admin_bulk_${this.datePipe.transform(this.searchObj.fromDate, 'shortDate')}_TO_${this.datePipe.transform(this.searchObj.toDate, 'shortDate')}`);
  }
  // Helper to convert time string HH:mm to Date object for piping
  getDateFromTime(timeStr) {
    const d = new Date();
    const [hours, minutes] = timeStr.split(':');
    d.setHours(+hours);
    d.setMinutes(+minutes);
    return d;
  }
  createPackageExcel(orderList) {
    console.log('getOrderPackageList....');
    let data = [];
    orderList.forEach(foodPackage => {
      let mealPerdayCount = 1;
      let addonsTotal = 0;
      if (foodPackage.mealTimeLunch && foodPackage.mealTimeDinner) {
        mealPerdayCount = 2;
      }
      foodPackage.mealPackage.addonsList.forEach(addon => {
        if (addon.selected) {
          if (addon.daily) {
            addonsTotal += addon.extraPrice * foodPackage.mealPackage.count * mealPerdayCount * foodPackage.subscriptionDays;
          } else {
            addonsTotal += addon.extraPrice * foodPackage.mealPackage.count * mealPerdayCount * addon.dayCount;
          }
        }
      });
      let mealType;
      if (foodPackage.mealTimeLunch && foodPackage.mealTimeDinner) {
        mealType = 'Lunch & Dinner';
      } else if (foodPackage.mealTimeLunch) {
        mealType = 'Lunch';
      } else if (foodPackage.mealTimeDinner) {
        mealType = 'Dinner';
      } else {
        mealType = 'Breakfast';
      }
      const currentDate = new Date(foodPackage.orderDate);
      const month = currentDate.getMonth() + 1;
      const startDate = new Date(currentDate.getFullYear(), 0, 1);
      const subStartDate = new Date(foodPackage.subscriptionStartDate);
      const subMonth = subStartDate.getMonth() + 1;
      let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
      let weekNumber = Math.ceil(days / 7);
      let subscriptionCount = 1;
      if (foodPackage.mealTimeLunch && foodPackage.mealTimeDinner) {
        subscriptionCount = 2;
      }
      const totalOrders = foodPackage.subscriptionDays * subscriptionCount;
      const deliveryCost = totalOrders * 55;
      const packagingCost = totalOrders * 18;
      const totalAmtReceived = foodPackage.mealaweTotalAmt + foodPackage.moneyWalletPointsUsed;
      const location = foodPackage.customerLocation.location;
      const address = foodPackage.customerLocation.address;
      const packageDiscount = foodPackage.mealPackage.discount ? foodPackage.mealPackage.discount : 0;
      const deskDynePackageDiscount = foodPackage.mealPackage.ddDiscount ? foodPackage.mealPackage.ddDiscount : 0;
      const subsidyAmount = foodPackage.mealPackage.subsidyAmount ? foodPackage.mealPackage.subsidyAmount : 0;
      const subsidyValue = foodPackage.mealPackage.subsidyValue ? foodPackage.mealPackage.subsidyValue : 0;
      const subsidyType = foodPackage.mealPackage.subsidyType ? foodPackage.mealPackage.subsidyType : 0;
      let pin;
      const finalLocation = location ? location : address;
      if (address) {
        const res = address.match(/\b\d{6}\b/);
        if (res && res.length > 0) {
          pin = res[0];
        }
      }
      if (location) {
        const res = location.match(/\b\d{6}\b/);
        if (res && res.length > 0) {
          pin = res[0];
        }
      }
      let totalPaidToKitchen = 0;
      if (foodPackage.dailyOrderList && foodPackage.dailyOrderList.length > 0) {
        foodPackage.dailyOrderList.forEach(dailyOrder => {
          totalPaidToKitchen += dailyOrder.itemAmount;
        });
      }
      let payToKitchenPerMeal = 0;
      if (totalPaidToKitchen) {
        payToKitchenPerMeal = totalPaidToKitchen / totalOrders;
      } else {
        payToKitchenPerMeal = foodPackage.mealPackage.payToKitchenPerMeal;
      }
      const placedAt = foodPackage.statusHistory.find(status => status.orderstatus === 'placed');
      const row = {
        "Customer Name": foodPackage.customerName,
        "Customer Phone No": foodPackage.customerPhoneNo,
        "Customer Email Id": foodPackage.customerEmail,
        "Customer Location / Pin Code": pin ? pin : finalLocation,
        "MealType": mealType,
        "Order Placed At": placedAt ? this.datePipe.transform(placedAt.updatedOn, 'shortTime') : 'N/A',
        "Kitchen Name": foodPackage.kitchenName,
        "Subscription Days": foodPackage.subscriptionDays,
        "No. of Subscription": subscriptionCount,
        "Order Frequency": foodPackage.subscriptionType ? foodPackage.subscriptionType : 'N/A',
        "Total Orders": totalOrders,
        "MealAwe Package Discount": packageDiscount,
        "DeskDyne Package Discount": deskDynePackageDiscount,
        "Subsidy Type": subsidyType,
        "Subsidy Value": subsidyValue,
        "Subsidy Amount": subsidyAmount,
        "Avg Pay To Kitchen Per Meal": payToKitchenPerMeal,
        "Total Paid to Kitchen": totalPaidToKitchen,
        "Delivery Cost(Rs55)": deliveryCost,
        "Packaging Cost(Rs18)": packagingCost,
        "Total Amount Received": totalAmtReceived,
        "Gross Profit": totalAmtReceived - totalPaidToKitchen - deliveryCost - packagingCost,
        "Package Name": foodPackage.mealPackage.packageName,
        "Package Category": foodPackage.mealPackage.packageCategory,
        "Order Date": currentDate.getDate() + '-' + month + '-' + currentDate.getFullYear(),
        "Order Month": this.monthList[new Date(foodPackage.orderDate).getMonth()],
        "Subscription Start Date": subStartDate.getDate() + '-' + subMonth + '-' + subStartDate.getFullYear(),
        "Week No.": weekNumber,
        "Order Status": foodPackage.orderstatus,
        "Package Days": foodPackage.mealPackage.days,
        "Coupon Code": foodPackage.couponCode ? foodPackage.couponCode : 'N/A',
        "Voucher Code": foodPackage.voucherCode ? foodPackage.voucherCode : 'N/A',
        "Order Created By": foodPackage.orderCreatedBy,
        "Cutlery Discount": foodPackage.cutleryDiscount,
        "Package MRP": foodPackage.mealPackage.packagePrice,
        "Package Discount": foodPackage.mealPackage.discount,
        "Base Price": foodPackage.mealPackage.packagePrice - foodPackage.mealPackage.discount,
        "Adonns Total": addonsTotal,
        "Billing Discount": foodPackage.mealaweItemDiscount ? foodPackage.mealaweItemDiscount : 0 + foodPackage.discount + foodPackage.cutleryDiscount + foodPackage.voucherDiscount + foodPackage.couponDiscount + foodPackage.mealaweDeliveryDiscount ? foodPackage.mealaweDeliveryDiscount : 0,
        "Taxes": foodPackage.taxes,
        "Amount Paid By User-Taxes": totalAmtReceived - foodPackage.taxes,
        "Amount Paid By User": totalAmtReceived
      };
      data.push(row);
    });
    this.excelService.download(data, `virtual_cafe_${this.datePipe.transform(this.searchObj.fromDate, 'shortDate')}_TO_${this.datePipe.transform(this.searchObj.toDate, 'shortDate')}`);
  }
  createEmpPollExcel(orderList) {
    let data = [];
    orderList.forEach(order => {
      const deliveryDate = new Date(order.deliveryDate);
      const pollDate = new Date(order.pollDate);
      const location = order.customerLocation?.location || order.customerLocation?.address || '';
      let pin = '';
      if (location) {
        const res = location.match(/\b\d{6}\b/);
        if (res && res.length > 0) {
          pin = res[0];
        } else {
          pin = 'N/A';
        }
      }
      const mealItems = order.mealTypeList || [];
      mealItems.forEach(exdetails => {
        if (exdetails.employeeVote == 'YES') {
          const currentDate = new Date(deliveryDate);
          const month = currentDate.getMonth() + 1;
          const row = {
            "Order Date": this.datePipe.transform(pollDate, 'short'),
            "Delivery Date short": this.datePipe.transform(currentDate, 'shortDate'),
            "Employee Name": order.employeeName,
            "Employee Vote": exdetails.employeeVote,
            "Item Name": exdetails.itemName ? exdetails.itemName : exdetails.mealConfigName,
            "Delivered Item": exdetails.deliveredItem ? exdetails.deliveredItem : 'N/A',
            "Organization Name": order.orgName,
            "POC Location": location,
            "POC Pin": pin
          };
          data.push(row);
        }
      });
    });
    this.excelService.download(data, `emp_poll_${this.datePipe.transform(this.searchObj.fromDate, 'shortDate')}_TO_${this.datePipe.transform(this.searchObj.toDate, 'shortDate')}`);
  }
  createIndividualExcel(orderList) {
    console.log(orderList);
  }
  createBulkEventExcel(orderList) {
    let data = [];
    orderList.forEach(order => {
      const currentDate = new Date(order.orderDate);
      const deliveryDate = new Date(order.deliveryDate);
      const location = order.customerLocation.location;
      let pin = '';
      if (location) {
        const res = location.match(/\b\d{6}\b/);
        if (res && res.length > 0) {
          pin = res[0];
        } else {
          pin = 'N/A';
        }
      }
      const row = {
        "User Name": order.user_name,
        "User Phone No": order.user_phoneNo,
        "User Email Id": order.user_email,
        "User Role": order.user_role,
        "User Location / Pin Code": pin ? pin : location,
        "Org Name": order.org_name,
        "Org Location": order.org_location,
        "Order Date": currentDate,
        "Delivery Date": deliveryDate,
        "Meal Name": order.itemList[0].itemName,
        "Count": order.itemList[0].count,
        "Kitchen Name": order.kitchenName,
        "Kitchen Phone No": order.kitchenPhoneNo,
        "Delivery Time From": this.datePipe.transform(order.slotStartTime, 'shortTime'),
        "Delivery Time To": this.datePipe.transform(order.slotEndTime, 'shortTime'),
        "Special Request": order.specialRequest ? order.specialRequest : 'N/A',
        "Amount": order.orderAmount,
        "Amount Paid To Kitchen": order.itemAmount,
        "Delivery paid by mealawe": order.deliveryAmtPaidByMealawe ? order.deliveryAmtPaidByMealawe : 'N/A',
        "Taxes": order.taxes
      };
      data.push(row);
    });
    this.excelService.download(data, `event_bulk_${this.datePipe.transform(this.searchObj.fromDate, 'shortDate')}_TO_${this.datePipe.transform(this.searchObj.toDate, 'shortDate')}`);
  }
  static #_ = this.ɵfac = function ExcelExportComponent_Factory(t) {
    return new (t || ExcelExportComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_6__.DatePipe), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_service_excel_service__WEBPACK_IMPORTED_MODULE_2__.ExcelService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_service_toaster_service__WEBPACK_IMPORTED_MODULE_3__.ToasterService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: ExcelExportComponent,
    selectors: [["app-excel-export"]],
    decls: 24,
    vars: 2,
    consts: [[1, "vendor-header"], [1, "m-0", "fw-semibold"], [1, "container-fluid"], [1, "custom-tabs", "pb-3", 3, "selectedTabChange"], ["label", "allEventBulk"], ["mat-tab-label", ""], ["label", "dailyBulk"], ["label", "subscriptionPackage"], ["label", "empPoll"], [1, "row", "pt-3", "pb-2", "g-3", "align-items-end"], [1, "col-12", "col-md-9"], [3, "config", "submitted"], [1, "col-12", "col-md-3"], ["mat-raised-button", "", "color", "primary", 1, "w-100", "py-2", "mb-1", 3, "disabled", "click"], [1, "d-flex", "align-items-center", "justify-content-center", "gap-2"]],
    template: function ExcelExportComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div")(2, "h4", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Excel Reports");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 2)(5, "mat-tab-group", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("selectedTabChange", function ExcelExportComponent_Template_mat_tab_group_selectedTabChange_5_listener($event) {
          return ctx.onTabChange($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "mat-tab", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, ExcelExportComponent_ng_template_7_Template, 1, 0, "ng-template", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "mat-tab", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, ExcelExportComponent_ng_template_9_Template, 1, 0, "ng-template", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "mat-tab", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, ExcelExportComponent_ng_template_11_Template, 1, 0, "ng-template", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "mat-tab", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, ExcelExportComponent_ng_template_13_Template, 1, 0, "ng-template", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "div", 9)(15, "div", 10)(16, "app-common-outlet-cafe-select", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("submitted", function ExcelExportComponent_Template_app_common_outlet_cafe_select_submitted_16_listener($event) {
          return ctx.filterSubmitted($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "div", 12)(18, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ExcelExportComponent_Template_button_click_18_listener() {
          return ctx.searchOrder();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "div", 14)(20, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21, "download");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](23, "Download Excel");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("config", ctx.headerConfig);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", !ctx.searchObj.org_id || !ctx.searchObj.fromDate || !ctx.searchObj.toDate);
      }
    },
    dependencies: [_angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__.MatTabLabel, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__.MatTabGroup, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButton, _common_outlet_cafe_select_common_outlet_cafe_select_component__WEBPACK_IMPORTED_MODULE_4__.CommonOutletCafeSelectComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 41063:
/*!***********************************************************************!*\
  !*** ./src/app/common-components/excel-export/excel-export.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExcelExportModule: () => (/* binding */ ExcelExportModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/tabs */ 60989);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _excel_export_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./excel-export-routing.module */ 24556);
/* harmony import */ var _excel_export_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./excel-export.component */ 35930);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var src_app_common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/common-outlet-cafe-select/common-outlet-cafe-select.module */ 58481);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);









class ExcelExportModule {
  static #_ = this.ɵfac = function ExcelExportModule_Factory(t) {
    return new (t || ExcelExportModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: ExcelExportModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    providers: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.DatePipe],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _excel_export_routing_module__WEBPACK_IMPORTED_MODULE_0__.ExcelExportRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__.MatTabsModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule, src_app_common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_2__.CommonOutletCafeSelectModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ExcelExportModule, {
    declarations: [_excel_export_component__WEBPACK_IMPORTED_MODULE_1__.ExcelExportComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _excel_export_routing_module__WEBPACK_IMPORTED_MODULE_0__.ExcelExportRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__.MatTabsModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule, src_app_common_outlet_cafe_select_common_outlet_cafe_select_module__WEBPACK_IMPORTED_MODULE_2__.CommonOutletCafeSelectModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_common-components_excel-export_excel-export_module_ts.js.map