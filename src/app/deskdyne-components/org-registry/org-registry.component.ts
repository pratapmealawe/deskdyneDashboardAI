import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { SuggestionsFeedbackService } from 'src/service/suggestions-feedback.service';

@Component({
  selector: 'app-org-registry',
  templateUrl: './org-registry.component.html',
  styleUrls: ['./org-registry.component.scss']
})
export class OrgRegistryComponent implements OnInit {
  enquirylist: any = [];
  pagedEnquiries: any = [];

  // Paginator options
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiMainService: ApiMainService, private suggestionsFeedbackService: SuggestionsFeedbackService) { }

  ngOnInit(): void {
    this.fetchAllEnquiries();
  }

  async fetchAllEnquiries() {
    try {
      const res = await this.apiMainService.fetchAllEnquiries();
      if (res && res.length > 0) {
        this.enquirylist = res;
        this.updatePagedList();
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

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePagedList();
  }

  updatePagedList() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedEnquiries = this.enquirylist.slice(startIndex, endIndex);
  }

}
