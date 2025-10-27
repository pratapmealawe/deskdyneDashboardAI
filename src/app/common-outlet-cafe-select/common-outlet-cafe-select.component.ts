import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

type Mode = 'outlet' | 'cafeteria';

export interface CommonSelectConfig {
  /** Which view to show */
  mode: Mode; // 'outlet' or 'cafeteria'

  /** Show Material date-range picker */
  showDateRange?: boolean;

  /** Initial selections (if sent, component will auto-select & load cascades) */
  defaultOrgId?: string;
  defaultCafeId?: string;
  defaultOutletId?: string;

  /** Disable specific dropdowns */
  disableOrg?: boolean;
  disableCafe?: boolean;
  disableOutlet?: boolean;

  /** Optional date limits */
  minDate?: Date;
  maxDate?: Date;

  /** If true, disables the submit button until all required fields for the mode are selected */
  requireAll?: boolean;
}

export interface SubmitPayload {
  mode: Mode;

  org_id?: string;
  org_name?: string;

  cafeteria_id?: string;
  cafeteria_name?: string;
  cafeteria_city?: string;

  outlet_id?: string;
  outlet_name?: string;

  /** ISO strings if date-range shown & selected; otherwise undefined */
  date_from?: string;
  date_to?: string;
}

@Component({
  selector: 'app-common-outlet-cafe-select',
  templateUrl: './common-outlet-cafe-select.component.html',
  styleUrls: ['./common-outlet-cafe-select.component.scss'],
})
export class CommonOutletCafeSelectComponent implements OnInit, OnChanges {
  @Input() config: CommonSelectConfig = { mode: 'outlet', showDateRange: false, requireAll: true };

  /** Fired on successful submit */
  @Output() submitted = new EventEmitter<SubmitPayload>();

  // Dropdown data
  orglist: any[] = [];
  orgDetails: any | null = null;
  cafeList: any[] = [];
  outletList: any[] = [];

  // Loading flags (for spinners/UX)
  loadingOrgs = false;
  loadingOutlets = false;

  // Reactive bits for date range
  dateForm: FormGroup<{
    dateFrom: FormControl<Date | null>;
    dateTo: FormControl<Date | null>;
  }>;
  // Current selections (ids)
  selected = {
    orgId: '' as string,
    cafeId: '' as string,
    outletId: '' as string,
  };



  constructor(private api: ApiMainService, fb: FormBuilder) {
    this.dateForm = fb.group({
      dateFrom: new FormControl<Date | null>(null),
      dateTo: new FormControl<Date | null>(null),
    });
  }

  // ——— Lifecycle ———

