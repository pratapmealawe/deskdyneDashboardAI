import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { OrganizationSharedService } from '../../organization-shared.service';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '@service/toaster.service';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { AddQrEmployeeComponent, AddQrEmployeeData } from './add-qr-employee/add-qr-employee.component';
import { BulkAddQrEmployeeComponent } from './bulk-add-qr-employee/bulk-add-qr-employee.component';
import { ImportQrEmployeeComponent } from './import-qr-employee/import-qr-employee.component';
import { PageEvent } from '@angular/material/paginator';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { CafeteriaSelectorComponent } from '../cafeteria-selector/cafeteria-selector.component';

(pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs ?? {};

@Component({
  selector: 'app-qr-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, CafeteriaSelectorComponent],
  templateUrl: './qr-employee.component.html',
  styleUrls: ['./qr-employee.component.scss'],
})
export class QrEmployeeComponent implements OnInit, OnDestroy {
  @Input() orgObj: any;

  employeeList: any[] = [];
  searchTerm: string = '';

  selectedCafeteria: any;
  selectedCafeteriaName: string | null = null;
  selectedCafeteriaId: string | null = null;

  loading = false;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50, 100];
  
  deskdyneLogoDataUrl: string = '';
  orgLogoDataUrl: string = '';
  imageUrl: string = environment.imageUrl;
  isShowCollab: boolean = false;
  
  private orgSub: Subscription | undefined;

  constructor(
    private apiMainService: ApiMainService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private toasterService: ToasterService,
    private http: HttpClient,
    private orgSharedService: OrganizationSharedService
  ) { }

  ngOnInit(): void {
    if (this.orgObj) {
      this.initializeComponent();
    } else {
      this.orgSub = this.orgSharedService.organization$.subscribe(org => {
        if (org) {
          this.orgObj = org;
          this.initializeComponent();
        }
      });
    }
  }

  initializeComponent() {
    this.loadLogo();
    this.initCafeteriaDefaults();
    this.getEmployeeListByCafeId();
  }

  ngOnDestroy() {
    if (this.orgSub) {
      this.orgSub.unsubscribe();
    }
  }

  private loadLogo(): void {
    const deskdyneLogoPath = 'assets/images/deskdyneLogo.png';
    this.http.get(deskdyneLogoPath, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const reader = new FileReader();
        reader.onload = () => { this.deskdyneLogoDataUrl = reader.result as string; };
        reader.readAsDataURL(blob);
      },
      error: (err) => {
        console.error('Failed to load Deskdyne logo', err);
      }
    });

    if (this.orgObj?.organizationLogoUrl) {
      const orgLogoPath = `${this.imageUrl}${this.orgObj.organizationLogoUrl}`;
      this.http.get(orgLogoPath, { responseType: 'blob' }).subscribe({
        next: (blob) => {
          const reader = new FileReader();
          reader.onload = () => { this.orgLogoDataUrl = reader.result as string; };
          reader.readAsDataURL(blob);
        },
        error: (err) => { console.error('Failed to load org logo', err); }
      });
    }
  }

  private initCafeteriaDefaults(): void {
    if (this.orgObj?.cafeteriaList?.length > 0) {
      this.selectedCafeteria = this.orgObj.cafeteriaList[0];
      this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
      this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
    }
  }

  onCafeteriaChange(event: any): void {
    this.selectedCafeteria = event.value;
    if (!this.selectedCafeteria) return;
    this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
    this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
    this.getEmployeeListByCafeId();
    this.pageIndex = 0;
  }

  async getEmployeeListByCafeId(): Promise<void> {
    if (!this.orgObj?._id) return;
    try {
      this.loading = true;
      this.employeeList = await this.apiMainService.qrEmployeeByCafeId(this.selectedCafeteriaId);
    } catch (error) {
      console.error(error);
      this.toasterService.error('Failed to fetch employees');
    } finally {
      this.loading = false;
    }
  }

  // ---------- DIALOG TRIGGERS ----------

  openAddDialog(): void {
    if (!this.selectedCafeteria) {
      this.toasterService.warning('Please select a cafeteria first');
      return;
    }

    const data: AddQrEmployeeData = {
      mode: 'add',
      orgObj: this.orgObj,
      cafeteria: this.selectedCafeteria
    };

    const dialogRef = this.dialog.open(AddQrEmployeeComponent, {
      width: '600px',
      data,
      panelClass: 'premium-dialog'
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;
      try {
        await this.apiMainService.addQrEmployeeList([result]);
        this.toasterService.success('Employee added successfully');
        this.getEmployeeListByCafeId();
      } catch (error: any) {
        this.handleApiError(error, 'add');
      }
    });
  }

  openEditDialog(employee: any): void {
    const data: AddQrEmployeeData = {
      mode: 'edit',
      orgObj: this.orgObj,
      cafeteria: {
        cafeteria_name: employee.cafeteria_name,
        cafeteria_id: employee.cafeteria_id
      },
      employee
    };

    const dialogRef = this.dialog.open(AddQrEmployeeComponent, {
      width: '600px',
      data,
      panelClass: 'premium-dialog'
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;
      try {
        await this.apiMainService.updateQrEmployee(employee._id, result);
        this.toasterService.success('Employee updated successfully');
        this.getEmployeeListByCafeId();
      } catch (error: any) {
        this.handleApiError(error, 'update');
      }
    });
  }

  openBulkAddDialog(): void {
    if (!this.selectedCafeteria) {
      this.toasterService.warning('Please select a cafeteria first');
      return;
    }

    const dialogRef = this.dialog.open(BulkAddQrEmployeeComponent, {
      width: '950px',
      data: { orgObj: this.orgObj, cafeteria: this.selectedCafeteria },
      panelClass: 'premium-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.getEmployeeListByCafeId();
    });
  }

  openImportDialog(): void {
    if (!this.selectedCafeteria) {
      this.toasterService.warning('Please select a cafeteria first');
      return;
    }

    const dialogRef = this.dialog.open(ImportQrEmployeeComponent, {
      width: '500px',
      data: { orgObj: this.orgObj, cafeteria: this.selectedCafeteria },
      panelClass: 'premium-dialog'
    });

    dialogRef.afterClosed().subscribe(async (employees) => {
      if (employees && employees.length > 0) {
        const payload = employees.map((emp: any) => ({
          ...emp,
          organization_name: this.orgObj.organization_name,
          organization_id: this.orgObj._id,
          cafeteria_name: this.selectedCafeteriaName,
          cafeteria_id: this.selectedCafeteriaId,
          qrCode: ''
        }));

        try {
          await this.apiMainService.addQrEmployeeList(payload);
          this.toasterService.success(`${employees.length} employees imported successfully`);
          this.getEmployeeListByCafeId();
        } catch (error) {
          this.handleApiError(error, 'import');
        }
      }
    });
  }

  async deleteEmployee(employee: any): Promise<void> {
    const yes = confirm(`Do you really want to delete employee: ${employee.employeeName}?`);
    if (!yes) return;

    try {
      await this.apiMainService.deleteQrEmployee(employee._id);
      this.toasterService.success('Employee deleted');
      this.getEmployeeListByCafeId();
    } catch (error) {
      this.toasterService.error('Failed to delete employee');
    }
  }

  private handleApiError(error: any, action: string) {
    console.error(error);
    const errorArr = error?.error?.msg?.skippedEmployees;
    if (Array.isArray(errorArr) && errorArr.length > 0) {
      errorArr.forEach((emp: any) => {
        this.toasterService.error(`Duplicate Entry For ${emp.employeeName}: ${emp.employeePhoneNo}`);
      });
    } else {
      this.toasterService.error(`Failed to ${action} employee`);
    }
  }

  // ---------- FILTERING & PAGINATION ----------

  get filteredEmployees(): any[] {
    let list = this.employeeList || [];
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      list = list.filter(emp => 
        emp.employeeName?.toLowerCase().includes(term) ||
        emp.employeeId?.toLowerCase().includes(term) ||
        emp.employeeEmail?.toLowerCase().includes(term)
      );
    }
    return list;
  }

  get pagedEmployees(): any[] {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredEmployees.slice(start, end);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  getInitials(name: string): string {
    if (!name) return 'QR';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }

  // ---------- PDF GENERATION (Preserved Logic) ----------

  downloadEmployeeCardPdf(employee: any): void {
    if (!employee.qrCode) {
      this.toasterService.warning('QR code not available for this employee');
      return;
    }

    const dLogo = this.deskdyneLogoDataUrl;
    const oLogo = this.orgLogoDataUrl;
    const pageWidth = 270;
    const pageHeight = 170;
    const cardBackground = '#192754';
    const textColor = '#FFFFFF';
    const dividerColor = '#FFFFFF';
    const qrSize = 80;

    const slide2Columns: any[] = [{ width: '*', text: '' }];
    slide2Columns.push({
      width: 'auto',
      stack: [dLogo ? { image: dLogo, width: 75, alignment: 'center' } : { text: 'DeskDyne', color: textColor, bold: true, fontSize: 16, margin: [0, 25, 0, 0] }]
    });

    if (this.isShowCollab) {
      slide2Columns.push({ width: 30, text: 'X', fontSize: 16, bold: true, color: '#888888', alignment: 'center', margin: [0, 29, 0, 0] });
      slide2Columns.push({
        width: 'auto',
        stack: [oLogo ? { image: oLogo, width: 70, alignment: 'center' } : { text: (this.orgObj?.organization_name || 'Partner').toUpperCase(), color: textColor, fontSize: 12, bold: true, alignment: 'center', margin: [0, 30, 0, 0] }]
      });
    }
    slide2Columns.push({ width: '*', text: '' });

    const docDefinition: any = {
      pageSize: { width: pageWidth, height: pageHeight },
      pageMargins: [0, 0, 0, 0],
      background: () => ({ canvas: [{ type: 'rect', x: 0, y: 0, w: pageWidth, h: pageHeight, color: cardBackground }] }),
      content: [
        {
          margin: [0, 45, 0, 0],
          columns: [
            { width: '*', text: '' },
            {
              width: 'auto',
              table: {
                widths: [qrSize, 10, 'auto'],
                body: [[
                  { image: employee.qrCode, width: qrSize, height: qrSize, alignment: 'right' },
                  { canvas: [{ type: 'line', x1: 5, y1: 0, x2: 5, y2: 80, lineWidth: 1, lineColor: dividerColor }], alignment: 'center' },
                  {
                    margin: [0, 10, 0, 0],
                    stack: [
                      { text: employee.employeeName || 'User', fontSize: 12, bold: true, color: textColor, margin: [0, 0, 0, 5] },
                      {
                        table: {
                          widths: [10, 'auto'],
                          body: [
                            [{ text: '📞', fontSize: 8 }, { text: employee.employeePhoneNo || '', fontSize: 8, bold: true }],
                            [{ text: '✉', fontSize: 8 }, { text: employee.employeeEmail || '', fontSize: 7, bold: true }]
                          ]
                        }, layout: 'noBorders'
                      }
                    ]
                  }
                ]]
              }, layout: 'noBorders'
            },
            { width: '*', text: '' }
          ]
        },
        { text: '', pageBreak: 'before' },
        { margin: [0, 40, 0, 0], columns: slide2Columns },
        { text: employee.organization_name || this.orgObj?.organization_name || '', color: textColor, bold: true, fontSize: 12, alignment: 'center', margin: [0, 15, 0, 0] }
      ]
    };

    pdfMake.createPdf(docDefinition).download(`Card_${employee.employeeName}.pdf`);
  }

  downloadAllEmployeesPdf(): void {
    if (this.filteredEmployees.length === 0) {
      this.toasterService.warning('No employees to download');
      return;
    }
    // Logic for downloading all can be complex with large lists, usually better as single downloads or specialized bulk service
    // For now, I'll keep the single download logic and advise on bulk if needed.
    this.toasterService.info('Downloading employee cards...');
    this.filteredEmployees.forEach(emp => this.downloadEmployeeCardPdf(emp));
  }
}
