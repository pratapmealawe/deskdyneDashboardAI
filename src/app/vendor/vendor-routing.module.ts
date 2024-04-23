import { NgModule } from "@angular/core";
import { RouterModule ,Routes } from "@angular/router";
import { VendorComponent } from "./vendor.component";

const routes:Routes=[
    {
        path:'', component:VendorComponent
    },
    {
        path:'search-vendor' , loadChildren:()=>import('./search-vendor/search-vendor.module').then(m=>m.SearchVendorModule)
    },
    {
        path:'add-vendor' , loadChildren:()=>import('./add-vendor/add-vendor.module').then(m=>m.AddVendorModule)
    },
    
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class VendorRoutingModule{}