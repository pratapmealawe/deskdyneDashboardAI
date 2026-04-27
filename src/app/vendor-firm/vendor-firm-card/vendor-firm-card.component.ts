import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { DirectivesModule } from 'src/shared/directives/common-directives.directives.modules';

export interface Outlet {
  outletName: string;
  cafeteriaDetails?: {
    cafeteria_name: string;
    cafeteria_city?: string;
  };
  organizationDetails?: {
    organization_name: string;
  };
}

export interface VendorFirm {
  vendorFirmName: string;
  vendorFirmEmail: string;
  vendorFirmPhoneNo: string;
  outletList?: Outlet[];
  bank_details?: {
    bankVerified: boolean;
  };
  retailShareTDSPct?: number;
}

@Component({
  selector: 'app-vendor-firm-card',
  templateUrl: './vendor-firm-card.component.html',
  styleUrls: ['./vendor-firm-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    DirectivesModule
  ]
})
export class VendorFirmCardComponent {
  private _vendors: VendorFirm[] = [];

  @Input()
  get vendors(): VendorFirm[] {
    return this._vendors;
  }

  set vendors(value: VendorFirm[]) {
    this._vendors = value ?? [];
    this.pageIndex = 0;
    this.updatePage();
  }

  @Input() isViewMode: boolean = false;

  @Output() view = new EventEmitter<VendorFirm>();
  @Output() delete = new EventEmitter<VendorFirm>();

  pageSize: number = 10;
  pageIndex: number = 0;
  vendorsUpdated: { organizationName: string; vendorList: VendorFirm[] }[] = [];

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePage();
  }

  updatePage() {
    const orgMap = new Map<string, {
      organizationName: string;
      vendorList: VendorFirm[];
    }>();

    this._vendors.forEach(vendor => {
      const orgs = new Set<string>();
      if (vendor.outletList && vendor.outletList.length > 0) {
        vendor.outletList.forEach((outlet: Outlet) => {
          const orgName = outlet.organizationDetails?.organization_name || 'No Organization';
          orgs.add(orgName);
        });
      } else {
        orgs.add('No Organization');
      }

      orgs.forEach(orgName => {
        if (!orgMap.has(orgName)) {
          orgMap.set(orgName, {
            organizationName: orgName,
            vendorList: []
          });
        }
        orgMap.get(orgName)!.vendorList.push(vendor);
      });
    });

    const grouped = Array.from(orgMap.values());
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.vendorsUpdated = grouped.slice(start, end);
  }

  onView(vendor: VendorFirm) {
    this.view.emit(vendor);
  }

  onDelete(vendor: VendorFirm) {
    this.delete.emit(vendor);
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
