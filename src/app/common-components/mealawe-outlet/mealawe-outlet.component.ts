import { AfterViewInit, ChangeDetectorRef, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';
import { ToasterService } from 'src/app/toaster/toaster.service';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { AddEditPackageCategoryComponent } from './add-edit-package-category/add-edit-package-category.component';
import { AddEditPackageMealaweOutletComponent } from './add-edit-package-mealawe-outlet/add-edit-package-mealawe-outlet.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-mealawe-outlet',
  templateUrl: './mealawe-outlet.component.html',
  styleUrls: ['./mealawe-outlet.component.scss']
})
export class MealaweOutletComponent implements AfterViewInit {
  @Input() orgObj: any;
  serverUrl = environment.mlImageUrl;
  serverDDUrl = environment.imageUrl;
  cafeteriaList: any[] = [];
  selectedCafeteria: any = {};
  mealOutlet: any = {};
  categories: any[] = [];
  packages: any[] = [];
  @ViewChild('categoryDialog') categoryDialogTemplate!: TemplateRef<any>;
  @ViewChild('editCategoryDialog') editCategoryDialogTemplate!: TemplateRef<any>;
  constructor(
    private apiMainService: ApiMainService,
    private modalService: MatDialog,
    private confirmationModalService: ConfirmationModalService,
    private toaster: ToasterService,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.cafeteriaList = [...(this.orgObj?.cafeteriaList || [])];
    if (this.cafeteriaList.length > 0) {
      this.selectedCafeteria = this.cafeteriaList[0];
      this.cd.detectChanges();
      this.getMealAweOutletByCafeteria();
    }
  }

  get addNew(): boolean {
    return !this.mealOutlet?.cafeteriaDetails;
  }

  get cafeteriaId(): any {
    return this.selectedCafeteria?._id;
  }

  async getMealAweOutletByCafeteria(): Promise<void> {
    try {
      this.mealOutlet = await this.apiMainService.getMealAweOutletByCafeteria(this.cafeteriaId);
      this.categories = (this.mealOutlet?.categoryConfig || []).map((c: any) => ({
        ...c,
        editing: false,
        _previewImage: c.categoryImg ? this.serverDDUrl + c.categoryImg : null,
        _previewBanners: (c.categoryBanners || []).map((b: string) => this.serverDDUrl + b),
        _deleteBanners: [],
        _newImageFile: null,
        _newBannerFiles: []
      }));
      this.packages = (this.mealOutlet?.itemList || []).map((p: any) => ({
        ...p,
        editing: false
      }));
      this.cd.detectChanges();
    } catch (error) {
      console.error("❌ Loading failed", error);
      this.toaster.error("Unable to load cafeteria details");
    }
  }

  async updateMealAweOutlet() {
    try {
      const payload = {
        ...this.mealOutlet,
        itemList: this.packages,
        categoryConfig: this.categories
      };
      await this.apiMainService.updateMealAweOutlet(this.mealOutlet?._id, payload);
      this.toaster.success("Updated successfully");
      this.getMealAweOutletByCafeteria();
    } catch (error) {
      console.error("❌ Update failed", error);
      this.toaster.error("Update failed");
    }
  }

