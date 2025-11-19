import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { ConfirmationModalService } from '../confirmation-modal/confirmation-modal.service';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

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
  searchControl =  new FormControl('');
  pageSize :number = 5;
  pageIndex : number = 0;
  pagedVendorFirm: any[] = [];


  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private policyService: PolicyService,
    private runtimeStorageService: RuntimeStorageService,
    private confirmationModalService: ConfirmationModalService
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.getAllVendors()
  }

  async getAllVendors() {
    try {
      this.vendorList = await this.apiMainService.getAllVendorFirms();
      this.pagedVendorFirm = await this.apiMainService.getAllVendorFirms();
      console.log(this.pagedVendorFirm ,"pagee vendir ");
    } catch (error) {
      console.log('getAllVendor', error);
    }
  }

  editVendor(vendor: any) {
    // this.runtimeStorageService.setCacheData('VENDOR_FIRM_EDIT', vendor);
    // this.router.navigate(['/addVendorFirm']);
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
    this.runtimeStorageService.setCacheData('VENDOR_FIRM_EDIT', {});
  }

  addVendor() {
    this.resetForm()
    this.router.navigate(['/addVendorFirm']);
  }


  toggleShowOrder(val: any) {
    this.showSearchSection = val;
  }

  onPageChange(event : PageEvent){
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updateCard();
  }
  updateCard(){
    if (!this.vendorList) return;
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedVendorFirm = this.vendorList.slice(start, end);
    
  }
}
