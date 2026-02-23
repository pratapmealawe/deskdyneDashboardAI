(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["default-src_app_common-components_wallet-transaction-history_wallet-transaction-history_modul-933533"],{

/***/ 60373:
/*!******************************************************************************************************!*\
  !*** ./src/app/common-components/wallet-transaction-history/wallet-transaction-history.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WalletTransactionHistoryComponent: () => (/* binding */ WalletTransactionHistoryComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! exceljs */ 94262);
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(exceljs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! file-saver */ 46778);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ 49409);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/datepicker */ 82226);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/paginator */ 39687);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 28849);














function WalletTransactionHistoryComponent_ng_container_24_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
const _c0 = function () {
  return [1, 2, 3, 4, 5, 6];
};
function WalletTransactionHistoryComponent_ng_container_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, WalletTransactionHistoryComponent_ng_container_24_div_2_Template, 2, 0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](1, _c0));
  }
}
function WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 41)(1, "mat-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "sync");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 35)(1, "mat-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "receipt");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 37)(4, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Payout ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const tx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matTooltip", tx_r10.payout_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](tx_r10.payout_id);
  }
}
function WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 35)(1, "mat-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "account_balance_wallet");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 37)(4, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Fund ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const tx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matTooltip", tx_r10.fund_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](tx_r10.fund_id);
  }
}
function WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_div_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 35)(1, "mat-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "payment");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 37)(4, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Mode");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const tx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](tx_r10.mode);
  }
}
function WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_div_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 35)(1, "mat-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "shopping_cart");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 37)(4, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Order Type");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](8, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const tx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](8, 1, tx_r10.orderType));
  }
}
function WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_div_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 35)(1, "mat-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "store");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 37)(4, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Vendor Firm");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const tx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](tx_r10.vendorFirmName);
  }
}
function WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_div_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 35)(1, "mat-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "comment");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 37)(4, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Remark");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const tx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](tx_r10.remark);
  }
}
function WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_div_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 35)(1, "mat-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "book");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 37)(4, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Ledger ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const tx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matTooltip", tx_r10.ledgerId);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](tx_r10.ledgerId);
  }
}
const _c1 = function (a0, a1) {
  return {
    "credit": a0,
    "debit": a1
  };
};
const _c2 = function (a0, a1) {
  return {
    "text-success": a0,
    "text-danger": a1
  };
};
function WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 19)(1, "div", 26)(2, "div", 27)(3, "div", 28)(4, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 29)(7, "h3", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](9, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](11, "mat-icon", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_div_13_Template, 3, 0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "div", 34)(15, "div", 35)(16, "mat-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "calendar_today");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "div", 37)(19, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, "Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](23, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](24, WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_div_24_Template, 8, 2, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](25, WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_div_25_Template, 8, 2, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](26, WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_div_26_Template, 8, 1, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](27, WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_div_27_Template, 9, 3, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](28, WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_div_28_Template, 8, 1, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](29, WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_div_29_Template, 8, 1, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](30, WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_div_30_Template, 8, 2, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const tx_r10 = ctx.$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("pending-neft-card", (tx_r10.status == null ? null : tx_r10.status.toLowerCase()) === "pending" && ((tx_r10.mode == null ? null : tx_r10.mode.toLowerCase()) === "neft" || (tx_r10.mode == null ? null : tx_r10.mode.toLowerCase()) === "imps"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction2"](25, _c1, (tx_r10 == null ? null : tx_r10.transactionType) === "Credit" || ((tx_r10 == null ? null : tx_r10.transactionType) || "").includes("To_Wallet"), (tx_r10 == null ? null : tx_r10.transactionType) === "Debit" || ((tx_r10 == null ? null : tx_r10.transactionType) || "").includes("To_bank")));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"]((tx_r10 == null ? null : tx_r10.transactionType) === "Debit" || ((tx_r10 == null ? null : tx_r10.transactionType) || "").includes("To_bank") ? "arrow_upward" : "arrow_downward");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction2"](28, _c2, (tx_r10 == null ? null : tx_r10.transactionType) === "Credit" || ((tx_r10 == null ? null : tx_r10.transactionType) || "").includes("To_Wallet"), (tx_r10 == null ? null : tx_r10.transactionType) === "Debit" || ((tx_r10 == null ? null : tx_r10.transactionType) || "").includes("To_bank")));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"](" ", (tx_r10 == null ? null : tx_r10.transactionType) === "Debit" || ((tx_r10 == null ? null : tx_r10.transactionType) || "").includes("To_bank") ? "-" : "+", " ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](9, 19, tx_r10 == null ? null : tx_r10.transaction_amount, "INR"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", ctx_r9.getStatusColorClass(tx_r10 == null ? null : tx_r10.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", ctx_r9.getStatusIcon(tx_r10 == null ? null : tx_r10.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r9.formatLabel(tx_r10 == null ? null : tx_r10.status), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", (tx_r10 == null ? null : tx_r10.status == null ? null : tx_r10.status.toLowerCase()) === "pending" && ((tx_r10 == null ? null : tx_r10.mode == null ? null : tx_r10.mode.toLowerCase()) === "neft" || (tx_r10 == null ? null : tx_r10.mode == null ? null : tx_r10.mode.toLowerCase()) === "imps"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](23, 22, tx_r10 == null ? null : tx_r10.created_at, "MMM d, y, h:mm:ss a"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", tx_r10.payout_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", tx_r10.fund_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", tx_r10.mode);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", tx_r10.orderType);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", tx_r10.vendorFirmName);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", tx_r10.remark);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", tx_r10.ledgerId);
  }
}
const _c3 = function () {
  return [10, 50, 100, 200, 500];
};
function WalletTransactionHistoryComponent_ng_template_25_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, WalletTransactionHistoryComponent_ng_template_25_div_0_div_1_Template, 31, 31, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 23)(3, "div", 24)(4, "mat-paginator", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("page", function WalletTransactionHistoryComponent_ng_template_25_div_0_Template_mat_paginator_page_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r27);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r26.onPageChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r6.transactionHistoryList);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("pageSize", ctx_r6.pageSize)("pageIndex", ctx_r6.pageIndex)("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](5, _c3))("length", ctx_r6.estimatedTotal);
  }
}
function WalletTransactionHistoryComponent_ng_template_25_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 46)(1, "mat-icon", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "account_balance_wallet");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "No Transactions Found");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "There are no wallet transactions to display for the selected range.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function WalletTransactionHistoryComponent_ng_template_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, WalletTransactionHistoryComponent_ng_template_25_div_0_Template, 5, 6, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, WalletTransactionHistoryComponent_ng_template_25_ng_template_1_Template, 7, 0, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
  }
  if (rf & 2) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](2);
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r3.transactionHistoryList.length > 0)("ngIfElse", _r7);
  }
}
class WalletTransactionHistoryComponent {
  constructor(snackBar, apiMainService) {
    this.snackBar = snackBar;
    this.apiMainService = apiMainService;
    this.isDialog = false;
    this.transactionHistoryList = [];
    // Filters
    this.dateRange = {
      start: null,
      end: null
    };
    this.typeFilter = '';
    // Paging
    this.pageIndex = 0;
    this.pageSize = 10;
    this.estimatedTotal = 0;
    this.paginationOver = false;
    // State
    this.loading = false;
  }
  ngOnChanges(changes) {
    const today = new Date();
    this.dateRange = {
      start: today,
      end: today
    };
    if (changes['vendorFirmInfo'] && this.vendorFirmInfo) {
      this.loadPage(true);
    }
    console.log("isDialog", this.isDialog);
  }
  ngOnInit() {
    const today = new Date();
    this.dateRange = {
      start: today,
      end: today
    };
    if (this.vendorFirmInfo) {
      this.loadPage(true);
    }
    console.log("isDialog", this.isDialog);
  }
  ngOnDestroy() {
    if (this.refreshInterval) {
      clearTimeout(this.refreshInterval);
    }
  }
  // ——— Public UI handlers ———
  onDateRangeChange() {}
  applyFilters(reset = true) {
    this.loadPage(reset);
  }
  clearFilters() {
    this.dateRange = {
      start: null,
      end: null
    };
    this.typeFilter = '';
    this.loadPage(true);
  }
  onPageChange(e) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadPage(false);
  }
  buildQueryBody() {
    const {
      start,
      end
    } = this.dateRange;
    const toISTBoundISO = (d, endOfDay = false) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const time = endOfDay ? '23:59:59.999' : '00:00:00.000';
      return new Date(`${y}-${m}-${day}T${time}+05:30`).toISOString();
    };
    const fromDate = start ? toISTBoundISO(start, false) : undefined;
    const toDate = end ? toISTBoundISO(end, true) : undefined;
    const body = {
      vendorFirmId: this.isDialog ? this.vendorFirmInfo.vendorFirmId : this.vendorFirmInfo._id,
      page: this.pageIndex + 1,
      limit: this.pageSize
    };
    if (fromDate) body.fromDate = fromDate;
    if (toDate) body.toDate = toDate;
    if (this.typeFilter) body.transactionType = this.typeFilter;
    return body;
  }
  loadPage(reset = false) {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (reset) {
        _this.pageIndex = 0;
        _this.paginationOver = false;
      }
      _this.loading = true;
      try {
        const body = _this.buildQueryBody();
        console.log(body);
        const response = yield _this.apiMainService.getVendorTransactionByFirmAndTypeAndDate(body);
        let rows = [];
        let totalFromApi;
        if (response && Array.isArray(response.data)) {
          rows = response.data;
          totalFromApi = Number(response.total ?? NaN);
        } else if (Array.isArray(response)) {
          // Fallback to old behavior (array only)
          rows = response;
        }
        _this.transactionHistoryList = rows ?? [];
        // If server gave us a real total—use it; else estimate length for paginator UX
        if (Number.isFinite(totalFromApi)) {
          _this.estimatedTotal = totalFromApi;
          _this.paginationOver = (_this.pageIndex + 1) * _this.pageSize >= _this.estimatedTotal;
        } else {
          // Estimate when no total is available
          const got = _this.transactionHistoryList.length;
          const hasMore = got === _this.pageSize;
          _this.estimatedTotal = _this.pageIndex * _this.pageSize + got + (hasMore ? _this.pageSize : 0);
          _this.paginationOver = !hasMore;
        }
        _this.checkAndSetupAutoRefresh();
      } catch (err) {
        console.error('Failed to load transactions', err);
        _this.transactionHistoryList = [];
        _this.paginationOver = true;
        _this.estimatedTotal = _this.pageIndex * _this.pageSize; // best-effort
      } finally {
        _this.loading = false;
      }
    })();
  }
  checkAndSetupAutoRefresh() {
    var _this2 = this;
    const hasPendingNeft = this.transactionHistoryList.some(tx => tx.status?.toLowerCase() === 'pending' && (tx.mode?.toLowerCase() === 'neft' || tx.mode?.toLowerCase() === 'imps'));
    if (hasPendingNeft) {
      if (!this.refreshInterval) {
        console.log('Starting auto-refresh for pending NEFT transactions...');
        // Use setTimeout instead of setInterval for cleaner async flow
        this.refreshInterval = setTimeout( /*#__PURE__*/(0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          console.log('Auto-refreshing transactions...');
          yield _this2.checkPendingNeftTransactions();
          // After checking, reload the page which will re-trigger this setup if still needed
          _this2.refreshInterval = null; // Clear so loadPage can set it up again
          _this2.loadPage(false);
        }), 60000); // 1 minute
      }
    } else {
      // Clean up if no longer pending
      if (this.refreshInterval) {
        console.log('No pending NEFT transactions found. Stopping auto-refresh.');
        clearTimeout(this.refreshInterval);
        this.refreshInterval = null;
      }
    }
  }
  checkPendingNeftTransactions() {
    var _this3 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const pendingNeftTxns = _this3.transactionHistoryList.filter(tx => tx.status?.toLowerCase() === 'pending' && (tx.mode?.toLowerCase() === 'neft' || tx.mode?.toLowerCase() === 'imps'));
      console.log('Pending NEFT transactions:', pendingNeftTxns);
      for (const tx of pendingNeftTxns) {
        if (tx.payout_id) {
          try {
            const res = yield _this3.apiMainService.checkJusPayPayoutStatus(tx.payout_id);
            console.log(`Status check for ${tx.payout_id}:`, res);
          } catch (err) {
            console.error(`Error checking status for ${tx.payout_id}:`, err);
          }
        }
      }
    })();
  }
  // ——— Excel Export ———
  exportWalletStatement() {
    var _this4 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // Reuse buildQueryBody but override limit to fetch 'all' (or reasonably large number)
        const body = _this4.buildQueryBody();
        body.limit = 10000; // Large explicit limit for export
        body.page = 1;
        const response = yield _this4.apiMainService.getVendorTransactionByFirmAndTypeAndDate(body);
        let rows = [];
        if (response && Array.isArray(response.data)) {
          rows = response.data;
        } else if (Array.isArray(response)) {
          rows = response;
        }
        if (!rows || rows.length === 0) {
          _this4.snackBar.open('No data to export for current filters', 'OK', {
            duration: 3000
          });
          return;
        }
        // Create Workbook
        const wb = new exceljs__WEBPACK_IMPORTED_MODULE_1__.Workbook();
        const ws = wb.addWorksheet('Wallet Statement');
        // Setup Headers
        const headers = ['Date', 'Transaction ID', 'Type', 'Mode', 'Amount', 'Status', 'Remark'];
        // Styling helpers
        const headerRow = ws.addRow(headers);
        headerRow.eachCell(cell => {
          cell.font = {
            bold: true
          };
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center'
          };
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {
              argb: 'FFEFEFEF'
            }
          };
          cell.border = {
            top: {
              style: 'thin'
            },
            left: {
              style: 'thin'
            },
            bottom: {
              style: 'thin'
            },
            right: {
              style: 'thin'
            }
          };
        });
        // Widths
        ws.columns = [{
          width: 20
        }, {
          width: 30
        }, {
          width: 25
        }, {
          width: 12
        }, {
          width: 15
        }, {
          width: 15
        }, {
          width: 40
        } // Remark
        ];
        // Add Data
        const curFmt = '₹#,##0.00';
        const dateFmt = 'dd-mmm-yyyy hh:mm AM/PM';
        rows.forEach(tx => {
          const rowData = [new Date(tx.created_at), tx._id || tx.payout_id || '-', _this4.formatLabel(tx.transactionType), tx.mode || '-', Number(tx.transaction_amount || 0), tx.status || 'Success', tx.remark || ''];
          const row = ws.addRow(rowData);
          // Formatting
          row.getCell(1).numFmt = dateFmt;
          row.getCell(5).numFmt = curFmt;
          row.eachCell({
            includeEmpty: true
          }, cell => {
            cell.border = {
              top: {
                style: 'thin'
              },
              left: {
                style: 'thin'
              },
              bottom: {
                style: 'thin'
              },
              right: {
                style: 'thin'
              }
            };
          });
        });
        // Save
        const buf = yield wb.xlsx.writeBuffer();
        const blob = new Blob([buf], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const {
          start,
          end
        } = _this4.dateRange;
        const dLabel = start ? `${start.getDate()}_${start.getMonth() + 1}` : 'All';
        (0,file_saver__WEBPACK_IMPORTED_MODULE_2__.saveAs)(blob, `Wallet_Statement_${dLabel}.xlsx`);
      } catch (error) {
        console.error('Export failed', error);
        _this4.snackBar.open('Failed to export Excel', 'OK', {
          duration: 3000
        });
      }
    })();
  }
  // ——— Helpers ———
  getStatusColorClass(status) {
    if (!status) return 'text-muted'; // Default
    switch (status) {
      case 'Success':
        return 'green';
      case 'Pending':
      case 'Initiated':
      case 'Review_With_Bank':
        return 'orange';
      case 'Failed':
        return 'red';
      case 'Refund':
        return 'primary2';
      // Or a purple/info color if defined
      default:
        return 'text-muted';
    }
  }
  getTxnTypeColorClass(type) {
    if (!type) return '';
    if (type === 'Credit' || type.includes('To_Wallet')) return 'green';
    if (type === 'Debit' || type.includes('To_bank')) return 'red';
    return 'primary2';
  }
  getStatusIcon(status) {
    if (!status) return 'info';
    switch (status) {
      case 'Success':
        return 'check_circle';
      case 'Pending':
      case 'Initiated':
      case 'Review_With_Bank':
        return 'hourglass_empty';
      case 'Failed':
        return 'error';
      case 'Refund':
        return 'replay';
      default:
        return 'info';
    }
  }
  formatLabel(text) {
    if (!text) return '';
    return text.replace(/_/g, ' ');
  }
  static #_ = this.ɵfac = function WalletTransactionHistoryComponent_Factory(t) {
    return new (t || WalletTransactionHistoryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_3__.ApiMainService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: WalletTransactionHistoryComponent,
    selectors: [["app-wallet-transaction-history"]],
    inputs: {
      vendorFirmInfo: "vendorFirmInfo",
      isDialog: "isDialog"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵNgOnChangesFeature"]],
    decls: 27,
    vars: 6,
    consts: [[1, "header-card"], [1, "header-content"], [1, "title-section"], [1, "page-title"], [1, "actions-section"], ["appearance", "outline", 1, "w-100", "w-md-auto", "date-range-picker"], [3, "rangePicker", "dateChange"], ["matStartDate", "", "placeholder", "From", "name", "fromDate", 3, "ngModel", "ngModelChange"], ["matEndDate", "", "placeholder", "To", "name", "toDate", 3, "ngModel", "ngModelChange"], ["matSuffix", "", 3, "for"], ["picker", ""], ["mat-stroked-button", "", "color", "primary", 3, "click"], ["mat-button", "", "color", "warn", 3, "click"], ["mat-flat-button", "", 1, "btn-export", 3, "click"], [1, "content-body"], [4, "ngIf", "ngIfElse"], ["listTpl", ""], [1, "row", "g-4"], ["class", "col-12 col-md-6 col-lg-4", 4, "ngFor", "ngForOf"], [1, "col-12", "col-md-6", "col-lg-4"], [1, "skeleton-card"], ["class", "row g-4", 4, "ngIf", "ngIfElse"], ["noRecords", ""], [1, "col-12"], [1, "pagination-container"], ["showFirstLastButtons", "", 3, "pageSize", "pageIndex", "pageSizeOptions", "length", "page"], [1, "transaction-item-card"], [1, "card-top"], [1, "transaction-icon", 3, "ngClass"], [1, "transaction-main-info"], [1, "transaction-amount", 3, "ngClass"], [1, "status-badge", 3, "ngClass"], [1, "status-icon", 3, "ngClass"], ["class", "refreshing-indicator ms-auto", "matTooltip", "Auto-refreshing status", 4, "ngIf"], [1, "card-body"], [1, "info-row"], [1, "info-icon"], [1, "info-content"], [1, "info-label"], [1, "info-value"], ["class", "info-row", 4, "ngIf"], ["matTooltip", "Auto-refreshing status", 1, "refreshing-indicator", "ms-auto"], [1, "spin"], [1, "info-value", "text-truncate", 3, "matTooltip"], [1, "info-value", "text-wrap", "small"], [1, "info-value", "text-truncate", "small", 3, "matTooltip"], [1, "empty-state"], [1, "empty-icon"]],
    template: function WalletTransactionHistoryComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Wallet Transaction History");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 4)(6, "mat-form-field", 5)(7, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Date range");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "mat-date-range-input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("dateChange", function WalletTransactionHistoryComponent_Template_mat_date_range_input_dateChange_9_listener() {
          return ctx.onDateRangeChange();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function WalletTransactionHistoryComponent_Template_input_ngModelChange_10_listener($event) {
          return ctx.dateRange.start = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function WalletTransactionHistoryComponent_Template_input_ngModelChange_11_listener($event) {
          return ctx.dateRange.end = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](12, "mat-datepicker-toggle", 9)(13, "mat-date-range-picker", null, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function WalletTransactionHistoryComponent_Template_button_click_15_listener() {
          return ctx.applyFilters(true);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16, " Apply ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function WalletTransactionHistoryComponent_Template_button_click_17_listener() {
          return ctx.clearFilters();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18, " Clear ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function WalletTransactionHistoryComponent_Template_button_click_19_listener() {
          return ctx.exportWalletStatement();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, "file_download");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](22, " Export to Excel ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](24, WalletTransactionHistoryComponent_ng_container_24_Template, 3, 2, "ng-container", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](25, WalletTransactionHistoryComponent_ng_template_25_Template, 3, 2, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](14);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](26);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("rangePicker", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.dateRange.start);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.dateRange.end);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("for", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.loading)("ngIfElse", _r2);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatSuffix, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__.MatDatepickerToggle, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__.MatDateRangeInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__.MatStartDate, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__.MatEndDate, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__.MatDateRangePicker, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__.MatPaginator, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__.MatTooltip, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_6__.TitleCasePipe, _angular_common__WEBPACK_IMPORTED_MODULE_6__.CurrencyPipe, _angular_common__WEBPACK_IMPORTED_MODULE_6__.DatePipe],
    styles: ["\n\n\n\n[_ngcontent-%COMP%]:root {\n  --color-primary: #0E49B5;\n  --color-secondary: #FF3333;\n  --color-backgroundGrey: #f3f3f3;\n  --color-text: #1a1a1a;\n}\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  min-height: 100vh;\n  background-color: #f8f9fa;\n}\n\n.header-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 20px;\n  padding: 1.5rem 2rem;\n  margin-bottom: 2rem;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);\n  border: 1px solid rgba(0, 0, 0, 0.04);\n}\n.header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n}\n@media (max-width: 768px) {\n  .header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n.header-card[_ngcontent-%COMP%]   .title-section[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #192754;\n  margin: 0;\n}\n.header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n@media (max-width: 768px) {\n  .header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-direction: column;\n  }\n  .header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .date-range-picker[_ngcontent-%COMP%], .header-card[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n\n.date-range-picker[_ngcontent-%COMP%] {\n  min-width: 250px;\n}\n.date-range-picker[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper {\n  background-color: #fff;\n  border-radius: 8px;\n  padding-bottom: 0;\n}\n.date-range-picker[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n\n.btn-export[_ngcontent-%COMP%] {\n  border-radius: 9999px !important;\n  padding: 0.5rem 1.5rem !important;\n  font-weight: 600 !important;\n  height: 48px !important;\n  box-shadow: 0 4px 12px rgba(14, 73, 181, 0.2);\n}\n.btn-export[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n\n.transaction-item-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 16px;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);\n  transition: transform 0.2s, box-shadow 0.2s;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  border: 1px solid rgba(0, 0, 0, 0.05);\n  position: relative;\n}\n.transaction-item-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);\n}\n.transaction-item-card.pending-neft-card[_ngcontent-%COMP%] {\n  border-left: 4px solid #faad14;\n  background-color: #fffaf0;\n}\n.transaction-item-card.pending-neft-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%] {\n  background-color: #fffaf0;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  border-bottom: 1px solid #f0f0f0;\n  background-color: #fff;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .transaction-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .transaction-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .transaction-icon.credit[_ngcontent-%COMP%] {\n  background-color: #e6fffa;\n  color: #38b2ac;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .transaction-icon.debit[_ngcontent-%COMP%] {\n  background-color: #fff5f5;\n  color: #e53e3e;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .transaction-main-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .transaction-main-info[_ngcontent-%COMP%]   .transaction-amount[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 1.25rem;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .transaction-main-info[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  padding: 4px 10px;\n  border-radius: 20px;\n  width: -moz-fit-content;\n  width: fit-content;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .transaction-main-info[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%]   .status-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .transaction-main-info[_ngcontent-%COMP%]   .status-badge.green[_ngcontent-%COMP%] {\n  background-color: #f0fff4;\n  color: #38a169;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .transaction-main-info[_ngcontent-%COMP%]   .status-badge.orange[_ngcontent-%COMP%] {\n  background-color: #fffaf0;\n  color: #dd6b20;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .transaction-main-info[_ngcontent-%COMP%]   .status-badge.red[_ngcontent-%COMP%] {\n  background-color: #fff5f5;\n  color: #e53e3e;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .transaction-main-info[_ngcontent-%COMP%]   .status-badge.primary2[_ngcontent-%COMP%] {\n  background-color: #ebf8ff;\n  color: #3182ce;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: #a0aec0;\n  margin-top: 2px;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%]   .info-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: #718096;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  font-weight: 600;\n  margin-bottom: 2px;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%]   .info-value[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: #2d3748;\n  font-weight: 500;\n  word-break: break-word;\n  line-height: 1.4;\n}\n.transaction-item-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%]   .info-value.small[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #4a5568;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem 2rem;\n  text-align: center;\n  background: white;\n  border-radius: 12px;\n  border: 1px dashed #ced4da;\n  margin-top: 2rem;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #dee2e6;\n  margin-bottom: 1rem;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #192754;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n  font-size: 1.5rem;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6c757d;\n  margin-bottom: 0;\n}\n\n.refreshing-indicator[_ngcontent-%COMP%] {\n  color: #faad14;\n  display: flex;\n  align-items: center;\n}\n.refreshing-indicator[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n  .mat-mdc-paginator {\n  background: transparent;\n  margin-top: 1rem;\n}\n\n.skeleton-card[_ngcontent-%COMP%] {\n  height: 300px;\n  background: #e2e8f0;\n  border-radius: 16px;\n  animation: _ngcontent-%COMP%_pulse 1.5s infinite ease-in-out;\n}\n\n@keyframes _ngcontent-%COMP%_pulse {\n  0% {\n    opacity: 0.6;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.6;\n  }\n}\n.pagination-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGhlbWUvX3ZhcmlhYmxlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2NvbW1vbi1jb21wb25lbnRzL3dhbGxldC10cmFuc2FjdGlvbi1oaXN0b3J5L3dhbGxldC10cmFuc2FjdGlvbi1oaXN0b3J5LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzsrQ0FBQTtBQTBFQTtFQUNFLHdCQUFBO0VBQ0EsMEJBQUE7RUFDQSwrQkFBQTtFQUNBLHFCQUFBO0FDdEVGOztBQUpBO0VBQ0ksZUFBQTtFQUNBLGlCQUFBO0VBQ0EseUJBQUE7QUFPSjs7QUFIQTtFQUNJLGdCQUFBO0VBQ0EsbUJEVWU7RUNUZixvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMENEZWM7RUNkZCxxQ0FBQTtBQU1KO0FBSkk7RUFDSSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0FBTVI7QUFKUTtFQVBKO0lBUVEsc0JBQUE7SUFDQSxvQkFBQTtFQU9WO0FBQ0Y7QUFIUTtFQUNJLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjRHpCSztFQzBCTCxTQUFBO0FBS1o7QUFESTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0FBR1I7QUFEUTtFQU5KO0lBT1EsV0FBQTtJQUNBLHNCQUFBO0VBSVY7RUFGVTs7SUFFSSxXQUFBO0VBSWQ7QUFDRjs7QUFDQTtFQUNJLGdCQUFBO0FBRUo7QUFBSTtFQUNJLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQUVSO0FBQ0k7RUFDSSxhQUFBO0FBQ1I7O0FBR0E7RUFDSSxnQ0FBQTtFQUNBLGlDQUFBO0VBQ0EsMkJBQUE7RUFDQSx1QkFBQTtFQUNBLDZDQUFBO0FBQUo7QUFJSTtFQUNJLGlCQUFBO0FBRlI7O0FBT0E7RUFDSSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMENENURjO0VDNkRkLDJDQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUNBQUE7RUFDQSxrQkFBQTtBQUpKO0FBTUk7RUFDSSwyQkFBQTtFQUNBLDBDQUFBO0FBSlI7QUFPSTtFQUNJLDhCQUFBO0VBQ0EseUJBQUE7QUFMUjtBQU9RO0VBQ0kseUJBQUE7QUFMWjtBQVVJO0VBQ0ksZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsZ0NBQUE7RUFDQSxzQkFBQTtBQVJSO0FBVVE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQ0FBQTtBQVJaO0FBVVk7RUFDSSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFSaEI7QUFXWTtFQUNJLHlCQUFBO0VBQ0EsY0FBQTtBQVRoQjtBQVlZO0VBQ0kseUJBQUE7RUFDQSxjQUFBO0FBVmhCO0FBY1E7RUFDSSxPQUFBO0VBQ0EsWUFBQTtBQVpaO0FBY1k7RUFDSSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQVpoQjtBQWVZO0VBQ0ksb0JBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQUEsa0JBQUE7QUFiaEI7QUFlZ0I7RUFDSSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFicEI7QUFnQmdCO0VBRUkseUJBQUE7RUFDQSxjQUFBO0FBZnBCO0FBa0JnQjtFQUVJLHlCQUFBO0VBQ0EsY0FBQTtBQWpCcEI7QUFvQmdCO0VBRUkseUJBQUE7RUFDQSxjQUFBO0FBbkJwQjtBQXNCZ0I7RUFFSSx5QkFBQTtFQUNBLGNBQUE7QUFyQnBCO0FBNEJJO0VBQ0ksZ0JBQUE7RUFDQSxPQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtBQTFCUjtBQTRCUTtFQUNJLGFBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7QUExQlo7QUE0Qlk7RUFDSSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtBQTFCaEI7QUE2Qlk7RUFDSSxPQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtBQTNCaEI7QUE2QmdCO0VBQ0ksaUJBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUEzQnBCO0FBOEJnQjtFQUNJLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtBQTVCcEI7QUE4Qm9CO0VBQ0ksa0JBQUE7RUFDQSxjQUFBO0FBNUJ4Qjs7QUFxQ0E7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJEblBlO0VDb1BmLDBCQUFBO0VBQ0EsZ0JBQUE7QUFsQ0o7QUFvQ0k7RUFDSSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7QUFsQ1I7QUFxQ0k7RUFDSSxjRDNRUztFQzRRVCxnQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7QUFuQ1I7QUFzQ0k7RUFDSSxjQUFBO0VBQ0EsZ0JBQUE7QUFwQ1I7O0FBeUNBO0VBQ0ksY0R2T1k7RUN3T1osYUFBQTtFQUNBLG1CQUFBO0FBdENKO0FBd0NJO0VBQ0ksa0NBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUF0Q1I7O0FBMENBO0VBQ0k7SUFDSSx5QkFBQTtFQXZDTjtBQUNGO0FBMENBO0VBQ0ksdUJBQUE7RUFDQSxnQkFBQTtBQXhDSjs7QUE0Q0E7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLDBDQUFBO0FBekNKOztBQTRDQTtFQUNJO0lBQ0ksWUFBQTtFQXpDTjtFQTRDRTtJQUNJLFVBQUE7RUExQ047RUE2Q0U7SUFDSSxZQUFBO0VBM0NOO0FBQ0Y7QUE4Q0E7RUFDSSxhQUFBO0VBQ0EseUJBQUE7QUE1Q0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgR2xvYmFsIFNDU1MgVmFyaWFibGVzIC0gQnJhbmQgQ29sb3JzXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuJHdoaXRlOiAjZmZmZmZmO1xyXG4kYmxhY2s6ICMwMDAwMDA7XHJcbiR0ZXh0UHJpbWFyeTogIzFhMWExYTtcclxuXHJcbi8vIEJyYW5kIENvbG9ycyAoUm95YWwgQmx1ZSAmIE5hdnkpXHJcbiRwcmltYXJ5LWNvbG9yMTogIzBFNDlCNTsgLy8gUm95YWwgQmx1ZSAoTWFpbiBQcmltYXJ5KVxyXG4kcHJpbWFyeS1jb2xvcjogJHByaW1hcnktY29sb3IxOyAvLyBBbGlhcyBmb3IgY29uc2lzdGVuY3lcclxuJHByaW1hcnktY29sb3IyOiAjMTkyNzU0OyAvLyBOYXZ5IEJsdWUgKFNlY29uZGFyeSAvIERhcmsgUHJpbWFyeSlcclxuJHByaW1hcnktY29sb3IzOiAjNGI4MmUyOyAvLyBMaWdodGVyIEJsdWUgZGVyaXZhdGl2ZVxyXG5cclxuLy8gQnJhbmQgQ29sb3JzIChDcmVhbSAmIFJlZClcclxuJHNlY29uZGFyeS1jb2xvcjE6ICNGNEVDQzU7IC8vIFNvZnQgQ3JlYW1cclxuJHNlY29uZGFyeS1jb2xvcjI6ICNmZmUwYjI7IC8vIERlcml2YXRpdmVcclxuJHNlY29uZGFyeS1jb2xvcjM6ICNGRjMzMzM7IC8vIEJyaWdodCBSZWQgKEFjY2VudClcclxuXHJcbi8vIERlc2lnbiBUb2tlbnMgLSBCb3JkZXIgUmFkaXVzXHJcbiRib3JkZXItcmFkaXVzLXNtOiA0cHg7XHJcbiRib3JkZXItcmFkaXVzLW1kOiA4cHg7XHJcbiRib3JkZXItcmFkaXVzLWxnOiAxMnB4O1xyXG4kYm9yZGVyLXJhZGl1cy14bDogMjBweDtcclxuJGJvcmRlci1yYWRpdXMtcGlsbDogOTk5OXB4O1xyXG4kYm9yZGVyLXJhZGl1cy1jaXJjbGU6IDUwJTtcclxuXHJcbi8vIERlc2lnbiBUb2tlbnMgLSBCb3ggU2hhZG93XHJcbiRib3gtc2hhZG93LXNtOiAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcclxuJGJveC1zaGFkb3ctbWQ6IDAgNHB4IDZweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMCAycHggNHB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjA2KTtcclxuJGJveC1zaGFkb3ctbGc6IDAgMTBweCAxNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDRweCA2cHggLTJweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xyXG4kYm94LXNoYWRvdy1jYXJkOiAwIDJweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4wNCk7XHJcbiRib3gtc2hhZG93LWNhcmQtaG92ZXI6IDAgOHB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjA4KTtcclxuXHJcbi8vIEFjY2VudCBDb2xvcnNcclxuJHNlY29uZGFyeS1vZmZzZXQtY29sb3IxOiAjZmZkNjc0O1xyXG4kc2Vjb25kYXJ5LW9mZnNldC1jb2xvcjI6ICNmZmM5NDc7XHJcbiRzZWNvbmRhcnktb2Zmc2V0LWNvbG9yMzogI2ZmYjMwMDtcclxuXHJcblxyXG4vLyBHcmF5cyAmIEJhY2tncm91bmRzXHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjE6ICNmZmZmZmY7XHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjI6ICNhNGE0YTQ7IC8vIEdyYXkgdGV4dFxyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3IzOiAjZjNmM2YzOyAvLyBMaWdodCBiYWNrZ3JvdW5kXHJcbiRwcmltYXJ5LW9mZnNldC1jb2xvcjQ6ICNlZmVmZWY7IC8vIENhcmQgYmFja2dyb3VuZFxyXG4kcHJpbWFyeS1vZmZzZXQtY29sb3I1OiB3aGl0ZTtcclxuJGJvcmRlci1jb2xvcjogI2U1ZTdlYjtcclxuJGNhcmQtb2RkOiAjZGVlMmU2O1xyXG4kYmFja2dyb3VuZC1jb2xvcjogI2YzZjNmMztcclxuLy8gVGhlbWUgQ29sb3JzIChNYXRjaGVzIHN0eWxlcy5zY3NzKVxyXG4kaW5mby1jb2xvcjogI2E0YTRhNDtcclxuJHRleHQtZGFyazogIzFhMWExYTtcclxuLy8gVGhlbWUgQ29sb3JzXHJcbiRwcmltYXJ5LWNvbG9yOiAjZTYyODQxO1xyXG4kc2Vjb25kYXJ5LWNvbG9yOiAjMTVhMjkyO1xyXG4kYmFja2Ryb3AtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcclxuLy8gU2VtYW50aWMgQ29sb3JzIChTdGFuZGFyZGl6ZWQpXHJcbiRjb2xvci1zdWNjZXNzOiAjNTJjNDFhO1xyXG4kY29sb3Itc3VjY2Vzcy1iZzogI2Y2ZmZlZDtcclxuJGNvbG9yLXN1Y2Nlc3MtYm9yZGVyOiAjYjdlYjhmO1xyXG5cclxuJGNvbG9yLXdhcm5pbmc6ICNmYWFkMTQ7XHJcbiRjb2xvci13YXJuaW5nLWJnOiAjZmZmN2U2O1xyXG4kY29sb3Itd2FybmluZy1ib3JkZXI6ICNmZmU1OGY7XHJcblxyXG4kY29sb3ItZXJyb3I6ICNmZjRkNGY7XHJcbiRjb2xvci1lcnJvci1iZzogI2ZmZjFmMDtcclxuJGNvbG9yLWVycm9yLWJvcmRlcjogI2ZmY2NjNztcclxuXHJcbiRjb2xvci1pbmZvOiAjMTg5MGZmO1xyXG4kY29sb3ItaW5mby1iZzogI2U2ZjdmZjtcclxuJGNvbG9yLWluZm8tYm9yZGVyOiAjOTFkNWZmO1xyXG5cclxuLy8gQ1NTIFZhcmlhYmxlcyBmb3IgUnVudGltZSBUaGVtaW5nXHJcbjpyb290IHtcclxuICAtLWNvbG9yLXByaW1hcnk6ICN7JHByaW1hcnktY29sb3IxfTtcclxuICAtLWNvbG9yLXNlY29uZGFyeTogI3skc2Vjb25kYXJ5LWNvbG9yM307XHJcbiAgLS1jb2xvci1iYWNrZ3JvdW5kR3JleTogI3skYmFja2dyb3VuZC1jb2xvcn07XHJcbiAgLS1jb2xvci10ZXh0OiAjeyR0ZXh0UHJpbWFyeX07XHJcbn0iLCJAdXNlICcvc3JjL3N0eWxlcy90aGVtZS9taXhpbnMnIGFzIG1peGluO1xyXG5AdXNlICcvc3JjL3N0eWxlcy90aGVtZS92YXJpYWJsZScgYXMgdmFyO1xyXG5cclxuLy8gLS0tIFBhZ2UgTGF5b3V0IC0tLVxyXG4ucGFnZS1jb250YWluZXIge1xyXG4gICAgcGFkZGluZzogMS41cmVtO1xyXG4gICAgbWluLWhlaWdodDogMTAwdmg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOWZhO1xyXG59XHJcblxyXG4vLyAtLS0gSGVhZGVyIENhcmQgLS0tXHJcbi5oZWFkZXItY2FyZCB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogdmFyLiRib3JkZXItcmFkaXVzLXhsO1xyXG4gICAgcGFkZGluZzogMS41cmVtIDJyZW07XHJcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xyXG4gICAgYm94LXNoYWRvdzogdmFyLiRib3gtc2hhZG93LWNhcmQ7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMDQpO1xyXG5cclxuICAgIC5oZWFkZXItY29udGVudCB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICAgICAgZ2FwOiAxLjVyZW07XHJcblxyXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLnRpdGxlLXNlY3Rpb24ge1xyXG4gICAgICAgIC5wYWdlLXRpdGxlIHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxLjc1cmVtO1xyXG4gICAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICAgICAgICBjb2xvcjogdmFyLiRwcmltYXJ5LWNvbG9yMjtcclxuICAgICAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuYWN0aW9ucy1zZWN0aW9uIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgZ2FwOiAxcmVtO1xyXG4gICAgICAgIGZsZXgtd3JhcDogd3JhcDtcclxuXHJcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cclxuICAgICAgICAgICAgLmRhdGUtcmFuZ2UtcGlja2VyLFxyXG4gICAgICAgICAgICBidXR0b24ge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi5kYXRlLXJhbmdlLXBpY2tlciB7XHJcbiAgICBtaW4td2lkdGg6IDI1MHB4O1xyXG5cclxuICAgIDo6bmctZGVlcCAubWF0LW1kYy10ZXh0LWZpZWxkLXdyYXBwZXIge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAwO1xyXG4gICAgfVxyXG5cclxuICAgIDo6bmctZGVlcCAubWF0LW1kYy1mb3JtLWZpZWxkLXN1YnNjcmlwdC13cmFwcGVyIHtcclxuICAgICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgfVxyXG59XHJcblxyXG4uYnRuLWV4cG9ydCB7XHJcbiAgICBib3JkZXItcmFkaXVzOiB2YXIuJGJvcmRlci1yYWRpdXMtcGlsbCAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzogMC41cmVtIDEuNXJlbSAhaW1wb3J0YW50O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMCAhaW1wb3J0YW50O1xyXG4gICAgaGVpZ2h0OiA0OHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEodmFyLiRwcmltYXJ5LWNvbG9yMSwgMC4yKTtcclxuICAgIC8vIGJhY2tncm91bmQtY29sb3I6IHZhci4kcHJpbWFyeS1jb2xvcjEgIWltcG9ydGFudDtcclxuICAgIC8vIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG5cclxuICAgIG1hdC1pY29uIHtcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDhweDtcclxuICAgIH1cclxufVxyXG5cclxuLy8gLS0tIFRyYW5zYWN0aW9uIENhcmRzIC0tLVxyXG4udHJhbnNhY3Rpb24taXRlbS1jYXJkIHtcclxuICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xyXG4gICAgYm94LXNoYWRvdzogdmFyLiRib3gtc2hhZG93LWNhcmQ7XHJcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycywgYm94LXNoYWRvdyAwLjJzO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjA1KTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTRweCk7XHJcbiAgICAgICAgYm94LXNoYWRvdzogMCAxMnB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gICAgfVxyXG5cclxuICAgICYucGVuZGluZy1uZWZ0LWNhcmQge1xyXG4gICAgICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyLiRjb2xvci13YXJuaW5nO1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZhZjA7IC8vIExpZ2h0IG9yYW5nZSB0aW5nZVxyXG5cclxuICAgICAgICAuY2FyZC10b3Age1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmYWYwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDYXJkIFRvcCAoSGVhZGVyKVxyXG4gICAgLmNhcmQtdG9wIHtcclxuICAgICAgICBwYWRkaW5nOiAxLjI1cmVtO1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBnYXA6IDFyZW07XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYwZjA7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuXHJcbiAgICAgICAgLnRyYW5zYWN0aW9uLWljb24ge1xyXG4gICAgICAgICAgICB3aWR0aDogNDhweDtcclxuICAgICAgICAgICAgaGVpZ2h0OiA0OHB4O1xyXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAgICBib3gtc2hhZG93OiAwIDRweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XHJcblxyXG4gICAgICAgICAgICBtYXQtaWNvbiB7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDI0cHg7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMjRweDtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMjRweDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJi5jcmVkaXQge1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2U2ZmZmYTtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAjMzhiMmFjOyAvLyBUZWFsL0dyZWVuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICYuZGViaXQge1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjVmNTtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAjZTUzZTNlOyAvLyBSZWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnRyYW5zYWN0aW9uLW1haW4taW5mbyB7XHJcbiAgICAgICAgICAgIGZsZXg6IDE7XHJcbiAgICAgICAgICAgIG1pbi13aWR0aDogMDtcclxuXHJcbiAgICAgICAgICAgIC50cmFuc2FjdGlvbi1hbW91bnQge1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwIDAgNHB4IDA7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEuMjVyZW07XHJcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLnN0YXR1cy1iYWRnZSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICAgICAgICBnYXA6IDRweDtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMC43NXJlbTtcclxuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiA0cHggMTBweDtcclxuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogZml0LWNvbnRlbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgLnN0YXR1cy1pY29uIHtcclxuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxNHB4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICYuZ3JlZW4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmZmY0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjMzhhMTY5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICYub3JhbmdlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBQZW5kaW5nL1dhcm5pbmdcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmYWYwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjZGQ2YjIwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICYucmVkIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBGYWlsZWQvUmVqZWN0ZWRcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmNWY1O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjZTUzZTNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICYucHJpbWFyeTIge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFByb2Nlc3NpbmcgZXRjXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ViZjhmZjtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzMxODJjZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDYXJkIEJvZHkgKERldGFpbHMpXHJcbiAgICAuY2FyZC1ib2R5IHtcclxuICAgICAgICBwYWRkaW5nOiAxLjI1cmVtO1xyXG4gICAgICAgIGZsZXg6IDE7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGdhcDogMXJlbTtcclxuXHJcbiAgICAgICAgLmluZm8tcm93IHtcclxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICAgICAgICAgIGdhcDogMC43NXJlbTtcclxuXHJcbiAgICAgICAgICAgIC5pbmZvLWljb24ge1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE4cHg7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4cHg7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogI2EwYWVjMDtcclxuICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6IDJweDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLmluZm8tY29udGVudCB7XHJcbiAgICAgICAgICAgICAgICBmbGV4OiAxO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgICAgICAgICBtaW4td2lkdGg6IDA7IC8vIEZpeCB0ZXh0IHRydW5jYXRpb24gZmxleCBpc3N1ZVxyXG5cclxuICAgICAgICAgICAgICAgIC5pbmZvLWxhYmVsIHtcclxuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDAuN3JlbTtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzcxODA5NjtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldHRlci1zcGFjaW5nOiAwLjVweDtcclxuICAgICAgICAgICAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDJweDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAuaW5mby12YWx1ZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAwLjk1cmVtO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjMmQzNzQ4O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgd29yZC1icmVhazogYnJlYWstd29yZDtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMS40O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAmLnNtYWxsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzRhNTU2ODtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIC0tLSBFbXB0eSBTdGF0ZSAtLS1cclxuLmVtcHR5LXN0YXRlIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgcGFkZGluZzogNHJlbSAycmVtO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBib3JkZXItcmFkaXVzOiB2YXIuJGJvcmRlci1yYWRpdXMtbGc7XHJcbiAgICBib3JkZXI6IDFweCBkYXNoZWQgI2NlZDRkYTtcclxuICAgIG1hcmdpbi10b3A6IDJyZW07XHJcblxyXG4gICAgLmVtcHR5LWljb24ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNjRweDtcclxuICAgICAgICB3aWR0aDogNjRweDtcclxuICAgICAgICBoZWlnaHQ6IDY0cHg7XHJcbiAgICAgICAgY29sb3I6ICNkZWUyZTY7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICAgIH1cclxuXHJcbiAgICBoMyB7XHJcbiAgICAgICAgY29sb3I6IHZhci4kcHJpbWFyeS1jb2xvcjI7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgICB9XHJcblxyXG4gICAgcCB7XHJcbiAgICAgICAgY29sb3I6ICM2Yzc1N2Q7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcclxuICAgIH1cclxufVxyXG5cclxuLy8gLS0tIFV0aWxpdGllcyAtLS1cclxuLnJlZnJlc2hpbmctaW5kaWNhdG9yIHtcclxuICAgIGNvbG9yOiB2YXIuJGNvbG9yLXdhcm5pbmc7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICAuc3BpbiB7XHJcbiAgICAgICAgYW5pbWF0aW9uOiBzcGluIDFzIGxpbmVhciBpbmZpbml0ZTtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgd2lkdGg6IDIwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgfVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHNwaW4ge1xyXG4gICAgMTAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgIH1cclxufVxyXG5cclxuOjpuZy1kZWVwIC5tYXQtbWRjLXBhZ2luYXRvciB7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICAgIG1hcmdpbi10b3A6IDFyZW07XHJcbn1cclxuXHJcbi8vIFNrZWxldG9uIHN0eWxpbmdcclxuLnNrZWxldG9uLWNhcmQge1xyXG4gICAgaGVpZ2h0OiAzMDBweDtcclxuICAgIGJhY2tncm91bmQ6ICNlMmU4ZjA7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xyXG4gICAgYW5pbWF0aW9uOiBwdWxzZSAxLjVzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHB1bHNlIHtcclxuICAgIDAlIHtcclxuICAgICAgICBvcGFjaXR5OiAwLjY7XHJcbiAgICB9XHJcblxyXG4gICAgNTAlIHtcclxuICAgICAgICBvcGFjaXR5OiAxO1xyXG4gICAgfVxyXG5cclxuICAgIDEwMCUge1xyXG4gICAgICAgIG9wYWNpdHk6IDAuNjtcclxuICAgIH1cclxufVxyXG5cclxuLnBhZ2luYXRpb24tY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 52351:
/*!***************************************************************************************************!*\
  !*** ./src/app/common-components/wallet-transaction-history/wallet-transaction-history.module.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WalletTransactionHistoryModule: () => (/* binding */ WalletTransactionHistoryModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _wallet_transaction_history_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wallet-transaction-history.component */ 60373);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../material.module */ 29099);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);





class WalletTransactionHistoryModule {
  static #_ = this.ɵfac = function WalletTransactionHistoryModule_Factory(t) {
    return new (t || WalletTransactionHistoryModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: WalletTransactionHistoryModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_1__.MaterialModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](WalletTransactionHistoryModule, {
    declarations: [_wallet_transaction_history_component__WEBPACK_IMPORTED_MODULE_0__.WalletTransactionHistoryComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_1__.MaterialModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule],
    exports: [_wallet_transaction_history_component__WEBPACK_IMPORTED_MODULE_0__.WalletTransactionHistoryComponent]
  });
})();

