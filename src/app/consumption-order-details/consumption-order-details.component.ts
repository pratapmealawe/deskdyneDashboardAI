import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { ConfirmationModalService } from '../../service/confirmation-modal.service';
import { environment } from 'src/environments/environment';
import { ExcelService } from 'src/service/excel.service';
import { CommonSelectConfig, SubmitPayload } from '../common-outlet-cafe-select/common-outlet-cafe-select.component';
import { ToasterService } from 'src/service/toaster.service';

@Component({
  selector: 'app-consumption-order-details',
  templateUrl: './consumption-order-details.component.html',
  styleUrls: ['./consumption-order-details.component.scss']
})
export class ConsumptionOrderDetailsComponent implements OnInit {
  headerConfig: CommonSelectConfig = {
    mode: 'cafeteria',
    showDateRange: true,
    disableOrg: true,
    defaultOrgId: '',
    requireAll: true
  };

  filteredData!: SubmitPayload;

  orgAdmin: any;
  filteredOrderList: any[] = [];
  imageUrl = environment.imageUrl;
  orderDate: any;
  statusPayload: any;

  // Pagination state
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(
    private apiMainService: ApiMainService,
    private toaster: ToasterService,
    private localStorageService: LocalStorageService,
    private confirmationModalService: ConfirmationModalService,
    private excel: ExcelService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.headerConfig.defaultOrgId = this.orgAdmin?.orgDetails?._id;
    if (this.orgAdmin?.role === 'HYPERPURE_POC') {
      this.headerConfig.defaultCafeId = this.orgAdmin?.cafeDetails?.[0]?.cafeteria_id;
      this.headerConfig.disableCafe = true;
    }
  }

  // Admin meta (safe fallback)
  private get adminName(): string {
    return (
      this.orgAdmin?.adminDetails?.name ||
      this.orgAdmin?.name ||
      this.orgAdmin?.userName ||
      'Admin'
    );
  }
  private get adminMobile(): string {
    return (
      this.orgAdmin?.adminDetails?.mobile ||
      this.orgAdmin?.phone ||
      this.orgAdmin?.mobile ||
      ''
    );
  }

  // Slice list for current page
  get pagedOrderList(): any[] {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredOrderList.slice(start, end);
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
  }

  filterSubmitted(e: SubmitPayload) {
    if (e) {
      this.filteredData = e;
      this.filterOrders();
    }
  }

  filterOrders(): void {
    if (!this.filteredData.org_id || !this.filteredData.cafeteria_id) {
      console.warn('Organization or Cafeteria not selected!');
      return;
    }

    const body = {
      cafeteriaName: this.filteredData.cafeteria_name,
      organizationName: this.filteredData.org_name,
      fromDate: this.filteredData.date_from,
      toDate: this.filteredData.date_to
    };

    this.getConsumptionOrderByFilter(body);
  }

  async getConsumptionOrderByFilter(body: any) {
    try {
      const res = await this.apiMainService.fetchConsumptionOrdersbysearchObj(body);
      this.filteredOrderList = Array.isArray(res) ? res : [];
      this.pageIndex = 0;
    } catch (err: any) {
      console.error('Error fetching outlet orders', err);
      this.filteredOrderList = [];
      this.pageIndex = 0;
    }
  }

  /** ===================== APPROVE / CANCEL ===================== */

  // Approve All
  showPopupForItemActivation(order: any, status: 'approved' | 'cancelled') {
    if (status === 'cancelled') {
      // handled via onCancelAll(...) elsewhere in your code
      return;
    }
    this.orderDate = order.orderDate;
    this.statusPayload = {
      orderDate: this.orderDate,
      status: 'approved',
      // include admin meta on approve too
      adminName: this.adminName,
      adminMobile: this.adminMobile
    };
    const statusText = `Are you sure you want to approve all menu items?`;
    this.confirmationModalService.modal({
      msg: statusText,
      callback: this.updateConsumptionOrderStatus,
      context: this,
      data: status
    });
  }

