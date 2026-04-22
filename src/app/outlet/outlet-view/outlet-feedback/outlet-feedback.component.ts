import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { OrgOrderComponent } from 'src/app/organization-dashboard/org-reviews/org-order/org-order.component';
import { OutletViewService } from '../outlet-view.service';

@Component({
  selector: 'app-outlet-feedback',
  templateUrl: './outlet-feedback.component.html',
  styleUrls: ['./outlet-feedback.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    OrgOrderComponent
  ]
})
export class OutletFeedbackComponent implements OnInit {
  outletObj: any;
  feedbackList: any = Array();
  pageNo = 1;
  nextOn = true;

  constructor(
    private apiMainService: ApiMainService,
    private outletViewService: OutletViewService
  ) { }

  ngOnInit(): void {
    this.outletViewService.outlet$.subscribe(outlet => {
      if (outlet) {
        this.outletObj = outlet;
        this.getFeedbacklist();
      }
    });
  }


  async getFeedbacklist() {
    let filter = {
      orgId: this.outletObj.organizationDetails.organizationId,
      outletId: this.outletObj._id,
    }
    let feedbackList = await this.apiMainService.gettfeedbacklist(this.pageNo, filter);
    if (feedbackList && feedbackList.length > 0) {
      this.feedbackList = [...this.feedbackList, ...feedbackList];
    } else {
      this.nextOn = false;
    }
  }

  getMore() {
    this.pageNo++;
    this.getFeedbacklist();
  }
}
