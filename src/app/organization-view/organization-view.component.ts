import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PolicyService } from 'src/service/policy.service';
import { OrganizationAddVendorComponent } from './organization-add-vendor/organization-add-vendor.component';
import { OrganizationCopyBulkMenuComponent } from './organization-copy-bulk-menu/organization-copy-bulk-menu.component';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ToasterService } from 'src/service/toaster.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-organization-view',
  templateUrl: './organization-view.component.html',
  styleUrls: ['./organization-view.component.scss'],
})
export class OrganizationViewComponent implements OnInit {
  @Input() organization: any;
  @Output() back = new EventEmitter<boolean>();
  @ViewChild('toggleCategory') toggleCategory: any;
  selectedMainTabIndex = 0;
  selectedSubTabIndex = 0;
  selectedChildTabIndex = 0;
  btnPolicy: any;
  orgViewList = [
    { name: 'Org Details', path: 'orgDetails' },
    { name: 'Compliance', path: 'organizationCompliance' },
    {
      name: 'Bulk Menu Section',
      path: 'bulkMenuSection',
      subTabs: [
        {
          name: 'Meals',
          childTabs: [
            { name: 'Bulk Meals Menu', path: 'bulkMealsMenu' },
            { name: 'Individual Meals Menu', path: 'individualMealsMenu' },
          ],
        },
        {
          name: 'Snacks',
          childTabs: [
            { name: 'Bulk Snacks Menu', path: 'bulkSnacksMenu' },
            { name: 'Individual Snacks Menu', path: 'individualSnacksMenu' },
          ],
        },
        {
          name: 'Foodbox',
          childTabs: [
            { name: 'Pre-Defined Snack Box', path: 'predefinedSnackBoxMenu' },
            { name: 'Customized Snack Box', path: 'customizedSnackBoxMenu' },
          ],
        },
        { name: 'Cake', path: 'cakeMenu' },
        { name: 'Sweet', path: 'sweetMenu' },
        { name: 'Lux', path: 'luxMenu' },
        { name: 'Pantry', path: 'pantryMenu' },
      ],
    },
    {
      name: 'Employee Bulk Menu', path: 'employeebulkmenu',
      subTabs: [
        {
          name: 'Meals',
          childTabs: [
            { name: 'Bulk Meals Menu', path: 'employeebulkMealsMenu' },
            { name: 'Individual Meals Menu', path: 'employeeindividualMealsMenu' },
          ],
        },
        {
          name: 'Snacks',
          childTabs: [
            { name: 'Bulk Snacks Menu', path: 'employeebulkSnacksMenu' },
            { name: 'Individual Snacks Menu', path: 'employeeindividualSnacksMenu' },
          ],
        },
        {
          name: 'Foodbox',
          childTabs: [
            { name: 'Pre-Defined Snack Box', path: 'employeepredefinedSnackBoxMenu' },
            { name: 'Customized Snack Box', path: 'employeecustomizedSnackBoxMenu' },
          ],
        },
        { name: 'Cake', path: 'employeecakeMenu' },
        { name: 'Sweet', path: 'employeesweetMenu' },
        { name: 'Lux', path: 'employeeluxMenu' },
        { name: 'Pantry', path: 'employeepantryMenu' },
      ],
    },
    { name: 'MealAwe Outlet', path: 'mealAweOutlet' },
    { name: 'Daily Order Menu', path: 'dailyOrderMenu' },
    { name: 'Consumption Menu', path: 'consumptionOrder' },
    { name: 'Employee List', path: 'employeeList' },
    { name: 'Outlet Employee', path: 'outletEmployee' },
    { name: 'Virtual Cafeteria Employee', path: 'vcEmployee' },
    { name: 'Guest Employee', path: 'guestEmployeeList' },
    { name: 'Employee wallet', path: 'employeeWallet' },
    { name: 'QR Employee', path: 'qrEmployee' },
  ];
  isCategoryActive = true;
  selectedCafeteria: any;
  isVendorAssigned: boolean = false;
  showBulkMenuHeader = false;
  private modalRef!: NgbModalRef;
  isMenuAvailable = false;

