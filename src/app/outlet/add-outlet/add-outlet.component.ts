import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-add-outlet',
  templateUrl: './add-outlet.component.html',
  styleUrls: ['./add-outlet.component.scss']
})
export class AddOutletComponent implements OnInit{
  @ViewChild("menuItem") menuItem: any;
  orgList:any;
  form:any;
  showError = false;
  constructor(private apiMainService:ApiMainService, private router:Router, private modalService: NgbModal, private fb:FormBuilder){
  }

  ngOnInit(): void {
    this.createForm();
    this.getOrgList();
  }

  createForm(){
    this.form = this.fb.group({
      outletName:[''],
      outletDescription:[''],
      outletType:[''],
      menuList:this.fb.array([]),
      ownerDetails:this.fb.group({
        owner_name:[''],
        owner_phoneNo:[''],
        owner_emailId:['']
      }),
      managerDetails:this.fb.group({
        manager_name:[''],
        manager_phoneNo:[''],
        manager_emailId:['']
      }),
      cashierDetails:this.fb.group({
        cashier_name:[''],
        cashier_phoneNo:[''],
        cashier_emailId:['']
      })
    })
  }

  addMenuItem(){
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
      recommended:[''],
      isSpicy:[''],
      isVeg:[''],
      isActive:[''],
      mealVoucherApplicable:[''],
      isPrePrepared:[''],
      priceIncludesTax:[''],
      hideItemPrice:[''],
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

  async getOrgList(){
    try {
      const res = await this.apiMainService.getOrgList();
      if(res && res.length>0){
        this.orgList = res;
      }
    } catch (error) {
      console.log(error)
    }
  }

  openMenuList(){
    const modalRef = this.modalService.open(this.menuItem, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
    modalRef.result.then((result) => {
      console.log(`Closed with: ${result}`);
      if (result === 'add') {
        
      }
    }, (reason) => {
      console.log(`Model Dismissed`);
      
    });
  }

  submit(){
    console.log(this.form.value)
  }

}
