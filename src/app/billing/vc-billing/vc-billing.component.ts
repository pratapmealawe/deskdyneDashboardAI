import { Component, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ExcelService } from 'src/service/excel.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

interface DateGroupTotals {
  count: number;
  itemAmount: number;
  gst: number;
  deliveryBase: number;
  deliveryGst: number;
  delivery: number;
  gross: number;
}

interface DateGroup {
  key: string;
  dateLabel: string;
  orders: any[];
  totals: DateGroupTotals;
}

@Component({
  selector: 'app-vc-billing',
  templateUrl: './vc-billing.component.html',
  styleUrls: ['./vc-billing.component.scss']
})
export class VcBillingComponent {
  @Input() selectedOrg: any;
  filteredData: any;
  loadingBilling = false;
  billingList: any[] = [];
  dateGroups: DateGroup[] = [];
  pagedDateGroups: DateGroup[] = [];
  groupPageSize = 5;
  groupPageIndex = 0;
  groupPageSizeOptions = [5, 10, 25];
  headerConfig: any = {
    mode: 'cafeteria',
    showDateRange: true,
    disableOrg: false,
    requireAll: true
  };

  constructor(
    private apiMainService: ApiMainService
  ) { }

  async getVCOrders() {
    try {
      const payload = {
        orgId: this.filteredData.org_id,
        cafeId: this.filteredData.cafeteria_id,
        fromDate: this.filteredData.date_from,
        toDate: this.filteredData.date_to
      }
      const res: any = await this.apiMainService.getFoodOrderPackageByOrgIdAndCafeId(payload);
      if (res) {
        this.billingList = res;
        this.buildDateGroups();
      } else {
        this.billingList = [];
        this.dateGroups = [];
        this.pagedDateGroups = [];
      }
    } catch (error) {
      console.error(error);
    }
  }

  filterSubmitted(event: any) {
    this.filteredData = event;
    this.getVCOrders();
  }

  async exportDatewiseExcel() {
    if (!this.dateGroups || this.dateGroups.length === 0) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('VC Billing');

    // =============================
    // HEADER SECTION
    // =============================

    worksheet.mergeCells('A1:I1');
    worksheet.getCell('A1').value = 'Virtual Cafeteria Billing Report';
    worksheet.getCell('A1').font = { size: 16, bold: true };
    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    worksheet.addRow([]);

    worksheet.addRow([
      `Organization: ${this.filteredData?.org_name || ''}`
    ]);

    worksheet.addRow([
      `Cafeteria: ${this.filteredData?.cafeteria_name || ''}`
    ]);

    worksheet.addRow([
      `Date Range: ${this.filteredData?.date_from} - ${this.filteredData?.date_to}`
    ]);

    worksheet.addRow([]);
    worksheet.addRow([]);

    // =============================
    // COLUMN HEADERS
    // =============================

    const headerRow = [
      'Order No',
      'Customer',
      'Mobile',
      'Package Name',
      'Meal MRP',
      'Subsidy Amount',
      'Kitchen Amount',
      'Profit & Loss (P&L)',
      'Invoice Status'
    ];

    // Set column widths
    worksheet.columns = [
      { width: 18 },
      { width: 18 },
      { width: 15 },
      { width: 25 },
      { width: 12 },
      { width: 14 },
      { width: 14 },
      { width: 16 },
      { width: 15 }
    ];

    let grandTotals = {
      count: 0,
      mrp: 0,
      subsidy: 0,
      kitchen: 0,
      pnl: 0
    };

    // =============================
    // DATE GROUPS LOOP
    // =============================

    for (const group of this.dateGroups) {

      worksheet.addRow([]);
      worksheet.addRow([]);

      // Date Header
      const dateRow = worksheet.addRow([`Date: ${group.dateLabel}`]);
      dateRow.font = { bold: true, size: 13 };

      worksheet.addRow([`Total Orders: ${group.orders.length}`]);
      worksheet.addRow([]);

      // Table Header
      const tableHeader = worksheet.addRow(headerRow);
      tableHeader.font = { bold: true };

      tableHeader.eachCell(cell => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFE0E0E0' }
        };
        cell.alignment = { horizontal: 'center' };
      });