  constructor(private policyService: PolicyService, private dialog: MatDialog, private apiService: ApiMainService,
    private toaster: ToasterService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.orgViewList = this.orgViewList.filter((item) => this.btnPolicy[item.path] !== false);
    this.initializeTabs();
    this.initializeCafeteria();
    this.checkCategoryStatus();
  }

  goBack(): void {
    this.back.emit(true);
  }

  private initializeTabs(): void {
    const firstMain = this.orgViewList[0];
    if (!firstMain) return;

    if (firstMain.subTabs?.length) {
      this.selectedSubTabIndex = 0;
      const firstSub = firstMain.subTabs[0];

      if (firstSub.childTabs?.length) {
        this.selectedChildTabIndex = 0;
      }
    }
  }

  onMainTabChange(index: number): void {
    this.selectedMainTabIndex = index;
    this.selectedSubTabIndex = 0;
    this.selectedChildTabIndex = 0;

    const main = this.orgViewList[index];
    this.showBulkMenuHeader = main?.path === 'bulkMenuSection' || main?.path === 'employeebulkmenu';
    if (this.showBulkMenuHeader) {
      this.checkCategoryStatus();
    }
    if (main?.subTabs?.length) {
      const firstSub = main.subTabs[0];
      if (firstSub?.childTabs?.length) {
        this.selectedChildTabIndex = 0;
      }
    }
  }

  onSubTabChange(index: number): void {
    this.selectedSubTabIndex = index;
    this.selectedChildTabIndex = 0;

    const main = this.orgViewList[this.selectedMainTabIndex];
    const subTab = this.bulkMenuSection?.subTabs?.[index];
    if (subTab?.childTabs?.length) {
      this.selectedChildTabIndex = 0;
    }
    this.checkCategoryStatus();
  }

  onChildTabChange(index: number): void {
    this.selectedChildTabIndex = index;
    const selectedSubTab = this.bulkMenuSection?.subTabs?.[this.selectedSubTabIndex];
  }

  get selectedMain(): any {
    return this.orgViewList[this.selectedMainTabIndex];
  }

  get selectedSub(): any {
    return this.selectedMain?.subTabs?.[this.selectedSubTabIndex];
  }

  get selectedChild(): any {
    return this.selectedSub?.childTabs?.[this.selectedChildTabIndex];
  }

  private initializeCafeteria(): void {
    if (this.organization?.cafeteriaList?.length > 0) {
      this.selectedCafeteria = this.organization.cafeteriaList[0];
    }
  }

  onCafeteriaChange(event: any): void {
    this.selectedCafeteria = event.value;
  }

  openCategoryModal(content: any): void {
    if (content) {
      this.modalRef = this.modalService.open(content, {
        centered: true,
        backdrop: 'static'
      });
    }
  }

  toggleActivation(): void {

    const payload = {
      organizationId: this.organization._id,
      cafeteriaId: this.selectedCafeteria._id,
      mainCategory: this.selectedBulkMenuPath?.sub,
    };
    try {
      const isEmployeeMenu = this.selectedMainPath === 'employeebulkmenu';

      const apiCall = isEmployeeMenu
        ? this.apiService.toggleEmployeeMenuCategoryStatus(payload)
        : this.apiService.toggleCategoryStatus(payload);

      apiCall.then((res: any) => {
        if (res) {
          this.toaster.success('Category status updated successfully');
          this.modalRef.close();
          this.checkCategoryStatus();
        }
      }).catch(err => console.error(err));
    } catch (e) {
      console.log(e);
    }
  }

  onMenuAvailabilityChange(hasMenu: boolean): void {
    setTimeout(() => {
      this.isMenuAvailable = hasMenu;
    });
  }

