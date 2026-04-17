import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { orderStatusMapper } from 'src/config/order-status.config';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { LocalStorageService } from 'src/service/local-storage.service';
import { CommonSelectConfig, CommonOutletCafeSelectComponent } from 'src/app/common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { DailyBulkCardComponent } from 'src/app/other-orders/daily-bulk-order/daily-bulk-card/daily-bulk-card.component';
import * as Highcharts from 'highcharts';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs =
  (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs ?? {};

@Component({
  selector: 'app-daily-admin-excel-export',
  templateUrl: './daily-admin-excel-export.component.html',
  styleUrls: ['./daily-admin-excel-export.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HighchartsChartModule,
    DailyBulkCardComponent,
    CommonOutletCafeSelectComponent
  ],
  providers: [DatePipe]
})
export class DailyAdminExcelExportComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  orderStatusMapper: any = orderStatusMapper;
  adminOrderStatusList = [
    { label: 'Placed', value: 'placed', count: 0 },
    { label: 'Accepted', value: 'accepted', count: 0 },
    { label: 'Preparing', value: 'preparing', count: 0 },
    { label: 'Ready For Delivery', value: 'readyForDelivery', count: 0 },
    { label: 'Agent Assigned', value: 'deliveryBoyAssigned', count: 0 },
    { label: 'Handed Over', value: 'handedOverToDeliveryBoy', count: 0 },
    { label: 'On The Way', value: 'onTheWay', count: 0 },
    { label: 'Delivered', value: 'delivered', count: 0 },
    { label: 'Completed', value: 'completed', count: 0 },
  ];

  allOrdersList: any[] = [];
  filteredOrderList: any[] = [];
  paginatedList: any[] = [];
  selectedStatus: string = 'placed';
  selectedAdminOrderDate: Date = new Date();
  selectedAdminOrderDateTo: Date | null = null;
  isLoading: boolean = false;
  pageIndex: number = 0;
  pageSize: number = 10;
  estimatedTotal: number = 0;

  // Search & Chart
  searchText = '';
  isShowChart: boolean = false;
  chartOptions!: Highcharts.Options;
  updateStatusFlag: boolean = false;
  oneToOneStatusFlag: boolean = true;

  // UI State
  isAdmin: boolean = false;
  orgAdmin: any;
  headerConfig: CommonSelectConfig = {
    mode: 'cafeteria',
    showDateRange: true,
    disableOrg: true,
    requireAll: true
  };
  headerConfigAdmin: CommonSelectConfig = {
    mode: 'cafeteria',
    showDateRange: true,
    disableOrg: false,
    requireAll: true
  };

  // Totals
  totalRevenue = 0;
  totalOrdersCount = 0;
  totalItemAmount = 0;
  totalDeliveryCharge = 0;
  totalTaxes = 0;
  totalPaidToKitchen = 0;

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    if (this.orgAdmin) {
      this.isAdmin = this.orgAdmin.role === 'ADMIN';
      this.headerConfig.defaultOrgId = this.orgAdmin?.orgDetails?._id;
    }
    this.getBulkDailyOrderList();
  }

  filterSubmitted(event: any) {
    if (event) {
      this.selectedAdminOrderDate = new Date(event.date_from);
      if (event.date_to) {
        this.selectedAdminOrderDateTo = new Date(event.date_to);
      } else {
        this.selectedAdminOrderDateTo = null;
      }
      this.getBulkDailyOrderList();
    }
  }

  async getBulkDailyOrderList() {
    try {
      this.isLoading = true;
      const dateParam = {
        fromDate: this.selectedAdminOrderDate.toISOString(),
        toDate: (this.selectedAdminOrderDateTo || this.selectedAdminOrderDate).toISOString()
      };
      const res: any = await this.apiMainService.getCurrentDailyOrdersCount(dateParam);
      if (res) {
        this.adminOrderStatusList.forEach((status: any) => {
          status.count = res[status.value] || 0;
        });
      }
    } catch (error) {
      console.error('Error fetching daily orders count:', error);
    } finally {
      this.isLoading = false;
    }
    this.getLatestBulkDailyOrderStatusList(this.selectedStatus);
  }

  async getLatestBulkDailyOrderStatusList(status: any) {
    this.selectedStatus = status;
    this.allOrdersList = [];
    this.filteredOrderList = [];
    this.pageIndex = 0;
    this.getOrderStatusList(status, 1);
  }

  async getOrderStatusList(status: string, pageNum: number) {
    try {
      this.isLoading = true;
      this.pageIndex = pageNum - 1;
      const dateParam = {
        fromDate: this.selectedAdminOrderDate.toISOString(),
        toDate: (this.selectedAdminOrderDateTo || this.selectedAdminOrderDate).toISOString()
      };

      const res: any = await this.apiMainService.getBulkDailyOrderList(status, pageNum, this.pageSize, dateParam);
      if (res) {
        this.allOrdersList = res.orderList || [];
        this.estimatedTotal = res.totalCount || 0;
        this.applyFilters();
      }
    } catch (error) {
      console.error('Error fetching order status list:', error);
      this.allOrdersList = [];
      this.filteredOrderList = [];
      this.paginatedList = [];
    } finally {
      this.isLoading = false;
    }
  }

  onSearch(searchValue: string) {
    this.searchText = searchValue;
    this.applyFilters();
  }

  applyFilters() {
    let list = this.allOrdersList;

    if (this.searchText) {
      const lowerSearch = this.searchText.toLowerCase();
      list = list.filter((order: any) =>
        (order.orderNo && order.orderNo.toString().toLowerCase().includes(lowerSearch)) ||
        (order.customerName && order.customerName.toLowerCase().includes(lowerSearch)) ||
        (order.customerPhoneNo && order.customerPhoneNo.toString().includes(lowerSearch)) ||
        (order.customerEmail && order.customerEmail.toLowerCase().includes(lowerSearch)) ||
        (order.pocDetails?.pocName && order.pocDetails.pocName.toLowerCase().includes(lowerSearch))
      );
    }

    this.filteredOrderList = list;
    this.paginatedList = this.filteredOrderList; // Since API is already paginated, we just show what we got
    this.calculateTotals();
  }

  calculateTotals() {
    this.totalItemAmount = 0;
    this.totalDeliveryCharge = 0;
    this.totalTaxes = 0;
    this.totalPaidToKitchen = 0;
    this.totalRevenue = 0;

    this.filteredOrderList.forEach(order => {
      this.totalItemAmount += Number(order.itemAmount) || 0;
      this.totalDeliveryCharge += Number(order.deliveryCharge) || 0;
      this.totalTaxes += Number(order.taxes) || 0;
      this.totalPaidToKitchen += Number(order.amtAfterCommisionPaidToKitchen) || Number(order.itemAmount) || 0;
      this.totalRevenue += Number(order.amount) || 0;
    });
    this.totalOrdersCount = this.estimatedTotal;
  }

  // Unified with mat-paginator event
  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getOrderStatusList(this.selectedStatus, this.pageIndex + 1);
  }

  changeDataView() {
    if (!this.isShowChart) {
      this.generateChartData();
    } else {
      this.isShowChart = false;
    }
  }

  generateChartData() {
    const categories = this.adminOrderStatusList.map(s => s.label);
    const data = this.adminOrderStatusList.map(s => s.count);

    this.chartOptions = {
      chart: { type: 'column' },
      title: { text: 'Orders by Status', align: 'left' },
      xAxis: { categories: categories },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: { text: 'Number of Orders' }
      },
      series: [{
        name: 'Orders',
        data: data,
        type: 'column'
      }]
    };

    this.isShowChart = true;
    this.updateStatusFlag = true;
  }

  excelExport() {
    this.exportAdminOrdersToExcel();
  }

  async exportAdminOrdersToExcel() {
    if (!this.filteredOrderList || this.filteredOrderList.length === 0) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Daily Bulk Orders');

    const fromStr = this.formatDate(this.selectedAdminOrderDate);
    const toStr = this.selectedAdminOrderDateTo ? this.formatDate(this.selectedAdminOrderDateTo) : fromStr;
    const dateRangeStr = fromStr === toStr ? fromStr : `${fromStr} to ${toStr}`;

    worksheet.columns = [
      { header: 'Order No', key: 'orderNo', width: 14 },
      { header: 'Order Date', key: 'orderDate', width: 20 },
      { header: 'Delivery Date', key: 'deliveryDate', width: 16 },
      { header: 'Status', key: 'status', width: 18 },
      { header: 'POC Name', key: 'pocName', width: 20 },
      { header: 'POC Phone', key: 'pocPhone', width: 16 },
      { header: 'POC Email', key: 'pocEmail', width: 25 },
      { header: 'Organization', key: 'orgName', width: 22 },
      { header: 'Cafeteria', key: 'cafeName', width: 20 },
      { header: 'Vendor Firm', key: 'vendorFirm', width: 20 },
      { header: 'Vendor Name', key: 'vendorName', width: 18 },
      { header: 'Vendor Phone', key: 'vendorPhone', width: 16 },
      { header: 'Delivery Slot', key: 'deliverySlot', width: 20 },
      { header: 'Delivery Mode', key: 'deliveryMode', width: 16 },
      { header: 'Items', key: 'items', width: 40 },
      { header: 'Item Count', key: 'itemCount', width: 12 },
      { header: 'Subtotal (₹)', key: 'subtotal', width: 14 },
      { header: 'Delivery Charge (₹)', key: 'deliveryCharge', width: 18 },
      { header: 'Taxes (₹)', key: 'taxes', width: 12 },
      { header: 'Total Amount (₹)', key: 'totalAmount', width: 16 },
      { header: 'Paid to Kitchen (₹)', key: 'paidToKitchen', width: 18 },
      { header: 'Special Request', key: 'specialRequest', width: 30 },
      { header: 'Location', key: 'location', width: 30 },
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FF1A1A1A' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    });

    this.filteredOrderList.forEach((order: any) => {
      const itemList = order.itemList || [];
      const items = itemList
        .map((i: any) => `${i.deliveredItem || i.itemName || 'N/A'} x${i.count || 1}`)
        .join(', ');
      const totalItemCount = itemList.reduce((sum: number, i: any) => sum + (Number(i.count) || 0), 0);

      const formatTime = (t: string) => {
        if (!t) return '';
        const [h, m] = t.split(':');
        let hr = parseInt(h);
        const min = parseInt(m);
        const ampm = hr >= 12 ? 'PM' : 'AM';
        hr = hr % 12 || 12;
        return `${hr}:${min < 10 ? '0' + min : min} ${ampm}`;
      };

      const slotFrom = itemList[0]?.deliveryTimeFrom || '';
      const slotTo = itemList[0]?.deliveryTimeTo || '';
      const deliverySlot = slotFrom ? `${formatTime(slotFrom)} - ${formatTime(slotTo)}` : '-';

      worksheet.addRow({
        orderNo: order.orderNo || '-',
        orderDate: this.formatDate(order.orderDate),
        deliveryDate: order.deliveryDate ? this.formatDate(order.deliveryDate) : '-',
        status: this.orderStatusMapper[order.orderstatus] || order.orderstatus || '-',
        pocName: order.customerName || order.pocDetails?.pocName || '-',
        pocPhone: order.customerPhoneNo || order.pocDetails?.pocPhoneNo || '-',
        pocEmail: order.customerEmail || order.pocDetails?.pocEmail || '-',
        orgName: order.organizationDetails?.organization_name || order.orgName || '-',
        cafeName: order.cafeteriaDetails?.cafeteria_name || order.cafeteriaName || '-',
        vendorFirm: order.vendorFirmName || '-',
        vendorName: order.vendorName || '-',
        vendorPhone: order.vendorPhoneNo || '-',
        deliverySlot: deliverySlot,
        deliveryMode: order.deliveryVendor || 'Standard',
        items: items || '-',
        itemCount: totalItemCount,
        subtotal: order.itemAmount || 0,
        deliveryCharge: order.deliveryCharge || 0,
        taxes: order.taxes || 0,
        totalAmount: order.amount || 0,
        paidToKitchen: order.amtAfterCommisionPaidToKitchen || order.itemAmount || 0,
        specialRequest: order.specialRequest || '-',
        location: order.customerLocation?.location || order.customerLocation?.address || order.orgCity || '-',
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const safeRange = dateRangeStr.replace(/[\\/:*?"<>|]/g, '-');
    saveAs(blob, `Daily_Bulk_Orders_${safeRange}.xlsx`);
  }

  downloadPdf() {
    if (!this.filteredOrderList.length) return;

    const tableHeaders = [
      { text: 'Order No', bold: true },
      { text: 'Date', bold: true },
      { text: 'Status', bold: true },
      { text: 'POC/Customer', bold: true },
      { text: 'Organization', bold: true },
      { text: 'Cafeteria', bold: true },
      { text: 'Items', bold: true },
      { text: 'Subtotal (₹)', bold: true },
      { text: 'Total (₹)', bold: true }
    ];

    const body: any[] = [tableHeaders];

    this.filteredOrderList.forEach(order => {
      const items = (order.itemList || [])
        .map((i: any) => `${i.itemName} x${i.count}`)
        .join(', ');

      body.push([
        order.orderNo || '',
        this.formatDate(order.orderDate),
        this.orderStatusMapper[order.orderstatus] || order.orderstatus || '',
        order.customerName || order.pocDetails?.pocName || '',
        order.organizationDetails?.organization_name || '',
        order.cafeteriaDetails?.cafeteria_name || '',
        items || '',
        (order.itemAmount || 0).toFixed(2),
        (order.amount || 0).toFixed(2)
      ]);
    });

    const docDefinition: any = {
      pageOrientation: 'landscape',
      pageMargins: [20, 20, 20, 20],
      content: [
        { text: 'Daily Bulk Orders Report', style: 'header' },
        {
          text: `Date Range: ${this.formatDate(this.selectedAdminOrderDate)} ${this.selectedAdminOrderDateTo ? ' to ' + this.formatDate(this.selectedAdminOrderDateTo) : ''}`,
          margin: [0, 0, 0, 10]
        },
        {
          table: {
            headerRows: 1,
            widths: [50, 60, 60, 100, 100, 80, '*', 60, 60],
            body
          },
          layout: 'lightHorizontalLines'
        }
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] }
      },
      defaultStyle: { fontSize: 9 }
    };

    const fromStr = this.formatDate(this.selectedAdminOrderDate).replace(/\//g, '-');
    const toStr = this.selectedAdminOrderDateTo ? this.formatDate(this.selectedAdminOrderDateTo).replace(/\//g, '-') : fromStr;
    const pdfName = fromStr === toStr ? fromStr : `${fromStr}_to_${toStr}`;

    pdfMake.createPdf(docDefinition).download(`DailyBulkOrders_${pdfName}.pdf`);
  }

  formatDate(dateInput: any): string {
    if (!dateInput) return '-';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '-';
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }
}
