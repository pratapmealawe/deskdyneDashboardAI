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

  orgViewList = [
    { name: 'Org Details', path: 'orgDetails' },
    {
      name: 'Bulk Menu Section',
      path: 'bulkMenuSection',
      subTabs: [
        { name: 'Bulk Meals Menu', path: 'bulkMealsMenu' },
        { name: 'Individual Meals Menu', path: 'individualMealsMenu' },
        { name: 'Bulk Snacks Menu', path: 'bulkSnacksMenu' },
        { name: 'Individual Snacks Menu', path: 'individualSnacksMenu' },
        { name: 'Pre-Defined Snack Box', path: 'predefinedSnackBoxMenu' },
        { name: 'Customized Snack Box', path: 'customizedSnackBoxMenu' },
      ]
    },
    { name: 'MealAwe Outlet', path: 'mealAweOutlet' },
    { name: 'B2B Weekly Menu', path: 'b2bWeeklyMenu' },
    { name: 'Employee List', path: 'employeeList' },
    { name: 'Outlet Employee', path: 'outletEmployee' },
    { name: 'Guest Employee', path: 'guestEmployeeList' },
    { name: 'Compliance', path: 'organizationCompliance' },
  ];

  selectedTab: string = 'orgDetails';
  selectedSubTab: string = '';
  btnPolicy: any;

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.orgViewList = this.orgViewList.filter(item => this.btnPolicy[item.path] !== false);
    this.initSubTabFor(this.selectedTab);
  }

  gotToTab(tab: string): void {
    this.selectedTab = tab;
    this.initSubTabFor(tab);
  }

  goToSubTab(subPath: string): void {
    this.selectedSubTab = subPath;
  }

  goBack(): void {
    this.back.emit(true);
  }

  getSubTab(): any[] {
    const main = this.orgViewList.find(item => item.path === this.selectedTab);
    return main?.subTabs || [];
  }

  private initSubTabFor(mainPath: string): void {
    const main = this.orgViewList.find(item => item.path === mainPath);
    if (main?.subTabs?.length) {
      this.selectedSubTab = main.subTabs[0].path;
    } else {
      this.selectedSubTab = '';
    }
  }
}
