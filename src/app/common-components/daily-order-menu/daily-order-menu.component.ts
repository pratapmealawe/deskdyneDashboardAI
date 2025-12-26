import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';
import { ToasterService } from 'src/app/toaster/toaster.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { AddDailyOrderMenuComponent } from './add-daily-order-menu/add-daily-order-menu.component';
import { AddSubTypeDailyOrderMenuComponent } from './add-sub-type-daily-order-menu/add-sub-type-daily-order-menu.component';
import { AddVendorDailyOrderMenuComponent } from './add-vendor-daily-order-menu/add-vendor-daily-order-menu.component';

@Component({
  selector: 'app-daily-order-menu',
  templateUrl: './daily-order-menu.component.html',
  styleUrls: ['./daily-order-menu.component.scss']
})
export class DailyOrderMenuComponent implements OnInit {
  @Input() orgObj: any;
  selectedCafeteria: any;
  selectedCafeteriaName: any;
  selectedCafeteriaId: any;
  mealFilter: string = 'All Meal Types';

  displayedColumns: string[] = ['mealType', 'moq', 'charge', 'timeWindow', 'cutOff', 'sameDay', 'actions'];
  deliverySettings: any[] = [];
  vendorDetails: any;

  constructor(
    private apiMainService: ApiMainService,
    private modalService: MatDialog,
    private confirmationModalService: ConfirmationModalService,
    private toaster: ToasterService,
  ) { }

  ngOnInit(): void {
    if (this.orgObj && this.orgObj.cafeteriaList && this.orgObj.cafeteriaList.length > 0) {
      this.selectedCafeteria = this.orgObj.cafeteriaList[0];
      this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
      this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
    }
    this.getDailyOrderMenuByCafeteriaId();
  }

  getDailyOrderMenuByCafeteriaId() {
    this.apiMainService.getDailyOrderMenuByCafeteriaId(this.selectedCafeteriaId).then((res: any) => {
      this.vendorDetails = res.vendorDetails;
      this.deliverySettings = res.mealTypeList;
      console.log(this.deliverySettings);
    }).catch((err: any) => {
      console.log(err);
      this.toaster.error('Failed to fetch daily order menu');
    })
  }

  onCafeteriaChange(event: any) {
    this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
    this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
    this.getDailyOrderMenuByCafeteriaId();
  }

  openModal(component: any, data: any) {
    const dialogRef = this.modalService.open(component, {
      width: '800px',
      data,
      autoFocus: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getDailyOrderMenuByCafeteriaId();
    });
  }

  addDeliverySettings() {
    const payload = {
      organization_name: this.orgObj.organization_name,
      organizationId: this.orgObj._id,
      cafeteriaId: this.selectedCafeteriaId,
      cafeteriaName: this.selectedCafeteriaName,
    }
    this.openModal(AddDailyOrderMenuComponent, payload);
  }

  onEdit(element: any) {
    const payload = {
      organization_name: this.orgObj.organization_name,
      organizationId: this.orgObj._id,
      cafeteriaId: this.selectedCafeteriaId,
      cafeteriaName: this.selectedCafeteriaName,
      mealType: element,
    }
    this.openModal(AddDailyOrderMenuComponent, payload);
  }

  onDelete(element: any) {
    this.confirmationModalService.modal(
      `Are you sure, you want to delete ${element.selectedMealType} meal type`,
      () => this.deleteMealType(element),
      this
    );
  }

  deleteMealType(element: any): void {
    const payload = {
      cafeteriaId: this.selectedCafeteriaId,
      selectedMealType: element.selectedMealType,
    }
    this.apiMainService.deleteMealType(payload).then((res: any) => {
      this.toaster.success('Meal type deleted successfully');
      this.getDailyOrderMenuByCafeteriaId();
    }).catch((err: any) => {
      console.log(err);
      this.toaster.error('Failed to delete meal type');
    })
  }

  onAddSubMenu(selectedMealType: any) {
    const payload = {
      organization_name: this.orgObj.organization_name,
      organizationId: this.orgObj._id,
      cafeteriaId: this.selectedCafeteriaId,
      cafeteriaName: this.selectedCafeteriaName,
      selectedMealType: selectedMealType,
    }
    this.openModal(AddSubTypeDailyOrderMenuComponent, payload);
  }

  onEditSubMenu(selectedMealType: any, element: any) {
    const payload = {
      cafeteriaId: this.selectedCafeteriaId,
      selectedMealType: selectedMealType,
      mealConfigId: element._id,
      mealConfigData: element,
    }
    this.openModal(AddSubTypeDailyOrderMenuComponent, payload);
  }

  onDeleteSubMenu(selectedMealType: any, element: any) {
    this.confirmationModalService.modal(
      `Are you sure, you want to delete ${element.itemName} meal type`,
      () => this.deleteSubMealType(selectedMealType, element),
      this
    );
  }

  deleteSubMealType(selectedMealType: any, element: any): void {
    const payload = {
      cafeteriaId: this.selectedCafeteriaId,
      selectedMealType: selectedMealType,
      mealConfigId: element._id,
    }
    this.apiMainService.deleteMealConfig(payload).then((res: any) => {
      this.toaster.success('Meal type deleted successfully');
      this.getDailyOrderMenuByCafeteriaId();
    }).catch((err: any) => {
      console.log(err);
      this.toaster.error('Failed to delete meal type');
    })
  }

  isActiveAndDeActiveMealConfig(selectedMealType: any, element: any): void {
    element.isActive = !element.isActive;
    const payload = {
      cafeteriaId: this.selectedCafeteriaId,
      selectedMealType: selectedMealType,
      mealConfigId: element._id,
      isActive: element.isActive,
    }
    this.apiMainService.isActiveAndDeActiveMealConfig(payload).then((res: any) => {
      this.toaster.success(`${element.isActive ? 'Meal type activated successfully' : 'Meal type deactivated successfully'}`);
      setTimeout(() => {
        this.getDailyOrderMenuByCafeteriaId();
      }, 1000);
    }).catch((err: any) => {
      console.log(err);
      this.toaster.error('Failed to update meal type status');
    })
  }

  assignVendor() {
    const payload = {
      organization_name: this.orgObj.organization_name,
      organizationId: this.orgObj._id,
      cafeteriaId: this.selectedCafeteriaId,
      cafeteriaName: this.selectedCafeteriaName,
    }
    this.openModal(AddVendorDailyOrderMenuComponent, payload);
  }

  changeVendor() {
    const payload = {
      organization_name: this.orgObj.organization_name,
      organizationId: this.orgObj._id,
      cafeteriaId: this.selectedCafeteriaId,
      cafeteriaName: this.selectedCafeteriaName,
      vendorDetails: this.vendorDetails,
    }
    this.openModal(AddVendorDailyOrderMenuComponent, payload);
  }
}
