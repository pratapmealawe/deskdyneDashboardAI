import { Component, Input } from '@angular/core';
import { ApiMainService } from '@service/apiService/apiMain.service';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { OrderSubscriptionPackageCardComponent } from '../../../../orders/other-orders/virtual-cafeteria/order-subscription-package-card/order-subscription-package-card.component';

@Component({
  selector: 'app-customer-virtual-cafeteria-meal-orders',
  templateUrl: './customer-virtual-cafeteria-meal-orders.component.html',
  styleUrls: ['./customer-virtual-cafeteria-meal-orders.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, OrderSubscriptionPackageCardComponent]
})
export class CustomerVirtualCafeteriaMealOrdersComponent {
 page = 1;
    nextOn = false;
    @Input()userObj: any;
    orderList:any = [];
    constructor( private apiMainService: ApiMainService){        
    }
    ngOnInit(){
        this.getOrderList();
    }

    async getOrderList(){
        try{
            const orderList = await this.apiMainService.getCustomerPackageList(this.userObj._id,this.page);           
            if(orderList && orderList.length > 0){
                this.orderList = [...this.orderList,...orderList];
                this.nextOn = true;
            }else{
                this.nextOn = false;
            }      
        }catch(error){
        }
    }

    getMore(){
        this.page++;
        this.getOrderList();
    }

}
