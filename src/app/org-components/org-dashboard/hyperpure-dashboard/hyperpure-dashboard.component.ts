import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';

type DashOrder = {
  orderDate: string | Date;
  grandTotal?: number;
  total?: number;
  total_amount?: number;
  status?: string;
  // ...anything else you have
};

type ApiOrder = {
  orderDate: string | Date;
  mealTypeList?: Array<{ totalPrice?: number; mealPrice?: number; count?: number }>;
  // ...other fields
};

type FlatOrder = { orderDate: string | Date; amount: number };



@Component({
  selector: 'app-hyperpure-dashboard',
  templateUrl: './hyperpure-dashboard.component.html',
  styleUrls: ['./hyperpure-dashboard.component.scss']
})
export class HyperpureDashboardComponent {
  Highcharts: typeof Highcharts = Highcharts;
  @Input() orgAdmin: any;

  maxDate: Date = new Date();
  loading = false;

  dateGroup!: FormGroup;
  orgDetails: any;
  cafeList: any[] = [];
  orders: any[] = [];

  // KPIs
  kpis = {
  totalOrders: 0,
  totalEarnings: 0,
  totalItems: 0, // NEW
};

  // Charts
  // Single bar chart: Date vs Count, tooltip also shows revenue
  dateCountChartOptions: Highcharts.Options = {
    chart: { type: 'column' },
    title: { text: 'Date-wise Orders (Count)' },
    xAxis: { categories: [] },
    yAxis: {
      title: { text: 'Orders' },
      allowDecimals: false
    },
    legend: { enabled: false },
    credits: { enabled: false },
    tooltip: {
      useHTML: true,
      pointFormatter: function () {
        // count from y, revenue from custom
        // @ts-ignore
        const c = Number(this.y || 0);
        // @ts-ignore
        const r = Number(this.custom?.revenue || 0);
        return `
        <div style="padding:6px 8px">
          <div><b>${this.category}</b></div>
          <div>Orders: <b>${c.toLocaleString('en-IN')}</b></div>
          <div>Revenue: <b>₹${r.toLocaleString('en-IN')}</b></div>
        </div>
      `;
      }
    } as Highcharts.TooltipOptions,
    plotOptions: {
      column: {
        borderWidth: 0,
        pointPadding: 0.1,
        groupPadding: 0.08
      }
    },
    series: [] // set dynamically
  };

  dateCountUpdateFlag = false;
  dateCountChartRef?: Highcharts.Chart;
  dateCountChartCallback: Highcharts.ChartCallbackFunction = (chart) => { this.dateCountChartRef = chart; };

  // ---- Aggregates ----
  itemAgg: Record<string, { count: number; revenue: number }> = {};

  // ---- Pie options/flags/refs ----
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
  plotOptions: { /* unchanged */ },
  series: []
};


  itemPieCountUpdateFlag = false;
  itemPieCountRef?: Highcharts.Chart;
  itemPieCountCallback: Highcharts.ChartCallbackFunction = (chart) => { this.itemPieCountRef = chart; };

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

  ngOnInit(): void {
    this.initFunc();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orgAdmin']?.currentValue) this.initFunc();
  }

  initFunc() {
    this.maxDate = new Date();
    this.maxDate.setHours(23, 59, 59, 999);
    this.getOrgDetailsById();
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
        this.cafeList = this.orgAdmin.role === "HYPERPURE_POC" ? res.cafeteriaList.filter((item:any) => this.orgAdmin.cafeDetails.some((a:any) => a.cafeteria_id === item.cafeteria_id)) : res.cafeteriaList;
        this.dateGroup.get('cafeteria_ids')?.setValue(this.cafeList.map(c => c.cafeteria_id), { emitEvent: false });
      }
    } catch (err) { console.error(err); }
  }

  // --- Multi-select helpers ---
  isAllSelected(): boolean {
    const selected: string[] = this.dateGroup.value.cafeteria_ids || [];
    const allIds = this.cafeList.map(c => c.cafeteria_id);
    return allIds.length > 0 && selected.length === allIds.length && allIds.every(id => selected.includes(id));
  }

  toggleSelectAll(isSelected: boolean) {
    const ctrl = this.dateGroup.get('cafeteria_ids') as FormControl<string[]>;
    if (!this.cafeList?.length) return;
    if (isSelected) {
      // Select ALL ids (and ensure '__all__' is not stored)
      ctrl.setValue(this.cafeList.map(c => c.cafeteria_id));
    } else {
      // Clear all
      ctrl.setValue([]);
    }
  }

  onCafeDropdownOpen(opened: boolean) {
    // When the panel opens, ensure the "Select All" checkbox state is consistent (no-op here).
  }

  private getSelectedCafeIds(): string[] {
    const selected = (this.dateGroup.value.cafeteria_ids || []).filter((v: string) => v !== '__all__');
    const allIds = this.cafeList.map(c => c.cafeteria_id);
    if (selected.length === allIds.length && allIds.every(id => selected.includes(id))) {
      return allIds; // explicit list when all selected
    }
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
    this.updateAnalyticsFromFlat(flat);         // fills totalOrders & totalEarnings
    this.kpis.totalItems = this.sumItemCounts(apiOrders); // finalize totalItems

    this.buildItemAggregates(apiOrders);
    this.refreshItemPieCount();
  } catch (err) {
    console.error('error fetching data', err);
    this.orders = [];
    this.updateAnalyticsFromFlat([]);
    this.kpis.totalItems = 0;
    this.buildItemAggregates([]);
    this.refreshItemPieCount();
  } finally {
    this.loading = false;
  }
}



  // Data
  private sumItemCounts(apiOrders: ApiOrder[]): number {
  let total = 0;
  for (const o of apiOrders || []) {
    for (const li of o.mealTypeList || []) {
      total += Number(li?.count) || 0;
    }
  }
  return total;
}
  private sumOrderAmount(o: ApiOrder): number {
    // Sum line items; fall back to mealPrice * count if totalPrice missing
    if (!o?.mealTypeList?.length) return 0;
    return o.mealTypeList.reduce((acc, it) => {
      const line = (typeof it?.totalPrice === 'number' ? it.totalPrice :
        (typeof it?.mealPrice === 'number' && typeof it?.count === 'number'
          ? it.mealPrice * it.count
          : 0));
      return acc + (Number.isFinite(line) ? line : 0);
    }, 0);
  }

  /** Convert API orders -> minimal shape used by charts/KPIs */
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
    const cumCounts: number[] = [];
    const cumRevenue: number[] = [];
    let runC = 0, runR = 0;

    for (const d of days) {
      const c = dailyCounts[d] || 0;
      const r = dailyRevenue[d] || 0;
      runC += c; runR += r;
      dailyCountsArr.push(c);
      dailyRevenueArr.push(r);
      cumCounts.push(runC);
      cumRevenue.push(Math.round(runR));
    }

    const aov = totalOrders ? totalEarnings / totalOrders : 0;
