import { Component, Input, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PermissionsService } from '@service/permission.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  @Input() adminOrg: any;
  allBillingTypes: any = [
    { name: "Outlet", type: "outletBilling", policyKey: "billingoutletWallet", icon: "storefront" },
    { name: "Wallet", type: "walletBilling", policyKey: "billingWallet", icon: "account_balance_wallet" },
    { name: "Virtual Cafeteria", type: "vcBilling", policyKey: "billingvirtualCafeteria", icon: "restaurant" },
    { name: "Daily Order", type: "dailyOrderBilling", policyKey: "billingdailyOrder", icon: "calendar_today" },
    { name: "Bulk", type: "bulkOrderBilling", policyKey: "billingbulk", icon: "inventory_2" },
    { name: "Company Wallet", type: "companyWalletBilling", policyKey: "billingcompanyWallet", icon: "business" },
  ];
  billingTypes: any = [];
  selectedTab: string = '';
  selectedTabIndex: number = 0;

  constructor(private permissionsService: PermissionsService) { }

  ngOnInit(): void {
    this.filterBillingTabs();
  }

  filterBillingTabs() {
    this.billingTypes = this.allBillingTypes.filter((tab: any) => {
      if (!tab.policyKey) return true;
      return this.permissionsService.hasPermission(tab.policyKey);
    });

    if (this.billingTypes.length) {
      this.selectedTab = this.billingTypes[0].type;
      this.selectedTabIndex = 0;
    }
  }

  onCustomTabChange(index: number) {
    this.selectedTabIndex = index;
    this.selectedTab = this.billingTypes[index].type;
  }
}

