"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_login_login_module_ts"],{

/***/ 66860:
/*!***********************************************!*\
  !*** ./src/app/login/login-routing.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginRoutingModule: () => (/* binding */ LoginRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.component */ 2014);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent
}];
class LoginRoutingModule {
  static #_ = this.ɵfac = function LoginRoutingModule_Factory(t) {
    return new (t || LoginRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: LoginRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](LoginRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 2014:
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginComponent: () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/service/local-storage.service */ 48798);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var ng_otp_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng-otp-input */ 22662);










function LoginComponent_div_11_span_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function LoginComponent_div_11_span_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Logging in...");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function LoginComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 12)(1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, " Welcome to ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "DESKDYNE!");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Please login to your account.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "form", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngSubmit", function LoginComponent_div_11_Template_form_ngSubmit_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r4.login());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 17)(9, "div", 18)(10, "mat-form-field", 19)(11, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "Admin/User ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function LoginComponent_div_11_Template_input_ngModelChange_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r5);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r6.adminId = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div", 21)(15, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, LoginComponent_div_11_span_16_Template, 2, 0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, LoginComponent_div_11_span_17_Template, 2, 0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx_r0.adminId);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !ctx_r0.adminId || ctx_r0.isLoggingIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r0.isLoggingIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.isLoggingIn);
  }
}
function LoginComponent_div_12_span_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Verify");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function LoginComponent_div_12_span_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Verifying...");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
const _c0 = function () {
  return {
    length: 6,
    allowNumbersOnly: true
  };
};
function LoginComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 24)(1, "div", 25)(2, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LoginComponent_div_12_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r9.backToLogin());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, " \u2190 Back to Login ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "h4", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Enter OTP");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, " Check your registered mobile for a 6-digit code. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 29)(9, "ng-otp-input", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("onInputChange", function LoginComponent_div_12_Template_ng_otp_input_onInputChange_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r11.onOtpChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LoginComponent_div_12_Template_button_click_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r12.verifyOTP());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, LoginComponent_div_12_span_11_Template, 2, 0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, LoginComponent_div_12_span_12_Template, 2, 0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LoginComponent_div_12_Template_div_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r13.timer === 0 && ctx_r13.resendOTP());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("config", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](7, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !ctx_r1.isOTPComplete() || ctx_r1.isVerifying);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r1.isVerifying);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.isVerifying);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("active", ctx_r1.timer === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.timer === 0 ? "Resend OTP" : "Resend in " + ctx_r1.timer + "s", " ");
  }
}
class LoginComponent {
  constructor(localStorageService, router, apiMainService) {
    this.localStorageService = localStorageService;
    this.router = router;
    this.apiMainService = apiMainService;
    this.showOTP = false;
    this.adminId = '';
    this.password = '';
    this.otp = '';
    this.timer = 0;
    this.isLoggingIn = false;
    this.isVerifying = false;
  }
  ngOnInit() {
    this.checkIfTokenPresent();
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  checkIfTokenPresent() {
    const ADMIN_ID = this.localStorageService.getCacheData('ADMIN_ID');
    const ADMIN_TOKEN = this.localStorageService.getCacheData('ADMIN_TOKEN');
    if (ADMIN_ID && ADMIN_TOKEN) {
      this.router.navigate(['/home']);
    }
  }
  login() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this.adminId || _this.isLoggingIn) return;
      try {
        _this.isLoggingIn = true;
        const id = _this.adminId.toUpperCase();
        _this.adminId = id;
        yield _this.apiMainService.loginAdmin({
          adminId: id
        });
        _this.showOTP = true;
        _this.resetOtp();
        _this.startTimer();
      } catch (error) {
        console.log('error while login ', error);
        // You can show snackbar/toast here
      } finally {
        _this.isLoggingIn = false;
      }
    })();
  }
  verifyOTP() {
    var _this2 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this2.isOTPComplete() || _this2.isVerifying) return;
      try {
        _this2.isVerifying = true;
        const loginObj = yield _this2.apiMainService.verifyOTP({
          adminId: _this2.adminId,
          password: _this2.password
        });
        _this2.localStorageService.setCacheData('ADMIN_ID', _this2.adminId);
        _this2.localStorageService.setCacheData('ADMIN_TOKEN', loginObj.token);
        _this2.router.navigate(['/home']);
      } catch (error) {
        console.log('error while verifying otp ', error);
        // You can show snackbar/toast here and maybe reset OTP
      } finally {
        _this2.isVerifying = false;
      }
    })();
  }
  backToLogin() {
    this.showOTP = false;
    this.resetOtp();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.timer = 0;
  }
  onOtpChange(otp) {
    this.otp = otp;
    this.password = otp;
  }
  isOTPComplete() {
    return this.otp && this.otp.length === 6;
  }
  startTimer() {
    this.timer = 30;
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }
  resendOTP() {
    var _this3 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this3.timer !== 0) return;
      yield _this3.apiMainService.loginAdmin({
        adminId: _this3.adminId
      });
      _this3.startTimer();
    })();
  }
  resetOtp() {
    this.otp = '';
    this.password = '';
  }
  static #_ = this.ɵfac = function LoginComponent_Factory(t) {
    return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_service_local_storage_service__WEBPACK_IMPORTED_MODULE_1__.LocalStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_2__.ApiMainService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: LoginComponent,
    selectors: [["app-login"]],
    decls: 13,
    vars: 2,
    consts: [[1, "login-wrapper"], [1, "row", "g-0", "min-vh-100"], [1, "col-12", "col-md-8", "px-0", "d-none", "d-md-flex"], [1, "login-img", "h-100", "position-relative"], [1, "logo-desktop"], ["src", "assets/images/logos/DeskDyne-Logo-01.png", "alt", "DeskDyne Logo"], ["src", "assets/login/LoginImage.png", "alt", "DeskDyne login banner", 1, "login-hero-img"], [1, "col-12", "col-md-4", "forms", "d-flex", "align-items-center", "justify-content-center"], [1, "form-container"], [1, "logo-mobile", "d-md-none", "text-center", "mb-3"], ["class", "login-form", 4, "ngIf"], ["class", "otp-form", 4, "ngIf"], [1, "login-form"], [1, "login-title"], [1, "fw-bold"], [1, "text-muted", "mb-3"], ["novalidate", "", 3, "ngSubmit"], [1, "row", "gx-0"], [1, "col-12", "mb-3"], ["appearance", "outline", 1, "w-100"], ["matInput", "", "type", "text", "name", "adminID", "placeholder", "Enter your ID here", "autocomplete", "off", 3, "ngModel", "ngModelChange"], [1, "col-12"], ["type", "submit", 1, "btn", "login-btn", 3, "disabled"], [4, "ngIf"], [1, "otp-form"], [1, "otp-container"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-secondary", "back-btn", "mb-2", 3, "click"], [1, "otp-title", "mb-2"], [1, "otp-subtitle", "text-muted", "mb-3"], [1, "otp-inputs", "mb-3", "justify-content-center", "d-flex"], [3, "config", "onInputChange"], [1, "btn", "verify-btn", "mb-2", 3, "disabled", "click"], [1, "resend-text", 3, "click"]],
    template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 7)(8, "div", 8)(9, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, LoginComponent_div_11_Template, 18, 4, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, LoginComponent_div_12_Template, 15, 8, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.showOTP);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.showOTP);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_material_input__WEBPACK_IMPORTED_MODULE_6__.MatInput, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatLabel, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgForm, ng_otp_input__WEBPACK_IMPORTED_MODULE_9__.NgOtpInputComponent],
    styles: [".login-wrapper[_ngcontent-%COMP%] {\n  background: #f5f7fb;\n}\n\n\n\n.login-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: #f8fafb;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.login-img[_ngcontent-%COMP%]   .login-hero-img[_ngcontent-%COMP%] {\n  width: 90%;\n  height: 65%;\n  object-fit: contain;\n  display: block;\n}\n\n.logo-desktop[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 20px;\n  left: 20px;\n  z-index: 2;\n}\n.logo-desktop[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 140px;\n  height: auto;\n}\n\n\n\n.forms[_ngcontent-%COMP%] {\n  background: #ffffff !important;\n  padding: 24px;\n}\n\n.form-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 380px;\n}\n\n.logo-mobile[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 120px;\n  height: auto;\n}\n\n.login-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.login-form[_ngcontent-%COMP%]   .login-title[_ngcontent-%COMP%] {\n  font-size: 26px;\n  margin-top: 10px;\n  font-weight: 600;\n  margin-bottom: 4px;\n}\n.login-form[_ngcontent-%COMP%]   .login-btn[_ngcontent-%COMP%] {\n  background: #0e49b5;\n  color: #ffffff;\n  width: 100%;\n  padding: 10px;\n  font-size: 16px;\n  border-radius: 8px;\n  border: none;\n}\n.login-form[_ngcontent-%COMP%]   .login-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n\n\n\n.otp-form[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n}\n\n.otp-container[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: left;\n}\n\n.back-btn[_ngcontent-%COMP%] {\n  padding-inline: 10px;\n}\n\n.otp-title[_ngcontent-%COMP%] {\n  color: #192754;\n  margin-top: 10px;\n  font-weight: 600;\n  margin-bottom: 0;\n}\n\n.otp-subtitle[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n\n.otp-inputs[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 15px;\n  margin-bottom: 2rem;\n}\n\n.otp-box[_ngcontent-%COMP%] {\n  width: 45px;\n  height: 45px;\n  border: 2px solid #d9d9d9;\n  border-radius: 5px;\n  font-size: 22px;\n  text-align: center;\n  outline: none;\n  transition: 0.2s;\n}\n\n.otp-box[_ngcontent-%COMP%]:focus {\n  border-color: #0e49b5;\n  box-shadow: 0 0 0 3px rgba(14, 73, 181, 0.2);\n}\n\n.verify-btn[_ngcontent-%COMP%] {\n  background: #0e49b5;\n  color: #ffffff;\n  width: 100%;\n  padding: 8px;\n  font-size: 16px;\n  border-radius: 8px;\n  border: none;\n}\n\n.verify-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n\n.resend-text[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  font-size: 13px;\n  color: #999;\n  text-align: center;\n  pointer-events: none;\n  transition: 0.2s;\n}\n.resend-text.active[_ngcontent-%COMP%] {\n  color: #192754;\n  cursor: pointer;\n  pointer-events: auto;\n  font-weight: 500;\n}\n\n\n\n@media (max-width: 768px) {\n  .forms[_ngcontent-%COMP%] {\n    min-height: 100vh;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 24px;\n  }\n  .form-container[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n}\n@media (max-width: 576px) {\n  .otp-box[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n    font-size: 20px;\n  }\n  .otp-inputs[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n}\n@media (max-width: 360px) {\n  .otp-box[_ngcontent-%COMP%] {\n    width: 34px;\n    height: 34px;\n    font-size: 18px;\n  }\n  .otp-inputs[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBQTtBQUNGOztBQUVBLGVBQUE7QUFDQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7QUFDRTtFQUNFLFVBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBR0E7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsVUFBQTtBQUFGO0FBRUU7RUFDRSxZQUFBO0VBQ0EsWUFBQTtBQUFKOztBQUlBLGdCQUFBO0FBQ0E7RUFDRSw4QkFBQTtFQUNBLGFBQUE7QUFERjs7QUFJQTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtBQURGOztBQUlBO0VBQ0UsWUFBQTtFQUNBLFlBQUE7QUFERjs7QUFJQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0FBREY7QUFHRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFESjtBQUlFO0VBQ0UsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FBRko7QUFLRTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtBQUhKOztBQU9BLGdCQUFBO0FBQ0E7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7QUFKRjs7QUFPQTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtBQUpGOztBQU9BO0VBQ0Usb0JBQUE7QUFKRjs7QUFPQTtFQUNFLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFKRjs7QUFPQTtFQUNFLGVBQUE7QUFKRjs7QUFPQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtBQUpGOztBQU9BO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0FBSkY7O0FBT0E7RUFDRSxxQkFBQTtFQUNBLDRDQUFBO0FBSkY7O0FBT0E7RUFDRSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUFKRjs7QUFPQTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtBQUpGOztBQU9BO0VBQ0UsZUFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtFQUNBLGdCQUFBO0FBSkY7QUFNRTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtBQUpKOztBQVFBLGVBQUE7QUFDQTtFQUNFO0lBQ0UsaUJBQUE7SUFDQSxhQUFBO0lBQ0EsbUJBQUE7SUFDQSx1QkFBQTtJQUNBLGFBQUE7RUFMRjtFQVFBO0lBQ0UsZUFBQTtFQU5GO0FBQ0Y7QUFTQTtFQUNFO0lBQ0UsV0FBQTtJQUNBLFlBQUE7SUFDQSxlQUFBO0VBUEY7RUFVQTtJQUNFLFNBQUE7RUFSRjtBQUNGO0FBV0E7RUFDRTtJQUNFLFdBQUE7SUFDQSxZQUFBO0lBQ0EsZUFBQTtFQVRGO0VBWUE7SUFDRSxRQUFBO0VBVkY7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5sb2dpbi13cmFwcGVyIHtcclxuICBiYWNrZ3JvdW5kOiAjZjVmN2ZiO1xyXG59XHJcblxyXG4vKiBMRUZUIFBBTkVMICovXHJcbi5sb2dpbi1pbWcge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmYWZiO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblxyXG4gIC5sb2dpbi1oZXJvLWltZyB7XHJcbiAgICB3aWR0aDogOTAlO1xyXG4gICAgaGVpZ2h0OiA2NSU7XHJcbiAgICBvYmplY3QtZml0OiBjb250YWluO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgfVxyXG59XHJcblxyXG4ubG9nby1kZXNrdG9wIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAyMHB4O1xyXG4gIGxlZnQ6IDIwcHg7XHJcbiAgei1pbmRleDogMjtcclxuXHJcbiAgaW1nIHtcclxuICAgIHdpZHRoOiAxNDBweDtcclxuICAgIGhlaWdodDogYXV0bztcclxuICB9XHJcbn1cclxuXHJcbi8qIFJJR0hUIFBBTkVMICovXHJcbi5mb3JtcyB7XHJcbiAgYmFja2dyb3VuZDogI2ZmZmZmZiAhaW1wb3J0YW50O1xyXG4gIHBhZGRpbmc6IDI0cHg7XHJcbn1cclxuXHJcbi5mb3JtLWNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWF4LXdpZHRoOiAzODBweDtcclxufVxyXG5cclxuLmxvZ28tbW9iaWxlIGltZyB7XHJcbiAgd2lkdGg6IDEyMHB4O1xyXG4gIGhlaWdodDogYXV0bztcclxufVxyXG5cclxuLmxvZ2luLWZvcm0ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHJcbiAgLmxvZ2luLXRpdGxlIHtcclxuICAgIGZvbnQtc2l6ZTogMjZweDtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNHB4O1xyXG4gIH1cclxuXHJcbiAgLmxvZ2luLWJ0biB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMGU0OWI1O1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgfVxyXG5cclxuICAubG9naW4tYnRuOmRpc2FibGVkIHtcclxuICAgIG9wYWNpdHk6IDAuNztcclxuICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XHJcbiAgfVxyXG59XHJcblxyXG4vKiBPVFAgU0VDVElPTiAqL1xyXG4ub3RwLWZvcm0ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLm90cC1jb250YWluZXIge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbn1cclxuXHJcbi5iYWNrLWJ0biB7XHJcbiAgcGFkZGluZy1pbmxpbmU6IDEwcHg7XHJcbn1cclxuXHJcbi5vdHAtdGl0bGUge1xyXG4gIGNvbG9yOiAjMTkyNzU0O1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBtYXJnaW4tYm90dG9tOiAwO1xyXG59XHJcblxyXG4ub3RwLXN1YnRpdGxlIHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbi5vdHAtaW5wdXRzIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGdhcDogMTVweDtcclxuICBtYXJnaW4tYm90dG9tOiAycmVtO1xyXG59XHJcblxyXG4ub3RwLWJveCB7XHJcbiAgd2lkdGg6IDQ1cHg7XHJcbiAgaGVpZ2h0OiA0NXB4O1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkICNkOWQ5ZDk7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIGZvbnQtc2l6ZTogMjJweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgb3V0bGluZTogbm9uZTtcclxuICB0cmFuc2l0aW9uOiAwLjJzO1xyXG59XHJcblxyXG4ub3RwLWJveDpmb2N1cyB7XHJcbiAgYm9yZGVyLWNvbG9yOiAjMGU0OWI1O1xyXG4gIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDE0LCA3MywgMTgxLCAwLjIpO1xyXG59XHJcblxyXG4udmVyaWZ5LWJ0biB7XHJcbiAgYmFja2dyb3VuZDogIzBlNDliNTtcclxuICBjb2xvcjogI2ZmZmZmZjtcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiA4cHg7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBib3JkZXI6IG5vbmU7XHJcbn1cclxuXHJcbi52ZXJpZnktYnRuOmRpc2FibGVkIHtcclxuICBvcGFjaXR5OiAwLjc7XHJcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcclxufVxyXG5cclxuLnJlc2VuZC10ZXh0IHtcclxuICBtYXJnaW4tdG9wOiA4cHg7XHJcbiAgZm9udC1zaXplOiAxM3B4O1xyXG4gIGNvbG9yOiAjOTk5O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICB0cmFuc2l0aW9uOiAwLjJzO1xyXG5cclxuICAmLmFjdGl2ZSB7XHJcbiAgICBjb2xvcjogIzE5Mjc1NDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICB9XHJcbn1cclxuXHJcbi8qIFJFU1BPTlNJVkUgKi9cclxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgLmZvcm1zIHtcclxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDI0cHg7XHJcbiAgfVxyXG5cclxuICAuZm9ybS1jb250YWluZXIge1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDU3NnB4KSB7XHJcbiAgLm90cC1ib3gge1xyXG4gICAgd2lkdGg6IDQwcHg7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgfVxyXG5cclxuICAub3RwLWlucHV0cyB7XHJcbiAgICBnYXA6IDEwcHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogMzYwcHgpIHtcclxuICAub3RwLWJveCB7XHJcbiAgICB3aWR0aDogMzRweDtcclxuICAgIGhlaWdodDogMzRweDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICB9XHJcblxyXG4gIC5vdHAtaW5wdXRzIHtcclxuICAgIGdhcDogOHB4O1xyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 17660:
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginModule: () => (/* binding */ LoginModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login-routing.module */ 66860);
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.component */ 2014);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var ng_otp_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-otp-input */ 22662);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);









