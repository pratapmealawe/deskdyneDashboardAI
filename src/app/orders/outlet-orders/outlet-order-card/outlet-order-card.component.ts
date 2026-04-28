import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '@environments/environment';
import { orderStatusMapper } from 'src/config/order-status.config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomPipeModule } from '@pipes/pipe.module';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-outlet-order-card',
  templateUrl: './outlet-order-card.component.html',
  styleUrls: ['./outlet-order-card.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, CustomPipeModule, MaterialModule]
})
export class OutletOrderCardComponent implements OnInit {
  @Input() order: any;
  @Input() showActions: boolean = true;

  @Output() action = new EventEmitter<{ type: 'ready' | 'complete' | 'cancel' | 'validate', order: any }>();

  imageUrl = environment.imageUrl;
  orderStatusMapper: any = orderStatusMapper;

  constructor() { }
  ngOnInit(): void { }

  emitAction(type: 'ready' | 'complete' | 'cancel' | 'validate') {
    this.action.emit({ type, order: this.order });
  }

  getItemAddOnTotal(item: any): number {
    if (!item?.addOnsList?.length) return 0;
    const count = item.count || 1;
    return item.addOnsList.reduce((sum: number, a: any) => {
      if (a.totalPrice != null) {
        return sum + a.totalPrice;
      }
      const price = a.addOnPrice ?? a.addonPrice ?? 0;
      return sum + (price * count);
    }, 0);
  }

  getGrandTotal(order: any): number {
    return (Number(order.itemAmount) || 0)
      + (Number(order.taxes) || 0)
      + (Number(order.packagingAmount) || 0)
      + (Number(order.addOnCharges) || 0);
  }

  isPaymentValidationVisible(order: any): boolean {
    if (!order) return false;
    const orderDateStr = order.orderDate;
    if (!orderDateStr) return false;

    const orderTime = new Date(orderDateStr).getTime();
    const currentTime = Date.now();
    const diffInMinutes = (currentTime - orderTime) / (1000 * 60);

    return diffInMinutes > 20;
  }
}

