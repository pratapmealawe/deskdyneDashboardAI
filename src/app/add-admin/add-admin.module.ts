import { NgModule } from "@angular/core";
import { AddAdminComponent } from "./add-admin.component";
import { AddAdminRoutingModule } from "./add-admin-routing.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
@NgModule({
    imports:[
        AddAdminRoutingModule,  
        FormsModule,
        CommonModule
    ],
    declarations:[AddAdminComponent],
    exports:[]
})
export class AddAdminModule{

}

