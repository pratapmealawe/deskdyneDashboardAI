import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit {
  @Input() vendorObj: any;
  btnPolicy: any;
  filteredOutletList: any;
  bankDetails: any;

  constructor(private policyService: PolicyService, private runtimeStorageService: RuntimeStorageService, private router: Router) {
  }

  editOrg() {
    this.runtimeStorageService.setCacheData('VENDOR_FIRM_EDIT', this.vendorObj);
    this.router.navigate(['addVendorFirm']);
  }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.bankDetails = this.vendorObj.bank_details;
    this.filteredOutletList = this.filterOutletListByCafeteria(this.vendorObj.outletList);
    console.log(this.filteredOutletList);

  }

  filterOutletListByCafeteria(outletList: any[]) {
    const cafeteriaMap: any = {};

    outletList.forEach(outlet => {
      const cafe = outlet.cafeteriaDetails;
      const key = cafe.cafeteria_name + "_" + cafe.cafeteria_city;

      if (!cafeteriaMap[key]) {
        cafeteriaMap[key] = {
          cafeteria_name: cafe.cafeteria_name,
          cafeteria_city: cafe.cafeteria_city,
          address1: cafe.address1,
          address2: cafe.address2,
          location: cafe.location,
          outlets: []
        };
      }

      cafeteriaMap[key].outlets.push(outlet);
    });

    return Object.values(cafeteriaMap);
  }

  getInitials(name: string): string {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

}
