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
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule]
})
export class AppLayoutComponent implements OnInit {
  adminProfile: any = {};
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
      this.router.navigate(['/app/' + link.route]);
      return;
    }

    // Toggle flyout
    if (this.activeFlyoutIndex === index) {
      this.closeFlyout();
      return;
    }

    const el = event.currentTarget as HTMLElement;
    const filteredChildren = link.children.filter((c: any) => c.showChild);
    const approximateHeight = (filteredChildren.length * 44) + 50; // Header + items padding
    const windowHeight = window.innerHeight;
    const rect = el.getBoundingClientRect();

    if (rect.top + approximateHeight > windowHeight - 20) {
      // If overflows bottom, push up but keep at least 10px from top
      this.flyoutY = Math.max(10, windowHeight - approximateHeight - 20);
    } else {
      this.flyoutY = rect.top;
    }

    this.flyoutChildren = filteredChildren;
    this.flyoutParent = link;
    this.activeFlyoutIndex = index;
    this.openChildSectionIndex = index;
  }

  @HostListener('window:resize')
  @HostListener('window:scroll')
  onWindowScrollOrResize(): void {
    this.closeFlyout();
  }

  closeFlyout(): void {
    this.activeFlyoutIndex = -1;
    this.flyoutChildren = [];
    this.flyoutParent = null;
  }

  onShellClick(event: MouseEvent): void {
    this.closeFlyout();
  }

  // ─── Profile & Nav ───────────────────────────────────────────────────────────

  getAdminProfile() {
    const profile = this.localStorageService.getCacheData('ADMIN_PROFILE');
    if (profile) {
      this.adminProfile = profile;
      this.finalNavOption = this.navigationService.getDeskDineOptions();
      this.mapPermissions();
    }
  }

  mapPermissions() {
    // TODO: Temporary — show all nav items regardless of policy
    this.finalNavOption.forEach((el: any) => {
      el.showParent = true;
      el.children?.forEach((child: any) => child.showChild = true);
    });
  }

  setActiveStateFromRoute(url: string): void {
    this.selectedIndex = -1;
    this.openChildSectionIndex = -1;
    this.childSelectedIndex = -1;
    let currentPath = url.split('?')[0].replace('/app/', '');
    if (currentPath.startsWith('/')) currentPath = currentPath.substring(1);
    // Strip sub-paths so 'manage-organization/xyz' → 'manage-organization'
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
      } else if (nav.route && rootSegment === nav.route) {
        this.selectedIndex = i;
        return;
      }
    }
  }

  selectChildLink(route: any, parentIndex: number, childIndex: number) {
    this.router.navigate(['/app/' + route]);
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
