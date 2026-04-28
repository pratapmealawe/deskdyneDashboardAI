import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChecklistQuestion } from '../checklists.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

export interface AddEditChecklistDialogData {
  mode: 'add' | 'edit';
  checklistTypes: string[];
  question: ChecklistQuestion | null;
}

@Component({
  selector: 'app-add-edit-checklist',
  templateUrl: './add-edit-checklist.component.html',
  styleUrls: ['./add-edit-checklist.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class AddEditChecklistComponent {
  form: FormGroup;
  title = 'Add Checklist Question';
  actionLabel = 'Add';
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditChecklistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEditChecklistDialogData
  ) {
    this.isEditMode = data.mode === 'edit';
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
