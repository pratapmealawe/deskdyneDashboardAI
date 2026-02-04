import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ExcelService } from 'src/service/excel.service';
import { PageEvent } from '@angular/material/paginator';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

interface DateGroupTotals {
  count: number;
  itemAmount: number;   // base (excl. 5% GST) on items
  gst: number;          // 5% GST on items
  deliveryBase: number; // delivery base
  deliveryGst: number;  // 18% GST on delivery
  delivery: number;     // deliveryBase + deliveryGst
  gross: number;        // total (items gross + delivery)
}

interface DateGroup {
  key: string;          // 'yyyy-MM-dd'
  dateLabel: string;    // '17 Nov 2025'
  orders: any[];
  totals: DateGroupTotals;
}

interface DatewiseExcelGroup {
  dateKey: string;          // 'yyyy-MM-dd'
  dateLabel: string;
  totals: DateGroupTotals;
}

interface DatewiseDailyBillingPayload {
  orgName: string;
  dateFrom: Date;
  dateTo: Date;
  groups: DatewiseExcelGroup[];
}

const DEFAULT_ITEM_GST_RATE = 0.05; // 5% GST



@Component({
  selector: 'app-daily-billing',
  templateUrl: './daily-billing.component.html',
  styleUrls: ['./daily-billing.component.scss']
})
export class DailyBillingComponent implements OnInit {
  filteredData: any;
  loadingBilling = false;

  billingList: any[] = [];

  // datewise groups + pagination
  dateGroups: DateGroup[] = [];
  pagedDateGroups: DateGroup[] = [];
  groupPageSize = 5;
  groupPageIndex = 0;
  groupPageSizeOptions = [5, 10, 25];

  headerConfig: any = {
    mode: 'cafeteria',
    showDateRange: true,
    disableOrg: false,
    requireAll: true // Enforce cafe selection? Or false? "add cafe listing" suggests selection. 
    // Usually billing is specific. Let's try true or allow flexibility.
    // User's other billing comp has requireAll: true.
  };

  constructor(
    private apiMainService: ApiMainService,
    private excelService: ExcelService,
    private dialog: MatDialog,
    fb: FormBuilder
  ) {
    // dateForm removed
  }

  ngOnInit(): void {
    // No loadOrgs needed
  }

  private toNumber(v: any): number {
    const n = Number(v);
    return isNaN(n) ? 0 : n;
  }

  // filterSubmitted handles the event from common component
  filterSubmitted(e: any): void {
    this.filteredData = e;
    this.getDailyBilling();
  }

  // central place for daily billing API call
  private async getDailyBilling(): Promise<void> {
    if (!this.filteredData?.org_id) return;
    // e.date_from is ISO string
    if (!this.filteredData.date_from || !this.filteredData.date_to) return;

    try {
      this.loadingBilling = true;

      const payload = {
        orgId: this.filteredData.org_id,
        cafeteriaId: this.filteredData.cafeteria_id, // Pass this if available
        fromDate: this.filteredData.date_from,
        toDate: this.filteredData.date_to,
      };

      this.billingList = await this.apiMainService.fetchDailyBulkOrdersbyOrgId(payload) || [];
      console.log('billingList', this.billingList);

      this.buildDateGroups();

    } catch (err) {
      console.error('Error fetching daily billing:', err);
      this.billingList = [];
      this.dateGroups = [];
      this.pagedDateGroups = [];
    } finally {
      this.loadingBilling = false;
    }
  }

