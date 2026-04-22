import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { PermissionsService } from '@service/permission.service';
import { RuntimeStorageService } from '@service/runtime-storage.service';
import { AddVendorCommponent } from '../add-vendor/add-vendor.component';
import { MatDialog } from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-vendor-card',
  templateUrl: 'vendor-card.component.html',
  styleUrls: ['vendor-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ]
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
    private permissionsService: PermissionsService,
    private confirmationModalService: ConfirmationModalService,
    private dialog: MatDialog
  ) { }
  refreshData() {
    this.ngOnInit()

  }
  ngOnInit(): void {

    this.btnPolicy = this.permissionsService.getCurrentButtonPolicy();
    this.updatePage();
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
        this.deleted.emit();
      }
    });
  }

  async deleteVendor() {
    try {
      let id = this.vendorInfo._id;
      const deleted = await this.apiMainService.deleteVendor(id);
      this.deleted.emit();
    } catch (error) {
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

  getInitials(name: string): string {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }
}

