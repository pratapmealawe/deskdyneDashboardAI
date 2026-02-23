"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["default-src_app_org-components_org-reviews_org-order_org-order_module_ts"],{

/***/ 47965:
/*!*****************************************************************************!*\
  !*** ./src/app/org-components/org-reviews/org-order/org-order.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgOrderComponent: () => (/* binding */ OrgOrderComponent)
/* harmony export */ });
/* harmony import */ var src_config_order_status_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/config/order-status.config */ 47816);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ 18497);




function OrgOrderComponent_ng_container_1_ng_conatiner_15_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "i", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const filled_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", filled_r9 ? "bi-star-fill filled" : "bi-star");
  }
}
function OrgOrderComponent_ng_container_1_ng_conatiner_15_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 20)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", ctx_r8.order.rating, "/5 ", ctx_r8.ratingLabel[ctx_r8.order.rating], "");
  }
}
function OrgOrderComponent_ng_container_1_ng_conatiner_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ng-conatiner", 15)(1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, OrgOrderComponent_ng_container_1_ng_conatiner_15_ng_container_2_Template, 2, 1, "ng-container", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, OrgOrderComponent_ng_container_1_ng_conatiner_15_div_3_Template, 3, 2, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", ctx_r1.ratingClass[ctx_r1.order.rating]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.getStarsArray(ctx_r1.order.rating));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.order.rating);
  }
}
function OrgOrderComponent_ng_container_1_ng_template_16_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
}
const _c0 = function () {
  return [1, 2, 3, 4, 5];
};
function OrgOrderComponent_ng_container_1_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 21)(1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, OrgOrderComponent_ng_container_1_ng_template_16_ng_container_2_Template, 2, 0, "ng-container", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 20)(4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "0/5 Skipped");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](1, _c0));
  }
}
function OrgOrderComponent_ng_container_1_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r4.order == null ? null : ctx_r4.order.feedback);
  }
}
function OrgOrderComponent_ng_container_1_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "No Feedback Given");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function OrgOrderComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-card", 2)(2, "div", 3)(3, "div", 4)(4, "mat-card-header")(5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 6)(8, "mat-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "mat-card-subtitle");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "i", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](14, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, OrgOrderComponent_ng_container_1_ng_conatiner_15_Template, 4, 3, "ng-conatiner", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, OrgOrderComponent_ng_container_1_ng_template_16_Template, 6, 2, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 10)(19, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, OrgOrderComponent_ng_container_1_ng_container_20_Template, 3, 1, "ng-container", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, OrgOrderComponent_ng_container_1_ng_template_21_Template, 3, 0, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 14)(24, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "Items: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](17);
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](22);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", (ctx_r0.order == null ? null : ctx_r0.order.feedbackFrom_name) ? ctx_r0.order == null ? null : ctx_r0.order.feedbackFrom_name[0].toUpperCase() : "C", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", (ctx_r0.order == null ? null : ctx_r0.order.feedbackFrom_name) || "Customer", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Order No: ", ctx_r0.order.feedbackOrderNo, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](14, 10, ctx_r0.order.SubmitedDate, "MMM d, y"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.order.rating)("ngIfElse", _r2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.order == null ? null : ctx_r0.order.feedback)("ngIfElse", _r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("title", ctx_r0.getItemListString(ctx_r0.order));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r0.getItemListString(ctx_r0.order), " ");
  }
}
class OrgOrderComponent {
  constructor() {
    this.orderStatusMapper = src_config_order_status_config__WEBPACK_IMPORTED_MODULE_0__.orderStatusMapper;
    this.ratingLabel = {
      0: "Skipped",
      1: "Very Bad",
      2: "Bad",
      3: "Average",
      4: "Good",
      5: "Excellent"
    };
    this.ratingClass = {
      0: "skipped",
      1: "very-bad",
      2: "bad",
      3: "average",
      4: "good",
      5: "excellent"
    };
  }
  getStarsArray(rating) {
    return Array(5).fill(0).map((_, i) => i < rating);
  }
  getItemListString(order) {
    if (!order || !Array.isArray(order.itemlist) || order.itemlist.length === 0) {
      return '';
    }
    return order.itemlist.map(i => {
      const name = i?.itemName ?? '';
      const count = i?.count || i?.count === 0 ? ` x${i.count}` : '';
      return (name + count).trim();
    }).filter(s => s.length > 0).join(', ');
  }
  static #_ = this.ɵfac = function OrgOrderComponent_Factory(t) {
    return new (t || OrgOrderComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: OrgOrderComponent,
    selectors: [["app-org-order"]],
    inputs: {
      order: "order"
    },
    decls: 2,
    vars: 1,
    consts: [[1, "customer-outlet-orders"], [4, "ngIf"], [1, "order-card", "mb-3"], [1, "order-card-inner"], [1, "order-left"], ["mat-card-avatar", "", 1, "order-avatar"], [1, "order-header-text"], [1, "bi", "bi-dot"], ["class", "rating-box", 3, "ngClass", 4, "ngIf", "ngIfElse"], ["noRating", ""], [1, "order-right"], [1, "order-meta", "small"], [4, "ngIf", "ngIfElse"], ["noFeedback", ""], [1, "item-single-line", 3, "title"], [1, "rating-box", 3, "ngClass"], [1, "stars"], [4, "ngFor", "ngForOf"], ["class", "rating-text", 4, "ngIf"], [1, "bi", 3, "ngClass"], [1, "rating-text"], [1, "rating-box", "skipped"], [1, "bi", "bi-star"]],
    template: function OrgOrderComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, OrgOrderComponent_ng_container_1_Template, 27, 13, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.order);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardAvatar, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardSubtitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardTitle, _angular_common__WEBPACK_IMPORTED_MODULE_2__.DatePipe],
    styles: [".order-card[_ngcontent-%COMP%] {\n  display: block;\n  padding: 0;\n  border-radius: 12px;\n}\n\n.order-card-inner[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  gap: 16px;\n  padding: 12px 16px;\n}\n\n.order-left[_ngcontent-%COMP%], .order-right[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.order-left[_ngcontent-%COMP%] {\n  border-right: 1px solid rgba(0, 0, 0, 0.06);\n  padding-right: 12px;\n}\n\n.order-right[_ngcontent-%COMP%] {\n  padding: 12px;\n  display: flex;\n  flex-direction: column;\n  background: #f3f3f3;\n  border-radius: 15px;\n}\n\n.order-avatar[_ngcontent-%COMP%] {\n  background-color: #4f46e5;\n  color: #fff;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.order-header-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\nmat-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.rating-box[_ngcontent-%COMP%] {\n  width: 160px;\n  padding: 10px 12px;\n  border-radius: 12px;\n  text-align: center;\n  color: #fff;\n  font-weight: 600;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.rating-box[_ngcontent-%COMP%]   .stars[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n}\n.rating-box[_ngcontent-%COMP%]   .stars[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin: 0 2px;\n  color: rgba(255, 255, 255, 0.6);\n}\n.rating-box[_ngcontent-%COMP%]   .stars[_ngcontent-%COMP%]   i.filled[_ngcontent-%COMP%] {\n  color: #FFD700 !important;\n}\n.rating-box[_ngcontent-%COMP%]   .rating-text[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.rating-box[_ngcontent-%COMP%]   .rating-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin-top: 2px;\n}\n\n.skipped[_ngcontent-%COMP%] {\n  background-color: #9e9e9e;\n}\n\n.very-bad[_ngcontent-%COMP%] {\n  background-color: #e53935;\n}\n\n.bad[_ngcontent-%COMP%] {\n  background-color: #fb8c00;\n}\n\n.average[_ngcontent-%COMP%] {\n  background-color: #75d9eb;\n  color: #333 !important;\n}\n\n.good[_ngcontent-%COMP%] {\n  background-color: #43a047;\n}\n\n.excellent[_ngcontent-%COMP%] {\n  background-color: #1e88e5;\n}\n\n.item-single-line[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 6px;\n  font-size: 13px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n@media (max-width: 767px) {\n  .order-card-inner[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .order-left[_ngcontent-%COMP%] {\n    border-right: none;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n    padding-right: 0;\n    padding-bottom: 8px;\n  }\n  .order-right[_ngcontent-%COMP%] {\n    padding-left: 0;\n    padding-top: 8px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvb3JnLWNvbXBvbmVudHMvb3JnLXJldmlld3Mvb3JnLW9yZGVyL29yZy1vcmRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7RUFDQSxVQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUVBOztFQUVFLE9BQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSwyQ0FBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQUNGOztBQUVBO0VBQ0UsT0FBQTtBQUNGOztBQUdBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtBQUFGOztBQUdBO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUVBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFERjtBQUdFO0VBQ0Usa0JBQUE7QUFESjtBQUdJO0VBQ0UsZUFBQTtFQUNBLGFBQUE7RUFDQSwrQkFBQTtBQUROO0FBR007RUFDRSx5QkFBQTtBQURSO0FBTUU7RUFDRSxlQUFBO0FBSko7QUFNSTtFQUNFLGVBQUE7RUFDQSxlQUFBO0FBSk47O0FBVUE7RUFDRSx5QkFBQTtBQVBGOztBQVVBO0VBQ0UseUJBQUE7QUFQRjs7QUFVQTtFQUNFLHlCQUFBO0FBUEY7O0FBVUE7RUFDRSx5QkFBQTtFQUNBLHNCQUFBO0FBUEY7O0FBVUE7RUFDRSx5QkFBQTtBQVBGOztBQVVBO0VBQ0UseUJBQUE7QUFQRjs7QUFVQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtBQVBGOztBQVVBO0VBQ0U7SUFDRSxzQkFBQTtFQVBGO0VBVUE7SUFDRSxrQkFBQTtJQUNBLDRDQUFBO0lBQ0EsZ0JBQUE7SUFDQSxtQkFBQTtFQVJGO0VBV0E7SUFDRSxlQUFBO0lBQ0EsZ0JBQUE7RUFURjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLm9yZGVyLWNhcmQge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxufVxyXG5cclxuLm9yZGVyLWNhcmQtaW5uZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICBnYXA6IDE2cHg7XHJcbiAgcGFkZGluZzogMTJweCAxNnB4O1xyXG59XHJcblxyXG4ub3JkZXItbGVmdCxcclxuLm9yZGVyLXJpZ2h0IHtcclxuICBmbGV4OiAxO1xyXG4gIG1pbi13aWR0aDogMDtcclxufVxyXG5cclxuLm9yZGVyLWxlZnQge1xyXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4wNik7XHJcbiAgcGFkZGluZy1yaWdodDogMTJweDtcclxufVxyXG5cclxuLm9yZGVyLXJpZ2h0IHtcclxuICBwYWRkaW5nOiAxMnB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBiYWNrZ3JvdW5kOiAjZjNmM2YzO1xyXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcbn1cclxuXHJcbi5vcmRlci1hdmF0YXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM0ZjQ2ZTU7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5vcmRlci1oZWFkZXItdGV4dCB7XHJcbiAgZmxleDogMTtcclxufVxyXG5cclxuXHJcbm1hdC1jYXJkLWhlYWRlciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMTJweDtcclxufVxyXG5cclxuLnJhdGluZy1ib3gge1xyXG4gIHdpZHRoOiAxNjBweDtcclxuICBwYWRkaW5nOiAxMHB4IDEycHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuXHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblxyXG4gIC5zdGFycyB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA0cHg7XHJcblxyXG4gICAgaSB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgbWFyZ2luOiAwIDJweDtcclxuICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcclxuXHJcbiAgICAgICYuZmlsbGVkIHtcclxuICAgICAgICBjb2xvcjogI0ZGRDcwMCAhaW1wb3J0YW50O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAucmF0aW5nLXRleHQge1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG5cclxuICAgIHNwYW4ge1xyXG4gICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgIG1hcmdpbi10b3A6IDJweDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblxyXG4uc2tpcHBlZCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzllOWU5ZTtcclxufVxyXG5cclxuLnZlcnktYmFkIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTUzOTM1O1xyXG59XHJcblxyXG4uYmFkIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmI4YzAwO1xyXG59XHJcblxyXG4uYXZlcmFnZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzc1ZDllYjtcclxuICBjb2xvcjogIzMzMyAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uZ29vZCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQzYTA0NztcclxufVxyXG5cclxuLmV4Y2VsbGVudCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFlODhlNTtcclxufVxyXG5cclxuLml0ZW0tc2luZ2xlLWxpbmUge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIG1hcmdpbi10b3A6IDZweDtcclxuICBmb250LXNpemU6IDEzcHg7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcclxuICAub3JkZXItY2FyZC1pbm5lciB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIH1cclxuXHJcbiAgLm9yZGVyLWxlZnQge1xyXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4wNik7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDhweDtcclxuICB9XHJcblxyXG4gIC5vcmRlci1yaWdodCB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XHJcbiAgICBwYWRkaW5nLXRvcDogOHB4O1xyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 68378:
/*!**************************************************************************!*\
  !*** ./src/app/org-components/org-reviews/org-order/org-order.module.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrgOrderModule: () => (/* binding */ OrgOrderModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _org_order_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./org-order.component */ 47965);
/* harmony import */ var src_app_material_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/material.module */ 29099);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);




class OrgOrderModule {
  static #_ = this.ɵfac = function OrgOrderModule_Factory(t) {
    return new (t || OrgOrderModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: OrgOrderModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_1__.MaterialModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](OrgOrderModule, {
    declarations: [_org_order_component__WEBPACK_IMPORTED_MODULE_0__.OrgOrderComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, src_app_material_module__WEBPACK_IMPORTED_MODULE_1__.MaterialModule],
    exports: [_org_order_component__WEBPACK_IMPORTED_MODULE_0__.OrgOrderComponent]
  });
})();

/***/ })

}]);
//# sourceMappingURL=default-src_app_org-components_org-reviews_org-order_org-order_module_ts.js.map