import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

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

  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private policyService: PolicyService,
    private runtimeStorageService: RuntimeStorageService
  ) {}

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
    this.runtimeStorageService.setCacheData('VENDOR_FIRM_EDIT', vendor);
    this.router.navigate(['/addVendorFirm']);
  }

  async deleteVendor(vendor: any) {
    try {
      let id = vendor._id;
      const deleted = await this.apiMainService.deleteVendor(id);
    } catch (error) {
      console.log('deleteVendor', error);
    }
  }


  resetForm() {
    this.runtimeStorageService.setCacheData('VENDOR_FIRM_EDIT', {});
  }

  addVendor() {
    this.resetForm()
    this.router.navigate(['/addVendorFirm']);
  }
}
