import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { PolicyService } from 'src/service/policy.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { OutletDetailsComponent } from './outlet-details/outlet-details.component';
import { OutletMenuComponent } from './outlet-menu/outlet-menu.component';
import { QrMenuComponent } from './qr-menu/qr-menu.component';
import { OutletOrdersComponent } from './outlet-orders/outlet-orders.component';
import { OutletFeedbackComponent } from './outlet-feedback/outlet-feedback.component';

@Component({
  selector: 'app-outlet-view',
  templateUrl: './outlet-view.component.html',
  styleUrls: ['./outlet-view.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    OutletDetailsComponent,
    OutletMenuComponent,
    QrMenuComponent,
    OutletOrdersComponent,
    OutletFeedbackComponent
  ]
})
export class OutletViewComponent implements OnInit {
  @Input() outlet: any;
  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  selectedtab: number = 0;
  outletViewList = [
    { name: 'Basic Details', path: 'outlet-details', policyKey: 'outletBasicDetails' },
    { name: 'Menu', path: 'outlet-menu', policyKey: 'outletMenu' },
    { name: 'QR Menu', path: 'qr-menu', policyKey: 'outletQrMenu' },
    { name: 'Outlet Orders', path: 'outlet-orders', policyKey: 'outletOrders' },
    { name: 'Reviews', path: 'outlet-feedback', policyKey: 'outletReviews' },
  ];
  selectedTab = 'outlet-details';
  updateval: any = false;
  tabPolicy: any;

  constructor(
    private router: Router,
    private sendDataToComponent: SendDataToComponent,
    private policyService: PolicyService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.outletViewList = this.policyService.filterTabsByPolicy(this.outletViewList);
    if (this.selectedTab) {
      const foundIndex = this.outletViewList.findIndex(x => x.path === this.selectedTab);
      if (foundIndex === -1 && this.outletViewList.length > 0) {
        this.selectedTab = this.outletViewList[0].path;
        this.selectedtab = 0;
      } else {
        this.selectedtab = foundIndex >= 0 ? foundIndex : 0;
      }
    }
  }

  gotToTab(tab: string) {
    this.selectedTab = tab;
  }

  goBack() {
    this.back.emit({ val: true, updateval: this.updateval });
  }

  updateOutlet(val: any) {
    this.updateval = val;
  }

  receiveData(event: any) {
    this.outlet = event;
  }

  getTabIcon(path: string): string {
    const icons: { [key: string]: string } = {
      'outlet-details': 'info',
      'outlet-menu': 'restaurant_menu',
      'qr-menu': 'qr_code_2',
      'outlet-orders': 'receipt_long',
      'outlet-feedback': 'rate_review'
    };
    return icons[path] || 'tab';
  }
}
