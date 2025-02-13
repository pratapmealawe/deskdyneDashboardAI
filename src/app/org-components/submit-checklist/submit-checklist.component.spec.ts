import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitChecklistComponent } from './submit-checklist.component';

describe('SubmitChecklistComponent', () => {
  let component: SubmitChecklistComponent;
  let fixture: ComponentFixture<SubmitChecklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitChecklistComponent]
    });
    fixture = TestBed.createComponent(SubmitChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
