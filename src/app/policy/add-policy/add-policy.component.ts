import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  DEFAULT_BUTTON_POLICIES,
  DEFAULT_ROUTE_POLICIES,
  DEFAULT_TAB_POLICIES,
  GROUPED_ROUTE_POLICIES,
  GROUPED_BUTTON_POLICIES,
  GROUPED_TAB_POLICIES
} from 'src/config/policy.config';
import { ApiMainService } from '@service/apiService/apiMain.service';

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

  private readonly ORG_DASHBOARD_KEYS = [
    'home', 'orgDashboard', 'consumptionOrders', 'orgMenuItems', 'outletExcelExport', 
    'dailyAdminExcelExport', 'orgReviews', 'customer', 'orgVendorInfo', 
    'orgMenuCounters', 'auditReport', 'orgIncidentManagement', 'orgChecklist', 
    'orgBulkOrderHistory', 'orgEmpPoll', 'orgSalaryDeduction', 'billing'
  ];

  get filteredRoutePolicies() {
    return this.groupedRoutePolicies.map(g => ({
      ...g,
      keys: g.keys.filter(k => {
        const isOrg = this.ORG_DASHBOARD_KEYS.includes(k) || k.startsWith('org');
        return this.activeTab === 'org' ? isOrg : !isOrg;
      })
    })).filter(g => g.keys.length > 0);
  }

  get filteredButtonPolicies() {
    return this.groupedButtonPolicies.map(g => ({
      ...g,
      keys: g.keys.filter(k => {
        const isOrg = this.ORG_DASHBOARD_KEYS.includes(k) || k.startsWith('submit') || k.toLowerCase().includes('organization');
        return this.activeTab === 'org' ? isOrg : !isOrg;
      })
    })).filter(g => g.keys.length > 0);
  }

  get filteredTabPolicies() {
    return this.groupedTabPolicies.map(g => ({
      ...g,
      keys: g.keys.filter(k => {
        const isOrg = this.ORG_DASHBOARD_KEYS.includes(k) || k.startsWith('org') || k.toLowerCase().includes('virtualcafeteria');
        return this.activeTab === 'org' ? isOrg : !isOrg;
      })
    })).filter(g => g.keys.length > 0);
  }

  constructor(
    private apiMainService: ApiMainService,
    public dialogRef: MatDialogRef<AddPolicyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.policyId = this.data?.id || null;
    this.loadPolicies();
  }

  async loadPolicies() {
    try {
      const response: any = await this.apiMainService.getAllPolicy();
      this.policyArr = response || [];
      if (this.policyId) {
        this.editMode = true;
        this.populatePolicy(this.policyId);
      }
    } catch (error) {
      console.error('Error loading policies:', error);
    }
  }

  populatePolicy(id: string) {
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

  async savePolicy() {
    if (!this.policyObj.policy_name || !this.policyObj.policy_description) {
      this.showErrorMsg = true;
      return;
    }
    this.showErrorMsg = false;
    try {
      if (this.editMode) {
        await this.apiMainService.updatePolicy(this.policyId, this.policyObj);
      } else {
        await this.apiMainService.addPolicy(this.policyObj);
      }
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Error saving policy:', error);
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
    const activeKeys: string[] = [];
    this.filteredRoutePolicies.forEach(g => activeKeys.push(...g.keys));

    const allSelected = activeKeys.every(k => this.policyObj.route_policies[k]);
    const updated = { ...this.policyObj.route_policies };

    activeKeys.forEach(k => updated[k] = !allSelected);

    this.policyObj = {
      ...this.policyObj,
      route_policies: updated
    };
  }

  selectAllButtons() {
    const activeKeys: string[] = [];
    this.filteredButtonPolicies.forEach(g => activeKeys.push(...g.keys));

    const allSelected = activeKeys.every(k => this.policyObj.button_policies[k]);
    const updated = { ...this.policyObj.button_policies };

    activeKeys.forEach(k => updated[k] = !allSelected);

    this.policyObj = {
      ...this.policyObj,
      button_policies: updated
    };
  }

  selectAllTabs() {
    const activeKeys: string[] = [];
    this.filteredTabPolicies.forEach(g => activeKeys.push(...g.keys));

    const allSelected = activeKeys.every(k => this.policyObj.tab_policies[k]);
    const updated = { ...this.policyObj.tab_policies };

    activeKeys.forEach(k => updated[k] = !allSelected);

    this.policyObj = {
      ...this.policyObj,
      tab_policies: updated
    };
  }

  togglePolicy(type: 'route' | 'button' | 'tab', key: string) {
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
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
