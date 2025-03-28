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
  orgList: any;
  orgName = 'select organization';
  cafeteriaNameNCity: any;
  outletByCafeteriaList: any;
  showModalOutletList = false;
  selectedOutletsList: any = [];
  defaultRole: any = 'Cashier';
  // selectedOutlet: any;

  showAddbutton: any = false;
  vendorRole = ['Owner', 'Manager', 'Cashier'];
  showCafeteria = false;
  showSelectCafeteriaOption = true;
  selectedVendor: any;

  showEditModalOutletList = false;

  @ViewChild('outletModal') outlet: any;
  @ViewChild('complianceModal') compliance: any;
  btnPolicy: any;

  constructor(
    private fb: FormBuilder,
    private apiMainService: ApiMainService,
    public modalService: NgbModal,
    private runtimeStorageService: RuntimeStorageService,
    private router: Router,
    private policyService: PolicyService
  ) {
    this.getOrgList();
  }

  ngOnInit() {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.createForm();
    this.updateVendor();
  }
  async getOrgList() {
    try {
      this.orgList = await this.apiMainService.getOrgList();
    } catch (error) {
      console.log('getOrgList', error);
    }
  }

  createForm() {
    this.form = this.fb.group({
      vendorName: [''],
      vendorPhoneNo: [''],
      vendorEmail: [''],
      vendorRole: [''],
    });
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
      });
    }
  }

  async submit(type?: any) {
    try {
      const finalObj = {
        ...this.form.value,
        outletList: this.selectedOutletsList,
      };
      const formData = this.objectToFormData(finalObj);

      if (type == 'update') {
        let updated = await this.apiMainService.updateVendor(
          this.selectedVendor._id,
          finalObj
        );
      } else {
        await this.apiMainService.saveVendor(finalObj);
        this.router.navigate(['/vendor/search-vendor']);
      }

      //const res = type=='update'?await this.apiMainService.updateVendor(this.selectedOutletsList._id,formData):await this.apiMainService.saveVendor(finalObj);
    } catch (error) {
      console.log('saveVendor submit error', error);
    }
  }
  getOrgName(org: any) {
    this.showCafeteria = true;
    if (org && org.target) {
      this.orgName = org.target.value;
    }
  }
  selectCafeteria(event: any) {
    // console.log(event);
    // console.log(event.target.value)

    let argumentList = event.target.value.split(',');
    let [cafeteriaName, cafeteriaCity, organization] = argumentList;
    this.getOutletByCafeteriaList(cafeteriaName, cafeteriaCity, organization);
    this.showModalOutletList = true;
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

  async getOutletByCafeteriaList(
    cafeteriaName: any,
    cafeteriaCity: any,
    organization: any
  ) {
    try {
      this.outletByCafeteriaList =
        await this.apiMainService.getOutletByCafeteria(
          cafeteriaName,
          cafeteriaCity,
          organization
        );
    } catch (error) {
      console.log('getOutletByCafeteriaList', error);
    }
  }
  // onCheckboxChange(event: any, selectedOutlet: any) {
  //     if (event.target.checked) {
  //         if(this.selectedOutletsList.length==0){
  //         this.selectedOutletsList.push(selectedOutlet);
  //     }else{
  //        let filtered= this.selectedOutletsList.filter((elm:any)=>{
  //             return elm._id==selectedOutlet._id
  //         });
  //         if(filtered.length==0){
  //             this.selectedOutletsList.push(selectedOutlet)
  //         }
  //     }
  //         this.showAddbutton=true;
  //     } else {
  //             this.selectedOutletsList.forEach((elm: any, index: any) => {
  //             if (elm._id == selectedOutlet._id) {
  //                 console.log(elm._id)
  //                 this.selectedOutletsList.splice(index, 1)
  //             }
  //         })
  //     }
  //     console.log('selected list',this.selectedOutletsList);
  // }

  getSelectedOutlets() {
    // console.log(this.outletByCafeteriaList)
    // this.outletByCafeteriaList.forEach((elm:any,index:any)=>{
    //     if(elm._id==outlet._id){
    //         this.outletByCafeteriaList.splice(index,1)
    //     }

    // })
    let selectedList: any = [];
    this.outletByCafeteriaList.forEach((elm: any) => {
      if (elm.isChecked) {
        let outletPresent = false;
        this.selectedOutletsList.forEach((savedOutlet: any) => {
          if (savedOutlet.outletId === elm._id) {
            outletPresent = true;
          }
        });
        if (!outletPresent) {
          this.selectedOutletsList.push({
            outletId: elm._id,
            outletName: elm.outletName,
            outletType: elm.outletType,
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
    this.router.navigate(['/vendor/search-vendor']);
  }
}