  /**
   * Build date-wise groups from billingList
   */
  private buildDateGroups(): void {
    const groupsMap = new Map<string, DateGroup>();

    for (const order of this.billingList) {
      const key = this.getOrderDateKey(order);   // 'yyyy-MM-dd'
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

      const base = this.getBaseAmount(order);          // items base
      const gst = this.getGstAmount(order);            // items GST
      const dBase = this.getDeliveryBase(order);       // delivery base
      const dGst = this.getDeliveryGst(order);         // delivery GST 18%
      const delivery = dBase + dGst;                   // total delivery
      const gross = this.getGross(order);              // items gross + delivery

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

  /**
   * Extract normalized date key from order (handles raw $date or ISO string)
   */
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

  // ====== AMOUNT CALCULATIONS FROM itemList ======

  private getLineGross(order: any): number {
    const items = Array.isArray(order.itemList) ? order.itemList : [];
    return items.reduce((sum: any, item: any) => {
      const price = Number(item.mealPrice) || 0;
      const count = Number(item.count) || 0;
      return sum + price * count;
    }, 0);
  }

  /**
   * Base amount = Σ (mealPrice * count)
   */
  getBaseAmount(order: any): number {
    const lineGross = this.getLineGross(order);
    if (!lineGross) return 0;
    return lineGross / (1 + DEFAULT_ITEM_GST_RATE);
  }

  /**
   * GST = 5% of base amount
   */
  getGstAmount(order: any): number {
    const lineGross = this.getLineGross(order);
    const base = this.getBaseAmount(order);
    return lineGross - base;
  }

  /**
 /**
 * Delivery base:
 * For each item: if count < deliveryMOQ → add deliveryCharge (base only)
 */
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

  /**
   * Delivery GST @ 18% on delivery base
   */
  getDeliveryGst(order: any): number {
    const base = this.getDeliveryBase(order);
    return base * 0.18;
  }

  /**
   * Delivery total = base + 18% GST
   */
  getDeliveryCharge(order: any): number {
    const base = this.getDeliveryBase(order);
    const gst = this.getDeliveryGst(order);
    return base + gst;
  }

  /**
  * Gross = item gross (incl. 5% GST) + delivery (base + 18% GST)
  */
  getGross(order: any): number {
    const lineGross = this.getLineGross(order); // items GST-inclusive
    const delivery = this.getDeliveryCharge(order);
    return lineGross + delivery;
  }


  private getOrgName(): string {
    // Since we use common component, we don't have orgList access. 
    // We can return ID or valid placeholder, or fetch filtered org details if really needed.
    // For now returning 'Organization' or ID.
    return this.filteredData?.org_id ? `Org_${this.filteredData.org_id}` : 'Organization';
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

    this.exportDatewiseDailyBilling({
      orgName,
      dateFrom: new Date(dateFrom),
      dateTo: new Date(dateTo),
      groups: groupsForExcel,
    });
  }

  async exportDatewiseDailyBilling(payload: DatewiseDailyBillingPayload): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const ws = workbook.addWorksheet('Datewise Summary');

    const currencyFmt = '₹#,##0.00';
    const rangeLabel = `From ${payload.dateFrom.toLocaleDateString('en-IN')} To ${payload.dateTo.toLocaleDateString('en-IN')}`;

    // ===== Title (merge A1:G1) =====
    ws.mergeCells('A1:G1');
    const titleCell = ws.getCell('A1');
    titleCell.value = `Daily Bulk Billing — ${payload.orgName}`;
    titleCell.font = { bold: true, size: 13 };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

    // Date range row (A2:G2)
    ws.mergeCells('A2:G2');
    const rangeCell = ws.getCell('A2');
    rangeCell.value = rangeLabel;
    rangeCell.alignment = { vertical: 'middle', horizontal: 'center' };

    // ===== Header row (A3..G3) =====
    const headers = [
      'Date',                         // A
      'Orders',                       // B
      'Base Amount (Excl. GST)',      // C
      'GST(5%) Value',                // D
      'Delivery (Base)',              // E
      'Delivery GST (18%)',           // F
      'Gross (All Inclusive)',        // G
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

    // Column widths (A..G)
    const widths = [16, 10, 22, 18, 20, 20, 22];
    widths.forEach((w, i) => (ws.getColumn(i + 1).width = w));

    // ===== Data rows start at row 4 =====
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

      // Use dateLabel string to avoid timezone/date shift issues
      const row = ws.addRow([
        grp.dateLabel, // A Date (string)
        count,         // B Orders
        base,          // C Base
        gst,           // D GST (5%)
        dBase,         // E Delivery Base
        dGst,          // F Delivery GST (18%)
        gross,         // G Gross
      ]);

      // Alignments
      row.getCell(1).alignment = { horizontal: 'center' }; // date string
      row.getCell(2).alignment = { horizontal: 'center' };

      // Money cols: C..G
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

      // Grand totals
      totals.count += count;
      totals.base += base;
      totals.gst += gst;
      totals.deliveryBase += dBase;
      totals.deliveryGst += dGst;
      totals.gross += gross;
    }

    // ===== GRAND TOTAL row =====
    ws.addRow([]); // spacer
    const gtRow = ws.addRow([
      'GRAND TOTAL',        // A
      totals.count,         // B Orders
      totals.base,          // C Base
      totals.gst,           // D GST
      totals.deliveryBase,  // E Delivery Base
      totals.deliveryGst,   // F Delivery GST
      totals.gross,         // G Gross
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

    // Save
    const buf = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buf], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const safeRange = rangeLabel.replace(/[\\/:*?"<>|]/g, '–');
    const fileName = `${payload.orgName}-DailyBulk-Datewise-${safeRange}.xlsx`;
    saveAs(blob, fileName);
  }


}
