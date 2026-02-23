"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["src_app_org-components_audit-report_pdf-preview-dialog_pdf-preview-dialog_component_ts"],{

/***/ 92199:
/*!************************************************************************************************!*\
  !*** ./src/app/org-components/audit-report/pdf-preview-dialog/pdf-preview-dialog.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PdfPreviewDialogComponent: () => (/* binding */ PdfPreviewDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 17401);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 36480);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 86515);







function PdfPreviewDialogComponent_iframe_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "iframe", 9);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r0.pdfUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeResourceUrl"]);
  }
}
function PdfPreviewDialogComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r1.pdfUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function PdfPreviewDialogComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "No PDF URL provided.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
}
class PdfPreviewDialogComponent {
  constructor(dialogRef, data, sanitizer) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.sanitizer = sanitizer;
    this.pdfUrl = null;
    this.rawUrl = '';
    this.fileName = 'document.pdf';
    this.isImage = false;
    console.log(data);
    if (data.url) {
      this.rawUrl = data.url;
      this.fileName = data.fileName || 'document.pdf';
      // Check if it's an image based on extension or if explicitly told
      const extension = this.rawUrl.split('.').pop()?.toLowerCase();
      this.isImage = data.isImage || extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif' || extension === 'webp';
      if (this.isImage) {
        this.pdfUrl = this.sanitizer.bypassSecurityTrustUrl(data.url);
      } else {
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
      }
    }
  }
  ngOnInit() {}
  download() {
    const link = document.createElement('a');
    link.href = this.rawUrl;
    link.download = this.fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  close() {
    this.dialogRef.close();
  }
  static #_ = this.ɵfac = function PdfPreviewDialogComponent_Factory(t) {
    return new (t || PdfPreviewDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MAT_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.DomSanitizer));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: PdfPreviewDialogComponent,
    selectors: [["app-pdf-preview-dialog"]],
    decls: 15,
    vars: 3,
    consts: [[1, "header", "d-flex", "justify-content-between", "align-items-center", "mb-2"], ["mat-dialog-title", "", 1, "m-0"], [1, "d-flex", "align-items-center", "gap-2"], ["mat-raised-button", "", "color", "warn", 1, "btn-export-pdf", 3, "click"], ["mat-icon-button", "", 3, "click"], [1, "p-0", 2, "height", "80vh", "overflow", "hidden"], ["width", "100%", "height", "100%", "frameborder", "0", 3, "src", 4, "ngIf"], ["class", "d-flex justify-content-center align-items-center h-100", "style", "background: #f5f5f5;", 4, "ngIf"], ["class", "d-flex justify-content-center align-items-center h-100", 4, "ngIf"], ["width", "100%", "height", "100%", "frameborder", "0", 3, "src"], [1, "d-flex", "justify-content-center", "align-items-center", "h-100", 2, "background", "#f5f5f5"], ["alt", "Preview", 2, "max-width", "100%", "max-height", "100%", "object-fit", "contain", 3, "src"], [1, "d-flex", "justify-content-center", "align-items-center", "h-100"]],
    template: function PdfPreviewDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "h2", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "PDF Preview");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2)(4, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PdfPreviewDialogComponent_Template_button_click_4_listener() {
          return ctx.download();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "file_download");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Download File ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PdfPreviewDialogComponent_Template_button_click_8_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-dialog-content", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, PdfPreviewDialogComponent_iframe_12_Template, 1, 1, "iframe", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, PdfPreviewDialogComponent_div_13_Template, 2, 1, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, PdfPreviewDialogComponent_div_14_Template, 3, 0, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.pdfUrl && !ctx.isImage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.pdfUrl && ctx.isImage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.pdfUrl);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogContent],
    styles: ["mat-dialog-content[_ngcontent-%COMP%] {\n  display: block;\n  max-height: 80vh;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvb3JnLWNvbXBvbmVudHMvYXVkaXQtcmVwb3J0L3BkZi1wcmV2aWV3LWRpYWxvZy9wZGYtcHJldmlldy1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxjQUFBO0VBQ0EsZ0JBQUE7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbIm1hdC1kaWFsb2ctY29udGVudCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG1heC1oZWlnaHQ6IDgwdmg7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ })

}]);
//# sourceMappingURL=src_app_org-components_audit-report_pdf-preview-dialog_pdf-preview-dialog_component_ts.js.map