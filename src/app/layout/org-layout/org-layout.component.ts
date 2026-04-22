import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { environment } from '@environments/environment';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { LocalStorageService } from '@service/local-storage.service';
import { RuntimeStorageService } from '@service/runtime-storage.service';
import { NavigationService } from '@service/navigation.service';

@Component({
  selector: 'app-org-layout',
  templateUrl: './org-layout.component.html',
  styleUrls: ['./org-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule]
})
export class OrgLayoutComponent implements OnInit {
  adminProfile: any = {};
  orgDetails: any = {};
  imageUrl = environment.imageUrl;
  finalNavOption: any = [];
  selectedIndex: number = -1;
  childSelectedIndex: number = -1;
  openChildSectionIndex: number = -1;
  isCollapsed: boolean = false;

  // Flyout state
  activeFlyoutIndex: number = -1;
  flyoutY: number = 0;
  flyoutChildren: any[] = [];
  flyoutParent: any = null;

  readonly expandedWidth = 240;
  readonly collapsedWidth = 68;

  get sidebarWidth(): number {
    return this.isCollapsed ? this.collapsedWidth : this.expandedWidth;
  }

  constructor(
    private router: Router,
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private runtimeStorageService: RuntimeStorageService,
    public navigationService: NavigationService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.setActiveStateFromRoute(event.url);
        this.closeFlyout();
      }
    });
  }

  ngOnInit(): void {
    this.getAdminProfile();
    this.setActiveStateFromRoute(this.router.url);
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.closeFlyout();
  }

  // ─── Flyout ──────────────────────────────────────────────────────────────────

  onNavItemClick(event: MouseEvent, link: any, index: number): void {
    event.stopPropagation();

    if (!link.children || link.children.length === 0) {
      this.selectedIndex = index;
      this.openChildSectionIndex = -1;
      this.closeFlyout();
      this.router.navigate(['/orgapp/' + link.route]);
      return;
    }

    // Toggle flyout
    if (this.activeFlyoutIndex === index) {
      this.closeFlyout();
      return;
    }

    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    this.flyoutY = rect.top;
    this.flyoutChildren = link.children.filter((c: any) => c.showChild);
    this.flyoutParent = link;
    this.activeFlyoutIndex = index;
    this.openChildSectionIndex = index;
  }

  closeFlyout(): void {
    this.activeFlyoutIndex = -1;
    this.flyoutChildren = [];
    this.flyoutParent = null;
  }

  @HostListener('document:click', ['$event'])
  onShellClick(event: MouseEvent): void {
    this.closeFlyout();
  }

  // ─── Profile & Nav ───────────────────────────────────────────────────────────

  getAdminProfile() {
    const profile = this.localStorageService.getCacheData('ADMIN_PROFILE');
    if (profile) {
      this.adminProfile = profile;
      this.orgDetails = this.adminProfile.orgDetails || {};
      this.finalNavOption = this.navigationService.getOrgOptions();
      this.mapPermissions();
    }
  }

  mapPermissions() {
    const routePolicies = this.adminProfile.policy?.[0]?.route_policies || {};
    const tabPolicies = this.adminProfile.policy?.[0]?.tab_policies || {};

    const dashboardTabMap: { [key: string]: string } = {
      'orgDashboard': 'Dashboard',
      'orgMenuItems': 'menuItems',
      'outletExcelExport': 'Orders',
      'orgReviews': 'Reviews',
      'customer': 'User',
      'orgVendorInfo': 'vendorInfo',
      'orgMenuCounters': 'menuCounters',
      'auditReport': 'auditReports',
      'orgEmpPoll': 'orgEmpPoll',
      'orgSalaryDeduction': 'salaryDeduction'
    };

    this.finalNavOption.forEach((el: any) => {
      const dashboardPolicyKey = dashboardTabMap[el.route];
      if (dashboardPolicyKey && tabPolicies[dashboardPolicyKey] === false) {
        el.showParent = false;
      } else {
        el.showParent = routePolicies[el.route] !== false;
        if (el.children) {
          el.children.forEach((child: any) => {
            if (routePolicies[child.route]) {
              child.showChild = true;
              el.showParent = true;
            } else {
              child.showChild = false;
            }
          });
        }
      }
    });
  }

  setActiveStateFromRoute(url: string): void {
    this.selectedIndex = -1;
    this.openChildSectionIndex = -1;
    this.childSelectedIndex = -1;
    let currentPath = url.split('?')[0].replace('/orgapp/', '');
    if (currentPath.startsWith('/')) currentPath = currentPath.substring(1);
    
    // Strip sub-paths
    const rootSegment = currentPath.split('/')[0];

    for (let i = 0; i < this.finalNavOption.length; i++) {
      const nav = this.finalNavOption[i];
      if (nav.children && nav.children.length > 0) {
        for (let j = 0; j < nav.children.length; j++) {
          const child = nav.children[j];
          if (child.route && currentPath.startsWith(child.route)) {
            this.openChildSectionIndex = i;
            this.childSelectedIndex = j;
            return;
          }
        }
      } else if (nav.route && (rootSegment === nav.route || currentPath.includes(nav.route))) {
        this.selectedIndex = i;
        return;
      }
    }
  }

  selectChildLink(route: any, parentIndex: number, childIndex: number) {
    this.router.navigate(['/orgapp/' + route]);
    this.openChildSectionIndex = parentIndex;
    this.childSelectedIndex = childIndex;
    this.selectedIndex = -1;
    
    const child = this.finalNavOption[parentIndex]?.children?.[childIndex];
    if (child?.clearRunTimeStorage) {
      child.clearRunTimeStorage.forEach((item: any) => this.runtimeStorageService.resetCacheData(item));
    }
    this.closeFlyout();
  }

  async logout() {
    await this.apiMainService.logout();
    this.localStorageService.resetAllCacheData();
    this.runtimeStorageService.resetAllCacheData();
    this.router.navigate(['/login']);
  }

  getInitials(name: string): string {
    if (!name) return '';
    let parts = name.trim().split(' ');
    return parts.length === 1 
      ? parts[0].charAt(0).toUpperCase() 
      : parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
  }

  getAvatarColor(name: string): string {
    const colors = ['#1d4ed8', '#7c3aed', '#0284c7', '#16a34a', '#dc2626'];
    return colors[name ? name.length % colors.length : 0];
  }
}
