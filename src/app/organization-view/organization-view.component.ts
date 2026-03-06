import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-organization-view',
  templateUrl: './organization-view.component.html',
  styleUrls: ['./organization-view.component.scss'],
})
export class OrganizationViewComponent implements OnInit {
  @Input() organization: any;
  @Output() back = new EventEmitter<boolean>();
  @ViewChild('mainTabsContainer') mainTabsContainer!: ElementRef;

  isDown = false;
  startX = 0;
  scrollLeft = 0;
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
  isCategoryActive = true;
  selectedCafeteria: any;
  isVendorAssigned: boolean = false;
  showBulkMenuHeader = false;
  isMenuAvailable = false;

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.orgViewList = this.orgViewList.filter((item) => this.btnPolicy[item.path] !== false);
    this.initializeTabs();
    this.initializeCafeteria();
  }

  goBack(): void {
    this.back.emit(true);
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

  onChildTabChange(index: number): void {
    this.selectedChildTabIndex = index;
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

  get selectedMainPath(): string | undefined {
    return this.orgViewList[this.selectedMainTabIndex]?.path;
  }

  checkVendorAssigned(event: any): void {
    this.isVendorAssigned = event;
  }

  onMenuAvailabilityChange(hasMenu: boolean): void {
    setTimeout(() => {
      this.isMenuAvailable = hasMenu;
    });
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

  private initializeCafeteria(): void {
    if (this.organization?.cafeteriaList?.length > 0) {
      this.selectedCafeteria = this.organization.cafeteriaList[0];
    }
  }

  onCafeteriaChanged(event: any): void {
    this.selectedCafeteria = event.selectedCafeteria;
  }

  onCategoryActiveChanged(event: boolean): void {
    this.isCategoryActive = event;
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