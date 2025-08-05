import { Injectable } from '@angular/core';
import { ApiMainService } from './apiService/apiMain.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsFeedbackService {

  constructor(private ddApiMainService: ApiMainService) { }

  private feedbackCountSubject = new BehaviorSubject<number>(0);
  GeneralAppFeedbackCount$ = this.feedbackCountSubject.asObservable();

  private enquiryCountSubject = new BehaviorSubject<number>(0);
  enquiryCount$ = this.enquiryCountSubject.asObservable();

  async getGeneralAppFeebackCount(acknowledged?: boolean) {
    try {
      const data = await this.ddApiMainService.getGeneralAppFeebackCount(acknowledged);
      this.feedbackCountSubject.next(data.count);
    } catch (error) {
      console.error("Error while loading data:", error);
      throw error;
    }
  }

  async fetchAllEnquiries() {
    try {
      const res = await this.ddApiMainService.fetchAllEnquiries();
      if (res) {
        const temp = res.filter((data: any) => data.status == 'review')
        this.enquiryCountSubject.next(temp.length);
      }
    } catch (error) {
      console.error("Error while loading data:", error);
      throw error;
    }
  }

  updateEnquiries(count: any) {
    this.enquiryCountSubject.next(count);
  }

}
