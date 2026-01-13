import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'src/service/toaster.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-copy-daily-order-menu',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './copy-daily-order-menu.component.html',
  styleUrls: ['./copy-daily-order-menu.component.scss']
})
export class CopyDailyOrderMenuComponent {
  deliverySettings: any[] = [];
  orgList: any[] = [];
  cafeteriaList: any[] = [];
  selectedOrg: any;
  selectedCafeteria: any;

  constructor(
    private dialogRef: MatDialogRef<CopyDailyOrderMenuComponent>,
    private apiMainService: ApiMainService,
    private toaster: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.apiMainService.B2B_fetchFilteredAllOrgs(undefined).then((res: any) => {
      this.orgList = res;
    }).catch((err: any) => {
      this.toaster.error(err.message);
    });
  }

  onOrgChange() {
    this.cafeteriaList = this.selectedOrg?.cafeteriaList || [];
    this.selectedCafeteria = null;
    this.deliverySettings = [];
  }

  onCafeteriaChange() {
    if (this.selectedCafeteria) {
      this.getDailyOrderMenuByCafeteriaId();
    } else {
      this.deliverySettings = [];
    }
  }

  getDailyOrderMenuByCafeteriaId() {
    this.apiMainService.getDailyOrderMenuByCafeteriaId(this.selectedCafeteria.cafeteria_id).then((res: any) => {
      this.deliverySettings = res.mealTypeList;
    }).catch((err: any) => {
      console.log(err);
      this.toaster.error('Failed to fetch daily order menu');
    })
  }

  saveChanges() {
    if (!this.selectedCafeteria) {
      this.toaster.warning('Please select a cafeteria to copy from');
      return;
    }
    const payload = {
      fromCafeteriaId: this.selectedCafeteria.cafeteria_id,
      organization_name: this.data.organization_name,
      organizationId: this.data.organizationId,
      cafeteriaId: this.data.cafeteriaId,
      cafeteriaName: this.data.cafeteriaName
    }
    this.apiMainService.copyDailyOrderMenu(payload).then((res: any) => {
      this.toaster.success('Daily order menu copied successfully');
      this.dialogRef.close();
    }).catch((err: any) => {
      this.toaster.error(`Failed to copy daily order menu`);
    })
  }

  closeModal() {
    this.dialogRef.close();
  }
}
