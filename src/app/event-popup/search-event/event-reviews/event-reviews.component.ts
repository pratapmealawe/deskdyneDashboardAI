import { Component, Input, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-event-reviews',
  templateUrl: './event-reviews.component.html',
  styleUrls: ['./event-reviews.component.scss']
})
export class EventReviewsComponent implements OnInit {

  @Input() eventObj: any;
  feedbackList: any = Array();
  pageNo = 1;
  nextOn = true;
  showDetails: boolean = false;
  constructor(private apiMainService: ApiMainService) { }

  ngOnInit(): void {
    this.getFeedbacklist();
  }

  //Need to change API
  async getFeedbacklist() {
    let filter = {
      orgId: this.eventObj.organizationDetails.organizationId,
      outletId: this.eventObj._id,
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
