import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NgbModal,
  NgbModalRef,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { DataFormatService } from 'src/service/data-format.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: 'add-vendor.component.html',
  styleUrls: ['add-vendor.component.scss'],
})
export class AddVendorCommponent {
  form: any;
  showError = false;
  showUpdate = false;
  outletByCafeteriaList: any;
  showModalOutletList = false;
  selectedOutletsList: any = [];
  defaultRole: any = 'Cashier';

  showAddbutton: any = false;
  vendorRole = ['Owner', 'Manager', 'Cashier'];
  showCafeteria = false;
  showSelectCafeteriaOption = true;
  selectedVendor: any;

  showEditModalOutletList = false;
  vendorId: string = ''

  @ViewChild('outletModal') outlet: any;
  @ViewChild('complianceModal') compliance: any;
  btnPolicy: any;
  vendorList: any;

  constructor(
    private fb: FormBuilder,
    private apiMainService: ApiMainService,
    public modalService: NgbModal,
    private runtimeStorageService: RuntimeStorageService,
    private router: Router,
    private policyService: PolicyService
  ) {
  }

  ngOnInit() {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.getAllVendors()
    this.createForm();
    this.updateVendor();
  }

  createForm() {
    this.form = this.fb.group({
      vendorName: [''],
      vendorPhoneNo: [''],
      vendorEmail: [''],
      vendorRole: [''],
      vendorId: [''],
    });
  }

  async getAllVendors() {
    try {
      this.vendorList = await this.apiMainService.getAllVendorFirms();
      this.vendorId && this.changeVendorFirm(this.vendorId ? this.vendorId : "")
    } catch (error) {
      console.log('getAllVendor', error);
    }
  }

  objectToFormData(obj: any, formData = new FormData(), parentKey = '') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let keyName = parentKey ? `${parentKey}[${key}]` : key;
        if (
          typeof obj[key] === 'object' &&
          obj[key] !== null &&
          !Array.isArray(obj[key])
        ) {
          this.objectToFormData(obj[key], formData, keyName);
        } else if (Array.isArray(obj[key])) {
          obj[key].forEach((item: any, index: any) => {
            if (typeof item === 'object' && item !== null) {
              this.objectToFormData(item, formData, `${keyName}[${index}]`);
            } else {
              formData.append(`${keyName}[${index}]`, item);
            }
          });
        } else {
          formData.append(keyName, obj[key]);
        }
      }
    }
    return formData;
  }

  changeVendorFirm(e: any) {
    if (e) {
      const id = typeof e === "string" ? e :  e.target.value
      const vendorFirm = this.vendorList.find((item: any) => item?._id === id)
      
      if (vendorFirm?.outletList.length > 0) {
        this.outletByCafeteriaList = vendorFirm?.outletList
      }
    }
  }

  updateVendor() {
    const vendor = this.runtimeStorageService.getCacheData('VENDOR_EDIT');
  
    if (vendor && vendor._id) {
      this.selectedVendor = vendor;
      this.showUpdate = true;
      this.defaultRole = vendor.vendorRole;
      this.selectedOutletsList = vendor.outletList;
      this.form.patchValue({
        vendorName: vendor.vendorName,
        vendorPhoneNo: vendor.vendorPhoneNo,
        vendorEmail: vendor.vendorEmail,
        vendorRole: vendor.vendorRole,
        vendorId: vendor.vendorFirmDetails ? vendor.vendorFirmDetails.vendorFirmId : "",
      });
      this.vendorId = vendor.vendorFirmDetails ? vendor.vendorFirmDetails.vendorFirmId : ""
    }
  }

  async submit(type?: any) {
    try {
      const vendorFirmDetails = {
        vendorFirmId: this.vendorId,
        vendorFirmName: this.vendorList.find((item:any) => item._id === this.vendorId)?.vendorFirmName
      }
      const finalObj = {
        ...this.form.value,
        outletList: this.selectedOutletsList,
        vendorFirmDetails: vendorFirmDetails
      };
      const formData = this.objectToFormData(finalObj);

      console.log(finalObj);


      if (type == 'update') {
        let updated = await this.apiMainService.updateVendor(
          this.selectedVendor._id,
          finalObj
        );
      } else {
        await this.apiMainService.saveVendor(finalObj);
      }
        this.router.navigate(['/searchVendor']);

    } catch (error) {
      console.log('saveVendor submit error', error);
    }
  }

  addOutlet() {
    this.modalService.open(this.outlet, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });
  }

  addComplience() {
    this.modalService.open(this.compliance, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });
  }

  getSelectedOutlets() {
    this.selectedOutletsList = []
    
    this.outletByCafeteriaList.forEach((elm: any) => {
      if (elm.isChecked) {
        let outletPresent = false;
        this.selectedOutletsList.forEach((savedOutlet: any) => {
          if (savedOutlet.outletId === elm.outletId) {
            outletPresent = true;
          }
        });
        if (!outletPresent) {
          this.selectedOutletsList.push({
            outletId: elm.outletId,
            outletName: elm.outletName,
            outletType: elm.outletType,
            outletOpened: elm.outletOpened,
            cafeteriaDetails: elm.cafeteriaDetails,
            organizationDetails: elm.organizationDetails,
          });
        }
      }
    });
    this.modalService.dismissAll();
    // console.log('selected outlet list',this.selectedOutletsList);
  }

  deleteOutlet(index: any) {
    try {
      this.selectedOutletsList.splice(index, 1);
    } catch (error) {
      console.log('deleteOutlet', error);
    }
  }

  goBack() {
    this.router.navigate(['/searchVendor']);
  }
}
