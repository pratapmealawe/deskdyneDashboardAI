import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';

@Component({
  selector: 'app-outlet-menu',
  templateUrl: './outlet-menu.component.html',
  styleUrls: ['./outlet-menu.component.scss']
})
export class OutletMenuComponent implements OnInit {
  @Input() outletObj: any;
  categorySelected:boolean = false;
  form: any;
  selectedCategory:any;
  subcategoryList:any = [];
  uploadedMenuImages:any = {};
  menuImages:any = {};
  imageUrl:any

  constructor(private fb: FormBuilder, private modalService: NgbModal, private apiMainService:ApiMainService) { }

  ngOnInit(): void {
    this.createForm();
    this.patchFormValue();
  }

  patchFormValue() {
    if (this.outletObj.menuList && this.outletObj.menuList.length > 0) {
      this.categorySelected = true;
      this.outletObj.menuList.forEach((item: any, index: any) => {
        this.subcategoryList.push(item.subCategory)
        this.addMenuItem();
        this.form.controls.menuList.at(index).patchValue({
          taxGroup: item.taxGroup,
          itemName: item.itemName,
          price: item.price,
          priority: item.priority,
          transferPrice: item.transferPrice,
          category: item.category,
          subCategory: item.subCategory,
          code: item.code,
          recommended: item.recommended,
          isSpicy: item.isSpicy,
          isVeg: item.isVeg,
          isActive: item.isActive,
          mealVoucherApplicable: item.mealVoucherApplicable,
          isPrePrepared: item.isPrePrepared,
          priceIncludesTax: item.priceIncludesTax,
          hideItemPrice: item.hideItemPrice,
          mrp: item.mrp,
          description: item.description,
          calories: item.calories,
          parcelChargeType: item.parcelChargeType,
          parcelChargeValue: item.parcelChargeValue,
        })
      })
    }
  }

  createForm() {
    this.form = this.fb.group({
      menuList: this.fb.array([])
    })
  }

  addMenuItem() {
    this.menuList.push(this.createMenuItem())
  }

  createMenuItem(){
    return this.fb.group({  
      taxGroup:[''],
      itemName:[''],
      price:[''],
      priority:[''],
      transferPrice:[''],
      category:[''],
      subCategory:[''],
      code:[''],
      recommended:[false],
      isSpicy:[false],
      isVeg:[false],
      isActive:[false],
      mealVoucherApplicable:[false],
      isPrePrepared:[false],
      priceIncludesTax:[false],
      hideItemPrice:[false],
      mrp:[''],
      description:[''],
      calories:[''],
      parcelChargeType:[''],
      parcelChargeValue:[''],
      // isEnabledInventory:[''],
      // reorderQuantity:[''],
      // availableStock:[''],
    })
  }

  get menuList():FormArray{
    return this.form.controls.menuList as FormArray;
  }

  removeMenuItem(index:any){
    this.menuList.removeAt(index);
  }

  setCategory(event:any, index:any){
    this.selectedCategory = event.target.value;
    this.categorySelected = true;
    this.setSubCategoryList();
  }

  setSubCategoryList(){
    this.outletObj.category.forEach((el:any)=>{
      if(el.name === this.selectedCategory){
        this.subcategoryList = el.subCategories
      }
    })
  }

  handleFileInput($event: any,filename:string, index:any) {
    console.log(index)
    // const fileToUpload = files.item(0);
    if($event && $event.target && $event.target.files){
      const file:File = $event.target.files[0];
      if (file) {
        // this.uploadedCompliance = file;
        const fileName = file.name;
        console.log(fileName);
        const reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onload =async (_event) => { 
          const imageUrl = reader.result; 
          try{  
            const modalRef: NgbModalRef  = this.modalService.open(ImageCropperComponent, 
              {ariaLabelledBy: 'modal-basic-title', size: 'xl', backdrop: 'static',
              centered: true});
            modalRef.result.then((result:any) => {
              console.log('Closed with:',result);
                  if (result && result.croppedImages){
                    console.log('croppedImages ', result.croppedImages);
                    this.uploadedMenuImages[filename] = result.croppedImages.file;
                    // this.uploadedCompliance[filename+'Old'] = this.compliance[filename];  
                    this.menuImages[filename] = result.croppedImages.resizeDataUrl;
                }
            }, (reason:any) => {
              console.log( `Model Dismissed`);
            });  
            modalRef.componentInstance.uploadedImageUrl = imageUrl; 
            modalRef.componentInstance.imageWidth = 150;
            modalRef.componentInstance.imageHeight = 150; 
            modalRef.componentInstance.aspectRatio = 1; 
          }catch(error){
            console.log('error while changes kitchen opened status ',error);
          } 
        }       
      }
    }    
  }

  async submit(){
    try {
      const finalObj = {...this.outletObj,...this.form.value};
      const formData = this.objectToFormData(finalObj);
      console.log(finalObj)
      const res = await this.apiMainService.updateOutlet(this.outletObj._id,formData);
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
