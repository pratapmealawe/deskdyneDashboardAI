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

  constructor(private apiMainService: ApiMainService, private toasterService: ToasterService,
    private webNotificationService: WebNotificationService, private sendDataToComponent: SendDataToComponent) {
  }

}