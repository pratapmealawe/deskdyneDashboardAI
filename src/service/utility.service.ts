import { Injectable, OnDestroy } from '@angular/core';
import { ToasterService } from 'src/service/toaster.service';
import { ApiMainService } from './apiService/apiMain.service';
import { SendDataToComponent } from './sendDataToComponent.service';
import { WebNotificationService } from './webNotification.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  currentOrderCounter: any;

  constructor(private apiMainService: ApiMainService, private toasterService: ToasterService, private sendDataToComponent: SendDataToComponent) {
  }

  async getCurrentOutletOrdersCount(showAlarm: boolean) {
    try {
      clearTimeout(this.currentOrderCounter);
      let orderList: any = {};
      const response = await this.apiMainService.getCurrentOutletOrdersCount();
      orderList = response;
      if (orderList && orderList.newOrder > 0 && showAlarm) {
        // const msg = 'These are some new orders placed';
      }
      const self = this;
      this.currentOrderCounter = setTimeout(() => {
        self.getCurrentOutletOrdersCount(true)
      }, 1000 * 60 * 2);
      this.sendDataToComponent.publish('UPDATE_ORDER_PAGE', orderList)
      return orderList;
    } catch (error) {
      console.log('Error while requestPermission ', error)
    }
  }

  async getCurrentB2BOrdersCount(showAlarm: boolean) {
    try {
      clearTimeout(this.currentOrderCounter);
      let orderList: any = {};
      const response = await Promise.all([
        this.apiMainService.getCurrentB2BOrdersCount(),
        this.apiMainService.getCurrentB2BDailyOrdersCount(),
        this.apiMainService.getDailyFoodOrdersCount()
      ]);
      if (response[0] && response[1] && response[2]) {
        orderList.b2bBulk = response[0];
        orderList.dailyBulk = response[1];
        orderList.empVote = response[2];
      } else if (response[0] && response[1]) {
        orderList.b2bBulk = response[0];
        orderList.dailyBulk = response[1];
      }
      else if (response[1] && response[2]) {
        orderList.dailyBulk = response[1];
        orderList.empVote = response[2];
      }
      else if (response[0] && response[2]) {
        orderList.b2bBulk = response[0];
        orderList.empVote = response[2];
      }
      else if (response[0]) {
        orderList.b2bBulk = response[0];
      }
      else if (response[1]) {
        orderList.dailyBulk = response[1];
      }
      else if (response[2]) {
        orderList.empVote = response[2];
      }
      //getCurrentSubscriptionCount
      if (orderList && orderList.b2bBulk.placed > 0 && showAlarm) {
        const msg = 'These are some new orders placed';
        // this.webNotificationService.showNotification(msg);
        // this.toasterService.alarm(msg);
      }
      const self = this;
      this.currentOrderCounter = setTimeout(() => {
        console.log('getCurrentB2BOrdersCount UtilityService')
        self.getCurrentB2BOrdersCount(true)
      }, 1000 * 60 * 2);
      this.sendDataToComponent.publish('UPDATE_ORDER_PAGE', orderList)
      return orderList;
    } catch (error) {
      console.log('Error while requestPermission ', error)
    }
  }


}