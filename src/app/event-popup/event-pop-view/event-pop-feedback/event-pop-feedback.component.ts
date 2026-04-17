import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-event-pop-feedback',
  templateUrl: './event-pop-feedback.component.html',
  styleUrls: ['./event-pop-feedback.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class EventPopFeedbackComponent implements OnInit {

  @Input() eventObj: any;
  feedbackList: any[] = [];
  loading = false;
  
  // Stats
  averageRating = 0;
  totalFeedbacks = 0;

  // form
  dateForm: FormGroup<{
    dateFrom: FormControl<Date | null>;
    dateTo: FormControl<Date | null>;
  }>;

  //pagination
  pageIndex = 0;
  pageNo = 1;
  pageSize = 10;
  totalCount = 0;

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
    }
  }

  async getFeedbacklist() {
    try {
      this.loading = true;
      const dateFrom: Date | null = this.dateForm.get('dateFrom')?.value || null;
      const dateTo: Date | null = this.dateForm.get('dateTo')?.value || null;

      const filter = {
        outletId: this.eventObj._id,
        orderType: "eventOrder",
        fromDate: dateFrom,
        toDate: dateTo,
        page: this.pageNo,
        limit: this.pageSize
      };

      const res = await this.apiMainService.getFeedbackByOrderByOrderType(filter);
      if (res && res.feedbackList) {
        this.feedbackList = res.feedbackList;
        this.totalCount = res.totalCount || this.feedbackList.length;
        this.calculateStats();
      } else {
        this.feedbackList = [];
        this.totalCount = 0;
      }
    } catch (e) {
      console.error('Error fetching feedback list', e);
      this.feedbackList = [];
    } finally {
      this.loading = false;
    }
  }

  private calculateStats() {
    if (this.feedbackList.length === 0) {
      this.averageRating = 0;
      this.totalFeedbacks = 0;
      return;
    }
    const sum = this.feedbackList.reduce((acc, f) => acc + (f.rating || 0), 0);
    this.averageRating = Number((sum / this.feedbackList.length).toFixed(1));
    this.totalFeedbacks = this.totalCount;
  }

  onSubmit() {
    this.pageNo = 1;
    this.getFeedbacklist();
  }

  onPageChange(event: any) {
    this.pageNo = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getFeedbacklist();
  }
}
