import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { SearchFilterService } from 'src/service/search-filter.service';
import { ConfirmationModalService } from '../../service/confirmation-modal.service';

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
  searchControl = new FormControl('');
  pageSize: number = 10;
  pageIndex: number = 0;
  pagedVendorFirm: any[] = [];
  filteredList: any[] = [];


  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private policyService: PolicyService,
    private localStorageService: LocalStorageService,
    private confirmationModalService: ConfirmationModalService,
    private searchService: SearchFilterService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.getAllVendors()
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {
      const config = { keys: ['vendorFirmName'] };
      if (value) {
        const result = this.searchService.searchData(
          this.vendorList,
          config,
          value ?? ''
        )
        this.filteredList = [...result]
        this.pageIndex = 0;
        this.updateCard();
      } else {
        this.filteredList = [...this.vendorList]
        this.pageIndex = 0;
        this.updateCard()
      }
    })
  }

  async getAllVendors() {
    try {
      this.vendorList = await this.apiMainService.getAllVendorFirms();
      this.filteredList = [...this.vendorList];
      this.updateCard();
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
    this.confirmationModalService.modal({
      msg: 'Are you sure you want to delete this firm?',
      callback: this.deleteVendorFirm,
      context: this,
      data: vendorFirm._id
    });
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

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updateCard();
  }

  updateCard() {
    if (!this.filteredList) return;
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedVendorFirm = this.filteredList.slice(start, end);

  }
}
