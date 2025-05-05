import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { environment } from 'src/environments/environment';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { orderStatusMapper } from 'src/config/order-status.config';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ConfirmationModalService } from '../confirmation-modal/confirmation-modal.service';
import { GoogleMapService } from 'src/service/google-map.service';
import { ToasterService } from '../toaster/toaster.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() order: any;
  imageUrl = environment.imageUrl;
  orderStatusMapper: any = orderStatusMapper;

  showless = true;
  editMode: boolean = false;
  showOrderDetails: boolean = true;
  showOrgDetails: boolean = false;
  showCustomerDetails: boolean = false;
  showPaymentDetails: boolean = false;
  showStatusHistory: boolean = false;


  constructor() {}
  ngOnInit(): void {}

  viewOrder(order:any){
    this.showless = false;
  }
  showLess() {
    this.showless = true;
  }


}
