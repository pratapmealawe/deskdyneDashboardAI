import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ApiMainService } from '@service/apiService/apiMain.service';
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

interface DatewiseExcelGroup {
  dateKey: string;
  dateLabel: string;
  totals: DateGroupTotals;
}

interface DatewiseBulkBillingPayload {
  orgName: string;
  dateFrom: Date;
  dateTo: Date;
  groups: DatewiseExcelGroup[];
}

const DEFAULT_ITEM_GST_RATE = 0.05;

@Component({
  selector: 'app-bulk-billing',
  templateUrl: './bulk-billing.component.html',
  styleUrls: ['./bulk-billing.component.scss']
})
export class BulkBillingComponent {
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

  constructor(private apiMainService: ApiMainService) { }

  ngOnInit(): void { }

  private toNumber(v: any): number {
    const n = Number(v);
    return isNaN(n) ? 0 : n;
  }

  filterSubmitted(e: any): void {
    this.filteredData = e;
    this.getBulkBilling();
  }

  private async getBulkBilling(): Promise<void> {
    if (!this.filteredData?.org_id) return;
    if (!this.filteredData.date_from || !this.filteredData.date_to) return;

    try {
      this.loadingBilling = true;
      const payload = {
        orgId: this.filteredData.org_id,
        cafeteriaName: this.filteredData.cafeteria_name,
        fromDate: this.filteredData.date_from,
        toDate: this.filteredData.date_to,
      };
      this.billingList = await this.apiMainService.B2B_fetchBulkOrdersbyFilter(payload) || [];
      this.buildDateGroups();
    } catch (err) {
      this.billingList = [];
      this.dateGroups = [];
      this.pagedDateGroups = [];
      console.error('Error while fetching bulk order billing:', err);
    } finally {
      this.loadingBilling = false;
    }
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
      const base = this.getBaseAmount(order);
      const gst = this.getGstAmount(order);
      const dBase = this.getDeliveryBase(order);
      const dGst = this.getDeliveryGst(order);
      const delivery = dBase + dGst;
      const gross = this.getGross(order);

      grp.totals.count += 1;
      grp.totals.itemAmount += base;
      grp.totals.gst += gst;
      grp.totals.deliveryBase += dBase;
      grp.totals.deliveryGst += dGst;
      grp.totals.delivery += delivery;
      grp.totals.gross += gross;
    }

    this.dateGroups = Array.from(groupsMap.values()).sort((a, b) =>
      a.key < b.key ? -1 : a.key > b.key ? 1 : 0
    );

