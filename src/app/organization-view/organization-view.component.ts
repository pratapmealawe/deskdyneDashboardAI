import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-organization-view',
  templateUrl: './organization-view.component.html',
  styleUrls: ['./organization-view.component.scss'],
})
export class OrganizationViewComponent implements OnInit {
  @Input() organization: any;
  @Output() back = new EventEmitter<boolean>();

  // Selected indices for Material Tabs
  selectedMainTabIndex = 0;
  selectedSubTabIndex = 0;
  selectedChildTabIndex = 0;

  btnPolicy: any;

  orgViewList = [
    { name: 'Org Details', path: 'orgDetails' },
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
      ],
    },
    { name: 'MealAwe Outlet', path: 'mealAweOutlet' },
    { name: 'B2B Weekly Menu', path: 'b2bWeeklyMenu' },
    { name: 'Consumption Menu', path: 'consumptionOrder' },
    { name: 'Employee List', path: 'employeeList' },
    { name: 'Outlet Employee', path: 'outletEmployee' },
    { name: 'Virtual Cafeteria Employee', path: 'vcEmployee' },
    { name: 'Guest Employee', path: 'guestEmployeeList' },
    { name: 'Compliance', path: 'organizationCompliance' },
    { name: 'Employee wallet', path: 'employeeWallet' },
  ];

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();

    // Filter based on policy
    this.orgViewList = this.orgViewList.filter(
      (item) => this.btnPolicy[item.path] !== false
    );

    this.initializeTabs();
  }

  goBack(): void {
    this.back.emit(true);
  }

  // Initialize first tab/subtab/child tab
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

  // When a main tab is changed
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

  // When a sub tab is changed
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
}