  checkCategoryStatus(): boolean {
    const payload = {
      organizationId: this.organization._id,
      cafeteriaId: this.selectedCafeteria._id,
      mainCategory: this.selectedBulkMenuPath?.sub,
      subCategory: this.selectedBulkMenuPath?.childPath
    };
    try {
      const isEmployeeMenu = this.selectedMainPath === 'employeebulkmenu';

      const apiCall = isEmployeeMenu
        ? this.apiService.getEmployeeMenuByCategory(payload)
        : this.apiService.getB2bBulkMenuByCategory(payload);

      apiCall.then((res: any) => {
        if (res) {
          setTimeout(() => {
            this.isCategoryActive = res?.isCategoryActive;
          });
        } else {
          this.isCategoryActive = false;
        }
      }).catch(err => console.error(err));
    } catch (e) {
      console.log(e);
    }
    return this.isCategoryActive;
  }

  assignVendor(): void {
    const payload = {
      organization_name: this.organization.organization_name,
      organizationId: this.organization._id,
      cafeteriaId: this.selectedCafeteria._id,
      cafeteriaName: this.selectedCafeteria.cafeteria_name,
      mainCategory: this.selectedBulkMenuPath?.sub,
      subCategory: this.selectedBulkMenuPath?.childPath,
      selectedBulkMenuPath: this.selectedMainPath
    }
    this.openModal(OrganizationAddVendorComponent, payload);
  }

  changeVendor(): void {
    const payload = {
      organization_name: this.organization.organization_name,
      organizationId: this.organization._id,
      cafeteriaId: this.selectedCafeteria._id,
      cafeteriaName: this.selectedCafeteria.cafeteria_name,
      mainCategory: this.selectedBulkMenuPath?.sub,
      subCategory: this.selectedBulkMenuPath?.childPath,
      selectedBulkMenuPath: this.selectedMainPath
    }
    this.openModal(OrganizationAddVendorComponent, payload);
  }

  bulkMenuSection = this.orgViewList.find(
    view => view.path === 'bulkMenuSection'
  );

  get selectedBulkMenuPath() {
    const mainPath = this.selectedMainPath;
    const mainView = this.orgViewList.find(v => v.path === mainPath);
    const sub = mainView?.subTabs?.[this.selectedSubTabIndex];
    let child = sub?.childTabs?.[this.selectedChildTabIndex];

    if (child?.path === 'predefinedSnackBoxMenu') {
      child = { ...child, path: 'predefinedFoodBoxMenu' };
    } else if (child?.path === 'customizedSnackBoxMenu') {
      child = { ...child, path: 'customizedFoodBoxMenu' };
    }

    const childPath = child?.path ?? sub?.path;

    return {
      main: mainPath,
      sub: sub?.name?.toLowerCase(),
      subPath: sub?.path,
      child: child?.name,
      childPath
    };
  }

  copyMenu(): void {
    const payload = {
      organization_name: this.organization?.organization_name,
      organizationId: this.organization?._id,
      cafeteriaId: this.selectedCafeteria?._id,
      cafeteriaName: this.selectedCafeteria?.cafeteria_name,
      mainCategory: this.selectedBulkMenuPath?.sub,
      subCategory: this.selectedBulkMenuPath?.childPath
    }
    this.openModal(OrganizationCopyBulkMenuComponent, payload);
  }

  exportMenu(): void {
    try {
      this.apiService.getAllB2bBulkMenus().then((res: any) => {
        if (res) {
          this.generateExcelFile(res);
        } else {
          this.toaster.error('No data to export menu');
        }
      })
    } catch (err) {
      console.log(err, "error");
    }
  }

  checkVendorAssigned(event: any): void {
    this.isVendorAssigned = event;
  }

