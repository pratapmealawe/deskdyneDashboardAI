import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from '../../../service/apiService/apiMain.service';
import { ToasterService } from '../../../service/toaster.service';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-group-force-logout',
  templateUrl: './group-force-logout.component.html',
  styleUrls: ['./group-force-logout.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule]
})
export class GroupForceLogoutComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  orgList: any[] = [];
  cafeteriaList: any[] = [];
  vendorFirmList: any[] = [];

  targetTypes = [
    { value: 'organization', viewValue: 'Organization (User)' },
    { value: 'cafeteria', viewValue: 'Cafeteria (User)' },
    { value: 'vendorFirm', viewValue: 'Vendor Firm (Vendor)' },
    { value: 'all_users', viewValue: 'All Users' },
    { value: 'all_vendors', viewValue: 'All Vendors' },
    { value: 'all_admins', viewValue: 'All Admins' }
  ];

  constructor(
    private fb: FormBuilder,
    private apiMainService: ApiMainService,
    private toaster: ToasterService,
    public dialogRef: MatDialogRef<GroupForceLogoutComponent>
  ) {
    this.form = this.fb.group({
      targetType: ['organization', Validators.required],
      parentOrgId: [''],
      targetIds: [[]], // Multi-select IDs
    });
  }

  async ngOnInit() {
    this.isLoading = true;
    try {
      await Promise.all([
        this.fetchOrgList(),
        this.fetchVendorFirmList()
      ]);
    } catch (err) {
      this.toaster.error('Failed to initialize dialog data');
    } finally {
      this.isLoading = false;
    }

    // Watch targetType changes to update validation
    this.form.get('targetType')?.valueChanges.subscribe(val => {
      this.updateValidators(val);
      // For UX consistency with notifications, we clear selections but could keep parentOrg if needed.
      // However, different targets might need different org types (User vs Vendor), so clearing is safer.
      this.form.patchValue({
        targetIds: []
      }, { emitEvent: false });
    });

    // Watch parentOrgId for Cafeteria mode
    this.form.get('parentOrgId')?.valueChanges.subscribe(val => {
      if (this.form.get('targetType')?.value === 'cafeteria') {
        this.updateCafeteriaList(val);
        this.form.patchValue({ targetIds: [] });
      }
    });

    this.updateValidators('organization');
  }

  updateValidators(targetType: string) {
    const targetIdsControl = this.form.get('targetIds');
    const parentOrgIdControl = this.form.get('parentOrgId');

    targetIdsControl?.clearValidators();
    parentOrgIdControl?.clearValidators();

    if (targetType === 'organization' || targetType === 'vendorFirm') {
      targetIdsControl?.setValidators([Validators.required]);
    } else if (targetType === 'cafeteria') {
      targetIdsControl?.setValidators([Validators.required]);
      parentOrgIdControl?.setValidators([Validators.required]);
    }

    targetIdsControl?.updateValueAndValidity();
    parentOrgIdControl?.updateValueAndValidity();
  }

  async fetchOrgList() {
    const res: any = await this.apiMainService.B2B_fetchFilteredAllOrgs({ countOnly: false }, 1);
    this.orgList = Array.isArray(res) ? res : (res.data || []);
  }

  async fetchVendorFirmList() {
    const res: any = await this.apiMainService.getAllVendorFirms();
    this.vendorFirmList = Array.isArray(res) ? res : (res.data || []);
  }

  updateCafeteriaList(orgId: string) {
    const selectedOrg = this.orgList.find(o => o.orgID === orgId || o._id === orgId);
    this.cafeteriaList = (selectedOrg && selectedOrg.cafeteriaList) ? selectedOrg.cafeteriaList : [];
  }

  async submit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    const formVal = this.form.value;

    let payload: any = {
      appType: '',
      targetType: formVal.targetType,
      targetIds: formVal.targetIds
    };

    if (formVal.targetType === 'organization' || formVal.targetType === 'cafeteria') {
      payload.appType = 'USER';
    } else if (formVal.targetType === 'vendorFirm') {
      payload.appType = 'VENDOR';
    } else if (formVal.targetType === 'all_users') {
      payload.appType = 'USER';
      payload.targetType = 'all';
    } else if (formVal.targetType === 'all_vendors') {
      payload.appType = 'VENDOR';
      payload.targetType = 'all';
    } else if (formVal.targetType === 'all_admins') {
      payload.appType = 'ADMIN';
      payload.targetType = 'all';
    }

    try {
      const res: any = await this.apiMainService.forceLogout(payload);
      if (res && res.success) {
        this.toaster.success(res.message);
        this.dialogRef.close(true);
      } else {
        this.toaster.error(res.message || 'Failed to execute logout');
      }
    } catch (err) {
      console.error(err);
      this.toaster.error('Something went wrong');
    } finally {
      this.isLoading = false;
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}
