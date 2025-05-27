import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-outlet-vendor',
  templateUrl: './outlet-vendor.component.html',
  styleUrls: ['./outlet-vendor.component.scss']
})
export class OutletVendorComponent implements OnInit {
  @Input() outlet: any
  vendorList: any[] = []
  selectedVendorId?: string;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private apiMainService: ApiMainService,
    private confirmationModalService: ConfirmationModalService,
    private policyService: PolicyService
  ) { }


  ngOnInit(): void {
    if (this.outlet) {
      const vd = this.outlet.vendorDetails;
      if (vd && (vd._id || vd.vendorId)) {
        this.selectedVendorId = vd._id ?? vd.vendorId;
      }
      this.getVendorList()
    }
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
      console.log(err);
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
