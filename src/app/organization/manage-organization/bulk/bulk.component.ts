import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CakeMenuComponent } from "./cake-menu/cake-menu.component";
import { SweetMenuComponent } from "./sweet-menu/sweet-menu.component";
import { LuxMenuComponent } from "./lux-menu/lux-menu.component";
import { PantryMenuComponent } from "./pantry-menu/pantry-menu.component";
import { EmployeeCakeMenuComponent } from "./employee-cake-menu/employee-cake-menu.component";
import { EmployeeSelectCafeteriaComponent } from "./employee-select-cafeteria/employee-select-cafeteria.component";
import { EmployeeSweetMenuComponent } from "./employee-sweet-menu/employee-sweet-menu.component";
import { EmployeeLuxMenuComponent } from "./employee-lux-menu/employee-lux-menu.component";
import { EmployeePantryMenuComponent } from "./employee-pantry-menu/employee-pantry-menu.component";
import { OrgBulkMenuComponent } from "./org-bulk-menu/org-bulk-menu.component";
import { OrgIndividualMenuComponent } from "./org-individual-menu/org-individual-menu.component";
import { OrgBulkSnackboxMenuComponent } from "./org-bulk-snackbox-menu/org-bulk-snackbox-menu.component";
import { OrgIndividualSnackboxMenuComponent } from "./org-individual-snackbox-menu/org-individual-snackbox-menu.component";
import { OrgPredefinedSnackboxMenuComponent } from "./org-predefined-snackbox-menu/org-predefined-snackbox-menu.component";
import { OrgCustomizedSnackboxMenuComponent } from "./org-customized-snackbox-menu/org-customized-snackbox-menu.component";
import { EmployeeBulkMealMenuComponent } from "./employee-bulk-meal-menu/employee-bulk-meal-menu.component";
import { EmployeeIndividualMealMenuComponent } from "./employee-individual-meal-menu/employee-individual-meal-menu.component";
import { EmployeeBulkSnackMenuComponent } from "./employee-bulk-snack-menu/employee-bulk-snack-menu.component";
import { EmployeeIndividualSnackMenuComponent } from "./employee-individual-snack-menu/employee-individual-snack-menu.component";
import { EmployeePredefinedFoodboxMenuComponent } from "./employee-predefined-foodbox-menu/employee-predefined-foodbox-menu.component";
import { EmployeeCustomizedFoodboxMenuComponent } from "./employee-customized-foodbox-menu/employee-customized-foodbox-menu.component";

@Component({
  selector: 'app-bulk',
  standalone: true,
  imports: [CommonModule, CakeMenuComponent, SweetMenuComponent, LuxMenuComponent, PantryMenuComponent, EmployeeCakeMenuComponent, EmployeeSelectCafeteriaComponent, EmployeeSweetMenuComponent, EmployeeLuxMenuComponent, EmployeePantryMenuComponent, OrgBulkMenuComponent, OrgIndividualMenuComponent, OrgBulkSnackboxMenuComponent, OrgIndividualSnackboxMenuComponent, OrgPredefinedSnackboxMenuComponent, OrgCustomizedSnackboxMenuComponent, EmployeeBulkMealMenuComponent, EmployeeIndividualMealMenuComponent, EmployeeBulkSnackMenuComponent, EmployeeIndividualSnackMenuComponent, EmployeePredefinedFoodboxMenuComponent, EmployeeCustomizedFoodboxMenuComponent],
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.scss']
})
export class BulkComponent {
  @Input() orgObj: any;
  @Input() selectedMainPath: any;
  @Input() selectedMainTabIndex: any;
  selectedSubTabIndex = 0;
  selectedChildTabIndex = 0;
  isCategoryActive = true;
  selectedCafeteria: any;
  isVendorAssigned: boolean = false;
  showBulkMenuHeader = false;
  isMenuAvailable = false;

  orgViewList = [
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
      name: 'Employee Bulk Menu',
      path: 'employeebulkmenu',
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
  ];

  get selectedMain(): any {
    return this.orgViewList.find(main => main.path === this.selectedMainPath);
  }

  get selectedSub(): any {
    return this.selectedMain?.subTabs?.[this.selectedSubTabIndex];
  }

  get selectedChild(): any {
    return this.selectedSub?.childTabs?.[this.selectedChildTabIndex];
  }

  // get selectedBulkMenuPath() {
    // // const mainView = this.orgViewList.find(v => v.path === mainPath);
    // // const sub = mainView?.subTabs?.[this.selectedSubTabIndex];
    // let child = sub?.childTabs?.[this.selectedChildTabIndex];

    // if (child?.path === 'predefinedSnackBoxMenu') {
    //   child = { ...child, path: 'predefinedFoodBoxMenu' };
    // } else if (child?.path === 'customizedSnackBoxMenu') {
    //   child = { ...child, path: 'customizedFoodBoxMenu' };
    // }

    // const childPath = child?.path ?? sub?.path;

    // return {
    //   main: mainPath,
    //   sub: sub?.name?.toLowerCase(),
    //   subPath: sub?.path,
    //   child: child?.name,
    //   childPath
    // };
  // }

  private initializeCafeteria(): void {
    if (this.orgObj?.cafeteriaList?.length > 0) {
      this.selectedCafeteria = this.orgObj.cafeteriaList[0];
    }
  }


  onCafeteriaChanged(event: any): void {
    this.selectedCafeteria = event.selectedCafeteria;
  }

  onCategoryActiveChanged(event: boolean): void {
    this.isCategoryActive = event;
  }
  onSubTabChange(index: number): void {
    this.selectedSubTabIndex = index;
    this.selectedChildTabIndex = 0;

  }

  onChildTabChange(index: number): void {
    this.selectedChildTabIndex = index;
  }


  checkVendorAssigned(event: any): void {
    this.isVendorAssigned = event;
  }

  onMenuAvailabilityChange(hasMenu: boolean): void {
    setTimeout(() => {
      this.isMenuAvailable = hasMenu;
    });
  }

}
