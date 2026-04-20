import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkGeneralMenuComponent } from "./bulk-general-menu/bulk-general-menu.component";
import { BulkSelectCafeteriaComponent } from "./bulk-select-cafeteria/bulk-select-cafeteria.component";
import { MaterialModule } from "src/app/material.module";

@Component({
  selector: 'app-bulk',
  standalone: true,
  imports: [CommonModule, BulkGeneralMenuComponent, BulkSelectCafeteriaComponent, MaterialModule],
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.scss']
})
export class BulkComponent {
  @Input() orgObj: any;
  @Input() selectedMainPath: any;
  @Input() selectedMainTabIndex: any;
  selectedSubTabIndex = 0;
  selectedChildTabIndex = 0;
  selectedMainInternalTabIndex = 0;
  isCategoryActive = true;
  selectedCafeteria: any;
  isVendorAssigned: boolean = false;
  showBulkMenuHeader = false;
  isMenuAvailable = false;

  orgViewList = [
    {
      name: 'Bulk Menu Section',
      path: 'bulkMenuSection',
      icon: 'restaurant_menu',
      subTabs: [
        {
          name: 'Meals',
          icon: 'restaurant',
          childTabs: [
            { name: 'Bulk Meals Menu', path: 'bulkMealsMenu', icon: 'groups' },
            { name: 'Individual Meals Menu', path: 'individualMealsMenu', icon: 'person' },
          ],
        },
        {
          name: 'Snacks',
          icon: 'cookie',
          childTabs: [
            { name: 'Bulk Snacks Menu', path: 'bulkSnacksMenu', icon: 'groups' },
            { name: 'Individual Snacks Menu', path: 'individualSnacksMenu', icon: 'person' },
          ],
        },
        {
          name: 'Foodbox',
          icon: 'inventory_2',
          childTabs: [
            { name: 'Pre-Defined Snack Box', path: 'predefinedSnackBoxMenu', icon: 'view_module' },
            { name: 'Customized Snack Box', path: 'customizedSnackBoxMenu', icon: 'tune' },
          ],
        },
        { name: 'Cake', path: 'cakeMenu', icon: 'cake' },
        { name: 'Sweet', path: 'sweetMenu', icon: 'icecream' },
        { name: 'Lux', path: 'luxMenu', icon: 'star' },
        { name: 'Pantry', path: 'pantryMenu', icon: 'kitchen' },
      ],
    },
    {
      name: 'Employee Bulk Menu',
      path: 'employeebulkmenu',
      icon: 'badge',
      subTabs: [
        {
          name: 'Meals',
          icon: 'restaurant',
          childTabs: [
            { name: 'Bulk Meals Menu', path: 'employeebulkMealsMenu', icon: 'groups' },
            { name: 'Individual Meals Menu', path: 'employeeindividualMealsMenu', icon: 'person' },
          ],
        },
        {
          name: 'Snacks',
          icon: 'cookie',
          childTabs: [
            { name: 'Bulk Snacks Menu', path: 'employeebulkSnacksMenu', icon: 'groups' },
            { name: 'Individual Snacks Menu', path: 'employeeindividualSnacksMenu', icon: 'person' },
          ],
        },
        {
          name: 'Foodbox',
          icon: 'inventory_2',
          childTabs: [
            { name: 'Pre-Defined Snack Box', path: 'employeepredefinedSnackBoxMenu', icon: 'view_module' },
            { name: 'Customized Snack Box', path: 'employeecustomizedSnackBoxMenu', icon: 'tune' },
          ],
        },
        { name: 'Cake', path: 'employeecakeMenu', icon: 'cake' },
        { name: 'Sweet', path: 'employeesweetMenu', icon: 'icecream' },
        { name: 'Lux', path: 'employeeluxMenu', icon: 'star' },
        { name: 'Pantry', path: 'employeepantryMenu', icon: 'kitchen' },
      ],
    },
  ];

  get selectedMain(): any {
    return this.orgViewList[this.selectedMainInternalTabIndex];
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

  onMainInternalTabChange(index: number): void {
    this.selectedMainInternalTabIndex = index;
    this.selectedSubTabIndex = 0;
    this.selectedChildTabIndex = 0;
  }

  onChildTabChange(index: number): void {
    this.selectedChildTabIndex = index;
  }


  get isEmployeeMode(): boolean {
    return this.selectedMain?.path === 'employeebulkmenu';
  }

  getCurrentMenuType(): 'cake' | 'sweet' | 'lux' | 'pantry' | 'bulkMeals' | 'individualMeals' | 'bulkSnacks' | 'individualSnacks' | 'predefinedFoodbox' | 'customizedFoodbox' | '' {
    const path = this.selectedChild?.path || this.selectedSub?.path;
    if (!path) return '';

    // Map path to menuType
    const mapping: Record<string, any> = {
      cakeMenu: 'cake',
      sweetMenu: 'sweet',
      luxMenu: 'lux',
      pantryMenu: 'pantry',
      bulkMealsMenu: 'bulkMeals',
      individualMealsMenu: 'individualMeals',
      bulkSnacksMenu: 'bulkSnacks',
      individualSnacksMenu: 'individualSnacks',
      predefinedSnackBoxMenu: 'predefinedFoodbox',
      customizedSnackBoxMenu: 'customizedFoodbox',
      // Employee specific paths
      employeecakeMenu: 'cake',
      employeesweetMenu: 'sweet',
      employeeluxMenu: 'lux',
      employeepantryMenu: 'pantry',
      employeebulkMealsMenu: 'bulkMeals',
      employeeindividualMealsMenu: 'individualMeals',
      employeebulkSnacksMenu: 'bulkSnacks',
      employeeindividualSnacksMenu: 'individualSnacks',
      employeepredefinedSnackBoxMenu: 'predefinedFoodbox',
      employeecustomizedSnackBoxMenu: 'customizedFoodbox'
    };

    return mapping[path] || '';
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
