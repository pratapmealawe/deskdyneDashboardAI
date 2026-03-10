import { Injectable } from '@angular/core';
import { ApiMainService } from './apiService/apiMain.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsFeedbackService {

  private isInitialized = false;

  constructor(private apiMainService: ApiMainService) { }

  private feedbackCountSubject = new BehaviorSubject<number>(0);
  GeneralAppFeedbackCount$ = this.feedbackCountSubject.asObservable();

  private enquiryCountSubject = new BehaviorSubject<number>(0);
  enquiryCount$ = this.enquiryCountSubject.asObservable();

  private incidentCountSubject = new BehaviorSubject<number>(0);
  incidentCount$ = this.incidentCountSubject.asObservable();

  // Called once on app init to fetch all counts
  async initializeCounts() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    await Promise.all([
      this.getGeneralAppFeebackCount(false),
      this.fetchAllEnquiries(),
      this.fetchIncidentCount()
    ]);
  }

  async getGeneralAppFeebackCount(acknowledged?: boolean) {
    try {
      const data = await this.apiMainService.getGeneralAppFeebackCount(acknowledged);
      this.feedbackCountSubject.next(data.count);
    } catch (error) {
      console.error("Error while loading feedback count:", error);
    }
  }

  async fetchAllEnquiries() {
    try {
      const res = await this.apiMainService.fetchAllEnquiries();
      if (res) {
        const temp = res.filter((data: any) => data.status == 'review');
        this.enquiryCountSubject.next(temp.length);
      }
    } catch (error) {
      console.error("Error while loading enquiry count:", error);
    }
  }

  async fetchIncidentCount() {
    try {
      const data = await this.apiMainService.getAllIncidents();
      if (data && data.length > 0) {
        const inReviewCount = data.filter((incident: any) => incident.status === "created").length;
        this.incidentCountSubject.next(inReviewCount);
      }
    } catch (error) {
      console.error("Error while loading incident count:", error);
    }
  }

  updateEnquiries(count: any) {
    this.enquiryCountSubject.next(count);
  }

  updateFeedbackCount(count: number) {
    this.feedbackCountSubject.next(count);
  }

  updateIncidentCount(count: number) {
    this.incidentCountSubject.next(count);
  }
}
