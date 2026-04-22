import { RuntimeStorageService } from '@service/runtime-storage.service';
import { environment } from '@environments/environment';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { orderStatusMapper } from 'src/config/order-status.config';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { GoogleMapService } from '@service/google-map.service';
import { ToasterService } from '@service/toaster.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SendDataToComponent } from '@service/sendDataToComponent.service';
import { PermissionsService } from '@service/permission.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomPipeModule } from '@pipes/pipe.module';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, CustomPipeModule]
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


  constructor() { }
  ngOnInit(): void { }

  viewOrder(order: any) {
    this.showless = false;
  }
  showLess() {
    this.showless = true;
  }


}

