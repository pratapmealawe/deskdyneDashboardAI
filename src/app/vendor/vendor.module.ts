import { NgModule } from "@angular/core";
import { VendorComponent } from "./vendor.component";
import { VendorRoutingModule } from "./vendor-routing.module";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@NgModule({
    declarations:[VendorComponent],
    imports:[VendorRoutingModule],
    providers:[NgbActiveModal]
})

export class VendorModule{}