import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-suggessions-feedbacks',
  templateUrl: './suggessions-feedbacks.component.html',
  styleUrls: ['./suggessions-feedbacks.component.scss'],
})
export class SuggessionsFeedbacksComponent implements OnInit {
  feedbacklist: any = [];
  nextOn = false;
  page = 1;
  btnPolicy: any;

  constructor(
    private ddApiMainService: ApiMainService,
    private policyService: PolicyService
  ) {}

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();

    this.getFeedbackList();
  }

  async getFeedbackList() {
    try {
      // this.feedbacklist = [];
      const feedbacklist = await this.ddApiMainService.getGeneralAppFeeback(
        this.page
      );
      if (feedbacklist && feedbacklist.length > 0) {
        this.feedbacklist = [];
        this.feedbacklist = [
          ...this.feedbacklist,
          ...feedbacklist.map((ele: any) => {
            ele.submitDate = new Date(
              parseInt(ele._id.substring(0, 8), 16) * 1000
            );
            return ele;
          }),
        ];
        this.nextOn = true;
      } else {
        this.nextOn = false;
      }
    } catch (error) {
      console.log('error while fetching feedbacklist ', error);
    }
  }

  async acknowledge(feedback: any) {
    try {
      await this.ddApiMainService.feedbackacknowledge(feedback._id);
      feedback.acknowledged = true;
    } catch (error) {
      console.log('error while acknowledge feedback ', error);
    }
  }

  getMore() {
    this.page++;
    this.getFeedbackList();
  }
  getLess() {
    this.page--;
    this.getFeedbackList();
  }
}
