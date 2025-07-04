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

  selectedTab: string = 'orgDetails';
  selectedSubTab: string = '';
  selectedChildTab: string = '';
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
    { name: 'Employee List', path: 'employeeList' },
    { name: 'Outlet Employee', path: 'outletEmployee' },
    { name: 'Virtual Cafeteria Employee', path: 'vcEmployee' },
    { name: 'Guest Employee', path: 'guestEmployeeList' },
    { name: 'Compliance', path: 'organizationCompliance' },
  ];

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.orgViewList = this.orgViewList.filter(item => this.btnPolicy[item.path] !== false);
    this.initSubTabFor(this.selectedTab);
  }

  goBack(): void {
    this.back.emit(true);
  }

  gotToTab(tab: string): void {
    this.selectedTab = tab;
    this.initSubTabFor(tab);
  }

  goToSubTab(subPath: string): void {
    this.selectedSubTab = subPath;
    this.initChildTabFor(subPath);
  }

  getSubTab(): any[] {
    const main = this.orgViewList.find(item => item.path === this.selectedTab);
    return main?.subTabs || [];
  }

  getChildTabs(): any[] {
    const sub = this.getSubTab().find(item => item.path === this.selectedSubTab || item.name === this.selectedSubTab);
    return sub?.childTabs || [];
  }

  private initSubTabFor(mainPath: string): void {
    const main = this.orgViewList.find(item => item.path === mainPath);
    if (main?.subTabs?.length) {
      const firstSub = main.subTabs[0];
      this.selectedSubTab = firstSub.path || firstSub.name;
      this.initChildTabFor(this.selectedSubTab);
    } else {
      this.selectedSubTab = '';
      this.selectedChildTab = '';
    }
  }

  private initChildTabFor(subPath: string): void {
    const sub = this.getSubTab().find(item => item.path === subPath || item.name === subPath);
    if (sub?.childTabs?.length) {
      this.selectedChildTab = sub.childTabs[0].path;
    } else {
      this.selectedChildTab = '';
    }
  }
}
