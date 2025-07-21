import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  @Input() adminOrg: any
  billingTypes: any = [
    { name: "Outlet", type: "outletBilling" },
    { name: "Virtual Cafeteria", type: "vcBilling" },
    { name: "Daily Order", type: "dailyOrderBilling" },
    { name: "Bulk", type: "bulkOrderBilling" },
  ]

  selectedTab: any

  constructor() { }

  ngOnInit(): void {
    console.log(this.adminOrg);

    
    this.selectedTab = this.billingTypes[0]?.type
  }

  gotToTab(type: any) {
    console.log(type);
    this.selectedTab = type
  }

}
