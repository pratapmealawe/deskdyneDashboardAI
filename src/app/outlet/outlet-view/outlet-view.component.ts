import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-outlet-view',
  templateUrl: './outlet-view.component.html',
  styleUrls: ['./outlet-view.component.scss'],
})
export class OutletViewComponent implements OnInit {
  @Input() outlet: any;
  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  selectedtab: number = 0;
  outletViewList = [
    { name: 'Basic Details', path: 'outlet-details' },
    { name: 'Menu', path: 'outlet-menu' },
    { name: 'QR Menu', path: 'qr-menu' },
    { name: 'Outlet Orders', path: 'outlet-orders' },
    { name: 'Reviews', path: 'outlet-feedback' },
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
    this.tabPolicy = this.policyService.getCurrentTabPolicy();

    const outletTabMap: { [key: string]: string } = {
      'outlet-details': 'outletBasicDetails',
      'outlet-menu': 'outletMenu',
      'qr-menu': 'outletQrMenu',
      'outlet-orders': 'outletOrders',
      'outlet-feedback': 'outletReviews'
    };

    this.outletViewList = this.outletViewList.filter((item: any) => {
      const policyKey = outletTabMap[item.path];
      if (policyKey && this.tabPolicy[policyKey] === false) {
        return false;
      }
      return true;
    });

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
