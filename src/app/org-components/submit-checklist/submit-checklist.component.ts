import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';

@Component({
  selector: 'app-submit-checklist',
  templateUrl: './submit-checklist.component.html',
  styleUrls: ['./submit-checklist.component.scss']
})
export class SubmitChecklistComponent implements OnInit {
  editMode:Boolean=false;
  allChecklistQuestions:any=[];
  reportObj:any={};
  adminProfile:any={}
constructor(public apiMainService:ApiMainService,
  public localStorageService:LocalStorageService
){

}
ngOnInit(){
 this.getAdminDetails()
  this.getAllChecklistQuestions()
}
async getAdminDetails(){
  const adminId = this.localStorageService.getCacheData('ADMIN_ID');
  this.adminProfile = await this.apiMainService.getadminprofile(adminId);
  console.log(this.adminProfile,"adminProfile");
}
async getAllChecklistQuestions() {
  try {
    const allChecklistQuestions:any[] = await this.apiMainService.getAllChecklistQuestions();
    if (allChecklistQuestions && allChecklistQuestions.length > 0) {
      this.allChecklistQuestions = allChecklistQuestions.map((q: any) => {
        return {
          ...q,
          selected : false,
          comment : ""
        }
        
    });
    } else {
      this.allChecklistQuestions = [];
    }
  } catch (e) {
    console.log('Error while fetching reports ', e);
  }
}
async submitChecklist() {
  this.reportObj.checklist_questions=this.allChecklistQuestions;
  this.reportObj.orgDetails=this.adminProfile.orgDetails;
  this.reportObj.cafeDetails=this.adminProfile.cafeDetails;
  this.reportObj.SubmitedBy=this.adminProfile.name;
  this.reportObj.submitedUserId=this.adminProfile._id;
  try {
    const allReports = await this.apiMainService.saveChecklistReport(this.reportObj);
    this.cancelChecklistSubmit()
  } catch (e) {
    console.log('Error while fetching reports ', e);
  }
}
async updateChecklist() {
  try {
    await this.apiMainService.updateFAQ(this.reportObj);
    this.cancelChecklistSubmit()
  } catch (e) {
    console.log('Error while fetching reports ', e);
  }
}
cancelChecklistSubmit() {
  this.editMode = false;
  this.reportObj = {};
}
async deleteFAQ(id: string) {
  try {
    await this.apiMainService.deleteFAQ(id);
    this.cancelChecklistSubmit()
  } catch (e) {
    console.log('Error while fetching reports ', e);
  }
}

}
