import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@environments/environment';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { PolicyService } from '@service/policy.service';
import { ToasterService } from '@service/toaster.service';

@Component({
  selector: 'app-config-images',
  templateUrl: './config-images.component.html',
  styleUrls: ['./config-images.component.scss']
})
export class ConfigImagesComponent {
  serverUrl = environment.imageUrl;
  imageUrl: any;
  allImages: any[] = [];
  imageObj: any = {};
  editMode = false;
  addnewImage = false;
  uploadedImageFile: any;
  access: any;

  isLoading: boolean = false;
  hasError: boolean = false;
  saving: boolean = false;
  searchTerm: string = '';

  constructor(
    private apiMainService: ApiMainService,
    private modalService: NgbModal,
    private policyService: PolicyService,
    private toasterService: ToasterService
  ) {
    this.access = this.policyService.getCurrentButtonPolicy();
  }

  ngOnInit(): void {
    this.getAllConfigImages();
  }

  async getAllConfigImages(): Promise<void> {
    this.isLoading = true;
    this.hasError = false;
    try {
      const allImages = await this.apiMainService.getAllConfigImages();
      this.allImages = Array.isArray(allImages) && allImages.length > 0 ? allImages : [];
    } catch (e) {
      console.error('Error fetching config images:', e);
      this.hasError = true;
      this.toasterService.error('Failed to load config images');
    } finally {
      this.isLoading = false;
    }
  }

  retryLoad(): void {
    this.getAllConfigImages();
  }

  get filteredImages(): any[] {
    if (!this.searchTerm?.trim()) return this.allImages;
    const term = this.searchTerm.toLowerCase().trim();
    return this.allImages.filter((img: any) =>
      img.imageName?.toLowerCase().includes(term)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
  }

  addImage(): void {
    this.editMode = true;
    this.addnewImage = true;
    this.uploadedImageFile = undefined;
    this.imageUrl = undefined;
    this.imageObj = {};
  }

  async submitnewVariable(imageObj: any): Promise<void> {
    if (!imageObj?.imageName?.trim()) {
      this.toasterService.error('Please enter an image name');
      return;
    }
    if (!this.uploadedImageFile) {
      this.toasterService.error('Please upload an image');
      return;
    }

    this.saving = true;
    try {
      const formData = new FormData();
      formData.append('image', this.uploadedImageFile);
      formData.append('imageName', imageObj.imageName.trim());
      await this.apiMainService.saveConfigImage(formData);
      this.toasterService.success('Image added successfully');
      this.getAllConfigImages();
      this.cancel();
    } catch (e) {
      console.error('Error saving config image:', e);
      this.toasterService.error('Failed to save image');
    } finally {
      this.saving = false;
    }
  }

  async updateConfigImage(imageObj: any): Promise<void> {
    if (!imageObj?.imageName?.trim()) {
      this.toasterService.error('Please enter an image name');
      return;
    }

    this.saving = true;
    try {
      const formData = new FormData();
      if (this.uploadedImageFile) {
        formData.append('image', this.uploadedImageFile);
      }
      formData.append('imageName', imageObj.imageName.trim());
      await this.apiMainService.updateConfigImage(imageObj._id, formData);
      this.toasterService.success('Image updated successfully');
      this.getAllConfigImages();
      this.cancel();
    } catch (e) {
      console.error('Error updating config image:', e);
      this.toasterService.error('Failed to update image');
    } finally {
      this.saving = false;
    }
  }

  cancel(): void {
    this.editMode = false;
    this.addnewImage = false;
    this.imageObj = {};
    this.imageUrl = undefined;
    this.uploadedImageFile = undefined;
  }

  editConfigImage(imageObj: any): void {
    this.editMode = true;
    this.addnewImage = false;
    this.imageObj = { ...imageObj };
    this.imageUrl = this.serverUrl + imageObj.imageUrl;
  }

  handleFileInput($event: any): void {
    if ($event?.target?.files?.length) {
      const file: File = $event.target.files[0];
      if (file) {
        this.uploadedImageFile = file;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageUrl = reader.result;
        };
      }
    }
  }
}
