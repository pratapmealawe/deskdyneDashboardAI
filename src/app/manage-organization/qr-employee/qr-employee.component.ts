import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ExcelService } from 'src/service/excel.service';
import { QrEmployeeDialogComponent, QrEmployeeDialogData } from './qr-employee-dialog/qr-employee-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

(pdfMake as any).vfs =
  (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs ?? {};

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-qr-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './qr-employee.component.html',
  styleUrls: ['./qr-employee.component.scss'],
})
export class QrEmployeeComponent implements OnInit {
  @Input() orgObj: any;

  employeeList: any[] = [];

  selectedCafeteria: any;
  selectedCafeteriaName: string | null = null;
  selectedCafeteriaId: string | null = null;

  showMultipleEmployeeForm = false;
  bulkForm!: FormGroup;
  disableSubmit = false;

  loading = false;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50];
  deskdyneLogoDataUrl: string = '';
  orgLogoDataUrl: string = '';
  imageUrl: string = environment.imageUrl;
  isShowCollab: boolean = false;

  constructor(
    private apiMainService: ApiMainService,
    private excelService: ExcelService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadLogo();
    this.initBulkForm();
    this.initCafeteriaDefaults();
    this.getEmployeeListByCafeId();
  }

  private loadLogo(): void {
    // Deskdyne logo from assets
    const deskdyneLogoPath = 'assets/images/deskdyneLogo.png';

    this.http.get(deskdyneLogoPath, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.deskdyneLogoDataUrl = reader.result as string; // data:image/png;base64,...
        };
        reader.readAsDataURL(blob);
      },
      error: (err) => {
        console.error('Failed to load Deskdyne logo', err);
        this.snackBar.open('Could not load logo for card PDF', 'Close', { duration: 3000 });
      }
    });

    // Org logo: load only if URL is present, and convert to dataURL
    if (this.orgObj?.organizationLogoUrl) {
      const orgLogoPath = `${this.imageUrl}${this.orgObj.organizationLogoUrl}`;

      this.http.get(orgLogoPath, { responseType: 'blob' }).subscribe({
        next: (blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.orgLogoDataUrl = reader.result as string; // data:image/jpeg;base64,...
          };
          reader.readAsDataURL(blob);
        },
        error: (err) => {
          console.error('Failed to load org logo', err);
          // Fallback to just org name if image fails
          this.orgLogoDataUrl = '';
        }
      });
    } else {
      // No logo uploaded â†’ fallback to org name
      this.orgLogoDataUrl = '';
    }
  }



  // ---------- INIT ----------

  private initBulkForm(): void {
    this.bulkForm = this.fb.group({
      employees: this.fb.array([])
    });
    this.addBulkRow(); // start with 1 row
  }

  get employeesFA(): FormArray {
    return this.bulkForm.get('employees') as FormArray;
  }

  private createBulkEmployeeGroup(): FormGroup {
    return this.fb.group({
      employeeName: ['', Validators.required],
      employeeId: ['', Validators.required],
      employeePhoneNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      employeeEmail: ['', [Validators.required, Validators.email]]
    });
  }

  private initCafeteriaDefaults(): void {
    if (this.orgObj && this.orgObj.cafeteriaList && this.orgObj.cafeteriaList.length > 0) {
      this.selectedCafeteria = this.orgObj.cafeteriaList[0];
      this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
      this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
    }
  }

  // ---------- CAFETERIA ----------

  onCafeteriaChange(): void {
    if (!this.selectedCafeteria) return;
    this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
    this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
    this.getEmployeeListByCafeId();   // reload for that cafe
    this.resetPagination();
  }


  // ---------- API ----------

  async getEmployeeListByCafeId(): Promise<void> {
    if (!this.orgObj?._id) return;
    try {
      this.loading = true;
      this.employeeList = await this.apiMainService.qrEmployeeByCafeId(this.selectedCafeteriaId);
      this.resetPagination();
    } catch (error) {
      console.error(error);
      this.snackBar.open('Failed to fetch employees', 'Close', { duration: 3000 });
    } finally {
      this.loading = false;
    }
  }

  // ---------- ADD / EDIT (SINGLE) USING DIALOG ----------

  openAddDialog(): void {
    if (!this.selectedCafeteria) {
      this.snackBar.open('Please select a cafeteria first', 'Close', { duration: 2500 });
      return;
    }

    const data: QrEmployeeDialogData = {
      mode: 'add',
      orgObj: this.orgObj,
      cafeteria: this.selectedCafeteria
    };

    const dialogRef = this.dialog.open(QrEmployeeDialogComponent, {
      width: '780px',
      data,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;

      // result already has qrCode field from dialog
      const payload = [result];

      try {
        const res = await this.apiMainService.addQrEmployeeList(payload);
        if (res && res.length > 0) {
          this.snackBar.open('Employee added successfully', 'Close', { duration: 2500 });
          this.getEmployeeListByCafeId();
        }
      } catch (error: any) {
        console.error(error);
        const errorArr = error?.error?.msg?.skippedEmployees;
        if (Array.isArray(errorArr) && errorArr.length > 0) {
          errorArr.forEach((emp: any) => {
            alert(`Duplicate Entry For ${emp.employeeName}: ${emp.employeePhoneNo}`);
          });
        } else {
          this.snackBar.open('Failed to add employee', 'Close', { duration: 3000 });
        }
      }
    });
  }

  openEditDialog(employee: any): void {
    const data: QrEmployeeDialogData = {
      mode: 'edit',
      orgObj: this.orgObj,
      cafeteria: {
        cafeteria_name: employee.cafeteria_name,
        cafeteria_id: employee.cafeteria_id
      },
      employee
    };

    const dialogRef = this.dialog.open(QrEmployeeDialogComponent, {
      width: '780px',
      data,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;
      await this.updateQrEmployee(employee._id, result);
    });
  }

  private async updateQrEmployee(id: any, employeeObj: any): Promise<void> {
    // ensure qrCode present from dialog; but if anything is missing, regenerate
    try {
      const res = await this.apiMainService.updateQrEmployee(id, employeeObj);
      if (res && res._id) {
        this.snackBar.open('Employee updated successfully', 'Close', { duration: 2500 });
        this.getEmployeeListByCafeId();
      }
    } catch (error: any) {
      console.error(error);
      const errorArr = error?.error?.msg?.skippedEmployees;
      if (Array.isArray(errorArr) && errorArr.length > 0) {
        errorArr.forEach((emp: any) => {
          alert(`Duplicate Entry For ${emp.employeeName}: ${emp.employeePhoneNo}`);
        });
      } else {
        this.snackBar.open('Failed to update employee', 'Close', { duration: 3000 });
      }
    }
  }

  // ---------- DELETE ----------

  async deleteEmployee(employee: any): Promise<void> {
    const yes = confirm(`Do you really want to delete employee: ${employee.employeeName}?`);
    if (!yes) return;

    try {
      const deletedEmployee = await this.apiMainService.deleteQrEmployee(employee._id);
      console.log('deleted', deletedEmployee);
      this.snackBar.open('Employee deleted', 'Close', { duration: 2500 });
      this.getEmployeeListByCafeId();
    } catch (error) {
      console.error(error);
      this.snackBar.open('Failed to delete employee', 'Close', { duration: 3000 });
    }
  }

  // ---------- BULK ADD ----------

  showBulkForm(): void {
    if (!this.selectedCafeteria) {
      this.snackBar.open('Please select a cafeteria first', 'Close', { duration: 2500 });
      return;
    }
    this.showMultipleEmployeeForm = true;
  }

  hideBulkForm(): void {
    this.showMultipleEmployeeForm = false;
    this.bulkForm.reset();
    this.employeesFA.clear();
    this.addBulkRow();
    this.disableSubmit = false;
  }

  addBulkRow(): void {
    this.employeesFA.push(this.createBulkEmployeeGroup());
  }

  removeBulkRow(index: number): void {
    if (this.employeesFA.length === 1) return;
    this.employeesFA.removeAt(index);
  }

  async submitMultipleEmployee(): Promise<void> {
    this.disableSubmit = false;

    this.bulkForm.markAllAsTouched();
    if (this.bulkForm.invalid) {
      this.disableSubmit = true;
      return;
    }

    if (!this.selectedCafeteriaId || !this.selectedCafeteriaName) {
      this.snackBar.open('Cafeteria info missing', 'Close', { duration: 2500 });
      return;
    }

    const employeesPayload: any[] = [];


    for (const emp of this.employeesFA.value) {
      employeesPayload.push({
        organization_name: this.orgObj.organization_name,
        organization_id: this.orgObj._id,
        cafeteria_name: this.selectedCafeteriaName,
        cafeteria_id: this.selectedCafeteriaId,
        employeeName: emp.employeeName,
        employeeId: emp.employeeId,
        employeePhoneNo: emp.employeePhoneNo,
        employeeEmail: emp.employeeEmail,
        qrCode: ""
      });
    }

    try {
      const res = await this.apiMainService.addQrEmployeeList(employeesPayload);
      if (res && res.length > 0) {
        this.snackBar.open('Employees added successfully', 'Close', { duration: 2500 });
        this.getEmployeeListByCafeId();
        this.hideBulkForm();
      }
    } catch (error: any) {
      console.error(error);
      const errorArr = error?.error?.msg?.skippedEmployees;
      if (Array.isArray(errorArr) && errorArr.length > 0) {
        errorArr.forEach((emp: any) => {
          alert(`Duplicate Entry For ${emp.employeeName}: ${emp.employeePhoneNo}`);
        });
      } else {
        this.snackBar.open('Failed to add employees', 'Close', { duration: 3000 });
      }
    }
  }

  // ---------- FILTERED EMPLOYEES FOR SELECTED CAFETERIA ----------

  get filteredEmployees(): any[] {
    if (!this.selectedCafeteriaId) return this.employeeList || [];
    return (this.employeeList || []).filter(
      (emp) => emp.cafeteria_id === this.selectedCafeteriaId
    );
  }

  private resetPagination(): void {
    this.pageIndex = 0;
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

  async downloadExcelTemplate(): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('QR Employees Template');

    // Header row
    worksheet.addRow(['Employee ID', 'Employee Name', 'Phone No', 'Email']);

    // Style header
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.columns = [
      { key: 'employeeId', width: 15 },
      { key: 'employeeName', width: 25 },
      { key: 'employeePhoneNo', width: 15 },
      { key: 'employeeEmail', width: 30 }
    ];

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, 'qr_employees_template.xlsx');
  }

  async onExcelUpload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);
      const worksheet = workbook.worksheets[0];

      // Clear existing rows
      this.employeesFA.clear();

      worksheet.eachRow((row, rowNumber) => {
        // Skip header
        if (rowNumber === 1) return;

        const idCell = row.getCell(1).value;
        const nameCell = row.getCell(2).value;
        const phoneCell = row.getCell(3).value;
        const emailCell = row.getCell(4).value;

        const employeeId = (idCell || '').toString().trim();
        const employeeName = (nameCell || '').toString().trim();
        const phone = (phoneCell || '').toString().trim();
        let email = '';
        if (emailCell && typeof emailCell === 'object' && 'text' in emailCell) {
          // ExcelJS hyperlink cell -> { text, hyperlink }
          email = (emailCell as any).text?.toString().trim() || '';
        } else {
          email = (emailCell || '').toString().trim();
        }

        // Skip completely empty rows
        if (!employeeId && !employeeName && !phone && !email) return;

        const group = this.createBulkEmployeeGroup();
        group.patchValue({
          employeeId,
          employeeName,
          employeePhoneNo: phone,
          employeeEmail: email
        });

        this.employeesFA.push(group);
      });

      if (this.employeesFA.length === 0) {
        // if nothing parsed, keep at least one empty row
        this.addBulkRow();
        this.snackBar.open('No valid rows found in Excel', 'Close', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Excel imported successfully', 'Close', {
          duration: 2500
        });
      }
    } catch (err) {
      console.error('Error reading Excel file', err);
      this.snackBar.open('Failed to read Excel file', 'Close', {
        duration: 3000
      });
    } finally {
      (event.target as HTMLInputElement).value = '';
    }
  }

  downloadEmployeeCardPdf(employee: any): void {
    console.log(employee);

    // 1. Validation
    if (!employee.qrCode) {
      this.snackBar.open('QR not available for this employee', 'Close', { duration: 2500 });
      return;
    }

    const dLogo = this.deskdyneLogoDataUrl;
    const oLogo = this.orgLogoDataUrl;

    // 2. Constants
    const pageWidth = 270;
    const pageHeight = 170;
    const cardBackground = '#192754';
    const textColor = '#FFFFFF';
    const dividerColor = '#FFFFFF';
    const qrSize = 80;

    // 3. Dynamic Column Construction for Slide 2
    // We build this array based on isShowCollab to avoid messy inline logic
    const slide2Columns: any[] = [];

    // A. Left Spacer (pushes content to center)
    slide2Columns.push({ width: '*', text: '' });

    // B. Deskdyne Logo (Always shown)
    slide2Columns.push({
      width: 'auto',
      stack: [
        dLogo ? {
          image: dLogo,
          width: 75,
          alignment: 'center',
          margin: [0, 0, 0, 0]
        } : {
          text: 'DeskDyne',
          color: textColor,
          bold: true,
          fontSize: 16,
          margin: [0, 25, 0, 0] // Manual center if text only
        }
      ]
    });

    // C. Conditional Collaboration Logic
    if (this.isShowCollab) {
      // The "X" Divider
      slide2Columns.push({
        width: 30,
        text: 'X',
        fontSize: 16,
        bold: true,
        color: '#888888',
        alignment: 'center',
        // Vertical Center Math: 
        // Image height is ~75. Center is 37.5. 
        // Text height (size 16) is ~16. Center is 8.
        // Margin needed = 37.5 - 8 = ~29.5
        margin: [0, 29, 0, 0]
      });

      // The Org Logo
      slide2Columns.push({
        width: 'auto',
        stack: [
          oLogo ? {
            image: oLogo,
            width: 70, // Slightly smaller to balance visually
            alignment: 'center',
            margin: [0, 0, 0, 0]
          } : {
            text: (this.orgObj?.organization_name || 'Partner').toUpperCase(),
            color: textColor,
            fontSize: 12,
            bold: true,
            alignment: 'center',
            margin: [0, 30, 0, 0] // Align text with X
          }
        ]
      });
    }

    // D. Right Spacer
    slide2Columns.push({ width: '*', text: '' });


    // 4. Document Definition
    const docDefinition: any = {
      pageSize: { width: pageWidth, height: pageHeight },
      pageMargins: [0, 0, 0, 0],
      background: function () {
        return { canvas: [{ type: 'rect', x: 0, y: 0, w: pageWidth, h: pageHeight, color: cardBackground }] };
      },

      content: [
        // ============================================
        // SIDE 1: QR & DETAILS
        // ============================================
        {
          // Vertical centering: (170 - 80) / 2 = 45
          margin: [0, 45, 0, 0],
          columns: [
            { width: '*', text: '' }, // Left spacer
            {
              width: 'auto',
              table: {
                widths: [qrSize, 10, 'auto'], // Fixed QR, Spacer, Auto Text
                body: [
                  [
                    // QR
                    {
                      image: employee.qrCode,
                      width: qrSize,
                      height: qrSize,
                      alignment: 'right',
                      margin: [0, 0, 0, 0]
                    },
                    // Line
                    {
                      canvas: [{ type: 'line', x1: 5, y1: 0, x2: 5, y2: 80, lineWidth: 1, lineColor: dividerColor }],
                      alignment: 'center',
                      margin: [0, 0, 0, 0]
                    },
                    // Details
                    {
                      margin: [0, 10, 0, 0], // Align text vertically with QR center roughly
                      stack: [
                        {
                          text: employee.employeeName || 'Test User',
                          fontSize: 12,
                          bold: true,
                          color: textColor,
                          font: 'Roboto',
                          margin: [0, 0, 0, 5]
                        },
                        {
                          table: {
                            widths: [10, 'auto'], // Auto width for email to fit tight
                            body: [
                              [
                                { text: 'ðŸ“ž', color: textColor, fontSize: 8, margin: [0, 1, 0, 0] },
                                { text: employee.employeePhoneNo || '', color: textColor, fontSize: 8, bold: true, margin: [0, 0, 0, 4] }
                              ],
                              [
                                { text: 'âœ‰', color: textColor, fontSize: 8, margin: [0, 1, 0, 0] },
                                { text: employee.employeeEmail || '', color: textColor, fontSize: 7, bold: true, margin: [0, 0, 0, 0] }
                              ],
                              [
                                { text: 'âœ‰', color: textColor, fontSize: 8, margin: [0, 1, 0, 0] },
                                { text: 'ML89', color: textColor, fontSize: 7, bold: true, margin: [0, 0, 0, 0] }
                              ],
                            ]
                          },
                          layout: 'noBorders'
                        }
                      ]
                    }
                  ]
                ]
              },
              layout: 'noBorders'
            },
            { width: '*', text: '' } // Right spacer
          ]
        },

        // ============================================
        // SIDE 2: COLLABORATION LOGOS
        // ============================================
        { text: '', pageBreak: 'before' },
        {
          // Wrapper to center the columns vertically on the page
          margin: [0, 40, 0, 0],
          columns: slide2Columns
        },
        // Add Organization Name below logos
        {
          text: employee.organization_name || this.orgObj?.organization_name || '',
          color: textColor,
          bold: true,
          fontSize: 12,
          alignment: 'center',
          margin: [0, 15, 0, 0]
        }
      ]
    };

    const fileName = `Card_${employee.employeeName}.pdf`;
    pdfMake.createPdf(docDefinition).download(fileName);
  }

  downloadAllEmployeesPdf(): void {
    if (!this.filteredEmployees || this.filteredEmployees.length === 0) {
      this.snackBar.open('No employees to download', 'Close', { duration: 2500 });
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

    // --- 1. Prepare "Common Page" (Back Side) Content ---
    const slide2Columns: any[] = [];
    slide2Columns.push({ width: '*', text: '' });
    slide2Columns.push({
      width: 'auto',
      stack: [
        dLogo ? {
          image: dLogo,
          width: 75,
          alignment: 'center',
          margin: [0, 0, 0, 0]
        } : {
          text: 'DeskDyne',
          color: textColor,
          bold: true,
          fontSize: 16,
          margin: [0, 25, 0, 0]
        }
      ]
    });

    if (this.isShowCollab) {
      slide2Columns.push({
        width: 30,
        text: 'X',
        fontSize: 16,
        bold: true,
        color: '#888888',
        alignment: 'center',
        margin: [0, 29, 0, 0]
      });
      slide2Columns.push({
        width: 'auto',
        stack: [
          oLogo ? {
            image: oLogo,
            width: 70,
            alignment: 'center',
            margin: [0, 0, 0, 0]
          } : {
            text: (this.orgObj?.organization_name || 'Partner').toUpperCase(),
            color: textColor,
            fontSize: 12,
            bold: true,
            alignment: 'center',
            margin: [0, 30, 0, 0]
          }
        ]
      });
    }
    slide2Columns.push({ width: '*', text: '' });

    // The common page definition (Back Side)
    const commonBackPage = {
      stack: [
        {
          margin: [0, 40, 0, 0],
          columns: slide2Columns,
        },
        {
          text: this.orgObj?.organization_name || '',
          color: textColor,
          bold: true,
          fontSize: 12,
          alignment: 'center',
          margin: [0, 15, 0, 0]
        }
      ],
      // Force page break after this common page so employees start on next page
      pageBreak: 'after'
    };

    // --- 2. Build Content Array ---
    // Start with the common page
    const contentArr: any[] = [commonBackPage];

    // Loop employees
    this.filteredEmployees.forEach((employee, index) => {
      const qrImage = employee.qrCode ? {
        image: employee.qrCode,
        width: qrSize,
        height: qrSize,
        alignment: 'right',
        margin: [0, 0, 5, 0]
      } : {
        text: 'No QR',
        width: qrSize,
        height: qrSize,
        alignment: 'right',
        color: '#ff0000',
        margin: [0, 30, 5, 0]
      };

      const employeePage = {
        margin: [0, 45, 0, 0], // Vertical centering
        columns: [
          { width: '*', text: '' }, // Left spacer
          {
            width: 'auto',
            table: {
              widths: [qrSize, 10, 'auto'], // Fixed QR, Spacer, Auto Text
              body: [
                [
                  // QR
                  qrImage,
                  // Line
                  {
                    canvas: [{ type: 'line', x1: 5, y1: 0, x2: 5, y2: 80, lineWidth: 1, lineColor: dividerColor }],
                    alignment: 'center',
                    margin: [0, 0, 0, 0]
                  },
                  // Details
                  {
                    margin: [0, 10, 0, 0],
                    stack: [
                      {
                        text: employee.employeeName || 'No Name',
                        fontSize: 12,
                        bold: true,
                        color: textColor,
                        font: 'Roboto',
                        margin: [0, 0, 0, 5]
                      },
                      {
                        table: {
                          widths: [10, 'auto'],
                          body: [
                            [
                              { text: 'ðŸ“ž', color: textColor, fontSize: 8, margin: [0, 1, 0, 0] },
                              { text: employee.employeePhoneNo || '', color: textColor, fontSize: 8, bold: true, margin: [0, 0, 0, 4] }
                            ],
                            [
                              { text: 'âœ‰', color: textColor, fontSize: 8, margin: [0, 1, 0, 0] },
                              { text: employee.employeeEmail || '', color: textColor, fontSize: 7, bold: true, margin: [0, 0, 0, 0] }
                            ]
                          ]
                        },
                        layout: 'noBorders'
                      }
                    ]
                  }
                ]
              ]
            },
            layout: 'noBorders'
          },
          { width: '*', text: '' } // Right spacer
        ],
        // Add pageBreak 'after' for all except the last one
        pageBreak: (index === this.filteredEmployees.length - 1) ? undefined : 'after'
      };

      contentArr.push(employeePage);
    });

    const docDefinition: any = {
      pageSize: { width: pageWidth, height: pageHeight },
      pageMargins: [0, 0, 0, 0],
      background: function () {
        return { canvas: [{ type: 'rect', x: 0, y: 0, w: pageWidth, h: pageHeight, color: cardBackground }] };
      },
      content: contentArr
    };

    const fileName = `All_Employees_${this.selectedCafeteriaName || 'Cafeteria'}.pdf`;
    pdfMake.createPdf(docDefinition).download(fileName);

  }
}


