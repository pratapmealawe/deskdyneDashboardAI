import { Component, Input } from "@angular/core";

@Component({
    selector:'app-vendor-card',
    templateUrl:'vendor-card.component.html',
    styleUrls:['vendor-card.component.scss']
})
export class VendorCardComponent{
   @Input() vendor:any
   
constructor(){

}

}