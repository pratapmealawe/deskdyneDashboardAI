import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";



@NgModule({
    imports:[AdminRoutingModule,CommonModule,FormsModule],
    declarations:[AdminComponent]
})
export class AdminModule{}