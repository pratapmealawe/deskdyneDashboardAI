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

  async getGeneralAppFeebackCount(acknowledged?: boolean) {
    try {
      const data = await this.ddApiMainService.getGeneralAppFeebackCount(acknowledged);
      this.feedbackCountSubject.next(data.count);
    } catch (error) {
      console.error("Error while loading data:", error);
      throw error;
    }
  }


}