  // Approve Single
  showPopupForSinleItemActivation(order: any, meal: any, status: 'approved' | 'cancelled') {
    if (status === 'cancelled') {
      // handled via onCancelItem(...) elsewhere in your code
      return;
    }
    this.orderDate = order.orderDate;
    this.statusPayload = {
      orderDate: this.orderDate,
      status: 'approved',
      itemId: meal._id,
      // include admin meta on approve too
      adminName: this.adminName,
      adminMobile: this.adminMobile
    };
    const statusText = `Are you sure you want to approve ${meal.itemName} item?`;
    this.confirmationModalService.modal({
      msg: statusText,
      callback: this.updateConsumptionSingleMealStatus,
      context: this,
      data: status
    });
  }

  // === CANCEL: All items in an order ===
  onCancelAll(order: any) {
    const reason = (window.prompt('Enter cancel reason for all items') || '').trim();
    if (!reason) return; // user aborted

    this.orderDate = order.orderDate;
    this.statusPayload = {
      orderDate: this.orderDate,
      status: 'cancelled',
      cancelReason: reason,
      adminName: this.adminName,
      adminMobile: this.adminMobile
    };

    this.updateConsumptionOrderStatus(); // will refetch via filterOrders()
  }

  // === CANCEL: Single item ===
  onCancelItem(order: any, meal: any) {
    const reason = (window.prompt(`Enter cancel reason for "${meal?.itemName}"`) || '').trim();
    if (!reason) return; // user aborted

    this.orderDate = order.orderDate;
    this.statusPayload = {
      orderDate: this.orderDate,
      status: 'cancelled',
      itemId: meal._id,
      cancelReason: reason,
      adminName: this.adminName,
      adminMobile: this.adminMobile
    };

    this.updateConsumptionSingleMealStatus(); // will refetch via filterOrders()
  }

  async updateConsumptionOrderStatus() {
    try {
      await this.apiMainService.updateConsumptionOrderStatus(
        this.filteredOrderList?.[0]?.organization_id,
        this.filteredOrderList?.[0]?.cafeteria_orignal_id,
        this.statusPayload
      );
      this.filterOrders();
    } catch (err: any) {
      console.error('Error updating order status', err);
    }
  }

  async updateConsumptionSingleMealStatus() {
    try {
      await this.apiMainService.updateConsumptionSingleMeslStatus(
        this.filteredOrderList?.[0]?.organization_id,
        this.filteredOrderList?.[0]?.cafeteria_orignal_id,
        this.statusPayload
      );
      this.filterOrders();
    } catch (err: any) {
      console.error('Error updating single meal status', err);
    }
  }

  checkAllMealStatus(order: any) {
    return order.mealTypeList.find((data: any) => data.status == 'review');
  }

