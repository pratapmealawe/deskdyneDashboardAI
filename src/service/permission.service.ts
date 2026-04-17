import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'src/service/toaster.service';
import { LocalStorageService } from 'src/service/local-storage.service';
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

  async canActivate(route: any, state: any): Promise<boolean> {
    const profile = this.localStorageService.getCacheData('ADMIN_PROFILE');
    
    if (!profile) {
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
      console.log('Cleaned URL for permission:', url);
      res = this.checkForPermission(url, profile.policy[0].route_policies);
    } else if (state.url.includes('/currentOrder')) {
      res = true;
    } else {
      res = false;    }

    if (res === false) {
      const isOrgAdmin = profile.policy_name === 'orgAdmin' || profile.role === 'ORGADMIN';
      const redirectPath = isOrgAdmin ? '/orgapp/home' : '/app/home';
      
      // Clean up URLs for comparison to prevent infinite loop
      const currentUrl = state.url.split('?')[0];
      const normalizedRedirectPath = redirectPath.startsWith('/') ? redirectPath : '/' + redirectPath;

      if (currentUrl === normalizedRedirectPath) {
        console.warn('Infinite loop detected in PermissionsService. Redirecting to login.');
        this.router.navigate(['/login']);
        return false;
      }

      this.router.navigate([redirectPath]);
      return false;
    }
    return true;
  }

  checkForPermission(url: string, keys: any): boolean {
    if (!url || url === '' || url === 'home' || url === 'orgDashboard') return true;
    return keys[url] ? true : false;
  }
}
