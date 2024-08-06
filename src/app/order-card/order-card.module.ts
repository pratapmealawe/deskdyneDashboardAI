import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from './order-card.component';
import { FormsModule } from '@angular/forms';
import { CustomPipeModule } from 'src/pipes/pipe.module';
// import { ArraySortPipe } from 'src/pipes/sort.pipe';


@NgModule({
  declarations: [
    OrderCardComponent,
    // ArraySortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomPipeModule
  ],
  exports:[
    OrderCardComponent
  ]
})
export class OrderCardModule { }
