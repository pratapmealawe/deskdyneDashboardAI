import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';

@Component({
  selector: 'app-search-vendor',
  templateUrl: 'search-vendor.component.html',
  styleUrls: ['search-vendor.component.scss'],
})
export class SearchVendorComponent implements OnInit {
  searchObj: any = {
    vendorName: '',
    vendorPhoneNo: '',
    vendorEmail: '',
  };
  vendorList: any;
  orgName: any;
  filteredVendorList: any[] = [];
  filterVendorDuplicate: any[] = [];
  searchControl = new FormControl('');
  filteredVendor: any[] = [];

  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private runtimeStorageService: RuntimeStorageService,
    private searchService: SearchFilterService,
  ) { }

  ngOnInit(): void {
    this.searchVendor();
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {
      // Search by vendorFirmName, vendorName, and vendorPhoneNo using SearchFilterService
      const config = {
        keys: ['vendorFirmName', 'vendorList.vendorName', 'vendorList.vendorPhoneNo']
      };

      if (value) {
        const result = this.searchService.searchData(
          this.filteredVendorList,
          config,
          value ?? ''
        );

        // FORCE NEW ARRAY REFERENCE
        this.filterVendorDuplicate = [...result];
      } else {
        this.filterVendorDuplicate = [...this.filteredVendorList];
      }
      console.log("Updated:", this.filterVendorDuplicate);
    });
  }

  async getAllVendors() {
    this.searchVendor();
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
        this.filterVendorDuplicate = Array.from(vendorFirmMap.values());

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
    this.router.navigate(['/app/addVendor']);
  }
}
