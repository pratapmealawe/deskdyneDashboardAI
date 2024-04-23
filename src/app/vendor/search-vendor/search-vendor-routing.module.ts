import {NgModule} from '@angular/core'
import {RouterModule,Routes} from '@angular/router'
import { SearchVendorComponent } from './search-vendor.component'
const routes:Routes=[
    {
        path:'' , component:SearchVendorComponent
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class SearchVendorRoutingModule{}