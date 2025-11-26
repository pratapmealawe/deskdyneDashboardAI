import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { ConfirmationModalService } from '../confirmation-modal/confirmation-modal.service';
import { LocalStorageService } from 'src/service/local-storage.service';

@Component({
  selector: 'app-vendor-firm',
  templateUrl: './vendor-firm.component.html',
  styleUrls: ['./vendor-firm.component.scss']
})
export class VendorFirmComponent {
  searchObj: any = {
    vendorName: '',
    vendorPhoneNo: '',
    vendorEmail: '',
  };
  vendorList: any;
  orgName: any;
  btnPolicy: any;
  vendorFirmInfo: any;
  showSearchSection = true;
  vendorInfo: any;

  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private policyService: PolicyService,
    private localStorageService: LocalStorageService,
    private confirmationModalService: ConfirmationModalService
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.getAllVendors()
  }

  async getAllVendors() {
    try {
      this.vendorList = await this.apiMainService.getAllVendorFirms();
    } catch (error) {
      console.log('getAllVendor', error);
    }
  }

  editVendor(vendor: any) {
    this.localStorageService.setCacheData('VENDOR_FIRM_EDIT', vendor);
    this.showSearchSection = false;
    this.vendorInfo = vendor;
  }

  async deleteVendorFirm() {
    try {
      let id = this.vendorFirmInfo._id;
      const deleted = await this.apiMainService.deleteVendorFirm(id);
      this.getAllVendors();
    } catch (error) {
      console.log('deleteVendor', error);
    }
  }

  showPopup(vendorFirm: any) {
    this.vendorFirmInfo = vendorFirm;
    this.confirmationModalService.modal(
      `Are you sure, you want to delete ${vendorFirm.vendorFirmName} vendor firm`,
      this.deleteVendorFirm,
      this
    );
  }


  resetForm() {
    this.localStorageService.setCacheData('VENDOR_FIRM_EDIT', {});
  }

  addVendor() {
    this.resetForm()
    this.router.navigate(['/addVendorFirm']);
  }


  toggleShowOrder(val: any) {
    this.showSearchSection = val;
  }
}
