import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import { ApiMainService } from '@service/apiService/apiMain.service';
import { LocalStorageService } from '@service/local-storage.service';
import { environment } from '@environments/environment';
import { CommonSelectConfig, SubmitPayload, CommonOutletCafeSelectComponent } from 'src/app/common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { MaterialModule } from 'src/app/material.module';
import { ConsumptionOrderCardComponent } from 'src/app/common-components/consumption-order-card/consumption-order-card.component';

@Component({
  selector: 'app-org-consumption-order',
  templateUrl: './org-consumption-order.component.html',
  styleUrls: ['./org-consumption-order.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonOutletCafeSelectComponent,
    ConsumptionOrderCardComponent
  ]
})
export class OrgConsumptionOrderComponent implements OnInit {
  headerConfig: CommonSelectConfig = {
    mode: 'cafeteria',
    showDateRange: true,
    disableOrg: true,
    defaultOrgId: '',
    requireAll: true
  };

  filteredData!: SubmitPayload;

  orgAdmin: any;
  allOrderList: any[] = [];
  filteredOrderList: any[] = [];
  searchText: string = '';
  imageUrl = environment.imageUrl;
  isLoading: boolean = false;

  // Analytics
  totalOrdersCount: number = 0;
  totalItemAmount: number = 0;

  // Pagination state
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    if (this.orgAdmin?.orgDetails?._id) {
       this.headerConfig.defaultOrgId = this.orgAdmin.orgDetails._id;
    }
    
    if (this.orgAdmin?.role === 'HYPERPURE_POC') {
      this.headerConfig.defaultCafeId = this.orgAdmin?.cafeDetails?.[0]?.cafeteria_id;
      this.headerConfig.disableCafe = true;
    }
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
      this.isLoading = true;
      const res = await this.apiMainService.fetchConsumptionOrdersbysearchObj(body);
      this.allOrderList = Array.isArray(res) ? res : [];
      this.applySearchFilter();
    } catch (err: any) {
      console.error('Error fetching outlet orders', err);
      this.allOrderList = [];
      this.applySearchFilter();
    } finally {
      this.isLoading = false;
    }
  }

  calculateTotals() {
    this.totalOrdersCount = this.filteredOrderList.length;
    let total = 0;
    this.filteredOrderList.forEach(order => {
      (order.mealTypeList || []).forEach((m: any) => {
        const mealTotal = Number(m.totalPrice) || (Number(m.count) || 0) * (Number(m.mealPrice) || 0);
        total += mealTotal;
      });
    });
    this.totalItemAmount = total;
  }

  applySearchFilter() {
    if (!this.searchText) {
      this.filteredOrderList = [...this.allOrderList];
    } else {
      const query = this.searchText.toLowerCase();
      this.filteredOrderList = this.allOrderList.filter(order => {
        const matchesMeal = (order.mealTypeList || []).some((m: any) =>
          m.itemName?.toLowerCase().includes(query) ||
          m.status?.toLowerCase().includes(query)
        );
        const matchesOrg = order.organization_name?.toLowerCase().includes(query);
        const matchesCafe = order.cafeteria_name?.toLowerCase().includes(query);
        const matchesUser = order.userDetails?.userName?.toLowerCase().includes(query) ||
          order.userDetails?.phoneNo?.includes(query);

        return matchesMeal || matchesOrg || matchesCafe || matchesUser;
      });
    }
    this.calculateTotals();
    this.pageIndex = 0;
  }

  trackByOrderId = (_: number, order: any) => order?._id ?? order?.orderDate ?? _;

  /** ===================== Excel Export ===================== */

  excelExport() {
    this.exportConsumptionOrdersExcel();
  }

  downloadPdf() {
  }

  private latestStatusEntry(meal: any): { orderstatus?: string; reason?: string; adminName?: string; adminMobile?: string } {
    const arr = Array.isArray(meal?.statusHistory) ? meal.statusHistory : [];
    if (!arr.length) return {};
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

    const headers = [
      'Date', 'Review', 'Image', 'Created At', 'Org Name', 'Cafeteria Name', 
      'Item Name', 'Meal Price', 'Count', 'Total Amount (Incl. GST)', 
      'Item Status', 'Created By (Name)', 'Created By (Phone)', 
      'Admin Name', 'Admin Mobile', 'Cancel Reason'
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
          cancelReason: (String(m.status).toLowerCase() === 'cancelled') ? (latest?.reason || '') : ''
        };
      });
      const entry = byDate.get(key) || { orders: [], rows: [] };
      entry.orders.push(order);
      entry.rows = entry.rows.concat(meals);
      byDate.set(key, entry);
    }

    const dateFill: ExcelJS.Fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFDE68A' } };
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

      for (const it of entry.rows) {
        const r = ws.addRow(['', '', '', it.createdAt ? it.createdAt : '', it.orgName, it.cafeName, it.itemName, it.mealPrice, it.count, it.totalPrice, it.itemStatus, it.createdByName, it.createdByPhone, it.adminName, it.adminMobile, it.cancelReason]);
        r.outlineLevel = 1;
        r.getCell(4).numFmt = dateTimeFmt; 
        r.eachCell((c, idx) => {
          c.border = thinBorder;
          if (idx === 8 || idx === 10) { 
            c.numFmt = currencyFmt;
            c.alignment = { horizontal: 'right' };
          }
          if (idx === 9) { 
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

  private async fetchImageAsBuffer(url: string): Promise<ArrayBuffer | null> {
    try {
      const resp = await fetch(url, { mode: 'cors' });
      if (!resp.ok) return null;
      return await resp.arrayBuffer();
    } catch {
      return null;
    }
  }

  private async arrayBufferToBase64WithExt(buf: ArrayBuffer, ordersForDate: any[]): Promise<{ base64: string; ext: 'png' | 'jpeg' }> {
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
