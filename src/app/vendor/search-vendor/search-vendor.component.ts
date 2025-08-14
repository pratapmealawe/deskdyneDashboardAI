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
  filteredVendorList: any[] = []

  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private policyService: PolicyService,
    private runtimeStorageService: RuntimeStorageService
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
  }

  async getAllVendors() {
    console.log("get vendor after deletion");
    
    try {
      this.vendorList = await this.apiMainService.getAllVendors();
      console.log(this.vendorList);
      
    } catch (error) {
      console.log('getAllVendor', error);
    }
  }

  async searchVendor() {
    try {
      this.vendorList = await this.apiMainService.searchVendor(this.searchObj);

      if (this.vendorList.length > 0) {
        const vendorFirmMap = new Map<string, {
          vendorFirmId: string;
          vendorFirmName: string;
          vendorList: any[];
        }>();

        for (const vendor of this.vendorList) {
          const firmId = vendor?.vendorFirmDetails?.vendorFirmId || "No Vendor Firm";
          const firmName = vendor?.vendorFirmDetails?.vendorFirmName || "No Vendor Firm";

          if (!vendorFirmMap.has(firmId)) {
            vendorFirmMap.set(firmId, {
              vendorFirmId: firmId,
              vendorFirmName: firmName,
              vendorList: []
            });
          }

          vendorFirmMap.get(firmId)!.vendorList.push(vendor);
        }

        this.filteredVendorList = Array.from(vendorFirmMap.values());

        console.log(this.filteredVendorList);
      }
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
