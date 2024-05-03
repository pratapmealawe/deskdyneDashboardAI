import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FaqComponent
  ],
  imports: [
    CommonModule,
    FaqRoutingModule,
    FormsModule
  ]
})
export class FaqModule { }
