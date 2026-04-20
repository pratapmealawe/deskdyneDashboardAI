import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '@service/toaster.service';
import { LocalStorageService } from '@service/local-storage.service';
import { ApiMainService } from './apiService/apiMain.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(
    private localStorageService: LocalStorageService,
    private toasterService: ToasterService,
    private apiMainService: ApiMainService,
    public router: Router
  ) {}

  public isOrgUser(profile: any): boolean {
    if (!profile) return false;
    const orgRoles = ['ORGADMIN', 'SITEEXE', 'HYPERPURE_ADMIN', 'HYPERPURE_POC'];
    const orgPolicies = ['Org Admin', 'orgAdmin'];
    return (
      orgRoles.includes(profile.role) ||
      orgPolicies.includes(profile.policy_name)
    );
  }

  async canActivate(route: any, state: any): Promise<boolean> {
    const profile = this.localStorageService.getCacheData('ADMIN_PROFILE');
    
    if (!profile) {
      this.localStorageService.setCacheData('RETURN_URL', state.url);
      this.router.navigate(['/login']);
      return false;
    }

    // Dynamic policy fetch if missing
    if (!profile.policy || !profile.policy[0] || !profile.policy[0].route_policies) {
      try {
        const userPolicy: any = await this.apiMainService.getPolicyByName(profile.policy_name);
        if (userPolicy) {
          profile.policy = [userPolicy];
          this.localStorageService.setCacheData('ADMIN_PROFILE', profile);
        }
      } catch (error) {
        console.error('Failed to fetch policy:', error);
      }
    }

    let res: boolean;
    if (profile.policy && profile.policy[0] && profile.policy[0].route_policies) {
      // Handle app/ or orgapp/ prefixes and clean the URL
      let url = state.url.replace(/^\/(app|orgapp)(\/|$)/, '');
      
      // Remove query parameters if any
      url = url.split('?')[0];
      res = this.checkForPermission(url, profile.policy[0].route_policies);
    } else if (state.url.includes('/currentOrder')) {
      res = true;
    } else {
      res = false;    }

    if (res === false) {
      const isOrgAdmin = this.isOrgUser(profile);
      const redirectPath = isOrgAdmin ? '/orgapp/home' : '/app/home';
      
      this.router.navigate([redirectPath]);
      return false;
    }

    // New check: If user is an org user, they should NOT be on /app/...
    // If user is a general user, they should NOT be on /orgapp/...
    const isOrgAdmin = this.isOrgUser(profile);
    const isAccessingOrgApp = state.url.startsWith('/orgapp');
    const isAccessingApp = state.url.startsWith('/app');

    if (isOrgAdmin && isAccessingApp) {
      this.router.navigate(['/orgapp/home']);
      return false;
    }

    if (!isOrgAdmin && isAccessingOrgApp) {
      this.router.navigate(['/app/home']);
      return false;
    }

    return true;
  }

  checkForPermission(url: string, keys: any): boolean {
    if (!url || url === '' || url === 'home' || url === 'orgDashboard') return true;
    return keys[url] ? true : false;
  }
}
