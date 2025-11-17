import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { AddEditPackageMealaweOutletComponent } from './add-edit-package-mealawe-outlet/add-edit-package-mealawe-outlet.component';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';

@Component({
  selector: 'app-mealawe-outlet',
  templateUrl: './mealawe-outlet.component.html',
  styleUrls: ['./mealawe-outlet.component.scss']
})
export class MealaweOutletComponent implements AfterViewInit {
  @Input() orgObj: any;
  serverUrl = environment.mlImageUrl;
  cafeteriaList: any = [];
  selectedCafeteria: any = {};
  mealPackages: any = {};

  constructor(
    private apiMainService: ApiMainService,
    private modalService: MatDialog,
    private cd: ChangeDetectorRef,
    private confirmationModalService: ConfirmationModalService) { }

  ngAfterViewInit(): void {
    this.cafeteriaList = [...this.orgObj.cafeteriaList];
    if (this.cafeteriaList.length > 0) {
      this.selectedCafeteria = this.cafeteriaList[0];
      this.cd.detectChanges();
      this.getMealAweOutletByCafeteria();
    }
  }

  async getMealAweOutletByCafeteria(): Promise<void> {
    try {
      const value = await this.apiMainService.getMealAweOutletByCafeteria(this.selectedCafeteria._id);
      this.mealPackages = value;
      console.log(this.mealPackages, 'mealPackages')
      this.cd.detectChanges();
    } catch (error) {
      console.error("❌ getMealAweOutletByCafeteria failed", error);
    }
  }

  openMealPackageList(): void {
    const data = {
      orgObj: this.orgObj,
      addNew: !(this.mealPackages?.itemList?.length > 0),
      selectedCafeteria: this.selectedCafeteria,
      alreadyPackages: this.mealPackages?.itemList?.map((e: any) => e.masterMenuId) || []
    }
    const dialogRef = this.modalService.open(AddEditPackageMealaweOutletComponent, {
      width: '800px',
      data,
      disableClose: false,
      autoFocus: true,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getMealAweOutletByCafeteria();
    });
  }

  async changePackageStatus(status: any, mealId: any) {
    try {
      const payload =
      {
        status,
        mealId,
        cafeteriaId: this.selectedCafeteria._id
      }
      await this.apiMainService.changePackageStatus(payload);
      this.getMealAweOutletByCafeteria();
    } catch (error) {
      console.error("❌ Update failed", error);
    }
  }

  async updateMealAweOutlet(): Promise<void> {
    try {
      await this.apiMainService.updateMealAweOutlet(this.mealPackages._id, this.mealPackages);
    } catch (error) {
      console.error("❌ Update failed", error);
    }
  }

  updatePackage(pkg: any) {
    if (!pkg || !pkg._id) {
      console.error("❌ Invalid package");
      return;
    }
    pkg.editing = false;
    this.updateMealAweOutlet()
  }

deletePackage(meal: any) {
  const masterMenuId = meal.masterMenuId; 
  const cafeteriaId = this.selectedCafeteria?._id;
  if (!masterMenuId || !cafeteriaId) {
    console.error("❌ Missing masterMenuId or cafeteriaId");
    return;
  }

  this.confirmationModalService.modal(
    `Are you sure you want to delete ${meal.packageName} package?`,
    async () => {
      try {
        const payload = {
          cafeteriaId,
          masterMenuId
        };
        const res = await this.apiMainService.deleteMealItem(payload);
        console.log("🗑️ Deleted:", res);
        // refresh UI
        this.getMealAweOutletByCafeteria();
      } catch (err) {
        console.error("❌ Delete error:", err);
      }
    },
    this
  );
}


}