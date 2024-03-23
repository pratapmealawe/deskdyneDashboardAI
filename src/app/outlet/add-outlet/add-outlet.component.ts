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
  @ViewChild("contentOrg") contentOrg: any;
  orgList:any;
  form:any;
  showError = false;
  uploadedOutletImages:any = {};
  outletImages:any = {};
  selectedOrg:any = {};
  selectedCafe:any = {};
  
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
      // menuList:this.fb.array([]),
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

  removeItem(index:any){
    this.form.controls['menuList'].removeAt(index);
  }

  // addMenuItem(){
  //   this.menuList.push(this.createMenuItem())
  // }

  // createMenuItem(){
  //   return this.fb.group({
  //     taxGroup:[''],
  //     itemName:[''],
  //     price:[''],
  //     priority:[''],
  //     transferPrice:[''],
  //     category:[''],
  //     subCategory:[''],
  //     code:[''],
  //     recommended:[false],
  //     isSpicy:[false],
  //     isVeg:[false],
  //     isActive:[false],
  //     mealVoucherApplicable:[false],
  //     isPrePrepared:[false],
  //     priceIncludesTax:[false],
  //     hideItemPrice:[false],
  //     mrp:[''],
  //     description:[''],
  //     calories:[''],
  //     parcelChargeType:[''],
  //     parcelChargeValue:[''],
  //     // isEnabledInventory:[''],
  //     // reorderQuantity:[''],
  //     // availableStock:[''],
  //   })
  // }

  // get menuList():FormArray{
  //   return this.form.controls.menuList as FormArray;
  // }

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

  // openMenuList(){
  //   const modalRef = this.modalService.open(this.menuItem, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
  //   modalRef.result.then((result) => {
  //     console.log(`Closed with: ${result}`);
  //     if (result === 'add') {
        
  //     }
  //   }, (reason) => {
  //     console.log(`Model Dismissed`);
      
  //   });
  // }

  openOrgList(){
    const modalRef = this.modalService.open(this.contentOrg, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
    modalRef.result.then((result) => {
      console.log(`Closed with: ${result}`);
      if (result === 'add') {
        
      }
    }, (reason) => {
      console.log(`Model Dismissed`);
      
    });
  }

  // handleFileInput($event: any,filename:string,height:number) {
  //   // const fileToUpload = files.item(0);
  //   if($event && $event.target && $event.target.files){
  //     const file:File = $event.target.files[0];
  //     if (file) {
  //       // this.uploadedCompliance = file;
  //       const fileName = file.name;
  //       console.log(fileName);
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file); 
  //       reader.onload =async (_event) => { 
  //         const imageUrl = reader.result; 
  //         try{  
  //           const modalRef: NgbModalRef  = this.modalService.open(ImageCropperComponent, 
  //             {ariaLabelledBy: 'modal-basic-title', size: 'xl', backdrop: 'static',
  //             centered: true});
  //           modalRef.result.then((result:any) => {
  //             console.log('Closed with:',result);
  //                 if (result && result.croppedImages){
  //                   console.log('croppedImages ', result.croppedImages);
  //                   this.uploadedOutletImages[filename] = result.croppedImages.file;
  //                   // this.uploadedCompliance[filename+'Old'] = this.compliance[filename];  
  //                   this.outletImages[filename] = result.croppedImages.resizeDataUrl;
  //               }
  //           }, (reason:any) => {
  //             console.log( `Model Dismissed`);
  //           });  
  //           modalRef.componentInstance.uploadedImageUrl = imageUrl; 
  //           modalRef.componentInstance.imageWidth = 600;
  //           modalRef.componentInstance.imageHeight = height*2; 
  //           // modalRef.componentInstance.aspectRatio = 1; 
  //         }catch(error){
  //           console.log('error while changes kitchen opened status ',error);
  //         } 
  //       }       
  //     }
  //   }    
  // }

  async submit(){
    try {
      console.log(this.form.value);
      const finalObj = {companyDetails:this.selectedOrg,cafeteriaDetails:this.selectedCafe,...this.form.value}
      console.log(finalObj)
      const res = await this.apiMainService.saveOutlet(finalObj);
      this.router.navigate(['/outlet'])
    } catch (error) {
      console.log(error)
    }
  }

  selectOrg(org:any,cafe:any){
    this.selectedOrg = {
      organization_name:org.organization_name,
      city:org.city,
      location:org.location
    }
    this.selectedCafe = {
      cafeteria_name:cafe.cafeteria_name,
      cafeteria_city:cafe.cafeteria_city,
      cafeteria_location:cafe.cafeteria_location,
      address1:cafe.address1,
      address2:cafe.address2,
      landmark:cafe.landmark,
      location:cafe.location
    }
    console.log(org,cafe)
  }

}
