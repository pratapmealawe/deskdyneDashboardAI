import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { NavigationEnd, Router } from '@angular/router';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'src/service/toaster.service';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { GoogleMapService } from 'src/service/google-map.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { REGEX } from 'src/shared/constants/regex';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss'],
})
export class AddOrganizationComponent implements OnInit {
  @ViewChild('content') content: any;
  @ViewChild('pocContent') pocContent: any;
  @ViewChild('geolocation') geolocation: any;

  // New Dialog Templates
  @ViewChild('pocDialogTemplate') pocDialogTemplate!: TemplateRef<any>;
  @ViewChild('cafeteriaDialogTemplate') cafeteriaDialogTemplate!: TemplateRef<any>;

  form: FormGroup; // Typed as FormGroup
  viewOrg: any;
  showUpdate: boolean = false;
  adminSelected: any = [];
  roleList = ['poc', 'admin', 'superAdmin'];

  pocSelected: any;
  cafeSelected: any;
  showError: boolean = false;

  // Location
  cafeLocation: any;
  cafeteriaIndex: any; // Used for GeoLocation and logic

  btnPolicy: any;
  orgSubsidy: number = 0;
  domainList: string[] = [];
  showDelete = false;
  orgInfo: any;
  imageUrl: any;
  uploadedImageFile: any;
  selectedApprover: any

  panelOpenState = false;

  // Dialog State Management
  activeDialogRef: MatDialogRef<any> | null = null;
  editingPocIndex: number | null = null;
  editingCafeIndex: number | null = null;

  // Auxiliary Forms for Dialogs (Isolated from the main form until saved)
  pocFormGroup: FormGroup;
  cafeteriaFormGroup: FormGroup;

  checkboxOptions = [
    { key: 'showAdminDaily', label: 'Show Admin Daily Card' },
    { key: 'showEmpPolls', label: 'Show Emp Poll Card' },
    { key: 'showVirtualCafe', label: 'Show Virtual Cafeteria' },
    { key: 'showSaas', label: 'Show Outlet' },
    { key: 'showCompanyWallet', label: 'Show Company Wallet' },
    { key: 'showComplienceTracker', label: 'Show Compliance Tracker' },
    { key: 'showConsumptionOrder', label: 'Show Consumption Order' },
    { key: 'isEmployeeEmailLogin', label: 'Is Employee Email Login' },
    { key: 'showSiteExecutive', label: 'Show Site Executive' },
    { key: 'showchecklist', label: 'Show Checklist' },
    { key: 'showSodexo', label: 'Show Sodexo' },
  ];

