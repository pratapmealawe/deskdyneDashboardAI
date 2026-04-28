import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { PermissionsService } from '@service/permission.service';
import { filter } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { VendorFirmViewService } from './vendor-firm-view.service';
 @Component({
  selector: 'app-vendor-firm-view',
  templateUrl: './vendor-firm-view.component.html',
  styleUrls: ['./vendor-firm-view.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  providers: [VendorFirmViewService]
})
export class VendorFirmViewComponent implements OnInit {
  vendorFirmInfo: any;
  selectedTab: string = 'vendor-firm-details';
  btnPolicy: any;
  selectedTabIndex: number = 0;
  updateval: any = false;

  vendorViewList = [
    { name: 'Vendor Details', path: 'vendor-firm-details', policyKey: 'vendorFirmDetails', icon: 'business' },
    { name: 'Wallet', path: 'vendor-firm-wallet-details', policyKey: 'vendorWallets', icon: 'account_balance_wallet' },
    { name: 'Ledger', path: 'vendor-firm-ledger-details', policyKey: 'vendorWallets', icon: 'account_balance' },
    { name: 'Order Report', path: 'vendor-firm-reports', policyKey: 'vendorOrderReport', icon: 'assessment' },
    { name: 'Compliance', path: 'vendor-firm-compliance', policyKey: 'vendorCompliance', icon: 'verified_user' },
  ]

  constructor(
    private permissionsService: PermissionsService,
    private route: ActivatedRoute,
    private router: Router, 
    private vendorFirmViewService: VendorFirmViewService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadVendorFirm(id);
      }
    });

    this.checkChildRoute();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkChildRoute();
    });

    this.vendorViewList = this.permissionsService.filterTabsByPolicy(this.vendorViewList);
  }

  checkChildRoute() {
    const baseUrl = this.router.url.split('?')[0].split('#')[0];
    const urlParts = baseUrl.split('/').filter(p => p);
    // /app/vendor-firm/:id/:tab
    if (urlParts.length >= 4) {
      this.selectedTab = urlParts[3];
      this.selectedTabIndex = this.vendorViewList.findIndex(x => x.path === this.selectedTab);
      if (this.selectedTabIndex === -1) this.selectedTabIndex = 0;
    } else {
      this.selectedTab = 'vendor-firm-details';
      this.selectedTabIndex = 0;
    }
  }

  async loadVendorFirm(id: string) {
    try {
      const currentVendor = this.vendorFirmViewService.getVendorFirm();
      if (currentVendor && currentVendor._id === id) {
        this.vendorFirmInfo = currentVendor;
      } else {
        this.vendorFirmInfo = await this.vendorFirmViewService.refreshVendorFirm(id);
      }
    } catch (error) {
      console.error('Error loading vendor firm:', error);
    }
  }

  goBack(): void {
    this.router.navigate(['/app/vendor-firm']);
  }

  gotToTab(tab: string): void {
    this.router.navigate([tab], { relativeTo: this.route });
  }

  onTabChange(event: any) {
    const selectTab = this.vendorViewList[event.index]
    this.gotToTab(selectTab.path)
  }

  receiveData(event: any) {
    this.vendorFirmInfo = event;
    this.vendorFirmViewService.setVendorFirm(event);
  }

  updateVendorFirm(val: any) {
    this.updateval = val;
  }
}

