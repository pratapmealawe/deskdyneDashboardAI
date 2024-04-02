import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-outlet-menu',
  templateUrl: './outlet-menu.component.html',
  styleUrls: ['./outlet-menu.component.scss']
})
export class OutletMenuComponent implements OnInit {
  @Input() outletObj: any;
  categorySelected: boolean = false;
  form: any;
  selectedCategory: any;
  subcategoryList: any = [];
  uploadedImageFile: any;
  imageUrl: any;
  displayImgUrl = environment.imageUrl;
  showCard:any = false;
  menuList:any = [];
  menuIndex: any = 0;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private apiMainService: ApiMainService) { }

  ngOnInit(): void {
    this.init();
    this.createForm();
    this.patchFormValue();
  }

  init(){
    if(this.outletObj.menuList && this.outletObj.menuList.length > 0){
      this.showCard = true;
    }
  }

  addMenuItem(){
    this.showCard = !this.showCard
  }

  patchFormValue() {
    
  }

  createForm() {
    this.form = this.fb.group({
      taxGroup: [''],
      itemName: [''],
      price: [''],
      priority: [''],
      transferPrice: [''],
      category: [''],
      subCategory: [''],
      code: [''],
      recommended: [false],
      isSpicy: [false],
      isVeg: [false],
      isActive: [false],
      mealVoucherApplicable: [false],
      isPrePrepared: [false],
      priceIncludesTax: [false],
      hideItemPrice: [false],
      mrp: [''],
      description: [''],
      calories: [''],
      parcelChargeType: [''],
      parcelChargeValue: [''],
      // isEnabledInventory:[''],
      // reorderQuantity:[''],
      // availableStock:[''],
    })
  }

  setCategory(event: any) {
    this.selectedCategory = event.target.value;
    this.categorySelected = true;
    this.setSubCategoryList();
  }

  setSubCategoryList() {
    this.outletObj.category.forEach((el: any) => {
      if (el.name === this.selectedCategory) {
        this.subcategoryList = el.subCategories
      }
    })
  }

  handleFileInput($event: any) {
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
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

  async submit() {
    try {
      this.menuList = [];
      this.menuList.push(this.form.value);
      const finalObj = { ...this.outletObj, menuList:this.menuList };
      const formData = this.objectToFormData(finalObj);
      if(this.uploadedImageFile){
        formData.append('image',this.uploadedImageFile)
      }
      console.log(formData)
      const res = await this.apiMainService.updateOutlet(this.outletObj._id, formData,this.menuIndex);
    } catch (error) {
      console.log(error);
    }
  }

  objectToFormData(obj: any, formData = new FormData(), parentKey = '') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let keyName = parentKey ? `${parentKey}[${key}]` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          this.objectToFormData(obj[key], formData, keyName);
        } else if (Array.isArray(obj[key])) {
          obj[key].forEach((item: any, index: any) => {
            if (typeof item === 'object' && item !== null) {
              this.objectToFormData(item, formData, `${keyName}[${index}]`);
            } else {
              formData.append(`${keyName}[${index}]`, item);
            }
          });
        } else {
          formData.append(keyName, obj[key]);
        }
      }
    }
    return formData;
  }

}
