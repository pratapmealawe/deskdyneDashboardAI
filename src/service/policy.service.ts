import { Injectable } from '@angular/core';
import { DEFAULT_BUTTON_POLICIES, PERMISSION_MAP } from 'src/config/policy.config';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private _cachedButtonPolicy: Record<string, boolean> | null = null;

  constructor(private localStorageService: LocalStorageService) { }

  hasPermission(permissionKey: string): boolean {
    const policy = this._getButtonPolicy();

    // Direct flat key lookup (e.g. 'addOutlet')
    if (permissionKey in policy) {
      return !!policy[permissionKey];
    }

    // MODULE:ACTION lookup via map (e.g. 'OUTLET:ADD')
    const mappedKey = PERMISSION_MAP[permissionKey];
    if (mappedKey) {
      return !!policy[mappedKey];
    }

    return false;
  }

  /** Returns the raw button_policies object (cached until clearCache() is called). */
  getCurrentButtonPolicy(): Record<string, boolean> {
    return this._getButtonPolicy();
  }

  getCurrentTabPolicy(): Record<string, boolean> {
    const profile = this.localStorageService.getCacheData('ADMIN_PROFILE');
    return profile?.policy[0]?.tab_policies || {};
  }

  filterTabsByPolicy(tabList: any[]): any[] {
    const tabPolicy = this.getCurrentTabPolicy();
    const hasPolicy = Object.keys(tabPolicy || {}).length > 0;
    return hasPolicy ? tabList.filter(item => tabPolicy[item.policyKey] !== false) : [];
  }

  clearCache(): void {
    this._cachedButtonPolicy = null;
  }

  private _getButtonPolicy(): Record<string, boolean> {
    if (!this._cachedButtonPolicy) {
      const profile = this.localStorageService.getCacheData('ADMIN_PROFILE');
      const stored = profile?.policy[0]?.button_policies || {};
      this._cachedButtonPolicy = { ...DEFAULT_BUTTON_POLICIES, ...stored };
    }
    return this._cachedButtonPolicy as Record<string, boolean>;
  }
}
