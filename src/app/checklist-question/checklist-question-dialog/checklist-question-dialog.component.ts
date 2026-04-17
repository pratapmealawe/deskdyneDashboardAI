import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChecklistQuestion } from '../checklist-question.component';

export interface ChecklistQuestionDialogData {
  mode: 'add' | 'edit';
  checklistTypes: string[];
  question: ChecklistQuestion | null;
}

@Component({
  selector: 'app-checklist-question-dialog',
  templateUrl: './checklist-question-dialog.component.html',
  styleUrls: ['./checklist-question-dialog.component.scss'],
})
export class ChecklistQuestionDialogComponent {
  form: FormGroup;
  title = 'Add Checklist Question';
  actionLabel = 'Add';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ChecklistQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChecklistQuestionDialogData
  ) {
    this.title =
      data.mode === 'add' ? 'Add Checklist Question' : 'Update Checklist Question';
    this.actionLabel = data.mode === 'add' ? 'Add' : 'Update';

    this.form = this.fb.group({
      _id: [data.question?._id || null],
      checklistQuestion: [
        data.question?.checklistQuestion || '',
        [Validators.required, Validators.minLength(5)],
      ],
      checklistQuestionType: [
        data.question?.checklistQuestionType || '',
        [Validators.required],
      ],
    });
  }

  get checklistQuestionCtrl() {
    return this.form.get('checklistQuestion');
  }

  get checklistQuestionTypeCtrl() {
    return this.form.get('checklistQuestionType');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
