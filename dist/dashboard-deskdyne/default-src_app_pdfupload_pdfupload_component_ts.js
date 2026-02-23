"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["default-src_app_pdfupload_pdfupload_component_ts"],{

/***/ 45907:
/*!**************************************************!*\
  !*** ./src/app/pdfupload/pdfupload.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PdfuploadComponent: () => (/* binding */ PdfuploadComponent)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 36480);
/* harmony import */ var src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/service/apiService/apiMain.service */ 7192);







function PdfuploadComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 5)(1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "svg", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "path", 8)(4, "polyline", 9)(5, "line", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "p", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Drag & drop PDF here");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "p", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "or click to browse");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function PdfuploadComponent_div_2_Template_input_change_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.onFileSelected($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "label", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Browse Files");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("id", ctx_r0.inputId);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("for", ctx_r0.inputId);
  }
}
function PdfuploadComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 15)(1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "svg", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "path", 18)(4, "polyline", 19)(5, "line", 20)(6, "line", 21)(7, "polyline", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 23)(9, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PdfuploadComponent_div_3_Template_button_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r5.cancelSelection());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "svg", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "line", 28)(16, "line", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 30)(18, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PdfuploadComponent_div_3_Template_button_click_18_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r7.uploadFile());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, " Upload File ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.selectedFile.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", (ctx_r1.selectedFile.size / 1024).toFixed(1), " KB");
  }
}
function PdfuploadComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 32)(1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Preview");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "iframe", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx_r2.selectedFileURL, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeResourceUrl"]);
  }
}
class PdfuploadComponent {
  constructor(sanitizer, apiMainService) {
    this.sanitizer = sanitizer;
    this.apiMainService = apiMainService;
    this.upload = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.isDragging = false;
    this.selectedFileURL = '';
    this.inputId = Math.random() * 1000;
  }
  ngOnChanges(changes) {
    console.log(changes);
    if (this.documentUrl) {
      this.selectedFileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.documentUrl);
      console.log(this.selectedFileURL);
    }
  }
  onFileSelected(event) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      // Create a URL for the selected file
      const objectURL = URL.createObjectURL(this.selectedFile);
      this.selectedFileURL = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
    }
  }
  cancelSelection() {
    this.selectedFile = null;
    this.selectedFileURL = null;
  }
  onDragOver(event) {
    event.preventDefault();
    this.isDragging = true;
  }
  onDragLeave(event) {
    this.isDragging = false;
  }
  onDrop(event) {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
      // Create a URL for the dropped file
      const objectURL = URL.createObjectURL(this.selectedFile);
      this.selectedFileURL = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
    }
  }
  uploadFile() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        if (_this.selectedFile) {
          // Create FormData object
          const formData = new FormData();
          formData.append('file', _this.selectedFile, _this.selectedFile.name); // Append file to form data
          const filedetails = yield _this.apiMainService.createPdf(formData);
          console.log(_this.documentname);
          let docobj = {
            url: filedetails.fileUrl,
            documentname: _this.documentname
          };
          _this.upload.emit(docobj);
        } else {
          console.log('No file selected');
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }
  static #_ = this.ɵfac = function PdfuploadComponent_Factory(t) {
    return new (t || PdfuploadComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_service_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_1__.ApiMainService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: PdfuploadComponent,
    selectors: [["app-pdfupload"]],
    inputs: {
      documentname: "documentname",
      documentUrl: "documentUrl"
    },
    outputs: {
      upload: "upload"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵNgOnChangesFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 5,
    vars: 5,
    consts: [[1, "pdf-upload-container"], [1, "upload-zone", 3, "dragover", "drop", "dragleave"], ["class", "upload-content", 4, "ngIf"], ["class", "file-info", 4, "ngIf"], ["class", "preview-zone", 4, "ngIf"], [1, "upload-content"], [1, "icon-circle"], ["xmlns", "http://www.w3.org/2000/svg", "width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"], ["points", "17 8 12 3 7 8"], ["x1", "12", "y1", "3", "x2", "12", "y2", "15"], [1, "upload-text"], [1, "upload-subtext"], ["type", "file", "accept", "application/pdf,.jpg,.jpeg,.png", 1, "file-input", 3, "id", "change"], [1, "browse-btn", 3, "for"], [1, "file-info"], [1, "file-details"], ["xmlns", "http://www.w3.org/2000/svg", "width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "file-icon"], ["d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"], ["points", "14 2 14 8 20 8"], ["x1", "16", "y1", "13", "x2", "8", "y2", "13"], ["x1", "16", "y1", "17", "x2", "8", "y2", "17"], ["points", "10 9 9 9 8 9"], [1, "file-meta"], [1, "file-name"], [1, "file-size"], ["title", "Remove file", 1, "remove-btn", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "action-buttons"], [1, "upload-action-btn", 3, "click"], [1, "preview-zone"], [1, "preview-header"], ["type", "application/pdf", 3, "src"]],
    template: function PdfuploadComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("dragover", function PdfuploadComponent_Template_div_dragover_1_listener($event) {
          return ctx.onDragOver($event);
        })("drop", function PdfuploadComponent_Template_div_drop_1_listener($event) {
          return ctx.onDrop($event);
        })("dragleave", function PdfuploadComponent_Template_div_dragleave_1_listener($event) {
          return ctx.onDragLeave($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, PdfuploadComponent_div_2_Template, 13, 2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, PdfuploadComponent_div_3_Template, 20, 2, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, PdfuploadComponent_div_4_Template, 4, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("drag-active", ctx.isDragging);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.selectedFile);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.selectedFile);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.selectedFileURL && ctx.selectedFile);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf],
    styles: ["\n\n.pdf-upload-container[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 8px;\n}\n\n\n\n.upload-zone[_ngcontent-%COMP%] {\n  border: 2px dashed #cbd5e1;\n  border-radius: 8px;\n  background: #f8fafc;\n  padding: 20px;\n  text-align: center;\n  transition: all 0.2s ease;\n  position: relative;\n}\n.upload-zone[_ngcontent-%COMP%]:hover {\n  border-color: #94a3b8;\n  background: #f1f5f9;\n}\n.upload-zone.drag-active[_ngcontent-%COMP%] {\n  border-color: #3b82f6;\n  background: #eff6ff;\n}\n\n\n\n.upload-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n\n.icon-circle[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: #e2e8f0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #64748b;\n  margin-bottom: 4px;\n}\n\n.upload-text[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: #334155;\n}\n\n.upload-subtext[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12px;\n  color: #94a3b8;\n}\n\n.browse-btn[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  display: inline-block;\n  padding: 6px 12px;\n  font-size: 12px;\n  font-weight: 500;\n  color: #3b82f6;\n  background: #eff6ff;\n  border: 1px solid #dbeafe;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.browse-btn[_ngcontent-%COMP%]:hover {\n  background: #3b82f6;\n  color: white;\n}\n\n.file-input[_ngcontent-%COMP%] {\n  display: none;\n}\n\n\n\n.file-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.file-details[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: white;\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid #e2e8f0;\n}\n\n.file-icon[_ngcontent-%COMP%] {\n  color: #ef4444;\n  \n\n}\n\n.file-meta[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: left;\n  display: flex;\n  flex-direction: column;\n}\n\n.file-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  color: #1e293b;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 200px;\n}\n\n.file-size[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #94a3b8;\n}\n\n.remove-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #94a3b8;\n  cursor: pointer;\n  padding: 4px;\n  display: flex;\n  align-items: center;\n  border-radius: 4px;\n}\n.remove-btn[_ngcontent-%COMP%]:hover {\n  background: #fee2e2;\n  color: #ef4444;\n}\n\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n\n.upload-action-btn[_ngcontent-%COMP%] {\n  background: #3b82f6;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.upload-action-btn[_ngcontent-%COMP%]:hover {\n  background: #2563eb;\n}\n\n\n\n.preview-zone[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  overflow: hidden;\n  background: white;\n}\n.preview-zone[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  padding: 6px 12px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #64748b;\n  border-bottom: 1px solid #e2e8f0;\n}\n.preview-zone[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 200px;\n  border: none;\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGRmdXBsb2FkL3BkZnVwbG9hZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFBO0FBQ0E7RUFDRSxXQUFBO0VBQ0EsZUFBQTtBQUNGOztBQUVBLGdCQUFBO0FBQ0E7RUFDRSwwQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0FBQ0Y7QUFDRTtFQUNFLHFCQUFBO0VBQ0EsbUJBQUE7QUFDSjtBQUVFO0VBQ0UscUJBQUE7RUFDQSxtQkFBQTtBQUFKOztBQUlBLDRCQUFBO0FBQ0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7QUFERjs7QUFJQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0FBREY7O0FBSUE7RUFDRSxTQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQURGOztBQUlBO0VBQ0UsU0FBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0FBREY7O0FBSUE7RUFDRSxlQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0Esb0JBQUE7QUFERjtBQUdFO0VBQ0UsbUJBQUE7RUFDQSxZQUFBO0FBREo7O0FBS0E7RUFDRSxhQUFBO0FBRkY7O0FBS0Esd0JBQUE7QUFDQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7QUFGRjs7QUFLQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtBQUZGOztBQUtBO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0FBRkY7O0FBS0E7RUFDRSxPQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7QUFGRjs7QUFLQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtBQUZGOztBQUtBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7QUFGRjs7QUFLQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FBRkY7QUFJRTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtBQUZKOztBQU1BO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0FBSEY7O0FBTUE7RUFDRSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSwyQkFBQTtBQUhGO0FBS0U7RUFDRSxtQkFBQTtBQUhKOztBQU9BLGlCQUFBO0FBQ0E7RUFDRSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FBSkY7QUFNRTtFQUNFLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsZ0NBQUE7QUFKSjtBQU9FO0VBQ0UsV0FBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQUxKIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29udGFpbmVyICovXHJcbi5wZGYtdXBsb2FkLWNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWFyZ2luLXRvcDogOHB4O1xyXG59XHJcblxyXG4vKiBVcGxvYWQgWm9uZSAqL1xyXG4udXBsb2FkLXpvbmUge1xyXG4gIGJvcmRlcjogMnB4IGRhc2hlZCAjY2JkNWUxO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBiYWNrZ3JvdW5kOiAjZjhmYWZjO1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIGJvcmRlci1jb2xvcjogIzk0YTNiODtcclxuICAgIGJhY2tncm91bmQ6ICNmMWY1Zjk7XHJcbiAgfVxyXG5cclxuICAmLmRyYWctYWN0aXZlIHtcclxuICAgIGJvcmRlci1jb2xvcjogIzNiODJmNjtcclxuICAgIGJhY2tncm91bmQ6ICNlZmY2ZmY7XHJcbiAgfVxyXG59XHJcblxyXG4vKiBDb250ZW50IFN0YXRlIChObyBGaWxlKSAqL1xyXG4udXBsb2FkLWNvbnRlbnQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogOHB4O1xyXG59XHJcblxyXG4uaWNvbi1jaXJjbGUge1xyXG4gIHdpZHRoOiA0MHB4O1xyXG4gIGhlaWdodDogNDBweDtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYmFja2dyb3VuZDogI2UyZThmMDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgY29sb3I6ICM2NDc0OGI7XHJcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xyXG59XHJcblxyXG4udXBsb2FkLXRleHQge1xyXG4gIG1hcmdpbjogMDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBjb2xvcjogIzMzNDE1NTtcclxufVxyXG5cclxuLnVwbG9hZC1zdWJ0ZXh0IHtcclxuICBtYXJnaW46IDA7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIGNvbG9yOiAjOTRhM2I4O1xyXG59XHJcblxyXG4uYnJvd3NlLWJ0biB7XHJcbiAgbWFyZ2luLXRvcDogOHB4O1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBwYWRkaW5nOiA2cHggMTJweDtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBjb2xvcjogIzNiODJmNjtcclxuICBiYWNrZ3JvdW5kOiAjZWZmNmZmO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkYmVhZmU7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0cmFuc2l0aW9uOiBhbGwgMC4ycztcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjM2I4MmY2O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gIH1cclxufVxyXG5cclxuLmZpbGUtaW5wdXQge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbi8qIEZpbGUgU2VsZWN0ZWQgU3RhdGUgKi9cclxuLmZpbGUtaW5mbyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMTJweDtcclxufVxyXG5cclxuLmZpbGUtZGV0YWlscyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMTJweDtcclxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICBwYWRkaW5nOiA4cHggMTJweDtcclxuICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2UyZThmMDtcclxufVxyXG5cclxuLmZpbGUtaWNvbiB7XHJcbiAgY29sb3I6ICNlZjQ0NDQ7XHJcbiAgLyogUERGIHJlZCBjb2xvciAqL1xyXG59XHJcblxyXG4uZmlsZS1tZXRhIHtcclxuICBmbGV4OiAxO1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG4uZmlsZS1uYW1lIHtcclxuICBmb250LXNpemU6IDEzcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBjb2xvcjogIzFlMjkzYjtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgbWF4LXdpZHRoOiAyMDBweDtcclxufVxyXG5cclxuLmZpbGUtc2l6ZSB7XHJcbiAgZm9udC1zaXplOiAxMXB4O1xyXG4gIGNvbG9yOiAjOTRhM2I4O1xyXG59XHJcblxyXG4ucmVtb3ZlLWJ0biB7XHJcbiAgYmFja2dyb3VuZDogbm9uZTtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgY29sb3I6ICM5NGEzYjg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHBhZGRpbmc6IDRweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQ6ICNmZWUyZTI7XHJcbiAgICBjb2xvcjogI2VmNDQ0NDtcclxuICB9XHJcbn1cclxuXHJcbi5hY3Rpb24tYnV0dG9ucyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLnVwbG9hZC1hY3Rpb24tYnRuIHtcclxuICBiYWNrZ3JvdW5kOiAjM2I4MmY2O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgcGFkZGluZzogOHB4IDE2cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMnM7XHJcblxyXG4gICY6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogIzI1NjNlYjtcclxuICB9XHJcbn1cclxuXHJcbi8qIFByZXZpZXcgWm9uZSAqL1xyXG4ucHJldmlldy16b25lIHtcclxuICBtYXJnaW4tdG9wOiAxMnB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcblxyXG4gIC5wcmV2aWV3LWhlYWRlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjhmYWZjO1xyXG4gICAgcGFkZGluZzogNnB4IDEycHg7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgY29sb3I6ICM2NDc0OGI7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UyZThmMDtcclxuICB9XHJcblxyXG4gIGlmcmFtZSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMjAwcHg7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ })

}]);
//# sourceMappingURL=default-src_app_pdfupload_pdfupload_component_ts.js.map