  downloadOrder(order: any) {
    const url = `${this.imageUrl}${order.imageUrl}`;
    const link = document.createElement('a');
    link.href = url;
    const fileName = order.imageUrl?.split('/').pop() || 'downloaded-file';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Helpful for ngFor
  trackByOrderId = (_: number, order: any) => order?._id ?? order?.orderDate ?? _;

  /** ===================== Excel Export (updated spec) ===================== */

  // pick latest status history for a meal (for admin meta / reason)
  private latestStatusEntry(meal: any): { orderstatus?: string; reason?: string; adminName?: string; adminMobile?: string } {
    const arr = Array.isArray(meal?.statusHistory) ? meal.statusHistory : [];
    if (!arr.length) return {};
    // assuming chronological; if not, sort by updatedOn
    const last = [...arr].sort((a, b) => new Date(a?.updatedOn || 0).getTime() - new Date(b?.updatedOn || 0).getTime()).pop();
    return {
      orderstatus: last?.orderstatus,
      reason: last?.reason,
      adminName: last?.adminName,
      adminMobile: last?.adminMobile
    };
  }

  async exportConsumptionOrdersExcel(): Promise<void> {
    if (!this.filteredOrderList || this.filteredOrderList.length === 0) return;

    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Consumption Orders', { properties: { defaultRowHeight: 18 } });

    const currencyFmt = '₹#,##0.00';
    const dateFmt = 'dd-mmm-yy';
    const dateTimeFmt = 'dd-mmm-yy hh:mm AM/PM';

    const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const toLocalYmd = (v: any) => {
      const d = new Date(v);
      return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
    };

    // HEADERS (updated):
    // Parent/date row still shows Date, Review, Image (group header)
    // Child rows now have:
    // Created At, Org Name, Cafeteria Name, Item Name, Meal Price, Count, Total, Item Status, Created By (Name), Created By (Phone), Admin Name, Admin Mobile, Cancel Reason
    const headers = [
      'Date',            // A (parent)
      'Review',          // B (parent)
      'Image',           // C (parent)
      'Created At',      // D
      'Org Name',        // E
      'Cafeteria Name',  // F
      'Item Name',       // G
      'Meal Price',      // H
      'Count',           // I
      'Total Amount (Incl. GST)', // J
      'Item Status',     // K
      'Created By (Name)', // L
      'Created By (Phone)', // M
      'Admin Name',      // N
      'Admin Mobile',    // O
      'Cancel Reason'    // P
    ];
    const headerRow = ws.addRow(headers);
    headerRow.height = 22;

    const headerFill: ExcelJS.Fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFEFEF' } };
    const thinBorder: Partial<ExcelJS.Borders> = {
      top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }
    };

    headerRow.eachCell((c) => {
      c.font = { bold: true };
      c.alignment = { vertical: 'middle', horizontal: 'center' };
      c.fill = headerFill;
      c.border = thinBorder;
    });

    [16, 28, 14, 20, 24, 24, 28, 14, 10, 22, 16, 22, 18, 18, 16, 28]
      .forEach((w, i) => (ws.getColumn(i + 1).width = w));

    // Group data by local date
    const byDate = new Map<string, { orders: any[]; rows: any[] }>();
    for (const order of this.filteredOrderList) {
      const key = toLocalYmd(order.orderDate);
      const meals = (order.mealTypeList || []).map((m: any) => {
        const totalPrice = Number(m.totalPrice) || (Number(m.count) || 0) * (Number(m.mealPrice) || 0);
        const latest = this.latestStatusEntry(m);

        return {
          createdAt: order?.created_at ? new Date(order.created_at) : null,
          orgName: order?.organization_name || '',
          cafeName: order?.cafeteria_name || '',
          itemName: m.itemName,
          mealPrice: Number(m.mealPrice) || 0,
          count: Number(m.count) || 0,
          totalPrice: totalPrice,
          itemStatus: m.status || '',
          createdByName: order?.userDetails?.userName || '',
          createdByPhone: order?.userDetails?.phoneNo || '',
          adminName: latest?.adminName || '',
          adminMobile: latest?.adminMobile || '',
          cancelReason: (String(m.status).toLowerCase() === 'cancelled')
            ? (latest?.reason || '')
            : ''
        };
      });
      const entry = byDate.get(key) || { orders: [], rows: [] };
      entry.orders.push(order);
      entry.rows = entry.rows.concat(meals);
      byDate.set(key, entry);
    }

    const dateFill: ExcelJS.Fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFDE68A' } };

    // preload one image per date (same as before)
    const dateImageBuffers = new Map<string, ArrayBuffer | null>();
    for (const [key, entry] of byDate) {
      const withImg = entry.orders.find(o => !!o.imageUrl);
      if (withImg) {
        const url = `${this.imageUrl}${withImg.imageUrl}`;
        const buf = await this.fetchImageAsBuffer(url).catch(() => null);
        dateImageBuffers.set(key, buf ?? null);
      } else {
        dateImageBuffers.set(key, null);
      }
    }

    // Render
    for (const [key, entry] of byDate) {
      const firstOrder = entry.orders[0];
      const parent = ws.addRow([key, (firstOrder?.remark || '').toString(), '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
      parent.getCell(1).numFmt = dateFmt;
      parent.font = { bold: true };
      parent.getCell(1).fill = dateFill;
      parent.eachCell((cell) => (cell.border = thinBorder));

      const imgBuf = dateImageBuffers.get(key) || null;
      const parentRowNumber = parent.number;
      if (imgBuf) {
        try {
          const { base64, ext } = await this.arrayBufferToBase64WithExt(imgBuf, entry.orders);
          const imageId = wb.addImage({ base64, extension: ext });
          ws.addImage(imageId, { tl: { col: 2, row: parentRowNumber - 1 }, ext: { width: 64, height: 64 } });
          ws.getRow(parentRowNumber).height = Math.max(ws.getRow(parentRowNumber).height || 18, 50);
        } catch {
          const o = entry.orders.find(o => !!o.imageUrl);
          if (o) {
            const link = `${this.imageUrl}${o.imageUrl}`;
            parent.getCell(3).value = { text: 'Open Image', hyperlink: link };
            parent.getCell(3).font = { color: { argb: 'FF1D4ED8' }, underline: true };
          }
        }
      } else {
        const o = entry.orders.find(o => !!o.imageUrl);
        if (o) {
          const link = `${this.imageUrl}${o.imageUrl}`;
          parent.getCell(3).value = { text: 'Open Image', hyperlink: link };
          parent.getCell(3).font = { color: { argb: 'FF1D4ED8' }, underline: true };
        }
      }

      // child rows
      for (const it of entry.rows) {
        const r = ws.addRow([
          '',                 // Date (parent)
          '',                 // Review (parent)
          '',                 // Image (parent)
          it.createdAt ? it.createdAt : '',    // Created At
          it.orgName,                           // Org
          it.cafeName,                          // Cafe
          it.itemName,                          // Item
          it.mealPrice,                         // Meal Price
          it.count,                             // Count
          it.totalPrice,                        // Total
          it.itemStatus,                        // Item Status
          it.createdByName,                     // Created By (Name)
          it.createdByPhone,                    // Created By (Phone)
          it.adminName,                         // Admin Name
          it.adminMobile,                       // Admin Mobile
          it.cancelReason                       // Cancel Reason
        ]);
        r.outlineLevel = 1;

        // styles
        r.getCell(4).numFmt = dateTimeFmt; // Created At
        r.eachCell((c, idx) => {
          c.border = thinBorder;
          if (idx === 8 || idx === 10) { // H (Meal Price), J (Total)
            c.numFmt = currencyFmt;
            c.alignment = { horizontal: 'right' };
          }
          if (idx === 9) { // I (Count)
            c.numFmt = '#,##0';
            c.alignment = { horizontal: 'center' };
          }
        });
      }
    }

    const buf = await wb.xlsx.writeBuffer();
    const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const safe = (s: string) => String(s).replace(/[\\/:*?"<>|]/g, '–');
    const orgName = this.filteredData?.org_name || 'Organization';
    const cafeName = this.filteredData?.cafeteria_name || 'Cafeteria';
    const rangeLabel = (() => {
      const f = this.filteredData?.date_from ? toLocalYmd(this.filteredData.date_from) : '';
      const t = this.filteredData?.date_to ? toLocalYmd(this.filteredData.date_to) : '';
      return f && t ? `${f} to ${t}` : (f || t || toLocalYmd(new Date()));
    })();

    const fileName = `${safe(orgName)} - ${safe(cafeName)} - Consumption Orders - ${safe(rangeLabel)}.xlsx`;
    saveAs(blob, fileName);
  }

  /** Fetch image as ArrayBuffer for ExcelJS embedding; falls back gracefully on CORS/errors. */
  private async fetchImageAsBuffer(url: string): Promise<ArrayBuffer | null> {
    try {
      const resp = await fetch(url, { mode: 'cors' });
      if (!resp.ok) return null;
      return await resp.arrayBuffer();
    } catch {
      return null;
    }
  }

  /** Convert ArrayBuffer -> base64; guess extension from first order's imageUrl */
  private async arrayBufferToBase64WithExt(
    buf: ArrayBuffer,
    ordersForDate: any[]
  ): Promise<{ base64: string; ext: 'png' | 'jpeg' }> {
    const ext = this.detectImageExt(ordersForDate) as 'png' | 'jpeg';
    const base64 = await this.arrayBufferToBase64(buf);
    return { base64: `data:image/${ext};base64,${base64}`, ext };
  }

  private detectImageExt(orders: any[]): 'png' | 'jpeg' {
    const url = (orders.find(o => !!o.imageUrl)?.imageUrl || '').toLowerCase();
    if (url.endsWith('.png')) return 'png';
    return 'jpeg';
  }

  private async arrayBufferToBase64(buf: ArrayBuffer): Promise<string> {
    const blob = new Blob([buf]);
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const res = reader.result as string;
        const comma = res.indexOf(',');
        resolve(comma >= 0 ? res.slice(comma + 1) : res);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
