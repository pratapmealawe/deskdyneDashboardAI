import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistQuestionDialogComponent } from './checklist-question-dialog.component';

describe('ChecklistQuestionDialogComponent', () => {
  let component: ChecklistQuestionDialogComponent;
  let fixture: ComponentFixture<ChecklistQuestionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChecklistQuestionDialogComponent]
    });
    fixture = TestBed.createComponent(ChecklistQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
