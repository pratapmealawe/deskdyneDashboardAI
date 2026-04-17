import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  DEFAULT_BUTTON_POLICIES,
  DEFAULT_ROUTE_POLICIES,
  DEFAULT_TAB_POLICIES,
  GROUPED_ROUTE_POLICIES,
  GROUPED_BUTTON_POLICIES,
  GROUPED_TAB_POLICIES
} from 'src/config/policy.config';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ]
})
export class AddPolicyComponent implements OnInit {
  policyObj = {
    policy_name: '',
    policy_description: '',
    route_policies: { ...DEFAULT_ROUTE_POLICIES },
    button_policies: { ...DEFAULT_BUTTON_POLICIES },
    tab_policies: { ...DEFAULT_TAB_POLICIES },
  };

  groupedRoutePolicies = GROUPED_ROUTE_POLICIES;
  groupedButtonPolicies = GROUPED_BUTTON_POLICIES;
  groupedTabPolicies = GROUPED_TAB_POLICIES;

  policyArr: any[] = [];
  editMode = false;
  showErrorMsg = false;
  policyId: string | null = null;

  activeTab: 'main' | 'org' = 'main';

  get filteredRoutePolicies() {
    return this.groupedRoutePolicies.filter(g => {
      const isOrgGroup = g.title === 'ORGANIZATION';
      const hasOrgKeys = g.keys.some(k => k.startsWith('org') || k.includes('organization'));
      return this.activeTab === 'org' ? (isOrgGroup || hasOrgKeys) : (!isOrgGroup && !hasOrgKeys);
    });
  }

  get filteredButtonPolicies() {
    return this.groupedButtonPolicies.filter(g => {
      const isOrgGroup = g.title === 'ORGANIZATION' || g.title === 'B2B ORGANIZATION MANAGEMENT';
      const hasOrgKeys = g.keys.some(k => k.startsWith('submit') || k.includes('Organization'));
      return this.activeTab === 'org' ? (isOrgGroup || hasOrgKeys) : (!isOrgGroup && !hasOrgKeys);
    });
  }

  get filteredTabPolicies() {
    return this.groupedTabPolicies.filter(g => {
      const isOrgGroup = g.title === 'ORGANIZATION & COMPLIANCE';
      const hasOrgKeys = g.keys.some(k => k.startsWith('org') || k.includes('virtualCafeteria'));
      return this.activeTab === 'org' ? (isOrgGroup || hasOrgKeys) : (!isOrgGroup && !hasOrgKeys);
    });
  }

  constructor(
    private apiMainService: ApiMainService,
    private runtimeStorage: RuntimeStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.policyId = this.runtimeStorage.getCacheData('VIEW_POLICY');
    this.loadPolicies();
  }

  async loadPolicies() {
    try {
      const response: any = await this.apiMainService.getAllPolicy();
      this.policyArr = response || [];
      if (this.policyId) {
        this.editPolicy(this.policyId);
      }
    } catch (error) {
      console.error('Error loading policies:', error);
    }
  }

  editPolicy(id: string) {
    this.editMode = true;
    const policy = this.policyArr.find((p) => p._id === id);
    if (policy) {
      this.policyObj = {
        policy_name: policy.policy_name,
        policy_description: policy.policy_description,
        route_policies: { ...DEFAULT_ROUTE_POLICIES, ...(policy.route_policies || {}) },
        button_policies: { ...DEFAULT_BUTTON_POLICIES, ...(policy.button_policies || {}) },
        tab_policies: { ...DEFAULT_TAB_POLICIES, ...(policy.tab_policies || {}) },
      };
    }
  }

  async addPolicy() {
    if (!this.policyObj.policy_name || !this.policyObj.policy_description) {
      this.showErrorMsg = true;
      return;
    }
    this.showErrorMsg = false;
    try {
      await this.apiMainService.addPolicy(this.policyObj);
      this.router.navigate(['/app/policy']).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Error adding policy:', error);
    }
  }

  async updatePolicy() {
    try {
      console.log(this.policyId, this.policyObj);
      await this.apiMainService.updatePolicy(this.policyId, this.policyObj);
      this.router.navigate(['/app/policy']).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Error updating policy:', error);
    }
  }

  showReferencePolicy(event: any) {
    const policy = this.policyArr.find((p) => p._id === event.value);
    if (policy) {
      this.policyObj = {
        ...this.policyObj,
        route_policies: { ...DEFAULT_ROUTE_POLICIES, ...(policy.route_policies || {}) },
        button_policies: { ...DEFAULT_BUTTON_POLICIES, ...(policy.button_policies || {}) },
        tab_policies: { ...DEFAULT_TAB_POLICIES, ...(policy.tab_policies || {}) },
      };
    }
  }

  selectAllRoutes() {
    const allKeys: string[] = [];
    this.groupedRoutePolicies.forEach(g => allKeys.push(...g.keys));

    const allSelected = allKeys.every(k => this.policyObj.route_policies[k]);
    const updated = { ...this.policyObj.route_policies };

    allKeys.forEach(k => updated[k] = !allSelected);

    this.policyObj = {
      ...this.policyObj,
      route_policies: updated
    };
  }

  selectAllButtons() {
    const allKeys: string[] = [];
    this.groupedButtonPolicies.forEach(g => allKeys.push(...g.keys));

    const allSelected = allKeys.every(k => this.policyObj.button_policies[k]);
    const updated = { ...this.policyObj.button_policies };

    allKeys.forEach(k => updated[k] = !allSelected);

    this.policyObj = {
      ...this.policyObj,
      button_policies: updated
    };
  }

  selectAllTabs() {
    const allKeys: string[] = [];
    this.groupedTabPolicies.forEach(g => allKeys.push(...g.keys));

    const allSelected = allKeys.every(k => this.policyObj.tab_policies[k]);
    const updated = { ...this.policyObj.tab_policies };

    allKeys.forEach(k => updated[k] = !allSelected);

    this.policyObj = {
      ...this.policyObj,
      tab_policies: updated
    };
  }

  togglePolicy(type: 'route' | 'button' | 'tab', key: string) {
    console.log(type, key)
    if (type === 'route') {
      const updated = { ...this.policyObj.route_policies };
      updated[key] = !updated[key];
      this.policyObj = { ...this.policyObj, route_policies: updated };
    } else if (type === 'button') {
      const updated = { ...this.policyObj.button_policies };
      updated[key] = !updated[key];
      this.policyObj = { ...this.policyObj, button_policies: updated };
    } else if (type === 'tab') {
      const updated = { ...this.policyObj.tab_policies };
      updated[key] = !updated[key];
      this.policyObj = { ...this.policyObj, tab_policies: updated };
    }

    console.log(this.policyObj, "policyy objee u")
  }

  cancelPolicy() {
    this.router.navigate(['/app/policy']);
  }
}
