import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ApiMainService } from "src/service/apiService/apiMain.service";
import { RuntimeStorageService } from "src/service/runtime-storage.service";

@Component({
    selector:'app-vendor-card',
    templateUrl:'vendor-card.component.html',
    styleUrls:['vendor-card.component.scss']
})
export class VendorCardComponent{
   @Input() vendor:any;
   @Output() deleted = new EventEmitter();
   
constructor(private router:Router,private runtimeStorageService:RuntimeStorageService,private apiMainService:ApiMainService){

}
editVendor(vendor:any){
this.runtimeStorageService.setCacheData('VENDOR_EDIT',vendor);
this.router.navigate(['/vendor/add-vendor'])
console.log(vendor);
}
async deleteVendor(vendor:any){
    try{
       let id=vendor._id
       console.log(typeof id)
     const deleted = await this.apiMainService.deleteVendor(id);
     console.log(deleted);
      this.deleted.emit()
    }catch(error){
        console.log('deleteVendor',error)
    }  
}
}