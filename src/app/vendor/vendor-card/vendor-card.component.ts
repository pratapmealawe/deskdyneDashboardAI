import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ConfirmationModalService } from 'src/service/confirmation-modal.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-vendor-card',
  templateUrl: 'vendor-card.component.html',
  styleUrls: ['vendor-card.component.scss'],
})
export class VendorCardComponent implements OnInit {
  private _vendorFirm: any[] = [];
  @Input()
  get vendorFirm(): any[] {
    return this._vendorFirm;
  }
  set vendorFirm(value: any[]) {
    this._vendorFirm = value || [];
    this.refreshData()
  }
  @Output() deleted = new EventEmitter();
  btnPolicy: any;
  vendorInfo: any;
  pageIndex: number = 0;
  pageSize: number = 10;

  pagedVendorFirm: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private runtimeStorageService: RuntimeStorageService,
    private apiMainService: ApiMainService,
    private policyService: PolicyService,
    private confirmationModalService: ConfirmationModalService
  ) { }
  refreshData() {
    this.ngOnInit()

  }
  ngOnInit(): void {
    console.log(this.vendorFirm, "vendorFirm");

    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.updatePage();
  }

  editVendor(vendor: any) {
    this.runtimeStorageService.setCacheData('VENDOR_EDIT', vendor);
    this.router.navigate(['/addVendor']);
  }

  async deleteVendor() {
    try {
      let id = this.vendorInfo._id;
      const deleted = await this.apiMainService.deleteVendor(id);
      this.deleted.emit();
    } catch (error) {
      console.log('deleteVendor', error);
    }
  }

  showPopup(vendor: any) {
    this.vendorInfo = vendor;
    this.confirmationModalService.modal({
      msg: 'Are you sure you want to delete this Vendor?',
      callback: this.deleteVendor,
      context: this
    });
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  updatePage() {
    if (!this.vendorFirm) return;
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedVendorFirm = this.vendorFirm.slice(start, end);
  }
}
