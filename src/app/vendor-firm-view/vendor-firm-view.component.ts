import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-vendor-firm-view',
  templateUrl: './vendor-firm-view.component.html',
  styleUrls: ['./vendor-firm-view.component.scss']
})
export class VendorFirmViewComponent implements OnChanges, OnInit {
  @Input() vendor: any;
  @Output() back = new EventEmitter<boolean>();
  vendorFirmInfo: any;
  selectedTab: string = 'vendorFirmDetails';
  selectedSubTab: string = '';
  selectedChildTab: string = '';
  btnPolicy: any;
  selectedTabIndex: number = 0
  selectedSubTabIndex: number = 0;
  tabPolicy: any;

  vendorViewList = [
    { name: 'VendorFirm Details', path: 'vendorFirmDetails', policyKey: 'vendorFirmDetails' },
    {
      name: 'Wallet',
      path: 'wallet',
      subTabs: [
        {
          name: 'Wallet Details',
          path: 'walletDetails'
        },
        {
          name: 'Ledger',
          path: 'ledgerDetails'
        }
      ],
      policyKey: 'vendorWallets'
    },
    {
      name: 'Order Report',
      path: 'orderReport',
      subTabs: [
        {
          name: 'Outlet Report',
          path: 'vendorFirmReport'
        },
        {
          name: 'Daily Report',
          path: 'vendorFirmDailyReport'
        },
        {
          name: 'Bulk Order Report',
          path: 'bulkOrderReport'
        },
      ],
      policyKey: 'vendorOrderReport'
    },
  ]

  constructor(private policyService: PolicyService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.vendorFirmInfo = this.vendor;

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.vendorViewList = this.policyService.filterTabsByPolicy(this.vendorViewList);

    if (this.vendorViewList.length > 0) {
      if (this.vendorViewList.findIndex(x => x.path === this.selectedTab) === -1) {
        this.selectedTab = this.vendorViewList[0].path;
      }
    }
    this.initSubTabFor(this.selectedTab)
  }

  goToSubTab(subPath: string): void {
    this.selectedSubTab = subPath;
    this.initChildTabFor(subPath);
  }

  getSubTab(): any[] {
    const main = this.vendorViewList.find(item => item.path === this.selectedTab);
    return main?.subTabs || [];
  }

  getChildTabs(): any[] {
    const sub = this.getSubTab().find(item => item.path === this.selectedSubTab || item.name === this.selectedSubTab);
    return sub?.childTabs || [];
  }

  private initSubTabFor(mainPath: string): void {
    const main = this.vendorViewList.find(item => item.path === mainPath);
    if (main?.subTabs?.length) {
      const firstSub = main.subTabs[0];
      this.selectedSubTab = firstSub.path || firstSub.name;
      this.initChildTabFor(this.selectedSubTab);
    } else {
      this.selectedSubTab = '';
      this.selectedChildTab = '';
    }
  }

  goBack(): void {
    this.back.emit(true);
  }

  gotToTab(tab: string): void {
    this.selectedTab = tab;
    this.initSubTabFor(tab);
  }

  private initChildTabFor(subPath: string): void {
    const sub = this.getSubTab().find(item => item.path === subPath || item.name === subPath);
    if (sub?.childTabs?.length) {
      this.selectedChildTab = sub.childTabs[0].path;
    } else {
      this.selectedChildTab = '';
    }
  }
  //  tab implementation 
  onTabChange(event: any) {
    const selectTab = this.vendorViewList[event.index]
    this.gotToTab(selectTab.path)
  }
  onTabSubChange(event: any) {
    const selectedSubTab = this.getSubTab()
    const findIndex = selectedSubTab[event.index]
    this.goToSubTab(findIndex.path)
  }

  getTabIcon(path: string): string {
    const icons: { [key: string]: string } = {
      'vendorFirmDetails': 'business',
      'wallet': 'account_balance_wallet',
      'orderReport': 'assessment'
    };
    return icons[path] || 'folder';
  }
}
