import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";



@NgModule({
    imports: [AdminRoutingModule, CommonModule, FormsModule, MaterialModule],
    declarations: [AdminComponent]
})
export class AdminModule { }