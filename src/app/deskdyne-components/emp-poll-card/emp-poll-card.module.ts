import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpPollCardComponent } from './emp-poll-card.component';



@NgModule({
  declarations: [
    EmpPollCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    EmpPollCardComponent
  ]
})
export class EmpPollCardModule { }
