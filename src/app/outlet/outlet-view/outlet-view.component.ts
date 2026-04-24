import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { SendDataToComponent } from '@service/sendDataToComponent.service';
import { PermissionsService } from '@service/permission.service';
import { OutletViewService } from './outlet-view.service';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-outlet-view',
  templateUrl: './outlet-view.component.html',
  styleUrls: ['./outlet-view.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  providers: [OutletViewService]
})
export class OutletViewComponent implements OnInit {
  outlet: any;
  selectedtab: number = 0;
  outletViewList = [
    { name: 'Basic Details', path: 'outlet-details', policyKey: 'outletBasicDetails', icon: 'info' },
    { name: 'Menu', path: 'outlet-menu', policyKey: 'outletMenu', icon: 'restaurant_menu' },
    { name: 'QR Menu', path: 'outlet-qr-menu', policyKey: 'outletQrMenu', icon: 'qr_code_2' },
    { name: 'Outlet Orders', path: 'outlet-orders', policyKey: 'outletOrders', icon: 'receipt_long' },
    { name: 'Reviews', path: 'outlet-feedback', policyKey: 'outletReviews', icon: 'rate_review' },
  ];
  selectedTab = 'outlet-details';
  updateval: any = false;

  constructor(
    private permissionsService: PermissionsService,
    private route: ActivatedRoute,
    private router: Router,
    private outletViewService: OutletViewService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    // Get outlet ID from route params
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadOutlet(id);
      }
    });

    this.checkChildRoute();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkChildRoute();
    });

    this.outletViewList = this.permissionsService.filterTabsByPolicy(this.outletViewList);
  }

  checkChildRoute() {
    const baseUrl = this.router.url.split('?')[0].split('#')[0];
    const urlParts = baseUrl.split('/').filter(p => p);
    // /app/outlet/:id/:tab
    if (urlParts.length >= 4) {
      this.selectedTab = urlParts[3];
      this.selectedtab = this.outletViewList.findIndex(x => x.path === this.selectedTab);
      if (this.selectedtab === -1) this.selectedtab = 0;
    } else {
      this.selectedTab = 'outlet-details';
      this.selectedtab = 0;
    }
  }

  async loadOutlet(id: string) {
    // Check if outlet is already in shared state
    const currentOutlet = this.outletViewService.getOutlet();
    if (currentOutlet && currentOutlet._id === id) {
      this.outlet = currentOutlet;
    } else {
      // Fetch from API if not present or different
      this.outlet = await this.outletViewService.refreshOutlet(id);
    }
  }

  gotToTab(tab: string) {
    this.selectedTab = tab;
    this.router.navigate([tab], { relativeTo: this.route });
  }

  goBack() {
    this.router.navigate(['/app/outlet']);
  }

  updateOutlet(val: any) {
    this.updateval = val;
  }

  receiveData(event: any) {
    this.outlet = event;
    this.outletViewService.setOutlet(event);
  }


}

