import{NgModule} from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AddVendorCommponent } from './add-vendor.component';

const routes:Routes=[
    {
        path:'' , component:AddVendorCommponent
    },
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class AddVendorRoutingModule{}