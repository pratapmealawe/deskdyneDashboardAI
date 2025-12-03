import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
import { CommonSelectConfig } from 'src/app/common-outlet-cafe-select/common-outlet-cafe-select.component';
Drilldown(Highcharts);

@Component({
  selector: 'app-org-reviews',
  templateUrl: './org-reviews.component.html',
  styleUrls: ['./org-reviews.component.scss'],
})
export class OrgReviewsComponent implements OnInit, OnChanges {
  @Input() adminOrg: any;
  Highcharts: typeof Highcharts = Highcharts;
  orglist: any = [];
  isAdmin: boolean = false;
  orgDetails: any;
  reviewList: any[] = [];
  paginatedReviewList: any[] = [];
  expandedItems: boolean[] = [];
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
    console.log(this.adminOrg, "adminOrg");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.setInitials();
    }
  }

  setInitials() {
    this.orgAdmin = this.adminOrg ? { role: "ORGADMIN", orgDetails: this.adminOrg } : this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.isAdmin = this.orgAdmin?.role == 'ORGADMIN' ? false : true;
    if (!this.isAdmin) {
      this.headerConfig.defaultOrgId = this.orgAdmin.orgDetails?._id;
    }
  }

  async getfeedbacklistByfilter(payload: any) {
    try {
      this.isChartShow = false
      const reviewList = await this.apiMainService.getfeedbacklistByfilter(payload);
      this.reviewList = [...reviewList];
      this.addPagination();
      console.log(this.paginatedReviewList, "review list");
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
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
    Object.keys(ratingItemCount).forEach((ratingKey) => {
      const ratingNum = Number(ratingKey);
      const itemMap = ratingItemCount[ratingNum];
      const itemTotal = ratingTotals[ratingNum];

      const dataArray: any[] = Object.keys(itemMap).map((itemName) => {
        const cnt = itemMap[itemName];
        const pct = (cnt / itemTotal) * 100;
        return {
          name: itemName,
          y: pct,
          count: cnt,
          drilldown: ratingItemContains[ratingNum][itemName]
            ? `rating-${ratingNum}-${itemName}`
            : null,
        };
      });

      firstLevelDrill.push({
        id: `rating-${ratingNum}`,
        name: `Items with ${ratingNum} star${ratingNum !== 1 ? 's' : ''}`,
        type: 'pie',
        data: dataArray,
      });
    });

    const secondLevelDrill: any[] = [];
    Object.keys(ratingItemContains).forEach((ratingKey) => {
      const ratingNum = Number(ratingKey);
      const itemsUnderRating = ratingItemContains[ratingNum]; // { itemName → { subName → count } }

      Object.keys(itemsUnderRating).forEach((itemName) => {
        const subMap = itemsUnderRating[itemName]; // { subName → count }
        const totalSubItems = Object.values(subMap).reduce(
          (acc, c) => acc + c,
          0
        );

        const dataArray: any[] = Object.keys(subMap).map((subName) => {
          const cnt = subMap[subName];
          const pct = (cnt / totalSubItems) * 100;
          return {
            name: subName,
            y: pct,
            count: cnt,
            drilldown: null, // no further drilldown
          };
        });

        secondLevelDrill.push({
          id: `rating-${ratingNum}-${itemName}`,
          name: `Components of ${itemName}`,
          type: 'pie',
          data: dataArray,
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

  excelExport() { }
  downloadPdf() { }

  addPagination() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedReviewList = this.reviewList.slice(start, end);
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
