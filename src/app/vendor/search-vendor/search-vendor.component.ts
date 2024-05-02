import { Component } from "@angular/core";
import { ApiMainService } from "src/service/apiService/apiMain.service";



@Component({
  selector: 'app-search-vendor',
  templateUrl: 'search-vendor.component.html',
  styleUrls: ['search-vendor.component.html']
})

export class SearchVendorComponent {
  searchObj: any = {
    vendorName: '',
    vendorPhoneNo: '',
    vendorEmail: ''
  };
  vendorList: any;
  orgName: any;
  constructor(private apiMainService: ApiMainService) {
  }

  async getAllVendors() {
    try {
      this.vendorList = await this.apiMainService.getAllVendors()
      console.log(this.vendorList);

    } catch (error) {
      console.log('getAllVendor', error)
    }
  }

  async searchVendor() {
    try {
      this.vendorList = await this.apiMainService.searchVendor(this.searchObj);
      console.log('searched vendor', this.vendorList);
    } catch (error) {
      console.log('searchVendor', error)
    }

  }
  resetForm() {

  }
  addVendor() {

  }
}