    this.groupPageIndex = 0;
    this.updatePagedDateGroups();
  }

  private updatePagedDateGroups(): void {
    const start = this.groupPageIndex * this.groupPageSize;
    const end = start + this.groupPageSize;
    this.pagedDateGroups = this.dateGroups.slice(start, end);
  }

  onGroupPage(event: PageEvent): void {
    this.groupPageIndex = event.pageIndex;
    this.groupPageSize = event.pageSize;
    this.updatePagedDateGroups();
  }

  trackByDateKey(index: number, grp: DateGroup): string {
    return grp.key;
  }

  private getOrderDateKey(order: any): string {
    const raw = order.orderDate;
    const dateStr = raw?.$date ? raw.$date : raw;
    const d = new Date(dateStr);
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

  private getLineGross(order: any): number {
    const items = Array.isArray(order.itemList) ? order.itemList : [];
    return items.reduce((sum: any, item: any) => {
      const price = Number(item.itemPrice) || 0;
      const count = Number(item.count) || 0;
      return sum + price * count;
    }, 0);
  }

  getBaseAmount(order: any): number {
    const lineGross = this.getLineGross(order);
    if (!lineGross) return 0;
    return lineGross / (1 + DEFAULT_ITEM_GST_RATE);
  }

  getGstAmount(order: any): number {
    const lineGross = this.getLineGross(order);
    const base = this.getBaseAmount(order);
    return lineGross - base;
  }

  getDeliveryBase(order: any): number {
    const items = Array.isArray(order.itemList) ? order.itemList : [];
    if (!items.length) return 0;
    return items.reduce((sum: number, item: any) => {
      const count = Number(item.count) || 0;
      const moq = Number(item.deliveryMOQ) || 0;
      const baseCharge =
        Number(item.deliveryCharge ?? item.deliveryCost ?? order.deliveryCharge ?? 0) || 0;

      if (moq > 0 && count < moq && baseCharge > 0) {
        return sum + baseCharge;
      }
      return sum;
    }, 0);
  }

  getDeliveryGst(order: any): number {
    const base = this.getDeliveryBase(order);
    return base * 0.18;
  }

  getDeliveryCharge(order: any): number {
    const base = this.getDeliveryBase(order);
    const gst = this.getDeliveryGst(order);
    return base + gst;
  }

  getGross(order: any): number {
    const lineGross = this.getLineGross(order);
    const delivery = this.getDeliveryCharge(order);
    return lineGross + delivery;
  }

  private getOrgName(): string {
    return this.filteredData?.org_id ? `Org_${this.filteredData.org_name}` : 'Organization';
  }

  exportDatewiseExcel(): void {
    if (!this.dateGroups.length) return;

    const dateFrom = this.filteredData.date_from;
    const dateTo = this.filteredData.date_to;
    const orgName = this.getOrgName();

    const groupsForExcel: DatewiseExcelGroup[] = this.dateGroups.map(grp => ({
      dateKey: grp.key,
      dateLabel: grp.dateLabel,
      totals: grp.totals,
    }));

    this.exportDatewiseBulkBilling({
      orgName,
      dateFrom: new Date(dateFrom),
      dateTo: new Date(dateTo),
      groups: groupsForExcel,
    });
  }

  async exportDatewiseBulkBilling(payload: DatewiseBulkBillingPayload): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const ws = workbook.addWorksheet('Datewise Summary');

    const currencyFmt = '₹#,##0.00';
    const rangeLabel = `From ${payload.dateFrom.toLocaleDateString('en-IN')} To ${payload.dateTo.toLocaleDateString('en-IN')}`;

    ws.mergeCells('A1:G1');
    const titleCell = ws.getCell('A1');
    titleCell.value = `Bulk Billing — ${payload.orgName}`;
    titleCell.font = { bold: true, size: 13 };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

    ws.mergeCells('A2:G2');
    const rangeCell = ws.getCell('A2');
    rangeCell.value = rangeLabel;
    rangeCell.alignment = { vertical: 'middle', horizontal: 'center' };

    const headers = [
      'Date',
      'Orders',
      'Base Amount (Excl. GST)',
      'GST(5%) Value',
      'Delivery (Base)',
      'Delivery GST (18%)',
      'Gross (All Inclusive)',
    ];
    const headerRow = ws.addRow(headers);
    headerRow.eachCell((c: any) => {
      c.font = { bold: true };
      c.alignment = { vertical: 'middle', horizontal: 'center' };
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFEFEF' } };
      c.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
    ws.getRow(3).height = 22;

    const widths = [16, 10, 22, 18, 20, 20, 22];
    widths.forEach((w, i) => (ws.getColumn(i + 1).width = w));

    let totals = {
      count: 0,
      base: 0,
      gst: 0,
      deliveryBase: 0,
      deliveryGst: 0,
      gross: 0,
    };

    for (const grp of payload.groups) {
      const t = grp.totals;

      const count = this.toNumber(t.count);
      const base = this.toNumber(t.itemAmount);
      const gst = this.toNumber(t.gst);
      const dBase = this.toNumber(t.deliveryBase);
      const dGst = this.toNumber(t.deliveryGst);
      const gross = this.toNumber(t.gross);

      const row = ws.addRow([
        grp.dateLabel,
        count,
        base,
        gst,
        dBase,
        dGst,
        gross,
      ]);

      row.getCell(1).alignment = { horizontal: 'center' };
      row.getCell(2).alignment = { horizontal: 'center' };

      for (let ci = 3; ci <= 7; ci++) {
        const c = row.getCell(ci);
        c.numFmt = currencyFmt;
        c.alignment = { horizontal: 'right' };
      }

      row.eachCell((c: any) => {
        c.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });

      totals.count += count;
      totals.base += base;
      totals.gst += gst;
      totals.deliveryBase += dBase;
      totals.deliveryGst += dGst;
      totals.gross += gross;
    }

    ws.addRow([]);
    const gtRow = ws.addRow([
      'GRAND TOTAL',
      totals.count,
      totals.base,
      totals.gst,
      totals.deliveryBase,
      totals.deliveryGst,
      totals.gross,
    ]);

    gtRow.font = { bold: true };
    gtRow.getCell(1).alignment = { horizontal: 'center' };
    gtRow.getCell(2).alignment = { horizontal: 'center' };

    for (let ci = 3; ci <= 7; ci++) {
      const c = gtRow.getCell(ci);
      c.numFmt = currencyFmt;
      c.alignment = { horizontal: 'right' };
    }
    gtRow.eachCell((c: any) => {
      c.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    const buf = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buf], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const safeRange = rangeLabel.replace(/[\\/:*?"<>|]/g, '–');
    const fileName = `${payload.orgName}-Bulk-Datewise-${safeRange}.xlsx`;
    saveAs(blob, fileName);
  }
}
