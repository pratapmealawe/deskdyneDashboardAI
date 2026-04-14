import { Component, Input } from '@angular/core';
import { orderStatusMapper } from 'src/config/order-status.config';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-org-order',
  templateUrl: './org-order.component.html',
  styleUrls: ['./org-order.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class OrgOrderComponent {
  @Input() order: any;
  orderStatusMapper: any = orderStatusMapper;
  ratingLabel: any = {
    0: "Skipped",
    1: "Very Bad",
    2: "Bad",
    3: "Average",
    4: "Good",
    5: "Excellent"
  };

  ratingClass: any = {
    0: "skipped",
    1: "very-bad",
    2: "bad",
    3: "average",
    4: "good",
    5: "excellent"
  };

  getStarsArray(rating: number) {
    return Array(5).fill(0).map((_, i) => i < rating);
  }

  getItemListString(order: any): string {
    if (!order || !Array.isArray(order.itemlist) || order.itemlist.length === 0) {
      return '';
    }
    return order.itemlist
      .map((i: any) => {
        const name = i?.itemName ?? '';
        const count = (i?.count || i?.count === 0) ? ` x${i.count}` : '';
        return (name + count).trim();
      })
      .filter((s: any) => s.length > 0)
      .join(', ');
  }

  hasKitchenRatings(): boolean {
    if (!this.order?.itemlist || !Array.isArray(this.order.itemlist)) return false;
    return this.order.itemlist.some((i: any) => i.starRatingKitchen != null);
  }
}
