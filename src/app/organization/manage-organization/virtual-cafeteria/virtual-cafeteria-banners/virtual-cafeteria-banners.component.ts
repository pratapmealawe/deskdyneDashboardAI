import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { MaterialModule } from 'src/app/material.module';
import { ImageCropperComponent } from 'src/app/common-components/image-cropper/image-cropper.component';
import { ToasterService } from '@service/toaster.service';
import { environment } from '@environments/environment';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-virtual-cafeteria-banners',
  standalone: true,
  imports: [CommonModule, MaterialModule, DragDropModule],
  templateUrl: './virtual-cafeteria-banners.component.html',
  styleUrls: ['./virtual-cafeteria-banners.component.scss']
})
export class VirtualCafeteriaBannersComponent implements OnInit {
  banners: string[] = [];
  isLoading = false;
  serverUrl = environment.imageUrl;
  cafeteriaId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<VirtualCafeteriaBannersComponent>,
    private api: ApiMainService,
    private dialog: MatDialog,
    private toaster: ToasterService
  ) {
    this.cafeteriaId = data.cafeteriaId;
    this.banners = [...(data.banners || [])];
  }

  ngOnInit(): void { }

  async onImageSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageUrl = reader.result;
      const dialogRef = this.dialog.open(ImageCropperComponent, {
        width: '600px',
        maxWidth: '95vw',
        data: {
          imageUrl: imageUrl,
          imageWidth: 1200,
          imageHeight: 400,
          aspectRatio: 3 // Banners are usually wide
        }
      });

      dialogRef.afterClosed().subscribe(async (result) => {
        if (result && result.confirm && result.croppedImages) {
          await this.uploadBanner(result.croppedImages.file);
        }
      });
    };
    event.target.value = '';
  }

  async uploadBanner(file: File) {
    this.isLoading = true;
    try {
      const fd = new FormData();
      fd.append('file', file);
      
      const res: any = await this.api.uploadImage(fd);
      if (res && res.imageUrl) {
        await this.api.addVirtualCafeteriaBannerImage({ 
          cafeteriaId: this.cafeteriaId, 
          imageUrl: res.imageUrl 
        });
        this.banners.push(res.imageUrl);
        this.toaster.success('Banner added successfully');
      }
    } catch (error) {
      console.error('Banner upload error:', error);
      this.toaster.error('Failed to upload banner');
    } finally {
      this.isLoading = false;
    }
  }

  async deleteBanner(imageUrl: string, index: number) {
    try {
      await this.api.deleteVirtualCafeteriaBannerImage({ 
        cafeteriaId: this.cafeteriaId, 
        imageUrl 
      });
      this.banners.splice(index, 1);
      this.toaster.success('Banner deleted');
    } catch (error) {
      this.toaster.error('Failed to delete banner');
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.banners, event.previousIndex, event.currentIndex);
    this.updateOrder();
  }

  async updateOrder() {
    try {
      await this.api.updateVirtualCafeteriaBannerImages({ 
        cafeteriaId: this.cafeteriaId, 
        bannerImages: this.banners 
      });
      this.toaster.success('Order updated');
    } catch (error) {
      this.toaster.error('Failed to update order');
    }
  }

  close() {
    this.dialogRef.close(this.banners);
  }
}
