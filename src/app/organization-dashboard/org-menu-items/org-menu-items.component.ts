import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { CommonSelectConfig } from 'src/app/common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { LocalStorageService } from '@service/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { VendorFirmItemBreakdownComponent  } from 'src/app/vendor-management/vendor-firm/vendor-firm-view/vendor-firm-reports/vendor-firm-outlet-order-report/vendor-firm-item-breakdown/vendor-firm-item-breakdown.component';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrganizationSharedService } from 'src/app/organization/organization-shared.service';
import { Subscription } from 'rxjs';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { MaterialModule } from 'src/app/material.module';
import { CommonOutletCafeSelectComponent } from 'src/app/common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';

@Component({
  selector: 'app-org-menu-items',
  templateUrl: './org-menu-items.component.html',
  styleUrls: ['./org-menu-items.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CommonOutletCafeSelectComponent,
    VendorFirmItemBreakdownComponent
  ]
})
export class OrgMenuItemsComponent implements OnInit, OnChanges {
  Highcharts: typeof Highcharts = Highcharts;
  @Input() adminOrg: any;
  private orgSub?: Subscription;
  outletOrderData: any[] = [];
  selectedOutletId = '';
  headerConfig: CommonSelectConfig = {
    mode: 'outlet',
    showDateRange: true,
    disableOrg: true,
    requireAll: true
  }
  filterObj: any = {
    startDate: new Date(),
    endDate: new Date(),
    orgId: '',
    cafeteria_name: '',
  };
  // Chart
  updateFlag: boolean = false;
  oneToOneFlag: boolean = true;
  orgAdmin: any;
  initialData: any[] = [];
  dateGroup!: FormGroup;
  chartOptions!: Highcharts.Options;
  updateOrdersFlag: boolean = false;
  oneToOneOrdersFlag: boolean = true;

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,
    private http: HttpClient,
    private organizationSharedService: OrganizationSharedService
  ) {
    this.dateGroup = new FormGroup({
      start: new FormControl(new Date()),
      end: new FormControl(new Date()),
    });
  }

  ngOnInit(): void {
    this.setInitials();
    this.orgSub = this.organizationSharedService.organization$.subscribe(org => {
      if (org) {
        this.adminOrg = org;
        this.setInitials();
      }
    });
  }

  ngOnDestroy(): void {
    this.orgSub?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.setInitials();
    }
  }

  setInitials() {
    if (this.adminOrg) {
      this.headerConfig = {
        ...this.headerConfig,
        defaultOrgId: this.adminOrg._id,
      };
    }
    this.orgAdmin = this.adminOrg ? { orgDetails: this.adminOrg } : this.localStorageService.getCacheData('ADMIN_PROFILE');
    if (this.orgAdmin?.role === 'ORGADMIN') {
      this.headerConfig = {
        ...this.headerConfig,
        defaultOrgId: this.orgAdmin?.orgDetails?._id,
      };
      this.filterObj.orgId = this.orgAdmin?.orgDetails?._id;
    }
  }

  async getOrgTotalOrdersStatusWiseData() {
    try {
      const res = await this.apiMainService.getOrgTotalOrdersStatusWiseData(this.filterObj);
      if (res.length > 0) {
        this.outletOrderData = res;
        this.generateChartData(res);
      }
    } catch (err: any) {
    }
  }

  generateChartData(res: any[]) {
    const completedOrders = res.filter((o: any) => o?.orderstatus === 'completed');
    const itemData: any = {};
    completedOrders.forEach((order: any) => {
      (order.itemList || []).forEach((item: any) => {
        const name = item.itemName || 'Unknown';
        if (!itemData[name]) itemData[name] = { totalAmount: 0, count: 0 };
        itemData[name].totalAmount += item.totalAmount || 0;
        itemData[name].count += 1;
      });
    });

    const chartData = Object.keys(itemData).map(itemName => {
      const item = itemData[itemName];
      return { name: itemName, y: item.totalAmount, count: item.count };
    });

    this.chartOptions = {
      chart: { type: 'pie' },
      title: { text: 'Item Distribution by Total Amount (Completed Orders)' },
      tooltip: { pointFormat: '{series.name}: <b>₹{point.y}</b> (Count: {point.count})' },
      series: [{ type: 'pie', name: 'Total', data: chartData }]
    };

    this.updateOrdersFlag = !this.updateOrdersFlag;
  }

  async openItemBreakdownModal() {
    const orders = (this.outletOrderData || []).filter(o => o?.orderstatus === 'completed');

    const start = new Date(this.filterObj.startDate);
    const end = new Date(this.filterObj.endDate);
    const rangeLabel = start.toLocaleDateString() + ' to ' + end.toLocaleDateString();

    const selectedOutlet = this.outletOrderData.find((i: any) => i.outletId === this.selectedOutletId) || {};
    const orgName = selectedOutlet.organizationDetails?.organization_name ?? '-';
    const cafeName = selectedOutlet.cafeteriaDetails?.cafeteria_name ?? '-';
    const counterName = selectedOutlet.outletName ?? '-';
    const orgCafe = `${orgName} - ${cafeName}`;

    const imageUrl = 'assets/images/deskdyneLogoblue.png';
    const logoBase64 = await this.assetToBase64(imageUrl);

    this.dialog.open(VendorFirmItemBreakdownComponent, {
      width: '960px',
      maxHeight: '85vh',
      autoFocus: false,
      data: {
        rangeLabel,
        orders,
        header: {
          cafeteriaName: orgCafe,
          counterName,
          gstNumber: this.orgAdmin?.compliance?.gstNumber || '00000000000',
          fssaiNumber: this.orgAdmin?.compliance?.fssaiNo || '00000000000000',
          createdBetween: rangeLabel,
          logoBase64,
        },
      },
    });
  }

  filterSubmitted(event: any) {
    if (event) {
      this.selectedOutletId = event?.outlet_id;
      this.filterObj = {
        startDate: event?.date_from,
        endDate: event?.date_to,
        orgId: event?.org_id,
        cafeteria_name: event?.cafeteria_name,
      }
      this.getOrgTotalOrdersStatusWiseData();
    }
  }

  private async assetToBase64(url: string): Promise<string | undefined> {
    try {
      const blob = await firstValueFrom(this.http.get(url, { responseType: 'blob' }));
      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch {
      return undefined;
    }
  }

}
