import { NgModule } from "@angular/core";
import { SearchVendorComponent } from "./search-vendor.component";
import { SearchVendorRoutingModule } from "./search-vendor-routing.module";
import { FormsModule } from "@angular/forms";
import { VendorCardModule } from "../vendor-card/vendor-card.module";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [SearchVendorComponent],
    imports: [SearchVendorRoutingModule, FormsModule, VendorCardModule, CommonModule]
})

export class SearchVendorModule { }