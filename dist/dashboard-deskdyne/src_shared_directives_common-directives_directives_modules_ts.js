"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_shared_directives_common-directives_directives_modules_ts"],{

/***/ 53183:
/*!*********************************************************!*\
  !*** ./src/shared/directives/auto-tooltip.directive.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutoTooltipDirective: () => (/* binding */ AutoTooltipDirective)
/* harmony export */ });
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);



class AutoTooltipDirective {
  constructor(el, tooltip) {
    this.el = el;
    this.tooltip = tooltip;
  }
  ngAfterViewInit() {
    // allow opt-out
    if (this.el.nativeElement.hasAttribute('noAutoTooltip')) {
      return;
    }
    const iconText = this.el.nativeElement.innerText.trim().toLowerCase();
    const tooltipMap = {
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add',
      visibility: 'View',
      remove: 'Remove',
      save: 'Save'
    };
    if (tooltipMap[iconText]) {
      this.tooltip.message = tooltipMap[iconText];
      this.tooltip.position = 'below';
      // show on hover
      this.el.nativeElement.addEventListener('mouseenter', () => {
        this.tooltip.show();
      });
      this.el.nativeElement.addEventListener('mouseleave', () => {
        this.tooltip.hide();
      });
    }
  }
  static #_ = this.ɵfac = function AutoTooltipDirective_Factory(t) {
    return new (t || AutoTooltipDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_tooltip__WEBPACK_IMPORTED_MODULE_1__.MatTooltip));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: AutoTooltipDirective,
    selectors: [["mat-icon"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_angular_material_tooltip__WEBPACK_IMPORTED_MODULE_1__.MatTooltip])]
  });
}

/***/ }),

/***/ 50016:
/*!**************************************************************!*\
  !*** ./src/shared/directives/common-directives.directive.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlphaNumericDirective: () => (/* binding */ AlphaNumericDirective),
/* harmony export */   OnlyAlphaDirective: () => (/* binding */ OnlyAlphaDirective),
/* harmony export */   OnlyNumberDirective: () => (/* binding */ OnlyNumberDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 28849);


class OnlyAlphaDirective {
  constructor(control) {
    this.control = control;
  }
  onInput(event) {
    const input = event.target;
    const cleaned = input.value.replace(/[^a-zA-Z ]/g, '');
    if (cleaned !== input.value) {
      input.value = cleaned;
      // 🔥 Update Angular form control manually
      this.control.control?.setValue(cleaned, {
        emitEvent: false
      });
    }
  }
  static #_ = this.ɵfac = function OnlyAlphaDirective_Factory(t) {
    return new (t || OnlyAlphaDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControl));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: OnlyAlphaDirective,
    selectors: [["", "appOnlyAlpha", ""]],
    hostBindings: function OnlyAlphaDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function OnlyAlphaDirective_input_HostBindingHandler($event) {
          return ctx.onInput($event);
        });
      }
    }
  });
}
class OnlyNumberDirective {
  constructor(control) {
    this.control = control;
  }
  onInput(event) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  }
  static #_ = this.ɵfac = function OnlyNumberDirective_Factory(t) {
    return new (t || OnlyNumberDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControl));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: OnlyNumberDirective,
    selectors: [["", "appOnlyNumber", ""]],
    hostBindings: function OnlyNumberDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function OnlyNumberDirective_input_HostBindingHandler($event) {
          return ctx.onInput($event);
        });
      }
    }
  });
}
class AlphaNumericDirective {
  onInput(event) {
    event.target.value = event.target.value.replace(/[^A-Za-z0-9 ]/g, '');
  }
  static #_ = this.ɵfac = function AlphaNumericDirective_Factory(t) {
    return new (t || AlphaNumericDirective)();
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: AlphaNumericDirective,
    selectors: [["", "appAlphaNumeric", ""]],
    hostBindings: function AlphaNumericDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function AlphaNumericDirective_input_HostBindingHandler($event) {
          return ctx.onInput($event);
        });
      }
    }
  });
}

/***/ }),

/***/ 23420:
/*!***********************************************************************!*\
  !*** ./src/shared/directives/common-directives.directives.modules.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DirectivesModule: () => (/* binding */ DirectivesModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _common_directives_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common-directives.directive */ 50016);
/* harmony import */ var _auto_tooltip_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auto-tooltip.directive */ 53183);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);




class DirectivesModule {
  static #_ = this.ɵfac = function DirectivesModule_Factory(t) {
    return new (t || DirectivesModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: DirectivesModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](DirectivesModule, {
    declarations: [_common_directives_directive__WEBPACK_IMPORTED_MODULE_0__.OnlyAlphaDirective, _common_directives_directive__WEBPACK_IMPORTED_MODULE_0__.OnlyNumberDirective, _common_directives_directive__WEBPACK_IMPORTED_MODULE_0__.AlphaNumericDirective, _auto_tooltip_directive__WEBPACK_IMPORTED_MODULE_1__.AutoTooltipDirective],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule],
    exports: [_common_directives_directive__WEBPACK_IMPORTED_MODULE_0__.OnlyAlphaDirective, _common_directives_directive__WEBPACK_IMPORTED_MODULE_0__.OnlyNumberDirective, _common_directives_directive__WEBPACK_IMPORTED_MODULE_0__.AlphaNumericDirective, _auto_tooltip_directive__WEBPACK_IMPORTED_MODULE_1__.AutoTooltipDirective]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_shared_directives_common-directives_directives_modules_ts.js.map