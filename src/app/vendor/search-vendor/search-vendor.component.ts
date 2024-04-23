import { Component } from "@angular/core";
import { ApiMainService } from "src/service/apiService/apiMain.service";



@Component({
    selector:'app-search-vendor',
    templateUrl:'search-vendor.component.html',
    styleUrls:['search-vendor.component.html']
})

export class SearchVendorComponent{
  searchObj:any;
  vendorList:any;
  orgName:any;
     constructor(private apiMainService:ApiMainService){
        this.getAllVendors()
       // console.log(this.vendorList)
     }
     
     async getAllVendors(){
        try{
     this.vendorList= await this.apiMainService.getAllVendors()
     
    }catch(error){
      console.log(error,'getAllVendor')
    }
     }

     searchVendor(){
      
     }
     resetForm(){

     }
     addVendor(){

     }
}