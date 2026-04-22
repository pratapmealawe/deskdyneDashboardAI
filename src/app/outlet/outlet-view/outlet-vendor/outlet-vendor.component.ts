import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { PermissionsService } from '@service/permission.service';
import { OutletViewService } from '../outlet-view.service';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-outlet-vendor',
  templateUrl: './outlet-vendor.component.html',
  styleUrls: ['./outlet-vendor.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class OutletVendorComponent implements OnInit {
  outlet: any;
  vendorList: any[] = []
  selectedVendorId?: string;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private apiMainService: ApiMainService,
    private confirmationModalService: ConfirmationModalService,
    private permissionsService: PermissionsService,
    private outletViewService: OutletViewService
  ) { }


  ngOnInit(): void {
    this.outletViewService.outlet$.subscribe(outlet => {
      if (outlet) {
        this.outlet = outlet;
        const vd = this.outlet.vendorDetails;
        if (vd && (vd._id || vd.vendorId)) {
          this.selectedVendorId = vd._id ?? vd.vendorId;
        }
        this.getVendorList();
      }
    });
  }

  onSelectVendor(vendorId: string) {
    this.selectedVendorId = vendorId;
  }

  async getVendorList() {
    try {
      const res = await this.apiMainService.getVendorListByOutletId(this.outlet?._id)
      this.vendorList = res
      if (this.selectedVendorId) {
        const found = this.vendorList.find(v => v._id === this.selectedVendorId);
        if (!found) {
          this.selectedVendorId = "";
        }
      }
    } catch (err: any) {
    }
  }

  async updateVendorDetails() {
    if (!this.selectedVendorId) {
      return;
    }

    try {
      const vendor = this.vendorList.find((item: any) => item._id === this.selectedVendorId);
      const payload = {
        vendorName: vendor?.vendorName,
        vendorPhoneNo: vendor?.vendorPhoneNo,
        vendorEmail: vendor?.vendorEmail,
        vendorRole: vendor?.vendorRole,
        vendorId: vendor?._id
      }

      const updated = await this.apiMainService.updateVendorDetails(this.outlet?._id, payload);

      await this.getVendorList();
    } catch (err: any) {
      console.error(err);
    }
  }
}

