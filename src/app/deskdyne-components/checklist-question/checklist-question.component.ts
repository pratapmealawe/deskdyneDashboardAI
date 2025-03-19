import { Component, OnInit } from '@angular/core';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-checklist-question',
  templateUrl: './checklist-question.component.html',
  styleUrls: ['./checklist-question.component.scss'],
})
export class ChecklistQuestionComponent implements OnInit {
  allChecklistQuestions: any = [];
  QuestionObj: any = {};
  editMode = false;
  addnewQuestion = false;
  QuestionType = 'String';
  btnPolicy: any;

  constructor(
    private apiMainService: ApiMainService,
    private confirmationModalService: ConfirmationModalService,
    private policyService: PolicyService
  ) {
    this.getAllChecklistQuestions();
  }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
  }

  async getAllChecklistQuestions() {
    try {
      const allChecklistQuestions =
        await this.apiMainService.getAllChecklistQuestions();
      if (allChecklistQuestions && allChecklistQuestions.length > 0) {
        this.allChecklistQuestions = allChecklistQuestions;
      } else {
        this.allChecklistQuestions = [];
      }
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }

  addQuestion() {
    this.editMode = true;
    this.addnewQuestion = true;
  }

  async submitnewQuestion(QuestionObj: any) {
    try {
      const allVariables = await this.apiMainService.saveQuestion(QuestionObj);
      this.getAllChecklistQuestions();
      this.cancel();
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }

  async updateChecklistQuestions(QuestionObj: any) {
    try {
      await this.apiMainService.updateChecklistQuestions(QuestionObj);
      this.getAllChecklistQuestions();
      this.cancel();
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }

  cancel() {
    this.editMode = false;
    this.addnewQuestion = false;
    this.QuestionObj = {};
  }

  async deletechecklistQuestion(id: string) {
    try {
      await this.apiMainService.deletechecklistQuestion(id);
      this.getAllChecklistQuestions();
      this.cancel();
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }

  editQuestion(QuestionObj: any) {
    this.editMode = true;
    this.addnewQuestion = false;
    this.QuestionObj = QuestionObj;
  }

  showPopup(QuestionObj: any) {
    this.confirmationModalService.modal(
      `Are you sure, you want to delete ${QuestionObj.checklistQuestion}`,
      () => this.deletechecklistQuestion(QuestionObj._id),
      this
    );
  }
}
