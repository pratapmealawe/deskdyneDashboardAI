import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { ToasterService } from '@service/toaster.service';
import { environment } from '@environments/environment';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { PolicyService } from '@service/policy.service';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-outlet-card',
  templateUrl: './outlet-card.component.html',
  styleUrls: ['./outlet-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class OutletCardComponent implements OnInit {
  private _outlet: any[] = [];
  searchText: string = ''

  @Input()
  get outlet(): any[] {
    return this._outlet;
  }

  set outlet(value: any[]) {
    this._outlet = value ?? [];
    this.pageIndex = 0;
    this.updatePage();
  }

  @Output() view: EventEmitter<any> = new EventEmitter<any>();
  @Output() softDelete: EventEmitter<any> = new EventEmitter<any>();

  imageUrl: any = environment.imageUrl;
  btnPolicy: any;
  filteredMenuList: any;
  outletInfo: any
  pageSize: number = 10
  pageIndex: number = 0
  outletUpdated: any[] = []

  constructor(
    private policyService: PolicyService,
    private apiMainService: ApiMainService,
    private confirmationModalService: ConfirmationModalService,
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.outletUpdated = this.outlet;
  }

  onSoftDelete(outlet: any) {
    this.outletInfo = outlet;
    this.confirmationModalService.modal({
      msg: `Are you sure you want to delete "${outlet.outletName}"? This can be restored later from the Deleted list.`,
      callback: this.deleteOutletFunc,
      context: this
    });
  }

  async deleteOutletFunc() {
    try {
      const res = await this.apiMainService.deleteOutlet(this.outletInfo?._id, 'soft');
      this.toaster.success("Outlet deleted successfully!");
      this.softDelete.emit(this.outletInfo);
    } catch (err: any) {
      this.toaster.error("Failed to delete outlet");
    }
  }

  vieworg(org: any) {
    this.view.emit(org);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize
    this.pageIndex = event.pageIndex
    this.updatePage();
  }

  updatePage() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.outletUpdated = this.outlet.slice(start, end)
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