class LoginModule {
  static #_ = this.ɵfac = function LoginModule_Factory(t) {
    return new (t || LoginModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: LoginModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_4__.MatInputModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormFieldModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _login_routing_module__WEBPACK_IMPORTED_MODULE_0__.LoginRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, ng_otp_input__WEBPACK_IMPORTED_MODULE_8__.NgOtpInputModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](LoginModule, {
    declarations: [_login_component__WEBPACK_IMPORTED_MODULE_1__.LoginComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_4__.MatInputModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormFieldModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _login_routing_module__WEBPACK_IMPORTED_MODULE_0__.LoginRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, ng_otp_input__WEBPACK_IMPORTED_MODULE_8__.NgOtpInputModule]
  });
})();

/***/ }),

/***/ 22662:
/*!*************************************************************!*\
  !*** ./node_modules/ng-otp-input/fesm2022/ng-otp-input.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NgOtpInputComponent: () => (/* binding */ NgOtpInputComponent),
/* harmony export */   NgOtpInputConfig: () => (/* binding */ Config),
/* harmony export */   NgOtpInputModule: () => (/* binding */ NgOtpInputModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 72513);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 20274);







function NgOtpInputComponent_div_0_ng_container_2_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r6.config.separator, " ");
  }
}
const _c0 = function (a0) {
  return {
    "error-input": a0
  };
};
function NgOtpInputComponent_div_0_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", 4, 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("paste", function NgOtpInputComponent_div_0_ng_container_2_Template_input_paste_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r7.handlePaste($event));
    })("keyup", function NgOtpInputComponent_div_0_ng_container_2_Template_input_keyup_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const i_r3 = restoredCtx.index;
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r9.onKeyUp($event, i_r3));
    })("input", function NgOtpInputComponent_div_0_ng_container_2_Template_input_input_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const i_r3 = restoredCtx.index;
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r10.onInput($event, i_r3));
    })("keydown", function NgOtpInputComponent_div_0_ng_container_2_Template_input_keydown_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const i_r3 = restoredCtx.index;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r11.onKeyDown($event, i_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, NgOtpInputComponent_div_0_ng_container_2_span_3_Template, 2, 1, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const last_r4 = ctx.last;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("otp-input ", ctx_r1.config.inputClass, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("pattern", ctx_r1.config.allowNumbersOnly ? "\\d*" : "")("type", ctx_r1.inputType)("placeholder", (ctx_r1.config == null ? null : ctx_r1.config.placeholder) || "")("ngStyle", ctx_r1.config.inputStyles)("formControl", ctx_r1.otpForm.controls[item_r2])("id", ctx_r1.getBoxId(i_r3))("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](11, _c0, (ctx_r1.config == null ? null : ctx_r1.config.showError) && (ctx_r1.formControl == null ? null : ctx_r1.formControl.invalid) && ((ctx_r1.formControl == null ? null : ctx_r1.formControl.dirty) || (ctx_r1.formControl == null ? null : ctx_r1.formControl.touched))));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.config.separator && !last_r4);
  }
}
function NgOtpInputComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("focusin", function NgOtpInputComponent_div_0_Template_div_focusin_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r12.onFocusIn());
    })("focusout", function NgOtpInputComponent_div_0_Template_div_focusout_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r14.onFocusOut());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, NgOtpInputComponent_div_0_ng_container_2_Template, 4, 13, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("ng-otp-input-wrapper wrapper ", ctx_r0.config.containerClass, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("id", "c_", ctx_r0.componentKey, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", ctx_r0.config.containerStyles);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.controlKeys);
  }
}
class KeyboardUtil {
  static ifTab(event) {
    return this.ifKey(event, 'Tab');
  }
  static ifDelete(event) {
    return this.ifKey(event, 'Delete;Del');
  }
  static ifBackspace(event) {
    return this.ifKey(event, 'Backspace');
  }
  static ifRightArrow(event) {
    return this.ifKey(event, 'ArrowRight;Right');
  }
  static ifLeftArrow(event) {
    return this.ifKey(event, 'ArrowLeft;Left');
  }
  static ifSpacebar(event) {
    return this.ifKey(event, 'Spacebar; '); //don't remove the space after ; as this will check for space key
  }

