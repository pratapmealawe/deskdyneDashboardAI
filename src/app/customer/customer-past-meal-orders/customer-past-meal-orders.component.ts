import { Component, Input } from '@angular/core';
import { ApiMainService } from '@service/apiService/apiMain.service';

@Component({
  selector: 'app-customer-past-meal-orders',
  templateUrl: './customer-past-meal-orders.component.html',
  styleUrls: ['./customer-past-meal-orders.component.scss']
})
export class CustomerPastMealOrdersComponent {
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
