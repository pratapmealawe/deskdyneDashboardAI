import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { LocalStorageService } from '@service/local-storage.service';
import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { MaterialModule } from 'src/app/material.module';
import { ReviewCardComponent } from './review-card/review-card.component';
import { MatDialog } from '@angular/material/dialog';
import { ReviewFilterDialogComponent } from '../common-components/review-filter-dialog/review-filter-dialog.component';
import { CommonOutletCafeSelectComponent, CommonSelectConfig, SubmitPayload } from '../common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';

(pdfMake as any).vfs =
  (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).pdfMake?.vfs ?? {};
if (!(Highcharts as any).Drilldown) {
  Drilldown(Highcharts);
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    MaterialModule,
    ReviewCardComponent,
    CommonOutletCafeSelectComponent,
    ReviewFilterDialogComponent
  ]
})
export class ReviewComponent implements OnInit, OnChanges {
  @Input() filterConfig: any; // { orgId?, outletId?, customerId?, fromDate?, toDate? }

  Highcharts: typeof Highcharts = Highcharts;
  reviewList: any[] = [];
  displayedList: any[] = [];
  paginatedReviewList: any[] = [];
  isLoading: boolean = false;
  searchText: string = '';
  filterRating: string = '';
  hasCommentOnly: boolean = false;
  averageRating: number = 0;
  ratingCounts: { stars: number; count: number }[] = [];
  isChartShow: boolean = false;

  isAdmin: boolean = false;
  adminProfile: any;

  // Header Config for Cafe Select
  headerConfigAdmin: CommonSelectConfig = {
    mode: 'outlet',
    showDateRange: true,
    disableOrg: false,
    requireAll: true,
  };

  headerConfig: CommonSelectConfig = {
    mode: 'outlet',
    showDateRange: true,
    disableOrg: true,
    requireAll: true,
  };

