import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyBulkCardComponent } from './daily-bulk-card.component';

describe('DailyBulkCardComponent', () => {
  let component: DailyBulkCardComponent;
  let fixture: ComponentFixture<DailyBulkCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyBulkCardComponent]
    });
    fixture = TestBed.createComponent(DailyBulkCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
