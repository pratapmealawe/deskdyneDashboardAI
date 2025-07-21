import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() vendorFirm: any;
  @Output() deleted = new EventEmitter();
  btnPolicy: any;

  constructor(
    private router: Router,
    private runtimeStorageService: RuntimeStorageService,
    private apiMainService: ApiMainService,
    private policyService: PolicyService
  ) {}

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
  }

  editVendor(vendor: any) {
    this.runtimeStorageService.setCacheData('VENDOR_EDIT', vendor);
    this.router.navigate(['/addVendor']);
  }

  async deleteVendor(vendor: any) {
    try {
      let id = vendor._id;
      const deleted = await this.apiMainService.deleteVendor(id);
      this.deleted.emit();
    } catch (error) {
      console.log('deleteVendor', error);
    }
  }
}
