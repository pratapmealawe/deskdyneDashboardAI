import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { NavigationService } from 'src/service/navigation.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, NgbModule]
})
export class AppLayoutComponent implements OnInit {
  @ViewChild('content') content: any;
  adminProfile: any = {};
  imageUrl = environment.imageUrl;
  finalNavOption: any = [];
  selectedIndex: number = -1;
  childSelectedIndex: number = -1;
  openChildSectionIndex: number = -1;

  constructor(
    private router: Router,
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private runtimeStorageService: RuntimeStorageService,
    private offcanvasService: NgbOffcanvas,
    public navigationService: NavigationService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.setActiveStateFromRoute(event.url);
      }
    });
  }

  ngOnInit(): void {
    this.getAdminProfile();
    this.setActiveStateFromRoute(this.router.url);
  }

  getAdminProfile() {
    const profile = this.localStorageService.getCacheData('ADMIN_PROFILE');
    if (profile) {
      this.adminProfile = profile;
      this.finalNavOption = this.navigationService.getDeskDineOptions();
      this.mapPermissions();
    }
  }

  mapPermissions() {
    const routePolicies = this.adminProfile.policy?.[0]?.route_policies || {};
    this.finalNavOption.forEach((el: any) => {
      if (el.name?.trim().toLowerCase() === 'policy') {
        el.showParent = true;
        el.children?.forEach((child: any) => child.showChild = true);
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
    let currentPath = url.split('?')[0].replace('/app/', '');
    if (currentPath.startsWith('/')) currentPath = currentPath.substring(1);

    for (let i = 0; i < this.finalNavOption.length; i++) {
      const nav = this.finalNavOption[i];
      if (nav.children && nav.children.length > 0) {
        for (let j = 0; j < nav.children.length; j++) {
          const child = nav.children[j];
          if (child.route && currentPath.includes(child.route)) {
            this.openChildSectionIndex = i;
            this.childSelectedIndex = j;
            return;
          }
        }
      } else if (nav.route && currentPath.includes(nav.route)) {
        this.selectedIndex = i;
        return;
      }
    }
  }

  selectLink(nav: any, index: number): void {
    if (nav.children && nav.children.length > 0) {
      this.openChildSectionIndex = this.openChildSectionIndex === index ? -1 : index;
    } else {
      this.selectedIndex = index;
      this.openChildSectionIndex = -1;
      this.closeSidebar();
      this.router.navigate(['/app/' + nav.route]);
    }
  }

  selectChildLink(route: any, parentIndex: number, childIndex: number) {
    this.router.navigate(['/app/' + route]);
    this.openChildSectionIndex = parentIndex;
    this.childSelectedIndex = childIndex;
    this.selectedIndex = -1;
    const child = this.finalNavOption[parentIndex].children[childIndex];
    if (child.clearRunTimeStorage) {
      child.clearRunTimeStorage.forEach((item: any) => this.runtimeStorageService.resetCacheData(item));
    }
    this.closeSidebar();
  }

  openEnd() {
    this.offcanvasService.open(this.content, { position: 'start' });
  }

  closeSidebar() {
    this.offcanvasService.dismiss();
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
    return parts.length === 1 ? parts[0].charAt(0).toUpperCase() : parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
  }

  getAvatarColor(name: string): string {
    const colors = ['#192754', '#FF6B6B', '#17C964', '#FFB020', '#9333EA'];
    return colors[name ? name.length % colors.length : 0];
  }
}
