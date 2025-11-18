import { NgModule } from "@angular/core";
import { SearchVendorComponent } from "./search-vendor.component";
import { SearchVendorRoutingModule } from "./search-vendor-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { VendorCardModule } from "../vendor-card/vendor-card.module";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/app/material.module";


@NgModule({
    declarations: [SearchVendorComponent],
    imports: [SearchVendorRoutingModule, FormsModule,ReactiveFormsModule, VendorCardModule, CommonModule,MaterialModule]
})

export class SearchVendorModule { }