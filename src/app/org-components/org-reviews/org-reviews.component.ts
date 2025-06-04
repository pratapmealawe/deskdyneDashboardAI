import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';
import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);

interface filter {
  orgId: string;
  outletId: string;
  fromDate: string;
  toDate: string;
}

@Component({
  selector: 'app-org-reviews',
  templateUrl: './org-reviews.component.html',
  styleUrls: ['./org-reviews.component.scss'],
})
export class OrgReviewsComponent implements OnInit, OnChanges {
    Highcharts: typeof Highcharts = Highcharts;
  @Input() adminOrg: any
  orglist: any = [];
  orgDetails: any;
  feedbackList: any[] = [];
  filteredFeedbackList: any[] = [];
  expandedItems: boolean[] = [];
  filterObj: filter = {
    orgId: '',
    outletId: '',
    fromDate: '',
    toDate: '',
  };
  orgAdmin: any;
  outletList: any[] = []
  isChartShow: boolean = false

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

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService,
  ) { }

  ngOnInit() {
    this.initFunc()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.initFunc()
    }
  }

  initFunc() {
    this.orgAdmin = this.adminOrg ? { role: "ORGADMIN", orgDetails: this.adminOrg } : this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.getOrgList();
  }

  toggleFeedback(index: number) {
    this.expandedItems[index] = !this.expandedItems[index];
  }

  getMore() {
    this.getfeedbacklistByfilter();
  }

  searchFilter(e: any) {
    const searchText = e.target.value;

    const config = {
      keys: ['feedbackFrom_name', 'outletName'],
    };

    this.filteredFeedbackList = this.searchService.searchData(
      this.feedbackList,
      config,
      searchText
    );
  }

  setOrgDetails() {
    this.orgDetails = this.orglist.find((org: any) => {
      return org._id == this.filterObj?.orgId;
    });

    this.filterObj.outletId = '';
    this.getOutlets()
  }

  async getfeedbacklistByfilter() {
    try {
      this.isChartShow = false
      const feedbackList = await this.apiMainService.getfeedbacklistByfilter(this.filterObj);

      if (feedbackList && feedbackList.length > 0) {
        this.feedbackList = [...this.feedbackList, ...feedbackList];
        this.filteredFeedbackList = [
          ...this.filteredFeedbackList,
          ...feedbackList,
        ];
        this.expandedItems = new Array(this.feedbackList.length).fill(true);
      } 

      console.log(feedbackList);
      
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }

  async getOrgList() {
    try {
      let page = 1;
      let searchObj = {
        countOnly: false,
      };
      let data = await this.apiMainService.B2B_fetchFilteredAllOrgs(
        searchObj,
        page
      );
      this.orglist = data;
      this.getInitialVlaues();
      this.getOutlets()
    } catch (error) {
      console.log(error);
    }
  }

  async getOutlets() {
    let searchObj = {
      orgId: this.orgAdmin.role === 'ORGADMIN' ? this.orgAdmin?.orgDetails._id : this.orgDetails?._id
    };
    try {
      const data = await this.apiMainService.searchOutletByOrgId(
        searchObj
      );

      this.outletList = [...data];

      this.getfeedbacklistByfilter()
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  }


  getInitialVlaues() {
    if (this.orgAdmin.role === 'ORGADMIN') {
      this.filterObj.orgId = this.orgAdmin?.orgDetails?._id;
      this.setOrgDetails();
    }
  }

  onCafeChange() {
    this.feedbackList = [];
    this.filteredFeedbackList = [];
    this.getfeedbacklistByfilter()
  }

  changeDataView() {

    if(!this.isChartShow) {
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

    this.filteredFeedbackList.forEach((feedback) => {
      feedback.itemlist.forEach((item:any) => {
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
        containsList.forEach((sub:any) => {
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

    console.log(firstLevelDrill)

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
}
