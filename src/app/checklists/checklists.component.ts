import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { combineLatest, startWith } from 'rxjs';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { AddEditChecklistComponent } from './add-edit-checklist/add-edit-checklist.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

export interface ChecklistQuestion {
  _id?: string;
  checklistQuestion: string;
  checklistQuestionType: string;
}

export interface GroupedChecklist {
  type: string;
  questions: ChecklistQuestion[];
}

@Component({
  selector: 'app-checklists',
  templateUrl: './checklists.component.html',
  styleUrls: ['./checklists.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class ChecklistsComponent implements OnInit {
  allChecklistQuestions: ChecklistQuestion[] = [];
  filteredChecklistQuestions: ChecklistQuestion[] = [];
  groupedChecklistQuestions: GroupedChecklist[] = [];

  typeControl = new FormControl<string>('');
  searchControl = new FormControl<string>('');

  pageSize = 10;
  pageIndex = 0;

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
    private dialog: MatDialog
  ) {
    this.getAllChecklistQuestions();
  }

  ngOnInit(): void {
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
      this.applyFilters(this.typeControl.value || '', this.searchControl.value || '');
    } catch (e) {
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
    this.groupAndPaginate();
  }

  private groupAndPaginate(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    const pagedList = this.filteredChecklistQuestions.slice(start, end);

    const groups: { [key: string]: ChecklistQuestion[] } = {};
    pagedList.forEach(q => {
      const type = q.checklistQuestionType || 'General';
      if (!groups[type]) groups[type] = [];
      groups[type].push(q);
    });

    this.groupedChecklistQuestions = Object.keys(groups).map(type => ({
      type,
      questions: groups[type]
    }));
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.groupAndPaginate();
  }

  getInitials(name: string): string {
    if (!name) return 'Q';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }

  openQuestionDialog(mode: 'add' | 'edit', question?: ChecklistQuestion): void {
    const dialogRef = this.dialog.open(AddEditChecklistComponent, {
      width: '450px',
      disableClose: true,
      data: {
        mode,
        checklistTypes: this.checklistTypes,
        question: question ? { ...question } : null,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;
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
    } catch (e) { }
  }

  private async updateChecklistQuestion(payload: ChecklistQuestion): Promise<void> {
    try {
      await this.apiMainService.updateChecklistQuestions(payload);
    } catch (e) { }
  }

  async deletechecklistQuestion(id: string): Promise<void> {
    try {
      await this.apiMainService.deletechecklistQuestion(id);
      await this.getAllChecklistQuestions();
    } catch (e) { }
  }

  showPopup(question: ChecklistQuestion): void {
    this.confirmationModalService.modal({
      msg: `Are you sure, you want to delete ${question.checklistQuestion}?`,
      callback: () => this.deletechecklistQuestion(question._id as string),
      context: this
    });
  }
}