  ngOnInit(): void {
    this.loadOrgs().then(() => this.applyDefaultsIfAny());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] && !changes['config'].firstChange) {
      // If config changes later, re-apply defaults sensibly
      this.applyDefaultsIfAny();
    }
  }

  // ——— Data Loading ———

  private async loadOrgs(): Promise<void> {
    try {
      this.loadingOrgs = true;
      const page = 1;
      const searchObj = { countOnly: false };
      this.orglist = await this.api.B2B_fetchFilteredAllOrgs(searchObj, page);
    } catch (err) {
      console.error('Error fetching org list:', err);
      this.orglist = [];
    } finally {
      this.loadingOrgs = false;
    }
  }

  private async loadCafesForOrg(orgId: string): Promise<void> {
    this.orgDetails = this.orglist.find((o: any) => o._id === orgId) || null;
    this.cafeList = this.orgDetails?.cafeteriaList?.length ? this.orgDetails.cafeteriaList : [];
  }

  private async loadOutletsForCafe(): Promise<void> {
    if (!this.selected.cafeId || !this.orgDetails) {
      this.outletList = [];
      return;
    }

    const cafeDetails = this.cafeList.find((c: any) => c.cafeteria_id === this.selected.cafeId);
    if (!cafeDetails || !this.orgDetails?.organization_name) {
      this.outletList = [];
      return;
    }

    try {
      this.loadingOutlets = true;
      const res = await this.api.getOutletByCafeteria(
        cafeDetails.cafeteria_name,
        cafeDetails.cafeteria_city,
        this.orgDetails.organization_name
      );
      this.outletList = Array.isArray(res) ? res : [];
    } catch (err) {
      console.error('Error fetching outlet list:', err);
      this.outletList = [];
    } finally {
      this.loadingOutlets = false;
    }
  }

  // ——— Cascading selection handlers ———

  async onOrgChange(orgId: string): Promise<void> {
    this.selected.orgId = orgId;

    // Reset lower levels
    this.selected.cafeId = '';
    this.selected.outletId = '';
    this.outletList = [];

    await this.loadCafesForOrg(orgId);

    // If config has defaultCafeId and matches this org, apply it
    if (this.config?.defaultCafeId && this.cafeList.some(c => c.cafeteria_id === this.config.defaultCafeId)) {
      this.selected.cafeId = this.config.defaultCafeId;
      await this.loadOutletsForCafe();

      if (this.config?.defaultOutletId && this.outletList.some(o => o._id === this.config.defaultOutletId)) {
        this.selected.outletId = this.config.defaultOutletId;
      }
    }
  }

  async onCafeChange(cafeId: string): Promise<void> {
    this.selected.cafeId = cafeId;
    this.selected.outletId = '';
    await this.loadOutletsForCafe();
  }

  onOutletChange(outletId: string): void {
    this.selected.outletId = outletId;
  }

  // ——— Defaults & Config ———

  private async applyDefaultsIfAny(): Promise<void> {
    // Defaults for date-range
    if (this.config?.showDateRange) {
      if (this.config.minDate) this.dateForm.get('dateFrom')?.setValue(this.config.minDate);
      if (this.config.maxDate) this.dateForm.get('dateTo')?.setValue(this.config.maxDate);
    }

    // Defaults for org/cafe/outlet
    if (this.config?.defaultOrgId && this.orglist.some(o => o._id === this.config.defaultOrgId)) {
      await this.onOrgChange(this.config.defaultOrgId);
    }

    if (!this.selected.orgId && this.config?.disableOrg && this.orglist.length === 1) {
      // If org is locked/disabled and only one org exists, auto-pick it
      await this.onOrgChange(this.orglist[0]._id);
    }

    // If config is cafeteria mode and defaultCafeId provided (and org selected already)
    if (this.config?.defaultCafeId && this.cafeList.some(c => c.cafeteria_id === this.config.defaultCafeId)) {
      await this.onCafeChange(this.config.defaultCafeId);
    }

    // Outlet default if present & valid
    if (this.config?.defaultOutletId && this.outletList.some(o => o._id === this.config.defaultOutletId)) {
      this.onOutletChange(this.config.defaultOutletId);
    }
  }

  // ——— Submit ———

  get canSubmit(): boolean {
    if (!this.config?.requireAll) return true;
    if (!this.selected.orgId) return false;
    if (!this.selected.cafeId) return false;
    if (this.config.mode === 'outlet' && !this.selected.outletId) return false;
    return true;
  }

  onSubmit(): void {
    if (!this.canSubmit) return;

    const org = this.orglist.find(o => o._id === this.selected.orgId);
    const cafe = this.cafeList.find(c => c.cafeteria_id === this.selected.cafeId);
    const outlet = this.outletList.find(o => o._id === this.selected.outletId);

    const dateFrom: Date | null = this.dateForm.get('dateFrom')?.value || null;
    const dateTo: Date | null = this.dateForm.get('dateTo')?.value || null;

    const payload: SubmitPayload = {
      mode: this.config.mode,
      org_id: org?._id,
      org_name: org?.organization_name,
      cafeteria_id: cafe?.cafeteria_id,
      cafeteria_name: cafe?.cafeteria_name,
      cafeteria_city: cafe?.cafeteria_city,
      outlet_id: outlet?._id,
      outlet_name: outlet?.outletName,
      date_from: this.config.showDateRange && dateFrom ? new Date(dateFrom).toISOString() : undefined,
      date_to: this.config.showDateRange && dateTo ? new Date(dateTo).toISOString() : undefined,
    };

    this.submitted.emit(payload);
  }
}
