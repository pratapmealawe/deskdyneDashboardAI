import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';
import { environment } from 'src/environments/environment';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-outlet-menu',
  templateUrl: './outlet-menu.component.html',
  styleUrls: ['./outlet-menu.component.scss'],
})
export class OutletMenuComponent implements OnInit {
  @Input() outletObj: any;
  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('content') content: any;
  @ViewChild('comboContent') comboContent: any;
  categorySelected: boolean = false;
  form: any;
  selectedCategory: any;
  subcategoryList: any = [];
  uploadedImageFile: any;
  imageUrl: any;
  displayImgUrl = environment.imageUrl;
  showCard: any = false;
  menuList: any = [];
  menuIndex: any = 0;
  showUpdateBtn: any = false;
  imageReplaced: any = false;
  noImages: boolean = false;
  foodItem: any;
  btnPolicy: any;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private apiMainService: ApiMainService,
    private confirmationModalService: ConfirmationModalService,
    private policyService: PolicyService
  ) {}

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.init();
    this.createForm();
  }

  init() {
    if (this.outletObj.menuList && this.outletObj.menuList.length > 0) {
      this.showCard = true;
    }
  }

  patchFormValue(item: any) {
    this.form.patchValue({
      itemName: item.itemName,
      price: item.price,
      subcidyAmt: item.subcidyAmt ? item.subcidyAmt : 0,
      category: item.category,
      subCategory: item.subCategory,
      mealTimingInfo: item.mealTimingInfo
        ? item.mealTimingInfo.map((a: any) => a.mealType)
        : [],
      itemType: item.itemType,
      isActive: item.isActive,
      description: item.description,
      itemContains: item.itemContains,
    });
  }

  createForm() {
    this.form = this.fb.group({
      itemName: [''],
      price: [''],
      priority: ['1'],
      subcidyAmt: 0,
      category: [''],
      subCategory: [''],
      mealTimingInfo: [[]],
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
      itemContains: [[]],
    });
  }

  setCategory(event: any) {
    this.selectedCategory = event.target.value;
    this.categorySelected = true;
    this.setSubCategoryList();
  }

  setSubCategoryList() {
    this.outletObj.category.forEach((el: any) => {
      if (el.name === this.selectedCategory) {
        this.subcategoryList = el.subCategories;
      }
    });
  }

  handleFileInput($event: any) {
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
        const fileName = file.name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (_event) => {
          const imageUrl = reader.result;
          try {
            const modalRef: NgbModalRef = this.modalService.open(
              ImageCropperComponent,
              {
                ariaLabelledBy: 'modal-basic-title',
                size: 'xl',
                backdrop: 'static',
                centered: true,
              }
            );
            modalRef.result.then(
              (result: any) => {
                if (result && result.croppedImages) {
                  this.uploadedImageFile = result.croppedImages.file;
                  this.imageUrl = result.croppedImages.resizeDataUrl;
                  this.imageReplaced = true;
                }
              },
              (reason: any) => {
                console.log(`Model Dismissed`);
              }
            );
            modalRef.componentInstance.uploadedImageUrl = imageUrl;
            modalRef.componentInstance.imageWidth = 150;
            modalRef.componentInstance.imageHeight = 150;
            modalRef.componentInstance.aspectRatio = 1;
          } catch (e) {
            console.log('error while changes kitchen opened status ', e);
          }
        };
      }
    }
  }

  async edit(item: any, index: any) {
    this.imageUrl = item.imageUrl;
    this.showUpdateBtn = true;
    this.menuIndex = index;
    this.patchFormValue(item);
    this.open();
  }

  async updateMenu(index: any) {
    try {
      const oldMenuItem = this.outletObj.menuList[index];
      this.outletObj.menuList.splice(index, 1, this.form.value);
      this.outletObj.menuList[index].imageUrl = oldMenuItem.imageUrl;

      let mealTypes = this.outletObj.menuList[index].mealTimingInfo;

      this.outletObj.menuList[index].mealTimingInfo =
        this.outletObj.mealTiming.filter((meal: any) =>
          mealTypes.includes(meal.mealType)
        );

      const formData = this.objectToFormData(this.outletObj);
      if (this.uploadedImageFile) {
        formData.append('image', this.uploadedImageFile);
      } else {
        this.noImages = true;
        index = null;
      }
      const res = this.noImages
        ? await this.apiMainService.updateOutletNoImages(
            this.outletObj._id,
            this.outletObj
          )
        : await this.apiMainService.updateOutlet(
            this.outletObj._id,
            formData,
            index
          );
      this.outletObj = res;
      this.resetValues();
    } catch (error) {
      console.log(error);
    }
  }

  resetValues() {
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
      let mealTypes = this.menuList[this.menuIndex].mealTimingInfo;

      this.menuList[this.menuIndex].mealTimingInfo =
        this.outletObj.mealTiming.filter((meal: any) =>
          mealTypes.includes(meal.mealType)
        );

      const finalObj = { ...this.outletObj, menuList: this.menuList };
      const formData = this.objectToFormData(finalObj);
      if (this.uploadedImageFile) {
        formData.append('image', this.uploadedImageFile);
      } else {
        this.menuIndex = null;
      }
      const res = await this.apiMainService.updateOutlet(
        this.outletObj._id,
        formData,
        this.menuIndex
      );
      if (res && res._id) {
        this.outletObj = res;
        this.showCard = true;
      }
      this.resetValues();
    } catch (error) {
      console.log(error);
    }
  }

  objectToFormData(obj: any, formData = new FormData(), parentKey = '') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let keyName = parentKey ? `${parentKey}[${key}]` : key;
        if (
          typeof obj[key] === 'object' &&
          obj[key] !== null &&
          !Array.isArray(obj[key])
        ) {
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
    this.modalService
      .open(this.content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        (result) => {
          if (result === 'add') {
            this.submit();
          } else if (result === 'update') {
            this.updateMenu(this.menuIndex);
          }
        },
        (reason) => {
          console.log(`Model Dismissed`);
        }
      );
  }

  showPopup(item: any, i: any) {
    this.foodItem = item;
    this.menuIndex = i;
    this.confirmationModalService.modal(
      `Are you sure, you want to delete ${item.itemName}`,
      this.deleteFoodItem,
      this
    );
  }

  async deleteFoodItem() {
    const res: any = await this.apiMainService.deleteOutletMenu(
      this.outletObj._id,
      this.foodItem._id
    );
    if (res && res._id) {
      this.outletObj = res;
      this.showCard = true;
    }
    this.resetValues();
    this.back.emit(true);
  }

  async changeMenuActivation(menu: any, event: any) {
    menu.isActive = event.target.checked;
    const formData = new FormData();
    formData.append('isActive', event.target.checked);
    let outletmenu = await this.apiMainService.updateOutletMenu(
      this.outletObj._id,
      menu._id,
      formData
    );
  }

  defineDescription() {
    this.modalService
      .open(this.comboContent, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'xl',
      })
      .result.then((result) => {});
  }

  comboout(event: any) {
    if (event) {
      this.createComboDescription(event);
    }
  }

  createComboDescription(comboItem: any) {
    let description = '';
    let comboType = '';
    let descriptionArr = [];
    let itemContains = [];
    if (comboItem.vegCurry.selected) {
      comboItem.vegCurry.curryList.forEach((curry: any) => {
        descriptionArr.push(`${curry.size} ${curry.curryName}`);
        itemContains.push({
          name: curry.curryName,
          quantity: curry.size,
          contentType: 'VegCurry',
        });
      });
    }
    if (comboItem.nonVegCurry.selected) {
      comboItem.nonVegCurry.curryList.forEach((curry: any) => {
        descriptionArr.push(`${curry.size} ${curry.curryName}`);
        itemContains.push({
          name: curry.curryName,
          quantity: curry.size,
          contentType: 'NonVegCurry',
        });
      });
    }
    if (comboItem.rice.selected) {
      descriptionArr.push(comboItem.rice.size + ' Rice');
      itemContains.push({
        name: 'Rice',
        quantity: comboItem.rice.size,
        contentType: 'Rice',
      });
    }
    if (comboItem.chapati.selected) {
      descriptionArr.push(
        comboItem.chapati.count + ` ${comboItem.chapati.chapatiName}`
      );
      itemContains.push({
        name: comboItem.chapati.chapatiName,
        quantity: comboItem.chapati.count,
        contentType: 'Chapati',
      });
    }
    if (comboItem.dal.selected) {
      descriptionArr.push(comboItem.dal.size + ' Dal');
      itemContains.push({
        name: 'Dal',
        quantity: comboItem.dal.size,
        contentType: 'Dal',
      });
    }
    if (comboItem.sweet.selected) {
      descriptionArr.push('Sweet');
      itemContains.push({
        name: 'Sweet',
        quantity: undefined,
        contentType: 'Sweet',
      });
    }
    if (comboItem.salad.selected) {
      descriptionArr.push('Salad');
      itemContains.push({
        name: 'Salad',
        quantity: undefined,
        contentType: 'Salad',
      });
    }
    const finalDescription = descriptionArr.join(', ');
    this.form.patchValue({ description: finalDescription });
    this.form.patchValue({ itemContains: itemContains });
  }
}
