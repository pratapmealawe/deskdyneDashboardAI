import { Component } from '@angular/core';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  allFAQs: any = [];
  faqObj: any = {};
  editMode = false;
  addnewFAQ = false;
  access:any;

  constructor(private apiMainService: ApiMainService,
    private confirmationModalService: ConfirmationModalService, private policyService:PolicyService) {
    this.getAllFAQs();
    this.access = this.policyService.getCurrentButtonPolicy();
  }

  async getAllFAQs() {
    try {
      const allFAQs = await this.apiMainService.getAllFAQs();
      if (allFAQs && allFAQs.length > 0) {
        this.allFAQs = allFAQs;
      } else {
        this.allFAQs = [];
      }
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }
  addFAQ() {
    this.editMode = true;
    this.addnewFAQ = true;
  }
  async submitnewFAQ(faqObj: any) {
    try {
      const allFAQs = await this.apiMainService.saveFAQ(faqObj);
      this.getAllFAQs();
      this.cancel()
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }
  async updateFAQ(faqObj: any) {
    try {
      await this.apiMainService.updateFAQ(faqObj);
      this.getAllFAQs();
      this.cancel()
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }
  cancel() {
    this.editMode = false;
    this.addnewFAQ = false;
    this.faqObj = {};
  }
  async deleteFAQ(id: string) {
    try {
      await this.apiMainService.deleteFAQ(id);
      this.getAllFAQs();
      this.cancel()
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }
  editFAQ(faqObj: any) {
    this.editMode = true;
    this.addnewFAQ = false;
    this.faqObj = faqObj;
  }
  showPopup(faqObj: any) {
    this.confirmationModalService.modal(`Are you sure, you want to delete ${faqObj.question}`,
      () => this.deleteFAQ(faqObj._id), this);
  }

}
