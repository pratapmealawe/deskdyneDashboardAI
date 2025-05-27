import { Injectable, OnDestroy } from '@angular/core';
import { ToasterService } from 'src/app/toaster/toaster.service';
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
        const msg = 'These are some new orders placed';
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


}