// old: this.kpis = { totalOrders, totalEarnings: Math.round(totalEarnings), aov: Math.round(aov) };
this.kpis = {
  totalOrders,
  totalEarnings: Math.round(totalEarnings),
  totalItems: this.sumItemCounts(this.orders as ApiOrder[]), // fill after orders set
};


    this.buildDateCountChart(days, dailyCountsArr, dailyRevenueArr);

  }


  // ---- fields ----

  private buildItemAggregates(apiOrders: Array<{
    mealTypeList?: Array<{ itemName?: string; count?: number; totalPrice?: number; mealPrice?: number }>;
  }>): void {
    const agg: Record<string, { count: number; revenue: number }> = {};
    for (const o of apiOrders || []) {
      for (const li of o.mealTypeList || []) {
        const name = (li.itemName || 'Unknown').trim();
        const count = Number(li.count) || 0;
        const revenue = Number.isFinite(li.totalPrice)
          ? Number(li.totalPrice)
          : (Number(li.mealPrice) || 0) * count;

        if (!agg[name]) agg[name] = { count: 0, revenue: 0 };
        agg[name].count += count;
        agg[name].revenue += revenue;
      }
    }
    this.itemAgg = agg;
  }

  // ---- Refresh the PIE (value = count; tooltip has both) ----
  private refreshItemPieCount() {
    const entries = Object.entries(this.itemAgg);
    // sort by count desc and optionally group tail into "Others"
    const sorted = entries.sort((a, b) => b[1].count - a[1].count);
    const N = 20; // keep pie readable
    const head = sorted.slice(0, N);
    const tail = sorted.slice(N);

    const others = tail.reduce((s, [, v]) => ({
      count: s.count + v.count,
      revenue: s.revenue + v.revenue
    }), { count: 0, revenue: 0 });

    const data: Highcharts.PointOptionsObject[] = head.map(([name, v]) => ({
      name,
      y: v.count, // slice size by COUNT
      custom: { count: v.count, revenue: Math.round(v.revenue) } // tooltip extras
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

  private buildDateCountChart(categories: string[], dailyCounts: number[], dailyRevenue: number[]) {
    // Pack revenue as custom per point so tooltip can read it
    const data: Highcharts.PointOptionsObject[] = dailyCounts.map((cnt, i) => ({
      y: cnt,
      custom: { revenue: Math.round(dailyRevenue[i] || 0) }
    }));

    this.dateCountChartOptions = {
      ...this.dateCountChartOptions,
      xAxis: { categories },
      series: [{ type: 'column', name: 'Orders', data }]
    };

    this.dateCountUpdateFlag = true;
    setTimeout(() => this.dateCountChartRef?.reflow(), 0);
  }


}
