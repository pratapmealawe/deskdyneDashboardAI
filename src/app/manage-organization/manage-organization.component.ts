import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PolicyService } from 'src/service/policy.service';
import { MaterialModule } from '../material.module';

// Manage-organization sub-components
import { CompanyWalletComponent } from './company-wallet/company-wallet.component';
import { ConsumptionOrderComponent } from './consumption-order/consumption-order.component';
import { DailyOrderMenuComponent } from './daily-order-menu/daily-order-menu.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MealaweOutletComponent } from './mealawe-outlet/mealawe-outlet.component';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { OrgComplianceComponent } from './organization-compliance/organization-compliance.component';
import { OutletEmployeeComponent } from './outlet-employee/outlet-employee.component';
import { QrEmployeeComponent } from './qr-employee/qr-employee.component';
import { VcEmployeeComponent } from './vc-employee/vc-employee.component';
import { BulkComponent } from "./bulk/bulk.component";


@Component({
  selector: 'app-manage-organization',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    OrgDetailsComponent,
    OrgComplianceComponent,
    MealaweOutletComponent,
    DailyOrderMenuComponent,
    ConsumptionOrderComponent,
    EmployeeListComponent,
    OutletEmployeeComponent,
    VcEmployeeComponent,
    CompanyWalletComponent,
    QrEmployeeComponent,
    BulkComponent
],
  templateUrl: './manage-organization.component.html',
  styleUrls: ['./manage-organization.component.scss'],
})
export class ManageOrganizationComponent implements OnInit {
  @Input() organization: any;
  @Output() back = new EventEmitter<boolean>();
  @ViewChild('mainTabsContainer') mainTabsContainer!: ElementRef;
  isDown = false;
  startX = 0;
  scrollLeft = 0;
  selectedMainTabIndex = 0;
  btnPolicy: any;
  orgViewList = [
    { name: 'Org Details', path: 'orgDetails', policyKey: 'orgDetails' },
    { name: 'Compliance', path: 'organizationCompliance', policyKey: 'compliance' },
    { name: 'Bulk Menu Section', path: 'bulkMenuSection', policyKey: 'bulkMenuSection' },
    { name: 'Employee Bulk Menu', path: 'employeebulkmenu', policyKey: 'employeeBulkMenu' },
    { name: 'Virtual Cafeteria', path: 'virtualCafeteriaOutlet', policyKey: 'virtualCafeteria' },
    { name: 'Daily Order Menu', path: 'dailyOrderMenu', policyKey: 'dailyOrderMenu' },
    { name: 'Consumption Menu', path: 'consumptionOrder', policyKey: 'consumptionMenu' },
    { name: 'Employee List', path: 'employeeList', policyKey: 'employeeList' },
    { name: 'Outlet Employee', path: 'outletEmployee', policyKey: 'outletEmployee' },
    { name: 'Virtual Cafeteria Employee', path: 'vcEmployee', policyKey: 'virtualCafeteriaEmployee' },
    { name: 'Company Wallet', path: 'companyWallet', policyKey: 'companyWallet' },
    { name: 'QR Employee', path: 'qrEmployee', policyKey: 'qrEmployee' },
  ];
  tabPolicy: any;

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.orgViewList = this.policyService.filterTabsByPolicy(this.orgViewList);
  }

  goBack(): void {
    this.back.emit(true);
  }

  onMainTabChange(index: number): void {
    this.selectedMainTabIndex = index;
    const main = this.orgViewList[index];
  }

  get selectedMain(): any {
    return this.orgViewList[this.selectedMainTabIndex];
  }

  get selectedMainPath(): string | undefined {
    return this.orgViewList[this.selectedMainTabIndex]?.path;
  }

  onMouseDown(e: MouseEvent): void {
    this.isDown = true;
    this.startX = e.pageX - this.mainTabsContainer.nativeElement.offsetLeft;
    this.scrollLeft = this.mainTabsContainer.nativeElement.scrollLeft;
  }

  onMouseLeave(): void {
    this.isDown = false;
  }

  onMouseUp(): void {
    this.isDown = false;
  }

  onMouseMove(e: MouseEvent): void {
    if (!this.isDown) return;
    e.preventDefault();
    const x = e.pageX - this.mainTabsContainer.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2; // scroll-fast
    this.mainTabsContainer.nativeElement.scrollLeft = this.scrollLeft - walk;
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
