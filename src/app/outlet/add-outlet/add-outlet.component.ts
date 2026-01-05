import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { DataFormatService } from 'src/service/data-format.service';
import { PolicyService } from 'src/service/policy.service';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';

interface MealTiming {
  mealType: string;
  acceptOrderFrom: string;
  acceptOrderTill: string;
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

  outletSubsidy = 0;

  // For meal type dropdown
  mealTypes: string[] = ['Fullday', 'Breakfast', 'Lunch', 'EveningSnacks', 'Dinner'];
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
    private policyService: PolicyService
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

  get mealTimings(): FormArray {
    return this.form.get('mealTimings') as FormArray;
  }

  private createForm(): void {
    this.form = this.fb.group({
      outletName: ['', Validators.required],
      outletDescription: ['', Validators.required],

      outletOpened: [true],
      isPreOrder: [false],
      preOrderMealType: ['lunch'],
      isSatAvailable: [false],
      isSunAvailable: [false],

      vendorCommissionPercentage: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      MRPCommissionPercentage: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      subsidy: [0, [Validators.min(0), Validators.max(100)]],
      precedence: [0, [Validators.min(0)]],
      billingType: ['revenueSharing', Validators.required],

      mealTimings: this.fb.array([]),
    });

    // default one timing per standard meal type
    this.addDefaultMealTimings();

    // When isPreOrder is false, clear related fields
    this.form.get('isPreOrder')?.valueChanges.subscribe((isPreOrder: boolean) => {
      if (!isPreOrder) {
        this.form.patchValue(
          {
            preOrderMealType: 'lunch',
            isSatAvailable: false,
            isSunAvailable: false,
          },
          { emitEvent: false }
        );
      }
    });
  }

  private createMealTimingGroup(
    mealType: string = '',
    from: string = '00:00',
    till: string = '00:00'
  ): FormGroup {
    return this.fb.group({
      mealType: [mealType, Validators.required],
      acceptOrderFrom: [from, Validators.required],
      acceptOrderTill: [till, Validators.required],
    });
  }

  private addDefaultMealTimings(): void {
    this.mealTypes.forEach((type) => {
      this.mealTimings.push(this.createMealTimingGroup(type));
    });
  }

  addMealTiming(): void {
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
            this.createMealTimingGroup(mt.mealType, mt.acceptOrderFrom, mt.acceptOrderTill)
          );
        });
      } else {
        this.addDefaultMealTimings();
      }

      this.form.patchValue({
        outletName: outlet.outletName ?? '',
        outletDescription: outlet.outletDescription ?? '',
        // outletType REMOVED

        outletOpened: outlet.outletOpened ?? false,
        isPreOrder: outlet.isPreOrder ?? false,
        preOrderMealType: outlet.preOrderMealType ?? 'lunch',
        isSatAvailable: outlet.isSatAvailable ?? false,
        isSunAvailable: outlet.isSunAvailable ?? false,
        vendorCommissionPercentage: outlet.vendorCommissionPercentage ?? 0,
        MRPCommissionPercentage: outlet.MRPCommissionPercentage ?? 0,
        subsidy: outlet.subsidy ?? 0,
        precedence: outlet.precedence ?? 0,
        billingType: outlet.billingType ?? 'revenueSharing',
      });

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
    await this.getOrgList();

    const dialogRef = this.dialog.open(this.contentOrg, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'add') {
        this.confirmationModal.modal(
          'Are you sure you want to change Organization and Cafeteria?',
          () => {
            const selected = this.formattedOrgList.find(
              (org: any) => org.key === this.selectedOrgCafeteria
            );
            if (selected) {
              this.seletedCafetria = { ...selected };
            }
          },
          this
        );
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

  // For (ngSubmit) without explicit type
  onSubmit(type?: 'update'): void {
    this.submit(type);
  }

  async submit(type?: 'update'): Promise<void> {
    this.showError = true;
    this.validateMealTimings();

    if (this.form.invalid || !this.seletedCafetria || this.mealTimingError) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      const formValue = this.form.getRawValue();

      const finalObj: any = {
        cafeteriaDetails: this.seletedCafetria.cafeteriaDetails,
        organizationDetails: this.seletedCafetria.organizationDetails,
        mealTiming: this.mealTimings.value, // send array
        ...formValue,
      };

      let formData = this.objectToFormData(finalObj);

      if (this.uploadedImageFile) {
        formData.append('image', this.uploadedImageFile);
      }

      if (type === 'update' && this.selectedOutlet?._id) {
        await this.apiMainService.updateOutlet(this.selectedOutlet._id, formData, 0);
      } else {
        await this.apiMainService.saveOutlet(formData);
      }

      this.router.navigate(['/outlet']);
    } catch (error) {
      console.log(error);
    }
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
    // Set standard times based on mealType
    const map: Record<string, { from: string; till: string }> = {
      Fullday: { from: '06:00', till: '23:00' },
      Breakfast: { from: '06:00', till: '10:00' },
      Lunch: { from: '11:00', till: '14:00' },
      EveningSnacks: { from: '16:00', till: '18:00' },
      Dinner: { from: '19:00', till: '22:00' },
    };

    this.mealTimings.controls.forEach((ctrl: AbstractControl) => {
      const mt = ctrl.get('mealType')?.value;
      if (mt && map[mt]) {
        ctrl.patchValue(
          {
            acceptOrderFrom: map[mt].from,
            acceptOrderTill: map[mt].till,
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
    if (!timings || timings.length === 0) {
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