  static ifKey(event, keys) {
    let keysToCheck = keys.split(';');
    return keysToCheck.some(k => k === event.key);
  }
}
class ObjectUtil {
  static keys(obj) {
    if (!obj) return [];
    return Object.keys(obj);
  }
}
class NgOtpInputComponent {
  set disabled(isDisabled) {
    this.setDisabledState(isDisabled);
  }
  get inputType() {
    return this.config?.isPasswordInput ? 'password' : this.config?.allowNumbersOnly ? 'tel' : 'text';
  }
  get controlKeys() {
    return ObjectUtil.keys(this.otpForm?.controls);
  }
  get formControl() {
    return this.formCtrl ?? this.inj?.get(_angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControl);
  }
  constructor(document, inj) {
    this.document = document;
    this.inj = inj;
    this.config = {
      length: 4
    };
    this.onBlur = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
    this.onInputChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
    this.inputControls = new Array(this.config.length);
    this.componentKey = Math.random().toString(36).substring(2) + new Date().getTime().toString(36);
    this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
    this.activeFocusCount = 0;
    this.onChange = () => {};
    this.onTouched = () => {};
    this._isDisabled = false;
  }
  ngOnInit() {
    this.otpForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroup({});
    for (let index = 0; index < this.config.length; index++) {
      this.otpForm.addControl(this.getControlName(index), new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl());
    }
    this.otpForm.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this.destroy$)).subscribe(v => {
      ObjectUtil.keys(this.otpForm.controls).forEach(k => {
        var val = this.otpForm.controls[k].value;
        if (val && val.length > 1) {
          if (val.length >= this.config.length) {
            this.setValue(val);
          } else {
            this.rebuildValue();
          }
        }
      });
    });
  }
  setDisabledState(isDisabled) {
    this._isDisabled = isDisabled; // Update local state
    if (this.otpForm) {
      if (isDisabled) {
        this.otpForm.disable({
          emitEvent: false
        }); // Disable form group
      } else {
        this.otpForm.enable({
          emitEvent: false
        }); // Enable form group
      }
    }
  }

  writeValue(value) {
    this.currentVal = !this.hasVal(value) ? null : value;
    this.setValue(this.currentVal);
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  onFocusIn() {
    this.onTouched();
    this.activeFocusCount++;
  }
  onFocusOut() {
    setTimeout(() => {
      this.activeFocusCount--;
      if (this.activeFocusCount === 0) {
        this.onTouched();
        this.onBlur.next();
      }
    }, 0);
  }
  ngAfterViewInit() {
    if (!this.config.disableAutoFocus) {
      const containerItem = this.document.getElementById(`c_${this.componentKey}`);
      if (containerItem) {
        const ele = containerItem.getElementsByClassName('otp-input')[0];
        if (ele && ele.focus) {
          ele.focus();
        }
      }
    }
  }
  getControlName(idx) {
    return `ctrl_${idx}`;
  }
  onKeyDown($event, inputIdx) {
    const prevInputId = this.getBoxId(inputIdx - 1);
    const currentInputId = this.getBoxId(inputIdx);
    if (KeyboardUtil.ifKey($event, 'Enter')) {
      let inp = this.document.getElementById(currentInputId);
      const form = inp?.closest('form');
      if (form) {
        $event.preventDefault();
        const submitEvent = new Event('submit', {
          bubbles: true,
          cancelable: true
        });
        form.dispatchEvent(submitEvent);
        return;
      }
    }
    if (KeyboardUtil.ifSpacebar($event)) {
      $event.preventDefault();
      return false;
    }
    if (KeyboardUtil.ifBackspace($event)) {
      if (!$event.target.value) {
        this.clearInput(prevInputId, inputIdx - 1);
        this.setSelected(prevInputId);
      } else {
        this.clearInput(currentInputId, inputIdx);
      }
      this.rebuildValue();
      return;
    }
    if (KeyboardUtil.ifDelete($event)) {
      if (!$event.target.value) {
        this.clearInput(prevInputId, inputIdx - 1);
        this.setSelected(prevInputId);
      } else {
        this.clearInput(currentInputId, inputIdx);
      }
      this.rebuildValue();
      return;
    }
  }
  hasVal(val) {
    return val != null && val != undefined && (!val?.trim || val.trim() != '');
  }
  onInput($event, inputIdx) {
    let newVal = this.hasVal(this.currentVal) ? `${this.currentVal}${$event.target.value}` : $event.target.value;
    if (this.config.allowNumbersOnly && !this.validateNumber(newVal)) {
      $event.target.value = null;
      $event.stopPropagation();
      $event.preventDefault();
      this.clearInput(null, inputIdx);
      return;
    }
    if (this.ifValidKeyCode(null, $event.target.value)) {
      const nextInputId = this.getBoxId(inputIdx + 1);
      this.setSelected(nextInputId);
      this.rebuildValue();
    } else {
      $event.target.value = null;
      let ctrlName = this.getControlName(inputIdx);
      this.otpForm.controls[ctrlName]?.setValue(null);
      this.rebuildValue();
    }
  }
  onKeyUp($event, inputIdx) {
    if (KeyboardUtil.ifTab($event)) {
      inputIdx -= 1;
    }
    const nextInputId = this.getBoxId(inputIdx + 1);
    const prevInputId = this.getBoxId(inputIdx - 1);
    if (KeyboardUtil.ifRightArrow($event)) {
      $event.preventDefault();
      this.setSelected(nextInputId);
      return;
    }
    if (KeyboardUtil.ifLeftArrow($event)) {
      $event.preventDefault();
      this.setSelected(prevInputId);
      return;
    }
  }
  validateNumber(val) {
    return val && /^[0-9]+$/.test(val);
  }
  getBoxId(idx) {
    return `otp_${idx}_${this.componentKey}`;
  }
  clearInput(eleId, inputIdx) {
    let ctrlName = this.getControlName(inputIdx);
    this.otpForm.controls[ctrlName]?.setValue(null);
    if (eleId) {
      const ele = this.document.getElementById(eleId);
      if (ele && ele instanceof HTMLInputElement) {
        ele.value = null;
      }
    }
  }
  setSelected(eleId) {
    this.focusTo(eleId);
    const ele = this.document.getElementById(eleId);
    if (ele && ele.setSelectionRange) {
      setTimeout(() => {
        ele.setSelectionRange(0, 1);
      }, 0);
    }
  }
  ifValidKeyCode(event, val) {
    const inp = val ?? event.key;
    if (this.config?.allowNumbersOnly) {
      return this.validateNumber(inp);
    }
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile || /^[a-zA-Z0-9%*_\-@#$!]$/.test(inp) && inp.length == 1;
  }
  focusTo(eleId) {
    const ele = this.document.getElementById(eleId);
    if (ele) {
      ele.focus();
    }
  }
  // method to set component value
  setValue(value) {
    if (this.config.allowNumbersOnly && isNaN(value)) {
      return;
    }
    this.otpForm?.reset();
    if (!this.hasVal(value)) {
      this.rebuildValue();
      return;
    }
    value = value.toString().replace(/\s/g, ''); // remove whitespace
    Array.from(value).forEach((c, idx) => {
      if (this.otpForm.get(this.getControlName(idx))) {
        this.otpForm.get(this.getControlName(idx)).setValue(c);
      }
    });
    if (!this.config.disableAutoFocus) {
      setTimeout(() => {
        const containerItem = this.document.getElementById(`c_${this.componentKey}`);
        var indexOfElementToFocus = value.length < this.config.length ? value.length : this.config.length - 1;
        let ele = containerItem.getElementsByClassName('otp-input')[indexOfElementToFocus];
        if (ele && ele.focus) {
          setTimeout(() => {
            ele.focus();
          }, 1);
        }
      }, 0);
    }
    this.rebuildValue();
  }
  rebuildValue() {
    let val = null;
    ObjectUtil.keys(this.otpForm.controls).forEach(k => {
      let ctrlVal = this.otpForm.controls[k].value;
      if (ctrlVal) {
        let isLengthExceed = ctrlVal.length > 1;
        let isCaseTransformEnabled = !this.config.allowNumbersOnly && this.config.letterCase && (this.config.letterCase.toLocaleLowerCase() == 'upper' || this.config.letterCase.toLocaleLowerCase() == 'lower');
        ctrlVal = ctrlVal[0];
        let transformedVal = isCaseTransformEnabled ? this.config.letterCase.toLocaleLowerCase() == 'upper' ? ctrlVal.toUpperCase() : ctrlVal.toLowerCase() : ctrlVal;
        if (isCaseTransformEnabled && transformedVal == ctrlVal) {
          isCaseTransformEnabled = false;
        } else {
          ctrlVal = transformedVal;
        }
        if (val == null) {
          val = ctrlVal;
        } else {
          val += ctrlVal;
        }
        if (isLengthExceed || isCaseTransformEnabled) {
          this.otpForm.controls[k].setValue(ctrlVal);
        }
      }
    });
    if (this.currentVal != val) {
      this.currentVal = val;
      this.onChange(val);
      if (this.formCtrl?.setValue) {
        this.formCtrl.setValue(val);
      }
      this.onInputChange.next(val);
    }
  }
  handlePaste(e) {
    // Get pasted data via clipboard API
    let clipboardData = e.clipboardData || window['clipboardData'];
    if (clipboardData) {
      var pastedData = clipboardData.getData('Text');
    }
    e.stopPropagation();
    e.preventDefault();
    if (!pastedData || this.config.allowNumbersOnly && !this.validateNumber(pastedData)) {
      return;
    }
    this.setValue(pastedData);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /** @nocollapse */
  static #_ = this.ɵfac = function NgOtpInputComponent_Factory(t) {
    return new (t || NgOtpInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_4__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector));
  };
  /** @nocollapse */
  static #_2 = this.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: NgOtpInputComponent,
    selectors: [["ng-otp-input"], ["ngx-otp-input"]],
    inputs: {
      config: "config",
      formCtrl: "formCtrl",
      disabled: "disabled"
    },
    outputs: {
      onBlur: "onBlur",
      onInputChange: "onInputChange"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NG_VALUE_ACCESSOR,
      useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => NgOtpInputComponent),
      multi: true
    }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 1,
    vars: 1,
    consts: [["tabindex", "0", 3, "class", "id", "ngStyle", "focusin", "focusout", 4, "ngIf"], ["tabindex", "0", 3, "id", "ngStyle", "focusin", "focusout"], [1, "n-o-c"], [4, "ngFor", "ngForOf"], ["autocomplete", "one-time-code", 3, "pattern", "type", "placeholder", "ngStyle", "formControl", "id", "ngClass", "paste", "keyup", "input", "keydown"], ["inp", ""], [4, "ngIf"]],
    template: function NgOtpInputComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, NgOtpInputComponent_div_0_Template, 3, 6, "div", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.otpForm == null ? null : ctx.otpForm.controls);
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.PatternValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlDirective, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgStyle, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass],
    styles: [".otp-input[_ngcontent-%COMP%]{width:50px;height:50px;border-radius:4px;border:solid 1px #c5c5c5;text-align:center;font-size:32px}.ng-otp-input-wrapper[_ngcontent-%COMP%]   .otp-input[_ngcontent-%COMP%]{margin:0 .51rem}.ng-otp-input-wrapper[_ngcontent-%COMP%]   .otp-input[_ngcontent-%COMP%]:first-child{margin-left:0}.ng-otp-input-wrapper[_ngcontent-%COMP%]   .otp-input[_ngcontent-%COMP%]:last-child{margin-right:0}.n-o-c[_ngcontent-%COMP%]{display:flex;align-items:center}.error-input[_ngcontent-%COMP%]{border-color:red}@media screen and (max-width: 767px){.otp-input[_ngcontent-%COMP%]{width:40px;font-size:24px;height:40px}}@media screen and (max-width: 420px){.otp-input[_ngcontent-%COMP%]{width:30px;font-size:18px;height:30px}}"]
  });
}
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgOtpInputComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'ng-otp-input, ngx-otp-input',
      imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__.ReactiveFormsModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgStyle, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass],
      providers: [{
        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NG_VALUE_ACCESSOR,
        useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => NgOtpInputComponent),
        multi: true
      }],
      template: "<div class=\"ng-otp-input-wrapper wrapper {{config.containerClass}}\" id=\"c_{{componentKey}}\" *ngIf=\"otpForm?.controls\"\r\n  [ngStyle]=\"config.containerStyles\" tabindex=\"0\" \r\n  (focusin)=\"onFocusIn()\" \r\n  (focusout)=\"onFocusOut()\">\r\n  <div class=\"n-o-c\">\r\n    <ng-container *ngFor=\"let item of controlKeys;let i=index;let last=last\">\r\n      <input (paste)=\"handlePaste($event)\" [pattern]=\"config.allowNumbersOnly ? '\\\\d*' : ''\" [type]=\"inputType\"  [placeholder]=\"config?.placeholder || ''\"\r\n      [ngStyle]=\"config.inputStyles\" \r\n      class=\"otp-input {{config.inputClass}}\" autocomplete=\"one-time-code\" \r\n      [formControl]=\"otpForm.controls[item]\" #inp [id]=\"getBoxId(i)\" \r\n      (keyup)=\"onKeyUp($event,i)\" (input)=\"onInput($event,i)\" (keydown)=\"onKeyDown($event,i)\" [ngClass]=\"{'error-input': (config?.showError && formControl?.invalid && (formControl?.dirty || formControl?.touched))}\">\r\n      <span *ngIf=\"config.separator && !last\">\r\n        {{config.separator}}\r\n      </span>\r\n    </ng-container>\r\n  </div>  \r\n</div>",
      styles: [".otp-input{width:50px;height:50px;border-radius:4px;border:solid 1px #c5c5c5;text-align:center;font-size:32px}.ng-otp-input-wrapper .otp-input{margin:0 .51rem}.ng-otp-input-wrapper .otp-input:first-child{margin-left:0}.ng-otp-input-wrapper .otp-input:last-child{margin-right:0}.n-o-c{display:flex;align-items:center}.error-input{border-color:red}@media screen and (max-width: 767px){.otp-input{width:40px;font-size:24px;height:40px}}@media screen and (max-width: 420px){.otp-input{width:30px;font-size:18px;height:30px}}\n"]
    }]
  }], () => [{
    type: Document,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
      args: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.DOCUMENT]
    }]
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector
  }], {
    config: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    formCtrl: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    onBlur: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    onInputChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }]
  });
})();
class NgOtpInputModule {
  /** @nocollapse */
  static #_ = this.ɵfac = function NgOtpInputModule_Factory(t) {
    return new (t || NgOtpInputModule)();
  };
  /** @nocollapse */
  static #_2 = this.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: NgOtpInputModule
  });
  /** @nocollapse */
  static #_3 = this.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [NgOtpInputComponent]
  });
}
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgOtpInputModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [NgOtpInputComponent],
      exports: [NgOtpInputComponent]
    }]
  }], null, null);
})();
class Config {}

/*
 * Public API Surface of ng-otp-input
 */

/**
 * Generated bundle index. Do not edit.
 */



/***/ })

}]);
//# sourceMappingURL=src_app_login_login_module_ts.js.map