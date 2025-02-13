import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-checklist-history',
  templateUrl: './checklist-history.component.html',
  styleUrls: ['./checklist-history.component.scss']
})
export class ChecklistHistoryComponent implements OnInit{
  searchQuery: string = '';
  selectedValue: string = '';
  selectedCafeId: string = '';
  orgDetails: any = null;
  cafeDetails: any = null;
  orglist: any = [];
  filteredOptions = [...this.orglist];
  reportHistory:any=[];
  expandedItems: boolean[] = [];
  searchObj:any={}
  constructor(
    public apiMainService: ApiMainService
  ) {

  }
ngOnInit(){
  this.getOrgList();
  this.getReportHistory();
}

  async getOrgList() {
    try {
      this.orglist = [];
      let page = 1;
      let searchObj = {
        countOnly: false
      }
      let result = await this.apiMainService.B2B_fetchFilteredAllOrgs(searchObj, page);
      this.orglist = result;
      this.filteredOptions = [...this.orglist];
      console.log(this.filteredOptions)
      // console.log(this.orglist);
    } catch (error) {
      console.log(error)
    }
  }
  setOrgDetails(e: any) {
    console.log(e.target.value, 'this.orgDetails');
    this.orgDetails = this.orglist.find((org: any) => {
      return org._id == this.selectedValue;
    });
    this.selectedCafeId='';
    console.log(this.orgDetails);
  }
  setCafeDetails(e: any) {
    console.log(e.target.value, 'this.orgDetails');
    this.cafeDetails = this.orgDetails.cafeteriaList.find((org: any) => {
      return org._id == this.selectedCafeId;
    });

  }

  filterOptions() {
    this.filteredOptions = this.orglist.filter((option: any) =>
      option.organization_name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  toggleFeedback(index: number) {
    this.expandedItems[index] = !this.expandedItems[index];
  }
  async getReportHistory() {
    try {
      const reportHistory = await this.apiMainService.getAllChecklistReports();
      if (reportHistory && reportHistory.length > 0) {
        this.reportHistory=reportHistory;
        this.expandedItems = new Array(this.reportHistory.length).fill(true);
      } else {
        this.reportHistory = [];
      }
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }
  async getReportHistoryByfilter(){
    let filter:any={}
    if(this.selectedValue){
      filter.OrgId=this.selectedValue;
    }
    if(this.selectedCafeId != ''){
      filter.cafeId=this.selectedCafeId;
    }
    if(this.searchObj.fromDate){
      filter.fromDate=this.searchObj.fromDate;
    }
    if(this.searchObj.toDate){
      filter.toDate=this.searchObj.toDate;
    }
    try {
      const reportHistory = await this.apiMainService.getReportHistoryByfilter(filter);
      if (reportHistory && reportHistory.length > 0) {
        this.reportHistory=reportHistory;
        this.expandedItems = new Array(this.reportHistory.length).fill(true);
      } else {
        this.reportHistory = [];
      }
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }
  clearFilter(){

  }
}
