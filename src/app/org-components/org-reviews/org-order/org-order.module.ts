import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgOrderComponent } from './org-order.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
    declarations: [
        OrgOrderComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        OrgOrderComponent
    ]
})
export class OrgOrderModule { }
