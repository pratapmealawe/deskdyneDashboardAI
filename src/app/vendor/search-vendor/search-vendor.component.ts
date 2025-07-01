import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-search-vendor',
  templateUrl: 'search-vendor.component.html',
  styleUrls: ['search-vendor.component.html'],
})
export class SearchVendorComponent implements OnInit {
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
  }

  async getAllVendors() {
    try {
      this.vendorList = await this.apiMainService.getAllVendors();
    } catch (error) {
      console.log('getAllVendor', error);
    }
  }

  async searchVendor() {
    try {
      this.vendorList = await this.apiMainService.searchVendor(this.searchObj);
      console.log(this.vendorList);
      
    } catch (error) {
      console.log('searchVendor', error);
    }
  }

  resetForm() {
    this.runtimeStorageService.setCacheData('VENDOR_EDIT', {});
  }

  addVendor() {
    this.resetForm()
    this.router.navigate(['/addVendor']);
  }
}
