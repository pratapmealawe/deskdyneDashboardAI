import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { OrgReviewsComponent } from 'src/app/organization-dashboard/org-reviews/org-reviews.component';

@Component({
  selector: 'app-event-reviews',
  templateUrl: './event-reviews.component.html',
  styleUrls: ['./event-reviews.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    OrgReviewsComponent
  ]
})
export class EventReviewsComponent implements OnInit {

  @Input() eventObj: any;
  feedbackList: any = Array();
  // form
  dateForm: FormGroup<{
    dateFrom: FormControl<Date | null>;
    dateTo: FormControl<Date | null>;
  }>;

  //pagination
  pageIndex = 0;
  pageNo = 1;
  pageSize = 10;

  constructor(private apiMainService: ApiMainService, private fb: FormBuilder) {

    this.dateForm = this.fb.group({
      dateFrom: new FormControl<Date | null>(null),
      dateTo: new FormControl<Date | null>(null),
    });

  }

  ngOnInit(): void {
    const today = new Date();
    this.dateForm.patchValue({
      dateFrom: today,
      dateTo: today,
    });
    if (this.eventObj) {
      this.getFeedbacklist();
    } else {
      this.feedbackList = [];
    }
  }

  async getFeedbacklist() {
    try {
      const dateFrom: Date | null = this.dateForm.get('dateFrom')?.value || null;
      const dateTo: Date | null = this.dateForm.get('dateTo')?.value || null;

      let filter = {
        outletId: this.eventObj._id,
        orderType: "eventOrder",
        fromDate: dateFrom,
        toDate: dateTo,
        page: this.pageNo,
        limit: this.pageSize
      }

      let res = await this.apiMainService.getFeedbackByOrderByOrderType(filter);
      if (res && res.feedbackList.length > 0) {
        this.feedbackList = res.feedbackList;
      } else {
        this.feedbackList = [];
      }
    } catch (e) {
      console.log('error while fetching feedback list', e);
      this.feedbackList = [];
    }
  }

  onSubmit() {
    this.pageNo = 1;
    this.getFeedbacklist();
  }

  onPageChange(event: any) {
    this.pageNo = event.pageIndex + 1;
    this.getFeedbacklist();
  }

}
