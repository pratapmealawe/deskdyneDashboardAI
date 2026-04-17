import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BulkWalletUploadDialogComponent } from './bulk-wallet-upload-dialog/bulk-wallet-upload-dialog.component';

// Excel & PDF
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs =
  (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs ?? {};

interface Filter {
  orgId: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnChanges {
  @Input() adminOrg: any;
  isDisabled: boolean = false;
  customerList: any[] = [];
  filteredCustomerList: any[] = [];
  pagedCustomerList: any[] = [];

  filterObj: Filter = {
    orgId: ''
  };

  orglist: any[] = [];
  orgDetails: any = {};
  orgAdmin: any;
  isOrgAdmin: boolean = false;
  isViewCustomer: boolean = false;
  selectedUser: any;

  // search + pagination
  searchText: string = '';
  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService,
    private dialog: MatDialog
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.setInitialData();
    }
  }

  ngOnInit(): void {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.getOrgList(); // 👉 only this; we’ll fetch users after org is set
  }

  async getOrgList() {
    try {
      const data = await this.apiMainService.B2B_fetchFilteredAllOrgs(
        { countOnly: false },
        1
      );
      this.orglist = data || [];
      this.setInitialData(); // 👉 decide orgId and load users
    } catch (error) {
      console.error(error);
    }
  }

  // 👉 On init: if ORGADMIN use their org, else will need to select manually
  setInitialData() {
    if (this.adminOrg) {
      this.filterObj.orgId = this.adminOrg._id;
      this.isDisabled = true;
    }
    if (this.orgAdmin?.role === 'ORGADMIN') {
      this.isOrgAdmin = true;
      this.filterObj.orgId = this.orgAdmin?.orgDetails?._id;
    }
    if (this.filterObj.orgId) {
      this.setOrgDetails();
      this.getCustomerProfileList(); // load org-wise data
    }
  }

  setOrgDetails() {
    this.orgDetails = this.orglist.find(
      (org: any) => org._id === this.filterObj?.orgId
    );
    console.log(this.filterObj?.orgId, "this.filterObj?.orgId");
  }

  onKeyEvent(event: any) {
    if (event.key === "Escape") {
      (event.target as HTMLInputElement).value = '';
      this.filteredCustomerList = [...this.customerList];
    }

    if (event.key === "Enter") {
      this.searchFilter(event);
    }
  }
  searchFilter(e: any) {
    this.searchText = e.target.value || '';
    const config = { keys: ['userName', 'phoneNo', 'email'] };

    this.filteredCustomerList = this.searchService.searchData(
      this.customerList,
      config,
      this.searchText
    );

    this.pageIndex = 0;
    this.updatePagedData();
  }

  clearSearch() {
    this.searchText = '';
    const config = { keys: ['userName', 'phoneNo', 'email'] };
    this.filteredCustomerList = this.searchService.searchData(
      this.customerList,
      config,
      ''
    );
    this.pageIndex = 0;
    this.updatePagedData();
  }

  submitFilter() {
    this.pageIndex = 0;
    this.setOrgDetails();
    this.getCustomerProfileList();
  }

  async getCustomerProfileList() {
    try {
      const res = await this.apiMainService.getCustomerListByOrgId(
        this.filterObj
      );
      this.customerList = res || [];
      this.filteredCustomerList = this.customerList.length
        ? this.customerList
        : [];
      this.pageIndex = 0;
      this.updatePagedData();
    } catch (err: any) {
      console.log(err);
      this.customerList = [];
      this.filteredCustomerList = [];
      this.updatePagedData();
    }
  }

  updatePagedData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedCustomerList = this.filteredCustomerList.slice(start, end);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedData();
  }

  viewCustomer(user: any) {
    this.selectedUser = user;
    this.isViewCustomer = true;
  }

  backBtnPress() {
    this.isViewCustomer = false;
  }

  // 👉 Generate initials for avatar
  getInitials(name: string | undefined): string {
    if (!name) return '?';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  // =======================
  // 👉 EXCEL EXPORT
  // =======================
  async exportToExcel() {
    if (!this.filteredCustomerList.length) return;

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Users');

    // Header row
    sheet.addRow([
      'Name',
      'Phone No',
      'Email',
      'Organization',
      'Employee ID'
    ]);

    // Bold header
    sheet.getRow(1).font = { bold: true };

    // Data rows
    this.filteredCustomerList.forEach((user: any) => {
      sheet.addRow([
        user?.userName || '',
        user?.phoneNo || '',
        user?.email || '',
        user?.employeeInfo?.org_name || '',
        user?.employeeInfo?.empId || ''
      ]);
    });

    // Auto width
    sheet.columns.forEach((col: any) => {
      let maxLength = 10;
      col.eachCell({ includeEmpty: true }, (cell: any) => {
        const v = cell.value ? cell.value.toString() : '';
        if (v.length > maxLength) {
          maxLength = v.length;
        }
      });
      col.width = maxLength + 2;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const orgName =
      this.orgDetails?.organization_name || 'All_Organizations';
    const dateStr = new Date().toISOString().slice(0, 10);
    saveAs(blob, `Users_${orgName}_${dateStr}.xlsx`);
  }

  // =======================
  // 👉 PDF EXPORT
  // =======================
  exportToPdf() {
    if (!this.filteredCustomerList.length) return;

    const body: any[] = [];

    // Header row
    body.push([
      { text: 'Name', bold: true },
      { text: 'Phone No', bold: true },
      { text: 'Email', bold: true },
      { text: 'Organization', bold: true },
      { text: 'Employee ID', bold: true }
    ]);

    // Data rows
    this.filteredCustomerList.forEach((user: any) => {
      body.push([
        user?.userName || '',
        user?.phoneNo || '',
        user?.email || '',
        user?.employeeInfo?.org_name || '',
        user?.employeeInfo?.empId || ''
      ]);
    });

    const orgName =
      this.orgDetails?.organization_name || 'All Organizations';
    const dateStr = new Date().toISOString().slice(0, 10);

    const docDefinition: any = {
      pageOrientation: 'landscape',
      content: [
        {
          text: 'Users',
          style: 'header'
        },
        {
          text: `Organization: ${orgName}`,
          margin: [0, 0, 0, 8]
        },
        {
          text: `Generated on: ${dateStr}`,
          style: 'subheader',
          margin: [0, 0, 0, 12]
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', '*', '*', 'auto'],
            body
          },
          layout: 'lightHorizontalLines'
        }
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 4]
        },
        subheader: {
          fontSize: 10,
          color: '#666666'
        }
      }
    };

    (pdfMake as any)
      .createPdf(docDefinition)
      .download(`Users_${orgName}_${dateStr}.pdf`);
  }

  openBulkWalletDialog() {
    this.dialog.open(BulkWalletUploadDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        orgId: this.filterObj.orgId,
        customerList: this.customerList
      }
    });
  }
}
