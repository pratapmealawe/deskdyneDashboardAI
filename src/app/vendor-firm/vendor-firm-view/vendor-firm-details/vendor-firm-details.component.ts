import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { PermissionsService } from '@service/permission.service';
import { RuntimeStorageService } from '@service/runtime-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AddVendorFirmComponent } from '../../add-vendor-firm/add-vendor-firm.component';

@Component({
  selector: 'app-vendor-firm-details',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './vendor-firm-details.component.html',
  styleUrls: ['./vendor-firm-details.component.scss']
})
export class VendorFirmDetailsComponent implements OnInit {
  @Input() vendorObj: any;
  btnPolicy: any;
  filteredOutletList: any;
  bankDetails: any;

  constructor(
    private permissionsService: PermissionsService,
    private dialog: MatDialog
  ) { }

  editOrg() {
    const dialogRef = this.dialog.open(AddVendorFirmComponent, {
      width: '90vw',
      maxHeight: '90vh',
      disableClose: true,
      data: { vendorFirm: this.vendorObj }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle result if needed
      }
    });
  }

  ngOnInit(): void {
    this.btnPolicy = this.permissionsService.getCurrentButtonPolicy();
    this.bankDetails = this.vendorObj.bank_details;
    this.filteredOutletList = this.filterOutletListByCafeteria(this.vendorObj.outletList);

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

