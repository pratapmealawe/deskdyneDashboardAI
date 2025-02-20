import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-org-registry',
  templateUrl: './org-registry.component.html',
  styleUrls: ['./org-registry.component.scss']
})
export class OrgRegistryComponent implements OnInit {
  enquirylist: any = [];

  constructor(private apiMainService: ApiMainService) { }

  ngOnInit(): void {
    this.fetchAllEnquiries();
  }

  async fetchAllEnquiries() {
    try {
      const res = await this.apiMainService.fetchAllEnquiries();
      if(res && res.length > 0){
        this.enquirylist = res;
      }
    } catch (error) {
      console.log(error)
    }
  }

}
