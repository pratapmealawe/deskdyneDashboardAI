import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
import { CommonSelectConfig } from 'src/app/common-outlet-cafe-select/common-outlet-cafe-select.component';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs =
  (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs ?? {};
Drilldown(Highcharts);

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { MaterialModule } from 'src/app/material.module';
import { CommonOutletCafeSelectModule } from "src/app/common-outlet-cafe-select/common-outlet-cafe-select.module";
import { OrgOrderComponent } from './org-order/org-order.component';

@Component({
  selector: 'app-org-reviews',
  templateUrl: './org-reviews.component.html',
  styleUrls: ['./org-reviews.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    CommonOutletCafeSelectModule,
    MaterialModule,
    OrgOrderComponent
  ]
})
export class OrgReviewsComponent implements OnInit, OnChanges {
  @Input() adminOrg: any;
  Highcharts: typeof Highcharts = Highcharts;
  orglist: any = [];
  isAdmin: boolean = false;
  orgDetails: any;
  reviewList: any[] = [];
  displayedList: any[] = [];
  paginatedReviewList: any[] = [];
  expandedItems: boolean[] = [];
  isLoading: boolean = false;
  searchText: string = '';
  filterRating: string = '';
  averageRating: number = 0;
  ratingCounts: { stars: number; count: number }[] = [];
  headerConfig: CommonSelectConfig = {
    mode: 'outlet',
    showDateRange: true,
    disableOrg: true,
    requireAll: true
  }
  headerConfigAdmin: CommonSelectConfig = {
    mode: 'outlet',
    showDateRange: true,
    disableOrg: false,
    requireAll: true
  }
  orgAdmin: any;
  outletList: any[] = [];
  isChartShow: boolean = false;

  // Chart
  chartOptionsPie: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Kitchen Star Ratings',
    },
    subtitle: {
      text: 'Click a slice to drill down'
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
      point: {
        valueSuffix: '%',
      },
    },
    tooltip: {
      // We show both count and percentage in the tooltip
      headerFormat: '',
      pointFormat:
        '<b>{point.name}</b><br>' +
        'Count: <b>{point.count}</b><br>' +
        'Percent: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.percentage:.1f}%',
        },
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Ratings',
        data: [],
      },
    ],
    drilldown: {
      series: [],
    },
  };
  updateStatusFlag: boolean = false;
  oneToOneStatusFlag: boolean = true;
  initialStatusData: any[] = [];
  drilldownFlag = false;
  //pagination
  page: number = 1;
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    this.setInitials();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.setInitials();
    }
  }

  setInitials() {
    // if Admin is logged in
    if (this.adminOrg) {
      this.headerConfig = {
        ...this.headerConfig,
        defaultOrgId: this.adminOrg?._id,
      };
    }
    //if OrgAdmin is logged in
    this.orgAdmin = this.adminOrg ? { orgDetails: this.adminOrg } : this.localStorageService.getCacheData('ADMIN_PROFILE');
    if (this.orgAdmin?.role === 'ORGADMIN') {
      this.headerConfig = {
        ...this.headerConfig,
        defaultOrgId: this.orgAdmin?.orgDetails?._id,
      };
    }
    if (!this.adminOrg && this.orgAdmin?.role !== 'ORGADMIN') {
      this.isAdmin = true;
      this.headerConfig = {
        ...this.headerConfigAdmin
      };
    }
  }

  async getfeedbacklistByfilter(payload: any) {
    this.isLoading = true;
    this.isChartShow = false;
    try {
      console.log('payload', payload);
      const reviewList = await this.apiMainService.getfeedbacklistByfilter(payload);
      this.reviewList = [...reviewList];
      this.applySearch();
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    } finally {
      this.isLoading = false;
    }
  }

  onSearch(value: string) {
    this.searchText = value;
    this.applySearch();
  }

  applySearch() {
    let list = this.reviewList;
    if (this.searchText) {
      const lower = this.searchText.toLowerCase();
      list = list.filter((r: any) =>
        (r.feedbackFrom_name && r.feedbackFrom_name.toLowerCase().includes(lower)) ||
        (r.feedbackOrderNo && r.feedbackOrderNo.toString().toLowerCase().includes(lower))
      );
    }
    // Filter by rating
    if (this.filterRating) {
      if (this.filterRating === 'skipped') {
        list = list.filter((r: any) => !r.rating || r.rating === 0);
      } else {
        const ratingVal = Number(this.filterRating);
        list = list.filter((r: any) => r.rating === ratingVal);
      }
    }
    this.displayedList = list;
    this.computeTotals();
    this.pageIndex = 0;
    this.addPagination();
  }

  onFilterRating(rating: string) {
    this.filterRating = this.filterRating === rating ? '' : rating;
    this.applySearch();
  }

  clearFilters() {
    this.searchText = '';
    this.filterRating = '';
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
    this.ratingCounts = Object.keys(ratingMap)
      .map(k => ({ stars: Number(k), count: ratingMap[Number(k)] }))
      .sort((a, b) => b.stars - a.stars);
  }

  toggleFeedback(index: number) {
    this.expandedItems[index] = !this.expandedItems[index];
  }

  changeDataView() {
    if (!this.isChartShow) {
      this.generateDrilldownChartData()
    } else {
      this.isChartShow = false
    }
  }

  generateDrilldownChartData(): void {
    const ratingTotals: Record<number, number> = {};
    const ratingItemCount: Record<number, Record<string, number>> = {};
    const ratingItemContains: Record<
      number,
      Record<string, Record<string, number>>
    > = {};

    this.reviewList.forEach((feedback) => {
      feedback.itemlist.forEach((item: any) => {
        const rating = item.starRatingKitchen ?? 0;
        const itemName = item.itemName;
        const containsList = item.itemContains || [];

        ratingTotals[rating] = (ratingTotals[rating] || 0) + 1;

        ratingItemCount[rating] = ratingItemCount[rating] || {};
        ratingItemCount[rating][itemName] =
          (ratingItemCount[rating][itemName] || 0) + 1;

        ratingItemContains[rating] = ratingItemContains[rating] || {};
        ratingItemContains[rating][itemName] =
          ratingItemContains[rating][itemName] || {};
        containsList.forEach((sub: any) => {
          const subName = sub.name;
          ratingItemContains[rating][itemName][subName] =
            (ratingItemContains[rating][itemName][subName] || 0) + 1;
        });
      });
    });

    const totalItemsAcrossAllRatings = Object.values(ratingTotals).reduce(
      (acc, cnt) => acc + cnt,
      0
    );
    const topLevelData: any[] = Object.keys(ratingTotals).map((key) => {
      const numericKey = Number(key);
      const count = ratingTotals[numericKey];
      const percentage = (count / totalItemsAcrossAllRatings) * 100;
      return {
        name: `${numericKey} star${numericKey !== 1 ? 's' : ''}`,
        y: percentage,
        count: count,
        drilldown: `rating-${numericKey}`,
      };
    });

    const firstLevelDrill: any[] = [];
    Object.keys(ratingItemCount || {}).forEach((ratingKey) => {
      const ratingNum = Number(ratingKey);

      const itemMap = ratingItemCount[ratingNum] || {};
      const itemTotal = ratingTotals[ratingNum] || 0;

      if (!itemTotal || Object.keys(itemMap).length === 0) return;

      const dataArray: any[] = Object.keys(itemMap).map((itemName) => {
        const cnt = itemMap[itemName] || 0;
        const pct = itemTotal ? (cnt / itemTotal) * 100 : 0;

        const hasContains =
          ratingItemContains &&
          ratingItemContains[ratingNum] &&
          ratingItemContains[ratingNum][itemName];

        return {
          name: itemName,
          y: pct,
          count: cnt,
          drilldown: hasContains ? `rating-${ratingNum}-${itemName}` : null
        };
      });

      if (dataArray.length > 0) {
        firstLevelDrill.push({
          id: `rating-${ratingNum}`,
          name: `Items with ${ratingNum} star${ratingNum !== 1 ? 's' : ''}`,
          type: 'pie',
          data: dataArray
        });
      }
    });

    const secondLevelDrill: any[] = [];
    Object.keys(ratingItemContains).forEach((ratingKey) => {
      const ratingNum = Number(ratingKey);
      const itemsUnderRating = ratingItemContains[ratingNum];

      const safeItemsUnderRating = itemsUnderRating || {};

      Object.keys(safeItemsUnderRating).forEach((itemName) => {
        const subMap = safeItemsUnderRating[itemName] || {};   // fallback to empty object
        const subKeys = Object.keys(subMap);

        // If no sub items → skip safely
        if (subKeys.length === 0) return;

        const totalSubItems = Object.values(subMap).reduce(
          (acc: number, c: any) => acc + (Number(c) || 0),
          0
        );

        // Avoid division by zero
        if (totalSubItems === 0) return;

        const dataArray: any[] = subKeys.map((subName) => {
          const cnt = Number(subMap[subName]) || 0;
          const pct = (cnt / totalSubItems) * 100;

          return {
            name: subName,
            y: pct,
            count: cnt,
            drilldown: null
          };
        });

        if (dataArray.length === 0) return;

        secondLevelDrill.push({
          id: `rating-${ratingNum}-${itemName}`,
          name: `Components of ${itemName}`,
          type: 'pie',
          data: dataArray
        });
      });
    });

    // 5. Put everything into chartOptionsPie
    this.chartOptionsPie = {
      ...this.chartOptionsPie,
      series: [
        {
          type: 'pie',
          name: 'Ratings',
          data: topLevelData,
        },
      ],
      drilldown: {
        series: [...firstLevelDrill, ...secondLevelDrill],
      },
    };

    // 6. Flip flags so Highcharts re-renders
    this.isChartShow = true;
    this.updateStatusFlag = true;
    this.drilldownFlag = true;
  }

  async excelExport() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reviews');

    // ------------------------------------------------------------------
    //                     TABLE COLUMN DEFINITIONS
    // ------------------------------------------------------------------
    worksheet.columns = [
      { header: 'Order No', key: 'feedbackOrderNo', width: 12 },
      { header: 'User Name', key: 'feedbackFrom_name', width: 15 },
      { header: 'Submitted Date', key: 'submitedDate', width: 20 },
      { header: 'Rating', key: 'rating', width: 10 },
      { header: 'Feedback', key: 'feedback', width: 30 },
      { header: 'Items', key: 'items', width: 30 },
    ];

    // ------------------------------------------------------------------
    //                        HEADER ROW
    // ------------------------------------------------------------------
    const headerRow = worksheet.getRow(0);
    headerRow.values = [
      "",
      ...worksheet.columns.map(col => col.header as string)
    ];
    headerRow.font = { bold: true };

    // ------------------------------------------------------------------
    //                        DATA ROWS
    // ------------------------------------------------------------------
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

    // ------------------------------------------------------------------
    //                      TABLE BORDERS
    // ------------------------------------------------------------------
    worksheet.eachRow((row) => {
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    // ------------------------------------------------------------------
    //                      SAVE EXCEL FILE
    // ------------------------------------------------------------------
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const filename = `reviews_${new Date().toISOString().slice(0, 10)}.xlsx`;
    saveAs(blob, filename);
  }

  downloadPdf() {
    const title = `Outlet Review Report`;
    const orgName = this.orgAdmin?.orgDetails?.organization_name || '-';
    const cafeteria = this.orgAdmin?.cafeDetails[0]?.cafeteria_name || '-';
    const outlet = this.orgAdmin?.outletName || '-';

    const documentDefinition: any = {
      pageSize: 'A4',
      pageMargins: [30, 30, 30, 30],

      content: [
        // ------------------------------------------------------------
        //                      TITLE SECTION
        // ------------------------------------------------------------
        {
          text: title,
          style: 'title',
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },

        // ------------------------------------------------------------
        //                     ORG DETAILS
        // ------------------------------------------------------------
        {
          columns: [
            {
              width: '*',
              text: [
                { text: 'Organization: ', bold: true },
                `${orgName}\n`,
                { text: 'Cafeteria: ', bold: true },
                `${cafeteria}\n`,
                { text: 'Outlet: ', bold: true },
                `${outlet}\n`,
              ],
              margin: [0, 0, 0, 10]
            }
          ]
        },

        // ------------------------------------------------------------
        //                   TABLE OF REVIEWS
        // ------------------------------------------------------------
        {
          style: 'tableStyle',
          table: {
            widths: ['auto', '*', '*', 'auto', '*', '*'],
            headerRows: 1,
            body: [
              [
                { text: 'Order No', bold: true },
                { text: 'User Name', bold: true },
                { text: 'Submitted Date', bold: true },
                { text: 'Rating', bold: true },
                { text: 'Feedback', bold: true },
                { text: 'Items', bold: true },
              ],

              ...this.reviewList.map(order => {
                const items = (order.itemList || order.itemlist || [])
                  .map((i: any) => `${i.itemName} x${i.count}`)
                  .join(', ');

                return [
                  order.feedbackOrderNo || '-',
                  order.feedbackFrom_name || '-',
                  new Date(order.SubmitedDate).toLocaleDateString('en-IN'),
                  order.rating ?? 0,
                  order.feedback || 'Skipped',
                  items
                ];
              })
            ]
          },

          layout: {
            fillColor: (rowIndex: number) => (rowIndex === 0 ? '#eeeeee' : null),
            hLineWidth: () => 0.7,
            vLineWidth: () => 0.7,
          }
        }
      ],

      // ------------------------------------------------------------
      //                   PDF STYLES
      // ------------------------------------------------------------
      styles: {
        title: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        tableStyle: {
          margin: [0, 10, 0, 0]
        }
      }
    };

    pdfMake.createPdf(documentDefinition).download(
      `reviews_${new Date().toISOString().slice(0, 10)}.pdf`
    );
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

  filterSubmitted(event: any) {
    const body = {
      orgId: event.org_id,
      outletId: event.outlet_id,
      fromDate: event.date_from,
      toDate: event.date_to,
    };
    this.getfeedbacklistByfilter(body);
  }
}
