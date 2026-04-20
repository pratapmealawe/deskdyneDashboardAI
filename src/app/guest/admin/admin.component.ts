import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListFilterPipe } from '@pipes/list-filter.pipe';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ListFilterPipe],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  ordersList: any[] = [];
  placedOrdersList: any[] = [];
  completedOrdersList: any[] = [];

  todayDate: Date = new Date();
  private subscription!: Subscription;
  private indexSubscription!: Subscription;

  orglist: any = [];
  orgDetails: any;

  filterObj: any = {
    orgId: '',
    cafeId: '',
  };

  allParamsPresent: boolean = false;

  paramsObj = {
    organization: '',
    cafeteria: '',
    cafeName: '',
  };

  startIndex: number = 0;
  endIndex: number = 20;
  startIndexComp: number = 0;
  endIndexComp: number = 20;
  incrementStep: number = 20; // Change increment value if needed

  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.checkURLParams();
    this.getOrgList();

    this.subscription = interval(60000)
      .pipe(switchMap(() => this.getDashboardData()))
      .subscribe();

    this.indexSubscription = interval(5000).subscribe(() => {
      this.updateIndices();
    });
  }


  checkURLParams() {
    this.route.queryParams.subscribe((params) => {
      const { organization, cafeteria, cafeName } = params;
      if (organization && cafeteria) {
        this.paramsObj.organization = organization;
        this.paramsObj.cafeteria = cafeteria;
        this.paramsObj.cafeName = cafeName;
        this.allParamsPresent = true;
        this.getDashboardData();
      }
    });
  }

  async getOrgList() {
    try {
      let page = 1;
      let searchObj = { countOnly: false };
      let data = await this.apiMainService.B2B_fetchFilteredAllOrgs(
        searchObj,
        page
      );
      this.orglist = data;
    } catch (error) {
      console.error(error);
    }
  }

  setOrgDetails() {
    this.orgDetails = this.orglist.find(
      (org: any) => org._id === this.filterObj?.orgId
    );
  }

  async getDashboardData() {
    try {
      let data = await this.apiMainService.getCurrentOutletOrdersListForGuest(this.paramsObj.organization, this.paramsObj.cafeName, true);
      this.ordersList = data ?? [];

      // Reduce looping by grouping directly
      this.placedOrdersList = [];
      this.completedOrdersList = [];

      this.ordersList.forEach((orders) => {
        const status = orders._id?.toLowerCase();
        if (status === 'placed') {
          this.placedOrdersList = orders?.orders || [];
        } else if (status === 'completed') {
          this.completedOrdersList = orders?.orders || [];
        }
      });
    } catch (err) {
      console.error('Error fetching orders data:', err);
    }
  }

  updateIndices() {
    if (this.ordersList.length > 0) {
      this.startIndex += this.incrementStep;
      this.endIndex += this.incrementStep;
      this.startIndexComp += this.incrementStep;
      this.endIndexComp += this.incrementStep;

      if (this.startIndex >= this.placedOrdersList.length) {
        this.startIndex = 0;
        this.endIndex = this.incrementStep;
      }

      if (this.startIndexComp >= this.completedOrdersList.length) {
        this.startIndexComp = 0;
        this.endIndexComp = this.incrementStep;
      }
    }
  }

  saveOrgDetails() {
    this.router.navigate([], {
      queryParams: {
        organization: this.filterObj.orgId,
        cafeteria: this.filterObj.cafeId,
        cafeName: this.orgDetails?.cafeteriaList.find(
          (item: any) => item._id === this.filterObj.cafeId
        )?.cafeteria_name,
      },
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.indexSubscription) {
      this.indexSubscription.unsubscribe();
    }
  }
}
