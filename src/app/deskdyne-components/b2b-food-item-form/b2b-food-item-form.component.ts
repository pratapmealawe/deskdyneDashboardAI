import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent } from '../../image-cropper/image-cropper.component';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-b2b-food-item-form',
  templateUrl: './b2b-food-item-form.component.html',
  styleUrls: ['./b2b-food-item-form.component.scss']
})
export class B2bFoodItemFormComponent implements OnInit {
  @Input() editType = '';
  @Input() editfoodItemObj: any = {};
  @Output() gotoPreviousState = new EventEmitter();
  imageUrl: any;
  uploadedImageFile: any;
  foodItemObj = {
    itemName: '',
    itemType: 'Veg',
    itemFlavour: 'Sour',
    itemServingType: 'perPerson',
    slab1Price: 0,
    slab2Price: 0,
    slab3Price: 0,
    slab4Price: 0,
    itemDescription: '',
    packagingCost: 0,
    packagingDescription: '',
  };

  constructor(private ddApiMainService: ApiMainService, private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.editfoodItemObj && this.editfoodItemObj._id) {
      this.imageUrl = environment.imageUrl + this.editfoodItemObj.imageUrl;
      this.foodItemObj = this.editfoodItemObj;
      console.log(this.foodItemObj)
    }
  }

  handleFileInput($event: any) {
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
        // this.uploadedImageFile = file;
        const fileName = file.name;
        console.log(fileName);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (_event) => {
          const imageUrl = reader.result;
          try {
            const modalRef: NgbModalRef = this.modalService.open(ImageCropperComponent,
              {
                ariaLabelledBy: 'modal-basic-title', size: 'xl', backdrop: 'static',
                centered: true
              });
            modalRef.result.then((result: any) => {
              console.log('Closed with:', result);
              if (result && result.croppedImages) {
                console.log('croppedImages ', result.croppedImages);
                this.uploadedImageFile = result.croppedImages.file;
                this.imageUrl = result.croppedImages.resizeDataUrl;
              }
            }, (reason: any) => {
              console.log(`Model Dismissed`);
            });
            modalRef.componentInstance.uploadedImageUrl = imageUrl;
            modalRef.componentInstance.imageWidth = 150;
            modalRef.componentInstance.imageHeight = 150;
            modalRef.componentInstance.aspectRatio = 1;
          } catch (e) {
            console.log('error while changes kitchen opened status ', e);
          }
        }
      }
    }
  }

  async addNewItem(item: any) {
    const formData = new FormData();
    if (this.uploadedImageFile) {
      formData.append('image', this.uploadedImageFile);
    }
    console.log(item);
    formData.append('itemName', item.itemName);
    formData.append('itemType', item.itemType);
    formData.append('itemFlavour', item.itemFlavour);
    formData.append('itemServingType', item.itemServingType);
    formData.append('slab1Price', item.slab1Price);
    formData.append('slab2Price', item.slab2Price);
    formData.append('slab3Price', item.slab3Price);
    formData.append('slab4Price', `${item.slab4Price}`);
    formData.append('itemDescription', item.itemDescription);
    formData.append('packagingCost', item.packagingCost);
    formData.append('packagingDescription', item.packagingDescription);
    console.log(formData)
    try {
      await this.ddApiMainService.B2B_fooditemAdd(formData);
      this.goToPreviousPage('new');
    } catch (error) {
      console.log(error)
    }
  }

  async updateFoodItem(item: any) {
    const formData = new FormData();
    if (this.uploadedImageFile) {
      formData.append('image', this.uploadedImageFile);
    }
    console.log(item);
    formData.append('itemName', item.itemName);
    formData.append('itemType', item.itemType);
    formData.append('itemFlavour', item.itemFlavour);
    formData.append('itemServingType', item.itemServingType);
    formData.append('slab1Price', item.slab1Price);
    formData.append('slab2Price', item.slab2Price);
    formData.append('slab3Price', item.slab3Price);
    formData.append('slab4Price', `${item.slab4Price}`);
    formData.append('itemDescription', item.itemDescription);
    formData.append('packagingCost', item.packagingCost);
    formData.append('packagingDescription', item.packagingDescription);
    console.log(formData)
    try {
      await this.ddApiMainService.updateB2BfoodItem(formData, item._id);
      this.goToPreviousPage('new');
    } catch (error) {
      console.log(error)
    }
  }

  goToPreviousPage(action: string) {
    this.gotoPreviousState.emit(action);
  }
}
