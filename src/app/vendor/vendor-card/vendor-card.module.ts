import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import {VendorCardComponent} from './vendor-card.component'


@NgModule({
    declarations:[VendorCardComponent],
    imports:[CommonModule],
    exports:[VendorCardComponent]
})
export class VendorCardModule{}