  // Chart
  chartOptionsPie: Highcharts.Options = {
    chart: { 
      type: 'pie',
      backgroundColor: 'transparent',
    },
    title: { text: 'Customer Satisfaction Breakdown', style: { fontWeight: '700' } },
    subtitle: { text: 'Overall Order Ratings - Click for Item Insights' },
    tooltip: {
      headerFormat: '',
      pointFormat: '<b>{point.name}</b><br>Count: <b>{point.count}</b><br>Percentage: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: <b>{point.count}</b>',
        },
      },
    },
    series: [{ type: 'pie', name: 'Ratings', data: [] }],
    drilldown: { series: [] },
  };

  updateStatusFlag: boolean = false;
  oneToOneStatusFlag: boolean = true;

  // pagination
  pageIndex: number = 0;
  pageSize: number = 10;

  activeFilterCount: number = 0;

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.adminProfile = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.isAdmin = this.adminProfile?.role === 'ADMIN';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date();
    tomorrow.setHours(23, 59, 59, 999);

    this.headerConfig.defaultDateFrom = today;
    this.headerConfig.defaultDateTo = tomorrow;
    this.headerConfigAdmin.defaultDateFrom = today;
    this.headerConfigAdmin.defaultDateTo = tomorrow;

    this.headerConfig.defaultOrgId = this.adminProfile?.orgDetails?._id || '';
    this.headerConfigAdmin.defaultOrgId = this.adminProfile?.orgDetails?._id || '';

    if (this.filterConfig) {
      this.getFeedbackList();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterConfig'] && changes['filterConfig'].currentValue) {
      this.getFeedbackList();
    }
  }

  filterSubmitted(event: SubmitPayload) {
    this.filterConfig = {
      orgId: event.org_id,
      outletId: event.outlet_id,
      fromDate: event.date_from,
      toDate: event.date_to
    };
    this.getFeedbackList();
  }

  reloadReviews() {
    this.getFeedbackList();
  }

  async getFeedbackList() {
    if (!this.filterConfig) return;
    this.isLoading = true;
    this.isChartShow = false;
    try {
      const reviewList = await this.apiMainService.getfeedbacklistByfilter(this.filterConfig);
      this.reviewList = Array.isArray(reviewList) ? [...reviewList] : [];
      this.applySearch();
    } catch (e) {
      console.error('Error fetching reviews:', e);
      this.reviewList = [];
      this.displayedList = [];
      this.paginatedReviewList = [];
    } finally {
      this.isLoading = false;
    }
  }

  onSearch(value: string) {
    this.searchText = value;
    this.applySearch();
  }

  applySearch() {
    let list = [...this.reviewList];
    if (this.searchText) {
      const lower = this.searchText.toLowerCase();
      list = list.filter((r: any) =>
        (r.feedbackFrom_name && r.feedbackFrom_name.toLowerCase().includes(lower)) ||
        (r.feedbackOrderNo && r.feedbackOrderNo.toString().toLowerCase().includes(lower))
      );
    }
    if (this.filterRating) {
      if (this.filterRating === 'skipped') {
        list = list.filter((r: any) => !r.rating || r.rating === 0);
      } else {
        const ratingVal = Number(this.filterRating);
        list = list.filter((r: any) => r.rating === ratingVal);
      }
    }

    if (this.hasCommentOnly) {
      list = list.filter((r: any) => r.feedback && r.feedback.trim().length > 0);
    }

    this.displayedList = list;
    this.computeTotals();
    this.updateActiveFilterCount();
    this.pageIndex = 0;
    this.addPagination();
  }

  updateActiveFilterCount() {
    let count = 0;
    if (this.filterRating) count++;
    if (this.hasCommentOnly) count++;
    this.activeFilterCount = count;
  }

  onFilterRating(rating: string) {
    this.filterRating = this.filterRating === rating ? '' : rating;
    this.applySearch();
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(ReviewFilterDialogComponent, {
      width: '450px',
      data: {
        filterRating: this.filterRating,
        hasCommentOnly: this.hasCommentOnly
      },
      panelClass: 'premium-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterRating = result.filterRating;
        this.hasCommentOnly = result.hasCommentOnly;
        this.applySearch();
      }
    });
  }

  clearFilters() {
    this.searchText = '';
    this.filterRating = '';
    this.hasCommentOnly = false;
    this.applySearch();
  }

  computeTotals() {
    const list = this.reviewList;
    if (list.length === 0) {
      this.averageRating = 0;
      this.ratingCounts = [];
      return;
    }
    const ratingMap: Record<number, number> = {};
    let totalRating = 0;
    let ratedCount = 0;
    list.forEach((r: any) => {
      const rating = r.rating ?? 0;
      if (rating > 0) {
        totalRating += rating;
        ratedCount++;
      }
      ratingMap[rating] = (ratingMap[rating] || 0) + 1;
    });
    this.averageRating = ratedCount > 0 ? totalRating / ratedCount : 0;
    this.ratingCounts = [5, 4, 3, 2, 1, 0].map(stars => ({
      stars,
      count: ratingMap[stars] || 0
    }));
  }

  addPagination() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedReviewList = this.displayedList.slice(start, end);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.addPagination();
  }

  changeDataView() {
    if (!this.isChartShow) {
      this.generateDrilldownChartData();
    } else {
      this.isChartShow = false;
    }
  }

  generateDrilldownChartData(): void {
    const ratingTotals: Record<number, number> = {};
    const ratingItemCount: Record<number, Record<string, number>> = {};
    const ratingItemContains: Record<number, Record<string, Record<string, number>>> = {};

    // 1. Calculate Top-Level Order Ratings
    this.reviewList.forEach((r: any) => {
      const rating = r.rating ?? 0;
      ratingTotals[rating] = (ratingTotals[rating] || 0) + 1;

      // 2. Map Items to their Parent Order's Rating for Drilldown
      const itemlist = r.itemlist || r.itemList || [];
      itemlist.forEach((item: any) => {
        const itemName = item.itemName;
        const containsList = item.itemContains || [];

        ratingItemCount[rating] = ratingItemCount[rating] || {};
        ratingItemCount[rating][itemName] = (ratingItemCount[rating][itemName] || 0) + 1;
        
        ratingItemContains[rating] = ratingItemContains[rating] || {};
        ratingItemContains[rating][itemName] = ratingItemContains[rating][itemName] || {};
        containsList.forEach((sub: any) => {
          const subName = sub.name;
          ratingItemContains[rating][itemName][subName] = (ratingItemContains[rating][itemName][subName] || 0) + 1;
        });
      });
    });

    const totalOrders = this.reviewList.length;
    const topLevelData: any[] = [5, 4, 3, 2, 1, 0].map((rating) => {
      const count = ratingTotals[rating] || 0;
      const percentage = totalOrders > 0 ? (count / totalOrders) * 100 : 0;
      return {
        name: rating === 0 ? 'Skipped' : `${rating} Star${rating !== 1 ? 's' : ''}`,
        y: percentage,
        count: count,
        drilldown: `rating-${rating}`,
      };
    });

    const firstLevelDrill: any[] = [];
    Object.keys(ratingItemCount).forEach((ratingKey) => {
      const ratingNum = Number(ratingKey);
      const itemMap = ratingItemCount[ratingNum] || {};
      const itemTotal = ratingTotals[ratingNum] || 0;
      const dataArray: any[] = Object.keys(itemMap).map((itemName) => {
        const cnt = itemMap[itemName];
        const pct = (cnt / itemTotal) * 100;
        const hasContains = ratingItemContains[ratingNum]?.[itemName];
        return {
          name: itemName,
          y: pct,
          count: cnt,
          drilldown: hasContains ? `rating-${ratingNum}-${itemName}` : null
        };
      });
      firstLevelDrill.push({ id: `rating-${ratingNum}`, name: `Items`, type: 'pie', data: dataArray });
    });

    const secondLevelDrill: any[] = [];
    Object.keys(ratingItemContains).forEach((ratingKey) => {
      const ratingNum = Number(ratingKey);
      Object.keys(ratingItemContains[ratingNum]).forEach((itemName) => {
        const subMap = ratingItemContains[ratingNum][itemName];
        const totalSubItems = Object.values(subMap).reduce((acc: number, c: any) => acc + c, 0);
        const dataArray: any[] = Object.keys(subMap).map((subName) => {
          const cnt = subMap[subName];
          return { name: subName, y: (cnt / totalSubItems) * 100, count: cnt, drilldown: null };
        });
        secondLevelDrill.push({ id: `rating-${ratingNum}-${itemName}`, name: `Components`, type: 'pie', data: dataArray });
      });
    });

    this.chartOptionsPie = {
      ...this.chartOptionsPie,
      series: [{ type: 'pie', name: 'Ratings', data: topLevelData }],
      drilldown: { series: [...firstLevelDrill, ...secondLevelDrill] },
    };
    this.isChartShow = true;
    this.updateStatusFlag = true;
  }

  async excelExport() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reviews');
    worksheet.columns = [
      { header: 'Order No', key: 'feedbackOrderNo', width: 12 },
      { header: 'User Name', key: 'feedbackFrom_name', width: 15 },
      { header: 'Submitted Date', key: 'submitedDate', width: 20 },
      { header: 'Rating', key: 'rating', width: 10 },
      { header: 'Feedback', key: 'feedback', width: 30 },
      { header: 'Items', key: 'items', width: 30 },
    ];
    this.reviewList.forEach(order => {
      const items = (order.itemList || order.itemlist || [])
        .map((i: any) => `${i.itemName} x${i.count}`)
        .join(', ');
      worksheet.addRow({
        feedbackOrderNo: order.feedbackOrderNo,
        feedbackFrom_name: order.feedbackFrom_name || '-',
        submitedDate: new Date(order.SubmitedDate).toLocaleDateString('en-IN'),
        rating: order.rating || 0,
        feedback: order.feedback || 'Skipped',
        items,
      });
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `reviews_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  downloadPdf() {
    const documentDefinition: any = {
      pageSize: 'A4',
      content: [
        { text: 'Review Report', fontSize: 18, bold: true, margin: [0, 0, 0, 10], alignment: 'center' },
        {
          table: {
            widths: ['auto', '*', '*', 'auto', '*', '*'],
            body: [
              ['Order No', 'User Name', 'Date', 'Rating', 'Feedback', 'Items'],
              ...this.reviewList.map(order => [
                order.feedbackOrderNo || '-',
                order.feedbackFrom_name || '-',
                new Date(order.SubmitedDate).toLocaleDateString('en-IN'),
                order.rating ?? 0,
                order.feedback || 'Skipped',
                (order.itemList || order.itemlist || []).map((i: any) => `${i.itemName} x${i.count}`).join(', ')
              ])
            ]
          }
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).download(`reviews_${new Date().toISOString().slice(0, 10)}.pdf`);
  }
}
