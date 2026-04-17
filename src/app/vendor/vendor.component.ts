import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { ApiMainService } from "src/service/apiService/apiMain.service";
import { RuntimeStorageService } from "src/service/runtime-storage.service";
import { SearchFilterService } from "src/service/search-filter.service";
import { VendorCardComponent } from "./vendor-card/vendor-card.component";
import { AddVendorCommponent } from "./add-vendor/add-vendor.component";
import { MatDialog } from "@angular/material/dialog";
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/shared/directives/common-directives.directives.modules';

@Component({
    selector:'app-vendor',
    templateUrl:'vendor.component.html',
    styleUrls:['vendor.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        VendorCardComponent
    ]
})
export class VendorComponent implements OnInit {
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
    private dialog: MatDialog,
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

  editVendor(vendor: any) {
    this.runtimeStorageService.setCacheData('VENDOR_EDIT', vendor);
    const dialogRef = this.dialog.open(AddVendorCommponent, {
      width: '1200px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllVendors();
      }
    });
  }

  resetForm() {
    this.runtimeStorageService.setCacheData('VENDOR_EDIT', {});
  }

  addVendor() {
    this.resetForm();
    const dialogRef = this.dialog.open(AddVendorCommponent, {
      width: '1200px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllVendors();
      }
    });
  }
}
