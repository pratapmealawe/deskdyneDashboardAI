import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
@Component({
  selector: 'app-outlet-feedback',
  templateUrl: './outlet-feedback.component.html',
  styleUrls: ['./outlet-feedback.component.scss']
})
export class OutletFeedbackComponent implements OnInit {
  @Input() outletObj: any;
  feedbackList: any = Array();
  pageNo = 1;
  nextOn = true;

  constructor(private apiMainService: ApiMainService) { }

  ngOnInit(): void {
    console.log(this.outletObj, "<------this.outletObj------->");
    this.getFeedbacklist();
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
