import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgordersRoutingModule } from './orgorders-routing.module';
import { OrgordersComponent } from './orgorders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrgordersComponent
  ],
  imports: [
    CommonModule,
    OrgordersRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule,
  ]
})
export class OrgordersModule { }