  openModal(component: any, data: any) {
    const dialogRef = this.modalService.open(component, {
      width: '800px',
      data,
      autoFocus: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(() => this.getMealAweOutletByCafeteria());
  }

  createPackages() {
    this.openModal(AddEditPackageMealaweOutletComponent, {
      orgObj: this.orgObj,
      addNew: this.addNew,
      selectedCafeteria: this.selectedCafeteria,
      alreadyPackages: this.packages.map((e: any) => e.masterMenuId)
    });
  }

  createCategory() {
    this.openModal(AddEditPackageCategoryComponent, {
      orgObj: this.orgObj,
      addNew: this.addNew,
      selectedCafeteria: this.selectedCafeteria,
      alreadyCategory: this.categories.map((e: any) => e.categoryName)
    });
  }

  async changePackageStatus(status: boolean, masterMenuId: string) {
    try {
      await this.apiMainService.changePackageStatus({ status, mealId: masterMenuId, cafeteriaId: this.cafeteriaId });
      this.toaster.success("Status updated");
      this.getMealAweOutletByCafeteria();
    } catch (error) {
      console.error("❌ Status update failed", error);
      this.toaster.error("Status update failed");
    }
  }

  async changeCategoryStatus(status: boolean, id: string) {
    try {
      await this.apiMainService.changeCategoryStatus({ status, id, cafeteriaId: this.cafeteriaId });
      this.toaster.success("Status updated");
      this.getMealAweOutletByCafeteria();
    } catch (error) {
      console.error("❌ Status update failed", error);
      this.toaster.error("Status update failed");
    }
  }

  updatePackage(pkg: any) {
    if (!pkg?._id) return this.toaster.error("Invalid package");
    pkg.editing = false;
    this.updateMealAweOutlet();
  }

  async updateCategory(cat: any) {
    if (!cat?._id) return this.toaster.error("Invalid category");

    try {
      const fd = new FormData();
      fd.append("cafeteriaId", this.cafeteriaId);
      fd.append("categoryId", cat._id);
      if (cat._newImageFile) {
        fd.append("categoryImg", cat._newImageFile);
      }
      if (cat._newBannerFiles?.length > 0) {
        cat._newBannerFiles.forEach((file: any) => fd.append("categoryBanners", file));
      }
      const payload = {
        ...cat,
        _deleteBanners: cat._deleteBanners || []
      };
      fd.append("payload", JSON.stringify(payload));
      await this.apiMainService.updateMealAweOutletCategory(fd);
      this.toaster.success("Category updated successfully");
      this.closeDialog();
      await this.getMealAweOutletByCafeteria();
    } catch (error) {
      console.error("❌ Category update failed", error);
      this.toaster.error("Category update failed. No changes applied.");
    }
  }

  deleteItem(type: 'package' | 'category', item: any) {
    const name = type === 'package' ? item.packageName : item.categoryName;
    const apiCall = type === 'package' ? () => this.apiMainService.deleteMealItem({ cafeteriaId: this.cafeteriaId, masterMenuId: item.masterMenuId }) : () => this.apiMainService.deleteCategoryConfig({ cafeteriaId: this.cafeteriaId, categoryName: item.categoryName });
    this.confirmationModalService.modal(`Are you sure you want to delete ${type === 'package' ? name : 'category' + name}?`, async () => {
      try {
        await apiCall();
        this.toaster.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted`);
        this.getMealAweOutletByCafeteria();
      } catch (err) {
        console.error(`❌ Delete error:`, err);
        this.toaster.error(`Unable to delete ${type}`);
      }
    }, this);
  }

  pickCategoryImage(cat: any) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = (input.files as FileList)[0];
      if (!file) return;
      cat._newImageFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        cat._previewImage = e.target?.result || null;
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }

  pickBannerFiles(cat: any) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = () => {
      const files = Array.from(input.files as FileList);
      if (!files.length) return;
      cat._newBannerFiles = cat._newBannerFiles || [];
      cat._previewBanners = cat._previewBanners || [];
      files.forEach((file) => {
        cat._newBannerFiles.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (result) cat._previewBanners.push(result);
        };
        reader.readAsDataURL(file);
      });
    };
    input.click();
  }

  removePreviewBanner(cat: any, index: number) {
    if (!cat._previewBanners || index < 0 || index >= cat._previewBanners.length) return;
    const existingBanner = cat.categoryBanners?.[index];
    if (existingBanner) {
      cat._deleteBanners = cat._deleteBanners || [];
      cat._deleteBanners.push(existingBanner);
    } else if (cat._newBannerFiles?.[index]) {
      cat._newBannerFiles.splice(index, 1);
    }
    cat._previewBanners.splice(index, 1);
  }

  dropBanner(category: any, event: CdkDragDrop<string[]>) {
    if (!category._previewBanners) return;
    moveItemInArray(category._previewBanners, event.previousIndex, event.currentIndex);
  }

  openCategoryDialog(category: any) {
    this.modalService.open(this.categoryDialogTemplate, {
      width: '800px',
      data: { category, serverDDUrl: this.serverDDUrl },
      autoFocus: true,
      disableClose: false
    });
  }

  openEditCategoryDialog(category: any) {
    this.modalService.open(this.editCategoryDialogTemplate, {
      width: '800px',
      data: { category, serverDDUrl: this.serverDDUrl },
      autoFocus: true,
      disableClose: false
    });
  }


  async createDefaultCategories() {
    try {
      const { _id: cafeteria_id, cafeteria_name, address1, address2, cafeteria_city, cafeteria_location } = this.selectedCafeteria;
      const payload: any = {
        org_id: this.orgObj._id,
        org_name: this.orgObj.organization_name,
        cafeteriaDetails: {
          cafeteria_name,
          address1,
          address2,
          cafeteria_city,
          cafeteria_location,
          cafeteria_id
        }
      };
      await this.apiMainService.createDefaultCategories(payload);
      this.toaster.success("Updated successfully");
      this.getMealAweOutletByCafeteria();
    } catch (error) {
      console.error("❌ Update failed", error);
      this.toaster.error("Update failed");
    }
  }


  closeDialog() {
    this.modalService.closeAll();
  }
}