  constructor(
    private apiMainService: ApiMainService,
    private policyService: PolicyService,
    private googleMapService: GoogleMapService,
    private chgDetRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private runtimeStorageService: RuntimeStorageService,
    private router: Router,
    private fb: FormBuilder,
    private toaster: ToasterService,
  ) {
    this.form = this.fb.group({
      organization_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)],],
      location: ['', Validators.required],
      domain: [''],
      city: ['', Validators.required],
      gstin: ['', [Validators.required, Validators.pattern(REGEX.GSTIN),],],
      poc_details: this.fb.array([], this.minArrayLength(1)),
      org_address: this.fb.group({
        addressLine1: ['', [Validators.required, Validators.minLength(5),],],
        addressLine2: ['', []],
        addressLine3: ['', []],  // Landmark field
      }),
      cafeteriaList: this.fb.array([], this.minArrayLength(1)),
      subsidy: [0, [Validators.min(0), Validators.pattern(REGEX.SUBSIDY)],],
      isEmpIdRequired: [true, Validators.required],
    });

    // Initialize detached forms for dialogs
    this.pocFormGroup = this.new_poc_details();
    this.cafeteriaFormGroup = this.new_cafeteria();

    // Re-enable controls if they are disabled in new_poc_details
    // In new_poc_details, approverDetails controls are disabled initially
    // We might need them enabled for editing
  }

  minArrayLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const array = control as FormArray;
      return array && array.length >= min
        ? null
        : { minLengthArray: true };
    };
  }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    const cacheOrg = this.runtimeStorageService.getCacheData('VIEW_ORG');
    if (cacheOrg && cacheOrg._id) {
      this.viewOrg = cacheOrg;
      this.showUpdate = true;
      this.patchFormValue(cacheOrg);
    }
  }

  get poc(): FormArray {
    return this.form.get('poc_details') as FormArray;
  }

  get cafeteria(): FormArray {
    return this.form.get('cafeteriaList') as FormArray;
  }

  // Available POCs for Select Dropdown (Excludes current POC if valid)
  get availablePocs() {
    return this.poc.value;
  }

  new_cafeteria(isExisting: boolean = false): FormGroup {
    let id = Math.floor(Math.random() * 1000000000);
    return this.fb.group({
      isExisting: [isExisting],
      accessCode: ['', [Validators.minLength(1), Validators.maxLength(4), Validators.pattern(REGEX.ACCESS_CODE)]],
      showAdminDaily: [false],
      showEmpPolls: [false],
      showVirtualCafe: [false],
      showSaas: [false],
      showQrCode: [false],
      showSiteExecutive: [false],
      showCompanyWallet: [false],
      showchecklist: [false],
      isEmployeeEmailLogin: [false],
      showComplienceTracker: [false],
      showConsumptionOrder: [false],
      showSodexo: [false],
      cafeteria_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      cafeteria_id: [id, Validators.required],
      cafeteria_city: ['', Validators.required],
      cafeteria_gstin: ['', Validators.pattern(REGEX.GSTIN)],
      cafeteria_location: this.fb.group({ lat: ['', Validators.required], lng: ['', Validators.required], }),
      clusterId: [''],
      clusterName: [''],
      address1: ['', [Validators.required, Validators.minLength(5)]],
      address2: ['', [Validators.required, Validators.minLength(5)]],
      landmark: ['', [Validators.required, Validators.maxLength(80)]],
      location: ['', Validators.required],
      subsidy: [0, [Validators.min(0), Validators.max(100)]],
      poc_details: this.fb.group({
        poc_id: ['', Validators.required], // Updated: Not disabled, required
        poc_name: ['', Validators.required],
        poc_phoneNo: ['', Validators.required],
        poc_email: ['', Validators.required],
        poc_location: ['', Validators.required],
        poc_role: ['', Validators.required],
        approverPriceLimit: [''],
        approverCountLimit: [''],
        approverDetails: this.fb.group({
          approver_id: [''],
          approver_name: [''],
          approver_phoneNo: [''],
          approver_email: [''],
          approver_location: [''],
          approver_role: [''],
        }),
      }),
    });
  }

  new_poc_details(): FormGroup {
    return this.fb.group({
      poc_id: ['', Validators.required],
      poc_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      poc_phoneNo: ['', [Validators.required, Validators.pattern(REGEX.PHONE)]],
      poc_email: ['', [Validators.required, Validators.email, Validators.maxLength(80)]],
      poc_location: ['', Validators.required],
      poc_role: ['', Validators.required],
      approverDetails: this.fb.group({
        approver_id: [''],
        approver_name: [''],
        approver_phoneNo: [''],
        approver_email: [''],
        approver_location: [''],
        approver_role: [''],
      }),
    });
  }

  processDomains() {
    const inputValue: string = this.form.get('domain')?.value || '';
    this.domainList = inputValue
      .split(',')
      .map(domain => domain.trim())
      .filter(domain => domain !== '');
    this.form.get('domain')?.patchValue(this.domainList)
  }

  // --- POC DIALOG LOGIC ---

  openPocDialog(index: number | null = null) {
    this.editingPocIndex = index;
    this.pocFormGroup.reset();

    if (index !== null) {
      const existingData = this.poc.at(index).value;
      this.pocFormGroup.patchValue(existingData);
    } else {
      // New POC
      // Ensure nested groups are reset
      this.pocFormGroup = this.new_poc_details();
    }

    this.activeDialogRef = this.dialog.open(this.pocDialogTemplate, {
      width: '800px',
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });
  }

  savePocFromDialog() {
    this.markAllFieldsAsTouched(this.pocFormGroup);
    if (this.pocFormGroup.valid) {
      const pocData = this.pocFormGroup.getRawValue();

      if (this.editingPocIndex !== null) {
        this.poc.at(this.editingPocIndex).patchValue(pocData);
      } else {
        this.poc.push(this.fb.group(pocData)); // Need to recreate structure
        // Fix: Above line needs correct structuring. 
        // Simpler: push this.new_poc_details() then patch
        const newGroup = this.new_poc_details();
        newGroup.patchValue(pocData);
        this.poc.push(newGroup);
      }
      this.activeDialogRef?.close();
    } else {
      this.scrollToFirstInvalidField();
    }
  }

  deletePoc(index: number) {
    // Current Logic Logic
    const pocArray = this.form.get('poc_details') as FormArray;
    const selectedPocId = pocArray.at(index).get('poc_id')?.value;

    const isUsedInCafe = this.form.get('cafeteriaList')?.value?.some(
      (cafe: any) => cafe.poc_details?.poc_id === selectedPocId
    );
    // OR check original orgInfo if just loaded
    const isUsedInCafeOrg = this.orgInfo?.cafeteriaList?.some(
      (cafe: any) => cafe.poc_details?.poc_id === selectedPocId
    );


    // Rule 1: At least one POC must exist
    if (pocArray.length <= 1) {
      this.openPocAlertModal('At least one POC is required.');
      return;
    }

    // Rule 2: Cannot delete if this POC is assigned in cafeteria
    if (isUsedInCafe || isUsedInCafeOrg) {
      this.openPocAlertModal('This POC is assigned to a Cafeteria.');
      return;
    }

    pocArray.removeAt(index);
  }


  // --- CAFETERIA DIALOG LOGIC ---

  openCafeteriaDialog(index: number | null = null) {
    this.editingCafeIndex = index;
    // this.cafeteriaFormGroup.reset(); 

    if (index !== null) {
      const existingData = this.cafeteria.at(index).getRawValue();
      const isExisting = existingData.isExisting;
      this.cafeteriaFormGroup = this.new_cafeteria(isExisting);
      this.cafeteriaFormGroup.patchValue(existingData);
    } else {
      this.cafeteriaFormGroup = this.new_cafeteria(false);
    }

    this.activeDialogRef = this.dialog.open(this.cafeteriaDialogTemplate, {
      width: '900px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      maxHeight: '90vh'
    });
  }

  saveCafeteriaFromDialog() {
    this.markAllFieldsAsTouched(this.cafeteriaFormGroup);
    if (this.cafeteriaFormGroup.valid) {
      const cafeData = this.cafeteriaFormGroup.getRawValue();

      if (this.editingCafeIndex !== null) {
        // Update
        this.cafeteria.at(this.editingCafeIndex).patchValue(cafeData);
      } else {
        // Add
        const newGroup = this.new_cafeteria(false);
        newGroup.patchValue(cafeData);
        this.cafeteria.push(newGroup);
      }
      this.activeDialogRef?.close();
    } else {
      this.scrollToFirstInvalidField();
    }
  }

  deleteCafeteria(index: number) {
    const isExisting = this.cafeteria.at(index).get('isExisting')?.value;
    if (isExisting) {
      this.toaster.error('Cannot delete saved Cafeterias from here.');
      return;
    }

    if (this.cafeteria.length <= 1) {
      this.toaster.error('At least one Cafeteria is required.');
      return;
    }
    this.cafeteria.removeAt(index);
  }

  // Custom logic for Cafe POC Selection using Dropdown
  onCafePocSelectionChange(event: any) {
    // event.value is the POC object from availablePocs
    const selectedPoc = event.value;
    if (selectedPoc) {
      this.cafeteriaFormGroup.get('poc_details')?.patchValue({
        poc_id: selectedPoc.poc_id,
        poc_name: selectedPoc.poc_name,
        poc_phoneNo: selectedPoc.poc_phoneNo,
        poc_email: selectedPoc.poc_email,
        poc_location: selectedPoc.poc_location,
        poc_role: selectedPoc.poc_role,
        // Pass approver if needed?
        // The original logic passed approver details too inside poc_details.approverDetails?
        // Yes, patchCafeAdmins did controls['poc_details'].controls['approverDetails'].patchValue(...)
        approverDetails: selectedPoc.approverDetails // Assuming structure matches
      });
    }
  }

  // Getter for the selected POC ID in the dialog form to set the dropdown value
  get currentCafePocId() {
    return this.cafeteriaFormGroup.get('poc_details.poc_id')?.value;
  }

  // Helper to compare objects in mat-select (optional, but good for objects)
  comparePocs(o1: any, o2: any) {
    if (!o1 || !o2) return false;
    return o1.poc_id === o2.poc_id;
  }


  // --- EXISTING HELPERS ---

  removeApproverInDialog() {
    this.pocFormGroup.get('approverDetails')?.reset();
  }

  // Used in Dialog context
  openApproverSelectDialog() {
    this.openApproverModalGeneric((selectedAdmin: any) => {
      // Callback when admin selected
      this.pocFormGroup.get('approverDetails')?.patchValue({
        approver_id: selectedAdmin.poc_id,
        approver_name: selectedAdmin.poc_name,
        approver_phoneNo: selectedAdmin.poc_phoneNo,
        approver_email: selectedAdmin.poc_email,
        approver_location: selectedAdmin.poc_location,
        approver_role: selectedAdmin.poc_role
      });
    });
  }

  openApproverModalGeneric(callback: (admin: any) => void) {
    const dialogRef = this.dialog.open(this.content, {
      width: '600px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'add') {
        if (this.adminSelected) {
          callback(this.adminSelected);
          this.adminSelected = null;
          this.selectedApprover = null;
        }
      }
    });
  }

  openPocAlertModal(message: string) {
    this.dialog.open(this.pocContent, {
      width: '400px',
      disableClose: true,
      data: { message: message },
      panelClass: 'custom-dialog-container'
    });
  }

  // --- Original Patch Logic ---
  patchFormValue(org: any) {
    this.orgInfo = org;
    let clusterdetails: any = {};
    this.orgSubsidy = org.subsidy;
    this.imageUrl = environment.imageUrl + org.organizationLogoUrl;
    this.form.patchValue({
      organization_name: org.organization_name,
      location: org.location,
      city: org.city,
      gstin: org.gstin,
      subsidy: org.subsidy,
      domain: org.domain,
      isEmpIdRequired: org.isEmpIdRequired,
    });

    // Clear Arrays first if needed (usually empty on init)
    this.cafeteria.clear();
    this.poc.clear();

    if (org.poc_details) {
      org.poc_details.forEach((el: any) => {
        const group = this.new_poc_details();
        group.patchValue(el);
        this.poc.push(group);
      });
    }

    if (org.cafeteriaList) {
      org.cafeteriaList.forEach((cafe: any) => {
        if (cafe.clusterId) {
          clusterdetails = { clusterId: cafe.clusterId, clusterName: cafe.clusterName };
        }

        const group = this.new_cafeteria(true);

        // Patch cluster
        group.patchValue({
          clusterId: clusterdetails.clusterId,
          clusterName: clusterdetails.clusterName,
          ...cafe
        });

        if (cafe.cafeteria_location) {
          group.controls['cafeteria_location'].patchValue({
            lat: cafe.cafeteria_location.lat,
            lng: cafe.cafeteria_location.lng,
          });
        }

        if (!cafe.address2) group.get('address2')?.setValue('1');

        this.cafeteria.push(group);
      });
    }

    // Address
    if (org.org_address) {
      this.form.controls['org_address'].patchValue(org.org_address);
    }
  }

  handleFileInput($event: any) {
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (_event) => {
          const imageUrl = reader.result;
          try {
            const dialogRef = this.dialog.open(ImageCropperComponent, {
              width: '50%',
              panelClass: 'image-cropper-dialog',
              disableClose: true,
              data: {
                imageUrl: imageUrl,
                imageWidth: 150,
                imageHeight: 150,
                aspectRatio: 1 / 2
              }
            });

            dialogRef.afterClosed().subscribe((result: any) => {
              if (result && result.croppedImages) {
                this.uploadedImageFile = result.croppedImages.file;
                this.imageUrl = result.croppedImages.resizeDataUrl;
              }
            });
          } catch (e) {
            console.log('error while changes kitchen opened status ', e);
          }
        };
      }
    }
  }

  // Map Logic - Updated to use Dialog Form Group
  toggleMapForDialog() {
    const dialogRef = this.dialog.open(this.geolocation, {
      width: '800px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'add') {
        // Update the isolated form group
        this.cafeteriaFormGroup.controls['address2'].patchValue(this.cafeLocation.location);
        this.cafeteriaFormGroup.controls['cafeteria_location'].patchValue({
          lat: this.cafeLocation.latlng.lat,
          lng: this.cafeLocation.latlng.lng
        });
        // Cluster Logic
        this.updateClusterForDialog();
      }
    });
  }

  async updateClusterForDialog() {
    let cluster = await this.googleMapService.getClusterName(this.cafeLocation.latlng);
    let clusterDetails = this.runtimeStorageService.getCacheData('CLUSTERS_details');
    this.cafeteriaFormGroup.patchValue({
      clusterId: clusterDetails.clusterId,
      clusterName: clusterDetails.clusterName
    });
  }

  updateLocation(event: any) {
    this.cafeLocation = event;
  }

  selectedOption: any = null;
  pushAdmin(admin: MatRadioChange) {
    this.adminSelected = admin.value;
  }

  async addOrg() {
    try {
      this.markAllFieldsAsTouched(this.form);
      if (this.form.invalid) {
        this.scrollToFirstInvalidField();
        return;
      }

      await this.apiMainService.B2B_addOrg(this.form.getRawValue());
      this.clearRunTimeStorage();
      this.router.navigate(['b2bSearchOrg']);
    } catch (error) {
      console.log(error);
    }
  }

  async updateOrg() {
    try {
      this.markAllFieldsAsTouched(this.form);
      if (this.form.invalid) {
        this.scrollToFirstInvalidField();
        return;
      }
      const raw = this.form.getRawValue();
      const formData = new FormData();
      // ... (FormData append logic same as before) ...
      formData.append('organization_name', raw.organization_name);
      formData.append('location', raw.location);
      formData.append('domain', raw.domain);
      formData.append('city', raw.city);
      formData.append('gstin', raw.gstin || '');
      formData.append('organizationLogoUrl', raw.organizationLogoUrl || '');
      formData.append('isEmpIdRequired', String(raw.isEmpIdRequired));
      formData.append('poc_details', JSON.stringify(raw.poc_details || {}));
      formData.append('org_address', JSON.stringify(raw.org_address || {}));
      formData.append('cafeteriaList', JSON.stringify(raw.cafeteriaList || []));
      formData.append('subsidy', raw.subsidy || 0);

      if (this.uploadedImageFile) {
        formData.append('image', this.uploadedImageFile);
      }

      await this.apiMainService.B2B_org_update(formData, this.viewOrg._id);
      this.clearRunTimeStorage();
      this.router.navigate(['b2bSearchOrg']);
    } catch (error) {
      console.log(error);
    }
  }

  back() {
    this.clearRunTimeStorage();
    this.router.navigate(['b2bSearchOrg']);
  }

  goBack() {
    this.back();
  }

  clearRunTimeStorage() {
    this.runtimeStorageService.resetCacheData('VIEW_ORG');
  }

  async updateOrglevelSubsidy() {
    try {
      this.orgSubsidy = this.form.value.subsidy;
      let res = await this.apiMainService.B2B_org_updateOrglevelSubsidy(
        this.orgSubsidy,
        this.viewOrg._id
      );
      if (res && res._id) {
        this.viewOrg = res;
        this.showUpdate = true;
        this.patchFormValue(res); // Will refresh lists
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateCafelevelSubsidy(index: any) {
    try {
      // Logic for inline update from list if kept exposed? 
      // Or move to Dialog? If Dialog, this changes.
      // Assuming subsidy update is still allowed outside dialog for convenience or inside?
      // Let's assume we do it inside dialog or if we keep the "Update" button in the list view (as per previous design)
      // If we keep it in list view, we access the control directly
      let subsidy = this.cafeteria.at(index).get('subsidy')?.value;
      let cafeteria_Id = this.cafeteria.at(index).get('cafeteria_id')?.value;

      let res = await this.apiMainService.B2B_org_updateCafelevelSubsidy(
        subsidy,
        cafeteria_Id
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  hasError(form: FormGroup | AbstractControl, controlPath: string, error: string) {
    const control = form.get(controlPath);
    return control && control.hasError(error);
  }

  get filledPocCount(): number {
    // Count valid POCs in the main array
    const pocDetails = this.form.controls['poc_details']?.value;
    if (!pocDetails || !Array.isArray(pocDetails)) return 0;
    return pocDetails.filter(p => p.poc_id).length;
  }

  markAllFieldsAsTouched(control: AbstractControl | null): void {
    if (!control) return;
    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach(key => {
        this.markAllFieldsAsTouched(control.get(key));
      });
    } else if (control instanceof FormArray) {
      control.controls.forEach(child => this.markAllFieldsAsTouched(child));
    } else if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
      control.updateValueAndValidity({ onlySelf: true });
    }
  }

  scrollToFirstInvalidField(): void {
    // Enhanced to scroll inside dialog if open
    const container = document.querySelector('.mat-dialog-content') || document;
    setTimeout(() => {
      const firstInvalid = container.querySelector('.ng-invalid') as HTMLElement | null;
      if (!firstInvalid) return;
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalid.focus();
      this.toaster.error('Please check invalid fields.');
    });
  }

  getOrgGstinInDialog(event: any) {
    const gstinValue = event.checked ? this.form.get('gstin')?.value : '';
    this.cafeteriaFormGroup.get('cafeteria_gstin')?.patchValue(gstinValue);
  }
}
