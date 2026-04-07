import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { ToasterService } from 'src/service/toaster.service';
import { DataFormatService } from 'src/service/data-format.service';
import { PolicyService } from 'src/service/policy.service';
import { ConfirmationModalService } from 'src/service/confirmation-modal.service';
import * as XLSX from 'xlsx';

interface MealTiming {
  mealType: string;
  acceptOrderFrom: string;
  acceptOrderTill: string;
  slug?: string;
  maxCountFree?: number;
  mealSubsidyType?: string;
}

interface SectionConfig {
  sectionName: string;
  sectionType: string;
}

interface CabinConfig {
  cabinName: string;
}

@Component({
  selector: 'app-add-outlet',
  templateUrl: './add-outlet.component.html',
  styleUrls: ['./add-outlet.component.scss'],
})
export class AddOutletComponent implements OnInit {
  @ViewChild('contentOrg') contentOrg!: TemplateRef<any>;

  form!: FormGroup;
  showError = false;

  imageUrl: string | null = null;
  uploadedImageFile: File | null = null;

  btnPolicy: any;
  showUpdate = false;
  selectedOutlet: any;

  formattedOrgList: any[] = [];
  selectedOrgCafeteria: string | undefined;
  seletedCafetria: any;

  sectionTypes: string[] = ['alacarte', 'live'];

  outletSubsidy = 0;

  holidays: { date: string, name: string }[] = [];
  holidayUploadError: string | null = null;
  orgSearchText: string = '';

  // For meal type dropdown
  mealTypes: string[] = ['Fullday', 'Breakfast', 'Lunch', 'Dinner', 'High Tea'];
  billingTypeOptions: string[] = ['ecommerce', 'revenueSharing'];

  // Error text for meal timings
  mealTimingError: string | null = null;

  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private runtimeStorageService: RuntimeStorageService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private confirmationModal: ConfirmationModalService,
    private dataFormatService: DataFormatService,
    private policyService: PolicyService,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.createForm();
    this.populateForEditIfNeeded();

