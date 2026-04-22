import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { OrganizationSharedService } from '../../organization-shared.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BulkGeneralMenuComponent } from "./bulk-general-menu/bulk-general-menu.component";
import { MaterialModule } from "src/app/material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CafeteriaSelectorComponent } from "../cafeteria-selector/cafeteria-selector.component";

@Component({
  selector: 'app-bulk',
  standalone: true,
  imports: [CommonModule, BulkGeneralMenuComponent, MaterialModule, FormsModule, ReactiveFormsModule, CafeteriaSelectorComponent],
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.scss']
})
export class BulkComponent implements OnInit, OnDestroy {
  @ViewChild(BulkGeneralMenuComponent) bulkGeneralMenuComponent!: BulkGeneralMenuComponent;
  
  orgObj: any;
  private orgSub: Subscription | undefined;
  selectedCafeteria: any;

  selectedSubTabIndex = 0;
  selectedChildTabIndex = 0;
  selectedMainInternalTabIndex = 0;

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

  constructor(
    private orgSharedService: OrganizationSharedService
  ) { }

  ngOnInit(): void {
    if (this.orgObj) {
      this.initializeComponent();
    } else {
      this.orgSub = this.orgSharedService.organization$.subscribe(org => {
        if (org) {
          this.orgObj = org;
          this.initializeComponent();
        }
      });
    }
  }

  initializeComponent() {
    this.initializeCafeteria();
  }

  ngOnDestroy() {
    if (this.orgSub) {
      this.orgSub.unsubscribe();
    }
  }

  private initializeCafeteria(): void {
    if (this.orgObj?.cafeteriaList?.length > 0) {
      this.selectedCafeteria = this.orgObj.cafeteriaList[0];
    }
  }

  onCafeteriaChanged(event: any): void {
    this.selectedCafeteria = event.value;
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
}
