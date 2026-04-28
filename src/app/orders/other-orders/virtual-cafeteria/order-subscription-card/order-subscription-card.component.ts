import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { orderStatusMapper } from 'src/config/order-status.config';
import { environment } from '@environments/environment';
import { DeliveryOrderService } from '@service/delivery-order.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-subscription-card',
  templateUrl: './order-subscription-card.component.html',
  styleUrls: ['./order-subscription-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class OrderSubscriptionCardComponent implements OnInit {
  @Input() order: any;
  @Input() parentPage: string = '';
  @Input() showDeliveryDetail: boolean = true;
  imageUrl = environment.imageUrl;
  orderStatusMapper: any = orderStatusMapper;
  selectedOrder: any;
  vieworder: any;
  subscriptionPackage: any;
  subscriptionParent: any;

  constructor(
    public router: Router,
    private deliveryOrderService: DeliveryOrderService
  ) { }

  ngOnInit(): void {
    }
  }

  viewOrder(order: any) {
    if (order.orderType === 'subscriptionParent') {
      this.subscriptionParent = order
    }
    else if (order.orderType === 'subscriptionPackage') {
      this.subscriptionPackage = order
    }
    else {
      this.vieworder = order
    }
    // this.runtimeStorageService.setCacheData('PARENT_PAGE',this.parentPage);
    // if(order.orderType === 'subscriptionParent'){
    //   this.runtimeStorageService.setCacheData('VIEW_ORDER',order);
    //   this.router.navigate(['/home/orders/viewSuborder']);
    // }else if(order.orderType === 'subscriptionPackage'){
    //   this.runtimeStorageService.setCacheData('VIEW_ORDER_PACKAGE',order);
    //   this.runtimeStorageService.setCacheData('VIEW_SPECIFIC_ID',false);
    //   this.router.navigate(['/home/orders/viewPackageorder']);
    // }else{
    //   this.runtimeStorageService.setCacheData('VIEW_ORDER',order);
    //   this.router.navigate(['/home/orders/vieworder']);
    // }    
  }

  async getDeliveryStatus() {
    if (this.order && this.order.deliveryTaskId) {
      try {
        await this.deliveryOrderService.trackDeliveryTask(this.order, this.order.deliveryVendor, this.order.orderCreatedBy);
      } catch (error) {
      }
    }

  }

}
