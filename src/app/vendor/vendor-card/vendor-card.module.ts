import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { VendorCardComponent } from './vendor-card.component'
import { MaterialModule } from "src/app/material.module";


@NgModule({
    declarations: [VendorCardComponent],
    imports: [CommonModule, MaterialModule],
    exports: [VendorCardComponent]
})
export class VendorCardModule { }