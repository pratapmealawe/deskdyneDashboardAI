import { Component, Input } from '@angular/core';
import { orderStatusMapper } from 'src/config/order-status.config';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';

@Component({
  selector: 'app-org-outlet-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './org-outlet-orders.component.html',
  styleUrls: ['./org-outlet-orders.component.scss']
})
export class OrgOutletOrdersComponent {
  @Input() order: any;
  orderStatusMapper: any = orderStatusMapper;

  getGrandTotal(order: any): number {
    return (Number(order.itemAmount) || 0)
      + (Number(order.taxes) || 0)
      + (Number(order.packagingAmount) || 0);
  }
}


