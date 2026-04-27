import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { VendorFirmOutletOrderReportComponent } from './vendor-firm-outlet-order-report/vendor-firm-outlet-order-report.component';
import { VendorFirmAdminDailyOrderReportComponent } from './vendor-firm-admin-daily-order-report/vendor-firm-admin-daily-order-report.component';
import { VendorFirmAdminBulkOrderReportComponent } from './vendor-firm-admin-bulk-order-report/vendor-firm-admin-bulk-order-report.component';
import { VendorFirmViewService } from '../vendor-firm-view.service';

@Component({
  selector: 'app-vendor-firm-reports',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    VendorFirmOutletOrderReportComponent,
    VendorFirmAdminDailyOrderReportComponent,
    VendorFirmAdminBulkOrderReportComponent
  ],
  templateUrl: './vendor-firm-reports.component.html',
  styleUrls: ['./vendor-firm-reports.component.scss']
})
export class VendorFirmReportsComponent implements OnInit {
  selectedTab: string = 'outlet-report';

  reportTabs = [
    { name: 'Outlet Order Report', path: 'outlet-report', icon: 'description' },
    { name: 'Admin Daily Order Report', path: 'daily-report', icon: 'today' },
    { name: 'Bulk Order Report', path: 'bulk-report', icon: 'inventory_2' }
  ];

  constructor(private vendorFirmViewService: VendorFirmViewService) { }

  ngOnInit(): void {
  }

  selectTab(path: string) {
    this.selectedTab = path;
  }
}
