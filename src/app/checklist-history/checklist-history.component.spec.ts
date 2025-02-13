import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistHistoryComponent } from './checklist-history.component';

describe('ChecklistHistoryComponent', () => {
  let component: ChecklistHistoryComponent;
  let fixture: ComponentFixture<ChecklistHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChecklistHistoryComponent]
    });
    fixture = TestBed.createComponent(ChecklistHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