      // Date Totals
      let dateTotals = {
        count: 0,
        mrp: 0,
        subsidy: 0,
        kitchen: 0,
        pnl: 0
      };

      // Orders
      for (const order of group.orders) {

        const mrp = Number(order.mealPackage.packagePrice || 0);
        const subsidy = Number(order.mealPackage.subsidyAmount || 0);
        const kitchen = Number(order.mealPackage.payToKitchenPerMeal || 0);
        const pnl = mrp - subsidy - kitchen;

        worksheet.addRow([
          order.orderId || order.orderNo || '',
          order.customerName || '',
          order.customerMobile || '',
          order.packageName || '',
          mrp,
          subsidy,
          kitchen,
          pnl,
          order.invoiceStatus || ''
        ]);

        dateTotals.count++;
        dateTotals.mrp += mrp;
        dateTotals.subsidy += subsidy;
        dateTotals.kitchen += kitchen;
        dateTotals.pnl += pnl;
      }

      // Date Summary
      worksheet.addRow([]);
      const summaryRow = worksheet.addRow([
        'Date Total',
        '',
        '',
        '',
        dateTotals.mrp,
        dateTotals.subsidy,
        dateTotals.kitchen,
        dateTotals.pnl,
        ''
      ]);

      summaryRow.font = { bold: true };

      // Add to Grand Total
      grandTotals.count += dateTotals.count;
      grandTotals.mrp += dateTotals.mrp;
      grandTotals.subsidy += dateTotals.subsidy;
      grandTotals.kitchen += dateTotals.kitchen;
      grandTotals.pnl += dateTotals.pnl;
    }

    // =============================
    // GRAND TOTAL
    // =============================

    worksheet.addRow([]);
    worksheet.addRow([]);
    const grandRow = worksheet.addRow([
      'Grand Total',
      '',
      '',
      '',
      grandTotals.mrp,
      grandTotals.subsidy,
      grandTotals.kitchen,
      grandTotals.pnl,
      ''
    ]);

    grandRow.font = { bold: true, size: 13 };

    // =============================
    // DOWNLOAD FILE
    // =============================

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer]),
      `VC_Billing_${this.filteredData?.date_from}_${this.filteredData?.date_to}.xlsx`
    );
  }

  trackByDateKey(index: number, grp: DateGroup): string {
    return grp.key;
  }

  onGroupPage(event: PageEvent): void {
    this.groupPageIndex = event.pageIndex;
    this.groupPageSize = event.pageSize;
  }

  private buildDateGroups(): void {
    const groupsMap = new Map<string, DateGroup>();

    for (const order of this.billingList) {
      const key = this.getOrderDateKey(order);
      const label = this.getOrderDateLabel(order);

      if (!groupsMap.has(key)) {
        groupsMap.set(key, {
          key,
          dateLabel: label,
          orders: [],
          totals: {
            count: 0,
            itemAmount: 0,
            gst: 0,
            deliveryBase: 0,
            deliveryGst: 0,
            delivery: 0,
            gross: 0,
          },
        });
      }

      const grp = groupsMap.get(key)!;
      grp.orders.push(order);
    }

    this.dateGroups = Array.from(groupsMap.values()).sort((a, b) =>
      a.key < b.key ? -1 : a.key > b.key ? 1 : 0
    );

    this.groupPageIndex = 0;
    this.updatePagedDateGroups();
  }

  private getOrderDateKey(order: any): string {
    const raw = order.orderDate;
    const dateStr = raw?.$date ? raw.$date : raw;
    const d = new Date(dateStr);
    // yyyy-MM-dd
    return d.toISOString().substring(0, 10);
  }

  private getOrderDateLabel(order: any): string {
    const raw = order.orderDate;
    const dateStr = raw?.$date ? raw.$date : raw;
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  private updatePagedDateGroups(): void {
    const start = this.groupPageIndex * this.groupPageSize;
    const end = start + this.groupPageSize;
    this.pagedDateGroups = this.dateGroups.slice(start, end);
  }

}