    // validate overlaps whenever meal timings change
    this.mealTimings.valueChanges.subscribe(() => this.validateMealTimings());
  }

  // convenience getter for template
  get f() {
    return this.form.controls;
  }

  get filteredOrgList() {
    if (!this.orgSearchText) {
      return this.formattedOrgList;
    }
    const search = this.orgSearchText.toLowerCase();
    return this.formattedOrgList.filter(org =>
      org.key.toLowerCase().includes(search)
    );
  }

  get mealTimings(): FormArray {
    return this.form.get('mealTimings') as FormArray;
  }

  get sectionConfig(): FormArray {
    return this.form.get('sectionConfig') as FormArray;
  }

  get cabinConfig(): FormArray {
    return this.form.get('cabinConfig') as FormArray;
  }

  private createForm(): void {
    this.form = this.fb.group({
      outletName: ['', Validators.required],
      outletDescription: ['', Validators.required],
      outletOpened: [true],
      closeTime: [''],
      isSectionWiseMenu: [false],
      isWeeklyMenu: [false],
      isPreOrder: [false],
      isCabinOrder: [false],
      isPriceHide: [false],
      preOrderConfig: this.fb.group({
        type: ['normal'],
        mealType: ['lunch'],
        maxDays: [7, [Validators.min(1)]],
        availableDays: this.fb.group({
          monday: [true],
          tuesday: [true],
          wednesday: [true],
          thursday: [true],
          friday: [true],
          saturday: [true],
          sunday: [true],
        }),
        holidays: [[]],
      }),
      isPackagingRequired: [false],
      packagingAmount: [0, [Validators.min(0)]],
      vendorCommissionPercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      MRPCommissionPercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      subsidy: [0, [Validators.min(0), Validators.max(100)]],
      precedence: [0, [Validators.min(0)]],
      billingType: ['revenueSharing', Validators.required],
      isFullAmountOrgPaid: [false],
      mealTimings: this.fb.array([]),
      sectionConfig: this.fb.array([]),
      cabinConfig: this.fb.array([]),
    });

    // default one timing per standard meal type
    this.addDefaultMealTimings();

    // When isPreOrder changes, manage related fields and meal timings
    this.form.get('isPreOrder')?.valueChanges.subscribe((isPreOrder: boolean) => {
      if (!isPreOrder) {
        this.form.get('preOrderConfig')?.patchValue(
          {
            type: 'normal',
            mealType: 'lunch',
            maxDays: 7,
            availableDays: {
              monday: true,
              tuesday: true,
              wednesday: true,
              thursday: true,
              friday: true,
              saturday: true,
              sunday: true,
            },
            holidays: [],
          },
          { emitEvent: false }
        );
        this.form.get('isPriceHide')?.patchValue(false, { emitEvent: false });
        this.holidays = [];
        
        // Remove validation when isPreOrder is disabled
        this.form.get('preOrderConfig.mealType')?.clearValidators();
        
        // Restore default meal timings if empty when switching back to normal mode
        if (this.mealTimings.length === 0) {
          this.addDefaultMealTimings();
        }
      } else {
        // Meal timings and closing times are not needed for Pre-Order mode, remove any existing data
        this.mealTimings.clear();
        this.form.get('closeTime')?.patchValue('', { emitEvent: false });

        // Make mealType required when isPreOrder is enabled
        this.form.get('preOrderConfig.mealType')?.setValidators([Validators.required]);
      }
      this.form.get('preOrderConfig.mealType')?.updateValueAndValidity({ emitEvent: false });
      this.validateMealTimings();
    });

    // When isFullAmountOrgPaid is disabled, reset meal subsidy types and counts
    this.form.get('isFullAmountOrgPaid')?.valueChanges.subscribe((isEnabled: boolean) => {
      if (!isEnabled) {
        this.mealTimings.controls.forEach((group: AbstractControl) => {
          group.patchValue({
            mealSubsidyType: 'chargeable',
            maxCountFree: 0
          }, { emitEvent: false });
        });
      }
    });
  }

  private createMealTimingGroup(
    mealType: string = '',
    from: string = '00:00',
    till: string = '00:00',
    slug: string = '',
    maxCountFree: number = 0,
    mealSubsidyType: string = 'chargeable'
  ): FormGroup {
    const group = this.fb.group({
      mealType: [mealType, Validators.required],
      acceptOrderFrom: [from, Validators.required],
      acceptOrderTill: [till, Validators.required],
      slug: [slug],
      maxCountFree: [maxCountFree, [Validators.min(0)]],
      mealSubsidyType: [mealSubsidyType || 'chargeable'],
    });

    if (!slug && mealType) {
      group.get('slug')?.patchValue(this.generateSlug(mealType));
    }

    return group;
  }

  generateSlug(mealType: string): string {
    if (!mealType) return '';
    return mealType.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  }

  onMealTypeChange(index: number): void {
    const group = this.mealTimings.at(index);
    const mealType = group.get('mealType')?.value;

    // Auto-generate slug only if it's currently empty OR we are in "Add" mode
    // If it's an existing row in edit mode, we typically don't want to change the slug automatically
    if (mealType) {
      const baseSlug = this.generateSlug(mealType);
      let slug = baseSlug;
      let counter = 1;

      // Check for duplicates in current timings
      const existingSlugs = this.mealTimings.controls
        .map((c, i) => i !== index ? c.get('slug')?.value : null)
        .filter(s => !!s);

      while (existingSlugs.includes(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      group.get('slug')?.patchValue(slug, { emitEvent: false });
    }
  }

  addDefaultMealTimings(): void {
    this.mealTypes.forEach((type) => {
      this.mealTimings.push(this.createMealTimingGroup(type));
    });
  }

  createSectionConfigGroup(
    sectionName: string = '',
    sectionType: string = 'alacarte'
  ): FormGroup {
    return this.fb.group({
      sectionName: [sectionName, Validators.required],
      sectionType: [sectionType, Validators.required],
    });
  }

  addSectionConfig(): void {
    this.sectionConfig.push(this.createSectionConfigGroup());
    this.sectionConfig.markAsDirty();
  }

  removeSectionConfig(index: number): void {
    this.sectionConfig.removeAt(index);
    this.sectionConfig.markAsDirty();
  }

  createCabinConfigGroup(
    cabinName: string = '',
  ): FormGroup {
    return this.fb.group({
      cabinName: [cabinName, Validators.required],
    });
  }

  addCabinConfig(): void {
    this.cabinConfig.push(this.createCabinConfigGroup());
    this.cabinConfig.markAsDirty();
  }

  removeCabinConfig(index: number): void {
    this.cabinConfig.removeAt(index);
    this.cabinConfig.markAsDirty();
  }

  addMealTiming(): void {
    if (this.form.get('isPreOrder')?.value) return;
    this.mealTimings.push(this.createMealTimingGroup());
    this.mealTimings.markAsDirty();
  }

  removeMealTiming(index: number): void {
    this.mealTimings.removeAt(index);
    this.mealTimings.markAsDirty();
    this.validateMealTimings();
  }

  private populateForEditIfNeeded(): void {
    const outlet = this.runtimeStorageService.getCacheData('OUTLET_EDIT');

    if (outlet && outlet._id) {
      this.showUpdate = true;
      this.selectedOutlet = outlet;
      this.imageUrl = outlet.imageUrl ? environment.imageUrl + outlet.imageUrl : null;

      this.seletedCafetria = {
        organizationDetails: outlet.organizationDetails,
        cafeteriaDetails: outlet.cafeteriaDetails,
      };

      this.mealTimings.clear();
      if (outlet.mealTiming && Array.isArray(outlet.mealTiming)) {
        outlet.mealTiming.forEach((mt: MealTiming) => {
          this.mealTimings.push(
            this.createMealTimingGroup(
              mt.mealType,
              mt.acceptOrderFrom,
              mt.acceptOrderTill,
              mt.slug,
              mt.maxCountFree,
              mt.mealSubsidyType
            )
          );
        });
      } else {
        this.addDefaultMealTimings();
      }
      // emitEvent: false prevents the isPreOrder valueChanges subscription from
      // firing and overwriting the meal timings we just loaded above.
      this.form.patchValue({
        outletName: outlet.outletName ?? '',
        outletDescription: outlet.outletDescription ?? '',

        outletOpened: outlet.outletOpened ?? false,
        isSectionWiseMenu: outlet.isSectionWiseMenu ?? false,
        isWeeklyMenu: outlet.isWeeklyMenu ?? false,
        isPreOrder: outlet.isPreOrder ?? false,
        isCabinOrder: outlet.isCabinOrder ?? false,
        isPackagingRequired: outlet.isPackagingRequired ?? false,
        isPriceHide: outlet.isPriceHide ?? false,
        packagingAmount: outlet.packagingAmount ?? 0,
        vendorCommissionPercentage: outlet.vendorCommissionPercentage ?? 0,
        MRPCommissionPercentage: outlet.MRPCommissionPercentage ?? 0,
        subsidy: outlet.subsidy ?? 0,
        precedence: outlet.precedence ?? 0,
        billingType: outlet.billingType ?? 'revenueSharing',
        closeTime: outlet.closeTime ?? '',
        isFullAmountOrgPaid: outlet.isFullAmountOrgPaid ?? false,
      });

      const preOrderConfigData = outlet.preOrderConfig || {};
      this.form.get('preOrderConfig')?.patchValue({
        ...preOrderConfigData,
        maxDays: preOrderConfigData.maxDays ?? outlet.maxDays ?? 7,
        mealType: preOrderConfigData.mealType || outlet.preOrderMealType || 'lunch',
        availableDays: preOrderConfigData.availableDays || outlet.preOrderDays || {
          monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: false, sunday: false
        }
      });

      if (outlet.holidays && Array.isArray(outlet.holidays)) {
        this.holidays = outlet.holidays
          .map((h: any) => ({
            date: new Date(h.date || h).toISOString().split('T')[0],
            name: h.name || 'Holiday'
          }))
          .sort((a: any, b: any) => a.date.localeCompare(b.date));
      } else {
        this.holidays = [];
      }

      this.sectionConfig.clear();
      if (outlet.sectionConfig && Array.isArray(outlet.sectionConfig)) {
        outlet.sectionConfig.forEach((sec: SectionConfig) => {
          this.sectionConfig.push(
            this.createSectionConfigGroup(sec.sectionName, sec.sectionType)
          );
        });
      }

      this.cabinConfig.clear();
      if (outlet.cabinConfig && Array.isArray(outlet.cabinConfig)) {
        outlet.cabinConfig.forEach((cab: CabinConfig) => {
          this.cabinConfig.push(
            this.createCabinConfigGroup(cab.cabinName)
          );
        });
      }

      this.validateMealTimings();
    }
  }
  async getOrgList(): Promise<void> {
    try {
      const orgList = await this.apiMainService.getOrgList();
      if (orgList && orgList.length > 0) {
        this.formattedOrgList = this.dataFormatService.getformattedOrgList(orgList);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async openOrgList(): Promise<void> {
    this.selectedOrgCafeteria = undefined;
    this.orgSearchText = '';
    await this.getOrgList();

    const dialogRef = this.dialog.open(this.contentOrg, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'add') {
        this.confirmationModal.modal({
          msg: 'Are you sure you want to change Organization and Cafeteria?',
          callback: () => {
            const selected = this.formattedOrgList.find(
              (org: any) => org.key === this.selectedOrgCafeteria
            );
            if (selected) {
              this.seletedCafetria = { ...selected };
            }
          },
          context: this
        });
      }
    });
  }

  handleFileInput($event: any): void {
    if ($event?.target?.files?.length) {
      const file: File = $event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const imageUrl = reader.result as string;

        try {
          const dialogRef = this.dialog.open(ImageCropperComponent, {
            width: '50%',
            panelClass: 'image-cropper-dialog',
            disableClose: true,
            data: {
              imageUrl: imageUrl,
              imageWidth: 150,
              imageHeight: 150,
              aspectRatio: 1
            }
          });

          dialogRef.afterClosed().subscribe((result: any) => {
            if (result?.croppedImages) {
              this.uploadedImageFile = result.croppedImages.file;
              this.imageUrl = result.croppedImages.resizeDataUrl;
            }
          });
        } catch (e) {
          console.log('error while changing outlet image ', e);
        }
      };
    }
  }


  async updateOutletLevelSubsidy(): Promise<void> {
    if (!this.selectedOutlet?._id) {
      return;
    }

    try {
      this.outletSubsidy = Number(this.form.getRawValue().subsidy) || 0;
      await this.apiMainService.updateOutletLevelSubsidy(
        this.selectedOutlet._id,
        this.outletSubsidy
      );
    } catch (err) {
      console.log(err);
    }
  }

  handleHolidayUpload(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
    this.holidayUploadError = null;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Expecting two columns: Date, Name
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

        let parsedHolidays: { date: string, name: string }[] = [];
        excelData.forEach((row, index) => {
          // skip header row if it seems like header
          if (index === 0 && typeof row[0] === 'string' && row[0].toLowerCase().includes('date')) {
            return;
          }
          if (row.length > 0 && row[0]) {
            const dateVal = row[0];
            const nameVal = row[1] || 'Holiday';
            let dateObj: Date | null = null;
            if (typeof dateVal === 'number') {
              // excel date serial
              dateObj = new Date((dateVal - (25567 + 1)) * 86400 * 1000);
            } else if (typeof dateVal === 'string') {
              dateObj = new Date(dateVal);
            } else if (dateVal instanceof Date) {
              dateObj = dateVal;
            }

            if (dateObj && !isNaN(dateObj.getTime())) {
              parsedHolidays.push({
                date: dateObj.toISOString().split('T')[0],
                name: String(nameVal).trim()
              });
            }
          }
        });

        if (parsedHolidays.length > 0) {
          const combined = [...this.holidays, ...parsedHolidays];
          const unique = new Map(combined.map(item => [item.date, item]));
          this.holidays = Array.from(unique.values()).sort((a: any, b: any) => a.date.localeCompare(b.date));
        } else {
          this.holidayUploadError = 'No valid dates found in the file. Ensure dates are in the first column and names in the second.';
        }
      } catch (err) {
        this.holidayUploadError = 'Error parsing file. Please upload a valid CSV or Excel file.';
      }
      event.target.value = '';
    };
    reader.readAsArrayBuffer(file);
  }

  removeHoliday(date: string) {
    this.holidays = this.holidays.filter(h => h.date !== date);
  }

  downloadHolidayTemplate() {
    const ws = XLSX.utils.aoa_to_sheet([
      ['Date', 'Holiday Name'],
      ['2025-12-25', 'Christmas'],
      ['2026-01-01', 'New Year']
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Holidays');
    XLSX.writeFile(wb, 'Holiday_Template.xlsx');
  }

  // For (ngSubmit) without explicit type
    // For (ngSubmit) without explicit type
  onSubmit(type?: 'update'): void {
    // Determine action based on explicit type or the showUpdate flag
    if (type === 'update' || this.showUpdate) {
      this.updateOutlet();
    } else {
      this.createOutlet();
    }
  }

  /**
   * Shared logic to validate and prepare the FormData for submission
   */
  prepareOutletData(): FormData | null {
    console.log('--- Preparing Outlet Data ---');
    this.showError = true;
    this.validateMealTimings();

    if (this.form.invalid || !this.seletedCafetria || this.mealTimingError) {
      console.warn('Submission blocked: Validation failed');
      console.log('Form invalid:', this.form.invalid);
      console.log('Cafeteria missing:', !this.seletedCafetria);
      console.log('Meal timing error:', this.mealTimingError);

      this.form.markAllAsTouched();
      this.toasterService.error('Please fix the errors before saving.');
      return null;
    }

    const formValue = this.form.getRawValue();
    console.log('Form raw value:', formValue);

    const finalObj: any = {
      ...formValue,
      cafeteriaDetails: this.seletedCafetria.cafeteriaDetails,
      organizationDetails: this.seletedCafetria.organizationDetails,
      mealTiming: this.mealTimings.value, // Mapping for backend
      sectionConfig: this.sectionConfig.value,
      cabinConfig: this.cabinConfig.value,
    };

    console.log('Final Object structured:', finalObj);

    if (finalObj.isPreOrder) {
      if (!finalObj.preOrderConfig) finalObj.preOrderConfig = {};
      finalObj.preOrderConfig.holidays = this.holidays;
    } else if (finalObj.preOrderConfig) {
      finalObj.preOrderConfig.holidays = [];
    }

    const formData = this.objectToFormData(this.trimStringValues(finalObj));

    if (this.uploadedImageFile) {
      formData.append('image', this.uploadedImageFile);
    }

    return formData;
  }

  /**
   * Logic for creating a new outlet (Submit)
   */
  async createOutlet(): Promise<void> {
    console.log('--- Executing Create Outlet ---');
    const formData = this.prepareOutletData();
    if (!formData) return;

    try {
      console.log('Calling saveOutlet API...');
      await this.apiMainService.saveOutlet(formData);
      this.toasterService.success('Outlet created successfully.');
      console.log('Navigation to /outlet...');
      this.router.navigate(['/outlet']);
    } catch (error) {
      console.error('Create API Error:', error);
    }
  }

  /**
   * Logic for updating an existing outlet (Update)
   */
  async updateOutlet(): Promise<void> {
    console.log('--- Executing Update Outlet ---');
    if (!this.selectedOutlet?._id) {
      console.error('Update blocked: Missing outlet ID');
      this.toasterService.error('Outlet ID missing for update.');
      return;
    }

    const formData = this.prepareOutletData();
    if (!formData) return;

    try {
      console.log('Calling updateOutlet API...');
      await this.apiMainService.updateOutlet(this.selectedOutlet._id, formData, 0);
      this.toasterService.success('Outlet updated successfully.');
      console.log('Navigation to /outlet...');
      this.router.navigate(['/outlet']);
    } catch (error) {
      console.error('Update API Error:', error);
    }
  }


  trimStringValues(obj: any): any {
    if (obj instanceof File || obj instanceof Blob) return obj;
    if (typeof obj === 'string') return obj.trim();
    if (Array.isArray(obj)) return obj.map((v: any) => this.trimStringValues(v));
    if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach(key => {
        obj[key] = this.trimStringValues(obj[key]);
      });
    }
    return obj;
  }

 

  objectToFormData(obj: any, formData = new FormData(), parentKey = ''): FormData {
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) continue;

      const keyName = parentKey ? `${parentKey}[${key}]` : key;
      const value = obj[key];

      if (value === undefined || value === null) continue;

      if (Array.isArray(value)) {
        value.forEach((item: any, index: number) => {
          if (item && typeof item === 'object') {
            this.objectToFormData(item, formData, `${keyName}[${index}]`);
          } else {
            formData.append(`${keyName}[${index}]`, item);
          }
        });
      } else if (typeof value === 'object') {
        this.objectToFormData(value, formData, keyName);
      } else {
        formData.append(keyName, value);
      }
    }
    return formData;
  }

  back(): void {
    this.router.navigate(['/outlet']);
  }

  setStandardEndTime(): void {
    // Set standard times based on slug
    const map: Record<string, { from: string; till: string }> = {
      fullday: { from: '06:00', till: '23:00' },
      breakfast: { from: '06:00', till: '10:00' },
      lunch: { from: '11:00', till: '14:00' },
      'high-tea': { from: '16:00', till: '18:00' },
      dinner: { from: '19:00', till: '22:00' },
    };

    this.mealTimings.controls.forEach((ctrl: AbstractControl) => {
      const slug = ctrl.get('slug')?.value;
      if (slug && map[slug]) {
        ctrl.patchValue(
          {
            acceptOrderFrom: map[slug].from,
            acceptOrderTill: map[slug].till,
          },
          { emitEvent: false }
        );
      }
    });

    this.validateMealTimings();
  }

  private validateMealTimings(): void {
    this.mealTimingError = null;

    const timings = this.mealTimings.value as MealTiming[];
    if (!this.form.get('isPreOrder')?.value && (!timings || timings.length === 0)) {
      this.mealTimingError = 'Please add at least one meal timing.';
      return;
    }

    // Helper to convert HH:mm -> minutes
    const toMinutes = (time: string): number => {
      const [h, m] = (time || '00:00').split(':').map((x) => parseInt(x, 10) || 0);
      return h * 60 + m;
    };

    // 1. from < to
    for (const t of timings) {
      const start = toMinutes(t.acceptOrderFrom);
      const end = toMinutes(t.acceptOrderTill);
      if (start >= end) {
        this.mealTimingError = 'Start time must be before end time for all slots.';
        return;
      }
    }

    // 2. no overlap within same mealType
    const byType: Record<string, { start: number; end: number }[]> = {};
    timings.forEach((t) => {
      const key = t.mealType || 'DEFAULT';
      if (!byType[key]) byType[key] = [];
      byType[key].push({
        start: toMinutes(t.acceptOrderFrom),
        end: toMinutes(t.acceptOrderTill),
      });
    });

    for (const type of Object.keys(byType)) {
      const slots = byType[type];
      for (let i = 0; i < slots.length; i++) {
        for (let j = i + 1; j < slots.length; j++) {
          const a = slots[i];
          const b = slots[j];
          const overlap = a.start < b.end && b.start < a.end;
          if (overlap) {
            this.mealTimingError = `Time ranges for meal type "${type}" are overlapping.`;
            return;
          }
        }
      }
    }
  }
}
