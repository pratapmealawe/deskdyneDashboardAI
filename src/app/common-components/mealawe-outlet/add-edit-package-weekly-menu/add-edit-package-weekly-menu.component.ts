import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { MlApiMainService } from 'src/service/apiService/mlApiMain.service';

@Component({
  selector: 'app-add-edit-package-weekly-menu',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './add-edit-package-weekly-menu.component.html',
  styleUrls: ['./add-edit-package-weekly-menu.component.scss']
})
export class AddEditPackageWeeklyMenuComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditPackageWeeklyMenuComponent>,
    private apiMainService: ApiMainService,
    private mlApiMainService: MlApiMainService,
  ) { }

  /** BUTTON SOURCES */
  menuSources = [
    { label: 'Mealawe Menu', color: 'primary', action: (data: any) => this.loadMealaweMenu(data) },
    { label: 'Organization Cafe', color: 'accent', action: (data: any) => data.selectedSource = 'otherCafe' },
    { label: 'Other Org Cafe', color: 'warn', action: (data: any) => data.selectedSource = 'otherOrgCafe' },
    { label: 'Custom Menu', color: 'success', action: (data: any) => { data.selectedSource = 'custom'; data.customWeeklyMenu = []; } }
  ];

  menuTypes = ['Veg', 'Non-Veg'];
  mealTimes = ['Breakfast', 'Lunch', 'Dinner'];


  /** LOAD MEAL AWE MENU */
  async loadMealaweMenu(data: any) {
    try {
      const res = await this.mlApiMainService.getWeeklyMenuByCategory(data.category.categoryName);
      data.selectedSource = 'mealawe';

      const clusters: any = await this.mlApiMainService.getAllGeoFencingList();
      data.availableClusters = clusters
        .filter((c: any) => res.clusterIds.includes(c.clusterId))
        .map((c: any) => ({
          clusterId: c.clusterId,
          clusterName: c.clusterName
        }));

      data.uniqueMenus = res.uniqueMenus || [];

    } catch (err) {
      console.error("Error loading menu", err);
    }
  }

  /** When cluster changes */
  onClusterChange(data: any) {
    const matchedMenu = data.uniqueMenus.find((m: any) =>
      m.clusterIds.includes(data.selectedClusterId)
    );

    data.weekMenuList = matchedMenu ? matchedMenu.weekMenuList : [];
  }

  /** List of meals */
  getMenuList(week: any, type: string, meal: string) {
    if (type === 'Veg') {
      return week.vegMenuList;
    } else {
      return week.nonvegMenuList;
    }
  }

  /** Show only category meal */
  getVisibleMeals(data: any) {
    if (!data?.category?.categoryName) return this.mealTimes;
    return this.mealTimes.filter(meal => meal === data.category.categoryName);
  }

  /** Close dialog */
  closeDialog() {
    this.dialogRef.close();
  }
}