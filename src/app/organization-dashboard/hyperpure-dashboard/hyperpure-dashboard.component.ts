import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { LocalStorageService } from '@service/local-storage.service';

type ApiOrder = {
  orderDate: string | Date;
  mealTypeList?: Array<{ totalPrice?: number; mealPrice?: number; count?: number; itemName?: string; status?: string }>;
};

type FlatOrder = { orderDate: string | Date; amount: number };

type MenuRow = {
  cafeteria_id: string;
  cafeteria_name: string;
  itemName?: string;
  mealPrice?: number;
  minGuarantees?: number;
};
type MenuCafe = {
  cafeteria_id: string;
  cafeteria_name: string;
  mealTypeList?: Array<{ itemName?: string; mealPrice?: number; minGuarantees?: number }>;
};


import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-hyperpure-dashboard',
  templateUrl: './hyperpure-dashboard.component.html',
  styleUrls: ['./hyperpure-dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HyperpureDashboardComponent {
  Highcharts: typeof Highcharts = Highcharts;
  @Input() orgAdmin: any;

  maxDate: Date = new Date();
  loading = false;

  dateGroup!: FormGroup;
  orgDetails: any;
  cafeList: any[] = [];
  orders: ApiOrder[] = [];

  // KPIs
  kpis = {
    totalOrders: 0,
    totalEarnings: 0,
    totalItems: 0,
  };

  // Menu store + flattened view
  consumptionMenu: MenuCafe[] = [];
  flattenedMenu: MenuRow[] = [];   // ALL rows (filtered by selected cafeterias)
  pagedMenu: MenuRow[] = [];       // current page rows

  // Single paginator state
  menuPageSize = 5;
  menuPageIndex = 0;
  menuTotal = 0;

  // ===== Date vs Count + Revenue (combo) =====
  dateCountChartOptions: Highcharts.Options = {
    chart: { zooming: { type: 'x' } },
    title: { text: 'Date-wise Item Count & Revenue' },
    credits: { enabled: false },
    legend: { enabled: true },
    xAxis: { categories: [] },
    yAxis: [
      { // 0 = Items
        title: { text: 'Items' },
        allowDecimals: false
      },
      { // 1 = Revenue
        title: { text: 'Revenue (₹)' },
        labels: {
          formatter: function () {
            const v = Number(this.value || 0);
            return '₹' + v.toLocaleString('en-IN', { maximumFractionDigits: 0 });
          }
        },
        opposite: true
      }
    ],
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        const pts = (this as any).points || [];
        const date = (this as any).x;
        let items = 0;
        let revenue = 0;

        pts.forEach((p: any) => {
          if (p.series.name === 'Items') items = Number(p.y || 0);
          if (p.series.name === 'Revenue (₹)') revenue = Number(p.y || 0);
        });

        return `
        <div style="padding:6px 8px">
          <div><b>${date}</b></div>
          <div>Items: <b>${items.toLocaleString('en-IN')}</b></div>
          <div>Revenue: <b>₹${revenue.toLocaleString('en-IN')}</b></div>
        </div>
      `;
      }
    } as Highcharts.TooltipOptions,
    plotOptions: {
      column: { borderWidth: 0, pointPadding: 0.1, groupPadding: 0.08 },
      spline: { marker: { enabled: true } }
    },
    series: []
  };

  dateCountUpdateFlag = false;
  dateCountChartRef?: Highcharts.Chart;
  dateCountChartCallback: Highcharts.ChartCallbackFunction = (chart) => { this.dateCountChartRef = chart; };

  // ---- Item aggregates for pie (count-driven) ----
  itemAgg: Record<string, { count: number; revenue: number }> = {};
  itemPieCountOptions: Highcharts.Options = {
    chart: { type: 'pie' },
    title: { text: 'Item-wise Orders (Count)' },
    credits: { enabled: false },
    legend: { enabled: true },
    tooltip: {
      useHTML: true,
      pointFormatter: function () {
        // @ts-ignore
        const c = this.custom?.count ?? this.y ?? 0;
        // @ts-ignore
        const r = this.custom?.revenue ?? 0;
        const avg = c ? (r / c) : 0;
        return `
          <div style="padding:6px 8px">
            <div><b>${this.name}</b></div>
            <div>Orders: <b>${Number(c).toLocaleString('en-IN')}</b></div>
            <div>Revenue: <b>₹${Number(r).toLocaleString('en-IN')}</b></div>
            <div>Average: <b>₹${Number(avg).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</b></div>
            <div>Share: <b>${(this.percentage || 0).toFixed(1)}%</b></div>
          </div>
        `;
      }
    } as Highcharts.TooltipOptions,
    plotOptions: { pie: { showInLegend: true } },
    series: []
  };
  itemPieCountUpdateFlag = false;
  itemPieCountRef?: Highcharts.Chart;
  itemPieCountCallback: Highcharts.ChartCallbackFunction = (chart) => { this.itemPieCountRef = chart; };

  // ---- Item status date-wise stacked columns ----
  itemStatusStackedOptions: Highcharts.Options = {
    chart: { zooming: { type: 'x' } },
    title: { text: 'Date-wise Item Status (Counts)' },
    credits: { enabled: false },
    legend: { enabled: true },
    xAxis: { categories: [] }, // dates
    yAxis: {
      title: { text: 'Items' },
      allowDecimals: false
    },
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        const pts = (this as any).points || [];
        const date = (this as any).x;
        let total = 0;
        const rows = pts.map((p: any) => {
          const v = Number(p.y || 0); total += v;
          return `<div>${p.series.name}: <b>${v.toLocaleString('en-IN')}</b></div>`;
        }).join('');
        return `
        <div style="padding:6px 8px">
          <div><b>${date}</b></div>
          ${rows}
          <hr style="margin:6px 0;border-top:1px solid #eee"/>
          <div>Total: <b>${total.toLocaleString('en-IN')}</b></div>
        </div>
      `;
      }
    } as Highcharts.TooltipOptions,
    plotOptions: {
      column: {
        stacking: 'normal',
        borderWidth: 0,
        pointPadding: 0.05,
        groupPadding: 0.1
      }
    },
    series: [] // set dynamically
  };
  itemStatusStackedUpdateFlag = false;
  itemStatusStackedRef?: Highcharts.Chart;
  itemStatusStackedCallback: Highcharts.ChartCallbackFunction = (chart) => { this.itemStatusStackedRef = chart; };

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService
  ) {
    this.dateGroup = new FormGroup(
      {
        start: new FormControl<Date | null>(new Date(), { validators: [Validators.required] }),
        end: new FormControl<Date | null>(new Date(), { validators: [Validators.required] }),
        cafeteria_ids: new FormControl<string[]>([])
      },
      { validators: [this.dateRangeValidator.bind(this)] }
    );
  }

  ngOnInit(): void { this.initFunc(); }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orgAdmin']?.currentValue) this.initFunc();
  }

  initFunc() {
    this.maxDate = new Date();
    this.maxDate.setHours(23, 59, 59, 999);
    this.getOrgDetailsById();
    this.getConsumptionOrderByOrgId()
  }

  private dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const start = group.get('start')?.value as Date | null;
    const end = group.get('end')?.value as Date | null;
    if (!start || !end) return { rangeRequired: true };
    const s = new Date(start);
    const e = new Date(end);
    if (e < s) return { endBeforeStart: true };
    if (s > this.maxDate || e > this.maxDate) return { inFuture: true };
    return null;
  }

  private normalizeRange(d: Date, isEnd = false): Date {
    const nd = new Date(d);
    if (isEnd) nd.setHours(23, 59, 59, 999);
    else nd.setHours(0, 0, 0, 0);
    return nd;
  }

  async getOrgDetailsById() {
    try {
      const res = await this.apiMainService.getOrg(this.orgAdmin?.orgDetails?._id);
      this.orgDetails = res;
      if (res?.cafeteriaList?.length) {
        this.cafeList = this.orgAdmin.role === "HYPERPURE_POC"
          ? res.cafeteriaList.filter((item: any) =>
            this.orgAdmin.cafeDetails.some((a: any) => a.cafeteria_id === item.cafeteria_id))
          : res.cafeteriaList;

        this.dateGroup.get('cafeteria_ids')?.setValue(this.cafeList.map(c => c.cafeteria_id), { emitEvent: false });

      }
    } catch (err) { console.error(err); }
  }

  async getConsumptionOrderByOrgId() {
    try {
      const res = await this.apiMainService.getConsumptionOrderByOrgId(this.orgAdmin?.orgDetails?._id);
      this.consumptionMenu = (res || []) as MenuCafe[];

      this.rebuildMenuTable();  // ensure sync after fetch
    } catch (err: any) {
      this.consumptionMenu = [];
      this.rebuildMenuTable();
    }
  }


  private rebuildMenuTable() {
    const selected = new Set(this.getSelectedCafeIds());
    if (!selected.size || !this.consumptionMenu?.length) {
      this.flattenedMenu = [];
      this.menuTotal = 0;
      this.applyMenuPage();
      return;
    }

    // Build flat rows for selected cafeterias only
    const rows: MenuRow[] = [];
    for (const cafe of this.consumptionMenu) {
      if (!selected.has(cafe.cafeteria_id)) continue;
      const name = cafe.cafeteria_name;
      for (const it of cafe.mealTypeList || []) {
        rows.push({
          cafeteria_id: cafe.cafeteria_id,
          cafeteria_name: name,
          itemName: it.itemName,
          mealPrice: it.mealPrice,
          minGuarantees: (it as any).minGuarantees
        });
      }
    }

    // Optional: stable sort by cafeteria then item
    rows.sort((a, b) => {
      if (a.cafeteria_name !== b.cafeteria_name) return a.cafeteria_name.localeCompare(b.cafeteria_name);
      return (a.itemName || '').localeCompare(b.itemName || '');
    });

    this.flattenedMenu = rows;
    this.menuTotal = rows.length;
    this.applyMenuPage();
  }

  private applyMenuPage() {
    const start = this.menuPageIndex * this.menuPageSize;
    this.pagedMenu = this.flattenedMenu.slice(start, start + this.menuPageSize);
  }

  onMenuPage(ev: any) {
    this.menuPageSize = ev.pageSize;
    this.menuPageIndex = ev.pageIndex;
    this.applyMenuPage();
  }

  trackByRow = (_: number, r: MenuRow) => `${r.cafeteria_id}:${r.itemName}`;

  // --- Multi-select helpers ---
  isAllSelected(): boolean {
    const selected: string[] = this.dateGroup.value.cafeteria_ids || [];
    const allIds = this.cafeList.map(c => c.cafeteria_id);
    return allIds.length > 0 && selected.length === allIds.length && allIds.every(id => selected.includes(id));
  }

  toggleSelectAll(isSelected: boolean) {
    const ctrl = this.dateGroup.get('cafeteria_ids') as FormControl<string[]>;
    if (!this.cafeList?.length) return;
    if (isSelected) ctrl.setValue(this.cafeList.map(c => c.cafeteria_id));
    else ctrl.setValue([]);
  }

  onCafeDropdownOpen(_opened: boolean) { /* no-op */ }

  private getSelectedCafeIds(): string[] {
    const selected = (this.dateGroup.value.cafeteria_ids || []).filter((v: string) => v !== '__all__');
    const allIds = this.cafeList.map(c => c.cafeteria_id);
    if (selected.length === allIds.length && allIds.every(id => selected.includes(id))) return allIds;
    return selected;
  }

  buildPayload() {
    const start = this.normalizeRange(this.dateGroup.value.start as Date, false);
    const end = this.normalizeRange(this.dateGroup.value.end as Date, true);
    return {
      startDate: start,
      endDate: end,
      orgId: this.orgAdmin?.orgDetails?._id,
      cafeteria_ids: this.getSelectedCafeIds()
    };
  }

  async fetchData() {
    if (this.dateGroup.invalid || !this.orgAdmin?.orgDetails?._id) return;
    const payload = this.buildPayload();
    this.loading = true;
    try {
      const apiOrders: ApiOrder[] = await this.apiMainService.getConsumptionOrderByDateForDashboard(payload);

      this.orders = apiOrders;

      const flat = this.flattenOrders(apiOrders);
      this.updateAnalyticsFromFlat(flat);         // fills totalOrders & totalEarnings and builds chart
      this.kpis.totalItems = this.sumItemCounts(apiOrders);

      this.buildItemAggregates(apiOrders);
      this.refreshItemPieCount();
      this.refreshItemStatusStacked();
        this.rebuildMenuTable();

    } catch (err) {
      console.error('error fetching data', err);
      this.orders = [];
      this.updateAnalyticsFromFlat([]);
      this.kpis.totalItems = 0;
      this.buildItemAggregates([]);
      this.refreshItemPieCount();
      this.refreshItemStatusStacked();

    } finally {
      this.loading = false;
    }
  }

  // ==== helpers ====
  private sumItemCounts(apiOrders: ApiOrder[]): number {
    let total = 0;
    for (const o of apiOrders || []) {
      for (const li of o.mealTypeList || []) total += Number(li?.count) || 0;
    }
    return total;
  }

  private sumOrderAmount(o: ApiOrder): number {
    if (!o?.mealTypeList?.length) return 0;
    return o.mealTypeList.reduce((acc, it) => {
      const line = (typeof it?.totalPrice === 'number')
        ? it.totalPrice
        : ((Number(it?.mealPrice) || 0) * (Number(it?.count) || 0));
      return acc + (Number.isFinite(line) ? Number(line) : 0);
    }, 0);
  }

  private flattenOrders(apiOrders: ApiOrder[]): FlatOrder[] {
    return (apiOrders || []).map(o => ({
      orderDate: o.orderDate,
      amount: this.sumOrderAmount(o)
    }));
  }

  private dateKey(d: Date | string): string {
    const dt = new Date(d);
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const da = String(dt.getDate()).padStart(2, '0');
    return `${y}-${m}-${da}`;
  }

  private enumerateDates(start: Date, end: Date): string[] {
    const days: string[] = [];
    const cur = new Date(start); cur.setHours(0, 0, 0, 0);
    const last = new Date(end); last.setHours(0, 0, 0, 0);
    while (cur <= last) { days.push(this.dateKey(cur)); cur.setDate(cur.getDate() + 1); }
    return days;
  }

  private updateAnalyticsFromFlat(orders: Array<{ orderDate: string | Date; amount: number }>) {
    const start = this.normalizeRange(this.dateGroup.value.start as Date, false);
    const end = this.normalizeRange(this.dateGroup.value.end as Date, true);
    const days = this.enumerateDates(start, end);

    const dailyCounts: Record<string, number> = {};
    const dailyRevenue: Record<string, number> = {};
    for (const d of days) { dailyCounts[d] = 0; dailyRevenue[d] = 0; }

    let totalOrders = 0;
    let totalEarnings = 0;

    for (const o of orders) {
      const key = this.dateKey(o.orderDate);
      if (!(key in dailyCounts)) continue;
      dailyCounts[key] += 1;
      dailyRevenue[key] += (Number.isFinite(o.amount) ? o.amount : 0);
      totalOrders += 1;
      totalEarnings += (Number.isFinite(o.amount) ? o.amount : 0);
    }

    const dailyCountsArr: number[] = [];
    const dailyRevenueArr: number[] = [];
    for (const d of days) {
      dailyCountsArr.push(dailyCounts[d] || 0);
      dailyRevenueArr.push(Math.round(dailyRevenue[d] || 0));
    }

    // KPIs
    this.kpis = {
      totalOrders,
      totalEarnings: Math.round(totalEarnings),
      totalItems: this.sumItemCounts(this.orders as ApiOrder[]),
    };

    // Build combo chart with two series & twin axes
    this.buildDateItemVsRevenueChart(days, this.orders, dailyRevenueArr);
  }

  private buildItemAggregates(apiOrders: ApiOrder[]): void {
    const agg: Record<string, { count: number; revenue: number }> = {};
    for (const o of apiOrders || []) {
      for (const li of o.mealTypeList || []) {
        const name = (li.itemName || 'Unknown').trim();
        const count = Number(li.count) || 0;
        const revenue = Number.isFinite(li.totalPrice as number)
          ? Number(li.totalPrice)
          : (Number(li.mealPrice) || 0) * count;

        if (!agg[name]) agg[name] = { count: 0, revenue: 0 };
        agg[name].count += count;
        agg[name].revenue += revenue;
      }
    }
    this.itemAgg = agg;
  }

  private refreshItemPieCount() {
    const entries = Object.entries(this.itemAgg);
    const sorted = entries.sort((a, b) => b[1].count - a[1].count);
    const N = 20;
    const head = sorted.slice(0, N);
    const tail = sorted.slice(N);

    const others = tail.reduce((s, [, v]) => ({
      count: s.count + v.count,
      revenue: s.revenue + v.revenue
    }), { count: 0, revenue: 0 });

    const data: Highcharts.PointOptionsObject[] = head.map(([name, v]) => ({
      name,
      y: v.count,
      custom: { count: v.count, revenue: Math.round(v.revenue) }
    }));
    if (others.count > 0) {
      data.push({ name: 'Others', y: others.count, custom: { count: others.count, revenue: Math.round(others.revenue) } });
    }

    this.itemPieCountOptions = {
      ...this.itemPieCountOptions,
      series: [{ type: 'pie', name: 'Orders', data }]
    };

    this.itemPieCountUpdateFlag = true;
    setTimeout(() => this.itemPieCountRef?.reflow(), 0);
  }

  private computeDailyItemCounts(apiOrders: ApiOrder[], days: string[]): number[] {
    const byDay: Record<string, number> = {};
    for (const d of days) byDay[d] = 0;

    for (const o of apiOrders || []) {
      const key = this.dateKey(o.orderDate);
      if (!(key in byDay)) continue;
      let dayItems = 0;
      for (const li of o.mealTypeList || []) {
        dayItems += Number(li?.count) || 0;
      }
      byDay[key] += dayItems;
    }

    return days.map(d => byDay[d] || 0);
  }


  private buildDateItemVsRevenueChart(categories: string[],
    apiOrders: ApiOrder[],
    dailyRevenue: number[]) {
    const dailyItems = this.computeDailyItemCounts(apiOrders, categories);

    const itemsSeries: Highcharts.SeriesColumnOptions = {
      type: 'column',
      name: 'Items',
      data: dailyItems,
      yAxis: 0
    };

    const revenueSeries: Highcharts.SeriesSplineOptions = {
      type: 'spline',
      name: 'Revenue (₹)',
      data: dailyRevenue,
      yAxis: 1,
      tooltip: { valuePrefix: '₹' }
    };

    this.dateCountChartOptions = {
      ...this.dateCountChartOptions,
      xAxis: { categories },
      series: [itemsSeries, revenueSeries] as Highcharts.SeriesOptionsType[]
    };

    this.dateCountUpdateFlag = true;
    setTimeout(() => this.dateCountChartRef?.reflow(), 0);
  }

  private getStatusLabel(raw: string | undefined): 'Approved' | 'Review' | 'Cancelled' | 'Other' {
    const s = (raw || '').toString().trim().toLowerCase();
    if (s === 'approved') return 'Approved';
    if (s === 'review') return 'Review';
    if (s === 'cancelled') return 'Cancelled';
    return 'Other';
  }

  private refreshItemStatusStacked() {
    // Build date categories from selected range
    const start = this.normalizeRange(this.dateGroup.value.start as Date, false);
    const end = this.normalizeRange(this.dateGroup.value.end as Date, true);
    const days = this.enumerateDates(start, end);

    // Quick index for O(1) day lookup
    const dayIndex = new Map<string, number>();
    days.forEach((d, i) => dayIndex.set(d, i));

    // Init arrays
    const approved: number[] = Array(days.length).fill(0);
    const review: number[] = Array(days.length).fill(0);
    const cancelled: number[] = Array(days.length).fill(0);
    const other: number[] = Array(days.length).fill(0);

    // Aggregate counts by date & status
    for (const o of this.orders || []) {
      const key = this.dateKey(o.orderDate);
      const idx = dayIndex.get(key);
      if (idx === undefined) continue;

      for (const li of o.mealTypeList || []) {
        const cnt = Number(li?.count) || 0;
        switch (this.getStatusLabel(li?.status)) {
          case 'Approved': approved[idx] += cnt; break;
          case 'Review': review[idx] += cnt; break;
          case 'Cancelled': cancelled[idx] += cnt; break;
          default: other[idx] += cnt; break;
        }
      }
    }

    // Build series
    const sApproved: Highcharts.SeriesColumnOptions = { type: 'column', name: 'Approved', data: approved };
    const sReview: Highcharts.SeriesColumnOptions = { type: 'column', name: 'Review', data: review };
    const sCancelled: Highcharts.SeriesColumnOptions = { type: 'column', name: 'Cancelled', data: cancelled };
    const sOther: Highcharts.SeriesColumnOptions = { type: 'column', name: 'Other', data: other };

    this.itemStatusStackedOptions = {
      ...this.itemStatusStackedOptions,
      xAxis: { categories: days },
      series: [sApproved, sReview, sCancelled, sOther] as Highcharts.SeriesOptionsType[]
    };

    this.itemStatusStackedUpdateFlag = true;
    setTimeout(() => this.itemStatusStackedRef?.reflow(), 0);
  }

}