  private openModal(component: any, data: any) {
    const dialogRef = this.dialog.open(component, {
      width: '800px',
      data,
      autoFocus: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data?.vendorDetails) {
        this.checkVendorAssigned(true);
      }
    });
  }

  get selectedMainPath(): string | undefined {
    return this.orgViewList[this.selectedMainTabIndex]?.path;
  }

  async generateExcelFile(menuData: any[]): Promise<void> {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Menu Management System';
    workbook.created = new Date();

    // Add a worksheet with main data
    const worksheet = workbook.addWorksheet('B2B Menu Data', {
      views: [{ state: 'frozen', ySplit: 3 }] // Freeze first 3 rows (title + info + headers)
    });

    // ==================== TITLE AND SUMMARY ROWS ====================

    // Main Title Row (row 1)
    worksheet.mergeCells('A1:Z1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'B2B BULK MENU DATA - COMPREHENSIVE REPORT';
    titleCell.font = {
      size: 16,
      bold: true,
      color: { argb: 'FFFFFF' },
      name: 'Arial'
    };
    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '2F5496' } // Dark Blue
    };
    titleCell.alignment = {
      vertical: 'middle',
      horizontal: 'center'
    };

    // Export Info Row (row 2)
    worksheet.mergeCells('A2:Z2');
    const infoCell = worksheet.getCell('A2');
    infoCell.value = `Exported on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | Total Menus: ${menuData.length} | Total Items: ${this.calculateTotalItems(menuData)}`;
    infoCell.font = {
      italic: true,
      color: { argb: '2F5496' },
      size: 10
    };
    infoCell.alignment = { horizontal: 'center' };
    infoCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D9E1F2' } // Light Blue
    };

    // ==================== COLUMN HEADERS (row 3) ====================

    // Define all columns with grouped categories
    const headers = [
      // Group 1: MENU IDENTIFICATION
      { header: 'CAFETERIA', key: 'cafeteriaName', width: 20 },
      { header: 'ORGANIZATION', key: 'organization', width: 25 },

      // Group 2: CATEGORIES
      { header: 'MAIN CATEGORY', key: 'mainCategory', width: 15 },
      { header: 'SUB CATEGORY', key: 'subCategory', width: 15 },
      { header: 'MOQ', key: 'moq', width: 10 },

      // Group 3: ITEM DETAILS
      { header: 'ITEM NAME', key: 'itemName', width: 25 },
      { header: 'ITEM DESCRIPTION', key: 'itemDescription', width: 30 },
      { header: 'ITEM TYPE', key: 'itemType', width: 12 },
      { header: 'SERVING TYPE', key: 'servingType', width: 15 },

      // Group 4: PRICING & PAYMENTS
      { header: 'PAY TO KITCHEN (₹)', key: 'payToKitchen', width: 18 },
      { header: 'SLAB 1 PRICE (₹)', key: 'slab1Price', width: 15 },
      { header: 'SLAB 2 PRICE (₹)', key: 'slab2Price', width: 15 },
      { header: 'SLAB 3 PRICE (₹)', key: 'slab3Price', width: 15 },
      { header: 'SLAB 4 PRICE (₹)', key: 'slab4Price', width: 15 },

      // Group 5: DATE LIMITS
      { header: 'DATE LIMIT 1 (Days)', key: 'dateLimit1', width: 16 },
      { header: 'DATE LIMIT 2 (Days)', key: 'dateLimit2', width: 16 },
      { header: 'DATE LIMIT 3 (Days)', key: 'dateLimit3', width: 16 },

      // Group 6: SLAB LIMITS
      { header: 'SLAB LIMIT 1', key: 'slabLimit1', width: 13 },
      { header: 'SLAB LIMIT 2', key: 'slabLimit2', width: 13 },
      { header: 'SLAB LIMIT 3', key: 'slabLimit3', width: 13 },

      // Group 7: DELIVERY PRICING
      { header: 'DELIVERY PRICE 1 (₹)', key: 'slab1DeliveryPrice', width: 20 },
      { header: 'DELIVERY PRICE 2 (₹)', key: 'slab2DeliveryPrice', width: 20 },
      { header: 'DELIVERY PRICE 3 (₹)', key: 'slab3DeliveryPrice', width: 20 },
      { header: 'DELIVERY PRICE 4 (₹)', key: 'slab4DeliveryPrice', width: 20 },

      // Group 8: TIMESTAMPS
      { header: 'CREATED DATE', key: 'createdAt', width: 20 },
      { header: 'UPDATED DATE', key: 'updatedAt', width: 20 }
    ];

    worksheet.columns = headers;

    // ==================== HEADER STYLING WITH CATEGORY GROUPS ====================

    const headerRow = worksheet.getRow(3); // Headers are in row 3

    // Apply base styling to all header cells
    headerRow.eachCell((cell, colNumber) => {
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 11,
        name: 'Arial'
      };
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true
      };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFFFFF' } },
        left: { style: 'thin', color: { argb: 'FFFFFF' } },
        bottom: { style: 'thin', color: { argb: 'FFFFFF' } },
        right: { style: 'thin', color: { argb: 'FFFFFF' } }
      };
    });

    // Color code header groups
    const groupColors = {
      menu: { argb: '2F5496' },      // Dark Blue - Menu Identification
      category: { argb: '4472C4' },  // Blue - Categories
      item: { argb: '5B9BD5' },      // Light Blue - Item Details
      price: { argb: 'ED7D31' },     // Orange - Pricing
      dates: { argb: 'A5A5A5' },     // Gray - Date Limits
      limits: { argb: 'FFC000' },    // Yellow - Slab Limits
      delivery: { argb: '70AD47' },  // Green - Delivery Pricing
      time: { argb: '44546A' }       // Dark Gray - Timestamps
    };

    // Apply colors to header groups
    // MENU IDENTIFICATION (A-B) - columns 1-2
    for (let i = 1; i <= 2; i++) {
      headerRow.getCell(i).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: groupColors.menu
      };
    }

    // CATEGORIES (C-E) - columns 3-5
    for (let i = 3; i <= 5; i++) {
      headerRow.getCell(i).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: groupColors.category
      };
    }

    // ITEM DETAILS (F-I) - columns 6-9
    for (let i = 6; i <= 9; i++) {
      headerRow.getCell(i).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: groupColors.item
      };
    }

    // PRICING (J-N) - columns 10-14
    for (let i = 10; i <= 14; i++) {
      headerRow.getCell(i).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: groupColors.price
      };
    }

    // DATE LIMITS (O-Q) - columns 15-17
    for (let i = 15; i <= 17; i++) {
      headerRow.getCell(i).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: groupColors.dates
      };
    }

    // SLAB LIMITS (R-T) - columns 18-20
    for (let i = 18; i <= 20; i++) {
      headerRow.getCell(i).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: groupColors.limits
      };
    }

    // DELIVERY PRICING (U-X) - columns 21-24
    for (let i = 21; i <= 24; i++) {
      headerRow.getCell(i).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: groupColors.delivery
      };
    }

    // TIMESTAMPS (Y-Z) - columns 25-26
    for (let i = 25; i <= 26; i++) {
      headerRow.getCell(i).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: groupColors.time
      };
    }

    // ==================== ADD DATA ROWS ====================

    let rowIndex = 4; // Start after headers (row 4)
    let lastMenuData: any = null; // Track the last menu to avoid repetition

    menuData.forEach((menu, menuIndex) => {
      if (menu.itemList && menu.itemList.length > 0) {
        menu.itemList.forEach((item: any, itemIndex: number) => {
          const row = worksheet.getRow(rowIndex);

          // Only write menu-level data if it's different from the previous row
          // OR if it's the first item in this menu
          if (itemIndex === 0 ||
            !lastMenuData ||
            lastMenuData.cafeteriaName !== menu.cafeteriaName ||
            lastMenuData.organization !== menu.organization_name ||
            lastMenuData.mainCategory !== menu.mainCategory) {

            // MENU IDENTIFICATION DATA
            row.getCell('cafeteriaName').value = menu.cafeteriaName;
            row.getCell('organization').value = menu.organization_name;

            // CATEGORIES DATA
            row.getCell('mainCategory').value = menu.mainCategory;
            row.getCell('subCategory').value = menu.subCategory;
            row.getCell('moq').value = menu.moq;

            // DATE LIMITS DATA
            row.getCell('dateLimit1').value = menu.dateLimit1;
            row.getCell('dateLimit2').value = menu.dateLimit2;
            row.getCell('dateLimit3').value = menu.dateLimit3;

            // SLAB LIMITS DATA
            row.getCell('slabLimit1').value = menu.slabLimit1;
            row.getCell('slabLimit2').value = menu.slabLimit2;
            row.getCell('slabLimit3').value = menu.slabLimit3;

            // DELIVERY PRICING DATA
            row.getCell('slab1DeliveryPrice').value = menu.slab1DeliveryPrice;
            row.getCell('slab2DeliveryPrice').value = menu.slab2DeliveryPrice;
            row.getCell('slab3DeliveryPrice').value = menu.slab3DeliveryPrice;
            row.getCell('slab4DeliveryPrice').value = menu.slab4DeliveryPrice;

            // TIMESTAMPS DATA
            row.getCell('createdAt').value = menu.created_at ?
              this.formatDateTime(menu.created_at) : '';
            row.getCell('updatedAt').value = menu.updated_at ?
              this.formatDateTime(menu.updated_at) : '';

            // Store this menu data for comparison with next row
            lastMenuData = {
              cafeteriaName: menu.cafeteriaName,
              organization: menu.organization_name,
              mainCategory: menu.mainCategory
            };
          } else {
            // Leave menu-level cells empty for repeated data
            // This creates the visual effect like in your image
          }

          // ALWAYS write item-level data (different for each row)
          // ITEM DETAILS DATA
          row.getCell('itemName').value = item.itemName;
          row.getCell('itemDescription').value = item.itemDescription;
          row.getCell('itemType').value = item.itemType;
          row.getCell('servingType').value = item.itemServingType;

          // PRICING DATA
          row.getCell('payToKitchen').value = item.payAmtToKitchen;
          row.getCell('payToKitchen').numFmt = '₹#,##0.00';
          row.getCell('slab1Price').value = item.slab1Price;
          row.getCell('slab1Price').numFmt = '₹#,##0.00';
          row.getCell('slab2Price').value = item.slab2Price;
          row.getCell('slab2Price').numFmt = '₹#,##0.00';
          row.getCell('slab3Price').value = item.slab3Price;
          row.getCell('slab3Price').numFmt = '₹#,##0.00';
          row.getCell('slab4Price').value = item.slab4Price;
          row.getCell('slab4Price').numFmt = '₹#,##0.00';

          // ==================== ROW STYLING ====================

          // Base alternating row colors
          if (rowIndex % 2 === 0) {
            row.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'F9F9F9' }
            };
          }

          // Highlight menu rows with light border
          if (itemIndex === 0) {
            // First item of each menu - add top border
            row.border = {
              top: { style: 'medium', color: { argb: '2F5496' } }
            };
          }

          // Color code item type cells
          const itemTypeCell = row.getCell('itemType');
          if (item.itemType === 'Veg' || item.itemType === 'Vegetarian') {
            itemTypeCell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'C6EFCE' } // Light Green
            };
            itemTypeCell.font = { bold: true, color: { argb: '006100' } };
          } else if (item.itemType === 'NonVeg' || item.itemType === 'Non-Veg') {
            itemTypeCell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFC7CE' } // Light Red
            };
            itemTypeCell.font = { bold: true, color: { argb: '9C0006' } };
          }

          // Style price cells
          const priceCells = ['payToKitchen', 'slab1Price', 'slab2Price', 'slab3Price', 'slab4Price'];
          priceCells.forEach(key => {
            const cell = row.getCell(key);
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFF2CC' } // Light Yellow for prices
            };
          });

          // Style delivery price cells
          const deliveryCells = ['slab1DeliveryPrice', 'slab2DeliveryPrice', 'slab3DeliveryPrice', 'slab4DeliveryPrice'];
          deliveryCells.forEach(key => {
            const cell = row.getCell(key);
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'E2EFDA' } // Light Green for delivery
            };
          });

          // Add borders to all cells
          row.eachCell((cell) => {
            if (!cell.border) {
              cell.border = {
                top: { style: 'thin', color: { argb: 'D9D9D9' } },
                left: { style: 'thin', color: { argb: 'D9D9D9' } },
                bottom: { style: 'thin', color: { argb: 'D9D9D9' } },
                right: { style: 'thin', color: { argb: 'D9D9D9' } }
              };
            }
          });

          row.commit();
          rowIndex++;
        });
      } else {
        // If menu has no items, add a placeholder row
        const row = worksheet.getRow(rowIndex);
        row.getCell('cafeteriaName').value = menu.cafeteriaName;
        row.getCell('organization').value = menu.organization_name;
        row.getCell('mainCategory').value = menu.mainCategory;
        row.getCell('subCategory').value = menu.subCategory;
        row.getCell('moq').value = menu.moq;
        row.getCell('itemName').value = 'NO ITEMS IN THIS MENU';

        // Style for empty menus
        row.font = { italic: true, color: { argb: '999999' } };
        row.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'F2F2F2' }
        };

        row.eachCell((cell) => {
          cell.border = {
            top: { style: 'dotted', color: { argb: 'CCCCCC' } },
            left: { style: 'dotted', color: { argb: 'CCCCCC' } },
            bottom: { style: 'dotted', color: { argb: 'CCCCCC' } },
            right: { style: 'dotted', color: { argb: 'CCCCCC' } }
          };
        });

        row.commit();
        rowIndex++;

        // Update last menu data
        lastMenuData = {
          cafeteriaName: menu.cafeteriaName,
          organization: menu.organization_name,
          mainCategory: menu.mainCategory
        };
      }

      // Reset lastMenuData when moving to next menu to ensure first row shows all data
      lastMenuData = null;

      // Add a blank row after each menu for better separation (except after last menu)
      if (menuIndex < menuData.length - 1) {
        const blankRow = worksheet.getRow(rowIndex);
        blankRow.height = 5; // Small gap
        blankRow.commit();
        rowIndex++;
      }
    });

    // ==================== FINAL TOUCHES ====================

    // Add total count row
    const totalRowIndex = rowIndex + 1;
    worksheet.mergeCells(`A${totalRowIndex}:F${totalRowIndex}`);
    const totalCell = worksheet.getCell(`A${totalRowIndex}`);
    totalCell.value = `TOTALS: ${menuData.length} Menus | ${this.calculateTotalItems(menuData)} Items`;
    totalCell.font = { bold: true, size: 11, color: { argb: '2F5496' } };
    totalCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D9E1F2' }
    };
    totalCell.alignment = { horizontal: 'center' };
    totalCell.border = {
      top: { style: 'double', color: { argb: '2F5496' } },
      left: { style: 'thin', color: { argb: '2F5496' } },
      bottom: { style: 'thin', color: { argb: '2F5496' } },
      right: { style: 'thin', color: { argb: '2F5496' } }
    };

    // Auto-fit columns
    worksheet.columns.forEach(column => {
      let maxLength = column.header ? column.header.length : 10;
      column.eachCell!({ includeEmpty: true }, cell => {
        const cellValue = cell.value ? cell.value.toString() : '';
        const cellLength = cellValue.length;
        if (cellLength > maxLength) {
          maxLength = cellLength;
        }
      });
      column.width = Math.min(Math.max(maxLength + 2, 10), 50);
    });

    // Add filters to header row (starting at row 3)
    const lastDataRow = rowIndex - 1;
    if (lastDataRow >= 3) {
      worksheet.autoFilter = {
        from: 'A3',
        to: `Z${lastDataRow}`
      };
    }

    // Generate and save Excel file
    try {
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      const fileName = `B2B_Menu_Export_${new Date().toISOString().split('T')[0]}_${new Date().getTime()}.xlsx`;
      saveAs(blob, fileName);
    } catch (error) {
      console.error('Error generating Excel file:', error);
    }
  }

  private calculateTotalItems(menuData: any[]): number {
    return menuData.reduce((total, menu) => {
      return total + (menu.itemList ? menu.itemList.length : 0);
    }, 0);
  }

  private formatDateTime(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
