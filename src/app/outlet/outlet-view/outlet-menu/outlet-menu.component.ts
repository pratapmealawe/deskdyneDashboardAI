import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

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

  constructor(private fb: FormBuilder, private apiMainService:ApiMainService) { }

  ngOnInit(): void {
    this.createForm();
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
    this.outletObj.category.forEach((el:any)=>{
      if(el.name === this.selectedCategory){
        this.subcategoryList = el.subCategories
      }
    })
  }

  async submit(){
    try {
      const finalObj = {...this.outletObj,...this.form.value};
      console.log(finalObj)
      const res = await this.apiMainService.updateOutlet(finalObj);
    } catch (error) {
      console.log(error)
    }
  }

}
