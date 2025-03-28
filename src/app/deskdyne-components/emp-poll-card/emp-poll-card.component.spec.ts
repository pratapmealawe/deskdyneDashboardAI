import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpPollCardComponent } from './emp-poll-card.component';

describe('EmpPollCardComponent', () => {
  let component: EmpPollCardComponent;
  let fixture: ComponentFixture<EmpPollCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpPollCardComponent]
    });
    fixture = TestBed.createComponent(EmpPollCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
