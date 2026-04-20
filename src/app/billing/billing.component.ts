import { Component, Input, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PolicyService } from '@service/policy.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  @Input() adminOrg: any;
  allBillingTypes: any = [
    { name: "Outlet", type: "outletBilling", policyKey: "billingoutletWallet" },
    { name: "Wallet", type: "walletBilling", policyKey: "billingWallet" },
    { name: "Virtual Cafeteria", type: "vcBilling", policyKey: "billingvirtualCafeteria" },
    { name: "Daily Order", type: "dailyOrderBilling", policyKey: "billingdailyOrder" },
    { name: "Bulk", type: "bulkOrderBilling", policyKey: "billingbulk" },
    { name: "Company Wallet", type: "companyWalletBilling", policyKey: "billingcompanyWallet" },
  ];
  billingTypes: any = [];
  selectedTab: string = '';
  selectedTabIndex: number = 0;
  tabPolicy: any;

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    this.tabPolicy = this.policyService.getCurrentTabPolicy();
    this.filterBillingTabs();
  }

  filterBillingTabs() {
    this.billingTypes = this.allBillingTypes.filter((tab: any) => !tab.policyKey || this.tabPolicy[tab.policyKey]);

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
