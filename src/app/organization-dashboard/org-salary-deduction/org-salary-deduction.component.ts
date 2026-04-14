import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { CommonSelectConfig } from 'src/app/common-outlet-cafe-select/common-outlet-cafe-select.component';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs ?? {};

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { CommonOutletCafeSelectModule } from '../../common-outlet-cafe-select/common-outlet-cafe-select.module';

@Component({
  selector: 'app-org-salary-deduction',
  templateUrl: './org-salary-deduction.component.html',
  styleUrls: ['./org-salary-deduction.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    CommonOutletCafeSelectModule
  ]
})
export class OrgSalaryDeductionComponent implements OnInit, OnChanges {
  @Input() adminOrg: any;
  orgDetails: any = {};
  headerConfig: CommonSelectConfig = {
    mode: 'outlet',
    showDateRange: true,
    disableOrg: true,
    requireAll: true
  };

  filteredOrderList: any[] = [];
  deductionList: any[] = [];
  totalDeductionAmount = 0;

  // Pagination
  pageSize = 10;
  pageIndex = 0;
  estimatedTotal = 0;
  paginatedList: any[] = [];

  constructor(private apiMainService: ApiMainService) { }

  ngOnInit(): void {
    this.setInitials();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.setInitials();
    }
  }

  setInitials() {
    if (this.adminOrg) {
      this.headerConfig = { ...this.headerConfig, defaultOrgId: this.adminOrg._id };
      this.filteredOrderList = [];
      this.deductionList = [];
      this.totalDeductionAmount = 0;
      this.pageIndex = 0;
      this.paginatedList = [];
    }
  }

  async filterSubmitted(event: any) {
    if (event) {
      const body = {
        cafeteriaName: event.cafeteria_name,
        organizationName: event.org_name,
        fromDate: event.date_from,
        toDate: event.date_to,
      };
      await this.getOrders(body);
    }
  }

  async getOrders(body: any) {
    try {
      const res = await this.apiMainService.fetchOutletOrdersbysearchObj(body);
      this.filteredOrderList = res;
      
      // Filter for salary deduction: 
      // 1. mealSubsidyType is 'chargeable'
      // OR 2. itemAmount > subsidyAmount (where employee pays the difference)
      this.deductionList = this.filteredOrderList.filter(order => 
        order.mealSubsidyType === 'chargeable' || (order.itemAmount > (order.subsidyAmount || 0))
      ).map(order => {
        const deductionAmount = (order.itemAmount || 0) - (order.subsidyAmount || 0);
        return {
          ...order,
          deductionAmount: deductionAmount
        };
      }).filter(order => order.deductionAmount > 0);

      this.totalDeductionAmount = this.deductionList.reduce((sum, order) => sum + order.deductionAmount, 0);
      this.pageIndex = 0;
      this.updatePaginatedList();
    } catch (err) {
      console.error('Error fetching orders for deduction report', err);
    }
  }

  updatePaginatedList() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedList = this.deductionList.slice(startIndex, endIndex);
    this.estimatedTotal = this.deductionList.length;
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedList();
  }

  async excelExport() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Salary Deductions');
    worksheet.columns = [
      { header: 'Employee Name', key: 'customerName', width: 25 },
      { header: 'Employee Mobile', key: 'customerPhoneNo', width: 15 },
      { header: 'Order Date', key: 'orderDate', width: 20 },
      { header: 'Order No', key: 'orderNo', width: 15 },
      { header: 'Meal Subsidy Type', key: 'mealSubsidyType', width: 20 },
      { header: 'Total Amount (₹)', key: 'itemAmount', width: 15 },
      { header: 'Subsidy Amount (₹)', key: 'subsidyAmount', width: 15 },
      { header: 'Deduction Amount (₹)', key: 'deductionAmount', width: 18 },
    ];

    this.deductionList.forEach(order => {
      worksheet.addRow({
        customerName: order.customerName,
        customerPhoneNo: order.customerPhoneNo,
        orderDate: new Date(order.orderDate).toLocaleString('en-IN'),
        orderNo: order.orderNo,
        mealSubsidyType: order.mealSubsidyType || '-',
        itemAmount: order.itemAmount,
        subsidyAmount: order.subsidyAmount || 0,
        deductionAmount: order.deductionAmount,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `Salary_Deduction_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  downloadPdf() {
    const docDefinition: any = {
      pageOrientation: 'landscape',
      content: [
        { text: 'Salary Deduction Report', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              ['Employee', 'Mobile', 'Date', 'Order No', 'Type', 'Total', 'Subsidy', 'Deduction'],
              ...this.deductionList.map(o => [
                o.customerName, o.customerPhoneNo, 
                new Date(o.orderDate).toLocaleDateString(), o.orderNo,
                o.mealSubsidyType || '-', o.itemAmount.toFixed(2), 
                (o.subsidyAmount || 0).toFixed(2), o.deductionAmount.toFixed(2)
              ])
            ]
          }
        }
      ],
      styles: { header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] } }
    };
    pdfMake.createPdf(docDefinition).download(`Salary_Deduction_${new Date().toISOString().slice(0, 10)}.pdf`);
  }
}
