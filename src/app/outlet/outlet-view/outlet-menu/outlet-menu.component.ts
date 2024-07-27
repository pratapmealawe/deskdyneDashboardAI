import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
  @ViewChild("content") content: any;
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
  showUpdateBtn:any = false;
  imageReplaced:any = false;
  noImages:boolean = false;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private apiMainService: ApiMainService) { }

  ngOnInit(): void {
    this.init();
    this.createForm();
  }

  init(){
    if(this.outletObj.menuList && this.outletObj.menuList.length > 0){
      this.showCard = true;
    }
  }

  patchFormValue(item:any) {
    this.form.patchValue({
      itemName: item.itemName,
      price: item.price,
      subcidyAmt: item.subcidyAmt,
      category: item.category,
      subCategory: item.subCategory,
      itemType: item.itemType,
      isActive: item.isActive,
      description: item.description
    })
  }

  createForm() {
    this.form = this.fb.group({
      itemName: [''],
      price: [''],
      priority: ['1'],
      subcidyAmt: [''],
      category: [''],
      subCategory: [''],
      code: [''],
      recommended: [false],
      isSpicy: [false],
      itemType: ['Veg'],
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
                this.imageReplaced = true;
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

  async edit(item:any, index:any){
    this.imageUrl = item.imageUrl;
    this.showUpdateBtn = true;
    this.menuIndex = index;
    this.patchFormValue(item);
    this.open();
  }

  async updateMenu(index:any){
    try {
      const oldMenuItem = this.outletObj.menuList[index];
      this.outletObj.menuList.splice(index,1,this.form.value);
      this.outletObj.menuList[index].imageUrl = oldMenuItem.imageUrl;
      const formData = this.objectToFormData(this.outletObj);
      console.log(this.uploadedImageFile)
      if(this.uploadedImageFile){
        formData.append('image',this.uploadedImageFile);
      }
      else{
        this.noImages = true;
        index = null;
      }
      const res = this.noImages ? await this.apiMainService.updateOutletNoImages(this.outletObj._id, this.outletObj) : await this.apiMainService.updateOutlet(this.outletObj._id, formData,index);
      this.outletObj = res;
      this.resetValues();
    } catch (error) {
      console.log(error)
    }
  }

  resetValues(){
    this.form.reset();
    this.menuIndex = 0;
    this.imageUrl = '';
    this.uploadedImageFile = '';
    this.showUpdateBtn = false;
    this.imageReplaced = false;
    this.noImages = false;
  }

  async submit() {
    try {
      this.menuList = [];
      this.menuList = this.outletObj.menuList;
      this.menuList.push(this.form.value);
      this.menuIndex = this.outletObj.menuList.length - 1;
      const finalObj = { ...this.outletObj, menuList:this.menuList };
      const formData = this.objectToFormData(finalObj);
      console.log(this.uploadedImageFile)
      if(this.uploadedImageFile){
        formData.append('image',this.uploadedImageFile)
      }
      else{
        this.menuIndex = null;
      }
      const res = await this.apiMainService.updateOutlet(this.outletObj._id, formData,this.menuIndex);
      if(res && res._id){
        this.outletObj = res;
        this.showCard = true;
      }
      this.resetValues()
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

  open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then((result) => {
        console.log(`Closed with: ${result}`);
        if (result === 'add') {
          this.submit();
        }
        else if(result === 'update'){
          this.updateMenu(this.menuIndex);
        }
      }, (reason) => {
        console.log(`Model Dismissed`);
      });
  }

}
