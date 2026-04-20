import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '@service/toaster.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { environment } from '@environments/environment';
import { AddEditPackageVirtualCafeteriaComponent } from './add-edit-package-virtual-cafeteria/add-edit-package-virtual-cafeteria.component';

@Component({
  selector: 'app-virtual-cafeteria-package',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './virtual-cafeteria-package.component.html',
  styleUrls: ['./virtual-cafeteria-package.component.scss']
})
export class VirtualCafeteriaPackageComponent {
  @Input() packages: any[] = [];
  @Input() orgObj: any;
  @Input() selectedCafeteria: any;
  @Input() addNew: boolean = false;
  
  @Output() refreshData = new EventEmitter<void>();

  serverUrl = environment.mlImageUrl;

  constructor(
    private apiMainService: ApiMainService,
    private modalService: MatDialog,
    private confirmationModalService: ConfirmationModalService,
    private toaster: ToasterService
  ) {}

  get cafeteriaId(): string {
    return this.selectedCafeteria?.cafeteria_id;
  }

  createPackages() {
    const dialogRef = this.modalService.open(AddEditPackageVirtualCafeteriaComponent, {
      width: '800px',
      data: {
        orgObj: this.orgObj,
        addNew: true,
        selectedCafeteria: this.selectedCafeteria,
        alreadyPackages: this.packages.map((e: any) => e.masterMenuId)
      },
      autoFocus: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(() => this.refreshData.emit());
  }

  editPackage(p: any) {
    const dialogRef = this.modalService.open(AddEditPackageVirtualCafeteriaComponent, {
      width: '800px',
      data: {
        orgObj: this.orgObj,
        addNew: false,
        selectedCafeteria: this.selectedCafeteria,
        alreadyPackages: this.packages
          .filter((e: any) => e.masterMenuId !== p.masterMenuId)
          .map((e: any) => e.masterMenuId),
        editPackage: p
      },
      autoFocus: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(() => this.refreshData.emit());
  }

  async changePackageStatus(status: boolean, masterMenuId: string) {
    try {
      await this.apiMainService.changePackageStatus({ status, mealId: masterMenuId, cafeteriaId: this.cafeteriaId });
      this.toaster.success("Status updated");
      this.refreshData.emit();
    } catch (error) {
      console.error("❌ Status update failed", error);
      this.toaster.error("Status update failed");
    }
  }

  deletePackage(item: any) {
    this.confirmationModalService.modal({
      msg: `Are you sure you want to delete ${item.packageName}?`,
      callback: async () => {
        try {
          await this.apiMainService.deleteMealItem({ cafeteriaId: this.cafeteriaId, masterMenuId: item.masterMenuId });
          this.toaster.success(`Package deleted`);
          this.refreshData.emit();
        } catch (err) {
          console.error(`❌ Delete error:`, err);
          this.toaster.error(`Delete failed. No changes applied.`);
        }
      },
      context: this
    });
  }
}
