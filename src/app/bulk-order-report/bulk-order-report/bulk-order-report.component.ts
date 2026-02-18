import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';

interface VendorTotals {
  count: number;
  orderAmount: number;
  totalVendorAmt: number;
}


@Component({
  selector: 'app-bulk-order-report',
  templateUrl: './bulk-order-report.component.html',
  styleUrls: ['./bulk-order-report.component.scss']
})
export class BulkOrderReportComponent implements OnInit {

  @Input() vendorFirmInfo: any;
  @Input() filteredData: any;
  dateForm: FormGroup<{
    dateFrom: FormControl<Date | null>;
    dateTo: FormControl<Date | null>;
  }>;
  public readonly Math = Math;
  orders: any[] = [];
  vendorFirm: any;
  orderWise: Array<{
    orderNo: number;
    orderDateIST: string;
    customerName?: string;
    orderAmount: number;
    vendorLedgerAmt: number;
  }> = [];
  vendorTotals: VendorTotals = {
    count: 0,
    orderAmount: 0,
    totalVendorAmt: 0
  };
  mainPageIndex = 0;
  mainPageSize = 5;
  mainPageSizeOptions = [5, 10, 25, 50, 100];

  constructor(private fb: FormBuilder, private localStorageService: LocalStorageService,
    private apiMainService: ApiMainService
  ) {
    this.dateForm = this.fb.group({
      dateFrom: new FormControl<Date | null>(null),
      dateTo: new FormControl<Date | null>(null),
    });
  }

  ngOnInit(): void {
    const vendorFirm = this.localStorageService.getCacheData('VENDOR_FIRM_EDIT');
    this.vendorFirm = vendorFirm;
  }

  get pagedOrderWise() {
    const start = this.mainPageIndex * this.mainPageSize;
    return this.orderWise?.slice(start, start + this.mainPageSize);
  }

  get hasData(): boolean {
    return this.orderWise?.length > 0;
  }

  get canSubmit(): boolean {
    const { dateFrom, dateTo } = this.dateForm.value;
    return !!(this.vendorFirm?._id && dateFrom && dateTo);
  }

  trackByOrder = (_: number, r: any) => r.orderNo ?? r._id ?? _;

  onSubmit() {
    if (!this.canSubmit) return;

    const { dateFrom, dateTo } = this.dateForm.value;

    this.filteredData = {
      ...(this.filteredData || {}),
      date_from: dateFrom ? dateFrom.toISOString() : null,
      date_to: dateTo ? dateTo.toISOString() : null,
    };
    this.fetchBulkOrders();
  }

  fetchBulkOrders() {
    try {
      const body = {
        vendorFirmId: this.vendorFirm._id,
        fromDate: this.filteredData?.date_from,
        toDate: this.filteredData?.date_to,
      };

      this.apiMainService.fetchBulkOrdersbyfilter(body).then((res: any) => {
        if (res) {
          this.orders = res.orders;
          this.orderWise = res.orderWise;
          this.vendorTotals = res.vendorTotals;
        } else {
          this.orders = [];
          this.orderWise = [];
          this.vendorTotals = { count: 0, orderAmount: 0, totalVendorAmt: 0 };
        }
      });
    } catch (e) {
      console.error("Error while fetching bulk orders", e);
    }
  }

  onMainPage(event: any) {
    this.mainPageIndex = event.pageIndex;
    this.mainPageSize = event.pageSize;
  }

  exportDatewiseSummaryExcel() { }
  exportItemwiseSummaryExcel() { }
}
