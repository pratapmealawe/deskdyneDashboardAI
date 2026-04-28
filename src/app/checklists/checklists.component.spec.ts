import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistQuestionComponent } from './checklist-question.component';

describe('ChecklistQuestionComponent', () => {
  let component: ChecklistQuestionComponent;
  let fixture: ComponentFixture<ChecklistQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChecklistQuestionComponent]
    });
    fixture = TestBed.createComponent(ChecklistQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
