import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { orderStatusMapper } from 'src/config/order-status.config';

(pdfMake as any).vfs =
  (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs ?? {};

@Injectable({
  providedIn: 'root'
})
export class OutletOrderService {
  orderStatusMapper: any = orderStatusMapper;

  constructor() { }

  async exportToExcel(data: any[], filename: string = 'outlet_orders') {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Outlet Orders');

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
      { header: 'Packaging (₹)', key: 'packaging', width: 14 },
      { header: 'Subsidy Amount (₹)', key: 'subsidyAmount', width: 18 },
      { header: 'Wallet Used (₹)', key: 'walletUsed', width: 16 },
      { header: 'Company Wallet (₹)', key: 'companyWallet', width: 16 },
      { header: 'Amount Paid (₹)', key: 'amountPaid', width: 16 },
      { header: 'PG Name', key: 'pgName', width: 14 },
      { header: 'App Version', key: 'appVersion', width: 12 },
      { header: 'Platform', key: 'platform', width: 12 },
    ];

    let totalItemAmount = 0;
    let totalPackaging = 0;
    let totalSubsidy = 0;
    let totalWalletUsed = 0;
    let totalCompanyWallet = 0;
    let totalAmountPaid = 0;

    data.forEach(order => {
      const walletUsed = Number(order.moneyWalletPointsUsed) || 0;
      const amountPaid = Number(order.amount) || 0;
      const itemAmount = Number(order.itemAmount) || 0;
      const packaging = Number(order.packagingAmount) || 0;
      const subsidyAmount = Number(order.subsidyAmount) || 0;
      const companyWallet = Number(order.companyWalletPointUsed) || 0;

      const items = (order.itemList || [])
        .map((i: any) => `${i.itemName} x${i.count} @₹${i.price}`)
        .join('; ');

      worksheet.addRow({
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
        packaging,
        subsidyAmount,
        walletUsed,
        companyWallet,
        amountPaid,
        pgName: order.pgName || '-',
        appVersion: order.appVersion || '-',
        platform: order.deviceInfo?.platform || '-',
      });

      totalItemAmount += itemAmount;
      totalPackaging += packaging;
      totalSubsidy += subsidyAmount;
      totalWalletUsed += walletUsed;
      totalCompanyWallet += companyWallet;
      totalAmountPaid += amountPaid;
    });

    const totalsRow = worksheet.addRow({
      orderNo: 'Totals',
      itemAmount: totalItemAmount,
      packaging: totalPackaging,
      subsidyAmount: totalSubsidy,
      walletUsed: totalWalletUsed,
      companyWallet: totalCompanyWallet,
      amountPaid: totalAmountPaid,
    });

    totalsRow.font = { bold: true };

    worksheet.eachRow((row, rIndex) => {
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFDDDDDD' } },
          left: { style: 'thin', color: { argb: 'FFDDDDDD' } },
          bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } },
          right: { style: 'thin', color: { argb: 'FFDDDDDD' } },
        };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    saveAs(blob, `${filename}_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  exportToPdf(data: any[], filename: string = 'outlet_orders') {
    if (!data.length) return;

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

    const body: any[] = [tableHeaders];

    let totalItemAmount = 0;
    let totalSubsidy = 0;
    let totalWalletUsed = 0;
    let totalAmountPaid = 0;

    data.forEach(order => {
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

    body.push([
      { text: 'Totals', bold: true, colSpan: 8, alignment: 'right' },
      {}, {}, {}, {}, {}, {}, {},
      { text: totalItemAmount.toFixed(2), bold: true },
      { text: totalSubsidy.toFixed(2), bold: true },
      { text: totalWalletUsed.toFixed(2), bold: true },
      { text: totalAmountPaid.toFixed(2), bold: true }
    ]);

    const dateStr = new Date().toISOString().slice(0, 10);
    const orgName = data[0]?.organizationDetails?.organization_name || 'All Organizations';
    const cafeteria = data[0]?.cafeteriaDetails?.cafeteria_name || 'All Cafeterias';

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
            widths: [40, 35, 70, 55, 80, 60, 90, '*', 60, 55, 55, 55],
            body
          },
          layout: {
            fillColor: (rowIndex: number) => (rowIndex === 0 ? '#2E75B6' : null),
            hLineColor: () => '#999999',
            vLineColor: () => '#999999'
          }
        }
      ],
      styles: {
        header: { fontSize: 15, bold: true, margin: [0, 0, 0, 6] },
        subheader: { fontSize: 10, color: '#555' }
      },
      defaultStyle: { fontSize: 8, color: '#000' }
    };

    pdfMake.createPdf(docDefinition).download(`${filename}_${dateStr}.pdf`);
  }
}
