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
    private apiMainService: ApiMainService,
    public router: Router
  ) {}

  public isOrgUser(profile: any): boolean {
    if (!profile) return false;
    // Keep legacy check for compatibility during transition
    const orgRolesLegacy = ['ORGADMIN', 'SITEEXE', 'HYPERPURE_ADMIN', 'HYPERPURE_POC'];
    if (orgRolesLegacy.includes(profile.role)) return true;
    console.log(profile,'isOrgUser');
    // New RBAC check: check if any assigned role name indicates an org user
    if (profile.roles && profile.roles.length > 0) {
       return profile.roles.some((role: any) => 
         role.name && ['org_admin', 'ORGADMIN', 'site_executive'].includes(role.name.toLowerCase())
       );
    }
    return false;
  }

  public getPermissionKeys(profile: any): string[] {
    if (!profile || !profile.roles) return [];
    const keys = new Set<string>();
    profile.roles.forEach((role: any) => {
      if (role.isActive && role.permissions) {
        role.permissions.forEach((p: any) => {
          if (p.key) keys.add(p.key);
        });
      }
    });
    return Array.from(keys);
  }

  async canActivate(route: any, state: any): Promise<boolean> {
    const profile = this.localStorageService.getCacheData('ADMIN_PROFILE');
    
    if (!profile) {
      this.localStorageService.setCacheData('RETURN_URL', state.url);
      this.router.navigate(['/login']);
      return false;
    }

    // Handle app/ or orgapp/ prefixes and clean the URL
    let url = state.url.replace(/^\/(app|orgapp)(\/|$)/, '');
    // Remove query parameters if any
    url = url.split('?')[0];

    const hasAccess = this.checkForPermission(url, profile);

    if (hasAccess === false && !state.url.includes('/currentOrder')) {
      const isOrgAdmin = this.isOrgUser(profile);
      const redirectPath = isOrgAdmin ? '/orgapp/home' : '/app/home';
      
      this.router.navigate([redirectPath]);
      return false;
    }

    // Check for Org vs General app consistency
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

  checkForPermission(url: string, profile: any): boolean {
    return true; // Bypass for now
  }

  public isSuperAdmin(profile: any): boolean {
    if (!profile || !profile.roles) return false;
    return profile.roles.some((role: any) => role.name === 'Super Admin');
  }

  public filterTabsByPolicy(allTabs: any[]): any[] {
    return allTabs; // Bypass for now
  }

  public getCurrentButtonPolicy(): any {
    return { add: true, edit: true, delete: true, view: true, export: true };
  }

  public hasPermission(key: string): boolean {
    return true; // Bypass for now
  }
}
