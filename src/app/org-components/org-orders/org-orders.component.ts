import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonSelectConfig } from 'src/app/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { orderStatusMapper } from 'src/config/order-status.config';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PageEvent } from '@angular/material/paginator';
import * as Highcharts from 'highcharts';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs =
  (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs ?? {};

@Component({
  selector: 'app-org-orders',
  templateUrl: './org-orders.component.html',
  styleUrls: ['./org-orders.component.scss'],
})
export class OrgOrdersComponent implements OnInit, OnChanges {
  @Input() adminOrg: any;
  Highcharts: typeof Highcharts = Highcharts;
  orgDetails: any = {};
  headerConfig: CommonSelectConfig = {
    mode: 'outlet',
    showDateRange: true,
    disableOrg: true,
    requireAll: true
  };
  fromDate = '';
  toDate = '';
  filteredOrderList: any[] = []
  totalAmountPaid = 0;
  totalWalletUsed = 0;
  totalAmount = 0;
  orderStatusMapper: any = orderStatusMapper;
  // Chart
  chartOptions!: Highcharts.Options;
  updateStatusFlag: boolean = false;
  oneToOneStatusFlag: boolean = true;
  isShowChart: boolean = false;
  //pagination
  pageSize = 10;
  pageIndex = 0;
  estimatedTotal = 0;
  paginatedList: any[] = [];
  constructor(
    private apiMainService: ApiMainService,
  ) { }

  ngOnInit(): void {
    this.setInitials();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      const previous = changes['adminOrg'].previousValue;
      const current = changes['adminOrg'].currentValue;
      if(previous && previous._id === current._id) return;
      this.setInitials();
    }
  }

  setInitials() {
    if (this.adminOrg) {
      this.headerConfig = {
        ...this.headerConfig,
        defaultOrgId: this.adminOrg._id,
      };

      this.fromDate = '';
      this.toDate = '';
      this.filteredOrderList = [];
      this.totalAmountPaid = 0;
      this.totalWalletUsed = 0;
      this.totalAmount = 0;
      this.pageIndex = 0;
      this.paginatedList = [];
      this.isShowChart = false;
    }
  }

  async getOutletByFilter(body: any) {
    this.isShowChart = false;
    this.totalAmountPaid = 0;
    this.totalWalletUsed = 0;
    this.totalAmount = 0;
    try {
      const res = await this.apiMainService.fetchOutletOrdersbysearchObj(body);
      // const res = await this.apiMainService.fetchCompletedOutletOrdersbysearchObj(body);
      this.filteredOrderList = res;
      this.totalAmount = this.filteredOrderList.reduce((sum, order) => {
        const amount = Number(order.amount) || 0;
        const walletPoints = Number(order.moneyWalletPointsUsed) || 0;
        this.totalWalletUsed += walletPoints;
        this.totalAmountPaid += amount
        return sum + amount + walletPoints;
      }, 0);
      this.pageIndex = 0;
      this.updatePaginatedList();

    } catch (err: any) {
      console.error('Error fetching outlet orders', err);
    }
  }

  updatePaginatedList() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.paginatedList = this.filteredOrderList.slice(startIndex, endIndex);
    this.estimatedTotal = this.filteredOrderList.length;
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedList();
  }

  async excelExport() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Outlet Orders');
    // ------------------------------------------------------------------
    //                      TABLE COLUMN DEFINITIONS
    // ------------------------------------------------------------------
    worksheet.columns = [
      { header: 'Order No', key: 'orderNo', width: 12 },
      { header: 'Token No', key: 'tokenNo', width: 10 },
      { header: 'Order Date', key: 'orderDate', width: 18 },
      { header: 'Status', key: 'status', width: 16 },
      { header: 'Customer Name', key: 'customerName', width: 20 },
      { header: 'Customer Mobile', key: 'customerPhoneNo', width: 16 },
      { header: 'Customer Email', key: 'customerEmail', width: 24 },
      { header: 'Org Name', key: 'orgName', width: 22 },
      { header: 'Cafe Name', key: 'cafeName', width: 18 },
      { header: 'Items', key: 'items', width: 40 },
      { header: 'Item Amount (₹)', key: 'itemAmount', width: 16 },
      { header: 'Subsidy Amount (₹)', key: 'subsidyAmount', width: 18 },
      { header: 'Wallet Used (₹)', key: 'walletUsed', width: 16 },
      { header: 'Amount Paid (₹)', key: 'amountPaid', width: 16 },
    ];

    // ------------------------------------------------------------------
    //                   HEADER ROW (NOW ROW 5 CORRECTLY)
    // ------------------------------------------------------------------
    const headerRowIndex = 0;
    const headerRow = worksheet.getRow(headerRowIndex);

    // Map headers from column definitions
    headerRow.values = [
      "",
      ...worksheet.columns.map(c => c.header || "")
    ] as ExcelJS.CellValue[];

    // ------------------------------------------------------------------
    //                         DATA ROWS
    // ------------------------------------------------------------------
    let rowIndex = headerRowIndex;

    let totalItemAmount = 0;
    let totalSubsidy = 0;
    let totalWalletUsed = 0;
    let totalAmountPaid = 0;

    this.filteredOrderList.forEach(order => {
      const walletUsed = Number(order.moneyWalletPointsUsed) || 0;
      const amountPaid = Number(order.amount) || 0;
      const itemAmount = Number(order.itemAmount) || 0;
      const subsidyAmount = Number(order.subsidyAmount) || 0;

      const items = (order.itemList || [])
        .map((i: any) => `${i.itemName} x${i.count} @₹${i.price}`)
        .join('; ');

      const row = worksheet.addRow({
        orderNo: order.orderNo,
        tokenNo: order.tokenNo || '-',
        orderDate: new Date(order.orderDate).toLocaleString('en-IN'),
        status: this.orderStatusMapper[order.orderstatus] || order.orderstatus,
        customerName: order.customerName,
        customerPhoneNo: order.customerPhoneNo,
        customerEmail: order.customerEmail,
        orgName: order.organizationDetails?.organization_name,
        cafeName: order.cafeteriaDetails?.cafeteria_name,
        items,
        itemAmount,
        subsidyAmount,
        walletUsed,
        amountPaid,
      });

      // Numeric formatting
      row.getCell('K').numFmt = '#,##0.00';
      row.getCell('L').numFmt = '#,##0.00';
      row.getCell('M').numFmt = '#,##0.00';
      row.getCell('N').numFmt = '#,##0.00';

      // Totals
      totalItemAmount += itemAmount;
      totalSubsidy += subsidyAmount;
      totalWalletUsed += walletUsed;
      totalAmountPaid += amountPaid;

      rowIndex++;
    });

    // ------------------------------------------------------------------
    //                          TOTALS ROW
    // ------------------------------------------------------------------
    const totalsRow = worksheet.addRow({
      orderNo: 'Totals',
      itemAmount: totalItemAmount,
      subsidyAmount: totalSubsidy,
      walletUsed: totalWalletUsed,
      amountPaid: totalAmountPaid,
    });

    totalsRow.font = { bold: true };
    totalsRow.getCell('A').alignment = { horizontal: 'right' };

    totalsRow.getCell('K').numFmt = '#,##0.00';
    totalsRow.getCell('L').numFmt = '#,##0.00';
    totalsRow.getCell('M').numFmt = '#,##0.00';
    totalsRow.getCell('N').numFmt = '#,##0.00';

    // ------------------------------------------------------------------
    //                        TABLE BORDERS
    // ------------------------------------------------------------------
    worksheet.eachRow((row, rIndex) => {
      if (rIndex >= headerRowIndex) {
        row.eachCell(cell => {
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFDDDDDD' } },
            left: { style: 'thin', color: { argb: 'FFDDDDDD' } },
            bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } },
            right: { style: 'thin', color: { argb: 'FFDDDDDD' } },
          };
        });
      }
    });

    // ------------------------------------------------------------------
    //                      SAVE EXCEL FILE
    // ------------------------------------------------------------------
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const filename = `outlet_orders_${new Date().toISOString().slice(0, 10)}.xlsx`;
    saveAs(blob, filename);
  }

  downloadPdf() {

    if (!this.filteredOrderList.length) return;

    // ---------------------------------------------------------
    //           TABLE HEADERS (12 columns total)
    // ---------------------------------------------------------
    const tableHeaders = [
      { text: 'Order No', bold: true },
      { text: 'Token', bold: true },
      { text: 'Date', bold: true },
      { text: 'Status', bold: true },
      { text: 'Customer Name', bold: true },
      { text: 'Mobile', bold: true },
      { text: 'Email', bold: true },
      { text: 'Items', bold: true },
      { text: 'Item Amt (₹)', bold: true },
      { text: 'Subsidy (₹)', bold: true },
      { text: 'Wallet (₹)', bold: true },
      { text: 'Paid (₹)', bold: true }
    ];

    const body: any[] = [];
    body.push(tableHeaders);

    let totalItemAmount = 0;
    let totalSubsidy = 0;
    let totalWalletUsed = 0;
    let totalAmountPaid = 0;

    // ---------------------------------------------------------
    //                       DATA ROWS
    // ---------------------------------------------------------
    this.filteredOrderList.forEach(order => {
      const walletUsed = Number(order.moneyWalletPointsUsed) || 0;
      const amountPaid = Number(order.amount) || 0;
      const itemAmount = Number(order.itemAmount) || 0;
      const subsidyAmount = Number(order.subsidyAmount) || 0;

      const items = (order.itemList || [])
        .map((i: any) => `${i.itemName} x${i.count} @₹${i.price}`)
        .join('; ');

      body.push([
        order.orderNo || '',
        order.tokenNo || '',
        new Date(order.orderDate).toLocaleString('en-IN') || '',
        this.orderStatusMapper[order.orderstatus] || order.orderstatus || '',
        order.customerName || '',
        order.customerPhoneNo || '',
        order.customerEmail || '',
        items || '',
        itemAmount.toFixed(2),
        subsidyAmount.toFixed(2),
        walletUsed.toFixed(2),
        amountPaid.toFixed(2)
      ]);

      totalItemAmount += itemAmount;
      totalSubsidy += subsidyAmount;
      totalWalletUsed += walletUsed;
      totalAmountPaid += amountPaid;
    });

    // ---------------------------------------------------------
    //                       TOTALS ROW (12 columns)
    // ---------------------------------------------------------
    body.push([
      { text: 'Totals', bold: true, colSpan: 8, alignment: 'right' },
      {}, {}, {}, {}, {}, {}, {},      // total 8 columns merged
      { text: totalItemAmount.toFixed(2), bold: true },
      { text: totalSubsidy.toFixed(2), bold: true },
      { text: totalWalletUsed.toFixed(2), bold: true },
      { text: totalAmountPaid.toFixed(2), bold: true }
    ]);

    // ---------------------------------------------------------
    //                 COMMON HEADER VALUES
    // ---------------------------------------------------------
    const dateStr = new Date().toISOString().slice(0, 10);

    const orgName =
      this.filteredOrderList[0]?.organizationDetails?.organization_name ||
      'All Organizations';

    const cafeteria =
      this.filteredOrderList[0]?.cafeteriaDetails?.cafeteria_name ||
      'All Cafeterias';

    // ---------------------------------------------------------
    //                 PDF DOCUMENT STRUCTURE
    // ---------------------------------------------------------
    const docDefinition: any = {
      pageOrientation: 'landscape',
      pageMargins: [15, 15, 15, 15],

      content: [
        { text: 'Outlet Orders Report', style: 'header' },
        { text: `Organization: ${orgName}`, style: 'subheader' },
        { text: `Cafeteria: ${cafeteria}`, style: 'subheader' },
        { text: `Generated on: ${dateStr}`, style: 'subheader', margin: [0, 0, 0, 10] },

        {
          table: {
            headerRows: 1,
            widths: [
              40, 35, 70, 55, 80, 60, 90, '*', 60, 55, 55, 55
            ],
            body
          },
          layout: {
            fillColor: (rowIndex: number) => (rowIndex === 0 ? '#2E75B6' : null),
            paddingLeft: () => 3,
            paddingRight: () => 3,
            paddingTop: () => 3,
            paddingBottom: () => 3,
            hLineColor: () => '#999999',
            vLineColor: () => '#999999'
          }
        }
      ],

      styles: {
        header: {
          fontSize: 15,
          bold: true,
          margin: [0, 0, 0, 6]
        },
        subheader: {
          fontSize: 10,
          color: '#555'
        }
      },

      defaultStyle: {
        fontSize: 8,
        color: '#000'
      }
    };

    (pdfMake as any)
      .createPdf(docDefinition)
      .download(`OutletOrders_${dateStr}.pdf`);
  }

  changeDataView() {
    if (!this.isShowChart) {
      this.generateChartData();
    } else {
      this.isShowChart = false
    }
  }

  processOrdersData(data: Array<{ orderDate: string; orderstatus: string }>) {
    const dateStatusMap: Record<string, Record<string, number>> = {};

    data.forEach((item) => {
      const dateOnly = new Date(item.orderDate).toISOString().slice(0, 10);
      const status = item.orderstatus;

      if (!dateStatusMap[dateOnly]) {
        dateStatusMap[dateOnly] = {};
      }
      if (!dateStatusMap[dateOnly][status]) {
        dateStatusMap[dateOnly][status] = 0;
      }
      dateStatusMap[dateOnly][status]++;
    });

    const categories = Object.keys(dateStatusMap).sort((a, b) =>
      a < b ? -1 : a > b ? 1 : 0
    );

    const statusSet = new Set<string>();
    Object.values(dateStatusMap).forEach((statusCounts) => {
      Object.keys(statusCounts).forEach((st) => statusSet.add(st));
    });
    const statuses = Array.from(statusSet).sort();

    const series = statuses.map((status) => {
      const dataArray = categories.map((d) => {
        return dateStatusMap[d]?.[status] ?? 0;
      });
      return {
        name: status,
        data: dataArray,
        stack: 'orders'
      };
    });

    return { categories, series };
  }

  generateChartData() {
    let data: any = this.filteredOrderList

    const { categories, series } = this.processOrdersData(data);

    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Orders by Date and Status',
        align: 'left'
      },
      xAxis: {
        categories: categories,
        labels: {
          useHTML: true,
          formatter: function () {
            return `<span title="${this.value}">${this.value}</span>`;
          }
        }
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: 'Number of Orders'
        }
      },
      tooltip: {
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal'
        }
      },
      series: series as Highcharts.SeriesOptionsType[]
    };

    this.isShowChart = true
    this.updateStatusFlag = true;
  }

  filterSubmitted(event: any) {
    if (event) {
      const body = {
        cafeteriaName: event.cafeteria_name,
        organizationName: event.org_name,
        fromDate: event.date_from,
        toDate: event.date_to,
      }
      const body1 = {
        outletId: event.org_id,
        fromDate: event.date_from,
        toDate: event.date_to,
      }
      this.getOutletByFilter(body);
      this.fromDate = this.convertDate(event.date_from);
      this.toDate = this.convertDate(event.date_to);
    }
  }

  convertDate(dateInput: any): string {
    const date = new Date(dateInput);
    const istOffsetMs = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(date.getTime() + istOffsetMs);

    const dd = String(istDate.getDate()).padStart(2, '0');
    const mm = String(istDate.getMonth() + 1).padStart(2, '0');  // 0-based month
    const yyyy = istDate.getFullYear();

    return `${dd}/${mm}/${yyyy}`;

  }
}
