import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { DirectivesModule } from 'src/shared/directives/common-directives.directives.modules';

@Component({
  selector: 'app-org-details',
  standalone: true,
  imports: [CommonModule, MaterialModule, DirectivesModule],
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.scss'],
})
export class OrgDetailsComponent implements OnInit {
  @Input() orgObj: any;
  outltList: any[] = []
  filteredOutletList: any[] = []
  vendorList: any[] = []
  constructor(
    private runtimeStorageService: RuntimeStorageService,
    private router: Router,
    private apiMainService: ApiMainService
  ) { }

  ngOnInit(): void {
    this.getOutlets()
  }

  async getOutlets() {
    const searchObj = {
      orgId: this.orgObj?._id
    }
    try {
      const res = await this.apiMainService.searchOutletByOrgId(searchObj)
      this.outltList = res
      this.getVendors()

    } catch (err: any) {
      console.log(err);
    }
  }

  async getVendors() {
    const searchObj = {
      orgId: this.orgObj?._id
    }
    try {
      const res = await this.apiMainService.searchVendorFirmByOrgId(searchObj)
      this.vendorList = res
      this.getMatchedOutlets()
    } catch (err: any) {
      console.log(err);
    }
  }

  async getMatchedOutlets() {
    const merged = this.orgObj?.cafeteriaList?.map((cafe: any) => ({
      ...cafe,
      outlets: this.outltList.filter(o => o.cafeteriaDetails.cafeteria_name === cafe.cafeteria_name)
    }));
    merged?.forEach((cafeteria: any) => {
      cafeteria.outlets.forEach((outlet: any) => {
        outlet.vendors = this.getVendorsForOutlet(outlet._id);
      });
    });
    this.filteredOutletList = merged || [];
  }

  getVendorsForOutlet(outletId: string) {
    return this.vendorList.filter((vendor: any) => vendor.outletList.some((outlet: any) => outlet.outletId === outletId)) || [];
  }

  editOrg() {
    this.runtimeStorageService.setCacheData('VIEW_ORG', this.orgObj);
    this.router.navigate(['/app/add-organization']);
  }

  getInitials(name: string): string {
    if (!name) return 'O';
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }
}
