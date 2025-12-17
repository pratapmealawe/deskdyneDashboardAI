import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import {VendorCardComponent} from './vendor-card.component'
import { MaterialModule } from "src/app/material.module";
import { DirectivesModule } from "src/shared/directives/common-directives.directives.modules";


@NgModule({
    declarations:[VendorCardComponent],
    imports:[CommonModule, MaterialModule,DirectivesModule],
    exports:[VendorCardComponent]
})
export class VendorCardModule{}