import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, startWith, takeUntil } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { PolicyService } from 'src/service/policy.service';

// OLD IMAGE METHOD (NgbModal)
import { MatDialog } from '@angular/material/dialog';
import { ImageCropperComponent } from 'src/app/common-components/image-cropper/image-cropper.component';

interface Cafeteria {
  _id: string;
  cafeteria_id: string;
  cafeteria_name: string;
}
interface Organization {
  _id: string;
  organization_name: string;
  cafeteriaList?: Cafeteria[];
}

interface AdminForm {
  name: FormControl<string>;
  phoneNo: FormControl<string>;
  email: FormControl<string | null>;
  role: FormControl<string>;
  policy_name: FormControl<string>;
  orgId: FormControl<string>;        // required for ORGADMIN/HYPERPURE_ADMIN/HYPERPURE_POC
  cafeIds: FormControl<string[]>;    // required for HYPERPURE_POC
}

/** Require at least one item in an array control */
const requiredArray = (): ValidatorFn => {
  return (ctrl: AbstractControl) => {
    const val = ctrl.value;
    if (Array.isArray(val) && val.length > 0) return null;
    return { required: true };
  };
};

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  form: FormGroup<AdminForm> = new FormGroup<AdminForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(60)],
    }),
    // Allow +91 style too
    phoneNo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)],
    }),
    email: new FormControl<string | null>(null, {
      validators: [Validators.email], // not required; empty is OK
    }),
    role: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    policy_name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    orgId: new FormControl('', { nonNullable: true }),       // dynamic validators
    cafeIds: new FormControl<string[]>([], { nonNullable: true }), // dynamic validators
  });

  submitting = false;
  editMode = false;

  // Keep admin id outside the form
  private adminId: string | null = null;

  // OLD IMAGE METHOD state
  imageUrl: string | null = null;        // preview (or server) URL
  uploadedImageFile: File | null = null; // cropped file

  roleArr = [
    { text: 'Admin', value: 'ADMIN' },
    { text: 'Org Admin', value: 'ORGADMIN' },
    { text: 'Site Executive', value: 'SITEEXE' },
    { text: 'Developer', value: 'DEVELOPER' },
    { text: 'Support', value: 'SUPPORT' },
    { text: 'Sales', value: 'SALES' },
    { text: 'Operations', value: 'OPERATIONS' },
    { text: 'Advisor', value: 'ADVISOR' },
    { text: 'Hyperpure Admin', value: 'HYPERPURE_ADMIN' },
    { text: 'Hyperpure POC', value: 'HYPERPURE_POC' },
  ];

  policyArr: any[] = [];
  orgList: Organization[] = [];
  cafeteriaOptions: Cafeteria[] = [];

  btnPolicy: any;
  cacheAdmin: any | null = null;

  // services
  private api = inject(ApiMainService);
  private router = inject(Router);
  private store = inject(RuntimeStorageService);
  private policyService = inject(PolicyService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();

    this.loadPolicies();
    this.loadOrganizations();

    // edit mode (from cache)
    this.cacheAdmin = this.store.getCacheData('VIEW_ADMIN');
    if (this.cacheAdmin) {
      this.editMode = true;
      this.patchEditData(this.cacheAdmin);
    }

    // normalize on blur
    this.form.controls.phoneNo.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      // noop; we normalize on submit to avoid cursor jumps
    });
    this.form.controls.email.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      // noop; normalize on submit
    });

    // role-driven validators
    this.form.controls.role.valueChanges
      .pipe(takeUntil(this.destroy$), startWith(this.form.controls.role.value))
      .subscribe((role) => this.applyRoleValidators(role));

    // when org changes, refresh cafeterias and clear selection for POC
    this.form.controls.orgId.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((orgId) => {
      const org = this.orgList.find((o) => o._id === orgId) || null;
      this.cafeteriaOptions = org?.cafeteriaList || [];
      if (this.form.controls.role.value === 'HYPERPURE_POC' || this.form.controls.role.value === 'SITEEXE') {
        this.form.controls.cafeIds.setValue([]);
        this.form.controls.cafeIds.updateValueAndValidity();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyRoleValidators(role: string) {
    const orgCtrl = this.form.controls.orgId;
    const cafeCtrl = this.form.controls.cafeIds;

    // Clear both first (prevents sticky invalid state)
    orgCtrl.clearValidators();
    cafeCtrl.clearValidators();
    orgCtrl.setErrors(null);
    cafeCtrl.setErrors(null);

    if (role === 'ORGADMIN' || role === 'HYPERPURE_ADMIN') {
      orgCtrl.addValidators([Validators.required]);
      cafeCtrl.setValue([]); // N/A
    } else if (role === 'HYPERPURE_POC' || role === 'SITEEXE') {
      orgCtrl.addValidators([Validators.required]);
      cafeCtrl.addValidators([requiredArray()]);
    } else {
      // other roles: neither required
      orgCtrl.setValue('');
      cafeCtrl.setValue([]);
    }

    orgCtrl.updateValueAndValidity({ emitEvent: false });
    cafeCtrl.updateValueAndValidity({ emitEvent: false });
  }

  private patchEditData(admin: any) {
    this.adminId = admin?._id ?? null;

    console.log(admin);

    this.form.patchValue({
      name: (admin?.name ?? '') as string,
      phoneNo: (admin?.phoneNo ?? '') as string,
      email: (admin?.email ?? null) as string | null,
      role: (admin?.role ?? '') as string,
      policy_name: ((admin?.policy_name ?? admin?.policy) ?? '') as string,
      orgId: (admin?.orgDetails?._id ?? '') as string,
      cafeIds: Array.isArray(admin?.cafeDetails)
        ? admin.cafeDetails
          .map((c: any) => (c?.cafeteria_id))
          .filter(Boolean)
        : [],
    });

    if (admin?.imageUrl) {
      this.imageUrl = environment.imageUrl + admin.imageUrl;
    }
  }

  private async loadPolicies() {
    try {
      const arr: any = await this.api.getAllPolicy();
      this.policyArr = Array.isArray(arr) ? arr : [];
    } catch (e) {
      console.log('Failed to load policies', e);
    }
  }

  private async loadOrganizations() {
    try {
      const searchObj = { countOnly: false };
      const page = 1;
      const result: any[] = await this.api.B2B_fetchFilteredAllOrgs(searchObj, page);
      this.orgList = Array.isArray(result) ? result : [];

      // hydrate cafeteria options when editing
      const currentOrgId = this.form.controls.orgId.value;
      if (currentOrgId) {
        const org = this.orgList.find((o) => o._id === currentOrgId);
        this.cafeteriaOptions = org?.cafeteriaList || [];
      }
    } catch (e) {
      console.log('Failed to load organizations', e);
    }
  }

  // === OLD IMAGE METHOD: hidden input + NgbModal cropper ===
  handleFileInput($event: any) {
    if ($event?.target?.files?.length) {
      const file: File = $event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const uploadedImageUrl = reader.result as string;

        try {
          const dialogRef = this.dialog.open(ImageCropperComponent, {
            width: '50%',
            panelClass: 'image-cropper-dialog',
            disableClose: true,
            data: {
              imageUrl: uploadedImageUrl,
              imageWidth: 150,
              imageHeight: 150,
              aspectRatio: 1
            }
          });

          dialogRef.afterClosed().subscribe((result: any) => {
            if (result?.croppedImages?.file && result?.croppedImages?.resizeDataUrl) {
              this.uploadedImageFile = result.croppedImages.file as File;
              this.imageUrl = result.croppedImages.resizeDataUrl as string;
            }
          });
        } catch (e) {
          console.log('Error opening cropper modal', e);
        }
      };
    }
  }

  private normalizeBeforeSubmit() {
    // trim spaces and normalize
    const phone = (this.form.controls.phoneNo.value || '').trim();
    const email = (this.form.controls.email.value || '')?.trim() || null;

    this.form.controls.phoneNo.setValue(phone as string);
    this.form.controls.email.setValue(email as any);

    // Re-run validation after normalization
    this.form.updateValueAndValidity({ onlySelf: false, emitEvent: false });
  }

  async onSubmit() {
    this.normalizeBeforeSubmit();

    if (this.form.invalid) {
      // mark all as touched so errors show
      Object.values(this.form.controls).forEach(c => c.markAsTouched());
      return;
    }

    this.submitting = true;

    const val = this.form.getRawValue();

    const formData = new FormData();

    if (this.uploadedImageFile) formData.append('image', this.uploadedImageFile);
    formData.append('name', val.name);
    formData.append('phoneNo', val.phoneNo);
    if (val.email) formData.append('email', val.email);
    formData.append('role', val.role);
    formData.append('policy_name', val.policy_name);

    // OrgDetails / CafeDetails as per role
    const org = this.orgList.find((o) => o._id === val.orgId) || null;

    if (val.role === 'ORGADMIN' || val.role === 'HYPERPURE_ADMIN' || val.role === 'HYPERPURE_POC' || val.role === 'SITEEXE') {
      if (org) formData.append('orgDetails', JSON.stringify(org));
    }

    if (val.role === 'HYPERPURE_POC' || val.role === 'SITEEXE') {
      const cafes = (org?.cafeteriaList || []).filter((c) => val.cafeIds.includes(c.cafeteria_id));
      const cafeDetails = cafes.map((c) => ({
        cafeteria_name: c.cafeteria_name,
        cafeteria_id: c.cafeteria_id,
        _id: c._id,
      }));
      formData.append('cafeDetails', JSON.stringify(cafeDetails));
    }

    try {
      if (this.editMode && this.adminId) {
        await this.api.updateadminprofile(this.adminId, formData);
      } else {
        await this.api.saveAdminProfile(formData);
      }
      this.store.resetCacheData('VIEW_ADMIN');
      this.router.navigate(['/app/admin']);
    } catch (e) {
      console.log('Error saving admin profile', e);
    } finally {
      this.submitting = false;
    }
  }

  onCancel() {
    this.store.resetCacheData('VIEW_ADMIN');
    this.router.navigate(['/app/admin']);
  }
}
