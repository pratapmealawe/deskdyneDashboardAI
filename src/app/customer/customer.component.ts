import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { DirectivesModule } from 'src/shared/directives/common-directives.directives.modules';
import { MatDialog } from '@angular/material/dialog';
import { ImportCustomerMoneyWalletComponent } from './import-customer-money-wallet/import-customer-money-wallet.component';

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

import { MaterialModule } from '../material.module';
import { LocalStorageService } from '@service/local-storage.service';
import { OrganizationSharedService } from '../organization/organization-shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ]
})
export class CustomerComponent implements OnInit, OnChanges {
  @Input() adminOrg: any;
  private orgSub?: Subscription;
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
  isListingView: boolean = true;
  selectedUser: any;

  // search + pagination
  searchControl = new FormControl('');
  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,
    private router: Router,
    private organizationSharedService: OrganizationSharedService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.setInitialData();
    }
  }

  ngOnInit(): void {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.checkRoute();

    this.orgSub = this.organizationSharedService.organization$.subscribe(org => {
      if (org) {
        this.adminOrg = org;
        this.setInitialData();
      }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRoute();
    });

    this.getOrgList(); // 👉 only this; we’ll fetch users after org is set

    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {
      this.applyLocalFilter(value);
    });
  }

  ngOnDestroy(): void {
    this.orgSub?.unsubscribe();
  }

  checkRoute() {
    const baseUrl = this.router.url.split('?')[0].split('#')[0];
    const urlParts = baseUrl.split('/').filter(p => p);
    // Listing view is when we are exactly at /customer (or /app/customer)
    // Adjust based on actual base path
    this.isListingView = !urlParts.includes('view') && urlParts[urlParts.length - 1] === 'customer';
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
  }

  applyLocalFilter(value: any) {
    if (!value) {
      this.filteredCustomerList = [...this.customerList];
      this.updatePagedData();
      return;
    }
    const lower = value.toLowerCase();
    this.filteredCustomerList = this.customerList.filter((user: any) =>
      user.userName?.toLowerCase().includes(lower) ||
      user.phoneNo?.toLowerCase().includes(lower) ||
      user.email?.toLowerCase().includes(lower)
    );
    this.pageIndex = 0;
    this.updatePagedData();
  }

  clearSearch() {
    this.searchControl.setValue('');
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
    this.router.navigate(['/app/customer', user._id]);
  }

  backBtnPress() {
    this.router.navigate(['/app/customer']);
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
    this.dialog.open(ImportCustomerMoneyWalletComponent, {
      width: '500px',
      disableClose: true,
      data: {
        orgId: this.filterObj.orgId,
        customerList: this.customerList
      }
    });
  }
}
