import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { OrderFilterDialogComponent } from './order-filter-dialog.component';

@NgModule({
    declarations: [OrderFilterDialogComponent],
    imports: [CommonModule, MaterialModule],
    exports: [OrderFilterDialogComponent]
})
export class OrderFilterDialogModule { }
