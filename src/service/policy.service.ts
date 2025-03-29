import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  constructor(private localStorageService: LocalStorageService) {}

  getCurrentButtonPolicy() {
    // const policy = this.localStorageService.getCacheData('ADMIN_PROFILE');
    // return policy?.policy[0]?.button_policies;
    return {};
  }
}
