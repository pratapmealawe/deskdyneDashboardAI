import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { combineLatest, startWith } from 'rxjs';

import { ConfirmationModalService } from 'src/service/confirmation-modal.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';
import { ChecklistQuestionDialogComponent } from './checklist-question-dialog/checklist-question-dialog.component';

export interface ChecklistQuestion {
  _id?: string;
  checklistQuestion: string;
  checklistQuestionType: string;
}

@Component({
  selector: 'app-checklist-question',
  templateUrl: './checklist-question.component.html',
  styleUrls: ['./checklist-question.component.scss'],
})
export class ChecklistQuestionComponent implements OnInit {
  allChecklistQuestions: ChecklistQuestion[] = [];
  filteredChecklistQuestions: ChecklistQuestion[] = [];
  pagedChecklistQuestions: ChecklistQuestion[] = [];

  typeControl = new FormControl<string>('');
  searchControl = new FormControl<string>('');

  pageSize = 10;
  pageIndex = 0;

  btnPolicy: any;

  checklistTypes: string[] = [
    'Personal Hygiene',
    'Kitchen Cleaning',
    'Pre-operational Kitchen',
    'Chiller/Cold Room temperature',
    'Deep Freezer Temperature',
    'Bain Marie Temperature',
    'Control Sample',
    'RUCO',
    'Deep Cleaning & Pest Control',
    'Occupational Safety',
  ];

  constructor(
    private apiMainService: ApiMainService,
    private confirmationModalService: ConfirmationModalService,
    private policyService: PolicyService,
    private dialog: MatDialog
  ) {
    this.getAllChecklistQuestions();
  }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.initFilters();
  }

  private initFilters(): void {
    combineLatest([
      this.typeControl.valueChanges.pipe(startWith(this.typeControl.value)),
      this.searchControl.valueChanges.pipe(startWith(this.searchControl.value)),
    ]).subscribe(([type, search]) => {
      this.applyFilters(type || '', search || '');
    });
  }

  async getAllChecklistQuestions(): Promise<void> {
    try {
      const list = await this.apiMainService.getAllChecklistQuestions();
      this.allChecklistQuestions = Array.isArray(list) ? list : [];
      // refresh filters after data load
      this.applyFilters(this.typeControl.value || '', this.searchControl.value || '');
    } catch (e) {
      console.log('Error while fetching checklist questions ', e);
      this.allChecklistQuestions = [];
      this.applyFilters(this.typeControl.value || '', this.searchControl.value || '');
    }
  }

  private applyFilters(type: string, search: string): void {
    let result = [...this.allChecklistQuestions];

    if (type) {
      result = result.filter((q) => q.checklistQuestionType === type);
    }

    if (search) {
      const term = search.toLowerCase();
      result = result.filter(
        (q) =>
          q.checklistQuestion &&
          q.checklistQuestion.toLowerCase().includes(term)
      );
    }

    this.filteredChecklistQuestions = result;
    this.pageIndex = 0;
    this.updatePagedList();
  }

  private updatePagedList(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedChecklistQuestions = this.filteredChecklistQuestions.slice(start, end);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedList();
  }

  // --------- Dialog actions ---------

  openQuestionDialog(mode: 'add' | 'edit', question?: ChecklistQuestion): void {
    const dialogRef = this.dialog.open(ChecklistQuestionDialogComponent, {
      width: '450px',
      disableClose: true,
      data: {
        mode,
        checklistTypes: this.checklistTypes,
        question: question ? { ...question } : null,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) {
        return;
      }

      if (mode === 'add') {
        await this.submitNewQuestion(result);
      } else {
        await this.updateChecklistQuestion(result);
      }

      await this.getAllChecklistQuestions();
    });
  }

  private async submitNewQuestion(payload: ChecklistQuestion): Promise<void> {
    try {
      await this.apiMainService.saveQuestion(payload);
    } catch (e) {
      console.log('Error while saving checklist question ', e);
    }
  }

  private async updateChecklistQuestion(payload: ChecklistQuestion): Promise<void> {
    try {
      await this.apiMainService.updateChecklistQuestions(payload);
    } catch (e) {
      console.log('Error while updating checklist question ', e);
    }
  }

  // --------- Delete ---------

  async deletechecklistQuestion(id: string): Promise<void> {
    try {
      await this.apiMainService.deletechecklistQuestion(id);
      await this.getAllChecklistQuestions();
    } catch (e) {
      console.log('Error while deleting checklist question ', e);
    }
  }

  showPopup(question: ChecklistQuestion): void {
    this.confirmationModalService.modal({
      msg: `Are you sure, you want to delete ${question.checklistQuestion}?`,
      callback: () => this.deletechecklistQuestion(question._id as string),
      context: this
    });
  }
}
