import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToasterService } from 'src/app/toaster/toaster.service';
import { LocalStorageService } from 'src/service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(
    private localStorageService: LocalStorageService,
    private toasterService: ToasterService,
    public router: Router,
  ) { }

  canActivate(route: any, state: any): boolean {
    let res: boolean
    const profile = this.localStorageService.getCacheData('ADMIN_PROFILE');
    // const keys = ;
    if (profile && profile.policy[0].route_policies) {
      const url = state.url.replace('/', '');
      res = this.checkForPermission(url, profile.policy[0].route_policies)
    }
    else if(state.url == '/currentOrder'){
      res = true;
    }
    else {
      res = false
    }
    if (res === false) {
      this.localStorageService.resetAllCacheData();
      this.router.navigate(['/login']);
      this.toasterService.error(122);
    }
    return res;
  }

  checkForPermission(url: any, keys: any) {
    switch (url) {
      case url:
        return keys[url] ? true : false;
      default:
        return false;
    }
  }

}

export const accessGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate(route, state);
};
