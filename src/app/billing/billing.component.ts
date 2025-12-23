import { Component, Input, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  @Input() adminOrg: any;
  billingTypes: any = [
    { name: "Outlet", type: "outletBilling" },
    { name: "Wallet", type: "walletBilling" },
    { name: "Virtual Cafeteria", type: "vcBilling" },
    { name: "Daily Order", type: "dailyOrderBilling" },
    { name: "Bulk", type: "bulkOrderBilling" },
  ];

  selectedTab: string = '';
  selectedTabIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    console.log(this.adminOrg);
    if (this.billingTypes.length) {
      this.selectedTab = this.billingTypes[0].type;
      this.selectedTabIndex = 0;
    }
  }

  onTabChange(event: MatTabChangeEvent) {
    this.selectedTabIndex = event.index;
    this.selectedTab = this.billingTypes[event.index].type;
  }
}
