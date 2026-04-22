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

  constructor(private permissionsService: PermissionsService) { }

  ngOnInit(): void {
    this.filterBillingTabs();
  }

  filterBillingTabs() {
    this.billingTypes = this.allBillingTypes.filter((tab: any) => {
      if (!tab.policyKey) return true;
      // Convert legacy policy keys to granular RBAC keys, e.g. billingoutletWallet -> billing:outlet_wallet:read
      // Or just check if the key exists directly as a permission
      return this.permissionsService.hasPermission(tab.policyKey);
    });

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

