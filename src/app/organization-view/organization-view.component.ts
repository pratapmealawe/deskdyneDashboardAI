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
    { name: 'Virtual Cafeteria', path: 'virtualCafeteriaOutlet' },
    { name: 'Daily Order Menu', path: 'dailyOrderMenu' },
    { name: 'Consumption Menu', path: 'consumptionOrder' },
    { name: 'Employee List', path: 'employeeList' },
    { name: 'Outlet Employee', path: 'outletEmployee' },
    { name: 'Virtual Cafeteria Employee', path: 'vcEmployee' },
    // { name: 'Guest Employee', path: 'guestEmployeeList' },
    { name: 'Company Wallet', path: 'companyWallet' },
    { name: 'QR Employee', path: 'qrEmployee' },
  ];

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.orgViewList = this.orgViewList.filter((item) => this.btnPolicy[item.path] !== false);
    this.initializeTabs();
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
    const sub = main?.subTabs?.[index];

    if (sub?.childTabs?.length) {
      this.selectedChildTabIndex = 0;
    }
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

  getTabIcon(path: string): string {
    const icons: { [key: string]: string } = {
      'orgDetails': 'business',
      'organizationCompliance': 'verified_user',
      'bulkMenuSection': 'restaurant_menu',
      'employeebulkmenu': 'restaurant_menu',
      'mealAweOutlet': 'storefront',
      'dailyOrderMenu': 'today',
      'consumptionOrder': 'receipt_long',
      'employeeList': 'people',
      'outletEmployee': 'badge',
      'vcEmployee': 'person_pin',
      // 'guestEmployeeList': 'person_add',
      'companyWallet': 'account_balance_wallet',
      'qrEmployee': 'qr_code'
    };
    return icons[path] || 'article';
  }
}