/***/ }),

/***/ 29085:
/*!***********************************************************************************!*\
  !*** ./src/app/vendor-firm-view/wallet-txn-dialog/wallet-txn-dialog.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WalletTxnDialogComponent: () => (/* binding */ WalletTxnDialogComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 17401);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var src_service_bank_transaction_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/service/bank-transaction.service */ 57871);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ 10026);













const _c0 = function (a0) {
  return [a0, "INR", "symbol", "1.2-2", "en-IN"];
};
function WalletTxnDialogComponent_mat_hint_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"](" Available ", ctx_r0.data.transferSource === "wallet" ? "wallet balance" : ctx_r0.data.transferSource === "daily" ? "daily balance" : "subsidy", ": ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBindV"](2, 2, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](8, _c0, ctx_r0.data.transferSource === "wallet" ? ctx_r0.data.walletBalance || 0 : ctx_r0.data.transferSource === "daily" ? ctx_r0.data.dailyBalance || 0 : ctx_r0.data.subsidyBalance || 0)), " ");
  }
}
function WalletTxnDialogComponent_mat_error_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Amount is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function WalletTxnDialogComponent_mat_error_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Minimum \u20B90.01 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function WalletTxnDialogComponent_mat_error_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Cannot exceed available ", ctx_r3.data.transferSource === "wallet" ? "wallet balance" : ctx_r3.data.transferSource === "daily" ? "daily balance" : "subsidy", " ");
  }
}
function WalletTxnDialogComponent_mat_error_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Remark is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
class WalletTxnDialogComponent {
  constructor(data, dialogRef, fb, api, bankTransactionService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.fb = fb;
    this.api = api;
    this.bankTransactionService = bankTransactionService;
    this.loading = false;
    this.form = this.fb.group({
      amount: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.min(0.01)]],
      remark: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(200)]]
    });
    // If transferring subsidy, cap by available subsidy
    console.log(data);
    if (this.data.kind === 'Transfer') {
      const max = this.data.transferSource === 'wallet' ? this.data.walletBalance ?? 0 : this.data.transferSource === 'daily' ? this.data.dailyBalance ?? 0 : this.data.subsidyBalance ?? 0;
      this.form.get('amount')?.addValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.max(max));
      this.form.get('amount')?.updateValueAndValidity();
    }
  }
  onClose() {
    this.dialogRef.close({
      success: false
    });
  }
  onSubmit() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.form.invalid || _this.loading) return;
      _this.loading = true;
      const amt = Number(_this.form.value.amount);
      const remark = String(_this.form.value.remark || '').trim();
      try {
        if (_this.data.kind === 'Transfer') {
          if (_this.data.transferSource === 'daily') {
            // NEW: daily → wallet API
            yield _this.api.moveDailyToWallet({
              vendorFirmId: _this.data.vendorFirmId,
              amount: +amt.toFixed(2),
              remark
            });
          } else if (_this.data.transferSource === 'subsidy') {
            // Subsidy → wallet (existing)
            console.log('Subsidy → wallet (existing)');
            yield _this.api.moveSubsidyToWallet({
              vendorFirmId: _this.data.vendorFirmId,
              amount: +amt.toFixed(2),
              remark
            });
          } else if (_this.data.transferSource === 'wallet') {
            // Calculate charges and mode
            const result = _this.bankTransactionService.calculateTransferModeAndCharges(+amt);
            // Wallet → BANK API
            yield _this.api.transferWalletListToBankManual({
              vendorFirmId: _this.data.vendorFirmId,
              amount: +result.finalTransferAmount.toFixed(2),
              remark,
              mode: result.mode,
              bankTransactionCharge: Number(result.charge)
            });
          }
        } else {
          // Existing credit/debit API
          yield _this.api.creditOrDebitVendorWallet({
            vendorFirmId: _this.data.vendorFirmId,
            transactionType: _this.data.kind,
            transaction_amount: +amt.toFixed(2),
            remark
          });
        }
        _this.dialogRef.close({
          success: true
        });
      } catch (e) {
        console.error('Failed to save wallet transaction', e);
        _this.dialogRef.close({
          success: false
        });
      } finally {
        _this.loading = false;
      }
    })();
  }
  static #_ = this.ɵfac = function WalletTxnDialogComponent_Factory(t) {
    return new (t || WalletTxnDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MAT_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_service_bank_transaction_service__WEBPACK_IMPORTED_MODULE_2__.BankTransactionService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: WalletTxnDialogComponent,
    selectors: [["app-wallet-txn-dialog"]],
    decls: 26,
    vars: 12,
    consts: [["mat-dialog-title", ""], ["mat-dialog-content", "", 1, "d-flex", "flex-column", "gap-3", "pt-3", 3, "formGroup"], ["appearance", "outline"], ["matInput", "", "formControlName", "amount", "type", "number", "step", "0.01", "min", "0.01", "placeholder", "0.00", 3, "keydown.enter"], [4, "ngIf"], ["matInput", "", "formControlName", "remark", "rows", "3", "maxlength", "200"], ["align", "end"], ["mat-dialog-actions", "", 1, "justify-content-end", "gap-2"], ["mat-button", "", 3, "disabled", "click"], ["mat-flat-button", "", 1, "btn-add", 3, "disabled", "click"]],
    template: function WalletTxnDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 1)(4, "mat-form-field", 2)(5, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Amount");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("keydown.enter", function WalletTxnDialogComponent_Template_input_keydown_enter_7_listener() {
          return ctx.onSubmit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, WalletTxnDialogComponent_mat_hint_8_Template, 3, 10, "mat-hint", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, WalletTxnDialogComponent_mat_error_9_Template, 2, 0, "mat-error", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, WalletTxnDialogComponent_mat_error_10_Template, 2, 0, "mat-error", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, WalletTxnDialogComponent_mat_error_11_Template, 2, 1, "mat-error", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "mat-form-field", 2)(13, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Remark");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](15, "textarea", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "mat-hint", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](18, WalletTxnDialogComponent_mat_error_18_Template, 2, 0, "mat-error", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 7)(20, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function WalletTxnDialogComponent_Template_button_click_20_listener() {
          return ctx.onClose();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function WalletTxnDialogComponent_Template_button_click_22_listener() {
          return ctx.onSubmit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "save");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        let tmp_4_0;
        let tmp_5_0;
        let tmp_6_0;
        let tmp_7_0;
        let tmp_8_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.data.kind === "Credit" ? "Credit Amount" : ctx.data.kind === "Debit" ? "Debit Amount" : ctx.data.transferSource === "wallet" ? "Transfer Wallet Balance" : ctx.data.transferSource === "daily" ? "Transfer Daily Balance to Wallet" : "Transfer Subsidy to Wallet", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("max", ctx.data.kind === "Transfer" ? ctx.data.transferSource === "daily" ? ctx.data.dailyBalance : ctx.data.subsidyBalance : null);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.data.kind === "Transfer");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (tmp_4_0 = ctx.form.get("amount")) == null ? null : tmp_4_0.hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (tmp_5_0 = ctx.form.get("amount")) == null ? null : tmp_5_0.hasError("min"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (tmp_6_0 = ctx.form.get("amount")) == null ? null : tmp_6_0.hasError("max"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ((tmp_7_0 = ctx.form.get("remark")) == null ? null : tmp_7_0.value == null ? null : tmp_7_0.value.length) || 0, "/200 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (tmp_8_0 = ctx.form.get("remark")) == null ? null : tmp_8_0.hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx.loading);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx.form.invalid || ctx.loading);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.loading ? "Saving..." : "Save", " ");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatHint, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatError, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInput, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogContent, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogActions, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_6__.CurrencyPipe],
    styles: [".gap-3[_ngcontent-%COMP%] {\n  gap: 12px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdmVuZG9yLWZpcm0tdmlldy93YWxsZXQtdHhuLWRpYWxvZy93YWxsZXQtdHhuLWRpYWxvZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBSTtFQUFTLFNBQUE7QUFFYiIsInNvdXJjZXNDb250ZW50IjpbIiAgICAuZ2FwLTMgeyBnYXA6IDEycHg7IH1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 57871:
/*!*************************************************!*\
  !*** ./src/service/bank-transaction.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BankTransactionService: () => (/* binding */ BankTransactionService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

class BankTransactionService {
  constructor() {}
  /**
   * Calculates the bank transfer mode and charges based on the amount.
   * Logic:
   * - Amount <= 1000: Charge = 2, Mode = 'IMPS'
   * - Amount <= 25000 (and > 1000): Charge = 3, Mode = 'IMPS'
   * - Amount > 25000: Charge = 5, Mode = 'NEFT'
   *
   * Returns calculated values and the final transfer amount (original amount - charge).
   */
  calculateTransferModeAndCharges(amount) {
    let mode = '';
    let charge = 0;
    if (amount <= 1000) {
      mode = 'IMPS';
      charge = 2;
    } else if (amount <= 25000) {
      mode = 'IMPS';
      charge = 3;
    } else {
      mode = 'NEFT';
      charge = 5;
    }
    return {
      mode,
      charge,
      finalTransferAmount: amount - charge
    };
  }
  static #_ = this.ɵfac = function BankTransactionService_Factory(t) {
    return new (t || BankTransactionService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: BankTransactionService,
    factory: BankTransactionService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 46778:
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (a, b) {
  if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}
})(this, function () {
  "use strict";

  function b(a, b) {
    return "undefined" == typeof b ? b = {
      autoBom: !1
    } : "object" != typeof b && (console.warn("Deprecated: Expected third argument to be a object"), b = {
      autoBom: !b
    }), b.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob(["\uFEFF", a], {
      type: a.type
    }) : a;
  }
  function c(a, b, c) {
    var d = new XMLHttpRequest();
    d.open("GET", a), d.responseType = "blob", d.onload = function () {
      g(d.response, b, c);
    }, d.onerror = function () {
      console.error("could not download file");
    }, d.send();
  }
  function d(a) {
    var b = new XMLHttpRequest();
    b.open("HEAD", a, !1);
    try {
      b.send();
    } catch (a) {}
    return 200 <= b.status && 299 >= b.status;
  }
  function e(a) {
    try {
      a.dispatchEvent(new MouseEvent("click"));
    } catch (c) {
      var b = document.createEvent("MouseEvents");
      b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), a.dispatchEvent(b);
    }
  }
  var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof global && global.global === global ? global : void 0,
    a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent),
    g = f.saveAs || ("object" != typeof window || window !== f ? function () {} : "download" in HTMLAnchorElement.prototype && !a ? function (b, g, h) {
      var i = f.URL || f.webkitURL,
        j = document.createElement("a");
      g = g || b.name || "download", j.download = g, j.rel = "noopener", "string" == typeof b ? (j.href = b, j.origin === location.origin ? e(j) : d(j.href) ? c(b, g, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b), setTimeout(function () {
        i.revokeObjectURL(j.href);
      }, 4E4), setTimeout(function () {
        e(j);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function (f, g, h) {
      if (g = g || f.name || "download", "string" != typeof f) navigator.msSaveOrOpenBlob(b(f, h), g);else if (d(f)) c(f, g, h);else {
        var i = document.createElement("a");
        i.href = f, i.target = "_blank", setTimeout(function () {
          e(i);
        });
      }
    } : function (b, d, e, g) {
      if (g = g || open("", "_blank"), g && (g.document.title = g.document.body.innerText = "downloading..."), "string" == typeof b) return c(b, d, e);
      var h = "application/octet-stream" === b.type,
        i = /constructor/i.test(f.HTMLElement) || f.safari,
        j = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((j || h && i || a) && "undefined" != typeof FileReader) {
        var k = new FileReader();
        k.onloadend = function () {
          var a = k.result;
          a = j ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), g ? g.location.href = a : location = a, g = null;
        }, k.readAsDataURL(b);
      } else {
        var l = f.URL || f.webkitURL,
          m = l.createObjectURL(b);
        g ? g.location = m : location.href = m, g = null, setTimeout(function () {
          l.revokeObjectURL(m);
        }, 4E4);
      }
    });
  f.saveAs = g.saveAs = g,  true && (module.exports = g);
});

/***/ })

}]);
//# sourceMappingURL=default-src_app_common-components_wallet-transaction-history_wallet-transaction-history_modul-933533.js.map