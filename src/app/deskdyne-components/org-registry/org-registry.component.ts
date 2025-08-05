import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { SuggestionsFeedbackService } from 'src/service/suggestions-feedback.service';

@Component({
  selector: 'app-org-registry',
  templateUrl: './org-registry.component.html',
  styleUrls: ['./org-registry.component.scss']
})
export class OrgRegistryComponent implements OnInit {
  enquirylist: any = [];

  constructor(private apiMainService: ApiMainService, private suggestionsFeedbackService: SuggestionsFeedbackService) { }

  ngOnInit(): void {
    this.fetchAllEnquiries();
  }

  async fetchAllEnquiries() {
    try {
      const res = await this.apiMainService.fetchAllEnquiries();
      if (res && res.length > 0) {
        this.enquirylist = res;
        const temp = this.enquirylist.filter((data: any) => data.status == 'review')
        console.log(temp.length);
        this.suggestionsFeedbackService.updateEnquiries(temp.length);
        console.log(res);
      }
    } catch (error) {
      console.log(error)
    }
  }

  async updateAllEnquiries() {
    try {
      const body = { status: 'acknowledged' }
      const res = await this.apiMainService.updateAllEnquiriesStatus(body);
      this.fetchAllEnquiries();
    } catch (error) {
      console.log(error)
    }
  }

}
