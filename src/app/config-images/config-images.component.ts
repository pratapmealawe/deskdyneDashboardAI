import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-config-images',
  templateUrl: './config-images.component.html',
  styleUrls: ['./config-images.component.scss']
})
export class ConfigImagesComponent {
  serverUrl = environment.imageUrl;
  imageUrl: any;
  allImages: any = [];
  imageObj: any = {};
  editMode = false;
  addnewImage = false;
  uploadedImageFile: any;
  access: any;

  constructor(private apiMainService: ApiMainService, private modalService: NgbModal, private policyService: PolicyService) {
    this.getAllConfigImages();
    this.access = this.policyService.getCurrentButtonPolicy();
  }

  async getAllConfigImages() {
    try {
      const allImages = await this.apiMainService.getAllConfigImages();
      if (allImages && allImages.length > 0) {
        this.allImages = allImages;
      } else {
        this.allImages = [];
      }
    } catch (e) {
      console.log('Error while fetching config images ', e);
    }
  }

  addImage() {
    this.editMode = true;
    this.addnewImage = true;
    this.uploadedImageFile = undefined;
    this.imageUrl = undefined;
  }

  async submitnewVariable(imageObj: any) {
    try {
      const formData = new FormData();
      if (this.uploadedImageFile) {
        formData.append('image', this.uploadedImageFile);
        formData.append('imageName', imageObj.imageName);
        const allImages = await this.apiMainService.saveConfigImage(formData);
        this.getAllConfigImages();
        this.cancel();
      }
    } catch (e) {
      console.log('Error while fetching config images ', e);
    }

  }
  
  async updateConfigImage(imageObj: any) {
    try {
      const formData = new FormData();
      if (this.uploadedImageFile) {
        formData.append('image', this.uploadedImageFile);
      }
      formData.append('imageName', imageObj.imageName);
      await this.apiMainService.updateConfigImage(imageObj._id, formData);
      this.getAllConfigImages();
      this.cancel()
    } catch (e) {
      console.log('Error while fetching config images ', e);
    }
  }

  cancel() {
    this.editMode = false;
    this.addnewImage = false;
    this.imageObj = {};
  }

  editConfigImage(imageObj: any) {
    this.editMode = true;
    this.addnewImage = false;
    this.imageObj = imageObj;
    this.imageUrl = this.serverUrl + imageObj.imageUrl;
  }

  handleFileInput($event: any) {
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
        this.uploadedImageFile = file;
        const fileName = file.name;
        console.log(fileName);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (_event) => {
          const imageUrl = reader.result;
          this.imageUrl = imageUrl;
        }
      }
    }
  }
}
