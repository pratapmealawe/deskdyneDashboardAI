import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggessionsFeedbacksComponent } from './suggessions-feedbacks.component';

describe('SuggessionsFeedbacksComponent', () => {
  let component: SuggessionsFeedbacksComponent;
  let fixture: ComponentFixture<SuggessionsFeedbacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggessionsFeedbacksComponent]
    });
    fixture = TestBed.createComponent(SuggessionsFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
